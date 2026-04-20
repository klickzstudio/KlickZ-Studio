import { Metadata } from 'next'
import { constructMetadata } from '@/lib/seo'
import { client } from '@/sanity/lib/client'
import { siteSettingsQuery } from '@/sanity/lib/queries'
import { ContactForm } from '@/components/ui/ContactForm'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa'

export const metadata: Metadata = constructMetadata({ 
  title: 'Contact KLICKZSTUDIO | Wedding Photography Chennai',
  description: 'Get in touch with Chennai\'s premier candid wedding photography studio. Let\'s discuss your special day and create cinematic memories together.'
})

export default async function ContactPage() {
  const settings = await client.fetch(siteSettingsQuery, {}, { next: { revalidate: 60 } })
  const { title, phone, email, address, whatsappPhone } = settings || {}
  
  return (
    <main className="pt-32 pb-24 min-h-screen bg-[#FDFCFB]">
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <header className="mb-20 md:mb-32">
          <ScrollReveal>
            <span className="font-lato text-[11px] uppercase tracking-[0.4em] text-[#C9A96E] mb-6 block">
              Connect With Us
            </span>
            <h1 className="font-cormorant text-5xl md:text-7xl lg:text-[100px] text-[#2B2420] leading-tight mb-8">
              Let&apos;s weave your <br />
              <span className="italic">love story.</span>
            </h1>
          </ScrollReveal>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-16">
            <ScrollReveal delay={0.1}>
              <div className="space-y-10">
                <div>
                  <h3 className="font-lato text-[10px] uppercase tracking-[0.3em] text-[#C9A96E] mb-6 font-bold">Inquiries</h3>
                  <div className="space-y-4">
                    <a href={`mailto:${email}`} className="flex items-center gap-4 group">
                      <FaEnvelope className="text-[#C9A96E] group-hover:scale-110 transition-transform" />
                      <span className="font-cormorant text-2xl text-[#2B2420] border-b border-transparent group-hover:border-[#C9A96E] transition-all">
                        {email}
                      </span>
                    </a>
                    <a href={`tel:${phone}`} className="flex items-center gap-4 group">
                      <FaPhone className="text-[#C9A96E] group-hover:scale-110 transition-transform" />
                      <span className="font-cormorant text-2xl text-[#2B2420] border-b border-transparent group-hover:border-[#C9A96E] transition-all">
                        {phone}
                      </span>
                    </a>
                    <a href={`https://wa.me/${whatsappPhone}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                      <FaWhatsapp className="text-[#C9A96E] group-hover:scale-110 transition-transform" />
                      <span className="font-cormorant text-2xl text-[#2B2420] border-b border-transparent group-hover:border-[#C9A96E] transition-all">
                        WhatsApp Chat
                      </span>
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className="font-lato text-[10px] uppercase tracking-[0.3em] text-[#C9A96E] mb-6 font-bold">Visit Our Studio</h3>
                  <div className="flex items-start gap-4">
                    <FaMapMarkerAlt className="text-[#C9A96E] mt-1" />
                    <div className="font-cormorant text-2xl text-[#2B2420] leading-relaxed">
                      {address?.street}<br />
                      {address?.city}, {address?.region}<br />
                      {address?.country} — {address?.postalCode}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Decorative Element */}
            <ScrollReveal delay={0.3} className="pt-8">
              <div className="p-8 border border-[#F8F4EE] bg-[#F8F4EE]/30 relative">
                 <p className="font-lato text-[13px] font-light text-[#555555] leading-relaxed italic">
                  &quot;Capturing moments today that will wow your heart tomorrow. We look forward to hearing about your vision.&quot;
                 </p>
                 <div className="absolute -top-4 -right-4 w-12 h-12 border-t-2 border-r-2 border-[#C9A96E]/20" />
              </div>
            </ScrollReveal>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={0.2}>
              <div className="bg-white p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-black/5">
                <h2 className="font-cormorant text-3xl text-[#2B2420] mb-8">Send an Inquiry</h2>
                <ContactForm />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  )
}
