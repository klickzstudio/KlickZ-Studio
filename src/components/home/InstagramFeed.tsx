'use client'

import Image from 'next/image'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

interface InstagramPostData {
  title: string
  thumbnail: string
  instagramUrl: string
  isReel: boolean
  gridSize?: 'square' | 'portrait' | 'landscape'
}

interface InstagramFeedProps {
  posts?: InstagramPostData[]
}

function getGridClasses(gridSize?: string) {
  switch (gridSize) {
    case 'portrait':
      return 'row-span-2'
    case 'landscape':
      return 'col-span-2'
    default:
      return ''
  }
}

function getAspectClass(gridSize?: string) {
  return 'aspect-square' // Force square grid as requested
}

export function InstagramFeed({ posts = [] }: InstagramFeedProps) {
  if (posts.length === 0) return null

  return (
    <section className="py-20 md:py-28 bg-[#F9F6F2]" id="instagram">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <SectionTitle title="Follow Us on Instagram" />

        <div className="text-center mb-10">
          <a
            href="https://www.instagram.com/weddingby_klickzstudio/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-lato text-[14px] text-[#C9A96E] hover:underline transition-colors"
          >
            @weddingby_klickzstudio
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[1fr] gap-3">
          {posts.map((post, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.05}>
              <a
                href={post.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative overflow-hidden block h-full ${getAspectClass(post.gridSize)}`}
              >
                {post.thumbnail ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={post.thumbnail}
                      alt={post.title || `Instagram post ${idx + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full bg-[#EEE] flex items-center justify-center">
                    <span className="font-lato text-[10px] text-[#888]">Follow us for more</span>
                  </div>
                )}
                
                {/* Reel Icon Overlay */}
                {post.isReel && (
                  <div className="absolute top-3 right-3 z-10 text-white drop-shadow-md">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path d="M7 4h10a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3z" />
                      <path d="M7 4l3 3M17 4l-3 3M10 20l-3-3M14 20l3-3M4 10h16M4 14h16" />
                    </svg>
                  </div>
                )}

                <div className="absolute inset-0 bg-[#C9A96E]/0 group-hover:bg-[#C9A96E]/20 transition-all duration-400 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                  </svg>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="https://www.instagram.com/weddingby_klickzstudio/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-lato text-[13px] uppercase tracking-[0.15em] border border-[#1A1A1A] text-[#1A1A1A] px-8 py-3.5 hover:bg-[#1A1A1A] hover:text-white transition-all duration-400"
          >
            Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  )
}
