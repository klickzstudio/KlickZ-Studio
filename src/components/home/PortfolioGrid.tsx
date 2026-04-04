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

  return <PortfolioGridClient initialItems={initialItems} />
}
