import { groq } from 'next-sanity'

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    title,
    tagline,
    heroEyebrow,
    heroHeading,
    heroSubtext,
    stats,
    phone,
    whatsappPhone,
    email,
    address,
    socials,
    founderName,
    "founderImage": founderImage.asset->url,
    "introImage1": introImage1.asset->url,
    "introImage2": introImage2.asset->url,
    "ctaImage": ctaImage.asset->url
  }
`

export const heroSlidesQuery = groq`
  *[_type == "heroSlide"] | order(order asc) {
    "image": image.asset->url,
    "blurDataURL": image.asset->metadata.lqip,
    heading,
    subheading
  }
`

export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    "introMainImage": introMainImage.asset->url,
    "introSecondaryImage": introSecondaryImage.asset->url,
    "services": services[] {
      title,
      description,
      href,
      "image": image.asset->url
    },
    "horizontalGallery": horizontalGallery[] {
      "image": image.asset->url,
      alt
    }
  }
`

export const portfolioQuery = groq`
  *[_type == "portfolioItem"] | order(date desc) {
    "image": image.asset->url,
    title,
    "slug": slug.current,
    categories,
    clientName,
    date,
    href,
    featured
  }
`

export const portfolioCaseStudyQuery = groq`
  *[_type == "portfolioItem" && slug.current == $slug][0] {
    "image": image.asset->url,
    title,
    "slug": slug.current,
    categories,
    clientName,
    date,
    story,
    "gallery": gallery[].asset->url,
    href
  }
`

export const testimonialsQuery = groq`
  *[_type == "testimonial"] {
    "photo": photo.asset->url,
    name,
    text
  }
`

export const blogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    "image": image.asset->url,
    category,
    author,
    title,
    excerpt,
    "href": "/blog/" + slug.current,
    publishedAt
  }
`

export const blogPostQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    "image": image.asset->url,
    title,
    "slug": slug.current,
    category,
    author,
    publishedAt,
    content,
    "seoDescription": excerpt
  }
`

export const photographyCategorySEOQuery = groq`
  *[_type == "photographyCategory" && slug.current == $slug][0] {
    title,
    seoDescription,
    "heroImage": heroImage,
    "heroImageUrl": heroImage.asset->url,
    "editorialGallery": editorialGallery[] {
      "image": image,
      "imageUrl": image.asset->url,
      aspectRatio,
      alt
    },
    "ogImage": ogImage.asset->url
  }
`

export const photographyImagesQuery = groq`
  *[_type == "photographyImage" && category->slug.current == $slug] {
    "image": image.asset->url,
    "imageObj": image,
    "blurDataURL": image.asset->metadata.lqip,
    title,
    altText
  }
`

export const portfolioImagesFallbackQuery = groq`
  *[_type == "portfolioItem" && $slug in categories[] ] {
    "image": image.asset->url,
    "imageObj": image,
    title,
    "altText": title
  }
`

export const pageSEOQuery = groq`
  *[_type == "sitePage" && slug.current == $slug][0] {
    title,
    subtitle,
    content,
    seoDescription,
    "heroImage": heroImage,
    "heroImageUrl": heroImage.asset->url,
    "editorialGallery": editorialGallery[] {
      "image": image,
      "imageUrl": image.asset->url,
      aspectRatio,
      alt
    },
    "ogImage": ogImage.asset->url
  }
`

export const landingPageQuery = groq`
  *[_type == "landingPage" && slug.current == $slug][0] {
    title,
    content,
    seoDescription,
    "heroImage": heroImage,
    "heroImageUrl": heroImage.asset->url,
    "editorialGallery": editorialGallery[] {
      "image": image,
      "imageUrl": image.asset->url,
      aspectRatio,
      alt
    },
    "ogImage": ogImage.asset->url,
    "associatedCategorySlug": associatedCategory->slug.current,
    "categoryHeroImage": associatedCategory->heroImage
  }
`

export const instagramPostsQuery = groq`
  *[_type == "instagramPost"] | order(sortOrder asc) {
    title,
    "thumbnail": thumbnail.asset->url,
    instagramUrl,
    isReel,
    gridSize
  }
`
