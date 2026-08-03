'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import type { PhotographyImage } from '@/data/photography'
import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'

import { urlForImage } from '@/sanity/lib/image'
import { ROUTES } from '@/config/routes'

export function PhotographyGrid({ images }: { images: PhotographyImage[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [direction, setDirection] = useState(0) // 1 for next, -1 for prev

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (selectedIndex !== null) {
      setDirection(1)
      setSelectedIndex((selectedIndex + 1) % images.length)
    }
  }

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (selectedIndex !== null) {
      setDirection(-1)
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'Escape') setSelectedIndex(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex])

  const currentImage = selectedIndex !== null ? images[selectedIndex] : null
  const currentImageUrl = currentImage?.imageObj ? urlForImage(currentImage.imageObj, 1920)?.url() : currentImage?.image

  const [columnCount, setColumnCount] = useState(3)

  useEffect(() => {
    const updateColumns = () => {
      if (typeof window === 'undefined') return
      if (window.innerWidth >= 1280) setColumnCount(3)
      else if (window.innerWidth >= 768) setColumnCount(2)
      else setColumnCount(1)
    }
    updateColumns()
    window.addEventListener('resize', updateColumns)
    return () => window.removeEventListener('resize', updateColumns)
  }, [])

  // Optimized Centered Column Distribution
  // Calculate how many columns we actually need based on image count
  const actualColumnCount = Math.min(columnCount, images.length)
  const columns: { item: PhotographyImage; originalIdx: number }[][] = Array.from({ length: actualColumnCount }, () => [])
  const columnHeights = new Array(actualColumnCount).fill(0)

  images.forEach((item, idx) => {
    const aspectRatio = item.dimensions?.aspectRatio || 1
    const relativeHeight = 1 / aspectRatio
    
    // Find shortest column
    let shortestIndex = 0
    for (let i = 1; i < actualColumnCount; i++) {
      if (columnHeights[i] < columnHeights[shortestIndex]) {
        shortestIndex = i
      }
    }
    
    columns[shortestIndex].push({ item, originalIdx: idx })
    columnHeights[shortestIndex] += relativeHeight
  })

  return (
    <>
      <section className="py-12 md:py-24 bg-white overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-12">
            {columns.map((column, colIdx) => (
              <div 
                key={colIdx} 
                className="flex-1 flex flex-col gap-8 md:gap-12 max-w-[500px]"
              >
                {column.map(({ item, originalIdx }, itemIdx) => {
                  const imageUrl = item.imageObj ? urlForImage(item.imageObj, 800)?.url() : item.image;
                  
                  return (
                    <ScrollReveal key={itemIdx} delay={itemIdx * 0.1}>
                      <div 
                        className="relative group cursor-pointer"
                        onClick={() => setSelectedIndex(originalIdx)}
                      >
                        <motion.div
                          className="relative w-full"
                          whileHover={{ scale: 1.01 }}
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                        >
                          <Image
                            src={imageUrl as string}
                            alt={item.altText || item.title || 'Photography image'}
                            width={1000}
                            height={1500}
                            className="w-full h-auto object-contain" // NO CROPPING
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          
                          <div className="absolute inset-0 bg-black/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Premium CTA Section - Centered Footer style */}
          <ScrollReveal delay={0.2} className="max-w-4xl mx-auto mt-24 md:mt-32">
            <div className="relative bg-[#F9F6F2] flex flex-col items-center justify-center text-center p-12 md:p-20 border border-[#F0EBE3] group">
              <span className="font-lato text-[10px] uppercase tracking-[0.5em] text-[#C9A96E] mb-6">
                The Signature Experience
              </span>
              <h3 className="font-cormorant text-3xl md:text-5xl text-black mb-10 leading-tight">
                Ready to Capture Your <span className="italic">Legacy?</span>
              </h3>
              <Link 
              href={ROUTES.BOOK_US}
              className="inline-block font-lato text-[11px] uppercase tracking-[0.2em] bg-white text-black px-10 py-4 hover:bg-[#C9A96E] hover:text-white transition-colors duration-400"
            >
              Book Your Date
            </Link>
              
              <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-[#C9A96E]/20" />
              <div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-[#C9A96E]/20" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {selectedIndex !== null && currentImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { setSelectedIndex(null); setDirection(0); }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10 select-none"
          >
            {/* Close Button */}
            <button 
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[101] p-2"
              onClick={() => { setSelectedIndex(null); setDirection(0); }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Navigation Arrows */}
            <button 
              className="absolute left-4 md:left-10 text-white/30 hover:text-white transition-all z-[101] p-4 group"
              onClick={handlePrev}
            >
              <motion.div whileHover={{ x: -5 }} className="flex items-center gap-2">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </motion.div>
            </button>

            <button 
              className="absolute right-4 md:right-10 text-white/30 hover:text-white transition-all z-[101] p-4 group"
              onClick={handleNext}
            >
              <motion.div whileHover={{ x: 5 }} className="flex items-center gap-2">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </motion.div>
            </button>

            {/* Image Container with Sliding Animation */}
            <motion.div
              key={selectedIndex}
              initial={{ x: direction > 0 ? 100 : direction < 0 ? -100 : 0, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction > 0 ? -100 : direction < 0 ? 100 : 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-6xl h-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[80vh]">
                <Image
                  src={currentImageUrl as string}
                  alt={currentImage.altText || currentImage.title || "Enlarged view"}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  quality={100}
                  priority
                />
              </div>
              
              {/* Image Info */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 text-center"
              >
                <p className="font-lato text-[10px] text-white/40 uppercase tracking-[0.3em]">
                  {selectedIndex + 1} / {images.length}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
