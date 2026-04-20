import { HeroSlider } from '@/components/home/HeroSlider'
import { IntroSection } from '@/components/home/IntroSection'
import { ServicesSection } from '@/components/home/ServicesSection'

import { HorizontalGallery } from '@/components/home/HorizontalGallery'
import { FounderSection } from '@/components/home/FounderSection'
import { StatsCounter } from '@/components/home/StatsCounter'
import { TestimonialsSlider } from '@/components/home/TestimonialsSlider'
import { InstagramFeed } from '@/components/home/InstagramFeed'
import { FinalCTA } from '@/components/home/FinalCTA'
import { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import {
  pageSEOQuery,
  photographyImagesQuery,
  instagramPostsQuery,
  siteSettingsQuery,
  homePageQuery,
} from '@/sanity/lib/queries'
import { constructMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  let seoData = null
  try {
    seoData = await client.fetch(pageSEOQuery, { slug: 'home' })
  } catch (error) {
    console.error('Failed to fetch SEO metadata for home:', error)
  }

  if (seoData) {
    return constructMetadata({
      title: seoData.title,
      description: seoData.seoDescription,
      image: seoData.ogImage,
    })
  }

  return constructMetadata()
}

export default async function HomePage() {
  let introImages: string[] = []
  let cmsServices: Array<{ title: string; description: string; image: string; href: string }> | null = null
  let servicesImages: string[] = []
  let horizontalImages: string[] = []
  let instagramPosts: any[] = []
  let settings: any = {}
  let homeData: any = {}

  try {
    // Fetch all data in parallel for maximum performance
    const [fetchedSettings, fetchedHomeData, fetchedWeddingImages, fetchedInstagram] = await Promise.all([
      client.fetch(siteSettingsQuery, {}, { next: { revalidate: 60 } }),
      client.fetch(homePageQuery, {}, { next: { revalidate: 60 } }),
      client.fetch(photographyImagesQuery, { slug: 'wedding' }, { next: { revalidate: 60 } }),
      client.fetch(instagramPostsQuery, {}, { next: { revalidate: 60 } }),
    ])

    settings = fetchedSettings || {}
    homeData = fetchedHomeData || {}
    instagramPosts = fetchedInstagram || []

    const weddingFallbacks = (fetchedWeddingImages || []).map((img: any) => img.image)

    // 1. Intro Images: CMS homePage → siteSettings → wedding fallbacks
    introImages = [
      homeData.introMainImage || settings.introImage1 || weddingFallbacks[0] || '',
      homeData.introSecondaryImage || settings.introImage2 || weddingFallbacks[1] || '',
    ]

    // 2. Services: full CMS objects with title + description + image + href
    cmsServices = homeData.services?.length > 0 ? homeData.services : null
    servicesImages = cmsServices
      ? cmsServices.map((s) => s.image).filter(Boolean)
      : weddingFallbacks.slice(0, 4)

    // 3. Horizontal Gallery: CMS homePage gallery → wedding fallbacks
    horizontalImages =
      homeData.horizontalGallery?.length > 0
        ? homeData.horizontalGallery.map((item: any) => item.image).filter(Boolean)
        : weddingFallbacks.slice(2, 12)

  } catch (error) {
    console.error('Failed to fetch home page data:', error)
  }

  return (
    <>
      <HeroSlider />
      <IntroSection images={introImages} />
      <ServicesSection images={servicesImages} services={cmsServices} />

      <HorizontalGallery images={horizontalImages} />
      <FounderSection image={settings.founderImage || introImages[0]} />
      <StatsCounter />
      <TestimonialsSlider />
      <InstagramFeed posts={instagramPosts} />
      <FinalCTA backgroundImage={settings.ctaImage} />
    </>
  )
}
