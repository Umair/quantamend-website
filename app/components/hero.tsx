"use client";

import { ArrowRight, Phone, PhoneCall, Stethoscope, Scale, Wrench, Monitor } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const stats = [
  { value: "$2.4M+", label: "Revenue Recovered" },
  { value: "37%", label: "Avg. Reactivation Rate" },
  { value: "14 min", label: "Avg. Time to First Booking" },
  { value: "100%", label: "Risk-Free Pilot Guarantee" },
];

type Message = {
  role: "ai" | "caller";
  text: string;
};

type Industry = {
  id: string;
  label: string;
  icon: React.ElementType;
  businessName: string;
  callerName: string;
  messages: Message[];
};

const industries: Industry[] = [
  {
    id: "clinic",
    label: "Clinics",
    icon: Stethoscope,
    businessName: "Bright Smile Dental",
    callerName: "Sarah M.",
    messages: [
      { role: "ai", text: "Thank you for calling Bright Smile Dental. I'm their AI receptionist. How can I help you today?" },
      { role: "caller", text: "Hi, I need to book an appointment. I have a toothache that's been going on for a few days." },
      { role: "ai", text: "I'm sorry to hear that, let's get you seen quickly. Can I get your full name?" },
      { role: "caller", text: "It's Sarah Miller." },
      { role: "ai", text: "Thank you, Sarah. Are you an existing patient with us, or would this be your first visit?" },
      { role: "caller", text: "I came in about two years ago, but haven't been back since." },
      { role: "ai", text: "Got it. I've located your record. Dr. Chen has an opening tomorrow at 10 AM. Shall I book that for you?" },
      { role: "caller", text: "Yes, that works perfectly!" },
      { role: "ai", text: "Done! You're booked for tomorrow at 10 AM with Dr. Chen. You'll receive a confirmation text shortly." },
    ],
  },
  {
    id: "lawfirm",
    label: "Law Firms",
    icon: Scale,
    businessName: "Hart & Sloan Injury Law",
    callerName: "James T.",
    messages: [
      { role: "ai", text: "Thank you for calling Hart & Sloan Injury Law. I'm their AI receptionist. How may I help you?" },
      { role: "caller", text: "Hi, I was recently in a car accident and I need to speak with an attorney." },
      { role: "ai", text: "I'm sorry to hear that. I can help connect you with our team. Were you injured in the accident?" },
      { role: "caller", text: "Yes, I hurt my back pretty badly. The other driver ran a red light." },
      { role: "ai", text: "I understand. Can I get your full name and best contact number?" },
      { role: "caller", text: "James Thorne, 512-555-0147." },
      { role: "ai", text: "Thank you, James. When did the accident occur, and has a police report been filed?" },
      { role: "caller", text: "It was last Wednesday and yes, the police were there." },
      { role: "ai", text: "Perfect. I'm booking you a free consultation with Attorney Hart this Friday at 2 PM. You'll receive a confirmation text now." },
    ],
  },
  {
    id: "plumbing",
    label: "Plumbing",
    icon: Wrench,
    businessName: "Summit Plumbing Co.",
    callerName: "Mike R.",
    messages: [
      { role: "ai", text: "Thanks for calling Summit Plumbing. I'm their AI assistant. What's the issue today?" },
      { role: "caller", text: "I have a burst pipe under my kitchen sink. Water is everywhere." },
      { role: "ai", text: "That sounds urgent. I'm flagging this as an emergency. Can I get your address?" },
      { role: "caller", text: "3421 Maple Drive, Austin." },
      { role: "ai", text: "Got it. Can you shut off the water valve under the sink to stop the flow while we dispatch?" },
      { role: "caller", text: "I already did that. How quickly can someone come?" },
      { role: "ai", text: "Our nearest technician is 12 minutes away. Name for the job ticket?" },
      { role: "caller", text: "Mike Reynolds." },
      { role: "ai", text: "Mike, a technician is on their way and will arrive by 3:45 PM. You'll get a text with their name and ETA." },
    ],
  },
  {
    id: "it",
    label: "IT & MSPs",
    icon: Monitor,
    businessName: "Apex IT Solutions",
    callerName: "Lisa K.",
    messages: [
      { role: "ai", text: "Thank you for calling Apex IT Solutions. I'm the AI assistant. What can I help with today?" },
      { role: "caller", text: "Our entire office network is down. Nobody can access anything." },
      { role: "ai", text: "That's a Priority 1 issue. I'm routing this to our on-call engineer right now. Company name?" },
      { role: "caller", text: "Keller Financial Group." },
      { role: "ai", text: "Keller Financial — I see you're on our Managed Pro plan. Is this affecting all 23 workstations?" },
      { role: "caller", text: "Yes, everything's down. Even the phones." },
      { role: "ai", text: "Our engineer Jake is being notified immediately. Can you confirm if the main router lights are on or off?" },
      { role: "caller", text: "The router has a red blinking light." },
      { role: "ai", text: "Understood. Jake will call you within 5 minutes. I've created ticket #4821 — check your email for the details." },
    ],
  },
];

function useTypingMessages(messages: Message[], isActive: boolean) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [typingIndex, setTypingIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isActive) {
      setVisibleCount(0);
      setTypingIndex(0);
      setDisplayedText("");
      return;
    }

    // Start fresh
    setVisibleCount(0);
    setTypingIndex(0);
    setDisplayedText("");
  }, [isActive, messages]);

  useEffect(() => {
    if (!isActive) return;

    if (typingIndex >= messages.length) return;

    const currentMessage = messages[typingIndex];
    const fullText = currentMessage.text;

    if (displayedText.length < fullText.length) {
      // Still typing current message
      timerRef.current = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 2));
      }, 18);
    } else {
      // Finished typing current message — show it and move to next
      timerRef.current = setTimeout(() => {
        setVisibleCount((c) => c + 1);
        setTypingIndex((i) => i + 1);
        setDisplayedText("");
      }, 600);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isActive, typingIndex, displayedText, messages]);

  return { visibleCount, typingIndex, displayedText };
}

function CallSimulator({ industry, isActive }: { industry: Industry; isActive: boolean }) {
  const { visibleCount, typingIndex, displayedText } = useTypingMessages(industry.messages, isActive);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [visibleCount, displayedText]);

  const visibleMessages = industry.messages.slice(0, visibleCount);
  const isTyping = isActive && typingIndex < industry.messages.length;

  return (
    <div className="relative flex flex-col h-full">
      {/* Phone chrome top bar */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border/60 bg-white rounded-t-2xl">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-ruby/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#f0b429]/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-success/70" />
        </div>
        <div className="flex-1 flex items-center justify-center gap-2">
          <div className="flex items-center gap-1.5 bg-[#f8fafc] rounded-full px-3 py-1">
            <PhoneCall size={11} className="text-success" />
            <span className="text-[11px] font-medium text-heading/70 tracking-wide">
              {industry.businessName}
            </span>
          </div>
        </div>
        <div className="w-14" />
      </div>

      {/* Call status bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#f8fafc] border-b border-border/40 text-[10px] text-body/60 font-medium tracking-wider uppercase">
        <span>Live Call</span>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-success" />
          </span>
          <span>AI Receptionist Active</span>
        </div>
        <span>QuantaMend</span>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#fafcff] min-h-0">
        {visibleMessages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-2.5 ${msg.role === "caller" ? "flex-row-reverse" : ""} animate-fade-in`}
          >
            {/* Avatar */}
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                msg.role === "ai"
                  ? "bg-purple text-white"
                  : "bg-[#e5edf5] text-heading/60"
              }`}
            >
              {msg.role === "ai" ? "AI" : industry.callerName.charAt(0)}
            </div>
            {/* Bubble */}
            <div
              className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed ${
                msg.role === "ai"
                  ? "bg-white border border-border text-heading rounded-tl-sm shadow-sm"
                  : "bg-purple text-white rounded-tr-sm"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {/* Currently typing bubble */}
        {isTyping && displayedText && (
          <div
            className={`flex gap-2.5 ${
              industry.messages[typingIndex]?.role === "caller" ? "flex-row-reverse" : ""
            }`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                industry.messages[typingIndex]?.role === "ai"
                  ? "bg-purple text-white"
                  : "bg-[#e5edf5] text-heading/60"
              }`}
            >
              {industry.messages[typingIndex]?.role === "ai" ? "AI" : industry.callerName.charAt(0)}
            </div>
            <div
              className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed ${
                industry.messages[typingIndex]?.role === "ai"
                  ? "bg-white border border-border text-heading rounded-tl-sm shadow-sm"
                  : "bg-purple text-white rounded-tr-sm"
              }`}
            >
              {displayedText}
              <span className="inline-block w-0.5 h-3.5 bg-current opacity-70 ml-0.5 animate-pulse align-middle" />
            </div>
          </div>
        )}

        {/* Typing dots when between messages */}
        {isTyping && !displayedText && (
          <div className="flex gap-2.5">
            <div className="w-7 h-7 rounded-full bg-purple flex items-center justify-center text-[10px] font-bold text-white shrink-0">
              AI
            </div>
            <div className="bg-white border border-border rounded-2xl rounded-tl-sm px-3.5 py-3 shadow-sm">
              <div className="flex gap-1 items-center h-4">
                <span className="w-1.5 h-1.5 bg-purple/40 rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 bg-purple/40 rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 bg-purple/40 rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Bottom caller label */}
      <div className="px-4 py-3 border-t border-border/60 bg-white rounded-b-2xl flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-[#e5edf5] flex items-center justify-center text-[9px] font-bold text-heading/60">
          {industry.callerName.charAt(0)}
        </div>
        <span className="text-[11px] text-body/60 font-medium">{industry.callerName} is calling</span>
        <div className="ml-auto flex items-center gap-1">
          <Phone size={10} className="text-success" />
          <span className="text-[10px] text-success font-medium">Connected</span>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const [activeIndustry, setActiveIndustry] = useState(0);
  const [started, setStarted] = useState(false);

  // Auto-start on mount
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 800);
    return () => clearTimeout(t);
  }, []);

  // Auto-cycle industries every 14 seconds
  useEffect(() => {
    if (!started) return;
    const interval = setInterval(() => {
      setActiveIndustry((prev) => (prev + 1) % industries.length);
    }, 14000);
    return () => clearInterval(interval);
  }, [started]);

  const handleIndustryClick = (index: number) => {
    if (index !== activeIndustry) {
      setActiveIndustry(index);
    }
  };

  return (
    <section className="relative pt-36 pb-20 lg:pt-44 lg:pb-28 overflow-hidden">
      {/* Gradient decorations */}
      <div className="absolute top-0 left-0 right-0 gradient-line-top" />
      <div className="absolute top-20 right-[-200px] w-[600px] h-[600px] bg-gradient-to-bl from-purple/[0.06] via-magenta/[0.03] to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-[-100px] w-[400px] h-[400px] bg-gradient-to-tr from-ruby/[0.04] to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-[1080px] mx-auto px-6">
        {/* ===== TWO-COLUMN HERO ===== */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

          {/* LEFT: Copy */}
          <div className="flex-1 lg:pt-4">
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
            <h1 className="hero-animate hero-d2 display-hero mb-6">
              Your Past Clients Are{" "}
              <br className="hidden sm:block" />
              Worth{" "}
              <span className="text-purple">$127,000.</span>
              <br />
              We&apos;ll Prove It. Free.
            </h1>

            {/* Sub-headline */}
            <p className="hero-animate hero-d3 body-large max-w-xl mb-10">
              QuantaMend&apos;s AI answers every call, reactivates dormant leads,
              and books paying appointments — automatically, in any language,
              24/7. No staff required.
            </p>

            {/* CTAs */}
            <div className="hero-animate hero-d4 flex flex-col sm:flex-row items-start gap-4 mb-10">
              <a href="#cta" className="btn-primary text-base py-3.5 px-8">
                <span>Activate My Dead Leads</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#how-it-works" className="btn-ghost text-base py-3.5 px-8">
                See How It Works
              </a>
            </div>

            {/* Industry selector label */}
            <div className="hero-animate hero-d5">
              <p className="text-xs text-body/50 uppercase tracking-[0.15em] font-medium mb-3">
                Select an industry to watch a live demo
              </p>
              {/* Industry tabs */}
              <div className="flex flex-wrap gap-2">
                {industries.map((industry, index) => {
                  const Icon = industry.icon;
                  const isActive = activeIndustry === index;
                  return (
                    <button
                      key={industry.id}
                      id={`industry-tab-${industry.id}`}
                      onClick={() => handleIndustryClick(index)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-purple text-white border-purple shadow-sm scale-[1.02]"
                          : "bg-white text-body border-border hover:border-purple/40 hover:text-purple hover:bg-purple/[0.03]"
                      }`}
                    >
                      <Icon size={13} />
                      {industry.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT: Phone Call Simulator */}
          <div className="hero-animate hero-d4 w-full lg:w-[420px] shrink-0">
            <div
              className="relative rounded-2xl overflow-hidden flex flex-col"
              style={{
                height: "480px",
                background: "white",
                border: "1px solid var(--border)",
                boxShadow:
                  "rgba(50,50,93,0.2) 0px 30px 60px -12px, rgba(0,0,0,0.12) 0px 18px 36px -18px",
              }}
            >
              {industries.map((industry, index) => (
                <div
                  key={industry.id}
                  className={`absolute inset-0 flex flex-col transition-all duration-500 ${
                    activeIndustry === index
                      ? "opacity-100 pointer-events-auto"
                      : "opacity-0 pointer-events-none"
                  }`}
                >
                  <CallSimulator industry={industry} isActive={started && activeIndustry === index} />
                </div>
              ))}
            </div>

            {/* Below card: trust note */}
            <p className="text-center text-[11px] text-body/40 mt-3 tracking-wide">
              Real AI conversations — powered by QuantaMend
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div className="hero-animate hero-d6 mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 pt-10 border-t border-border">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-light text-heading tracking-tight mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-body font-normal">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
