import { Metadata } from 'next'
import { constructMetadata } from '@/lib/seo'
import { client } from '@/sanity/lib/client'
import { siteSettingsQuery } from '@/sanity/lib/queries'
import { ContactForm } from '@/components/ui/ContactForm'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { FaCheckCircle, FaCalendarAlt, FaShieldAlt, FaCameraRetro } from 'react-icons/fa'

export const metadata: Metadata = constructMetadata({ 
  title: 'Book Your Date | KLICKZSTUDIO Wedding Photography',
  description: 'Reserve your wedding date with KLICKZSTUDIO. We focus on a limited number of weddings per year to ensure premium quality. Secure your cinematic wedding legacy today.'
})

export default async function BookUsPage() {
  const settings = await client.fetch(siteSettingsQuery, {}, { next: { revalidate: 60 } })
  
  return (
    <main className="pt-16 sm:pt-20 lg:pt-28 pb-16 min-h-screen bg-[#F8F4EE]">
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Page Top Header */}
        <div className="mb-6 sm:mb-8 max-w-2xl">
          <ScrollReveal>
            <span className="font-lato text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[#C9A96E] mb-2 block font-semibold">
              Reservation
            </span>
            <h1 className="font-cormorant text-3xl sm:text-4xl lg:text-6xl text-[#2B2420] leading-tight">
              Secure Your <span className="italic text-[#C9A96E]">Wedding Legacy.</span>
            </h1>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Reservation Form (order-1 on Mobile, order-2 on Desktop) */}
          <div className="order-1 lg:order-2 lg:col-span-7">
            <ScrollReveal delay={0.1}>
              <div className="bg-white p-5 sm:p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] border border-black/5 relative">
                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#F8F4EE] -z-10 -translate-y-2 translate-x-2" />
                
                <div className="mb-4 sm:mb-6 pb-3 border-b border-black/5 flex items-center justify-between">
                  <div>
                    <h2 className="font-cormorant text-2xl sm:text-3xl text-[#2B2420]">Date Reservation Form</h2>
                    <p className="font-lato text-xs text-[#777777] mt-0.5">Tell us about your dates, location, and vision.</p>
                  </div>
                  <span className="hidden sm:inline-block font-lato text-[10px] uppercase tracking-widest text-[#C9A96E] bg-[#F8F4EE] px-3 py-1.5 border border-[#C9A96E]/20">
                    Official Booking
                  </span>
                </div>

                <ContactForm buttonText="Reserve My Date" isBooking={true} />
                
                <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-center gap-2 text-[#777777]">
                  <FaCheckCircle className="text-[#C9A96E] text-xs" />
                  <span className="font-lato text-[10px] sm:text-[11px] uppercase tracking-wider">
                    Zero commitment required for availability check
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Highlights & Details (order-2 on Mobile, order-1 on Desktop) */}
          <div className="order-2 lg:order-1 lg:col-span-5 space-y-6">
            <ScrollReveal delay={0.15}>
              <div className="space-y-4 bg-white/80 backdrop-blur-sm p-5 sm:p-7 border border-black/5">
                <p className="font-lato text-xs sm:text-sm text-[#555555] leading-relaxed mb-2">
                  We accept a limited number of weddings each year to ensure every couple receives undivided creative attention and premium craftsmanship.
                </p>

                <div className="flex items-start gap-3 pt-3 border-t border-black/5">
                  <FaCalendarAlt className="text-[#C9A96E] text-base mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-cormorant text-lg sm:text-xl text-[#2B2420] font-semibold">Limited Dates Per Year</h3>
                    <p className="font-lato text-xs text-[#666666] leading-normal">
                      Ensures dedicated pre-production and handcrafted editing for your story.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-black/5">
                  <FaCameraRetro className="text-[#C9A96E] text-base mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-cormorant text-lg sm:text-xl text-[#2B2420] font-semibold">Tailored Photography Packages</h3>
                    <p className="font-lato text-xs text-[#666666] leading-normal">
                      Candid photos, cinematic films, drone footage, and luxury albums.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-black/5">
                  <FaShieldAlt className="text-[#C9A96E] text-base mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-cormorant text-lg sm:text-xl text-[#2B2420] font-semibold">Fast 12-24 Hour Response</h3>
                    <p className="font-lato text-xs text-[#666666] leading-normal">
                      Our booking team will check date availability and send price guides promptly.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Testimonial Quote */}
            <ScrollReveal delay={0.2} className="hidden sm:block">
              <div className="p-5 border-l-2 border-[#C9A96E] bg-white/40">
                <p className="font-lato text-xs italic text-[#555555] leading-relaxed">
                  &quot;KLICKZSTUDIO captured our wedding with such elegance and emotion. Booking them was the best decision we made!&quot;
                </p>
                <span className="font-lato text-[10px] uppercase tracking-widest text-[#C9A96E] mt-2 block font-semibold">
                  — Verified Bride & Groom
                </span>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>
    </main>
  )
}
