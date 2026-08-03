import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import {
  photographyCategorySEOQuery,
  photographyImagesQuery,
  landingPageQuery,
} from '@/sanity/lib/queries'
import { PhotographyGrid } from '@/components/photography/PhotographyGrid'
import { constructMetadata } from '@/lib/seo'
import { PortableText } from 'next-sanity'
import { EditorialHero } from '@/components/ui/EditorialHero'
import { EditorialGallery } from '@/components/photography/EditorialGallery'
import { urlForImage } from '@/sanity/lib/image'
import { getValidDynamicSlugs } from '@/config/routes'
import { EmptyPageTemplate, formatSlugToTitle } from '@/components/ui/EmptyPageTemplate'

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params
  const canonicalPath = `/${categorySlug}`

  try {
    // 1. Check if it's an SEO Landing Page
    const landingPageData = await client.fetch(landingPageQuery, { slug: categorySlug })
    if (landingPageData) {
      return constructMetadata({
        title: landingPageData.title,
        description: landingPageData.seoDescription,
        image: landingPageData.ogImage,
        canonicalPath,
      })
    }

    // 2. Check Photography Category
    const seoData = await client.fetch(photographyCategorySEOQuery, { slug: categorySlug })
    if (seoData) {
      return constructMetadata({
        title: seoData.title,
        description: seoData.seoDescription,
        image: seoData.ogImage,
        canonicalPath,
      })
    }
  } catch (error) {
    console.error(`Metadata fetch failed for ${categorySlug}:`, error)
  }

  // 3. Fallback metadata for valid registered dynamic route
  const validSlugs = getValidDynamicSlugs()
  if (validSlugs.has(categorySlug)) {
    const formattedTitle = formatSlugToTitle(categorySlug)
    return constructMetadata({
      title: `${formattedTitle} | KLICKZSTUDIO`,
      description: `Explore premium ${formattedTitle} photography by KLICKZSTUDIO Chennai. Award-winning visual storytellers.`,
      canonicalPath,
    })
  }

  return constructMetadata({ title: formatSlugToTitle(categorySlug), canonicalPath })
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params
  
  // 1. Try finding as an SEO Landing Page first
  let landingPageData = null
  try {
    landingPageData = await client.fetch(
      landingPageQuery,
      { slug: categorySlug },
      { next: { revalidate: 60 } }
    )
  } catch (error) {
    console.error(`Failed to fetch landing page for ${categorySlug}:`, error)
  }

  if (landingPageData) {
    let associatedImages: any[] = []
    if (landingPageData.associatedCategorySlug) {
      try {
        associatedImages = await client.fetch(photographyImagesQuery, {
          slug: landingPageData.associatedCategorySlug,
        })
      } catch (err) {
        console.error('Failed to fetch associated images:', err)
      }
    }

    const heroImage =
      (landingPageData.heroImage ? urlForImage(landingPageData.heroImage)?.url() : null) ||
      (landingPageData.categoryHeroImage ? urlForImage(landingPageData.categoryHeroImage)?.url() : null) ||
      (associatedImages[0]?.imageObj ? urlForImage(associatedImages[0].imageObj)?.url() : associatedImages[0]?.image) ||
      '/KlickzStudio_Logo_last_final.png'

    return (
      <>
        <EditorialHero title={landingPageData.title} image={heroImage} />
        
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
          <EditorialGallery
            items={landingPageData.editorialGallery.map((item: any) => ({
              ...item,
              image: item.image ? urlForImage(item.image)?.url() : item.imageUrl,
            }))}
          />
        )}
        
        {associatedImages.length > 0 && <PhotographyGrid images={associatedImages} />}
      </>
    )
  }

  // 2. Fetch standard Photography Category data & images
  let images: any[] = []
  let seoData: any = null

  try {
    images = await client.fetch(
      photographyImagesQuery,
      { slug: categorySlug },
      { next: { revalidate: 60 } }
    )
    
    // Fallback to main 'wedding' category images if sub-wedding category has no specific images uploaded yet
    const weddingSubSlugs = new Set([
      'hindu-wedding-photography',
      'muslim-wedding-photography',
      'christian-wedding-photography-chennai',
      'brahmin-wedding-photography',
      'telugu-wedding-photography',
      'malayali-wedding-photography',
      'punjabi-wedding-photography',
      'sangeet-photography',
      'haldi-ceremony-photography',
      'wedding-rituals-photography',
      'wedding-reception-photography',
      'best-candid-wedding-photography-chennai',
    ])

    if ((!images || images.length === 0) && weddingSubSlugs.has(categorySlug)) {
      images = await client.fetch(
        photographyImagesQuery,
        { slug: 'wedding' },
        { next: { revalidate: 60 } }
      )
    }

    seoData = await client.fetch(
      photographyCategorySEOQuery,
      { slug: categorySlug },
      { next: { revalidate: 60 } }
    )
  } catch (error) {
    console.error(`Failed to fetch category data for ${categorySlug}:`, error)
  }

  // Render category layout if images exist
  if (images && images.length > 0) {
    const categoryTitle = seoData?.title || formatSlugToTitle(categorySlug)
    const editorialGallery = seoData?.editorialGallery || []
    const catHeroImage =
      (seoData?.heroImage ? urlForImage(seoData.heroImage)?.url() : null) ||
      (images[0]?.imageObj ? urlForImage(images[0].imageObj)?.url() : images[0]?.image) ||
      '/KlickzStudio_Logo_last_final.png'

    return (
      <>
        <EditorialHero title={categoryTitle} image={catHeroImage} />

        {editorialGallery && editorialGallery.length > 0 && (
          <EditorialGallery
            items={editorialGallery.map((item: any) => ({
              ...item,
              image: item.image ? urlForImage(item.image)?.url() : item.imageUrl,
            }))}
          />
        )}

        <PhotographyGrid images={images} />
      </>
    )
  }

  // Render clean Empty Page Template for registered routes or empty category documents
  const validSlugs = getValidDynamicSlugs()
  if (validSlugs.has(categorySlug) || seoData) {
    const title = seoData?.title || formatSlugToTitle(categorySlug)
    const heroImage = seoData?.heroImage ? urlForImage(seoData.heroImage)?.url() : undefined
    return (
      <EmptyPageTemplate
        slug={categorySlug}
        title={title}
        description={seoData?.seoDescription}
        heroImage={heroImage || undefined}
      />
    )
  }

  // 4. Unregistered route -> 404
  notFound()
}
