import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white">
      {/* CTA Banner */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80" />
        <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
          <h2 className="font-cormorant text-4xl md:text-[52px] font-light italic text-white leading-tight mb-8">
            Let&apos;s make your wedding a Wonderful story.
          </h2>
          <Link
            href="/contact"
            className="inline-block font-lato text-[14px] uppercase tracking-[0.2em] border border-white text-white px-10 py-4 hover:bg-white hover:text-black transition-all duration-400"
          >
            Get in Touch
          </Link>
        </div>
      </div>

      {/* Follow Us + Email */}
      <div className="border-t border-white/10 py-6">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-lato text-[12px] uppercase tracking-[0.2em] text-white/60">
            Follow Us
          </span>
          <a
            href="mailto:ainz.mhr@gmail.com"
            className="font-lato text-[13px] text-[#C9A96E] hover:underline transition-colors"
          >
            ainz.mhr@gmail.com
          </a>
        </div>
      </div>

      {/* Main Footer */}
      <div className="border-t border-white/10 py-16">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          {/* Logo */}
          <div className="mb-8">
            <span className="font-cormorant text-3xl font-light tracking-[0.15em] text-white">
              AINZ STUDIO
            </span>
          </div>

          {/* Ticker text */}
          <p className="ticker-text text-white/50 mb-10 max-w-2xl mx-auto">
            – Wedding – Pet Photography – Studio – Fashion –
          </p>

          {/* Phone numbers */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-10">
            <a
              href="tel:+919841080909"
              className="font-lato text-[14px] text-white hover:text-[#C9A96E] transition-colors tracking-wider"
            >
              +91 98410 80909
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center justify-center gap-6 mb-10">
            <a
              href="https://www.facebook.com/AinZStudio"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:text-[#C9A96E] hover:border-[#C9A96E] transition-all duration-300"
              aria-label="Facebook"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/AinZStudio/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:text-[#C9A96E] hover:border-[#C9A96E] transition-all duration-300"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:text-[#C9A96E] hover:border-[#C9A96E] transition-all duration-300"
              aria-label="YouTube"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 9.71a8.5 8.5 0 00-.91-4.13 2.92 2.92 0 00-1.72-1A78.36 78.36 0 0012 4.27a78.45 78.45 0 00-8.34.3 2.87 2.87 0 00-1.46.74c-.9.83-1 2.25-1.1 3.45a48.29 48.29 0 000 6.48 9.55 9.55 0 00.3 2 3.14 3.14 0 00.71 1.36 2.86 2.86 0 001.49.78 45.18 45.18 0 006.5.33c3.5.05 6.57 0 10.2-.38a2.88 2.88 0 001.53-.78 2.49 2.49 0 00.61-1 10.58 10.58 0 00.52-3.4c.04-.56.04-3.94.04-4.54zM9.74 14.85V8.66l5.92 3.11c-1.66.92-3.85 1.96-5.92 3.08z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 py-5">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="font-lato text-[12px] text-white/50">
            © Copyrights AinZ Studio. All Rights Reserved.
          </p>
          <p className="font-lato text-[12px] text-white/50">
            Powered by{' '}
            <a
              href="https://ainz.space"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C9A96E] hover:underline"
            >
              AinZ
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
