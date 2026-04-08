export interface PhotographyImage {
  image: string
  title?: string
  altText?: string
}

export const fallbackPhotography: Record<string, PhotographyImage[]> = {
  'best-candid-wedding-photography-chennai': [],
  'best-pre-wedding-photographers-in-chennai': [
    { image: 'https://images.unsplash.com/photo-1510076857177-7470076ba0cb?q=80&w=2070', altText: 'Pre Wedding shoot' },
    { image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070', altText: 'Couple walking' },
  ],
  'engagement-photography-chennai': [
    { image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070', altText: 'Engagement rings' },
    { image: 'https://images.unsplash.com/photo-1591604466107-ec97de577afd?q=80&w=2070', altText: 'Proposal' },
  ],
  'sangeet-photography-chennai': [
    { image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070', altText: 'Sangeet performance' },
    { image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069', altText: 'Sangeet party' },
  ],
  'haldi-photography-chennai': [
    { image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070', altText: 'Haldi ceremony' },
  ],
  'mehendi-photography-chennai': [
    { image: 'https://images.unsplash.com/photo-1544208035-718eabd7054c?q=80&w=1969', altText: 'Mehendi hands' },
  ],
  'wedding-reception-photography': [
    { image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2070', altText: 'Reception stage' },
  ],
  'maternity-photography-chennai': [
    { image: 'https://images.unsplash.com/photo-1555546221-df62c15ba5fc?q=80&w=2070', altText: 'Maternity photo' },
    { image: 'https://images.unsplash.com/photo-1563283995-1f92e62e1966?q=80&w=1974', altText: 'Maternity outdoors' },
  ],
  'fashion-photography-chennai': [
    { image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070', altText: 'Fashion outdoor' },
    { image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920', altText: 'Fashion editorial' },
  ]
}
