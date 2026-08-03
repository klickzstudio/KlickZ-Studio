import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { pageSEOQuery, photographyImagesQuery } from '@/sanity/lib/queries'
import { groq } from 'next-sanity'
import { constructMetadata } from '@/lib/seo'
import { PhotographyGrid } from '@/components/photography/PhotographyGrid'
import { urlForImage } from '@/sanity/lib/image'
import { ROUTES } from '@/config/routes'

const pageSlug = 'services'

export async function generateMetadata(): Promise<Metadata> {
  let seoData = null
  try {
    seoData = await client.fetch(pageSEOQuery, { slug: pageSlug })
  } catch (error) {
    console.error('Failed to fetch SEO metadata for services:', error)
  }

  if (seoData) {
    return constructMetadata({
      title: seoData.title,
      description: seoData.seoDescription,
      image: seoData.ogImage,
      canonicalPath: ROUTES.SERVICES.ROOT,
    })
  }

  return constructMetadata({
    title: 'Our Services | KLICKZSTUDIO Photography Chennai',
    description: 'Explore our complete suite of bespoke photography and cinematography services in Chennai — Weddings, Outdoor, Videography, Portraits, and Event Coverage.',
    canonicalPath: ROUTES.SERVICES.ROOT,
  })
}

const serviceCategoriesList = [
  { label: 'Wedding Photography', href: ROUTES.SERVICES.WEDDINGS, slug: 'best-wedding-photographers-in-chennai', catSlug: 'wedding', description: 'Full-day candid & cinematic wedding storytelling across destinations.' },
  { label: 'Outdoor & Destination', href: ROUTES.SERVICES.OUTDOOR_WEDDING, slug: 'outdoor-photography-chennai', catSlug: 'outdoor', description: 'Bespoke outdoor sessions, pre-wedding couple stories & heritage venue shoots.' },
  { label: 'Baby & Toddler Portrait', href: ROUTES.SERVICES.BABY_PORTRAIT, slug: 'birthday-celebration-photography-chennai', catSlug: 'birthday', description: 'Tender, milestone moments capturing new life, birthdays & growing families.' },
  { label: 'Videography & Films', href: ROUTES.SERVICES.VIDEOGRAPHY, slug: 'wedding-videography-chennai', catSlug: 'wedding', description: 'Story-driven 4K cinematic wedding films and high-definition highlight reels.' },
]

export default async function ServicesPage() {
  const pageData = await client.fetch(pageSEOQuery, { slug: pageSlug }, { next: { revalidate: 60 } })

  // Fetch Sanity categories & images to enrich card thumbnails
  const sanityCategories = await client.fetch(groq`
    *[_type == "photographyCategory"] {
      title,
      "slug": slug.current,
      heroImage,
      thumbnailImage,
      "preview": *[_type == "photographyImage" && category->slug.current == ^.slug.current][0].image
    }
  `, {}, { next: { revalidate: 60 } })

  // Fetch photography images for showcase grid
  let showcaseImages = await client.fetch(photographyImagesQuery, { slug: 'wedding' }, { next: { revalidate: 60 } })

  if (!showcaseImages || showcaseImages.length === 0) {
    showcaseImages = await client.fetch(groq`
      *[_type == "photographyImage"] | order(_createdAt desc)[0...24] {
        "image": image.asset->url,
        "imageObj": image,
        title,
        altText
      }
    `, {}, { next: { revalidate: 60 } })
  }

  return (
    <main className="pt-32 pb-24 min-h-screen bg-[#FDFCFB]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header / Intro */}
        <div className="text-center mb-16 md:mb-24">
          <span className="font-lato text-[11px] uppercase tracking-[0.4em] text-[#C9A96E] mb-4 block">
            Our Offerings
          </span>
          <h1 className="font-cormorant text-5xl md:text-7xl text-black mb-8 leading-tight">
            {pageData?.title || 'Bespoke Services'}
          </h1>
          <div className="w-16 h-[1px] bg-[#C9A96E] mx-auto mb-8 opacity-50" />
          <p className="font-lato text-[13px] md:text-[15px] text-black/60 max-w-3xl mx-auto leading-relaxed tracking-wider uppercase">
            {pageData?.subtitle || 'Explore our full suite of professional photography & videography services tailored to your milestone celebrations.'}
          </p>
        </div>

        {/* Services List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mb-24">
          {serviceCategoriesList.map((item, idx) => {
            const matchedSanityCat = sanityCategories?.find((cat: any) => 
              cat.slug === item.slug || cat.slug === item.catSlug || item.slug.includes(cat.slug)
            )

            const imageObj = matchedSanityCat?.thumbnailImage || matchedSanityCat?.heroImage || matchedSanityCat?.preview || showcaseImages[idx % showcaseImages.length]?.imageObj
            const imageUrl = imageObj ? urlForImage(imageObj, 800, 600)?.url() : (showcaseImages[idx % showcaseImages.length]?.image || '/images/placeholder.jpg')

            return (
              <Link 
                key={item.slug} 
                href={item.href}
                className="group block relative bg-[#F5F0E8] overflow-hidden border border-black/5 hover:border-[#C9A96E]/40 transition-all duration-500 rounded-sm"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#2B2420]">
                  <Image
                    src={imageUrl as string}
                    alt={item.label}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={idx < 2}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-500" />
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="font-lato text-[9px] uppercase tracking-[0.3em] text-[#C9A96E] mb-2 block font-medium">
                      Primary Service
                    </span>
                    <h3 className="font-cormorant text-3xl md:text-4xl text-white font-light tracking-wide group-hover:text-[#C9A96E] transition-colors duration-300 mb-2">
                      {item.label}
                    </h3>
                    <p className="font-lato text-xs text-white/70 line-clamp-2 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 py-4 flex items-center justify-between bg-white border-t border-black/5">
                  <span className="font-lato text-[10px] uppercase tracking-[0.2em] text-black/70 group-hover:text-[#C9A96E] transition-colors font-medium">
                    Explore Service
                  </span>
                  <span className="text-[#C9A96E] transform group-hover:translate-x-2 transition-transform duration-300">
                    &rarr;
                  </span>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Featured Showcase Gallery */}
        {showcaseImages.length > 0 && (
          <div className="pt-12 border-t border-black/10">
            <div className="text-center mb-16">
              <span className="font-lato text-[11px] uppercase tracking-[0.4em] text-[#C9A96E] mb-4 block">
                Visual Portfolio
              </span>
              <h2 className="font-cormorant text-4xl md:text-5xl text-black">
                Featured <span className="italic text-[#C9A96E]">Moments</span>
              </h2>
            </div>
            <PhotographyGrid images={showcaseImages} />
          </div>
        )}
      </div>
    </main>
  )
}
