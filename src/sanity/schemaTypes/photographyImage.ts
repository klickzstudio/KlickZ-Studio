import { defineField, defineType } from 'sanity'

export const photographyImage = defineType({
  name: 'photographyImage',
  title: 'Photography Image',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title (Optional)',
      description: 'An optional internal title to help identify this image.',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'altText',
      title: 'Alt Text',
      description: 'Alternative text for screen readers (good for SEO).',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'photographyCategory' }],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      alt: 'altText',
      media: 'image',
      categoryTitle: 'category.title',
    },
    prepare(selection) {
      const { title, alt, media, categoryTitle } = selection
      return {
        title: title || alt || 'Untitled Image',
        subtitle: categoryTitle ? `Category: ${categoryTitle}` : 'No category',
        media,
      }
    },
  },
})
