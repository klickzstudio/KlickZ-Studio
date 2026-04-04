'use client'

import Image from 'next/image'
import { instagramPosts } from '@/data/instagram'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function InstagramFeed() {
  return (
    <section className="py-20 md:py-28 bg-[#F9F6F2]" id="instagram">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <SectionTitle title="Follow Us on Instagram" />

        <div className="text-center mb-10">
          <a
            href="https://www.instagram.com/AinZStudio/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-lato text-[14px] text-[#C9A96E] hover:underline transition-colors"
          >
            @AinZStudio
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {instagramPosts.map((post, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.05}>
              <a
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden block"
              >
                <Image
                  src={post.image}
                  alt={`Instagram post ${idx + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
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
            href="https://www.instagram.com/AinZStudio/"
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
