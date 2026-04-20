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

const PHOTOS_BASE_DIR = path.resolve('../Photos_to_Upload')

const folderToCategoryMap = {
  'BIRTHDAY': 'category-birthday',
  'BRIDE-PORTRAIT': 'category-bride-portrait',
  'Baby shower': 'category-baby-shower',
  'Christen wedding': 'category-christian-wedding',
  'GROOM-PORTRAIT': 'category-groom-portrait',
  'OUT-DOOR': 'category-outdoor',
  'RECEPTION': 'category-reception',
  'STILLOUTE': 'category-silhouette',
  'WEDDING': 'category-wedding'
}

async function uploadToCategories() {
  if (!fs.existsSync(PHOTOS_BASE_DIR)) {
    console.error('Photos directory not found!')
    return
  }

  const folders = fs.readdirSync(PHOTOS_BASE_DIR)
  
  for (const folder of folders) {
    const categoryId = folderToCategoryMap[folder]
    if (!categoryId) continue

    const folderPath = path.join(PHOTOS_BASE_DIR, folder)
    if (!fs.statSync(folderPath).isDirectory()) continue

    const files = fs.readdirSync(folderPath).filter(f => f.match(/\.(webp|jpg|jpeg|png)$/i))
    console.log(`Uploading ${files.length} images to ${folder}...`)

    for (const file of files) {
      const filePath = path.join(folderPath, file)
      try {
        const asset = await client.assets.upload('image', fs.createReadStream(filePath), { filename: file })
        await client.create({
          _type: 'photographyImage',
          title: `${folder} - ${path.parse(file).name}`,
          image: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
          category: { _type: 'reference', _ref: categoryId }
        })
        console.log(`Uploaded ${file} to ${folder}`)
      } catch (err) {
        console.error(`Error uploading ${file}:`, err.message)
      }
    }
  }
}

uploadToCategories()
