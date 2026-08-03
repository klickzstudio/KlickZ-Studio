import { client } from '@/sanity/lib/client'
import { pageSEOQuery } from '@/sanity/lib/queries'
import { Metadata } from 'next'
import { constructMetadata } from '@/lib/seo'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await client.fetch(pageSEOQuery, { slug: 'services' })

  if (seoData) {
    return constructMetadata({
      title: seoData.title,
      description: seoData.seoDescription,
      image: seoData.ogImage,
    })
  }

  return constructMetadata({ title: 'Our Services' })
}

export default async function ServicesPage() {
  const pageData = await client.fetch(pageSEOQuery, { slug: 'services' }, { next: { revalidate: 60 } })

  return (
    <main className="pt-32 pb-24 min-h-screen bg-[#F8F4EE]">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-10 text-center mb-16 md:mb-24">
        <span className="font-lato text-[11px] uppercase tracking-[0.4em] text-[#C9A96E] mb-4 block">
          Our Expertise
        </span>
        <h1 className="font-cormorant text-5xl md:text-6xl lg:text-[72px] text-[#2B2420] mb-6 leading-tight">
          {pageData?.title || 'Bespoke Photography & Cinematography'}
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
             <p>From intimate engagements to grand destination weddings, we offer comprehensive visual coverage tailored to you. Our core services include candid wedding photography, cinematic wedding films, pre-wedding couple shoots, and traditional coverage.</p>
          </div>
        )}
      </div>

      {pageData?.editorialGallery && pageData.editorialGallery.length > 0 && (
         <div className="max-w-[1400px] mx-auto px-6 lg:px-10 mb-20 md:mb-32 columns-1 md:columns-2 gap-8">
            {pageData.editorialGallery.map((item: any, idx: number) => (
              <div key={idx} className="relative w-full break-inside-avoid mb-8">
                  <Image
                    src={item.image}
                    alt={item.alt || `Service image ${idx + 1}`}
                    width={800}
                    height={1000}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="w-full h-auto object-cover"
                  />
              </div>
            ))}
         </div>
      )}
    </main>
  )
}
