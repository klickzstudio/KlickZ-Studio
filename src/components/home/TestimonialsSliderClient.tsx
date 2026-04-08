'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Testimonial } from '@/types'
import { SectionTitle } from '@/components/ui/SectionTitle'

export function TestimonialsSlider({ initialTestimonials }: { initialTestimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % initialTestimonials.length)
  }, [initialTestimonials.length])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + initialTestimonials.length) % initialTestimonials.length)
  }, [initialTestimonials.length])

  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next])

  const testimonial = initialTestimonials[current]

  return (
    <section className="py-20 md:py-28 bg-white" id="testimonials">
      <div className="max-w-[900px] mx-auto px-6">
        <SectionTitle
          title="What Our Client Says"
          subtitle="At the end of the day, people won't remember what you said or did, they will remember how you made them feel."
        />

        <div className="relative mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              {/* Quote */}
              <div className="mb-8">
                <svg className="w-10 h-10 text-[#C9A96E]/30 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10H0z" />
                </svg>
                <p className="font-cormorant text-xl md:text-[20px] font-normal italic text-[#1A1A1A] leading-[1.8] max-w-3xl mx-auto">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
              </div>

              {/* Author */}
              <div className="flex flex-col items-center gap-3">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#C9A96E]">
                  <Image
                    src={testimonial.photo}
                    alt={testimonial.name}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
                <p className="font-lato text-[12px] font-bold uppercase tracking-[0.15em] text-[#C9A96E]">
                  {testimonial.name}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-10 h-10 flex items-center justify-center text-[#888888] hover:text-[#C9A96E] transition-colors"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-10 h-10 flex items-center justify-center text-[#888888] hover:text-[#C9A96E] transition-colors"
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {initialTestimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === current ? 'bg-[#C9A96E] w-5' : 'bg-[#CCCCCC] hover:bg-[#888888]'
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

