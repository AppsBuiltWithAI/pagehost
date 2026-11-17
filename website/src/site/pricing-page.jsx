import React, { useState as usePrState } from 'react';
import { Reveal, ArrowRight, Check } from './part1.jsx';
import { FAQ, FinalCTA } from './part3.jsx';
/* PRICING, standalone page. Source of truth: dashboard Settings, Plan and credits. */

/* Prices and credit tiers mirror the app's billing catalog in server/config/plans.js. */
const PLAN_OPTIONS = {
  starter: {
    name: "Starter",
    blurb: "Your first real product",
    perks: [
      "Unlimited live apps",
      "Custom domain with SSL, no badge",
      "Security scan on publish",
      "GitHub sync and code export",
      "Testing agent",
      "Credits roll over 1 month",
      "Email support",
    ],
    credits: [
      { credits: 100, monthly: 19, annual: 15 },
      { credits: 200, monthly: 38, annual: 30 },
      { credits: 400, monthly: 76, annual: 61 },
      { credits: 1000, monthly: 190, annual: 152 },
    ],
  },
  growth: {
    name: "Growth",
    blurb: "Shipping regularly",
    tag: "MOST POPULAR",
    featured: true,
    perks: [
      "Everything in Starter, plus",
      "Work board, backlog and epics",
      "Feature planning with generated tickets",
      "Priority build queue",
      "Priority chat support",
    ],
    credits: [
      { credits: 300, monthly: 49, annual: 39 },
      { credits: 600, monthly: 98, annual: 78 },
      { credits: 1200, monthly: 196, annual: 157 },
      { credits: 2500, monthly: 408, annual: 327 },
    ],
  },
  pro: {
    name: "Pro",
    blurb: "A product with customers",
    perks: [
      "Everything in Growth, plus",
      "Credits roll over 2 months",
      "Knowledge base for your style",
      "Design systems and theming",
      "Team roles and per-seat credit caps",
    ],
    credits: [
      { credits: 650, monthly: 99, annual: 79 },
      { credits: 1300, monthly: 198, annual: 158 },
      { credits: 2600, monthly: 396, annual: 317 },
      { credits: 5200, monthly: 792, annual: 634 },
      { credits: 10000, monthly: 1523, annual: 1218 },
    ],
  },
  scale: {
    name: "Scale",
    blurb: "Several products, or one that earns",
    perks: [
      "Everything in Pro, plus",
      "The biggest credit ladder",
      "Credits roll over 2 months",
      "Unlimited workspaces",
      "Priority support",
    ],
    credits: [
      { credits: 1400, monthly: 199, annual: 159 },
      { credits: 2800, monthly: 398, annual: 318 },
      { credits: 5600, monthly: 796, annual: 637 },
      { credits: 10000, monthly: 1421, annual: 1137 },
    ],
  },
};

const ROLLOVER = { starter: "1 month", growth: "1 month", pro: "2 months", scale: "2 months" };

const PAID = ["starter", "growth", "pro", "scale"];
const FREE_PERKS = ["Planning agent to plan out your project", "Data feasibility check", "Up to 3 public apps", "Auth, database and analytics", "Community support"];
const ENT_PERKS = ["Unlimited seats, pooled credits", "SSO, SAML and SCIM", "Custom DPA", "Self-host or VPC option", "Contractual SLA", "Dedicated account team"];

function BillingToggle({ annual, setAnnual }) {
  return (
    <div className="pp-bill" role="radiogroup" aria-label="Billing period">
      <button role="radio" aria-checked={!annual} className={!annual ? "on" : ""} onClick={() => setAnnual(false)}>Monthly</button>
      <button role="radio" aria-checked={annual} className={annual ? "on" : ""} onClick={() => setAnnual(true)}>Annual <span className="pp-save">Save 20%</span></button>
    </div>
  );
}

function PricingHero({ annual, setAnnual }) {
  return (
    <section className="pp-hero" data-screen-label="pricing-hero">
      <div className="wrap-tight">
        <Reveal>
          <div className="eyebrow">Pricing</div>
          <h1 className="pp-h">Start free. <em>Pay when it works.</em></h1>
          <p className="pp-lead">Pick a plan and choose how many credits you need. Paid plans renew automatically on your selected billing schedule until you cancel in Settings.</p>
        </Reveal>
        <Reveal delay={100}>
          <div className="pp-hero-row">
            <BillingToggle annual={annual} setAnnual={setAnnual}/>
            <div className="pp-meta"><span>No card to start</span><span>Cancel anytime</span></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PlanCard({ id, annual, delay }) {
  const o = PLAN_OPTIONS[id];
  const [ti, setTi] = usePrState(0);
  const tier = o.credits[ti];
  const price = annual ? tier.annual : tier.monthly;
  return (
    <Reveal delay={delay} className="pp-col">
      <div className={"pp-card" + (o.featured ? " featured" : "")}>
        {o.featured && <span className="pp-tag">Most popular</span>}
        <div className="pp-name">{o.name}</div>
        <div className="pp-blurb">{o.blurb}</div>
        <div className="pp-price"><span className="pp-cur">$</span>{price.toLocaleString()}<span className="pp-per">/mo</span></div>
        <div className="pp-billed">
          {annual ? "Billed annually" : "Billed monthly"}<br/>
          {annual ? `$${tier.monthly.toLocaleString()}/mo billed monthly` : `$${tier.annual.toLocaleString()}/mo billed annually`}
        </div>
        <label className="pp-sel">
          <span className="pp-sel-l">Credits per month</span>
          <select value={ti} onChange={(e) => setTi(parseInt(e.target.value, 10))} aria-label={o.name + " credits per month"}>
            {o.credits.map((c, i) => <option key={i} value={i}>{c.credits.toLocaleString()} credits</option>)}
          </select>
        </label>
        <a className={"btn btn-block " + (o.featured ? "btn-coral" : "btn-ink")} href={`/signup?plan=${id}&credits=${tier.credits}&billing=${annual ? "annual" : "monthly"}`}>Choose {o.name}</a>
        <ul className="pp-perks">
          {o.perks.map((x) => <li key={x} className={x.startsWith("Everything") ? "pp-inherit" : ""}>{!x.startsWith("Everything") && <Check/>}{x}</li>)}
        </ul>
      </div>
    </Reveal>
  );
}

function PlanGrid({ annual }) {
  return (
    <section className="pp-plans" data-screen-label="pricing-plans">
      <div className="wrap">
        <div className="pp-grid">
          <Reveal className="pp-col">
            <div className="pp-card pp-free">
              <div className="pp-name">Free</div>
              <div className="pp-blurb">See if the idea works</div>
              <div className="pp-price"><span className="pp-cur">$</span>0<span className="pp-per">/mo</span></div>
              <div className="pp-billed">Free forever, no card</div>
              <div className="pp-sel pp-sel-static"><span className="pp-sel-l">Credits to start</span><b>50</b></div>
              <a className="btn btn-block btn-outline" href="/signup?plan=free">Start free</a>
              <ul className="pp-perks">{FREE_PERKS.map((x) => <li key={x}><Check/>{x}</li>)}</ul>
            </div>
          </Reveal>
          {PAID.map((id, i) => <PlanCard key={id} id={id} annual={annual} delay={(i + 1) * 60}/>)}
        </div>
        <Reveal>
          <div className="pp-ent">
            <div className="pp-ent-glow" aria-hidden="true"></div>
            <div className="pp-ent-l">
              <span className="pp-ent-kicker">Enterprise</span>
              <h3>Built for teams with real requirements.</h3>
              <p>Pooled credits, unlimited seats and your own security review. Quoted per workspace.</p>
              <div className="pp-ent-cta">
                <a className="btn btn-coral" href="mailto:sales@appsbuiltwithai.com?subject=Enterprise%20plan">Talk to sales <ArrowRight/></a>
                <a className="pp-ent-mail" href="mailto:sales@appsbuiltwithai.com">sales@appsbuiltwithai.com</a>
              </div>
            </div>
            <ul className="pp-ent-perks">{ENT_PERKS.map((x) => <li key={x}><span className="pp-ent-ic"><Check/></span>{x}</li>)}</ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============= full compare table ============= */
const Y = () => <span className="pp-yes" aria-label="Included"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>;
const N = () => <span className="pp-no" aria-label="Not included"></span>;

const COL_ORDER = ["free", "starter", "growth", "pro", "scale", "enterprise"];
const COL_LABEL = {
  free: "Free", starter: "Starter", growth: "Growth ★", pro: "Pro", scale: "Scale", enterprise: "Enterprise",
};
const COL_HREF = {
  free: "/signup?plan=free", starter: "/signup?plan=starter", growth: "/signup?plan=growth",
  pro: "/signup?plan=pro", scale: "/signup?plan=scale", enterprise: "mailto:sales@appsbuiltwithai.com",
};

const ROWS = [
  { section: "Plans and credits" },
  { feat: "Credits included", free: "50 to start", enterprise: "Pooled",
    ...Object.fromEntries(PAID.map((id) => [id, `${PLAN_OPTIONS[id].credits[0].credits.toLocaleString()}/mo`])) },
  { feat: "Credit steps in plan", free: <N/>, enterprise: "Custom",
    ...Object.fromEntries(PAID.map((id) => {
      const tiers = PLAN_OPTIONS[id].credits;
      return [id, `${tiers.length} steps, up to ${tiers[tiers.length - 1].credits.toLocaleString()}`];
    })) },
  { feat: "Credit rollover", free: <N/>, starter: "1 month", growth: "1 month", pro: "2 months", scale: "2 months", enterprise: "Custom" },
  { feat: "Automatic subscription renewal", free: <N/>, starter: <Y/>, growth: <Y/>, pro: <Y/>, scale: <Y/>, enterprise: "Custom" },

  { section: "Plan before you build" },
  { feat: "Planning agent", free: <Y/>, starter: <Y/>, growth: <Y/>, pro: <Y/>, scale: <Y/>, enterprise: <Y/> },
  { feat: "Data feasibility check", free: <Y/>, starter: <Y/>, growth: <Y/>, pro: <Y/>, scale: <Y/>, enterprise: <Y/> },
  { feat: "Regulated-use detection", free: <Y/>, starter: <Y/>, growth: <Y/>, pro: <Y/>, scale: <Y/>, enterprise: <Y/> },
  { feat: "Feature planning for ongoing work", free: <N/>, starter: <N/>, growth: <Y/>, pro: <Y/>, scale: <Y/>, enterprise: <Y/> },
  { feat: "Work board, backlog, epics", free: <N/>, starter: <N/>, growth: <Y/>, pro: <Y/>, scale: <Y/>, enterprise: <Y/> },

  { section: "Building" },
  { feat: "Chat to build and edit", free: <Y/>, starter: <Y/>, growth: <Y/>, pro: <Y/>, scale: <Y/>, enterprise: <Y/> },
  { feat: "In-app code edits", free: <Y/>, starter: <Y/>, growth: <Y/>, pro: <Y/>, scale: <Y/>, enterprise: <Y/> },
  { feat: "Build queue", free: "Standard", starter: "Standard", growth: "Priority", pro: "Priority", scale: "Top", enterprise: "Dedicated" },
  { feat: "Design systems and theming", free: <N/>, starter: <N/>, growth: <N/>, pro: <Y/>, scale: <Y/>, enterprise: <Y/> },
  { feat: "Knowledge base for your style", free: <N/>, starter: <N/>, growth: <N/>, pro: <Y/>, scale: <Y/>, enterprise: <Y/> },

  { section: "Shipping safely" },
  { feat: "Testing agent", free: <N/>, starter: <Y/>, growth: <Y/>, pro: <Y/>, scale: <Y/>, enterprise: <Y/> },
  { feat: "Security scan on publish", free: <N/>, starter: <Y/>, growth: <Y/>, pro: <Y/>, scale: <Y/>, enterprise: <Y/> },
  { feat: "Publish visibility controls", free: <N/>, starter: <Y/>, growth: <Y/>, pro: <Y/>, scale: <Y/>, enterprise: <Y/> },
  { feat: "Version history and rollback", free: <Y/>, starter: <Y/>, growth: <Y/>, pro: <Y/>, scale: <Y/>, enterprise: <Y/> },

  { section: "Publishing" },
  { feat: "Live apps", free: "3", starter: "Unlimited", growth: "Unlimited", pro: "Unlimited", scale: "Unlimited", enterprise: "Unlimited" },
  { feat: "AppsBuiltWithAI subdomain", free: <Y/>, starter: <Y/>, growth: <Y/>, pro: <Y/>, scale: <Y/>, enterprise: <Y/> },
  { feat: "Custom domain with SSL", free: <N/>, starter: <Y/>, growth: <Y/>, pro: <Y/>, scale: <Y/>, enterprise: <Y/> },
  { feat: "Remove the badge", free: <N/>, starter: <Y/>, growth: <Y/>, pro: <Y/>, scale: <Y/>, enterprise: <Y/> },

  { section: "Connectors" },
  { feat: "Stripe, Gmail, Drive", free: <Y/>, starter: <Y/>, growth: <Y/>, pro: <Y/>, scale: <Y/>, enterprise: <Y/> },
  { feat: "All standard connectors", free: <N/>, starter: <Y/>, growth: <Y/>, pro: <Y/>, scale: <Y/>, enterprise: <Y/> },
  { feat: "Private or custom connectors", free: <N/>, starter: <N/>, growth: <N/>, pro: <N/>, scale: <Y/>, enterprise: <Y/> },

  { section: "Your code" },
  { feat: "Export source", free: <N/>, starter: <Y/>, growth: <Y/>, pro: <Y/>, scale: <Y/>, enterprise: <Y/> },
  { feat: "GitHub sync", free: <N/>, starter: <Y/>, growth: <Y/>, pro: <Y/>, scale: <Y/>, enterprise: <Y/> },
  { feat: "Self-host or VPC", free: <N/>, starter: <N/>, growth: <N/>, pro: <N/>, scale: <N/>, enterprise: <Y/> },

  { section: "Teams" },
  { feat: "Workspace seats", free: "1", starter: "1", growth: "3", pro: "5", scale: "15", enterprise: "Unlimited" },
  { feat: "Roles and permissions", free: <N/>, starter: <N/>, growth: <N/>, pro: <Y/>, scale: <Y/>, enterprise: <Y/> },
  { feat: "Per-seat credit caps", free: <N/>, starter: <N/>, growth: <N/>, pro: <Y/>, scale: <Y/>, enterprise: <Y/> },
  { feat: "Multiple workspaces", free: <N/>, starter: <N/>, growth: <N/>, pro: "3", scale: "Unlimited", enterprise: "Unlimited" },

  { section: "Security and admin" },
  { feat: "Model-training opt-out by email", free: <Y/>, starter: <Y/>, growth: <Y/>, pro: <Y/>, scale: <Y/>, enterprise: <Y/> },
  { feat: "SSO, SAML, SCIM", free: <N/>, starter: <N/>, growth: <N/>, pro: <N/>, scale: <N/>, enterprise: <Y/> },
  { feat: "Custom DPA", free: <N/>, starter: <N/>, growth: <N/>, pro: <N/>, scale: <Y/>, enterprise: <Y/> },

  { section: "Support" },
  { feat: "Community", free: <Y/>, starter: <Y/>, growth: <Y/>, pro: <Y/>, scale: <Y/>, enterprise: <Y/> },
  { feat: "Human support", free: <N/>, starter: "Email", growth: "Priority chat", pro: "Priority chat", scale: "Priority", enterprise: "Dedicated" },
  { feat: "Early access to beta", free: <N/>, starter: <N/>, growth: <N/>, pro: <Y/>, scale: <Y/>, enterprise: <Y/> },
  { feat: "Onboarding session", free: <N/>, starter: <N/>, growth: <N/>, pro: <N/>, scale: <Y/>, enterprise: <Y/> },
  { feat: "Contractual SLA", free: <N/>, starter: <N/>, growth: <N/>, pro: <N/>, scale: <N/>, enterprise: <Y/> },
];

function ComparePrice({ id }) {
  const tier = PLAN_OPTIONS[id]?.credits[0];
  return (
    <span className="pp-th-p">
      {tier ? <>From ${tier.monthly}/mo billed monthly<br/>From ${tier.annual}/mo billed annually</>
        : id === "free" ? "$0" : "Custom"}
    </span>
  );
}

function FullCompare() {
  const [all, setAll] = usePrState(false);
  const cut = ROWS.findIndex((r, i) => r.section && ROWS.slice(0, i).filter((x) => x.section).length === 3);
  const shown = (all || cut < 0 ? ROWS : ROWS.slice(0, cut));
  return (
    <section className="pp-compare" data-screen-label="compare" id="compare">
      <div className="wrap">
        <Reveal className="pp-compare-head">
          <h2 className="serif">Side by side.</h2>
          <p>Everything each plan includes, in one table.</p>
        </Reveal>
        <Reveal>
          <div className="pp-table-wrap">
            <table className="pp-table">
              <thead>
                <tr>
                  <th className="pp-feat-h"><span className="sr-only">Feature</span></th>
                  {COL_ORDER.map((c) => (
                    <th key={c} className={c === "growth" ? "hl" : ""}>
                      <span className="pp-th">
                        {c === "growth" && <span className="pp-th-tag">Popular</span>}
                        <b>{COL_LABEL[c].replace(" ★", "")}</b>
                        <ComparePrice id={c}/>
                        <a className={"pp-th-btn" + (c === "growth" ? " on" : "")} href={COL_HREF[c]}>{c === "free" ? "Start free" : c === "enterprise" ? "Contact" : "Choose"}</a>
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              {(() => {
                const groups = []; shown.forEach((r) => { if (r.section) groups.push({ t: r.section, rows: [] }); else if (groups.length) groups[groups.length - 1].rows.push(r); });
                return groups.map((g) => (
                  <tbody key={g.t} className="pp-group">
                    <tr className="pp-sec"><td>{g.t}</td>{COL_ORDER.map((c) => <td key={c} className={c === "growth" ? "hl" : ""}></td>)}</tr>
                    {g.rows.map((r) => <tr key={r.feat}><td className="pp-feat">{r.feat}</td>{COL_ORDER.map((c) => <td key={c} className={c === "growth" ? "hl" : ""}>{typeof r[c] === "string" ? <span className="pp-val">{r[c]}</span> : r[c]}</td>)}</tr>)}
                  </tbody>
                ));
              })()}
            </table>
          </div>
          {cut > 0 && <button className="pp-more" onClick={() => setAll(!all)}>{all ? "Show fewer features" : "Show all features"} <span className={"pp-more-ic" + (all ? " up" : "")}><ArrowRight/></span></button>}
        </Reveal>
      </div>
    </section>
  );
}

/* ============= promises ============= */
function PriceGuarantee() {
  const items = [
    { t: "Cancel in Settings", s: "You can cancel anytime. Your paid plan stays active through the end of your billing period." },
    { t: "Credits roll over", s: "One month on Starter and Growth, two on Pro and Scale. Unused work is not lost." },
    { t: "Your code is yours", s: "Export the full source and sync to GitHub from Starter. No lock-in." },
    { t: "One-time credit packs", s: "On a paid plan, buy extra credits in Plan & credits." },
  ];
  return (
    <section className="pp-promise" data-screen-label="guarantee">
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="eyebrow">The fine print, in big print</div>
          <h2 className="serif">Four promises <em>you can hold us to.</em></h2>
        </Reveal>
        <div className="pp-promise-grid">
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i * 60}>
              <div className="pp-promise-item"><span className="pp-promise-ic"><Check/></span><b>{it.t}</b><p>{it.s}</p></div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingPage() {
  const [annual, setAnnual] = usePrState(true);
  return (
    <div className="pp-page">
      <PricingHero annual={annual} setAnnual={setAnnual}/>
      <PlanGrid annual={annual}/>
      <FullCompare/>
      <PriceGuarantee/>
      <FAQ extra={[
        { q: "Do unused credits roll over?", a: "Yes, on every paid plan. Unused credits carry over for one month on Starter and Growth, and two months on Pro and Scale. Free comes with 50 credits to start." },
        { q: "Can I request a model-training opt-out?", a: <>Yes. Email <a href="mailto:support@appsbuiltwithai.com">support@appsbuiltwithai.com</a> to request a model-training opt-out at no cost on any plan. See the <a href="/legal#ai-training">Privacy Policy</a> for details.</> },
        { q: "Can I publish to the App Store or Google Play?", a: "Not yet. Every app works on phones as a mobile-friendly web app people can add to their home screen. Native app store publishing is on the roadmap." },
        { q: "What happens if I run out of credits?", a: "Building pauses when you run out of credits. On a paid plan, buy more credits or wait for your next allowance. Your published apps stay live." },
      ]}/>
      <FinalCTA/>
    </div>
  );
}


export default PricingPage;
