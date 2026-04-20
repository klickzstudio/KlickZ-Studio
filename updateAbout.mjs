import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2024-04-03',
})

const OWNER_DIR = path.resolve('../KlickZstudio_Owner')

async function updateAboutPage() {
  console.log('Updating About Page in Sanity...')
  
  let heroImageId = null
  
  // Try to find a good hero image from the owner folder or 4K Hero folder
  if (fs.existsSync(OWNER_DIR)) {
    const files = fs.readdirSync(OWNER_DIR).filter(f => f.match(/\.(webp|jpg|jpeg|png)$/i))
    if (files.length > 0) {
      const asset = await client.assets.upload('image', fs.createReadStream(path.join(OWNER_DIR, files[0])))
      heroImageId = asset._id
    }
  }

  const aboutDoc = {
    _type: 'sitePage',
    _id: 'page-about',
    title: 'Capturing the Magic of Human Connection',
    subtitle: 'Two Decades of Excellence in Cinematic Storytelling',
    slug: { _type: 'slug', current: 'about' },
    heroImage: heroImageId ? { _type: 'image', asset: { _type: 'reference', _ref: heroImageId } } : undefined,
    content: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Founded over two decades ago by Kotteswaran (Kotty), KLICKZSTUDIO has grown from a passionate solo endeavor into a premier collective of visual storytellers. Based in the heart of Chennai, we have documented over 500 weddings worldwide, bringing a cinematic and editorial eye to every celebration.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Our philosophy is simple: Moments fade, but memories shouldn\'t. We believe that true wedding photography is about the unscripted, raw emotions—the stolen glances, the joyful tears, and the grand celebrations that make your day unique. We blend seamlessly into your event, capturing the authentic beauty of your connection without intrusive staging.'
          }
        ]
      }
    ],
    seoDescription: 'Learn about KLICKZSTUDIO and our founder Kotty. Premier wedding photography service in Chennai with over 20 years of experience and 500+ weddings documented worldwide.'
  }

  await client.createOrReplace(aboutDoc)
  console.log('About Page updated in Sanity!')
}

updateAboutPage()
