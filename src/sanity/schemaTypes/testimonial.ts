import { defineField, defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Client Review',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Client / Couple Name',
      description: 'e.g., "Priya & Karthik"',
      type: 'string',
      validation: (Rule) => Rule.required().error('Client name is required.'),
    }),
    defineField({
      name: 'text',
      title: 'Review Quote',
      description: 'The testimonial quote displayed on the homepage slider.',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().error('Review quote text is required.'),
    }),
    defineField({
      name: 'photo',
      title: 'Client Avatar Photo',
      description: 'Optional avatar or couple portrait photo.',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      text: 'text',
      media: 'photo',
    },
    prepare({ title, text, media }) {
      return {
        title: title || 'Anonymous Review',
        subtitle: text ? `"${text.slice(0, 60)}..."` : 'No text content',
        media,
      }
    },
  },
})
