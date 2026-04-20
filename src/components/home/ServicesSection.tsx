import Image from 'next/image'
import Link from 'next/link'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

const defaultServices = [
  {
    title: 'Candid Wedding',
    description: 'Authentic, unposed moments that capture the true essence and raw emotion of your celebration.',
    href: '/best-candid-wedding-photography-chennai',
  },
  {
    title: 'Cinematic Films',
    description: 'Story-driven cinematic wedding films that let you relive your special day as a masterpiece.',
    href: '/wedding-photography-faqs',
  },
  {
    title: 'Destination Weddings',
    description: 'Traveling across the globe to frame your love story against breathtaking landscapes and heritage venues.',
    href: '/outdoor-photography-chennai',
  },
  {
    title: 'Pre-Wedding',
    description: 'Intimate storytelling sessions before the big day, focusing entirely on your chemistry and connection.',
    href: '/outdoor-photography-chennai',
  },
]

interface CmsService {
  title: string
  description: string
  image: string
  href: string
}

interface ServicesSectionProps {
  images?: string[]
  services?: CmsService[] | null
}

export function ServicesSection({ images = [], services = null }: ServicesSectionProps) {
  // Build final display list: CMS objects take priority, fallback to defaults with passed images
  const displayServices = defaultServices.map((def, i) => {
    const cms = services?.[i]
    return {
      title:       cms?.title       || def.title,
      description: cms?.description || def.description,
      href:        cms?.href        || def.href,
      image:       cms?.image       || images[i] || '',
    }
  })

  return (
    <section className="relative py-24 md:py-36 bg-[#F8F4EE] border-t border-[#C9A96E]/20" id="services">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <ScrollReveal className="text-center mb-16 md:mb-24">
          <span className="font-lato text-[11px] uppercase tracking-[0.4em] text-[#C9A96E] mb-6 block">
            Our Expertise
          </span>
          <h2 className="font-cormorant text-4xl md:text-5xl lg:text-[56px] text-[#2B2420] mb-6 leading-tight">
            Curating visual poetry <br />
            <span className="italic text-[#C9A96E]">for modern romantics.</span>
          </h2>
          <div className="w-[60px] h-[1px] bg-[#C9A96E] mx-auto" />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayServices.map((service, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1}>
              <Link href={service.href} className="group block relative aspect-[3/4] overflow-hidden bg-[#2B2420]">
                {service.image && (
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-80 transition-all duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent opacity-80" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="font-cormorant text-2xl text-[#F8F4EE] mb-3 group-hover:text-[#C9A96E] transition-colors duration-300 drop-shadow-md">
                    {service.title}
                  </h3>
                  <div className="h-0 overflow-hidden group-hover:h-[80px] transition-all duration-500">
                    <p className="font-lato text-[12px] font-light text-[#F8F4EE]/70 leading-relaxed mt-2 drop-shadow-sm">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
