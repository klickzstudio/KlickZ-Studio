import { NavLink } from '@/types'
import { ROUTES } from '@/config/routes'

export const navLinks: NavLink[] = [
  { label: 'Home', href: ROUTES.HOME },
  {
    label: 'Gallery',
    href: ROUTES.GALLERY.ROOT,
    children: [
      { label: 'Bridal Portraits', href: ROUTES.GALLERY.BRIDAL_PORTRAITS },
      { label: 'Couple Portraits', href: ROUTES.GALLERY.COUPLE_PORTRAITS },
      { label: 'Groom Portraits', href: ROUTES.GALLERY.GROOM_PORTRAITS },
      { label: 'Birthday', href: ROUTES.GALLERY.BIRTHDAY },
      { label: 'Baby Shower', href: ROUTES.GALLERY.BABY_SHOWER },
      { label: 'Silhouette', href: ROUTES.GALLERY.SILHOUETTE },
      { label: 'Rituals', href: ROUTES.GALLERY.RITUALS },
      { label: 'Candid Moments', href: ROUTES.GALLERY.CANDID_MOMENTS },
      {
        label: 'Outdoor',
        href: ROUTES.GALLERY.OUTDOOR,
        children: [
          { label: 'Pre-Wedding Photography', href: ROUTES.GALLERY.PRE_WEDDING },
          { label: 'Post-Wedding Photography', href: ROUTES.GALLERY.POST_WEDDING },
        ],
      },
      {
        label: 'Videos',
        href: ROUTES.GALLERY.VIDEOS,
        children: [
          { label: 'Candid Wedding Films', href: ROUTES.GALLERY.CANDID_WEDDING_FILMS },
          { label: 'Outdoor', href: ROUTES.GALLERY.OUTDOOR_FILMS },
        ],
      },
    ],
  },
  {
    label: 'Services',
    href: ROUTES.SERVICES.ROOT,
    children: [
      {
        label: 'Weddings',
        href: ROUTES.SERVICES.WEDDINGS,
        children: [
          { label: 'Hindu', href: ROUTES.SERVICES.HINDU_WEDDING },
          { label: 'Christian', href: ROUTES.SERVICES.CHRISTIAN_WEDDING },
          { label: 'Muslim', href: ROUTES.SERVICES.MUSLIM_WEDDING },
          { label: 'Engagement', href: ROUTES.SERVICES.ENGAGEMENT },
        ],
      },
      { label: 'Baby Portrait', href: ROUTES.SERVICES.BABY_PORTRAIT },
      { label: 'Videography', href: ROUTES.SERVICES.VIDEOGRAPHY },
      { label: 'Outdoor', href: ROUTES.SERVICES.OUTDOOR_WEDDING },
    ],
  },
  { label: 'Pricing', href: ROUTES.PRICING },
  { label: 'About Us', href: ROUTES.ABOUT },
  { label: 'Contact', href: ROUTES.CONTACT },
  { label: 'FAQs', href: ROUTES.FAQS },
  { label: 'Book Us', href: ROUTES.BOOK_US, isButton: true },
]
