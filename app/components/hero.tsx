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
  id: string; label: string; icon: React.ElementType;
  businessName: string; audioSrc: string | null; messages: Message[];
};

const industries: Industry[] = [
  {
    id: "clinic", label: "Clinics", icon: Stethoscope,
    businessName: "Bright Smile Dental", audioSrc: null,
    messages: [
      { role: "ai",     text: "Thank you for calling Bright Smile Dental. I'm their AI receptionist — how can I help you today?" },
      { role: "caller", text: "Hi, I have a toothache that's been going on for a few days. I need to see someone soon." },
      { role: "ai",     text: "I'm sorry to hear that. Let's get you seen quickly. Are you an existing patient with us?" },
      { role: "caller", text: "Yes, I came in about two years ago but haven't been back since." },
      { role: "ai",     text: "Got it, I've found your record. Dr. Chen has an opening tomorrow at 10 AM — shall I book that?" },
      { role: "caller", text: "Yes, that works perfectly!" },
      { role: "ai",     text: "You're confirmed for tomorrow at 10 AM with Dr. Chen. A reminder text is on its way now." },
    ],
  },
  {
    id: "lawfirm", label: "Law Firms", icon: Scale,
    businessName: "Hart & Sloan Injury Law", audioSrc: "/audio/demo-lawfirm.mp3",
    messages: [
      { role: "ai",     text: "Thank you for calling Hart and Sloan Injury Law. I'm their AI receptionist — how may I help you?" },
      { role: "caller", text: "Hi, I was recently in a car accident and I need to speak with an attorney." },
      { role: "ai",     text: "I'm sorry to hear that. Can you tell me a little more about what happened?" },
      { role: "caller", text: "Yeah, I was rear-ended at a red light. The other driver ran it." },
      { role: "ai",     text: "I understand. Can I get your full name and best phone number?" },
      { role: "caller", text: "James Thorne. My number is 512-555-0147." },
      { role: "ai",     text: "Thank you James. I'm booking you a free consultation with Attorney Hart this Friday at 2 PM." },
    ],
  },
  {
    id: "plumbing", label: "Plumbing", icon: Wrench,
    businessName: "Summit Plumbing Co.", audioSrc: "/audio/demo-plumbing.mp3",
    messages: [
      { role: "ai",     text: "Thanks for calling Summit Plumbing. I'm their AI assistant — what's happening today?" },
      { role: "caller", text: "I've got a burst pipe under my kitchen sink. Water is going everywhere." },
      { role: "ai",     text: "That sounds urgent — flagging this as an emergency dispatch right now. Can I get your address?" },
      { role: "caller", text: "3421 Maple Drive, Austin." },
      { role: "ai",     text: "Can you shut off the valve under the sink to stop the flow while we dispatch?" },
      { role: "caller", text: "Already done. How fast can someone get here?" },
      { role: "ai",     text: "Our nearest tech is 12 minutes away — you'll get a text with his name and live ETA." },
    ],
  },
  {
    id: "it", label: "IT & MSPs", icon: Monitor,
    businessName: "Apex IT Solutions", audioSrc: "/audio/demo-it.mp3",
    messages: [
      { role: "ai",     text: "Thank you for calling Apex IT Solutions. I'm the AI assistant — what can I help with?" },
      { role: "caller", text: "Our entire office network is down. Nobody can access anything." },
      { role: "ai",     text: "That's Priority 1. I'm alerting our on-call engineer right now. Company name?" },
      { role: "caller", text: "Keller Financial Group." },
      { role: "ai",     text: "Keller Financial — you're on Managed Pro. Is this affecting all 23 workstations?" },
      { role: "caller", text: "Yes, everything is down. Even the phones." },
      { role: "ai",     text: "Engineer Jake is being paged now and will call you in 5 minutes. Ticket #4821 created." },
    ],
  },
];

const CAPABILITIES = [
  { label: "Smart Greeting",      at: 0 },
  { label: "Caller Intake",       at: 1 },
  { label: "Live Qualification",  at: 2 },
  { label: "Objection Handling",  at: 3 },
  { label: "Direct Booking",      at: 5 },
  { label: "Instant Confirmation",at: 6 },
];

function formatTime(sec: number) {
  if (!isFinite(sec) || sec < 0) return "0:00";
  return `${Math.floor(sec / 60)}:${String(Math.floor(sec % 60)).padStart(2, "0")}`;
}

function WaveformBars({ playing }: { playing: boolean }) {
  const h = [0.4,0.7,1.0,0.6,0.9,0.5,0.8,0.45,0.7,0.5,0.9,0.6,0.75,0.45,0.85];
  return (
    <div className="flex items-center gap-[2px] h-5 shrink-0">
      {h.map((v, i) => (
        <div key={i} className={`w-[3px] rounded-full ${playing ? "bg-purple" : "bg-purple/30"}`}
          style={{ height: `${v*20}px`, animation: playing ? `wvbounce ${580+i*40}ms ease-in-out ${i*55}ms infinite alternate` : "none" }} />
      ))}
    </div>
  );
}

export default function Hero() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null); // null = "Let us show you" state
  const [playing, setPlaying]         = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration]       = useState(0);
  const [visibleCount, setVisibleCount] = useState(0);

  const audioRef     = useRef<HTMLAudioElement | null>(null);
  const ttsTimerRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const ttsElapsed   = useRef(0);
  const transcriptEl = useRef<HTMLDivElement>(null);

  const industry = selectedIdx !== null ? industries[selectedIdx] : null;
  const hasAudio = !!industry?.audioSrc;

  /* ── stop everything ── */
  const stopAll = useCallback(() => {
    audioRef.current?.pause();
    if (typeof window !== "undefined") window.speechSynthesis?.cancel();
    if (ttsTimerRef.current) { clearInterval(ttsTimerRef.current); ttsTimerRef.current = null; }
  }, []);

  /* ── TTS playback for Clinics ── */
  const startTTS = useCallback((msgs: Message[]) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const voices = window.speechSynthesis.getVoices();
    const ai  = voices.find(v => v.lang.startsWith("en-US") && /google/i.test(v.name)) || voices.find(v => v.lang.startsWith("en")) || null;
    const cal = voices.find(v => v.lang.startsWith("en") && v !== ai) || null;
    const TOTAL = msgs.reduce((s, m) => s + m.text.split(" ").length * 0.38 + 0.5, 0);
    setDuration(TOTAL);
    ttsElapsed.current = 0;
    setCurrentTime(0);
    setVisibleCount(0);
    let idx = 0;
    const next = () => {
      if (idx >= msgs.length) { setPlaying(false); clearInterval(ttsTimerRef.current!); return; }
      const u = new SpeechSynthesisUtterance(msgs[idx].text);
      u.voice = msgs[idx].role === "ai" ? ai : cal;
      u.rate  = msgs[idx].role === "ai" ? 1.05 : 0.95;
      u.pitch = msgs[idx].role === "ai" ? 1.1 : 0.9;
      setVisibleCount(idx + 1);
      idx++;
      u.onend = () => setTimeout(next, 280);
      window.speechSynthesis.speak(u);
    };
    next();
    ttsTimerRef.current = setInterval(() => {
      ttsElapsed.current += 0.1;
      setCurrentTime(Math.min(ttsElapsed.current, TOTAL));
      if (ttsElapsed.current >= TOTAL) clearInterval(ttsTimerRef.current!);
    }, 100);
  }, []);

  /* ── wire real audio element events ── */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration > 0) {
        const pct = audio.currentTime / audio.duration;
        setVisibleCount(Math.min(Math.ceil(pct * industry!.messages.length * 1.1), industry!.messages.length));
      }
    };
    const onMeta  = () => setDuration(audio.duration);
    const onEnded = () => { setPlaying(false); setVisibleCount(industry!.messages.length); };
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("ended", onEnded);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIdx]);

  /* ── auto-scroll transcript ── */
  useEffect(() => {
    transcriptEl.current?.querySelector("[data-last='true']")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [visibleCount]);

  /* ── cleanup ── */
  useEffect(() => () => stopAll(), [stopAll]);

  /* ── select industry + auto-play ── */
  const selectIndustry = (idx: number) => {
    stopAll();
    setPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setVisibleCount(0);
    setSelectedIdx(idx);
    const ind = industries[idx];
    // defer so DOM updates (audio element re-renders) before we play
    setTimeout(() => {
      if (ind.audioSrc) {
        audioRef.current?.play().catch(() => {});
        setPlaying(true);
      } else {
        setPlaying(true);
        startTTS(ind.messages);
      }
    }, 80);
  };

  const handlePlayPause = () => {
    if (selectedIdx === null) return;
    if (hasAudio) {
      if (playing) { audioRef.current?.pause(); setPlaying(false); }
      else { audioRef.current?.play().catch(() => {}); setPlaying(true); }
    } else {
      if (playing) {
        window.speechSynthesis?.pause();
        if (ttsTimerRef.current) { clearInterval(ttsTimerRef.current); ttsTimerRef.current = null; }
        setPlaying(false);
      } else {
        if (window.speechSynthesis?.paused) {
          window.speechSynthesis.resume();
          ttsTimerRef.current = setInterval(() => { ttsElapsed.current += 0.1; setCurrentTime(ttsElapsed.current); }, 100);
          setPlaying(true);
        } else {
          setPlaying(true);
          startTTS(industry!.messages);
        }
      }
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hasAudio || !audioRef.current || !duration) return;
    const pct = Math.max(0, Math.min(1, (e.clientX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.getBoundingClientRect().width));
    audioRef.current.currentTime = pct * duration;
    setCurrentTime(pct * duration);
  };

  const progressPct = duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0;

  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
      <style>{`
        @keyframes wvbounce { from { transform:scaleY(0.35); } to { transform:scaleY(1); } }
        @keyframes msgIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
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
            Your Past Clients Are Worth <span className="text-purple">$127,000.</span>
            <br />We&apos;ll Prove It. Free.
          </h1>
          <p className="hero-animate hero-d3 body-large mb-10 mx-auto max-w-2xl">
            QuantaMend&apos;s AI answers every call, reactivates dormant leads, and books paying
            appointments — automatically, in any language, 24/7. No staff required.
          </p>
          <div className="hero-animate hero-d4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#cta" className="btn-primary text-base py-3.5 px-8">
              <span>Activate My Dead Leads</span><ArrowRight size={16} />
            </a>
            <a href="#how-it-works" className="btn-ghost text-base py-3.5 px-8">See How It Works</a>
          </div>
        </div>

        {/* Demo panel */}
        <div className="hero-animate hero-d5">

          {/* Hidden audio element — keyed per industry so it re-mounts */}
          {industry?.audioSrc && (
            <audio key={industry.id} ref={audioRef} src={industry.audioSrc} preload="metadata" />
          )}

          <div className="rounded-2xl overflow-hidden" style={{
            border: "1px solid var(--border)",
            boxShadow: "rgba(50,50,93,0.18) 0px 30px 60px -12px, rgba(0,0,0,0.10) 0px 18px 36px -18px",
            background: "white",
          }}>

            {/* Top bar */}
            <div className="flex items-center gap-4 px-5 py-3.5 border-b border-[#e8edf4] bg-white">
              <button id="hero-play-btn" onClick={handlePlayPause} disabled={selectedIdx === null}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-white shrink-0 transition-colors shadow-sm ${selectedIdx === null ? "bg-purple/30 cursor-not-allowed" : "bg-purple hover:bg-purple-hover"}`}
                aria-label={playing ? "Pause" : "Play"}>
                {playing ? <Pause size={14} fill="white" /> : <Play size={14} fill="white" className="translate-x-px" />}
              </button>

              <WaveformBars playing={playing} />

              <div className="flex-1 h-1.5 bg-[#e8edf4] rounded-full overflow-hidden cursor-pointer" onClick={handleSeek}>
                <div className="h-full bg-purple rounded-full transition-all duration-150" style={{ width: `${progressPct}%` }} />
              </div>

              <span className="text-[11px] font-mono text-body/50 shrink-0 tabular-nums">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>

              <div className="flex items-center gap-1.5 shrink-0">
                {industries.map((ind, i) => {
                  const Icon = ind.icon;
                  const isActive = selectedIdx === i;
                  return (
                    <button key={ind.id} id={`audio-tab-${ind.id}`} onClick={() => selectIndustry(i)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium border transition-all duration-200 whitespace-nowrap ${isActive ? "bg-purple text-white border-purple" : "bg-white text-body/70 border-border hover:border-purple/30 hover:text-purple"}`}>
                      <Icon size={11} />
                      <span className="hidden md:inline">{ind.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Body */}
            <div className="flex" style={{ height: "340px" }}>

              {/* Left: AI Capabilities */}
              <div className="hidden lg:flex flex-col justify-center gap-2 px-6 py-5 border-r border-[#e8edf4] w-[196px] shrink-0 bg-[#fafcff]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-body/40 mb-2">AI Capabilities</p>
                {CAPABILITIES.map((feat) => {
                  const lit = visibleCount > feat.at && selectedIdx !== null;
                  return (
                    <div key={feat.label} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-500 ${lit ? "bg-purple/[0.08] border border-purple/20" : "border border-transparent"}`}>
                      <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${lit ? "bg-purple" : "bg-[#e8edf4]"}`} />
                      <span className={`text-[12px] font-medium transition-colors duration-500 ${lit ? "text-purple" : "text-body/40"}`}>{feat.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* Right: Transcript or "Let us show you" */}
              <div className="flex-1 flex flex-col min-w-0">
                {selectedIdx !== null && (
                  <div className="flex items-center justify-between px-5 py-2.5 border-b border-[#e8edf4]/60 bg-[#f9fafb]/60">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-body/40">Live Transcript</span>
                    <span className="text-[10px] text-body/40 font-medium">{industry!.businessName}</span>
                  </div>
                )}

                <div ref={transcriptEl} className="flex-1 overflow-y-auto px-5 py-4 bg-[#fafcff]">

                  {/* ── Initial "Let us show you" state ── */}
                  {selectedIdx === null && (
                    <div className="flex flex-col items-center justify-center h-full gap-5 text-center px-4">
                      <div>
                        <p className="text-xl font-light text-heading tracking-tight mb-1">Let us show you.</p>
                        <p className="text-sm text-body/60">Select an industry to play a real demo.</p>
                      </div>
                      <div className="flex flex-wrap justify-center gap-2.5">
                        {industries.map((ind, i) => {
                          const Icon = ind.icon;
                          return (
                            <button key={ind.id} onClick={() => selectIndustry(i)}
                              className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-border text-sm font-medium text-body/70 bg-white hover:border-purple/40 hover:text-purple hover:bg-purple/[0.04] transition-all duration-200">
                              <Icon size={13} />{ind.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* ── Transcript messages ── */}
                  {selectedIdx !== null && (
                    <div className="space-y-4 pt-1">
                      {industry!.messages.slice(0, visibleCount).map((msg, i) => (
                        <div key={i} data-last={i === visibleCount - 1}
                          className={`flex gap-3 items-start ${msg.role === "caller" ? "flex-row-reverse" : ""}`}
                          style={{ animation: "msgIn 0.35s ease forwards" }}>
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${msg.role === "ai" ? "bg-purple text-white" : "bg-[#e8edf4] text-heading/70"}`}>
                            {msg.role === "ai" ? "AI" : "C"}
                          </div>
                          <div className="flex flex-col gap-1 max-w-[75%]">
                            <span className={`text-[10px] font-semibold uppercase tracking-wider ${msg.role === "ai" ? "text-purple/60" : "text-body/50 self-end"}`}>
                              {msg.role === "ai" ? "AI Receptionist" : "Caller"}
                            </span>
                            <div className={`px-4 py-2.5 rounded-2xl text-[13px] leading-relaxed ${msg.role === "ai" ? "bg-white border border-[#e8edf4] text-heading rounded-tl-sm shadow-sm" : "bg-purple text-white rounded-tr-sm"}`}>
                              {msg.text}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-[11px] text-body/35 mt-3 tracking-wide">
            Real AI voice calls — powered by QuantaMend
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
    </section>
  );
}
