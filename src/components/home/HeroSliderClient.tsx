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

const defaultSlideData = [
  {
    eyebrow: 'KLICKZSTUDIO • WEDDINGS & STORIES',
    heading: 'Stories That Last Forever',
    subtext: '20+ years of capturing real emotions, not staged moments',
    ctaText: 'Book Your Session Now',
    ctaHref: '/contact',
  },
  {
    eyebrow: 'CANDID & CINEMATIC',
    heading: 'Freeze Time with Stunning Photography',
    subtext: 'Crafting luxury wedding memories with artistic finesse and emotion',
    ctaText: 'Explore Our Gallery',
    ctaHref: '/best-candid-wedding-photographers',
  },
  {
    eyebrow: 'DESTINATION & LUXURY',
    heading: 'Grand Celebrations & Intimate Vows',
    subtext: 'Over 500+ couples across Chennai and destination venues worldwide',
    ctaText: 'Consult with Team KlickZ',
    ctaHref: '/book-us',
  },
  {
    eyebrow: 'FINE ART WEDDING FILMS',
    heading: 'Every Emotion, Beautifully Preserved',
    subtext: 'Documentary-style candid wedding & pre-wedding cinema',
    ctaText: 'Get in Touch Today',
    ctaHref: '/contact',
  },
  {
    eyebrow: 'TIMELESS ELEGANCE',
    heading: 'Unforgettable Moments, Masterfully Told',
    subtext: 'High-resolution heirloom imagery for your most cherished day',
    ctaText: 'Check Available Dates',
    ctaHref: '/contact',
  },
]

export function HeroSlider({ initialSlides, settings }: HeroSliderProps) {
  const [current, setCurrent] = useState(0)
  const slides = initialSlides.slice(0, 5) // max 5 slides

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
  const currentTextData = defaultSlideData[current % defaultSlideData.length]

  const activeEyebrow = currentTextData.eyebrow
  const activeHeading = currentTextData.heading
  const activeSubtext = currentTextData.subtext
  const activeCtaText = currentTextData.ctaText
  const activeCtaHref = currentTextData.ctaHref

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
              alt={activeHeading || 'KLICKZSTUDIO Wedding Photography'}
              fill
              className="object-cover object-center hidden lg:block"
              priority={current === 0}
              sizes="100vw"
              {...(slide?.blurDataURL ? { placeholder: 'blur' as const, blurDataURL: slide.blurDataURL } : {})}
            />
            {/* Mobile Image — shown below lg, falls back to desktop image */}
            <Image
              src={slide?.mobileImage || slide?.image || '/images/hero-fallback.jpg'}
              alt={activeHeading || 'KLICKZSTUDIO Wedding Photography'}
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
            {/* Soft left-to-right gradient shadow overlay exclusively behind the text area */}
            <div className="absolute inset-y-0 left-0 w-full max-w-3xl lg:max-w-4xl bg-gradient-to-r from-black/90 via-black/55 via-65% to-transparent pointer-events-none" />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Hero Text Content — Animates dynamically with each slide change */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-16 lg:px-24 max-w-full lg:max-w-3xl pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto"
          >
            {/* Eyebrow */}
            <div className="font-inter text-xs md:text-sm uppercase tracking-[0.18em] mb-4 flex items-center gap-2">
              <span className="font-extrabold text-[#C9A96E]">{activeEyebrow}</span>
            </div>

            {/* Main Heading — Clean, Bolder Sans-Serif Font */}
            <h1 className="font-inter text-3xl sm:text-5xl lg:text-[62px] font-extrabold text-white leading-[1.12] mb-5 tracking-tight drop-shadow-md">
              {activeHeading}
            </h1>

            {/* Subtext */}
            <p className="font-inter text-xs md:text-sm uppercase tracking-[0.15em] text-white/90 font-medium leading-relaxed mb-8 max-w-lg drop-shadow-sm">
              {activeSubtext}
            </p>

            {/* CTA Button */}
            <div>
              <Link
                href={activeCtaHref}
                className="inline-flex items-center justify-center font-inter text-sm md:text-base font-bold bg-[#C9A96E] hover:bg-white text-[#1A1A1A] hover:text-black px-8 py-3.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]"
              >
                {activeCtaText}
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Interactive Progress Indicators (Clickable) */}
      <div className="absolute bottom-8 left-6 right-6 md:left-16 md:right-16 z-30 flex gap-4 items-center">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className="h-3 flex-1 relative flex items-center group cursor-pointer border-0 bg-transparent p-0"
            aria-label={`Go to slide ${idx + 1}`}
          >
            <div className="w-full h-[2px] bg-white/20 relative overflow-hidden group-hover:bg-white/40 transition-colors">
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
          </button>
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
