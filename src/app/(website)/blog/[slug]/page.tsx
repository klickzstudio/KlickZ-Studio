import { client } from '@/sanity/lib/client'
import { blogPostQuery } from '@/sanity/lib/queries'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await client.fetch(blogPostQuery, { slug: params.slug })
  
  if (!post) {
    return { title: 'Post Not Found' }
  }

  return {
    title: `${post.title} | KLICKZSTUDIO Journal`,
    description: post.seoDescription || post.excerpt || `Read ${post.title} on KLICKZSTUDIO.`,
    openGraph: {
      images: [{ url: post.image }],
    }
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await client.fetch(blogPostQuery, { slug: params.slug })

  if (!post) {
    notFound()
  }

  return (
    <main className="bg-[#F8F4EE] min-h-screen">
      <JsonLd 
        type="Article" 
        data={{
          title: post.title,
          image: post.image,
          publishedAt: post.publishedAt,
          updatedAt: post.publishedAt, // Or a dedicated updatedAt field if you add one
          author: post.author
        }}
      />
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 lg:px-10 max-w-[1000px] mx-auto text-center">
        <div className="flex items-center justify-center gap-4 font-lato text-[11px] uppercase tracking-[0.2em] text-[#C9A96E] mb-6">
          <span>{post.category}</span>
          {post.publishedAt && (
            <>
              <span className="w-1 h-1 rounded-full bg-[#C9A96E]/50" />
              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
            </>
          )}
          {post.author && (
            <>
              <span className="w-1 h-1 rounded-full bg-[#C9A96E]/50" />
              <span>By {post.author}</span>
            </>
          )}
        </div>
        
        <h1 className="font-cormorant text-5xl md:text-7xl text-[#2B2420] mb-8 leading-tight">
          {post.title}
        </h1>
      </section>

      {/* Main Image */}
      <section className="max-w-[1200px] mx-auto px-6 lg:px-10 mb-20 md:mb-32">
        <div className="relative aspect-video w-full overflow-hidden bg-[#2B2420]">
          <Image
            src={post.image || '/images/placeholder.jpg'}
            alt={post.title}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover opacity-90"
            priority
          />
        </div>
      </section>

      {/* Content */}
      <section className="max-w-[800px] mx-auto px-6 lg:px-10 mb-20 md:mb-32">
        <div className="prose prose-lg prose-p:text-[#555555] prose-p:font-light prose-p:leading-[2.2] prose-headings:font-cormorant prose-strong:text-[#2B2420] prose-a:text-[#C9A96E] mx-auto font-lato text-justify pd-8">
          {post.content ? (
             <PortableText value={post.content} />
          ) : (
             <p className="text-center italic mt-10">Story content coming soon.</p>
          )}
        </div>
      </section>

      {/* Back to Blog */}
      <section className="text-center pb-32">
        <Link
          href="/blog"
          className="inline-block font-lato text-[12px] uppercase tracking-[0.2em] border-b border-[#C9A96E] text-[#2B2420] pb-1 hover:text-[#C9A96E] transition-colors"
        >
          Back to Journal
        </Link>
      </section>
    </main>
  )
}
