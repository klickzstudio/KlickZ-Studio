interface CategoryBadgeProps {
  label: string
}

export function CategoryBadge({ label }: CategoryBadgeProps) {
  return (
    <span className="font-lato text-[11px] uppercase tracking-[0.1em] text-[#C9A96E]">
      {label}
    </span>
  )
}
