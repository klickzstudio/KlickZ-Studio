import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { heroSlidesQuery, siteSettingsQuery } from '@/sanity/lib/queries'
import { heroSlides as staticSlides } from '@/data/hero-slides'
import { HeroSlider as HeroSliderClient } from './HeroSliderClient'
import { HeroSlide } from '@/types'

export async function HeroSlider() {
  let slides: HeroSlide[] = []
  let settings = null

  try {
    settings = await client.fetch(siteSettingsQuery, {}, { next: { revalidate: 60 } })
    
    // 1. Try to fetch explicit Hero Slides
    slides = await client.fetch(heroSlidesQuery, {}, { next: { revalidate: 60 } })
    
    // 2. If no Hero Slides, fallback to some great images from Sanity categories
    if (!slides || slides.length === 0) {
      const fallbackImages = await client.fetch(groq`
        *[_type == "photographyImage"] | order(_createdAt desc)[0...5] {
          "image": image.asset->url,
          "heading": "",
          "subheading": ""
        }
      `)
      slides = fallbackImages
    }
  } catch (error) {
    console.error('Failed to fetch hero data from Sanity:', error)
  }

  // Final fallback to static if everything else fails
  const initialSlides = slides && slides.length > 0 ? slides : staticSlides

  return <HeroSliderClient initialSlides={initialSlides} settings={settings} />
}

