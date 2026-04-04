'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

type SubmissionStatus = 'idle' | 'loading' | 'success' | 'error'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    weddingDate: '',
    eventType: '',
    message: '',
  })
  const [status, setStatus] = useState<SubmissionStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send enquiry')
      }

      setStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        weddingDate: '',
        eventType: '',
        message: '',
      })
    } catch (error: any) {
      console.error('Submission error:', error)
      setStatus('error')
      setErrorMessage(error.message || 'Something went wrong. Please try again or contact us directly.')
    }
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
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-[#F9F6F2] p-12 text-center border border-[#C9A96E]/20"
                  >
                    <div className="w-16 h-16 bg-[#C9A96E] rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h2 className="font-cormorant text-3xl font-light text-[#1A1A1A] mb-4">Enquiry Sent</h2>
                    <p className="font-lato text-base text-[#555555] mb-8">
                      Thank you for choosing AinZ Studio. A member of our team will get in touch with you within 24-48 hours.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="font-lato text-[13px] uppercase tracking-[0.2em] text-[#C9A96E] hover:underline transition-all"
                    >
                      Send another enquiry
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-8"
                  >
                    {status === 'error' && (
                      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                        <p className="text-red-700 text-sm font-lato">{errorMessage}</p>
                      </div>
                    )}
                    <div>
                      <input
                        type="text"
                        name="name"
                        placeholder="Name *"
                        required
                        disabled={status === 'loading'}
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border-b border-[#C9A96E] bg-transparent py-4 font-lato text-[15px] font-light text-[#1A1A1A] placeholder:text-[#888888] focus:outline-none focus:border-[#A07840] transition-colors disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email *"
                        required
                        disabled={status === 'loading'}
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border-b border-[#C9A96E] bg-transparent py-4 font-lato text-[15px] font-light text-[#1A1A1A] placeholder:text-[#888888] focus:outline-none focus:border-[#A07840] transition-colors disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone (+91) *"
                        required
                        disabled={status === 'loading'}
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full border-b border-[#C9A96E] bg-transparent py-4 font-lato text-[15px] font-light text-[#1A1A1A] placeholder:text-[#888888] focus:outline-none focus:border-[#A07840] transition-colors disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <input
                        type="date"
                        name="weddingDate"
                        disabled={status === 'loading'}
                        value={formData.weddingDate}
                        onChange={handleChange}
                        className="w-full border-b border-[#C9A96E] bg-transparent py-4 font-lato text-[15px] font-light text-[#1A1A1A] focus:outline-none focus:border-[#A07840] transition-colors disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <select
                        name="eventType"
                        disabled={status === 'loading'}
                        value={formData.eventType}
                        onChange={handleChange}
                        className="w-full border-b border-[#C9A96E] bg-transparent py-4 font-lato text-[15px] font-light text-[#1A1A1A] focus:outline-none focus:border-[#A07840] transition-colors appearance-none disabled:opacity-50"
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
                        disabled={status === 'loading'}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full border-b border-[#C9A96E] bg-transparent py-4 font-lato text-[15px] font-light text-[#1A1A1A] placeholder:text-[#888888] focus:outline-none focus:border-[#A07840] transition-colors resize-none disabled:opacity-50"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full bg-[#C9A96E] text-black font-lato text-[16px] font-medium uppercase tracking-[0.1em] py-4 hover:bg-[#A07840] transition-colors duration-300 disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                      {status === 'loading' ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : 'Send Enquiry'}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
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
                    <a href="tel:+919841080909" className="block font-lato text-[16px] text-[#1A1A1A] hover:text-[#C9A96E] transition-colors">
                      +91 98410 80909
                    </a>
                  </div>

                  <div>
                    <h3 className="font-lato text-[12px] uppercase tracking-[0.15em] text-[#888888] mb-2">
                      Email
                    </h3>
                    <a href="mailto:ainz.mhr@gmail.com" className="font-lato text-[16px] text-[#C9A96E] hover:underline">
                      ainz.mhr@gmail.com
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
