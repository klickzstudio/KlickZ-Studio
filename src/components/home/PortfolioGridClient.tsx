'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { PortfolioItem } from '@/types'
import { CategoryBadge } from '@/components/ui/CategoryBadge'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function PortfolioGrid({ initialItems }: { initialItems: PortfolioItem[] }) {
  return (
    <section className="py-20 md:py-28 bg-[#F9F6F2]" id="portfolio">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <ScrollReveal className="text-center mb-14">
          <h2 className="font-cormorant text-3xl md:text-[42px] font-normal text-[#1A1A1A] leading-tight mb-4">
            Our Portfolio
          </h2>
          <div className="section-divider" />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {initialItems
            .map((item, idx) => {
              // Map legacy URLs to new SEO slugs
              let safeHref = item.href
              if (safeHref === '/wedding') safeHref = '/best-candid-wedding-photography-chennai'
              if (safeHref === '/pre-wedding-photography') safeHref = '/best-pre-wedding-photographers-in-chennai'
              if (safeHref === '/post-wedding-photography') safeHref = '/best-pre-wedding-photographers-in-chennai'
              
              return (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <Link href={safeHref} className="group block">
                  <motion.div
                    className={`relative overflow-hidden mb-6 ${
                      idx % 3 === 0 ? 'aspect-[16/10]' : 'aspect-square md:aspect-[4/5]'
                    } shadow-sm`}
                    whileHover={{ scale: 1 }}
                  >
                    <motion.div
                      className="relative w-full h-full"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                    </motion.div>
                  </motion.div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      {item.categories.map((cat, catIdx) => (
                        <span key={catIdx} className="flex items-center gap-3">
                          {catIdx > 0 && (
                            <span className="text-[#C9A96E] text-[10px] opacity-40">•</span>
                          )}
                          <span className="font-lato text-[11px] uppercase tracking-[0.2em] text-[#C9A96E]">
                            {cat}
                          </span>
                        </span>
                      ))}
                    </div>
                    <h3 className="font-cormorant text-2xl md:text-[28px] font-normal text-[#1A1A1A] group-hover:text-[#C9A96E] transition-colors duration-500 leading-tight">
                      {item.title}
                    </h3>
                    <p className="font-lato text-[13px] text-[#888] uppercase tracking-[0.1em] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      View Gallery —
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            )})}
        </div>
      </div>
    </section>
  )
}

