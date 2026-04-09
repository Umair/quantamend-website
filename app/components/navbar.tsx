"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#process", label: "Process" },
  { href: "#testimonials", label: "Testimonials" },
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
      className={`nav-animate fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-strong shadow-lg shadow-black/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="relative group">
          <span className="text-xl font-bold tracking-tight">
            <span className="gradient-text">Quanta</span>
            <span className="text-foreground">Mend</span>
          </span>
          <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-accent to-cyan-400 group-hover:w-full transition-all duration-500" />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative px-4 py-2 text-sm text-muted hover:text-foreground transition-colors duration-300 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-accent/60 group-hover:w-1/2 transition-all duration-300" />
            </a>
          ))}
          <a
            href="#booking"
            className="ml-4 btn-primary px-6 py-2.5 text-sm flex items-center"
          >
            <span>Get Started</span>
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground p-2 rounded-lg hover:bg-surface-light transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass-strong border-t border-border">
          <div className="px-6 py-6 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm text-muted hover:text-foreground transition-colors py-3 px-3 rounded-lg hover:bg-surface-light"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#booking"
              onClick={() => setMobileOpen(false)}
              className="mt-3 btn-primary px-5 py-3 text-sm text-center"
            >
              <span>Get Started</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
