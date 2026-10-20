import React from 'react';
import { Reveal, Check, Plus, ArrowRight, PromptBox, Logo, LangSwitcher } from './part1.jsx';
/* ============= PRICING ============= */
function Pricing() {
  const [billing, setBilling] = React.useState("annual");
  const annual = billing === "annual";

  const tiers = [
    {
      name: "Free", sub: "Try it on for size",
      monthly: 0, annual: 0,
      eyebrow: "50 credits / mo · +100 bonus month one",
      features: ["Up to 3 public apps", "Planning agent to plan out your project", "Data feasibility check", "appsbuiltwithai.com subdomain", "Community support"],
      cta: "Start free", btn: "btn-outline", featured: false,
    },
    {
      name: "Starter", sub: "Your first real product",
      monthly: 19, annual: 15,
      eyebrow: "100 credits / month",
      features: ["Unlimited live apps", "Custom domain, no badge", "Security scan on publish", "Credits roll over 1 month", "GitHub sync and code export", "Email support"],
      cta: "Get Starter", btn: "btn-outline", featured: false, from: true,
    },
    {
      name: "Growth", sub: "Shipping regularly",
      monthly: 49, annual: 39,
      eyebrow: "300 credits / month",
      features: ["Everything in Starter, plus", "Work board, backlog and epics", "Feature planning with tickets", "Testing agent", "Priority build queue", "Priority chat support"],
      cta: "Go Growth", btn: "btn-coral", featured: true, tag: "MOST POPULAR", from: true,
    },
    {
      name: "Pro", sub: "A product with customers",
      monthly: 99, annual: 79,
      eyebrow: "650 credits / month",
      features: ["Everything in Growth, plus", "Credits roll over 2 months", "Knowledge base for your style", "Design systems and theming", "Team roles and credit caps"],
      cta: "Go Pro", btn: "btn-outline", featured: false, from: true,
    },
    {
      name: "Scale", sub: "Heavy building, the biggest ladder",
      monthly: 199, annual: 159,
      eyebrow: "1,400 credits / mo, up to 10,000",
      features: ["Everything in Pro, plus", "The biggest credit ladder", "Audit log and access review", "Business hosting", "Priority support"],
      cta: "Choose credits", btn: "btn-outline", featured: false, from: true,
    },
  ];

  return (
    <section className="pad" id="pricing" data-screen-label="pricing">
      <div className="wrap">
        <Reveal className="sec-head">
          <h2>Start free.<br/> <em>Upgrade only when it's working.</em></h2>
          <p>Predictable bills. Credits roll over. Hard spending cap on by default: no Replit-style surprise invoices.</p>
          <div style={{ marginTop: 28, display: "flex", justifyContent: "center" }}>
            <div className="price-toggle">
              <button className={!annual ? "active" : ""} onClick={() => setBilling("monthly")}>Monthly</button>
              <button className={annual ? "active" : ""} onClick={() => setBilling("annual")}>
                Annual <span className="save">SAVE 20%</span>
              </button>
            </div>
          </div>
        </Reveal>

        <div className="pricing">
          {tiers.map((t, i) => {
            const price = annual ? t.annual : t.monthly;
            const isFree = price === 0;
            return (
              <Reveal key={t.name} delay={i * 80}>
                <div className={"price-card" + (t.featured ? " featured" : "")}>
                  {t.tag && <span className="price-tag">★ {t.tag}</span>}
                  <div className="price-name">{t.name}</div>
                  <div className="price-sub">"{t.sub}"</div>
                  <div className="price-amt">
                    {t.from && <small>from </small>}${price}
                    {!isFree && <small> / mo</small>}
                  </div>
                  <div className="price-billed">
                    {isFree ? "Free forever · no card required" : annual ? "Billed annually · save 20%" : "Billed monthly"}
                  </div>
                  {t.eyebrow && <div className="price-credit-eyebrow">{t.eyebrow}</div>}
                  <ul className="price-feat">
                    {t.features.map((f) => <li key={f}><Check/><span>{f}</span></li>)}
                  </ul>
                  <div className="price-cta">
                    <a className={"btn btn-lg btn-block " + t.btn} href={t.name === "Scale" ? "/pricing" : "/signup?plan=" + t.name.toLowerCase()}>{t.cta}</a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <div className="price-compare-cta">
            <span><strong>Around 19 to 20 cents a credit</strong> at entry on every plan, improving as you climb the ladder inside it. Thirty credit steps in total, all on a dropdown.</span>
            <a className="btn btn-outline" href="/pricing">Compare every plan <ArrowRight/></a>
          </div>
        </Reveal>

        <Reveal>
          <div className="price-payg">
            <div className="price-payg-left">
              <div className="price-payg-eyebrow">Or pay as you go</div>
              <h3>Just need a few builds? <em>Top up with credits.</em></h3>
              <p>Buy build credits, no subscription. 100 credits for $25 · 500 for $115 · 1,000 for $220. <strong>Valid for 12 months.</strong> Roughly: <strong>1 small edit ≈ 1 credit</strong>, <strong>a new feature ≈ 25</strong>, <strong>a full app ≈ 100</strong>.</p>
            </div>
            <div className="price-payg-right">
              <a className="btn btn-outline" href="/signup?plan=payg">Buy credits →</a>
              <div className="price-payg-edu">🎓 Students &amp; teachers: <a href="mailto:support@appsbuiltwithai.com?subject=Student%20or%20teacher%20discount">50% off any plan</a></div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============= FAQ ============= */
function FAQ({ extra = [] } = {}) {
  const base = [
    { q: "Do I really not need to know any code?", a: "Truly. If you can describe what you want in a sentence, AppsBuiltWithAI can build it. You'll never see, write, or read code unless you want to. If you do, every plan from Starter up includes full code export." },
    { q: "What if it builds the wrong thing?", a: "Just tell it. \"Move the form to the top.\" \"Use my brand pink.\" \"Add a confirmation email.\" The editor agent edits live while you watch." },
    { q: "How long does it actually take?", a: "First working version: usually 1 to 3 minutes. Polished and shareable: typically under 10 minutes. We measure it. The median is 9." },
    { q: "Is my app really mine?", a: "100% yours. From Starter, export the full source code anytime and sync it to GitHub. Yours to host, modify, or hand to a developer. No lock-in." },
    { q: "What if I get stuck?", a: "Ask in plain words, read our friendly guides, or chat with a real human (yes, even on Free)." },
    { q: "How is this different from Base44, Lovable, Replit?", a: "They start at the prompt. We start at the plan: a brief you approve, a check that the data your idea needs can actually be sourced, and a flag if it lands somewhere regulated. Then a testing agent and a security scan before it ships. That's the difference between a demo and something you can sell." },
  ];
  const items = [...base, ...extra];
  const [open, setOpen] = React.useState(0);
  return (
    <section className="pad faq3-sec" id="faq" data-screen-label="faq">
      <div className="wrap faq3">
        <Reveal className="faq3-side">
          <div className="eyebrow">FAQ</div>
          <h2 className="serif">Before you build.</h2>
          <p>Short answers to what people ask most. Anything else, <a href="/support">ask us</a> and a real person replies.</p>
        </Reveal>
        <Reveal className="faq3-list">
          {items.map((it, i) => (
            <div key={it.q} className={"faq3-item" + (open === i ? " open" : "")}>
              <button className="faq3-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                <span>{it.q}</span>
                <span className="faq3-ic" aria-hidden="true"></span>
              </button>
              <div className="faq3-a"><div className="faq3-a-inner"><p>{it.a}</p></div></div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ============= FINAL CTA ============= */
function FinalCTA() {
  return (
    <section className="final" data-screen-label="final-cta">
      <img src="/site/assets/logo-mark.png" alt="" className="final-watermark" aria-hidden="true"/>
      <div className="wrap-tight">
        <Reveal>
          <div className="eyebrow final-eyebrow">Your turn</div>
          <h2>Got an idea? <em>Let's <span className="marker">build it.</span></em></h2>
          <p>Type it below. Watch it build. Be live before this page finishes loading in your memory.</p>
          <div className="final-prompt-wrap">
            <PromptBox/>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============= CLOSING STAGE: types a sentence, builds the app, gets paid ============= */
const FSTAGE_SENTENCE = "A booking page for my bakery";
const FSTAGE_BUILD = ["Pages & layout", "Booking calendar", "Card payments", "Confirmation emails"];
const FSTAGE_CYCLE = 12000;

function FooterStage() {
  const reduced = typeof window !== "undefined" && window.matchMedia
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [ms, setMs] = React.useState(0);
  const [live, setLive] = React.useState(false);
  const hostRef = React.useRef(null);

  /* only run while on screen */
  React.useEffect(() => {
    const el = hostRef.current;
    if (!el || typeof IntersectionObserver === "undefined") { setLive(true); return; }
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
    if (reduced || !live) return;
    const id = setInterval(() => setMs((v) => (v + 120) % FSTAGE_CYCLE), 120);
    return () => clearInterval(id);
  }, [reduced, live]);

  const t = reduced ? FSTAGE_CYCLE - 1000 : ms;
  const chars = Math.max(0, Math.min(FSTAGE_SENTENCE.length, Math.round((t - 500) / 58)));
  const typed = FSTAGE_SENTENCE.slice(0, chars);
  const typingDone = chars >= FSTAGE_SENTENCE.length;
  const pressed = t > 2300;
  const buildDone = (i) => t > 2700 + i * 480;
  const appUp = t > 5000;
  const paid = t > 6100;
  const seen = t > 7000;
  const phase = !pressed ? 0 : !appUp ? 1 : 2;

  return (
    <div className="fstage" ref={hostRef}>
      <div className="fstage-rail" aria-hidden="true">
        {["Described", "Built", "Loved"].map((s, i) => (
          <span key={s} className={"fstage-rail-step" + (phase === i ? " on" : "") + (phase > i ? " done" : "")}>
            <span className="fstage-rail-dot"></span>{s}
          </span>
        ))}
      </div>

      <div className="fstage-panes">
        {/* left: the sentence */}
        <div className="fstage-pane fstage-pane-say">
          <div className="fstage-pane-cap">You type</div>
          <div className="fstage-prompt">
            <span className="fstage-quote">"</span>
            <span className="fstage-typed">{typed}</span>
            {!typingDone && <span className="fstage-caret"></span>}
            {typingDone && <span className="fstage-quote">"</span>}
          </div>
          <div className={"fstage-go" + (appUp ? " done" : pressed ? " pressed" : typingDone ? " ready" : "")}>
            {appUp ? "Live on your domain" : pressed ? "Building…" : "Build it"} {appUp ? <span className="fstage-go-tick">✓</span> : <ArrowRight/>}
          </div>
        </div>

        {/* right: what comes back */}
        <div className="fstage-pane fstage-pane-get">
          <div className="fstage-pane-cap">You get</div>

          <div className={"fstage-build" + (appUp ? " gone" : "")}>
            {FSTAGE_BUILD.map((b, i) => (
              <div key={b} className={"fstage-build-row" + (buildDone(i) ? " on" : "")}>
                <span className="fstage-tick">✓</span>{b}
              </div>
            ))}
          </div>

          <div className={"fstage-app" + (appUp ? " up" : "")}>
            <div className="fstage-app-bar"><span></span><span></span><span></span><em>crumbandco.com</em></div>
            <div className="fstage-app-body">
              <div className="fstage-app-title">Book a pickup</div>
              <div className="fstage-app-slots">
                {["Sat 9:00", "Sat 10:30", "Sun 9:00"].map((s, i) => (
                  <span key={s} className={"fstage-slot" + (i === 1 ? " picked" : "")}>{s}</span>
                ))}
              </div>
              <div className="fstage-app-btn">Pay $8 →</div>
            </div>
          </div>

          <div className={"fstage-toast fstage-toast-1" + (paid ? " in" : "")}>💳 Payment received · $8</div>
          <div className={"fstage-toast fstage-toast-2" + (seen ? " in" : "")}>📈 214 visitors today</div>
        </div>
      </div>

    </div>
  );
}

/* ============= FOOTER ============= */
function Footer({ lean, onStart }) {
  return (
    <footer className="footer" data-screen-label="footer">
      {/* closing act: dark stage, plays the promise */}
      <div className="footer-top fstage-band">
        <div className="wrap footer-top-wrap">
          <div className="footer-top-eyebrow fstage-eyebrow">
            <span className="footer-top-dot"/>
            <span style={{ whiteSpace: "nowrap" }}>For the rest of us</span>
          </div>
          <h2 className="footer-top-h ftb-h">
            <span>Described.</span> <span>Built.</span> <em>Loved.</em>
          </h2>
          <p className="footer-top-sub ftb-sub">
            No engineering team. No code. Just the app you've been describing to friends for months.
          </p>

          <FooterStage/>

          <div className="footer-cta-row">
            {onStart
              ? <button className="footer-cta-primary" onClick={onStart}>
                  Start free
                  <ArrowRight/>
                </button>
              : <a className="footer-cta-primary" href="/signup">
                  Start free: no card
                  <ArrowRight/>
                </a>}
            {!lean && <a className="footer-cta-ghost" href="/how-it-works">
              See how it works
            </a>}
          </div>
        </div>
      </div>

      <div className="footer-dark">
        <div className="wrap">
        <div className={"footer-grid" + (lean ? " footer-grid-lean" : "")}>
          <div className="footer-brand">
            <Logo/>
            <p>The app builder for people who'd rather not become engineers.</p>
            {!lean && <form className="footer-news" onSubmit={(e) => { e.preventDefault(); const f = e.currentTarget; f.classList.add("done"); }}>
              <label className="footer-news-label">Get one good build idea a week</label>
              <div className="footer-news-row">
                <input className="footer-news-input" type="email" required placeholder="you@email.com" aria-label="Email address"/>
                <button className="footer-news-btn" type="submit" aria-label="Subscribe"><ArrowRight/></button>
              </div>
              <span className="footer-news-ok">Thanks: see you Friday. ✦</span>
            </form>}
          </div>
          {!lean && <><div className="footer-col">
            <h5>Product</h5>
            <ul>
              <li><a href="/features">Features</a></li>
              <li><a href="/how-it-works">How it works</a></li>
              <li><a href="/use-cases">Use cases</a></li>
              <li><a href="/compare">Compare</a></li>
              <li><a href="/pricing">Pricing</a></li>
              <li><a href="/connectors">Connectors</a></li>
              <li><a href="/roadmap">Roadmap</a></li>
              <li><a href="/changelog">Change log</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Help</h5>
            <ul>
              <li><a href="/support">Support</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Company</h5>
            <ul>
              <li><a href="/about">About</a></li>
              <li><a href="/security">Security</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Legal</h5>
            <ul>
              <li><a href="/legal#privacy">Privacy</a></li>
              <li><a href="/legal#cookie">Cookies</a></li>
              <li><a href="/legal#concerns">Security concerns</a></li>
              <li><a href="/legal#terms">Terms</a></li>
            </ul>
          </div></>}
        </div>

        <div className={"footer-bar" + (lean ? " footer-bar-lean" : "")}>
          <div className="footer-bar-left">
            {!lean && <LangSwitcher variant="footer" drop="up" />}
            {!lean && <span>© 2026 AppsBuiltWithAI</span>}
          </div>
          <div className="links footer-socials">
            <a href="https://x.com/appsbuiltwithai" target="_blank" rel="noopener noreferrer" aria-label="Follow on X" title="Follow on X">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2H21l-6.49 7.41L22 22h-6.81l-4.78-6.27L4.77 22H2l6.94-7.93L2 2h6.91l4.34 5.74L18.244 2Zm-2.39 18h1.66L8.24 4H6.49l9.364 16Z"/></svg>
              <span>X / Twitter</span>
            </a>
            <a href="https://www.youtube.com/@Appsbuiltwithai" target="_blank" rel="noopener noreferrer" aria-label="Subscribe on YouTube" title="YouTube">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.5 6.2a3.02 3.02 0 0 0-2.13-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.37.51A3.02 3.02 0 0 0 .5 6.2C0 8.07 0 12 0 12s0 3.93.5 5.8a3.02 3.02 0 0 0 2.13 2.14c1.87.51 9.37.51 9.37.51s7.5 0 9.37-.51a3.02 3.02 0 0 0 2.13-2.14c.5-1.87.5-5.8.5-5.8s0-3.93-.5-5.8ZM9.6 15.6V8.4l6.24 3.6L9.6 15.6Z"/></svg>
              <span>YouTube</span>
            </a>
          </div>
        </div>
        {lean && (
          <div className="footer-sign">
            <div className="footer-sign-row">
              <span>© 2026 AppsBuiltWithAI</span>
              <span className="footer-sign-dot">·</span>
              <span>Made for people who'd rather not become engineers</span>
            </div>
          </div>
        )}
        </div>
      </div>
    </footer>
  );
}

export { Pricing, FAQ, FinalCTA, Footer };
