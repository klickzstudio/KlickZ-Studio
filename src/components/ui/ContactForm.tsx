'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ContactFormProps {
  buttonText?: string
  isBooking?: boolean
}

type SubmissionStatus = 'idle' | 'loading' | 'success' | 'error'

export function ContactForm({ buttonText = 'Send Message', isBooking = false }: ContactFormProps) {
  const [status, setStatus] = useState<SubmissionStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    subject: 'Wedding Inquiry',
    venue: '',
    service: 'Candid Wedding Photography',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    // Map UI fields to API expectations
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      location: isBooking ? formData.venue : 'General Inquiry',
      weddingDate: isBooking ? formData.date : 'N/A',
      eventType: isBooking ? formData.service : formData.subject,
      message: formData.message || 'No message provided'
    }

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send enquiry')
      }

      setStatus('success')
    } catch (error: any) {
      console.error('Submission error:', error)
      setStatus('error')
      setErrorMessage(error.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <AnimatePresence mode="wait">
      {status === 'success' ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#F8F4EE] p-8 md:p-12 text-center border border-[#C9A96E]/20"
        >
          <div className="w-16 h-16 bg-[#C9A96E] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h3 className="font-cormorant text-3xl text-[#2B2420] mb-4">Thank You</h3>
          <p className="font-lato text-sm text-[#555555] mb-8">
            Your inquiry has been received. Our team will get in touch with you within 24-48 hours.
          </p>
          <button
            onClick={() => {
              setFormData({
                name: '',
                email: '',
                phone: '',
                date: '',
                subject: 'Wedding Inquiry',
                venue: '',
                service: 'Candid Wedding Photography',
                message: '',
              })
              setStatus('idle')
            }}
            className="font-lato text-[11px] uppercase tracking-widest text-[#C9A96E] hover:underline"
          >
            Send another message
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
        >
          {status === 'error' && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <p className="text-red-700 text-xs font-lato font-bold mb-1">Failed to send inquiry:</p>
              <p className="text-red-600 text-xs font-lato">{errorMessage}</p>
            </div>
          )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block font-lato text-[10px] uppercase tracking-widest text-[#2B2420] mb-2 font-semibold">Your Name *</label>
          <input
            type="text"
            id="name"
            required
            disabled={status === 'loading'}
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-white border border-black/5 px-4 py-3 font-lato text-sm focus:outline-none focus:border-[#C9A96E] transition-colors disabled:opacity-50"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-lato text-[10px] uppercase tracking-widest text-[#2B2420] mb-2 font-semibold">Email Address *</label>
          <input
            type="email"
            id="email"
            required
            disabled={status === 'loading'}
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-white border border-black/5 px-4 py-3 font-lato text-sm focus:outline-none focus:border-[#C9A96E] transition-colors disabled:opacity-50"
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block font-lato text-[10px] uppercase tracking-widest text-[#2B2420] mb-2 font-semibold">Phone Number *</label>
          <input
            type="tel"
            id="phone"
            required
            disabled={status === 'loading'}
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-white border border-black/5 px-4 py-3 font-lato text-sm focus:outline-none focus:border-[#C9A96E] transition-colors disabled:opacity-50"
            placeholder="+91 00000 00000"
          />
        </div>
        {isBooking ? (
          <div>
            <label htmlFor="date" className="block font-lato text-[10px] uppercase tracking-widest text-[#2B2420] mb-2 font-semibold">Event Date *</label>
            <input
              type="date"
              id="date"
              required
              disabled={status === 'loading'}
              value={formData.date}
              onChange={handleChange}
              className="w-full bg-white border border-black/5 px-4 py-3 font-lato text-sm focus:outline-none focus:border-[#C9A96E] transition-colors disabled:opacity-50"
            />
          </div>
        ) : (
          <div>
            <label htmlFor="subject" className="block font-lato text-[10px] uppercase tracking-widest text-[#2B2420] mb-2 font-semibold">Subject</label>
            <select
              id="subject"
              disabled={status === 'loading'}
              value={formData.subject}
              onChange={handleChange}
              className="w-full bg-white border border-black/5 px-4 py-3 font-lato text-sm focus:outline-none focus:border-[#C9A96E] transition-colors disabled:opacity-50"
            >
              <option value="Wedding Inquiry">Wedding Inquiry</option>
              <option value="Commercial Shoots">Commercial Shoots</option>
              <option value="General Feedback">General Feedback</option>
              <option value="Other">Other</option>
            </select>
          </div>
        )}
      </div>

      {isBooking && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="venue" className="block font-lato text-[10px] uppercase tracking-widest text-[#2B2420] mb-2 font-semibold">Event Venue *</label>
            <input
              type="text"
              id="venue"
              required
              disabled={status === 'loading'}
              value={formData.venue}
              onChange={handleChange}
              className="w-full bg-white border border-black/5 px-4 py-3 font-lato text-sm focus:outline-none focus:border-[#C9A96E] transition-colors disabled:opacity-50"
              placeholder="E.g. ITC Grand Chola, Chennai"
            />
          </div>
          <div>
            <label htmlFor="service" className="block font-lato text-[10px] uppercase tracking-widest text-[#2B2420] mb-2 font-semibold">Required Service</label>
            <select
              id="service"
              disabled={status === 'loading'}
              value={formData.service}
              onChange={handleChange}
              className="w-full bg-white border border-black/5 px-4 py-3 font-lato text-sm focus:outline-none focus:border-[#C9A96E] transition-colors disabled:opacity-50"
            >
              <option value="Candid Wedding Photography">Candid Wedding Photography</option>
              <option value="Cinematic Wedding Films">Cinematic Wedding Films</option>
              <option value="The Complete Package (Photo + Video)">The Complete Package (Photo + Video)</option>
              <option value="Outdoor / Pre-wedding Shoot">Outdoor / Pre-wedding Shoot</option>
            </select>
          </div>
        </div>
      )}

      <div>
        <label htmlFor="message" className="block font-lato text-[10px] uppercase tracking-widest text-[#2B2420] mb-2 font-semibold">Message</label>
        <textarea
          id="message"
          rows={5}
          disabled={status === 'loading'}
          value={formData.message}
          onChange={handleChange}
          className="w-full bg-white border border-black/5 px-4 py-3 font-lato text-sm focus:outline-none focus:border-[#C9A96E] transition-colors resize-none disabled:opacity-50"
          placeholder="Tell us about your story..."
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-[#2B2420] text-white font-lato text-[12px] uppercase tracking-[0.2em] py-5 hover:bg-[#C9A96E] hover:text-[#2B2420] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
          </span>
        ) : buttonText}
      </button>
    </motion.form>
  )}
</AnimatePresence>
  )
}
