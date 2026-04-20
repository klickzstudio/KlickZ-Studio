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

async function getCategories() {
  const docs = await client.fetch('*[_type == "photographyCategory"]{title, "id": _id, "slug": slug.current}')
  console.log(JSON.stringify(docs, null, 2))
}

getCategories()
