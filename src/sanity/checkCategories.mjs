
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '5qlflqnq',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-03-24'
})

async function getPortfolioLinks() {
  try {
    const categories = await client.fetch(`*[_type == "photographyCategory"] { 
      title, 
      "slug": slug.current, 
      "image": heroImage.asset->url,
      "preview": *[_type == "photographyImage" && category->slug.current == ^.slug.current][0].image.asset->url
    }`)
    console.log(JSON.stringify(categories, null, 2))
  } catch (err) {
    console.error(err)
  }
}

getPortfolioLinks()
