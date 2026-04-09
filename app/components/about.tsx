"use client";

import {
  Clock,
  Globe,
  Users,
  Target,
  Code2,
  BarChart3,
} from "lucide-react";
import { useAnimate } from "./use-animate";

const highlights = [
  { icon: Clock, label: "3x Faster Delivery", color: "text-violet-400", bg: "bg-violet-500/10" },
  { icon: Globe, label: "Global-Scale Systems", color: "text-cyan-400", bg: "bg-cyan-500/10" },
  { icon: Users, label: "Cross-Functional Teams", color: "text-blue-400", bg: "bg-blue-500/10" },
  { icon: Target, label: "Outcome-Driven", color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { icon: Code2, label: "Clean Architecture", color: "text-amber-400", bg: "bg-amber-500/10" },
  { icon: BarChart3, label: "Data-Informed", color: "text-rose-400", bg: "bg-rose-500/10" },
];

export default function About() {
  const { ref: leftRef, visible: leftVisible } = useAnimate();
  const { ref: rightRef, visible: rightVisible } = useAnimate();

  return (
    <section id="about" className="relative py-32 px-6 section-glow-top">
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left column — text */}
          <div
            ref={leftRef}
            className={`animate-left ${leftVisible ? "visible" : ""}`}
          >
            <p className="text-accent-light text-sm font-medium uppercase tracking-[0.2em] mb-4">
              About QuantaMend
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
              Engineering That{" "}
              <span className="gradient-text">Adapts</span>
            </h2>
            <div className="space-y-4 mb-10">
              <p className="text-muted leading-relaxed text-lg">
                QuantaMend is an agile software development and digital growth
                agency. We specialize in AI-driven automation, robust backend
                engineering, and high-conversion digital marketing.
              </p>
              <p className="text-muted leading-relaxed">
                We build dynamic tech architectures that adapt to the fast-paced
                demands of modern startups and established enterprises. Our teams
                embed directly into your workflow — shipping features, not slide
                decks.
              </p>
            </div>
            <a
              href="#booking"
              className="btn-primary inline-flex px-8 py-3.5 text-base"
            >
              <span>Work With Us</span>
            </a>
          </div>

          {/* Right column — capability grid */}
          <div
            ref={rightRef}
            className="grid grid-cols-2 sm:grid-cols-3 gap-4 stagger"
          >
            {highlights.map((item) => (
              <div
                key={item.label}
                className={`flex flex-col items-center text-center p-6 rounded-2xl glass card-hover gradient-border animate-up ${rightVisible ? "visible" : ""}`}
              >
                <div className="relative">
                  <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center mb-4`}>
                    <item.icon size={26} className={item.color} />
                  </div>
                </div>
                <span className="text-xs font-medium text-muted leading-tight">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
