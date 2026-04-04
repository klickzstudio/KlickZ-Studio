import type { Metadata } from 'next'
import { cormorant, lato, playfair } from '@/lib/fonts'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppCTA } from '@/components/layout/WhatsAppCTA'
import { JsonLd } from '@/components/seo/JsonLd'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import './globals.css'

export const metadata: Metadata = {
  title: 'Professional Wedding Photographers in Chennai | AinZ Studio',
  description: 'AinZ Studio — Award-winning wedding photographers in Chennai and Coimbatore. 750+ weddings captured. Candid, destination, pre-wedding photography.',
  keywords: 'wedding photographer chennai, candid wedding photography, ainz studio, wedding photographer coimbatore, destination wedding india',
  openGraph: {
    title: 'AinZ Studio | Wedding Photographers Chennai',
    description: 'Capturing love stories across India and the world.',
    url: 'https://ainz.space',
    siteName: 'AinZ Studio',
    locale: 'en_IN',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-icon.png',
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
