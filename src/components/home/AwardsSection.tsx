'use client'

import Link from 'next/link'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { ROUTES } from '@/config/routes'

export function AwardsSection() {
  const awards = [
    { label: 'Fearless', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
    { label: 'WPPI', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: 'Canon', icon: 'M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z' },
    { label: 'FujiFilm', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
  ]

  return (
    <section className="relative py-24 md:py-36 bg-[#0A0A0A] overflow-hidden" id="awards">
      {/* Decorative background element */}
      <div className="absolute right-0 top-0 w-1/3 h-full bg-[#111] -skew-x-12 translate-x-1/2 pointer-events-none opacity-50" />
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
          <div className="max-w-xl">
            <ScrollReveal>
              <span className="font-lato text-[11px] uppercase tracking-[0.4em] text-[#C9A96E] mb-6 block">
                Acclaimed Worldwide
              </span>
              <h1 className="font-cormorant text-5xl md:text-[68px] font-normal text-white mb-10 leading-tight">
                Honored to <br /><span className="italic pl-12 text-[#C9A96E]/80">Lead the Industry.</span>
              </h1>
              <div className="w-[100px] h-[1px] bg-[#C9A96E]/40 mb-10" />
              <p className="font-lato text-[16px] font-light text-white/60 leading-[2] mb-10">
                KLICKZSTUDIO is a proud member of International Wedding Photography fraternities
                like Fearless Photographers & WPPI. We are South India&apos;s Brand Ambassador of
                FujiFilm X-series camera, competing with top photographers around the world to capture the extraordinary.
              </p>
              <Link
                href={ROUTES.ABOUT}
                className="group inline-flex items-center gap-4 font-lato text-[12px] uppercase tracking-[0.2em] text-[#C9A96E]"
              >
                <span>Discover All Accolades</span>
                <span className="w-8 h-[1px] bg-[#C9A96E] transition-all duration-300 group-hover:w-12" />
              </Link>
            </ScrollReveal>
          </div>

          <div className="w-full lg:w-auto">
            <ScrollReveal delay={0.2}>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-6 md:gap-10">
                {awards.map((award, idx) => (
                  <div 
                    key={idx} 
                    className="group relative p-10 border border-white/5 bg-white/[0.02] flex flex-col items-center justify-center transition-all duration-500 hover:border-[#C9A96E]/30 hover:bg-white/[0.04]"
                  >
                    <div className="mb-6 transform transition-transform duration-500 group-hover:scale-110">
                      <svg className="w-10 h-10 text-[#C9A96E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d={award.icon} />
                      </svg>
                    </div>
                    <p className="font-lato text-[10px] uppercase tracking-[0.3em] text-white/40 group-hover:text-white/80 transition-colors duration-500 text-center">
                      {award.label}
                    </p>
                    
                    {/* Small corner detail */}
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#C9A96E]/0 group-hover:border-[#C9A96E]/40 transition-all duration-500" />
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}

