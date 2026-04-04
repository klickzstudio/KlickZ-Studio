import Image from 'next/image'
import { PageHero } from '@/components/ui/PageHero'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | AinZ Studio - Wedding Photographers Chennai',
  description: 'Learn about AinZ Studio — award-winning wedding photographers in Chennai with 15+ years of experience and 750+ weddings captured.',
}

const teamImages = [
  'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80',
]

export default function AboutUsPage() {
  return (
    <>
      <PageHero
        title="About Us"
        subtitle="The story behind the lens"
        backgroundImage="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1920&q=80"
      />

      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <h2 className="font-cormorant text-3xl md:text-[42px] font-normal text-[#1A1A1A] leading-tight mb-6">
                We are AinZ Studio
              </h2>
              <div className="w-[60px] h-[1px] bg-[#C9A96E] mb-6" />
              <p className="font-lato text-base font-light text-[#555555] leading-[1.8] mb-6">
                AinZ Studio is one of India&apos;s leading wedding photography companies, founded with a
                passion for storytelling through the lens. With over 15 years of experience and 750+
                weddings captured, we have built a reputation for creating timeless, emotive imagery
                that celebrates love in its purest form.
              </p>
              <p className="font-lato text-base font-light text-[#555555] leading-[1.8] mb-6">
                Based in Chennai and Coimbatore, our team of passionate photographers and filmmakers
                travel across India and the world to document the most beautiful wedding stories. We
                believe in building personal connections with our couples, understanding their unique
                story, and translating that into photographs that will be cherished for generations.
              </p>
              <p className="font-lato text-base font-light text-[#555555] leading-[1.8]">
                Our approach combines candid storytelling with artistic finesse — capturing real emotions,
                genuine laughter, and those fleeting moments of joy that make each wedding unique.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-3">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={teamImages[0]}
                      alt="AinZ Studio team"
                      fill
                      className="object-cover"
                      sizes="300px"
                    />
                  </div>
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={teamImages[1]}
                      alt="Photographer at work"
                      fill
                      className="object-cover"
                      sizes="300px"
                    />
                  </div>
                </div>
                <div className="pt-8">
                  <div className="relative aspect-[3/5] overflow-hidden">
                    <Image
                      src={teamImages[2]}
                      alt="Behind the scenes"
                      fill
                      className="object-cover"
                      sizes="300px"
                    />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-28 bg-[#F9F6F2]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <ScrollReveal className="text-center mb-16">
            <h2 className="font-cormorant text-3xl md:text-[42px] font-normal text-[#1A1A1A] mb-4">
              Our Philosophy
            </h2>
            <div className="section-divider" />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'Storytelling', desc: 'Every wedding has a unique narrative. We immerse ourselves in your story to capture its essence authentically.' },
              { title: 'Artistry', desc: 'We blend technical mastery with creative vision to create photographs that are both beautiful and meaningful.' },
              { title: 'Connection', desc: 'Building genuine relationships with our couples ensures comfort and trust, resulting in natural, emotive imagery.' },
            ].map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.12}>
                <div className="text-center">
                  <h3 className="font-cormorant text-2xl font-normal text-[#1A1A1A] mb-4">
                    {item.title}
                  </h3>
                  <div className="w-[40px] h-[1px] bg-[#C9A96E] mx-auto mb-4" />
                  <p className="font-lato text-[14px] font-light text-[#555555] leading-[1.8]">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
