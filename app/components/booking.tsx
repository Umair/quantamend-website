"use client";

import { Calendar, Mail, ArrowRight, MessageSquare } from "lucide-react";
import { useAnimate } from "./use-animate";

export default function Booking() {
  const calUrl = process.env.NEXT_PUBLIC_CAL_BOOKING_URL;
  const { ref, visible } = useAnimate();

  return (
    <section id="booking" className="relative py-28 lg:py-36 px-6 section-alt">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="glow-orb w-[700px] h-[700px] bg-cyan/[0.06] top-[-200px] left-[50%] translate-x-[-50%]" />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        <div className="relative overflow-hidden rounded-3xl border border-border">
          {/* Background gradient mesh */}
          <div className="absolute inset-0 bg-gradient-to-br from-surface via-bg to-surface" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan/[0.06] rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet/[0.06] rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent" />

          <div
            className={`relative z-10 p-12 sm:p-16 lg:p-24 reveal ${
              visible ? "visible" : ""
            }`}
          >
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan/10 text-cyan text-sm font-medium border border-cyan/20 mb-8">
                <MessageSquare size={14} />
                Free Consultation
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
                Let&apos;s Build Something{" "}
                <span className="gradient-text">Exceptional</span>
              </h2>
              <p className="text-secondary text-lg max-w-lg mx-auto mb-12 leading-relaxed">
                Schedule a free 30-minute discovery call. We&apos;ll discuss
                your project, map out the architecture, and give you a clear
                path forward.
              </p>

              {calUrl ? (
                <div className="rounded-2xl overflow-hidden border border-border bg-bg-deep">
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
                    className="btn-primary px-10 py-4.5 text-base flex items-center gap-3 group"
                  >
                    <span className="flex items-center gap-3">
                      <Calendar size={18} />
                      Schedule a Call
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </span>
                  </a>
                  <a
                    href="mailto:hello@quantamend.com"
                    className="btn-outline px-10 py-4.5 text-base flex items-center gap-3"
                  >
                    <Mail size={18} />
                    hello@quantamend.com
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
