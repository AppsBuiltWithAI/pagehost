import React, { useState as useStateP2 } from 'react';
import { Reveal, ArrowRight, Check, Plus, Logo, PromptBox } from './part1.jsx';
/* ============= TEMPLATE PREVIEWS: illustrated mini-app mockups ============= */
function TemplatePreview({ kind }) {
  // Each preview is a stylised browser-window snapshot of the actual template UI.
  const Frame = ({ children, bg = "#fff" }) => (
    <svg viewBox="0 0 400 300" className="tpl-preview-svg" preserveAspectRatio="xMidYMid meet">
      <defs>
        <filter id={"tps-" + kind} x="-5%" y="-5%" width="110%" height="115%">
          <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#1A0F22" floodOpacity="0.18"/>
        </filter>
      </defs>
      <g filter={`url(#tps-${kind})`}>
        <rect x="30" y="22" width="340" height="256" rx="14" fill={bg}/>
        {/* mini browser chrome */}
        <g>
          <circle cx="46" cy="38" r="3.2" fill="#FF5C4D"/>
          <circle cx="56" cy="38" r="3.2" fill="#FFC53D"/>
          <circle cx="66" cy="38" r="3.2" fill="#1FB295"/>
          <rect x="86" y="32" width="200" height="12" rx="6" fill="#F5EFE3"/>
        </g>
        {children}
      </g>
    </svg>
  );

  if (kind === "bakery") return (
    <Frame bg="#FFF5E6">
      <text x="50" y="78" fontFamily="Instrument Serif, serif" fontSize="22" fill="#3a1410">Crumb &amp; Co.</text>
      <text x="50" y="95" fontFamily="Geist Mono, monospace" fontSize="8" fill="#6e2a1c" letterSpacing="1.2">SOURDOUGH · PASTRIES</text>
      {/* product cards */}
      {[0,1,2].map(i => (
        <g key={i} transform={`translate(${50 + i*102}, 115)`}>
          <rect width="92" height="92" rx="10" fill="#FFD9A8"/>
          <circle cx="46" cy="40" r="22" fill="#c0784a"/>
          <circle cx="46" cy="40" r="14" fill="#6e2a1c" opacity=".7"/>
          <rect x="10" y="72" width="50" height="6" rx="3" fill="#3a1410"/>
          <rect x="10" y="82" width="30" height="4" rx="2" fill="#3a1410" opacity=".5"/>
        </g>
      ))}
      <rect x="50" y="226" width="300" height="32" rx="8" fill="#3a1410"/>
      <text x="200" y="246" fontFamily="Geist, sans-serif" fontSize="11" fontWeight="600" fill="#FFD9A8" textAnchor="middle">Pick up Saturday · $24.50</text>
    </Frame>
  );

  if (kind === "portal") return (
    <Frame bg="#F4F8FC">
      <text x="50" y="78" fontFamily="Instrument Serif, serif" fontSize="20" fill="#102a3d">Welcome back, Anna</text>
      <text x="50" y="93" fontFamily="Geist, sans-serif" fontSize="9" fill="#1c4a73">3 sessions this month</text>
      {/* stat cards */}
      {[
        {n: "12", l: "Sessions"},
        {n: "$840", l: "Invoiced"},
        {n: "94%", l: "Progress"},
      ].map((s, i) => (
        <g key={i} transform={`translate(${50 + i*102}, 108)`}>
          <rect width="92" height="60" rx="10" fill="#fff" stroke="#DCEDFB"/>
          <text x="14" y="34" fontFamily="Instrument Serif, serif" fontSize="22" fill="#102a3d" fontWeight="500">{s.n}</text>
          <text x="14" y="50" fontFamily="Geist Mono, monospace" fontSize="7" fill="#1c4a73" letterSpacing="0.8">{s.l.toUpperCase()}</text>
        </g>
      ))}
      {/* upcoming session */}
      <g transform="translate(50, 184)">
        <rect width="300" height="62" rx="12" fill="#6FA8E0"/>
        <text x="16" y="22" fontFamily="Geist Mono, monospace" fontSize="8" fill="#fff" letterSpacing="1.2" opacity=".9">NEXT SESSION</text>
        <text x="16" y="42" fontFamily="Instrument Serif, serif" fontSize="16" fill="#fff">Q3 strategy review</text>
        <text x="16" y="54" fontFamily="Geist, sans-serif" fontSize="9" fill="#fff" opacity=".85">Thursday · 2:00 PM</text>
      </g>
    </Frame>
  );

  if (kind === "yoga") return (
    <Frame bg="#FBE4ED">
      <text x="50" y="78" fontFamily="Instrument Serif, serif" fontStyle="italic" fontSize="22" fill="#1F1A2E">Stillpoint</text>
      <text x="50" y="93" fontFamily="Geist Mono, monospace" fontSize="8" fill="#4C3A5C" letterSpacing="1.2">THIS WEEK</text>
      {/* day grid */}
      {["M","T","W","T","F","S","S"].map((d, i) => (
        <g key={i} transform={`translate(${50 + i*43}, 108)`}>
          <text x="18" y="0" fontFamily="Geist Mono, monospace" fontSize="8" fill="#4C3A5C" textAnchor="middle">{d}</text>
        </g>
      ))}
      {[
        {x: 1, y: 0, fill: "#E892B5"},
        {x: 0, y: 1, fill: "#4C3A5C"},
        {x: 3, y: 1, fill: "#E892B5"},
        {x: 5, y: 0, fill: "#1F1A2E"},
        {x: 2, y: 2, fill: "#E892B5"},
        {x: 4, y: 2, fill: "#4C3A5C"},
      ].map((c, i) => (
        <rect key={i} x={50 + c.x*43 + 2} y={120 + c.y*30} width="36" height="22" rx="6" fill={c.fill}/>
      ))}
      <g transform="translate(50, 218)">
        <rect width="300" height="40" rx="10" fill="#1F1A2E"/>
        <text x="14" y="18" fontFamily="Geist Mono, monospace" fontSize="7" fill="#E892B5" letterSpacing="1.2">FRI · 6:30 PM</text>
        <text x="14" y="33" fontFamily="Instrument Serif, serif" fontSize="14" fill="#FBE4ED" fontStyle="italic">Slow Flow · 3 spots left</text>
      </g>
    </Frame>
  );

  if (kind === "shop") return (
    <Frame bg="#EAF7F2">
      <text x="50" y="78" fontFamily="Instrument Serif, serif" fontSize="22" fill="#0F3A33">Tiny Shop</text>
      <text x="50" y="93" fontFamily="Geist, sans-serif" fontSize="9" fill="#0F3A33" opacity=".7">Weekend drop · 12 pieces</text>
      {/* products */}
      {[
        {bg: "#1FB295", price: "$28"},
        {bg: "#DFF6EE", price: "$42"},
        {bg: "#0F3A33", price: "$36"},
      ].map((p, i) => (
        <g key={i} transform={`translate(${50 + i*102}, 108)`}>
          <rect width="92" height="100" rx="12" fill={p.bg}/>
          <circle cx="46" cy="50" r="26" fill="#fff" opacity={p.bg === "#DFF6EE" ? "0" : "0.85"}/>
          <circle cx="46" cy="50" r="18" fill={p.bg}/>
          <rect x="62" y="82" width="22" height="12" rx="6" fill="#fff" opacity=".95"/>
          <text x="73" y="91" fontFamily="Geist Mono, monospace" fontSize="7" fontWeight="600" fill={p.bg} textAnchor="middle">{p.price}</text>
        </g>
      ))}
      <rect x="50" y="226" width="180" height="32" rx="999" fill="#0F3A33"/>
      <text x="140" y="247" fontFamily="Geist, sans-serif" fontSize="11" fontWeight="600" fill="#DFF6EE" textAnchor="middle">Add to cart →</text>
      <text x="260" y="246" fontFamily="Geist Mono, monospace" fontSize="9" fill="#0F3A33">3 of 12 left</text>
    </Frame>
  );

  if (kind === "book") return (
    <Frame bg="#FFF1CB">
      <text x="50" y="78" fontFamily="Instrument Serif, serif" fontSize="22" fill="#3a2a14">Page Turners</text>
      <text x="50" y="93" fontFamily="Geist Mono, monospace" fontSize="8" fill="#7d5a32" letterSpacing="1.2">SEPTEMBER PICK</text>
      {/* book stack */}
      <g transform="translate(50, 108)">
        <rect width="78" height="110" rx="3" fill="#3a2a14"/>
        <rect x="6" y="6" width="66" height="98" rx="2" fill="#7d5a32"/>
        <line x1="12" y1="22" x2="66" y2="22" stroke="#fff1cb" strokeWidth="1.5"/>
        <line x1="12" y1="30" x2="56" y2="30" stroke="#fff1cb" strokeWidth="1.5" opacity=".7"/>
        <text x="39" y="60" fontFamily="Instrument Serif, serif" fontStyle="italic" fontSize="11" fill="#fff1cb" textAnchor="middle">The</text>
        <text x="39" y="75" fontFamily="Instrument Serif, serif" fontSize="13" fill="#fff1cb" textAnchor="middle">Overstory</text>
        <line x1="12" y1="90" x2="66" y2="90" stroke="#fff1cb" strokeWidth="1" opacity=".5"/>
        <text x="39" y="100" fontFamily="Geist Mono, monospace" fontSize="6" fill="#fff1cb" textAnchor="middle" letterSpacing="0.8">R. POWERS</text>
      </g>
      <g transform="translate(146, 110)">
        <text x="0" y="14" fontFamily="Instrument Serif, serif" fontSize="14" fill="#3a2a14">14 members reading</text>
        <text x="0" y="32" fontFamily="Geist, sans-serif" fontSize="10" fill="#7d5a32">Next meet · Thu 7pm</text>
        {/* reader avatars */}
        {["#d6a85a", "#3a2a14", "#fff1cb", "#7d5a32", "#d6a85a"].map((c, i) => (
          <circle key={i} cx={10 + i*18} cy="56" r="10" fill={c} stroke="#FFF1CB" strokeWidth="2"/>
        ))}
        <rect x="0" y="80" width="180" height="32" rx="8" fill="#3a2a14"/>
        <text x="90" y="100" fontFamily="Geist, sans-serif" fontSize="11" fontWeight="600" fill="#fff1cb" textAnchor="middle">Join discussion →</text>
      </g>
    </Frame>
  );

  if (kind === "event") return (
    <Frame bg="#1A1A1F">
      <text x="50" y="80" fontFamily="Instrument Serif, serif" fontSize="26" fill="#FBE4ED">Devon turns 30</text>
      <text x="50" y="100" fontFamily="Geist Mono, monospace" fontSize="9" fill="#E892B5" letterSpacing="1.4">FRI · OCT 4 · 8PM</text>
      <text x="50" y="116" fontFamily="Geist, sans-serif" fontSize="9.5" fill="#fff" opacity=".7">The Knitting Factory · Brooklyn</text>
      {/* rsvp pill */}
      <g transform="translate(50, 134)">
        <rect width="116" height="36" rx="999" fill="#E892B5"/>
        <text x="58" y="23" fontFamily="Geist, sans-serif" fontSize="12" fontWeight="700" fill="#1A1A1F" textAnchor="middle">I'm in ✓</text>
        <rect x="124" y="0" width="116" height="36" rx="999" fill="none" stroke="#fff" strokeOpacity=".4"/>
        <text x="182" y="23" fontFamily="Geist, sans-serif" fontSize="12" fontWeight="500" fill="#fff" textAnchor="middle">Can't make it</text>
      </g>
      {/* attendees */}
      <g transform="translate(50, 188)">
        <text x="0" y="0" fontFamily="Geist Mono, monospace" fontSize="8" fill="#E892B5" letterSpacing="1.2">28 GOING</text>
        {["#FBE4ED","#E892B5","#9a4e74","#fff","#FBE4ED","#E892B5"].map((c, i) => (
          <circle key={i} cx={10 + i*16} cy="20" r="9" fill={c} stroke="#1A1A1F" strokeWidth="2"/>
        ))}
        <text x={10 + 6*16 + 12} y="24" fontFamily="Geist, sans-serif" fontSize="9" fill="#fff" opacity=".6">+ 22 more</text>
      </g>
    </Frame>
  );

  if (kind === "pet") return (
    <Frame bg="#F3EAFC">
      <text x="50" y="78" fontFamily="Instrument Serif, serif" fontSize="22" fill="#2a1a3d">PawPal</text>
      <text x="50" y="93" fontFamily="Geist Mono, monospace" fontSize="8" fill="#5d3a83" letterSpacing="1.2">BOOK A SITTER</text>
      {/* date picker */}
      <g transform="translate(50, 106)">
        {[1,2,3,4,5,6,7].map((d, i) => (
          <g key={d} transform={`translate(${i*43}, 0)`}>
            <rect width="36" height="46" rx="8" fill={d === 4 ? "#5d3a83" : "#fff"} stroke="#b78ec9" strokeOpacity=".5"/>
            <text x="18" y="16" fontFamily="Geist Mono, monospace" fontSize="7" fill={d === 4 ? "#b78ec9" : "#5d3a83"} textAnchor="middle">OCT</text>
            <text x="18" y="34" fontFamily="Instrument Serif, serif" fontSize="16" fill={d === 4 ? "#fff" : "#2a1a3d"} textAnchor="middle">{d + 3}</text>
          </g>
        ))}
      </g>
      {/* pet card */}
      <g transform="translate(50, 168)">
        <rect width="300" height="72" rx="14" fill="#fff" stroke="#b78ec9" strokeOpacity=".4"/>
        <circle cx="36" cy="36" r="22" fill="#b78ec9"/>
        <text x="36" y="42" fontSize="22" textAnchor="middle">🐕</text>
        <text x="74" y="32" fontFamily="Instrument Serif, serif" fontSize="16" fill="#2a1a3d">Biscuit · Goldendoodle</text>
        <text x="74" y="48" fontFamily="Geist, sans-serif" fontSize="10" fill="#5d3a83">3 walks · feeding · meds</text>
        <rect x="218" y="22" width="68" height="28" rx="999" fill="#5d3a83"/>
        <text x="252" y="40" fontFamily="Geist, sans-serif" fontSize="10" fontWeight="600" fill="#fff" textAnchor="middle">Book →</text>
      </g>
    </Frame>
  );

  if (kind === "invoice") return (
    <Frame bg="#fff">
      <text x="50" y="76" fontFamily="Instrument Serif, serif" fontSize="22" fill="#142a3d">Invoice #024</text>
      <text x="350" y="76" fontFamily="Geist Mono, monospace" fontSize="9" fill="#2e5e8a" textAnchor="end">DUE OCT 15</text>
      <line x1="50" y1="86" x2="350" y2="86" stroke="#bfd9f2"/>
      {/* line items */}
      {[
        {l: "Brand identity · September", a: "$2,400.00"},
        {l: "Logo refresh · 3 rounds", a: "$640.00"},
        {l: "Style guide PDF", a: "$320.00"},
      ].map((it, i) => (
        <g key={i} transform={`translate(50, ${102 + i*24})`}>
          <text x="0" y="14" fontFamily="Geist, sans-serif" fontSize="11" fill="#142a3d">{it.l}</text>
          <text x="300" y="14" fontFamily="Geist Mono, monospace" fontSize="11" fill="#142a3d" textAnchor="end" fontWeight="500">{it.a}</text>
        </g>
      ))}
      <line x1="50" y1="182" x2="350" y2="182" stroke="#bfd9f2"/>
      <text x="50" y="206" fontFamily="Geist, sans-serif" fontSize="12" fontWeight="700" fill="#142a3d">Total due</text>
      <text x="350" y="206" fontFamily="Instrument Serif, serif" fontSize="22" fill="#142a3d" textAnchor="end">$3,360.00</text>
      <rect x="50" y="226" width="300" height="32" rx="8" fill="#142a3d"/>
      <text x="200" y="247" fontFamily="Geist, sans-serif" fontSize="11" fontWeight="600" fill="#bfd9f2" textAnchor="middle">Pay with card · Stripe</text>
    </Frame>
  );

  return null;
}

/* ============= TEMPLATES ============= */
function Templates() {
  const tpls = [
    { name: "Crumb & Co.", desc: "Bakery pickup orders", art: "tpl-bakery", preview: "bakery", icon: "🥐", cat: "Business" },
    { name: "Client Hub", desc: "Coaching client portal", art: "tpl-portal", preview: "portal", icon: "📋", cat: "Business" },
    { name: "Stillpoint", desc: "Yoga class scheduler", art: "tpl-yoga", preview: "yoga", icon: "🧘", cat: "Business" },
    { name: "Tiny Shop", desc: "Weekend storefront", art: "tpl-shop", preview: "shop", icon: "🛒", cat: "Stores" },
    { name: "Page Turners", desc: "Book-club site", art: "tpl-book", preview: "book", icon: "📚", cat: "Personal" },
    { name: "Hello, Party", desc: "Event RSVP page", art: "tpl-event", preview: "event", icon: "🎉", cat: "Personal" },
    { name: "PawPal", desc: "Pet-sitter booker", art: "tpl-pet", preview: "pet", icon: "🐾", cat: "Forms" },
    { name: "Invoice Stack", desc: "Freelance invoices", art: "tpl-invoice", preview: "invoice", icon: "🧾", cat: "Business" },
  ];

  const filters = ["All", "Business", "Personal", "Forms", "Stores"];
  const [active, setActive] = React.useState("All");
  const visible = active === "All" ? tpls : tpls.filter((t) => t.cat === active);

  return (
    <section className="pad templates-section" id="templates" data-screen-label="templates">
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="eyebrow">Start somewhere</div>
          <h2>Pick a template.<br/> Make it yours.</h2>
          <p>Real apps that other non-coders shipped this week. Click any to remix in seconds.</p>
        </Reveal>

        <Reveal>
          <div className="tpl-filters">
            {filters.map((f) => (
              <button
                key={f}
                className={"tpl-filter" + (active === f ? " active" : "")}
                onClick={() => setActive(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="tpl-grid">
          {visible.map((t, i) => (
            <Reveal key={t.name} delay={(i % 4) * 70}>
              <div className="tpl-card">
                <div className={"tpl-thumb " + t.art}>
                  <div className="tpl-preview">
                    <TemplatePreview kind={t.preview}/>
                  </div>
                  <span className="tpl-cat-pill">{t.cat}</span>
                </div>
                <div className="tpl-meta">
                  <div className="tpl-meta-left">
                    <span className="tpl-icon">{t.icon}</span>
                    <div>
                      <h4>{t.name}</h4>
                      <p>{t.desc}</p>
                    </div>
                  </div>
                  <div className="tpl-use">
                    Use
                    <ArrowRight/>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============= FEATURED QUOTE BAND ============= */
function QuoteBand() {
  return (
    <section className="quoteband" data-screen-label="quote-band">
      <div className="wrap quoteband-inner">
        <Reveal className="quoteband-portrait-wrap">
          <div className="quoteband-portrait">
            <image-slot
              id="quoteband-face"
              src="/site/assets/avatars/sarah.png"
              shape="rect"
              radius="0"
              placeholder="Drop a photo"
            ></image-slot>
          </div>
          <div className="quoteband-badge">
            <div className="quoteband-badge-num countup" data-to="23">23</div>
            <div className="quoteband-badge-lbl">minutes to live</div>
          </div>
        </Reveal>
        <Reveal className="quoteband-body" delay={80}>
          <svg className="quoteband-mark" viewBox="0 0 48 48" aria-hidden="true"><path d="M20 12c-6 2-10 7-10 14v10h12V26h-7c0-5 3-8 7-9l-2-5Zm18 0c-6 2-10 7-10 14v10h12V26h-7c0-5 3-8 7-9l-2-5Z" fill="currentColor"/></svg>
          <blockquote className="quoteband-q">
            I'm a florist, not an engineer. I described my shop in one sentence and had a real booking app (payments and all) before lunch. <em>It still feels illegal.</em>
          </blockquote>
          <div className="quoteband-who">
            <div className="quoteband-name">Sarah Lin</div>
            <div className="quoteband-role">Owner, Fieldnote Floral · Austin, TX</div>
          </div>
          <a className="quoteband-link" href="/templates">See what she built <ArrowRight/></a>
        </Reveal>
      </div>
    </section>
  );
}

/* ============= TRUST ROW ============= */
function Trust() {
  const items = [
    {
      n: "01",
      kicker: "Built right",
      title: "Production-grade, by default.",
      body: "Every app ships with the same security headers, accessibility defaults, and performance budget a real engineering team would set. You just don't have to know what any of that means.",
      spec: "A11Y · AA",
      specLabel: "WCAG 2.2 compliant",
      facts: ["SSL by default", "OWASP headers", "Lighthouse 95+"],
      art: (
        <svg viewBox="0 0 200 140" className="trust-art trust-art-stack" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="tstk" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFE7E1"/>
              <stop offset="100%" stopColor="#F5A87A"/>
            </linearGradient>
          </defs>
          <g transform="translate(40,18)">
            <rect width="120" height="20" rx="4" fill="#181818" opacity=".06" transform="translate(0,84)"/>
            <rect width="120" height="20" rx="4" fill="url(#tstk)" transform="translate(0,84)"/>
            <rect width="120" height="20" rx="4" fill="#181818" opacity=".06" transform="translate(0,58)"/>
            <rect width="120" height="20" rx="4" fill="#FBE4ED" transform="translate(0,58)"/>
            <rect width="120" height="20" rx="4" fill="#181818" opacity=".06" transform="translate(0,32)"/>
            <rect width="120" height="20" rx="4" fill="#FFE7E1" transform="translate(0,32)"/>
            <rect width="120" height="20" rx="4" fill="#181818" transform="translate(0,6)"/>
            <circle cx="14" cy="16" r="2" fill="#FFC53D"/>
            <circle cx="22" cy="16" r="2" fill="#FF5C4D" opacity=".5"/>
            <circle cx="30" cy="16" r="2" fill="#fff" opacity=".4"/>
          </g>
        </svg>
      ),
    },
    {
      n: "02",
      kicker: "Yours to keep",
      title: "Your code. Your data. Your call.",
      body: "Your app is your app. Export the full source code on Starter and above. Take it elsewhere, hand it to a developer, or keep it here: never anyone else's decision but yours.",
      spec: "MIT",
      specLabel: "Open export license",
      facts: ["Full source export", "Postgres dumps", "Walk away anytime"],
      art: (
        <svg viewBox="0 0 200 140" className="trust-art trust-art-key" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="tkey" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFC53D"/>
              <stop offset="100%" stopColor="#FF8855"/>
            </linearGradient>
          </defs>
          <g transform="translate(20,30)">
            <circle cx="44" cy="40" r="30" fill="#181818" opacity=".08"/>
            <circle cx="44" cy="40" r="30" fill="url(#tkey)"/>
            <circle cx="44" cy="40" r="11" fill="#181818"/>
            <rect x="70" y="32" width="86" height="16" rx="3" fill="url(#tkey)"/>
            <rect x="70" y="32" width="86" height="16" rx="3" fill="#181818" opacity=".08"/>
            <rect x="70" y="32" width="86" height="16" rx="3" fill="url(#tkey)"/>
            <rect x="132" y="40" width="10" height="14" rx="1" fill="url(#tkey)"/>
            <rect x="146" y="40" width="6" height="20" rx="1" fill="url(#tkey)"/>
          </g>
        </svg>
      ),
    },
    {
      n: "03",
      kicker: "Honest pricing",
      title: "Start free. Cancel anytime.",
      body: "Publish up to three public apps on Free. If you upgrade, you can cancel in Settings and keep your paid plan through the end of the billing period.",
      spec: "$0",
      specLabel: "Free, forever",
      facts: ["No card to start", "Cancel in Settings"],
      art: (
        <svg viewBox="0 0 200 140" className="trust-art trust-art-receipt" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="tr" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF"/>
              <stop offset="100%" stopColor="#FBF6EA"/>
            </linearGradient>
          </defs>
          <g transform="translate(56,16)">
            <path d="M0 0 L88 0 L88 100 L80 96 L72 102 L64 96 L56 102 L48 96 L40 102 L32 96 L24 102 L16 96 L8 102 L0 100 Z"
              fill="url(#tr)" stroke="#181818" strokeOpacity=".1" strokeWidth="1"/>
            <text x="44" y="22" textAnchor="middle" fontFamily="Roboto Mono, monospace" fontSize="9" fill="#8A8590" letterSpacing="1.2">RECEIPT</text>
            <line x1="10" y1="30" x2="78" y2="30" stroke="#E6DEC8" strokeWidth="1"/>
            <text x="10" y="44" fontFamily="Roboto, sans-serif" fontSize="8" fill="#545159">Hosting</text>
            <text x="78" y="44" textAnchor="end" fontFamily="Roboto Mono, monospace" fontSize="8" fill="#181818">$0.00</text>
            <text x="10" y="58" fontFamily="Roboto, sans-serif" fontSize="8" fill="#545159">SSL cert</text>
            <text x="78" y="58" textAnchor="end" fontFamily="Roboto Mono, monospace" fontSize="8" fill="#181818">$0.00</text>
            <text x="10" y="72" fontFamily="Roboto, sans-serif" fontSize="8" fill="#545159">Updates</text>
            <text x="78" y="72" textAnchor="end" fontFamily="Roboto Mono, monospace" fontSize="8" fill="#181818">$0.00</text>
            <line x1="10" y1="80" x2="78" y2="80" stroke="#E6DEC8" strokeWidth="1"/>
            <text x="10" y="92" fontFamily="Roboto, sans-serif" fontSize="9" fontWeight="700" fill="#181818">Total</text>
            <text x="78" y="92" textAnchor="end" fontFamily="Roboto, sans-serif" fontSize="9" fontWeight="700" fill="#1FB295">FREE</text>
          </g>
        </svg>
      ),
    },
  ];

  const factsRow = [
    "SSL · auto",
    "WCAG 2.2 AA",
    "GDPR · ready",
    "Daily backups",
    "Cancel · anytime",
    "Code · yours",
  ];

  return (
    <section className="trust-section trust-v2" data-screen-label="trust">
      <div className="wrap">
        <Reveal>
          <div className="trust-lead">
            <div className="eyebrow trust-eyebrow">No surprises, ever</div>
            <h2 className="trust-head">Quietly engineered.<br/> <em>Always yours.</em></h2>
            <p className="trust-sub">A reassurance page, with receipts. Skim it now: you won't have to read it later.</p>
          </div>
        </Reveal>

        <div className="trust-grid">
          {items.map((it, i) => (
            <Reveal key={it.n} delay={i * 80}>
              <article className="trust-card">
                <div className="trust-card-art">
                  {it.art}
                  <span className="trust-num">{it.n}</span>
                </div>
                <div className="trust-card-body">
                  <div className="trust-kicker">{it.kicker}</div>
                  <h4>{it.title}</h4>
                  <p>{it.body}</p>
                  <div className="trust-spec">
                    <div className="trust-spec-num">{it.spec}</div>
                    <div className="trust-spec-lbl">{it.specLabel}</div>
                  </div>
                  <ul className="trust-facts">
                    {it.facts.map((f) => (
                      <li key={f}>
                        <Check/>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============= PROOF ============= */
function BigPhoto() {
  const featured = {
    id: "proof-mei",
    avatar: "/site/assets/avatars/mei.png",
    name: "Mei Chen",
    role: "Owner, Crumb & Co. Bakery",
    where: "Portland, OR",
    app: "saturday-sourdough.appsbuiltwithai.com",
    metric: "$8,400",
    metricLabel: "in pre-orders, first month",
    tint: "warm",
    pull: "Twenty-three minutes.",
    quote: "I described what I wanted in one sentence. Twenty-three minutes later my customers were placing orders. I still don't know what \u201cdeploy\u201d means, and I don't have to.",
  };

  const stories = [
    {
      id: "proof-devon",
      avatar: "/site/assets/avatars/devon.png",
      name: "Devon Park",
      role: "Head of Growth",
      where: "Lumen Coffee · Brooklyn",
      app: "lumen-ops.appsbuiltwithai.com",
      metric: "3 apps",
      metricLabel: "live in one week",
      tint: "rose",
      pull: "Zero engineers hired.",
      quote: "Three apps live. Zero engineers hired. I'm a marketer, I built our entire ops dashboard in a week.",
    },
    {
      id: "proof-sarah",
      avatar: "/site/assets/avatars/sarah.png",
      name: "Sarah Lin",
      role: "Brand strategist",
      where: "Independent · Austin",
      app: "sarah-lin.appsbuiltwithai.com",
      metric: "1 afternoon",
      metricLabel: "from Google Doc to real app",
      tint: "plum",
      pull: "Logins. Invoices. Real.",
      quote: "My client portal used to be a Google Doc. Now it's a real app with logins and invoices. Took an afternoon.",
    },
    {
      id: "proof-marcus",
      avatar: "/site/assets/avatars/marcus.png",
      name: "Marcus Webb",
      role: "Owner",
      where: "Webb Pottery · Asheville",
      app: "webbpottery.com",
      metric: "3× refresh",
      metricLabel: "before he believed it",
      tint: "sun",
      pull: "Refreshed three times.",
      quote: "I described what I wanted. It built it. I refreshed three times because I didn't believe it was that easy.",
    },
  ];

  return (
    <section className="pad proof-section" data-screen-label="proof">
      <div className="wrap">
        <Reveal className="sec-head proof-head">
          <h2 className="proof-h">Real <em>apps</em>.<br/> Real <em>people</em>.</h2>
          <p>No demos. No staged screenshots. Four sites shipped this month by people who'd never written a line of code.</p>
        </Reveal>

        <Reveal>
          <article className={"story-featured tint-" + featured.tint}>
            <div className="story-portrait">
              <image-slot
                id={featured.id}
                src={featured.avatar}
                shape="rect"
                radius="0"
                placeholder={"Drop a photo of " + featured.name}
              ></image-slot>
              <div className="story-portrait-fallback" aria-hidden="true">
                <span className="initial">{featured.name[0]}</span>
              </div>
              <span className="story-tag">Story of the week</span>
            </div>
            <div className="story-body">
              <div className="story-pull">{featured.pull}</div>
              <blockquote className="story-q">{featured.quote}</blockquote>
              <div className="story-meta">
                <div className="story-who">
                  <div className="story-name">{featured.name}</div>
                  <div className="story-role">{featured.role} · {featured.where}</div>
                </div>
                <div className="story-metric">
                  <div className="num">{featured.metric}</div>
                  <div className="lbl">{featured.metricLabel}</div>
                </div>
              </div>
              <span className="story-link">{featured.app}</span>
            </div>
          </article>
        </Reveal>

        <div className="story-grid">
          {stories.map((s, i) => (
            <Reveal key={s.id} delay={i * 80}>
              <article className={"story-card tint-" + s.tint}>
                <div className="story-card-portrait">
                  <image-slot
                    id={s.id}
                    src={s.avatar}
                    shape="rect"
                    radius="0"
                    placeholder={"Drop photo of " + s.name}
                  ></image-slot>
                  <div className="story-portrait-fallback" aria-hidden="true">
                    <span className="initial">{s.name[0]}</span>
                  </div>
                </div>
                <div className="story-card-body">
                  <div className="story-pull-sm">{s.pull}</div>
                  <blockquote>"{s.quote}"</blockquote>
                  <div className="story-card-meta">
                    <div>
                      <div className="story-name">{s.name}</div>
                      <div className="story-role">{s.role} · {s.where}</div>
                    </div>
                    <div className="story-metric-sm">
                      <div className="num">{s.metric}</div>
                      <div className="lbl">{s.metricLabel}</div>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============= STATS ============= */
function Stats() {
  const items = [
    { n: "9 min", l: "Average time from idea to a live, working app", tag: "Speed" },
    { n: "200K+", l: "Apps shipped by non-coders with AppsBuiltWithAI", tag: "Adoption" },
    { n: "0", l: "Lines of code you'll write, ever. Not a typo.", tag: "Effort" },
  ];
  return (
    <section className="pad-sm proof-stats-section" data-screen-label="stats">
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="eyebrow">Proof is in the numbers</div>
        </Reveal>
        <Reveal>
          <div className="stats">
            {items.map((s, i) => (
              <div key={s.n} className="stat">
                <div className="stat-tag">{String(i + 1).padStart(2, "0")} · {s.tag}</div>
                <div className="num">{s.n}</div>
                <div className="label">{s.l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export { Templates, Trust, QuoteBand, BigPhoto, Stats };
