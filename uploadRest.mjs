import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_WRITE_TOKEN

const client = createClient({
  projectId,
  dataset,
  token,
  useCdn: false,
  apiVersion: '2024-04-03',
})

const HERO_DIR = path.resolve('../4K_Hero_Images')
const OWNER_DIR = path.resolve('../KlickZstudio_Owner')

async function uploadHeroAndOwner() {
  console.log('Starting remaining uploads...')

  // 1. Upload Hero Slides
  if (fs.existsSync(HERO_DIR)) {
    const files = fs.readdirSync(HERO_DIR).filter(f => f.match(/\.(webp|jpg|jpeg|png)$/i)).slice(0, 5) // max 5 per instructions
    console.log(`Uploading ${files.length} Hero Slides...`)
    
    for (const [index, file] of files.entries()) {
      const filePath = path.join(HERO_DIR, file)
      try {
        const asset = await client.assets.upload('image', fs.createReadStream(filePath), { filename: file })
        await client.create({
          _type: 'heroSlide',
          heading: 'Cinematic Wedding Legacies',
          subheading: 'Capturing real emotions, not staged moments',
          image: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
          order: index
        })
        console.log(`Hero Slide ${index + 1} uploaded.`)
      } catch (err) {
        console.error(`Error uploading hero slide ${file}:`, err.message)
      }
    }
  }

  // 2. Upload Owner Portrait
  if (fs.existsSync(OWNER_DIR)) {
    const files = fs.readdirSync(OWNER_DIR).filter(f => f.match(/\.(webp|jpg|jpeg|png)$/i))
    if (files.length > 0) {
      console.log('Uploading Owner Portrait...')
      try {
        const file = files[0]
        const filePath = path.join(OWNER_DIR, file)
        const asset = await client.assets.upload('image', fs.createReadStream(filePath), { filename: file })
        
        // Find siteSettings and update it
        const settings = await client.fetch('*[_type == "siteSettings"][0]')
        if (settings) {
          await client.patch(settings._id)
            .set({ 
              founderName: 'Kotteswaran (Kotty)',
              founderImage: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
            })
            .commit()
          console.log('SiteSettings updated with owner portrait.')
        } else {
             // Create siteSettings if it doesn't exist
             await client.create({
                _type: 'siteSettings',
                title: 'KLICKZSTUDIO',
                founderName: 'Kotteswaran (Kotty)',
                founderImage: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
             })
             console.log('SiteSettings created with owner portrait.')
        }
      } catch (err) {
        console.error('Error uploading owner portrait:', err.message)
      }
    }
  }

  console.log('Finished final upload script!')
}

uploadHeroAndOwner()
