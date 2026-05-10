'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { navLinks } from '@/data/navigation'
import { NavLink } from '@/types'
import { SiteSettings } from '@/types/sanity'

interface NavbarProps {
  settings?: SiteSettings | null
}

export function Navbar({ settings }: NavbarProps) {
  const siteTitle = settings?.title || 'KLICKZSTUDIO'
  const sitePhone = settings?.phone || '+91 97102 98451'
  const siteWhatsApp = settings?.whatsappPhone || '919710298451'
  const fbLink = settings?.socials?.facebook || 'https://www.facebook.com/klickzstudio/'
  const igLink = settings?.socials?.instagram || 'https://www.instagram.com/weddingby_klickzstudio/'
  const ytLink = settings?.socials?.youtube || 'https://www.youtube.com/@klickzstudio1320'

  const [scrolled, setScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollYRef = useRef(0)
  const [isInfoOpen, setIsInfoOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Handle Scroll (Scrolled State + Show/Hide logic)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 60)
      if (currentScrollY < 10) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollYRef.current) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      lastScrollYRef.current = currentScrollY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-[0.22, 1, 0.36, 1] ${scrolled ? 'bg-white/95 backdrop-blur-md' : 'bg-transparent'
          } ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
        style={{ height: '100px' }}
      >
        <div className="mx-auto h-full flex items-center px-6 lg:px-8 xl:px-12 max-w-[1700px] relative">

          {/* Navigation Section (Left) */}
          <div className="hidden lg:flex flex-1 items-center justify-start gap-4 xl:gap-8 px-4">
            {navLinks.slice(0, 3).map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={`font-lato text-[10.5px] xl:text-[11px] uppercase tracking-[0.12em] transition-colors duration-400 font-normal hover-gold-underline whitespace-nowrap flex items-center gap-1 ${scrolled ? 'text-black/80 hover:text-black' : 'text-white/90 hover:text-[#C9A96E]'}`}
                >
                  {link.label}
                  {link.children && (
                    <span className={`${scrolled ? 'opacity-20' : 'opacity-30'}`}>
                      <svg width="6" height="4" viewBox="0 0 7 4" fill="none">
                        <path d="M1 1L3.5 3L6 1" stroke="currentColor" strokeWidth="1" />
                      </svg>
                    </span>
                  )}
                </Link>

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

          {/* Logo Section (Centered) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:relative lg:left-auto lg:top-auto lg:translate-x-0 lg:translate-y-0 flex-none z-10">
            <Link href="/" className="inline-block group whitespace-nowrap text-center">
              {scrolled ? (
                <Image src="/KlickzStudioBlack.png" alt={siteTitle} width={500} height={200} priority className="h-[80px] sm:h-[92px] w-auto object-contain transition-all duration-500 group-hover:scale-[1.02]" />
              ) : (
                <Image src="/KlickzStudioWhite.png" alt={siteTitle} width={500} height={200} priority className="h-[80px] sm:h-[92px] w-auto object-contain transition-all duration-500 group-hover:scale-[1.02]" />
              )}
            </Link>
          </div>

          {/* Navigation Section (Right) + Info */}
          <div className="hidden lg:flex flex-1 items-center justify-end gap-6 xl:gap-8 px-4">
            {navLinks.slice(3).map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {link.isButton ? (
                  <Link
                    href={link.href}
                    className={`border px-5 py-1.5 xl:px-6 xl:py-2 font-lato text-[11px] uppercase tracking-[0.1em] transition-all duration-400 font-medium whitespace-nowrap ${scrolled
                      ? 'border-black text-black hover:bg-black hover:text-white'
                      : 'border-[#C9A96E] text-[#C9A96E] hover:bg-[#C9A96E] hover:text-black'
                      }`}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <Link
                    href={link.href}
                    className={`font-lato text-[10.5px] xl:text-[11px] uppercase tracking-[0.12em] transition-colors duration-400 font-normal hover-gold-underline whitespace-nowrap flex items-center gap-1 ${scrolled ? 'text-black/80 hover:text-black' : 'text-white/90 hover:text-[#C9A96E]'
                      }`}
                  >
                    {link.label}
                    {link.children && (
                      <span className={`${scrolled ? 'opacity-20' : 'opacity-30'}`}>
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

          {/* Mobile Menu Button - 3-bar design */}
          <div className="lg:hidden flex flex-1 justify-end pr-2">
            <button
              onClick={() => setIsInfoOpen(true)}
              className={`flex flex-col gap-1.5 items-end p-3 group transition-all duration-300 transform active:scale-95`}
              aria-label="Open mobile menu"
            >
              <span className={`h-[2px] w-6 transition-all duration-300 ${scrolled ? 'bg-black' : 'bg-white'} rounded-full`} />
              <span className={`h-[2px] w-4 transition-all duration-300 ${scrolled ? 'bg-black' : 'bg-white'} rounded-full`} />
              <span className={`h-[2px] w-5 transition-all duration-300 ${scrolled ? 'bg-black' : 'bg-white'} rounded-full`} />
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
              className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-[#F5F0E8] z-[101] overflow-y-auto px-10 pt-12 pb-16 md:px-16 md:py-24 shadow-[-20px_0_60px_rgba(0,0,0,0.05)] border-l border-black/5"
            >
              <button
                onClick={() => setIsInfoOpen(false)}
                className="absolute top-8 right-8 text-black/40 hover:text-[#C9A96E] transition-colors p-2"
                aria-label="Close information panel"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              <div className="space-y-10">
                <div>
                  <h3 className="font-cormorant text-black text-3xl font-light tracking-[0.25em] mb-6">
                    <Image src="/KlickzStudioBlack.png" alt="KLICKZSTUDIO" width={400} height={100} className="w-auto h-20" />
                  </h3>
                  <p className="font-lato text-[15px] text-black/60 leading-relaxed font-light tracking-wide italic">
                    &ldquo;Founded with a passion for soulful storytelling, KLICKZSTUDIO captures the essence of love and celebration across destinations.&rdquo;
                  </p>
                </div>

                <div className="space-y-6">
                  <h4 className="font-lato text-[10px] uppercase tracking-[0.3em] text-[#C9A96E] opacity-60">Explore Work</h4>
                  <div className="grid grid-cols-1 gap-6">
                    {navLinks.map((link) => {
                      const isEditorial = link.label.toLowerCase().includes('about') || link.label.toLowerCase().includes('wedding') || link.label.toLowerCase().includes('contact') || link.label.toLowerCase().includes('poetry');
                      const isOpen = activeMobileDropdown === link.label;

                      return (
                        <div key={link.label} className="w-full">
                          {link.children ? (
                            <div className="flex items-center justify-between group">
                              <Link
                                href={link.href}
                                onClick={() => setIsInfoOpen(false)}
                                className={`transition-all duration-500 hover:pl-4 ${isEditorial
                                  ? "font-cormorant italic text-3xl font-light text-black/90 hover:text-[#C9A96E]"
                                  : "font-cormorant uppercase text-2xl tracking-[0.2em] text-black/80 hover:text-[#C9A96E]"
                                  }`}
                              >
                                {link.label}
                              </Link>
                              <button
                                onClick={() => setActiveMobileDropdown(isOpen ? null : link.label)}
                                className="p-4 text-black/30 hover:text-[#C9A96E] transition-colors"
                              >
                                <motion.span
                                  animate={{ rotate: isOpen ? 180 : 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="block"
                                >
                                  <svg width="14" height="8" viewBox="0 0 12 7" fill="none">
                                    <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.2" />
                                  </svg>
                                </motion.span>
                              </button>
                            </div>
                          ) : (
                            <Link
                              href={link.href}
                              onClick={() => setIsInfoOpen(false)}
                              className={`block w-full transition-all duration-500 hover:pl-4 ${isEditorial
                                ? "font-cormorant italic text-3xl font-light text-black/90 hover:text-[#C9A96E]"
                                : "font-cormorant uppercase text-2xl tracking-[0.2em] text-black/80 hover:text-[#C9A96E]"
                                }`}
                            >
                              {link.label}
                            </Link>
                          )}

                          {/* Dropdown Content */}
                          <AnimatePresence>
                            {link.children && isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className="overflow-hidden"
                              >
                                <div className="flex flex-col gap-4 pt-6 pb-2 pl-4 border-l border-black/10 ml-4">
                                  {link.children.map((child) => (
                                    <Link
                                      key={child.label}
                                      href={child.href}
                                      onClick={() => setIsInfoOpen(false)}
                                      className="font-lato text-[11px] tracking-[0.15em] uppercase text-black/60 hover:text-[#C9A96E] transition-colors"
                                    >
                                      {child.label}
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="space-y-10">
                  <h4 className="font-lato text-[10px] uppercase tracking-[0.3em] text-[#C9A96E] opacity-60">Get In Touch</h4>
                  <div className="space-y-8">
                    <div>
                      <span className="block font-lato text-[10px] uppercase text-black/40 mb-3 font-semibold tracking-[0.2em]">Our Base</span>
                      <p className="font-cormorant text-xl text-black">Chennai, India</p>
                    </div>
                    <div>
                      <span className="block font-lato text-[10px] uppercase text-black/40 mb-3 font-semibold tracking-[0.2em]">Email</span>
                      <a href="mailto:Klickzstudio@gmail.com" className="font-cormorant text-2xl text-black hover:text-[#C9A96E] transition-colors underline underline-offset-8 decoration-black/10 decoration-1 hover:decoration-[#C9A96E]">
                        Klickzstudio@gmail.com
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

