import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ainz.space'

  // Fetch all portfolio items
  const portfolioItems = await client.fetch(groq`*[_type == "portfolioItem"] { "slug": slug.current, _updatedAt }`)
  
  // Fetch all blog posts
  const blogPosts = await client.fetch(groq`*[_type == "blogPost"] { "slug": slug.current, _updatedAt }`)

  const staticRoutes = [
    '',
    '/about-us',
    '/contact',
    '/films',
    '/wedding',
    '/pre-wedding-photography',
    '/post-wedding-photography',
    '/maternity',
    '/fashion-photography',
    '/poetry',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const portfolioRoutes = portfolioItems.map((item: any) => ({
    url: `${baseUrl}/portfolio/${item.slug}`,
    lastModified: item._updatedAt ? new Date(item._updatedAt) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const blogRoutes = blogPosts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post._updatedAt ? new Date(post._updatedAt) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  return [...staticRoutes, ...portfolioRoutes, ...blogRoutes]
}
