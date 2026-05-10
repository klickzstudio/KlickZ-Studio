'use client'

import React, { useState, useEffect } from 'react'
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
  const [columnCount, setColumnCount] = useState(1)

  useEffect(() => {
    const updateColumns = () => {
      if (typeof window === 'undefined') return
      if (window.innerWidth >= 1024) setColumnCount(3)
      else if (window.innerWidth >= 768) setColumnCount(2)
      else setColumnCount(1)
    }
    updateColumns()
    window.addEventListener('resize', updateColumns)
    return () => window.removeEventListener('resize', updateColumns)
  }, [])

  if (!items || items.length === 0) return null

  // Optimized Centered Column Distribution
  const actualColumnCount = Math.min(columnCount, items.length)
  const columns: GalleryItem[][] = Array.from({ length: actualColumnCount }, () => [])
  const columnHeights = new Array(actualColumnCount).fill(0)

  items.forEach((item, idx) => {
    // Estimate height based on aspectRatio string (e.g. "3/4")
    const parts = item.aspectRatio.split('/')
    const aspectValue = parts.length === 2 ? parseInt(parts[0]) / parseInt(parts[1]) : 1
    const relativeHeight = 1 / aspectValue
    
    let shortestIndex = 0
    for (let i = 1; i < actualColumnCount; i++) {
      if (columnHeights[i] < columnHeights[shortestIndex]) {
        shortestIndex = i
      }
    }
    
    columns[shortestIndex].push(item)
    columnHeights[shortestIndex] += relativeHeight
  })

  return (
    <section className="bg-white py-12 md:py-24">
      <div className="max-w-[1700px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-center gap-10 md:gap-16">
          {columns.map((column, colIdx) => (
            <div key={colIdx} className="flex-1 flex flex-col gap-10 md:gap-16 max-w-[550px]">
              {column.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <div className="relative group overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.alt || `Gallery image ${index + 1}`}
                      width={1200}
                      height={1600}
                      className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.01]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
