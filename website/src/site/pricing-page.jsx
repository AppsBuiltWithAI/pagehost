import React, { useState as usePrState } from 'react';
import { Reveal, ArrowRight, Check } from './part1.jsx';
import { FAQ, FinalCTA } from './part3.jsx';
/* PRICING, standalone page. Source of truth: dashboard Settings, Plan and credits. */

/* Prices and ladders mirror server/config/plans.js exactly (KAN-466). The
   opening step is the headline price; every step above keeps that price per
   credit, up to the plan's ceiling. Credits get cheaper from plan to plan,
   19 cents on Starter down to about 14 on Scale. */
const PLAN_OPTIONS = {
  starter: {
    name: "Starter",
    blurb: "Your first real product",
    perks: [
      "Unlimited live apps",
      "Custom domain with SSL, no badge",
      "Security scan on publish",
      "GitHub sync and code export",
      "Credits roll over 1 month",
      "Email support",
    ],
    credits: [
      { credits: 100, monthly: 19, annual: 15 },
      { credits: 200, monthly: 38, annual: 30 },
      { credits: 400, monthly: 76, annual: 61 },
      { credits: 800, monthly: 152, annual: 122 },
      { credits: 1200, monthly: 223, annual: 178, save: 2 },
      { credits: 2000, monthly: 365, annual: 292, save: 4 },
      { credits: 3000, monthly: 536, annual: 429, save: 6 },
      { credits: 4000, monthly: 699, annual: 559, save: 8 },
      { credits: 5000, monthly: 855, annual: 684, save: 10 },
      { credits: 7500, monthly: 1283, annual: 1026, save: 10 },
      { credits: 10000, monthly: 1710, annual: 1368, save: 10 },
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
      "Testing agent on acceptance criteria",
      "Priority build queue",
      "Priority chat support",
    ],
    credits: [
      { credits: 250, monthly: 49, annual: 39 },
      { credits: 500, monthly: 98, annual: 78 },
      { credits: 1000, monthly: 196, annual: 157 },
      { credits: 2000, monthly: 392, annual: 314 },
      { credits: 3000, monthly: 576, annual: 461, save: 2 },
      { credits: 5000, monthly: 941, annual: 753, save: 4 },
      { credits: 7500, monthly: 1382, annual: 1106, save: 6 },
      { credits: 10000, monthly: 1803, annual: 1442, save: 8 },
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
      "Business hosting option",
    ],
    credits: [
      { credits: 500, monthly: 99, annual: 79 },
      { credits: 1000, monthly: 198, annual: 158 },
      { credits: 2000, monthly: 396, annual: 317 },
      { credits: 4000, monthly: 792, annual: 634 },
      { credits: 6000, monthly: 1164, annual: 931, save: 2 },
      { credits: 10000, monthly: 1901, annual: 1521, save: 4 },
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
      "Business hosting included",
      "Priority support",
    ],
    credits: [
      { credits: 1000, monthly: 199, annual: 159 },
      { credits: 2000, monthly: 398, annual: 318 },
      { credits: 4000, monthly: 796, annual: 637 },
      { credits: 8000, monthly: 1592, annual: 1274 },
      { credits: 10000, monthly: 1950, annual: 1560, save: 2 },
    ],
  },
};

const ROLLOVER = { starter: "1 month", growth: "1 month", pro: "2 months", scale: "2 months" };

const PAID = ["starter", "growth", "pro", "scale"];
const FREE_PERKS = ["Planning agent to plan out your project", "Data feasibility check", "1 live app on appsbuiltwithai.com", "Auth, database and analytics", "Community support"];
const ENT_PERKS = ["Unlimited seats, pooled credits", "SSO, SAML and SCIM", "Custom DPA", "Self-host or VPC option", "24/7 support, 99.99% SLA", "Dedicated account team"];

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
          <p className="pp-lead">Pick your plan, then pick your credits. Volume moves on a dropdown inside the plan, so growing never means a new contract. Credits roll over, and the hard spending cap is on by default.</p>
        </Reveal>
        <Reveal delay={100}>
          <div className="pp-hero-row">
            <BillingToggle annual={annual} setAnnual={setAnnual}/>
            <div className="pp-meta"><span>No card to start</span><span>Cancel in two clicks</span><span>Never auto-charged</span></div>
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
        <div className="pp-billed">{annual ? "Billed annually" : "Billed monthly"}</div>
        <label className="pp-sel">
          <span className="pp-sel-l">Credits per month</span>
          <select value={ti} onChange={(e) => setTi(parseInt(e.target.value, 10))} aria-label={o.name + " credits per month"}>
            {o.credits.map((c, i) => <option key={i} value={i}>{c.credits.toLocaleString()} credits{c.save ? " · save " + c.save + "%" : ""}</option>)}
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
              <div className="pp-sel pp-sel-static"><span className="pp-sel-l">Credits per month</span><b>50 <small>+100 bonus in month one</small></b></div>
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
  { feat: "Credits included", free: "50 + 100 bonus", starter: "100", growth: "250", pro: "500", scale: "1,000", enterprise: "Pooled" },
  { feat: "Credit steps in plan", free: <N/>, starter: "11 steps, up to 10,000", growth: "8 steps, up to 10,000", pro: "6 steps, up to 10,000", scale: "5 steps, up to 10,000", enterprise: "Custom" },
  { feat: "Credit rollover", free: <N/>, starter: "1 month", growth: "1 month", pro: "2 months", scale: "2 months", enterprise: "Custom" },
  { feat: "Hard spending cap", free: <Y/>, starter: <Y/>, growth: <Y/>, pro: <Y/>, scale: <Y/>, enterprise: "Custom" },
  { feat: "Never auto-charged", free: <Y/>, starter: <Y/>, growth: <Y/>, pro: <Y/>, scale: <Y/>, enterprise: <Y/> },

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
  { feat: "Testing agent", free: <N/>, starter: <N/>, growth: <Y/>, pro: <Y/>, scale: <Y/>, enterprise: <Y/> },
  { feat: "Security scan on publish", free: <N/>, starter: <Y/>, growth: <Y/>, pro: <Y/>, scale: <Y/>, enterprise: <Y/> },
  { feat: "Publish visibility controls", free: <N/>, starter: <Y/>, growth: <Y/>, pro: <Y/>, scale: <Y/>, enterprise: <Y/> },
  { feat: "Version history and rollback", free: <Y/>, starter: <Y/>, growth: <Y/>, pro: <Y/>, scale: <Y/>, enterprise: <Y/> },

  { section: "Publishing" },
  { feat: "Live apps", free: "1", starter: "Unlimited", growth: "Unlimited", pro: "Unlimited", scale: "Unlimited", enterprise: "Unlimited" },
  { feat: "appsbuiltwithai.com subdomain", free: <Y/>, starter: <Y/>, growth: <Y/>, pro: <Y/>, scale: <Y/>, enterprise: <Y/> },
  { feat: "Custom domain with SSL", free: <N/>, starter: <Y/>, growth: <Y/>, pro: <Y/>, scale: <Y/>, enterprise: <Y/> },
  { feat: "Remove the badge", free: <N/>, starter: <Y/>, growth: <Y/>, pro: <Y/>, scale: <Y/>, enterprise: <Y/> },
  { feat: "Hosting", free: "Standard", starter: "Standard", growth: "Pro", pro: "Business", scale: "Business", enterprise: "99.99% SLA" },

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
  { feat: "Data opt-out, no AI training", free: <N/>, starter: <N/>, growth: <N/>, pro: <Y/>, scale: <Y/>, enterprise: <Y/> },
  { feat: "SSO, SAML, SCIM", free: <N/>, starter: <N/>, growth: <N/>, pro: <N/>, scale: <N/>, enterprise: <Y/> },
  { feat: "Custom DPA", free: <N/>, starter: <N/>, growth: <N/>, pro: <N/>, scale: <Y/>, enterprise: <Y/> },

  { section: "Support" },
  { feat: "Community", free: <Y/>, starter: <Y/>, growth: <Y/>, pro: <Y/>, scale: <Y/>, enterprise: <Y/> },
  { feat: "Human support", free: <N/>, starter: "Email", growth: "Priority chat", pro: "Priority chat", scale: "Priority", enterprise: "Dedicated" },
  { feat: "Early access to beta", free: <N/>, starter: <N/>, growth: <N/>, pro: <Y/>, scale: <Y/>, enterprise: <Y/> },
  { feat: "Onboarding session", free: <N/>, starter: <N/>, growth: <N/>, pro: <N/>, scale: <Y/>, enterprise: <Y/> },
  { feat: "24/7 with SLA", free: <N/>, starter: <N/>, growth: <N/>, pro: <N/>, scale: <N/>, enterprise: <Y/> },
];

const COL_PRICE = { free: "$0", starter: "From $19", growth: "From $49", pro: "From $99", scale: "From $199", enterprise: "Custom" };

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
                        <span className="pp-th-p">{COL_PRICE[c]}</span>
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
    { t: "Spending cap by default", s: "On for every paid plan, and we never auto-charge. Adjust or disable it in Settings." },
    { t: "Credits roll over", s: "One month on Starter and Growth, two on Pro and Scale. Unused work is not lost." },
    { t: "Your code is yours", s: "Export the full source and sync to GitHub from Starter. No lock-in." },
    { t: "Price-locked forever", s: "If we raise prices, your rate stays the same. Period." },
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
        { q: "Do unused credits roll over?", a: "Yes, on every paid plan. Unused credits carry over for one month on Starter and Growth, and two months on Pro and Scale. Free plan credits reset each month." },
        { q: "Can I publish to the App Store or Google Play?", a: "Not yet. Every app works on phones as a mobile-friendly web app people can add to their home screen. Native app store publishing is on the roadmap." },
        { q: "What happens if I run out of credits?", a: "Building pauses until your credits refresh or you add more. Your published apps stay live, and your customers can keep using them. Spending caps are on by default, so you're never charged by surprise." },
      ]}/>
      <FinalCTA/>
    </div>
  );
}


export default PricingPage;
