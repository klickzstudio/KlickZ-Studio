'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GalleryItem {
  image: string
  aspectRatio: string
  alt?: string
}

interface EditorialGalleryProps {
  items: GalleryItem[]
}

export function EditorialGallery({ items }: EditorialGalleryProps) {
  if (!items || items.length === 0) return null

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="max-w-[1700px] mx-auto px-6 lg:px-12">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {items.map((item, index) => {
            // Map aspect ratio string to tailwind aspect class
            const aspectClass = {
              '3/4': 'aspect-[3/4]',
              '4/3': 'aspect-[4/3]',
              '16/9': 'aspect-[16/9]',
              '1/1': 'aspect-square',
            }[item.aspectRatio] || 'aspect-[4/3]'

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="break-inside-avoid"
              >
                <div className={cn(
                  "relative w-full overflow-hidden bg-gray-50 group",
                  aspectClass
                )}>
                  <Image
                    src={item.image}
                    alt={item.alt || `Gallery image ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Subtle hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
