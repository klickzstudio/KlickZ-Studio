import { client } from '@/sanity/lib/client'
import { siteSettingsQuery } from '@/sanity/lib/queries'
import { StatsCounterClient } from './StatsCounterClient'

export async function StatsCounter() {
  let stats = []

  try {
    const settings = await client.fetch(siteSettingsQuery, {}, { next: { revalidate: 60 } })
    if (settings?.stats) {
      stats = settings.stats
    }
  } catch (error) {
    console.error('Failed to fetch stats from siteSettings:', error)
  }

  // Fallback defaults if setup fails or nothing is defined
  if (!stats || stats.length === 0) {
    stats = [
      { number: 20, label: 'Years Exp', suffix: '+' },
      { number: 500, label: 'Weddings', suffix: '+' },
      { number: 15, label: 'Destinations', suffix: '+' },
      { number: 1000, label: 'Happy Couples', suffix: '+' }
    ]
  }

  return <StatsCounterClient stats={stats} />
}
