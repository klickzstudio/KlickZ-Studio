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

async function checkDetailed() {
  const photoCount = await client.fetch('count(*[_type == "photographyImage"])')
  const portfolioCount = await client.fetch('count(*[_type == "portfolioItem"])')
  const heroCount = await client.fetch('count(*[_type == "heroSlide"])')
  
  console.log('--- Detailed Sanity Count ---')
  console.log('Photography Images (Gallery):', photoCount)
  console.log('Portfolio Items (Grid):', portfolioCount)
  console.log('Hero Slides:', heroCount)
  
  if (photoCount > 0) {
    const samples = await client.fetch('*[_type == "photographyImage"][0...5]{title}')
    console.log('Sample Photo Titles:', JSON.stringify(samples, null, 2))
  }
}

checkDetailed()
