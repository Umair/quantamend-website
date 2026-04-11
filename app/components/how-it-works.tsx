"use client";

import { Link2, Rocket, BarChart3 } from "lucide-react";
import { useAnimate } from "./use-animate";

const steps = [
  {
    icon: Link2,
    number: "1",
    title: "Connect",
    description:
      "We integrate with your CRM, calendar, and phone system. No migration, no disruption. 48-hour setup.",
    highlight: "48-hour setup",
  },
  {
    icon: Rocket,
    number: "2",
    title: "Activate",
    description:
      "Your AI systems go live. Dead leads get reactivated, calls get answered, inquiries get translated — all automatically.",
    highlight: "Fully automated",
  },
  {
    icon: BarChart3,
    number: "3",
    title: "Scale",
    description:
      "Review real-time dashboards. See booked appointments, recovered revenue, and call analytics. Then decide which systems to expand.",
    highlight: "ROI in 14 days",
  },
];

export default function HowItWorks() {
  const { ref: headerRef, visible: headerVisible } = useAnimate();
  const { ref: gridRef, visible: gridVisible } = useAnimate();

  return (
    <section id="how-it-works" className="py-24 lg:py-32 px-6">
      <div className="max-w-[1080px] mx-auto">
        <div
          ref={headerRef}
          className={`text-center mb-16 reveal ${headerVisible ? "visible" : ""}`}
        >
          <p className="section-label mb-4">How It Works</p>
          <h2 className="display-large mb-6">
            Live in 48 Hours.
            <br className="hidden sm:block" />
            ROI in 14 Days.
          </h2>
        </div>

        <div
          ref={gridRef}
          className="grid md:grid-cols-3 gap-8 stagger-children"
        >
          {steps.map((step, i) => (
            <div
              key={step.title}
              className={`relative reveal ${gridVisible ? "visible" : ""}`}
            >
              {/* Connector line between circles (desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-[19px] left-[52px] right-[-20px] h-px z-0">
                  <div className="h-full border-t-2 border-dashed border-purple/20" />
                </div>
              )}

              <div className="flex flex-col">
                <div className="flex items-center gap-4 mb-5">
                  <div className="step-number">{step.number}</div>
                  <h3 className="sub-heading-lg">{step.title}</h3>
                </div>
                <p className="text-body text-[15px] leading-relaxed mb-4 pl-14">
                  {step.description}
                </p>
                <div className="pl-14">
                  <span className="badge-purple text-[11px]">
                    {step.highlight}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
