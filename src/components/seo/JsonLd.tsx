interface JsonLdProps {
  type?: 'LocalBusiness' | 'Article' | 'ImageGallery'
  data?: any
}

export function JsonLd({ type = 'LocalBusiness', data }: JsonLdProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ainz.space'

  let schema: any = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Photographer"],
    "name": "KLICKZSTUDIO",
    "image": `${baseUrl}/icon.png`,
    "url": baseUrl,
    "telephone": "+919710298451",
    "priceRange": "₹₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "No. 123, Sample Street",
      "addressLocality": "Chennai",
      "postalCode": "600001",
      "addressRegion": "Tamil Nadu",
      "addressCountry": "IN"
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
    "sameAs": [
      "https://www.facebook.com/klickzstudio/",
      "https://www.instagram.com/weddingby_klickzstudio/",
      "https://www.youtube.com/@klickzstudio1320"
    ]
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
        "name": data.author || "KLICKZSTUDIO",
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

