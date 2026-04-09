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
  },
  {
    quote:
      "They shipped our MVP in 12 days. Our investors were blown away by the quality. Best agency investment we've ever made.",
    author: "Marcus Rivera",
    role: "Founder",
    company: "CloudBase",
  },
  {
    quote:
      "The AI automation they built saves us 200+ hours per month. Their engineering quality and communication are absolutely top-tier.",
    author: "Priya Sharma",
    role: "VP Engineering",
    company: "Synthex",
  },
];

const logos = ["TechFlow", "NovaPay", "CloudBase", "Synthex", "ArcLab", "Meridian"];

export default function Testimonials() {
  const { ref: headerRef, visible: headerVisible } = useAnimate();
  const { ref: cardsRef, visible: cardsVisible } = useAnimate();
  const { ref: logosRef, visible: logosVisible } = useAnimate();

  return (
    <section id="testimonials" className="py-24 lg:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 animate-up ${headerVisible ? "visible" : ""}`}
        >
          <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-3">
            Client Stories
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-5">
            What Our Clients Say
          </h2>
          <p className="text-muted max-w-2xl mx-auto text-lg">
            Don&apos;t take our word for it — hear from the teams we&apos;ve helped scale.
          </p>
        </div>

        {/* Testimonial cards */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-6 stagger mb-20"
        >
          {testimonials.map((item) => (
            <div
              key={item.author}
              className={`card p-8 flex flex-col animate-up ${cardsVisible ? "visible" : ""}`}
            >
              <Quote size={28} className="text-accent/30 mb-5 shrink-0" />
              <p className="text-foreground/85 leading-relaxed mb-8 flex-1">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-6 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/20 to-purple/20 flex items-center justify-center text-sm font-bold text-accent/80">
                  {item.author.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <div className="font-semibold text-sm">{item.author}</div>
                  <div className="text-xs text-muted">{item.role}, {item.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Client logos marquee */}
        <div
          ref={logosRef}
          className={`animate-up ${logosVisible ? "visible" : ""}`}
        >
          <p className="text-center text-xs text-muted/50 uppercase tracking-[0.2em] mb-8 font-medium">
            Trusted by innovative teams worldwide
          </p>
          <div className="overflow-hidden">
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
