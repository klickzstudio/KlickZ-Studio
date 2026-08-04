import Link from 'next/link'
import Image from 'next/image'
import { SiteSettings } from '@/types/sanity'
import { ROUTES } from '@/config/routes'
import { FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa'

interface FooterProps {
  settings?: SiteSettings | null
}

export function Footer({ settings }: FooterProps) {
  const siteTitle = settings?.title || 'KLICKZSTUDIO'
  const siteEmail = settings?.email || 'klickzstudio@gmail.com'
  const sitePhone = settings?.phone || '+91 97102 98451'
  const fbLink = settings?.socials?.facebook || 'https://www.facebook.com/klickzstudio/'
  const igLink = settings?.socials?.instagram || 'https://www.instagram.com/weddingby_klickzstudio/'
  const ytLink = settings?.socials?.youtube || 'https://www.youtube.com/@klickzstudio1320'

  return (
    <footer className="bg-[#F7F6F2] text-[#1A1A1A] border-t border-[#E8E2D5]">
      {/* Main Footer Section */}
      <div className="max-w-[1280px] mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Column 1: Brand Info & Social Icons */}
          <div className="md:col-span-5 lg:col-span-5 flex flex-col justify-between">
            <div>
              <Link href={ROUTES.HOME} className="inline-block mb-5">
                <Image
                  src="/KlickzStudio_Logo_last_final_Black.png"
                  alt={siteTitle}
                  width={220}
                  height={60}
                  className="w-auto h-12 md:h-14 object-contain"
                />
              </Link>
              
              <p className="font-lato text-sm text-[#555555] leading-relaxed mb-6 max-w-md">
                Professional premium photography and videography: weddings, lifestyle, newborns, celebrities and corporate productions.
              </p>
            </div>

            {/* Social Icons Row */}
            <div className="flex items-center flex-wrap gap-2.5 pt-2">
              {/* Instagram */}
              <a
                href={igLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-[#E0DDD5] bg-white rounded-md flex items-center justify-center text-[#555] hover:text-[#D97706] hover:border-[#D97706] hover:bg-[#FFFDF5] transition-all duration-300 shadow-2xs"
                aria-label="Instagram"
              >
                <FaInstagram className="w-4 h-4" />
              </a>

              {/* Facebook */}
              <a
                href={fbLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-[#E0DDD5] bg-white rounded-md flex items-center justify-center text-[#555] hover:text-[#D97706] hover:border-[#D97706] hover:bg-[#FFFDF5] transition-all duration-300 shadow-2xs"
                aria-label="Facebook"
              >
                <FaFacebook className="w-4 h-4" />
              </a>

              {/* YouTube */}
              <a
                href={ytLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-[#E0DDD5] bg-white rounded-md flex items-center justify-center text-[#555] hover:text-[#D97706] hover:border-[#D97706] hover:bg-[#FFFDF5] transition-all duration-300 shadow-2xs"
                aria-label="YouTube"
              >
                <FaYoutube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: SERVICES */}
          <div className="md:col-span-3 lg:col-span-3">
            <h3 className="font-lato text-[12px] font-bold tracking-[0.2em] uppercase text-[#D97706] mb-5">
              Services
            </h3>
            <ul className="space-y-3 font-lato text-sm text-[#4A4A4A]">
              <li>
                <Link href={ROUTES.GALLERY.ROOT} className="hover:text-[#D97706] transition-colors">
                  Wedding
                </Link>
              </li>
              <li>
                <Link href={ROUTES.SERVICES.ROOT} className="hover:text-[#D97706] transition-colors">
                  Lifestyle &amp; Events
                </Link>
              </li>
              <li>
                <Link href={ROUTES.SERVICES.ROOT} className="hover:text-[#D97706] transition-colors">
                  Baby &amp; Newborn
                </Link>
              </li>
              <li>
                <Link href={ROUTES.SERVICES.ROOT} className="hover:text-[#D97706] transition-colors">
                  Celebrity &amp; Gallery
                </Link>
              </li>
              <li>
                <Link href={ROUTES.SERVICES.ROOT} className="hover:text-[#D97706] transition-colors">
                  Product &amp; Corporate
                </Link>
              </li>
              <li>
                <Link href={ROUTES.PRICING} className="hover:text-[#C9A96E] transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: GET IN TOUCH & WORKING HOURS */}
          <div className="md:col-span-4 lg:col-span-4">
            <h3 className="font-lato text-[12px] font-bold tracking-[0.2em] uppercase text-[#D97706] mb-5">
              Get In Touch
            </h3>
            
            <ul className="space-y-3.5 font-lato text-sm text-[#4A4A4A] mb-6">
              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 text-[#D97706] shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href={`tel:${sitePhone.replace(/\s+/g, '')}`} className="hover:text-[#D97706] transition-colors font-medium">
                  {sitePhone}
                </a>
              </li>
              
              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 text-[#D97706] shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${siteEmail}`} className="hover:text-[#D97706] transition-colors">
                  {siteEmail}
                </a>
              </li>

              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-[#555555] leading-snug">
                  5th St, Raja Shanmuga Nagar, Tiruvottiyur, Chennai, Greater Chennai, Tamil Nadu 600019
                </span>
              </li>
            </ul>

            <div className="border-t border-[#E5E0D5] my-6" />

            <h3 className="font-lato text-[12px] font-bold tracking-[0.2em] uppercase text-[#D97706] mb-3">
              Working Hours
            </h3>

            <div className="space-y-1.5 font-lato text-xs text-[#555555]">
              <div className="flex items-center justify-between">
                <span>All Working Days</span>
                <span className="font-semibold text-[#1A1A1A]">10:00 AM – 8:00 PM</span>
              </div>
            </div>

          </div>

        </div>

        {/* Embedded Google Map Section */}
        <div className="mt-12 w-full rounded-2xl overflow-hidden border border-[#E5DFD2] shadow-xs h-72 md:h-80 bg-white">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62157.458573127355!2d80.22702562167967!3d13.172413100000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526fdfd85eb2f7%3A0x79cfd539672f8d13!2sKlickz%20studio!5e0!3m2!1sen!2sin!4v1775995869138!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Klickz Studio Location Map"
          />
        </div>
      </div>

      {/* Copyright Bottom Bar */}
      <div className="border-t border-[#E8E2D5] py-5">
        <div className="max-w-[1280px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 font-lato text-xs text-[#777777]">
          <p>
            © 2026 {siteTitle}. All rights reserved. Professional Photography &amp; Videography
          </p>
          <div className="flex items-center gap-6">
            <Link href="/contact" className="hover:text-[#D97706] transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-[#D97706] transition-colors">
              Privacy
            </Link>
            <span>
              Powered by{' '}
              <a
                href="https://ainz.space"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D97706] hover:underline font-medium"
              >
                AinZ
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}


