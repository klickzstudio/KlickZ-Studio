'use client'

import { useState } from 'react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    weddingDate: '',
    eventType: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic
    alert('Thank you for your enquiry! We will get back to you soon.')
  }

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] bg-[#0A0A0A] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" />
        <div className="relative z-10 text-center">
          <ScrollReveal>
            <h1 className="font-cormorant text-5xl md:text-7xl font-light text-white mb-4">
              Book Us
            </h1>
            <div className="section-divider" />
            <p className="font-lato text-base font-light text-white/75 mt-4 uppercase tracking-[0.15em]">
              Get in Touch
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <ScrollReveal>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name *"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border-b border-[#C9A96E] bg-transparent py-4 font-lato text-[15px] font-light text-[#1A1A1A] placeholder:text-[#888888] focus:outline-none focus:border-[#A07840] transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email *"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border-b border-[#C9A96E] bg-transparent py-4 font-lato text-[15px] font-light text-[#1A1A1A] placeholder:text-[#888888] focus:outline-none focus:border-[#A07840] transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone (+91) *"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border-b border-[#C9A96E] bg-transparent py-4 font-lato text-[15px] font-light text-[#1A1A1A] placeholder:text-[#888888] focus:outline-none focus:border-[#A07840] transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="date"
                    name="weddingDate"
                    value={formData.weddingDate}
                    onChange={handleChange}
                    className="w-full border-b border-[#C9A96E] bg-transparent py-4 font-lato text-[15px] font-light text-[#1A1A1A] focus:outline-none focus:border-[#A07840] transition-colors"
                  />
                </div>
                <div>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className="w-full border-b border-[#C9A96E] bg-transparent py-4 font-lato text-[15px] font-light text-[#1A1A1A] focus:outline-none focus:border-[#A07840] transition-colors appearance-none"
                  >
                    <option value="">Select Event Type</option>
                    <option value="wedding">Wedding</option>
                    <option value="pre-wedding">Pre-Wedding</option>
                    <option value="post-wedding">Post Wedding</option>
                    <option value="maternity">Maternity</option>
                    <option value="fashion">Fashion</option>
                    <option value="films">Films</option>
                  </select>
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full border-b border-[#C9A96E] bg-transparent py-4 font-lato text-[15px] font-light text-[#1A1A1A] placeholder:text-[#888888] focus:outline-none focus:border-[#A07840] transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#C9A96E] text-black font-lato text-[16px] font-medium uppercase tracking-[0.1em] py-4 hover:bg-[#A07840] transition-colors duration-300"
                >
                  Send Enquiry
                </button>
              </form>
            </ScrollReveal>

            {/* Contact Details */}
            <ScrollReveal delay={0.2}>
              <div className="lg:pl-8">
                <h2 className="font-cormorant text-3xl md:text-[36px] font-normal text-[#1A1A1A] mb-8">
                  Contact Details
                </h2>
                <div className="section-divider !mx-0 mb-8" />

                <div className="space-y-6">
                  <div>
                    <h3 className="font-lato text-[12px] uppercase tracking-[0.15em] text-[#888888] mb-2">
                      Phone
                    </h3>
                    <a href="tel:+919876543210" className="block font-lato text-[16px] text-[#1A1A1A] hover:text-[#C9A96E] transition-colors">
                      +91 98765 43210
                    </a>
                  </div>

                  <div>
                    <h3 className="font-lato text-[12px] uppercase tracking-[0.15em] text-[#888888] mb-2">
                      Email
                    </h3>
                    <a href="mailto:contact@ainz.space" className="font-lato text-[16px] text-[#C9A96E] hover:underline">
                      contact@ainz.space
                    </a>
                  </div>

                  <div>
                    <h3 className="font-lato text-[12px] uppercase tracking-[0.15em] text-[#888888] mb-2">
                      Instagram
                    </h3>
                    <a
                      href="https://www.instagram.com/AinZStudio/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-lato text-[16px] text-[#1A1A1A] hover:text-[#C9A96E] transition-colors"
                    >
                      @AinZStudio
                    </a>
                  </div>

                  <div>
                    <h3 className="font-lato text-[12px] uppercase tracking-[0.15em] text-[#888888] mb-2">
                      Facebook
                    </h3>
                    <a
                      href="https://www.facebook.com/AinZStudio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-lato text-[16px] text-[#1A1A1A] hover:text-[#C9A96E] transition-colors"
                    >
                      AinZStudio
                    </a>
                  </div>
                </div>

                {/* Map or decorative element */}
                <div className="mt-12 p-8 bg-[#F9F6F2] text-center">
                  <p className="font-cormorant text-2xl font-light italic text-[#1A1A1A] mb-2">
                    Based in Chennai & Coimbatore
                  </p>
                  <p className="font-lato text-[13px] font-light text-[#555555]">
                    Available for destination weddings worldwide
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  )
}
