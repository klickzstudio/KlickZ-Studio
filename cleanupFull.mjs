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

async function cleanupAll() {
  console.log('Stopping and Cleaning up all recently uploaded 4K images...')
  
  try {
    // 1. Delete photographyImage documents
    const photoQuery = `*[_type == "photographyImage" && (title match "* - *" || title match "0*")]`
    const photos = await client.fetch(photoQuery)
    console.log(`Found ${photos.length} photographyImage documents to delete.`)
    for (const doc of photos) {
      await client.delete(doc._id)
    }

    // 2. Double check portfolioItem just in case
    const portfolioQuery = `*[_type == "portfolioItem" && (title match "*Portfolio*" || title match "Premium View*")]`
    const portfolios = await client.fetch(portfolioQuery)
    console.log(`Found ${portfolios.length} portfolioItem documents to delete.`)
    for (const doc of portfolios) {
      await client.delete(doc._id)
    }

    console.log('Cleanup complete! All 4K bulk uploads removed.')
  } catch (err) {
    console.error('Error during cleanup:', err.message)
  }
}

cleanupAll()
