/* global React, PoofD */
const { useState, Ic } = PoofD;

/* ============= SECURITY PAGE ============= */
function SecurityPage() {
  const [twoFA, setTwoFA] = useState(true);
  const [sso, setSso] = useState(false);
  const [auditAlerts, setAuditAlerts] = useState(true);
  const [scanRunning, setScanRunning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [score, setScore] = useState(92);

  const scanChecks = [
    "Scanning sign-in policies…",
    "Verifying TLS / HTTPS configuration…",
    "Checking dependency vulnerabilities…",
    "Auditing API keys and rotation age…",
    "Reviewing data exfiltration patterns…",
    "Testing rate-limit on public endpoints…",
    "Validating user input sanitization…",
    "Cross-checking RBAC enforcement…",
    "Scan complete · workspace healthy",
  ];

  const runScan = () => {
    setScanRunning(true);
    setScanStep(0);
  };
  useEffect(() => {
    if (!scanRunning) return;
    if (scanStep >= scanChecks.length - 1) {
      const t = setTimeout(() => { setScanRunning(false); setScore(96); }, 1200);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setScanStep(s => s + 1), 800);
    return () => clearTimeout(t);
  }, [scanRunning, scanStep, scanChecks.length]);

  const sessions = [
    { device: "MacBook Pro · Safari",     loc: "San Francisco, CA", ip: "73.42.18.x", now: true,  when: "Active now" },
    { device: "iPhone 15 · Mobile Safari", loc: "San Francisco, CA", ip: "73.42.18.x", now: false, when: "2 hours ago" },
    { device: "iPad · Safari",             loc: "Oakland, CA",       ip: "108.10.4.x", now: false, when: "3 days ago" },
  ];

  const audit = [
    { kind: "login",  text: "Signed in from MacBook Pro · Safari",                     time: "Active now",  ip: "73.42.18.x" },
    { kind: "publish",text: "Published <strong>Crumb & Co.</strong> to crumbandco.com", time: "2 hours ago", ip: "73.42.18.x" },
    { kind: "invite", text: "Invited <strong>sarah@crumbandco.com</strong> as editor",  time: "Yesterday",   ip: "73.42.18.x" },
    { kind: "key",    text: "Rotated API key <code>poof_••••3F2A</code>",                 time: "3 days ago",  ip: "73.42.18.x" },
    { kind: "login",  text: "Signed in from iPad · Safari",                            time: "3 days ago",  ip: "108.10.4.x" },
    { kind: "login",  text: "Failed sign-in attempt blocked",                          time: "1 week ago",  ip: "94.21.0.x", danger: true },
  ];

  return (
    <div className="page" data-screen-label="security">
      <div className="page-head">
        <div>
          <h1>Security</h1>
          <div className="sub">Sign-in, sessions, audit trail. Poof's AI auditor scans automatically — you don't need a CTO.</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-outline btn-sm">Download report</button>
          <button className="btn btn-coral" onClick={runScan} disabled={scanRunning}>
            {scanRunning ? `Scanning… ${scanStep + 1}/${scanChecks.length}` : <><Ic.Spark/> Run AI security scan</>}
          </button>
        </div>
      </div>

      <div className="agent-banner">
        <div className="agent-bot">
          <span style={{ width: 44, height: 44, borderRadius: 12, background: "var(--ink)", color: "var(--sun)", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 18 }}>P</span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: "-0.01em" }}>Poof Auditor · last scan 3 hours ago</div>
          <div style={{ fontSize: 13, color: "var(--ink-2)", marginTop: 4 }}>
            {scanRunning ? (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <span style={{ display: "inline-flex", gap: 4 }}>
                  {[0,1,2].map(j => <span key={j} style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--coral)", animation: `dot 1.2s ease-in-out infinite ${j * .15}s` }}></span>)}
                </span>
                {scanChecks[scanStep]}
              </span>
            ) : (
              <span>Continuously monitors sign-ins, dependencies, and API key health. <a style={{ color: "var(--coral)", textDecoration: "underline", cursor: "pointer" }}>see history</a></span>
            )}
          </div>
        </div>
        <div className="ai-badge"><Ic.Spark/> AI-automated</div>
      </div>

      <div className="sec-grid" style={{ marginTop: 24 }}>
        <div className="sec-tile">
          <div className="sec-tile-head">
            <div className="sec-tile-ic" style={{ background: "var(--mint-tint)", color: "var(--mint)" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L4 6v6c0 5 3.4 9.4 8 10 4.6-.6 8-5 8-10V6l-8-4z"/></svg>
            </div>
            <div>
              <div className="sec-tile-name">Account security</div>
              <div className="sec-tile-meta">{score >= 95 ? "Excellent" : "2 of 3 protections enabled"}</div>
            </div>
            <div style={{ marginLeft: "auto", fontWeight: 700, fontSize: 28, color: "var(--mint)", letterSpacing: "-0.02em" }}>{score}<span style={{ fontSize: 13, color: "var(--ink-3)", fontWeight: 500 }}>/100</span></div>
          </div>
          <div className="usage-bar" style={{ marginTop: 14 }}><div style={{ width: score + "%", background: "var(--mint)", transition: "width .8s cubic-bezier(.2,.8,.2,1)" }}></div></div>
        </div>
      </div>

      <div className="settings-grid" style={{ marginTop: 28, maxWidth: "100%" }}>
        <div className="setting-label">
          <h3>Two-factor authentication</h3>
          <p>Require a code from your authenticator app at every sign-in.</p>
        </div>
        <div className="setting-control">
          <div className="card card-row">
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>Authenticator app</div>
              <div style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 2 }}>Backup codes downloaded on May 14.</div>
            </div>
            <div className={"toggle" + (twoFA ? " on" : "")} onClick={() => setTwoFA(!twoFA)}></div>
          </div>
        </div>

        <div className="setting-label">
          <h3>Single sign-on (SSO)</h3>
          <p>Sign in with Google Workspace or your company IdP. <span style={{ color: "var(--coral)", fontWeight: 600 }}>Team plan.</span></p>
        </div>
        <div className="setting-control">
          <div className="card card-row">
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>SAML / Google SSO</div>
              <div style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 2 }}>Lock sign-ups to your domain.</div>
            </div>
            <div className={"toggle" + (sso ? " on" : "")} onClick={() => setSso(!sso)}></div>
          </div>
        </div>

        <div className="setting-label">
          <h3>Active sessions</h3>
          <p>Where you're currently signed in. Revoke anything that looks unfamiliar.</p>
        </div>
        <div className="setting-control">
          <div className="card">
            {sessions.map((s, i) => (
              <div key={i} className="card-row">
                <div style={{ display: "flex", gap: 12, alignItems: "center", flex: 1, minWidth: 0 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--bg-2)", display: "grid", placeItems: "center" }}>
                    {s.device.includes("iPhone") ? <Ic.Phone/> : s.device.includes("iPad") ? <Ic.Tablet/> : <Ic.Desktop/>}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{s.device}</div>
                    <div style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 2, fontFamily: "var(--f-mono)" }}>{s.loc} · {s.ip}</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  {s.now ? (
                    <span className="role-tag" style={{ background: "var(--mint-tint)", color: "var(--mint)" }}>● This device</span>
                  ) : (
                    <span style={{ fontSize: 12, color: "var(--ink-3)", fontFamily: "var(--f-mono)" }}>{s.when}</span>
                  )}
                  {!s.now && <button className="btn btn-ghost btn-sm">Revoke</button>}
                </div>
              </div>
            ))}
            <div className="card-row" style={{ marginTop: 8 }}>
              <button className="btn btn-outline btn-sm" style={{ color: "var(--coral)", borderColor: "var(--coral-tint)" }}>Sign out all other sessions</button>
            </div>
          </div>
        </div>

        <div className="setting-label">
          <h3>API keys</h3>
          <p>For embedding your apps elsewhere or integrating with your own tools.</p>
        </div>
        <div className="setting-control">
          <div className="card">
            <div className="card-row">
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>Production key</div>
                <div style={{ fontFamily: "var(--f-mono)", fontSize: 12.5, color: "var(--ink-3)", marginTop: 4 }}>poof_live_••••••••••••3F2A</div>
                <div style={{ fontSize: 11.5, color: "var(--ink-3)", marginTop: 4 }}>Created May 1, 2026 · Last used 2 minutes ago</div>
              </div>
              <button className="btn btn-outline btn-sm">Rotate</button>
            </div>
            <div className="card-row">
              <button className="btn btn-outline btn-sm"><Ic.Plus/> Generate new key</button>
            </div>
          </div>
        </div>

        <div className="setting-label">
          <h3>Audit alerts</h3>
          <p>Email me when something sensitive happens (sign-ins, role changes, API key use).</p>
        </div>
        <div className="setting-control">
          <div className="card card-row">
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>Email alerts</div>
              <div style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 2 }}>Sent to mei@crumbandco.com.</div>
            </div>
            <div className={"toggle" + (auditAlerts ? " on" : "")} onClick={() => setAuditAlerts(!auditAlerts)}></div>
          </div>
        </div>

        <div className="setting-label">
          <h3>Audit log</h3>
          <p>Everything sensitive that happened in this workspace.</p>
        </div>
        <div className="setting-control">
          <div className="card" style={{ padding: "4px 18px" }}>
            <div className="activity">
              {audit.map((a, i) => {
                const Icon = a.kind === "login" ? <Ic.Lock/> : a.kind === "publish" ? <Ic.Globe/> : a.kind === "invite" ? <Ic.Users/> : <Ic.Code/>;
                return (
                  <div key={i} className="activity-item">
                    <div className={"activity-dot " + (a.danger ? "publish" : a.kind === "login" ? "edit" : a.kind === "publish" ? "publish" : a.kind === "invite" ? "invite" : "create")} style={a.danger ? { background: "var(--coral-tint)", color: "var(--coral)" } : null}>
                      {Icon}
                    </div>
                    <div className="activity-body">
                      <div className="activity-text" dangerouslySetInnerHTML={{ __html: a.text }}></div>
                      <div className="activity-time">{a.time} · <span style={{ fontFamily: "var(--f-mono)" }}>{a.ip}</span></div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ padding: "12px 0", textAlign: "center" }}>
              <button className="btn btn-ghost btn-sm">Download full audit log (CSV)</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.PoofD_Security = { SecurityPage };
