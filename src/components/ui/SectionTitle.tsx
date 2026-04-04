import { ScrollReveal } from './ScrollReveal'

interface SectionTitleProps {
  title: string
  subtitle?: string
  light?: boolean
  className?: string
}

export function SectionTitle({ title, subtitle, light = false, className = '' }: SectionTitleProps) {
  return (
    <ScrollReveal className={`text-center mb-12 ${className}`}>
      <h2
        className={`font-cormorant text-3xl md:text-[42px] font-normal leading-tight mb-4 ${
          light ? 'text-white' : 'text-[#1A1A1A]'
        }`}
      >
        {title}
      </h2>
      <div className="section-divider" />
      {subtitle && (
        <p
          className={`font-lato text-base font-light max-w-2xl mx-auto mt-4 leading-relaxed ${
            light ? 'text-white/75' : 'text-[#555555]'
          }`}
        >
          {subtitle}
        </p>
      )}
    </ScrollReveal>
  )
}
