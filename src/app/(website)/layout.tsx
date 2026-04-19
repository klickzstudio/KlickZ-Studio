import type { Metadata } from 'next'
import { cormorant, lato, playfair } from '@/lib/fonts'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppCTA } from '@/components/layout/WhatsAppCTA'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { JsonLd } from '@/components/seo/JsonLd'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import '../globals.css'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ainz.space'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Professional Wedding Photographers in Chennai | KLICKZSTUDIO',
    template: '%s | KLICKZSTUDIO'
  },
  description: 'KLICKZSTUDIO — Award-winning wedding photographers in Chennai and Coimbatore. 750+ weddings captured. Candid, destination, pre-wedding photography.',
  keywords: 'wedding photographer chennai, candid wedding photography, KLICKZSTUDIO, wedding photographer coimbatore, destination wedding india',
  authors: [{ name: 'KLICKZSTUDIO' }],
  creator: 'KLICKZSTUDIO',
  publisher: 'KLICKZSTUDIO',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'KLICKZSTUDIO | Wedding Photographers Chennai',
    description: 'Award-winning wedding photography capturing love stories across India and the world.',
    url: baseUrl,
    siteName: 'KLICKZSTUDIO',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/icon.png',
        width: 512,
        height: 512,
        alt: 'KLICKZSTUDIO Logo',
      },
    ],
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
    <html lang="en" className={`${cormorant.variable} ${lato.variable} ${playfair.variable}`} data-scroll-behavior="smooth">
      <body>
        <JsonLd />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppCTA phoneNumber="919710298451" />
        <ScrollToTop />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

