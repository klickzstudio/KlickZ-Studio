import { defineField, defineType } from 'sanity'

export const landingPage = defineType({
  name: 'landingPage',
  title: 'SEO & Service Landing Page',
  type: 'document',
  groups: [
    { name: 'hero', title: '🎯 Hero & Title', default: true },
    { name: 'content', title: '📝 Main Content' },
    { name: 'gallery', title: '🖼️ Gallery & Images' },
    { name: 'seo', title: '🔍 SEO & Social Media' },
  ],
  fields: [
    // ── HERO GROUP ────────────────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Page Title (H1 Heading)',
      description: 'The primary headline displayed at the top of the page. Example: "Muslim Wedding Photography Chennai"',
      type: 'string',
      group: 'hero',
      validation: (Rule) =>
        Rule.required()
          .max(70)
          .warning('Titles under 70 characters look best on search engines and mobile screens.'),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      description: 'The exact web address path for this page (e.g., "muslim-wedding-photography" resolves to "/muslim-wedding-photography").',
      type: 'slug',
      group: 'hero',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) =>
        Rule.required().custom((slug) => {
          if (!slug || !slug.current) return 'URL Slug is required.'
          if (slug.current.startsWith('/')) return 'Do not start the slug with a slash "/"'
          if (/[A-Z]/.test(slug.current)) return 'Slugs should be lowercase only.'
          return true
        }),
    }),
    defineField({
      name: 'heroImage',
      title: 'Banner Hero Image',
      description: 'High-resolution cinematic image displayed at the top of this landing page.',
      type: 'image',
      group: 'hero',
      options: { hotspot: true },
    }),

    // ── CONTENT GROUP ─────────────────────────────────────────────────────
    defineField({
      name: 'content',
      title: 'Page Body Content',
      description: 'Rich text content explaining your services, story, and location highlights.',
      type: 'array',
      group: 'content',
      of: [{ type: 'block' }],
    }),

    // ── GALLERY GROUP ─────────────────────────────────────────────────────
    defineField({
      name: 'editorialGallery',
      title: 'Editorial Gallery Grid',
      description: 'Hand-picked showcase photos with customizable aspect ratios (Portrait, Landscape, Square).',
      type: 'array',
      group: 'gallery',
      of: [
        {
          type: 'object',
          title: 'Gallery Image',
          fields: [
            {
              name: 'image',
              type: 'image',
              title: 'Image File',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'aspectRatio',
              type: 'string',
              title: 'Display Aspect Ratio',
              options: {
                list: [
                  { title: '3:4 (Classic Portrait)', value: '3/4' },
                  { title: '4:3 (Landscape)', value: '4/3' },
                  { title: '16:9 (Cinematic Wide)', value: '16/9' },
                  { title: '1:1 (Square)', value: '1/1' },
                ],
              },
              initialValue: '4/3',
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Image Alt Text',
              description: 'Short description for accessibility and Google Image search.',
            },
          ],
          preview: {
            select: {
              media: 'image',
              aspect: 'aspectRatio',
              alt: 'alt',
            },
            prepare({ media, aspect, alt }) {
              return {
                title: alt || 'Showcase Photo',
                subtitle: `Format: ${aspect || '4/3'}`,
                media,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'galleryImages',
      title: 'Curated Gallery Images',
      description: 'Select existing uploaded photos for this landing page. These images override the category gallery. If no images are selected, the page automatically uses images from the Associated Category.',
      type: 'array',
      group: 'gallery',
      of: [
        {
          type: 'reference',
          to: [{ type: 'photographyImage' }],
        },
      ],
      options: {
        layout: 'grid',
      },
    }),
    defineField({
      name: 'associatedCategory',
      title: 'Auto-Linked Photo Category (Fallback)',
      description: 'Optionally link a Photography Category (e.g. Wedding) to automatically render all tagged photos if Curated Gallery Images is left empty.',
      type: 'reference',
      group: 'gallery',
      to: [{ type: 'photographyCategory' }],
    }),

    // ── SEO GROUP ─────────────────────────────────────────────────────────
    defineField({
      name: 'seoDescription',
      title: 'Search Meta Description',
      description: 'The text snippet shown in Google search results. Recommended length: 120–160 characters.',
      type: 'text',
      group: 'seo',
      rows: 3,
      validation: (Rule) =>
        Rule.max(160).warning('Search engines truncate descriptions longer than 160 characters.'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Share Image (Open Graph)',
      description: 'Image shown when sharing this link on WhatsApp, Facebook, or Twitter. Recommended size: 1200×630.',
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
      category: 'associatedCategory.title',
    },
    prepare({ title, slug, media, category }) {
      return {
        title: title || 'Untitled Landing Page',
        subtitle: `/${slug || 'no-slug'} ${category ? `• Category: ${category}` : ''}`,
        media,
      }
    },
  },
})
