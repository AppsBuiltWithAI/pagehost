import React, { useState } from 'react';
/* ============= shared bits ============= */

function HeroArtMini() {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id="wlsky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0E0915"/>
          <stop offset="40%" stopColor="#3A1F5C"/>
          <stop offset="75%" stopColor="#9C3597"/>
          <stop offset="100%" stopColor="#FB8855"/>
        </linearGradient>
        <radialGradient id="wllamp" cx="80%" cy="20%" r="42%">
          <stop offset="0%" stopColor="#FFB37A" stopOpacity=".95"/>
          <stop offset="45%" stopColor="#D45F7E" stopOpacity=".45"/>
          <stop offset="100%" stopColor="#9C3597" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="wlwood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1A0F22"/>
          <stop offset="100%" stopColor="#0A0510"/>
        </linearGradient>
        <linearGradient id="wldark" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#000" stopOpacity=".68"/>
          <stop offset="45%" stopColor="#000" stopOpacity=".28"/>
          <stop offset="70%" stopColor="#000" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#wlsky)"/>
      <ellipse cx="1300" cy="180" rx="600" ry="320" fill="url(#wllamp)"/>
      <path d="M0 580 L1600 500 L1600 900 L0 900 Z" fill="url(#wlwood)"/>
      <path d="M0 580 L1600 500 L1600 518 L0 600 Z" fill="#4A2818" opacity=".55"/>
      <g transform="translate(900, 340)">
        <rect x="40" y="0" width="640" height="360" rx="10" fill="#15151a"/>
        <rect x="54" y="14" width="612" height="332" rx="5" fill="#fff"/>
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
        <path d="M0 360 L720 360 L688 400 L32 400 Z" fill="#202028"/>
      </g>
      <ellipse cx="1380" cy="780" rx="70" ry="18" fill="#0e0805"/>
      <path d="M1320 770 Q1320 838 1380 845 Q1440 838 1440 770 Z" fill="#E8D2A8"/>
      <ellipse cx="1380" cy="770" rx="58" ry="12" fill="#2E1408"/>
      <rect width="1600" height="900" fill="url(#wldark)"/>
      <rect width="1600" height="900" fill="url(#wllamp)" opacity=".2"/>
    </svg>
  );
}

/* ---------- countries for the phone dropdown ---------- */
const COUNTRIES = [
  { code: "US", flag: "🇺🇸", dial: "+1", name: "United States" },
  { code: "CA", flag: "🇨🇦", dial: "+1", name: "Canada" },
  { code: "GB", flag: "🇬🇧", dial: "+44", name: "United Kingdom" },
  { code: "AU", flag: "🇦🇺", dial: "+61", name: "Australia" },
  { code: "NZ", flag: "🇳🇿", dial: "+64", name: "New Zealand" },
  { code: "IE", flag: "🇮🇪", dial: "+353", name: "Ireland" },
  { code: "DE", flag: "🇩🇪", dial: "+49", name: "Germany" },
  { code: "FR", flag: "🇫🇷", dial: "+33", name: "France" },
  { code: "ES", flag: "🇪🇸", dial: "+34", name: "Spain" },
  { code: "IT", flag: "🇮🇹", dial: "+39", name: "Italy" },
  { code: "NL", flag: "🇳🇱", dial: "+31", name: "Netherlands" },
  { code: "SE", flag: "🇸🇪", dial: "+46", name: "Sweden" },
  { code: "NO", flag: "🇳🇴", dial: "+47", name: "Norway" },
  { code: "DK", flag: "🇩🇰", dial: "+45", name: "Denmark" },
  { code: "FI", flag: "🇫🇮", dial: "+358", name: "Finland" },
  { code: "PL", flag: "🇵🇱", dial: "+48", name: "Poland" },
  { code: "PT", flag: "🇵🇹", dial: "+351", name: "Portugal" },
  { code: "CH", flag: "🇨🇭", dial: "+41", name: "Switzerland" },
  { code: "AT", flag: "🇦🇹", dial: "+43", name: "Austria" },
  { code: "BE", flag: "🇧🇪", dial: "+32", name: "Belgium" },
  { code: "MX", flag: "🇲🇽", dial: "+52", name: "Mexico" },
  { code: "BR", flag: "🇧🇷", dial: "+55", name: "Brazil" },
  { code: "AR", flag: "🇦🇷", dial: "+54", name: "Argentina" },
  { code: "CL", flag: "🇨🇱", dial: "+56", name: "Chile" },
  { code: "CO", flag: "🇨🇴", dial: "+57", name: "Colombia" },
  { code: "IN", flag: "🇮🇳", dial: "+91", name: "India" },
  { code: "SG", flag: "🇸🇬", dial: "+65", name: "Singapore" },
  { code: "HK", flag: "🇭🇰", dial: "+852", name: "Hong Kong" },
  { code: "JP", flag: "🇯🇵", dial: "+81", name: "Japan" },
  { code: "KR", flag: "🇰🇷", dial: "+82", name: "South Korea" },
  { code: "CN", flag: "🇨🇳", dial: "+86", name: "China" },
  { code: "TW", flag: "🇹🇼", dial: "+886", name: "Taiwan" },
  { code: "MY", flag: "🇲🇾", dial: "+60", name: "Malaysia" },
  { code: "PH", flag: "🇵🇭", dial: "+63", name: "Philippines" },
  { code: "ID", flag: "🇮🇩", dial: "+62", name: "Indonesia" },
  { code: "TH", flag: "🇹🇭", dial: "+66", name: "Thailand" },
  { code: "VN", flag: "🇻🇳", dial: "+84", name: "Vietnam" },
  { code: "AE", flag: "🇦🇪", dial: "+971", name: "UAE" },
  { code: "SA", flag: "🇸🇦", dial: "+966", name: "Saudi Arabia" },
  { code: "IL", flag: "🇮🇱", dial: "+972", name: "Israel" },
  { code: "TR", flag: "🇹🇷", dial: "+90", name: "Turkey" },
  { code: "EG", flag: "🇪🇬", dial: "+20", name: "Egypt" },
  { code: "ZA", flag: "🇿🇦", dial: "+27", name: "South Africa" },
  { code: "NG", flag: "🇳🇬", dial: "+234", name: "Nigeria" },
  { code: "KE", flag: "🇰🇪", dial: "+254", name: "Kenya" },
];

function PhoneInput({ country, setCountry, phone, setPhone }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const filtered = query
    ? COUNTRIES.filter((c) =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.dial.includes(query) ||
        c.code.toLowerCase().includes(query.toLowerCase()))
    : COUNTRIES;

  return (
    <div className="wlv-phone" ref={wrapRef}>
      <button
        type="button"
        className="wlv-phone-flag"
        onClick={() => setOpen((v) => !v)}
        aria-label="Select country"
        aria-expanded={open}
      >
        <span className="wlv-phone-flag-emoji">{country.flag}</span>
        <span className="wlv-phone-dial">{country.dial}</span>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: .55 }}><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <input
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        placeholder="555 123 4567"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />

      {open && (
        <div className="wlv-phone-pop" role="listbox">
          <input
            type="text"
            className="wlv-phone-search"
            placeholder="Search country…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <div className="wlv-phone-list">
            {filtered.length === 0 && (
              <div className="wlv-phone-empty">No matches</div>
            )}
            {filtered.map((c) => (
              <button
                key={c.code}
                type="button"
                role="option"
                aria-selected={c.code === country.code}
                className={"wlv-phone-opt" + (c.code === country.code ? " is-on" : "")}
                onClick={() => { setCountry(c); setOpen(false); setQuery(""); }}
              >
                <span className="wlv-phone-opt-flag">{c.flag}</span>
                <span className="wlv-phone-opt-name">{c.name}</span>
                <span className="wlv-phone-opt-dial">{c.dial}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function EmailRow({ variant = "coral", placeholder = "you@work.com", btn = "Join waitlist" }) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [step, setStep] = useState("email"); // email | phone | done

  // simulated waitlist position + referral mechanics: randomized each session
  const [{ startingPos, finalPos, bumpPerShare }] = useState(() => {
    const final = 1200 + Math.floor(Math.random() * 7800);   // 1,200 to 9,000
    const start = final + 80 + Math.floor(Math.random() * 70); // 80 to 150 above
    const bump = 60 + Math.floor(Math.random() * 90);        // 60 to 150 per share
    return { startingPos: start, finalPos: final, bumpPerShare: bump };
  });
  const [pos, setPos] = useState(startingPos);
  const [refs, setRefs] = useState(0);
  const [copied, setCopied] = useState(false);
  const [shareErr, setShareErr] = useState("");
  const refLink = email
    ? `appsbuiltwithai.com/join/${email.split("@")[0].toLowerCase().replace(/[^a-z0-9]/g, "") || "you"}`
    : "appsbuiltwithai.com/join/you";

  // Customer.io helpers: no-op if snippet hasn't loaded
  const cio = (fn, ...args) => {
    if (typeof window !== "undefined" && window._cio && typeof window._cio[fn] === "function") {
      window._cio[fn](...args);
    }
  };

  const submitEmail = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    cio("identify", {
      id: email.trim().toLowerCase(),
      email: email.trim().toLowerCase(),
      created_at: Math.floor(Date.now() / 1000),
      source: "waitlist_landing",
      waitlist_position: finalPos,
      referral_link: refLink,
    });
    cio("track", "joined_waitlist", {
      email: email.trim().toLowerCase(),
      position: finalPos,
    });
    setStep("phone");
  };

  const submitPhone = (e) => {
    e.preventDefault();
    if (!phone.trim()) return;
    const fullPhone = `${country.dial} ${phone.trim()}`;
    cio("identify", {
      id: email.trim().toLowerCase(),
      phone: fullPhone,
      phone_country: country.code,
    });
    cio("track", "added_phone", { phone: fullPhone, country: country.code });
    setStep("done");
  };

  const skipPhone = () => {
    cio("track", "skipped_phone");
    setStep("done");
  };

  // animate position number down when done step shows
  React.useEffect(() => {
    if (step !== "done") return;
    setPos(startingPos);
    let frame;
    const start = performance.now();
    const duration = 1400;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setPos(Math.round(startingPos - (startingPos - finalPos) * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [step]);

  const MAX_SHARES = 10;
  const handleShare = (channel) => {
    if (refs >= MAX_SHARES) return; // hard stop: no more bumps after 10
    const next = Math.min(refs + 1, MAX_SHARES);
    setRefs(next);
    cio("track", "shared_referral", {
      channel: channel || "unknown",
      total_shares: next,
      position: Math.max(finalPos - next * bumpPerShare, 12),
    });
  };
  // Best-effort clipboard write. Tries the modern API first, falls back to a
  // hidden textarea + execCommand, and swallows every error so a blocked
  // clipboard never bubbles up as an "unhandled" rejection.
  const writeClipboard = (text) => {
    const useExecCommand = () => {
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.top = "-1000px";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); } catch (e) {}
        document.body.removeChild(ta);
      } catch (e) { /* give up quietly */ }
    };
    try {
      if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
        const p = navigator.clipboard.writeText(text);
        if (p && typeof p.catch === "function") p.catch(useExecCommand);
        return;
      }
    } catch (e) { /* fall through */ }
    useExecCommand();
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
    cio("track", "copied_referral_link", { link: refLink });
    handleShare("copy_link");
    writeClipboard("https://" + refLink);
  };

  // Native share: opens the OS share sheet so the user can fire it off to
  // whatever they actually have installed (WhatsApp, iMessage, Slack, etc.).
  // Falls back to copying the link if Web Share isn't available OR is blocked
  // (e.g. inside a preview iframe without `allow="web-share"`, non-HTTPS, etc.)
  const copyFallback = (note) => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
    writeClipboard("https://" + refLink);
    handleShare("copy_link");
    setShareErr(note || "Link copied: paste it anywhere.");
    setTimeout(() => setShareErr(""), 2400);
  };
  const handleNativeShare = async () => {
    const url = "https://" + refLink;
    const payload = {
      title: "AppsBuiltWithAI",
      text: "I just joined the AppsBuiltWithAI waitlist: jump the line with me:",
      url,
    };
    const canShare = typeof navigator !== "undefined" && typeof navigator.share === "function";
    if (!canShare) {
      copyFallback();
      return;
    }
    try {
      await navigator.share(payload);
      handleShare("native_share");
    } catch (e) {
      // AbortError = user dismissed the sheet on purpose: stay quiet.
      if (e && (e.name === "AbortError" || /aborted|cancel/i.test(String(e.message || "")))) {
        return;
      }
      // Anything else (Permission denied, NotAllowedError, SecurityError, …)
      // means we can't open the OS sheet here: copy instead.
      copyFallback();
    }
  };

  const displayPos = Math.max(finalPos - refs * bumpPerShare, 12);

  return (
    <div className={"wlv-stepper wlv-stepper-" + step}>

      {step === "email" && (
        <form className={"wlv-form wlv-form-" + variant} onSubmit={submitEmail} key="email">
          <input
            type="email"
            placeholder={placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">
            {btn}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </button>
        </form>
      )}

      {step === "phone" && (
        <div className="wlv-step wlv-step-phone" key="phone">
          <div className="wlv-step-head">
            <span className="wlv-step-ic">🎁</span>
            <div>
              <div className="wlv-step-h">Want <strong>$50 in free credits?</strong></div>
              <div className="wlv-step-sub">Drop your number for early-access perks. Totally optional.</div>
            </div>
          </div>
          <form className={"wlv-form wlv-form-" + variant + " wlv-form-phone"} onSubmit={submitPhone}>
            <PhoneInput country={country} setCountry={setCountry} phone={phone} setPhone={setPhone}/>
            <button type="submit">
              Get credits
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </button>
          </form>
          <button type="button" className="wlv-skip" onClick={skipPhone}>
            Skip: just put me on the list
          </button>
        </div>
      )}

      {step === "done" && (
        <div className="wlv-step wlv-step-done wlv-done-card" key="done">
          <div className="wlv-confetti" aria-hidden="true">
            <span></span><span></span><span></span><span></span><span></span>
            <span></span><span></span><span></span><span></span><span></span>
          </div>

          <div className="wlv-done-head">
            <div className="wlv-done-ic">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
            </div>
            <div className="wlv-done-text">
              <div className="wlv-done-h">You're in.</div>
              <div className="wlv-done-sub">We'll email <strong>{email || "you"}</strong>{phone ? <React.Fragment> and text <strong>{phone}</strong></React.Fragment> : null} when it's your turn.</div>
            </div>
          </div>

          {/* Position reveal */}
          <div className="wlv-pos">
            <div className="wlv-pos-label">Your spot in line</div>
            <div className="wlv-pos-num">
              <span className="wlv-pos-hash">#</span>
              <span className="wlv-pos-digits">{displayPos.toLocaleString()}</span>
            </div>
            <div className="wlv-queue" aria-hidden="true">
              {Array.from({ length: 21 }).map((_, i) => {
                const center = 10;
                const isYou = i === center;
                return (
                  <span
                    key={i}
                    className={"wlv-queue-dot" + (isYou ? " is-you" : "")}
                    style={{ animationDelay: `${i * 40}ms` }}
                  >{isYou ? "you" : ""}</span>
                );
              })}
            </div>
          </div>

          {/* Referral */}
          <div className="wlv-ref">
            <div className="wlv-ref-head">
              <span className="wlv-ref-bolt">⚡</span>
              <div>
                <div className="wlv-ref-h">Skip the line.</div>
                <div className="wlv-ref-sub">Every friend who joins bumps you up <strong>{bumpPerShare} spots</strong>. Cap: {MAX_SHARES} shares.</div>
              </div>
            </div>
            <div className="wlv-ref-link">
              <span className="wlv-ref-url">{refLink}</span>
              <button type="button" className={"wlv-ref-copy" + (copied ? " is-copied" : "")} onClick={handleCopy}>
                {copied ? "Copied ✓" : "Copy link"}
              </button>
            </div>
            <div className="wlv-ref-shares wlv-ref-shares-solo">
              <button
                type="button"
                className={"wlv-ref-btn wlv-ref-share" + (refs >= MAX_SHARES ? " is-maxed" : "")}
                onClick={handleNativeShare}
                disabled={refs >= MAX_SHARES}
              >
                {refs >= MAX_SHARES ? (
                  <React.Fragment>✨ You’ve maxed your bumps</React.Fragment>
                ) : (
                  <React.Fragment>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                    Share
                  </React.Fragment>
                )}
              </button>
            </div>
            {shareErr && <div className="wlv-ref-note">{shareErr}</div>}
            {refs > 0 && (
              <div className="wlv-ref-meter">
                <span>{refs} / {MAX_SHARES} {refs === 1 ? "share" : "shares"}</span>
                <span className="wlv-ref-sep">·</span>
                <span><strong>+{refs * bumpPerShare}</strong> spots gained</span>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

function SocialProof({ tone = "light" }) {
  return (
    <div className={"wlv-social wlv-social-" + tone}>
      <div className="wlv-avs">
        <div className="wlv-av wlv-av-1">M</div>
        <div className="wlv-av wlv-av-2">J</div>
        <div className="wlv-av wlv-av-3">R</div>
        <div className="wlv-av wlv-av-4">+</div>
      </div>
      <div className="wlv-social-text">
        <strong>Public launch</strong> · coming soon
      </div>
    </div>
  );
}

/* =========================================================
   V1: Classic overlay (mirrors index hero, form lives in card)
   ========================================================= */
function WaitlistV1() {
  return (
    <section className="hero wlv-shell" style={{ padding: "32px 28px" }}>
      <div className="hero-card">
        <div className="hero-photo"><HeroArtMini/></div>
        <div className="bubble bubble-user">"a booking page for my bakery"</div>
        <div className="bubble bubble-ai">Got it. ✨ Saving your spot: <em>you're #4,219.</em></div>

        <div className="hero-content">
          <span className="hero-eyebrow"><span className="dot"></span>Coming soon · Private beta</span>
          <h1 className="hero-h">
            The app builder<br/>
            for <em>non-coders.</em>
          </h1>
          <p className="hero-sub">
            Describe what you want in plain English. AppsBuiltWithAI builds the real, working app, and publishes it before your coffee gets cold. Be first when the doors open.
          </p>

          <div className="wlv-inline-form">
            <EmailRow/>
            <p className="wlv-fine wlv-fine-dark">Coming soon. No spam: one note when it's your turn.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   V2: Card + floating form below (mirrors PromptBox pattern)
   ========================================================= */
function WaitlistV2() {
  return (
    <section className="hero wlv-shell" style={{ padding: "32px 28px 56px" }}>
      <div className="hero-card">
        <div className="hero-photo"><HeroArtMini/></div>
        <div className="bubble bubble-user">"I want in when it launches"</div>
        <div className="bubble bubble-ai">Saved. ✨ See you on <em>launch day.</em></div>

        <div className="hero-content">
          <h1 className="hero-h">
            Describe your app.<br/>
            <em>We'll build it.</em>
          </h1>
          <p className="hero-sub">
            The app builder for people who don't code. Say what you want in
            plain English: get a real, working app on a real URL, usually in
            under ten minutes.
          </p>
        </div>
      </div>

      {/* floating form card, mirroring .prompt-card */}
      <div className="wlv-float">
        <span className="wlv-float-tag">JOIN THE WAITLIST</span>
        <div className="wlv-float-row">
          <EmailRow/>
        </div>
        <div className="wlv-float-foot">
          <SocialProof/>
          <span className="wlv-meta">Free while in beta · <strong>no card</strong></span>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   V3: Minimal, headline-only, ticket-style form chip
   ========================================================= */
function WaitlistV3() {
  return (
    <section className="hero wlv-shell" style={{ padding: "32px 28px" }}>
      <div className="hero-card wlv-card-tall">
        <div className="hero-photo"><HeroArtMini/></div>

        <div className="hero-content wlv-content-center">
          <span className="hero-eyebrow"><span className="dot"></span>Coming soon</span>
          <h1 className="hero-h">
            The app builder<br/>
            for <em>non-coders.</em>
          </h1>
          <p className="hero-sub" style={{ marginBottom: 28 }}>
            One sentence in. A real, working app out. Be first.
          </p>

          <div className="wlv-ticket">
            <EmailRow placeholder="you@work.com" btn="Reserve my spot"/>
            <div className="wlv-ticket-meta">
              <span className="wlv-ticket-dot"></span>
              <span><strong>4,218</strong> on the list</span>
              <span className="wlv-ticket-sep">·</span>
              <span>invites weekly</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   V4: Split: dark hero left, cream form right (still uses hero-card chrome)
   ========================================================= */
function WaitlistV4() {
  return (
    <section className="hero wlv-shell" style={{ padding: "32px 28px" }}>
      <div className="hero-card wlv-card-split">
        <div className="wlv-split-art">
          <div className="hero-photo"><HeroArtMini/></div>
          <div className="hero-content wlv-split-copy">
            <span className="hero-eyebrow"><span className="dot"></span>Coming soon</span>
            <h1 className="hero-h">
              The app builder<br/>
              for <em>non-coders.</em>
            </h1>
            <p className="hero-sub">
              Describe what you want in plain English. We build the real, working app.
            </p>
          </div>
        </div>

        <div className="wlv-split-form">
          <div className="wlv-split-tag">
            <span className="wlv-badge-dot"></span>
            <span>JOINING · 4,218</span>
          </div>
          <h2 className="wlv-split-h">
            Be first in line<br/>
            <em>when we open.</em>
          </h2>
          <p className="wlv-split-sub">
            We're letting builders in weekly. Drop your email: we'll text you when
            your seat is ready.
          </p>

          <EmailRow btn="Get my invite"/>

          <ul className="wlv-checks">
            <li><span className="wlv-check"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span> One-sentence prompt → live app</li>
            <li><span className="wlv-check"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span> Hosting, payments, email: included</li>
            <li><span className="wlv-check"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span> Free during the beta</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   Canvas mount
   ========================================================= */
function WaitlistVariations() {
  const { DesignCanvas, DCSection, DCArtboard } = window;
  return (
    <DesignCanvas>
      <DCSection id="waitlist" title="Waitlist · Coming soon" subtitle="Same headline, same hero-card box, four directions">
        <DCArtboard id="v1" label="V1 · Inline form" width={1180} height={820}>
          <WaitlistV1/>
        </DCArtboard>
        <DCArtboard id="v2" label="V2 · Floating form below" width={1180} height={920}>
          <WaitlistV2/>
        </DCArtboard>
        <DCArtboard id="v3" label="V3 · Ticket, centered" width={1180} height={820}>
          <WaitlistV3/>
        </DCArtboard>
        <DCArtboard id="v4" label="V4 · Split, form on the right" width={1180} height={780}>
          <WaitlistV4/>
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

export { WaitlistVariations, WaitlistV2, EmailRow as WaitlistEmailRow, SocialProof as WaitlistSocialProof, HeroArtMini as WaitlistHeroArtMini };
