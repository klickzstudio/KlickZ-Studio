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

const PHOTO_PATH = 'c:\\Users\\AinZ\\Documents\\Clients_Projects\\Mysticstudios\\KlickZstudio_Owner\\20231122233546_0F4A0929.webp'

async function updateFounderInfo() {
  console.log('Updating Founder info and photo...')
  
  try {
    // 1. Upload the specific photo
    const photoStream = fs.createReadStream(PHOTO_PATH)
    const asset = await client.assets.upload('image', photoStream, {
      filename: path.basename(PHOTO_PATH)
    })
    console.log('Photo uploaded successfully:', asset._id)

    // 2. Fetch current siteSettings to preserve other fields if needed, or just update
    const siteSettings = await client.fetch('*[_type == "siteSettings"][0]')
    
    const updatedSettings = {
      ...siteSettings,
      founderImage: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: asset._id
        }
      },
      heroEyebrow: 'Est. 2005 · Chennai & Destination Weddings', // Removed Coimbatore
      // Ensure the About page content in sitePage is also updated if it mentions Coimbatore
    }

    await client.createOrReplace(updatedSettings)
    console.log('Site settings updated with high-quality founder portrait.')

    // 3. Update the About page sitePage document
    const aboutPage = await client.fetch('*[_type == "sitePage" && slug.current == "about"][0]')
    if (aboutPage) {
      const updatedContent = aboutPage.content.map(block => {
        if (block._type === 'block') {
          block.children = block.children.map(span => {
            if (typeof span.text === 'string') {
              span.text = span.text.replace(/Chennai and Coimbatore/g, 'Chennai')
            }
            return span
          })
        }
        return block
      })

      await client.patch(aboutPage._id).set({ content: updatedContent }).commit()
      console.log('About page content updated (removed Coimbatore).')
    }

  } catch (err) {
    console.error('Error updating founder info:', err.message)
  }
}

updateFounderInfo()
