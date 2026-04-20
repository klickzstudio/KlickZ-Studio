import Link from 'next/link'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import Image from 'next/image'

interface FinalCTAProps {
  backgroundImage?: string
}

export function FinalCTA({ backgroundImage }: FinalCTAProps) {
  return (
    <section className="relative py-32 md:py-48 bg-[#2B2420] overflow-hidden">
      {/* Background Image with Overlay */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt="Ready to book?"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#2B2420] via-transparent to-[#2B2420] opacity-60" />
        </div>
      )}

      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white to-transparent transform rotate-45" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-white to-transparent transform -rotate-45" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10 text-center">
        <ScrollReveal>
          <span className="font-lato text-[11px] uppercase tracking-[0.4em] text-[#C9A96E] mb-6 block drop-shadow-sm">
            Let's Tell Your Story
          </span>
          <h2 className="font-cormorant text-5xl md:text-6xl lg:text-[72px] text-[#F8F4EE] mb-8 leading-tight drop-shadow-md">
            Ready to become a <br className="hidden md:block" />
            <span className="italic text-[#C9A96E]">KLICKZSTUDIO</span> couple?
          </h2>
          <p className="font-lato text-[14px] md:text-[16px] font-light text-[#F8F4EE]/60 max-w-2xl mx-auto mb-12">
            We take on a limited number of weddings each year to ensure every couple receives our undivided attention and a truly personalized experience.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/book-us"
              className="inline-block font-lato text-[13px] uppercase tracking-[0.2em] bg-[#C9A96E] text-[#1A1A1A] px-10 py-5 hover:bg-white transition-colors duration-400 w-full sm:w-auto"
            >
              Book Your Date
            </Link>
            <Link
              href="/best-candid-wedding-photographers"
              className="inline-block font-lato text-[13px] uppercase tracking-[0.2em] border border-[#C9A96E] text-[#C9A96E] px-10 py-5 hover:bg-[#C9A96E] hover:text-[#1A1A1A] transition-colors duration-400 w-full sm:w-auto"
            >
              View Portfolio
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
