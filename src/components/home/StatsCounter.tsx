import { StatsCounterClient } from './StatsCounterClient'
import { StatItem } from '@/types/sanity'

interface StatsCounterProps {
  stats?: StatItem[]
}

const defaultStats: StatItem[] = [
  { number: 20, label: 'Years Exp', suffix: '+' },
  { number: 500, label: 'Weddings', suffix: '+' },
  { number: 15, label: 'Destinations', suffix: '+' },
  { number: 1000, label: 'Happy Couples', suffix: '+' },
]

export function StatsCounter({ stats }: StatsCounterProps) {
  const displayStats = stats && stats.length > 0 ? stats : defaultStats
  return <StatsCounterClient stats={displayStats} />
}
