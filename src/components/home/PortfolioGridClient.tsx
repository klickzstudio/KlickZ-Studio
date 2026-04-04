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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {initialItems.map((item, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1}>
              <Link href={item.href} className="group block">
                <motion.div
                  className="relative aspect-[2/1] overflow-hidden mb-5"
                  whileHover={{ scale: 1 }}
                >
                  <motion.div
                    className="relative w-full h-full"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </motion.div>
                </motion.div>
                <div className="flex items-center gap-3 mb-2">
                  {item.categories.map((cat, catIdx) => (
                    <span key={catIdx} className="flex items-center gap-3">
                      {catIdx > 0 && (
                        <span className="text-[#C9A96E] text-[11px]">|</span>
                      )}
                      <CategoryBadge label={cat} />
                    </span>
                  ))}
                </div>
                <h3 className="font-cormorant text-[22px] font-normal text-[#1A1A1A] group-hover:text-[#C9A96E] transition-colors duration-300 leading-snug">
                  {item.title}
                </h3>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
