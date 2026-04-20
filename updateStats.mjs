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

const newStats = [
  { _key: 'stat1', number: 20, label: 'Years Exp', suffix: '+' },
  { _key: 'stat2', number: 500, label: 'Weddings', suffix: '+' },
  { _key: 'stat3', number: 15, label: 'Destinations', suffix: '+' },
  { _key: 'stat4', number: 1000, label: 'Happy Couples', suffix: '+' }
]

async function updateStats() {
  console.log('Fetching siteSettings...')
  const settings = await client.fetch('*[_type == "siteSettings"][0]')
  
  if (!settings) {
    console.log('No siteSettings found.')
    return
  }

  console.log(`Updating stats for ${settings.title || 'site'}...`)

  await client
    .patch(settings._id)
    .set({ stats: newStats })
    .commit()

  console.log('✅ Successfully updated stats to 500 weddings.')
}

updateStats().catch(console.error)
