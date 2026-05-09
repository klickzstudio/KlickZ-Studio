'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service like Sentry
    console.error('Website route error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F4EE] px-6 text-center">
      <span className="font-lato text-[11px] uppercase tracking-[0.4em] text-[#C9A96E] mb-6 block">
        Oops, something went wrong
      </span>
      <h2 className="font-cormorant text-4xl md:text-5xl text-[#2B2420] mb-8">
        We couldn't load this page
      </h2>
      <p className="font-lato text-[15px] font-light text-[#555555] max-w-md mx-auto mb-10">
        There was a problem communicating with our servers. Please try again or return to the homepage.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <button
          onClick={() => reset()}
          className="font-lato text-[12px] uppercase tracking-[0.2em] bg-[#2B2420] text-[#F8F4EE] px-8 py-4 hover:bg-[#C9A96E] transition-colors duration-400 w-full sm:w-auto"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="font-lato text-[12px] uppercase tracking-[0.2em] border border-[#2B2420] text-[#2B2420] px-8 py-4 hover:bg-[#2B2420] hover:text-[#F8F4EE] transition-colors duration-400 w-full sm:w-auto"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
