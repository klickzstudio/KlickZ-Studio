import { ScrollReveal } from '@/components/ui/ScrollReveal'
import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { pageSEOQuery } from '@/sanity/lib/queries'
import { constructMetadata } from '@/lib/seo'
import { EditorialHero } from '@/components/ui/EditorialHero'
import { ContactForm } from '@/components/forms/ContactForm'

const pageSlug = 'contact'

export async function generateMetadata(): Promise<Metadata> {
  let seoData = null
  try {
    seoData = await client.fetch(pageSEOQuery, { slug: pageSlug })
  } catch (error) {
    console.error('Failed to fetch SEO metadata for contact:', error)
  }

  if (seoData) {
    return constructMetadata({
      title: seoData.title,
      description: seoData.seoDescription,
      image: seoData.ogImage,
    })
  }

  return constructMetadata({
    title: 'Book Us - KLICKZSTUDIO',
    description: 'Get in touch with KLICKZSTUDIO for the best candid wedding photography in Chennai.',
  })
}

export default async function ContactPage() {
  const pageData = await client.fetch(pageSEOQuery, { slug: pageSlug })

  const heroImage = pageData?.heroImage || ''
  const title = pageData?.title || 'Book Us'
  const subtitle = pageData?.subtitle || 'Get in touch for your special day'

  return (
    <>
      <EditorialHero
        title={title}
        subtitle={subtitle}
        image={heroImage}
      />

      {/* Form + Info */}
      <section id="book-us" className="py-20 md:py-28 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <ScrollReveal>
              <ContactForm />
            </ScrollReveal>

            {/* Contact Details */}
            <ScrollReveal delay={0.2}>
              <div className="lg:pl-8">
                <h2 className="font-cormorant text-3xl md:text-[36px] font-normal text-[#1A1A1A] mb-8">
                  Contact Details
                </h2>
                <div className="section-divider !mx-0 mb-8" />

                <div className="space-y-6">
                  <div>
                    <h3 className="font-lato text-[12px] uppercase tracking-[0.15em] text-[#888888] mb-2">
                      Phone
                    </h3>
                    <a href="tel:+919710298451" className="block font-lato text-[16px] text-[#1A1A1A] hover:text-[#C9A96E] transition-colors">
                      +91 97102 98451
                    </a>
                  </div>

                  <div>
                    <h3 className="font-lato text-[12px] uppercase tracking-[0.15em] text-[#888888] mb-2">
                      Email
                    </h3>
                    <a href="mailto:Klickzstudio@gmail.com" className="font-lato text-[16px] text-[#C9A96E] hover:underline">
                      Klickzstudio@gmail.com
                    </a>
                  </div>

                  <div>
                    <h3 className="font-lato text-[12px] uppercase tracking-[0.15em] text-[#888888] mb-2">
                      Instagram
                    </h3>
                    <a
                      href="https://www.instagram.com/weddingby_klickzstudio/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-lato text-[16px] text-[#1A1A1A] hover:text-[#C9A96E] transition-colors"
                    >
                      @weddingby_klickzstudio
                    </a>
                  </div>

                  <div>
                    <h3 className="font-lato text-[12px] uppercase tracking-[0.15em] text-[#888888] mb-2">
                      Facebook
                    </h3>
                    <a
                      href="https://www.facebook.com/klickzstudio/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-lato text-[16px] text-[#1A1A1A] hover:text-[#C9A96E] transition-colors"
                    >
                      KLICKZSTUDIO
                    </a>
                  </div>
                </div>

                {/* Map or decorative element */}
                <div className="mt-12 p-8 bg-[#F9F6F2] text-center">
                  <p className="font-cormorant text-2xl font-light italic text-[#1A1A1A] mb-2">
                    Based in Chennai
                  </p>
                  <p className="font-lato text-[13px] font-light text-[#555555]">
                    Available for destination weddings worldwide
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  )
}

