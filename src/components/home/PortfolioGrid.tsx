import { client } from '@/sanity/lib/client'
import { portfolioQuery } from '@/sanity/lib/queries'
import { portfolioItems as staticItems } from '@/data/portfolio'
import { PortfolioGrid as PortfolioGridClient } from './PortfolioGridClient'
import { PortfolioItem } from '@/types'

export async function PortfolioGrid() {
  let items: PortfolioItem[] = []

  try {
    items = await client.fetch(portfolioQuery, {}, { next: { revalidate: 60 } })
  } catch (error) {
    console.error('Failed to fetch portfolio items from Sanity:', error)
  }

  const initialItems = items && items.length > 0 ? items : staticItems
  
  // Filter out unwanted items
  let filteredItems = initialItems.filter(item => {
    const lowerTitle = item.title.toLowerCase()
    if (lowerTitle.includes('pollachi') || lowerTitle.includes('coimbatore') || lowerTitle.includes('new jersey')) return false
    if (lowerTitle.includes('post-wedding')) return false
    if (item.href === '/films' || lowerTitle.includes('film')) return false
    return true
  })

  // Fallback to static items if everything was filtered out
  if (filteredItems.length === 0) {
    filteredItems = staticItems
  }

  return <PortfolioGridClient initialItems={filteredItems} />
}

