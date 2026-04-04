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
