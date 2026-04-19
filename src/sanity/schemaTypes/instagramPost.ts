import { defineField, defineType } from 'sanity'

export const instagramPost = defineType({
  name: 'instagramPost',
  title: 'Instagram Post',
  type: 'document',
  icon: () => '📸',
  fields: [
    defineField({
      name: 'title',
      title: 'Title / Caption',
      description: 'Short title or description for this post.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      description: 'The thumbnail image for this Instagram post or reel.',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram URL',
      description: 'Full link to the Instagram post or reel.',
      type: 'url',
      validation: (Rule) => Rule.required().uri({ scheme: ['https'] }),
    }),
    defineField({
      name: 'isReel',
      title: 'Is this a Reel?',
      description: 'Toggle on if this is a Reel (video) instead of a photo post.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'hashtags',
      title: 'Hashtags',
      description: 'Hashtags from the original post caption.',
      type: 'text',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Display Order',
      description: 'Lower numbers appear first in the grid.',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'gridSize',
      title: 'Grid Size',
      description: 'Controls how this post appears in the grid layout.',
      type: 'string',
      options: {
        list: [
          { title: 'Square (1×1)', value: 'square' },
          { title: 'Portrait / Tall (1×2)', value: 'portrait' },
          { title: 'Landscape / Wide (2×1)', value: 'landscape' },
        ],
        layout: 'radio',
      },
      initialValue: 'square',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'sortOrderAsc',
      by: [{ field: 'sortOrder', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'thumbnail',
      isReel: 'isReel',
    },
    prepare({ title, media, isReel }) {
      return {
        title: title || 'Untitled Post',
        subtitle: isReel ? '🎬 Reel' : '📷 Post',
        media,
      }
    },
  },
})
