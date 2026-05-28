/* global React, PoofPart1 */
const { Reveal, ArrowRight, Check } = window.PoofPart1;
const { useState: useRMState, useMemo: useRMMemo } = React;

/* ============= ROADMAP ============= */

const ROADMAP_ITEMS = [
  // Shipped (May 2026)
  { id: 1,  title: "Plan mode with brief generator",      desc: "Chat-based stepper that drafts a full PRD before building.",     status: "shipped",   quarter: "Q2 '26", category: "AI builder",   votes: 412, comments: 38 },
  { id: 2,  title: "Custom domains with one-click SSL",   desc: "Bring your own domain in 90 seconds. Let's Encrypt, auto-renewed.", status: "shipped",   quarter: "Q2 '26", category: "Publishing",   votes: 380, comments: 24 },
  { id: 3,  title: "Edit-while-you-watch agent",          desc: "Surgical edits to live builds without re-generating the whole app.", status: "shipped", quarter: "Q1 '26", category: "Editor",       votes: 567, comments: 92 },
  { id: 4,  title: "Shared workspaces",                   desc: "Invite teammates as Editor or Viewer. Per-app access controls.",  status: "shipped",   quarter: "Q1 '26", category: "Workspaces",   votes: 298, comments: 41 },

  // In progress
  { id: 5,  title: "Branching & build history",           desc: "Fork any app to experiment. Compare versions side by side. Restore in one click.", status: "in-progress", quarter: "Q3 '26", category: "Editor",     votes: 824, comments: 156, eta: "~3 weeks" },
  { id: 6,  title: "Webhooks & outbound API",             desc: "Fire events to anywhere when something happens in your app.",     status: "in-progress", quarter: "Q3 '26", category: "Connectors",   votes: 612, comments: 88,  eta: "~4 weeks" },
  { id: 7,  title: "Stripe Subscriptions",                desc: "Recurring billing primitive for membership apps and SaaS-lite builds.", status: "in-progress", quarter: "Q3 '26", category: "Connectors", votes: 1240, comments: 211, eta: "~6 weeks" },
  { id: 8,  title: "Speech-to-prompt",                    desc: "Talk to the builder instead of typing. Especially fast on mobile.", status: "in-progress", quarter: "Q3 '26", category: "AI builder", votes: 478, comments: 64,  eta: "~5 weeks" },

  // Planned
  { id: 9,  title: "Mobile builder app",                  desc: "Build, edit, and ship from your phone. Native iOS first.",        status: "planned",   quarter: "Q4 '26", category: "Editor",       votes: 1502, comments: 287 },
  { id: 10, title: "Postgres-backed apps",                desc: "First-class Supabase integration — auth, storage, real Postgres.", status: "planned",   quarter: "Q4 '26", category: "Connectors",   votes: 891, comments: 122 },
  { id: 11, title: "Multi-page form flows",               desc: "Wizards, branching logic, file uploads — without writing code.",  status: "planned",   quarter: "Q4 '26", category: "AI builder",   votes: 705, comments: 98 },
  { id: 12, title: "A/B testing built in",                desc: "Test two versions of any page or copy without leaving the app.", status: "planned",     quarter: "Q4 '26", category: "Publishing",   votes: 533, comments: 71 },

  // Considering
  { id: 13, title: "Native mobile output",                desc: "Export your app as a real iOS/Android build.",                    status: "considering", quarter: "2027", category: "Publishing",  votes: 2103, comments: 412 },
  { id: 14, title: "AI design system",                    desc: "Lock your visual identity once — every app inherits it automatically.", status: "considering", quarter: "2027", category: "Editor", votes: 967, comments: 154 },
  { id: 15, title: "Team review & approvals",             desc: "Request a teammate's review before publishing changes.",          status: "considering", quarter: "2027", category: "Workspaces",  votes: 421, comments: 58 },
  { id: 16, title: "Self-hosted enterprise",              desc: "Run the whole stack inside your own VPC.",                        status: "considering", quarter: "2027", category: "Workspaces",  votes: 312, comments: 47 },
];

const STATUS_META = {
  shipped:     { label: "Shipped",     color: "mint",  dot: "✓" },
  "in-progress": { label: "In progress", color: "coral", dot: "●" },
  planned:     { label: "Planned",     color: "sky",   dot: "○" },
  considering: { label: "Considering", color: "ink",   dot: "?" },
};

function RoadmapPage() {
  const [filter, setFilter] = useRMState("all");
  const [category, setCategory] = useRMState("all");
  const [voted, setVoted] = useRMState({});

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

  const toggleVote = (id) => setVoted(v => ({ ...v, [id]: !v[id] }));

  return (
    <>
      <section className="sub-hero" data-screen-label="roadmap-hero">
        <div className="wrap-tight">
          <Reveal>
            <div className="eyebrow">Roadmap</div>
            <h1 className="serif">What we're building, <em>in the open.</em></h1>
            <p className="sub-lead">
              Vote on what matters to you. The thing with the most votes
              usually gets built next — and we'll tell you why if it doesn't.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="sub-meta">
              <span>Updated weekly</span>
              <span className="dot"/>
              <span>Last update: May 24</span>
              <span className="dot"/>
              <span><a href="changelog.html">See what shipped →</a></span>
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
                        className={"rm-vote" + (isVoted ? " voted" : "")}
                        onClick={() => toggleVote(item.id)}
                        disabled={item.status === "shipped"}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m18 15-6-6-6 6"/>
                        </svg>
                        <span className="count">{item.votes + (isVoted ? 1 : 0)}</span>
                      </button>
                      <span className="rm-cat">{item.category}</span>
                      <span className="rm-comments">💬 {item.comments}</span>
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
              We read every suggestion. The good ones get added to this page
              — sometimes with your name in the credit when they ship.
            </p>
            <div style={{ display: "inline-flex", gap: 10 }}>
              <a className="btn btn-coral btn-lg" href="signup.html">Suggest an idea <ArrowRight/></a>
              <a className="btn btn-outline btn-lg" href="changelog.html">See what shipped</a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

window.RoadmapPage = RoadmapPage;
