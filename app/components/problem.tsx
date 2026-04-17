"use client";

import { PhoneOff, DatabaseZap, Users } from "lucide-react";
import { useAnimate } from "./use-animate";

const painPoints = [
  {
    icon: PhoneOff,
    title: "Missed Calls = Missed Revenue",
    description:
      "62% of calls to local businesses go unanswered. Every missed call is a patient choosing your competitor on the next Google result.",
    stat: "62%",
    statLabel: "calls unanswered",
  },
  {
    icon: DatabaseZap,
    title: "Your CRM Is a Graveyard",
    description:
      "Thousands of past clients sitting in your database, untouched. They already trusted you once, but nobody's following up.",
    stat: "2,000+",
    statLabel: "dormant leads avg.",
  },
  {
    icon: Users,
    title: "Staff Can't Scale",
    description:
      "Hiring another receptionist costs $45K/year. They still can't work nights, weekends, or handle 3 languages simultaneously.",
    stat: "$45K",
    statLabel: "per year per hire",
  },
];

export default function Problem() {
  const { ref: headerRef, visible: headerVisible } = useAnimate();
  const { ref: gridRef, visible: gridVisible } = useAnimate();

  return (
    <section className="py-24 lg:py-32 px-6">
      <div className="max-w-[1080px] mx-auto">
        <div
          ref={headerRef}
          className={`text-center mb-16 reveal ${headerVisible ? "visible" : ""}`}
        >
          <p className="section-label mb-4">The $1.8 Trillion Problem</p>
          <h2 className="display-large mb-6">
            You Already Have the Leads.
            <br className="hidden sm:block" />
            They&apos;re Just Sitting There.
          </h2>
          <p className="body-large max-w-2xl mx-auto">
            The average practice has 2,000+ past clients who haven&apos;t returned.
            Your front desk can&apos;t call them all. Your email blasts get ignored.
            And every day they sit dormant, a competitor wins them back.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid md:grid-cols-3 gap-6 stagger-children"
        >
          {painPoints.map((point) => (
            <div
              key={point.title}
              className={`card p-8 reveal ${gridVisible ? "visible" : ""}`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-lg bg-purple/[0.06] flex items-center justify-center">
                  <point.icon size={22} className="text-purple" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-light text-heading tracking-tight">
                    {point.stat}
                  </div>
                  <div className="text-xs text-body">{point.statLabel}</div>
                </div>
              </div>
              <h3 className="sub-heading mb-3">{point.title}</h3>
              <p className="text-body text-[15px] leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
