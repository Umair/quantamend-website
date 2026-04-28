import type { Metadata } from "next";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Check, X } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing | QuantaMend AI Receptionist Plans",
  description:
    "Simple, transparent pricing for QuantaMend's 24/7 AI receptionist. Month-to-month self-service or a fully managed annual plan with custom integrations and a dedicated success manager.",
};

const selfServiceTiers = [
  { calls: "~2 calls/day", price: "$149/mo", perCall: "$2.49/call" },
  { calls: "~5 calls/day", price: "$299/mo", perCall: "$1.99/call" },
  { calls: "~15 calls/day", price: "$699/mo", perCall: "$1.55/call" },
];

const managedTiers = [
  { calls: "~10 calls/day", price: "$499/mo", perCall: "$1.66/call" },
  { calls: "~25 calls/day", price: "$999/mo", perCall: "$1.33/call" },
  { calls: "~55 calls/day", price: "$1,999/mo", perCall: "$1.21/call" },
];

const selfFeatures = [
  { ok: true,  text: "Commitment-free, cancel anytime" },
  { ok: true,  text: "24/7 AI call answering" },
  { ok: true,  text: "Lead intake & qualification" },
  { ok: true,  text: "Appointment booking" },
  { ok: false, text: "No custom call flows" },
  { ok: false, text: "No dedicated success manager" },
  { ok: false, text: "No CRM integrations" },
  { ok: false, text: "Unused calls expire monthly" },
  { ok: false, text: "Overages at $3.50/call" },
];

const managedFeatures = [
  { ok: true, text: "Best value — annual price lock" },
  { ok: true, text: "24/7 AI call answering" },
  { ok: true, text: "AI experts fine-tune for your practice" },
  { ok: true, text: "Dedicated customer success manager" },
  { ok: true, text: "Custom CRM & calendar integrations" },
  { ok: true, text: "Lead reactivation campaigns included" },
  { ok: true, text: "Flexible call usage all month" },
  { ok: true, text: "No overages, ever" },
];

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "#f5f1eb", minHeight: "100vh" }}>
        {/* ── Hero ── */}
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "140px 24px 56px", textAlign: "center" }}>

          {/* Toggle pill — decorative */}
          <div style={{ display: "inline-flex", background: "#ebe5dd", borderRadius: 99, padding: 4, marginBottom: 36, gap: 2 }}>
            {["Self-service", "Done for you"].map((t, i) => (
              <span key={t} style={{
                padding: "6px 18px", borderRadius: 99, fontSize: 13.5, fontWeight: 600,
                background: i === 0 ? "#fff" : "transparent",
                color: i === 0 ? "#0f1523" : "#9a8f84",
                boxShadow: i === 0 ? "0 1px 4px rgba(0,0,0,.08)" : "none",
              }}>{t}</span>
            ))}
          </div>

          <h1 style={{ fontSize: "clamp(2.4rem,5vw,3.8rem)", fontWeight: 800, color: "#0f1523", lineHeight: 1.08, letterSpacing: "-0.03em", marginBottom: 20 }}>
            Your AI Front Desk
          </h1>
          <p style={{ fontSize: "1.1rem", color: "#7a6e65", lineHeight: 1.7, maxWidth: 500, margin: "0 auto" }}>
            Intelligent call handling powered by AI — fully staffed 24/7 and built to scale as you grow.
          </p>
        </div>

        {/* ── Cards ── */}
        <div style={{ maxWidth: 1040, margin: "0 auto", padding: "0 24px 80px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(440px,1fr))", gap: 20, alignItems: "start" }}>

          {/* Self-Service card */}
          <div style={{ background: "#eee8df", borderRadius: 20, padding: "36px 36px 32px", display: "flex", flexDirection: "column", gap: 0 }}>
            <div style={{ marginBottom: 8 }}>
              <span style={{ fontWeight: 800, fontSize: "1.6rem", color: "#0f1523" }}>Do it yourself</span>
              <span style={{ fontWeight: 400, fontSize: "1rem", color: "#9a8f84", marginLeft: 10 }}>Month-to-month plans</span>
            </div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#533afd", marginBottom: 24 }}>
              Self-service, month-to-month for simple call flows
            </p>
            <p style={{ fontSize: 12, color: "#9a8f84", marginBottom: 4 }}>Starting at</p>
            <p style={{ fontSize: "2.6rem", fontWeight: 800, color: "#0f1523", lineHeight: 1, marginBottom: 4 }}>
              $149<span style={{ fontSize: "1.1rem", fontWeight: 500 }}>/mo</span>
            </p>
            <p style={{ fontSize: 12, color: "#9a8f84", marginBottom: 24 }}>Billed monthly</p>

            {/* Tiers table */}
            <div style={{ background: "#fff", borderRadius: 12, padding: "16px 20px", marginBottom: 28, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "12px 0" }}>
              {selfServiceTiers.map((t) => (
                <div key={t.calls}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#0f1523", marginBottom: 2 }}>{t.calls}</p>
                  <p style={{ fontSize: 13, color: "#7a6e65", marginBottom: 1 }}>{t.price}</p>
                  <p style={{ fontSize: 12, fontWeight: 600, color: "#9a8f84" }}>{t.perCall}</p>
                </div>
              ))}
            </div>

            <a href="#cta" style={{
              display: "block", textAlign: "center", background: "#0f1523", color: "#fff",
              borderRadius: 12, padding: "15px 24px", fontWeight: 700, fontSize: 15,
              textDecoration: "none", marginBottom: 28, transition: "opacity .18s",
            }}>Start free pilot</a>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {selfFeatures.map((f) => (
                <div key={f.text} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  {f.ok
                    ? <Check size={16} color="#16a34a" strokeWidth={2.5} style={{ flexShrink: 0 }} />
                    : <X     size={16} color="#dc2626" strokeWidth={2.5} style={{ flexShrink: 0 }} />}
                  <span style={{ fontSize: 13.5, color: f.ok ? "#3a3530" : "#9a8f84" }}>{f.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Done For You card */}
          <div style={{ background: "#fff", borderRadius: 20, padding: "36px 36px 32px", display: "flex", flexDirection: "column", gap: 0, boxShadow: "0 8px 32px rgba(0,0,0,.06)" }}>
            <div style={{ marginBottom: 8 }}>
              <span style={{ fontWeight: 800, fontSize: "1.6rem", color: "#0f1523" }}>Done for you</span>
              <span style={{ fontWeight: 400, fontSize: "1rem", color: "#9a8f84", marginLeft: 10 }}>Annual plans</span>
            </div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#533afd", marginBottom: 24 }}>
              Guided plans with setup, customization, and optimization
            </p>
            <p style={{ fontSize: 12, color: "#9a8f84", marginBottom: 4 }}>Starting at</p>
            <p style={{ fontSize: "2.6rem", fontWeight: 800, color: "#0f1523", lineHeight: 1, marginBottom: 4 }}>
              $499<span style={{ fontSize: "1.1rem", fontWeight: 500 }}>/mo</span>
            </p>
            <p style={{ fontSize: 12, color: "#9a8f84", marginBottom: 24 }}>Billed annually</p>

            {/* Tiers table */}
            <div style={{ background: "#f9fafb", border: "1px solid #edf0f5", borderRadius: 12, padding: "16px 20px", marginBottom: 28, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "12px 0" }}>
              {managedTiers.map((t) => (
                <div key={t.calls}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#0f1523", marginBottom: 2 }}>{t.calls}</p>
                  <p style={{ fontSize: 13, color: "#7a6e65", marginBottom: 1 }}>{t.price}</p>
                  <p style={{ fontSize: 12, fontWeight: 600, color: "#9a8f84" }}>{t.perCall}</p>
                </div>
              ))}
            </div>

            <a href="#cta" style={{
              display: "block", textAlign: "center", background: "#533afd", color: "#fff",
              borderRadius: 12, padding: "15px 24px", fontWeight: 700, fontSize: 15,
              textDecoration: "none", marginBottom: 28, transition: "opacity .18s",
            }}>Talk to sales</a>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {managedFeatures.map((f) => (
                <div key={f.text} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Check size={16} color="#16a34a" strokeWidth={2.5} style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: 13.5, color: "#3a3530" }}>{f.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── FAQ ── */}
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 24px 100px" }}>
          <h2 style={{ fontSize: "1.9rem", fontWeight: 800, color: "#0f1523", textAlign: "center", marginBottom: 48, letterSpacing: "-0.02em" }}>
            Common questions
          </h2>
          {[
            {
              q: "What counts as a call?",
              a: "Any inbound call handled by the AI receptionist counts toward your plan — whether it ends in a booking, a message, or a hang-up.",
            },
            {
              q: "Can I switch plans later?",
              a: "Self-service plans are month-to-month so you can upgrade, downgrade, or cancel at any time. Annual plans can be upgraded mid-term; credits are applied to the new plan.",
            },
            {
              q: "What languages does the AI support?",
              a: "The AI speaks English, Spanish, French, Mandarin, and 12+ additional languages — automatically detected from the caller's first words.",
            },
            {
              q: "How long does setup take?",
              a: "Self-service plans are live in under 30 minutes. Done-for-you plans include a guided onboarding call and are typically live within 2 business days.",
            },
            {
              q: "Is there a free trial?",
              a: "Yes — the 100-call free pilot on the self-service plan lets you test QuantaMend with zero upfront cost. No credit card required to start.",
            },
          ].map(({ q, a }) => (
            <div key={q} style={{ borderBottom: "1px solid #ddd5ca", padding: "24px 0" }}>
              <p style={{ fontWeight: 700, fontSize: "1rem", color: "#0f1523", marginBottom: 10 }}>{q}</p>
              <p style={{ fontSize: "0.95rem", color: "#7a6e65", lineHeight: 1.7 }}>{a}</p>
            </div>
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div id="cta" style={{ background: "#0f1523", padding: "72px 24px", textAlign: "center" }}>
          <p style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 800, color: "#fff", marginBottom: 16, letterSpacing: "-0.02em" }}>
            Start your free pilot today.
          </p>
          <p style={{ fontSize: "1rem", color: "#9aa0b0", marginBottom: 36 }}>
            100 calls handled, zero risk, no credit card required.
          </p>
          <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "#533afd", color: "#fff", borderRadius: 12,
            padding: "15px 32px", fontWeight: 700, fontSize: 16, textDecoration: "none",
          }}>
            Book a free consultation →
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
