'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { navLinks } from '@/data/navigation'
import { NavLink } from '@/types'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isInfoOpen, setIsInfoOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Handle Scroll (Scrolled State + Show/Hide logic)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 60)
      if (currentScrollY < 10) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      setLastScrollY(currentScrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  useEffect(() => {
    if (isInfoOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isInfoOpen])

  return (
    <>
      {/* Top Gradient Overlay for readability on white images */}
      {!scrolled && (
        <div className="fixed top-0 left-0 w-full h-[140px] bg-gradient-to-b from-black/70 via-black/30 to-transparent z-[49] pointer-events-none" />
      )}

      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-[0.22, 1, 0.36, 1] ${
          scrolled ? 'bg-[#0A0A0A] border-b border-white/5' : 'bg-transparent'
        } ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
        style={{ height: '90px' }}
      >
        <div className="mx-auto h-full grid grid-cols-2 lg:grid-cols-[1fr_auto_1fr] items-center px-6 lg:px-8 xl:px-12 max-w-[1700px]">
          
          {/* Logo Section */}
          <div className="flex justify-start">
            <Link href="/" className="inline-block group whitespace-nowrap">
              <span className="font-cormorant text-white text-[19px] md:text-[22px] font-light tracking-[0.2em] transform transition-transform duration-500 group-hover:scale-[1.02]">
                AINZ STUDIO
              </span>
            </Link>
          </div>

          {/* Navigation Section (Centered) */}
          <div className="hidden lg:flex items-center justify-center gap-4 xl:gap-8 px-4">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {link.isButton ? (
                  <Link
                    href={link.href}
                    className="border border-[#C9A96E] text-[#C9A96E] px-5 py-1.5 xl:px-6 xl:py-2 font-lato text-[11px] uppercase tracking-[0.1em] transition-all duration-400 hover:bg-[#C9A96E] hover:text-black font-medium whitespace-nowrap"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <Link
                    href={link.href}
                    className="font-lato text-[10.5px] xl:text-[11px] uppercase tracking-[0.12em] text-white/90 hover:text-[#C9A96E] transition-colors duration-400 font-normal hover-gold-underline whitespace-nowrap flex items-center gap-1"
                  >
                    {link.label}
                    {link.children && (
                      <span className="opacity-30">
                        <svg width="6" height="4" viewBox="0 0 7 4" fill="none">
                          <path d="M1 1L3.5 3L6 1" stroke="currentColor" strokeWidth="1" />
                        </svg>
                      </span>
                    )}
                  </Link>
                )}

                {/* Dropdown */}
                <AnimatePresence>
                  {link.children && activeDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.25 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-[#111111] border border-white/5 min-w-[200px] py-4 shadow-2xl"
                    >
                      {link.children.map((child: NavLink) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-6 py-2.5 font-lato text-[10.5px] font-light text-white/60 hover:text-[#C9A96E] hover:bg-white/[0.03] transition-all duration-300 tracking-[0.1em]"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Actions Section (Right) */}
          <div className="flex justify-end items-center gap-6">
            <button
              onClick={() => setIsInfoOpen(true)}
              className="flex items-center gap-2.5 xl:gap-3 group transition-colors duration-300"
              aria-label="Open information panel"
            >
              <span className="font-lato text-[10.5px] xl:text-[11px] uppercase tracking-[0.2em] text-white/80 group-hover:text-[#C9A96E]">
                INFO
              </span>
              <div className="flex flex-col gap-1 w-5">
                <span className="h-[1px] w-full bg-white/60 group-hover:bg-[#C9A96E] transition-all duration-300" />
                <span className="h-[1px] w-[60%] bg-white/60 group-hover:bg-[#C9A96E] transition-all duration-300 ml-auto" />
                <span className="h-[1px] w-full bg-white/60 group-hover:bg-[#C9A96E] transition-all duration-300" />
              </div>
            </button>
          </div>

        </div>
      </nav>

      {/* Detail INFO Panel Overlay */}
      <AnimatePresence>
        {isInfoOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/85 backdrop-blur-sm z-[100]"
              onClick={() => setIsInfoOpen(false)}
            />
            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed top-0 right-0 h-full w-full md:w-[480px] bg-[#0E0E0E] z-[101] overflow-y-auto px-10 py-16 md:px-14 md:py-24 shadow-[-20px_0_60px_rgba(0,0,0,0.7)]"
            >
              <button
                onClick={() => setIsInfoOpen(false)}
                className="absolute top-8 right-8 text-white/40 hover:text-[#C9A96E] transition-colors p-2"
                aria-label="Close information panel"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              <div className="space-y-16">
                <div>
                  <h3 className="font-cormorant text-white text-3xl font-light tracking-[0.25em] mb-10">
                    AINZ STUDIO
                  </h3>
                  <p className="font-lato text-[15px] text-white/50 leading-relaxed font-light tracking-wide italic">
                    &ldquo;Founded with a passion for soulful storytelling, AinZ Studio captures the essence of love and celebration across destinations.&rdquo;
                  </p>
                </div>

                <div className="space-y-6">
                  <h4 className="font-lato text-[10px] uppercase tracking-[0.3em] text-[#C9A96E] opacity-60">Explore Work</h4>
                  <div className="grid grid-cols-1 gap-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={() => setIsInfoOpen(false)}
                        className="font-cormorant text-2xl text-white hover:text-[#C9A96E] transition-all hover:pl-2 duration-300"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="space-y-10">
                  <h4 className="font-lato text-[10px] uppercase tracking-[0.3em] text-[#C9A96E] opacity-60">Get In Touch</h4>
                  <div className="space-y-8">
                    <div>
                      <span className="block font-lato text-[10px] uppercase text-white/30 mb-3 font-semibold tracking-[0.2em]">Our Base</span>
                      <p className="font-cormorant text-xl text-white">Chennai & Coimbatore, India</p>
                    </div>
                    <div>
                      <span className="block font-lato text-[10px] uppercase text-white/30 mb-3 font-semibold tracking-[0.2em]">Email</span>
                      <a href="mailto:contact@ainz.space" className="font-cormorant text-2xl text-white hover:text-[#C9A96E] transition-colors underline underline-offset-8 decoration-white/10 decoration-1 hover:decoration-[#C9A96E]">
                        contact@ainz.space
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
