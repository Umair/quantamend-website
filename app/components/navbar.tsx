"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#industries", label: "Industries" },
  { href: "#about", label: "About" },
  { href: "#process", label: "Process" },
  { href: "#testimonials", label: "Clients" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`nav-animate fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
        <a href="#" className="text-xl font-bold tracking-tight flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-teal-400 flex items-center justify-center text-background text-sm font-black">
            Q
          </div>
          <span>
            <span className="text-accent">Quanta</span>
            <span className="text-foreground">Mend</span>
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm text-muted hover:text-foreground transition-colors duration-200 rounded-lg hover:bg-white/[0.03]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="#booking"
            className="btn-primary px-6 py-2.5 text-sm"
          >
            Get Started
          </a>
        </div>

        <button
          className="lg:hidden text-foreground p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-surface/98 backdrop-blur-xl border-t border-border">
          <div className="px-6 py-5 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm text-muted hover:text-foreground py-3 px-3 rounded-lg hover:bg-white/[0.03] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#booking"
              onClick={() => setMobileOpen(false)}
              className="mt-3 btn-primary px-5 py-3 text-sm text-center"
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
