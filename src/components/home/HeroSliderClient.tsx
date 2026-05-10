'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { HeroSlide } from '@/types'
import { SiteSettings } from '@/types/sanity'

interface HeroSliderProps {
  initialSlides: HeroSlide[]
  settings?: SiteSettings | null
}

export function HeroSlider({ initialSlides, settings }: HeroSliderProps) {
  const [current, setCurrent] = useState(0)
  const slides = initialSlides.slice(0, 5) // max 5 slides

  const heroEyebrow = settings?.heroEyebrow || 'Est. 2005 · Chennai & Destination Weddings'
  const heroHeading = settings?.heroHeading || 'Stories That Last Forever'
  const heroSubtext = settings?.heroSubtext || '20+ years of capturing real emotions, not staged moments'
  const fbLink = settings?.socials?.facebook || 'https://www.facebook.com/klickzstudio/'
  const igLink = settings?.socials?.instagram || 'https://www.instagram.com/weddingby_klickzstudio/'

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  useEffect(() => {
    // 7 seconds per slide for slower, premium feel
    const timer = setInterval(next, 7000)
    return () => clearInterval(timer)
  }, [next])

  const slide = slides[current]

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black" id="hero">
      {/* Background Images with Ken Burns Effect */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.08 }}
            transition={{ duration: 8, ease: 'linear' }}
            className="w-full h-full relative"
          >
            {/* Desktop Image — hidden on mobile */}
            <Image
              src={slide?.image || '/images/hero-fallback.jpg'}
              alt={slide?.heading || 'KLICKZSTUDIO Wedding Photography'}
              fill
              className="object-cover object-center hidden lg:block"
              priority={current === 0}
              sizes="100vw"
              {...(slide?.blurDataURL ? { placeholder: 'blur' as const, blurDataURL: slide.blurDataURL } : {})}
            />
            {/* Mobile Image — shown below lg, falls back to desktop image */}
            <Image
              src={slide?.mobileImage || slide?.image || '/images/hero-fallback.jpg'}
              alt={slide?.heading || 'KLICKZSTUDIO Wedding Photography'}
              fill
              className="object-cover object-center lg:hidden"
              priority={current === 0}
              sizes="100vw"
              {...(
                slide?.mobileBlurDataURL
                  ? { placeholder: 'blur' as const, blurDataURL: slide.mobileBlurDataURL }
                  : slide?.blurDataURL
                  ? { placeholder: 'blur' as const, blurDataURL: slide.blurDataURL }
                  : {}
              )}
            />
          </motion.div>
          {/* Subtle gradient overlay to ensure text readability but not heavy dark */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-[#0A0A0A]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/50 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Fixed Text Overlay - Replaced Dynamic Copy with Fixed Brand Copy */}
      <div className="absolute inset-0 flex flex-col justify-end pb-24 md:pb-32 z-20 px-6 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-[90vw] md:max-w-[70vw] lg:max-w-4xl"
        >
          <span className="font-lato text-[10px] md:text-[12px] uppercase tracking-[0.4em] text-[#C9A96E] mb-6 block drop-shadow-sm">
            {heroEyebrow}
          </span>
          <h1 className="font-cormorant text-white leading-[1.1] mb-6 flex flex-wrap items-baseline gap-x-4 md:gap-x-6 gap-y-2">
            {heroHeading.split(' ').map((word: string, i: number) => {
              const cleanWord = word.replace(/[,.!]/g, '').toLowerCase()
              const accentWords = ['the', 'of', 'in', 'to', 'and', 'is', 'a', 'by', 'your', 'with']
              const isAccent = accentWords.includes(cleanWord)
              return (
                <span 
                  key={i} 
                  className={isAccent 
                    ? "font-cormorant italic font-light lowercase text-[0.6em] md:text-[0.7em] text-white/70 drop-shadow-md translate-y-[-0.1em]" 
                    : "uppercase tracking-[0.15em] text-4xl md:text-6xl lg:text-[76px] font-light drop-shadow-2xl"
                  }
                >
                  {word}
                </span>
              )
            })}
          </h1>
          <p className="font-lato text-[12px] md:text-[14px] uppercase tracking-[0.2em] text-white/70 max-w-xl mb-10 leading-relaxed drop-shadow-sm">
            {heroSubtext}
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <Link
              href="/contact"
              className="inline-block font-lato text-[13px] uppercase tracking-[0.2em] bg-[#C9A96E] text-[#1A1A1A] px-8 py-4 hover:bg-white transition-colors duration-400"
            >
              Book Your Date
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Progress Bar Instead of Dots */}
      <div className="absolute bottom-8 left-6 right-6 md:left-16 md:right-16 z-20 flex gap-4 items-center">
        {slides.map((_, idx) => (
          <div key={idx} className="h-[2px] flex-1 bg-white/20 relative overflow-hidden hidden md:block">
            {idx === current && (
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 7, ease: 'linear' }}
                className="absolute inset-0 bg-[#C9A96E]"
              />
            )}
            {idx < current && (
              <div className="absolute inset-0 bg-[#C9A96E]" />
            )}
          </div>
        ))}
      </div>
      
      {/* Mobile exact pagination text instead of dots */}
      <div className="absolute bottom-10 left-6 z-20 font-inter text-white/60 text-xs tracking-widest md:hidden">
        {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </div>

      {/* Scroll Indicator - Right Side */}
      <div className="absolute right-8 md:right-12 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-12">
        <div className="h-24 w-[1px] bg-white/20 relative overflow-hidden">
          <motion.div 
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-[#C9A96E]"
          />
        </div>
        <span className="font-lato text-[10px] uppercase tracking-[0.4em] text-white/40 [writing-mode:vertical-lr] rotate-0">
          Scroll to explore
        </span>
      </div>

      {/* Social Links - Left Side */}
      <div className="hidden md:flex absolute bottom-12 left-8 z-20 flex-col gap-4">
        <a
          href={fbLink}
          target="_blank"
          rel="noopener noreferrer"
          className="font-lato text-[11px] uppercase tracking-[0.15em] text-white/60 hover:text-[#C9A96E] transition-colors duration-300 [writing-mode:vertical-lr] rotate-180"
        >
          Facebook
        </a>
        <a
          href={igLink}
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
