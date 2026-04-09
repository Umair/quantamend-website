"use client";

import {
  Building2,
  ShoppingCart,
  HeartPulse,
  Landmark,
  Plane,
  Cpu,
  Gamepad2,
  Radio,
} from "lucide-react";
import { useAnimate } from "./use-animate";

const industries = [
  { icon: Landmark, name: "Banking & Fintech" },
  { icon: HeartPulse, name: "Healthcare" },
  { icon: ShoppingCart, name: "E-commerce & Retail" },
  { icon: Plane, name: "Travel & Hospitality" },
  { icon: Building2, name: "Public Sector" },
  { icon: Cpu, name: "SaaS & Startups" },
  { icon: Gamepad2, name: "Gaming" },
  { icon: Radio, name: "Telecom" },
];

export default function Industries() {
  const { ref: headerRef, visible: headerVisible } = useAnimate();
  const { ref: gridRef, visible: gridVisible } = useAnimate();

  return (
    <section id="industries" className="py-24 lg:py-32 px-6 section-dark">
      <div className="max-w-7xl mx-auto">
        <div
          ref={headerRef}
          className={`text-center mb-16 animate-up ${headerVisible ? "visible" : ""}`}
        >
          <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-3">
            Industries
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-5">
            Discover Our Impact Across Industries
          </h2>
          <p className="text-muted max-w-2xl mx-auto text-lg">
            We bring deep domain expertise across sectors, delivering tailored solutions
            that address unique industry challenges.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 stagger"
        >
          {industries.map((industry) => (
            <div
              key={industry.name}
              className={`card-flat group p-6 text-center cursor-default animate-up ${gridVisible ? "visible" : ""}`}
            >
              <div className="w-14 h-14 rounded-2xl bg-accent/8 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/15 transition-colors">
                <industry.icon size={26} className="text-accent/70 group-hover:text-accent transition-colors" />
              </div>
              <h3 className="text-sm font-semibold text-foreground/80 group-hover:text-foreground transition-colors">
                {industry.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
