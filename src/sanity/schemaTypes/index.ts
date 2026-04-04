import { type SchemaTypeDefinition } from 'sanity'

import { blogPost } from './blogPost'
import { heroSlide } from './heroSlide'
import { portfolioItem } from './portfolioItem'
import { testimonial } from './testimonial'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blogPost, heroSlide, portfolioItem, testimonial],
}
