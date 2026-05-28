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
          if (e.isIntersecting) { el.classList.remove("pre"); io.unobserve(el); }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
      io.observe(el);
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
    <a className="logo" href="index.html">
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
function Nav() {
  return (
    <div className="nav-wrap">
      <div className="wrap nav">
        <div><Logo/></div>
        <nav className="nav-links">
          <a className="nav-link" href="templates.html">Templates</a>
          <a className="nav-link" href="how-it-works.html">How it works</a>
          <a className="nav-link" href="pricing.html">Pricing</a>
          <a className="nav-link" href="certification.html">Certification</a>
          <a className="nav-link" href="webinars.html">Webinars</a>
          <a className="nav-link" href="community.html">Community</a>
          <a className="nav-link" href="support.html">Support</a>
          <a className="nav-link nav-link-accent" href="summit.html">Summit</a>
        </nav>
        <div className="nav-cta">
          <a className="btn btn-ghost" href="signin.html">Sign in</a>
          <a className="btn btn-ink" href="signup.html">Start free</a>
        </div>
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
    <section className="hero" data-screen-label="hero">
      <div className="wrap" style={{ marginBottom: 18 }}>
        <div className="launch-stat-bar">
          <span className="launch-stat-num">90%</span>
          <span className="launch-stat-text">of people who build an app never launch it. <strong>We changed that.</strong></span>
          <a className="launch-stat-cta">See how →</a>
        </div>
      </div>

      <div className="wrap">
        <div className="hero-card">
          <div className="hero-photo"><HeroArt/></div>
          <div className="bubble bubble-user">"a booking page for my bakery"</div>
          <div className="bubble bubble-ai">Got it. ✨ Building <em>Crumb &amp; Co.</em></div>

          <div className="hero-content">
            <span className="hero-eyebrow"><span className="dot"></span>For non-coders. No exceptions.</span>
            <h1 className="hero-h">
              The app builder<br/>
              for <em>non-coders.</em>
            </h1>
            <p className="hero-sub">
              Describe what you want in plain English. AppsBuiltWithAI builds the real, working app — and publishes it before your coffee gets cold.
            </p>
          </div>
        </div>

        <PromptBox value={text} onChange={setText} pulse={pulse}/>

        <p className="chips-label">— or start with —</p>
        <div className="chips">
          {chips.map((c) => <button key={c} className="chip" onClick={() => pick(c)}>{c}</button>)}
        </div>
      </div>
    </section>
  );
}

/* ============= LOGOS — scrolling marquee ============= */
function Logos() {
  const names = ["Anthropic", "Compass", "Together", "Hubspot", "ElevenLabs", "Notion", "Linear", "Stripe", "Vercel", "Cursor", "Brex", "Loom"];
  return (
    <section className="logos">
      <div className="logos-label">Trusted by 200,000+ non-coders at companies like</div>
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
  const [phase, setPhase] = React.useState("typing");

  React.useEffect(() => {
    let timer;
    const current = messages[msgIdx];
    if (phase === "typing") {
      if (typed.length < current.length) {
        timer = setTimeout(() => setTyped(current.slice(0, typed.length + 1)), 38 + Math.random() * 40);
      } else {
        timer = setTimeout(() => setPhase("reply"), 600);
      }
    } else if (phase === "reply") {
      timer = setTimeout(() => setPhase("idle"), 1400);
    } else if (phase === "idle") {
      timer = setTimeout(() => {
        setTyped("");
        setMsgIdx((i) => (i + 1) % messages.length);
        setPhase("typing");
      }, 800);
    }
    return () => clearTimeout(timer);
  }, [typed, phase, msgIdx, messages]);

  return (
    <div className="art-canvas art-warm typewriter-scene">
      <div className="mini-chat">
        <div className="mini-bubble user">
          {typed}<span className="caret">|</span>
        </div>
        {phase === "reply" && (
          <div className="mini-bubble ai">
            <span className="dots"><span></span><span></span><span></span></span>
            <span style={{ marginLeft: 8 }}>On it. ✨</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============= ANIMATED BUILD DEMO (Feature 02) ============= */
function BuildDemo() {
  const [step, setStep] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setStep((s) => (s + 1) % 4), 1400);
    return () => clearInterval(t);
  }, []);
  const labels = ["Composing layout…", "Adding components…", "Wiring forms…", "Almost done…"];
  return (
    <div className="art-canvas art-sunset build-scene">
      <div className="feature-phone">
        <div className="feature-phone-inner">
          <div className="fp-row lg" style={{ background: "#181818", width: "55%" }}></div>
          <div className="fp-row" style={{ width: "85%", opacity: step >= 1 ? 1 : 0, transition: "opacity .5s" }}></div>
          <div className="fp-row mint" style={{ height: 56, borderRadius: 10, marginTop: 8, opacity: step >= 1 ? 1 : 0, transform: step >= 1 ? "translateY(0)" : "translateY(8px)", transition: "all .5s ease-out" }}></div>
          <div className="fp-row sun"  style={{ height: 56, borderRadius: 10, opacity: step >= 2 ? 1 : 0, transform: step >= 2 ? "translateY(0)" : "translateY(8px)", transition: "all .5s ease-out" }}></div>
          <div className="fp-row coral" style={{ height: 40, borderRadius: 999, width: "60%", marginTop: 8, opacity: step >= 3 ? 1 : 0, transform: step >= 3 ? "scale(1)" : "scale(0.9)", transition: "all .5s ease-out" }}></div>
        </div>
      </div>
      <div className="build-progress">
        <span className="dots"><span></span><span></span><span></span></span>
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

function Features() {
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
              <div className="eyebrow">01 · Describe</div>
              <h3>Tell it like you'd<br/>tell a friend.</h3>
              <p>No prompts to memorize. No "specifications." Just say what you want — "a pickup-order page for my bakery, with a time picker." It figures the rest out.</p>
              <a className="feature-link">See examples <ArrowRight/></a>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="feature reverse">
            <div className="feature-art"><BuildDemo/></div>
            <div className="feature-copy">
              <div className="eyebrow">02 · Watch it build</div>
              <h3>Real software.<br/>In minutes.</h3>
              <p>Not a slideshow. Not a "design." A working app appears on screen in real time — buttons that click, forms that save, pages you can share. Want changes? Just ask.</p>
              <a className="feature-link">See a build <ArrowRight/></a>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="feature">
            <div className="feature-art"><PublishDemo/></div>
            <div className="feature-copy">
              <div className="eyebrow">03 · Ship it</div>
              <h3>One click.<br/>Live on the internet.</h3>
              <p>No "deploy." No "hosting." No "DNS." Click publish, get a real URL, send it to your customers. Bring your own domain when you're ready.</p>
              <a className="feature-link">How publishing works <ArrowRight/></a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

window.PoofPart1 = { Reveal, Nav, Hero, Logos, Features, PromptBox, Logo, ArrowRight, Check, Plus };
