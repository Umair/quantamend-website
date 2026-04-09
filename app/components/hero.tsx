import { ArrowRight, Play } from "lucide-react";

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "3x", label: "Faster Delivery" },
  { value: "99.9%", label: "Uptime Guarantee" },
  { value: "40+", label: "Expert Engineers" },
];

const trustedBy = [
  "TechFlow",
  "NovaPay",
  "CloudBase",
  "Synthex",
  "ArcLab",
  "Meridian",
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="glow-orb w-[800px] h-[800px] bg-cyan/[0.07] top-[-200px] right-[-200px] animate-float-slow" />
        <div className="glow-orb w-[600px] h-[600px] bg-violet/[0.06] bottom-[-100px] left-[-150px] animate-float" />
        <div className="glow-orb w-[400px] h-[400px] bg-cyan/[0.04] top-[40%] left-[30%]" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern pointer-events-none" />

      {/* Gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-36 pb-20">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="hero-animate hero-d1 mb-8">
            <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-gradient-to-r from-cyan/10 to-violet/10 text-cyan text-sm font-medium border border-cyan/20 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan" />
              </span>
              AI-Powered Software Agency
            </span>
          </div>

          {/* Headline */}
          <h1 className="hero-animate hero-d2 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight mb-8">
            We Build Software{" "}
            <br className="hidden sm:block" />
            <span className="gradient-text">That Transforms</span>{" "}
            <br className="hidden lg:block" />
            Businesses
          </h1>

          {/* Subheadline */}
          <p className="hero-animate hero-d3 text-lg sm:text-xl text-secondary max-w-2xl mb-12 leading-relaxed">
            Agile development, AI-driven automation, and robust backend
            engineering. From startup MVPs to enterprise systems — delivered
            at speed, built to scale.
          </p>

          {/* CTAs */}
          <div className="hero-animate hero-d4 flex flex-col sm:flex-row items-start gap-4 mb-20">
            <a
              href="#booking"
              className="btn-primary px-8 py-4 text-base flex items-center gap-2.5 group"
            >
              <span>Book a Discovery Call</span>
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
            <a
              href="#process"
              className="btn-outline px-8 py-4 text-base flex items-center gap-2.5 group"
            >
              <Play size={16} className="text-cyan" />
              See How We Work
            </a>
          </div>
        </div>

        {/* Stats row */}
        <div className="hero-animate hero-d5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 pt-10 border-t border-border-light">
            {stats.map((stat) => (
              <div key={stat.label} className="group">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text-static mb-1.5 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm text-muted font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Trusted by */}
        <div className="hero-animate hero-d6 mt-16">
          <p className="text-xs text-muted/50 uppercase tracking-[0.25em] mb-6 font-medium">
            Trusted by innovative teams
          </p>
          <div className="flex flex-wrap items-center gap-8 lg:gap-12">
            {trustedBy.map((name) => (
              <span
                key={name}
                className="text-base font-semibold text-muted/25 tracking-wider hover:text-muted/40 transition-colors"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
