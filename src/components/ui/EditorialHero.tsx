'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface EditorialHeroProps {
  title: string
  subtitle?: string
  image: string
  overlayGlow?: boolean
}

export function EditorialHero({ title, subtitle, image, overlayGlow = true }: EditorialHeroProps) {
  return (
    <div className="w-full bg-white">
      {/* Cinematic Banner */}
      <div className="relative w-full aspect-[21/9] md:aspect-[3/1] max-h-[550px] overflow-hidden group">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full h-full"
        >
          <Image
            src={image}
            alt={title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>

        {/* The Luxury Glow - Radial Gradient Overlay */}
        {overlayGlow && (
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, transparent 20%, rgba(255,255,255,0.15) 100%)',
              boxShadow: 'inset 0 0 120px rgba(255,255,255,0.4)'
            }}
          />
        )}

        {/* Scroll Down Indicator - Refined Vertical Style */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 right-12 z-10 flex flex-col items-center gap-6"
        >
          <div className="flex flex-col items-center gap-4">
            <span 
              className="text-[10px] text-white/70 uppercase tracking-[0.4em] font-light"
              style={{ writingMode: 'vertical-rl' }}
            >
              Scroll to begin
            </span>
            <div className="w-[1px] h-24 bg-white/20 relative overflow-hidden">
              <motion.div 
                animate={{ 
                  y: [-100, 100],
                }}
                transition={{ 
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute top-0 left-0 w-full h-1/2 bg-[#C9A96E]"
              />
            </div>
          </div>
        </motion.div>
        
        {/* Subtle Bottom Fade to White Page */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* Editorial Content Below Banner */}
      <section className="py-8 md:py-16 text-center">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-cormorant text-3xl md:text-[54px] font-normal text-[#1A1A1A] leading-tight mb-4 uppercase tracking-[0.25em]">
              {title}
            </h1>
            <div className="w-16 h-[1px] bg-[#C9A96E] mx-auto mb-6" />
            
            {subtitle && (
              <p className="font-lato text-sm md:text-[15px] font-light text-[#555555] max-w-2xl mx-auto leading-relaxed tracking-wider uppercase">
                {subtitle}
              </p>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
