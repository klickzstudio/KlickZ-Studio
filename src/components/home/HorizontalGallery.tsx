'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

interface HorizontalGalleryProps {
  images?: string[]
}

export function HorizontalGallery({ images = [] }: HorizontalGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Move images horizontally as user scrolls down
  const x = useTransform(scrollYProgress, [0, 1], ["10%", "-50%"])

  // Filter out empty images
  const displayImages = images.length > 0 ? images : [
    '/images/gallery-1.jpg',
    '/images/gallery-2.jpg',
    '/images/gallery-3.jpg',
    '/images/gallery-4.jpg',
    '/images/gallery-5.jpg',
  ]

  return (
    <section ref={containerRef} className="relative py-24 md:py-36 bg-[#0A0A0A] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 mb-16">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <span className="font-lato text-[11px] uppercase tracking-[0.4em] text-[#C9A96E] mb-6 block">
                Visual Poetry
              </span>
              <h2 className="font-cormorant text-4xl md:text-5xl lg:text-[56px] text-white leading-tight">
                A Glimpse into <br className="hidden md:block" />
                <span className="italic text-[#C9A96E]">Our World.</span>
              </h2>
            </div>
            <p className="font-lato text-[14px] font-light text-white/50 max-w-sm">
              Each frame is an art piece. Hand-picked moments from weddings around the globe that define our cinematic vision.
            </p>
          </div>
        </ScrollReveal>
      </div>

      <div className="relative h-[400px] md:h-[600px] w-full mt-10">
        <motion.div 
          style={{ x }}
          className="absolute top-0 left-0 h-full flex gap-6 md:gap-10 px-6 md:px-10"
        >
          {displayImages.map((src, idx) => (
            <div 
              key={idx} 
              className={`relative h-full shrink-0 overflow-hidden ${
                idx % 2 === 0 ? 'w-[300px] md:w-[450px]' : 'w-[400px] md:w-[600px] mt-10 h-[90%]'
              }`}
            >
              <Image
                src={src}
                alt={`KLICKZSTUDIO Gallery Image ${idx + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
