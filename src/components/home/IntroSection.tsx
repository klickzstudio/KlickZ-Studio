'use client'

import Image from 'next/image'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

const gridImages = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80',
  'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80',
  'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&q=80',
]

export function IntroSection() {
  return (
    <section className="py-20 md:py-28 bg-white" id="intro">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <ScrollReveal>
            <h2 className="font-cormorant text-3xl md:text-[42px] font-normal text-[#1A1A1A] leading-tight mb-6">
              Your Love, Our passion,
              <br />
              Beautiful photographs
            </h2>
            <div className="w-[60px] h-[1px] bg-[#C9A96E] mb-6" />
            <p className="font-lato text-base font-light text-[#555555] leading-[1.8]">
              Welcome to AinZ Studio, where we capture the beauty, emotion, and magic of your
              special day. As professional wedding photographers, we believe that your wedding is
              more than just a day, it&apos;s a celebration of your love story. Allow us to take you on a
              visual journey through the most important day of your life, and to create a lasting
              legacy of your love.
            </p>
          </ScrollReveal>

          {/* Image Grid */}
          <ScrollReveal delay={0.2}>
            <div className="grid grid-cols-2 gap-3">
              {gridImages.map((src, idx) => (
                <div key={idx} className="relative aspect-[4/5] overflow-hidden group">
                  <Image
                    src={src}
                    alt={`Wedding photography ${idx + 1}`}
                    fill
                    className="object-cover transition-transform duration-600 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
