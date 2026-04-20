'use client'

import { useState } from 'react'

interface ContactFormProps {
  buttonText?: string
  isBooking?: boolean
}

export function ContactForm({ buttonText = 'Send Message', isBooking = false }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    
    // Simulate form submission
    setTimeout(() => {
      setStatus('success')
    }, 1500)
  }

  if (status === 'success') {
    return (
      <div className="bg-[#F8F4EE] p-8 md:p-12 text-center">
        <h3 className="font-cormorant text-3xl text-[#2B2420] mb-4 text-center">Thank You</h3>
        <p className="font-lato text-sm text-[#555555] text-center">
          Your message has been received. We will get back to you within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block font-lato text-[10px] uppercase tracking-widest text-[#2B2420] mb-2 font-semibold">Your Name</label>
          <input
            type="text"
            id="name"
            required
            className="w-full bg-white border border-black/5 px-4 py-3 font-lato text-sm focus:outline-none focus:border-[#C9A96E] transition-colors"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-lato text-[10px] uppercase tracking-widest text-[#2B2420] mb-2 font-semibold">Email Address</label>
          <input
            type="email"
            id="email"
            required
            className="w-full bg-white border border-black/5 px-4 py-3 font-lato text-sm focus:outline-none focus:border-[#C9A96E] transition-colors"
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block font-lato text-[10px] uppercase tracking-widest text-[#2B2420] mb-2 font-semibold">Phone Number</label>
          <input
            type="tel"
            id="phone"
            className="w-full bg-white border border-black/5 px-4 py-3 font-lato text-sm focus:outline-none focus:border-[#C9A96E] transition-colors"
            placeholder="+91 00000 00000"
          />
        </div>
        {isBooking ? (
          <div>
            <label htmlFor="date" className="block font-lato text-[10px] uppercase tracking-widest text-[#2B2420] mb-2 font-semibold">Event Date</label>
            <input
              type="date"
              id="date"
              required
              className="w-full bg-white border border-black/5 px-4 py-3 font-lato text-sm focus:outline-none focus:border-[#C9A96E] transition-colors"
            />
          </div>
        ) : (
          <div>
            <label htmlFor="subject" className="block font-lato text-[10px] uppercase tracking-widest text-[#2B2420] mb-2 font-semibold">Subject</label>
            <select
              id="subject"
              className="w-full bg-white border border-black/5 px-4 py-3 font-lato text-sm focus:outline-none focus:border-[#C9A96E] transition-colors"
            >
              <option>Wedding Inquiry</option>
              <option>Commercial Shoots</option>
              <option>General Feedback</option>
              <option>Other</option>
            </select>
          </div>
        )}
      </div>

      {isBooking && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="venue" className="block font-lato text-[10px] uppercase tracking-widest text-[#2B2420] mb-2 font-semibold">Event Venue</label>
            <input
              type="text"
              id="venue"
              required
              className="w-full bg-white border border-black/5 px-4 py-3 font-lato text-sm focus:outline-none focus:border-[#C9A96E] transition-colors"
              placeholder="E.g. ITC Grand Chola, Chennai"
            />
          </div>
          <div>
            <label htmlFor="service" className="block font-lato text-[10px] uppercase tracking-widest text-[#2B2420] mb-2 font-semibold">Required Service</label>
            <select
              id="service"
              className="w-full bg-white border border-black/5 px-4 py-3 font-lato text-sm focus:outline-none focus:border-[#C9A96E] transition-colors"
            >
              <option>Candid Wedding Photography</option>
              <option>Cinematic Wedding Films</option>
              <option>The Complete Package (Photo + Video)</option>
              <option>Outdoor / Pre-wedding Shoot</option>
            </select>
          </div>
        </div>
      )}

      <div>
        <label htmlFor="message" className="block font-lato text-[10px] uppercase tracking-widest text-[#2B2420] mb-2 font-semibold">Message</label>
        <textarea
          id="message"
          rows={5}
          className="w-full bg-white border border-black/5 px-4 py-3 font-lato text-sm focus:outline-none focus:border-[#C9A96E] transition-colors resize-none"
          placeholder="Tell us about your story..."
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-[#2B2420] text-white font-lato text-[12px] uppercase tracking-[0.2em] py-5 hover:bg-[#C9A96E] hover:text-[#2B2420] transition-all duration-500 disabled:opacity-50"
      >
        {status === 'loading' ? 'Sending...' : buttonText}
      </button>
    </form>
  )
}
