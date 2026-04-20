import { defineField, defineType } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: '🏠 Home Page',
  type: 'document',
  groups: [
    { name: 'intro',    title: '📸 Intro Images' },
    { name: 'services', title: '🎯 Services Section' },
    { name: 'gallery',  title: '🖼️ Horizontal Gallery' },
  ],
  fields: [

    // ─────────────────────────────────────────────
    // INTRO SECTION (Two overlapping square images)
    // ─────────────────────────────────────────────
    defineField({
      name: 'introMainImage',
      title: 'Intro — Main Image (Large, back layer)',
      type: 'image',
      group: 'intro',
      options: { hotspot: true },
      description: 'The larger photo shown top-right in the "Welcome to KLICKZSTUDIO" section.',
    }),
    defineField({
      name: 'introSecondaryImage',
      title: 'Intro — Secondary Image (Small, front layer)',
      type: 'image',
      group: 'intro',
      options: { hotspot: true },
      description: 'The smaller overlapping photo shown bottom-left.',
    }),

    // ─────────────────────────────────────────────
    // SERVICES SECTION (4 cards — fully editable)
    // ─────────────────────────────────────────────
    defineField({
      name: 'services',
      title: 'Service Cards',
      type: 'array',
      group: 'services',
      description: 'Edit the 4 service cards shown on the home page. You can change the name, description, background photo, and link for each.',
      of: [
        {
          type: 'object',
          title: 'Service Card',
          preview: {
            select: { title: 'title', media: 'image' },
          },
          fields: [
            {
              name: 'title',
              title: 'Card Name',
              type: 'string',
              description: 'e.g. "Candid Wedding"',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
              description: 'Short tagline shown on hover.',
            },
            {
              name: 'image',
              title: 'Background Image',
              type: 'image',
              options: { hotspot: true },
            },
            {
              name: 'href',
              title: 'Link URL',
              type: 'string',
              description: 'e.g. /best-candid-wedding-photography-chennai',
            },
          ],
        },
      ],
      options: { layout: 'grid' },
      validation: (Rule) => Rule.max(4),
    }),

    // ─────────────────────────────────────────────
    // HORIZONTAL GALLERY (Scroll strip)
    // ─────────────────────────────────────────────
    defineField({
      name: 'horizontalGallery',
      title: 'Horizontal Scroll Gallery',
      type: 'array',
      group: 'gallery',
      description: 'Images for the dark "A Glimpse into Our World" scroll strip. Recommended: 8–12.',
      of: [
        {
          type: 'object',
          title: 'Gallery Image',
          preview: {
            select: { media: 'image', title: 'alt' },
          },
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
            },
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'e.g. "Bride at sunset, Chennai"',
            },
          ],
        },
      ],
      options: { layout: 'grid' },
    }),

  ],
})
