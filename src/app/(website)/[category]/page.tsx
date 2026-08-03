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
import { EmptyPageTemplate } from '@/components/ui/EmptyPageTemplate'
import { formatSlugToTitle } from '@/lib/utils'

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
    // Priority 1: Direct referenced galleryImages on Landing Page document
    const curatedGalleryImages = (landingPageData.galleryImages || []).filter((img: any) => Boolean(img && img.image))

    // Priority 2: Fallback to associatedCategory images if no curated galleryImages selected
    let associatedCategoryImages: any[] = []
    if (curatedGalleryImages.length === 0 && landingPageData.associatedCategorySlug) {
      try {
        associatedCategoryImages = await client.fetch(photographyImagesQuery, {
          slug: landingPageData.associatedCategorySlug,
        })
      } catch (err) {
        console.error('Failed to fetch associated category images:', err)
      }
    }

    // Resolved gallery images list
    const galleryImages = curatedGalleryImages.length > 0 ? curatedGalleryImages : associatedCategoryImages

    const heroImage =
      (landingPageData.heroImage ? urlForImage(landingPageData.heroImage)?.url() : null) ||
      (landingPageData.categoryHeroImage ? urlForImage(landingPageData.categoryHeroImage)?.url() : null) ||
      (galleryImages[0]?.imageObj ? urlForImage(galleryImages[0].imageObj)?.url() : galleryImages[0]?.image) ||
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
        
        {galleryImages.length > 0 ? (
          <PhotographyGrid images={galleryImages} />
        ) : (
          <EmptyPageTemplate
            slug={categorySlug}
            title={landingPageData.title}
            description={landingPageData.seoDescription}
            heroImage={heroImage}
          />
        )}
      </>
    )
  }

  // 2. Fetch standard Photography Category data & images (exact category match)
  let images: any[] = []
  let seoData: any = null

  try {
    images = await client.fetch(
      photographyImagesQuery,
      { slug: categorySlug },
      { next: { revalidate: 60 } }
    )
    seoData = await client.fetch(
      photographyCategorySEOQuery,
      { slug: categorySlug },
      { next: { revalidate: 60 } }
    )
  } catch (error) {
    console.error(`Failed to fetch category data for ${categorySlug}:`, error)
  }

  // Render category layout if images or category document exist
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

  // Priority 3: Render clean Empty Page Template for registered routes or empty category documents
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
