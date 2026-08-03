import { SiteSettings } from '@/types/sanity'

interface JsonLdData {
  title?: string
  image?: string
  publishedAt?: string
  updatedAt?: string
  author?: string
  description?: string
  slug?: string
  images?: string[]
}

interface JsonLdProps {
  type?: 'LocalBusiness' | 'Article' | 'ImageGallery'
  data?: JsonLdData
  settings?: SiteSettings | null
}

export function JsonLd({ type = 'LocalBusiness', data, settings }: JsonLdProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ainz.space'
  
  const siteName = settings?.title || "KLICKZSTUDIO"
  const phone = settings?.phone || "+919710298451"
  
  // Default format: "address": { "street": "...", "city": "...", "postalCode": "...", "region": "...", "country": "..." }
  const addr = settings?.address || {
    street: "5th St, Raja Shanmuga Nagar, Tiruvottiyur",
    city: "Chennai",
    postalCode: "600019",
    region: "Tamil Nadu",
    country: "IN"
  }
  
  const socials = settings?.socials ? Object.values(settings.socials).filter(Boolean) : [
    "https://www.facebook.com/klickzstudio/",
    "https://www.instagram.com/weddingby_klickzstudio/",
    "https://www.youtube.com/@klickzstudio1320"
  ]

  let schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Photographer"],
    "name": siteName,
    "image": `${baseUrl}/icon.png`,
    "url": baseUrl,
    "telephone": phone,
    "priceRange": "₹₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": addr.street,
      "addressLocality": addr.city,
      "postalCode": addr.postalCode,
      "addressRegion": addr.region,
      "addressCountry": addr.country
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 13.0827,
      "longitude": 80.2707
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "09:00",
      "closes": "20:00"
    },
    "sameAs": socials
  }

  if (type === 'Article' && data) {
    schema = {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": data.title,
      "image": [data.image],
      "datePublished": data.publishedAt,
      "dateModified": data.updatedAt || data.publishedAt,
      "author": [{
        "@type": "Person",
        "name": data.author || siteName,
        "url": baseUrl
      }]
    }
  }

  if (type === 'ImageGallery' && data) {
    schema = {
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      "name": data.title,
      "description": data.description,
      "url": `${baseUrl}/portfolio/${data.slug}`,
      "image": data.images
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

