"use client";

import { Calendar, Mail, ArrowRight } from "lucide-react";
import { useAnimate } from "./use-animate";

export default function Booking() {
  const calUrl = process.env.NEXT_PUBLIC_CAL_BOOKING_URL;
  const { ref, visible } = useAnimate();

  return (
    <section id="booking" className="py-32 px-6 bg-surface/50">
      <div ref={ref} className="max-w-4xl mx-auto text-center">
        <div className={`animate-up ${visible ? "visible" : ""}`}>
          <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <Calendar size={32} className="text-accent-light" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Let&apos;s Build <span className="gradient-text">Together</span>
          </h2>
          <p className="text-muted text-lg max-w-xl mx-auto mb-10">
            Schedule a free 30-minute discovery call. We&apos;ll discuss your
            project, map out the architecture, and give you a clear path
            forward.
          </p>
        </div>

        {calUrl ? (
          <div
            className={`rounded-2xl overflow-hidden border border-border bg-background animate-up ${visible ? "visible" : ""}`}
            style={{ transitionDelay: "200ms" }}
          >
            <iframe
              src={calUrl}
              className="w-full min-h-[600px] border-0"
              title="Book a call with MorphicStack"
            />
          </div>
        ) : (
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 animate-up ${visible ? "visible" : ""}`}
            style={{ transitionDelay: "200ms" }}
          >
            <a
              href="https://calendar.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 bg-accent hover:bg-accent-light text-white font-medium rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-accent/25 flex items-center gap-3"
            >
              <Calendar size={18} />
              Schedule on Google Calendar
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
            <a
              href="mailto:hello@morphicstack.com"
              className="px-8 py-4 border border-border hover:border-accent/40 text-foreground font-medium rounded-full transition-all duration-300 flex items-center gap-3"
            >
              <Mail size={18} />
              hello@morphicstack.com
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
