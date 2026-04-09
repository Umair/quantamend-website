"use client";

import { Quote } from "lucide-react";
import { useAnimate } from "./use-animate";

const testimonials = [
  {
    quote:
      "QuantaMend rebuilt our entire data pipeline in 6 weeks. We went from daily crashes to 99.99% uptime. Exceptional engineering team.",
    author: "Sarah Chen",
    role: "CTO",
    company: "NovaPay",
    avatar: "SC",
  },
  {
    quote:
      "They shipped our MVP in 12 days. Our investors were blown away by the quality. Best agency investment we've ever made.",
    author: "Marcus Rivera",
    role: "Founder",
    company: "CloudBase",
    avatar: "MR",
  },
  {
    quote:
      "The AI automation they built saves us 200+ hours per month. Their engineering quality and communication are absolutely top-tier.",
    author: "Priya Sharma",
    role: "VP Engineering",
    company: "Synthex",
    avatar: "PS",
  },
];

const logos = [
  "TechFlow",
  "NovaPay",
  "CloudBase",
  "Synthex",
  "ArcLab",
  "Meridian",
  "VertexAI",
  "DataPulse",
];

export default function Testimonials() {
  const { ref: headerRef, visible: headerVisible } = useAnimate();
  const { ref: cardsRef, visible: cardsVisible } = useAnimate();
  const { ref: logosRef, visible: logosVisible } = useAnimate();

  return (
    <section id="testimonials" className="relative py-28 lg:py-36 px-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="glow-orb w-[500px] h-[500px] bg-violet/[0.05] bottom-0 right-[-100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 reveal ${headerVisible ? "visible" : ""}`}
        >
          <p className="text-cyan text-sm font-semibold uppercase tracking-[0.2em] mb-4">
            Client Stories
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            What Our Clients{" "}
            <span className="gradient-text-static">Say</span>
          </h2>
          <p className="text-secondary max-w-2xl mx-auto text-lg">
            Don&apos;t take our word for it — hear from the teams we&apos;ve
            helped scale.
          </p>
        </div>

        {/* Testimonial cards */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-6 stagger-children mb-20"
        >
          {testimonials.map((item) => (
            <div
              key={item.author}
              className={`glass-card gradient-border-card p-8 flex flex-col reveal ${
                cardsVisible ? "visible" : ""
              }`}
            >
              <div className="flex items-center gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-amber-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <Quote size={24} className="text-cyan/20 mb-4 shrink-0" />
              <p className="text-foreground/85 leading-relaxed mb-8 flex-1 text-[15px]">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-6 border-t border-border">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-cyan/30 to-violet/30 flex items-center justify-center text-sm font-bold text-cyan/90 ring-1 ring-white/10">
                  {item.avatar}
                </div>
                <div>
                  <div className="font-semibold text-sm">{item.author}</div>
                  <div className="text-xs text-muted">
                    {item.role}, {item.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Client logos marquee */}
        <div
          ref={logosRef}
          className={`reveal ${logosVisible ? "visible" : ""}`}
        >
          <p className="text-center text-xs text-muted/40 uppercase tracking-[0.25em] mb-8 font-medium">
            Trusted by innovative teams worldwide
          </p>
          <div className="overflow-hidden relative">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-bg to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-bg to-transparent z-10" />
            <div className="flex items-center gap-16 animate-marquee whitespace-nowrap">
              {[...logos, ...logos].map((name, i) => (
                <span
                  key={`${name}-${i}`}
                  className="text-lg font-semibold text-muted/20 tracking-wider shrink-0"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
