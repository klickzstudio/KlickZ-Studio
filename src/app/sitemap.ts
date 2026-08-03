import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { getAllDefinedRoutes, ROUTES } from '@/config/routes'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ainz.space'

  // Fetch all portfolio items
  const portfolioItems = await client.fetch(
    groq`*[_type == "portfolioItem" && defined(slug.current)] { "slug": slug.current, _updatedAt }`
  )

  const definedRoutes = getAllDefinedRoutes()
  const seenUrls = new Set<string>()

  const mainRoutes: MetadataRoute.Sitemap = []

  for (const route of definedRoutes) {
    const fullUrl = `${baseUrl}${route === '/' ? '' : route}`
    if (!seenUrls.has(fullUrl)) {
      seenUrls.add(fullUrl)
      mainRoutes.push({
        url: fullUrl,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '/' ? 1.0 : 0.8,
      })
    }
  }

  const portfolioRoutes: MetadataRoute.Sitemap = []
  for (const item of portfolioItems) {
    if (!item.slug) continue
    const cleanSlug = item.slug.replace(/&/g, '&amp;')
    const fullUrl = `${baseUrl}${ROUTES.GALLERY.ROOT}/${cleanSlug}`
    if (!seenUrls.has(fullUrl)) {
      seenUrls.add(fullUrl)
      portfolioRoutes.push({
        url: fullUrl,
        lastModified: item._updatedAt ? new Date(item._updatedAt) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    }
  }

  return [...mainRoutes, ...portfolioRoutes]
}
