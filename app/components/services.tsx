"use client";

import {
  Brain,
  Server,
  TrendingUp,
  Layers,
  Shield,
  Zap,
  Smartphone,
  Palette,
  Cloud,
} from "lucide-react";
import { useAnimate } from "./use-animate";

const services = [
  {
    icon: Brain,
    title: "Generative AI",
    description:
      "Custom LLM integrations, intelligent automation pipelines, and AI-powered products that give you a competitive edge.",
    gradient: "from-cyan/20 to-blue-500/20",
    iconColor: "text-cyan",
  },
  {
    icon: Layers,
    title: "Custom Software",
    description:
      "End-to-end product builds with modern frameworks — from architecture to production deployment.",
    gradient: "from-violet/20 to-purple-500/20",
    iconColor: "text-violet",
  },
  {
    icon: Server,
    title: "Backend Engineering",
    description:
      "Scalable microservices, event-driven architectures, and real-time data pipelines built for millions of users.",
    gradient: "from-emerald-500/20 to-cyan/20",
    iconColor: "text-emerald-400",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description:
      "Native and cross-platform mobile apps with polished UX, built for iOS and Android at scale.",
    gradient: "from-orange-500/20 to-amber-500/20",
    iconColor: "text-orange-400",
  },
  {
    icon: TrendingUp,
    title: "Digital Growth",
    description:
      "High-conversion landing pages, SEO-first content systems, and analytics dashboards that drive measurable ROI.",
    gradient: "from-pink-500/20 to-rose-500/20",
    iconColor: "text-pink-400",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "User-centered design systems, interactive prototypes, and interfaces that delight users and convert.",
    gradient: "from-indigo-500/20 to-violet/20",
    iconColor: "text-indigo-400",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description:
      "CI/CD pipelines, infrastructure automation, cloud migration, and Kubernetes orchestration at scale.",
    gradient: "from-sky-500/20 to-cyan/20",
    iconColor: "text-sky-400",
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description:
      "SOC 2 readiness, penetration testing, secure-by-design architectures, and zero-trust infrastructure.",
    gradient: "from-red-500/20 to-orange-500/20",
    iconColor: "text-red-400",
  },
  {
    icon: Zap,
    title: "Rapid Prototyping",
    description:
      "MVP in 2 weeks. We validate ideas fast with functional prototypes, user testing, and iterative sprints.",
    gradient: "from-yellow-500/20 to-amber-500/20",
    iconColor: "text-yellow-400",
  },
];

export default function Services() {
  const { ref: headerRef, visible: headerVisible } = useAnimate();
  const { ref: gridRef, visible: gridVisible } = useAnimate();

  return (
    <section id="services" className="relative py-28 lg:py-36 px-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="glow-orb w-[500px] h-[500px] bg-violet/[0.04] top-0 right-[-100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div
          ref={headerRef}
          className={`mb-20 reveal ${headerVisible ? "visible" : ""}`}
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <p className="text-cyan text-sm font-semibold uppercase tracking-[0.2em] mb-4">
                Our Services
              </p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                Transform Your{" "}
                <span className="gradient-text-static">Business</span>
              </h2>
            </div>
            <p className="text-secondary max-w-md text-lg leading-relaxed">
              From AI automation to full-stack development — we deliver the
              complete spectrum of technical excellence.
            </p>
          </div>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children"
        >
          {services.map((service) => (
            <div
              key={service.title}
              className={`glass-card gradient-border-card p-8 group reveal ${
                gridVisible ? "visible" : ""
              }`}
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <service.icon size={26} className={service.iconColor} />
              </div>
              <h3 className="text-lg font-semibold mb-3 group-hover:text-cyan transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-secondary text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
