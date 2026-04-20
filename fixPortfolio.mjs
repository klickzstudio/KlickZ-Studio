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

// First, get existing portfolio items to delete them
const existing = await client.fetch('*[_type == "portfolioItem"] { _id }')
console.log(`Deleting ${existing.length} old portfolio items...`)
for (const item of existing) {
  await client.delete(item._id)
}

// Get real images from our categories
const weddingImages    = await client.fetch('*[_type == "photographyImage" && category._ref == "category-wedding"] | order(_createdAt asc) [0..1] { "url": image.asset->url }')
const outdoorImages    = await client.fetch('*[_type == "photographyImage" && category._ref == "category-outdoor"] | order(_createdAt asc) [0..1] { "url": image.asset->url }')
const receptionImages  = await client.fetch('*[_type == "photographyImage" && category._ref == "category-reception"] | order(_createdAt asc) [0..1] { "url": image.asset->url }')
const christianImages  = await client.fetch('*[_type == "photographyImage" && category._ref == "category-christian-wedding"] | order(_createdAt asc) [0..1] { "url": image.asset->url }')

const portfolioData = [
  {
    title: 'Aarthi & Surya — A Traditional Tamil Wedding',
    categories: ['Wedding', 'Chennai'],
    href: '/best-candid-wedding-photography-chennai',
    imageUrl: weddingImages[0]?.url,
    featured: true,
  },
  {
    title: 'Golden Hour — Outdoor Pre-Wedding Session',
    categories: ['Outdoor', 'Pre-Wedding'],
    href: '/outdoor-photography-chennai',
    imageUrl: outdoorImages[0]?.url,
    featured: true,
  },
  {
    title: 'Anita & Raj — Wedding Reception, Chennai',
    categories: ['Reception', 'Chennai'],
    href: '/wedding-reception-photography-chennai',
    imageUrl: receptionImages[0]?.url,
    featured: true,
  },
  {
    title: 'Grace & Daniel — Christian Wedding Photography',
    categories: ['Christian Wedding', 'Chennai'],
    href: '/christian-wedding-photography-chennai',
    imageUrl: christianImages[0]?.url,
    featured: true,
  },
]

console.log('\nCreating new portfolio items...')
for (const item of portfolioData) {
  if (!item.imageUrl) {
    console.log(`  ⚠ Skipping "${item.title}" - no image found`)
    continue
  }

  // Upload image asset reference 
  // The images are already in Sanity, get the asset _ref from URL
  const assetId = item.imageUrl.split('/').pop()?.replace(/\.[^.]+$/, '')
  const ext = item.imageUrl.split('.').pop()
  const assetRef = `image-${assetId}-${ext}`

  await client.create({
    _type: 'portfolioItem',
    title: item.title,
    slug: { _type: 'slug', current: item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') },
    categories: item.categories,
    href: item.href,
    featured: item.featured,
    image: {
      _type: 'image',
      asset: { _type: 'reference', _ref: assetRef },
    },
  })
  console.log(`  ✓ Created: ${item.title}`)
}

console.log('\n✅ Portfolio items updated successfully!')
