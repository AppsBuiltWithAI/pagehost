/* global React, PoofPart1, PoofPart3 */
const { Nav, ArrowRight, Logo } = window.PoofPart1;
const { Footer } = window.PoofPart3;
const { Agents } = window.PoofAgents;
const WaitlistV2 = window.WaitlistV2;
const EmailRow = window.WaitlistEmailRow;
const { useTweaks, TweaksPanel, TweakSection, TweakSelect, TweakSlider, TweakRadio, TweakColor } = window;

/* ============= 3-STEP FLOW (lovable-inspired, brand colors) ============= */

function Typewriter({ text, speed = 38, delay = 600 }) {
  const [n, setN] = React.useState(0);
  React.useEffect(() => {
    if (n >= text.length) return;
    const t = setTimeout(() => setN(n + 1), n === 0 ? delay : speed);
    return () => clearTimeout(t);
  }, [n, text, speed, delay]);
  return <React.Fragment>{text.slice(0, n)}</React.Fragment>;
}

function WaitlistFlow() {
  // Cycle through a few example prompts so the typing keeps going
  const prompts = React.useMemo(() => [
    { lead: "A booking page for my bakery — Saturday slots only, ", typed: "£15 deposit on each reservation." },
    { lead: "A storefront for my candles, ", typed: "with Stripe checkout & free UK shipping." },
    { lead: "A client intake form for my coaching biz, ", typed: "that emails me when someone signs up." },
    { lead: "An inventory tracker for my coffee shop, ", typed: "low-stock pings to my phone." },
  ], []);
  const [pi, setPi] = React.useState(0);
  const current = prompts[pi];
  // After the typed segment finishes, hold and rotate
  React.useEffect(() => {
    const fullLen = current.typed.length;
    const totalMs = 700 + fullLen * 42 + 1800; // delay + typing + hold
    const t = setTimeout(() => setPi((i) => (i + 1) % prompts.length), totalMs);
    return () => clearTimeout(t);
  }, [pi, current.typed, prompts.length]);

  return (
    <section className="wllp-flow" data-screen-label="waitlist-flow">
      <div className="wrap">
        <div className="wllp-flow-head">
          <span className="wllp-kicker">
            <span className="wllp-kicker-dot"></span>
            How it works
          </span>
          <h2 className="wllp-section-h">
            From a sentence<br/>
            to a <em>shippable app.</em>
          </h2>
          <p className="wllp-section-sub">
            Describe what you want in plain English. Chat with AI to build a
            working app and publish it before your coffee gets cold.
          </p>
        </div>

        <div className="voomly-embed" data-id="izmAOWnQARTHBVRB2OvRXNnDhUCHcvhbrwVRKP8NbQqSKhFdG" data-ratio="1.777778" data-type="v" data-skin-color="#008EFF" data-shadow="" style={{width:'100%',aspectRatio:'1.77778 / 1',background:'linear-gradient(45deg, rgb(142, 150, 164) 0%, rgb(201, 208, 222) 100%)',borderRadius:'10px',marginTop:'32px',marginBottom:'32px'}} />

        <div className="wllp-flow-grid">

          {/* 01 — Describe */}
          <div className="wllp-flow-card wllp-flow-1">
            <div className="wllp-flow-bg" aria-hidden="true">
              <div className="wllp-flow-blob wllp-flow-blob-a"></div>
              <div className="wllp-flow-blob wllp-flow-blob-b"></div>
            </div>
            <div className="wllp-flow-tag">01 · Describe</div>
            <h3 className="wllp-flow-h">Describe what you want in plain English.</h3>
            <p className="wllp-flow-p">
              Say it the way you'd say it to a friend. We'll handle the rest.
            </p>
            <div className="wllp-flow-art wllp-flow-prompt">
              <div className="wllp-prompt-tag-2">YOUR IDEA</div>
              <div className="wllp-prompt-body">
                <span>{current.lead}</span>
                <span className="wllp-prompt-typed" key={pi}>
                  <Typewriter text={current.typed} speed={42}/>
                </span>
                <span className="wllp-prompt-caret"></span>
              </div>
              <div className="wllp-prompt-foot">
                <span className="wllp-prompt-chip">📷 Add screenshot</span>
                <span className="wllp-prompt-chip">🎨 My brand</span>
                <span className="wllp-prompt-send">Build it →</span>
              </div>
            </div>
          </div>

          {/* 02 — AI builds */}
          <div className="wllp-flow-card wllp-flow-2">
            <div className="wllp-flow-bg" aria-hidden="true">
              <div className="wllp-flow-blob wllp-flow-blob-a"></div>
              <div className="wllp-flow-blob wllp-flow-blob-b"></div>
            </div>
            <div className="wllp-flow-tag">02 · AI builds</div>
            <h3 className="wllp-flow-h">Chat with AI to build the working app.</h3>
            <p className="wllp-flow-p">
              Designer, engineer, copywriter, tester — five specialists work in
              parallel. You watch the tasks tick off in plain English.
            </p>
            <div className="wllp-flow-art wllp-flow-build">
              <div className="wllp-build-row wllp-build-row-done">
                <span className="wllp-build-ic wllp-build-ic-mint">✓</span>
                <span className="wllp-build-text"><strong>Designer</strong> · picked colors & layout</span>
              </div>
              <div className="wllp-build-row wllp-build-row-done">
                <span className="wllp-build-ic wllp-build-ic-mint">✓</span>
                <span className="wllp-build-text"><strong>Engineer</strong> · wired the booking form</span>
              </div>
              <div className="wllp-build-row wllp-build-row-active">
                <span className="wllp-build-ic wllp-build-ic-coral">
                  <span className="wllp-spinner"></span>
                </span>
                <span className="wllp-build-text"><strong>Copy</strong> · drafting confirmation email
                  <span className="wllp-dots"><span></span><span></span><span></span></span>
                </span>
              </div>
              <div className="wllp-build-row">
                <span className="wllp-build-ic">·</span>
                <span className="wllp-build-text"><strong>QA</strong> · click-test every flow</span>
              </div>
              <div className="wllp-build-bar"><span></span></div>
            </div>
          </div>

          {/* 03 — Publish */}
          <div className="wllp-flow-card wllp-flow-3">
            <div className="wllp-flow-bg" aria-hidden="true">
              <div className="wllp-flow-blob wllp-flow-blob-a"></div>
              <div className="wllp-flow-blob wllp-flow-blob-b"></div>
            </div>
            <div className="wllp-flow-tag">03 · Publish</div>
            <h3 className="wllp-flow-h">Publish before your coffee gets cold.</h3>
            <p className="wllp-flow-p">
              Hit publish. Get an SSL'd domain, hosting that just works, and edits
              that go live the second you save.
            </p>
            <div className="wllp-flow-art wllp-flow-browser">
              <div className="wllp-browser-bar">
                <span></span><span></span><span></span>
                <span className="wllp-browser-url">maudsbakery.appsbuiltwithai.com</span>
              </div>
              <div className="wllp-browser-body">
                <div className="wllp-browser-hero">
                  <div className="wllp-browser-h">Maud's Bakery</div>
                  <div className="wllp-browser-sub">Saturday pickup · weekly drops</div>
                </div>
                <div className="wllp-browser-thumb"></div>
                <div className="wllp-browser-cta">Reserve · £15 deposit</div>
              </div>
              <div className="wllp-publish-pill">
                <span className="wllp-publish-dot"></span>
                Live in 1m 42s
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
function WaitlistFinalCta() {
  return (
    <section className="final wllp-final" data-screen-label="waitlist-final">
      <div className="wllp-final-watermark" aria-hidden="true">
        <svg viewBox="0 0 200 200">
          <defs>
            <linearGradient id="wllp-wm" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FB8855"/>
              <stop offset="50%" stopColor="#D45F7E"/>
              <stop offset="100%" stopColor="#9C3597"/>
            </linearGradient>
          </defs>
          <path fill="url(#wllp-wm)" d="M100 0 L120 80 L200 100 L120 120 L100 200 L80 120 L0 100 L80 80 Z"/>
        </svg>
      </div>
      <div className="wrap-tight" style={{ position: "relative", zIndex: 1 }}>
        <span className="wllp-kicker">
          <span className="wllp-kicker-dot"></span>
          Coming soon
        </span>
        <h2>
          Be the first<br/>
          to <em>ship something.</em>
        </h2>
        <p>
          Doors open in waves. Get on the list now and we'll send your invite the
          moment your seat is ready.
        </p>

        <div className="wllp-final-form">
          <EmailRow btn="Reserve my spot"/>
        </div>

        <div className="wllp-final-stats wllp-final-stats-solo">
          <div>
            <div className="wllp-final-num">Public launch</div>
            <div className="wllp-final-cap">coming soon</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============= EXIT-INTENT POPUP ============= */

function ExitPopup() {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [done, setDone] = React.useState(false);
  const shown = React.useRef(false);

  React.useEffect(() => {
    const fire = () => {
      if (shown.current) return;
      shown.current = true;
      setOpen(true);
    };
    // Exit intent: mouse moves above viewport (top of page)
    const onMouseOut = (e) => {
      if (e.clientY <= 0 || e.relatedTarget === null && e.clientY < 50) fire();
    };
    document.addEventListener("mouseout", onMouseOut);
    // Exit intent: mouse leaves the document element entirely
    const onLeave = () => fire();
    document.documentElement.addEventListener("mouseleave", onLeave);
    // Timed fallback: show after 30 seconds regardless
    const t = setTimeout(fire, 30000);
    return () => {
      clearTimeout(t);
      document.removeEventListener("mouseout", onMouseOut);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  if (!open) return null;
  const valid = /\S+@\S+\.\S+/.test(email);

  const submit = (e) => {
    e.preventDefault();
    if (!valid) return;
    const em = email.trim().toLowerCase();
    const position = 1200 + Math.floor(Math.random() * 7800);
    const refLink = "appsbuiltwithai.com/join/" + (em.split("@")[0].replace(/[^a-z0-9]/g, "") || "you");
    const cio = (fn, ...args) => {
      if (typeof window !== "undefined" && window._cio && typeof window._cio[fn] === "function") {
        window._cio[fn](...args);
      }
    };
    try {
      cio("identify", {
        id: em,
        email: em,
        created_at: Math.floor(Date.now() / 1000),
        source: "exit_intent",
        credit_bonus: 100,
        waitlist_position: position,
        referral_link: refLink,
      });
      cio("track", "joined_waitlist", {
        email: em,
        position: position,
        source: "exit_intent",
      });
    } catch (err) {}
    setDone(true);
  };

  return (
    <div className="wllp-exit-scrim" onClick={() => setOpen(false)}>
      <div className="wllp-exit" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Claim 100 free credits">
        <button className="wllp-exit-x" onClick={() => setOpen(false)} aria-label="Close">&times;</button>

        <aside className="wllp-exit-art" aria-hidden="true">
          <div className="wllp-exit-orb wllp-exit-orb-a"></div>
          <div className="wllp-exit-orb wllp-exit-orb-b"></div>
          <div className="wllp-exit-coin">
            <span className="wllp-exit-coin-num">100</span>
            <span className="wllp-exit-coin-lbl">CREDITS</span>
          </div>
          <div className="wllp-exit-chip wllp-exit-chip-1">&asymp; 1 full app</div>
          <div className="wllp-exit-chip wllp-exit-chip-2">&#10022; Launch day</div>
          <div className="wllp-exit-chip wllp-exit-chip-3">$0 to start</div>
        </aside>

        <div className="wllp-exit-body">
          {done ? (
            <div className="wllp-exit-done">
              <div className="wllp-exit-check">&#10003;</div>
              <h3>Credits locked in.</h3>
              <p>Your invite will land with <strong>100 credits</strong> already in the account — about one full app, on us.</p>
              <button className="btn btn-coral btn-lg" onClick={() => setOpen(false)}>Back to the page</button>
            </div>
          ) : (
            <React.Fragment>
              <div className="wllp-exit-badge">&#9889; Launch-day gift</div>
              <h3>Before you go —<br/><em>100 credits</em> are yours.</h3>
              <p>Join the waitlist now and we'll drop them in the day we launch. Enough to build and publish a whole app, free.</p>
              <form className="wllp-exit-form" onSubmit={submit}>
                <input type="email" placeholder="you@work.com" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus/>
                <button className="btn btn-coral" type="submit" disabled={!valid}>Claim my 100 credits</button>
              </form>
              <div className="wllp-exit-fine">
                <span>&#10003; No card</span><span>&#10003; No spam</span><span>&#10003; One email when your seat opens</span>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============= PAGE ============= */

const WAITLIST_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "headlineFont": "Roboto",
  "bodyFont": "Roboto",
  "headlineWeight": 900,
  "italicEm": "normal",
  "tracking": -0.03,
  "accent": "#FF5C4D"
}/*EDITMODE-END*/;

const HEADLINE_FONTS = [
  { value: "Fraunces",          label: "Fraunces" },
  { value: "Instrument Serif",  label: "Instrument" },
  { value: "Playfair Display",  label: "Playfair" },
  { value: "DM Serif Display",  label: "DM Serif" },
  { value: "Roboto Serif",      label: "R. Serif" },
  { value: "Roboto",            label: "Roboto" },
  { value: "DM Sans",           label: "DM Sans" },
  { value: "Inter",             label: "Inter" },
];

const BODY_FONTS = [
  { value: "Inter",             label: "Inter" },
  { value: "Roboto",            label: "Roboto" },
  { value: "DM Sans",           label: "DM Sans" },
  { value: "IBM Plex Sans",     label: "Plex" },
];

function applyWaitlistTweaks(t) {
  // Build a font-family stack with sensible serif/sans fallbacks
  const isSerif = /Serif|Fraunces|Playfair|Instrument/i.test(t.headlineFont);
  const headStack = `"${t.headlineFont}", ${isSerif ? '"Times New Roman", serif' : '-apple-system, "Segoe UI", sans-serif'}`;
  const sansStack = `"${t.bodyFont}", -apple-system, "Segoe UI", sans-serif`;
  return {
    "--f-head": headStack,
    "--f-sans": sansStack,
    "--h-weight": String(t.headlineWeight),
    "--h-italic": t.italicEm,
    "--h-spacing": `${t.tracking}em`,
    "--coral": t.accent,
    "--coral-deep": t.accent,
  };
}

function WaitlistLandingPage() {
  const [t, setTweak] = useTweaks(WAITLIST_TWEAK_DEFAULTS);
  const tweakVars = applyWaitlistTweaks(t);

  React.useEffect(() => {
    const footerLogo = document.querySelector('.footer-brand .logo');
    if (footerLogo) footerLogo.href = 'waitlist-landing.html';

    // Load Voomly embed script
    if (!document.querySelector('script[src*="voomly.com"]')) {
      const s = document.createElement('script');
      s.src = 'https://embed.voomly.com/embed/embed-build.js';
      document.body.appendChild(s);
    }
  }, []);

  return (
    <div className="wllp-root" style={tweakVars}>
      {/* Logo bar */}
      <header className="wllp-topbar">
        <div className="wrap wllp-topbar-inner">
          <a className="logo" href="waitlist-landing.html">
            <img src="assets/logo-primary.png" alt="AppsBuiltWithAI" className="logo-lockup"/>
          </a>
          <span className="wllp-topbar-tag">
            <span className="wllp-kicker-dot"></span>
            Coming soon
          </span>
        </div>
      </header>

      {/* V2 hero, dropped into the landing as-is */}
      <div className="wllp-hero-host">
        <WaitlistV2/>
      </div>

      {/* 3-step flow */}
      <WaitlistFlow/>

      {/* Agents — same as the main landing page */}
      <Agents/>

      {/* Benefits before the final CTA */}
      <section className="wllp-perks" data-screen-label="waitlist-perks">
        <div className="wrap">
          <div className="wllp-perks-grid">
            <div className="wllp-perk">
              <div className="wllp-perk-ic" style={{ background: "var(--coral-tint)", color: "var(--coral-deep)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 L13.09 8.26 L20 9 L15 13.74 L16.18 21 L12 17.27 L7.82 21 L9 13.74 L4 9 L10.91 8.26 Z"/></svg>
              </div>
              <h4>Free during beta</h4>
              <p>No card, no trial timer. Build as much as you want while we're in private beta.</p>
            </div>
            <div className="wllp-perk">
              <div className="wllp-perk-ic" style={{ background: "var(--mint-tint)", color: "var(--mint)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-12V5l-8-3-8 3v5c0 8 8 12 8 12Z"/></svg>
              </div>
              <h4>Yours forever</h4>
              <p>Export the source, host wherever. We're not holding your app hostage.</p>
            </div>
            <div className="wllp-perk">
              <div className="wllp-perk-ic" style={{ background: "var(--sun-tint)", color: "#9a7000" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 L3 14 L12 14 L11 22 L21 10 L12 10 Z"/></svg>
              </div>
              <h4>Live in minutes</h4>
              <p>Median first build: 9 minutes from blank prompt to a real URL you can share.</p>
            </div>
            <div className="wllp-perk">
              <div className="wllp-perk-ic" style={{ background: "var(--pink-tint)", color: "#b03470" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z"/></svg>
              </div>
              <h4>You direct, we type</h4>
              <p>Plain-English edits, applied live. You'll never look at code unless you want to.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 90% stat statement — moved down, stacks cleanly on mobile */}
      <section className="wllp-statband" data-screen-label="waitlist-stat">
        <div className="wrap-tight wllp-statband-inner">
          <span className="wllp-statband-num">90%</span>
          <p className="wllp-statband-text">
            of people who build an app on every other platform
            <strong> never launch it.</strong> We figured out why.
          </p>
        </div>
      </section>

      <WaitlistFinalCta/>

      <Footer/>

      <ExitPopup/>

      <TweaksPanel title="Tweaks · Fonts & color">
        <TweakSection label="Headlines"/>
        <TweakSelect label="Headline font" value={t.headlineFont}
                     options={HEADLINE_FONTS}
                     onChange={(v) => setTweak('headlineFont', v)} />
        <TweakSlider label="Weight" value={t.headlineWeight} min={300} max={900} step={50}
                     onChange={(v) => setTweak('headlineWeight', v)} />
        <TweakSlider label="Tracking" value={t.tracking} min={-0.06} max={0.02} step={0.005} unit=""
                     onChange={(v) => setTweak('tracking', v)} />
        <TweakRadio label="Em style" value={t.italicEm}
                    options={[
                      { label: 'Italic', value: 'italic' },
                      { label: 'Upright', value: 'normal' },
                    ]}
                    onChange={(v) => setTweak('italicEm', v)} />

        <TweakSection label="Body"/>
        <TweakSelect label="Body font" value={t.bodyFont}
                     options={BODY_FONTS}
                     onChange={(v) => setTweak('bodyFont', v)} />

        <TweakSection label="Accent"/>
        <TweakColor label="Accent color" value={t.accent}
                    options={['#FF5C4D', '#E84A3C', '#1FB295', '#6FA8E0', '#9C3597', '#FFC53D', '#181818']}
                    onChange={(v) => setTweak('accent', v)} />
      </TweaksPanel>
    </div>
  );
}

window.WaitlistLandingPage = WaitlistLandingPage;
