/* global React, PoofPart1 */
const { Reveal, Check, Plus, ArrowRight, PromptBox, Logo, AppLink } = window.PoofPart1;

/* ============= PRICING ============= */
function Pricing() {
  const [annual, setAnnual] = React.useState(true);
  return (
    <section className="pad" id="pricing" data-screen-label="pricing">
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="eyebrow">Room for your next idea</div>
          <h2>Start free.<br/><em>Pay when it works.</em></h2>
          <p>Pick your plan. Pick your credits. Marketing tools are coming soon and are not available at launch.</p>
        </Reveal>
        <div className="price-toggle" role="group" aria-label="Billing period">
          <button aria-pressed={!annual} className={!annual ? "active" : ""} onClick={() => setAnnual(false)}>Monthly</button>
          <button aria-pressed={annual} className={annual ? "active" : ""} onClick={() => setAnnual(true)}>Annual</button>
        </div>
        <div className="launch-pricing">
          {window.ABWAI.plans.map((plan) => (
            <div key={plan.id} className={"price-card" + (plan.id === "growth" ? " featured" : "")} data-plan={plan.id}>
              <div className="price-name">{plan.name}</div>
              <p className="price-sub">{plan.sub}</p>
              <div className="price-amt"><sup>$</sup>{annual ? plan.annual : plan.monthly}<small> / month</small></div>
              <p className="price-billed">{plan.id === "free" ? "No subscription" : annual ? "Monthly equivalent, billed annually" : "Billed monthly"}</p>
              <div className="price-credit-eyebrow">{plan.credits.toLocaleString("en-US")} credits / month</div>
              <ul className="price-feat">{[plan.apps, ...plan.features].map(feature => <li key={feature}><Check/><span>{feature}</span></li>)}</ul>
              <div className="price-cta"><AppLink href={window.ABWAI.pricingUrl} className={"btn btn-lg btn-block " + (plan.id === "growth" ? "btn-coral" : "btn-outline")}>View plans <ArrowRight/></AppLink></div>
            </div>
          ))}
        </div>
        <p className="launch-note">Review the plan, billing total, and included credits in the app before subscribing.</p>
      </div>
    </section>
  );
}

/* ============= FAQ ============= */
function FAQ() {
  const items = [
    { q: "Do I really not need to know any code?", a: "Truly. If you can describe what you want in a sentence, AppsBuiltWithAI can build it. You'll never see, write, or read code unless you want to." },
    { q: "What if it builds the wrong thing?", a: 'Just tell it. "Move the form to the top." "Use my brand pink." "Add a confirmation email." The editor agent edits live while you watch.' },
    { q: "How long does it actually take?", a: "First working version: usually 1–3 minutes. Polished and shareable: typically under 10 minutes. We measure it. The median is 9." },
    { q: "Is my app really mine?", a: "Your app is your app. On paid plans, export the full source code to host elsewhere, modify, or hand to a developer." },
    { q: "Where can I get help?", a: "Open Resources for getting-started guidance and a direct link to the help center in your workspace." },
    { q: "How does this compare with Lovable and Replit?", a: "All three support building with AI. AppsBuiltWithAI combines planning, building, testing, and publishing in a guided workflow. Our marketing tools are coming soon." },
    { q: "Are the marketing tools available now?", a: "Not at launch. Tribe Finder, content creation, and advertising tools are coming soon. They are shown as previews, not available plan features." },
  ];
  const [open, setOpen] = React.useState(0);
  return (
    <section className="pad" id="faq" data-screen-label="faq" style={{ background: "var(--surface-2)", borderTop: "1px solid var(--line-2)", borderBottom: "1px solid var(--line-2)" }}>
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="eyebrow">Honest answers</div>
          <h2 className="serif">Questions everyone asks before they build.</h2>
        </Reveal>
        <Reveal className="faq">
          {items.map((it, i) => (
            <div key={it.q} className={"faq-item" + (open === i ? " open" : "")}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} aria-controls={"faq-answer-" + i}>
                <span>{it.q}</span>
                <span className="faq-toggle" aria-hidden="true">+</span>
              </button>
              <div className="faq-a" id={"faq-answer-" + i} hidden={open !== i}><div className="faq-a-inner">{it.a}</div></div>
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
          <div className="eyebrow final-eyebrow">Your turn</div>
          <h2>Got an idea? <em>Let's <span className="marker">build it.</span></em></h2>
          <p>Open the builder. Tell it like you'd tell a friend.</p>
          <div className="final-prompt-wrap">
            <PromptBox/>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============= FOOTER ============= */
function Footer({ lean, onStart }) {
  return (
    <footer className="footer" data-screen-label="footer">
      {/* editorial top  -  Sana-style scattered stage */}
      <div className="footer-top">
        <div className="wrap footer-top-wrap">
          <div className="footer-top-eyebrow">
            <span className="footer-top-dot"/>
            <span style={{ whiteSpace: "nowrap" }}>For the rest of us</span>
          </div>
          <h2 className="footer-top-h footer-top-h-stack">
            Described.<br/>Built.<br/><em>Loved.</em>
          </h2>
          <p className="footer-top-sub">
            No engineering team. No code. Just the app you've been describing to friends for months.
          </p>
          <div className="footer-cta-row">
            {onStart
              ? <button className="footer-cta-primary" onClick={onStart}>
                  Join the waitlist
                  <ArrowRight/>
                </button>
              : <AppLink className="footer-cta-primary">
                  Start building
                  <ArrowRight/>
                </AppLink>}
            {!lean && <a className="footer-cta-ghost" href="how-it-works.html">
              See how it works
            </a>}
          </div>
          {/* scattered stage pieces */}
          <div className="fts fts-prompt fts-1" aria-hidden="true"><span className="plus">+</span>A booking page for my bakery<span className="go">→</span></div>
          <div className="fts fts-toast fts-2" aria-hidden="true"><span className="ok">✓</span>Published to crumb-and-co.app</div>
          <div className="fts fts-card fts-3" aria-hidden="true">
            <div className="fts-card-head">🛍️ Online store</div>
            <div className="fts-card-line"/><div className="fts-card-line short"/>
            <div className="fts-card-btn">Checkout</div>
          </div>
          <div className="fts fts-pill fts-4" aria-hidden="true">🛡️ Security scan passed</div>
          <div className="fts fts-cursor fts-5" aria-hidden="true"><svg width="12" height="12" viewBox="0 0 24 24" fill="#FF5C4D"><path d="M4 2l16 8-7 2-3 7z"/></svg><span className="tag coral">Mei</span></div>
          <div className="fts fts-cal fts-6" aria-hidden="true"><b>SAT</b><span>9:00 pickup</span></div>
          <div className="fts fts-toast mint fts-7" aria-hidden="true"><span className="ok">💳</span>Payment received · $8</div>
          <div className="fts fts-pill fts-8" aria-hidden="true">📈 214 visitors today</div>
          <div className="fts fts-cursor fts-9" aria-hidden="true"><svg width="12" height="12" viewBox="0 0 24 24" fill="#7A4FD0"><path d="M4 2l16 8-7 2-3 7z"/></svg><span className="tag plum">Jordan</span></div>
          <div className="fts fts-prompt fts-10" aria-hidden="true"><span className="plus">+</span>Make the header pink<span className="go">→</span></div>
        </div>
      </div>

      <div className="footer-dark">
        <div className="wrap">
        <div className={"footer-grid" + (lean ? " footer-grid-lean" : "")}>
          <div className="footer-brand">
            <Logo/>
            <p>The app builder for people who'd rather not become engineers.</p>
            {!lean && <a className="footer-news-label" href="resources.html">Explore learning resources <ArrowRight/></a>}
          </div>
          {!lean && <><div className="footer-col">
            <h3>Product</h3>
            <ul>
              <li><a href="use-cases.html">Examples</a></li>
              <li><a href="how-it-works.html">How it works</a></li>
              <li><a href="pricing.html">Pricing</a></li>
              <li><a href="connectors.html">Connectors</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Resources</h3>
            <ul>
              <li><a href="resources.html#learn">Learn</a></li>
              <li><a href="resources.html#training">Product guides</a></li>
              <li><AppLink href={window.ABWAI?.supportUrl || "https://app.appsbuiltwithai.com/dashboard/support"}>Support</AppLink></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Company</h3>
            <ul>
              <li><a href="affiliates.html">Affiliates</a></li>
              <li><a href="security.html">Security</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Legal</h3>
            <ul>
              <li><a href="privacy-policy.html">Privacy</a></li>
              <li><a href="cookie-policy.html">Cookies</a></li>
              <li><a href="legal.html#concerns">Security concerns</a></li>
              <li><a href="terms-of-service.html">Terms</a></li>
            </ul>
          </div></>}
        </div>

        <div className={"footer-bar" + (lean ? " footer-bar-lean" : "")}>
          <div className="footer-bar-left">
            {!lean && <span className="footer-language">English</span>}
            {!lean && <span>© 2026 AppsBuiltWithAI</span>}
          </div>
          <div className="links footer-socials">
            <a href="https://x.com/appsbuiltwithai" target="_blank" rel="noopener noreferrer" aria-label="Follow on X / Twitter (opens in a new tab)" title="Follow on X">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2H21l-6.49 7.41L22 22h-6.81l-4.78-6.27L4.77 22H2l6.94-7.93L2 2h6.91l4.34 5.74L18.244 2Zm-2.39 18h1.66L8.24 4H6.49l9.364 16Z"/></svg>
              <span>X / Twitter</span>
            </a>
            <a href="https://www.youtube.com/@Appsbuiltwithai" target="_blank" rel="noopener noreferrer" aria-label="Subscribe on YouTube (opens in a new tab)" title="YouTube">
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
            <div className="footer-sign-row" style={{ marginTop: 8 }}>
              <a href="privacy-policy.html" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a>
              <span className="footer-sign-dot">·</span>
              <a href="terms-of-service.html" style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Service</a>
              <span className="footer-sign-dot">·</span>
              <a href="cookie-policy.html" style={{ color: 'inherit', textDecoration: 'none' }}>Cookie Policy</a>
            </div>
          </div>
        )}
        </div>
      </div>
    </footer>
  );
}

window.PoofPart3 = { Pricing, FAQ, FinalCTA, Footer };
