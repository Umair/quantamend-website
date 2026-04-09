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
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    glow: "bg-violet-500/20",
  },
  {
    icon: PenTool,
    number: "02",
    title: "Architecture",
    description:
      "System design, tech stack selection, and API contracts. We plan for scale on day one — not as an afterthought.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    glow: "bg-cyan-500/20",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Sprint Execution",
    description:
      "Two-week sprints with daily standups. You see working software every cycle. No surprises, just momentum.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    glow: "bg-blue-500/20",
  },
  {
    icon: BarChart3,
    number: "04",
    title: "Launch & Iterate",
    description:
      "Production deployment, monitoring, and continuous improvement. We measure, learn, and optimize relentlessly.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    glow: "bg-emerald-500/20",
  },
];

export default function Process() {
  const { ref: headerRef, visible: headerVisible } = useAnimate();
  const { ref: gridRef, visible: gridVisible } = useAnimate();

  return (
    <section id="process" className="relative py-32 px-6 section-glow-top overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div
          ref={headerRef}
          className={`text-center mb-20 animate-up ${headerVisible ? "visible" : ""}`}
        >
          <p className="text-accent-light text-sm font-medium uppercase tracking-[0.2em] mb-4">
            How We Work
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            From Idea to <span className="gradient-text">Production</span>
          </h2>
          <p className="text-muted mt-5 max-w-2xl mx-auto text-lg">
            A battle-tested process that turns your vision into production-ready software.
          </p>
        </div>

        <div
          ref={gridRef}
          className="relative grid md:grid-cols-2 lg:grid-cols-4 gap-6 stagger"
        >
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-[12%] right-[12%] h-px">
            <div className="w-full h-full bg-gradient-to-r from-violet-500/30 via-cyan-500/20 to-emerald-500/30" />
          </div>

          {steps.map((step) => (
            <div
              key={step.title}
              className={`relative animate-up ${gridVisible ? "visible" : ""}`}
            >
              <div className="relative glass rounded-2xl p-7 card-hover gradient-border h-full">
                {/* Step number + icon */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-xl ${step.bg} flex items-center justify-center`}>
                      <step.icon size={22} className={step.color} />
                    </div>
                    {/* Glow dot on connecting line */}
                    <div className={`hidden lg:block absolute -top-[1px] left-1/2 -translate-x-1/2 -translate-y-[calc(100%+20px)] w-3 h-3 rounded-full ${step.glow} ring-2 ring-background`} />
                  </div>
                  <span className="text-xs font-mono text-muted tracking-widest">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
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
