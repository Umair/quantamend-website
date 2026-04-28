"use client";

import { ArrowRight, Play, Pause, Stethoscope, Scale, Wrench, Monitor } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";

const stats = [
  { value: "$2.4M+", label: "Revenue Recovered" },
  { value: "37%", label: "Avg. Reactivation Rate" },
  { value: "14 min", label: "Avg. Time to First Booking" },
  { value: "100%", label: "Risk-Free Pilot Guarantee" },
];

type Message = {
  role: "ai" | "caller";
  text: string;
  /** approx duration in seconds this line takes to speak */
  duration: number;
};

type Industry = {
  id: string;
  label: string;
  icon: React.ElementType;
  businessName: string;
  messages: Message[];
};

const industries: Industry[] = [
  {
    id: "clinic",
    label: "Clinics",
    icon: Stethoscope,
    businessName: "Bright Smile Dental",
    messages: [
      { role: "ai",     text: "Thank you for calling Bright Smile Dental. I'm their AI receptionist — how can I help you today?", duration: 4.5 },
      { role: "caller", text: "Hi, I have a toothache that's been going on for a few days. I need to see someone soon.", duration: 4 },
      { role: "ai",     text: "I'm sorry to hear that. Let's get you seen quickly. Can I confirm — are you an existing patient with us?", duration: 4.5 },
      { role: "caller", text: "Yes, I came in about two years ago but haven't been back since.", duration: 3.5 },
      { role: "ai",     text: "Got it, I've found your record. Dr. Chen has an opening tomorrow at 10 AM — shall I book that for you?", duration: 4.5 },
      { role: "caller", text: "Yes, that works perfectly!", duration: 2 },
      { role: "ai",     text: "You're confirmed for tomorrow at 10 AM with Dr. Chen. A reminder text is heading your way now. Is there anything else I can help with?", duration: 6 },
    ],
  },
  {
    id: "lawfirm",
    label: "Law Firms",
    icon: Scale,
    businessName: "Hart & Sloan Injury Law",
    messages: [
      { role: "ai",     text: "Thank you for calling Hart and Sloan Injury Law. I'm their AI receptionist — how may I help you?", duration: 4.5 },
      { role: "caller", text: "Hi, I was recently in a car accident and I need to speak with an attorney.", duration: 3.5 },
      { role: "ai",     text: "I'm sorry to hear that. Can you tell me a little more about what happened?", duration: 3.5 },
      { role: "caller", text: "Yeah, I was rear-ended at a red light. The other driver ran it.", duration: 3 },
      { role: "ai",     text: "I understand — I can connect you with the right attorney. Can I get your full name and best phone number?", duration: 4.5 },
      { role: "caller", text: "James Thorne. My number is 512-555-0147.", duration: 3 },
      { role: "ai",     text: "Thank you James. I'm booking you a free consultation with Attorney Hart this Friday at 2 PM. You'll receive a confirmation text shortly.", duration: 6 },
    ],
  },
  {
    id: "plumbing",
    label: "Plumbing",
    icon: Wrench,
    businessName: "Summit Plumbing Co.",
    messages: [
      { role: "ai",     text: "Thanks for calling Summit Plumbing. I'm their AI assistant — what's happening today?", duration: 4 },
      { role: "caller", text: "I've got a burst pipe under my kitchen sink. Water is going everywhere.", duration: 3.5 },
      { role: "ai",     text: "That sounds urgent — I'm flagging this as an emergency dispatch right now. Can I get your address?", duration: 4 },
      { role: "caller", text: "3421 Maple Drive, Austin.", duration: 2 },
      { role: "ai",     text: "Got it. Can you shut off the water valve under the sink to stop the flow while we get someone out to you?", duration: 4.5 },
      { role: "caller", text: "Already done. How fast can someone get here?", duration: 2.5 },
      { role: "ai",     text: "Our nearest technician is 12 minutes away. He'll arrive by 3:45 PM — you'll get a text with his name and live ETA.", duration: 5 },
    ],
  },
  {
    id: "it",
    label: "IT & MSPs",
    icon: Monitor,
    businessName: "Apex IT Solutions",
    messages: [
      { role: "ai",     text: "Thank you for calling Apex IT Solutions. I'm the AI assistant — what can I help with?", duration: 4 },
      { role: "caller", text: "Our entire office network is down. Nobody can access anything.", duration: 3 },
      { role: "ai",     text: "That's a Priority 1 issue. I'm alerting our on-call engineer right now. What's your company name?", duration: 4 },
      { role: "caller", text: "Keller Financial Group.", duration: 1.5 },
      { role: "ai",     text: "Keller Financial — you're on our Managed Pro plan. Is this affecting all 23 workstations?", duration: 4 },
      { role: "caller", text: "Yes, everything is down. Even the phones.", duration: 2.5 },
      { role: "ai",     text: "Engineer Jake is being paged now and will call you within 5 minutes. I've created ticket number 4821 — check your email for the details.", duration: 6 },
    ],
  },
];

function formatTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function WaveformBars({ playing }: { playing: boolean }) {
  return (
    <div className="flex items-center gap-[3px] h-5">
      {[0.4, 0.7, 1.0, 0.6, 0.9, 0.5, 0.8, 0.4, 0.7, 0.5, 0.9, 0.6].map((h, i) => (
        <div
          key={i}
          className={`w-[3px] rounded-full bg-purple/50 transition-all ${playing ? "animate-pulse" : ""}`}
          style={{
            height: `${h * 20}px`,
            animationDelay: `${i * 80}ms`,
            animationDuration: `${600 + i * 50}ms`,
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [activeMessageIdx, setActiveMessageIdx] = useState(-1);
  const [spokenMessages, setSpokenMessages] = useState<number[]>([]);

  const synthRef = useRef<SpeechSynthesis | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const elapsedRef = useRef(0);
  const messageTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance[]>([]);

  const industry = industries[activeIdx];

  const totalDuration = industry.messages.reduce((sum, m) => sum + m.duration + 0.4, 0);

  const stopAll = useCallback(() => {
    if (synthRef.current) synthRef.current.cancel();
    if (timerRef.current) clearInterval(timerRef.current);
    if (messageTimerRef.current) clearTimeout(messageTimerRef.current);
    timerRef.current = null;
    messageTimerRef.current = null;
  }, []);

  const resetState = useCallback(() => {
    stopAll();
    setPlaying(false);
    setElapsed(0);
    elapsedRef.current = 0;
    setActiveMessageIdx(-1);
    setSpokenMessages([]);
  }, [stopAll]);

  // Switch industry
  const switchIndustry = useCallback((idx: number) => {
    if (idx === activeIdx) return;
    resetState();
    setActiveIdx(idx);
  }, [activeIdx, resetState]);

  // Start playback
  const startPlayback = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    synthRef.current = window.speechSynthesis;

    const voices = synthRef.current.getVoices();
    // Try to pick two distinct voices
    const aiVoice = voices.find(v => v.lang.startsWith("en") && v.name.toLowerCase().includes("google")) ||
                    voices.find(v => v.lang.startsWith("en-US")) ||
                    voices[0];
    const callerVoice = voices.find(v => v.lang.startsWith("en") && v !== aiVoice && v.name.toLowerCase().includes("uk")) ||
                        voices.find(v => v.lang.startsWith("en") && v !== aiVoice) ||
                        voices[1] || aiVoice;

    const msgs = industries[activeIdx].messages;
    utteranceRef.current = [];

    let cumulativeDelay = 0;

    msgs.forEach((msg, i) => {
      const u = new SpeechSynthesisUtterance(msg.text);
      u.voice = msg.role === "ai" ? (aiVoice || null) : (callerVoice || null);
      u.rate = msg.role === "ai" ? 1.05 : 0.95;
      u.pitch = msg.role === "ai" ? 1.1 : 0.9;
      u.volume = 1;

      const delayForThisMessage = cumulativeDelay;
      cumulativeDelay += msg.duration + 0.4;

      u.onstart = () => {
        setActiveMessageIdx(i);
        setSpokenMessages(prev => prev.includes(i) ? prev : [...prev, i]);
      };
      u.onend = () => {
        if (i === msgs.length - 1) {
          // Finished
          setPlaying(false);
          setActiveMessageIdx(-1);
          if (timerRef.current) clearInterval(timerRef.current);
        }
      };

      utteranceRef.current.push(u);

      // Queue with pause between messages
      if (i === 0) {
        synthRef.current!.speak(u);
      } else {
        // Add a pause utterance
        const pause = new SpeechSynthesisUtterance(" ");
        pause.rate = 0.1;
        pause.volume = 0;
        utteranceRef.current.push(pause);
        synthRef.current!.speak(pause);
        synthRef.current!.speak(u);
      }
    });

    // Start elapsed timer
    timerRef.current = setInterval(() => {
      elapsedRef.current += 0.1;
      if (elapsedRef.current >= totalDuration) {
        elapsedRef.current = totalDuration;
        clearInterval(timerRef.current!);
        timerRef.current = null;
      }
      setElapsed(elapsedRef.current);
    }, 100);

  }, [activeIdx, totalDuration]);

  const handlePlayPause = () => {
    if (typeof window === "undefined") return;
    if (!window.speechSynthesis) {
      alert("Your browser doesn't support audio playback for this demo. Try Chrome or Edge.");
      return;
    }

    if (playing) {
      // Pause
      window.speechSynthesis.pause();
      if (timerRef.current) clearInterval(timerRef.current);
      setPlaying(false);
    } else {
      // Resume or start fresh
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        timerRef.current = setInterval(() => {
          elapsedRef.current += 0.1;
          setElapsed(elapsedRef.current);
        }, 100);
      } else {
        // Fresh start
        resetState();
        setTimeout(() => {
          setPlaying(true);
          startPlayback();
        }, 50);
        return;
      }
      setPlaying(true);
    }
  };

  // Load voices async (Chrome loads them async)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
    return () => stopAll();
  }, [stopAll]);

  // Reset when switching industry
  useEffect(() => {
    resetState();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIdx]);

  const progressPct = Math.min((elapsed / totalDuration) * 100, 100);
  const transcriptRef = useRef<HTMLDivElement>(null);

  // Auto-scroll transcript
  useEffect(() => {
    if (transcriptRef.current) {
      const activeEl = transcriptRef.current.querySelector("[data-active='true']");
      activeEl?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [activeMessageIdx]);

  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 gradient-line-top" />
      <div className="absolute top-20 right-[-200px] w-[600px] h-[600px] bg-gradient-to-bl from-purple/[0.06] via-magenta/[0.03] to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-[-100px] w-[400px] h-[400px] bg-gradient-to-tr from-ruby/[0.04] to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-[1100px] mx-auto px-6">

        {/* ===== CENTERED HEADER ===== */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="hero-animate hero-d1 mb-7 flex justify-center">
            <span className="badge-success">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-success" />
              </span>
              Risk-Free AI Pilot: 100 Leads, $0 Upfront
            </span>
          </div>
          <h1 className="hero-animate hero-d2 display-hero mb-6">
            Your Past Clients Are Worth{" "}
            <span className="text-purple">$127,000.</span>
            <br />
            We&apos;ll Prove It. Free.
          </h1>
          <p className="hero-animate hero-d3 body-large mb-10 mx-auto max-w-2xl">
            QuantaMend&apos;s AI answers every call, reactivates dormant leads, and books paying
            appointments — automatically, in any language, 24/7. No staff required.
          </p>
          <div className="hero-animate hero-d4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#cta" className="btn-primary text-base py-3.5 px-8">
              <span>Activate My Dead Leads</span>
              <ArrowRight size={16} />
            </a>
            <a href="#how-it-works" className="btn-ghost text-base py-3.5 px-8">
              See How It Works
            </a>
          </div>
        </div>

        {/* ===== AUDIO DEMO PANEL ===== */}
        <div className="hero-animate hero-d5">
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              border: "1px solid var(--border)",
              boxShadow: "rgba(50,50,93,0.18) 0px 30px 60px -12px, rgba(0,0,0,0.10) 0px 18px 36px -18px",
              background: "white",
            }}
          >

            {/* ── TOP BAR: Player controls + industry tabs ── */}
            <div className="flex items-center gap-4 px-5 py-3.5 border-b border-[#e8edf4] bg-white">

              {/* Play/Pause button */}
              <button
                id="hero-play-btn"
                onClick={handlePlayPause}
                className="w-9 h-9 rounded-full bg-purple flex items-center justify-center text-white shrink-0 hover:bg-purple-hover transition-colors shadow-sm"
                aria-label={playing ? "Pause demo" : "Play demo"}
              >
                {playing ? <Pause size={14} /> : <Play size={14} className="translate-x-px" />}
              </button>

              {/* Waveform + progress */}
              <div className="flex-1 flex items-center gap-3 min-w-0">
                <WaveformBars playing={playing} />
                {/* Progress track */}
                <div
                  className="flex-1 h-1.5 bg-[#e8edf4] rounded-full overflow-hidden cursor-pointer"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const pct = (e.clientX - rect.left) / rect.width;
                    // Seeking isn't supported by speech synthesis, just show visually
                    const newElapsed = pct * totalDuration;
                    elapsedRef.current = newElapsed;
                    setElapsed(newElapsed);
                  }}
                >
                  <div
                    className="h-full bg-purple rounded-full transition-all duration-100"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
                <span className="text-[11px] font-mono text-body/50 shrink-0 tabular-nums">
                  {formatTime(elapsed)} / {formatTime(totalDuration)}
                </span>
              </div>

              {/* Industry tabs */}
              <div className="flex items-center gap-1.5 shrink-0">
                {industries.map((ind, i) => {
                  const Icon = ind.icon;
                  const isActive = activeIdx === i;
                  return (
                    <button
                      key={ind.id}
                      id={`audio-tab-${ind.id}`}
                      onClick={() => switchIndustry(i)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium border transition-all duration-200 whitespace-nowrap ${
                        isActive
                          ? "bg-purple text-white border-purple"
                          : "bg-white text-body/70 border-border hover:border-purple/30 hover:text-purple"
                      }`}
                    >
                      <Icon size={11} />
                      <span className="hidden md:inline">{ind.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── BODY: Left features + Right transcript ── */}
            <div className="flex" style={{ height: "340px" }}>

              {/* LEFT: Feature highlights */}
              <div className="hidden lg:flex flex-col justify-center gap-3 px-6 py-5 border-r border-[#e8edf4] w-[200px] shrink-0 bg-[#fafcff]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-body/40 mb-1">
                  AI Capabilities
                </p>
                {[
                  { label: "Smart Greeting", triggerAt: 0 },
                  { label: "Caller Intake", triggerAt: 1 },
                  { label: "Live Qualification", triggerAt: 2 },
                  { label: "Objection Handling", triggerAt: 3 },
                  { label: "Direct Booking", triggerAt: 5 },
                  { label: "Instant Confirmation", triggerAt: 6 },
                ].map((feat) => {
                  const isHighlighted = activeMessageIdx >= feat.triggerAt || spokenMessages.includes(feat.triggerAt);
                  return (
                    <div
                      key={feat.label}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-400 ${
                        isHighlighted
                          ? "bg-purple/[0.08] border border-purple/20"
                          : "border border-transparent"
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full transition-colors duration-400 ${
                          isHighlighted ? "bg-purple" : "bg-border"
                        }`}
                      />
                      <span
                        className={`text-[12px] font-medium transition-colors duration-400 ${
                          isHighlighted ? "text-purple" : "text-body/50"
                        }`}
                      >
                        {feat.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* RIGHT: Transcript */}
              <div className="flex-1 flex flex-col min-w-0">
                {/* Transcript header */}
                <div className="flex items-center justify-between px-5 py-2.5 border-b border-[#e8edf4]/60 bg-[#f9fafb]/60">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-body/40">
                    Live Transcript
                  </span>
                  <span className="text-[10px] text-body/40 font-medium">{industry.businessName}</span>
                </div>

                {/* Messages */}
                <div
                  ref={transcriptRef}
                  className="flex-1 overflow-y-auto px-5 py-4 space-y-4 bg-[#fafcff]"
                >
                  {/* Prompt to play if not started */}
                  {spokenMessages.length === 0 && !playing && (
                    <div className="flex flex-col items-center justify-center h-full gap-3 py-8 text-center">
                      <div className="w-12 h-12 rounded-full bg-purple/10 flex items-center justify-center">
                        <Play size={20} className="text-purple translate-x-0.5" />
                      </div>
                      <p className="text-sm text-body/60 font-medium">
                        Press play to hear a real AI call
                      </p>
                      <p className="text-xs text-body/40 max-w-xs">
                        The transcript will appear here in sync with the audio
                      </p>
                    </div>
                  )}

                  {/* Spoken messages */}
                  {spokenMessages.map((msgIdx) => {
                    const msg = industry.messages[msgIdx];
                    const isCurrentlyActive = activeMessageIdx === msgIdx;
                    return (
                      <div
                        key={msgIdx}
                        data-active={isCurrentlyActive}
                        className={`flex gap-3 items-start transition-all duration-300 ${
                          msg.role === "caller" ? "flex-row-reverse" : ""
                        }`}
                      >
                        {/* Avatar */}
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 transition-all duration-300 ${
                            msg.role === "ai"
                              ? isCurrentlyActive
                                ? "bg-purple text-white ring-2 ring-purple/30"
                                : "bg-purple/80 text-white"
                              : isCurrentlyActive
                              ? "bg-[#273951] text-white ring-2 ring-[#273951]/20"
                              : "bg-[#e8edf4] text-heading/60"
                          }`}
                        >
                          {msg.role === "ai" ? "AI" : "C"}
                        </div>

                        {/* Bubble */}
                        <div className="flex flex-col gap-1 max-w-[75%]">
                          <span
                            className={`text-[10px] font-semibold uppercase tracking-wider ${
                              msg.role === "ai" ? "text-purple/60" : "text-body/50 self-end"
                            }`}
                          >
                            {msg.role === "ai" ? "AI Receptionist" : "Caller"}
                          </span>
                          <div
                            className={`px-4 py-2.5 rounded-2xl text-[13px] leading-relaxed transition-all duration-300 ${
                              msg.role === "ai"
                                ? isCurrentlyActive
                                  ? "bg-white border-2 border-purple/30 text-heading rounded-tl-sm shadow-md"
                                  : "bg-white border border-[#e8edf4] text-heading rounded-tl-sm shadow-sm"
                                : isCurrentlyActive
                                ? "bg-purple text-white rounded-tr-sm shadow-md"
                                : "bg-purple/80 text-white rounded-tr-sm"
                            }`}
                          >
                            {msg.text}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Caption */}
          <p className="text-center text-[11px] text-body/35 mt-3 tracking-wide">
            Real AI voice calls — powered by QuantaMend &nbsp;·&nbsp; Press ▶ to hear it
          </p>
        </div>

        {/* ===== STATS ROW ===== */}
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
