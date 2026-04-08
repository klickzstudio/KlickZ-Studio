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
      { label: 'Pre-Wedding', href: '/best-pre-wedding-photographers-in-chennai' },
      { label: 'Engagement', href: '/engagement-photography-chennai' },
      { label: 'Sangeet', href: '/sangeet-photography-chennai' },
      { label: 'Haldi', href: '/haldi-photography-chennai' },
      { label: 'Mehendi', href: '/mehendi-photography-chennai' },
      { label: 'Reception', href: '/wedding-reception-photography' },
      { label: 'Maternity', href: '/maternity-photography-chennai' },
      { label: 'Fashion', href: '/fashion-photography-chennai' },
    ]
  },
  { label: 'Enquire Now', href: '/contact#book-us', isButton: true },
]

