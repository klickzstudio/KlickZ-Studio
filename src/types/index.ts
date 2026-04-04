export interface NavLink {
  label: string
  href: string
  isButton?: boolean
  children?: NavLink[]
}

export interface HeroSlide {
  image: string
  heading: string
  subheading: string
}

export interface PortfolioItem {
  image: string
  title: string
  categories: string[]
  href: string
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
