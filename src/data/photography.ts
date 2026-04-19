export interface PhotographyImage {
  image: string
  title?: string
  altText?: string
}

export const fallbackPhotography: Record<string, PhotographyImage[]> = {}
