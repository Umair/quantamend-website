"use client";

import { ArrowRight } from "lucide-react";
import { useAnimate } from "./use-animate";

const achievements = [
  { value: "50+", label: "Successful Projects", color: "from-cyan to-blue-400" },
  { value: "12+", label: "Countries Supported", color: "from-violet to-purple-400" },
  { value: "40+", label: "Engineers On-Demand", color: "from-emerald-400 to-cyan" },
  { value: "5+", label: "Years of Experience", color: "from-orange-400 to-amber-400" },
];

const highlights = [
  "AI-first engineering approach",
  "99.9% uptime SLA guarantee",
  "2-week MVP delivery capability",
  "SOC 2 compliant processes",
  "24/7 dedicated support teams",
  "Transparent sprint-based billing",
];

export default function About() {
  const { ref: leftRef, visible: leftVisible } = useAnimate();
  const { ref: rightRef, visible: rightVisible } = useAnimate();

  return (
    <section id="about" className="relative py-28 lg:py-36 px-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="glow-orb w-[600px] h-[600px] bg-cyan/[0.04] top-[20%] left-[-200px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Achievement grid */}
          <div
            ref={leftRef}
            className={`reveal-left ${leftVisible ? "visible" : ""}`}
          >
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((item, i) => (
                <div
                  key={item.label}
                  className={`glass-card p-8 text-center ${
                    i % 2 === 1 ? "lg:translate-y-6" : ""
                  }`}
                >
                  <div
                    className={`text-4xl sm:text-5xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent mb-2`}
                  >
                    {item.value}
                  </div>
                  <div className="text-sm text-secondary font-medium">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Text */}
          <div
            ref={rightRef}
            className={`reveal-right ${rightVisible ? "visible" : ""}`}
          >
            <p className="text-cyan text-sm font-semibold uppercase tracking-[0.2em] mb-4">
              About QuantaMend
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 leading-[1.1]">
              Pioneering Trust{" "}
              <span className="gradient-text-static">& Innovation</span>
            </h2>
            <p className="text-secondary leading-relaxed mb-5 text-lg">
              QuantaMend is a premium software development and digital growth
              agency specializing in AI-driven automation, robust backend
              engineering, and high-conversion digital marketing.
            </p>
            <p className="text-muted leading-relaxed mb-8">
              We build dynamic tech architectures that adapt to the fast-paced
              demands of modern startups and established enterprises. Our teams
              embed directly into your workflow — shipping features, not slide
              decks.
            </p>

            {/* Highlights grid */}
            <div className="grid grid-cols-2 gap-3 mb-10">
              {highlights.map((h) => (
                <div key={h} className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan to-violet shrink-0" />
                  <span className="text-sm text-secondary">{h}</span>
                </div>
              ))}
            </div>

            <a
              href="#booking"
              className="inline-flex items-center gap-2 text-cyan font-semibold group hover:gap-3 transition-all text-lg"
            >
              Work With Us
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
