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
    description: "Custom LLM integrations, intelligent automation pipelines, and AI-powered products that give you a competitive edge.",
  },
  {
    icon: Layers,
    title: "Custom Software Development",
    description: "End-to-end product builds with modern frameworks — from architecture to production deployment.",
  },
  {
    icon: Server,
    title: "Backend Engineering",
    description: "Scalable microservices, event-driven architectures, and real-time data pipelines built for millions of users.",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile apps with polished UX, built for iOS and Android at scale.",
  },
  {
    icon: TrendingUp,
    title: "Digital Growth & SEO",
    description: "High-conversion landing pages, SEO-first content systems, and analytics dashboards that drive measurable ROI.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "User-centered design systems, interactive prototypes, and interfaces that delight users and convert.",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description: "CI/CD pipelines, infrastructure automation, cloud migration, and Kubernetes orchestration at scale.",
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description: "SOC 2 readiness, penetration testing, secure-by-design architectures, and zero-trust infrastructure.",
  },
  {
    icon: Zap,
    title: "Rapid Prototyping",
    description: "MVP in 2 weeks. We validate ideas fast with functional prototypes, user testing, and iterative sprints.",
  },
];

export default function Services() {
  const { ref: headerRef, visible: headerVisible } = useAnimate();
  const { ref: gridRef, visible: gridVisible } = useAnimate();

  return (
    <section id="services" className="py-24 lg:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div
          ref={headerRef}
          className={`mb-16 animate-up ${headerVisible ? "visible" : ""}`}
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-3">
                Our Services
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
                Transform Your Business
              </h2>
            </div>
            <p className="text-muted max-w-md text-lg leading-relaxed">
              From AI automation to full-stack development — we deliver the complete spectrum of technical excellence.
            </p>
          </div>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 stagger"
        >
          {services.map((service) => (
            <div
              key={service.title}
              className={`card p-7 group animate-up ${gridVisible ? "visible" : ""}`}
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/15 transition-colors">
                <service.icon size={24} className="text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2.5 group-hover:text-accent transition-colors">
                {service.title}
              </h3>
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
