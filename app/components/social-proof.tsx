"use client";

const logos = [
  { src: "https://cdn.prod.website-files.com/5b15ca3d02dd414c89ecc3ed/69b88e8c1d34fcc6ca7b72d8_Frame%204060.avif", alt: "CMIT Solutions",        w: 152 },
  { src: "https://cdn.prod.website-files.com/5b15ca3d02dd414c89ecc3ed/69b88e8ba09d77c209b95af9_Frame%204061.avif", alt: "Dallo Law",              w: 86  },
  { src: "https://cdn.prod.website-files.com/5b15ca3d02dd414c89ecc3ed/69b88e8c12598e6c3dd42be7_Frame%204062.avif", alt: "Express Legal Funding",  w: 122 },
  { src: "https://cdn.prod.website-files.com/5b15ca3d02dd414c89ecc3ed/69b88e8cd9bad86153a79e71_Frame%204063.avif", alt: "Kimbrough Legal",        w: 120 },
  { src: "https://cdn.prod.website-files.com/5b15ca3d02dd414c89ecc3ed/69b88e8b664115e1976b2376_Frame%204064.avif", alt: "Nyman IP Law Firm",      w: 126 },
  { src: "https://cdn.prod.website-files.com/5b15ca3d02dd414c89ecc3ed/69b88e8cb2d3807130c9ca4e_Frame%204057.avif", alt: "Alloy Wealth Management",w: 134 },
  { src: "https://cdn.prod.website-files.com/5b15ca3d02dd414c89ecc3ed/69b88e8ca17f035697b56dfc_Frame%204058.avif", alt: "AttorneySync",           w: 153 },
  { src: "https://cdn.prod.website-files.com/5b15ca3d02dd414c89ecc3ed/69b88e8b848021414416cfa3_Frame%204059.avif", alt: "BenGlassLaw",            w: 144 },
];

export default function SocialProof() {
  return (
    <section style={{ background: "#f5f1eb", padding: "28px 0", borderTop: "1px solid #e8e0d5", borderBottom: "1px solid #e8e0d5", overflow: "hidden" }}>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .logo-track {
          display: flex;
          align-items: center;
          gap: 56px;
          width: max-content;
          animation: marquee 28s linear infinite;
        }
        .logo-track:hover { animation-play-state: paused; }
      `}</style>

      <p style={{ textAlign: "center", fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#b0a898", marginBottom: 20 }}>
        Trusted by leading practices
      </p>

      <div style={{ position: "relative" }}>
        {/* Fade masks */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 120, background: "linear-gradient(to right, #f5f1eb, transparent)", zIndex: 2, pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 120, background: "linear-gradient(to left, #f5f1eb, transparent)", zIndex: 2, pointerEvents: "none" }} />

        <div className="logo-track">
          {/* Two copies for seamless loop */}
          {[...logos, ...logos].map((logo, i) => (
            <div key={i} style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt={i < logos.length ? logo.alt : ""}
                aria-hidden={i >= logos.length}
                width={logo.w}
                height={40}
                style={{ height: 36, width: "auto", objectFit: "contain", filter: "grayscale(100%) opacity(0.7)", transition: "filter .2s" }}
                onMouseEnter={e => (e.currentTarget.style.filter = "grayscale(0%) opacity(1)")}
                onMouseLeave={e => (e.currentTarget.style.filter = "grayscale(100%) opacity(0.7)")}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
