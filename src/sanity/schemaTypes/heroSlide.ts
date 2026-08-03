import { defineField, defineType } from 'sanity'

export const heroSlide = defineType({
  name: 'heroSlide',
  title: 'Homepage Hero Slide',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Desktop Slide Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required().error('Desktop image is required.'),
    }),
    defineField({
      name: 'mobileImage',
      title: 'Mobile Slide Image (Portrait Crop)',
      type: 'image',
      options: { hotspot: true },
      description: 'Optional portrait crop for mobile screens.',
    }),
    defineField({
      name: 'heading',
      title: 'Slide Heading (Optional)',
      type: 'string',
    }),
    defineField({
      name: 'subheading',
      title: 'Slide Subheading (Optional)',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      heading: 'heading',
      media: 'image',
      order: 'order',
    },
    prepare({ heading, media, order }) {
      return {
        title: heading || 'Hero Background Slide',
        subtitle: `Order: ${order ?? 0}`,
        media,
      }
    },
  },
})
