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
    gradient: "from-violet-500/20 to-purple-600/20",
    iconBg: "bg-violet-500/10 group-hover:bg-violet-500/20",
    iconColor: "text-violet-400",
  },
  {
    icon: Server,
    title: "Backend Engineering",
    description:
      "Scalable microservices, event-driven architectures, and real-time data pipelines built for millions of users.",
    gradient: "from-blue-500/20 to-indigo-600/20",
    iconBg: "bg-blue-500/10 group-hover:bg-blue-500/20",
    iconColor: "text-blue-400",
  },
  {
    icon: TrendingUp,
    title: "Digital Growth",
    description:
      "High-conversion landing pages, SEO-first content systems, and analytics dashboards that drive measurable ROI.",
    gradient: "from-emerald-500/20 to-teal-600/20",
    iconBg: "bg-emerald-500/10 group-hover:bg-emerald-500/20",
    iconColor: "text-emerald-400",
  },
  {
    icon: Layers,
    title: "Full-Stack Development",
    description:
      "End-to-end product builds with modern frameworks. From React/Next.js frontends to Go/Node backends.",
    gradient: "from-cyan-500/20 to-blue-600/20",
    iconBg: "bg-cyan-500/10 group-hover:bg-cyan-500/20",
    iconColor: "text-cyan-400",
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    description:
      "SOC 2 readiness, penetration testing, secure-by-design architectures, and zero-trust infrastructure.",
    gradient: "from-amber-500/20 to-orange-600/20",
    iconBg: "bg-amber-500/10 group-hover:bg-amber-500/20",
    iconColor: "text-amber-400",
  },
  {
    icon: Zap,
    title: "Rapid Prototyping",
    description:
      "MVP in 2 weeks. We validate ideas fast with functional prototypes, user testing, and iterative sprints.",
    gradient: "from-rose-500/20 to-pink-600/20",
    iconBg: "bg-rose-500/10 group-hover:bg-rose-500/20",
    iconColor: "text-rose-400",
  },
];

export default function Services() {
  const { ref: headerRef, visible: headerVisible } = useAnimate();
  const { ref: gridRef, visible: gridVisible } = useAnimate();

  return (
    <section id="services" className="relative py-32 px-6 section-glow-top">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div
          ref={headerRef}
          className={`text-center mb-20 animate-up ${headerVisible ? "visible" : ""}`}
        >
          <p className="text-accent-light text-sm font-medium uppercase tracking-[0.2em] mb-4">
            What We Do
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Services Built for{" "}
            <span className="gradient-text">Modern Teams</span>
          </h2>
          <p className="text-muted mt-5 max-w-2xl mx-auto text-lg">
            From concept to production — we provide the full spectrum of technical expertise your business needs.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 stagger"
        >
          {services.map((service) => (
            <div
              key={service.title}
              className={`group relative rounded-2xl glass card-hover gradient-border animate-up ${gridVisible ? "visible" : ""}`}
            >
              <div className="relative p-8">
                {/* Card ambient gradient */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.gradient} rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative">
                  <div className={`w-14 h-14 rounded-2xl ${service.iconBg} flex items-center justify-center mb-6 transition-colors duration-300`}>
                    <service.icon size={26} className={service.iconColor} />
                  </div>
                  <h3 className="text-lg font-semibold mb-3 group-hover:text-foreground transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
