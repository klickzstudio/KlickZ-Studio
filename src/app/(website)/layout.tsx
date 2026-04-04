import type { Metadata } from 'next'
import { cormorant, lato, playfair } from '@/lib/fonts'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppCTA } from '@/components/layout/WhatsAppCTA'
import { JsonLd } from '@/components/seo/JsonLd'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import '../globals.css'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ainz.space'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Professional Wedding Photographers in Chennai | AinZ Studio',
    template: '%s | AinZ Studio'
  },
  description: 'AinZ Studio — Award-winning wedding photographers in Chennai and Coimbatore. 750+ weddings captured. Candid, destination, pre-wedding photography.',
  keywords: 'wedding photographer chennai, candid wedding photography, ainz studio, wedding photographer coimbatore, destination wedding india',
  authors: [{ name: 'AinZ Studio' }],
  creator: 'AinZ Studio',
  publisher: 'AinZ Studio',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'AinZ Studio | Wedding Photographers Chennai',
    description: 'Award-winning wedding photography capturing love stories across India and the world.',
    url: baseUrl,
    siteName: 'AinZ Studio',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/icon.png',
        width: 512,
        height: 512,
        alt: 'AinZ Studio Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AinZ Studio | Wedding Photographers',
    description: 'Capturing your special moments with artistic finesse.',
    images: ['/icon.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-icon.png',
  },
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${lato.variable} ${playfair.variable}`}>
      <body>
        <JsonLd />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppCTA phoneNumber="919876543210" />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
