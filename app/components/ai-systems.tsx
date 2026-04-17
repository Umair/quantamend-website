"use client";

import {
  MessageSquare,
  Phone,
  Globe,
  ArrowRight,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { useAnimate } from "./use-animate";

const heroSteps = [
  { step: "Connect", desc: "We integrate with your CRM & calendar in 48 hours" },
  { step: "Identify", desc: "AI scans for leads dormant 90+ days" },
  { step: "Engage", desc: "Personalized SMS sequences deploy automatically" },
  { step: "Convert", desc: "Objection handling + direct calendar booking" },
];

const voiceCapabilities = [
  "Native integration with scheduling platforms",
  "Natural, human-like voice conversations",
  "Intelligent call routing & qualification",
  "After-hours coverage with zero staffing cost",
];

const multilingualCapabilities = [
  "Real-time language detection & translation",
  "Complex service/pricing inquiry handling",
  "Booking flow in 30+ languages",
  "Seamless handoff to bilingual staff when needed",
];

export default function AiSystems() {
  const { ref: headerRef, visible: headerVisible } = useAnimate();
  const { ref: heroRef, visible: heroVisible } = useAnimate();
  const { ref: gridRef, visible: gridVisible } = useAnimate();

  return (
    <section id="systems" className="py-24 lg:py-32 px-6 bg-[#fafcff]">
      <div className="max-w-[1080px] mx-auto">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 reveal ${headerVisible ? "visible" : ""}`}
        >
          <p className="section-label mb-4">Our AI Systems</p>
          <h2 className="display-large mb-6">
            Three Systems. One Outcome:
            <br className="hidden sm:block" />
            More Booked Appointments.
          </h2>
        </div>

        {/* ===== HERO PRODUCT: Dead Lead Pipeline ===== */}
        <div
          ref={heroRef}
          className={`card-featured p-8 sm:p-10 lg:p-12 mb-8 reveal ${heroVisible ? "visible" : ""}`}
        >
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            {/* Left: Content */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-purple/[0.08] flex items-center justify-center">
                  <MessageSquare size={22} className="text-purple" />
                </div>
                <div>
                  <span className="badge-success text-[10px]">
                    <Zap size={10} />
                    HERO SYSTEM
                  </span>
                </div>
              </div>

              <h3 className="text-heading text-2xl sm:text-3xl font-light tracking-tight mb-4" style={{ letterSpacing: "-0.64px" }}>
                The &ldquo;Dead Lead&rdquo; Reactivation Pipeline
              </h3>

              <p className="body-large mb-8">
                A text-based AI agent that plugs into your CRM, identifies dormant
                past clients, initiates personalized SMS conversations, handles
                objections in real-time, and books them directly onto your calendar.
                No human intervention required.
              </p>

              {/* Inline Steps */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {heroSteps.map((item, i) => (
                  <div key={item.step} className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-purple text-white flex items-center justify-center text-xs font-medium shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <div>
                      <div className="text-heading text-sm font-medium">
                        {item.step}
                      </div>
                      <div className="text-body text-sm">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <a href="#cta" className="btn-primary py-3.5 px-8">
                Start Your Free 100-Lead Pilot
                <ArrowRight size={16} />
              </a>
            </div>

            {/* Right: Risk-Reversal Offer */}
            <div className="lg:w-[380px] shrink-0 flex flex-col justify-center">
              <div className="offer-box">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-purple text-white flex items-center justify-center">
                    <Zap size={14} />
                  </div>
                  <span className="text-heading font-medium text-sm">
                    The Free Pilot
                  </span>
                </div>
                <p className="text-heading text-[15px] leading-relaxed mb-4">
                  We run this system on <strong className="font-medium">100 of your dead leads</strong> at
                  absolutely zero cost. If it books paying appointments, you pay
                  the one-time setup fee.
                </p>
                <p className="text-purple font-medium text-[15px]">
                  If it doesn&apos;t? You owe nothing. We eat the cost.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== SECONDARY SYSTEMS ===== */}
        <div
          ref={gridRef}
          className="grid md:grid-cols-2 gap-6 stagger-children"
        >
          {/* Voice Receptionist */}
          <div className={`card-featured p-8 reveal ${gridVisible ? "visible" : ""}`}>
            <div className="w-12 h-12 rounded-lg bg-ruby/[0.08] flex items-center justify-center mb-6">
              <Phone size={22} className="text-ruby" />
            </div>
            <h3 className="sub-heading-lg mb-3">
              24/7 AI Voice Receptionist
            </h3>
            <p className="text-body text-[15px] leading-relaxed mb-6">
              A custom AI voice agent that answers every call, qualifies the
              inquiry, and books directly into your scheduling software. Nights,
              weekends, holidays. Never miss a call again.
            </p>
            <ul className="space-y-3 mb-6">
              {voiceCapabilities.map((cap) => (
                <li key={cap} className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={16}
                    className="text-success shrink-0 mt-0.5"
                  />
                  <span className="text-sm text-label">{cap}</span>
                </li>
              ))}
            </ul>
            <div className="pt-5 border-t border-border">
              <span className="text-xs text-body">
                Eliminates{" "}
                <span className="text-heading font-medium">62%</span> of
                missed-call revenue loss
              </span>
            </div>
          </div>

          {/* Multilingual Concierge */}
          <div className={`card-featured p-8 reveal ${gridVisible ? "visible" : ""}`}>
            <div className="w-12 h-12 rounded-lg bg-magenta/[0.08] flex items-center justify-center mb-6">
              <Globe size={22} className="text-magenta" />
            </div>
            <h3 className="sub-heading-lg mb-3">
              Multilingual AI Concierge
            </h3>
            <p className="text-body text-[15px] leading-relaxed mb-6">
              An AI system that detects the caller&apos;s language in real-time
              and handles complex service inquiries, pricing questions, and
              booking flows in their native language, instantly.
            </p>
            <ul className="space-y-3 mb-6">
              {multilingualCapabilities.map((cap) => (
                <li key={cap} className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={16}
                    className="text-success shrink-0 mt-0.5"
                  />
                  <span className="text-sm text-label">{cap}</span>
                </li>
              ))}
            </ul>
            <div className="pt-5 border-t border-border">
              <span className="text-xs text-body">
                Capture revenue from{" "}
                <span className="text-heading font-medium">100%</span> of your
                market, not just English speakers
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
