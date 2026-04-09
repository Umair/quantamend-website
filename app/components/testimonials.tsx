"use client";

import { Quote } from "lucide-react";
import { useAnimate } from "./use-animate";

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "3x", label: "Faster Time-to-Market" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "40+", label: "Engineers On-Demand" },
];

const testimonials = [
  {
    quote:
      "MorphicStack rebuilt our entire data pipeline in 6 weeks. We went from daily crashes to 99.99% uptime. Exceptional team.",
    author: "Sarah Chen",
    role: "CTO, NovaPay",
  },
  {
    quote:
      "They shipped our MVP in 12 days. Our investors were blown away. Best agency investment we've ever made.",
    author: "Marcus Rivera",
    role: "Founder, CloudBase",
  },
  {
    quote:
      "The AI automation they built saves us 200+ hours per month. Their engineering quality is top-tier.",
    author: "Priya Sharma",
    role: "VP Engineering, Synthex",
  },
];

export default function Testimonials() {
  const { ref: statsRef, visible: statsVisible } = useAnimate();
  const { ref: headerRef, visible: headerVisible } = useAnimate();
  const { ref: cardsRef, visible: cardsVisible } = useAnimate();

  return (
    <section id="testimonials" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 stagger"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`text-center p-6 rounded-2xl bg-surface border border-border animate-up ${statsVisible ? "visible" : ""}`}
            >
              <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-muted uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div
          ref={headerRef}
          className={`text-center mb-12 animate-up ${headerVisible ? "visible" : ""}`}
        >
          <p className="text-accent-light text-sm font-medium uppercase tracking-widest mb-3">
            Client Stories
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            What Teams <span className="gradient-text">Say About Us</span>
          </h2>
        </div>

        <div
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-6 stagger"
        >
          {testimonials.map((item) => (
            <div
              key={item.author}
              className={`p-8 rounded-2xl bg-surface border border-border hover:border-accent/20 transition-all animate-up ${cardsVisible ? "visible" : ""}`}
            >
              <Quote size={20} className="text-accent/40 mb-4" />
              <p className="text-sm text-muted leading-relaxed mb-6">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div>
                <div className="font-semibold text-sm">{item.author}</div>
                <div className="text-xs text-muted">{item.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
