/* global React, PoofPart1, PoofPart3 */
const { Reveal, ArrowRight, Check } = window.PoofPart1;
const { Pricing, FAQ, FinalCTA } = window.PoofPart3;
const { useState: usePrState } = React;

/* ============================================================
   PRICING — standalone page
   ============================================================ */

function PricingHero() {
  return (
    <section className="sub-hero" data-screen-label="pricing-hero">
      <div className="wrap-tight">
        <Reveal>
          <div className="eyebrow">Pricing</div>
          <h1 className="serif">Start free. <em>Pay when it works.</em></h1>
          <p className="sub-lead">
            Pick your plan, pick your credits. Credits roll over. Hard
            spending cap on by default — no "surprise $300 bill from
            autonomous AI" stories. We put the brake pedal where you can
            reach it.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <div className="sub-meta">
            <span>No card to start</span>
            <span className="dot"/>
            <span>Cancel in two clicks</span>
            <span className="dot"/>
            <span>Credits never expire</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============= Plan picker — 3 cards, middle is interactive ============= */

// Pro and Business credit tiers, with monthly + annual prices.
// Annual is the equivalent monthly rate billed yearly (~20% off).
const PLAN_OPTIONS = {
  pro: {
    name: "Pro",
    blurb: "Build for real",
    tag: "MOST POPULAR",
    featured: true,
    perks: [
      "Unlimited live apps",
      "Custom domain · no badge",
      "All 19 connectors",
      "Knowledge base for your style",
      "Code export · GitHub sync",
      "Priority chat support",
    ],
    credits: [
      { credits: 100,  monthly: 19,  annual: 15  },
      { credits: 250,  monthly: 39,  annual: 31  },
      { credits: 500,  monthly: 69,  annual: 55  },
      { credits: 1000, monthly: 119, annual: 95  },
    ],
  },
  business: {
    name: "Business",
    blurb: "For real teams",
    perks: [
      "Everything in Pro, shared by your team",
      "5 seats included · $12 / extra",
      "Roles, audit log, approvals",
      "Shared knowledge base",
      "SSO / SAML · data opt-out",
      "Dedicated success manager",
    ],
    credits: [
      { credits: 1000, monthly: 99,  annual: 79  },
      { credits: 2500, monthly: 199, annual: 159 },
      { credits: 5000, monthly: 369, annual: 295 },
    ],
  },
};

function PlanPicker() {
  const [plan, setPlan]       = usePrState("pro");
  const [billing, setBilling] = usePrState("annual");
  const [tierIdx, setTierIdx] = usePrState(0);

  const annual = billing === "annual";

  // Reset to first credit tier when switching plan
  const switchPlan = (p) => { setPlan(p); setTierIdx(0); };

  const opts = PLAN_OPTIONS[plan];
  const tier = opts.credits[tierIdx];
  const price = annual ? tier.annual : tier.monthly;

  return (
    <section className="pad pt-0">
      <div className="wrap">
        <div className="pricing-3">

          {/* ---------- Free card ---------- */}
          <Reveal>
            <div className="price3-card">
              <div className="price3-name">Free</div>
              <div className="price3-blurb">"Try it on"</div>
              <div className="price3-amt">$0<small>/mo</small></div>
              <div className="price3-billed">Free forever · no card</div>

              <div className="price3-headline">
                <strong>30</strong> credits / month
              </div>
              <ul className="price3-perks">
                <li><Check/> 3 live apps</li>
                <li><Check/> Chat to build & edit</li>
                <li><Check/> Starter connectors (Stripe, Gmail)</li>
                <li><Check/> Subdomain on appsbuilt.ai</li>
                <li><Check/> Community support</li>
              </ul>
              <a className="btn btn-outline btn-block" href="signup.html?plan=free">Start free</a>
            </div>
          </Reveal>

          {/* ---------- Picker card ---------- */}
          <Reveal delay={80}>
            <div className={"price3-card price3-picker" + (opts.featured ? " featured" : "")}>
              {opts.featured && <span className="price3-tag">★ {opts.tag}</span>}

              {/* Plan dropdown */}
              <label className="price3-select-row">
                <span className="price3-select-label">Plan</span>
                <select
                  className="price3-select"
                  value={plan}
                  onChange={(e) => switchPlan(e.target.value)}
                  aria-label="Select plan"
                >
                  <option value="pro">Pro — solo</option>
                  <option value="business">Business — for teams</option>
                </select>
              </label>

              <div className="price3-blurb">"{opts.blurb}"</div>

              <div className="price3-amt">
                ${price}<small>/mo</small>
              </div>
              <div className="price3-billed">
                {annual ? "Billed annually · save 20%" : "Billed monthly"}
              </div>

              {/* Credits dropdown */}
              <label className="price3-select-row">
                <span className="price3-select-label">Credits per month</span>
                <select
                  className="price3-select"
                  value={tierIdx}
                  onChange={(e) => setTierIdx(parseInt(e.target.value, 10))}
                  aria-label="Credit allowance"
                >
                  {opts.credits.map((c, i) => (
                    <option key={i} value={i}>
                      {c.credits.toLocaleString()} credits — ${annual ? c.annual : c.monthly}/mo
                    </option>
                  ))}
                </select>
              </label>

              {/* Billing dropdown */}
              <label className="price3-select-row">
                <span className="price3-select-label">Billing</span>
                <select
                  className="price3-select"
                  value={billing}
                  onChange={(e) => setBilling(e.target.value)}
                  aria-label="Billing period"
                >
                  <option value="annual">Annual — save 20%</option>
                  <option value="monthly">Monthly</option>
                </select>
              </label>

              <div className="price3-headline">
                <strong>{tier.credits.toLocaleString()}</strong> credits / month
                <span className="price3-rollover">· rolls over 1 month</span>
              </div>
              <ul className="price3-perks">
                {opts.perks.map(p => <li key={p}><Check/> {p}</li>)}
              </ul>

              <a className="btn btn-coral btn-block" href={`signup.html?plan=${plan}&credits=${tier.credits}&billing=${billing}`}>
                Choose {opts.name}
              </a>
            </div>
          </Reveal>

          {/* ---------- Enterprise card ---------- */}
          <Reveal delay={160}>
            <div className="price3-card">
              <div className="price3-name">Enterprise</div>
              <div className="price3-blurb">"Run it your way"</div>
              <div className="price3-amt price3-amt-custom">Custom</div>
              <div className="price3-billed">Quoted per workspace</div>

              <div className="price3-headline">
                <strong>Pooled</strong> credits · custom
              </div>
              <ul className="price3-perks">
                <li><Check/> Unlimited seats · pooled credits</li>
                <li><Check/> SSO / SAML / SCIM</li>
                <li><Check/> HIPAA · BAA · custom DPA</li>
                <li><Check/> Self-host / VPC option</li>
                <li><Check/> 24/7 support · 99.99% SLA</li>
                <li><Check/> Dedicated account team</li>
              </ul>
              <a className="btn btn-ink btn-block" href="mailto:sales@appsbuiltwithai.com">Contact sales</a>
            </div>
          </Reveal>

        </div>

        {/* Helper strip */}
        <Reveal>
          <div className="price-help-strip">
            <span>
              <strong>~1 credit</strong> per small edit · <strong>~25</strong> for a new feature · <strong>~100</strong> for a full app.
              Unused credits <strong>roll over 1 month</strong>. Hard spending cap on by default.
            </span>
            <a className="price-help-link" href="#compare">See everything →</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============= full compare table ============= */

const Y = () => <span className="yes">✓</span>;
const N = () => <span className="no">—</span>;

const COL_ORDER = ["free", "pro", "business", "enterprise"];
const COL_LABEL = { free: "Free", pro: "Pro ★", business: "Business", enterprise: "Enterprise" };

const ROWS = [
  { section: "Building & credits" },
  { feat: "Build credits / month", free: "30", pro: "100 – 1,000", business: "1,000 – 5,000 shared", enterprise: "Pooled, custom" },
  { feat: "Credit rollover",       free: <N/>, pro: "1 month", business: "1 month", enterprise: "Unlimited" },
  { feat: "Hard spending cap",     free: <Y/>, pro: <Y/>,      business: <Y/>,      enterprise: "Custom" },
  { feat: "Chat to build & edit",  free: <Y/>, pro: <Y/>,      business: <Y/>,      enterprise: <Y/> },
  { feat: "Edit-while-you-watch",  free: <Y/>, pro: <Y/>,      business: <Y/>,      enterprise: <Y/> },
  { feat: "Plan mode (PRD builder)", free: <Y/>, pro: <Y/>,    business: <Y/>,      enterprise: <Y/> },
  { feat: "Build queue priority",  free: "Standard", pro: "Priority", business: "Top", enterprise: "Dedicated" },

  { section: "Publishing" },
  { feat: "Live apps",             free: "3",  pro: "Unlimited", business: "Unlimited", enterprise: "Unlimited" },
  { feat: "Subdomain (appsbuilt.ai)", free: <Y/>, pro: <Y/>,   business: <Y/>,        enterprise: <Y/> },
  { feat: "Custom domain",         free: <N/>, pro: <Y/>,      business: <Y/>,        enterprise: <Y/> },
  { feat: "Remove badge",          free: <N/>, pro: <Y/>,      business: <Y/>,        enterprise: <Y/> },
  { feat: "SSL · CDN · 99.99%",    free: <Y/>, pro: <Y/>,      business: <Y/>,        enterprise: "99.99% SLA" },

  { section: "Connectors" },
  { feat: "Stripe, Gmail, Drive",  free: <Y/>, pro: <Y/>,      business: <Y/>,        enterprise: <Y/> },
  { feat: "All 19 standard connectors", free: <N/>, pro: <Y/>, business: <Y/>,       enterprise: <Y/> },
  { feat: "Private / custom connectors", free: <N/>, pro: <N/>, business: <Y/>,     enterprise: <Y/> },

  { section: "Knowledge base" },
  { feat: "Personal style & voice", free: <N/>, pro: <Y/>,     business: <Y/>,        enterprise: <Y/> },
  { feat: "Shared team library",    free: <N/>, pro: <N/>,     business: <Y/>,        enterprise: <Y/> },
  { feat: "Custom skills & templates", free: <N/>, pro: <N/>,  business: <Y/>,        enterprise: <Y/> },

  { section: "Your code" },
  { feat: "Export source",         free: <N/>, pro: <Y/>,      business: <Y/>,        enterprise: <Y/> },
  { feat: "GitHub sync",           free: <N/>, pro: <Y/>,      business: <Y/>,        enterprise: <Y/> },
  { feat: "Self-host / VPC",       free: <N/>, pro: <N/>,      business: <N/>,        enterprise: <Y/> },

  { section: "Collaboration" },
  { feat: "Workspace seats",       free: "1",  pro: "1",       business: "5 + $12/ea", enterprise: "Unlimited" },
  { feat: "Roles & permissions",   free: <N/>, pro: <N/>,      business: <Y/>,        enterprise: <Y/> },
  { feat: "Audit log",             free: <N/>, pro: <N/>,      business: <Y/>,        enterprise: <Y/> },
  { feat: "Approval workflows",    free: <N/>, pro: <N/>,      business: <Y/>,        enterprise: <Y/> },

  { section: "Security & admin" },
  { feat: "2FA & magic-link",      free: <Y/>, pro: <Y/>,      business: <Y/>,        enterprise: <Y/> },
  { feat: "Data opt-out (no AI training)", free: <N/>, pro: <N/>, business: <Y/>,    enterprise: <Y/> },
  { feat: "SSO / SAML / SCIM",     free: <N/>, pro: <N/>,      business: <Y/>,        enterprise: <Y/> },
  { feat: "HIPAA / BAA",           free: <N/>, pro: <N/>,      business: "Available", enterprise: <Y/> },
  { feat: "Custom DPA",            free: <N/>, pro: <N/>,      business: <Y/>,        enterprise: <Y/> },

  { section: "Support" },
  { feat: "Community",             free: <Y/>, pro: <Y/>,      business: <Y/>,        enterprise: <Y/> },
  { feat: "Email",                 free: "—",  pro: "Priority chat", business: "Priority chat", enterprise: "Dedicated" },
  { feat: "Onboarding call",       free: <N/>, pro: <N/>,      business: <Y/>,        enterprise: <Y/> },
  { feat: "Dedicated CSM",         free: <N/>, pro: <N/>,      business: <Y/>,        enterprise: <Y/> },
  { feat: "24/7 + SLA",            free: <N/>, pro: <N/>,      business: <N/>,        enterprise: <Y/> },
];

function FullCompare() {
  return (
    <section className="pad pricing-page-compare" data-screen-label="compare" id="compare">
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="eyebrow">Compare every plan</div>
          <h2 className="serif">Side by side.</h2>
          <p>No asterisks. No "contact sales" on anything but Enterprise.</p>
        </Reveal>

        <Reveal>
          <div style={{ overflowX: "auto" }}>
            <table className="compare-table">
              <thead>
                <tr>
                  <th style={{ width: "38%", minWidth: 200 }}>Feature</th>
                  {COL_ORDER.map(col => (
                    <th key={col} className={col === "pro" ? "featured-col" : ""}>{COL_LABEL[col]}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r, i) =>
                  r.section ? (
                    <tr key={"s" + i} className="section-row"><td colSpan={5}>{r.section}</td></tr>
                  ) : (
                    <tr key={i}>
                      <td style={{ fontWeight: 600, color: "var(--ink)" }}>{r.feat}</td>
                      {COL_ORDER.map(col => (
                        <td key={col} className={col === "pro" ? "featured-col" : ""}>{r[col]}</td>
                      ))}
                    </tr>
                  )
                )}
                <tr>
                  <td></td>
                  {COL_ORDER.map(col => (
                    <td key={col} className={col === "pro" ? "featured-col" : ""}>
                      <a
                        className={"btn btn-sm " + (col === "pro" ? "btn-coral" : "btn-outline")}
                        href={col === "enterprise" ? "mailto:sales@appsbuiltwithai.com" : "signup.html?plan=" + col}
                        style={{ padding: "8px 14px", fontSize: 13 }}
                      >
                        {col === "free" ? "Start" : col === "enterprise" ? "Contact" : "Choose"}
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============= vs competitors ============= */

function VsCompetitors() {
  const rows = [
    { label: "Solo, monthly price",      us: "$15 (Pro, annual)", replit: "$25 (Core)",      lovable: "$25 (Pro)" },
    { label: "Free tier — live apps",    us: "3 live",           replit: "Public only",      lovable: "Public only" },
    { label: "Credit rollover",          us: <span className="highlight">Yes, on every paid plan</span>, replit: "Pro only", lovable: "Pro+ only" },
    { label: "Hard spending cap (default)", us: <span className="highlight">On by default</span>, replit: <span className="bad">Off — surprise bills</span>, lovable: "Manual top-up only" },
    { label: "Customize credit allowance", us: <span className="highlight">In-card dropdown</span>, replit: <span className="bad">Fixed per tier</span>, lovable: "Flex tiers (Pro)" },
    { label: "Small team (5 people)",    us: "$79/mo (Business)", replit: "$125/mo (5× Core)", lovable: "$125/mo (5× Pro)" },
    { label: "Bundled connectors",       us: "19 standard",      replit: "Bring your own",   lovable: "Bring your own" },
    { label: "Knowledge base (style/voice)", us: <span className="highlight">Built in</span>, replit: <span className="bad">Not available</span>, lovable: <span className="bad">Not available</span> },
    { label: "Plan mode (PRD builder)",  us: <span className="highlight">Built in</span>, replit: <span className="bad">Not available</span>, lovable: <span className="bad">Not available</span> },
    { label: "Free human support",       us: "Community + email", replit: "Community",        lovable: "Community" },
    { label: "Code export",              us: "From Pro ($15)",   replit: "Free tier",        lovable: "All plans" },
  ];
  return (
    <section className="pad">
      <div className="wrap-tight">
        <Reveal className="sec-head">
          <div className="eyebrow">Versus the field</div>
          <h2 className="serif">How we stack up.</h2>
          <p>We've been at this long enough to know what hurts. Here's where we deliberately went the other way.</p>
        </Reveal>

        <Reveal>
          <table className="vs-table">
            <thead>
              <tr>
                <th></th>
                <th className="vs-us">AppsBuiltWithAI</th>
                <th>Replit</th>
                <th>Lovable</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  <td className="vs-label">{r.label}</td>
                  <td className="vs-us">{r.us}</td>
                  <td>{r.replit}</td>
                  <td>{r.lovable}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <Reveal>
          <p className="vs-foot">
            All competitor data sourced from public pricing pages as of May 2026. Replit Pro = $100/mo flat for up to 15 builders (so 15 = $6.67/seat, but you forfeit per-seat credits). Lovable Pro = $25/mo per workspace.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ============= price guarantee ribbon ============= */
function PriceGuarantee() {
  const items = [
    { t: "Spending cap by default",   s: "On for every paid plan. Adjust or disable in Settings." },
    { t: "Credits roll over",          s: "1 month on monthly, 3 months on team plans, forever on Enterprise." },
    { t: "Your code is yours",         s: "Export the full source from Pro and up. No lock-in." },
    { t: "Price-locked forever",       s: "If we raise prices, your rate stays the same. Period." },
  ];
  return (
    <section className="pad" data-screen-label="guarantee">
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="eyebrow">The fine print, in big print</div>
          <h2 className="serif">Four promises<br/><em>you can hold us to.</em></h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, marginTop: 12 }}>
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i * 60}>
              <div style={{
                background: "var(--surface)",
                border: "1px solid var(--line)",
                borderRadius: 20,
                padding: "28px 26px",
                height: "100%",
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  display: "grid", placeItems: "center",
                  background: "var(--coral-tint)", color: "var(--coral-deep)",
                  marginBottom: 16,
                }}>
                  <Check/>
                </div>
                <div style={{ fontWeight: 700, fontSize: 16, color: "var(--ink)", marginBottom: 6 }}>{it.t}</div>
                <div style={{ fontSize: 14.5, color: "var(--ink-2)", lineHeight: 1.5 }}>{it.s}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingPage() {
  return (
    <>
      <PricingHero/>
      <PlanPicker/>
      <FullCompare/>
      <VsCompetitors/>
      <PriceGuarantee/>
      <FAQ/>
      <FinalCTA/>
    </>
  );
}

window.PricingPage = PricingPage;
