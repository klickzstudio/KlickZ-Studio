import { HeroSlider } from '@/components/home/HeroSlider'
import { IntroSection } from '@/components/home/IntroSection'
import { PortfolioGrid } from '@/components/home/PortfolioGrid'
import { FilmsGrid } from '@/components/home/FilmsGrid'
import { StatsCounter } from '@/components/home/StatsCounter'
import { BlogPreview } from '@/components/home/BlogPreview'
import { AwardsSection } from '@/components/home/AwardsSection'
import { TestimonialsSlider } from '@/components/home/TestimonialsSlider'
import { InstagramFeed } from '@/components/home/InstagramFeed'

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <IntroSection />
      <PortfolioGrid />
      <FilmsGrid />
      <StatsCounter />
      <BlogPreview />
      <AwardsSection />
      <TestimonialsSlider />
      <InstagramFeed />
    </>
  )
}
