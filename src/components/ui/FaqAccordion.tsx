'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FaqItem {
  question: string
  answer: string[]
}

interface FaqAccordionProps {
  categories: {
    name: string
    description: string
    items: FaqItem[]
  }[]
}

export function FaqAccordion({ categories }: FaqAccordionProps) {
  const [openCategory, setOpenCategory] = useState<string | null>(categories[0]?.name || null)
  const [openQuestion, setOpenQuestion] = useState<string | null>(null)

  return (
    <div className="max-w-[1000px] mx-auto w-full">
      <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
        
        {/* Sidebar Navigation */}
        <div className="md:w-1/3 flex-shrink-0">
          <div className="sticky top-32">
            <h3 className="font-lato text-[11px] uppercase tracking-[0.2em] text-[#C9A96E] mb-8">
              Categories
            </h3>
            <ul className="space-y-4">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <button
                    onClick={() => setOpenCategory(cat.name)}
                    className={`font-cormorant text-2xl md:text-3xl transition-colors duration-300 text-left ${
                      openCategory === cat.name ? 'text-[#2B2420]' : 'text-[#888888] hover:text-[#C9A96E]'
                    }`}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Content Area */}
        <div className="md:w-2/3">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className={`${openCategory === cat.name ? 'block' : 'hidden'}`}
            >
              <div className="mb-10">
                <h2 className="font-cormorant text-4xl text-[#2B2420] mb-4">{cat.name}</h2>
                <p className="font-lato text-sm text-[#555555] font-light leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="space-y-4">
                {cat.items.map((item, idx) => {
                  const isOpen = openQuestion === item.question
                  return (
                    <div key={idx} className="border-b border-[#2B2420]/10 pb-4">
                      <button
                        onClick={() => setOpenQuestion(isOpen ? null : item.question)}
                        className="w-full flex justify-between items-center py-4 text-left group"
                      >
                        <span className="font-cormorant text-xl md:text-2xl text-[#2B2420] pr-8 group-hover:text-[#C9A96E] transition-colors">
                          {item.question}
                        </span>
                        <span className="text-[#C9A96E] font-light text-2xl flex-shrink-0 relative w-6 h-6 flex items-center justify-center">
                          <span className={`absolute w-full h-[1px] bg-current transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                          <span className={`absolute w-[1px] h-full bg-current transition-transform duration-300 ${isOpen ? 'rotate-90 scale-0' : ''}`} />
                        </span>
                      </button>
                      
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="pb-6 pt-2 space-y-4 text-[#555555] font-lato text-sm font-light leading-loose">
                              {item.answer.map((para, i) => (
                                <p key={i}>{para}</p>
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
          ))}
        </div>
      </div>
    </div>
  )
}
