"use client";

import { Calendar, Mail, ArrowRight } from "lucide-react";
import { useAnimate } from "./use-animate";

export default function Booking() {
  const calUrl = process.env.NEXT_PUBLIC_CAL_BOOKING_URL;
  const { ref, visible } = useAnimate();

  return (
    <section id="booking" className="relative py-32 px-6 section-glow-top overflow-hidden">
      {/* Ambient gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[radial-gradient(ellipse,rgba(124,58,237,0.08)_0%,transparent_60%)]" />
      </div>

      <div ref={ref} className="relative max-w-4xl mx-auto text-center">
        <div className={`animate-up ${visible ? "visible" : ""}`}>
          {/* Icon */}
          <div className="relative inline-flex items-center justify-center mb-8">
            <div className="absolute w-24 h-24 bg-accent/10 rounded-full blur-xl" />
            <div className="relative w-18 h-18 rounded-2xl bg-gradient-to-br from-accent/20 to-cyan-500/20 flex items-center justify-center p-4 glass">
              <Calendar size={32} className="text-accent-light" />
            </div>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5 leading-[1.1]">
            Let&apos;s Build{" "}
            <span className="gradient-text">Together</span>
          </h2>
          <p className="text-muted text-lg max-w-xl mx-auto mb-12 leading-relaxed">
            Schedule a free 30-minute discovery call. We&apos;ll discuss your
            project, map out the architecture, and give you a clear path
            forward.
          </p>
        </div>

        {calUrl ? (
          <div
            className={`rounded-2xl overflow-hidden glass animate-up ${visible ? "visible" : ""}`}
            style={{ transitionDelay: "200ms" }}
          >
            <iframe
              src={calUrl}
              className="w-full min-h-[600px] border-0"
              title="Book a call with QuantaMend"
            />
          </div>
        ) : (
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-5 animate-up ${visible ? "visible" : ""}`}
            style={{ transitionDelay: "200ms" }}
          >
            <a
              href="https://calendar.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-9 py-4 text-base flex items-center gap-3 group"
            >
              <Calendar size={18} />
              <span>Schedule a Call</span>
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
            <a
              href="mailto:hello@quantamend.com"
              className="btn-ghost px-9 py-4 text-base flex items-center gap-3"
            >
              <Mail size={18} />
              hello@quantamend.com
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
