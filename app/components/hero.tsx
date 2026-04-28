"use client";

import { ArrowRight, Play, Pause, Stethoscope, Scale, Wrench, Monitor } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";

const stats = [
  { value: "$2.4M+", label: "Revenue Recovered" },
  { value: "37%", label: "Avg. Reactivation Rate" },
  { value: "14 min", label: "Avg. Time to First Booking" },
  { value: "100%", label: "Risk-Free Pilot Guarantee" },
];

type Message = { role: "ai" | "caller"; text: string };

type Industry = {
  id: string;
  label: string;
  icon: React.ElementType;
  businessName: string;
  audioSrc: string | null;
  messages: Message[];
};

const industries: Industry[] = [
  {
    id: "clinic",
    label: "Clinics",
    icon: Stethoscope,
    businessName: "Bright Smile Dental",
    audioSrc: null,
    messages: [
      { role: "ai", text: "Thank you for calling Bright Smile Dental. I'm their AI receptionist — how can I help you today?" },
      { role: "caller", text: "Hi, I have a toothache that's been going on for a few days. I need to see someone soon." },
      { role: "ai", text: "I'm sorry to hear that. Let's get you seen quickly. Are you an existing patient with us?" },
      { role: "caller", text: "Yes, I came in about two years ago but haven't been back since." },
      { role: "ai", text: "Got it, I've found your record. Dr. Chen has an opening tomorrow at 10 AM — shall I book that?" },
      { role: "caller", text: "Yes, that works perfectly!" },
      { role: "ai", text: "You're confirmed for tomorrow at 10 AM with Dr. Chen. A reminder text is on its way now." },
    ],
  },
  {
    id: "lawfirm",
    label: "Law Firms",
    icon: Scale,
    businessName: "Hart & Sloan Injury Law",
    audioSrc: "/audio/demo-lawfirm.mp3",
    messages: [
      { role: "ai", text: "Thank you for calling Hart and Sloan Injury Law. I'm their AI receptionist — how may I help you?" },
      { role: "caller", text: "Hi, I was recently in a car accident and I need to speak with an attorney." },
      { role: "ai", text: "I'm sorry to hear that. Can you tell me a little more about what happened?" },
      { role: "caller", text: "Yeah, I was rear-ended at a red light. The other driver ran it." },
      { role: "ai", text: "I understand. Can I get your full name and best phone number?" },
      { role: "caller", text: "James Thorne. My number is 512-555-0147." },
      { role: "ai", text: "Thank you James. I'm booking you a free consultation with Attorney Hart this Friday at 2 PM." },
    ],
  },
  {
    id: "plumbing",
    label: "Plumbing",
    icon: Wrench,
    businessName: "Summit Plumbing Co.",
    audioSrc: "/audio/demo-plumbing.mp3",
    messages: [
      { role: "ai", text: "Thanks for calling Summit Plumbing. I'm their AI assistant — what's happening today?" },
      { role: "caller", text: "I've got a burst pipe under my kitchen sink. Water is going everywhere." },
      { role: "ai", text: "That sounds urgent — flagging this as an emergency dispatch right now. Can I get your address?" },
      { role: "caller", text: "3421 Maple Drive, Austin." },
      { role: "ai", text: "Can you shut off the valve under the sink to stop the flow while we dispatch?" },
      { role: "caller", text: "Already done. How fast can someone get here?" },
      { role: "ai", text: "Our nearest tech is 12 minutes away — you'll get a text with his name and live ETA." },
    ],
  },
  {
    id: "it",
    label: "IT & MSPs",
    icon: Monitor,
    businessName: "Apex IT Solutions",
    audioSrc: "/audio/demo-it.mp3",
    messages: [
      { role: "ai", text: "Thank you for calling Apex IT Solutions. I'm the AI assistant — what can I help with?" },
      { role: "caller", text: "Our entire office network is down. Nobody can access anything." },
      { role: "ai", text: "That's Priority 1. I'm alerting our on-call engineer right now. Company name?" },
      { role: "caller", text: "Keller Financial Group." },
      { role: "ai", text: "Keller Financial — you're on Managed Pro. Is this affecting all 23 workstations?" },
      { role: "caller", text: "Yes, everything is down. Even the phones." },
      { role: "ai", text: "Engineer Jake is being paged now and will call you within 5 minutes. Ticket #4821 created." },
    ],
  },
];

function formatTime(sec: number) {
  if (!isFinite(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function WaveformBars({ playing }: { playing: boolean }) {
  const heights = [0.4, 0.7, 1.0, 0.6, 0.9, 0.5, 0.8, 0.4, 0.7, 0.5, 0.9, 0.6, 0.75, 0.45, 0.85];
  return (
    <div className="flex items-center gap-[2px] h-5 shrink-0">
      {heights.map((h, i) => (
        <div
          key={i}
          className={`w-[3px] rounded-full transition-all duration-300 ${playing ? "bg-purple" : "bg-purple/30"}`}
          style={{
            height: `${h * 20}px`,
            animation: playing ? `waveform-bounce ${600 + i * 40}ms ease-in-out infinite alternate` : "none",
            animationDelay: `${i * 60}ms`,
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [visibleMsgCount, setVisibleMsgCount] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthRef = useRef<SpeechSynthesisUtterance[]>([]);
  const ttsTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const ttsElapsedRef = useRef(0);

  const industry = industries[activeIdx];
  const hasRealAudio = !!industry.audioSrc;

  // ── Stop everything ──
  const stopAll = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (ttsTimerRef.current) {
      clearInterval(ttsTimerRef.current);
      ttsTimerRef.current = null;
    }
    ttsElapsedRef.current = 0;
  }, []);

  // ── Reset UI state ──
  const resetState = useCallback(() => {
    stopAll();
    setPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setVisibleMsgCount(0);
  }, [stopAll]);

  // ── Switch industry ──
  const switchIndustry = useCallback((idx: number) => {
    if (idx === activeIdx) return;
    resetState();
    setActiveIdx(idx);
  }, [activeIdx, resetState]);

  // ── Wire up audio element events ──
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !hasRealAudio) return;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      // Reveal transcript messages proportionally
      if (audio.duration > 0) {
        const pct = audio.currentTime / audio.duration;
        const total = industry.messages.length;
        const count = Math.floor(pct * total * 1.15); // slightly ahead so text keeps up
        setVisibleMsgCount(Math.min(count, total));
      }
    };
    const onLoaded = () => setDuration(audio.duration);
    const onEnded = () => {
      setPlaying(false);
      setVisibleMsgCount(industry.messages.length);
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
    };
  }, [activeIdx, hasRealAudio, industry.messages.length]);

  // ── Cleanup on unmount ──
  useEffect(() => () => stopAll(), [stopAll]);

  // ── TTS for Clinics (no real audio) ──
  const startTTS = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const voices = window.speechSynthesis.getVoices();
    const aiVoice = voices.find(v => v.lang.startsWith("en-US") && v.name.includes("Google")) || voices.find(v => v.lang.startsWith("en")) || null;
    const callerVoice = voices.find(v => v.lang.startsWith("en") && v !== aiVoice) || null;
    const msgs = industry.messages;
    const TOTAL = msgs.reduce((s, m) => s + m.text.split(" ").length * 0.38 + 0.5, 0);
    setDuration(TOTAL);

    ttsElapsedRef.current = 0;
    let msgIdx = 0;
    setVisibleMsgCount(0);

    const speakNext = () => {
      if (msgIdx >= msgs.length) {
        setPlaying(false);
        clearInterval(ttsTimerRef.current!);
        return;
      }
      const u = new SpeechSynthesisUtterance(msgs[msgIdx].text);
      u.voice = msgs[msgIdx].role === "ai" ? aiVoice : callerVoice;
      u.rate = msgs[msgIdx].role === "ai" ? 1.05 : 0.95;
      u.pitch = msgs[msgIdx].role === "ai" ? 1.1 : 0.9;
      setVisibleMsgCount(msgIdx + 1);
      msgIdx++;
      u.onend = () => { setTimeout(speakNext, 300); };
      window.speechSynthesis.speak(u);
    };
    speakNext();

    // elapsed timer for progress bar
    ttsTimerRef.current = setInterval(() => {
      ttsElapsedRef.current += 0.1;
      setCurrentTime(ttsElapsedRef.current);
      if (ttsElapsedRef.current >= TOTAL) clearInterval(ttsTimerRef.current!);
    }, 100);
  }, [industry.messages]);

  // ── Play / Pause ──
  const handlePlayPause = () => {
    if (hasRealAudio) {
      const audio = audioRef.current;
      if (!audio) return;
      if (playing) {
        audio.pause();
        setPlaying(false);
      } else {
        audio.play().catch(() => {});
        setPlaying(true);
      }
    } else {
      // TTS
      if (playing) {
        window.speechSynthesis?.pause();
        if (ttsTimerRef.current) clearInterval(ttsTimerRef.current);
        setPlaying(false);
      } else {
        if (window.speechSynthesis?.paused) {
          window.speechSynthesis.resume();
          ttsTimerRef.current = setInterval(() => {
            ttsElapsedRef.current += 0.1;
            setCurrentTime(ttsElapsedRef.current);
          }, 100);
          setPlaying(true);
        } else {
          resetState();
          setTimeout(() => { setPlaying(true); startTTS(); }, 50);
        }
      }
    }
  };

  // ── Seek (real audio only) ──
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hasRealAudio || !audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audioRef.current.currentTime = pct * duration;
    setCurrentTime(pct * duration);
  };

  const progressPct = duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0;
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = transcriptRef.current?.querySelector("[data-last='true']");
    el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [visibleMsgCount]);

  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
      <style>{`
        @keyframes waveform-bounce {
          from { transform: scaleY(0.4); }
          to   { transform: scaleY(1); }
        }
      `}</style>

      <div className="absolute top-0 left-0 right-0 gradient-line-top" />
      <div className="absolute top-20 right-[-200px] w-[600px] h-[600px] bg-gradient-to-bl from-purple/[0.06] via-magenta/[0.03] to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-[-100px] w-[400px] h-[400px] bg-gradient-to-tr from-ruby/[0.04] to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-[1100px] mx-auto px-6">

        {/* Header */}
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
            <br />We&apos;ll Prove It. Free.
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

        {/* Audio Demo Panel */}
        <div className="hero-animate hero-d5">
          {/* Hidden audio element — swapped per industry */}
          {hasRealAudio && (
            <audio
              key={industry.id}
              ref={audioRef}
              src={industry.audioSrc!}
              preload="metadata"
            />
          )}

          <div className="rounded-2xl overflow-hidden" style={{
            border: "1px solid var(--border)",
            boxShadow: "rgba(50,50,93,0.18) 0px 30px 60px -12px, rgba(0,0,0,0.10) 0px 18px 36px -18px",
            background: "white",
          }}>

            {/* ── Top bar: player + industry tabs ── */}
            <div className="flex items-center gap-4 px-5 py-3.5 border-b border-[#e8edf4] bg-white">

              {/* Play/Pause */}
              <button
                id="hero-play-btn"
                onClick={handlePlayPause}
                className="w-9 h-9 rounded-full bg-purple flex items-center justify-center text-white shrink-0 hover:bg-purple-hover transition-colors shadow-sm"
                aria-label={playing ? "Pause" : "Play demo call"}
              >
                {playing ? <Pause size={14} fill="white" /> : <Play size={14} fill="white" className="translate-x-px" />}
              </button>

              {/* Waveform */}
              <WaveformBars playing={playing} />

              {/* Progress bar */}
              <div
                className="flex-1 h-1.5 bg-[#e8edf4] rounded-full overflow-hidden cursor-pointer"
                onClick={handleSeek}
              >
                <div
                  className="h-full bg-purple rounded-full transition-all duration-200"
                  style={{ width: `${progressPct}%` }}
                />
              </div>

              {/* Time */}
              <span className="text-[11px] font-mono text-body/50 shrink-0 tabular-nums">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>

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

            {/* ── Body: left capabilities + right transcript ── */}
            <div className="flex" style={{ height: "340px" }}>

              {/* Left: AI capability labels */}
              <div className="hidden lg:flex flex-col justify-center gap-2 px-6 py-5 border-r border-[#e8edf4] w-[196px] shrink-0 bg-[#fafcff]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-body/40 mb-2">AI Capabilities</p>
                {[
                  { label: "Smart Greeting",      at: 0 },
                  { label: "Caller Intake",        at: 1 },
                  { label: "Live Qualification",   at: 2 },
                  { label: "Objection Handling",   at: 3 },
                  { label: "Direct Booking",       at: 5 },
                  { label: "Instant Confirmation", at: 6 },
                ].map((feat) => {
                  const active = visibleMsgCount > feat.at;
                  return (
                    <div key={feat.label} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-500 ${active ? "bg-purple/[0.08] border border-purple/20" : "border border-transparent"}`}>
                      <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${active ? "bg-purple" : "bg-[#e8edf4]"}`} />
                      <span className={`text-[12px] font-medium transition-colors duration-500 ${active ? "text-purple" : "text-body/40"}`}>{feat.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* Right: transcript */}
              <div className="flex-1 flex flex-col min-w-0">
                <div className="flex items-center justify-between px-5 py-2.5 border-b border-[#e8edf4]/60 bg-[#f9fafb]/60">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-body/40">Live Transcript</span>
                  <span className="text-[10px] text-body/40 font-medium">{industry.businessName}</span>
                </div>

                <div ref={transcriptRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4 bg-[#fafcff]">
                  {visibleMsgCount === 0 && (
                    <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
                      <div className="w-12 h-12 rounded-full bg-purple/10 flex items-center justify-center">
                        <Play size={20} className="text-purple translate-x-0.5" />
                      </div>
                      <p className="text-sm text-body/60 font-medium">Press play to hear a real AI call</p>
                      <p className="text-xs text-body/40 max-w-[260px]">The transcript appears here in sync with the audio</p>
                    </div>
                  )}

                  {industry.messages.slice(0, visibleMsgCount).map((msg, i) => {
                    const isLast = i === visibleMsgCount - 1;
                    return (
                      <div
                        key={i}
                        data-last={isLast}
                        className={`flex gap-3 items-start ${msg.role === "caller" ? "flex-row-reverse" : ""}`}
                        style={{ animation: "fadeSlideUp 0.35s ease forwards" }}
                      >
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${msg.role === "ai" ? "bg-purple text-white" : "bg-[#e8edf4] text-heading/70"}`}>
                          {msg.role === "ai" ? "AI" : "C"}
                        </div>
                        <div className="flex flex-col gap-1 max-w-[75%]">
                          <span className={`text-[10px] font-semibold uppercase tracking-wider ${msg.role === "ai" ? "text-purple/60" : "text-body/50 self-end"}`}>
                            {msg.role === "ai" ? "AI Receptionist" : "Caller"}
                          </span>
                          <div className={`px-4 py-2.5 rounded-2xl text-[13px] leading-relaxed ${
                            msg.role === "ai"
                              ? "bg-white border border-[#e8edf4] text-heading rounded-tl-sm shadow-sm"
                              : "bg-purple text-white rounded-tr-sm"
                          }`}>
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

          <p className="text-center text-[11px] text-body/35 mt-3 tracking-wide">
            Real AI voice calls — powered by QuantaMend &nbsp;·&nbsp; Press ▶ to listen
          </p>
        </div>

        {/* Stats */}
        <div className="hero-animate hero-d6 mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 pt-10 border-t border-border">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-light text-heading tracking-tight mb-1">{stat.value}</div>
                <div className="text-sm text-body font-normal">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
