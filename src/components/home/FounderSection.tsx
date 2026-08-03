import Image from 'next/image'
import Link from 'next/link'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { SiteSettings } from '@/types/sanity'

interface FounderSectionProps {
  settings: SiteSettings | null
  fallbackImage?: string
}

export function FounderSection({ settings, fallbackImage }: FounderSectionProps) {
  const founderName = (settings?.founderName || 'Kotteswaran').replace(/\s*\(Kotty\)/gi, '')
  const displayImage = '/images/client_owner.png'
  
  return (
    <section className="relative py-24 md:py-36 bg-[#F8F4EE] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <div className="w-full lg:w-1/2 relative">
            <ScrollReveal>
              <div className="relative aspect-[3/4] w-full max-w-[500px] mx-auto lg:mx-0">
                <Image
                  src={displayImage}
                  alt={`${founderName} - Founder of KLICKZSTUDIO`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 border border-[#C9A96E]/30 translate-x-4 translate-y-4 -z-10" />
              </div>
            </ScrollReveal>
          </div>

          <div className="w-full lg:w-1/2">
            <ScrollReveal delay={0.2}>
              <span className="font-lato text-[11px] uppercase tracking-[0.4em] text-[#C9A96E] mb-6 block">
                Meet The Founder
              </span>
              <h2 className="font-cormorant text-4xl md:text-5xl lg:text-[56px] text-[#2B2420] mb-8 leading-tight">
                {founderName}
              </h2>
              <div className="w-16 h-[1px] bg-[#C9A96E] mb-8" />
              
              <div className="space-y-6 font-lato text-[15px] font-light text-[#555555] leading-relaxed mb-10">
                <p>
                  With over 20 years of experience shaping the wedding photography industry since 2006, {founderName} has mastered the art of capturing authentic love stories. Having documented more than 500 weddings worldwide, his vision gave birth to KLICKZSTUDIO.
                </p>
                <p>
                  We are not just a solo act; we are a dedicated collective of visual storytellers. Our aesthetic is rooted in candid, natural moments that feel cinematic, timeless, and uniquely yours.
                </p>
              </div>

              <Link
                href="/about"
                className="inline-flex items-center gap-4 font-lato text-[12px] uppercase tracking-[0.2em] text-[#2B2420] group"
              >
                <span className="hover-gold-underline">Read Our Story</span>
                <span className="w-8 h-[1px] bg-[#2B2420] transition-all duration-300 group-hover:w-12 group-hover:bg-[#C9A96E]" />
              </Link>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  )
}
