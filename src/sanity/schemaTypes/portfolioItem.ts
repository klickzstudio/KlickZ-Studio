import { defineField, defineType } from 'sanity'

export const portfolioItem = defineType({
  name: 'portfolioItem',
  title: 'Portfolio Case Study',
  type: 'document',
  groups: [
    { name: 'general', title: '💼 Case Study Info', default: true },
    { name: 'content', title: '📝 Story & Gallery' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      description: 'e.g. "Ananya & Rahul — Destination Wedding in Mahabalipuram"',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      description: 'URL path for this case study (e.g., "ananya-rahul-mahabalipuram")',
      type: 'slug',
      group: 'general',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Cover Image',
      description: 'Main thumbnail photo for the portfolio list.',
      type: 'image',
      group: 'general',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'clientName',
      title: 'Couple / Client Name(s)',
      type: 'string',
      group: 'general',
    }),
    defineField({
      name: 'date',
      title: 'Event Date',
      type: 'date',
      group: 'general',
    }),
    defineField({
      name: 'categories',
      title: 'Tags / Categories',
      type: 'array',
      group: 'general',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'story',
      title: 'The Story (Rich Text)',
      type: 'array',
      group: 'content',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
          ],
        },
      ],
      options: { layout: 'grid' },
    }),
    defineField({
      name: 'href',
      title: 'Custom External Link (Optional)',
      description: 'Overrides internal case study link if set.',
      type: 'url',
      group: 'general',
    }),
    defineField({
      name: 'featured',
      title: 'Feature on Homepage',
      type: 'boolean',
      group: 'general',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      client: 'clientName',
      media: 'image',
    },
    prepare({ title, client, media }) {
      return {
        title: title || 'Untitled Case Study',
        subtitle: client ? `Couple: ${client}` : 'Case Study',
        media,
      }
    },
  },
})
