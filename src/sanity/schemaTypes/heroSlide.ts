import { defineField, defineType } from 'sanity'

export const heroSlide = defineType({
  name: 'heroSlide',
  title: 'Hero Slide',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Desktop Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mobileImage',
      title: 'Mobile Image (Portrait Crop)',
      type: 'image',
      options: { hotspot: true },
      description: 'Optional. Upload a tighter, portrait-oriented crop of the same image for mobile screens. If not set, the desktop image will be used with centered positioning.',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
    }),
  ],
})

