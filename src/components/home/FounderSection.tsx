import Image from 'next/image'
import Link from 'next/link'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { SiteSettings } from '@/types/sanity'
import { ROUTES } from '@/config/routes'

interface FounderSectionProps {
  settings: SiteSettings | null
  fallbackImage?: string
  overrideImage?: string
}

export function FounderSection({ settings, fallbackImage, overrideImage }: FounderSectionProps) {
  const founderName = (settings?.founderName || 'Kotteswaran')
    .replace(/\s*\(Kotty\)/gi, '')
    .replace(/\bKotty\b/gi, '')
    .trim()
  const displayImage = overrideImage || settings?.founderImage || fallbackImage || '/images/client_owner.png'
  
  return (
    <section className="relative py-24 md:py-36 bg-[#F8F4EE] overflow-hidden">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-10 text-center">
        
        {/* Header */}
        <ScrollReveal>
          <span className="font-lato text-[11px] uppercase tracking-[0.4em] text-[#C9A96E] mb-4 block">
            Meet The Founder
          </span>
          <h2 className="font-cormorant text-4xl md:text-5xl lg:text-[56px] text-[#2B2420] mb-6 leading-tight">
            {founderName}
          </h2>
          <div className="w-16 h-[1px] bg-[#C9A96E] mx-auto mb-12" />
        </ScrollReveal>

        {/* Centered Photo */}
        <ScrollReveal delay={0.1}>
          <div className="relative aspect-[16/10] w-full max-w-3xl mx-auto mb-14">
            <Image
              src={displayImage}
              alt={`${founderName} - Founder of KLICKZSTUDIO`}
              fill
              sizes="(max-width: 1024px) 100vw, 800px"
              className="object-cover shadow-lg"
            />
            <div className="absolute inset-0 border border-[#C9A96E]/30 translate-x-3 translate-y-3 -z-10" />
          </div>
        </ScrollReveal>

        {/* Content & Action */}
        <ScrollReveal delay={0.2}>
          <div className="max-w-2xl mx-auto space-y-6 font-lato text-[15px] font-light text-[#555555] leading-relaxed mb-10 text-center">
            <p>
              With over 20 years of experience shaping the wedding photography industry since 2006, {founderName} has mastered the art of capturing authentic love stories. Having documented more than 500 weddings worldwide, his vision gave birth to KLICKZSTUDIO.
            </p>
            <p>
              We are not just a solo act; we are a dedicated collective of visual storytellers. Our aesthetic is rooted in candid, natural moments that feel cinematic, timeless, and uniquely yours.
            </p>
          </div>

          <Link
            href={ROUTES.ABOUT}
            className="inline-flex items-center gap-4 font-lato text-[12px] uppercase tracking-[0.2em] text-[#2B2420] group"
          >
            <span className="hover-gold-underline">Read Our Story</span>
            <span className="w-8 h-[1px] bg-[#2B2420] transition-all duration-300 group-hover:w-12 group-hover:bg-[#C9A96E]" />
          </Link>
        </ScrollReveal>

      </div>
    </section>
  )
}
