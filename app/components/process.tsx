"use client";

import { Search, PenTool, Rocket, BarChart3 } from "lucide-react";
import { useAnimate } from "./use-animate";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Discovery",
    description:
      "Deep-dive workshops, user research, competitive analysis. We map your goals, constraints, and existing systems before writing a line of code.",
  },
  {
    icon: PenTool,
    number: "02",
    title: "Architecture & Design",
    description:
      "System design, tech stack selection, API contracts, and UI/UX wireframes. We plan for scale on day one — not as an afterthought.",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Sprint Execution",
    description:
      "Two-week sprints with daily standups. You see working software every cycle. No surprises, just momentum and measurable progress.",
  },
  {
    icon: BarChart3,
    number: "04",
    title: "Launch & Iterate",
    description:
      "Production deployment, monitoring, and continuous improvement. We measure, learn, and optimize relentlessly post-launch.",
  },
];

export default function Process() {
  const { ref: headerRef, visible: headerVisible } = useAnimate();
  const { ref: gridRef, visible: gridVisible } = useAnimate();

  return (
    <section id="process" className="py-24 lg:py-32 px-6 section-dark">
      <div className="max-w-7xl mx-auto">
        <div
          ref={headerRef}
          className={`text-center mb-16 animate-up ${headerVisible ? "visible" : ""}`}
        >
          <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-3">
            How We Work
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-5">
            From Concept to Completion
          </h2>
          <p className="text-muted max-w-2xl mx-auto text-lg">
            A battle-tested four-phase process that turns vision into production-ready software.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 stagger"
        >
          {steps.map((step, i) => (
            <div
              key={step.title}
              className={`relative animate-up ${gridVisible ? "visible" : ""}`}
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[calc(100%+1px)] w-[calc(100%-58px)] h-px bg-gradient-to-r from-accent/20 to-transparent z-0" />
              )}

              <div className="card p-7 h-full relative z-10">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <step.icon size={22} className="text-accent" />
                  </div>
                  <span className="text-3xl font-bold text-white/[0.06] font-mono">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2.5">{step.title}</h3>
                <p className="text-muted text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
