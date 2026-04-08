import { type SchemaTypeDefinition } from 'sanity'

import { blogPost } from './blogPost'
import { heroSlide } from './heroSlide'
import { portfolioItem } from './portfolioItem'
import { testimonial } from './testimonial'
import { photographyCategory } from './photographyCategory'
import { photographyImage } from './photographyImage'
import { sitePage } from './sitePage'
import { landingPage } from './landingPage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blogPost, heroSlide, portfolioItem, testimonial, photographyCategory, photographyImage, sitePage, landingPage],
}

