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
    color: "from-cyan to-blue-400",
    iconColor: "text-cyan",
  },
  {
    icon: PenTool,
    number: "02",
    title: "Architecture & Design",
    description:
      "System design, tech stack selection, API contracts, and UI/UX wireframes. We plan for scale on day one — not as an afterthought.",
    color: "from-violet to-purple-400",
    iconColor: "text-violet",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Sprint Execution",
    description:
      "Two-week sprints with daily standups. You see working software every cycle. No surprises, just momentum and measurable progress.",
    color: "from-emerald-400 to-cyan",
    iconColor: "text-emerald-400",
  },
  {
    icon: BarChart3,
    number: "04",
    title: "Launch & Iterate",
    description:
      "Production deployment, monitoring, and continuous improvement. We measure, learn, and optimize relentlessly post-launch.",
    color: "from-orange-400 to-amber-400",
    iconColor: "text-orange-400",
  },
];

export default function Process() {
  const { ref: headerRef, visible: headerVisible } = useAnimate();
  const { ref: gridRef, visible: gridVisible } = useAnimate();

  return (
    <section id="process" className="relative py-28 lg:py-36 px-6 section-alt">
      <div className="max-w-7xl mx-auto">
        <div
          ref={headerRef}
          className={`text-center mb-20 reveal ${headerVisible ? "visible" : ""}`}
        >
          <p className="text-cyan text-sm font-semibold uppercase tracking-[0.2em] mb-4">
            How We Work
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            From Concept to{" "}
            <span className="gradient-text-static">Completion</span>
          </h2>
          <p className="text-secondary max-w-2xl mx-auto text-lg">
            A battle-tested four-phase process that turns vision into
            production-ready software.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children"
        >
          {steps.map((step, i) => (
            <div
              key={step.title}
              className={`relative reveal ${gridVisible ? "visible" : ""}`}
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[calc(100%+2px)] w-[calc(100%-72px)] h-px">
                  <div className={`h-full bg-gradient-to-r ${step.color} opacity-20`} />
                </div>
              )}

              <div className="glass-card p-8 h-full relative z-10 group">
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} bg-opacity-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    style={{ background: `linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(139, 92, 246, 0.1))` }}
                  >
                    <step.icon size={24} className={step.iconColor} />
                  </div>
                  <span className="text-4xl font-bold text-white/[0.04] font-mono">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-3 group-hover:text-cyan transition-colors">
                  {step.title}
                </h3>
                <p className="text-secondary text-sm leading-relaxed">
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
