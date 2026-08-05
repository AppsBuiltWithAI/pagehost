/* global React, ReactDOM */
const { useState, useEffect, useRef } = React;

/* ============= UTILITIES ============= */

function Reveal({ children, delay = 0, as: Tag = "div", className = "", style = {} }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    el.classList.add("pre");
    requestAnimationFrame(() => {
      if (typeof IntersectionObserver === "undefined") { el.classList.remove("pre"); return; }
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { el.classList.remove("pre"); io.unobserve(el); clearTimeout(fallback); }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
      io.observe(el);
      /* Safety: IntersectionObservers (and CSS transitions) get throttled to a
         halt in inactive/embedded iframes, which can leave reveals stuck at
         opacity:0. Guarantee the content shows even if the observer never fires. */
      var fallback = setTimeout(() => { el.classList.remove("pre"); io.disconnect(); }, 1600);
    });
  }, []);
  return (
    <Tag ref={ref} className={"reveal " + className} style={{ "--rd": delay + "ms", ...style }}>
      {children}
    </Tag>
  );
}

function ArrowRight({ size = 14 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
}
function Check() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>;
}
function Plus() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>;
}

/* ============= LOGO ============= */
function Logo() {
  return (
    <a className="logo" href={(typeof window !== "undefined" && window.POOF_HOME) || "index.html"}>
      <img src="assets/logo-primary.png" alt="AppsBuiltWithAI" className="logo-lockup"/>
    </a>
  );
}

/* ============= PROMPT BOX ============= */
function PromptBox({ value, onChange, pulse }) {
  const [t, setT] = useState("");
  const v = value !== undefined ? value : t;
  const set = (n) => { if (onChange) onChange(n); else setT(n); };

  const [state, setState] = useState("idle");
  const click = () => {
    if (state !== "idle") return;
    setState("poof");
    setTimeout(() => setState("build"), 900);
    setTimeout(() => setState("idle"), 2200);
  };
  const label = state === "poof" ? "✨ building…" : state === "build" ? "🎉 building" : <>Build it <ArrowRight/></>;

  return (
    <div className={"prompt-card" + (pulse ? " pulse" : "")}>
      <span className="prompt-tag">YOUR IDEA</span>
      <textarea
        value={v}
        onChange={(e) => set(e.target.value)}
        placeholder='Describe the app you want — like "a booking page for my bakery"'
        rows={2}
      />
      <div className="prompt-bar">
        <div className="prompt-icons">
          <button className="icon-btn"><Plus/><span>Screenshot</span></button>
          <button className="icon-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16v.01"/></svg>
            <span>Brand</span>
          </button>
        </div>
        <button className="btn btn-coral" onClick={click}>{label}</button>
      </div>
    </div>
  );
}

/* ============= NAV ============= */
function Nav({ ctaLabel, onCta, hidePricing, hideSignIn, hideCta, bare }) {
  const [resOpen, setResOpen] = useState(false);
  const [featOpen, setFeatOpen] = useState(false);
  const resTimer = useRef(null);
  const featTimer = useRef(null);
  const openRes = () => { clearTimeout(resTimer.current); setResOpen(true); };
  const closeRes = () => { resTimer.current = setTimeout(() => setResOpen(false), 140); };
  const openFeat = () => { clearTimeout(featTimer.current); setFeatOpen(true); };
  const closeFeat = () => { featTimer.current = setTimeout(() => setFeatOpen(false), 140); };

  const FEATURES = [
    { label: "All features", desc: "Everything on one page", href: "features.html" },
    { label: "Describe & build", desc: "Plain English → working app", href: "how-it-works.html" },
    { label: "Connectors", desc: "Stripe, Gmail, Sheets & more", href: "connectors.html" },
    { label: "Import projects", desc: "From GitHub, Lovable, or Bolt", href: "import.html" },
    { label: "Use cases", desc: "What people like you are building", href: "use-cases.html" },
    { label: "Dashboard", desc: "Open the app builder", href: "dashboard/index.html" },
  ];

  const RESOURCES = [
    { label: "Training", desc: "Hands-on courses & office hours", href: "resources.html#training" },
    { label: "Tutorials", desc: "Step-by-step guides & articles", href: "resources.html#learn" },
    { label: "Community", desc: "Forums, events & showcases", href: "community.html" },
    { label: "Certification partners", desc: "Get certified with a partner", href: "certification.html" },
    { label: "Templates", desc: "Start from a ready-made app", href: "templates.html" },
  ];

  return (
    <>
      <a className="topbar" href={bare ? undefined : "import.html"}>
        <span className="topbar-tag">New</span>
        <span className="topbar-text">Import your existing project from <strong>GitHub, Lovable, or Bolt</strong> — now in beta</span>
        <span className="topbar-text-mobile">Import from <strong>GitHub, Lovable, or Bolt</strong></span>
        <span className="topbar-cta">{bare ? "Coming soon" : <>Try it <span aria-hidden="true">→</span></>}</span>
      </a>
      <div className="nav-wrap">
      <div className="wrap nav">
        <div><Logo/></div>
        <nav className="nav-links">
          {!bare && <>
          <div
            className={"nav-dd" + (featOpen ? " open" : "")}
            onMouseEnter={openFeat}
            onMouseLeave={closeFeat}
          >
            <button
              className="nav-link nav-dd-trigger"
              aria-expanded={featOpen}
              onClick={() => setFeatOpen((v) => !v)}
            >
              Features
              <svg className="nav-dd-caret" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div className="nav-dd-panel" role="menu">
              {FEATURES.map((r) => (
                <a key={r.label} className="nav-dd-item" href={r.href} role="menuitem">
                  <span className="nav-dd-item-label">{r.label}</span>
                  <span className="nav-dd-item-desc">{r.desc}</span>
                </a>
              ))}
            </div>
          </div>
          <div
            className={"nav-dd" + (resOpen ? " open" : "")}
            onMouseEnter={openRes}
            onMouseLeave={closeRes}
          >
            <button
              className="nav-link nav-dd-trigger"
              aria-expanded={resOpen}
              onClick={() => setResOpen((v) => !v)}
            >
              Resources
              <svg className="nav-dd-caret" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div className="nav-dd-panel" role="menu">
              {RESOURCES.map((r) => (
                <a key={r.label} className="nav-dd-item" href={r.href} role="menuitem">
                  <span className="nav-dd-item-label">{r.label}</span>
                  <span className="nav-dd-item-desc">{r.desc}</span>
                </a>
              ))}
            </div>
          </div>
          <a className="nav-link" href="use-cases.html">Use cases</a>
          <a className="nav-link" href="how-it-works.html">How it works</a>
          {!hidePricing && <a className="nav-link" href="pricing.html">Pricing</a>}
          <a className="nav-link nav-link-accent" href="summit.html">Summit</a>
          </>}
        </nav>
        <div className="nav-cta">
          {!hideSignIn && <a className="btn btn-ghost" href="signin.html">Sign in</a>}
          {!hideCta && (onCta
            ? <button className="btn btn-ink" onClick={onCta}>{ctaLabel || "Start free"}</button>
            : <a className="btn btn-ink" href="signup.html">{ctaLabel || "Start free"}</a>)}
        </div>
      </div>
    </div>
    </>
  );
}

/* ============= LANGUAGE SWITCHER ============= */
const LANGS = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "pt", label: "Português", flag: "🇧🇷" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "nl", label: "Nederlands", flag: "🇳🇱" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "hi", label: "हिन्दी", flag: "🇮🇳" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
];

function LangSwitcher({ variant = "nav", drop = "down" }) {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("en");
  const ref = useRef(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("abwai-lang");
      if (saved && LANGS.some((l) => l.code === saved)) setCode(saved);
    } catch (e) {}
  }, []);

  useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    const onSync = (e) => { if (e.detail && e.detail !== code) setCode(e.detail); };
    window.addEventListener("abwai-lang-change", onSync);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      window.removeEventListener("abwai-lang-change", onSync);
    };
  }, [code]);

  const choose = (c) => {
    setCode(c);
    setOpen(false);
    try { localStorage.setItem("abwai-lang", c); } catch (e) {}
    document.documentElement.lang = c;
    window.dispatchEvent(new CustomEvent("abwai-lang-change", { detail: c }));
  };

  const cur = LANGS.find((l) => l.code === code) || LANGS[0];

  return (
    <div className={"lang " + (variant === "footer" ? "lang-footer" : "lang-nav") + (open ? " open" : "") + (drop === "up" ? " drop-up" : "")} ref={ref}>
      <button className="lang-trigger" aria-expanded={open} aria-label="Change language" onClick={() => setOpen((v) => !v)}>
        <svg className="lang-globe" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
        <span className="lang-cur">{cur.label}</span>
        <svg className="lang-caret" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div className="lang-panel" role="menu">
        {LANGS.map((l) => (
          <button
            key={l.code}
            className={"lang-item" + (l.code === code ? " active" : "")}
            role="menuitemradio"
            aria-checked={l.code === code}
            onClick={() => choose(l.code)}
          >
            <span className="lang-flag">{l.flag}</span>
            <span className="lang-name">{l.label}</span>
            {l.code === code && <svg className="lang-check" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ============= HERO ============= */
function HeroArt() {
  // editorial photo-look — laptop on wooden surface, golden lamp light at upper-right,
  // composition keeps the LEFT half dark/empty for headline overlay
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id="hsky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0E0915"/>
          <stop offset="40%" stopColor="#3A1F5C"/>
          <stop offset="75%" stopColor="#9C3597"/>
          <stop offset="100%" stopColor="#FB8855"/>
        </linearGradient>
        <radialGradient id="hlamp" cx="80%" cy="20%" r="42%">
          <stop offset="0%" stopColor="#FFB37A" stopOpacity=".95"/>
          <stop offset="45%" stopColor="#D45F7E" stopOpacity=".45"/>
          <stop offset="100%" stopColor="#9C3597" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="hwood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1A0F22"/>
          <stop offset="100%" stopColor="#0A0510"/>
        </linearGradient>
        {/* extra darkening on the left where text sits */}
        <linearGradient id="hdark" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#000" stopOpacity=".65"/>
          <stop offset="45%" stopColor="#000" stopOpacity=".25"/>
          <stop offset="70%" stopColor="#000" stopOpacity="0"/>
        </linearGradient>
      </defs>

      <rect width="1600" height="900" fill="url(#hsky)"/>
      <ellipse cx="1300" cy="180" rx="600" ry="320" fill="url(#hlamp)"/>

      {/* wood table */}
      <path d="M0 580 L1600 500 L1600 900 L0 900 Z" fill="url(#hwood)"/>
      <path d="M0 580 L1600 500 L1600 518 L0 600 Z" fill="#4A2818" opacity=".55"/>
      <g stroke="#1A0E08" strokeWidth="1" opacity=".4">
        <path d="M0 660 Q800 640 1600 620" fill="none"/>
        <path d="M0 760 Q800 740 1600 720" fill="none"/>
        <path d="M0 850 Q800 830 1600 810" fill="none"/>
      </g>

      {/* laptop — shifted to right half, smaller, so left half stays clean for headline */}
      <g transform="translate(900, 340)">
        <rect x="40" y="0" width="640" height="360" rx="10" fill="#15151a"/>
        <rect x="54" y="14" width="612" height="332" rx="5" fill="#fff"/>
        {/* mock app inside laptop */}
        <rect x="74" y="36" width="180" height="11" rx="3" fill="#1a1a1f"/>
        <rect x="74" y="58" width="260" height="7" rx="2" fill="#8A8590"/>
        <rect x="74" y="72" width="220" height="7" rx="2" fill="#8A8590"/>
        <rect x="74" y="100" width="260" height="38" rx="8" fill="#F7F2E8"/>
        <rect x="74" y="148" width="260" height="38" rx="8" fill="#F7F2E8"/>
        <rect x="74" y="196" width="260" height="38" rx="8" fill="#F7F2E8"/>
        <rect x="74" y="252" width="110" height="32" rx="16" fill="#FF5C4D"/>
        <rect x="404" y="36" width="240" height="280" rx="10" fill="#FFF1CB"/>
        <circle cx="524" cy="148" r="52" fill="#FFC53D"/>
        <rect x="430" y="220" width="188" height="7" rx="2" fill="#1a1a1f" opacity=".5"/>
        <rect x="430" y="234" width="140" height="7" rx="2" fill="#1a1a1f" opacity=".3"/>
        <rect x="430" y="266" width="96" height="26" rx="13" fill="#1a1a1f"/>
        {/* base */}
        <path d="M0 360 L720 360 L688 400 L32 400 Z" fill="#202028"/>
        <ellipse cx="360" cy="398" rx="40" ry="5" fill="#0a0a0f" opacity=".6"/>
      </g>

      {/* coffee cup — bottom right (moved out of text zone) */}
      <ellipse cx="1380" cy="780" rx="70" ry="18" fill="#0e0805"/>
      <path d="M1320 770 Q1320 838 1380 845 Q1440 838 1440 770 Z" fill="#E8D2A8"/>
      <ellipse cx="1380" cy="770" rx="58" ry="12" fill="#2E1408"/>
      <ellipse cx="1380" cy="770" rx="58" ry="12" fill="url(#hlamp)" opacity=".3"/>

      {/* extra left-side darkening for text legibility */}
      <rect width="1600" height="900" fill="url(#hdark)"/>
      {/* warm lamp top-right wash */}
      <rect width="1600" height="900" fill="url(#hlamp)" opacity=".2"/>
    </svg>
  );
}

function Hero() {
  const [text, setText] = useState("");
  const [pulse, setPulse] = useState(false);
  const chips = [
    "📅  Booking page for my bakery",
    "📋  Client intake form",
    "📦  Inventory tracker",
    "🎉  Event RSVP site",
    "💬  Customer support portal",
  ];
  const pick = (s) => {
    setText(s);
    setPulse(true);
    setTimeout(() => setPulse(false), 450);
    const card = document.querySelector(".prompt-card");
    if (card) window.scrollTo({ top: window.scrollY + card.getBoundingClientRect().top - 100, behavior: "smooth" });
  };

  return (
    <section className="hero hero-b" data-screen-label="hero">
      <div className="hero-b-inner">
        <span className="hero-b-eyebrow">
          <span className="hero-b-faces">
            <span style={{ background: "linear-gradient(135deg,#FF7A4D,#FFC53D)" }}></span>
            <span style={{ background: "linear-gradient(135deg,#7A3FB0,#A23C9C)" }}></span>
            <span style={{ background: "linear-gradient(135deg,#1FB295,#6FA8E0)" }}></span>
          </span>
          <span>Trusted by companies <b>worldwide</b></span>
        </span>

        <h1 className="hero-b-h">The app builder for <em>non&#8209;coders.</em></h1>
        <p className="hero-b-sub">
          Tell it like you'd tell a friend. AppsBuiltWithAI builds the real, working app — and publishes it before your coffee gets cold.
        </p>

        <div className="prompt-glow">
          <PromptBox value={text} onChange={setText} pulse={pulse}/>
        </div>

        <p className="chips-label">— or start with —</p>
        <div className="chips">
          {chips.map((c) => <button key={c} className="chip" onClick={() => pick(c)}>{c}</button>)}
        </div>

        {window.HeroBuilderDemo && <window.HeroBuilderDemo/>}
      </div>
    </section>
  );
}

/* ============= LOGOS — scrolling marquee ============= */
function Logos({ names: overrideNames, label }) {
  const names = overrideNames || ["Meta", "Anthropic", "Compass", "Together", "Hubspot", "ElevenLabs", "Notion", "Linear", "Stripe", "Vercel", "Cursor", "Brex", "Loom"];
  return (
    <section className="logos">
      <div className="logos-label">{label || "Trusted by teams at companies like"}</div>
      <div className="logos-marquee">
        <div className="logos-track">
          {[...names, ...names].map((n, i) => <div key={i} className="logo-item">{n}</div>)}
        </div>
      </div>
    </section>
  );
}

/* ============= FEATURES (zigzag) ============= */
/* ============= ANIMATED PROMPT DEMO (Feature 01) ============= */
function TypewriterDemo() {
  const messages = React.useMemo(() => [
    "Make a pickup-order page for my bakery",
    "Add a time picker for pickups",
    "Use my brand pink",
    "Now add a confirmation email",
  ], []);
  const [msgIdx, setMsgIdx] = React.useState(0);
  const [typed, setTyped] = React.useState("");
  const [phase, setPhase] = React.useState("typing"); // typing → send → reply → idle

  React.useEffect(() => {
    let timer;
    const current = messages[msgIdx];
    if (phase === "typing") {
      if (typed.length < current.length) {
        timer = setTimeout(() => setTyped(current.slice(0, typed.length + 1)), 38 + Math.random() * 40);
      } else {
        timer = setTimeout(() => setPhase("send"), 500);
      }
    } else if (phase === "send") {
      timer = setTimeout(() => setPhase("reply"), 450);
    } else if (phase === "reply") {
      timer = setTimeout(() => setPhase("idle"), 1600);
    } else if (phase === "idle") {
      timer = setTimeout(() => {
        setTyped("");
        setMsgIdx((i) => (i + 1) % messages.length);
        setPhase("typing");
      }, 700);
    }
    return () => clearTimeout(timer);
  }, [typed, phase, msgIdx, messages]);

  const sent = phase === "reply" || phase === "idle";
  return (
    <div className="art-canvas art-warm typewriter-scene">
      <div className="prompt-composer">
        <div className="pc-head">
          <span className="pc-dot"></span><span className="pc-dot"></span><span className="pc-dot"></span>
          <span className="pc-title">New app</span>
        </div>
        <div className="pc-thread">
          {sent && (
            <div className="pc-sent-msg">{messages[msgIdx]}</div>
          )}
          {phase === "reply" && (
            <div className="pc-ai-msg">
              <span className="dots"><span></span><span></span><span></span></span>
              <span style={{ marginLeft: 8 }}>On it — building that now ✨</span>
            </div>
          )}
          {phase === "idle" && (
            <div className="pc-ai-msg done">✓ Done. Anything else?</div>
          )}
        </div>
        <div className={"pc-input" + (phase === "send" ? " sending" : "")}>
          <span className="pc-input-text">
            {!sent && typed}
            {phase === "typing" && <span className="caret">|</span>}
            {sent && <span className="pc-placeholder">Tell it like you'd tell a friend…</span>}
          </span>
          <button className={"pc-send" + (phase === "send" ? " fired" : "") + (typed && !sent ? " ready" : "")} aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============= ANIMATED BUILD DEMO (Feature 02) ============= */
function BuildDemo() {
  const [step, setStep] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setStep((s) => (s + 1) % 6), 1500);
    return () => clearInterval(t);
  }, []);
  const labels = ["Composing layout…", "Adding your menu…", "Wiring the order form…", "Polishing…", "✓ Your app is live", "✓ Your app is live"];
  const built = step >= 4;
  return (
    <div className="art-canvas art-sunset build-scene">
      <div className="feature-phone">
        <div className={"feature-phone-inner bd-app" + (built ? " is-live" : "")}>
          <div className="bd-appbar" style={{ opacity: 1 }}>
            <span className="bd-logo"></span>
            <span className="bd-appname">Crumb &amp; Co.</span>
            <span className="bd-cart" style={{ opacity: step >= 2 ? 1 : 0 }}>🧺</span>
          </div>
          <div className="bd-hero" style={{ opacity: step >= 1 ? 1 : 0, transform: step >= 1 ? "none" : "translateY(8px)" }}>
            <span className="bd-hero-t">Fresh this morning</span>
            <span className="bd-hero-s">Order ahead · skip the line</span>
          </div>
          <div className="bd-items">
            <div className="bd-item" style={{ opacity: step >= 1 ? 1 : 0, transitionDelay: ".1s" }}>
              <span className="bd-thumb" style={{ background: "linear-gradient(135deg,#FFD873,#FF8A5C)" }}></span>
              <span className="bd-item-meta"><b>Sourdough loaf</b><i>$8</i></span>
              <span className="bd-add" style={{ opacity: step >= 2 ? 1 : 0 }}>+</span>
            </div>
            <div className="bd-item" style={{ opacity: step >= 2 ? 1 : 0, transitionDelay: ".15s" }}>
              <span className="bd-thumb" style={{ background: "linear-gradient(135deg,#6FD3B8,#6FA8E0)" }}></span>
              <span className="bd-item-meta"><b>Morning buns (4)</b><i>$12</i></span>
              <span className="bd-add" style={{ opacity: step >= 3 ? 1 : 0 }}>+</span>
            </div>
          </div>
          <div className="bd-cta" style={{ opacity: step >= 3 ? 1 : 0, transform: step >= 3 ? "scale(1)" : "scale(.92)" }}>
            {built ? "Order for pickup →" : "Order for pickup"}
          </div>
          {built && <div className="bd-live-tag">● LIVE</div>}
        </div>
      </div>
      <div className={"build-progress" + (built ? " done" : "")}>
        {!built && <span className="dots"><span></span><span></span><span></span></span>}
        <span>{labels[step]}</span>
      </div>
    </div>
  );
}

/* ============= PUBLISH DEMO (Feature 03) ============= */
function PublishDemo() {
  const [pulse, setPulse] = React.useState(false);
  React.useEffect(() => {
    const t = setInterval(() => { setPulse(true); setTimeout(() => setPulse(false), 1400); }, 3600);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="art-canvas art-mint publish-scene">
      {/* Floating browser window with deployed site */}
      <div className="pub-browser">
        <div className="pub-browser-bar">
          <span className="dot r"/><span className="dot y"/><span className="dot g"/>
          <div className="pub-browser-url">
            <span className="lock">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>
            </span>
            <span className="prot">https://</span>
            <span className="host">crumb-and-co</span>
            <span className="tld">.app</span>
          </div>
        </div>
        <div className="pub-browser-body">
          <div className="pub-site-image">
            <image-slot
              id="publish-demo-site"
              shape="rect"
              radius="0"
              placeholder="Drop a screenshot of your app"
            ></image-slot>
            <div className="pub-site-mock" aria-hidden="true">
              <div className="pub-site-hero">
                <div className="pub-site-eyebrow">CRUMB &amp; CO. · PORTLAND</div>
                <div className="pub-site-h">Saturday<br/>sourdough.</div>
                <div className="pub-site-sub">Order ahead. Pick up warm.</div>
                <div className="pub-site-btn">Reserve a loaf · $8</div>
              </div>
              <div className="pub-site-row">
                <div className="pub-site-card c1"/>
                <div className="pub-site-card c2"/>
                <div className="pub-site-card c3"/>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating "now live" toast */}
      <div className={"pub-toast" + (pulse ? " is-pulse" : "")}>
        <span className="pub-toast-ic">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5"/>
          </svg>
        </span>
        <div className="pub-toast-body">
          <div className="pub-toast-title">Live</div>
          <div className="pub-toast-sub">SSL · CDN · 0s downtime</div>
        </div>
        <span className="pub-toast-time">2s ago</span>
      </div>

      {/* Domain chip */}
      <div className="pub-chip">
        <span className="pub-chip-dot"/>
        Custom domain · <strong>connected</strong>
      </div>

      {/* Decorative confetti bits */}
      <span className="pub-confetti c-1"/>
      <span className="pub-confetti c-2"/>
      <span className="pub-confetti c-3"/>
      <span className="pub-confetti c-4"/>
    </div>
  );
}

function Features({ onStart }) {
  const Link = ({ children }) => onStart
    ? <button className="feature-link" onClick={onStart}>{children} <ArrowRight/></button>
    : <a className="feature-link" href="how-it-works.html">{children} <ArrowRight/></a>;
  return (
    <section className="pad" id="features" data-screen-label="features">
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="eyebrow">What it does for you</div>
          <h2>Type what you want.<br/><em>Watch it appear.</em></h2>
        </Reveal>

        <Reveal>
          <div className="feature">
            <div className="feature-art"><TypewriterDemo/></div>
            <div className="feature-copy">
              <div className="step-tag"><span className="step-num">01</span><span className="step-lbl">Describe</span></div>
              <h3>Tell it like you'd<br/>tell a friend.</h3>
              <p>No prompts to memorize. No "specifications." Just say what you want — "a pickup-order page for my bakery, with a time picker." It figures the rest out.</p>
              <Link>See examples</Link>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="feature reverse">
            <div className="feature-art"><BuildDemo/></div>
            <div className="feature-copy">
              <div className="step-tag"><span className="step-num">02</span><span className="step-lbl">Watch it build</span></div>
              <h3>Real software.<br/>In minutes.</h3>
              <p>Not a slideshow. Not a "design." A working app appears on screen in real time — buttons that click, forms that save, pages you can share. Want changes? Just ask.</p>
              <Link>See a build</Link>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="feature">
            <div className="feature-art"><PublishDemo/></div>
            <div className="feature-copy">
              <div className="step-tag"><span className="step-num">03</span><span className="step-lbl">Ship it</span></div>
              <h3>One click.<br/>Live on the internet.</h3>
              <p>No "deploy." No "hosting." No "DNS." Click publish, get a real URL, send it to your customers. Bring your own domain when you're ready.</p>
              <Link>How publishing works</Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============= DIFFERENTIATOR STAT BAND ============= */
function StatBand({ onStart }) {
  return (
    <section className="diff-band" data-screen-label="differentiator">
      <div className="wrap-tight">
        <Reveal>
          <div className="diff-band-inner">
            <span className="diff-band-num"><span className="countup" data-to="9">9</span> in 10</span>
            <p className="diff-band-text">
              people who start building software on other tools <strong>never finish it.</strong>{" "}
              That's the real difference here — with AppsBuiltWithAI, you actually ship.
            </p>
            {onStart
              ? <button className="diff-band-cta" onClick={onStart}>Get started <ArrowRight/></button>
              : <a className="diff-band-cta" href="how-it-works.html">See why <ArrowRight/></a>}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

window.PoofPart1 = { Reveal, Nav, Hero, Logos, Features, StatBand, PromptBox, LangSwitcher, Logo, ArrowRight, Check, Plus };
