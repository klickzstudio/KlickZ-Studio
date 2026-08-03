import Link from 'next/link'
import Image from 'next/image'
import { SiteSettings } from '@/types/sanity'

interface FooterProps {
  settings?: SiteSettings | null
}

export function Footer({ settings }: FooterProps) {
  const siteTitle = settings?.title || 'KLICKZSTUDIO'
  const siteEmail = settings?.email || 'Klickzstudio@gmail.com'
  const sitePhone = settings?.phone || '+91 97102 98451'
  const siteWhatsApp = settings?.whatsappPhone || '919710298451'
  const fbLink = settings?.socials?.facebook || 'https://www.facebook.com/klickzstudio/'
  const igLink = settings?.socials?.instagram || 'https://www.instagram.com/weddingby_klickzstudio/'
  const ytLink = settings?.socials?.youtube || 'https://www.youtube.com/@klickzstudio1320'

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
            href={`mailto:${siteEmail}`}
            className="font-lato text-[13px] text-[#C9A96E] hover:underline transition-colors"
          >
            {siteEmail}
          </a>
        </div>
      </div>

      {/* Main Footer */}
      <div className="border-t border-white/10 py-16">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <Image src="/KlickzStudio_Logo_final2.png" alt={siteTitle} width={300} height={80} className="w-auto h-20" />
          </div>

          {/* Phone numbers */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-10 mt-8">
            <a
              href={`tel:${sitePhone.replace(/\s+/g, '')}`}
              className="font-lato text-[14px] text-white hover:text-[#C9A96E] transition-colors tracking-wider"
            >
              {sitePhone}
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center justify-center gap-6 mb-16">
            <a
              href={fbLink}
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
              href={igLink}
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
              href={ytLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:text-[#C9A96E] hover:border-[#C9A96E] transition-all duration-300"
              aria-label="YouTube"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 9.71a8.5 8.5 0 00-.91-4.13 2.92 2.92 0 00-1.72-1A78.36 78.36 0 0012 4.27a78.45 78.45 0 00-8.34.3 2.87 2.87 0 00-1.46.74c-.9.83-1 2.25-1.1 3.45a48.29 48.29 0 000 6.48 9.55 9.55 0 00.3 2 3.14 3.14 0 00.71 1.36 2.86 2.86 0 001.49.78 45.18 45.18 0 006.5.33c3.5.05 6.57 0 10.2-.38a2.88 2.88 0 001.53-.78 2.49 2.49 0 00.61-1 10.58 10.58 0 00.52-3.4c.04-.56.04-3.94.04-4.54zM9.74 14.85V8.66l5.92 3.11c-1.66.92-3.85 1.96-5.92 3.08z" />
              </svg>
            </a>
            <a
              href={`https://wa.me/${siteWhatsApp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:text-[#C9A96E] hover:border-[#C9A96E] transition-all duration-300"
              aria-label="WhatsApp"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
          </div>

          {/* Location Map */}
          <div className="w-full max-w-4xl mx-auto rounded-lg overflow-hidden border border-white/10 mb-10 h-64 md:h-80 opacity-80 hover:opacity-100 transition-opacity duration-300">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62157.458573127355!2d80.22702562167967!3d13.172413100000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526fdfd85eb2f7%3A0x79cfd539672f8d13!2sKlickz%20studio!5e0!3m2!1sen!2sin!4v1775995869138!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 py-5">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="font-lato text-[12px] text-white/50">
            © Copyrights KLICKZSTUDIO. All Rights Reserved.
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

