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
    <section className="py-24 md:py-36 bg-[#FDFCFB] border-y border-[#F9F6F2]" id="stats" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-16 gap-x-8">
          {stats.slice(0, 4).map((stat, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1} className="text-center group">
              <div className="font-cormorant text-5xl md:text-6xl lg:text-[72px] font-light text-[#1A1A1A] mb-4 transition-colors duration-500 group-hover:text-[#C9A96E]">
                {inView ? (
                  <CountUp
                    end={stat.number}
                    duration={3}
                    separator=","
                    suffix={stat.suffix || ''}
                  />
                ) : (
                  '0'
                )}
              </div>
              <div className="w-[30px] h-[1px] bg-[#C9A96E]/30 mx-auto mb-4 transition-all duration-500 group-hover:w-[50px] group-hover:bg-[#C9A96E]" />
              <p className="font-lato text-[11px] uppercase tracking-[0.3em] text-[#888888] group-hover:text-[#555] transition-colors duration-500">
                {stat.label}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

