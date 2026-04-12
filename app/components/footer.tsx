const footerSections = [
  {
    title: "AI Systems",
    links: [
      { label: "Dead Lead Pipeline", href: "#systems" },
      { label: "Voice Receptionist", href: "#systems" },
      { label: "Multilingual Concierge", href: "#systems" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Results", href: "#results" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "#cta" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
];

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const socials = [
  { icon: XIcon, href: "https://x.com/quantamend", label: "X / Twitter" },
  {
    icon: LinkedInIcon,
    href: "https://linkedin.com/company/quantamend",
    label: "LinkedIn",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="max-w-[1080px] mx-auto px-6">
        {/* Main footer */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-5 gap-10 lg:gap-16">
          {/* Brand column */}
          <div className="col-span-2">
            <a href="#" className="flex items-center gap-2.5 mb-4 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="QuantaMend"
                width={36}
                height={36}
                className="group-hover:scale-105 transition-transform duration-200"
              />
              <span className="text-lg font-light tracking-tight text-heading">
                Quanta<span className="text-purple">Mend</span>
              </span>
            </a>
            <p className="text-sm text-body max-w-xs mb-5 leading-relaxed font-light">
              AI operations infrastructure for high-revenue practices. We build
              the systems that book appointments while you sleep.
            </p>
            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-md border border-border flex items-center justify-center text-body hover:text-purple hover:border-purple/30 transition-all duration-200"
                >
                  <s.icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-medium text-heading mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-body hover:text-purple transition-colors duration-200 font-light"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-5 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-body/50 font-light">
            &copy; {new Date().getFullYear()} QuantaMend. All rights reserved.
          </p>
          <p className="text-xs text-body/40 font-light">
            AI systems for practices that refuse to leave revenue on the table.
          </p>
        </div>
      </div>
    </footer>
  );
}
