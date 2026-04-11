"use client";

import { ArrowRight, Calendar, Zap } from "lucide-react";
import { useAnimate } from "./use-animate";

export default function DarkCta() {
  const calUrl = process.env.NEXT_PUBLIC_CAL_BOOKING_URL;
  const { ref, visible } = useAnimate();

  return (
    <section id="cta" className="section-dark py-24 lg:py-32 px-6 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-purple/20 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-ruby/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="max-w-[1080px] mx-auto relative z-10">
        <div className={`max-w-2xl mx-auto text-center reveal ${visible ? "visible" : ""}`}>
          <div className="inline-flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <Zap size={14} className="text-white" />
            </div>
            <span className="text-white/60 text-sm font-normal">
              Risk-Free Pilot Program
            </span>
          </div>

          <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight mb-6" style={{ letterSpacing: "-0.96px", lineHeight: 1.15 }}>
            100 Dead Leads.
            <br />
            Zero Risk.
            <br />
            Prove It Works — Free.
          </h2>

          <p className="text-white/60 text-lg font-light max-w-lg mx-auto mb-10 leading-relaxed">
            Stop leaving revenue on the table. We&apos;ll run our AI
            reactivation engine on 100 of your dormant leads at zero cost.
            Booked appointments or you don&apos;t pay. Period.
          </p>

          {calUrl ? (
            <div className="rounded-lg overflow-hidden border border-white/10 bg-white/5">
              <iframe
                src={calUrl}
                className="w-full min-h-[600px] border-0"
                title="Book a call with QuantaMend"
              />
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://calendar.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-white py-3.5 px-8 text-base"
              >
                <Zap size={16} />
                Activate My Dead Leads — Free Pilot
                <ArrowRight size={16} />
              </a>
              <a
                href="mailto:hello@quantamend.com"
                className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-normal"
              >
                <Calendar size={14} />
                Or schedule a 15-minute strategy call
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
