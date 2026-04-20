import { client } from '@/sanity/lib/client'
import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { groq } from 'next-sanity'
import { pageSEOQuery } from '@/sanity/lib/queries'
import { EditorialHero } from '@/components/ui/EditorialHero'

export const metadata: Metadata = {
  title: 'Portfolio | KLICKZSTUDIO',
  description: 'Explore our cinematic wedding photography portfolio categories. A collection of diverse love stories worldwide.',
}

// Map slugs to the correct SEO-friendly URLs from navigation menu
const categoryUrlMap: Record<string, string> = {
  'wedding': '/best-candid-wedding-photography-chennai',
  'christian-wedding': '/christian-wedding-photography-chennai',
  'outdoor': '/outdoor-photography-chennai',
  'reception': '/wedding-reception-photography',
  'baby-shower': '/baby-shower-photography-chennai',
  'birthday': '/birthday-celebration-photography-chennai',
  'bride-portrait': '/bridal-portrait-photography-chennai',
  'groom-portrait': '/groom-portrait-photography-chennai',
  'silhouette': '/silhouette-photography-chennai'
}

export default async function PortfolioPage() {
  const [categories, pageData] = await Promise.all([
    client.fetch(groq`
      *[_type == "photographyCategory"] | order(title asc) { 
        title, 
        "slug": slug.current, 
        "image": heroImage.asset->url,
        "preview": *[_type == "photographyImage" && category->slug.current == ^.slug.current][0].image.asset->url
      }
    `, {}, { next: { revalidate: 60 } }),
    client.fetch(pageSEOQuery, { slug: 'best-candid-wedding-photographers' }, { next: { revalidate: 60 } })
  ])

  const heroImage = pageData?.heroImage || categories[0]?.image || categories[0]?.preview || ''
  const pageTitle = pageData?.title || 'Cinematic Gallery'
  const pageSubtitle = pageData?.subtitle || 'Beautifully curated collections of our work across diverse photography styles. From intimate weddings to editorial portraits, discover how we capture legacies.'

  return (
    <main className="min-h-screen bg-[#FDFCFB]">
      <EditorialHero 
        title={pageTitle}
        subtitle={pageSubtitle}
        image={heroImage}
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-x-12 md:gap-y-16">
          {categories.map((cat: any, idx: number) => {
            const linkHref = categoryUrlMap[cat.slug] || `/${cat.slug}`

            return (
              <Link 
                key={idx} 
                href={linkHref}
                className="group block relative"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden mb-6 bg-[#F5F5F5]">
                  <Image
                    src={cat.image || cat.preview || '/images/placeholder.jpg'}
                    alt={cat.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={idx < 3}
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
                <div className="text-center">
                  <h3 className="font-cormorant text-2xl tracking-wider text-black group-hover:text-[#C9A96E] transition-colors duration-500 mb-2">{cat.title}</h3>
                  <div className="flex items-center justify-center gap-3">
                    <span className="w-8 h-[1px] bg-[#C9A96E] opacity-30 group-hover:opacity-100 group-hover:w-12 transition-all duration-500" />
                    <span className="font-lato text-[9px] uppercase tracking-[0.25em] text-[#C9A96E]">View Collection</span>
                    <span className="w-8 h-[1px] bg-[#C9A96E] opacity-30 group-hover:opacity-100 group-hover:w-12 transition-all duration-500" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </main>
  )
}
