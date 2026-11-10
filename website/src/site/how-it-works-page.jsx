import React from 'react';
import { Reveal, ArrowRight, Check, PromptBox } from './part1.jsx';
/* ============= HOW IT WORKS PAGE ============= */
function HiwHero() {
  const words = ["a booking page", "an online store", "a client portal", "a paid newsletter"];
  const [w, setW] = React.useState(0);
  React.useEffect(() => { const id = setInterval(() => setW((x) => (x + 1) % words.length), 2600); return () => clearInterval(id); }, []);
  return (
    <section className="hiw2-hero" data-screen-label="hiw-hero">
      <div className="wrap hiw2-hero-grid">
        <Reveal>
          <div className="eyebrow">How it works</div>
          <h1 className="serif">You describe it. <em>We build it.</em></h1>
          <p className="sub-lead">
            No drag-and-drop. No "low-code blocks." No tutorials you have to
            finish first. Just type what you want, in whatever words you
            already use, and watch a real app appear.
          </p>
          <div className="hiw2-actions">
            <a className="btn btn-coral btn-lg" href="/signup">Start free <ArrowRight/></a>
            <a className="btn btn-outline btn-lg" href="#hiw-steps">See the steps</a>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="hiw2-demo" aria-hidden="true">
            <div className="hiw2-say">
              <span className="hiw2-say-k">You type</span>
              <p>"I need <b key={w} className="hiw2-word">{words[w]}</b> for my business."</p>
            </div>
            <div className="hiw2-flow"><span></span><span></span><span></span></div>
            <div className="hiw2-app">
              <div className="hiw2-app-bar"><i></i><i></i><i></i><span>your-app.appsbuiltwithai.com</span><em>Live</em></div>
              <div className="hiw2-app-body">
                <span className="hiw2-l t"></span><span className="hiw2-l"></span><span className="hiw2-l s"></span>
                <div className="hiw2-app-row"><span></span><span></span><span></span></div>
                <span className="hiw2-app-btn">Book now</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============= STEP MOCKUPS (inline visuals) ============= */
function MockPrompt() {
  return (
    <div className="hiw-mock hiw-mock-prompt">
      <div className="hiw-mock-bar">
        <span className="dot r"/><span className="dot y"/><span className="dot g"/>
        <span className="hiw-mock-title">New app · untitled</span>
      </div>
      <div className="hiw-mock-body">
        <div className="hiw-prompt-bubble">
          <span className="cursor"/>
          I sell sourdough on Saturdays. I want a page where neighbors can
          reserve a loaf, pay $8, and pick it up Saturday morning.
        </div>
        <div className="hiw-prompt-chips">
          <span className="chip">📦 Stripe</span>
          <span className="chip">📧 Confirmation email</span>
          <span className="chip">📅 Saturday only</span>
        </div>
      </div>
    </div>
  );
}

function MockBuilding() {
  const lines = [
    { ic: "🧱", txt: "Setting up the page structure", done: true },
    { ic: "🛒", txt: "Connecting Stripe for payments", done: true },
    { ic: "📅", txt: "Adding the Saturday-only date picker", done: true },
    { ic: "✉️", txt: "Wiring confirmation emails", run: true },
    { ic: "🎨", txt: "Picking warm bakery colors", queue: true },
  ];
  return (
    <div className="hiw-mock hiw-mock-build">
      <div className="hiw-mock-bar">
        <span className="dot r"/><span className="dot y"/><span className="dot g"/>
        <span className="hiw-mock-title">Building · Saturday Sourdough</span>
        <span className="hiw-mock-tag">2m 14s</span>
      </div>
      <div className="hiw-mock-body">
        {lines.map((l, i) => (
          <div key={i} className={"hiw-build-line " + (l.done ? "is-done" : l.run ? "is-run" : "is-queue")}>
            <span className="ic">{l.ic}</span>
            <span className="txt">{l.txt}</span>
            <span className="status">
              {l.done && <Check/>}
              {l.run && <span className="spin"/>}
              {l.queue && <span className="pending">queued</span>}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MockEdit() {
  return (
    <div className="hiw-mock hiw-mock-edit">
      <div className="hiw-mock-bar">
        <span className="dot r"/><span className="dot y"/><span className="dot g"/>
        <span className="hiw-mock-title">Saturday Sourdough · edit mode</span>
      </div>
      <div className="hiw-mock-body hiw-edit-grid">
        <div className="hiw-edit-preview">
          <div className="hiw-edit-page">
            <div className="hiw-edit-hero">
              <span className="bar t"/>
              <span className="bar w"/>
              <span className="bar btn">Reserve a loaf</span>
            </div>
            <div className="hiw-edit-row">
              <span className="card"/><span className="card"/><span className="card"/>
            </div>
            <span className="hiw-edit-anchor" title="Selected"/>
          </div>
        </div>
        <div className="hiw-edit-chat">
          <div className="hiw-edit-msg you">Make the button warmer: like crust.</div>
          <div className="hiw-edit-msg ai">
            <span className="ic">✨</span>
            Switched the button to a baked-amber. Want me to tint the headline too?
          </div>
          <div className="hiw-edit-msg you">Yes, and make it a tiny bit bigger.</div>
        </div>
      </div>
    </div>
  );
}

function MockPublish() {
  return (
    <div className="hiw-mock hiw-mock-publish">
      <div className="hiw-mock-bar">
        <span className="dot r"/><span className="dot y"/><span className="dot g"/>
        <span className="hiw-mock-title">Publish · Saturday Sourdough</span>
      </div>
      <div className="hiw-mock-body">
        <div className="hiw-pub-url">
          <span className="lock">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>
          </span>
          <span className="dim">https://</span>
          <span className="bold">saturday-sourdough</span>
          <span className="dim">.appsbuiltwithai.com</span>
          <button className="hiw-pub-copy">Copy</button>
        </div>
        <div className="hiw-pub-row">
          <div className="hiw-pub-stat">
            <div className="num">23m</div>
            <div className="lbl">From idea to live</div>
          </div>
          <div className="hiw-pub-stat">
            <div className="num">$0</div>
            <div className="lbl">Hosting · forever free</div>
          </div>
          <div className="hiw-pub-stat">
            <div className="num">∞</div>
            <div className="lbl">Edits, anytime</div>
          </div>
        </div>
        <div className="hiw-pub-cta">
          <a className="btn btn-coral">Buy custom domain · $12/yr</a>
          <a className="btn btn-outline">Share preview link</a>
        </div>
      </div>

      {/* Floating "Built with" badge: Free tier sees this on every published app */}
      <a className="builtwith-badge" href="/" title="Built with AppsBuiltWithAI · Upgrade to Pro to remove">
        <span className="builtwith-mark">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <defs>
              <linearGradient id="bw-grad-hiw" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#FB8855"/>
                <stop offset="1" stopColor="#E84A3C"/>
              </linearGradient>
            </defs>
            <path d="M12 2 4 6v6c0 4.5 3.4 8.4 8 10 4.6-1.6 8-5.5 8-10V6l-8-4Z" fill="url(#bw-grad-hiw)"/>
            <path d="M9 12l2 2 4-4" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </span>
        <span className="builtwith-text">
          <span className="builtwith-text-1">Built with</span>
          <span className="builtwith-text-2">AppsBuiltWithAI</span>
        </span>
      </a>
    </div>
  );
}

/* ============= STEPS ============= */
const STEPS = [
  {
    n: "01",
    eyebrow: "Step one",
    title: "Just describe it.",
    body: "In whatever language you'd use to tell a friend. \"A booking page for my dog walking service.\" \"A storefront for my candles.\" \"A form that emails me when someone signs up.\" That's all the spec we need.",
    bullets: ["No technical jargon required", "Voice-to-text works too", "Examples & templates if you'd rather start there"],
    mock: <MockPrompt/>,
  },
  {
    n: "02",
    eyebrow: "Step two",
    title: "Watch it build itself.",
    body: "A team of six agents (designer, engineer, copywriter, QA, launcher, growth) works in parallel. You'll see each one ticking through their list in real time. Most apps are working in 1 to 3 minutes.",
    bullets: ["See exactly what's being built, in plain English", "Six agents, working in parallel", "Pause and redirect anytime"],
    mock: <MockBuilding/>,
  },
  {
    n: "03",
    eyebrow: "Step three",
    title: "Tell it what to change.",
    body: "Don't like the colors? Say so. Want a different field on the form? Say so. Need a whole new page? Say so. You're not editing code: you're directing.",
    bullets: ["Plain-language edits, applied live", "Click anything to change it directly", "Undo, anytime, with one word"],
    mock: <MockEdit/>,
  },
  {
    n: "04",
    eyebrow: "Step four",
    title: "Ship it. Today.",
    body: "Hit publish. Get a real URL with a real SSL certificate, hosted on infrastructure that just-works. On Starter and above, you can connect your own domain. Edit forever: no rebuilds, no \"deployments,\" no waiting.",
    bullets: ["Free hosting on an AppsBuiltWithAI subdomain", "Custom domains from Starter", "Edits go live instantly"],
    mock: <MockPublish/>,
  },
];

function HiwSteps() {
  return (
    <section className="pad hiw-steps-section" id="hiw-steps" data-screen-label="hiw-steps">
      <div className="wrap">
        {STEPS.map((s, i) => (
          <Reveal key={s.n}>
            <div className={"hiw-step " + (i % 2 ? "is-flip" : "")}>
              <div className="hiw-step-copy">
                <div className="eyebrow">{s.eyebrow}</div>
                <div className="hiw-step-num">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <ul className="hiw-step-bullets">
                  {s.bullets.map((b) => <li key={b}><Check/><span>{b}</span></li>)}
                </ul>
              </div>
              <div className="hiw-step-art">
                {s.mock}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============= AGENT BREAKDOWN ============= */
function HiwAgents() {
  const agents = [
    { ic: "✏️", name: "Designer", role: "Picks colors, layouts, typography. Tries to make it not look generic." },
    { ic: "🛠️", name: "Engineer", role: "Wires up the buttons, the forms, the database. The boring stuff." },
    { ic: "📣", name: "Copywriter", role: "Drafts the headlines, microcopy, button labels. You'll rewrite most of it." },
    { ic: "🔍", name: "QA", role: "Clicks every button. Submits every form. Catches the things you'd miss." },
    { ic: "🚀", name: "Launcher", role: "Handles SSL, DNS, hosting. The stuff you've definitely never enjoyed." },
    { ic: "📈", name: "Growth", role: "Finds your first customers once you're live: launch posts, emails, follow-ups." },
  ];
  return (
    <section className="pad hiw-agents-section" data-screen-label="hiw-agents">
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="eyebrow">Under the hood</div>
          <h2>Six agents. <em>One conversation.</em></h2>
          <p>You only talk to one chat. Behind the scenes, six agents talk to each other, so you don't have to.</p>
        </Reveal>
        <Reveal>
          <div className="hiw-agent-grid">
            {agents.map((a) => (
              <div key={a.name} className="hiw-agent">
                <div className="hiw-agent-ic">{a.ic}</div>
                <h4>{a.name}</h4>
                <p>{a.role}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============= WHAT YOU NEVER DO ============= */
function HiwNeverDo() {
  const things = [
    "Open a terminal",
    "Pick a hosting provider",
    "Configure DNS",
    "Buy an SSL certificate",
    "Set up a database",
    "Pick a framework",
    "Watch a 40-minute tutorial",
    "Install Node, Python, or anything",
    "Read documentation",
    "Debug error messages",
    "Re-deploy after every change",
    "Talk to a developer in their native tongue",
  ];
  return (
    <section className="pad-sm hiw-never-section" data-screen-label="hiw-never">
      <div className="wrap-tight">
        <Reveal className="sec-head">
          <div className="eyebrow">Things you never do</div>
          <h2>The whole point is <em>none of this.</em></h2>
        </Reveal>
        <Reveal>
          <ul className="hiw-never-grid">
            {things.map((t) => (
              <li key={t}>
                <span className="x">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
                </span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ============= COMPARE ROW ============= */
function HiwCompare() {
  const rows = [
    { label: "Time to first working version", a: "1 to 3 minutes", b: "1 to 3 weeks" },
    { label: "Skills required", a: "Describe it", b: "JS, CSS, HTML, frameworks, hosting" },
    { label: "Who edits it later", a: "You. In plain English.", b: "You hire someone." },
    { label: "What you ship", a: "A real app, real URL.", b: "A real app, real URL." },
    { label: "What you understand at the end",a: "How it works.", b: "Hopefully something." },
  ];
  return (
    <section className="pad-sm" data-screen-label="hiw-compare" style={{ background: "var(--surface-2)", borderTop: "1px solid var(--line-2)", borderBottom: "1px solid var(--line-2)" }}>
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="eyebrow">vs. the old way</div>
          <h2>The honest comparison.</h2>
        </Reveal>
        <Reveal>
          <div className="hiw-compare">
            <div className="hiw-compare-head">
              <div className="lbl"/>
              <div className="us">AppsBuiltWithAI</div>
              <div className="them">Hiring a dev (or learning)</div>
            </div>
            {rows.map((r) => (
              <div key={r.label} className="hiw-compare-row">
                <div className="lbl">{r.label}</div>
                <div className="us">{r.a}</div>
                <div className="them">{r.b}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============= FINAL CTA ============= */
function HiwFinal() {
  return (
    <section className="pad" data-screen-label="hiw-final">
      <div className="wrap">
        <Reveal>
          <div className="hiw2-final">
            <div className="hiw2-final-copy">
              <div className="eyebrow">Ready when you are</div>
              <h2 className="serif">Describe an app. <em>Get an app.</em></h2>
              <p>Type whatever's been sitting in your notes app for two years. Your first build is free.</p>
            </div>
            <div className="hiw2-final-box"><PromptBox/></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function HowItWorksPage() {
  return (
    <React.Fragment>
      <HiwHero/>
      <HiwSteps/>
      <HiwAgents/>
      <HiwCompare/>
      <HiwFinal/>
    </React.Fragment>
  );
}


export default HowItWorksPage;
export { HiwSteps, HiwAgents };
