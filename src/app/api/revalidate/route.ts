import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// Secret token to protect the revalidation endpoint
const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET

export async function POST(request: NextRequest) {
  try {
    // Check for secret token (optional but recommended)
    const { searchParams } = new URL(request.url)
    const secret = searchParams.get('secret')

    if (REVALIDATION_SECRET && secret !== REVALIDATION_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }

    // Revalidate all main pages
    revalidatePath('/', 'layout')
    revalidatePath('/')
    revalidatePath('/about')

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      message: 'All pages revalidated successfully',
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { message: 'Error revalidating', error: String(error) },
      { status: 500 }
    )
  }
}

// Also support GET for easy browser-based revalidation
export async function GET(request: NextRequest) {
  return POST(request)
}
