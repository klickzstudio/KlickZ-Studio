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

async function cleanup() {
  console.log('Fetching Home Page singleton...')
  const homePage = await client.fetch('*[_type == "homePage"][0]')
  
  if (!homePage) {
    console.log('No Home Page document found.')
    return
  }

  console.log(`Cleaning up document ID: ${homePage._id}`)

  await client
    .patch(homePage._id)
    .unset([
      'portfolioItems',
      'serviceCandidImage',
      'serviceCinematicImage',
      'serviceDestinationImage',
      'servicePreweddingImage'
    ])
    .commit()

  console.log('✅ Successfully removed stale fields from Sanity data.')
}

cleanup().catch(console.error)
