"use client";

import { Quote, Star } from "lucide-react";
import { useAnimate } from "./use-animate";

const stats = [
  { value: "50+", label: "Projects Delivered", color: "from-violet-400 to-purple-500" },
  { value: "3x", label: "Faster Time-to-Market", color: "from-cyan-400 to-blue-500" },
  { value: "99.9%", label: "Uptime SLA", color: "from-emerald-400 to-teal-500" },
  { value: "40+", label: "Engineers On-Demand", color: "from-amber-400 to-orange-500" },
];

const testimonials = [
  {
    quote:
      "QuantaMend rebuilt our entire data pipeline in 6 weeks. We went from daily crashes to 99.99% uptime. Exceptional team.",
    author: "Sarah Chen",
    role: "CTO, NovaPay",
    rating: 5,
  },
  {
    quote:
      "They shipped our MVP in 12 days. Our investors were blown away. Best agency investment we've ever made.",
    author: "Marcus Rivera",
    role: "Founder, CloudBase",
    rating: 5,
  },
  {
    quote:
      "The AI automation they built saves us 200+ hours per month. Their engineering quality is top-tier.",
    author: "Priya Sharma",
    role: "VP Engineering, Synthex",
    rating: 5,
  },
];

export default function Testimonials() {
  const { ref: statsRef, visible: statsVisible } = useAnimate();
  const { ref: headerRef, visible: headerVisible } = useAnimate();
  const { ref: cardsRef, visible: cardsVisible } = useAnimate();

  return (
    <section id="testimonials" className="relative py-32 px-6 section-glow-top">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-24 stagger"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`text-center p-8 rounded-2xl glass card-hover gradient-border animate-up ${statsVisible ? "visible" : ""}`}
            >
              <div className={`text-4xl sm:text-5xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </div>
              <div className="text-xs text-muted uppercase tracking-wider font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 animate-up ${headerVisible ? "visible" : ""}`}
        >
          <p className="text-accent-light text-sm font-medium uppercase tracking-[0.2em] mb-4">
            Client Stories
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            What Teams <span className="gradient-text">Say About Us</span>
          </h2>
        </div>

        {/* Testimonial cards */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-6 stagger"
        >
          {testimonials.map((item) => (
            <div
              key={item.author}
              className={`relative glass rounded-2xl card-hover gradient-border animate-up ${cardsVisible ? "visible" : ""}`}
            >
              <div className="p-8">
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <Quote size={24} className="text-accent/20 mb-4" />
                <p className="text-foreground/80 leading-relaxed mb-8">
                  &ldquo;{item.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3">
                  {/* Avatar placeholder */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/30 to-cyan-500/30 flex items-center justify-center text-sm font-semibold text-foreground/70">
                    {item.author.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{item.author}</div>
                    <div className="text-xs text-muted">{item.role}</div>
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
