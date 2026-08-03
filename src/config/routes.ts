export const ROUTES = {
  HOME: '/',
  GALLERY: {
    ROOT: '/best-candid-wedding-photographers',
    BRIDAL_PORTRAITS: '/bridal-portrait-photography-chennai',
    COUPLE_PORTRAITS: '/couple-portrait-photography',
    GROOM_PORTRAITS: '/groom-portrait-photography-chennai',
    BIRTHDAY: '/birthday-celebration-photography-chennai',
    BABY_SHOWER: '/baby-shower-photography-chennai',
    SILHOUETTE: '/silhouette-photography-chennai',
    RITUALS: '/wedding-rituals-photography',
    CANDID_MOMENTS: '/candid-moments-photography',
    OUTDOOR: '/outdoor-photography',
    PRE_WEDDING: '/pre-wedding-photography',
    POST_WEDDING: '/post-wedding-photography',
    VIDEOS: '/candid-wedding-films',
    CANDID_WEDDING_FILMS: '/candid-wedding-films',
    OUTDOOR_FILMS: '/outdoor-films',
    CANDID_WEDDING_CHENNAI: '/best-candid-wedding-photography-chennai',
    RECEPTION: '/wedding-reception-photography',
  },
  SERVICES: {
    ROOT: '/services',
    WEDDINGS: '/best-wedding-photographers-in-chennai',
    OUTDOOR_WEDDING: '/outdoor-photography-chennai',
    MUSLIM_WEDDING: '/muslim-wedding-photography',
    CHRISTIAN_WEDDING: '/christian-wedding-photography-chennai',
    BRAHMIN_WEDDING: '/brahmin-wedding-photography',
    TELUGU_WEDDING: '/telugu-wedding-photography',
    HINDU_WEDDING: '/hindu-wedding-photography',
    ENGAGEMENT: '/engagement-photography',
    MALAYALI_WEDDING: '/malayali-wedding-photography',
    PUNJABI_WEDDING: '/punjabi-wedding-photography',
    SANGEET: '/sangeet-photography',
    HALDI: '/haldi-ceremony-photography',
    BABY_PORTRAIT: '/birthday-celebration-photography-chennai',
    VIDEOGRAPHY: '/wedding-videography-chennai',
  },
  PRICING: '/pricing',
  ABOUT: '/about',
  AWARDS: '/awards',
  CONTACT: '/contact',
  FAQS: '/wedding-photography-faqs',
  BOOK_US: '/book-us',
  BLOG: {
    ROOT: '/blog',
  },
} as const;

// Flatten all routes to extract dynamic slugs (single segment routes under /[category])
const STATIC_PAGE_ROUTES = new Set([
  '/',
  '/services',
  '/pricing',
  '/about',
  '/awards',
  '/contact',
  '/wedding-photography-faqs',
  '/book-us',
  '/blog',
  '/best-candid-wedding-photographers',
  '/best-wedding-photographers-in-chennai',
]);

export function getAllDefinedRoutes(): string[] {
  const routes: string[] = [];

  function traverse(obj: any) {
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        routes.push(obj[key]);
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        traverse(obj[key]);
      }
    }
  }

  traverse(ROUTES);
  return Array.from(new Set(routes));
}

export function getValidDynamicSlugs(): Set<string> {
  const allRoutes = getAllDefinedRoutes();
  const dynamicSlugs = new Set<string>();

  for (const route of allRoutes) {
    if (!STATIC_PAGE_ROUTES.has(route) && route.startsWith('/') && !route.slice(1).includes('/')) {
      dynamicSlugs.add(route.slice(1));
    }
  }

  return dynamicSlugs;
}
