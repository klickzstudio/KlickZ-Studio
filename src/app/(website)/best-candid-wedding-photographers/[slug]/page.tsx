import { client } from '@/sanity/lib/client'
import { portfolioCaseStudyQuery } from '@/sanity/lib/queries'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const caseStudy = await client.fetch(portfolioCaseStudyQuery, { slug: params.slug })
  
  if (!caseStudy) {
    return { title: 'Not Found' }
  }

  return {
    title: `${caseStudy.title} | KLICKZSTUDIO`,
    description: `View the beautiful moments from ${caseStudy.clientName || caseStudy.title}'s special day captured by KLICKZSTUDIO.`,
    openGraph: {
      images: [{ url: caseStudy.image }],
    }
  }
}

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  const caseStudy = await client.fetch(portfolioCaseStudyQuery, { slug: params.slug })

  if (!caseStudy) {
    notFound()
  }

  // If there's an external href, we typically wouldn't hit this page, but as a fallback:
  if (caseStudy.href) {
    return (
      <main className="pt-32 pb-24 text-center min-h-[50vh] flex flex-col items-center justify-center">
        <h1 className="text-2xl mb-4">You are being redirected...</h1>
        <a href={caseStudy.href} className="text-[#C9A96E] hover:underline">Click here if not redirected</a>
      </main>
    )
  }

  return (
    <main className="bg-[#F8F4EE] min-h-screen">
      <JsonLd 
        type="ImageGallery" 
        data={{
          title: caseStudy.title,
          description: `Gallery for ${caseStudy.title}`,
          slug: caseStudy.slug,
          images: caseStudy.gallery || [caseStudy.image]
        }}
      />
      {/* Hero Header */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 lg:px-10 max-w-[1200px] mx-auto text-center">
        <div className="flex items-center justify-center gap-2 font-lato text-[11px] uppercase tracking-[0.2em] text-[#C9A96E] mb-6">
          {caseStudy.clientName && <span>{caseStudy.clientName}</span>}
          {caseStudy.clientName && caseStudy.date && <span className="w-1 h-1 rounded-full bg-[#C9A96E]/50" />}
          {caseStudy.date && <span>{new Date(caseStudy.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>}
        </div>
        <h1 className="font-cormorant text-5xl md:text-7xl text-[#2B2420] mb-8 leading-tight">
          {caseStudy.title}
        </h1>
        {caseStudy.categories && caseStudy.categories.length > 0 && (
          <div className="font-lato text-[13px] text-[#555555] tracking-widest uppercase">
            {caseStudy.categories.join(' · ')}
          </div>
        )}
      </section>

      {/* Main Image */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 mb-20 md:mb-32">
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={caseStudy.image}
            alt={caseStudy.title}
            fill
            sizes="(max-width: 1400px) 100vw, 1400px"
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Story section */}
      {caseStudy.story && (
        <section className="max-w-[800px] mx-auto px-6 lg:px-10 mb-20 md:mb-32">
          <div className="prose prose-lg prose-p:text-[#555555] prose-p:font-light prose-p:leading-[2] prose-headings:font-cormorant prose-strong:text-[#2B2420] mx-auto text-center font-lato">
            <PortableText value={caseStudy.story} />
          </div>
        </section>
      )}

      {/* Gallery Grid */}
      {caseStudy.gallery && caseStudy.gallery.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-6 lg:px-10 mb-32">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {caseStudy.gallery.map((img: string, idx: number) => (
              <div key={idx} className="relative w-full break-inside-avoid">
                <Image
                  src={img}
                  alt={`${caseStudy.title} Gallery Image ${idx + 1}`}
                  width={800}
                  height={1200}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Final CTA Back to Portfolio */}
      <section className="text-center pb-32">
        <Link
          href="/best-candid-wedding-photographers"
          className="inline-block font-lato text-[12px] uppercase tracking-[0.2em] border-b border-[#C9A96E] text-[#2B2420] pb-1 hover:text-[#C9A96E] transition-colors"
        >
          Back to Portfolio
        </Link>
      </section>
    </main>
  )
}
