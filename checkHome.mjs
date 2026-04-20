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

async function checkHomeGallery() {
  try {
    const data = await client.fetch('*[_type == "sitePage" && slug.current == "home"][0]{ "gallery": editorialGallery[].asset->url }')
    console.log(JSON.stringify(data, null, 2))
  } catch (err) {
    console.error(err)
  }
}

checkHomeGallery()
