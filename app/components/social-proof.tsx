"use client";

import { useAnimate } from "./use-animate";

const logos = [
  "Glow Aesthetics",
  "Premier Dental",
  "Summit Real Estate",
  "Luxe MedSpa",
  "Bright Smile Dental",
  "Apex Properties",
  "Elite Chiropractic",
  "Prestige Auto Group",
];

export default function SocialProof() {
  const { ref, visible } = useAnimate();

  return (
    <section
      ref={ref}
      className={`py-12 border-y border-border reveal ${visible ? "visible" : ""}`}
    >
      <div className="max-w-[1080px] mx-auto px-6">
        <p className="text-center text-xs text-body/60 uppercase tracking-[0.2em] mb-8 font-normal">
          Trusted by high-growth practices across the country
        </p>
        <div className="overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />
          <div className="flex items-center gap-16 animate-marquee whitespace-nowrap">
            {[...logos, ...logos].map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="text-base font-light text-heading/20 tracking-wider shrink-0"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
