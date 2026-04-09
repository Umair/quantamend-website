"use client";

import { Calendar, Mail, ArrowRight } from "lucide-react";
import { useAnimate } from "./use-animate";

export default function Booking() {
  const calUrl = process.env.NEXT_PUBLIC_CAL_BOOKING_URL;
  const { ref, visible } = useAnimate();

  return (
    <section id="booking" className="py-24 lg:py-32 px-6 section-dark">
      <div ref={ref} className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-surface-light to-surface p-12 sm:p-16 lg:p-20 border border-border">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/[0.04] rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple/[0.04] rounded-full blur-[100px] pointer-events-none" />

          <div className={`relative z-10 max-w-2xl mx-auto text-center animate-up ${visible ? "visible" : ""}`}>
            <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-4">
              Ready to Get Started?
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-5 leading-[1.12]">
              Let&apos;s Build Something{" "}
              <span className="gradient-text-teal">Exceptional</span>
            </h2>
            <p className="text-muted text-lg max-w-lg mx-auto mb-10 leading-relaxed">
              Schedule a free 30-minute discovery call. We&apos;ll discuss your
              project, map out the architecture, and give you a clear path forward.
            </p>

            {calUrl ? (
              <div className="rounded-xl overflow-hidden border border-border bg-background">
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
                  className="btn-primary px-8 py-4 text-base flex items-center gap-2.5 group"
                >
                  <Calendar size={18} />
                  Schedule a Call
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </a>
                <a
                  href="mailto:hello@quantamend.com"
                  className="btn-outline px-8 py-4 text-base flex items-center gap-2.5"
                >
                  <Mail size={18} />
                  hello@quantamend.com
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
