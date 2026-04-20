import { client } from '@/sanity/lib/client'
import { blogPostsQuery, pageSEOQuery } from '@/sanity/lib/queries'
import { Metadata } from 'next'
import { constructMetadata } from '@/lib/seo'
import Link from 'next/link'
import Image from 'next/image'

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await client.fetch(pageSEOQuery, { slug: 'blog' })

  if (seoData) {
    return constructMetadata({
      title: seoData.title,
      description: seoData.seoDescription,
      image: seoData.ogImage,
    })
  }

  return constructMetadata({ title: 'Journal & Stories | KLICKZSTUDIO' })
}

export default async function BlogPage() {
  const posts = await client.fetch(blogPostsQuery, {}, { next: { revalidate: 60 } })
  const pageData = await client.fetch(pageSEOQuery, { slug: 'blog' })

  return (
    <main className="pt-32 pb-24 min-h-screen bg-[#F8F4EE]">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-10 text-center mb-16 md:mb-24">
        <span className="font-lato text-[11px] uppercase tracking-[0.4em] text-[#C9A96E] mb-4 block">
          Journal
        </span>
        <h1 className="font-cormorant text-5xl md:text-6xl lg:text-[72px] text-[#2B2420] mb-6 leading-tight">
          {pageData?.title || 'Stories & Inspirations'}
        </h1>
        <p className="font-lato text-sm md:text-base text-[#555555] max-w-2xl mx-auto uppercase tracking-widest">
          {pageData?.subtitle || 'Behind the scenes, tips, and featured stories.'}
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {posts.map((post: any, idx: number) => (
            <Link key={idx} href={post.href} className="group block">
              <div className="relative aspect-[4/3] w-full overflow-hidden mb-6 bg-[#E8E8E8]">
                <Image
                  src={post.image || '/images/placeholder.jpg'}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div>
                <div className="flex items-center gap-4 font-lato text-[10px] uppercase tracking-[0.2em] text-[#C9A96E] mb-3">
                  <span>{post.category}</span>
                  {post.publishedAt && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-[#C9A96E]/50" />
                      <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                    </>
                  )}
                </div>
                <h3 className="font-cormorant text-2xl text-[#2B2420] mb-3 group-hover:text-[#C9A96E] transition-colors">{post.title}</h3>
                <p className="font-lato text-xs text-[#555555] line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
