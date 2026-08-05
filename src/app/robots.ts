import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://klickzstudio.in'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio', '/admin', '/api'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

