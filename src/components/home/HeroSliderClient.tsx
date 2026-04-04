'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { HeroSlide } from '@/types'

interface HeroSliderProps {
  initialSlides: HeroSlide[]
}

export function HeroSlider({ initialSlides }: HeroSliderProps) {
  const [current, setCurrent] = useState(0)
  const slides = initialSlides

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  const slide = slides[current]

  return (
    <section className="relative w-full h-screen overflow-hidden" id="hero">
      {/* Background Images */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={slide.heading || 'AinZ Studio Wedding Photography'}
            fill
            className="object-cover object-center"
            priority={current === 0}
            sizes="100vw"
          />
          <div className="hero-overlay absolute inset-0" />
        </motion.div>
      </AnimatePresence>

      {/* Text Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-[15vh] z-10 px-6">
        <AnimatePresence mode="wait">
          {slide.heading && (
            <motion.div
              key={`text-${current}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <h1 className="font-cormorant text-4xl md:text-6xl lg:text-[64px] font-light italic text-white leading-tight mb-4">
                {slide.heading}
              </h1>
              {slide.subheading && (
                <p className="font-lato text-sm md:text-lg font-light text-white/85 max-w-2xl mx-auto">
                  {slide.subheading}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              idx === current ? 'bg-[#C9A96E] w-6' : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Social Links - Left Side */}
      <div className="hidden md:flex absolute bottom-12 left-8 z-10 flex-col gap-4">
        <a
          href="https://www.facebook.com/AinZStudio"
          target="_blank"
          rel="noopener noreferrer"
          className="font-lato text-[11px] uppercase tracking-[0.15em] text-white/60 hover:text-[#C9A96E] transition-colors duration-300 [writing-mode:vertical-lr] rotate-180"
        >
          Facebook
        </a>
        <a
          href="https://www.instagram.com/AinZStudio/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-lato text-[11px] uppercase tracking-[0.15em] text-white/60 hover:text-[#C9A96E] transition-colors duration-300 [writing-mode:vertical-lr] rotate-180"
        >
          Instagram
        </a>
      </div>
    </section>
  )
}
