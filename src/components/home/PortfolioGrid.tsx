import { client } from '@/sanity/lib/client'
import { portfolioQuery } from '@/sanity/lib/queries'
import { portfolioItems as staticItems } from '@/data/portfolio'
import { PortfolioGrid as PortfolioGridClient } from './PortfolioGridClient'
import { PortfolioItem } from '@/types'

interface PortfolioGridProps {
  /** CMS-curated items from the homePage document. When non-empty, these replace the portfolioItem docs. */
  cmsItems?: Array<{ title: string; image: string; label?: string; href?: string }>
}

export async function PortfolioGrid({ cmsItems = [] }: PortfolioGridProps) {
  // If the editor has curated specific items in the Home Page document, use those
  if (cmsItems.length > 0) {
    const mapped: PortfolioItem[] = cmsItems.map((item, idx) => ({
      _id: `cms-${idx}`,
      title: item.title,
      image: item.image,
      slug: '',
      categories: item.label ? [item.label] : ['Wedding'],
      href: item.href || '/best-candid-wedding-photographers',
      featured: true,
    }))
    return <PortfolioGridClient initialItems={mapped} />
  }

  // Otherwise fall back to portfolioItem documents from Sanity
  let items: PortfolioItem[] = []

  try {
    items = await client.fetch(portfolioQuery, {}, { next: { revalidate: 60 } })
  } catch (error) {
    console.error('Failed to fetch portfolio items from Sanity:', error)
  }

  const initialItems = items && items.length > 0 ? items : staticItems

  let filteredItems = initialItems.filter(item => {
    const lowerTitle = item.title.toLowerCase()
    if (lowerTitle.includes('pollachi') || lowerTitle.includes('coimbatore') || lowerTitle.includes('new jersey')) return false
    if (lowerTitle.includes('post-wedding')) return false
    if (item.href === '/films' || lowerTitle.includes('film')) return false
    return true
  })

  if (filteredItems.length === 0) filteredItems = staticItems

  return <PortfolioGridClient initialItems={filteredItems} />
}

