import { client } from '@/sanity/lib/client'
import { pageSEOQuery } from '@/sanity/lib/queries'
import { Metadata } from 'next'
import { constructMetadata } from '@/lib/seo'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await client.fetch(pageSEOQuery, { slug: 'awards' })

  if (seoData) {
    return constructMetadata({
      title: seoData.title,
      description: seoData.seoDescription,
      image: seoData.ogImage,
    })
  }

  return constructMetadata({ title: 'Awards & Recognition' })
}

export default async function AwardsPage() {
  const pageData = await client.fetch(pageSEOQuery, { slug: 'awards' }, { next: { revalidate: 60 } })

  return (
    <main className="pt-32 pb-24 min-h-screen bg-[#F8F4EE]">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-10 text-center mb-16 md:mb-24">
        <span className="font-lato text-[11px] uppercase tracking-[0.4em] text-[#C9A96E] mb-4 block">
          Recognition
        </span>
        <h1 className="font-cormorant text-5xl md:text-6xl lg:text-[72px] text-[#2B2420] mb-6 leading-tight">
          {pageData?.title || 'Awards & Excellence'}
        </h1>
        {pageData?.subtitle && (
          <p className="font-lato text-sm md:text-base text-[#555555] max-w-2xl mx-auto uppercase tracking-widest">
            {pageData.subtitle}
          </p>
        )}
      </div>

      <div className="max-w-[800px] mx-auto px-6 lg:px-10 mb-24">
        {pageData?.content ? (
          <div className="prose prose-lg prose-p:text-[#555555] prose-p:font-light prose-p:leading-[2] prose-headings:font-cormorant prose-strong:text-[#2B2420] mx-auto font-lato text-justify md:text-center">
            <PortableText value={pageData.content} />
          </div>
        ) : (
          <div className="prose prose-lg prose-p:text-[#555555] prose-p:font-light prose-p:leading-[2] prose-headings:font-cormorant prose-strong:text-[#2B2420] mx-auto font-lato text-center">
             <p>Our commitment to storytelling, aesthetic brilliance, and raw emotion has been recognized by top wedding and photography collectives worldwide.</p>
          </div>
        )}
      </div>

      <div className="max-w-[1000px] mx-auto px-6 lg:px-10 mb-24 text-center">
        {/* Decorative Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
           {/* Placeholder for Awards logos */}
           <div><p className="font-cormorant text-2xl text-[#2B2420]">Fearless Photographers</p></div>
           <div><p className="font-cormorant text-2xl text-[#2B2420]">WeddingSutra</p></div>
           <div><p className="font-cormorant text-2xl text-[#2B2420]">WIPA</p></div>
           <div><p className="font-cormorant text-2xl text-[#2B2420]">Junebug Weddings</p></div>
        </div>
      </div>
    </main>
  )
}
