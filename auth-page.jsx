/* global React, PoofPart1 */
const { Logo } = window.PoofPart1;
const { useState, useEffect } = React;

/* ============================================================
   LOGIN PAGE — split layout, magic link + Google + GitHub
   ============================================================ */
function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (email.trim()) setSent(true);
  };

  return (
    <div className="auth-split">
      <section className="auth-pane auth-pane-form">
        <div className="auth-pane-inner">
          <div className="auth-logo"><Logo/></div>

          {!sent ? (
            <React.Fragment>
              <h1 className="auth-h1">
                Welcome back.<br/>
                <em>Let's ship something.</em>
              </h1>
              <p className="auth-sub">
                Sign in to your workspace. No password — we'll send a magic link.
              </p>

              <div className="auth-oauth">
                <button className="auth-oauth-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"/>
                    <path fill="#FBBC05" d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.43.34-2.1V7.07H2.18A11 11 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.83Z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.2 1.65l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38Z"/>
                  </svg>
                  Continue with Google
                </button>
                <button className="auth-oauth-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.55v-2.13c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.73-1.53-2.55-.29-5.23-1.27-5.23-5.67 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18.91-.25 1.89-.38 2.87-.38s1.96.13 2.87.38c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.66.41.36.78 1.05.78 2.12v3.14c0 .3.21.66.8.55C20.21 21.38 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z"/>
                  </svg>
                  Continue with GitHub
                </button>
              </div>

              <div className="auth-divider"><span>or</span></div>

              <form className="auth-form" onSubmit={submit}>
                <label className="auth-label">Email</label>
                <input
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                />
                <button type="submit" className="auth-submit">
                  Send magic link
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </button>
              </form>

              <p className="auth-foot">
                New to AppsBuiltWithAI?{" "}
                <a href="waitlist-landing.html">Join the waitlist →</a>
              </p>
            </React.Fragment>
          ) : (
            <div className="auth-sent">
              <div className="auth-sent-ic">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v16H4z"/><path d="m22 6-10 7L2 6"/></svg>
              </div>
              <h2>Check your inbox.</h2>
              <p>
                We sent a magic link to <strong>{email}</strong>. Click it to sign in. The link expires in 10 minutes.
              </p>
              <button className="auth-resend" onClick={() => setSent(false)}>← Use a different email</button>
            </div>
          )}
        </div>
      </section>

      <aside className="auth-pane auth-pane-art">
        <div className="auth-blob auth-blob-a"></div>
        <div className="auth-blob auth-blob-b"></div>
        <div className="auth-art-inner">
          <blockquote>
            "Built our internal CRM in 11 minutes. Honestly? Better than the SaaS we replaced."
          </blockquote>
          <div className="auth-quote-who">
            <div className="auth-quote-av">JK</div>
            <div>
              <strong>Jamal K.</strong>
              <span>Ops lead · Hartford Roasters</span>
            </div>
          </div>
          <div className="auth-art-stats">
            <div>
              <div className="auth-stat-n">9 min</div>
              <div className="auth-stat-l">median first build</div>
            </div>
            <div>
              <div className="auth-stat-n">14,000+</div>
              <div className="auth-stat-l">apps shipped</div>
            </div>
            <div>
              <div className="auth-stat-n">$0</div>
              <div className="auth-stat-l">to start</div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

/* ============================================================
   DASHBOARD — sidebar + topbar + 3 app cards + activity rail
   ============================================================ */

const APPS = [
  { name: "Maud's Bakery",     domain: "maudsbakery.appsbuiltwithai.com", status: "live",     tag: "Storefront",   visits: 1280, mins: 9,  color: "#FB8855" },
  { name: "Client intake",     domain: "intake.appsbuiltwithai.com",      status: "live",     tag: "Form",         visits: 412,  mins: 7,  color: "#1FB295" },
  { name: "Sprint dashboard",  domain: "sprints.appsbuiltwithai.com",     status: "draft",    tag: "Internal",     visits: 0,    mins: 12, color: "#6FA8E0" },
];

const ACTIVITY = [
  { who: "Designer agent",  what: "updated hero photo on Maud's Bakery",     when: "2m ago", tone: "designer" },
  { who: "QA agent",         what: "click-tested the booking flow (PASS)",    when: "8m ago", tone: "qa" },
  { who: "You",              what: "renamed 'Coaching intake' → 'Client intake'", when: "1h ago", tone: "you" },
  { who: "Engineer agent",   what: "wired Stripe checkout to the storefront", when: "3h ago", tone: "engineer" },
  { who: "Marketing agent",  what: "drafted launch tweet for Sprint dashboard", when: "yesterday", tone: "marketing" },
];

function DashSparkline({ data, color }) {
  const max = Math.max(...data, 1);
  const pts = data.map((d, i) => `${(i / (data.length - 1)) * 100},${30 - (d / max) * 28}`).join(" ");
  return (
    <svg className="dash-spark" viewBox="0 0 100 30" preserveAspectRatio="none" width="100%" height="30">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function DashboardPage() {
  const [active, setActive] = useState("apps");

  return (
    <div className="dash-shell">
      {/* Sidebar */}
      <aside className="dash-side">
        <div className="dash-side-logo"><Logo/></div>

        <nav className="dash-nav">
          <a className={"dash-nav-item" + (active === "apps" ? " is-on" : "")} onClick={() => setActive("apps")}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            <span>Apps</span>
            <span className="dash-nav-count">3</span>
          </a>
          <a className={"dash-nav-item" + (active === "templates" ? " is-on" : "")} onClick={() => setActive("templates")}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
            <span>Templates</span>
          </a>
          <a className={"dash-nav-item" + (active === "domains" ? " is-on" : "")} onClick={() => setActive("domains")}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z"/></svg>
            <span>Domains</span>
          </a>
          <a className={"dash-nav-item" + (active === "billing" ? " is-on" : "")} onClick={() => setActive("billing")}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>
            <span>Billing</span>
          </a>
          <a className={"dash-nav-item" + (active === "team" ? " is-on" : "")} onClick={() => setActive("team")}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <span>Team</span>
          </a>
        </nav>

        <div className="dash-side-pro">
          <div className="dash-side-pro-h">Founder beta</div>
          <p>You're on free during the beta. $50 in credits available.</p>
          <button>View plan</button>
        </div>
      </aside>

      {/* Main */}
      <main className="dash-main">
        <header className="dash-top">
          <div>
            <div className="dash-greet">Welcome back, <strong>Jess</strong></div>
            <h1 className="dash-h1">Your apps.</h1>
          </div>
          <div className="dash-top-row">
            <button className="dash-search">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              Search
              <kbd>⌘K</kbd>
            </button>
            <button className="dash-cta">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
              New app
            </button>
          </div>
        </header>

        {/* New-app prompt card */}
        <section className="dash-prompt">
          <div className="dash-prompt-tag">START FROM A SENTENCE</div>
          <div className="dash-prompt-body">
            <input
              type="text"
              placeholder="Describe what you want to build…"
              defaultValue=""
            />
            <button>
              Build it
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </button>
          </div>
          <div className="dash-prompt-chips">
            <span>📅 Booking page</span>
            <span>🛒 Storefront</span>
            <span>📝 Intake form</span>
            <span>📊 Internal dashboard</span>
          </div>
        </section>

        {/* Apps grid + activity */}
        <section className="dash-grid">
          <div className="dash-apps">
            <div className="dash-section-h">
              <h2>Live apps</h2>
              <span>{APPS.length} total</span>
            </div>
            <div className="dash-apps-list">
              {APPS.map((a) => (
                <div key={a.name} className="dash-app-card" style={{ "--accent": a.color }}>
                  <div className="dash-app-icon" style={{ background: a.color }}>
                    {a.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                  </div>
                  <div className="dash-app-body">
                    <div className="dash-app-row">
                      <h3>{a.name}</h3>
                      <span className={"dash-app-status dash-app-status-" + a.status}>
                        <span></span>{a.status === "live" ? "Live" : "Draft"}
                      </span>
                    </div>
                    <div className="dash-app-domain">{a.domain}</div>
                    <div className="dash-app-meta">
                      <div>
                        <div className="dash-app-meta-n">{a.visits.toLocaleString()}</div>
                        <div className="dash-app-meta-l">visits / 30d</div>
                      </div>
                      <div>
                        <div className="dash-app-meta-n">{a.mins} min</div>
                        <div className="dash-app-meta-l">build time</div>
                      </div>
                      <div className="dash-app-meta-spark">
                        <DashSparkline data={[3,5,4,7,6,9,12,10,11,14,12,18]} color={a.color}/>
                      </div>
                    </div>
                  </div>
                  <div className="dash-app-actions">
                    <button>Edit</button>
                    <button>Open ↗</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="dash-activity">
            <div className="dash-section-h">
              <h2>Today's activity</h2>
              <span className="dash-activity-live"><span></span>Live</span>
            </div>
            <ol className="dash-activity-list">
              {ACTIVITY.map((a, i) => (
                <li key={i}>
                  <div className={"dash-activity-dot dash-activity-dot-" + a.tone}></div>
                  <div className="dash-activity-body">
                    <div className="dash-activity-text">
                      <strong>{a.who}</strong> {a.what}
                    </div>
                    <div className="dash-activity-when">{a.when}</div>
                  </div>
                </li>
              ))}
            </ol>
          </aside>
        </section>
      </main>
    </div>
  );
}

window.LoginPage = LoginPage;
window.DashboardPage = DashboardPage;
