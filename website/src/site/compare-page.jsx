import React, { useState } from 'react';
import { Logo, Nav } from './part1.jsx';
import { Footer } from './part3.jsx';
/* The competitive matrix. Cells use "yes" | "partial" | "no" | text. */
const COMPETITORS = [
  { id: "us", name: "AppsBuiltWithAI", tag: "Plain English → real app", color: "var(--coral)" },
  { id: "lovable", name: "Lovable", tag: "Build apps by chatting", color: "#FF6FBA" },
  { id: "base44", name: "Base44", tag: "All-in-one app builder, owned by Wix", color: "#FF8A3D" },
  { id: "replit", name: "Replit", tag: "Code editor with an agent", color: "#F26207" },
  { id: "bolt", name: "Bolt", tag: "Prompt-to-app in the browser", color: "#4353FF" },
];

const ROWS = [
  { label: "Built for people selling their app", sub: "Payments, launch and growth in one place",
    cells: { us: "yes", lovable: "partial", base44: "partial", replit: "partial", bolt: "partial" } },
  { label: "Real working app (not a mockup)", sub: "Actual database, auth, payments",
    cells: { us: "yes", lovable: "yes", base44: "yes", replit: "yes", bolt: "partial" } },
  { label: "Edit by talking to it", sub: "Plain-English changes, applied live",
    cells: { us: "yes", lovable: "yes", base44: "yes", replit: "yes", bolt: "yes" } },
  { label: "No coding or design skill required",
    cells: { us: "yes", lovable: "partial", base44: "yes", replit: "no", bolt: "partial" } },
  { label: "A planning agent that plans out your project before you build",
    cells: { us: "yes", lovable: "partial", base44: "no", replit: "partial", bolt: "no" } },
  { label: "Hosting + SSL included",
    cells: { us: "yes", lovable: "yes", base44: "yes", replit: "yes", bolt: "yes" } },
  { label: "Stripe / payments wired",
    cells: { us: "yes", lovable: "partial", base44: "partial", replit: "partial", bolt: "partial" } },
  { label: "Export code & own it",
    cells: { us: "yes", lovable: "yes", base44: "partial", replit: "yes", bolt: "yes" } },
  { label: "QA agent click-tests every flow",
    cells: { us: "yes", lovable: "no", base44: "no", replit: "partial", bolt: "no" } },
  { label: "Marketing agent ships your launch",
    cells: { us: "yes", lovable: "no", base44: "no", replit: "no", bolt: "no" } },
  { label: "Hard spending cap on by default",
    cells: { us: "yes", lovable: "partial", base44: "partial", replit: "no", bolt: "partial" } },
  { label: "Unused credits roll over",
    cells: { us: "yes", lovable: "yes", base44: "no", replit: "partial", bolt: "yes" } },
  { label: "Starting price", sub: "First paid plan",
    cells: { us: "$19/mo", lovable: "$25/mo", base44: "$20/mo ($16 yearly)", replit: "$25/mo", bolt: "$25/mo" } },
];

function Cell({ value, isUs }) {
  if (value === "yes") return (
    <div className={"cmp-cell cmp-cell-yes" + (isUs ? " is-us" : "")}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
    </div>
  );
  if (value === "no") return (
    <div className={"cmp-cell cmp-cell-no" + (isUs ? " is-us" : "")}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="6" y1="18" x2="18" y2="6"/></svg>
    </div>
  );
  if (value === "partial") return (
    <div className={"cmp-cell cmp-cell-partial" + (isUs ? " is-us" : "")}>
      <span></span>
    </div>
  );
  return (
    <div className={"cmp-cell cmp-cell-text" + (isUs ? " is-us" : "")}>{value}</div>
  );
}

function ComparePage() {
  const [filter, setFilter] = useState("all"); // all | wins
  const visibleRows = filter === "wins"
    ? ROWS.filter((r) => r.cells.us === "yes" && COMPETITORS.some((c) => c.id !== "us" && r.cells[c.id] !== "yes"))
    : ROWS;

  return (
    <div className="cmp-root">
      <Nav/>

      <main className="cmp-main">
        <section className="cmp-hero wrap">
          <span className="cmp-eyebrow">
            <span className="cmp-eyebrow-dot"></span>
            Honest comparison
          </span>
          <h1 className="cmp-h1">
            Why ship with us?<br/>
            <em>Here are the receipts.</em>
          </h1>
          <p className="cmp-sub">
            We respect your time. Below is how we stack up against Lovable, Base44, Replit and Bolt, feature by feature. We
            mark <strong>partial</strong> and <strong>no</strong> on ourselves where it's honest.
          </p>
          <div className="cmp-filters">
            <button className={"cmp-pill" + (filter === "all" ? " is-on" : "")} onClick={() => setFilter("all")}>All features ({ROWS.length})</button>
            <button className={"cmp-pill" + (filter === "wins" ? " is-on" : "")} onClick={() => setFilter("wins")}>Where we win</button>
          </div>
        </section>

        <section className="cmp-table-wrap wrap">
          <div className="cmp-table" role="table">
            {/* header row */}
            <div className="cmp-row cmp-row-head" role="row">
              <div className="cmp-feature-head">Feature</div>
              {COMPETITORS.map((c) => (
                <div key={c.id} className={"cmp-col-head" + (c.id === "us" ? " is-us" : "")} style={{ "--accent": c.color }} role="columnheader">
                  <div className="cmp-col-name">{c.name}</div>
                  <div className="cmp-col-tag">{c.tag}</div>
                  {c.id === "us" && <div className="cmp-col-badge">You're here</div>}
                </div>
              ))}
            </div>

            {visibleRows.map((row, i) => (
              <div key={i} className="cmp-row" role="row">
                <div className="cmp-feature">
                  <div className="cmp-feature-label">{row.label}</div>
                  {row.sub && <div className="cmp-feature-sub">{row.sub}</div>}
                </div>
                {COMPETITORS.map((c) => (
                  <Cell key={c.id} value={row.cells[c.id]} isUs={c.id === "us"}/>
                ))}
              </div>
            ))}
          </div>

          <div className="cmp-legend">
            <span><span className="cmp-lg cmp-lg-yes"></span> Fully supported</span>
            <span><span className="cmp-lg cmp-lg-partial"></span> Partial</span>
            <span><span className="cmp-lg cmp-lg-no"></span> Not available</span>
          </div>
        </section>

        {/* Three "use case" stories */}
        <section className="cmp-cases wrap">
          <h2 className="cmp-h2">When each makes sense.</h2>
          <p className="cmp-h2-sub">We're not for everyone. Here's when to pick what.</p>
          <div className="cmp-cases-grid">
            <div className="cmp-case cmp-case-us">
              <div className="cmp-case-tag">Pick us when</div>
              <h3>You need a real, working app: fast.</h3>
              <p>Booking apps, client portals, SaaS products, storefronts, paid communities. You can describe what you want and want it live before tomorrow.</p>
              <a href="/signup" className="cmp-case-cta">Start free →</a>
            </div>
            <div className="cmp-case">
              <div className="cmp-case-tag">Pick Lovable when</div>
              <h3>You're prototyping interfaces.</h3>
              <p>Great for exploring UI ideas quickly. You'll wire up payments, testing and your launch yourself.</p>
            </div>
            <div className="cmp-case">
              <div className="cmp-case-tag">Pick Base44 when</div>
              <h3>You want an internal tool fast.</h3>
              <p>Quick to a working app with built-in data. Less focused on selling the app and growing its customers.</p>
            </div>
            <div className="cmp-case">
              <div className="cmp-case-tag">Pick Replit when</div>
              <h3>You're comfortable with code.</h3>
              <p>A full coding environment with an agent on top. Best if you want to read and edit the code yourself.</p>
            </div>
            <div className="cmp-case">
              <div className="cmp-case-tag">Pick Bolt when</div>
              <h3>You want a quick front end.</h3>
              <p>Fast prompt-to-app in the browser. Back end, payments and launch take more setup on your side.</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="cmp-faq wrap">
          <h2 className="cmp-h2">"But what about…"</h2>
          <div className="cmp-faq-grid">
            <details>
              <summary>Isn't this just Lovable with a different name?</summary>
              <p>No. Lovable is a great prototyping tool for UIs. We're a launchable-app platform: auth, payments, hosting, QA, and a marketing agent in one pass. We optimize for "ships to production" not "looks nice in a demo."</p>
            </details>
            <details>
              <summary>Can I migrate off later?</summary>
              <p>Yes. Export the source code anytime, host wherever. We don't keep your app hostage. (Most folks stay (we host on the same infrastructure as Vercel) but the door is open.)</p>
            </details>
            <details>
              <summary>What if I need something genuinely custom?</summary>
              <p>The AI handles ~95% of common product surfaces. For the 5% that's truly bespoke, the exported code is plain TypeScript + Next.js: any developer can pick up where we left off.</p>
            </details>
            <details>
              <summary>How is this different from no-code tools like Bubble?</summary>
              <p>Bubble is configuration via UI. You drag, you set, you debug visual flows. We're conversation: you describe, we build, you direct edits in plain English. The output is also normal code, not a proprietary runtime.</p>
            </details>
          </div>
        </section>

        {/* CTA */}
        <section className="cmp-final wrap">
          <h2>
            Want the receipts <em>for your idea?</em>
          </h2>
          <p>Start free. Describe your idea and see the first version built for you.</p>
          <a href="/signup" className="cmp-final-cta">Start free →</a>
        </section>
      </main>

      <Footer/>
    </div>
  );
}


export default ComparePage;
