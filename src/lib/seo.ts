import type { Metadata } from 'next'

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
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string
  noIndex?: boolean
} = {}): Metadata {
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
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@klickzstudio',
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}
