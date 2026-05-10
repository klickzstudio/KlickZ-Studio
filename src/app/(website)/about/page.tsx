import { client } from '@/sanity/lib/client'
import { pageSEOQuery, siteSettingsQuery } from '@/sanity/lib/queries'
import { Metadata } from 'next'
import { constructMetadata } from '@/lib/seo'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await client.fetch(pageSEOQuery, { slug: 'about' })

  if (seoData) {
    return constructMetadata({
      title: seoData.title,
      description: seoData.seoDescription,
      image: seoData.ogImage,
    })
  }

  return constructMetadata({ title: 'About the Founder' })
}

export default async function AboutPage() {
  const pageData = await client.fetch(pageSEOQuery, { slug: 'about' }, { next: { revalidate: 60 } })
  const settings = await client.fetch(siteSettingsQuery, {}, { next: { revalidate: 60 } })
  const founderName = (settings?.founderName || 'Kotteswaran').replace(/\s*\(Kotty\)/gi, '')
  const founderImage = settings?.founderImage || '/images/kotty-portrait.jpg'
  const socials = settings?.socials

  return (
    <main className="pt-32 pb-24 min-h-screen bg-[#F8F4EE]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Rotated Square Image */}
          <div className="relative order-2 lg:order-1">
            <ScrollReveal>
              <div className="relative aspect-square w-full max-w-[600px] mx-auto overflow-hidden bg-[#2B2420]">
                {/* 
                  The Image is rotated -90deg to correct its orientation. 
                  Since it's a square container and we use object-cover, 
                  the transition should be seamless.
                */}
                <div className="absolute inset-0 transform-gpu">
                  <Image
                    src={founderImage}
                    alt={`${founderName} - Founder of KLICKZSTUDIO`}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Content & Socials */}
          <div className="order-1 lg:order-2">
            <ScrollReveal delay={0.2}>
              <span className="font-lato text-[11px] uppercase tracking-[0.4em] text-[#C9A96E] mb-6 block">
                Meet The Photographer
              </span>
              <h1 className="font-cormorant text-5xl md:text-6xl lg:text-[72px] text-[#2B2420] mb-8 leading-tight">
                {founderName}
              </h1>
              
              <div className="w-16 h-[1px] bg-[#C9A96E] mb-10" />

              <div className="prose prose-lg prose-p:text-[#555555] prose-p:font-light prose-p:leading-[2] prose-strong:text-[#2B2420] font-lato text-left mb-12">
                {pageData?.content ? (
                  <PortableText value={pageData.content} />
                ) : (
                  <>
                    <p>
                      Founded over two decades ago by {founderName}, KLICKZSTUDIO has grown from a passionate solo endeavor into a premier collective of visual storytellers based in Chennai.
                    </p>
                    <p>
                      We believe that wedding photography is not about staging the perfect pose, but about recognizing and capturing the perfect unscripted moments. Our approach is editorial, cinematic, and deeply personal.
                    </p>
                    <p>
                      With over 500 weddings documented globally, our experienced team blends into the background to capture the raw emotions and grand celebrations of your special day.
                    </p>
                  </>
                )}
              </div>

              {/* Professional Social Links */}
              <div className="flex flex-col gap-6">
                <span className="font-lato text-[10px] uppercase tracking-[0.2em] text-[#C9A96E] font-semibold">
                  Connect Professionally
                </span>
                <div className="flex items-center gap-8">
                  {socials?.instagram && (
                    <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center transition-all duration-300 group-hover:border-[#C9A96E] group-hover:bg-[#C9A96E] group-hover:text-black text-[#555]">
                        <FaInstagram size={18} />
                      </div>
                      <span className="font-lato text-[9px] uppercase tracking-widest text-[#888] group-hover:text-black">Instagram</span>
                    </a>
                  )}
                  {socials?.facebook && (
                    <a href={socials.facebook} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center transition-all duration-300 group-hover:border-[#C9A96E] group-hover:bg-[#C9A96E] group-hover:text-black text-[#555]">
                        <FaFacebook size={18} />
                      </div>
                      <span className="font-lato text-[9px] uppercase tracking-widest text-[#888] group-hover:text-black">Facebook</span>
                    </a>
                  )}
                  {socials?.youtube && (
                    <a href={socials.youtube} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center transition-all duration-300 group-hover:border-[#C9A96E] group-hover:bg-[#C9A96E] group-hover:text-black text-[#555]">
                        <FaYoutube size={18} />
                      </div>
                      <span className="font-lato text-[9px] uppercase tracking-widest text-[#888] group-hover:text-black">YouTube</span>
                    </a>
                  )}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </main>
  )
}

