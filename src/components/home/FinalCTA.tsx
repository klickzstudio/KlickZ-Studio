import Link from 'next/link'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

interface FinalCTAProps {
  backgroundImage?: string
}

export function FinalCTA({ backgroundImage }: FinalCTAProps) {
  return (
    <section className="bg-[#F7F6F2] pt-16 pb-6 px-4 md:px-8">
      <div className="max-w-[1280px] mx-auto">
        <ScrollReveal>
          <div className="bg-[#FFFDF7] border border-[#E8E1D1] rounded-2xl p-8 md:p-14 text-center shadow-sm relative overflow-hidden">
            {/* Subtle top decorative accent line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[3px] bg-[#D97706]/60 rounded-b-full" />
            
            <h2 className="font-cormorant text-3xl md:text-5xl font-semibold text-[#1A1A1A] mb-4 tracking-tight">
              Ready to Book Your Session?
            </h2>
            
            <p className="font-lato text-sm md:text-base text-[#666666] max-w-xl mx-auto mb-8 font-light leading-relaxed">
              Contact us to discuss your photography and videography needs and get a custom quote
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto font-lato text-sm font-semibold text-[#1A1A1A] bg-[#C9A96E] hover:bg-black hover:text-white px-8 py-3.5 rounded-lg transition-all duration-300 shadow-sm flex items-center justify-center gap-2 group"
              >
                <span>Get in Touch</span>
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              
              <Link
                href="/book-us"
                className="w-full sm:w-auto font-lato text-sm font-medium text-[#1A1A1A] bg-white border border-[#D1D5DB] hover:border-[#C9A96E] hover:bg-[#FFFDF5] px-7 py-3.5 rounded-lg transition-all duration-300 shadow-sm flex items-center justify-center gap-2.5"
              >
                <svg
                  className="w-4 h-4 text-[#C9A96E]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span>Consult with Team KlickZ</span>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

