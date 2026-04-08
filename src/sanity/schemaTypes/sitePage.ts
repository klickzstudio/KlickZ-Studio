import { defineField, defineType } from 'sanity'

export const sitePage = defineType({
  name: 'sitePage',
  title: 'Site Page (SEO)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'The URL path (e.g., "home", "about-us"). Use "home" for the root page.',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      description: 'Meta description for SEO. Keep it under 160 characters.',
      type: 'text',
      validation: (Rule) => Rule.max(160).warning('Optimal SEO descriptions are 160 characters or less.'),
    }),
    defineField({
      name: 'heroImage',
      title: 'Banner Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'subtitle',
      title: 'Page Subtitle',
      description: 'Subheading text for the editorial hero banner.',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Page Body Content',
      description: 'Rich text content for this page (e.g. About Us story).',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'editorialGallery',
      title: 'Editorial Gallery',
      description: 'Photos with custom aspect ratios (3:4, 4:3, 16:9, etc.) for a dynamic layout.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'image', type: 'image', options: { hotspot: true }, title: 'Image' },
            {
              name: 'aspectRatio',
              type: 'string',
              title: 'Aspect Ratio',
              options: {
                list: [
                  { title: '3:4 (Portrait)', value: '3/4' },
                  { title: '4:3 (Landscape)', value: '4/3' },
                  { title: '16:9 (Wide)', value: '16/9' },
                  { title: 'Square', value: '1/1' },
                ],
              },
              initialValue: '4/3',
            },
            { name: 'alt', type: 'string', title: 'Alt Text' },
          ],
        },
      ],
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      description: 'Image displayed when sharing the link on social media.',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})
