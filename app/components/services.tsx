"use client";

import {
  Brain,
  Server,
  TrendingUp,
  Layers,
  Shield,
  Zap,
} from "lucide-react";
import { useAnimate } from "./use-animate";

const services = [
  {
    icon: Brain,
    title: "AI Automation",
    description:
      "Custom ML pipelines, intelligent process automation, and LLM integrations that cut manual work by 80%.",
  },
  {
    icon: Server,
    title: "Backend Engineering",
    description:
      "Scalable microservices, event-driven architectures, and real-time data pipelines built for millions of users.",
  },
  {
    icon: TrendingUp,
    title: "Digital Growth",
    description:
      "High-conversion landing pages, SEO-first content systems, and analytics dashboards that drive measurable ROI.",
  },
  {
    icon: Layers,
    title: "Full-Stack Development",
    description:
      "End-to-end product builds with modern frameworks. From React/Next.js frontends to Go/Node backends.",
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    description:
      "SOC 2 readiness, penetration testing, secure-by-design architectures, and zero-trust infrastructure.",
  },
  {
    icon: Zap,
    title: "Rapid Prototyping",
    description:
      "MVP in 2 weeks. We validate ideas fast with functional prototypes, user testing, and iterative sprints.",
  },
];

export default function Services() {
  const { ref: headerRef, visible: headerVisible } = useAnimate();
  const { ref: gridRef, visible: gridVisible } = useAnimate();

  return (
    <section id="services" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div
          ref={headerRef}
          className={`text-center mb-16 animate-up ${headerVisible ? "visible" : ""}`}
        >
          <p className="text-accent-light text-sm font-medium uppercase tracking-widest mb-3">
            What We Do
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Services Built for{" "}
            <span className="gradient-text">Modern Teams</span>
          </h2>
        </div>

        <div
          ref={gridRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger`}
        >
          {services.map((service) => (
            <div
              key={service.title}
              className={`group relative p-8 rounded-2xl bg-surface border border-border hover:border-accent/30 transition-all duration-300 glow-border animate-up ${gridVisible ? "visible" : ""}`}
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                <service.icon size={24} className="text-accent-light" />
              </div>
              <h3 className="text-lg font-semibold mb-3">{service.title}</h3>
              <p className="text-muted text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
