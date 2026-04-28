"use client";

import { ArrowRight, Play, Pause, Stethoscope, Scale, Wrench, Monitor, Heart, Phone, Calendar, Globe, Zap, RefreshCw } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";

type Message = { role: "ai" | "caller"; text: string };
type Industry = {
  id: string; label: string; icon: React.ElementType;
  businessName: string; audioSrc: string | null;
  messages: Message[];
  cues?: number[]; // seconds at which each message should appear in the audio
};

const industries: Industry[] = [
  {
    id: "lawfirm", label: "Law Firms", icon: Scale,
    businessName: "Hart & Sloan Injury Law", audioSrc: "/audio/demo-lawfirm.mp3",
    // Exact timestamps from Whisper transcription of demo-lawfirm.mp3
    cues: [0, 6.18, 10.32, 14.70, 23.52, 28.38, 65.20, 133.90],
    messages: [
      { role: "ai",     text: "Thank you for calling Hart & Sloan Injury Law. I'm their AI receptionist. How may I help you?" },
      { role: "caller", text: "Hi, I was recently in a car accident and need an attorney." },
      { role: "ai",     text: "Can you tell me a little more about the situation?" },
      { role: "caller", text: "I was rear-ended at a red light. It was the other driver's fault." },
      { role: "ai",     text: "Let's gather some details to assist you. Can I start by getting your full name?" },
      { role: "caller", text: "Ashley Johnson." },
      { role: "ai",     text: "The next step is scheduling a brief call with our intake specialist. There's no cost — we work on a contingency basis." },
      { role: "ai",     text: "You're confirmed for this Friday at 10 AM with our intake specialist. You'll get a confirmation email shortly." },
    ],
  },
  {
    id: "clinic", label: "Clinics", icon: Stethoscope,
    businessName: "Bright Smile Dental", audioSrc: null,
    messages: [
      { role: "ai",     text: "Thank you for calling Bright Smile Dental — I'm their AI receptionist. How can I help?" },
      { role: "caller", text: "Hi, I have a bad toothache and need to see someone as soon as possible." },
      { role: "ai",     text: "I'm sorry to hear that. Are you an existing patient with the practice?" },
      { role: "caller", text: "Yes, I came in about two years ago." },
      { role: "ai",     text: "Found your record. Dr. Chen has an opening tomorrow at 10 AM. Shall I book that for you?" },
      { role: "caller", text: "Yes, that works perfectly." },
      { role: "ai",     text: "Done — you're confirmed for tomorrow at 10 AM. A reminder text is on its way now." },
    ],
  },
  {
    id: "plumbing", label: "Plumbing", icon: Wrench,
    businessName: "Mountain View Plumbing", audioSrc: "/audio/demo-plumbing-new.mp3",
    // Exact timestamps from Whisper transcription of demo-plumbing-new.mp3
    cues: [0, 5.34, 17.14, 29.16, 45.06, 61.92, 80.02, 129.20],
    messages: [
      { role: "ai",     text: "Thank you for calling Mountain View Plumbing. How may I help you?" },
      { role: "caller", text: "Hi, I have no hot water. My water heater stopped working — I bought it from you guys 5 years ago." },
      { role: "ai",     text: "I'm sorry to hear that. If it's only 5 years old it should still be under warranty. Just a few quick questions." },
      { role: "ai",     text: "Are you the homeowner or the person responsible for the property?" },
      { role: "caller", text: "Yeah, it's a Rheem — Rheem Performance Platinum." },
      { role: "caller", text: "It's Ryan Whitmore." },
      { role: "ai",     text: "Same-day appointments are available at no extra charge during normal business hours, 9 to 5." },
      { role: "ai",     text: "The earliest we have available is today at 2 PM. Does that work for you?" },
    ],
  },
  {
    id: "it", label: "IT", icon: Monitor,
    businessName: "Cyberguard Solutions", audioSrc: "/audio/demo-it.mp3",
    // Exact timestamps from Whisper transcription of demo-it.mp3
    cues: [0, 7.18, 16.70, 22.12, 27.84, 52.52, 81.42, 101.54],
    messages: [
      { role: "ai",     text: "Thank you for calling Cyberguard Solutions. This is the AI receptionist. How may I help you?" },
      { role: "caller", text: "We're seeking a consultation for a network security audit. We're concerned about a possible system breach." },
      { role: "ai",     text: "Before we proceed, are you a new client or have you worked with us before?" },
      { role: "caller", text: "We would be a new client." },
      { role: "caller", text: "It's Max Garfield." },
      { role: "ai",     text: "You're seeking a security audit and are concerned about a system breach — this aligns with our vulnerability assessment and managed security services." },
      { role: "caller", text: "We use a few tools, but our primary line of defense is CrowdStrike." },
      { role: "ai",     text: "Thank you, Max. Your details will be passed along to our security team and we'll follow up if we can help." },
    ],
  },
];


const FEATURE_CARDS = [
  { icon: Heart,      label: "AI Empathy"          },
  { icon: Phone,      label: "Lead Intake"          },
  { icon: Zap,        label: "Live Qualification"   },
  { icon: Calendar,   label: "Appointment Booking"  },
  { icon: RefreshCw,  label: "Lead Reactivation"    },
  { icon: Globe,      label: "Multilingual"         },
];

function fmt(s: number) {
  if (!isFinite(s) || s < 0) return "0:00";
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

function Waveform({ active }: { active: boolean }) {
  const hs = [0.35,0.65,1,0.55,0.85,0.45,0.75,0.4,0.7,0.5,0.9,0.6,0.8,0.45,0.7];
  return (
    <div className="flex items-center gap-[2px] h-[18px] shrink-0">
      {hs.map((h, i) => (
        <div key={i} style={{
          width: 3, height: h * 18,
          borderRadius: 9,
          background: active ? "var(--stripe-purple)" : "#c8cfe0",
          animation: active ? `wb ${540 + i * 38}ms ease-in-out ${i * 52}ms infinite alternate` : "none",
        }} />
      ))}
    </div>
  );
}

export default function Hero() {
  const [selIdx, setSelIdx] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [cur, setCur] = useState(0);
  const [dur, setDur] = useState(0);
  const [vis, setVis] = useState(0);

  const audioRef    = useRef<HTMLAudioElement | null>(null);
  const ttsTimer    = useRef<ReturnType<typeof setInterval> | null>(null);
  const ttsEl       = useRef(0);
  const transcriptR = useRef<HTMLDivElement>(null);
  const voicesRef   = useRef<SpeechSynthesisVoice[]>([]);

  const ind     = selIdx !== null ? industries[selIdx] : null;
  const hasAudio = !!ind?.audioSrc;

  const stopAll = useCallback(() => {
    audioRef.current?.pause();
    if (typeof window !== "undefined") window.speechSynthesis?.cancel();
    if (ttsTimer.current) { clearInterval(ttsTimer.current); ttsTimer.current = null; }
  }, []);

  // Pre-load TTS voices and warm up the synthesis engine to prevent first-utterance stutter
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const load = () => {
      voicesRef.current = window.speechSynthesis.getVoices();
      // Warm up Chrome's audio pipeline with a silent utterance — prevents the shaking first word
      if (voicesRef.current.length > 0) {
        const wu = new SpeechSynthesisUtterance(" ");
        wu.volume = 0;
        wu.rate = 2;
        window.speechSynthesis.speak(wu);
      }
    };
    load();
    window.speechSynthesis.addEventListener("voiceschanged", load);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", load);
  }, []);

  // Audio events
  useEffect(() => {
    const a = audioRef.current;
    if (!a || !hasAudio) return;
    const onT = () => {
      setCur(a.currentTime);
      if (a.duration > 0) {
        const cues = ind?.cues;
        if (cues && cues.length > 0) {
          // Use explicit timestamps: count how many cues have passed
          setVis(cues.filter(t => a.currentTime >= t).length);
        } else {
          // Fallback linear formula for TTS-backed industries
          setVis(Math.min(Math.ceil((a.currentTime / a.duration) * (ind?.messages.length ?? 7) * 1.1), ind?.messages.length ?? 7));
        }
      }
    };
    const onM = () => setDur(a.duration);
    const onE = () => { setPlaying(false); setVis(ind?.messages.length ?? 7); };
    a.addEventListener("timeupdate", onT);
    a.addEventListener("loadedmetadata", onM);
    a.addEventListener("ended", onE);
    return () => { a.removeEventListener("timeupdate", onT); a.removeEventListener("loadedmetadata", onM); a.removeEventListener("ended", onE); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selIdx]);

  useEffect(() => () => stopAll(), [stopAll]);

  // Auto-scroll
  useEffect(() => {
    transcriptR.current?.querySelector("[data-last='true']")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [vis]);

  const startTTS = useCallback((msgs: Message[]) => {
    if (typeof window === "undefined") return;
    window.speechSynthesis?.cancel();
    const vs = voicesRef.current.length > 0 ? voicesRef.current : window.speechSynthesis.getVoices();
    // Prefer high-quality Google online voices; fall back to any en-US then any en
    const aiVoice = vs.find(v => /google us english/i.test(v.name))
      || vs.find(v => /google uk english female/i.test(v.name))
      || vs.find(v => v.lang === "en-US" && !v.localService)
      || vs.find(v => /samantha/i.test(v.name))
      || vs.find(v => v.lang.startsWith("en-US"))
      || null;
    const callerVoice = vs.find(v => /google uk english male/i.test(v.name))
      || vs.find(v => v.lang === "en-US" && !v.localService && v !== aiVoice)
      || vs.find(v => /alex/i.test(v.name))
      || vs.find(v => v.lang.startsWith("en") && v !== aiVoice)
      || null;
    const TOT = msgs.reduce((s, m) => s + m.text.split(" ").length * 0.38 + 0.5, 0);
    setDur(TOT); ttsEl.current = 0; setCur(0); setVis(0);
    let idx = 0;
    const next = () => {
      if (idx >= msgs.length) { setPlaying(false); return; }
      const u = new SpeechSynthesisUtterance(msgs[idx].text);
      u.voice = msgs[idx].role === "ai" ? aiVoice : callerVoice;
      u.rate  = msgs[idx].role === "ai" ? 0.95 : 0.88;  // slower = more natural
      u.pitch = msgs[idx].role === "ai" ? 1.0  : 0.95;  // 1.0 not 1.1 — removes thin/scary tone
      u.volume = 1;
      setVis(idx + 1); idx++;
      u.onend = () => setTimeout(next, 320);
      window.speechSynthesis.speak(u);
    };
    next();
    ttsTimer.current = setInterval(() => { ttsEl.current += 0.1; setCur(Math.min(ttsEl.current, TOT)); if (ttsEl.current >= TOT) clearInterval(ttsTimer.current!); }, 100);
  }, []);

  const pick = (i: number) => {
    stopAll(); setPlaying(false); setCur(0); setDur(0); setVis(0); setSelIdx(i);
    setTimeout(() => {
      const iind = industries[i];
      if (iind.audioSrc) { audioRef.current?.play().catch(() => {}); setPlaying(true); }
      else { setPlaying(true); startTTS(iind.messages); }
    }, 80);
  };

  const togglePlay = () => {
    if (selIdx === null) return;
    if (hasAudio) {
      if (playing) { audioRef.current?.pause(); setPlaying(false); }
      else { audioRef.current?.play().catch(() => {}); setPlaying(true); }
    } else {
      if (playing) { window.speechSynthesis?.pause(); setPlaying(false); }
      else if (window.speechSynthesis?.paused) { window.speechSynthesis.resume(); setPlaying(true); }
      else { setPlaying(true); startTTS(ind!.messages); }
    }
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hasAudio || !audioRef.current || !dur) return;
    const rect = e.currentTarget.getBoundingClientRect();
    audioRef.current.currentTime = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)) * dur;
  };

  const pct = dur > 0 ? Math.min((cur / dur) * 100, 100) : 0;


  return (
    <section style={{ background: "#f5f1eb" }} className="relative overflow-hidden">
      <style>{`
        @keyframes wb { from { transform:scaleY(.3); } to { transform:scaleY(1); } }
        @keyframes ln { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:none; } }
        .hero-tabs-desktop { display:flex; gap:6px; }
        .hero-tabs-mobile  { display:none; }
        .demo-body { display:flex; height:360px; }
        @media(max-width:767px){
          .hero-tabs-desktop { display:none; }
          .hero-tabs-mobile  { display:flex; overflow-x:auto; gap:8px; padding:10px 14px;
                               border-bottom:1px solid #edf0f5; scrollbar-width:none; }
          .hero-tabs-mobile::-webkit-scrollbar { display:none; }
          .demo-body { height:auto; min-height:260px; }
          .hero-text  { text-align:center; }
          .hero-sub   { margin-left:auto; margin-right:auto; }
          .hero-ctas  { width:100%; }
        }
      `}</style>

      {/* ── Headline ── */}
      <div className="max-w-[1100px] mx-auto px-6 pt-28 pb-12 lg:px-8 lg:pt-40 lg:pb-16">
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16">
          <div className="flex-1 min-w-0 hero-text">
            <h1 style={{ fontSize:"clamp(2rem,5vw,3.6rem)", lineHeight:1.08, fontWeight:800, color:"#0f1523", letterSpacing:"-0.03em" }} className="mb-5">
              Your AI receptionist<br />for every missed call.<br />
              <span style={{ color:"#533afd" }}>Always on, 24/7.</span>
            </h1>
            <p className="hero-sub" style={{ fontSize:"1.05rem", color:"#4a5568", lineHeight:1.7, maxWidth:520 }}>
              QuantaMend AI receptionists answer every call, qualify leads, book appointments,
              and reactivate dormant clients — automatically, in any language, around the clock.
            </p>
          </div>
          <div className="hero-ctas mt-7 lg:mt-3 flex flex-col gap-3 lg:w-[320px] shrink-0">
            <a href="#cta" className="btn-primary text-base py-3.5 px-8 justify-center">
              Start my free pilot <ArrowRight size={15} />
            </a>
            <a href="#how-it-works" className="btn-ghost text-base py-3.5 px-8 justify-center">
              See how it works
            </a>
            <p style={{ fontSize:"0.78rem", color:"#888", textAlign:"center" }}>100 calls handled · zero risk · cancel any time</p>
          </div>
        </div>
      </div>

      {/* ── Demo panel ── */}
      <div className="max-w-[1100px] mx-auto px-4 pb-16 lg:px-8 lg:pb-20">
        {ind?.audioSrc && <audio key={ind.id} ref={audioRef} src={ind.audioSrc} preload="metadata" />}

        <div style={{ background:"#fff", borderRadius:16, border:"1px solid #e2e8f0", boxShadow:"0 24px 64px rgba(0,0,0,.08)" }} className="overflow-hidden">

          {/* Player bar */}
          <div style={{ borderBottom:"1px solid #edf0f5", padding:"11px 14px" }} className="flex items-center gap-3">
            <button id="hero-play-btn" onClick={togglePlay} disabled={selIdx===null}
              style={{ width:34, height:34, borderRadius:"50%", flexShrink:0,
                background:selIdx===null?"#c5c9f5":"#533afd", border:"none",
                cursor:selIdx===null?"not-allowed":"pointer",
                display:"flex", alignItems:"center", justifyContent:"center" }}>
              {playing ? <Pause size={12} color="#fff" fill="#fff"/> : <Play size={12} color="#fff" fill="#fff" style={{marginLeft:2}}/>}
            </button>
            <Waveform active={playing}/>
            <div style={{ flex:1, height:4, background:"#edf0f5", borderRadius:9, cursor:"pointer", overflow:"hidden" }} onClick={seek}>
              <div style={{ height:"100%", width:`${pct}%`, background:"#533afd", borderRadius:9, transition:"width .15s linear" }}/>
            </div>
            <span style={{ fontSize:11, fontFamily:"monospace", color:"#9aa0b0", whiteSpace:"nowrap", flexShrink:0 }}>{fmt(cur)} / {fmt(dur)}</span>
            {/* Desktop-only tabs in the bar */}
            <div className="hero-tabs-desktop">
              {industries.map((x,i)=>{ const Icon=x.icon; const on=selIdx===i; return (
                <button key={x.id} id={`tab-${x.id}`} onClick={()=>pick(i)} style={{
                  display:"flex", alignItems:"center", gap:5, padding:"5px 11px",
                  borderRadius:20, fontSize:12, fontWeight:500, border:"1px solid",
                  borderColor:on?"#533afd":"#dde3ed", background:on?"#533afd":"#fff",
                  color:on?"#fff":"#64748d", cursor:"pointer", whiteSpace:"nowrap", transition:"all .18s" }}>
                  <Icon size={10}/><span>{x.label}</span>
                </button>
              );})}
            </div>
          </div>

          {/* Mobile-only tabs row */}
          <div className="hero-tabs-mobile">
            {industries.map((x,i)=>{ const Icon=x.icon; const on=selIdx===i; return (
              <button key={x.id} onClick={()=>pick(i)} style={{
                display:"flex", alignItems:"center", gap:5, padding:"6px 13px",
                borderRadius:20, fontSize:12, fontWeight:500, border:"1px solid", flexShrink:0,
                borderColor:on?"#533afd":"#dde3ed", background:on?"#533afd":"#fff",
                color:on?"#fff":"#64748d", cursor:"pointer", whiteSpace:"nowrap" }}>
                <Icon size={11}/>{x.label}
              </button>
            );})}
          </div>

          {/* Body */}
          <div className="demo-body">
            {/* Left feature cards — desktop only */}
            <div style={{ width:240, borderRight:"1px solid #edf0f5", background:"#fafbfe", padding:"20px 16px", flexDirection:"column", gap:8, flexShrink:0 }} className="hidden lg:flex">
              {selIdx===null ? (
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%", gap:10, textAlign:"center" }}>
                  <p style={{ fontWeight:700, fontSize:"1.05rem", color:"#0f1523" }}>Let us show you.</p>
                  <p style={{ fontSize:"0.8rem", color:"#9aa0b0" }}>Select an industry to play a real demo.</p>
                </div>
              ) : (
                <>
                  <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"#b0b8cc", marginBottom:4 }}>AI Capabilities</p>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                    {FEATURE_CARDS.map((fc,fi)=>{ const lit=vis>fi; const Icon=fc.icon; return (
                      <div key={fc.label} style={{ padding:"10px 8px", borderRadius:10, border:`1px solid ${lit?"#c5c9f5":"#edf0f5"}`, background:lit?"#f0f0fe":"#fff", display:"flex", flexDirection:"column", alignItems:"center", gap:6, transition:"all .4s" }}>
                        <Icon size={16} color={lit?"#533afd":"#c0c8d8"} strokeWidth={1.8}/>
                        <span style={{ fontSize:10, fontWeight:600, color:lit?"#533afd":"#b0b8cc", textAlign:"center", lineHeight:1.3 }}>{fc.label}</span>
                      </div>
                    );})}
                  </div>
                </>
              )}
            </div>

            {/* Transcript / idle */}
            <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
              {selIdx===null ? (
                <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:18, padding:"24px 20px", textAlign:"center" }}>
                  <div>
                    <p style={{ fontWeight:700, fontSize:"1.25rem", color:"#0f1523", marginBottom:6 }}>Let us show you.</p>
                    <p style={{ fontSize:"0.88rem", color:"#9aa0b0" }}>Select an industry to play a real demo.</p>
                  </div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:10, justifyContent:"center" }}>
                    {industries.map((x,i)=>{ const Icon=x.icon; return (
                      <button key={x.id} onClick={()=>pick(i)} style={{
                        display:"flex", alignItems:"center", gap:7, padding:"9px 16px",
                        borderRadius:24, border:"1px solid #dde3ed", background:"#fff",
                        fontSize:13, fontWeight:500, color:"#4a5568", cursor:"pointer" }}
                        onMouseEnter={e=>{ (e.currentTarget as HTMLButtonElement).style.borderColor="#533afd"; (e.currentTarget as HTMLButtonElement).style.color="#533afd"; }}
                        onMouseLeave={e=>{ (e.currentTarget as HTMLButtonElement).style.borderColor="#dde3ed"; (e.currentTarget as HTMLButtonElement).style.color="#4a5568"; }}>
                        <Icon size={14}/>{x.label}
                      </button>
                    );})}
                  </div>
                </div>
              ) : (
                <>
                  <div style={{ padding:"9px 16px", borderBottom:"1px solid #edf0f5", background:"#fafbfe", display:"flex", justifyContent:"space-between" }}>
                    <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"#b0b8cc" }}>Live Transcript</span>
                    <span style={{ fontSize:11, color:"#b0b8cc" }}>{ind!.businessName}</span>
                  </div>
                  <div ref={transcriptR} style={{ flex:1, overflowY:"auto", padding:"14px 18px", display:"flex", flexDirection:"column", gap:14 }}>
                    {ind!.messages.slice(0,vis).map((msg,i)=>(
                      <div key={i} data-last={i===vis-1} style={{ animation:"ln .3s ease forwards" }}>
                        <div style={{ fontSize:10, fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:msg.role==="ai"?"#533afd":"#9aa0b0", marginBottom:3, display:"flex", alignItems:"center", gap:5 }}>
                          {msg.role==="ai" ? <><span style={{ display:"inline-block",width:6,height:6,borderRadius:"50%",background:"#533afd" }}/>Agent</> : "Caller"}
                        </div>
                        <p style={{ fontSize:13.5, color:"#1a202c", lineHeight:1.65, margin:0, paddingLeft:msg.role==="ai"?0:12 }}>{msg.text}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <p style={{ textAlign:"center", fontSize:11, color:"#b0b8cc", marginTop:10 }}>
          Real AI voice calls — powered by QuantaMend
        </p>
      </div>
    </section>
  );
}
