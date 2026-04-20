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

const PHOTOS_DIR = path.resolve('../Photos_to_Upload')

const categoryMap = {
  'BIRTHDAY': 'Birthday',
  'BRIDE-PORTRAIT': 'Bridal Portraits',
  'Baby shower': 'Baby Shower',
  'Christen wedding': 'Christian Wedding',
  'GROOM-PORTRAIT': 'Groom Portraits',
  'OUT-DOOR': 'Outdoor',
  'RECEPTION': 'Reception',
  'STILLOUTE': 'Silhouette',
  'WEDDING': 'Wedding'
}

function generateSlug(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
}

async function uploadPortfolio() {
  console.log('Starting upload of portfolio images...')
  
  const folders = fs.readdirSync(PHOTOS_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    
  for (const folder of folders) {
    const category = categoryMap[folder] || folder
    console.log(`Processing folder: ${folder} -> Category: ${category}`)
    
    const folderPath = path.join(PHOTOS_DIR, folder)
    const files = fs.readdirSync(folderPath).filter(f => f.match(/\.(jpg|jpeg|png)$/i))
    
    for (const file of files) {
      const filePath = path.join(folderPath, file)
      const baseName = path.basename(file, path.extname(file))
      
      console.log(`Uploading ${file}...`)
      try {
        // Upload the image asset to Sanity
        const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
          filename: file
        })
        console.log(`Asset uploaded: ${asset._id}`)
        
        // Create the portfolio document
        const titleText = `${category} Portfolio ${baseName}`
        const doc = {
          _type: 'portfolioItem',
          title: titleText,
          slug: { _type: 'slug', current: generateSlug(titleText + '-' + Math.floor(Math.random()*1000)) },
          image: {
            _type: 'image',
            asset: { _type: 'reference', _ref: asset._id }
          },
          categories: [category],
          featured: true, // Make it pop on the site
          clientName: 'Featured Client',
          date: new Date().toISOString()
        }
        
        const createdDoc = await client.create(doc)
        console.log(`Created document: ${createdDoc._id}`)
        
      } catch (err) {
        console.error(`Error uploading ${file}:`, err.message)
      }
    }
  }

  // Handle files in the root of Photos_to_Upload
  const rootFiles = fs.readdirSync(PHOTOS_DIR, { withFileTypes: true })
    .filter(dirent => !dirent.isDirectory() && dirent.name.match(/\.(jpg|jpeg|png)$/i))
    .map(dirent => dirent.name)

  if (rootFiles.length > 0) {
    console.log('Processing root files...')
    for (const file of rootFiles) {
      const filePath = path.join(PHOTOS_DIR, file)
      const baseName = path.basename(file, path.extname(file))
      
      console.log(`Uploading ${file}...`)
      try {
        const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
          filename: file
        })
        
        const titleText = `Premium View ${baseName}`
        const doc = {
          _type: 'portfolioItem',
          title: titleText,
          slug: { _type: 'slug', current: generateSlug(titleText + '-' + Math.floor(Math.random()*1000)) },
          image: {
            _type: 'image',
            asset: { _type: 'reference', _ref: asset._id }
          },
          categories: ['Wedding'], // root fallback
          featured: true,
          date: new Date().toISOString()
        }
        
        await client.create(doc)
        console.log(`Created root document for ${file}`)
      } catch (err) {
        console.error(`Error uploading ${file}:`, err.message)
      }
    }
  }
  
  console.log('Finished upload script!')
}

uploadPortfolio()
