import Image from 'next/image'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { pageSEOQuery } from '@/sanity/lib/queries'
import { constructMetadata } from '@/lib/seo'
import { EditorialHero } from '@/components/ui/EditorialHero'
import { EditorialGallery } from '@/components/photography/EditorialGallery'
import { PortableText } from 'next-sanity'

const pageSlug = 'best-wedding-photographers-in-chennai'

export async function generateMetadata(): Promise<Metadata> {
  let seoData = null
  try {
    seoData = await client.fetch(pageSEOQuery, { slug: pageSlug })
  } catch (error) {
    console.error('Failed to fetch SEO metadata for about-us:', error)
  }

  if (seoData) {
    return constructMetadata({
      title: seoData.title,
      description: seoData.seoDescription,
      image: seoData.ogImage,
    })
  }

  return constructMetadata({
    title: 'About Us - Best Wedding Photographers Chennai',
    description: 'Learn about KLICKZSTUDIO — award-winning wedding photographers in Chennai with 15+ years of experience and 500+ weddings captured.',
  })
}

export default async function AboutUsPage() {
  const pageData = await client.fetch(pageSEOQuery, { slug: pageSlug })
  
  const heroImage = pageData?.heroImage || ''
  const title = pageData?.title || 'About Us'
  const subtitle = pageData?.subtitle || 'The story behind the lens'

  return (
    <>
      <EditorialHero
        title={title}
        subtitle={subtitle}
        image={heroImage}
      />

      <section className="py-20 md:py-28 bg-white border-b border-[#F9F6F2]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              {pageData?.content ? (
                <div className="prose prose-lg prose-headings:font-cormorant prose-p:font-lato prose-p:font-light prose-p:text-[#555] max-w-none">
                  <PortableText value={pageData.content} />
                </div>
              ) : (
                <>
                  <h2 className="font-cormorant text-3xl md:text-[42px] font-normal text-[#1A1A1A] leading-tight mb-6">
                    We are KLICKZSTUDIO
                  </h2>
                  <div className="w-[60px] h-[1px] bg-[#C9A96E] mb-6" />
                  <p className="font-lato text-base font-light text-[#555555] leading-[1.8] mb-6">
                    KLICKZSTUDIO is one of India&apos;s leading wedding photography companies, founded by
                    <strong className="font-semibold text-[#1A1A1A]"> Mohammed Habi bur Rahman N</strong> with a
                    passion for storytelling through the lens.
                  </p>
                  <p className="font-lato text-base font-light text-[#555555] leading-[1.8] mb-6">
                    Based in Chennai and Coimbatore, our team of passionate photographers and filmmakers
                    travel across India and the world to document the most beautiful wedding stories.
                  </p>
                  <p className="font-lato text-base font-light text-[#555555] leading-[1.8]">
                    Our approach combines candid storytelling with artistic finesse — capturing real emotions,
                    genuine laughter, and those fleeting moments of joy.
                  </p>
                </>
              )}
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="relative aspect-[4/5] overflow-hidden group bg-[#F9F6F2]">
                {pageData?.heroImage ? (
                  <Image
                    src={pageData.heroImage}
                    alt="KLICKZSTUDIO brand image"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-lato text-[12px] text-[#888]">Authentic Memories</span>
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Dynamic Editorial Gallery */}
      {pageData?.editorialGallery && pageData.editorialGallery.length > 0 && (
        <EditorialGallery items={pageData.editorialGallery} />
      )}

      {/* Philosophy Section */}
      <section className="py-20 md:py-28 bg-[#FDFCFB]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <ScrollReveal className="text-center mb-16">
            <h2 className="font-cormorant text-3xl md:text-[42px] font-normal text-[#1A1A1A] mb-4">
              Our Philosophy
            </h2>
            <div className="section-divider" />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'Storytelling', desc: 'Every wedding has a unique narrative. We immerse ourselves in your story to capture its essence authentically.' },
              { title: 'Artistry', desc: 'We blend technical mastery with creative vision to create photographs that are both beautiful and meaningful.' },
              { title: 'Connection', desc: 'Building genuine relationships with our couples ensures comfort and trust, resulting in natural, emotive imagery.' },
            ].map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.12}>
                <div className="text-center">
                  <h3 className="font-cormorant text-2xl font-normal text-[#1A1A1A] mb-4">
                    {item.title}
                  </h3>
                  <div className="w-[40px] h-[1px] bg-[#C9A96E] mx-auto mb-4" />
                  <p className="font-lato text-[14px] font-light text-[#555555] leading-[1.8]">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

