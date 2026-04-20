'use client'

import Image from 'next/image'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

interface IntroSectionProps {
  images?: string[]
}

export function IntroSection({ images = [] }: IntroSectionProps) {
  const mainImage = images[0] || ''
  const secondaryImage = images[1] || ''

  return (
    <section className="relative py-20 md:py-32 bg-white overflow-hidden" id="intro">
      {/* Vertical Decoration */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:block pointer-events-none">
        <p className="font-lato text-[11px] uppercase tracking-[0.4em] text-[#C9A96E]/40 [writing-mode:vertical-lr] rotate-180">
          ESTABLISHED 2005 — TWENTY YEARS OF STORYTELLING
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          {/* Text Content */}
          <div className="lg:col-span-5">
            <ScrollReveal>
              <span className="font-lato text-[12px] uppercase tracking-[0.3em] text-[#C9A96E] mb-4 block">
                Welcome to KLICKZSTUDIO
              </span>
              <h2 className="font-cormorant text-4xl md:text-[54px] font-normal text-[#1A1A1A] leading-[1.1] mb-8">
                Your Love, Our Passion,<br />
                <span className="italic">Cinematic Legacies.</span>
              </h2>
              <div className="w-[80px] h-[1px] bg-[#C9A96E] mb-8" />
              <p className="font-lato text-base font-light text-[#555555] leading-[2] mb-10 max-w-[480px]">
                At KLICKZSTUDIO, we capture the beauty, emotion, and magic of your
                special day. As professional wedding photographers with two decades of expertise, we believe that your wedding is
                more than just a day—it&apos;s a celebration of your unique love story and a lasting legacy.
              </p>
              
              <div className="flex items-center gap-8">
                <div>
                  <p className="font-cormorant text-3xl text-[#1A1A1A]">20+</p>
                  <p className="font-lato text-[10px] uppercase tracking-[0.1em] text-[#888]">Years Exp</p>
                </div>
                <div className="w-[1px] h-10 bg-[#EEE]" />
                <div>
                  <p className="font-cormorant text-3xl text-[#1A1A1A]">500+</p>
                  <p className="font-lato text-[10px] uppercase tracking-[0.1em] text-[#888]">Weddings</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Overlapping Image Grid */}
          <div className="lg:col-span-7 relative">
            <ScrollReveal delay={0.2} className="relative h-[500px] md:h-[650px]">
              {/* Main Image */}
              <div className="absolute top-0 right-0 w-[80%] h-[85%] overflow-hidden shadow-2xl z-10">
                {mainImage && (
                  <Image
                    src={mainImage}
                    alt="Main wedding photography"
                    fill
                    className="object-cover transition-transform duration-1000 hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                )}
              </div>
              
              {/* Secondary Overlapping Image */}
              <div className="absolute bottom-0 left-0 w-[50%] h-[55%] overflow-hidden shadow-2xl z-20 border-[10px] border-white">
                {secondaryImage && (
                <Image
                  src={secondaryImage}
                  alt="Detail photography"
                  fill
                  className="object-cover transition-transform duration-1000 hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                )}
              </div>

              {/* Decorative Frame */}
              <div className="absolute top-[10%] left-[5%] w-[60%] h-[60%] border border-[#C9A96E]/20 -z-10" />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}

