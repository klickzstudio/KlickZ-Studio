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

const BASE_PHOTO_DIR = 'c:\\Users\\AinZ\\Documents\\Clients_Projects\\Mysticstudios\\Photo_Compressed_resized'

// Map local folder names → Sanity category IDs
const FOLDER_TO_CATEGORY = {
  'BabyShower':       { id: 'category-baby-shower',    slug: 'baby-shower' },
  'Birthday':         { id: 'category-birthday',        slug: 'birthday' },
  'BridePortrait':    { id: 'category-bride-portrait',  slug: 'bride-portrait' },
  'ChristenWedding':  { id: 'category-christian-wedding', slug: 'christian-wedding' },
  'GroomPortrait':    { id: 'category-groom-portrait',  slug: 'groom-portrait' },
  'OutDoor':          { id: 'category-outdoor',         slug: 'outdoor' },
  'Reception':        { id: 'category-reception',       slug: 'reception' },
  'Stilloute':        { id: 'category-silhouette',      slug: 'silhouette' },
  'Wedding':          { id: 'category-wedding',         slug: 'wedding' },
}

const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp']

async function uploadFile(filePath, filename) {
  const stream = fs.createReadStream(filePath)
  const asset = await client.assets.upload('image', stream, { filename })
  return asset._id
}

async function reuploadAll() {
  const folders = Object.keys(FOLDER_TO_CATEGORY)
  let totalUploaded = 0
  let totalFailed = 0

  console.log(`\n📸 Starting gallery re-upload from: ${BASE_PHOTO_DIR}\n`)

  for (const folderName of folders) {
    const category = FOLDER_TO_CATEGORY[folderName]
    const folderPath = path.join(BASE_PHOTO_DIR, folderName)

    if (!fs.existsSync(folderPath)) {
      console.log(`⚠️  Folder not found, skipping: ${folderName}`)
      continue
    }

    const files = fs.readdirSync(folderPath).filter(f =>
      SUPPORTED_EXTENSIONS.includes(path.extname(f).toLowerCase())
    )

    console.log(`\n📁 ${folderName} → [${category.slug}] (${files.length} files)`)

    for (const filename of files) {
      const filePath = path.join(folderPath, filename)
      try {
        // 1. Upload the image asset
        const assetId = await uploadFile(filePath, filename)

        // 2. Create the photographyImage document linked to its category
        const docId = `photo-${category.slug}-${filename.replace(/\.[^.]+$/, '').replace(/[^a-z0-9]/gi, '-').toLowerCase()}`
        await client.createOrReplace({
          _id: docId,
          _type: 'photographyImage',
          title: filename.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
          altText: `${category.slug} photography by KLICKZSTUDIO`,
          category: {
            _type: 'reference',
            _ref: category.id,
          },
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: assetId,
            },
          },
        })
        process.stdout.write(`  ✓ ${filename}\n`)
        totalUploaded++
      } catch (err) {
        process.stdout.write(`  ✗ ${filename}: ${err.message}\n`)
        totalFailed++
      }
    }
  }

  console.log(`\n✅ Done! Uploaded: ${totalUploaded} | Failed: ${totalFailed}`)
}

reuploadAll()
