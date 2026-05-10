import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { heroSlidesQuery } from '@/sanity/lib/queries'
import { heroSlides as staticSlides } from '@/data/hero-slides'
import { HeroSlider as HeroSliderClient } from './HeroSliderClient'
import { HeroSlide } from '@/types'
import { SiteSettings } from '@/types/sanity'
import { urlForImage } from '@/sanity/lib/image'

interface HeroSliderProps {
  settings: SiteSettings | null
}

export async function HeroSlider({ settings }: HeroSliderProps) {
  let slides: HeroSlide[] = []

  try {
    // 1. Try to fetch explicit Hero Slides
    const rawSlides = await client.fetch(heroSlidesQuery, {}, { 
      next: { revalidate: process.env.NODE_ENV === 'development' ? 0 : 60 } 
    })
    
    if (rawSlides && rawSlides.length > 0) {
      slides = rawSlides.map((slide: any) => ({
        ...slide,
        image: urlForImage(slide.image).url(),
        blurDataURL: slide.image?.asset?.metadata?.lqip,
        mobileImage: slide.mobileImage ? urlForImage(slide.mobileImage).url() : undefined,
        mobileBlurDataURL: slide.mobileImage?.asset?.metadata?.lqip
      }))
    }
    
    // 2. If no Hero Slides, fallback to some great images from Sanity categories
    if (!slides || slides.length === 0) {
      const fallbackImages = await client.fetch(groq`
        *[_type == "photographyImage"] | order(_createdAt desc)[0...5] {
          image {
            ...,
            asset-> {
              ...,
              metadata { lqip }
            }
          },
          "heading": "",
          "subheading": ""
        }
      `)
      slides = fallbackImages.map((img: any) => ({
        ...img,
        image: urlForImage(img.image).url(),
        blurDataURL: img.image?.asset?.metadata?.lqip,
      }))
    }
  } catch (error) {
    console.error('Failed to fetch hero data from Sanity:', error)
  }

  // Final fallback to static if everything else fails
  const initialSlides = slides && slides.length > 0 ? slides : staticSlides

  return <HeroSliderClient initialSlides={initialSlides} settings={settings} />
}
