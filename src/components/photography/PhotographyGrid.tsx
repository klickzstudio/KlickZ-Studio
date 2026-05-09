'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import type { PhotographyImage } from '@/data/photography'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'

import { urlForImage } from '@/sanity/lib/image'

export function PhotographyGrid({ images }: { images: PhotographyImage[] }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <>
      <section className="py-12 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {images.map((item, idx) => {
              const imageUrl = item.imageObj ? urlForImage(item.imageObj)?.url() : item.image;
              
              return (
                <ScrollReveal key={idx} delay={(idx % 4) * 0.1}>
                  <div 
                    className="relative group cursor-pointer overflow-hidden break-inside-avoid"
                    onClick={() => setSelectedImage(item.image)}
                  >
                    <motion.div
                      className="relative w-full"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                      <Image
                        src={imageUrl as string}
                        alt={item.altText || item.title || 'Photography image'}
                        width={800}
                        height={1200}
                        className="w-full h-auto object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white bg-black/50 backdrop-blur-sm px-4 py-2 text-xs font-lato tracking-widest uppercase opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        View
                      </span>
                    </div>
                  </motion.div>
                </div>
              </ScrollReveal>
            )
          })}
          </div>
        </div>
      </section>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
          >
            <button 
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[101]"
              onClick={() => setSelectedImage(null)}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-5xl aspect-[3/2] md:aspect-auto md:h-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Enlarged view"
                fill
                className="object-contain"
                sizes="100vw"
                quality={100}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
