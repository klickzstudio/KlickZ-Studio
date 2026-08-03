import { defineField, defineType } from 'sanity'

export const sitePage = defineType({
  name: 'sitePage',
  title: 'Core Site Page',
  type: 'document',
  groups: [
    { name: 'general', title: '📄 Page Info', default: true },
    { name: 'content', title: '📝 Body & Gallery' },
    { name: 'seo', title: '🔍 SEO Metadata' },
  ],
  fields: [
    // ── GENERAL GROUP ─────────────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Page Title',
      description: 'The main heading title for this core page (e.g., "About Us", "Our Services").',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      description: 'The web path identifier (e.g. "about", "services", "contact").',
      type: 'slug',
      group: 'general',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) =>
        Rule.required().custom((slug) => {
          if (!slug || !slug.current) return 'URL Slug is required.'
          if (slug.current.startsWith('/')) return 'Do not include a leading slash "/"'
          return true
        }),
    }),
    defineField({
      name: 'subtitle',
      title: 'Page Subtitle',
      description: 'Subheading text displayed beneath the main page title.',
      type: 'string',
      group: 'general',
    }),

    // ── CONTENT GROUP ─────────────────────────────────────────────────────
    defineField({
      name: 'content',
      title: 'Page Body Content',
      description: 'Rich text content for this core page.',
      type: 'array',
      group: 'content',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'heroImage',
      title: 'Banner Hero Image',
      description: 'Large header image displayed at the top of the page.',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
    }),
    defineField({
      name: 'editorialGallery',
      title: 'Editorial Gallery',
      description: 'Hand-picked photos with custom aspect ratios.',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          title: 'Gallery Image',
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

    // ── SEO GROUP ─────────────────────────────────────────────────────────
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      description: 'Search engine description under 160 characters.',
      type: 'text',
      group: 'seo',
      rows: 3,
      validation: (Rule) => Rule.max(160).warning('Optimal SEO descriptions are 160 characters or less.'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      description: 'Social sharing image.',
      type: 'image',
      group: 'seo',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      media: 'heroImage',
    },
    prepare({ title, slug, media }) {
      return {
        title: title || 'Untitled Core Page',
        subtitle: `/${slug || 'no-slug'}`,
        media,
      }
    },
  },
})
