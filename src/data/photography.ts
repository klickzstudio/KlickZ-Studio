export interface PhotographyImage {
  image: string
  imageObj?: any
  title?: string
  altText?: string
}

export const fallbackPhotography: Record<string, PhotographyImage[]> = {}
