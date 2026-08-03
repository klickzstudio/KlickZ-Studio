import { Metadata } from 'next'
import Link from 'next/link'
import { constructMetadata } from '@/lib/seo'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { ROUTES } from '@/config/routes'

export const metadata: Metadata = constructMetadata({
  title: 'Pricing & Packages | KLICKZSTUDIO Photography Chennai',
  description:
    'Explore pricing ranges for wedding, lifestyle, maternity, portrait, and corporate photography services by KLICKZSTUDIO Chennai.',
})

// 1. Price Range Cards (5 Categories)
const priceRangeCategories = [
  {
    title: 'Weddings',
    priceRange: '₹80,000 – ₹7,00,000',
    description: 'Full-day cinematic wedding coverage: bridal portraits, ceremony, reception, and beyond.',
    href: ROUTES.GALLERY.ROOT,
  },
  {
    title: 'Lifestyle & Events',
    priceRange: '₹45,000 – ₹2,50,000',
    description: 'Candid lifestyle shoots, birthday celebrations, corporate events, and milestone moments.',
    href: ROUTES.SERVICES.ROOT,
  },
  {
    title: 'Baby Shower, Toddler & Maternity',
    priceRange: '₹35,000 – ₹2,50,000',
    description: 'Tender, timeless sessions capturing the magic of new life and growing families.',
    href: ROUTES.SERVICES.ROOT,
  },
  {
    title: 'Celebrity & Portfolio',
    priceRange: '₹35,000 – ₹4,50,000',
    description: 'High-end editorial and portfolio shoots for actors, artists, models, and public figures.',
    href: ROUTES.SERVICES.ROOT,
  },
  {
    title: 'Product & Corporate',
    priceRange: '₹35,000 – ₹4,50,000',
    description: 'Brand photography and videography for products, campaigns, and corporate identity.',
    href: ROUTES.SERVICES.ROOT,
  },
]

// 2. Pricing Factors
const pricingFactors = [
  {
    title: 'Events & Shooting Days',
    description: 'Number of ceremonies, functions, and total coverage days.',
    icon: (
      <svg className="w-4 h-4 text-[#C9A96E]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  {
    title: 'Guest Count & Venue Scale',
    description: 'Larger gatherings and bigger venues require a bigger crew.',
    icon: (
      <svg className="w-4 h-4 text-[#C9A96E]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    title: 'Team Composition',
    description: 'Photographers, cinematographers, or Creative Head involvement.',
    icon: (
      <svg className="w-4 h-4 text-[#C9A96E]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    title: 'Package Tier',
    description: 'Classic, Premium, Signature, or Luxury — each with distinct deliverables.',
    icon: (
      <svg className="w-4 h-4 text-[#C9A96E]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
  },
  {
    title: 'Add-ons',
    description: 'Drone, FPV, 360 Video Booth, or outdoor pre-wedding shoot.',
    icon: (
      <svg className="w-4 h-4 text-[#C9A96E]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Travel Outside Chennai',
    description: 'Distance, accommodation, and logistics for outstation events.',
    icon: (
      <svg className="w-4 h-4 text-[#C9A96E]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
]

// 3. Add-Ons & Upgrades
const addOns = [
  { title: 'Drone Aerial Coverage', note: 'Included in Signature+' },
  { title: 'FPV Drone', note: 'Included in Luxury' },
  { title: '360 Video Booth', note: 'Included in Luxury' },
  { title: 'Instant Photo Booth', note: 'Included in Luxury' },
  { title: 'Outdoor Pre/Post-Wedding Shoot', note: 'Included in Premium+' },
  { title: 'Lip-Dub Video (1 Session)', note: '₹1,00,000' },
  { title: 'Lip-Dub Video (2 Sessions)', note: '₹2,00,000' },
  { title: 'Additional Small Function — Photo or Video', note: '₹15,000 – ₹40,000' },
  { title: 'Live Telecast', note: '₹7,000 (2 hours)' },
  { title: 'Additional Photoshoot', note: '₹50,000' },
  { title: 'Additional Film', note: '₹70,000' },
  { title: 'Maternity Gown Rental', note: '₹5,000 – ₹20,000' },
]

// 4. Good to Know Cards
const goodToKnowItems = [
  {
    title: 'Payment Terms',
    description: '50% advance to block your date. Remaining 50% due on the event day or before the shoot.',
  },
  {
    title: 'Soft Copies Delivery',
    description: 'High-resolution photos delivered via private cloud link within 3–7 days of the event.',
  },
  {
    title: 'Cinematic Films',
    description: 'Films delivered within 3–4 weeks of song selection. Short reels delivered sooner for early social sharing.',
  },
  {
    title: 'Custom Albums',
    description: 'Printed albums delivered within 4–7 weeks of your photo selection. Multiple revision rounds included.',
  },
  {
    title: 'Session Duration',
    description: 'Standard sessions: 6–8 hours. Small function sessions: 3–4 hours. Overtime billed separately if needed.',
  },
  {
    title: 'Travel Outside Chennai',
    description: '₹25/km for travel beyond Chennai city limits. Client arranges stay and meals for the crew on outstation events.',
  },
]

export default function PricingPage() {
  return (
    <main className="pt-26 pb-16 bg-[#FAF9F6] text-[#1A1A1A]">
      {/* Hero Header */}
      <section className="py-10 md:py-12 border-b border-[#E8E2D5] bg-[#F7F5EF]">
        <div className="max-w-[1180px] mx-auto px-6 text-center">
          <ScrollReveal>
            <span className="font-lato text-[10px] uppercase tracking-[0.25em] text-[#C9A96E] font-bold mb-2 block">
              PRICING &amp; PACKAGES
            </span>
            <h1 className="font-cormorant text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A1A1A] mb-3 tracking-tight">
              Transparent Investment for Your Moments
            </h1>
            <p className="font-lato text-xs md:text-sm text-[#666666] max-w-xl mx-auto font-light leading-relaxed">
              Simple, straightforward pricing ranges for photography &amp; videography services crafted by KLICKZSTUDIO.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 1. Category Price Range Cards (Restructured 3-Column Grid) */}
      <section className="py-12 md:py-16 max-w-[1180px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {priceRangeCategories.map((category, idx) => (
            <ScrollReveal key={category.title} delay={idx * 0.06}>
              <div className="bg-white border border-[#EBE6DD] rounded-xl p-6 hover:border-[#C9A96E] hover:shadow-xs transition-all duration-300 flex flex-col justify-between h-full group">
                <div>
                  <span className="font-lato text-[10px] uppercase tracking-[0.2em] text-[#C9A96E] font-bold mb-2 block">
                    PRICE RANGE
                  </span>
                  <div className="font-inter text-xl sm:text-2xl lg:text-[24px] font-semibold text-[#1A1A1A] mb-2 tracking-tight">
                    {category.priceRange}
                  </div>
                  <h3 className="font-cormorant text-xl font-bold text-[#1A1A1A] mb-2">
                    {category.title}
                  </h3>
                  <p className="font-lato text-xs text-[#666666] font-light leading-relaxed mb-5">
                    {category.description}
                  </p>
                </div>
                <div>
                  <Link
                    href={category.href}
                    className="inline-flex items-center gap-1.5 font-lato text-[11px] uppercase tracking-[0.15em] text-[#C9A96E] font-bold group-hover:translate-x-1 transition-transform duration-300"
                  >
                    <span>View Service</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 2. What Affects Your Price? Section */}
      <section className="py-12 bg-[#F5F3EB] border-y border-[#E8E2D5]">
        <div className="max-w-[1180px] mx-auto px-6">
          <ScrollReveal className="mb-8">
            <span className="font-lato text-[10px] uppercase tracking-[0.25em] text-[#C9A96E] font-bold mb-1.5 block">
              PRICING FACTORS
            </span>
            <h2 className="font-cormorant text-2xl md:text-3xl lg:text-4xl font-bold text-[#1A1A1A] mb-2">
              What Affects Your Price?
            </h2>
            <p className="font-lato text-xs md:text-sm text-[#666666] max-w-lg font-light leading-relaxed">
              Every project is unique. These are the key variables our team weighs when crafting your custom quote.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {pricingFactors.map((factor, idx) => (
              <ScrollReveal key={factor.title} delay={idx * 0.04}>
                <div className="bg-white/90 border border-[#E6E0D4] rounded-lg p-4 hover:border-[#C9A96E] transition-all duration-300 h-full flex gap-3.5 items-start">
                  <div className="p-2 rounded-md bg-[#FAF7F0] border border-[#EAE3D4] shrink-0 mt-0.5">
                    {factor.icon}
                  </div>
                  <div>
                    <h4 className="font-inter text-xs md:text-sm font-bold text-[#1A1A1A] mb-1">
                      {factor.title}
                    </h4>
                    <p className="font-lato text-xs text-[#666666] font-light leading-snug">
                      {factor.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Info Banner */}
          <ScrollReveal>
            <div className="bg-[#FAF7F0] border border-[#E8E2D5] rounded-lg p-3.5 flex items-center gap-2.5 text-xs text-[#666666] font-lato">
              <span className="text-[#C9A96E] font-bold text-sm">ⓘ</span>
              <span>All prices are exclusive of GST. A 50% advance confirms your booking.</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. Common Add-Ons & Upgrades Grid */}
      <section className="py-12 md:py-16 max-w-[1180px] mx-auto px-6">
        <ScrollReveal className="mb-8">
          <span className="font-lato text-[10px] uppercase tracking-[0.25em] text-[#C9A96E] font-bold mb-1.5 block">
            ADD-ONS
          </span>
          <h2 className="font-cormorant text-2xl md:text-3xl lg:text-4xl font-bold text-[#1A1A1A] mb-2">
            Common Add-Ons &amp; Upgrades
          </h2>
          <p className="font-lato text-xs md:text-sm text-[#666666] max-w-lg font-light leading-relaxed">
            Enhance any package with these popular add-ons. Pricing is per-event unless noted.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {addOns.map((item, idx) => (
            <ScrollReveal key={item.title} delay={idx * 0.03}>
              <div className="bg-white border border-[#EBE6DD] rounded-lg p-4 hover:border-[#C9A96E] transition-all duration-300 h-full flex flex-col justify-between">
                <h4 className="font-inter text-xs md:text-sm font-bold text-[#1A1A1A] mb-1 leading-snug">
                  {item.title}
                </h4>
                <p className="font-lato text-xs text-[#888888] font-light">
                  {item.note}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 4. Good to Know: Payment, Delivery & Travel */}
      <section className="py-12 bg-[#F5F3EB] border-y border-[#E8E2D5]">
        <div className="max-w-[1180px] mx-auto px-6">
          <ScrollReveal className="mb-8">
            <span className="font-lato text-[10px] uppercase tracking-[0.25em] text-[#C9A96E] font-bold mb-1.5 block">
              GOOD TO KNOW
            </span>
            <h2 className="font-cormorant text-2xl md:text-3xl lg:text-4xl font-bold text-[#1A1A1A] mb-2">
              Payment, Delivery &amp; Travel
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {goodToKnowItems.map((item, idx) => (
              <ScrollReveal key={item.title} delay={idx * 0.04}>
                <div className="bg-white border border-[#EBE6DD] rounded-lg p-4.5 hover:border-[#C9A96E] transition-all duration-300 h-full">
                  <h4 className="font-inter text-xs md:text-sm font-bold text-[#1A1A1A] mb-1">
                    {item.title}
                  </h4>
                  <p className="font-lato text-xs text-[#666666] font-light leading-snug">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Info Banner */}
          <ScrollReveal>
            <div className="bg-[#FAF7F0] border border-[#E8E2D5] rounded-lg p-3.5 flex items-center gap-2.5 text-xs text-[#666666] font-lato">
              <span className="text-[#C9A96E] font-bold text-sm">ⓘ</span>
              <span>All prices are exclusive of GST. Final quotes are customised based on your specific requirements.</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 5. Need a Custom Quote? CTA Section */}
      <section className="py-14 md:py-18 max-w-[1180px] mx-auto px-6 text-center">
        <ScrollReveal>
          <h2 className="font-cormorant text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-2.5">
            Need a custom quote?
          </h2>
          <p className="font-lato text-xs md:text-sm text-[#666666] max-w-md mx-auto mb-6 font-light">
            Every story is different. Reach out and we&apos;ll build a package around yours.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={ROUTES.CONTACT}
              className="w-full sm:w-auto font-lato text-xs uppercase tracking-[0.18em] font-bold bg-[#C9A96E] hover:bg-black text-[#1A1A1A] hover:text-white px-7 py-3.5 rounded-full transition-all duration-300 shadow-2xs"
            >
              Get a Custom Quote
            </Link>
            <Link
              href={ROUTES.BOOK_US}
              className="w-full sm:w-auto font-lato text-xs uppercase tracking-[0.15em] font-semibold text-[#1A1A1A] bg-white border border-[#D1D5DB] hover:border-[#C9A96E] px-7 py-3.5 rounded-full transition-all duration-300 shadow-2xs flex items-center justify-center gap-2"
            >
              <span>Consult with Team KlickZ</span>
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </main>
  )
}
