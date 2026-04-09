"use client";

import { ArrowRight } from "lucide-react";
import { useAnimate } from "./use-animate";

const achievements = [
  { value: "50+", label: "Successful Projects" },
  { value: "12+", label: "Countries Supported" },
  { value: "40+", label: "Engineers On-Demand" },
  { value: "5+", label: "Years of Experience" },
];

export default function About() {
  const { ref: leftRef, visible: leftVisible } = useAnimate();
  const { ref: rightRef, visible: rightVisible } = useAnimate();

  return (
    <section id="about" className="py-24 lg:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left — achievement cards */}
          <div
            ref={leftRef}
            className={`grid grid-cols-2 gap-4 animate-left ${leftVisible ? "visible" : ""}`}
          >
            {achievements.map((item) => (
              <div key={item.label} className="card p-8 text-center">
                <div className="text-4xl sm:text-5xl font-bold text-accent mb-2">
                  {item.value}
                </div>
                <div className="text-sm text-muted font-medium">{item.label}</div>
              </div>
            ))}
          </div>

          {/* Right — text */}
          <div
            ref={rightRef}
            className={`animate-right ${rightVisible ? "visible" : ""}`}
          >
            <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-3">
              About QuantaMend
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 leading-[1.12]">
              Pioneering Trust and{" "}
              <span className="gradient-text-teal">Innovation</span>
            </h2>
            <p className="text-muted leading-relaxed mb-5 text-lg">
              QuantaMend is an agile software development and digital growth
              agency specializing in AI-driven automation, robust backend
              engineering, and high-conversion digital marketing.
            </p>
            <p className="text-muted leading-relaxed mb-8">
              We build dynamic tech architectures that adapt to the fast-paced
              demands of modern startups and established enterprises. Our teams
              embed directly into your workflow — shipping features, not slide
              decks.
            </p>
            <a
              href="#booking"
              className="inline-flex items-center gap-2 text-accent font-semibold group hover:gap-3 transition-all"
            >
              Work With Us
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
