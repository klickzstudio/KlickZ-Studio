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
      canonicalPath: '/about',
    })
  }

  return constructMetadata({ title: 'About the Founder', canonicalPath: '/about' })
}

export default async function AboutPage() {
  const pageData = await client.fetch(pageSEOQuery, { slug: 'about' }, { next: { revalidate: 0 } })
  const settings = await client.fetch(siteSettingsQuery, {}, { next: { revalidate: 0 } })
  const founderName = (settings?.founderName || 'Kotteswaran')
    .replace(/\s*\(Kotty\)/gi, '')
    .replace(/\bKotty\b/gi, '')
    .trim()
  const founderImage = pageData?.heroImageUrl || settings?.founderImage || '/images/client_owner.png'
  const socials = settings?.socials

  return (
    <main className="pt-32 pb-24 min-h-screen bg-[#F8F4EE]">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-10 text-center">
        
        {/* Header */}
        <ScrollReveal>
          <span className="font-lato text-[11px] uppercase tracking-[0.4em] text-[#C9A96E] mb-4 block">
            Meet The Photographer
          </span>
          <h1 className="font-cormorant text-5xl md:text-6xl lg:text-[72px] text-[#2B2420] mb-6 leading-tight">
            {founderName}
          </h1>
          <div className="w-16 h-[1px] bg-[#C9A96E] mx-auto mb-12" />
        </ScrollReveal>

        {/* Centered Image with Gold Overlay Frame */}
        <ScrollReveal delay={0.1}>
          <div className="relative aspect-[16/10] w-full max-w-3xl mx-auto mb-14">
            <Image
              src={founderImage}
              alt={`${founderName} - Founder of KLICKZSTUDIO`}
              fill
              sizes="(max-width: 1024px) 100vw, 800px"
              className="object-cover shadow-lg"
              priority
            />
            <div className="absolute inset-0 border border-[#C9A96E]/30 translate-x-3 translate-y-3 -z-10" />
          </div>
        </ScrollReveal>

        {/* Centered Content & Socials */}
        <ScrollReveal delay={0.2}>
          <div className="max-w-2xl mx-auto prose prose-lg prose-p:text-[#555555] prose-p:font-light prose-p:leading-[2] prose-strong:text-[#2B2420] font-lato text-center mb-14">
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
          <div className="flex flex-col items-center gap-6">
            <span className="font-lato text-[10px] uppercase tracking-[0.2em] text-[#C9A96E] font-semibold">
              Connect Professionally
            </span>
            <div className="flex items-center justify-center gap-8">
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
    </main>
  )
}

