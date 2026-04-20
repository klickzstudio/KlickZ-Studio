import { Metadata } from 'next'
import { FaqAccordion } from '@/components/ui/FaqAccordion'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | KLICKZSTUDIO',
  description: 'Easily find solutions and answers to all your wedding photography, pricing, booking, and coverage queries.',
}

const faqData = [
  {
    name: "Photography",
    description: "Find answers to frequently asked questions about our photography techniques, equipment, and traditional vs candid approaches.",
    items: [
      {
        question: "What is Candid Wedding Photography?",
        answer: [
          "Candid Wedding Photography captures genuine and spontaneous moments filled with artistic flair. At KLICKZSTUDIO, we excel in capturing the essence of your special day through candid shots that evoke emotions and tell your unique story.",
          "Our skilled photographers expertly roll their lenses, creating art that brings your wedding moments to life. With a blend of artistry, passion, and sincerity, we give utmost importance to each moment, ensuring your wedding receives the attention it deserves."
        ]
      },
      {
        question: "What is the difference between CANDID and TRADITIONAL Wedding photography?",
        answer: [
          "CANDID PHOTOGRAPHY: Capture your wedding as it unfolds naturally. No forced poses or interruptions; we discreetly document genuine emotions and events from behind the scenes, capturing your best expressions without you even realizing.",
          "TRADITIONAL PHOTOGRAPHY: Traditional Photography offers a different approach. Poses, smiles, and expressions are artfully captured, ensuring every moment is staged to perfection. The sequence of events, gift exchanges, and posed group photos are key elements."
        ]
      },
      {
        question: "What is Wedding Film? Wedding Cinematography? Wedding Highlights?",
        answer: [
          "A wedding is like a timeless movie, where beautiful elements come together to create a captivating story. Our Wedding Films are a fusion of Candid/Artistic Photography and cinematic storytelling.",
          "Through coordinated angles and technical expertise, we create cinematic shots using wide-angle, telephoto, macro, and creative techniques. With smooth shooting, low light mastery, and expert editing, we deliver a visually stunning masterpiece."
        ]
      },
      {
        question: "How familiar is your team with religious rituals?",
        answer: [
          "Our team is highly experienced and well-versed in various religious rituals. Whether it's a traditional Tamil Brahmin Wedding, a Christian Kerala wedding, or a North Indian Marwari celebration, we are dedicated to doing justice to every aspect.",
          "We extensively research and familiarize ourselves with the important functions and customs associated with each style of wedding. When approached for a completely new culture, we take the time to sit down with the family and gain a deep understanding of each ritual."
        ]
      },
      {
        question: "Do you pitch in to help us with ideas on our Wedding / Reception / Sangeet Stage design?",
        answer: [
          "Absolutely! We would be thrilled to assist you with ideas for your Wedding, Reception, or Sangeet Stage design.",
          "Stage backgrounds hold significant importance in photography and videography. The right background color and ambient lighting can greatly enhance the quality of our output by ensuring perfect color and contrasts."
        ]
      }
    ]
  },
  {
    name: "Pricing",
    description: "Discover answers to commonly asked questions about our photography packages, pricing structure, and terms.",
    items: [
      {
        question: "How much do you charge?",
        answer: [
          "The pricing for our services varies depending on your specific requirements. As each wedding is unique, we cannot provide an exact figure without discussing your needs in detail.",
          "However, we offer a range of packages starting from our basic, elite, and signature packages, which include coverage of multiple events in the Candid/Artistic Photography style. Please contact us for a personalized quote."
        ]
      },
      {
        question: "Is the price Negotiable? Do we get a discount?",
        answer: [
          "We take pride in providing services that are worth every penny. While we can create custom packages based on your budget, we do not engage in discount negotiations.",
          "We believe in working together with our clients to deliver exceptional results, and fair compensation is an important aspect of that. We focus on creating a memorable and rewarding experience for your wedding."
        ]
      },
      {
        question: "What does the Basic Package include?",
        answer: [
          "Our Basic package covers the fundamental aspects of your wedding day. It typically includes: 1 Artistic / Candid Photographer, 1 Traditional Photographer, 1 Traditional Videographer.",
          "It also includes 2 - 5 Hours of Pre or Post Wedding Shoots, post-processing of selected images, classic albums, online gallery for convenient viewing, and full-length traditional edited videos."
        ]
      },
      {
        question: "What about advance booking payment?",
        answer: [
          "To reserve and secure our availability for your desired dates, we kindly request a 50% advance payment. This advance payment serves as a booking confirmation and ensures that the specified dates are exclusively blocked for your event."
        ]
      },
      {
        question: "When is the right time to make Travel & Accommodation Charges?",
        answer: [
          "To ensure a smooth and hassle-free experience, we kindly request that travel and accommodation charges be settled upfront. This helps us avoid any last-minute complications, allowing us to focus solely on capturing the special moments."
        ]
      }
    ]
  },
  {
    name: "Booking",
    description: "Learn how to secure dates, schedule sessions, and handle availability.",
    items: [
      {
        question: "How many months in advance do we book/get in touch with you?",
        answer: [
          "We recommend getting in touch with us at least 6 months in advance of your wedding. This allows us to properly plan and discuss the shooting plans, pre-wedding locations, and overall direction.",
          "As we receive a high volume of bookings, contacting us early ensures better availability. However, if your wedding is only a month away, please don't hesitate to reach out. We will do our best to accommodate your request."
        ]
      },
      {
        question: "Can we meet in person before going ahead with the booking?",
        answer: [
          "We highly value the opportunity to meet you in person and gain a deeper understanding of your specific requirements. However, if an in-person meeting is not feasible, we are more than happy to schedule an online appointment."
        ]
      },
      {
        question: "Are you flexible with the timings mentioned in the quote?",
        answer: [
          "While we strive to accommodate flexible timings, we can only offer a limited flexibility of ±1 hour. If the shoot timings exceed the agreed-upon duration, additional charges will apply for the extra hours. Please note that a late start does not automatically result in a later ending."
        ]
      }
    ]
  },
  {
    name: "Deliverables",
    description: "Details regarding timeframe, albums, raw files, and deliverables processing.",
    items: [
      {
        question: "How will be the Album / Photo-book designed?",
        answer: [
          "Our album and photo-book designs are created with a focus on neatness, cleanliness, simplicity, and elegance. Our dedicated design team ensures that the layout showcases your photographs in the best possible way.",
          "We believe in maintaining the authenticity of the captured moments and do not manipulate or cut your images into unrelated backdrops. We let the beauty of the actual moments shine through."
        ]
      },
      {
        question: "Can I get RAW footages & Photos of my Wedding?",
        answer: [
          "Certainly! We understand the value of having the RAW footage and photos of your Event. Upon request, we can provide you with all the RAW pictures and footage from your special day.",
          "Please note that the Hard Drive for storing the RAW files is not included in the package. However, we will be happy to copy the RAW files for you once the final payment is settled."
        ]
      },
      {
        question: "Will you prefer a single point of contact for final deliverables?",
        answer: [
          "We highly recommend having a single point of contact for the final deliverables. Managing multiple points of contact can complicate the process of selecting pictures, designing layouts, and choosing album styles.",
          "By having a single point of contact, we ensure a more efficient workflow and deliver a high-quality final output."
        ]
      }
    ]
  }
]

export default function FAQPage() {
  return (
    <main className="bg-[#F8F4EE] min-h-screen pt-32 pb-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        
        {/* Header section */}
        <div className="text-center mb-16 md:mb-24">
          <span className="font-lato text-[11px] uppercase tracking-[0.4em] text-[#C9A96E] mb-4 block">
            Support center
          </span>
          <h1 className="font-cormorant text-5xl md:text-6xl text-[#2B2420] mb-6">
            Frequently Asked <span className="italic text-[#C9A96E]">Questions</span>
          </h1>
          <p className="font-lato text-sm text-[#555555] max-w-2xl mx-auto leading-relaxed">
            A fully fledged support page to help you find solutions. It is important to remember that every problem has a solution, you just need to start working to find an answer.
          </p>
        </div>

        {/* Interactive Accordion */}
        <FaqAccordion categories={faqData} />

      </div>
    </main>
  )
}
