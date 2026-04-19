import { NavLink } from '@/types'

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About Us', href: '/best-wedding-photographers-in-chennai',
    children: [
      { label: 'Awards', href: '/awards' },
      { label: 'FAQs', href: '/wedding-photography-faqs' }
    ]
  },
  {
    label: 'Photography', href: '#',
    children: [
      { label: 'Wedding', href: '/best-candid-wedding-photography-chennai' },
      { label: 'Christian Wedding', href: '/christian-wedding-photography-chennai' },
      { label: 'Outdoor', href: '/outdoor-photography-chennai' },
      { label: 'Reception', href: '/wedding-reception-photography' },
      { label: 'Baby Shower', href: '/baby-shower-photography-chennai' },
      { label: 'Birthday', href: '/birthday-celebration-photography-chennai' },
      { label: 'Bridal Portraits', href: '/bridal-portrait-photography-chennai' },
      { label: 'Groom Portraits', href: '/groom-portrait-photography-chennai' },
      { label: 'Silhouette', href: '/silhouette-photography-chennai' },
    ]
  },
  { label: 'Enquire Now', href: '/contact#book-us', isButton: true },
]

