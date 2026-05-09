import { defineField, defineType } from 'sanity'

export const photographyCategory = defineType({
  name: 'photographyCategory',
  title: 'Photography Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'The title of the photography category (e.g., Wedding Photography)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'The URL path for this category (e.g., "wedding", "pre-wedding-photography")',
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
      description: 'The large cinematic image at the top of the category page.',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'thumbnailImage',
      title: 'Grid Thumbnail Image',
      description: 'The image shown on the main portfolio grid (aspect ratio 3:4). If left blank, it falls back to the Hero Image.',
      type: 'image',
      options: { hotspot: true },
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
          preview: {
            select: {
              title: 'alt',
              media: 'image',
              aspect: 'aspectRatio',
            },
            prepare(selection) {
              const { title, media, aspect } = selection
              return {
                title: `${aspect} - ${title || 'No Alt Text'}`,
                media,
              }
            },
          },
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
