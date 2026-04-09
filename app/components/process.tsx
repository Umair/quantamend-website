"use client";

import { Search, PenTool, Rocket, BarChart3 } from "lucide-react";
import { useAnimate } from "./use-animate";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Discovery",
    description:
      "We map your goals, constraints, and existing systems. Deep-dive workshops, user research, and competitive analysis.",
  },
  {
    icon: PenTool,
    number: "02",
    title: "Architecture",
    description:
      "System design, tech stack selection, and API contracts. We plan for scale on day one — not as an afterthought.",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Sprint Execution",
    description:
      "Two-week sprints with daily standups. You see working software every cycle. No surprises, just momentum.",
  },
  {
    icon: BarChart3,
    number: "04",
    title: "Launch & Iterate",
    description:
      "Production deployment, monitoring, and continuous improvement. We measure, learn, and optimize relentlessly.",
  },
];

export default function Process() {
  const { ref: headerRef, visible: headerVisible } = useAnimate();
  const { ref: gridRef, visible: gridVisible } = useAnimate();

  return (
    <section id="process" className="py-32 px-6 bg-surface/50">
      <div className="max-w-7xl mx-auto">
        <div
          ref={headerRef}
          className={`text-center mb-16 animate-up ${headerVisible ? "visible" : ""}`}
        >
          <p className="text-accent-light text-sm font-medium uppercase tracking-widest mb-3">
            How We Work
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            From Idea to <span className="gradient-text">Production</span>
          </h2>
        </div>

        <div
          ref={gridRef}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 stagger"
        >
          {steps.map((step, i) => (
            <div
              key={step.title}
              className={`relative animate-up ${gridVisible ? "visible" : ""}`}
            >
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-accent/30 to-transparent z-0" />
              )}
              <div className="relative z-10 p-6 rounded-2xl bg-surface border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <step.icon size={20} className="text-accent-light" />
                  </div>
                  <span className="text-xs font-mono text-accent-light">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
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
