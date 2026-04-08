import { HeroSlider } from '@/components/home/HeroSlider'
import { IntroSection } from '@/components/home/IntroSection'
import { PortfolioGrid } from '@/components/home/PortfolioGrid'
import { StatsCounter } from '@/components/home/StatsCounter'
import { AwardsSection } from '@/components/home/AwardsSection'
import { TestimonialsSlider } from '@/components/home/TestimonialsSlider'
import { InstagramFeed } from '@/components/home/InstagramFeed'

import { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { pageSEOQuery } from '@/sanity/lib/queries'
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

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <IntroSection />
      <PortfolioGrid />
      <StatsCounter />
      <AwardsSection />
      <TestimonialsSlider />
      <InstagramFeed />
    </>
  )
}

