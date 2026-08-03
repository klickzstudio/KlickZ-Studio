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
  stats?: Stat[]
}

const defaultTrustFeatures = [
  {
    title: 'Award-Winning Excellence',
    description: 'Recognized for artistic excellence across multiple photography genres with a portfolio of stunning work.',
  },
  {
    title: 'Diverse Expertise',
    description: 'Specialized in candid weddings, pre-wedding films, lifestyle events, newborn portraits, and commercial projects.',
  },
  {
    title: 'Professional Delivery',
    description: 'High-resolution files delivered promptly, edited to perfection, ready for high-end print or digital display.',
  },
  {
    title: 'Personalized Approach',
    description: 'Custom packages tailored to your vision, with dedicated consultation and flexible booking options.',
  },
]

export function StatsCounterClient({ stats }: StatsCounterClientProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  // 3 prominent counters like the reference screenshot
  const displayStats = [
    { number: 500, suffix: '+', label: 'Happy Clients' },
    { number: 20, suffix: '+', label: 'Years Experience' },
    { number: 99, suffix: '%', label: 'Client Satisfaction' },
  ]

  return (
    <section className="py-20 md:py-28 bg-[#FAFAFA] text-[#1A1A1A]" ref={ref}>
      <div className="max-w-[1280px] mx-auto px-6">

        {/* Section Header */}
        <ScrollReveal className="text-center mb-14">
          <h2 className="font-cormorant text-3xl md:text-5xl font-bold text-[#1A1A1A] tracking-tight">
            Why Clients Trust KLICKZSTUDIO
          </h2>
        </ScrollReveal>

        {/* 4 Feature Cards (2x2 Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {defaultTrustFeatures.map((feature, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1}>
              <div className="bg-[#F5F4F0] hover:bg-[#FAF8F3] border border-[#E8E4D9] rounded-xl p-6 md:p-8 flex items-start gap-4 transition-all duration-300 shadow-2xs h-full">
                <div className="w-8 h-8 rounded-full bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-cormorant text-xl font-bold text-[#1A1A1A] mb-2">
                    {feature.title}
                  </h3>
                  <p className="font-lato text-xs md:text-sm text-[#666666] leading-relaxed font-light">
                    {feature.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* 3 Stats Counter Cards (1x3 Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {displayStats.map((stat, idx) => (
            <ScrollReveal key={idx} delay={0.3 + idx * 0.1}>
              <div className="bg-[#F5F4F0] border border-[#E8E4D9] rounded-xl p-6 text-center shadow-2xs">
                <div className="font-cormorant text-3xl md:text-4xl lg:text-5xl font-bold text-[#D97706] mb-2">
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
                <p className="font-lato text-xs uppercase tracking-wider text-[#666666] font-medium">
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

