import { testimonials as staticTestimonials } from '@/data/testimonials'
import { TestimonialsSlider as TestimonialsSliderClient } from './TestimonialsSliderClient'
import { Testimonial } from '@/types'

interface TestimonialsSliderProps {
  initialTestimonials?: Testimonial[]
}

export function TestimonialsSlider({ initialTestimonials = [] }: TestimonialsSliderProps) {
  const displayTestimonials = initialTestimonials.length > 0 ? initialTestimonials : staticTestimonials
  return <TestimonialsSliderClient initialTestimonials={displayTestimonials} />
}
