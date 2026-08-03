import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// ── Rate limiter (in-memory, resets on cold start — fine for serverless) ──
const rateLimit = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_MAX = 5       // max requests
const RATE_LIMIT_WINDOW = 60_000 // per 60 seconds

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimit.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW })
    return false
  }
  entry.count++
  return entry.count > RATE_LIMIT_MAX
}

// ── XSS Sanitizer ──
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  // ── 1. Origin validation ──
  const origin = request.headers.get('origin')
  const allowedOrigins = [
    process.env.NEXT_PUBLIC_SITE_URL,
    'https://klickzstudio.in',
    'https://www.klickzstudio.in',
    'http://localhost:3000',
    'http://localhost:3001',
  ].filter(Boolean)

  // Also allow Vercel preview deployments
  const isVercelPreview = origin?.includes('.vercel.app')

  if (origin && !allowedOrigins.includes(origin) && !isVercelPreview) {
    console.error('Origin blocked:', origin)
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // ── 2. Rate limiting ──
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded?.split(',')[0]?.trim() || 'unknown'
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    )
  }

  try {
    const body = await request.json();

    // ── 3. Honeypot (hidden field bots will fill) ──
    if (body.website || body.company) {
      // Bots filled the hidden field — silently succeed
      return NextResponse.json({ success: true })
    }

    const { name, email, phone, location, weddingDate, eventType, message } = body;

    if (!email || !name) {
      return NextResponse.json({ error: 'Name and Email are required' }, { status: 400 });
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // ── 4. Sanitize all user inputs before inserting into HTML ──
    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safePhone = escapeHtml(phone || '')
    const safeLocation = escapeHtml(location || 'Not specified')
    const safeEventType = escapeHtml(eventType || 'Not specified')
    const safeWeddingDate = escapeHtml(weddingDate || 'Not specified')
    const safeMessage = escapeHtml(message || 'No message provided')

    console.log('Attempting to send Admin notification...');
    const adminEmail = await resend.emails.send({
      from: 'KLICKZSTUDIO Leads <hello@klickzstudio.in>',
      to: 'Klickzstudio@gmail.com',
      replyTo: email,
      subject: `NEW ENQUIRY: ${safeName} | ${safeEventType}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px;">
          <h2 style="color: #C9A96E; border-bottom: 1px solid #C9A96E; padding-bottom: 10px;">New Lead Notification</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Phone:</strong> ${safePhone}</p>
          <p><strong>Location:</strong> ${safeLocation}</p>
          <p><strong>Event Type:</strong> ${safeEventType}</p>
          <p><strong>Wedding Date:</strong> ${safeWeddingDate}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #C9A96E;">
            ${safeMessage.replace(/\n/g, '<br>')}
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #888;">Submitted via KLICKZSTUDIO Contact Form</p>
        </div>
      `,
    });

    if (adminEmail.error) {
      console.error('Resend Admin Email Error:', adminEmail.error);
      throw new Error(`Admin Email Error: ${adminEmail.error.message}`);
    }

    console.log('Admin Email Sent Successfully:', adminEmail.data?.id);

    // 2. Send Customer Receipt
    console.log('Attempting to send Customer receipt...');
    const customerEmail = await resend.emails.send({
      from: 'KLICKZSTUDIO <hello@klickzstudio.in>',
      to: email,
      subject: 'Thank you for contacting KLICKZSTUDIO',
      html: `
        <div style="font-family: 'Times New Roman', serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 40px; background-color: #ffffff; border: 1px solid #F5F0E8;">
          <div style="text-align: center; margin-bottom: 40px;">
            <h1 style="font-size: 28px; font-weight: 300; letter-spacing: 0.2em; color: #1a1a1a; margin: 0;">KLICKZSTUDIO</h1>
            <div style="width: 40px; height: 1px; background-color: #C9A96E; margin: 20px auto;"></div>
            <p style="font-family: sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: 0.3em; color: #888888; margin: 0;">Wedding Photography</p>
          </div>
          
          <p style="font-size: 18px; font-style: italic; color: #1a1a1a;">Dear ${safeName},</p>
          
          <p style="font-family: sans-serif; font-size: 15px; font-weight: 300; color: #555555;">
            Thank you for reaching out to us. We are truly honoured to be considered for your special day.
          </p>
          
          <p style="font-family: sans-serif; font-size: 15px; font-weight: 300; color: #555555;">
            Our team has received your enquiry regarding your <strong>${safeEventType}</strong>. We take great pride in our editorial approach to wedding storytelling, and we look forward to discussing how we can capture your unique journey.
          </p>
          
          <div style="text-align: center; margin: 40px 0;">
            <p style="font-family: sans-serif; font-size: 14px; font-weight: 300; color: #1a1a1a; margin-bottom: 20px;">
              A member of our team will get in touch with you within 24-48 hours.
            </p>
            <a href="https://www.instagram.com/KLICKZSTUDIO/" style="display: inline-block; padding: 12px 25px; background-color: #C9A96E; color: #ffffff; text-decoration: none; font-family: sans-serif; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em;">View Our Latest Work</a>
          </div>
          
          <div style="border-top: 1px solid #F5F0E8; padding-top: 30px; margin-top: 40px; text-align: center;">
            <p style="font-family: sans-serif; font-size: 12px; font-weight: 300; color: #888888; margin: 0;">
              KLICKZSTUDIO &bull; Chennai &bull; Coimbatore
            </p>
          </div>
        </div>
      `,
    });

    if (customerEmail.error) {
      console.error('Resend Customer Email Error:', customerEmail.error);
      // Don't fail the whole request if just the receipt fails
      throw new Error(`Customer Email Error: ${customerEmail.error.message}`);
    }

    console.log('Customer Email Sent Successfully:', customerEmail.data?.id);

    return NextResponse.json({ 
      success: true, 
      adminId: adminEmail.data?.id, 
      customerId: customerEmail.data?.id 
    });
  } catch (error) {
    console.error('CRITICAL Resend API Error Details:', error);
    return NextResponse.json({ 
      error: 'Failed to send email', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}
