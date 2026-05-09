/**
 * Typed interfaces for Sanity CMS data.
 * Eliminates `any` throughout the codebase and provides compile-time safety
 * when CMS field names change.
 */

export interface SiteSettings {
  title: string
  tagline: string
  heroEyebrow: string
  heroHeading: string
  heroSubtext: string
  stats: StatItem[]
  phone: string
  whatsappPhone: string
  email: string
  address: {
    street: string
    city: string
    postalCode: string
    region: string
    country: string
  }
  socials: {
    facebook?: string
    instagram?: string
    youtube?: string
  }
  founderName: string
  founderImage?: string
  introImage1?: string
  introImage2?: string
  ctaImage?: string
}

export interface StatItem {
  number: number
  label: string
  suffix?: string
}

export interface HomePageData {
  introMainImage?: string
  introSecondaryImage?: string
  services?: CmsService[]
  horizontalGallery?: Array<{ image: string; alt?: string }>
}

export interface CmsService {
  title: string
  description: string
  image: string
  href: string
}

export interface InstagramPostData {
  title: string
  thumbnail: string
  instagramUrl: string
  isReel: boolean
  gridSize?: 'square' | 'portrait' | 'landscape'
}

export interface PhotographyImage {
  image: string
  imageObj?: any
  title?: string
  altText?: string
}
