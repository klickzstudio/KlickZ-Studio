import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { photographyCategorySEOQuery, photographyImagesQuery, landingPageQuery } from '@/sanity/lib/queries'
import { PhotographyGrid } from '@/components/photography/PhotographyGrid'
import { fallbackPhotography } from '@/data/photography'
import { constructMetadata } from '@/lib/seo'
import { PortableText } from 'next-sanity'
import { EditorialHero } from '@/components/ui/EditorialHero'
import { EditorialGallery } from '@/components/photography/EditorialGallery'

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params

  // 1. Check if it's an SEO Landing Page
  const landingPageData = await client.fetch(landingPageQuery, { slug: categorySlug })
  if (landingPageData) {
    return constructMetadata({
      title: landingPageData.title,
      description: landingPageData.seoDescription,
      image: landingPageData.ogImage,
    })
  }

  // 2. Fallback to Photography Category
  const seoData = await client.fetch(photographyCategorySEOQuery, { slug: categorySlug })
  if (seoData) {
    return constructMetadata({
      title: seoData.title,
      description: seoData.seoDescription,
      image: seoData.ogImage,
    })
  }

  const formattedTitle = categorySlug.split('-').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  return constructMetadata({ title: formattedTitle })
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params
  
  // Try finding as an SEO Landing Page first
  const landingPageData = await client.fetch(landingPageQuery, { slug: categorySlug }, { next: { revalidate: 60 } })

  if (landingPageData) {
    // It's a programmatic SEO Landing Page
    let associatedImages = []
    if (landingPageData.associatedCategorySlug) {
      associatedImages = await client.fetch(photographyImagesQuery, { slug: landingPageData.associatedCategorySlug })
    }

    const heroImage = landingPageData.heroImage || landingPageData.ogImage || (associatedImages[0]?.image || fallbackPhotography[landingPageData.associatedCategorySlug || '']?.[0]?.image || 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80')

    return (
      <>
        <EditorialHero 
          title={landingPageData.title}
          subtitle="Editorial Landing Page"
          image={heroImage}
        />
        
        {landingPageData.content && (
          <section className="pb-20 md:pb-28 bg-white border-t border-[#F9F6F2]">
             <div className="max-w-[800px] mx-auto px-6 lg:px-10 py-16">
               <div className="prose prose-lg prose-headings:font-cormorant prose-p:font-lato prose-p:font-light prose-p:text-[#555] mx-auto text-center">
                 <PortableText value={landingPageData.content} />
               </div>
               <div className="w-16 h-[1px] bg-[#C9A96E] mx-auto mt-16" />
             </div>
          </section>
        )}
        
        {landingPageData.editorialGallery && landingPageData.editorialGallery.length > 0 && (
          <EditorialGallery items={landingPageData.editorialGallery} />
        )}
        
        {associatedImages.length > 0 && <PhotographyGrid images={associatedImages} />}
      </>
    )
  }

  // Fallback to standard Photography Category behavior
  const validFallbackCategories = Object.keys(fallbackPhotography)
  let images = []
  let categoryTitle = categorySlug.split('-').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  let editorialGallery = []

  try {
    images = await client.fetch(photographyImagesQuery, { slug: categorySlug }, { next: { revalidate: 60 } })
    const seoData = await client.fetch(photographyCategorySEOQuery, { slug: categorySlug })
    if (seoData?.title) {
       categoryTitle = seoData.title
    }
    if (seoData?.editorialGallery) {
      editorialGallery = seoData.editorialGallery
    }
  } catch (error) {
    console.error(`Failed to fetch images for category ${categorySlug}:`, error)
  }

  if (!images || images.length === 0) {
     if (validFallbackCategories.includes(categorySlug)) {
        images = fallbackPhotography[categorySlug]
     } else {
        notFound()
     }
  }

  const seoData = await client.fetch(photographyCategorySEOQuery, { slug: categorySlug })
  const catHeroImage = seoData?.heroImage || images[0]?.image || 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80'

  return (
    <>
      <EditorialHero 
        title={categoryTitle}
        subtitle="Editorial Portfolios"
        image={catHeroImage}
      />

      {editorialGallery && editorialGallery.length > 0 && (
        <EditorialGallery items={editorialGallery} />
      )}

      <PhotographyGrid images={images} />
    </>
  )
}
