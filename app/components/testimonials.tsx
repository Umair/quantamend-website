"use client";

import { useAnimate } from "./use-animate";

const testimonials = [
  {
    quote:
      "QuantaMend reactivated 340 dormant clients in our database. 47 booked Botox appointments in the first two weeks. That's $23,500 in revenue we thought was gone forever.",
    author: "Dr. Lisa Chen",
    role: "Founder",
    company: "Glow Aesthetics MedSpa",
    vertical: "MedSpa",
    avatar: "LC",
  },
  {
    quote:
      "We were missing 40% of after-hours calls. Their AI receptionist now books an average of 12 new patient appointments per week, without adding staff.",
    author: "James Whitfield",
    role: "Practice Manager",
    company: "Premier Dental Group",
    vertical: "Dental",
    avatar: "JW",
  },
  {
    quote:
      "The multilingual concierge opened up an entire client segment we were losing. Spanish-speaking inquiries converted at 3x our previous rate.",
    author: "Maria Santos",
    role: "Managing Broker",
    company: "Summit Real Estate Partners",
    vertical: "Real Estate",
    avatar: "MS",
  },
  {
    quote:
      "Our dead-lead pipeline recovered $41,000 in the first month alone. The AI handled objections better than most of my staff. It's genuinely unbelievable.",
    author: "Dr. Ryan Patel",
    role: "Owner",
    company: "Advanced Chiropractic & Wellness",
    vertical: "Chiropractic",
    avatar: "RP",
  },
  {
    quote:
      "We run a 6-location veterinary group. QuantaMend's voice system handles overflow calls across all locations and books directly into our PMS. Incredible.",
    author: "Sarah Mitchell",
    role: "COO",
    company: "PetCare Veterinary Group",
    vertical: "Veterinary",
    avatar: "SM",
  },
  {
    quote:
      "I was skeptical about the free pilot. Then it booked 19 appointments from leads we hadn't touched in over a year. We signed the contract that afternoon.",
    author: "Anthony Russo",
    role: "Owner",
    company: "Russo Law Group",
    vertical: "Legal",
    avatar: "AR",
  },
];

export default function Testimonials() {
  const { ref: headerRef, visible: headerVisible } = useAnimate();
  const { ref: cardsRef, visible: cardsVisible } = useAnimate();

  return (
    <section id="results" className="py-24 lg:py-32 px-6 bg-[#fafcff]">
      <div className="max-w-[1080px] mx-auto">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 reveal ${headerVisible ? "visible" : ""}`}
        >
          <p className="section-label mb-4">Results</p>
          <h2 className="display-large mb-6">
            Real Revenue. Real Practices.
            <br className="hidden sm:block" />
            Real Results.
          </h2>
          <p className="body-large max-w-2xl mx-auto">
            Don&apos;t take our word for it. Hear from practice owners and
            operators across every vertical.
          </p>
        </div>

        {/* Testimonial grid */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children"
        >
          {testimonials.map((item) => (
            <div
              key={item.author}
              className={`card-elevated p-7 flex flex-col reveal ${
                cardsVisible ? "visible" : ""
              }`}
            >
              {/* Vertical badge */}
              <div className="mb-5">
                <span className="badge-purple text-[10px]">
                  {item.vertical}
                </span>
              </div>

              {/* Quote */}
              <p className="text-heading text-[15px] leading-relaxed mb-6 flex-1">
                &ldquo;{item.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-purple/[0.08] flex items-center justify-center text-xs font-medium text-purple">
                  {item.avatar}
                </div>
                <div>
                  <div className="text-heading text-sm font-medium">
                    {item.author}
                  </div>
                  <div className="text-xs text-body">
                    {item.role}, {item.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
