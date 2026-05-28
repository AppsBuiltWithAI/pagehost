/* global React, PoofPart1 */
const { Logo, ArrowRight, Check } = window.PoofPart1;
const { useState, useEffect, useRef } = React;

/* ============================================================
   ONBOARDING — cinematic post-signup flow
   ============================================================ */

const STEPS = [
  "welcome",
  "you",
  "describe",
  "building",
  "reveal",
  "publish",
  "done",
];

const ROLES = [
  { id: "biz",      ic: "🥐", label: "Small business owner" },
  { id: "freelance",ic: "💼", label: "Freelancer / consultant" },
  { id: "side",     ic: "🌙", label: "Side project person" },
  { id: "ops",      ic: "📋", label: "Operations / ops manager" },
  { id: "curious",  ic: "🌿", label: "Just curious" },
];

const PROMPT_PLACEHOLDERS = [
  "A booking page for my dog-walking service…",
  "A client portal where people can leave testimonials…",
  "An RSVP page for my friend's wedding…",
  "A pickup-order page for my Saturday sourdough…",
  "An invoice tracker that emails me when I get paid…",
];

function ProgressDots({ step, total, onJump }) {
  return (
    <div className="ob-progress" role="progressbar" aria-valuenow={step + 1} aria-valuemax={total}>
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          className={"ob-dot" + (i === step ? " is-active" : "") + (i < step ? " is-past" : "")}
          onClick={() => i < step && onJump && onJump(i)}
          aria-label={"Step " + (i + 1)}
        />
      ))}
    </div>
  );
}

function OBChrome({ stepIdx, total, onSkip, onBack, children }) {
  return (
    <div className="ob-stage" data-screen-label={"onboarding-" + STEPS[stepIdx]}>
      <header className="ob-top">
        <Logo/>
        <div className="ob-top-right">
          <ProgressDots step={stepIdx} total={total} />
          {onSkip && <button className="ob-skip" onClick={onSkip}>Skip for now</button>}
        </div>
      </header>
      {onBack && (
        <button className="ob-back" onClick={onBack} aria-label="Go back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m15 18-6-6 6-6"/></svg>
          Back
        </button>
      )}
      <main className="ob-main">
        {children}
      </main>
    </div>
  );
}

/* ---------------- STEP 1 · WELCOME ---------------- */
function StepWelcome({ onNext }) {
  return (
    <div className="ob-welcome">
      <div className="ob-welcome-orb" aria-hidden="true">
        <div className="orb-core"/>
        <div className="orb-ring r1"/>
        <div className="orb-ring r2"/>
        <div className="orb-ring r3"/>
      </div>
      <div className="ob-eyebrow">You're in.</div>
      <h1 className="ob-headline">
        Welcome to the<br/>
        <em>app-building</em><br/>
        side of the internet.
      </h1>
      <p className="ob-lead">
        Most of what's ahead is a couple of questions and one big prompt.
        Then a real, working app of yours will exist. We'll keep it
        short — promise.
      </p>
      <button className="btn btn-coral btn-lg ob-cta" onClick={onNext}>
        Let's begin
        <ArrowRight/>
      </button>
      <div className="ob-foot-note">⌘ + Enter, or just click — works either way.</div>
    </div>
  );
}

/* ---------------- STEP 2 · WHO ARE YOU ---------------- */
function StepYou({ name, setName, role, setRole, onNext }) {
  const canNext = name.trim().length > 0;
  return (
    <div className="ob-form">
      <div className="ob-eyebrow">Step 01 · Quick intro</div>
      <h1 className="ob-headline">
        First, what should<br/>
        we <em>call you?</em>
      </h1>
      <p className="ob-lead">
        We'll only use your first name. No newsletters, no Tuesday-morning
        re-engagement emails — pinky promise.
      </p>

      <div className="ob-input-wrap">
        <input
          type="text"
          className="ob-input"
          placeholder="Your first name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          onKeyDown={(e) => e.key === "Enter" && canNext && onNext()}
        />
        <span className="ob-input-line"/>
      </div>

      <div className="ob-sub-eyebrow">And what brings you here today? (optional)</div>
      <div className="ob-role-grid">
        {ROLES.map((r) => (
          <button
            key={r.id}
            className={"ob-role" + (role === r.id ? " is-on" : "")}
            onClick={() => setRole(role === r.id ? null : r.id)}
          >
            <span className="ic">{r.ic}</span>
            <span>{r.label}</span>
            {role === r.id && <span className="ob-role-check"><Check/></span>}
          </button>
        ))}
      </div>

      <div className="ob-action-row">
        <button
          className={"btn btn-lg " + (canNext ? "btn-coral" : "btn-outline is-disabled")}
          onClick={canNext ? onNext : undefined}
          disabled={!canNext}
        >
          {canNext ? "Nice to meet you, " + name.trim().split(" ")[0] : "Tell us your name"}
          <ArrowRight/>
        </button>
      </div>
    </div>
  );
}

/* ---------------- STEP 3 · DESCRIBE ---------------- */
function StepDescribe({ name, prompt, setPrompt, onNext }) {
  const [placeholder, setPlaceholder] = useState(PROMPT_PLACEHOLDERS[0]);
  const phIndex = useRef(0);
  useEffect(() => {
    if (prompt.length > 0) return;
    const t = setInterval(() => {
      phIndex.current = (phIndex.current + 1) % PROMPT_PLACEHOLDERS.length;
      setPlaceholder(PROMPT_PLACEHOLDERS[phIndex.current]);
    }, 2800);
    return () => clearInterval(t);
  }, [prompt]);

  const examples = [
    "📅  Booking page for my bakery",
    "🧾  Freelance invoice tracker",
    "🎉  Wedding RSVP page",
    "📦  Inventory for my candle shop",
  ];

  const canNext = prompt.trim().length >= 6;
  const firstName = (name || "friend").trim().split(" ")[0];

  return (
    <div className="ob-form ob-describe">
      <div className="ob-eyebrow">Step 02 · The big one</div>
      <h1 className="ob-headline">
        Okay {firstName} — what<br/>
        do you want to <em>build?</em>
      </h1>
      <p className="ob-lead">
        Describe it like you'd describe it to a thoughtful friend.
        Don't worry about being precise — you can change anything later.
      </p>

      <div className="ob-prompt-card">
        <textarea
          className="ob-prompt-input"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={placeholder}
          rows={3}
          autoFocus
        />
        <div className="ob-prompt-footer">
          <div className="ob-prompt-hints">
            <span>{prompt.length || 0} chars</span>
            <span className="dot"/>
            <span>plain English works</span>
            <span className="dot"/>
            <span>longer = better</span>
          </div>
          <button
            className={"btn btn-coral " + (canNext ? "" : "is-disabled")}
            onClick={canNext ? onNext : undefined}
            disabled={!canNext}
          >
            Build it
            <ArrowRight/>
          </button>
        </div>
      </div>

      <div className="ob-examples-label">— or try one of these —</div>
      <div className="ob-examples">
        {examples.map((e) => (
          <button key={e} className="ob-example-chip" onClick={() => setPrompt(e.replace(/^[^\s]+\s+/, ""))}>
            {e}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------------- STEP 4 · BUILDING ---------------- */
const AGENTS = [
  { ic: "🧠", name: "Strategist",  task: "Reading your brief, choosing the right layout" },
  { ic: "✏️", name: "Designer",    task: "Picking palette · warm bakery tones, serif headline" },
  { ic: "🛠️", name: "Engineer",    task: "Wiring forms · payment · confirmation email" },
  { ic: "📣", name: "Copywriter",  task: "Drafting headline + button labels in your voice" },
  { ic: "🔍", name: "QA",          task: "Clicking every button, submitting every form" },
];

function StepBuilding({ prompt, onNext }) {
  const [progress, setProgress] = useState(0);
  const [agentIdx, setAgentIdx] = useState(0);
  const [lines, setLines] = useState([]);
  const events = useRef([
    "🧱 Setting up project · saturday-sourdough",
    "🎨 Picking palette · 5 colors from your brief",
    "📝 Writing headline · \"Saturday sourdough\"",
    "🔐 Adding Stripe payments · test mode first",
    "📅 Wiring Saturday-only date picker",
    "📧 Confirmation emails · ready",
    "📱 Making it look good on phones too",
    "🔍 Running 24 automatic checks",
    "✅ All clear · ready to show you",
  ]);

  useEffect(() => {
    const tick = setInterval(() => {
      setProgress((p) => {
        const next = p + 1.25 + Math.random() * 0.6;
        if (next >= 100) {
          clearInterval(tick);
          setTimeout(onNext, 700);
          return 100;
        }
        return next;
      });
    }, 90);

    const agentTick = setInterval(() => {
      setAgentIdx((i) => (i + 1) % AGENTS.length);
    }, 1100);

    const lineTick = setInterval(() => {
      setLines((curr) => {
        const i = curr.length;
        if (i >= events.current.length) return curr;
        return [...curr, events.current[i]];
      });
    }, 700);

    return () => {
      clearInterval(tick); clearInterval(agentTick); clearInterval(lineTick);
    };
  }, [onNext]);

  return (
    <div className="ob-build">
      <div className="ob-eyebrow">Step 03 · Magic, broadly defined</div>
      <h1 className="ob-headline">
        We're <em>building it.</em>
      </h1>
      <p className="ob-lead">
        Five agents — designer, engineer, copywriter, QA, launcher — are
        going at this in parallel. Your prompt is in good hands.
      </p>

      <div className="ob-build-stage">
        <div className="ob-build-bar">
          <div className="ob-build-bar-fill" style={{ width: progress + "%" }}/>
        </div>
        <div className="ob-build-percent">{Math.floor(progress)}%</div>

        <div className="ob-build-grid">
          <div className="ob-agents">
            {AGENTS.map((a, i) => (
              <div key={a.name} className={"ob-agent" + (i === agentIdx ? " is-active" : i < agentIdx ? " is-done" : "")}>
                <span className="ic">{a.ic}</span>
                <div className="meta">
                  <div className="name">{a.name}</div>
                  <div className="task">{a.task}</div>
                </div>
                <span className="status">
                  {i < agentIdx
                    ? <Check/>
                    : i === agentIdx
                      ? <span className="ob-spin"/>
                      : <span className="ob-queued">queued</span>}
                </span>
              </div>
            ))}
          </div>

          <div className="ob-log">
            <div className="ob-log-head">Live log</div>
            <div className="ob-log-body">
              {lines.map((l, i) => (
                <div key={i} className="ob-log-line" style={{ animationDelay: i * 30 + "ms" }}>{l}</div>
              ))}
              <div className="ob-log-cursor"/>
            </div>
          </div>
        </div>

        <div className="ob-build-prompt-echo">
          <span className="quote">"</span>
          {prompt || "your app"}
          <span className="quote">"</span>
        </div>
      </div>
    </div>
  );
}

/* ---------------- STEP 5 · REVEAL + first edit ---------------- */
function StepReveal({ name, prompt, onNext }) {
  const [editValue, setEditValue] = useState("");
  const [theme, setTheme] = useState("warm");
  const [didEdit, setDidEdit] = useState(false);
  const firstName = (name || "friend").trim().split(" ")[0];

  const themes = [
    { id: "warm",   label: "Warm bakery", swatch: "linear-gradient(135deg,#FFE7E1,#F5A87A)" },
    { id: "mint",   label: "Fresh mint",  swatch: "linear-gradient(135deg,#E0F1EC,#6FBFA8)" },
    { id: "plum",   label: "Deep plum",   swatch: "linear-gradient(135deg,#E0DAF0,#6F5FA0)" },
    { id: "ink",    label: "Editorial",   swatch: "linear-gradient(135deg,#F5EFE3,#181818)" },
  ];

  const applyEdit = () => {
    if (editValue.trim().length === 0) return;
    setDidEdit(true);
    setEditValue("");
  };

  return (
    <div className="ob-reveal">
      <div className="ob-eyebrow">Step 04 · It's alive</div>
      <h1 className="ob-headline">
        {firstName}, meet<br/>
        <em>your app.</em>
      </h1>

      <div className="ob-reveal-grid">
        <div className={"ob-preview theme-" + theme}>
          <div className="ob-preview-bar">
            <span className="dot r"/><span className="dot y"/><span className="dot g"/>
            <span className="url">saturday-sourdough.app · <span className="status">draft</span></span>
          </div>
          <div className="ob-preview-body">
            <div className="prv-eyebrow">CRUMB &amp; CO. · SATURDAYS ONLY</div>
            <h3 className="prv-h">{didEdit ? "Warm. Whole. Yours." : "Saturday\nsourdough."}</h3>
            <p className="prv-sub">Reserve a loaf. Pick up Saturday morning. Pay $8.</p>
            <button className="prv-btn">Reserve a loaf →</button>
            <div className="prv-row">
              <div className="prv-card"/>
              <div className="prv-card"/>
              <div className="prv-card"/>
            </div>
          </div>
          {didEdit && (
            <div className="ob-preview-toast">
              <span className="ic">✨</span>
              Got it. Headline updated.
            </div>
          )}
        </div>

        <div className="ob-reveal-controls">
          <div className="ob-control-eyebrow">Tiny first edit</div>
          <h4>Tell it to change something.</h4>
          <p>This is how editing works — you say what you want, in plain words.</p>
          <div className="ob-edit-row">
            <input
              type="text"
              className="ob-edit-input"
              placeholder='try "make the headline warmer"'
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && applyEdit()}
            />
            <button className="btn btn-ink" onClick={applyEdit} disabled={!editValue.trim()}>
              Apply
            </button>
          </div>

          <div className="ob-control-eyebrow ob-mt">Or pick a vibe</div>
          <div className="ob-theme-row">
            {themes.map((t) => (
              <button
                key={t.id}
                className={"ob-theme" + (theme === t.id ? " is-on" : "")}
                onClick={() => { setTheme(t.id); setDidEdit(true); }}
                aria-label={t.label}
              >
                <span className="swatch" style={{ background: t.swatch }}/>
                <span className="lbl">{t.label}</span>
              </button>
            ))}
          </div>

          <div className="ob-action-row">
            <button className="btn btn-coral btn-lg" onClick={onNext}>
              Looks good · publish it
              <ArrowRight/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- STEP 6 · PUBLISH ---------------- */
function StepPublish({ onNext }) {
  const [subdomain, setSubdomain] = useState("saturday-sourdough");
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);

  const doPublish = () => {
    if (publishing || published) return;
    setPublishing(true);
    setTimeout(() => {
      setPublishing(false);
      setPublished(true);
      setTimeout(onNext, 1900);
    }, 1800);
  };

  return (
    <div className="ob-publish">
      <div className="ob-eyebrow">Step 05 · Make it real</div>
      <h1 className="ob-headline">
        Pick a name.<br/>
        <em>Press the button.</em>
      </h1>
      <p className="ob-lead">
        This gives you a real URL with a real SSL certificate, on the
        real internet. You can change it later. Custom domain — anytime.
      </p>

      <div className={"ob-publish-card" + (published ? " is-published" : "") + (publishing ? " is-publishing" : "")}>
        <div className="ob-publish-url">
          <span className="lock">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>
          </span>
          <span className="prot">https://</span>
          <input
            className="ob-publish-input"
            value={subdomain}
            onChange={(e) => setSubdomain(e.target.value.replace(/[^a-z0-9-]/gi, "").toLowerCase())}
            disabled={publishing || published}
            spellCheck={false}
          />
          <span className="tld">.poof.app</span>
        </div>

        <button
          className={"btn btn-lg ob-publish-btn " + (published ? "btn-outline" : "btn-coral")}
          onClick={doPublish}
          disabled={publishing || published || !subdomain.trim()}
        >
          {published ? (
            <React.Fragment><Check/> Published</React.Fragment>
          ) : publishing ? (
            <React.Fragment><span className="ob-spin light"/> Going live…</React.Fragment>
          ) : (
            <React.Fragment>Publish now <ArrowRight/></React.Fragment>
          )}
        </button>

        <div className="ob-publish-perks">
          <div className="perk"><span className="ic">🔒</span><div><strong>SSL · auto</strong><span>Real certificate</span></div></div>
          <div className="perk"><span className="ic">⚡️</span><div><strong>CDN · global</strong><span>Fast everywhere</span></div></div>
          <div className="perk"><span className="ic">💸</span><div><strong>$0 forever</strong><span>Free hosting</span></div></div>
        </div>

        {published && (
          <div className="ob-publish-confetti" aria-hidden="true">
            {Array.from({ length: 20 }).map((_, i) => (
              <span
                key={i}
                className="bit"
                style={{
                  left: (Math.random() * 100) + "%",
                  background: ["#FF5C4D","#FFC53D","#1FB295","#F08DB8","#6FA8E0"][i % 5],
                  transform: `rotate(${Math.random() * 360}deg)`,
                  animationDelay: (Math.random() * 0.4) + "s",
                  animationDuration: (1.6 + Math.random() * 0.8) + "s",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- STEP 7 · DONE ---------------- */
function StepDone({ name }) {
  const firstName = (name || "friend").trim().split(" ")[0];
  const nextSteps = [
    { ic: "🔗", t: "Share the URL with someone real",  s: "A friend, a customer, your mom — the real test." },
    { ic: "🎨", t: "Make twenty small edits",            s: '"Make this bigger." "Move that down." "Use my brand pink."' },
    { ic: "🌐", t: "Connect your own domain",            s: "$12/yr. Two clicks. We handle the DNS." },
    { ic: "🧱", t: "Build a second app while you're warm", s: "The next one always takes half the time." },
  ];
  return (
    <div className="ob-done">
      <div className="ob-done-mark">
        <div className="ob-done-tick">
          <Check/>
        </div>
        <span className="r r1"/><span className="r r2"/><span className="r r3"/>
      </div>
      <div className="ob-eyebrow">You did it</div>
      <h1 className="ob-headline">
        {firstName}, you just<br/>
        shipped <em>an app.</em>
      </h1>
      <p className="ob-lead">
        Took roughly the same time as making coffee. From here on it's just
        adjustments — make it more yours, share it around, build the next one.
      </p>

      <div className="ob-share-card">
        <span className="lock">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>
        </span>
        <span className="url">https://<strong>saturday-sourdough</strong>.poof.app</span>
        <button className="ob-share-copy">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>
          Copy
        </button>
      </div>

      <div className="ob-next-grid">
        {nextSteps.map((n) => (
          <a key={n.t} className="ob-next">
            <span className="ic">{n.ic}</span>
            <div>
              <div className="t">{n.t}</div>
              <div className="s">{n.s}</div>
            </div>
            <span className="arrow"><ArrowRight/></span>
          </a>
        ))}
      </div>

      <div className="ob-action-row ob-done-row">
        <a className="btn btn-ink btn-lg" href="dashboard/index.html">
          Go to dashboard
          <ArrowRight/>
        </a>
        <a className="btn btn-ghost" href="index.html">Back to home</a>
      </div>
    </div>
  );
}

/* ---------------- ROOT ---------------- */
function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState("forward");
  const [name, setName] = useState("");
  const [role, setRole] = useState(null);
  const [prompt, setPrompt] = useState("");

  const go = (delta) => {
    setDirection(delta > 0 ? "forward" : "back");
    setStep((s) => Math.max(0, Math.min(STEPS.length - 1, s + delta)));
  };
  const jumpTo = (i) => {
    setDirection(i > step ? "forward" : "back");
    setStep(i);
  };

  const onSkip = step > 0 && step < STEPS.length - 1 ? () => jumpTo(STEPS.length - 1) : null;
  const onBack = step > 0 && step < STEPS.length - 1 ? () => go(-1) : null;

  let body = null;
  switch (STEPS[step]) {
    case "welcome":  body = <StepWelcome onNext={() => go(1)}/>; break;
    case "you":      body = <StepYou name={name} setName={setName} role={role} setRole={setRole} onNext={() => go(1)}/>; break;
    case "describe": body = <StepDescribe name={name} prompt={prompt} setPrompt={setPrompt} onNext={() => go(1)}/>; break;
    case "building": body = <StepBuilding prompt={prompt} onNext={() => go(1)}/>; break;
    case "reveal":   body = <StepReveal name={name} prompt={prompt} onNext={() => go(1)}/>; break;
    case "publish":  body = <StepPublish onNext={() => go(1)}/>; break;
    case "done":     body = <StepDone name={name}/>; break;
    default: body = null;
  }

  return (
    <OBChrome stepIdx={step} total={STEPS.length} onSkip={onSkip} onBack={onBack}>
      <div key={step} className={"ob-scene ob-scene-" + direction}>
        {body}
      </div>
    </OBChrome>
  );
}

window.OnboardingPage = OnboardingPage;
