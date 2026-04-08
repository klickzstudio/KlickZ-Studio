import { client } from '@/sanity/lib/client'
import { heroSlidesQuery } from '@/sanity/lib/queries'
import { heroSlides as staticSlides } from '@/data/hero-slides'
import { HeroSlider as HeroSliderClient } from './HeroSliderClient'
import { HeroSlide } from '@/types'

export async function HeroSlider() {
  let slides: HeroSlide[] = []

  try {
    // Try to fetch from Sanity
    slides = await client.fetch(heroSlidesQuery, {}, { next: { revalidate: 60 } })
  } catch (error) {
    console.error('Failed to fetch hero slides from Sanity:', error)
  }

  // Fallback to static data if Sanity is empty or fails
  const initialSlides = slides && slides.length > 0 ? slides : staticSlides

  return <HeroSliderClient initialSlides={initialSlides} />
}

