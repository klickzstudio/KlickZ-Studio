export interface PhotographyImage {
  image: string
  imageObj?: any
  dimensions?: {
    width: number
    height: number
    aspectRatio: number
  }
  title?: string
  altText?: string
}

export const fallbackPhotography: Record<string, PhotographyImage[]> = {}
