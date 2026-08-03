'use client'

import Link from 'next/link'
import { EditorialHero } from '@/components/ui/EditorialHero'
import { ROUTES } from '@/config/routes'

interface EmptyPageTemplateProps {
  slug: string
  title?: string
  description?: string
  heroImage?: string
}

export function formatSlugToTitle(slug: string): string {
  if (!slug) return 'Portfolio Collection'
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function EmptyPageTemplate({
  slug,
  title,
  description,
  heroImage = '/KlickzStudio_Logo_last_final.png',
}: EmptyPageTemplateProps) {
  const displayTitle = title || formatSlugToTitle(slug)
  const displayDescription =
    description ||
    `We are actively curating and processing our finest works for ${displayTitle}. Explore our story or get in touch for custom inquiries.`

  return (
    <div className="min-h-screen bg-[#FDFCFB]">
      <EditorialHero title={displayTitle} subtitle="Collection" image={heroImage} />

      <section className="py-20 px-6 max-w-[800px] mx-auto text-center">
        {/* Decorative Empty Gallery Indicator */}
        <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-[#F7F5EF] border border-[#E8E2D5] flex items-center justify-center text-[#C9A96E]">
          <svg className="w-8 h-8 opacity-75" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        </div>

        <span className="font-lato text-[11px] uppercase tracking-[0.3em] text-[#C9A96E] font-semibold mb-3 block">
          Gallery Coming Soon
        </span>
        <h2 className="font-cormorant text-3xl md:text-4xl text-[#1A1A1A] mb-6">
          Stories in the Making
        </h2>
        <p className="font-lato text-sm md:text-base text-[#555555] font-light leading-relaxed max-w-xl mx-auto mb-10">
          {displayDescription}
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={ROUTES.CONTACT}
            className="w-full sm:w-auto font-lato text-xs uppercase tracking-[0.18em] font-bold bg-[#C9A96E] hover:bg-black text-[#1A1A1A] hover:text-white px-7 py-3.5 rounded-full transition-all duration-300 shadow-2xs"
          >
            Inquire About {displayTitle}
          </Link>
          <Link
            href={ROUTES.BOOK_US}
            className="w-full sm:w-auto font-lato text-xs uppercase tracking-[0.15em] font-semibold text-[#1A1A1A] bg-white border border-[#D1D5DB] hover:border-[#C9A96E] px-7 py-3.5 rounded-full transition-all duration-300 shadow-2xs"
          >
            Reserve Your Date
          </Link>
        </div>
      </section>
    </div>
  )
}
