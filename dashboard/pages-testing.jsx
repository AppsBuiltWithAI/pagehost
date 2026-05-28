/* global React, PoofD */
const { useState, useEffect, Ic } = PoofD;

/* ============= TESTING AGENT ============= */
function TestingPage({ initialTab }) {
  const apps = [
    { id: "crumb",   name: "Crumb & Co.",   emoji: "🥐", url: "crumb.appsbuilt.ai",       passed: 18, failed: 2, total: 22, last: "12m ago",  health: 86,  uptime: 99.94 },
    { id: "yoga",    name: "Stillpoint",    emoji: "🧘", url: "stillpoint.appsbuilt.ai", passed: 14, failed: 0, total: 14, last: "2h ago",   health: 100, uptime: 100.00 },
    { id: "invoice", name: "Invoice Stack", emoji: "🧾", url: "invoices.appsbuilt.ai",   passed: 9,  failed: 1, total: 10, last: "yesterday",health: 90,  uptime: 99.87 },
    { id: "shop",    name: "Garage Sale",   emoji: "🛒", url: "garagesale.appsbuilt.ai", passed: 11, failed: 0, total: 11, last: "yesterday",health: 100, uptime: 99.98 },
  ];
  const [selected, setSelected] = useState("crumb");
  const [tab, setTab] = useState(initialTab || "tests");
  const app = apps.find(a => a.id === selected);

  const tests = [
    { name: "Homepage loads under 2s",                      status: "pass",  ms: 740,  ai: "Auto-generated · accessibility" },
    { name: "Pickup time chip selectable",                  status: "pass",  ms: 120,  ai: "AI agent · simulates click" },
    { name: "Adding item updates subtotal",                 status: "pass",  ms: 312,  ai: "AI agent · math validation" },
    { name: "Place pickup order → confirmation page shown", status: "pass",  ms: 1450, ai: "AI agent · end-to-end" },
    { name: "Confirmation email is sent",                   status: "pass",  ms: 2200, ai: "Webhook check" },
    { name: "Form rejects invalid email",                   status: "pass",  ms: 180,  ai: "AI agent · edge cases" },
    { name: "Mobile menu fully tappable (Safari iOS)",      status: "fail",  ms: 1820, ai: "Visual diff",         err: "Tap target on \"Place order\" measures 38×38 — below 44×44 minimum." },
    { name: "Out-of-stock items hidden from menu",          status: "pass",  ms: 410,  ai: "AI agent · state check" },
    { name: "Past pickup slots are auto-disabled",          status: "fail",  ms: 240,  ai: "AI agent · time logic", err: "Slot at 8:30 still bookable at 9:15am — clock drift." },
    { name: "Browser back from confirmation works",         status: "pass",  ms: 95,   ai: "AI agent · routing" },
  ];

  const scenarios = [
    {
      name: "First-time customer places a pickup order",
      tag: "Critical journey",
      runs: 1284, success: 99.4, lastMs: 14200,
      steps: [
        "Visits crumb.appsbuilt.ai from Instagram bio",
        "Skims menu, scrolls past 3 items",
        "Selects 9:00am pickup",
        "Adds 2 almond croissants + 1 sourdough",
        "Enters name + phone number",
        "Submits order",
        "Sees confirmation page + SMS arrives",
      ],
    },
    {
      name: "Returning customer reorders yesterday's order",
      tag: "Power-user path",
      runs: 412, success: 100, lastMs: 6800,
      steps: [
        "Visits crumb.appsbuilt.ai",
        "Clicks 'Order again'",
        "Confirms cart preloaded with last 3 items",
        "Picks new pickup time",
        "Submits, gets SMS",
      ],
    },
    {
      name: "Owner marks an item out-of-stock at 10am",
      tag: "Operator path",
      runs: 86, success: 98.8, lastMs: 4200,
      steps: [
        "Mei opens crumb.appsbuilt.ai/admin on iPad",
        "Taps 'sold out' on the almond croissant",
        "Customer in another tab refreshes — item is gone",
        "Existing carts get gentle notice",
      ],
    },
    {
      name: "Customer abandons cart, returns 2 hours later",
      tag: "Recovery path",
      runs: 218, success: 96.3, lastMs: 8400,
      steps: [
        "Adds items, leaves",
        "Returns from email link",
        "Cart still intact, pickup time may need updating",
        "Completes checkout",
      ],
    },
  ];

  // 7×24 uptime grid (mostly green, a few amber, one red)
  const uptimeGrid = React.useMemo(() => {
    return Array.from({ length: 7 }).map((_, d) =>
      Array.from({ length: 24 }).map((_, h) => {
        const r = Math.random();
        if (d === 4 && h === 14) return "down";
        if (r > 0.96) return "slow";
        return "up";
      })
    );
  }, []);

  // Schedule grid — which jobs run when
  const schedule = [
    { kind: "smoke",   icon: <Ic.Activity/>, slots: [7] },
    { kind: "e2e",     icon: <Ic.Spark/>,    slots: [2, 14] },
    { kind: "visual",  icon: <Ic.Image/>,    slots: [3] },
    { kind: "ping",    icon: <Ic.Globe/>,    slots: Array.from({ length: 24 }).map((_, i) => i) },
  ];

  // Live agent feed
  const liveFeed = [
    { agent: "Tester",  text: "Crumb & Co. · clicked \"Add to order\" on Almond croissant",                          time: "now" },
    { agent: "Tester",  text: "Crumb & Co. · selected pickup slot 9:30am, confirmed availability",                   time: "2s" },
    { agent: "Tester",  text: "Crumb & Co. · entered test phone (+1 555-0142), submitted order #4218",               time: "4s" },
    { agent: "Tester",  text: "Crumb & Co. · received SMS in 1.2s · ✓",                                              time: "6s" },
    { agent: "Watcher", text: "Stillpoint · responded 740ms · ✓",                                                    time: "11s" },
    { agent: "Tester",  text: "Garage Sale · simulated 'View item' → 'Buy now' → checkout · ✓",                      time: "22s" },
    { agent: "Watcher", text: "Invoice Stack · responded 1,420ms · ⚠ slow",                                          time: "1m" },
    { agent: "Tester",  text: "Crumb & Co. · visual diff vs last week · ✓ no regression",                            time: "1m" },
  ];

  const incidents = [
    { app: "Invoice Stack", what: "Latency spike", detail: "p95 jumped to 2.4s for 8 minutes",        when: "Today · 6:42am", status: "resolved",   sev: 2 },
    { app: "Crumb & Co.",   what: "Tap target too small", detail: "\"Place order\" 38×38 on Safari iOS", when: "Today · 4:12am", status: "open",       sev: 3 },
    { app: "Crumb & Co.",   what: "Clock drift",          detail: "Past pickup slots still bookable",     when: "Today · 4:12am", status: "open",       sev: 3 },
    { app: "Stillpoint",    what: "Downtime",             detail: "Returned 503 for 4 minutes",           when: "Thu · 2:18pm",   status: "resolved",   sev: 3 },
  ];

  const channels = [
    { name: "Slack",    target: "#crumb-alerts",            on: true },
    { name: "Email",    target: "mei@crumbandco.com",       on: true },
    { name: "SMS",      target: "+1 (555) 014-2189",        on: true },
    { name: "Webhook",  target: "https://hooks.crumb…/poof", on: false },
    { name: "PagerDuty",target: "On-call: Mei",              on: false },
  ];

  const [running, setRunning] = useState(false);
  const [progressIdx, setProgressIdx] = useState(-1);

  const runAll = () => {
    setRunning(true);
    setProgressIdx(0);
  };
  useEffect(() => {
    if (!running) return;
    if (progressIdx >= tests.length) {
      setRunning(false);
      setProgressIdx(-1);
      return;
    }
    const t = setTimeout(() => setProgressIdx((i) => i + 1), 600);
    return () => clearTimeout(t);
  }, [running, progressIdx, tests.length]);

  return (
    <div className="page" data-screen-label="testing">
      <div className="page-head">
        <div>
          <h1>Testing agent.</h1>
          <div className="sub">AppsBuiltWithAI's AI tester runs your app end-to-end on a schedule, watches uptime in real time, and pings you the moment something breaks.</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-outline btn-sm"><Ic.Activity/> Live feed</button>
          <button className="btn btn-coral" onClick={runAll} disabled={running}>
            {running ? <>Running… {progressIdx}/{tests.length}</> : <><Ic.Spark/> Run all tests</>}
          </button>
        </div>
      </div>

      <div className="agent-banner">
        <div className="agent-bot">
          <span style={{ width: 44, height: 44, borderRadius: 12, background: "var(--ink)", color: "var(--sun)", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 18 }}>P</span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: "-0.01em" }}>AppsBuiltWithAI Tester &amp; Watcher · running 24/7</div>
          <div style={{ fontSize: 13, color: "var(--ink-2)", marginTop: 4 }}>
            {running ? (
              <span>Currently running <strong>{tests[Math.min(progressIdx, tests.length - 1)]?.name}</strong> on {app.name}…</span>
            ) : (
              <span>2 open incidents · 214 tests in last 24h · 99.94% uptime this month · <a style={{ color: "var(--coral)", textDecoration: "underline", cursor: "pointer" }}>view report</a></span>
            )}
          </div>
        </div>
        <div className="ai-badge"><Ic.Spark/> AI-automated</div>
      </div>

      <div className="kpis" style={{ marginTop: 24, marginBottom: 24 }}>
        <div className="kpi">
          <div className="kpi-label">Uptime · 30d</div>
          <div className="kpi-value" style={{ color: "var(--mint)" }}>99.94%</div>
          <div className="kpi-delta up"><Ic.Up/> 26m total downtime</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Tests last 24h</div>
          <div className="kpi-value">214</div>
          <div className="kpi-delta up"><Ic.Up/> +12 since yesterday</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Pass rate</div>
          <div className="kpi-value" style={{ color: "var(--mint)" }}>97%</div>
          <div className="kpi-delta up"><Ic.Up/> +2pts</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Open incidents</div>
          <div className="kpi-value" style={{ color: "var(--coral)" }}>2</div>
          <div className="kpi-delta down">Both on Crumb &amp; Co.</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs" style={{ marginBottom: 24 }}>
        <button className={"tab" + (tab === "tests" ? " active" : "")} onClick={() => setTab("tests")}>Tests</button>
        <button className={"tab" + (tab === "scenarios" ? " active" : "")} onClick={() => setTab("scenarios")}>Scenarios</button>
        <button className={"tab" + (tab === "uptime" ? " active" : "")} onClick={() => setTab("uptime")}>Uptime</button>
        <button className={"tab" + (tab === "schedule" ? " active" : "")} onClick={() => setTab("schedule")}>Schedule</button>
        <button className={"tab" + (tab === "alerts" ? " active" : "")} onClick={() => setTab("alerts")}>Alerts</button>
        <button className={"tab" + (tab === "live" ? " active" : "")} onClick={() => setTab("live")}>Live <span className="live-dot"></span></button>
      </div>

      {tab === "tests" && (
        <div className="split-grid" style={{ gridTemplateColumns: "260px 1fr", gap: 20 }}>
          <div className="card" style={{ padding: 8 }}>
            <div className="kicker" style={{ padding: "8px 10px" }}>Apps</div>
            {apps.map(a => (
              <div key={a.id} className={"agent-row" + (selected === a.id ? " active" : "")} onClick={() => setSelected(a.id)}>
                <span className="app-emoji">{a.emoji}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 13.5 }}>{a.name}</div>
                  <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--ink-3)", marginTop: 2 }}>{a.last}</div>
                </div>
                <span className="agent-health" data-h={a.health}>{a.health}%</span>
              </div>
            ))}
          </div>

          <div className="card" style={{ padding: 0, overflow: "hidden" }}>
            <div className="agent-detail-head">
              <span className="app-emoji">{app.emoji}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{app.name}</div>
                <div style={{ fontSize: 12.5, color: "var(--ink-3)", fontFamily: "var(--f-mono)" }}>{app.url} · last run {app.last}</div>
              </div>
              <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
                <span className="role-tag" style={{ background: "var(--mint-tint)", color: "var(--mint)" }}>● {app.passed} passed</span>
                {app.failed > 0 && <span className="role-tag" style={{ background: "var(--coral-tint)", color: "var(--coral-deep)" }}>● {app.failed} failed</span>}
              </div>
            </div>
            <div className="test-list">
              {tests.map((t, i) => {
                const isActive = running && i === Math.min(progressIdx, tests.length - 1);
                return (
                  <div key={t.name} className={"test-row" + (isActive ? " active" : "")}>
                    <div className={"test-status " + (running && i > progressIdx ? "pending" : t.status)}>
                      {running && i > progressIdx ? "" :
                       isActive ? <span style={{ display: "inline-flex", gap: 3 }}>{[0,1,2].map(j => <span key={j} style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--coral)", animation: `dot 1.2s ease-in-out infinite ${j * .15}s` }}></span>)}</span> :
                       t.status === "pass" ? <Ic.Up/> :
                       "×"}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 500, fontSize: 13.5 }}>{t.name}</div>
                      <div style={{ fontSize: 11.5, color: "var(--ink-3)", marginTop: 2, fontFamily: "var(--f-mono)" }}>{t.ai} · {t.ms}ms</div>
                      {t.status === "fail" && (
                        <div className="test-error">
                          <strong>Error:</strong> {t.err}
                          <button className="btn btn-coral btn-sm" style={{ marginLeft: 12 }}><Ic.Spark/> Fix with AI</button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {tab === "scenarios" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div>
              <h3 style={{ margin: 0, fontWeight: 700, fontSize: 18 }}>End-to-end scenarios</h3>
              <p style={{ margin: "4px 0 0", color: "var(--ink-2)", fontSize: 13.5 }}>The AI walks through real user journeys A-to-Z, like an unpaid intern who never gets tired.</p>
            </div>
            <button className="btn btn-outline btn-sm"><Ic.Plus/> New scenario</button>
          </div>
          <div className="scenario-grid">
            {scenarios.map((s) => (
              <div key={s.name} className="scenario-card">
                <div className="scenario-head">
                  <span className="scenario-tag">{s.tag}</span>
                  <span className="scenario-success" style={{ color: s.success >= 99 ? "var(--mint)" : s.success >= 97 ? "#9a7000" : "var(--coral)" }}>
                    {s.success.toFixed(1)}%
                  </span>
                </div>
                <div className="scenario-name">{s.name}</div>
                <ol className="scenario-steps">
                  {s.steps.map((st, i) => <li key={i}>{st}</li>)}
                </ol>
                <div className="scenario-foot">
                  <span>{s.runs.toLocaleString()} runs · last took {(s.lastMs / 1000).toFixed(1)}s</span>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button className="btn btn-ghost btn-sm">Edit</button>
                    <button className="btn btn-outline btn-sm">Run now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "uptime" && (
        <div className="card-lg" style={{ padding: "28px 30px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
            <div>
              <h3 style={{ margin: 0, fontWeight: 700, fontSize: 18 }}>7-day uptime — Crumb &amp; Co.</h3>
              <p style={{ margin: "4px 0 0", color: "var(--ink-2)", fontSize: 13.5 }}>One block per hour. Hover for status. Pinged every 60 seconds from 3 regions.</p>
            </div>
            <div style={{ display: "flex", gap: 16, alignItems: "center", fontSize: 12, color: "var(--ink-3)" }}>
              <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}><span className="uptile up"></span> Healthy</span>
              <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}><span className="uptile slow"></span> Slow</span>
              <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}><span className="uptile down"></span> Down</span>
            </div>
          </div>
          <div className="uptime-grid">
            {uptimeGrid.map((row, d) => (
              <div key={d} className="uptime-row">
                <div className="uptime-day">{["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][d]}</div>
                {row.map((s, h) => (
                  <div key={h} className={"uptile " + s} title={`${["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][d]} ${String(h).padStart(2,"0")}:00 — ${s}`}></div>
                ))}
              </div>
            ))}
            <div className="uptime-row" style={{ marginTop: 4 }}>
              <div className="uptime-day" style={{ color: "var(--ink-3)", fontSize: 10.5 }}></div>
              {Array.from({ length: 24 }).map((_, h) => (
                <div key={h} style={{ width: 18, textAlign: "center", fontFamily: "var(--f-mono)", fontSize: 9.5, color: "var(--ink-3)" }}>{h % 6 === 0 ? h : ""}</div>
              ))}
            </div>
          </div>

          <hr className="rule" style={{ margin: "28px 0 20px" }}/>

          <h4 style={{ margin: 0, fontWeight: 700, fontSize: 15 }}>Recent incidents</h4>
          <div style={{ marginTop: 12 }}>
            {incidents.map((inc, i) => (
              <div key={i} className="incident-row">
                <span className={"sev sev-" + inc.sev}></span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 13.5 }}>{inc.app} · {inc.what}</div>
                  <div style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 2 }}>{inc.detail}</div>
                </div>
                <span style={{ fontSize: 12, fontFamily: "var(--f-mono)", color: "var(--ink-3)" }}>{inc.when}</span>
                <span className={"role-tag " + (inc.status === "open" ? "" : "viewer")} style={inc.status === "open" ? { background: "var(--coral-tint)", color: "var(--coral-deep)" } : {}}>
                  {inc.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "schedule" && (
        <div className="card-lg" style={{ padding: "28px 30px" }}>
          <h3 style={{ margin: 0, fontWeight: 700, fontSize: 18 }}>Weekly schedule</h3>
          <p style={{ margin: "4px 0 18px", color: "var(--ink-2)", fontSize: 13.5 }}>What's running, when, and where. Tweak any cell — the AI re-generates tests to fit.</p>

          <div className="sched-grid">
            <div className="sched-head">
              <div></div>
              {Array.from({ length: 24 }).map((_, h) => <div key={h}>{h % 3 === 0 ? String(h).padStart(2, "0") : ""}</div>)}
            </div>
            {schedule.map((row) => (
              <div key={row.kind} className="sched-row">
                <div className="sched-label">
                  <span className="sched-ic">{row.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{schedLabel(row.kind)}</div>
                    <div style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{schedDesc(row.kind)}</div>
                  </div>
                </div>
                {Array.from({ length: 24 }).map((_, h) => (
                  <div key={h} className={"sched-cell" + (row.slots.includes(h) ? " on " + row.kind : "")}></div>
                ))}
              </div>
            ))}
          </div>

          <hr className="rule" style={{ margin: "24px 0" }}/>

          <h4 style={{ margin: "0 0 12px", fontWeight: 700, fontSize: 14 }}>Triggers</h4>
          <div className="agent-cards">
            {[
              { title: "After every edit",      desc: "Re-runs affected tests within 60s of any change in the editor.", on: true,  ic: <Ic.Spark/> },
              { title: "Pre-publish gate",      desc: "Block publishing if a critical test is failing.",                 on: true,  ic: <Ic.Lock/> },
              { title: "Daily smoke run",       desc: "Hits every page, fills every form, every morning at 7am.",       on: true,  ic: <Ic.Clock/> },
              { title: "Weekly visual diff",    desc: "Screenshot every page, flag unexpected layout shifts.",          on: false, ic: <Ic.Image/> },
              { title: "Geo-uptime ping",       desc: "Hits each app from 3 regions every 60 seconds.",                 on: true,  ic: <Ic.Globe/> },
              { title: "Synthetic traffic",     desc: "Simulates 50 concurrent users once a week to catch slow paths.", on: false, ic: <Ic.Users/> },
            ].map((c) => (
              <div key={c.title} className="agent-card">
                <div className="agent-card-ic">{c.ic}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{c.title}</div>
                  <div style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 2 }}>{c.desc}</div>
                </div>
                <div className={"toggle" + (c.on ? " on" : "")}></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "alerts" && (
        <div className="card-lg" style={{ padding: "28px 30px" }}>
          <h3 style={{ margin: 0, fontWeight: 700, fontSize: 18 }}>Where should we yell?</h3>
          <p style={{ margin: "4px 0 24px", color: "var(--ink-2)", fontSize: 13.5 }}>If a critical test fails or your app goes down, we ping you the way you actually pay attention.</p>

          <div className="card" style={{ padding: 0 }}>
            {channels.map((ch, i) => (
              <div key={ch.name} className="card-row" style={{ padding: "16px 20px", borderTop: i === 0 ? "0" : "1px solid var(--line-2)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 0 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--bg-2)", display: "grid", placeItems: "center" }}>
                    {ch.name === "Slack" ? "💬" : ch.name === "Email" ? "✉" : ch.name === "SMS" ? "📱" : ch.name === "Webhook" ? "⚙" : "📟"}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{ch.name}</div>
                    <div style={{ fontFamily: "var(--f-mono)", fontSize: 12, color: "var(--ink-3)", marginTop: 2 }}>{ch.target}</div>
                  </div>
                </div>
                <button className="btn btn-ghost btn-sm">Test</button>
                <div className={"toggle" + (ch.on ? " on" : "")}></div>
              </div>
            ))}
            <div className="card-row" style={{ padding: 16, borderTop: "1px solid var(--line-2)" }}>
              <button className="btn btn-outline btn-sm"><Ic.Plus/> Add channel</button>
            </div>
          </div>

          <hr className="rule" style={{ margin: "28px 0" }}/>

          <h4 style={{ margin: "0 0 12px", fontWeight: 700, fontSize: 14 }}>Severity routing</h4>
          <p style={{ margin: "0 0 14px", fontSize: 13, color: "var(--ink-3)" }}>Different alert types go to different channels.</p>
          <div className="route-grid">
            <RouteRow sev={3} label="Critical · app is down" chans={["SMS", "Slack", "Email"]}/>
            <RouteRow sev={2} label="Major · test failing on production" chans={["Slack", "Email"]}/>
            <RouteRow sev={1} label="Minor · slow response, visual diff" chans={["Email"]}/>
          </div>

          <hr className="rule" style={{ margin: "28px 0 16px" }}/>

          <h4 style={{ margin: "0 0 12px", fontWeight: 700, fontSize: 14 }}>Quiet hours</h4>
          <div className="card card-row" style={{ padding: "16px 20px" }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>Don't text me 10pm – 7am</div>
              <div style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 2 }}>Critical alerts still go through. Everything else waits until morning.</div>
            </div>
            <div className="toggle on"></div>
          </div>
        </div>
      )}

      {tab === "live" && (
        <div className="split-grid" style={{ gridTemplateColumns: "1fr 320px", gap: 20 }}>
          <div className="card-lg" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "18px 22px", borderBottom: "1px solid var(--line-2)" }}>
              <span className="live-dot" style={{ width: 8, height: 8 }}></span>
              <h3 style={{ margin: 0, fontWeight: 700, fontSize: 16 }}>Agent live feed</h3>
              <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--ink-3)", fontFamily: "var(--f-mono)" }}>updated every 2s</span>
            </div>
            <div className="live-feed">
              {liveFeed.map((f, i) => (
                <div key={i} className="live-item">
                  <span className={"live-tag live-" + f.agent.toLowerCase()}>{f.agent}</span>
                  <span className="live-text">{f.text}</span>
                  <span className="live-time">{f.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="kicker">Right now</div>
            <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 12 }}>
              <div className="live-stat">
                <div className="live-stat-num">3</div>
                <div className="live-stat-label">tests in flight</div>
              </div>
              <div className="live-stat">
                <div className="live-stat-num">142ms</div>
                <div className="live-stat-label">avg response, last min</div>
              </div>
              <div className="live-stat">
                <div className="live-stat-num">12</div>
                <div className="live-stat-label">scenarios queued today</div>
              </div>
              <div className="live-stat">
                <div className="live-stat-num" style={{ color: "var(--coral)" }}>2</div>
                <div className="live-stat-label">open incidents</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function schedLabel(k) {
  return k === "smoke" ? "Smoke run" : k === "e2e" ? "End-to-end scenarios" : k === "visual" ? "Visual diff" : "Geo-uptime ping";
}
function schedDesc(k) {
  return k === "smoke" ? "Quick health check across all pages" :
         k === "e2e"   ? "Full user-journey walkthroughs" :
         k === "visual" ? "Screenshot regression vs last week" :
         "Hits every app from 3 regions";
}

function RouteRow({ sev, label, chans }) {
  return (
    <div className="route-row">
      <span className={"sev sev-" + sev} style={{ width: 12, height: 12 }}></span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600, fontSize: 13.5 }}>{label}</div>
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {chans.map(c => <span key={c} className="route-chip">{c}</span>)}
      </div>
    </div>
  );
}

window.PoofD_Testing = { TestingPage };
