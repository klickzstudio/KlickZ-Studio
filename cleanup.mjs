import { createClient } from '@sanity/client'
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

async function cleanup() {
  console.log('Cleaning up recently uploaded portfolio items...')
  
  try {
    // Delete portfolio items created by my scripts
    // They either have "Portfolio" or "Premium View" in the title based on my script logic
    const query = `*[_type == "portfolioItem" && (title match "*Portfolio*" || title match "Premium View*")]`
    const docs = await client.fetch(query)
    
    console.log(`Found ${docs.length} documents to delete.`)
    
    for (const doc of docs) {
      await client.delete(doc._id)
      console.log(`Deleted: ${doc.title}`)
    }

    // Also check for heroSlides if they were recently added and making things crowded (though hero is usually one section)
    // The user said "home page a lot of images", usually refers to the grid.
    
    console.log('Cleanup complete!')
  } catch (err) {
    console.error('Error during cleanup:', err.message)
  }
}

cleanup()
