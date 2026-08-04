import { Metadata } from 'next'
import { constructMetadata } from '@/lib/seo'
import { client } from '@/sanity/lib/client'
import { siteSettingsQuery } from '@/sanity/lib/queries'
import { ContactForm } from '@/components/ui/ContactForm'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaClock } from 'react-icons/fa'

export const metadata: Metadata = constructMetadata({ 
  title: 'Contact KLICKZSTUDIO | Wedding Photography Chennai',
  description: 'Get in touch with Chennai\'s premier candid wedding photography studio. Let\'s discuss your special day and create cinematic memories together.'
})

export default async function ContactPage() {
  const settings = await client.fetch(siteSettingsQuery, {}, { next: { revalidate: 60 } })
  const { phone, email, address, whatsappPhone } = settings || {}
  
  return (
    <main className="pt-16 sm:pt-20 lg:pt-28 pb-16 min-h-screen bg-[#FDFCFB]">
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Page Top Header */}
        <div className="mb-6 sm:mb-8 max-w-2xl">
          <ScrollReveal>
            <span className="font-lato text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[#C9A96E] mb-2 block font-semibold">
              Connect With Us
            </span>
            <h1 className="font-cormorant text-3xl sm:text-4xl lg:text-6xl text-[#2B2420] leading-tight">
              Let&apos;s weave your <span className="italic text-[#C9A96E]">love story.</span>
            </h1>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Form Container (order-1 on Mobile so it displays first, order-2 on Desktop) */}
          <div className="order-1 lg:order-2 lg:col-span-7">
            <ScrollReveal delay={0.1}>
              <div className="bg-white p-5 sm:p-8 border border-black/5 shadow-[0_15px_45px_-10px_rgba(0,0,0,0.06)]">
                <div className="mb-4 sm:mb-6 pb-3 border-b border-black/5 flex items-center justify-between">
                  <div>
                    <h2 className="font-cormorant text-2xl sm:text-3xl text-[#2B2420]">Send an Inquiry</h2>
                    <p className="font-lato text-xs text-[#777777] mt-0.5">Fill in your details below for a fast quote.</p>
                  </div>
                  <span className="hidden sm:inline-block font-lato text-[10px] uppercase tracking-widest text-[#C9A96E] bg-[#F8F4EE] px-3 py-1.5 border border-[#C9A96E]/20">
                    Quick Response
                  </span>
                </div>
                <ContactForm />
              </div>
            </ScrollReveal>
          </div>

          {/* Details & Info Container (order-2 on Mobile, order-1 on Desktop) */}
          <div className="order-2 lg:order-1 lg:col-span-5 space-y-6">
            <ScrollReveal delay={0.15}>
              <div className="space-y-6 bg-[#F9F6F0] p-5 sm:p-7 border border-[#EFE8DC]">
                <div>
                  <h3 className="font-lato text-[10px] uppercase tracking-[0.25em] text-[#C9A96E] mb-3.5 font-bold">
                    Direct Inquiries
                  </h3>
                  <div className="space-y-2.5">
                    <a href={`mailto:${email}`} className="flex items-center gap-3 group text-[#2B2420] hover:text-[#C9A96E] transition-colors">
                      <FaEnvelope className="text-[#C9A96E] text-base group-hover:scale-110 transition-transform shrink-0" />
                      <span className="font-cormorant text-lg sm:text-xl border-b border-transparent group-hover:border-[#C9A96E] transition-all">
                        {email || 'hello@klickzstudio.com'}
                      </span>
                    </a>
                    <a href={`tel:${phone}`} className="flex items-center gap-3 group text-[#2B2420] hover:text-[#C9A96E] transition-colors">
                      <FaPhone className="text-[#C9A96E] text-base group-hover:scale-110 transition-transform shrink-0" />
                      <span className="font-cormorant text-lg sm:text-xl border-b border-transparent group-hover:border-[#C9A96E] transition-all">
                        {phone || '+91 98840 00000'}
                      </span>
                    </a>
                    <a href={`https://wa.me/${whatsappPhone}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group text-[#2B2420] hover:text-[#C9A96E] transition-colors">
                      <FaWhatsapp className="text-[#C9A96E] text-base group-hover:scale-110 transition-transform shrink-0" />
                      <span className="font-cormorant text-lg sm:text-xl border-b border-transparent group-hover:border-[#C9A96E] transition-all">
                        Instant WhatsApp Chat
                      </span>
                    </a>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#EFE8DC]">
                  <h3 className="font-lato text-[10px] uppercase tracking-[0.25em] text-[#C9A96E] mb-2.5 font-bold">
                    Studio Location
                  </h3>
                  <div className="flex items-start gap-3 text-[#2B2420]">
                    <FaMapMarkerAlt className="text-[#C9A96E] text-base mt-1 shrink-0" />
                    <div className="font-cormorant text-lg sm:text-xl leading-snug">
                      5th St, Raja Shanmuga Nagar, Tiruvottiyur,<br />
                      Chennai, Greater Chennai, Tamil Nadu 600019
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#EFE8DC] flex items-center gap-2.5 text-xs font-lato text-[#666666]">
                  <FaClock className="text-[#C9A96E]" />
                  <span>Response time: Usually within 12-24 hours</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>
    </main>
  )
}
