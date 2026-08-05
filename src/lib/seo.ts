import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://klickzstudio.in'

export const defaultSEO = {
  title: 'KLICKZSTUDIO | Professional Wedding Photography',
  description: 'Founded with a passion for soulful storytelling, KLICKZSTUDIO captures the essence of love and celebration across destinations.',
  openGraph: {
    title: 'KLICKZSTUDIO | Professional Wedding Photography',
    description: 'Founded with a passion for soulful storytelling, KLICKZSTUDIO captures the essence of love and celebration across destinations.',
    images: ['/images/hero-1.webp'], // Use a fallback image built into the app
  }
}

export function constructMetadata({
  title = defaultSEO.title,
  description = defaultSEO.description,
  image = defaultSEO.openGraph.images[0],
  canonicalPath = '/',
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string
  canonicalPath?: string
  noIndex?: boolean
} = {}): Metadata {
  const cleanPath = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`
  const canonicalUrl = canonicalPath.startsWith('http')
    ? canonicalPath
    : `${baseUrl}${cleanPath}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    alternates: {
      canonical: canonicalUrl,
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}
