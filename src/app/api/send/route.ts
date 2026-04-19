import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { name, email, phone, weddingDate, eventType, message } = await request.json();

    if (!email || !name) {
      return NextResponse.json({ error: 'Name and Email are required' }, { status: 400 });
    }

    // 1. Send Admin Notification
    const adminEmail = await resend.emails.send({
      from: 'KLICKZSTUDIO Leads <enquiry@ainz.space>',
      to: 'Klickzstudio@gmail.com',
      subject: `New Wedding Enquiry: ${name}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px;">
          <h2 style="color: #C9A96E; border-bottom: 1px solid #C9A96E; padding-bottom: 10px;">New Lead Notification</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Event Type:</strong> ${eventType || 'Not specified'}</p>
          <p><strong>Wedding Date:</strong> ${weddingDate || 'Not specified'}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #C9A96E;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #888;">Submitted via KLICKZSTUDIO Contact Form</p>
        </div>
      `,
    });

    // 2. Send Customer Receipt
    const customerEmail = await resend.emails.send({
      from: 'KLICKZSTUDIO <hello@ainz.space>',
      to: email,
      subject: 'Thank you for contacting KLICKZSTUDIO',
      html: `
        <div style="font-family: 'Times New Roman', serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 40px; background-color: #ffffff; border: 1px solid #F5F0E8;">
          <div style="text-align: center; margin-bottom: 40px;">
            <h1 style="font-size: 28px; font-weight: 300; letter-spacing: 0.2em; color: #1a1a1a; margin: 0;">KLICKZSTUDIO</h1>
            <div style="width: 40px; height: 1px; background-color: #C9A96E; margin: 20px auto;"></div>
            <p style="font-family: sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: 0.3em; color: #888888; margin: 0;">Wedding Photography</p>
          </div>
          
          <p style="font-size: 18px; font-style: italic; color: #1a1a1a;">Dear ${name},</p>
          
          <p style="font-family: sans-serif; font-size: 15px; font-weight: 300; color: #555555;">
            Thank you for reaching out to us. We are truly honoured to be considered for your special day.
          </p>
          
          <p style="font-family: sans-serif; font-size: 15px; font-weight: 300; color: #555555;">
            Our team has received your enquiry regarding your <strong>${eventType || 'event'}</strong>. We take great pride in our editorial approach to wedding storytelling, and we look forward to discussing how we can capture your unique journey.
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

    console.log('Admin Email Response:', adminEmail);
    console.log('Customer Email Response:', customerEmail);

    return NextResponse.json({ 
      success: true, 
      adminId: adminEmail.data?.id, 
      customerId: customerEmail.data?.id 
    });
  } catch (error) {
    console.error('CRITICAL Resend API Error:', error);
    return NextResponse.json({ 
      error: 'Failed to send email', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}

