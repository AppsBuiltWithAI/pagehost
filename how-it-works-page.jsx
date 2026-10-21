/* global React, PoofPart1 */
const { Reveal, ArrowRight, Check, PromptBox } = window.PoofPart1;

/* ============= HOW IT WORKS PAGE ============= */
function HiwHero() {
  return (
    <section className="sub-hero" data-screen-label="hiw-hero">
      <div className="wrap-tight">
        <Reveal>
          <div className="eyebrow">How it works</div>
          <h1 className="serif">You describe it. <em>We build it.</em></h1>
          <p className="sub-lead">
            No drag-and-drop. No "low-code blocks." Just type what you want, in whatever words you already use, and watch a real app appear.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <div className="sub-meta">
            <span>4 steps</span>
            <span className="dot"/>
            <span>Build and refine</span>
            <span className="dot"/>
            <span>Start in plain language</span>
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
        <span className="hiw-mock-tag">Illustration</span>
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
          <div className="hiw-edit-msg you">Make the button warmer, like crust.</div>
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
  return <figure className="finished-example"><img src="assets/examples/studio.jpg" alt="A finished illustrative studio portfolio" width="1280" height="820" loading="lazy"/><figcaption>A separate illustrative portfolio example. <a href="use-cases.html#studio">Explore the full example</a>.</figcaption></figure>;
}

/* ============= STEPS ============= */
const STEPS = [
  {
    n: "01",
    eyebrow: "Step one",
    title: <>Just<br/><em>describe it.</em></>,
    body: "In the words you'd use to tell a friend. \"A booking page for my dog walking service.\" \"A storefront for my candles.\" \"A form that emails me when someone signs up.\" Use that as a starting point for your plan.",
    bullets: ["Describe your customer", "Focus on the main task", "Start with a clear first version"],
    mock: <MockPrompt/>,
  },
  {
    n: "02",
    eyebrow: "Step two",
    title: <>Watch it<br/><em>build itself.</em></>,
    body: "Review your first version as it takes shape. Check that the pages, forms, and data match what you had in mind.",
    bullets: ["Watch the first version take shape", "Review the result", "Ask for a focused change"],
    mock: <MockBuilding/>,
  },
  {
    n: "03",
    eyebrow: "Step three",
    title: <>Tell it<br/><em>what to change.</em></>,
    body: "Don't like the colors? Say so. Want a different field on the form? Say so. Need a whole new page? Say so. You're not editing code; you're directing.",
    bullets: ["Ask for specific changes", "Review each result", "Test the updated experience"],
    mock: <MockEdit/>,
  },
  {
    n: "04",
    eyebrow: "Step four",
    title: <>Share it<br/><em>when it's ready.</em></>,
    body: "Publish a version you have reviewed and tested. Open the live URL, follow the main customer journey, and share it when you are ready.",
    bullets: ["A live URL to share", "Custom domains on paid plans", "Keep refining your app"],
    mock: <MockPublish/>,
  },
];

function HiwSteps() {
  return (
    <section className="pad hiw-steps-section" data-screen-label="hiw-steps">
      <div className="wrap">
        {STEPS.map((s, i) => (
          <Reveal key={s.n}>
            <div className={"hiw-step " + (i % 2 ? "is-flip" : "")}>
              <div className="hiw-step-copy">
                <div className="eyebrow">{s.eyebrow}</div>
                <div className="hiw-step-num">{s.n}</div>
                <h2>{s.title}</h2>
                <p>{s.body}</p>
                <ul className="hiw-step-bullets">
                  {s.bullets.map((b) => <li key={b}><Check/><span>{b}</span></li>)}
                </ul>
              </div>
              <div className="hiw-step-art">
                <span className="example-label">Illustrative preview</span>{s.n === "04" ? s.mock : <div role="img" aria-label={"Illustrative preview of step " + s.n}>{s.mock}</div>}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============= AGENT BREAKDOWN ============= */
function HiwCompare() {
  const Comparison = window.ProductComparison;
  return <Comparison/>;
}

/* ============= FINAL CTA ============= */
function HiwFinal() {
  return (
    <section className="pad" data-screen-label="hiw-final">
      <div className="wrap-tight" style={{ textAlign: "center" }}>
        <Reveal>
          <div className="eyebrow">Ready when you are</div>
          <h2 className="serif" style={{
            fontFamily: "var(--f-head)",
            fontSize: "clamp(40px, 5vw, 72px)",
            letterSpacing: "var(--h-spacing)",
            lineHeight: 1.05,
            margin: "16px 0 16px",
          }}>
            Describe an app. <em>Get an app.</em>
          </h2>
          <p style={{ color: "var(--ink-2)", maxWidth: 560, margin: "0 auto 32px" }}>
            We mean it. Type whatever's been sitting in your notes app for two years.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <PromptBox/>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function HowItWorksPage() {
  return (
    <main className="brand-page">
      <HiwHero/>
      <HiwSteps/>
      <HiwCompare/>
      <HiwFinal/>
    </main>
  );
}

window.HowItWorksPage = HowItWorksPage;
window.HiwSteps = HiwSteps;
