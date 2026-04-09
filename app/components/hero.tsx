import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Aurora gradient mesh */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="aurora-orb-1 absolute -top-[300px] -left-[200px] w-[900px] h-[900px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.15)_0%,transparent_70%)] blur-[40px]" />
        <div className="aurora-orb-2 absolute -bottom-[200px] -right-[200px] w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.1)_0%,transparent_70%)] blur-[40px]" />
        <div className="aurora-orb-3 absolute top-[20%] left-[60%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.08)_0%,transparent_70%)] blur-[60px]" />
      </div>

      {/* Dot grid overlay */}
      <div className="absolute inset-0 dot-grid opacity-40" />

      {/* Radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_70%)]" />

      {/* Floating geometric decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="animate-float absolute top-[15%] left-[10%] w-20 h-20 border border-accent/10 rounded-2xl rotate-12 opacity-40" />
        <div className="animate-float-reverse absolute top-[25%] right-[12%] w-16 h-16 border border-cyan-500/10 rounded-full opacity-30" />
        <div className="animate-float absolute bottom-[25%] left-[15%] w-12 h-12 border border-accent/10 rounded-xl -rotate-12 opacity-30" />
        <div className="animate-float-reverse absolute bottom-[30%] right-[8%] w-24 h-24 border border-purple-400/5 rounded-3xl rotate-45 opacity-40" />

        {/* Glowing dots */}
        <div className="animate-pulse-glow absolute top-[20%] left-[30%] w-1 h-1 bg-accent-light rounded-full" />
        <div className="animate-pulse-glow absolute top-[40%] right-[25%] w-1.5 h-1.5 bg-cyan-400 rounded-full" style={{ animationDelay: "1s" }} />
        <div className="animate-pulse-glow absolute bottom-[35%] left-[40%] w-1 h-1 bg-purple-400 rounded-full" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="hero-animate hero-animate-1">
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glass text-sm mb-10 text-accent-light/90">
            <div className="relative flex items-center justify-center">
              <div className="absolute w-5 h-5 bg-accent/20 rounded-full animate-ping" />
              <Sparkles size={14} className="relative" />
            </div>
            <span className="font-medium tracking-wide">AI-Driven Software Development</span>
          </div>
        </div>

        {/* Heading */}
        <h1 className="hero-animate hero-animate-2 text-5xl sm:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-8">
          We Build Software
          <br />
          <span className="gradient-text">That Scales</span>
        </h1>

        {/* Subheading */}
        <p className="hero-animate hero-animate-3 text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-12 leading-relaxed">
          Agile development, AI-driven automation, and robust engineering.
          From startups to enterprise — we ship products that move fast and
          don&apos;t break.
        </p>

        {/* CTAs */}
        <div className="hero-animate hero-animate-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#booking"
            className="btn-primary px-9 py-4 text-base flex items-center gap-2.5 group"
          >
            <span>Book a Call</span>
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
          <a
            href="#services"
            className="btn-ghost px-9 py-4 text-base"
          >
            Explore Services
          </a>
        </div>

        {/* Trusted by */}
        <div className="hero-animate hero-animate-5 mt-24">
          <div className="relative">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
            <div className="pt-10">
              <p className="text-xs text-muted/60 uppercase tracking-[0.25em] mb-8 font-medium">
                Trusted by innovative teams
              </p>
              <div className="flex items-center justify-center gap-12 flex-wrap">
                {["TechFlow", "NovaPay", "CloudBase", "Synthex", "ArcLab"].map(
                  (name) => (
                    <span
                      key={name}
                      className="text-sm font-semibold tracking-wider text-muted/30 hover:text-muted/60 transition-colors duration-500"
                    >
                      {name}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
