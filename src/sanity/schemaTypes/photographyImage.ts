import { defineField, defineType } from 'sanity'

export const photographyImage = defineType({
  name: 'photographyImage',
  title: 'Photography Image',
  type: 'document',
  groups: [
    { name: 'media', title: '📸 Photo File & Category', default: true },
    { name: 'seo', title: '🔍 SEO & Details' },
  ],
  fields: [
    defineField({
      name: 'image',
      title: 'Image File',
      description: 'Upload high quality wedding or portfolio image.',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
      validation: (Rule) => Rule.required().error('An image file is required.'),
    }),
    defineField({
      name: 'category',
      title: 'Associated Category',
      description: 'Select the primary gallery category for this image.',
      type: 'reference',
      group: 'media',
      to: [{ type: 'photographyCategory' }],
      validation: (Rule) => Rule.required().error('Category assignment is required for gallery filtering.'),
    }),
    defineField({
      name: 'title',
      title: 'Title / Caption (Optional)',
      description: 'An optional title or caption to identify this photo.',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'altText',
      title: 'Alt Text (SEO)',
      description: 'Alternative text describing the image for screen readers and Google Image search.',
      type: 'string',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      alt: 'altText',
      media: 'image',
      categoryTitle: 'category.title',
    },
    prepare({ title, alt, media, categoryTitle }) {
      return {
        title: title || alt || 'Portfolio Photo',
        subtitle: categoryTitle ? `Category: ${categoryTitle}` : 'No category assigned',
        media,
      }
    },
  },
})
