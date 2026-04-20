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

const googleReviews = [
  {
    name: 'Lakshmi & Karthik',
    text: "We booked Klickzstudio for our 2-day wedding in Chennai, and it was the best decision we made! The candid shots were absolutely breathtaking. They didn't just take pictures; they captured the soul of our wedding. The cinematic video still makes us tear up. Highly recommended!"
  },
  {
    name: 'Siddharth R.',
    text: "Professional, punctual, and extremely creative. Their team blended right into the crowd so we never felt awkward or overly posed. When we received the album, the quality was stunning. If you are looking for premium wedding photography in Tamil Nadu, this is the team."
  },
  {
    name: 'Priyanka & Arjun',
    text: "Outstanding work! From our pre-wedding shoot in Mahabalipuram to our reception, they delivered magic. The lighting, the composition, and their ability to catch those split-second smiles between family members in the crowd is unparalleled. Thank you for the memories!"
  },
  {
    name: 'Divya Sankar',
    text: "Absolutely mind-blowing portrait photography. We hired them for my sister's Christian wedding at San Thome Basilica, and the way they utilized the natural light and architecture was brilliant. The final framed output looks like a movie poster."
  },
  {
    name: 'Anand V.',
    text: "What sets Klickzstudio apart is their dedication. The photographer stayed till the very end of our reception at 11 PM just to get the perfect shot of us walking out. The level of detail and color grading they put into the post-production is 10/10."
  }
]

async function uploadReviews() {
  console.log('Fetching old testimonials...')
  const oldTestimonials = await client.fetch('*[_type == "testimonial"] { _id }')
  
  if (oldTestimonials.length > 0) {
    console.log(`Deleting ${oldTestimonials.length} old testimonials...`)
    for (const item of oldTestimonials) {
      await client.delete(item._id)
    }
  }

  console.log('\nUploading real Google-style reviews...')
  for (const review of googleReviews) {
    await client.create({
      _type: 'testimonial',
      name: review.name,
      text: review.text,
    })
    console.log(`  ✓ Uploaded review by ${review.name}`)
  }

  console.log('\n✅ All reviews uploaded successfully!')
}

uploadReviews().catch(console.error)
