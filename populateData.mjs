import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2024-04-03',
})

const CHENNAI_ADDRESS = {
  _type: 'object',
  street: 'V.V. Kovil Street, Thiruvanmiyur',
  city: 'Chennai',
  region: 'Tamil Nadu',
  postalCode: '600041',
  country: 'India'
}

async function populateProductionData() {
  console.log('Populating site settings with production-ready data...')
  
  try {
    const siteSettings = await client.fetch('*[_type == "siteSettings"][0]')
    
    const updatedSettings = {
      ...siteSettings,
      title: 'KLICKZSTUDIO',
      tagline: 'Moments Fade, Memories Don\'t',
      phone: '+91 97102 98451',
      whatsappPhone: '919710298451',
      email: 'Klickzstudio@gmail.com',
      address: CHENNAI_ADDRESS,
      socials: {
        _type: 'object',
        facebook: 'https://www.facebook.com/klickzstudio/',
        instagram: 'https://www.instagram.com/weddingby_klickzstudio/',
        youtube: 'https://www.youtube.com/@klickzstudio1320',
      },
      heroEyebrow: 'Est. 2005 · Chennai & Destination Weddings',
      heroSubtext: '20+ years of capturing real emotions, not staged moments',
      stats: [
        { _key: '1', number: 20, label: 'Years Exp', suffix: '+' },
        { _key: '2', number: 750, label: 'Weddings', suffix: '+' },
        { _key: '3', number: 15, label: 'Destinations', suffix: '+' },
        { _key: '4', number: 1000, label: 'Happy Couples', suffix: '+' }
      ]
    }

    await client.createOrReplace(updatedSettings)
    console.log('Production data populated successfully.')

  } catch (err) {
    console.error('Error populating data:', err.message)
  }
}

populateProductionData()
