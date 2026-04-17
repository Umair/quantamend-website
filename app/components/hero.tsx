import { ArrowRight } from "lucide-react";

const stats = [
  { value: "$2.4M+", label: "Revenue Recovered" },
  { value: "37%", label: "Avg. Reactivation Rate" },
  { value: "14 min", label: "Avg. Time to First Booking" },
  { value: "100%", label: "Risk-Free Pilot Guarantee" },
];

export default function Hero() {
  return (
    <section className="relative pt-36 pb-20 lg:pt-44 lg:pb-28 overflow-hidden">
      {/* Subtle gradient decoration */}
      <div className="absolute top-0 left-0 right-0 gradient-line-top" />
      <div className="absolute top-20 right-[-200px] w-[600px] h-[600px] bg-gradient-to-bl from-purple/[0.06] via-magenta/[0.03] to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-[-100px] w-[400px] h-[400px] bg-gradient-to-tr from-ruby/[0.04] to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-[1080px] mx-auto px-6">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="hero-animate hero-d1 mb-8">
            <span className="badge-success">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-success" />
              </span>
              Risk-Free AI Pilot: 100 Leads, $0 Upfront
            </span>
          </div>

          {/* Headline */}
          <h1 className="hero-animate hero-d2 display-hero mb-8">
            Your Past Clients Are{" "}
            <br className="hidden sm:block" />
            Worth{" "}
            <span className="text-purple">$127,000.</span>
            <br />
            We&apos;ll Prove It. Free.
          </h1>

          {/* Sub-headline */}
          <p className="hero-animate hero-d3 body-large max-w-2xl mb-12">
            QuantaMend&apos;s AI reactivation engine texts your dormant leads,
            handles objections, and books paying appointments, all automatically.
            We run it on 100 of your dead leads at zero cost. You only pay
            if it works.
          </p>

          {/* CTAs */}
          <div className="hero-animate hero-d4 flex flex-col sm:flex-row items-start gap-4 mb-20">
            <a href="#cta" className="btn-primary text-base py-3.5 px-8">
              <span>Activate My Dead Leads</span>
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
            <a href="#how-it-works" className="btn-ghost text-base py-3.5 px-8">
              See How It Works
            </a>
          </div>
        </div>

        {/* Stats row */}
        <div className="hero-animate hero-d5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 pt-10 border-t border-border">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-light text-heading tracking-tight mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-body font-normal">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
