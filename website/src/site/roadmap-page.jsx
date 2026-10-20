import React, { useState as useRMState, useMemo as useRMMemo } from 'react';
import { Reveal, ArrowRight, Check } from './part1.jsx';
/* ============= ROADMAP ============= */

const ROADMAP_ITEMS = [
  // Shipped (May 2026)
  { id: 1, title: "Plan mode with brief generator", desc: "Chat-based stepper that plans out your whole project before building.", status: "shipped", quarter: "Q2 '26", category: "AI builder", votes: 412 },
  { id: 2, title: "Custom domains with one-click SSL", desc: "Bring your own domain in 90 seconds. Let's Encrypt, auto-renewed.", status: "shipped", quarter: "Q2 '26", category: "Publishing", votes: 380 },
  { id: 3, title: "Edit-while-you-watch agent", desc: "Surgical edits to live builds without re-generating the whole app.", status: "shipped", quarter: "Q1 '26", category: "Editor", votes: 567 },
  { id: 4, title: "Shared workspaces", desc: "Invite teammates as Editor or Viewer. Per-app access controls.", status: "shipped", quarter: "Q1 '26", category: "Workspaces", votes: 298 },

  // In progress
  { id: 5, title: "Branching & build history", desc: "Fork any app to experiment. Compare versions side by side. Restore in one click.", status: "in-progress", quarter: "Q3 '26", category: "Editor", votes: 824, eta: "~3 weeks" },
  { id: 6, title: "Webhooks & outbound API", desc: "Fire events to anywhere when something happens in your app.", status: "in-progress", quarter: "Q3 '26", category: "Connectors", votes: 612, eta: "~4 weeks" },
  { id: 7, title: "Stripe Subscriptions", desc: "Recurring billing primitive for membership apps and SaaS-lite builds.", status: "shipped", quarter: "Q3 '26", category: "Connectors", votes: 1240 },
  { id: 8, title: "Speech-to-prompt", desc: "Talk to the builder instead of typing. Especially fast on mobile.", status: "shipped", quarter: "Q3 '26", category: "AI builder", votes: 478 },

  { id: 17, title: "AI agents", desc: "Agents that run tasks inside your app: answer customers, sort orders, send follow-ups.", status: "in-progress", quarter: "Q3 '26", category: "AI builder", votes: 936 },
  { id: 18, title: "Cloud services", desc: "Hosting, database, storage and file uploads managed for you, with usage in one place.", status: "in-progress", quarter: "Q3 '26", category: "Publishing", votes: 704 },

  // Planned
  { id: 9, title: "Mobile builder app", desc: "Build, edit, and ship from your phone. Native iOS first.", status: "planned", quarter: "Q4 '26", category: "Editor", votes: 1502 },
  { id: 10, title: "Postgres-backed apps", desc: "First-class Supabase integration: auth, storage, real Postgres.", status: "planned", quarter: "Q4 '26", category: "Connectors", votes: 891 },
  { id: 11, title: "Multi-page form flows", desc: "Wizards, branching logic, file uploads: without writing code.", status: "planned", quarter: "Q4 '26", category: "AI builder", votes: 705 },

  // Considering
  { id: 13, title: "Native mobile output", desc: "Export your app as a real iOS/Android build.", status: "planned", quarter: "2026", category: "Publishing", votes: 2103 },
  { id: 14, title: "AI design system", desc: "Lock your visual identity once: every app inherits it automatically.", status: "planned", quarter: "Q4 '26", category: "Editor", votes: 967 },
  { id: 15, title: "Team review & approvals", desc: "Request a teammate's review before publishing changes.", status: "considering", quarter: "2027", category: "Workspaces", votes: 421 },
];

const STATUS_META = {
  shipped:     { label: "Shipped", color: "mint", dot: "✓" },
  "in-progress": { label: "In progress", color: "coral", dot: "●" },
  planned:     { label: "Planned", color: "sky", dot: "○" },
  considering: { label: "Considering", color: "ink", dot: "?" },
};

function RoadmapPage() {
  const [filter, setFilter] = useRMState("all");
  const [category, setCategory] = useRMState("all");
  const [voted, setVoted] = useRMState(() => { try { return JSON.parse(localStorage.getItem("abwai-roadmap-likes") || "{}"); } catch (e) { return {}; } });

  const visible = useRMMemo(() => {
    return ROADMAP_ITEMS.filter(i => {
      if (filter !== "all" && i.status !== filter) return false;
      if (category !== "all" && i.category !== category) return false;
      return true;
    });
  }, [filter, category]);

  const counts = useRMMemo(() => {
    const out = { all: ROADMAP_ITEMS.length };
    for (const s of Object.keys(STATUS_META)) out[s] = ROADMAP_ITEMS.filter(i => i.status === s).length;
    return out;
  }, []);

  const categories = useRMMemo(() => Array.from(new Set(ROADMAP_ITEMS.map(i => i.category))), []);

  const toggleVote = (id) => setVoted(v => { const n = { ...v, [id]: !v[id] }; try { localStorage.setItem("abwai-roadmap-likes", JSON.stringify(n)); } catch (e) {} return n; });

  return (
    <>
      <section className="sub-hero" data-screen-label="roadmap-hero">
        <div className="wrap-tight">
          <Reveal>
            <div className="eyebrow">Roadmap</div>
            <h1 className="serif">What we're building, <em>in the open.</em></h1>
            <p className="sub-lead">
              Like what matters to you. The thing with the most likes
              usually gets built next, and we'll tell you why if it doesn't.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="sub-meta">
              <span>Updated weekly</span>
              <span className="dot"/>
              <span>Last update: Sep 30</span>
              <span className="dot"/>
              <span><a href="/changelog">See what shipped →</a></span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pad pt-0">
        <div className="wrap">
          {/* Status filter pills */}
          <Reveal>
            <div className="rm-filter-row">
              <div className="rm-status-row">
                <button className={"rm-pill " + (filter === "all" ? "active" : "")} onClick={() => setFilter("all")}>
                  <span>All</span> <span className="count">{counts.all}</span>
                </button>
                {Object.entries(STATUS_META).map(([k, m]) => (
                  <button
                    key={k}
                    className={"rm-pill tone-" + m.color + (filter === k ? " active" : "")}
                    onClick={() => setFilter(k)}
                  >
                    <span className="rm-pill-dot">{m.dot}</span>
                    <span>{m.label}</span>
                    <span className="count">{counts[k]}</span>
                  </button>
                ))}
              </div>

              <div className="rm-cat-row">
                <span className="rm-cat-label">Filter:</span>
                <select className="rm-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="all">All categories</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </Reveal>

          {/* Kanban-ish grid grouped by status */}
          <div className="rm-grid">
            {visible.map((item, i) => {
              const meta = STATUS_META[item.status];
              const isVoted = voted[item.id];
              return (
                <Reveal key={item.id} delay={Math.min(i, 6) * 40}>
                  <div className={"rm-card tone-" + meta.color}>
                    <div className="rm-card-head">
                      <span className={"rm-status-pill tone-" + meta.color}>
                        <span className="dot">{meta.dot}</span> {meta.label}
                      </span>
                      <span className="rm-quarter">{item.quarter}</span>
                    </div>
                    <h3 className="rm-card-title">{item.title}</h3>
                    <p className="rm-card-desc">{item.desc}</p>
                    {item.eta && (
                      <div className="rm-eta">⏱ ETA {item.eta}</div>
                    )}
                    <div className="rm-card-foot">
                      <button
                        className={"rm-like" + (isVoted ? " liked" : "")}
                        onClick={() => toggleVote(item.id)}
                        aria-pressed={!!isVoted}
                        aria-label={(isVoted ? "Unlike " : "Like ") + item.title}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill={isVoted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/></svg>
                        <span className="count">{(item.votes + (isVoted ? 1 : 0)).toLocaleString()}</span>
                        <span className="rm-like-lab">{isVoted ? "Liked" : "Like"}</span>
                      </button>
                      <span className="rm-cat">{item.category}</span>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {visible.length === 0 && (
            <div className="rm-empty">
              <div>Nothing matches that filter yet.</div>
              <button className="btn btn-outline" onClick={() => { setFilter("all"); setCategory("all"); }}>Clear filters</button>
            </div>
          )}
        </div>
      </section>

      <section className="pad rm-suggest">
        <div className="wrap-tight" style={{ textAlign: "center" }}>
          <Reveal>
            <div className="eyebrow">Don't see it?</div>
            <h2 className="serif">Tell us what we're <em>missing.</em></h2>
            <p style={{ fontSize: 17, color: "var(--ink-2)", maxWidth: "52ch", margin: "16px auto 32px" }}>
              We read every suggestion. The good ones get added to this page: sometimes with your name in the credit when they ship.
            </p>
            <div style={{ display: "inline-flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
              <a className="btn btn-coral btn-lg" href="/signup">Suggest an idea <ArrowRight/></a>
              <a className="btn btn-outline btn-lg" href="/changelog">See what shipped</a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}


export default RoadmapPage;
