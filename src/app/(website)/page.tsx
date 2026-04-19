import { HeroSlider } from '@/components/home/HeroSlider'
import { IntroSection } from '@/components/home/IntroSection'
import { PortfolioGrid } from '@/components/home/PortfolioGrid'
import { StatsCounter } from '@/components/home/StatsCounter'
import { AwardsSection } from '@/components/home/AwardsSection'
import { TestimonialsSlider } from '@/components/home/TestimonialsSlider'
import { InstagramFeed } from '@/components/home/InstagramFeed'
import { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { pageSEOQuery, photographyImagesQuery, instagramPostsQuery } from '@/sanity/lib/queries'
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

  // Fallback if not found in Sanity
  return constructMetadata()
}

export default async function HomePage() {
  // Fetch some images for the IntroSection (e.g., from Wedding category)
  let introImages: string[] = []
  let instagramPosts: any[] = []
  
  try {
    const weddingImages = await client.fetch(photographyImagesQuery, { slug: 'wedding' })
    introImages = weddingImages.map((img: any) => img.image).slice(0, 4)
    
    // Fetch Instagram posts from Sanity CMS
    instagramPosts = await client.fetch(instagramPostsQuery)
  } catch (error) {
    console.error('Failed to fetch home page data:', error)
  }

  return (
    <>
      <HeroSlider />
      <IntroSection images={introImages} />
      <PortfolioGrid />
      <StatsCounter />
      <AwardsSection />
      <TestimonialsSlider />
      <InstagramFeed posts={instagramPosts} />
    </>
  )
}

