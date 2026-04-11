"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useAnimate } from "./use-animate";

const capabilities = [
  "Custom CRM & API Integration Engineering",
  "Production-Grade NLP & Conversational AI",
  "Enterprise Telephony & Voice Pipeline Architecture",
  "Real-Time Analytics & Reporting Dashboards",
  "HIPAA-Compliant Data Handling",
  "99.9% Uptime SLA",
];

export default function About() {
  const { ref: leftRef, visible: leftVisible } = useAnimate();
  const { ref: rightRef, visible: rightVisible } = useAnimate();

  return (
    <section id="about" className="py-24 lg:py-32 px-6">
      <div className="max-w-[1080px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Text */}
          <div
            ref={leftRef}
            className={`reveal-left ${leftVisible ? "visible" : ""}`}
          >
            <p className="section-label mb-4">Why QuantaMend</p>
            <h2 className="display-large mb-6">
              AI Systems Built on
              <br className="hidden sm:block" />
              Enterprise-Grade
              <br className="hidden sm:block" />
              Infrastructure
            </h2>
            <p className="body-large mb-5">
              QuantaMend isn&apos;t a prompt wrapper. We&apos;re a full-stack
              engineering team that builds custom AI integrations from the ground
              up — CRM connectors, telephony pipelines, NLP engines, and
              scheduling APIs.
            </p>
            <p className="text-body leading-relaxed mb-8">
              Our background in web development, backend engineering, and cloud
              infrastructure is the reason our AI systems actually work in
              production — at scale, around the clock, without breaking.
            </p>

            <a
              href="#cta"
              className="inline-flex items-center gap-2 text-purple font-normal group hover:gap-3 transition-all"
            >
              See it in action
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
          </div>

          {/* Right: Capability list */}
          <div
            ref={rightRef}
            className={`reveal-right ${rightVisible ? "visible" : ""}`}
          >
            <div className="card-elevated p-8">
              <h3 className="sub-heading mb-6">
                The Infrastructure Behind Our AI
              </h3>
              <ul className="space-y-4">
                {capabilities.map((cap) => (
                  <li key={cap} className="flex items-start gap-3">
                    <CheckCircle2
                      size={18}
                      className="text-success shrink-0 mt-0.5"
                    />
                    <span className="text-label text-[15px]">{cap}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex items-center gap-8">
                  <div>
                    <div className="text-2xl font-light text-heading tracking-tight">
                      50+
                    </div>
                    <div className="text-xs text-body">Systems Deployed</div>
                  </div>
                  <div className="w-px h-10 bg-border" />
                  <div>
                    <div className="text-2xl font-light text-heading tracking-tight">
                      99.9%
                    </div>
                    <div className="text-xs text-body">Uptime SLA</div>
                  </div>
                  <div className="w-px h-10 bg-border" />
                  <div>
                    <div className="text-2xl font-light text-heading tracking-tight">
                      24/7
                    </div>
                    <div className="text-xs text-body">Monitoring</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
