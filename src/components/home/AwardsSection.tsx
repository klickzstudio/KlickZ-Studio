'use client'

import Link from 'next/link'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function AwardsSection() {
  return (
    <section className="relative py-20 md:py-28 bg-[#0A0A0A] overflow-hidden" id="awards">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <h1 className="font-cormorant text-5xl md:text-[72px] font-light text-white mb-8 leading-tight">
              Awards
            </h1>
            <p className="font-lato text-[15px] font-light text-white/80 leading-[1.9] mb-8">
              AinZ Studio is a proud member of International Wedding Photography fraternities
              like Fearless Photographers & WPPI. We are South India&apos;s Brand Ambassador of
              FujiFilm X-series camera. AinZ Studio have won many accolades like, 2 Fearless
              awards in Collection 50, competing with top photographers around the world, Winner
              of &quot;Behind the Scene&quot; category - Canon Wedding photographer of the year 2017-18
            </p>
            <Link
              href="/awards"
              className="inline-block font-lato text-[13px] uppercase tracking-[0.15em] text-[#C9A96E] hover-gold-underline"
            >
              Read more
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="hidden lg:block">
            <div className="relative aspect-[4/3] rounded overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent z-10" />
              <div className="w-full h-full bg-[#1A1A1A] flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="flex items-center justify-center gap-8 flex-wrap">
                    <div className="text-center">
                      <div className="w-16 h-16 border border-[#C9A96E]/40 rounded-full flex items-center justify-center mb-2 mx-auto">
                        <svg className="w-8 h-8 text-[#C9A96E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      </div>
                      <p className="font-lato text-[11px] uppercase tracking-[0.15em] text-white/60">Fearless</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 border border-[#C9A96E]/40 rounded-full flex items-center justify-center mb-2 mx-auto">
                        <svg className="w-8 h-8 text-[#C9A96E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="font-lato text-[11px] uppercase tracking-[0.15em] text-white/60">WPPI</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 border border-[#C9A96E]/40 rounded-full flex items-center justify-center mb-2 mx-auto">
                        <svg className="w-8 h-8 text-[#C9A96E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <p className="font-lato text-[11px] uppercase tracking-[0.15em] text-white/60">Canon</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 border border-[#C9A96E]/40 rounded-full flex items-center justify-center mb-2 mx-auto">
                        <svg className="w-8 h-8 text-[#C9A96E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      </div>
                      <p className="font-lato text-[11px] uppercase tracking-[0.15em] text-white/60">FujiFilm</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
