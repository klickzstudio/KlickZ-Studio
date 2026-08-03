import type { Metadata } from 'next'
import { cormorant, inter, playfair } from '@/lib/fonts'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppCTA } from '@/components/layout/WhatsAppCTA'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { JsonLd } from '@/components/seo/JsonLd'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import '../globals.css'
import { client } from '@/sanity/lib/client'
import { siteSettingsQuery } from '@/sanity/lib/queries'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ainz.space'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await client.fetch(siteSettingsQuery, {}, { next: { revalidate: 60 } })
  const title = settings?.title || 'KLICKZSTUDIO'
  const tagline = settings?.tagline || 'Professional Wedding Photographers in Chennai'

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: `${tagline} | ${title}`,
      template: `%s | ${title}`
    },
    description: 'KLICKZSTUDIO — Award-winning wedding photographers in Chennai and Coimbatore. 500+ weddings captured. Candid, destination, pre-wedding photography.',
    keywords: 'wedding photographer chennai, candid wedding photography, KLICKZSTUDIO, wedding photographer coimbatore, destination wedding india',
    authors: [{ name: title }],
    creator: title,
    publisher: title,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title: `${title} | Wedding Photographers Chennai`,
      description: 'Award-winning wedding photography capturing love stories across India and the world.',
      url: baseUrl,
      siteName: title,
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: '/icon.png',
          width: 512,
          height: 512,
          alt: `${title} Logo`,
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
    },
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await client.fetch(siteSettingsQuery, {}, { next: { revalidate: 60 } })
  const whatsappNumber = settings?.whatsappPhone || '919710298451'

  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} ${playfair.variable}`} data-scroll-behavior="smooth">
      <body>
        <JsonLd settings={settings} />
        <Navbar settings={settings} />
        <main>{children}</main>
        <Footer settings={settings} />
        <WhatsAppCTA phoneNumber={whatsappNumber} />
        <ScrollToTop />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

