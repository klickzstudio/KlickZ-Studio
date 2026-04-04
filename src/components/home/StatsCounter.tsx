'use client'

import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import { stats } from '@/data/stats'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function StatsCounter() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  return (
    <section className="py-20 md:py-28 bg-[#F9F6F2]" id="stats" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-4">
          {stats.map((stat, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1} className="text-center">
              <div className="font-cormorant text-5xl md:text-6xl lg:text-[72px] font-bold text-[#C9A96E] mb-3">
                {inView ? (
                  <CountUp
                    end={stat.number}
                    duration={2.5}
                    separator=","
                    suffix={stat.suffix || ''}
                    easingFn={(t, b, c, d) => {
                      // easeOutCubic
                      t /= d
                      t--
                      return c * (t * t * t + 1) + b
                    }}
                  />
                ) : (
                  '0'
                )}
              </div>
              <p className="font-lato text-[12px] uppercase tracking-[0.2em] text-[#888888]">
                {stat.label}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
