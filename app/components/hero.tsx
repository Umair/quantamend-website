import { ArrowRight } from "lucide-react";

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "3x", label: "Faster Delivery" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "40+", label: "Engineers" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-accent/[0.04] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple/[0.04] rounded-full blur-[120px]" />
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="hero-animate hero-animate-1 mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium border border-accent/20">
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
              AI-Powered Software Agency
            </span>
          </div>

          {/* Headline */}
          <h1 className="hero-animate hero-animate-2 text-5xl sm:text-6xl lg:text-7xl xl:text-[5.25rem] font-bold leading-[1.08] tracking-tight mb-7">
            We Build Software{" "}
            <span className="gradient-text-teal">That Transforms</span>{" "}
            Businesses
          </h1>

          {/* Subheadline */}
          <p className="hero-animate hero-animate-3 text-lg sm:text-xl text-muted max-w-2xl mb-10 leading-relaxed">
            Agile development, AI-driven automation, and robust backend
            engineering. From startup MVPs to enterprise systems — delivered
            at speed, built to scale.
          </p>

          {/* CTAs */}
          <div className="hero-animate hero-animate-4 flex flex-col sm:flex-row items-start gap-4 mb-20">
            <a
              href="#booking"
              className="btn-primary px-8 py-3.5 text-base flex items-center gap-2 group"
            >
              Book a Discovery Call
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
            <a
              href="#services"
              className="btn-outline px-8 py-3.5 text-base"
            >
              Explore Services
            </a>
          </div>

          {/* Stats row */}
          <div className="hero-animate hero-animate-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-border">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl sm:text-4xl font-bold text-accent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
