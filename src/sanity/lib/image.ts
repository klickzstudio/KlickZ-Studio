import { createImageUrlBuilder } from '@sanity/image-url'
import type { Image } from 'sanity'

import { dataset, projectId } from '../env'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlForImage = (source: any, width?: number, height?: number) => {
  if (!source) return null
  if (typeof source === 'string') return null
  if (!source.asset && !source._ref) return null

  try {
    let builder = imageBuilder?.image(source).auto('format').fit('max')
    if (width) builder = builder.width(width)
    if (height) builder = builder.height(height)
    return builder
  } catch {
    return null
  }
}

export const urlForHeroImage = (source: any, width?: number, height?: number) => urlForImage(source, width, height)
export const urlForGalleryImage = (source: any, width?: number, height?: number) => urlForImage(source, width, height)
export const urlForCardImage = (source: any, width?: number, height?: number) => urlForImage(source, width, height)
export const urlForPortrait = (source: any, width?: number, height?: number) => urlForImage(source, width, height)
export const urlForThumbnail = (source: any, width?: number, height?: number) => urlForImage(source, width, height)
