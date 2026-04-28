"use client";

import { useState } from "react";
import { Clipboard, Filter, Calendar, GitBranch, RefreshCw, Users, ChevronDown, ChevronRight } from "lucide-react";

const agents = [
  {
    icon: Clipboard,
    label: "Intake agent",
    badge: "AI",
    desc: "Complex, sensitive, and conditional intake by your AI receptionist. The right questions get asked, the right details get captured, and the right outcome happens — every time.",
  },
  {
    icon: Filter,
    label: "Qualification agent",
    badge: "AI",
    desc: "Custom qualification workflows for different service types and lead sources. Only qualified leads reach your team. Smart FAQ handling steers callers toward action, not just yes/no answers.",
  },
  {
    icon: Calendar,
    label: "Booking agent",
    badge: "AI",
    desc: "Books appointments directly into your calendar or practice management software in real time. No back-and-forth, no double-bookings, no missed slots.",
  },
  {
    icon: GitBranch,
    label: "Call routing agent",
    badge: "AI",
    desc: "Intelligent conditional routing and transfers based on your business logic. Every caller reaches the right person, every time.",
  },
  {
    icon: RefreshCw,
    label: "Lead reactivation agent",
    badge: "AI",
    desc: "Automatically re-engages cold leads and past clients via outbound calls and SMS. Turns dormant contacts into booked appointments without any manual effort.",
  },
  {
    icon: Users,
    label: "24/7 coverage",
    badge: "Live",
    desc: "Always-on AI coverage ensures no call goes unanswered — day, night, weekends, and holidays. Every missed call is a recovered opportunity.",
  },
];

export default function AiWorkforce() {
  const [view, setView] = useState<"overview" | "step">("overview");
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section style={{ background: "#f5f1eb", padding: "80px 24px" }}>
      <div style={{ maxWidth: 1060, margin: "0 auto" }}>

        {/* Headline */}
        <div style={{ display: "flex", gap: 32, marginBottom: 48, alignItems: "flex-start" }}>
          <div style={{ flexShrink: 0 }}>
            <span style={{ display: "inline-block", border: "1px solid #d5cdc4", borderRadius: 99, padding: "5px 14px", fontSize: 12, fontWeight: 600, color: "#7a6e65", letterSpacing: "0.04em" }}>
              The solution
            </span>
          </div>
          <div>
            <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.3rem)", fontWeight: 800, color: "#0f1523", lineHeight: 1.2, marginBottom: 14, letterSpacing: "-0.02em" }}>
              One intelligent system.{" "}
              <span style={{ fontStyle: "italic" }}>An entire workforce.</span>
            </h2>
            <p style={{ fontSize: "1rem", color: "#7a6e65", lineHeight: 1.75, maxWidth: 520 }}>
              QuantaMend isn&apos;t just a receptionist. It&apos;s a fully staffed front office — AI agents working together to handle every call, end to end. Deeply context-aware, connected to your key systems, and always on.
            </p>
          </div>
        </div>

        {/* Main card */}
        <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,.06)", border: "1px solid #eae4dc" }}>
          <div style={{ display: "flex", minHeight: 480 }}>

            {/* Left: visual panel */}
            <div style={{
              width: "42%", flexShrink: 0,
              background: "radial-gradient(circle at 30% 30%, #ddeeff 0%, #c8e0f5 40%, #b8d4ef 100%)",
              position: "relative", overflow: "hidden",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {/* Decorative circles */}
              {[120,80,56,44,36,28,24,20].map((s, i) => (
                <div key={i} style={{
                  position: "absolute",
                  width: s * 2, height: s * 2,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.45)",
                  top: [10,15,55,65,20,70,35,45][i] + "%",
                  left: [8,60,20,70,40,10,80,50][i] + "%",
                  transform: "translate(-50%,-50%)",
                }} />
              ))}
              <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
                <p style={{ fontSize: "1.2rem", fontWeight: 700, color: "#1a3a5c", lineHeight: 1.4, marginBottom: 16 }}>
                  Meet your new<br />AI workforce.
                </p>
                <a href="#cta" style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  background: "rgba(255,255,255,0.85)", borderRadius: 99,
                  padding: "8px 18px", fontSize: 12.5, fontWeight: 600, color: "#1a3a5c",
                  textDecoration: "none", backdropFilter: "blur(6px)",
                }}>
                  Start free pilot <ChevronRight size={12} />
                </a>
              </div>
            </div>

            {/* Right: agent list or grid */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>

              {/* Tab bar */}
              <div style={{ display: "flex", justifyContent: "flex-end", padding: "16px 20px 12px", gap: 8, borderBottom: "1px solid #eae4dc" }}>
                {(["step", "overview"] as const).map((v) => (
                  <button key={v} onClick={() => { setView(v); setOpen(null); }} style={{
                    padding: "6px 14px", borderRadius: 99, fontSize: 12, fontWeight: 600, cursor: "pointer",
                    border: "1px solid", transition: "all .18s",
                    borderColor: view === v ? "#533afd" : "#ddd5ca",
                    background: view === v ? "#533afd" : "#fff",
                    color: view === v ? "#fff" : "#7a6e65",
                  }}>
                    {v === "step" ? "Step by step" : "Overview"}
                  </button>
                ))}
              </div>

              {view === "step" ? (
                /* Accordion list */
                <div style={{ flex: 1, overflowY: "auto" }}>
                  {agents.map((ag, i) => {
                    const Icon = ag.icon;
                    const isOpen = open === i;
                    return (
                      <div key={ag.label} style={{ borderBottom: "1px solid #eae4dc" }}>
                        <button onClick={() => setOpen(isOpen ? null : i)} style={{
                          width: "100%", display: "flex", alignItems: "center", gap: 12,
                          padding: "16px 20px", background: "none", border: "none", cursor: "pointer", textAlign: "left",
                        }}>
                          <Icon size={16} color="#7a6e65" />
                          <span style={{ flex: 1, fontWeight: 600, fontSize: 14, color: "#0f1523" }}>{ag.label}</span>
                          <span style={{
                            fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 99,
                            background: ag.badge === "AI" ? "#eee8fe" : "#dff5e8",
                            color: ag.badge === "AI" ? "#533afd" : "#16a34a",
                          }}>{ag.badge}</span>
                          <ChevronDown size={14} color="#b0a898" style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
                        </button>
                        {isOpen && (
                          <div style={{ padding: "0 20px 16px 48px" }}>
                            <p style={{ fontSize: 13.5, color: "#7a6e65", lineHeight: 1.7 }}>{ag.desc}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Overview grid */
                <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: "#eae4dc" }}>
                  {agents.map((ag) => {
                    const Icon = ag.icon;
                    return (
                      <div key={ag.label} style={{ background: "#fff", padding: "24px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
                        <div style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid #eae4dc", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Icon size={16} color="#533afd" />
                        </div>
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                            <span style={{ fontSize: 10, fontWeight: 700, color: ag.badge === "AI" ? "#533afd" : "#16a34a" }}>{ag.badge}</span>
                            <span style={{ fontSize: 13.5, fontWeight: 700, color: "#0f1523" }}>{ag.label}</span>
                          </div>
                          <p style={{ fontSize: 12.5, color: "#7a6e65", lineHeight: 1.65 }}>{ag.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
