import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'general', title: '⚙️ General & Hero', default: true },
    { name: 'contact', title: '📞 Contact & Location' },
    { name: 'socials', title: '🌐 Social Media Links' },
    { name: 'brand', title: '👤 Founder & Assets' },
  ],
  fields: [
    // ── GENERAL GROUP ─────────────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Site Brand Title',
      type: 'string',
      group: 'general',
      initialValue: 'KLICKZSTUDIO',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Site Tagline',
      type: 'string',
      group: 'general',
      initialValue: "Moments Fade, Memories Don't",
    }),
    defineField({
      name: 'heroEyebrow',
      title: 'Hero Eyebrow Text',
      type: 'string',
      group: 'general',
      initialValue: 'Est. 2005 · Chennai & Destination Weddings',
    }),
    defineField({
      name: 'heroHeading',
      title: 'Hero Main Heading',
      type: 'string',
      group: 'general',
      initialValue: 'Stories That Last Forever',
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Hero Subtext',
      type: 'string',
      group: 'general',
      initialValue: '20+ years of capturing real emotions, not staged moments',
    }),
    defineField({
      name: 'stats',
      title: 'Company Statistics Counter',
      description: 'Editable numbers and labels for the homepage statistics counter section.',
      type: 'array',
      group: 'general',
      of: [
        {
          type: 'object',
          title: 'Stat Item',
          fields: [
            { name: 'number', title: 'Number', type: 'number', validation: (Rule) => Rule.required() },
            { name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'suffix', title: 'Suffix (e.g. +, M)', type: 'string' },
          ],
          preview: {
            select: { num: 'number', label: 'label', suffix: 'suffix' },
            prepare({ num, label, suffix }) {
              return {
                title: `${num}${suffix || ''} — ${label || 'Stat'}`,
              }
            },
          },
        },
      ],
      initialValue: [
        { number: 20, label: 'Years Exp', suffix: '+' },
        { number: 500, label: 'Weddings', suffix: '+' },
        { number: 15, label: 'Destinations', suffix: '+' },
        { number: 1000, label: 'Happy Couples', suffix: '+' },
      ],
    }),

    // ── CONTACT GROUP ─────────────────────────────────────────────────────
    defineField({
      name: 'phone',
      title: 'Phone Number (Display)',
      type: 'string',
      group: 'contact',
      initialValue: '+91 97102 98451',
    }),
    defineField({
      name: 'whatsappPhone',
      title: 'WhatsApp Phone Number (Numbers only with country code)',
      description: 'Format without spaces or "+" e.g. "919710298451"',
      type: 'string',
      group: 'contact',
      initialValue: '919710298451',
    }),
    defineField({
      name: 'email',
      title: 'Contact Email Address',
      type: 'string',
      group: 'contact',
      initialValue: 'Klickzstudio@gmail.com',
      validation: (Rule) => Rule.email().warning('Enter a valid email address.'),
    }),
    defineField({
      name: 'address',
      title: 'Physical Address',
      type: 'object',
      group: 'contact',
      fields: [
        { name: 'street', title: 'Street Address', type: 'string' },
        { name: 'city', title: 'City', type: 'string' },
        { name: 'postalCode', title: 'Postal Code', type: 'string' },
        { name: 'region', title: 'State / Region', type: 'string' },
        { name: 'country', title: 'Country Code', type: 'string' },
      ],
      initialValue: {
        street: 'No. 123, Sample Street',
        city: 'Chennai',
        postalCode: '600001',
        region: 'Tamil Nadu',
        country: 'IN',
      },
    }),

    // ── SOCIALS GROUP ─────────────────────────────────────────────────────
    defineField({
      name: 'socials',
      title: 'Social Media Profiles',
      type: 'object',
      group: 'socials',
      fields: [
        { name: 'facebook', title: 'Facebook Page URL', type: 'url' },
        { name: 'instagram', title: 'Instagram Profile URL', type: 'url' },
        { name: 'youtube', title: 'YouTube Channel URL', type: 'url' },
      ],
      initialValue: {
        facebook: 'https://www.facebook.com/klickzstudio/',
        instagram: 'https://www.instagram.com/weddingby_klickzstudio/',
        youtube: 'https://www.youtube.com/@klickzstudio1320',
      },
    }),

    // ── BRAND GROUP ───────────────────────────────────────────────────────
    defineField({
      name: 'founderName',
      title: 'Founder / Creative Director Name',
      type: 'string',
      group: 'brand',
      initialValue: 'Kotteswaran',
    }),
    defineField({
      name: 'founderImage',
      title: 'Founder Portrait Photo',
      type: 'image',
      group: 'brand',
      options: { hotspot: true },
    }),
    defineField({
      name: 'introImage1',
      title: 'Home Intro Main Photo',
      type: 'image',
      group: 'brand',
      options: { hotspot: true },
    }),
    defineField({
      name: 'introImage2',
      title: 'Home Intro Secondary Photo',
      type: 'image',
      group: 'brand',
      options: { hotspot: true },
    }),
    defineField({
      name: 'ctaImage',
      title: 'Final CTA Background Photo',
      type: 'image',
      group: 'brand',
      options: { hotspot: true },
    }),
  ],
})
