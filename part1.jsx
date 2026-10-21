/* global React, ReactDOM */
const { useState, useEffect, useRef } = React;

// Launch availability and destinations shared by the public website.
window.ABWAI = Object.freeze({
  marketing: "coming-soon",
  appUrl: "https://app.appsbuiltwithai.com/dashboard/home",
  supportUrl: "https://app.appsbuiltwithai.com/dashboard/support",
  pricingUrl: "https://app.appsbuiltwithai.com/dashboard/settings/plan",
  // Displayed in the live app on October 19, 2026. Confirm launch changes before release.
  plans: [
    { id: "free", name: "Free", sub: "Explore your idea", monthly: 0, annual: 0, credits: 150, apps: "1 live public app", features: ["Chat to build and edit", "AppsBuilt subdomain", "Community support"] },
    { id: "starter", name: "Starter", sub: "Build for real", monthly: 19, annual: 15, credits: 300, apps: "Unlimited live apps", features: ["Custom domain and SSL", "GitHub sync and export", "Credits roll over 1 month", "Email support"] },
    { id: "growth", name: "Growth", sub: "Keep building", monthly: 49, annual: 39, credits: 750, apps: "Unlimited live apps", features: ["Everything in Starter", "Priority build queue", "Credits roll over 1 month", "Priority chat support"] },
    { id: "pro", name: "Pro", sub: "For steady shipping", monthly: 99, annual: 79, credits: 1500, apps: "Unlimited live apps", features: ["Everything in Growth", "Knowledge base for your style", "Credits roll over 2 months", "Business hosting option"] },
    { id: "scale", name: "Scale", sub: "Room to grow", monthly: 199, annual: 159, credits: 3000, apps: "Unlimited live apps", features: ["Everything in Pro", "Higher credit allowances", "Credits roll over 2 months", "Priority support"] },
  ],
});

function AppLink({ children, href = window.ABWAI.appUrl, ...props }) {
  return <a {...props} href={href} target="_blank" rel="noopener noreferrer">{children}<span className="sr-only"> (opens in a new tab)</span></a>;
}

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
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
}
function Check() {
  return <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>;
}
function Plus() {
  return <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>;
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
  const ideaRef = useRef(null);
  const [copyStatus, setCopyStatus] = useState("");
  useEffect(() => setCopyStatus(""), [v]);
  const copyIdea = async () => {
    try {
      await navigator.clipboard.writeText(v);
      setCopyStatus("Idea copied. Paste it into the builder.");
    } catch {
      ideaRef.current?.focus();
      ideaRef.current?.select();
      setCopyStatus("Select and copy your idea, then open the builder.");
    }
  };

  return (
    <div className={"prompt-card" + (pulse ? " pulse" : "")}>
      <span className="prompt-tag">YOUR IDEA</span>
      <textarea
        ref={ideaRef}
        value={v}
        onChange={(e) => set(e.target.value)}
        placeholder='Describe the app you want, like "a booking page for my bakery"'
        rows={2}
        aria-label="Describe your app idea"
      />
      <div className="prompt-bar">
        <div className="prompt-copy"><button className="icon-btn" type="button" onClick={copyIdea} disabled={!v.trim()}>Copy idea</button><span className="prompt-handoff" role="status">{copyStatus || "Copy your idea, then continue in the builder."}</span></div>
        <AppLink className="btn btn-coral">Open builder <ArrowRight/></AppLink>
      </div>
    </div>
  );
}

/* ============= NAV ============= */
function Nav({ ctaLabel, onCta, hidePricing, hideSignIn, hideCta, bare }) {
  const [panel, setPanel] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);
  const featureRef = useRef(null);
  const resourceRef = useRef(null);
  const mobileRef = useRef(null);
  const hoverTimer = useRef(null);
  const clickPointer = useRef(null);
  const navId = React.useId();
  const featureId = React.useId();
  const resourceId = React.useId();
  const cancelHoverClose = () => clearTimeout(hoverTimer.current);
  const isHoverDesktop = () => Boolean(window.matchMedia?.("(min-width: 1121px) and (hover: hover)").matches);
  const close = () => { cancelHoverClose(); setPanel(null); setMobileOpen(false); };
  const openOnHover = (nextPanel, event) => {
    if (event.pointerType !== "mouse" || !isHoverDesktop()) return;
    cancelHoverClose();
    const openPanel = navRef.current?.querySelector(".mega-panel:not([hidden])");
    if (openPanel?.contains(document.activeElement)) return;
    setPanel(nextPanel);
  };
  const scheduleHoverClose = (event) => {
    if (event.pointerType !== "mouse" || !isHoverDesktop()) return;
    cancelHoverClose();
    hoverTimer.current = setTimeout(() => {
      const openPanel = navRef.current?.querySelector(".mega-panel:not([hidden])");
      if (!openPanel?.contains(document.activeElement)) setPanel(null);
    }, 160);
  };
  const activatePanel = (nextPanel, event) => {
    cancelHoverClose();
    const mouseClick = event.detail > 0 && clickPointer.current === "mouse" && isHoverDesktop();
    clickPointer.current = null;
    setPanel(current => mouseClick ? nextPanel : current === nextPanel ? null : nextPanel);
  };

  useEffect(() => () => clearTimeout(hoverTimer.current), []);

  useEffect(() => {
    // Fragment targets exist only after the client-rendered page mounts.
    const followFragment = () => {
      let id;
      try { id = decodeURIComponent(window.location.hash.slice(1)); }
      catch { return; }
      if (id) document.getElementById(id)?.scrollIntoView({ block: "start", behavior: "auto" });
    };
    followFragment();
    window.addEventListener("hashchange", followFragment);
    return () => window.removeEventListener("hashchange", followFragment);
  }, []);

  useEffect(() => {
    const outside = (event) => { if (navRef.current && !navRef.current.contains(event.target)) close(); };
    const escape = (event) => {
      if (event.key !== "Escape") return;
      cancelHoverClose();
      if (panel) {
        (panel === "features" ? featureRef : resourceRef).current?.focus();
        setPanel(null);
      } else if (mobileOpen) {
        mobileRef.current?.focus();
        setMobileOpen(false);
      }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", escape); };
  }, [panel, mobileOpen]);

  useEffect(() => {
    if (!window.matchMedia) return;
    const query = window.matchMedia("(min-width: 1121px)");
    const resize = () => { cancelHoverClose(); setPanel(null); setMobileOpen(false); };
    query.addEventListener("change", resize);
    return () => query.removeEventListener("change", resize);
  }, []);

  const groups = [
    { title: "Build", intro: "Give your idea a working first version.", links: [
      ["Plan your app", "Work out what matters first", "features.html#build"],
      ["Describe and build", "Create and refine in conversation", "how-it-works.html"],
      ["Connect your tools", "Bring your services together", "connectors.html"],
    ] },
    { title: "Test and launch", intro: "Keep going after the first build.", links: [
      ["AI testing", "Check the journeys that matter", "features.html#test"],
      ["Security review", "Review issues before you share", "features.html#secure"],
      ["Publish your app", "Take your next step toward launch", "features.html#launch"],
    ] },
    { title: "Market", intro: "Tools for reaching your audience.", soon: true, links: [
      ["Tribe Finder", "Discover relevant communities", "features.html#marketing"],
      ["Content creation", "Prepare what you want to share", "features.html#marketing"],
      ["Advertising tools", "Plan your next campaign", "features.html#marketing"],
    ] },
  ];
  const caret = <svg className="nav-dd-caret" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>;
  return (
    <>
    <aside className="topbar summit-announcement" aria-label="Summit announcement">
      <span className="topbar-tag">Summit</span>
      <strong>Join the summit</strong>
    </aside>
    <header className="nav-wrap launch-nav" ref={navRef} data-mobile-open={mobileOpen} onPointerEnter={cancelHoverClose} onPointerLeave={scheduleHoverClose} onBlur={(event) => {
      if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) setPanel(null);
    }}>
      <div className="wrap nav">
        <div><Logo/></div>
        {!bare && <button className="mobile-menu-toggle btn btn-outline" ref={mobileRef} aria-expanded={mobileOpen} aria-controls={navId} onClick={() => { setMobileOpen(!mobileOpen); setPanel(null); }}>{mobileOpen ? "Close" : "Menu"}</button>}
        <nav className="nav-links" id={navId} aria-label="Main navigation">
          {!bare && <>
            <div className="mega-disclosure" onPointerEnter={(event) => openOnHover("features", event)}>
              <button className="nav-link nav-dd-trigger" ref={featureRef} aria-expanded={panel === "features"} aria-controls={featureId} onPointerDown={event => { clickPointer.current = event.pointerType; }} onClick={event => activatePanel("features", event)}>Features {caret}</button>
              <div className="mega-panel" id={featureId} hidden={panel !== "features"}>
                <div className="mega-inner">{groups.map((group, index) => <section className={"mega-column mega-tone-" + index + (group.soon ? " mega-soon" : "")} key={group.title}>
                  <div className="mega-title"><span className="mega-step" aria-hidden="true">0{index + 1}</span><p className="mega-label">{group.title}</p>{group.soon && <span className="availability-badge">Coming soon</span>}</div>
                  <p>{group.intro}</p>
                  {group.links.map(([label, desc, href]) => <a className="nav-dd-item" href={href} key={label} onClick={close}><span className="nav-dd-item-heading"><span className="nav-dd-item-label">{label}</span>{group.soon && <span className="mega-item-status">Coming soon</span>}</span><span className="nav-dd-item-desc">{desc}</span></a>)}
                </section>)}</div>
                <div className="mega-footer"><a href="features.html" onClick={close}>Explore all features <ArrowRight/></a><a href="compare.html" onClick={close}>Compare your options <ArrowRight/></a></div>
              </div>
            </div>
            <div className="mega-disclosure" onPointerEnter={(event) => openOnHover("resources", event)}>
              <button className="nav-link nav-dd-trigger" ref={resourceRef} aria-expanded={panel === "resources"} aria-controls={resourceId} onPointerDown={event => { clickPointer.current = event.pointerType; }} onClick={event => activatePanel("resources", event)}>Resources {caret}</button>
              <div className="mega-panel" id={resourceId} hidden={panel !== "resources"}>
                <div className="mega-inner resource-menu">
                  <a className="nav-dd-item" href="resources.html#learn" onClick={close}><span className="nav-dd-item-label">Getting started</span><span className="nav-dd-item-desc">Practical guidance for your first build</span></a>
                  <AppLink className="nav-dd-item" href={window.ABWAI.supportUrl} onClick={close}><span className="nav-dd-item-label">Help center</span><span className="nav-dd-item-desc">Guides and support in your workspace</span></AppLink>
                  <a className="nav-dd-item" href="use-cases.html" onClick={close}><span className="nav-dd-item-label">Examples</span><span className="nav-dd-item-desc">Explore different kinds of apps</span></a>
                </div>
              </div>
            </div>
            <a className="nav-link" href="use-cases.html" onClick={close}>Use cases</a>
            <a className="nav-link" href="how-it-works.html" onClick={close}>How it works</a>
            {!hidePricing && <a className="nav-link" href="pricing.html" onClick={close}>Pricing</a>}
            {!hideSignIn && <AppLink className="nav-link mobile-signin" onClick={close}>Sign in</AppLink>}
          </>}
        </nav>
        <div className="nav-cta">
          {!hideSignIn && <AppLink className="btn btn-ghost">Sign in</AppLink>}
          {!hideCta && (onCta ? <button className="btn btn-ink" onClick={onCta}>{ctaLabel || "Start free"}</button> : <AppLink className="btn btn-ink">{ctaLabel || "Start free"}</AppLink>)}
        </div>
      </div>
    </header>
    </>
  );
}

/* ============= HERO ============= */
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
    setText(s.replace(/^\S+\s+/, ""));
    setPulse(true);
    setTimeout(() => setPulse(false), 450);
    const card = document.querySelector(".prompt-card");
    if (card) window.scrollTo({ top: window.scrollY + card.getBoundingClientRect().top - 100, behavior: window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
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
          Tell it like you'd tell a friend. AppsBuiltWithAI builds the real, working app, and publishes it before your coffee gets cold.
        </p>

        <div className="prompt-glow">
          <PromptBox value={text} onChange={setText} pulse={pulse}/>
        </div>

        <p className="chips-label">or start with one of these</p>
        <div className="chips">
          {chips.map((c) => <button key={c} className="chip" onClick={() => pick(c)}>{c}</button>)}
        </div>

        {window.HeroBuilderDemo && <window.HeroBuilderDemo/>}
      </div>
    </section>
  );
}

/* ============= LOGOS  -  scrolling marquee ============= */
function Logos({ names: overrideNames, label }) {
  const [paused, setPaused] = useState(() => Boolean(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches));
  const names = overrideNames || ["Meta", "Anthropic", "Compass", "Together", "Hubspot", "ElevenLabs", "Notion", "Linear", "Stripe", "Vercel", "Cursor", "Brex", "Loom"];
  return (
    <section className="logos" data-paused={paused}>
      <div className="logos-label">{label || "Trusted by teams at companies like"}<button className="logos-pause" type="button" onClick={() => setPaused(!paused)}>{paused ? "Play" : "Pause"}<span className="sr-only"> scrolling names</span></button></div>
      <div className="logos-marquee">
        <div className="logos-track">
          {[...names, ...names].map((n, i) => <div key={i} className="logo-item" aria-hidden={i >= names.length ? "true" : undefined}>{n}</div>)}
        </div>
      </div>
    </section>
  );
}

/* ============= FEATURES (zigzag) ============= */
/* ============= ANIMATED PROMPT DEMO (Feature 01) ============= */
function TypewriterDemo({ paused = false }) {
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
    if (paused) return;
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
  }, [typed, phase, msgIdx, messages, paused]);

  const sent = phase === "reply" || phase === "idle";
  return (
    <div className="art-canvas art-warm typewriter-scene" role="img" aria-label="Illustrative conversation showing a request and a builder response">
      <div className="prompt-composer">
        <div className="pc-head">
          <span className="pc-dot"></span><span className="pc-dot"></span><span className="pc-dot"></span>
          <span className="pc-title">Illustrative conversation</span>
        </div>
        <div className="pc-thread">
          {sent && (
            <div className="pc-sent-msg">{messages[msgIdx]}</div>
          )}
          {phase === "reply" && (
            <div className="pc-ai-msg">
              <span className="dots"><span></span><span></span><span></span></span>
              <span style={{ marginLeft: 8 }}>On it. Building that now ✨</span>
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
          <button className={"pc-send" + (phase === "send" ? " fired" : "") + (typed && !sent ? " ready" : "")} aria-hidden="true" tabIndex={-1} disabled>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============= ANIMATED BUILD DEMO (Feature 02) ============= */
function BuildDemo({ paused = false }) {
  const [step, setStep] = React.useState(0);
  React.useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setStep((s) => (s + 1) % 6), 1500);
    return () => clearInterval(t);
  }, [paused]);
  const labels = ["Composing layout…", "Adding your menu…", "Wiring the order form…", "Polishing…", "✓ Example preview ready", "✓ Example preview ready"];
  const built = step >= 4;
  return (
    <div className="art-canvas art-sunset build-scene" role="img" aria-label="Illustrative animation of a bakery app taking shape, not a timed product recording">
      <span className="example-label demo-caption">Illustrative build preview</span>
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
          {built && <div className="bd-live-tag">● PREVIEW</div>}
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
  return <div className="art-canvas art-mint publish-scene"><div className="pub-browser">
    <div className="pub-browser-bar"><span className="dot r"/><span className="dot y"/><span className="dot g"/><span className="pub-browser-url">Illustrative website</span></div>
    <img className="example-screen" src="assets/examples/studio.jpg" alt="A finished illustrative studio portfolio website" width="1280" height="820" loading="lazy"/>
  </div></div>;
}

function FeatureLink({ children, href = "how-it-works.html", onStart }) {
  return onStart
    ? <button className="feature-link" onClick={onStart}>Join the waitlist <ArrowRight/></button>
    : <a className="feature-link" href={href}>{children} <ArrowRight/></a>;
}

function Features({ onStart }) {
  const [paused, setPaused] = React.useState(() => Boolean(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches));
  React.useEffect(() => {
    if (!window.matchMedia) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setPaused(query.matches);
    query.addEventListener("change", change);
    return () => query.removeEventListener("change", change);
  }, []);
  return (
    <section className="pad" id="features" data-screen-label="features" data-paused={paused}>
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="eyebrow">What it does for you</div>
          <h2>Type what you want.<br/><em>Watch it appear.</em></h2>
          <button type="button" className="preview-motion" onClick={() => setPaused(!paused)}>{paused ? "Play previews" : "Pause previews"}</button>
        </Reveal>

        <Reveal>
          <div className="feature">
            <div className="feature-art"><TypewriterDemo paused={paused}/></div>
            <div className="feature-copy">
              <div className="step-tag"><span className="step-num">01</span><span className="step-lbl">Describe</span></div>
              <h3>Tell it like you'd<br/>tell a friend.</h3>
              <p>No prompts to memorize. No "specifications." Just say what you want: "a pickup-order page for my bakery, with a time picker." It figures the rest out.</p>
              <FeatureLink onStart={onStart} href="use-cases.html">See examples</FeatureLink>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="feature reverse">
            <div className="feature-art"><BuildDemo paused={paused}/></div>
            <div className="feature-copy">
              <div className="step-tag"><span className="step-num">02</span><span className="step-lbl">Watch it build</span></div>
              <h3>Real software.<br/>In minutes.</h3>
              <p>A working app appears on screen in real time: buttons that click, forms that save, pages you can share. Want changes? Just ask.</p>
              <FeatureLink onStart={onStart}>Explore the build process</FeatureLink>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="feature">
            <div className="feature-art"><PublishDemo/></div>
            <div className="feature-copy">
              <div className="step-tag"><span className="step-num">03</span><span className="step-lbl">Ship it</span></div>
              <h3>One click.<br/>Live on the internet.</h3>
              <p>Click publish, get a real URL, send it to your customers. Bring your own domain on a paid plan when you are ready.</p>
              <FeatureLink onStart={onStart}>How publishing works</FeatureLink>
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
              That's the real difference here: with AppsBuiltWithAI, you actually ship.
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

window.PoofPart1 = { Reveal, Nav, Hero, Logos, Features, StatBand, PromptBox, Logo, ArrowRight, Check, Plus, AppLink };
