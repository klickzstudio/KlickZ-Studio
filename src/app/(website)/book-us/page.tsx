import { Metadata } from 'next'
import { constructMetadata } from '@/lib/seo'
import { client } from '@/sanity/lib/client'
import { siteSettingsQuery } from '@/sanity/lib/queries'
import { ContactForm } from '@/components/ui/ContactForm'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export const metadata: Metadata = constructMetadata({ 
  title: 'Book Your Date | KLICKZSTUDIO Wedding Photography',
  description: 'Reserve your wedding date with KLICKZSTUDIO. We focus on a limited number of weddings per year to ensure premium quality. Secure your cinematic wedding legacy today.'
})

export default async function BookUsPage() {
  const settings = await client.fetch(siteSettingsQuery, {}, { next: { revalidate: 60 } })
  
  return (
    <main className="pt-32 pb-24 min-h-screen bg-[#F8F4EE]">
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <header className="mb-16 md:mb-24 text-center max-w-4xl mx-auto">
          <ScrollReveal>
            <span className="font-lato text-[11px] uppercase tracking-[0.4em] text-[#C9A96E] mb-6 block">
              Reservation
            </span>
            <h1 className="font-cormorant text-5xl md:text-7xl lg:text-8xl text-[#2B2420] leading-tight mb-8">
              Secure Your <span className="italic">Wedding Legacy.</span>
            </h1>
            <p className="font-lato text-base text-[#555555] leading-loose max-w-2xl mx-auto">
              We accept a limited number of weddings each year to ensure every couple receives the attention and premium quality they deserve. Tell us about your celebration, and let&apos;s see if we are a perfect match.
            </p>
          </ScrollReveal>
        </header>

        <div className="max-w-3xl mx-auto">
          <ScrollReveal delay={0.2}>
            <div className="bg-white p-8 md:p-16 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.1)] border border-black/5 relative">
              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F8F4EE]/50 -z-10 -translate-y-4 translate-x-4" />
              
              <h2 className="font-cormorant text-3xl text-[#2B2420] mb-10 text-center">Booking Form</h2>
              <ContactForm buttonText="Reserve My Date" isBooking={true} />
              
              <div className="mt-12 pt-12 border-t border-black/5 text-center">
                <p className="font-lato text-[11px] uppercase tracking-widest text-black/40 italic">
                  Typically responds within 12-24 hours
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}
