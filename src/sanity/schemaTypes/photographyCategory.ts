import { defineField, defineType } from 'sanity'

export const photographyCategory = defineType({
  name: 'photographyCategory',
  title: 'Photography Category',
  type: 'document',
  groups: [
    { name: 'general', title: '📁 Category Info', default: true },
    { name: 'images', title: '🖼️ Banners & Editorial' },
    { name: 'seo', title: '🔍 SEO Metadata' },
  ],
  fields: [
    // ── GENERAL GROUP ─────────────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Category Title',
      description: 'Public title of the category (e.g. "Wedding Photography", "Outdoor Photography").',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      description: 'The URL path identifier (e.g., "wedding", "outdoor", "birthday").',
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

    // ── IMAGES GROUP ──────────────────────────────────────────────────────
    defineField({
      name: 'thumbnailImage',
      title: 'Grid Thumbnail Image (3:4 Ratio)',
      description: 'Cover photo shown on the main portfolio gallery grid.',
      type: 'image',
      group: 'images',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroImage',
      title: 'Category Banner Hero',
      description: 'Cinematic wide banner image displayed at the top of the category detail page.',
      type: 'image',
      group: 'images',
      options: { hotspot: true },
    }),
    defineField({
      name: 'editorialGallery',
      title: 'Editorial Photo Gallery',
      description: 'Custom aspect ratio images for the category layout.',
      type: 'array',
      group: 'images',
      of: [
        {
          type: 'object',
          title: 'Gallery Image',
          fields: [
            {
              name: 'image',
              type: 'image',
              title: 'Image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
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
                  { title: '1:1 (Square)', value: '1/1' },
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
            prepare({ title, media, aspect }) {
              return {
                title: title || 'Editorial Photo',
                subtitle: `Aspect: ${aspect || '4/3'}`,
                media,
              }
            },
          },
        },
      ],
    }),

    // ── SEO GROUP ─────────────────────────────────────────────────────────
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      description: 'Search engine meta description. Keep under 160 characters.',
      type: 'text',
      group: 'seo',
      rows: 3,
      validation: (Rule) => Rule.max(160).warning('Optimal SEO descriptions are 160 characters or less.'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      description: 'Image displayed when link is shared on social media.',
      type: 'image',
      group: 'seo',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      thumb: 'thumbnailImage',
      hero: 'heroImage',
    },
    prepare({ title, slug, thumb, hero }) {
      return {
        title: title || 'Untitled Category',
        subtitle: `/${slug || 'no-slug'}`,
        media: thumb || hero,
      }
    },
  },
})
