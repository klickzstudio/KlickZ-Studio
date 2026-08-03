import { createImageUrlBuilder } from '@sanity/image-url'
import type { Image } from 'sanity'

import { dataset, projectId } from '../env'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlForImage = (source: Image, width?: number, height?: number) => {
  let builder = imageBuilder?.image(source).auto('format').fit('max')
  if (width) builder = builder.width(width)
  if (height) builder = builder.height(height)
  return builder
}

export const urlForHeroImage = (source: Image, width?: number, height?: number) => {
  let builder = imageBuilder?.image(source).auto('format').fit('max')
  if (width) builder = builder.width(width)
  if (height) builder = builder.height(height)
  return builder
}

export const urlForGalleryImage = (source: Image, width?: number, height?: number) => {
  let builder = imageBuilder?.image(source).auto('format').fit('max')
  if (width) builder = builder.width(width)
  if (height) builder = builder.height(height)
  return builder
}

export const urlForCardImage = (source: Image, width?: number, height?: number) => {
  let builder = imageBuilder?.image(source).auto('format').fit('crop')
  if (width) builder = builder.width(width)
  if (height) builder = builder.height(height)
  return builder
}

export const urlForPortrait = (source: Image, width?: number, height?: number) => {
  let builder = imageBuilder?.image(source).auto('format').fit('crop')
  if (width) builder = builder.width(width)
  if (height) builder = builder.height(height)
  return builder
}

export const urlForThumbnail = (source: Image, width?: number, height?: number) => {
  let builder = imageBuilder?.image(source).auto('format').fit('crop')
  if (width) builder = builder.width(width)
  if (height) builder = builder.height(height)
  return builder
}
