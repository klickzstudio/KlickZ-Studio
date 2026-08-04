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
  testimonialsQuery,
} from '@/sanity/lib/queries'
import { constructMetadata } from '@/lib/seo'
import { SiteSettings, HomePageData, CmsService, InstagramPostData, PhotographyImage } from '@/types/sanity'
import { Testimonial } from '@/types'

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
  let cmsServices: CmsService[] | null = null
  let servicesImages: string[] = []
  let horizontalImages: { image: string; alt?: string }[] = []
  let instagramPosts: InstagramPostData[] = []
  let settings: SiteSettings | null = null
  let homeData: HomePageData | null = null
  let testimonials: Testimonial[] = []
  let aboutPageHeroImage: string | undefined = undefined

  try {
    // Fetch ALL data in a single parallel batch — no duplicate calls
    const [
      fetchedSettings,
      fetchedHomeData,
      fetchedWeddingImages,
      fetchedInstagram,
      fetchedTestimonials,
      fetchedAboutPage,
    ] = await Promise.all([
      client.fetch<SiteSettings>(siteSettingsQuery, {}, { next: { revalidate: 0 } }),
      client.fetch<HomePageData>(homePageQuery, {}, { next: { revalidate: 0 } }),
      client.fetch<PhotographyImage[]>(photographyImagesQuery, { slug: 'wedding' }, { next: { revalidate: 60 } }),
      client.fetch<InstagramPostData[]>(instagramPostsQuery, {}, { next: { revalidate: 60 } }),
      client.fetch<Testimonial[]>(testimonialsQuery, {}, { next: { revalidate: 60 } }),
      client.fetch(pageSEOQuery, { slug: 'about' }, { next: { revalidate: 0 } }),
    ])

    settings = fetchedSettings || null
    homeData = fetchedHomeData || null
    instagramPosts = fetchedInstagram || []
    testimonials = fetchedTestimonials || []
    aboutPageHeroImage = fetchedAboutPage?.heroImageUrl

    const weddingFallbacks = (fetchedWeddingImages || []).map((img) => ({
      image: img.image,
      alt: img.altText || img.title || 'Cinematic wedding photography'
    }))

    // 1. Intro Images: CMS homePage → siteSettings → wedding fallbacks
    introImages = [
      homeData?.introMainImage || settings?.introImage1 || weddingFallbacks[0]?.image || '',
      homeData?.introSecondaryImage || settings?.introImage2 || weddingFallbacks[1]?.image || '',
    ]

    // 2. Services: full CMS objects with title + description + image + href
    cmsServices = homeData?.services?.length ? homeData.services : null
    servicesImages = cmsServices
      ? cmsServices.map((s) => s.image).filter(Boolean)
      : weddingFallbacks.slice(0, 4).map(f => f.image)

    // 3. Horizontal Gallery: CMS homePage gallery → wedding fallbacks
    horizontalImages =
      homeData?.horizontalGallery?.length
        ? homeData.horizontalGallery.filter(item => Boolean(item.image))
        : weddingFallbacks.slice(2, 12)

  } catch (error) {
    console.error('Failed to fetch home page data:', error)
  }

  return (
    <>
      <HeroSlider settings={settings} />
      <IntroSection images={introImages} />
      <ServicesSection images={servicesImages} services={cmsServices} />

      <HorizontalGallery images={horizontalImages} />
      <FounderSection settings={settings} overrideImage={aboutPageHeroImage || settings?.founderImage} fallbackImage={introImages[0]} />
      <StatsCounter stats={settings?.stats} />
      <TestimonialsSlider initialTestimonials={testimonials} />
      <InstagramFeed posts={instagramPosts} />
      <FinalCTA backgroundImage={settings?.ctaImage} />
    </>
  )
}
