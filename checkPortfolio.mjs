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

const items = await client.fetch('*[_type == "portfolioItem"] | order(_updatedAt desc) { _id, title, "image": image.asset->url, href }')
console.log(JSON.stringify(items, null, 2))
