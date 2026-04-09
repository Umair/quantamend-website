import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[128px] animate-pulse-glow" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[128px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[160px]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="hero-animate hero-animate-1">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/5 text-accent-light text-sm mb-8">
            <Sparkles size={14} />
            AI-Driven Software Development
          </div>
        </div>

        <h1 className="hero-animate hero-animate-2 text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6">
          We Build Software
          <br />
          <span className="gradient-text">That Scales</span>
        </h1>

        <p className="hero-animate hero-animate-3 text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
          Agile development, AI-driven automation, and robust engineering.
          From startups to enterprise — we ship products that move fast and
          don&apos;t break.
        </p>

        <div className="hero-animate hero-animate-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#booking"
            className="group px-8 py-3.5 bg-accent hover:bg-accent-light text-white font-medium rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-accent/25 flex items-center gap-2"
          >
            Book a Call
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
          <a
            href="#services"
            className="px-8 py-3.5 border border-border hover:border-accent/40 text-foreground font-medium rounded-full transition-all duration-300 hover:bg-surface-light"
          >
            Explore Services
          </a>
        </div>

        {/* Trusted by line */}
        <div className="hero-animate hero-animate-5 mt-20 pt-10 border-t border-border">
          <p className="text-xs text-muted uppercase tracking-widest mb-6">
            Trusted by innovative teams worldwide
          </p>
          <div className="flex items-center justify-center gap-10 opacity-40">
            {["TechFlow", "NovaPay", "CloudBase", "Synthex", "ArcLab"].map(
              (name) => (
                <span
                  key={name}
                  className="text-sm font-semibold tracking-wider text-muted"
                >
                  {name}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
