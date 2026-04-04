import { NavLink } from '@/types'

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About Us', href: '/about-us',
    children: [{ label: 'Awards', href: '/awards' }]
  },
  {
    label: 'Destination', href: '#',
    children: [
      { label: 'Srilanka', href: '/wedding-photography-srilanka' },
      { label: 'Malaysia', href: '/wedding-photography-malaysia' },
      { label: 'Jodhpur', href: '/wedding-photography-jodhpur' },
      { label: 'Dubai', href: '/wedding-photography-dubai' },
      { label: 'Goa', href: '/wedding-photography-goa' },
      { label: 'Bali', href: '/wedding-photography-bali' },
      { label: 'Jaipur', href: '/wedding-photography-jaipur' },
      { label: 'Singapore', href: '/wedding-photography-singapore' },
    ]
  },
  { label: 'Films', href: '/films' },
  {
    label: 'Photography', href: '#',
    children: [
      { label: 'Wedding', href: '/wedding' },
      { label: 'Pre-Wedding', href: '/pre-wedding-photography' },
      { label: 'Post Wedding', href: '/post-wedding-photography' },
      { label: 'Maternity', href: '/maternity' },
      { label: 'Fashion', href: '/fashion-photography' },
    ]
  },
  { label: 'Poetry', href: '/poetry' },
  { label: 'Blog', href: '/blog' },
  { label: 'Book Us', href: '/contact', isButton: true },
]
