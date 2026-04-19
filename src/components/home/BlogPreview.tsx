'use client'

import Image from 'next/image'
import Link from 'next/link'
import { blogPosts } from '@/data/blog-posts'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function BlogPreview() {
  return (
    <section className="py-20 md:py-28 bg-white" id="blog">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <SectionTitle
          title="Read our Blog"
          subtitle="Inspiration, Stories & Tips for Your Big Day"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {blogPosts.map((post, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.12}>
              <Link href={post.href} className="group block">
                <div className="relative aspect-square overflow-hidden mb-5 bg-[#F9F6F2]">
                  {post.image && (
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-600 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  )}
                  {!post.image && (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="font-lato text-[12px] text-[#888]">Inspiration coming soon</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-lato text-[11px] uppercase text-[#C9A96E] tracking-[0.1em]">
                    {post.category}
                  </span>
                  <span className="text-[#888888] text-[11px]">•</span>
                  <span className="font-lato text-[12px] font-light text-[#888888]">
                    {post.author}
                  </span>
                </div>
                <h3 className="font-cormorant text-[22px] font-medium text-[#1A1A1A] group-hover:text-[#C9A96E] transition-colors duration-300 leading-snug mb-2">
                  {post.title}
                </h3>
                <p className="font-lato text-[14px] font-light text-[#555555] leading-relaxed mb-3">
                  {post.excerpt}
                </p>
                <span className="font-lato text-[12px] uppercase tracking-[0.1em] text-[#C9A96E] hover-gold-underline">
                  Read More
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

