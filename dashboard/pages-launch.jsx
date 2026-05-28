/* global React, PoofD */
const { useState, useEffect, Ic } = PoofD;

/* ============= LAUNCH — Readiness score + Soft launch + Co-pilot ============= */
function LaunchPage() {
  const [softLaunch, setSoftLaunch] = useState(true);
  const [launchDate, setLaunchDate] = useState("2026-05-31");
  const [waitlistOn, setWaitlistOn] = useState(true);

  // Readiness checks
  const [checks, setChecks] = useState([
    { id: "domain",     group: "Polish",    name: "Custom domain connected",                weight: 8,  status: "pass",  hint: "crumbandco.com · verified" },
    { id: "ssl",        group: "Polish",    name: "HTTPS / SSL active",                     weight: 6,  status: "pass",  hint: "Auto-renewed" },
    { id: "mobile",     group: "Polish",    name: "Mobile-friendly across 3 viewports",     weight: 10, status: "pass",  hint: "iPhone, iPad, Galaxy tested" },
    { id: "copy",       group: "Polish",    name: "No placeholder copy left",               weight: 6,  status: "warn",  hint: "2 \"Lorem ipsum\" strings on About page", action: "Auto-fix" },
    { id: "links",      group: "Polish",    name: "No broken links",                        weight: 6,  status: "pass",  hint: "12/12 links resolve" },
    { id: "favicon",    group: "Polish",    name: "Favicon &amp; share image",                  weight: 4,  status: "pass",  hint: "Generated from your logo" },

    { id: "a11y",       group: "Quality",   name: "Accessibility — color contrast, tap size", weight: 8, status: "warn",  hint: "1 button below 44×44 on mobile", action: "Auto-fix" },
    { id: "speed",      group: "Quality",   name: "Loads under 2 seconds",                  weight: 8,  status: "pass",  hint: "1.4s on 4G" },
    { id: "errors",     group: "Quality",   name: "Zero JS errors in last 24h",             weight: 6,  status: "pass",  hint: "Watcher confirms" },
    { id: "review",     group: "Quality",   name: "AI \"first impression\" review",            weight: 4, status: "pass",  hint: "3 personas reviewed · avg 4.2 / 5" },

    { id: "payments",   group: "Business",  name: "Test order placed end-to-end",           weight: 10, status: "pass",  hint: "Order #4218 · receipt issued" },
    { id: "email",      group: "Business",  name: "Confirmation email arrives",             weight: 6,  status: "pass",  hint: "Delivered in 1.2s" },
    { id: "legal",      group: "Business",  name: "Privacy + Terms pages exist",            weight: 4,  status: "fail",  hint: "Required if you collect emails", action: "Generate" },
    { id: "analytics",  group: "Business",  name: "Visitor analytics turned on",            weight: 4,  status: "pass",  hint: "Tracking since May 14" },

    { id: "audience",   group: "Audience",  name: "Waitlist or contact list connected",     weight: 6,  status: "pass",  hint: "47 emails on waitlist" },
    { id: "draft",      group: "Audience",  name: "Launch announcement drafted",            weight: 4,  status: "warn",  hint: "Email + Instagram drafts ready · review them" },
  ]);

  const total  = checks.reduce((s, c) => s + c.weight, 0);
  const earned = checks.reduce((s, c) => s + (c.status === "pass" ? c.weight : c.status === "warn" ? c.weight * 0.5 : 0), 0);
  const score  = Math.round((earned / total) * 100);
  const passCount = checks.filter(c => c.status === "pass").length;
  const warnCount = checks.filter(c => c.status === "warn").length;
  const failCount = checks.filter(c => c.status === "fail").length;

  const groups = ["Polish", "Quality", "Business", "Audience"];
  const fixOne = (id) => setChecks(checks.map(c => c.id === id ? { ...c, status: "pass", hint: c.hint + " · fixed by AI" } : c));
  const fixAll = () => setChecks(checks.map(c => c.status !== "pass" ? { ...c, status: "pass", hint: c.hint + " · fixed by AI" } : c));

  // countdown
  const daysOut = Math.max(0, Math.ceil((new Date(launchDate) - new Date()) / (1000 * 60 * 60 * 24)));
  const scoreColor = score >= 90 ? "var(--mint)" : score >= 70 ? "var(--sun)" : "var(--coral)";
  const scoreLabel = score >= 90 ? "Ready to launch" : score >= 70 ? "Almost there" : "Needs work";

  return (
    <div className="page" data-screen-label="launch">
      <div className="page-head">
        <div>
          <h1>Launch it. For real this time.</h1>
          <div className="sub">90% of apps never go live. AppsBuiltWithAI's Launch agent grades you, drafts the announcement, and walks you through the day.</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-outline btn-sm">Download checklist</button>
          <button className="btn btn-coral" disabled={score < 70}>
            {score >= 90 ? "🚀 Go live now" : score >= 70 ? "Soft-launch first" : `Fix ${warnCount + failCount} items`}
          </button>
        </div>
      </div>

      {/* HERO — score ring + countdown */}
      <div className="launch-hero">
        <div className="score-card">
          <ScoreRing value={score} color={scoreColor}/>
          <div>
            <div className="kicker">Launch readiness</div>
            <div className="score-label" style={{ color: scoreColor }}>{scoreLabel}</div>
            <div className="score-detail">
              <span style={{ color: "var(--mint)" }}>● {passCount} passing</span>
              <span style={{ color: "var(--sun)" }}>● {warnCount} needs attention</span>
              {failCount > 0 && <span style={{ color: "var(--coral)" }}>● {failCount} blocking</span>}
            </div>
            <p style={{ margin: "12px 0 0", fontSize: 13.5, color: "var(--ink-2)", maxWidth: "44ch" }}>
              You're more polished than 73% of apps at launch. The blocking items below are mostly one-tap fixes.
            </p>
            <button className="btn btn-ink btn-sm" style={{ marginTop: 14 }} onClick={fixAll}><Ic.Spark/> Fix everything with AI</button>
          </div>
        </div>

        <div className="countdown-card">
          <div className="kicker">Launch day</div>
          <div className="countdown-num">{daysOut}<small>d</small></div>
          <div style={{ fontSize: 13, color: "var(--ink-2)" }}>Locked in for <strong style={{ color: "var(--ink)" }}>Sunday, May 31</strong></div>
          <input className="field" type="date" value={launchDate} onChange={(e) => setLaunchDate(e.target.value)} style={{ marginTop: 12 }}/>
          <div className="countdown-streak">
            <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: ".1em", color: "var(--ink-3)" }}>🔥 7-day streak</span>
            <div className="streak-row">
              {Array.from({ length: 7 }).map((_, i) => <span key={i} className={"streak-dot" + (i < 7 ? " on" : "")}></span>)}
            </div>
          </div>
        </div>
      </div>

      {/* SOFT LAUNCH controls */}
      <div className="launch-mode">
        <div style={{ display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" }}>
          <div className={"mode-toggle" + (softLaunch ? " soft" : " public")}>
            <button className={softLaunch ? "active" : ""} onClick={() => setSoftLaunch(true)}>🔒 Soft launch</button>
            <button className={!softLaunch ? "active" : ""} onClick={() => setSoftLaunch(false)}>🌐 Public</button>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 14, letterSpacing: "-0.01em" }}>
              {softLaunch ? "Friends-only with a password" : "Anyone with the URL can visit"}
            </div>
            <div style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 2, fontFamily: "var(--f-mono)" }}>
              {softLaunch ? "crumb.appsbuilt.ai · password: croissant24 · 4 friends invited" : "crumbandco.com · indexed by search engines"}
            </div>
          </div>
          {softLaunch && <button className="btn btn-outline btn-sm"><Ic.Users/> Invite testers</button>}
          {softLaunch && <button className="btn btn-coral btn-sm">🌐 Open the doors</button>}
        </div>
      </div>

      <div className="launch-grid">
        {/* CHECKLIST */}
        <div className="card-lg" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", padding: "18px 22px", borderBottom: "1px solid var(--line-2)" }}>
            <h3 style={{ margin: 0, fontWeight: 700, fontSize: 16 }}>Launch checklist</h3>
            <span style={{ marginLeft: 10, fontFamily: "var(--f-mono)", fontSize: 11.5, color: "var(--ink-3)" }}>{passCount}/{checks.length}</span>
            <button className="btn btn-ghost btn-sm" style={{ marginLeft: "auto" }}><Ic.Spark/> Re-scan</button>
          </div>
          <div>
            {groups.map(g => (
              <div key={g}>
                <div className="check-group-head">{g}</div>
                {checks.filter(c => c.group === g).map(c => (
                  <div key={c.id} className={"check-row " + c.status}>
                    <div className={"check-status " + c.status}>
                      {c.status === "pass" ? "✓" : c.status === "warn" ? "!" : "×"}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="check-name" dangerouslySetInnerHTML={{__html: c.name}}></div>
                      <div className="check-hint">{c.hint}</div>
                    </div>
                    {c.status !== "pass" && (
                      <button className="btn btn-coral btn-sm" onClick={() => fixOne(c.id)}>
                        <Ic.Spark/> {c.action || "Fix"}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* CO-PILOT side */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <CoPilotCard daysOut={daysOut}/>
          <WaitlistCard count={47} on={waitlistOn} setOn={setWaitlistOn}/>
          <PressKitCard/>
        </div>
      </div>
    </div>
  );
}

/* ---------- Ring ---------- */
function ScoreRing({ value, color }) {
  const R = 60, C = 2 * Math.PI * R;
  const off = C - (value / 100) * C;
  return (
    <svg width="160" height="160" viewBox="0 0 160 160" style={{ flexShrink: 0 }}>
      <circle cx="80" cy="80" r={R} fill="none" stroke="var(--bg-2)" strokeWidth="14"/>
      <circle cx="80" cy="80" r={R} fill="none" stroke={color} strokeWidth="14" strokeLinecap="round"
              strokeDasharray={C} strokeDashoffset={off}
              transform="rotate(-90 80 80)"
              style={{ transition: "stroke-dashoffset .8s cubic-bezier(.2,.8,.2,1), stroke .4s" }}/>
      <text x="80" y="78" textAnchor="middle" fontFamily="var(--f-sans)" fontWeight="700" fontSize="40" letterSpacing="-0.03em" fill="var(--ink)">{value}</text>
      <text x="80" y="100" textAnchor="middle" fontFamily="var(--f-mono)" fontSize="10" letterSpacing="0.14em" fill="var(--ink-3)">/ 100</text>
    </svg>
  );
}

/* ---------- Co-pilot ---------- */
function CoPilotCard({ daysOut }) {
  const today = [
    { done: true,  text: "DNS verified for crumbandco.com" },
    { done: true,  text: "Test order placed end-to-end" },
    { done: false, text: "Post launch announcement to Instagram (draft ready)" },
    { done: false, text: "Email your 47 waitlisters (draft ready)" },
    { done: false, text: "Text Sarah and Theo to share with their networks" },
  ];
  return (
    <div className="card-lg" style={{ padding: 0, overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px 20px", borderBottom: "1px solid var(--line-2)" }}>
        <span style={{ width: 32, height: 32, borderRadius: 9, background: "var(--ink)", color: "var(--sun)", display: "grid", placeItems: "center", fontWeight: 700 }}>P</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 14 }}>Launch co-pilot</div>
          <div style={{ fontSize: 12, color: "var(--ink-3)" }}>{daysOut === 0 ? "Today's the day." : daysOut === 1 ? "Tomorrow." : `${daysOut} days out · daily check-ins on`}</div>
        </div>
        <div className="ai-badge"><Ic.Spark/> AI</div>
      </div>
      <div style={{ padding: "14px 20px 18px" }}>
        <div style={{ fontFamily: "var(--f-mono)", fontSize: 10.5, letterSpacing: ".12em", color: "var(--ink-3)", marginBottom: 8 }}>TODAY · {today.filter(t => t.done).length}/{today.length}</div>
        {today.map((t, i) => (
          <div key={i} className="copilot-row">
            <div className={"check-status " + (t.done ? "pass" : "pending")}>{t.done ? "✓" : ""}</div>
            <span style={{ flex: 1, fontSize: 13, color: t.done ? "var(--ink-3)" : "var(--ink)", textDecoration: t.done ? "line-through" : "none" }}>{t.text}</span>
            {!t.done && <button className="btn btn-ghost btn-sm">View draft →</button>}
          </div>
        ))}
        <div style={{ marginTop: 14, padding: "12px 14px", background: "var(--bg-2)", borderRadius: 10, fontSize: 13, color: "var(--ink-2)" }}>
          <strong>Co-pilot says:</strong> "Your IG post is ready — it leads with the croissant photo. Want me to schedule it for 8am when your followers are most active?"
        </div>
      </div>
    </div>
  );
}

/* ---------- Waitlist ---------- */
function WaitlistCard({ count, on, setOn }) {
  return (
    <div className="card-lg" style={{ padding: "20px 22px" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h3 style={{ margin: 0, fontWeight: 700, fontSize: 15 }}>Pre-launch waitlist</h3>
        <div className={"toggle" + (on ? " on" : "")} style={{ marginLeft: "auto" }} onClick={() => setOn(!on)}></div>
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 12 }}>
        <span style={{ fontWeight: 700, fontSize: 36, letterSpacing: "-0.025em" }}>{count}</span>
        <span style={{ fontSize: 13, color: "var(--ink-3)" }}>signed up · +12 this week</span>
      </div>
      <div style={{ marginTop: 12, display: "flex", gap: -8, alignItems: "center" }}>
        {["JA","MK","SR","LK","TP"].map((n, i) => (
          <span key={n} style={{ width: 28, height: 28, borderRadius: "50%", background: ["var(--coral)","var(--sun)","var(--mint)","var(--sky)","var(--pink)"][i], color: "#fff", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 11, marginLeft: i === 0 ? 0 : -8, border: "2px solid var(--surface)" }}>{n}</span>
        ))}
        <span style={{ marginLeft: 8, fontSize: 12, color: "var(--ink-3)", fontFamily: "var(--f-mono)" }}>+42 more</span>
      </div>
      <button className="btn btn-outline btn-sm" style={{ marginTop: 14, width: "100%", justifyContent: "center" }}>📧 Notify on launch day</button>
    </div>
  );
}

/* ---------- Press kit ---------- */
function PressKitCard() {
  return (
    <div className="card-lg" style={{ padding: "20px 22px" }}>
      <h3 style={{ margin: 0, fontWeight: 700, fontSize: 15 }}>AI press kit</h3>
      <p style={{ margin: "4px 0 14px", fontSize: 13, color: "var(--ink-3)" }}>One-click drafts in your voice.</p>
      <div className="presskit-grid">
        {[
          { name: "Instagram post", ic: "📷", status: "Ready" },
          { name: "X / Twitter",    ic: "✦", status: "Ready" },
          { name: "Launch email",   ic: "✉",  status: "Ready" },
          { name: "Product Hunt",   ic: "🚀", status: "Draft" },
        ].map((p) => (
          <button key={p.name} className="presskit-tile">
            <span style={{ fontSize: 20 }}>{p.ic}</span>
            <div style={{ flex: 1, textAlign: "left" }}>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{p.name}</div>
              <div style={{ fontSize: 11.5, color: "var(--ink-3)", marginTop: 2 }}>{p.status}</div>
            </div>
            <Ic.ArrowR/>
          </button>
        ))}
      </div>
    </div>
  );
}

window.PoofD_Launch = { LaunchPage };
