import React, { useState as useStState, useMemo as useStMemo, useEffect as useStEffect } from 'react';
import { Reveal, ArrowRight } from './part1.jsx';
/* ============= STATUS ============= */

// 90-day uptime mocked deterministically.
function makeUptime(seed, badDays = []) {
  const days = [];
  let x = seed;
  for (let i = 0; i < 90; i++) {
    x = (Math.imul(x, 1664525) + 1013904223) >>> 0;
    // Default to operational; sprinkle a degraded/outage day if listed
    const day = badDays.find(b => b.day === i);
    if (day) days.push(day);
    else days.push({ day: i, state: (x % 200 === 7) ? "minor" : "ok" });
  }
  return days;
}

const SERVICES = [
  { id: "builder", name: "AI builder", desc: "Plan, build, edit agents", uptime: makeUptime(11, []), pct: 99.99 },
  { id: "editor", name: "Editor & preview", desc: "Live editor with hot reload", uptime: makeUptime(22, [{day: 42, state: "minor"}]), pct: 99.97 },
  { id: "hosting", name: "App hosting & CDN", desc: "Where your published apps live", uptime: makeUptime(33, []), pct: 100.0 },
  { id: "domains", name: "Custom domains", desc: "SSL & DNS automation", uptime: makeUptime(44, [{day: 28, state: "minor"}]), pct: 99.96 },
  { id: "dashboard", name: "Dashboard", desc: "Workspace, billing, settings", uptime: makeUptime(55, []), pct: 99.99 },
  { id: "auth", name: "Authentication", desc: "Magic links & SSO", uptime: makeUptime(66, []), pct: 99.99 },
  { id: "connectors",name: "Connectors", desc: "Stripe, Gmail, Slack, et al.", uptime: makeUptime(77, [{day: 12, state: "outage"}, {day: 13, state: "minor"}]), pct: 99.84 },
  { id: "api", name: "Public API", desc: "Webhooks & outbound calls", uptime: makeUptime(88, []), pct: 99.99 },
];

const INCIDENTS = [
  {
    when: "May 21, 2026 · 14:22 UTC",
    title: "Increased latency on Editor previews",
    duration: "23 min",
    status: "resolved",
    services: ["Editor & preview"],
    log: [
      { t: "14:22", msg: "Investigating: preview refreshes taking >8s for ~6% of sessions." },
      { t: "14:31", msg: "Identified: a regional cache eviction triggered a thundering herd on hot apps." },
      { t: "14:39", msg: "Mitigating: staggered cache warmup deployed; latency returning to normal." },
      { t: "14:45", msg: "Resolved: all regions back under 1.2s p95." },
    ],
  },
  {
    when: "May 7, 2026 · 09:08 UTC",
    title: "Connectors: Stripe webhook backlog",
    duration: "1h 12min",
    status: "resolved",
    services: ["Connectors"],
    log: [
      { t: "09:08", msg: "Stripe webhook intake paused due to an upstream IP rotation." },
      { t: "09:54", msg: "DNS updated. Backlog replaying in chronological order." },
      { t: "10:20", msg: "Resolved: all backlogged webhooks delivered." },
    ],
  },
];

function dayStateColor(s) {
  if (s === "ok") return "var(--mint)";
  if (s === "minor") return "var(--sun)";
  if (s === "outage") return "var(--coral)";
  return "var(--line)";
}

function StatusPage() {
  const overall = useStMemo(() => {
    const anyOutage = SERVICES.some(s => s.uptime.some(d => d.state === "outage"));
    const anyMinor  = SERVICES.some(s => s.uptime.slice(-7).some(d => d.state === "minor"));
    if (anyOutage && SERVICES.some(s => s.uptime[89].state === "outage")) return { state: "outage", label: "Partial outage", color: "coral" };
    if (anyMinor && SERVICES.some(s => s.uptime[89].state === "minor")) return { state: "minor", label: "Some services degraded", color: "sun" };
    return { state: "ok", label: "All systems operational", color: "mint" };
  }, []);

  // pulse anim trigger
  const [tick, setTick] = useStState(0);
  useStEffect(() => {
    const t = setInterval(() => setTick(x => x + 1), 1600);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <section className={"status-banner tone-" + overall.color} data-screen-label="status-hero">
        <div className="wrap-tight">
          <Reveal>
            <div className="status-banner-eyebrow">System status</div>
            <div className="status-banner-row">
              <span className={"status-banner-dot tone-" + overall.color}>
                <span className="pulse"/>
              </span>
              <h1 className="status-banner-h">{overall.label}</h1>
            </div>
            <p className="status-banner-sub">
              Updated {tick > 0 ? `${tick}s` : "a moment"} ago · 8 services monitored · 90 days of history shown below
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pad pt-0">
        <div className="wrap-tight">
          <div className="status-grid">
            {SERVICES.map((svc, i) => {
              const today = svc.uptime[svc.uptime.length - 1];
              const tone = today.state === "ok" ? "mint" : today.state === "minor" ? "sun" : "coral";
              return (
                <Reveal key={svc.id} delay={i * 30}>
                  <div className="status-row">
                    <div className="status-row-head">
                      <div className="status-row-name">
                        <span className={"status-dot tone-" + tone}/>
                        <div>
                          <div className="status-row-title">{svc.name}</div>
                          <div className="status-row-desc">{svc.desc}</div>
                        </div>
                      </div>
                      <div className="status-row-meta">
                        <span className={"status-state-pill tone-" + tone}>
                          {today.state === "ok" ? "Operational" : today.state === "minor" ? "Degraded" : "Outage"}
                        </span>
                        <span className="status-uptime">{svc.pct.toFixed(2)}% uptime</span>
                      </div>
                    </div>
                    <div className="status-bars" aria-label={"90-day uptime bars for " + svc.name}>
                      {svc.uptime.map((d, i) => (
                        <span
                          key={i}
                          className="status-bar"
                          style={{ background: dayStateColor(d.state) }}
                          title={`Day ${90 - i} · ${d.state === "ok" ? "Operational" : d.state === "minor" ? "Degraded" : "Outage"}`}
                        />
                      ))}
                    </div>
                    <div className="status-bars-foot">
                      <span>90 days ago</span>
                      <span>Today</span>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pad pt-0">
        <div className="wrap-tight">
          <Reveal>
            <h2 className="status-section-h">Recent incidents</h2>
          </Reveal>
          <div className="status-incidents">
            {INCIDENTS.map((inc, i) => (
              <Reveal key={i}>
                <details className="status-incident">
                  <summary>
                    <div>
                      <div className="status-incident-title">{inc.title}</div>
                      <div className="status-incident-meta">
                        {inc.when} · Duration: {inc.duration} · {inc.services.join(", ")}
                      </div>
                    </div>
                    <span className="status-incident-status tone-mint">Resolved</span>
                  </summary>
                  <div className="status-incident-log">
                    {inc.log.map((l, j) => (
                      <div key={j} className="status-log-row">
                        <span className="status-log-time">{l.t}</span>
                        <span className="status-log-msg">{l.msg}</span>
                      </div>
                    ))}
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pad status-cta">
        <div className="wrap-tight" style={{ textAlign: "center" }}>
          <Reveal>
            <h2 className="serif">Get a ping when <em>something breaks.</em></h2>
            <p style={{ fontSize: 17, color: "var(--ink-2)", maxWidth: "44ch", margin: "16px auto 32px" }}>
              Subscribe by email or RSS. We post here first, even before the
              fix lands.
            </p>
            <div style={{ display: "inline-flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
              <a className="btn btn-coral btn-lg" href="mailto:status@appsbuiltwithai.com?subject=Subscribe%20to%20status%20updates">Subscribe to updates <ArrowRight/></a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}


export default StatusPage;
