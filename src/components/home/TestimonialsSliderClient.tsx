'use client'

import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Testimonial } from '@/types'

const defaultTestimonials: (Testimonial & { category?: string; location?: string })[] = [
  {
    id: '1',
    name: 'Priya & Rohan',
    text: 'KLICKZSTUDIO captured not just the events of our wedding day, but the emotions, the laughter, and the love. Every photograph tells a part of our story beautifully. Years later, these images still make us emotional.',
    category: 'Wedding Photography',
    location: 'Wedding at Grand Palace, Chennai',
  },
  {
    id: '2',
    name: 'Sarah Khan',
    text: 'We needed professional product photography for our e-commerce launch. The results exceeded our expectations. The images directly contributed to a 40% increase in our online conversions.',
    category: 'Corporate & Product',
    location: 'Fashion Brand Launch',
  },
  {
    id: '3',
    name: 'Krishna & Aarthi',
    text: 'Our newborn photos are treasured possessions. KLICKZSTUDIO’s gentle approach, artistic vision, and attention to safety made us completely comfortable. These images capture the innocence of our baby perfectly.',
    category: 'Newborn Session',
    location: 'Newborn Boy, First Month Session',
  },
  {
    id: '4',
    name: 'Vikram Singh',
    text: 'As an actor, I’ve done headshots with many photographers. KLICKZSTUDIO brought a unique creativity and professionalism. The portraits helped me land representation with a top agency.',
    category: 'Celebrity Portrait',
    location: 'Professional Portfolio & Headshots',
  },
  {
    id: '5',
    name: 'Joseph & Mary',
    text: 'What started as a simple birthday party request turned into a beautiful documentation of family togetherness. KLICKZSTUDIO captured candid moments we didn’t even know were happening.',
    category: 'Birthday Celebration',
    location: '40th Birthday, 200+ Guests',
  },
  {
    id: '6',
    name: 'Arjun & Divya',
    text: 'Our engagement photos showcase our real personalities and chemistry. KLICKZSTUDIO made us feel comfortable in front of the camera, and the results are stunning. We’re using them everywhere!',
    category: 'Lifestyle & Engagement',
    location: 'Pre-wedding Lifestyle Shoot',
  },
]

export function TestimonialsSlider({ initialTestimonials }: { initialTestimonials?: Testimonial[] }) {
  const testimonials = (initialTestimonials && initialTestimonials.length >= 3) 
    ? initialTestimonials.map((t, idx) => ({
        ...t,
        category: defaultTestimonials[idx % defaultTestimonials.length]?.category || 'Wedding Story',
        location: defaultTestimonials[idx % defaultTestimonials.length]?.location || 'Chennai, India',
      }))
    : defaultTestimonials

  return (
    <section className="py-20 md:py-28 bg-white text-[#1A1A1A]" id="testimonials">
      <div className="max-w-[1280px] mx-auto px-6">
        
        {/* Section Header */}
        <ScrollReveal className="text-center mb-14">
          <h2 className="font-cormorant text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-3 tracking-tight">
            Client Stories
          </h2>
          <p className="font-lato text-sm text-[#666666] font-light">
            Moments transformed into timeless memories
          </p>
        </ScrollReveal>

        {/* 6 Testimonial Cards Grid (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {testimonials.slice(0, 6).map((item, idx) => {
            const isFeatured = idx === 4 // Joseph & Mary highlighted like reference image
            return (
              <ScrollReveal key={item.id || idx} delay={idx * 0.08}>
                <div
                  className={`rounded-xl p-7 flex flex-col justify-between h-full transition-all duration-300 ${
                    isFeatured
                      ? 'bg-[#FFFDF7] border-2 border-[#EAB308] shadow-md'
                      : 'bg-[#FAF9F6] border border-[#E8E4D9] hover:border-[#D97706]/40 shadow-2xs'
                  }`}
                >
                  <div>
                    {/* 5 Yellow Stars */}
                    <div className="flex items-center gap-1 text-[#EAB308] mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="font-lato text-xs md:text-sm text-[#4A4A4A] leading-relaxed font-light mb-6">
                      &ldquo;{item.text}&rdquo;
                    </p>
                  </div>

                  {/* Author Details */}
                  <div className="pt-4 border-t border-[#E8E4D9]">
                    <h4 className="font-cormorant text-base font-bold text-[#1A1A1A] mb-0.5">
                      {item.name}
                    </h4>
                    <p className="font-lato text-[11px] font-semibold text-[#D97706]">
                      {item.category}
                    </p>
                    <p className="font-lato text-[10.5px] text-[#888888] font-light">
                      {item.location}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>

        {/* Bottom Google Review CTA Box */}
        <ScrollReveal className="text-center pt-2">
          <p className="font-lato text-xs text-[#666666] mb-4">
            Had a great experience with us? We&apos;d love to hear from you.
          </p>
          <a
            href="https://maps.app.goo.gl/SeKL9paC79oXaRuDA"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#C9A96E] hover:bg-black text-[#1A1A1A] hover:text-white font-lato text-xs font-semibold px-6 py-3 rounded-lg shadow-xs transition-all duration-300"
          >
            <svg className="w-4 h-4 fill-current text-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>Leave a Google Review</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
        </ScrollReveal>

      </div>
    </section>
  )
}


