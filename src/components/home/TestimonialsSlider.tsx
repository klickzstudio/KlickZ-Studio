import { client } from '@/sanity/lib/client'
import { testimonialsQuery } from '@/sanity/lib/queries'
import { testimonials as staticTestimonials } from '@/data/testimonials'
import { TestimonialsSlider as TestimonialsSliderClient } from './TestimonialsSliderClient'
import { Testimonial } from '@/types'

export async function TestimonialsSlider() {
  let items: Testimonial[] = []

  try {
    items = await client.fetch(testimonialsQuery, {}, { next: { revalidate: 60 } })
  } catch (error) {
    console.error('Failed to fetch testimonials from Sanity:', error)
  }

  const initialTestimonials = items && items.length > 0 ? items : staticTestimonials

  return <TestimonialsSliderClient initialTestimonials={initialTestimonials} />
}

