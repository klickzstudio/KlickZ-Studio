export interface NavLink {
  label: string
  href: string
  isButton?: boolean
  children?: NavLink[]
}

export interface HeroSlide {
  image: string
  blurDataURL?: string
  heading: string
  subheading: string
}

export interface PortfolioItem {
  _id?: string
  image: string
  title: string
  slug?: string
  categories: string[]
  href: string
  featured?: boolean
}

export interface FilmItem {
  image: string
  href: string
  title?: string
}

export interface StatItem {
  number: number
  label: string
  suffix?: string
}

export interface Testimonial {
  photo: string
  name: string
  text: string
}

export interface BlogPost {
  image: string
  category: string
  author: string
  title: string
  excerpt: string
  href: string
  publishedAt: string
}

