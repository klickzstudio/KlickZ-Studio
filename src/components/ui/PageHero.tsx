'use client'

import { motion } from 'framer-motion'

interface PageHeroProps {
  title: string
  subtitle?: string
  backgroundImage?: string
}

export function PageHero({ title, subtitle, backgroundImage }: PageHeroProps) {
  const bgStyle = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : {}

  return (
    <section
      className="relative h-[60vh] min-h-[400px] bg-[#0A0A0A] flex items-center justify-center"
      style={bgStyle}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80" />
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="font-cormorant text-4xl md:text-6xl lg:text-7xl font-light text-white mb-4">
            {title}
          </h1>
          <div className="w-[60px] h-[1px] bg-[#C9A96E] mx-auto my-4" />
          {subtitle && (
            <p className="font-lato text-base font-light text-white/75 mt-4 max-w-xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
