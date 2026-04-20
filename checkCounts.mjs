import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_READ_TOKEN,
  useCdn: false,
  apiVersion: '2024-04-03',
})

async function check() {
  const portfolioCount = await client.fetch('count(*[_type == "portfolioItem"])')
  const heroCount = await client.fetch('count(*[_type == "heroSlide"])')
  const settings = await client.fetch('*[_type == "siteSettings"][0]{title, founderName, founderImage}')
  
  console.log('--- Current Status ---')
  console.log('Portfolio Items:', portfolioCount)
  console.log('Hero Slides:', heroCount)
  console.log('Site Settings:', JSON.stringify(settings, null, 2))
}

check()
