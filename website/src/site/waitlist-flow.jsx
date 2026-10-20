import React, { useState, useEffect, useRef } from 'react';
import { Reveal, ArrowRight, Plus, Logo, useTypedPlaceholder } from './part1.jsx';
/* ============= IDEA BOX ============= */
function IdeaBox({ value, onChange, pulse, onSubmit, cta = "Build it" }) {
  const submit = () => { if (value.trim().length > 3) onSubmit(value.trim()); };
  const [focused, setFocused] = useState(false);
  const typing = !value && !focused;
  const typed = useTypedPlaceholder(typing);
  return (
    <div className={"prompt-card" + (pulse ? " pulse" : "")}>
      <span className="prompt-tag">YOUR IDEA</span>
      <div className="prompt-input-wrap">
        {typing && (
          <div className="prompt-ghost" aria-hidden="true">
            <span className="prompt-ghost-lead">Describe the app you want: like </span>
            <span className="prompt-ghost-typed">{typed}</span>
            <span className="prompt-caret"></span>
          </div>
        )}
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={2}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) submit(); }}
          aria-label="Describe the app you want to build"
          placeholder={typing ? "" : "Describe the app you want to build"}></textarea>
      </div>
      <div className="prompt-bar">
        <div className="prompt-icons"></div>
        <button className="btn btn-coral" onClick={submit} disabled={value.trim().length < 4}>{cta} <ArrowRight/></button>
      </div>
    </div>
  );
}

/* ============= HERO ============= */
function WaitHero({ onStart }) {
  const [text, setText] = useState("");
  const [pulse, setPulse] = useState(false);
  const chips = ["📅  Booking page for my bakery", "📋  Client intake form", "📦  Inventory tracker", "🎉  Event RSVP site", "💬  Customer support portal"];
  const pick = (s) => {
    setText(s); setPulse(true); setTimeout(() => setPulse(false), 450);
    const card = document.querySelector(".prompt-card");
    if (card) window.scrollTo({ top: window.scrollY + card.getBoundingClientRect().top - 120, behavior: "smooth" });
  };
  return (
    <section className="hero hero-b" data-screen-label="hero">
      <div className="hero-b-inner">
        <h1 className="hero-b-h">Build websites &amp; apps <em>with AI.</em></h1>
        <p className="hero-b-sub">Type what you want in a sentence: we build the whole thing and put it online. No code, no designer, no waiting on a developer. Tell us your idea to start free.</p>
        <div className="prompt-glow"><IdeaBox value={text} onChange={setText} pulse={pulse} onSubmit={onStart}/></div>
        <p className="chips-label">or start with</p>
        <div className="chips">{chips.map(c => <button key={c} className="chip" onClick={() => pick(c)}>{c}</button>)}</div>
        <DemoButton/>
      </div>
    </section>
  );
}

function DemoButton() {
  const [open, setOpen] = useState(false);
  const frameRef = useRef(null);
  const triggerRef = useRef(null);
  const closeRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    const keydown = event => { if (event.key === "Escape") setOpen(false); };
    const message = event => {
      if (event.source === frameRef.current?.contentWindow && event.data?.type === "abw-demo-close") setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    window.addEventListener("keydown", keydown);
    window.addEventListener("message", message);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", keydown);
      window.removeEventListener("message", message);
      document.body.style.overflow = previousOverflow;
      triggerRef.current?.focus();
    };
  }, [open]);
  return (
    <>
      <button className="demo-btn" ref={triggerRef} onClick={() => setOpen(true)}>
        <span className="demo-btn-play"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 001.5.86l10.4-6.5a1 1 0 000-1.72L9.5 4.64A1 1 0 008 5.5z"/></svg></span>
        Watch the demo <span className="demo-btn-time">2 min</span>
      </button>
      {open && (
        <div className="demo-bg" onClick={() => setOpen(false)}>
          <div className="demo-modal" role="dialog" aria-modal="true" aria-label="Product demo" onClick={(ev) => ev.stopPropagation()}>
            <button className="demo-close" ref={closeRef} onClick={() => setOpen(false)} aria-label="Close"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
            <iframe src="/site/demo-video.html" ref={frameRef} title="AppsBuiltWithAI demo" sandbox="allow-scripts" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen></iframe>
          </div>
        </div>
      )}
    </>
  );
}

/* ============= FINAL CTA ============= */
function WaitCTA({ onStart }) {
  const [text, setText] = useState("");
  return (
    <section className="final" data-screen-label="final-cta">
      <img src="/site/assets/logo-mark.png" alt="" className="final-watermark" aria-hidden="true"/>
      <div className="wrap-tight">
        <Reveal>
          <div className="eyebrow final-eyebrow">Your turn</div>
          <h2>Got an idea? <em>Let's <span className="marker">build it.</span></em></h2>
          <p>Type it below, make a free account, and watch the first version get built.</p>
          <div className="final-prompt-wrap"><IdeaBox value={text} onChange={setText} onSubmit={onStart} cta="Start free"/></div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============= PHONE FIELD ============= */
const WL_COUNTRIES = [
  { c: "US", flag: "🇺🇸", name: "United States", dial: "+1", fmt: "(555) 010-2233" },
  { c: "CA", flag: "🇨🇦", name: "Canada", dial: "+1", fmt: "(555) 010-2233" },
  { c: "GB", flag: "🇬🇧", name: "United Kingdom",dial: "+44", fmt: "7400 123456" },
  { c: "IE", flag: "🇮🇪", name: "Ireland", dial: "+353", fmt: "85 123 4567" },
  { c: "AU", flag: "🇦🇺", name: "Australia", dial: "+61", fmt: "412 345 678" },
  { c: "NZ", flag: "🇳🇿", name: "New Zealand", dial: "+64", fmt: "21 123 4567" },
  { c: "DE", flag: "🇩🇪", name: "Germany", dial: "+49", fmt: "1512 3456789" },
  { c: "FR", flag: "🇫🇷", name: "France", dial: "+33", fmt: "6 12 34 56 78" },
  { c: "ES", flag: "🇪🇸", name: "Spain", dial: "+34", fmt: "612 34 56 78" },
  { c: "NL", flag: "🇳🇱", name: "Netherlands", dial: "+31", fmt: "6 12345678" },
  { c: "IN", flag: "🇮🇳", name: "India", dial: "+91", fmt: "98765 43210" },
  { c: "NG", flag: "🇳🇬", name: "Nigeria", dial: "+234", fmt: "802 123 4567" },
  { c: "ZA", flag: "🇿🇦", name: "South Africa", dial: "+27", fmt: "82 123 4567" },
  { c: "BR", flag: "🇧🇷", name: "Brazil", dial: "+55", fmt: "11 91234 5678" },
  { c: "MX", flag: "🇲🇽", name: "Mexico", dial: "+52", fmt: "55 1234 5678" },
  { c: "JP", flag: "🇯🇵", name: "Japan", dial: "+81", fmt: "90 1234 5678" },
  { c: "SG", flag: "🇸🇬", name: "Singapore", dial: "+65", fmt: "8123 4567" },
  { c: "AE", flag: "🇦🇪", name: "UAE", dial: "+971", fmt: "50 123 4567" },
];

function formatNational(country, digits) {
  const mask = country.fmt;
  const cap = (mask.match(/\d/g) || []).length;
  const d = digits.slice(0, cap);
  let out = "", i = 0;
  for (const ch of mask) {
    if (i >= d.length) break;
    if (/\d/.test(ch)) { out += d[i++]; } else { out += ch; }
  }
  return out;
}

function PhoneField({ country, setCountry, value, onChange, onEnter }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="wl-phone">
      <div className={"wl-phone-pick" + (open ? " on" : "")}>
        <button type="button" className="wl-phone-btn" onClick={() => setOpen(!open)} aria-haspopup="listbox" aria-expanded={open}>
          <span className="wl-phone-flag">{country.flag}</span>
          <span className="wl-phone-dial">{country.dial}</span>
          <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true"><path d="M2 4.5 6 8.5 10 4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        {open && (
          <React.Fragment>
            <div className="wl-phone-back" onClick={() => setOpen(false)}></div>
            <ul className="wl-phone-menu" role="listbox">
              {WL_COUNTRIES.map((k) => (
                <li key={k.c + k.dial}>
                  <button type="button" className={"wl-phone-item" + (k.c === country.c ? " active" : "")}
                    onClick={() => { setCountry(k); setOpen(false); onChange(""); }}>
                    <span className="wl-phone-flag">{k.flag}</span>
                    <span className="wl-phone-name">{k.name}</span>
                    <span className="wl-phone-dial">{k.dial}</span>
                  </button>
                </li>
              ))}
            </ul>
          </React.Fragment>
        )}
      </div>
      <input type="tel" inputMode="tel" value={value} placeholder={country.fmt}
        onChange={(e) => onChange(formatNational(country, e.target.value.replace(/\D/g, "")))}
        onKeyDown={(e) => { if (e.key === "Enter") onEnter(); }}/>
    </div>
  );
}

/* ============= SIGNUP FLOW ============= */
function SignupFlow({ idea, onClose }) {
  const [step, setStep] = useState("account");
  const [f, setF] = useState({ username: "", email: "", password: "", phone: "" });
  const [country, setCountry] = useState(WL_COUNTRIES[0]);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [place, setPlace] = useState(2841);
  const set = (k) => (e) => { setF(v => ({ ...v, [k]: e.target.value })); setErr(""); };

  useEffect(() => {
    const h = (e) => { if (e.key === "Escape" && step === "account") onClose(); };
    document.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [step]);

  const create = () => {
    if (f.username.trim().length < 3) return setErr("Please enter your name.");
    if (!/^\S+@\S+\.\S+$/.test(f.email)) return setErr("That email doesn't look right.");
    if (f.password.length < 8) return setErr("Passwords need at least 8 characters.");
    setBusy(true);
    try { if (idea) localStorage.setItem("abwai_idea", idea); } catch (e) {}
    setTimeout(() => { window.location.href = "/signup?email=" + encodeURIComponent(f.email); }, 700);
  };

  return (
    <div className="wl-flow" role="dialog" aria-modal="true">
      <div className="wl-flow-bar">
        <Logo/>
        {step === "account" && <button className="wl-flow-close" onClick={onClose}>Back to site ✕</button>}
      </div>

      {step === "account" ? (
        <div className="wl-flow-body">
          <div className="wl-panel">
            <div className="wl-step">STEP 2 OF 2</div>
            <h2 className="wl-h">Create your account.</h2>
            <p className="wl-sub">One account holds your idea, your apps and your credits.</p>
            <div className="wl-field">
              <label>Your name</label>
              <input value={f.username} onChange={set("username")} placeholder="e.g. Maya Chen" autoFocus/>
            </div>
            <div className="wl-field">
              <label>Email</label>
              <input type="email" value={f.email} onChange={set("email")} placeholder="you@example.com"/>
            </div>
            <div className="wl-field">
              <label>Password</label>
              <input type="password" value={f.password} onChange={set("password")} placeholder="At least 8 characters" onKeyDown={(e) => { if (e.key === "Enter") create(); }}/>
            </div>
            {err && <div className="wl-err">{err}</div>}
            <button className="btn btn-coral wl-submit" onClick={create} disabled={busy}>
              {busy ? "Creating your account…" : <>Create account <ArrowRight/></>}
            </button>
            <p className="wl-fine">No card needed. Already have an account? <a href="/signin">Log in</a></p>
          </div>

          <aside className="wl-aside">
            <div className="wl-aside-tag">{idea ? "YOUR IDEA" : "WHAT YOU GET"}</div>
            {idea && <blockquote className="wl-aside-idea">{idea}</blockquote>}
            <ul className="wl-aside-list">
              <li><span className="wl-aside-check" aria-hidden="true">✓</span><b>Saved to your account</b><small>Ready the moment you verify your email.</small></li>
              <li><span className="wl-aside-check" aria-hidden="true">✓</span><b>First thing we build</b><small>Your first build starts from this idea.</small></li>
              <li><span className="wl-aside-check" aria-hidden="true">✓</span><b>50 credits a month, plus 100 bonus credits in month one</b><small>50 free every month, plus a 100 credit welcome bonus.</small></li>
            </ul>
            <div className="wl-aside-foot">
              <span className="wl-aside-foot-dot" aria-hidden="true"></span>
              First app online in about three minutes
            </div>
          </aside>
        </div>
      ) : (
        <div className="wl-flow-body wl-done-body">
          <div className="wl-done">
            <div className="wl-done-burst" aria-hidden="true">
              <span></span><span></span><span></span><span></span><span></span><span></span>
            </div>

            <div className="wl-card">
              <div className="wl-card-glow" aria-hidden="true"></div>
              <div className="wl-card-mark">✓</div>
              <div className="wl-card-eyebrow">You're on the list</div>
              <h2 className="wl-card-h">You're now on the<br/> <em>waitlist.</em></h2>
              <p className="wl-card-sub">We'll let you know when we launch. Your invite goes to <b>{f.email}</b>{f.phone ? <>, and we'll text <b>{country.dial} {f.phone}</b> the same morning</> : null}.</p>

              <div className="wl-card-place">
                <span className="wl-card-place-lbl">Your place in line</span>
                <span className="wl-card-place-num">#{place.toLocaleString()}</span>
                <span className="wl-card-place-note">Invites go out every week, in order</span>
              </div>
            </div>

            <div className={"wl-two" + (idea ? "" : " wl-two-solo")}>
              {idea && <div className="wl-idea-card">
                <div className="wl-idea-tag">First thing we'll build for you</div>
                <p className="wl-idea-quote">“{idea}”</p>
                <div className="wl-idea-foot"><span>✦</span> Saved to your account · 100 bonus credits waiting</div>
              </div>}
              <ol className="wl-steps">
                <li><b>Your invite lands</b>Weekly, in order: no queue-jumping.</li>
                <li><b>You describe it</b>One sentence is enough to start.</li>
                <li><b>It goes live</b>First app online in about three minutes.</li>
              </ol>
            </div>

            <div className="wl-share">
              <div className="wl-share-row">
                <button className="wl-share-btn ghost" onClick={onClose}>Back to the site</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { WaitHero, WaitCTA, SignupFlow, IdeaBox };
