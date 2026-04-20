'use client'

import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

interface Stat {
  number: number
  label: string
  suffix?: string
}

interface StatsCounterClientProps {
  stats: Stat[]
}

export function StatsCounterClient({ stats }: StatsCounterClientProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  const displayStats = stats.slice(0, 4)

  if (displayStats.length === 0) return null

  return (
    <section className="relative py-24 md:py-40 bg-[#0A0A0A] overflow-hidden" id="stats" ref={ref}>
      {/* Background Texture/Accents */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C1A472] to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C1A472] to-transparent" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-16">
          {displayStats.map((stat, idx) => (
            <ScrollReveal 
              key={idx} 
              delay={idx * 0.1} 
              className={`text-center relative ${
                idx % 2 !== 0 ? '' : 'sm:border-r border-white/5'
              } ${
                idx < 3 ? 'lg:border-r border-white/5' : 'lg:border-r-0'
              }`}
            >
              <div className="px-4">
                <div className="font-cormorant text-5xl md:text-6xl lg:text-[84px] font-light text-[#C1A472] mb-4">
                  {inView ? (
                    <CountUp
                      end={stat.number}
                      duration={2.5}
                      separator=","
                      suffix={stat.suffix || ''}
                    />
                  ) : (
                    '0'
                  )}
                </div>
                <div className="w-[40px] h-[1px] bg-white/20 mx-auto mb-6" />
                <p className="font-lato text-[11px] uppercase tracking-[0.5em] text-white/50">
                  {stat.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
