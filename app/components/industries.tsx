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
  { icon: Landmark, name: "Banking & Fintech", color: "text-emerald-400", bg: "from-emerald-500/15 to-cyan/10" },
  { icon: HeartPulse, name: "Healthcare", color: "text-rose-400", bg: "from-rose-500/15 to-pink-500/10" },
  { icon: ShoppingCart, name: "E-commerce & Retail", color: "text-amber-400", bg: "from-amber-500/15 to-orange-500/10" },
  { icon: Plane, name: "Travel & Hospitality", color: "text-sky-400", bg: "from-sky-500/15 to-blue-500/10" },
  { icon: Building2, name: "Public Sector", color: "text-slate-300", bg: "from-slate-400/15 to-gray-500/10" },
  { icon: Cpu, name: "SaaS & Startups", color: "text-violet-light", bg: "from-violet/15 to-purple-500/10" },
  { icon: Gamepad2, name: "Gaming", color: "text-red-400", bg: "from-red-500/15 to-orange-500/10" },
  { icon: Radio, name: "Telecom", color: "text-cyan-light", bg: "from-cyan/15 to-teal-500/10" },
];

export default function Industries() {
  const { ref: headerRef, visible: headerVisible } = useAnimate();
  const { ref: gridRef, visible: gridVisible } = useAnimate();

  return (
    <section id="industries" className="relative py-28 lg:py-36 px-6 section-alt">
      <div className="max-w-7xl mx-auto">
        <div
          ref={headerRef}
          className={`text-center mb-16 reveal ${headerVisible ? "visible" : ""}`}
        >
          <p className="text-cyan text-sm font-semibold uppercase tracking-[0.2em] mb-4">
            Industries
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Discover Our Impact{" "}
            <span className="gradient-text-static">Across Industries</span>
          </h2>
          <p className="text-secondary max-w-2xl mx-auto text-lg">
            Deep domain expertise across sectors, delivering tailored
            solutions that address unique industry challenges.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-5 stagger-children"
        >
          {industries.map((industry) => (
            <div
              key={industry.name}
              className={`glass-card-flat group p-7 text-center cursor-default reveal ${
                gridVisible ? "visible" : ""
              }`}
            >
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${industry.bg} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <industry.icon
                  size={28}
                  className={`${industry.color} opacity-80 group-hover:opacity-100 transition-opacity`}
                />
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
