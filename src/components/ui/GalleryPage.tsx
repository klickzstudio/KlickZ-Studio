'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { PageHero } from '@/components/ui/PageHero'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

interface GalleryImage {
  src: string
  alt: string
}

interface GalleryPageProps {
  title: string
  subtitle: string
  description: string
  images: GalleryImage[]
}

const defaultWeddingImages: GalleryImage[] = [
  { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', alt: 'Wedding photography 1' },
  { src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80', alt: 'Wedding photography 2' },
  { src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80', alt: 'Wedding photography 3' },
  { src: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80', alt: 'Wedding photography 4' },
  { src: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&q=80', alt: 'Wedding photography 5' },
  { src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80', alt: 'Wedding photography 6' },
  { src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80', alt: 'Wedding photography 7' },
  { src: 'https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?w=800&q=80', alt: 'Wedding photography 8' },
  { src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80', alt: 'Wedding photography 9' },
]

export function GalleryPage({ title, subtitle, description, images }: GalleryPageProps) {
  const displayImages = images.length > 0 ? images : defaultWeddingImages

  return (
    <>
      <PageHero
        title={title}
        subtitle={subtitle}
        backgroundImage="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80"
      />

      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <ScrollReveal className="text-center max-w-3xl mx-auto mb-16">
            <p className="font-lato text-base font-light text-[#555555] leading-[1.8]">
              {description}
            </p>
          </ScrollReveal>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
            {displayImages.map((img, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.05}>
                <motion.div
                  className="mb-4 break-inside-avoid overflow-hidden group cursor-pointer"
                  whileHover={{ scale: 1 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={800}
                      height={idx % 3 === 0 ? 1000 : idx % 2 === 0 ? 700 : 500}
                      className="w-full h-auto object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </motion.div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
