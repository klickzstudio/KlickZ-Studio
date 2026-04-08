'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type SubmissionStatus = 'idle' | 'loading' | 'success' | 'error'

export function ContactForm() {
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
            Thank you for choosing KLICKZSTUDIO. A member of our team will get in touch with you within 24-48 hours.
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
              <option value="maternity">Maternity</option>
              <option value="fashion">Fashion</option>
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
  )
}
