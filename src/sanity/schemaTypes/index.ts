import { type SchemaTypeDefinition } from 'sanity'

import { blogPost } from './blogPost'
import { heroSlide } from './heroSlide'
import { portfolioItem } from './portfolioItem'
import { testimonial } from './testimonial'
import { photographyCategory } from './photographyCategory'
import { photographyImage } from './photographyImage'
import { sitePage } from './sitePage'
import { landingPage } from './landingPage'
import { instagramPost } from './instagramPost'
import { siteSettings } from './siteSettings'
import { homePage } from './homePage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homePage, siteSettings, heroSlide, portfolioItem, testimonial, photographyCategory, photographyImage, sitePage, landingPage, instagramPost, blogPost],
}

