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
            alt={slide.heading || 'KLICKZSTUDIO Wedding Photography'}
            fill
            className="object-cover object-center"
            priority={current === 0}
            sizes="100vw"
          />
          <div className="hero-overlay absolute inset-0" />
        </motion.div>
      </AnimatePresence>

      {/* Text Overlay - Bottom Left Editorial Positioning */}
      <div className="absolute inset-0 flex flex-col items-start justify-end pb-12 md:pb-24 lg:pb-32 z-10 px-8 md:px-16 lg:px-24">
        <AnimatePresence mode="wait">
          {slide.heading && (
            <motion.div
              key={`text-${current}`}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-[70vw]"
            >
              <h1 className="font-cormorant text-white leading-[1.05] mb-8 tracking-tight">
                {slide.heading.split(' ').map((word, i) => {
                  const cleanWord = word.replace(/[,.!]/g, '').toLowerCase();
                  const accentWords = ['the', 'of', 'in', 'to', 'and', 'is', 'a', 'by', 'your', 'with'];
                  const isAccent = accentWords.includes(cleanWord);
                  return (
                    <span 
                      key={i} 
                      className={isAccent 
                        ? "font-cormorant italic font-light lowercase text-[0.65em] md:text-[0.75em] mx-1 md:mx-1.5 inline-block translate-y-[-0.05em] text-white/70" 
                        : "uppercase tracking-[0.12em] text-4xl md:text-6xl lg:text-[76px] font-light inline-block"
                      }
                    >
                      {word}{' '}
                    </span>
                  )
                })}
              </h1>
              {slide.subheading && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="font-lato text-[11px] md:text-[13px] uppercase tracking-[0.4em] text-white/50 max-w-xl"
                >
                  {slide.subheading}
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll Indicator - Right Side */}
      <div className="absolute right-8 md:right-12 top-1/2 -translate-y-1/2 z-10 hidden md:flex flex-col items-center gap-12">
        <div className="h-24 w-[1px] bg-white/20 relative overflow-hidden">
          <motion.div 
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-[#C9A96E]"
          />
        </div>
        <span className="font-lato text-[10px] uppercase tracking-[0.4em] text-white/40 [writing-mode:vertical-lr] rotate-0">
          Scroll to begin
        </span>
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
          href="https://www.facebook.com/KLICKZSTUDIO"
          target="_blank"
          rel="noopener noreferrer"
          className="font-lato text-[11px] uppercase tracking-[0.15em] text-white/60 hover:text-[#C9A96E] transition-colors duration-300 [writing-mode:vertical-lr] rotate-180"
        >
          Facebook
        </a>
        <a
          href="https://www.instagram.com/KLICKZSTUDIO/"
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

