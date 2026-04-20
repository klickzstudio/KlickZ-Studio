import { client } from '@/sanity/lib/client'
import { portfolioQuery } from '@/sanity/lib/queries'
import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Portfolio | KLICKZSTUDIO',
  description: 'Explore our cinematic wedding photography portfolio. A collection of diverse love stories worldwide.',
}

export default async function PortfolioPage() {
  const portfolioItems = await client.fetch(portfolioQuery, {}, { next: { revalidate: 60 } })

  return (
    <main className="pt-32 pb-24 min-h-screen bg-[#F8F4EE]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16 md:mb-24">
          <span className="font-lato text-[11px] uppercase tracking-[0.4em] text-[#C9A96E] mb-4 block">
            Our Portfolio
          </span>
          <h1 className="font-cormorant text-5xl md:text-6xl text-[#2B2420] mb-6">
            Cinematic <span className="italic text-[#C9A96E]">Legacies</span>
          </h1>
          <p className="font-lato text-sm text-[#555555] max-w-2xl mx-auto">
            Each wedding is a unique story waiting to be told. Explore our featured collections to see how we blend candid moments with editorial elegance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {portfolioItems.map((item: any, idx: number) => {
            const linkHref = item.href ? item.href : `/best-candid-wedding-photographers/${item.slug}`
            const linkTarget = item.href ? "_blank" : "_self"

            return (
              <Link 
                key={idx} 
                href={linkHref}
                target={linkTarget}
                className="group block relative"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden mb-6 bg-[#E8E8E8]">
                  <Image
                    src={item.image || '/images/placeholder.jpg'}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="text-center">
                  <h3 className="font-cormorant text-2xl text-[#2B2420] mb-2">{item.title}</h3>
                  <div className="flex items-center justify-center gap-2 font-lato text-[10px] uppercase tracking-[0.2em] text-[#C9A96E]">
                    {item.clientName && <span>{item.clientName}</span>}
                    {item.clientName && item.categories?.[0] && <span className="w-1 h-1 rounded-full bg-[#C9A96E]/50" />}
                    {item.categories && <span>{item.categories[0]}</span>}
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
