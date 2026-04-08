'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { filmItems } from '@/data/films'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function FilmsGrid() {
  return (
    <section className="py-20 md:py-28 bg-[#0A0A0A]" id="films">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">

        <div className="columns-1 md:columns-2 gap-4 mt-12">
          {filmItems.map((film, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.05}>
              <Link href={film.href} className="group block mb-4 break-inside-avoid">
                <motion.div
                  className="relative overflow-hidden"
                  whileHover={{ scale: 1 }}
                >
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  >
                    <Image
                      src={film.image}
                      alt={film.title || 'Wedding Film'}
                      width={800}
                      height={idx % 3 === 0 ? 1000 : 600}
                      className="w-full h-auto object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-400 flex items-end">
                      <div className="p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                        {film.title && (
                          <p className="font-lato text-sm text-white font-light">{film.title}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

