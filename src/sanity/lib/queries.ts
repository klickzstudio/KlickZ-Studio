import { groq } from 'next-sanity'

export const heroSlidesQuery = groq`
  *[_type == "heroSlide"] | order(order asc) {
    "image": image.asset->url,
    heading,
    subheading
  }
`

export const portfolioQuery = groq`
  *[_type == "portfolioItem"] {
    "image": image.asset->url,
    title,
    categories,
    href,
    featured
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

export const photographyCategorySEOQuery = groq`
  *[_type == "photographyCategory" && slug.current == $slug][0] {
    title,
    seoDescription,
    "heroImage": heroImage.asset->url,
    "editorialGallery": editorialGallery[] {
      "image": image.asset->url,
      aspectRatio,
      alt
    },
    "ogImage": ogImage.asset->url
  }
`

export const photographyImagesQuery = groq`
  *[_type == "photographyImage" && category->slug.current == $slug] {
    "image": image.asset->url,
    title,
    altText
  }
`

export const pageSEOQuery = groq`
  *[_type == "sitePage" && slug.current == $slug][0] {
    title,
    subtitle,
    content,
    seoDescription,
    "heroImage": heroImage.asset->url,
    "editorialGallery": editorialGallery[] {
      "image": image.asset->url,
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
    "heroImage": heroImage.asset->url,
    "editorialGallery": editorialGallery[] {
      "image": image.asset->url,
      aspectRatio,
      alt
    },
    "ogImage": ogImage.asset->url,
    "associatedCategorySlug": associatedCategory->slug.current
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
