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
  { icon: Clock, label: "3x Faster Delivery" },
  { icon: Globe, label: "Global-Scale Systems" },
  { icon: Users, label: "Cross-Functional Teams" },
  { icon: Target, label: "Outcome-Driven" },
  { icon: Code2, label: "Clean Architecture" },
  { icon: BarChart3, label: "Data-Informed" },
];

export default function About() {
  const { ref: leftRef, visible: leftVisible } = useAnimate();
  const { ref: rightRef, visible: rightVisible } = useAnimate();

  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div
            ref={leftRef}
            className={`animate-left ${leftVisible ? "visible" : ""}`}
          >
            <p className="text-accent-light text-sm font-medium uppercase tracking-widest mb-3">
              About MorphicStack
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Engineering That{" "}
              <span className="gradient-text">Adapts</span>
            </h2>
            <p className="text-muted leading-relaxed mb-4">
              MorphicStack is an agile software development and digital growth
              agency. We specialize in AI-driven automation, robust backend
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
              className="inline-flex px-6 py-3 bg-accent hover:bg-accent-light text-white font-medium rounded-full transition-all duration-200"
            >
              Work With Us
            </a>
          </div>

          <div
            ref={rightRef}
            className={`grid grid-cols-2 sm:grid-cols-3 gap-4 stagger`}
          >
            {highlights.map((item) => (
              <div
                key={item.label}
                className={`flex flex-col items-center text-center p-5 rounded-2xl bg-surface border border-border hover:border-accent/20 transition-all animate-up ${rightVisible ? "visible" : ""}`}
              >
                <item.icon size={28} className="text-accent-light mb-3" />
                <span className="text-xs font-medium text-muted">
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
