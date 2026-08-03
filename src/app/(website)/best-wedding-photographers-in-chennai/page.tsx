import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { pageSEOQuery, photographyImagesQuery } from '@/sanity/lib/queries'
import { groq } from 'next-sanity'
import { constructMetadata } from '@/lib/seo'
import { PhotographyGrid } from '@/components/photography/PhotographyGrid'
import { urlForImage } from '@/sanity/lib/image'

const pageSlug = 'best-wedding-photographers-in-chennai'

export async function generateMetadata(): Promise<Metadata> {
  let seoData = null
  try {
    seoData = await client.fetch(pageSEOQuery, { slug: pageSlug })
  } catch (error) {
    console.error('Failed to fetch SEO metadata for best-wedding-photographers-in-chennai:', error)
  }

  if (seoData) {
    return constructMetadata({
      title: seoData.title,
      description: seoData.seoDescription,
      image: seoData.ogImage,
    })
  }

  return constructMetadata({
    title: 'Best Wedding Photographers in Chennai | KLICKZSTUDIO',
    description: 'Explore our complete wedding photography collections — Outdoor, Muslim, Christian, Brahmin, Telugu, Hindu, Engagement, Malayali, Punjabi, Sangeet & Haldi.',
  })
}

const weddingLists = [
  { label: 'Outdoor Wedding', href: '/outdoor-wedding-photography', slug: 'outdoor-wedding-photography', catSlug: 'outdoor' },
  { label: 'Muslim Wedding', href: '/muslim-wedding-photography', slug: 'muslim-wedding-photography', catSlug: 'wedding' },
  { label: 'Christian Wedding', href: '/christian-wedding-photography-chennai', slug: 'christian-wedding-photography-chennai', catSlug: 'christian-wedding' },
  { label: 'Brahmin Wedding', href: '/brahmin-wedding-photography', slug: 'brahmin-wedding-photography', catSlug: 'wedding' },
  { label: 'Telugu Wedding', href: '/telugu-wedding-photography', slug: 'telugu-wedding-photography', catSlug: 'wedding' },
  { label: 'Hindu Wedding', href: '/hindu-wedding-photography', slug: 'hindu-wedding-photography', catSlug: 'wedding' },
  { label: 'Engagement Photography', href: '/engagement-photography', slug: 'engagement-photography', catSlug: 'wedding' },
  { label: 'Malayali Wedding', href: '/malayali-wedding-photography', slug: 'malayali-wedding-photography', catSlug: 'wedding' },
  { label: 'Punjabi Wedding', href: '/punjabi-wedding-photography', slug: 'punjabi-wedding-photography', catSlug: 'wedding' },
  { label: 'Sangeet Ceremony', href: '/sangeet-photography', slug: 'sangeet-photography', catSlug: 'wedding' },
  { label: 'Haldi Ceremony', href: '/haldi-ceremony-photography', slug: 'haldi-ceremony-photography', catSlug: 'wedding' },
]

export default async function WeddingPhotographersPage() {
  const pageData = await client.fetch(pageSEOQuery, { slug: pageSlug }, { next: { revalidate: 60 } })

  // Fetch Sanity categories & images to enrich thumbnails
  const sanityCategories = await client.fetch(groq`
    *[_type == "photographyCategory"] {
      title,
      "slug": slug.current,
      heroImage,
      thumbnailImage,
      "preview": *[_type == "photographyImage" && category->slug.current == ^.slug.current][0].image
    }
  `, {}, { next: { revalidate: 60 } })

  // Fetch all wedding portfolio images for the showcase grid
  let weddingImages = await client.fetch(photographyImagesQuery, { slug: 'wedding' }, { next: { revalidate: 60 } })

  if (!weddingImages || weddingImages.length === 0) {
    weddingImages = await client.fetch(groq`
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
            Wedding Photography Collections
          </span>
          <h1 className="font-cormorant text-5xl md:text-7xl text-black mb-8 leading-tight">
            Wedding <span className="italic text-[#C9A96E]">Services</span>
          </h1>
          <div className="w-16 h-[1px] bg-[#C9A96E] mx-auto mb-8 opacity-50" />
          <p className="font-lato text-[13px] md:text-[15px] text-black/60 max-w-3xl mx-auto leading-relaxed tracking-wider uppercase">
            Explore our specialized wedding photography styles and regional traditions. 
            From intimate engagement ceremonies to grand destination celebrations, discover how we document timeless love stories.
          </p>
        </div>

        {/* Wedding Lists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-24">
          {weddingLists.map((item, idx) => {
            const matchedSanityCat = sanityCategories?.find((cat: any) => 
              cat.slug === item.slug || cat.slug === item.catSlug || item.slug.includes(cat.slug)
            )

            const imageObj = matchedSanityCat?.thumbnailImage || matchedSanityCat?.heroImage || matchedSanityCat?.preview || weddingImages[idx % weddingImages.length]?.imageObj
            const imageUrl = imageObj ? urlForImage(imageObj, 600, 800)?.url() : (weddingImages[idx % weddingImages.length]?.image || '/images/placeholder.jpg')

            return (
              <Link 
                key={item.slug} 
                href={item.href}
                className="group block relative bg-[#F5F0E8] overflow-hidden border border-black/5 hover:border-[#C9A96E]/40 transition-all duration-500 rounded-sm"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#2B2420]">
                  <Image
                    src={imageUrl as string}
                    alt={item.label}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={idx < 3}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="font-lato text-[9px] uppercase tracking-[0.3em] text-[#C9A96E] mb-2 block font-medium">
                      Wedding Category
                    </span>
                    <h3 className="font-cormorant text-2xl md:text-3xl text-white font-light tracking-wide group-hover:text-[#C9A96E] transition-colors duration-300">
                      {item.label}
                    </h3>
                  </div>
                </div>

                <div className="px-6 py-4 flex items-center justify-between bg-white border-t border-black/5">
                  <span className="font-lato text-[10px] uppercase tracking-[0.2em] text-black/70 group-hover:text-[#C9A96E] transition-colors font-medium">
                    Explore Collection
                  </span>
                  <span className="text-[#C9A96E] transform group-hover:translate-x-2 transition-transform duration-300">
                    &rarr;
                  </span>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Featured Wedding Gallery Showcase */}
        {weddingImages.length > 0 && (
          <div className="pt-12 border-t border-black/10">
            <div className="text-center mb-16">
              <span className="font-lato text-[11px] uppercase tracking-[0.4em] text-[#C9A96E] mb-4 block">
                Visual Stories
              </span>
              <h2 className="font-cormorant text-4xl md:text-5xl text-black">
                Featured <span className="italic text-[#C9A96E]">Moments</span>
              </h2>
            </div>
            <PhotographyGrid images={weddingImages} />
          </div>
        )}
      </div>
    </main>
  )
}
