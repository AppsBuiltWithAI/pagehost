/* global React, PoofPart1 */
const { Reveal, Check, Plus, ArrowRight, PromptBox, Logo } = window.PoofPart1;

/* ============= PRICING ============= */
function Pricing() {
  const [billing, setBilling] = React.useState("annual");
  const annual = billing === "annual";

  const tiers = [
    {
      name: "Free", sub: "Try it on for size",
      monthly: 0, annual: 0,
      eyebrow: "30 credits / month",
      features: ["3 live apps", "Chat to build & edit", "Starter connectors (Stripe, Gmail, Drive)", "appsbuilt.ai subdomain", "Community support"],
      cta: "Start free", btn: "btn-outline", featured: false,
    },
    {
      name: "Pro", sub: "Build for real",
      monthly: 19, annual: 15,
      eyebrow: "100 credits / mo · pick more in dropdown",
      features: ["Unlimited apps", "Custom domain · no badge", "All 19 connectors", "Knowledge base for your style", "Export your full source code", "Priority chat support"],
      cta: "Go Pro", btn: "btn-coral", featured: true, tag: "MOST POPULAR",
    },
    {
      name: "Business", sub: "For real teams",
      monthly: 99, annual: 79,
      eyebrow: "1,000 shared credits · 5 seats incl.",
      features: ["Everything in Pro, for 5 seats", "Extra seats $12 · no per-seat surprise", "Shared knowledge base & templates", "SSO / SAML · data opt-out", "Roles, audit log, approvals", "Dedicated success manager"],
      cta: "Try Business", btn: "btn-outline", featured: false,
    },
  ];

  return (
    <section className="pad" id="pricing" data-screen-label="pricing">
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="eyebrow">Pricing</div>
          <h2>Start free.<br/><em>Upgrade only when it's working.</em></h2>
          <p>Predictable bills. Credits roll over. Hard spending cap on by default — no Replit-style surprise invoices.</p>
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
                    ${price}
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
                    <a className={"btn btn-lg btn-block " + t.btn} href={t.featured ? "signup.html?plan=pro" : (t.name === "Business" ? "signup.html?plan=business" : "signup.html")}>{t.cta}</a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <div className="price-compare-cta">
            <span><strong>Want more credits?</strong> Pro starts at 100/mo and scales up · Business shares 1,000–5,000 across the team.</span>
            <a className="btn btn-outline" href="pricing.html">Compare every plan <ArrowRight/></a>
          </div>
        </Reveal>

        <Reveal>
          <div className="price-payg">
            <div className="price-payg-left">
              <div className="price-payg-eyebrow">Or pay as you go</div>
              <h3>Just need a few builds? <em>Top up with credits.</em></h3>
              <p>Buy build credits, no subscription. 100 credits for $12 · 250 for $25 · 500 for $45. <strong>Credits never expire.</strong> Roughly: <strong>1 small edit ≈ 1 credit</strong>, <strong>a new feature ≈ 25</strong>, <strong>a full app ≈ 100</strong>.</p>
            </div>
            <div className="price-payg-right">
              <a className="btn btn-outline" href="signup.html?plan=payg">Buy credits →</a>
              <div className="price-payg-edu">🎓 Students &amp; teachers: <a href="#">50% off any plan</a></div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============= FAQ ============= */
function FAQ() {
  const items = [
    { q: "Do I really not need to know any code?", a: "Truly. If you can describe what you want in a sentence, AppsBuiltWithAI can build it. You'll never see, write, or read code unless you want to (and on Pro, you can — full export, your code)." },
    { q: "What if it builds the wrong thing?", a: "Just tell it. \"Move the form to the top.\" \"Use my brand pink.\" \"Add a confirmation email.\" The editor agent edits live while you watch." },
    { q: "How long does it actually take?", a: "First working version: usually 1–3 minutes. Polished and shareable: typically under 10 minutes. We measure it. The median is 9." },
    { q: "Is my app really mine?", a: "100% yours. On Pro, export the full source code anytime — yours to host, modify, or hand to a developer. No lock-in." },
    { q: "What if I get stuck?", a: "Ask in plain words, read our friendly guides, or chat with a real human (yes, even on Free)." },
    { q: "How is this different from Lovable, Replit, Bolt?", a: "They're built for developers who want AI help. AppsBuiltWithAI is built for everyone else — small businesses, freelancers, side-project people. No \"prompt engineering,\" no dev jargon, no IDE." },
  ];
  const [open, setOpen] = React.useState(0);
  return (
    <section className="pad" id="faq" data-screen-label="faq" style={{ background: "var(--surface-2)", borderTop: "1px solid var(--line-2)", borderBottom: "1px solid var(--line-2)" }}>
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="eyebrow">Honest answers</div>
          <h2 className="serif">Questions every non-coder asks.</h2>
        </Reveal>
        <Reveal className="faq">
          {items.map((it, i) => (
            <div key={it.q} className={"faq-item" + (open === i ? " open" : "")}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                <span>{it.q}</span>
                <span className="faq-toggle">+</span>
              </button>
              <div className="faq-a">{it.a}</div>
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
      <img src="assets/logo-mark.png" alt="" className="final-watermark" aria-hidden="true"/>
      <div className="wrap-tight">
        <Reveal>
          <div className="eyebrow">Last stop</div>
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

/* ============= FOOTER ============= */
function Footer() {
  return (
    <footer className="footer" data-screen-label="footer">
      {/* editorial top — huge tagline + decorative elements */}
      <div className="footer-top">
        <div className="wrap footer-top-wrap">
          <div className="footer-top-eyebrow">
            <span className="footer-top-dot"/>
            <span>Still here? Let's build.</span>
          </div>
          <h2 className="footer-top-h">
            For the rest <em>of us.</em>
          </h2>
          <p className="footer-top-sub">
            The 90% who have ideas but no engineering team. The hobbyists,
            the side-hustlers, the small-shop owners. The people who'd
            rather not learn what <em>deploy</em> means.
          </p>
          <div className="footer-cta-row">
            <a className="footer-cta-primary" href="signup.html">
              Start free — no card
              <ArrowRight/>
            </a>
            <a className="footer-cta-ghost" href="how-it-works.html">
              See how it works
            </a>
          </div>
          {/* decorative orbits */}
          <span className="footer-deco footer-deco-sun" aria-hidden="true"/>
          <span className="footer-deco footer-deco-coral" aria-hidden="true"/>
          <svg className="footer-deco-rule" viewBox="0 0 1200 32" aria-hidden="true" preserveAspectRatio="none">
            <path d="M0 16 Q 200 0, 400 16 T 800 16 T 1200 16" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeDasharray="1 7"/>
          </svg>
        </div>
      </div>

      <div className="footer-dark">
        <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo/>
            <p>The app builder for people who'd rather not become engineers.</p>
          </div>
          <div className="footer-col">
            <h5>Product</h5>
            <ul>
              <li><a href="templates.html">Templates</a></li>
              <li><a href="how-it-works.html">How it works</a></li>
              <li><a href="pricing.html">Pricing</a></li>
              <li><a href="connectors.html">Connectors</a></li>
              <li><a href="roadmap.html">Roadmap</a></li>
              <li><a href="changelog.html">Change log</a></li>
              <li><a href="status.html">Status</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Resources</h5>
            <ul>
              <li><a href="resources.html#learn">Learn</a></li>
              <li><a href="resources.html#training">Training</a></li>
              <li><a href="support.html">Support</a></li>
              <li><a href="meetups.html">Meetups</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Company</h5>
            <ul>
              <li><a href="press.html">Press &amp; Media</a></li>
              <li><a href="partners.html">Partners</a></li>
              <li><a href="affiliates.html">Affiliates</a></li>
              <li><a href="security.html">Security</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Legal</h5>
            <ul>
              <li><a href="legal.html#privacy">Privacy</a></li>
              <li><a href="legal.html#cookie">Cookies</a></li>
              <li><a href="legal.html#concerns">Security concerns</a></li>
              <li><a href="legal.html#terms">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bar">
          <div>© 2026 AppsBuiltWithAI · Made with way too much coffee.</div>
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
        </div>
      </div>
    </footer>
  );
}

window.PoofPart3 = { Pricing, FAQ, FinalCTA, Footer };
