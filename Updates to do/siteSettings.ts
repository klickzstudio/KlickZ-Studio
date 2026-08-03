import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      initialValue: 'KLICKZSTUDIO',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      initialValue: 'We capture your best moments and memories',
    }),
    defineField({
      name: 'heroEyebrow',
      title: 'Hero Eyebrow Text',
      type: 'string',
      initialValue: 'Est. 2005 · Chennai & Destination Weddings',
    }),
    defineField({
      name: 'heroHeading',
      title: 'Hero Main Heading',
      type: 'string',
      initialValue: 'Stories That Last Forever',
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Hero Subtext',
      type: 'string',
      initialValue: '20+ years of capturing real emotions, not staged moments',
    }),
    defineField({
      name: 'stats',
      title: 'Company Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'number', title: 'Number', type: 'number' },
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'suffix', title: 'Suffix', type: 'string', description: 'e.g., + or M' }
          ]
        }
      ],
      initialValue: [
        { number: 20, label: 'Years Exp', suffix: '+' },
        { number: 500, label: 'Weddings', suffix: '+' },
        { number: 15, label: 'Destinations', suffix: '+' },
        { number: 1000, label: 'Happy Couples', suffix: '+' }
      ]
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      initialValue: '+91 97102 98451',
    }),
    defineField({
      name: 'whatsappPhone',
      title: 'WhatsApp Phone Number (without + or spaces)',
      type: 'string',
      initialValue: '919710298451',
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      initialValue: 'Klickzstudio@gmail.com',
    }),
    defineField({
      name: 'address',
      title: 'Physical Address',
      type: 'object',
      fields: [
        { name: 'street', type: 'string' },
        { name: 'city', type: 'string' },
        { name: 'postalCode', type: 'string' },
        { name: 'region', type: 'string' },
        { name: 'country', type: 'string' },
      ],
      initialValue: {
        street: 'No. 123, Sample Street',
        city: 'Chennai',
        postalCode: '600001',
        region: 'Tamil Nadu',
        country: 'IN',
      }
    }),
    defineField({
      name: 'socials',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        { name: 'facebook', type: 'url' },
        { name: 'instagram', type: 'url' },
        { name: 'youtube', type: 'url' },
      ],
      initialValue: {
        facebook: 'https://www.facebook.com/klickzstudio/',
        instagram: 'https://www.instagram.com/weddingby_klickzstudio/',
        youtube: 'https://www.youtube.com/@klickzstudio1320',
      }
    }),
    defineField({
      name: 'founderName',
      title: 'Founder Name',
      type: 'string',
      initialValue: 'Kotteswaran',
    }),
    defineField({
      name: 'founderImage',
      title: 'Founder Portrait',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'introImage1',
      title: 'Home Intro Main Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'introImage2',
      title: 'Home Intro Secondary Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'ctaImage',
      title: 'Final CTA Background Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'topBar',
      title: 'Top Utility Bar',
      type: 'object',
      fields: [
        {
          name: 'email',
          title: 'Email',
          type: 'string',
          initialValue: 'klickzstudio@gmail.com'
        },
        {
          name: 'workingHours',
          title: 'Working Hours',
          type: 'string',
          initialValue: 'Working: 9:00am - 7:00pm'
        },
        {
          name: 'announcement',
          title: 'Announcement Text',
          type: 'string',
          initialValue: 'Trust KlickzStudio to capture them forever!'
        },
      ],
      initialValue: {
        email: 'klickzstudio@gmail.com',
        workingHours: 'Working: 9:00am - 7:00pm',
        announcement: 'Trust KlickzStudio to capture them forever!'
      }
    })
  ]
})
