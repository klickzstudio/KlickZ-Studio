import { defineField, defineType } from 'sanity'

export const landingPage = defineType({
  name: 'landingPage',
  title: 'SEO Landing Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'H1 Title',
      description: 'The primary main heading for this SEO landing page.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'The keyword-targeted URL (e.g., "south-indian-wedding-photography")',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'heroImage',
      title: 'Banner Hero Image',
      description: 'Hand-picked image for the top banner. Fallback to Open Graph image if empty.',
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
            { 
              name: 'image', 
              type: 'image', 
              options: { hotspot: true }, 
              title: 'Image',
              fields: [
                {
                  name: 'rotation',
                  title: 'Rotation',
                  type: 'number',
                  options: {
                    list: [
                      { title: '0°', value: 0 },
                      { title: '90° CW', value: 90 },
                      { title: '180°', value: 180 },
                      { title: '270° CW', value: 270 },
                    ],
                    layout: 'radio',
                    direction: 'horizontal',
                  },
                  initialValue: 0,
                },
              ],
            },
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
      title: 'Sharing Image',
      type: 'image',
      fields: [
        {
          name: 'rotation',
          title: 'Rotation',
          type: 'number',
          options: {
            list: [
              { title: '0°', value: 0 },
              { title: '90° CW', value: 90 },
              { title: '180°', value: 180 },
              { title: '270° CW', value: 270 },
            ],
            layout: 'radio',
            direction: 'horizontal',
          },
          initialValue: 0,
        },
      ],
    }),
    defineField({
      name: 'content',
      title: 'Page Content',
      description: 'Rich text content for this landing page, optimized for keywords.',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'associatedCategory',
      title: 'Associated Photography Category',
      description: 'Automatically pull in a gallery of images at the bottom of this text content page.',
      type: 'reference',
      to: [{ type: 'photographyCategory' }],
    }),
  ],
})
