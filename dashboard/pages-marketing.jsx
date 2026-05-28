/* global React, PoofD */
const { useState, Ic } = PoofD;

/* ============= MARKETING HUB — Tribe Finder · Ads Studio · Content Studio ============= */
function MarketingPage() {
  const [tab, setTab] = useState("tribe");

  return (
    <div className="page" data-screen-label={"marketing-" + tab}>
      <div className="page-head">
        <div>
          <span className="mkt-eyebrow">● {tab === "tribe" ? "Magic Reach" : tab === "ads" ? "Magic Ads" : "Magic Content"}</span>
          <h1 style={{ marginTop: 6 }}>
            {tab === "tribe" && <>Find your <em style={{ fontWeight: 400, fontStyle: "italic", color: "var(--ink-2)" }}>tribe.</em></>}
            {tab === "ads"   && <>Launch ads in minutes, not <em style={{ fontWeight: 400, fontStyle: "italic", color: "var(--ink-2)" }}>days.</em></>}
            {tab === "content" && <>Thumb-stopping content, on <em style={{ fontWeight: 400, fontStyle: "italic", color: "var(--ink-2)" }}>demand.</em></>}
          </h1>
          <div className="sub">
            {tab === "tribe"   && "Where 12M creator-curious people already hang out — ranked by fit for your app."}
            {tab === "ads"     && "Connect Meta, pick a budget, and we draft five ad variants from your brand in one click."}
            {tab === "content" && "Turn your product into 30 feed-ready posts and 15-second videos — made for the algorithm."}
          </div>
        </div>
        <div className="credits-pill">
          <span className="credits-ic">✦</span>
          <div>
            <div className="credits-label">CREDITS</div>
            <div className="credits-num">106.96 <a className="credits-buy">BUY MORE</a></div>
          </div>
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="mkt-tabs">
        <button className={"mkt-tab" + (tab === "tribe" ? " active" : "")} onClick={() => setTab("tribe")}>
          <span className="mkt-tab-ic" style={{ background: tab === "tribe" ? "var(--sun)" : "var(--sun-tint)", color: tab === "tribe" ? "var(--ink)" : "#9a7000" }}>⊙</span>
          Tribe Finder
        </button>
        <button className={"mkt-tab" + (tab === "ads" ? " active" : "")} onClick={() => setTab("ads")}>
          <span className="mkt-tab-ic" style={{ background: tab === "ads" ? "var(--sun)" : "var(--sun-tint)", color: tab === "ads" ? "var(--ink)" : "#9a7000" }}>◆</span>
          Ads Studio
        </button>
        <button className={"mkt-tab" + (tab === "content" ? " active" : "")} onClick={() => setTab("content")}>
          <span className="mkt-tab-ic" style={{ background: tab === "content" ? "var(--sun)" : "var(--sun-tint)", color: tab === "content" ? "var(--ink)" : "#9a7000" }}>▣</span>
          Content Studio
        </button>
      </div>

      {tab === "tribe"   && <TribeFinder/>}
      {tab === "ads"     && <AdsStudio/>}
      {tab === "content" && <ContentStudio/>}
    </div>
  );
}

/* ---------- TRIBE FINDER ---------- */
function TribeFinder() {
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState(1);
  const tribes = [
    { id: 0, platform: "REDDIT", name: "r/SmallBusiness",                              fit: "Strong", members: "2.4M members", active: "14k/day", color: "#FF4500", letter: "R" },
    { id: 1, platform: "DISCORD", name: "Indie Hackers — Mindful Founders channel",   fit: "Strong", members: "48,200 members", active: "2.1k/day", color: "#5865F2", letter: "IH",
      cultural: "Cultural match. This community explicitly frames building as inner work. Your teacher-builder voice lands naturally here — 11 creator-friends already active.",
      draft: "Sharing a framework that's held up through two launches and one divorce (not related, probably).\n\nI call it the 90/10: once a week, I spend 90 minutes doing only one thing — reading what the last 10 people I talked to said, looking for the question they didn't ask.\n\nEvery pivot I've ever made started in one of those sessions. Every time I've tried to \"just ship\" without one, I shipped the wrong thing.",
      chars: 432 },
    { id: 2, platform: "INSTAGRAM", name: "#foundermindset + #deepwork",               fit: "Good",   members: "8.2M posts", active: "40k/day", color: "linear-gradient(135deg,#F58529,#DD2A7B,#8134AF,#515BD4)", letter: "IG" },
    { id: 3, platform: "YOUTUBE", name: "Ali Abdaal / Matt D'Avella audience — comment intercept", fit: "Good", members: "~6M combined", active: "180k/day", color: "#FF0000", letter: "YT" },
    { id: 4, platform: "SUBSTACK", name: "Substack — the mindful productivity corner", fit: "Strong", members: "~240k readers", active: "weekly", color: "#FF6719", letter: "S" },
    { id: 5, platform: "TIKTOK", name: "#LeadershipTok / #FounderTok",                 fit: "Broad",  members: "1.1B views", active: "3M/day", color: "#000", letter: "TT" },
    { id: 6, platform: "X (TWITTER)", name: "X / \"Build in public\" + \"Founder mode\" circles", fit: "Strong", members: "~1.8M reach", active: "120k/day", color: "#000", letter: "X" },
    { id: 7, platform: "LINKEDIN", name: "LinkedIn — Founders Network + Mindful Leadership", fit: "Strong", members: "320k members", active: "8.4k/day", color: "#0A66C2", letter: "in" },
    { id: 8, platform: "SKOOL", name: "Skool — Mindful Founders + Course Creators Lab", fit: "Strong", members: "11,400 members", active: "1.6k/day", color: "#F9C300", letter: "Sk" },
    { id: 9, platform: "FACEBOOK GROUP", name: "Facebook — Coaches, Creators & Course-Builders", fit: "Good", members: "64,200 members", active: "4.2k/day", color: "#1877F2", letter: "f" },
    { id:10, platform: "PODCASTS", name: "Podcast — \"The Mindful Founder\" guest circuit", fit: "Strong", members: "24 shows", active: "weekly", color: "#9333EA", letter: "🎙" },
    { id:11, platform: "HACKER NEWS", name: "Hacker News — Show HN + adjacent founder threads", fit: "Good", members: "~5M monthly", active: "90k/day", color: "#FF6600", letter: "Y" },
    { id:12, platform: "THREADS", name: "Threads — early-creator clusters",            fit: "Broad",  members: "~140M users", active: "12M/day", color: "#000", letter: "@" },
  ];
  const filters = [
    { id: "All",       count: tribes.length },
    { id: "Strong",    count: tribes.filter(t => t.fit === "Strong").length },
    { id: "Good",      count: tribes.filter(t => t.fit === "Good").length },
    { id: "Broad",     count: tribes.filter(t => t.fit === "Broad").length },
  ];
  const visible = filter === "All" ? tribes : tribes.filter(t => t.fit === filter);
  const fitColor = (f) => f === "Strong" ? { bg: "var(--mint-tint)", color: "var(--mint)", label: "Strong fit" } : f === "Good" ? { bg: "var(--sun-tint)", color: "#9a7000", label: "Good fit" } : { bg: "var(--bg-2)", color: "var(--ink-3)", label: "Broad reach" };

  // pretend reach over 8 weeks
  const reach = [120, 180, 240, 310, 280, 420, 580, 740];
  const maxR = Math.max(...reach);
  const reachPath = reach.map((v, i) => `${(i / (reach.length - 1)) * 100},${100 - (v / maxR) * 90}`).join(" L ");

  return (
    <>
      <div className="mkt-overview">
        <div className="mkt-ov-card">
          <div className="mkt-ov-label">REACH · 8 WEEKS</div>
          <div className="mkt-ov-num">12,847 <span className="mkt-ov-delta">↑ 24%</span></div>
          <svg className="mkt-spark" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="mktReach" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--coral)" stopOpacity=".3"/>
                <stop offset="100%" stopColor="var(--coral)" stopOpacity="0"/>
              </linearGradient>
            </defs>
            <path d={`M ${reachPath} L 100,100 L 0,100 Z`} fill="url(#mktReach)"/>
            <path d={`M ${reachPath}`} fill="none" stroke="var(--coral)" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="mkt-ov-card">
          <div className="mkt-ov-label">NEW MEMBERS</div>
          <div className="mkt-ov-num">347 <span className="mkt-ov-delta">↑ 18%</span></div>
          <div className="mkt-bars">
            {[40, 65, 50, 80, 70, 95, 110, 130].map((h, i) => (
              <span key={i} className="mkt-bar" style={{ height: h + "%" }}></span>
            ))}
          </div>
        </div>
        <div className="mkt-ov-card">
          <div className="mkt-ov-label">TOP PLATFORM</div>
          <div className="mkt-ov-num" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span className="tribe-letter" style={{ background: "#5865F2", width: 32, height: 32, fontSize: 12 }}>IH</span>
            Indie Hackers
          </div>
          <div className="mkt-ov-sub">142 conversions · 38% of total</div>
        </div>
        <div className="mkt-ov-card">
          <div className="mkt-ov-label">ACTIVE DRAFTS</div>
          <div className="mkt-ov-num">8 <span className="mkt-ov-sub-inline">posts waiting</span></div>
          <div className="mkt-pill-row">
            {["DC","R","IG","X","IN"].map((p, i) => (
              <span key={i} className="mkt-mini-pill" style={{ background: ["#5865F2","#FF4500","#DD2A7B","#000","#0A66C2"][i] }}>{p}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="mkt-hero">
        <div className="mkt-hero-tag">● COMMUNITIES, RANKED BY FIT</div>
        <h2 className="mkt-hero-h">Where your next 1,000<br/>members <em style={{ fontStyle: "italic", color: "var(--sun)" }}>already hang out.</em></h2>
        <p className="mkt-hero-sub">We scan 4,200+ communities daily and surface the highest-leverage ones for your app — then draft a post that sounds like you for each. Re-runs every morning, or hit regenerate any time.</p>
        <div className="mkt-hero-match">
          <span className="mkt-match-label">MATCHING</span>
          <span>Soul-led leadership for first-time founders</span>
          <span className="mkt-match-edit">EDIT →</span>
        </div>
      </div>

      <div className="mkt-steps">
        <div className="mkt-step"><span className="mkt-step-n">1</span><div><div className="mkt-step-title">Match</div><div className="mkt-step-sub">{tribes.length} communities sized to your voice.</div></div></div>
        <span className="mkt-step-arrow">→</span>
        <div className="mkt-step"><span className="mkt-step-n">2</span><div><div className="mkt-step-title">Draft</div><div className="mkt-step-sub">A native post for each platform.</div></div></div>
        <span className="mkt-step-arrow">→</span>
        <div className="mkt-step"><span className="mkt-step-n">3</span><div><div className="mkt-step-title">Post</div><div className="mkt-step-sub">Copy, or schedule from here.</div></div></div>
      </div>

      <div className="mkt-filter-row">
        <div className="chips-row" style={{ flex: 1 }}>
          {filters.map(f => (
            <button key={f.id} className={"chip" + (filter === f.id ? " active" : "")} onClick={() => setFilter(f.id)}>
              {f.id === "Strong" ? "Strong fit" : f.id === "Good" ? "Good fit" : f.id === "Broad" ? "Broad reach" : "All"} <span className="count">{f.count}</span>
            </button>
          ))}
        </div>
        <span className="mkt-refresh">● REFRESHED TODAY · 6:14 AM</span>
        <button className="btn btn-outline btn-sm">↻ REGENERATE ALL</button>
      </div>

      <div className="tribe-list">
        {visible.map(t => {
          const fit = fitColor(t.fit);
          const open = expanded === t.id;
          return (
            <div key={t.id} className={"tribe-card" + (open ? " open" : "")}>
              <div className="tribe-head">
                <div className="tribe-letter" style={{ background: t.color, color: "#fff" }}>{t.letter}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="tribe-meta">
                    <span className="tribe-platform">{t.platform}</span>
                    <span className="tribe-fit" style={{ background: fit.bg, color: fit.color }}>● {fit.label}</span>
                    <span className="tribe-stat">{t.members}</span>
                    <span className="tribe-dot">·</span>
                    <span className="tribe-stat">{t.active} active</span>
                  </div>
                  <div className="tribe-name">{t.name}</div>
                  {open && t.cultural && <div className="tribe-cultural"><strong>Cultural match.</strong> {t.cultural.replace("Cultural match. ", "")}</div>}
                  {open && t.draft && (
                    <div className="tribe-draft">
                      <div className="tribe-draft-head">
                        <span>DRAFTED FOR {t.platform} · IN YOUR VOICE</span>
                        <span>{t.chars} CHARS &nbsp;&nbsp;<a className="tribe-draft-regen">↻ REGENERATE</a></span>
                      </div>
                      {t.draft.split("\n\n").map((p, i) => <p key={i}>{p}</p>)}
                      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                        <button className="btn btn-ink btn-sm">Copy &amp; open Discord →</button>
                        <button className="btn btn-outline btn-sm" onClick={() => setExpanded(-1)}>Collapse</button>
                      </div>
                    </div>
                  )}
                </div>
                {!open && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <button className="btn btn-ink btn-sm" onClick={() => setExpanded(t.id)}>Draft post →</button>
                    <button className="btn btn-ghost btn-sm">Why this fits</button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

/* ---------- ADS STUDIO ---------- */
function AdsStudio() {
  const campaigns = [
    { name: "Soul-led leadership — launch week",  status: "live",   goal: "LEADS",     letter: "S", color: "var(--plum)",   dates: "15 – 30 Apr", platforms: ["f", "♪"],     spent: 187, budget: 300, results: "82 sign-ups · $2.28" },
    { name: "90/10 framework · awareness",        status: "live",   goal: "AWARENESS", letter: "9", color: "var(--sun)",    dates: "08 – 22 Apr", platforms: ["f"],          spent: 96,  budget: 150, results: "24 sign-ups · $4.00" },
    { name: "Mother's Day — gift a membership",   status: "draft",  goal: "SALES",     letter: "♡", color: "var(--pink)",   dates: "01 – 10 May", platforms: ["f", "P"],     spent: 0,   budget: 0,   results: "—" },
    { name: "Burnout cohort — April retarget",    status: "paused", goal: "LEADS",     letter: "B", color: "var(--sky)",    dates: "01 – 14 Apr", platforms: ["f", "▶"],     spent: 220, budget: 220, results: "94 sign-ups · $2.34" },
    { name: "Q1 retro · case-study hero",         status: "ended",  goal: "LEADS",     letter: "Q", color: "var(--mint)",   dates: "01 – 31 Mar", platforms: ["f", "♪", "▶"], spent: 480, budget: 480, results: "147 sign-ups · $3.27" },
  ];
  const statusColor = (s) => s === "live" ? { bg: "var(--mint-tint)", color: "var(--mint)" } : s === "draft" ? { bg: "var(--sun-tint)", color: "#9a7000" } : s === "paused" ? { bg: "var(--coral-tint)", color: "var(--coral-deep)" } : { bg: "var(--bg-2)", color: "var(--ink-3)" };
  const platformColor = (p) => p === "f" ? "#1877F2" : p === "♪" ? "#000" : p === "P" ? "#E60023" : p === "▶" ? "#FF0000" : "var(--ink-2)";

  return (
    <>
      <div className="ads-summary">
        <div className="ads-stat">
          <span className="ads-stat-num">5</span>
          <span className="ads-stat-label">campaigns</span>
        </div>
        <span className="ads-stat-dot">·</span>
        <div className="ads-stat">
          <span className="ads-stat-num">$983</span>
          <span className="ads-stat-label">spent this month</span>
        </div>
        <span className="ads-stat-dot">·</span>
        <div className="ads-stat">
          <span className="ads-stat-num">347</span>
          <span className="ads-stat-label">new members</span>
        </div>
        <button className="btn btn-coral" style={{ marginLeft: "auto" }}>✦ New Campaign</button>
      </div>

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div className="ads-table-head">
          <div>CAMPAIGN</div>
          <div>PLATFORMS</div>
          <div>SCHEDULE</div>
          <div>AD SPEND</div>
          <div>RESULTS</div>
          <div></div>
        </div>
        {campaigns.map((c, i) => {
          const st = statusColor(c.status);
          return (
            <div key={i} className="ads-row">
              <div className="ads-camp">
                <div className="ads-letter" style={{ background: c.color, color: "#fff" }}>{c.letter}</div>
                <div style={{ minWidth: 0 }}>
                  <div className="ads-camp-name">{c.name}</div>
                  <div className="ads-camp-status">
                    <span className="ads-status-tag" style={{ background: st.bg, color: st.color }}>● {c.status.toUpperCase()}</span>
                    <span className="ads-goal">· {c.goal}</span>
                  </div>
                </div>
              </div>
              <div className="ads-platforms">
                {c.platforms.map((p, j) => (
                  <span key={j} className="ads-plat" style={{ background: platformColor(p) }}>{p}</span>
                ))}
              </div>
              <div>
                <div className="ads-dates">{c.dates}</div>
                <div className="ads-sub">{c.platforms.length} platforms</div>
              </div>
              <div>
                <div className="ads-spent"><strong>${c.spent}</strong> <span className="ads-budget">/ ${c.budget}</span></div>
                <div className="ads-sub">{c.status === "draft" ? "Not launched" : "Auto-optimized"}</div>
              </div>
              <div>
                <div className="ads-results">{c.results}</div>
                {c.spent > 0 && (
                  <div className="ads-bars">
                    {[1,2,3,4,5].map(k => (
                      <span key={k} className="ads-bar" style={{ height: 4 + k * 3, background: k > 3 ? "var(--mint)" : "var(--mint-tint)" }}></span>
                    ))}
                  </div>
                )}
              </div>
              <div style={{ textAlign: "right" }}>
                <button className="icon-btn"><Ic.Dots/></button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

/* ---------- CONTENT STUDIO ---------- */
function ContentStudio() {
  const [filter, setFilter] = useState("All");
  const assets = [
    { kind: "image", title: "Why this digital product saves your time",         sub: "Instant answer, ready to use in minutes.",      bg: "linear-gradient(135deg, #2a1a14, #6e2e1f 50%, #c46a3a)", icon: "◐" },
    { kind: "video", title: "Tutorial to Magic Content",                          sub: "15s walkthrough · ready to post.", duration: "0:15", bg: "linear-gradient(135deg, #3a2a14, #7d5a32 50%, #d6a85a)", icon: "👥" },
    { kind: "image", title: "Faster than ordering a pizza.",                     sub: "Pro photos, one hour flat.",                    bg: "linear-gradient(135deg, #102a3d, #1c4a73 50%, #6FA8E0)", icon: "📱" },
    { kind: "image", title: "Scent so good you can taste it.",                   sub: "(Please don't eat the candle.)",                bg: "linear-gradient(135deg, #2a1a14, #6e2e1f 50%, #c46a3a)", icon: "🍪" },
    { kind: "video", title: "One rep away.",                                      sub: "Shot on an iPhone, looks like film.", duration: "0:28", bg: "linear-gradient(135deg, #6e2e1f, #c46a3a 50%, #FF8466)", icon: "🏋" },
    { kind: "image", title: "Your first 100 members — this week.",               sub: "The checklist we give every creator.",          bg: "linear-gradient(135deg, #1F1A2E, #2A2435 50%, #3a3550)", icon: "100" },
    { kind: "video", title: "POV: you finally launched.",                         sub: "Stitch-ready hook for TikTok.", duration: "0:09", bg: "linear-gradient(135deg, #4C3A5C, #5d3a83 50%, #b78ec9)", icon: "✓" },
    { kind: "image", title: "No more algorithm roulette.",                        sub: "Build the audience you own.",                   bg: "linear-gradient(135deg, #0F3A33, #1FB295 50%, #7DCFB6)", icon: "⬡" },
  ];
  const visible = filter === "All" ? assets : assets.filter(a => a.kind === filter.toLowerCase().slice(0, -1));

  return (
    <>
      <div className="content-toolbar">
        <div className="chips-row">
          <button className={"chip" + (filter === "All" ? " active" : "")} onClick={() => setFilter("All")}>All</button>
          <button className={"chip" + (filter === "Images" ? " active" : "")} onClick={() => setFilter("Images")}>Images</button>
          <button className={"chip" + (filter === "Videos" ? " active" : "")} onClick={() => setFilter("Videos")}>Videos</button>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 4, background: "var(--bg-2)", borderRadius: 8, padding: 3 }}>
          <button className="icon-btn" style={{ background: "var(--surface)", color: "var(--ink)", boxShadow: "var(--sh-xs)", width: 32, height: 32 }}>▦</button>
          <button className="icon-btn" style={{ width: 32, height: 32 }}>≡</button>
        </div>
      </div>

      <button className="content-cta">
        <span className="content-cta-ic">+</span>
        Create a new asset
      </button>

      <div className="content-grid">
        {visible.map((a, i) => (
          <div key={i} className="content-card">
            <div className="content-thumb" style={{ background: a.bg }}>
              <span className={"content-tag " + a.kind}>● {a.kind.toUpperCase()}</span>
              <button className="content-menu"><Ic.Dots/></button>
              <div className="content-icon">{a.icon}</div>
              {a.duration && <span className="content-duration">{a.duration}</span>}
              <div className="content-overlay">
                <div className="content-title">{a.title}</div>
                <div className="content-sub">{a.sub}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

window.PoofD_Marketing = { MarketingPage };
