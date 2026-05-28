/* global React, PoofD, PoofD_Invites */
const { useState, useMemo, Ic, APPS, ACTIVITY } = PoofD;
const { PENDING_INVITES, InvitesStrip, InviteReviewModal } = PoofD_Invites;

/* ============= HOME — App list + activity sidebar ============= */
function HomePage({ setPage, setActiveApp }) {
  const [q, setQ] = useState("");
  const [banner, setBanner] = useState(true);

  const [view, setView] = useState("Mine"); // primary tab: All / Mine / Shared with me
  const [status, setStatus] = useState("Any"); // Any / Live / Drafts
  const [cat, setCat] = useState("All"); // category dropdown
  const [sort, setSort] = useState("recent"); // recent / name / visitors

  // Incoming share invites — local state so accept/decline can mutate
  const [invites, setInvites] = useState(PENDING_INVITES);
  const [dismissed, setDismissed] = useState([]);
  const [reviewing, setReviewing] = useState(null);

  const acceptInvite = (inv) => {
    setInvites((arr) => arr.filter((i) => i.id !== inv.id));
    setReviewing(null);
    setView("Shared with me");
  };
  const declineInvite = (id) => {
    setDismissed((arr) => [...arr, id]);
  };

  const filtered = useMemo(() => {
    let list = APPS.slice();
    // View
    if (view === "Mine") list = list.filter(a => !a.sharedBy);
    else if (view === "Shared with me") list = list.filter(a => !!a.sharedBy);
    // Status
    if (status === "Live") list = list.filter(a => a.status === "live");
    else if (status === "Drafts") list = list.filter(a => a.status === "draft");
    // Category — only applies to your own apps
    if (cat !== "All") list = list.filter(a => !a.sharedBy && a.cat === cat);
    // Search
    if (q) list = list.filter(a => a.name.toLowerCase().includes(q.toLowerCase()));
    // Sort
    if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === "visitors") list.sort((a, b) => (b.visitors || 0) - (a.visitors || 0));
    // recent: leave APPS in source order which is approximately recency
    return list;
  }, [view, status, cat, q, sort]);

  const counts = {
    All: APPS.length,
    Mine: APPS.filter(a => !a.sharedBy).length,
    "Shared with me": APPS.filter(a => a.sharedBy).length,
  };
  const statusCounts = {
    Live: APPS.filter(a => a.status === "live" && (view === "All" || (view === "Mine" ? !a.sharedBy : !!a.sharedBy))).length,
    Drafts: APPS.filter(a => a.status === "draft" && (view === "All" || (view === "Mine" ? !a.sharedBy : !!a.sharedBy))).length,
  };
  const categories = ["All", "Business", "Personal", "Forms", "Stores"];

  const stats = [
    { label: "Live apps",        value: APPS.filter(a => a.status === "live").length, delta: "+1 this week", up: true, ic: <Ic.Globe/>, spark: [10, 12, 11, 14, 13, 16, 18] },
    { label: "Visitors · 7d",    value: "3,284",   delta: "+18% vs. last week",  up: true, ic: <Ic.Eye/>,   spark: [22, 28, 26, 34, 32, 44, 52] },
    { label: "Conversions · 7d", value: 142,       delta: "+24%",                up: true, ic: <Ic.Spark/>, spark: [12, 18, 16, 20, 24, 28, 32] },
    { label: "AI edits this mo.",value: "428",     delta: "428 / 1,000",         up: null, ic: <Ic.Code/>,  spark: [8, 14, 18, 22, 30, 34, 38] },
  ];

  return (
    <div className="page" data-screen-label="home">
      <div className="page-head">
        <div>
          <h1>Welcome back, Mei.</h1>
          <div className="sub">You have {APPS.filter(a => a.status === "live").length} apps live and {ACTIVITY.length} updates since yesterday. Crumb &amp; Co. had its best week yet.</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-outline" onClick={() => setPage("templates")}><Ic.Templates/> Templates</button>
          <button className="btn btn-coral" onClick={() => setPage("editor")}><Ic.Plus/> New app</button>
        </div>
      </div>

      {banner && (
        <div className="banner">
          <div className="banner-icon"><Ic.Spark/></div>
          <div className="banner-body">
            <strong>You're 2 apps away from a Team plan.</strong>
            <p>Unlimited collaborators and shared workspaces start at $59/mo.</p>
          </div>
          <button className="btn btn-ink btn-sm">See Team</button>
          <button className="banner-close" onClick={() => setBanner(false)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>
      )}

      <InvitesStrip
        invites={invites}
        dismissed={dismissed}
        onReview={(inv) => setReviewing(inv)}
        onDecline={declineInvite}
      />

      {reviewing && (
        <InviteReviewModal
          invite={reviewing}
          onAccept={acceptInvite}
          onDecline={declineInvite}
          onClose={() => setReviewing(null)}
        />
      )}

      <div className="home-stats">
        {stats.map((s) => (
          <div key={s.label} className="home-stat">
            <div className="hs-label">
              <span className="hs-ic">{s.ic}</span>
              {s.label}
            </div>
            <div className="hs-value">{s.value}</div>
            {s.delta && (
              <div className={"hs-delta " + (s.up ? "up" : s.up === false ? "down" : "")}>
                {s.up === true && <Ic.Up/>}
                {s.up === false && <Ic.Down/>}
                {s.delta}
              </div>
            )}
            <svg className="hs-spark" width="80" height="28" viewBox="0 0 80 28" preserveAspectRatio="none">
              <polyline
                fill="none"
                stroke="var(--coral)"
                strokeWidth="1.5"
                strokeLinejoin="round"
                strokeLinecap="round"
                points={s.spark.map((v, i) => (i * (80 / (s.spark.length - 1))) + "," + (28 - (v / Math.max(...s.spark)) * 24)).join(" ")}
              />
            </svg>
          </div>
        ))}
      </div>

      <div className="split-grid" style={{ gridTemplateColumns: "1fr 320px", gap: 28 }}>
        <div>
          {/* === Toolbar: primary view tabs + secondary filters === */}
          <div className="apps-toolbar">
            <div className="apps-toolbar-row apps-toolbar-row-primary">
              <h2 className="apps-toolbar-title">Your apps</h2>
              <div className="apps-tabs" role="tablist" aria-label="App view">
                {["All", "Mine", "Shared with me"].map((t) => (
                  <button
                    key={t}
                    role="tab"
                    aria-selected={view === t}
                    className={"apps-tab" + (view === t ? " active" : "")}
                    onClick={() => setView(t)}
                  >
                    {t === "Shared with me" && (
                      <span className="apps-tab-ic"><Ic.Share/></span>
                    )}
                    <span>{t}</span>
                    <span className="apps-tab-count">{counts[t]}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="apps-toolbar-row apps-toolbar-row-secondary">
              <div className="apps-search">
                <Ic.Search/>
                <input
                  placeholder="Search apps…"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                />
              </div>

              <div className="apps-filter-group">
                <span className="apps-filter-label">Status</span>
                <div className="apps-pill-group">
                  {["Any", "Live", "Drafts"].map((s) => (
                    <button
                      key={s}
                      className={"apps-pill" + (status === s ? " active" : "")}
                      onClick={() => setStatus(s)}
                    >
                      {s === "Live" && <span className="apps-pill-dot live"/>}
                      {s === "Drafts" && <span className="apps-pill-dot draft"/>}
                      {s}
                      {s !== "Any" && <span className="apps-pill-count">{statusCounts[s] || 0}</span>}
                    </button>
                  ))}
                </div>
              </div>

              <div className="apps-filter-group">
                <span className="apps-filter-label">Category</span>
                <select
                  className="apps-select"
                  value={cat}
                  onChange={(e) => setCat(e.target.value)}
                  disabled={view === "Shared with me"}
                  title={view === "Shared with me" ? "Categories apply to your own apps" : ""}
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="apps-filter-group">
                <span className="apps-filter-label">Sort by</span>
                <select
                  className="apps-select"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="recent">Recently edited</option>
                  <option value="name">Name (A–Z)</option>
                  <option value="visitors">Most visitors</option>
                </select>
              </div>

              <div className="apps-result-count">
                {filtered.length} app{filtered.length === 1 ? "" : "s"}
              </div>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="empty">
              <div className="empty-icon"><Ic.Search/></div>
              <h3>No apps match "{q || view}"</h3>
              <p>Try a different filter — or build a new one from scratch.</p>
            </div>
          ) : (
            <div className="apps-grid">
              {filtered.map((a) => (
                <div key={a.id} className={"app-card" + (a.sharedBy ? " is-shared" : "")} onClick={() => { setActiveApp(a); setPage("editor"); }}>
                  <div className={"app-thumb " + a.thumb}>
                    <span className={"app-status " + a.status}>
                      <span className="pulse"></span>
                      {a.status}
                    </span>
                    {a.sharedBy && (
                      <span className="app-shared-pill" title={"Shared by " + a.sharedBy.name + " · " + a.sharedBy.role + " access"}>
                        <span className={"app-shared-av tint-" + a.sharedBy.color}>{a.sharedBy.initials}</span>
                        <span>Shared · {a.sharedBy.role}</span>
                      </span>
                    )}
                    <button className="app-menu-btn" onClick={(e) => e.stopPropagation()}><Ic.Dots/></button>
                  </div>
                  <div className="app-body">
                    <h3 className="app-name">
                      <span className="app-emoji">{a.emoji}</span>
                      {a.name}
                    </h3>
                    <div className="app-url">
                      <Ic.Globe/>
                      {a.url}
                    </div>
                    <div className="app-dates">
                      <span><strong>Created</strong> {a.createdAt}</span>
                      <span className="dot"/>
                      <span><strong>Edited</strong> {a.editedAt}</span>
                    </div>
                    <div className="app-meta">
                      {a.sharedBy ? (
                        <>
                          <span><Ic.Share/> by {a.sharedBy.name}</span>
                          <span><Ic.Clock/> {a.edited}</span>
                        </>
                      ) : (
                        <>
                          <span><Ic.Eye/> {a.visitors.toLocaleString()} visitors</span>
                          <span><Ic.Clock/> {a.edited}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <div className="app-card new-app" onClick={() => setPage("editor")}>
                <div className="inner">
                  <div className="plus"><Ic.Plus/></div>
                  <h3>Start a new app</h3>
                  <p>Describe it in plain English</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <ActivityFeed/>
      </div>
    </div>
  );
}

/* ============= ACTIVITY FEED widget ============= */
function ActivityFeed() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, margin: 0, letterSpacing: "-0.01em" }}>Recent activity</h3>
        <a style={{ fontSize: 12.5, color: "var(--ink-3)", cursor: "pointer" }}>View all</a>
      </div>
      <div className="card" style={{ padding: "4px 18px" }}>
        <div className="activity">
          {ACTIVITY.map((a, i) => {
            const Icon = a.kind === "publish" ? <Ic.Globe/> : a.kind === "edit" ? <Ic.Code/> : a.kind === "invite" ? <Ic.Users/> : <Ic.Spark/>;
            return (
              <div key={i} className="activity-item">
                <div className={"activity-dot " + a.kind}>{Icon}</div>
                <div className="activity-body">
                  <div className="activity-text" dangerouslySetInnerHTML={{ __html: a.text }}></div>
                  <div className="activity-time">{a.time}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

window.PoofD_Pages1 = { HomePage, ActivityFeed };
