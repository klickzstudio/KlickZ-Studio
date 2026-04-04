export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Photographer"],
    "name": "AinZ Studio",
    "description": "Professional wedding photographers in Chennai and Coimbatore. 750+ weddings, destination photography, pre-wedding shoots.",
    "url": "https://ainz.space",
    "telephone": ["+91-98765-43210"],
    "email": "contact@ainz.space",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Chennai",
      "addressRegion": "Tamil Nadu",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 13.0827,
      "longitude": 80.2707
    },
    "openingHours": "Mo-Su 09:00-20:00",
    "priceRange": "₹₹₹",
    "image": "https://ainz.space/images/logo/ainz-studio.png",
    "sameAs": [
      "https://www.facebook.com/AinZStudio",
      "https://www.instagram.com/AinZStudio/"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "743"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
