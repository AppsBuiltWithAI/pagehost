/* global React, PoofD */
const { useState, Ic } = PoofD;

/* ============= SETTINGS — Profile / Plan / Members / Domains / Security ============= */
function SettingsPage({ initialTab = "profile" }) {
  const [tab, setTab] = useState(initialTab);

  const tabs = [
    { id: "profile",    label: "Profile",          icon: "Users" },
    { id: "plan",       label: "Plan & credits",   icon: "Zap" },
    { id: "cloud",      label: "Cloud & usage",    icon: "Cloud" },
    { id: "knowledge",  label: "Knowledge base",   icon: "Brain" },
    { id: "connectors", label: "Connectors",       icon: "Plug" },
    { id: "data",       label: "Data tables",      icon: "Database" },
    { id: "logs",       label: "Logs",             icon: "Activity" },
    { id: "members",    label: "Member access",    icon: "Comment" },
    { id: "domains",    label: "Domains",          icon: "Globe" },
    { id: "security",   label: "Privacy & security", icon: "Lock" },
    { id: "workspace",  label: "Workspace",        icon: "Settings" },
  ];

  return (
    <div className="page page-settings" data-screen-label={"settings-" + tab}>
      <div className="page-head">
        <div>
          <h1>Account</h1>
          <div className="sub">Profile, plan, members, security — everything personal to you.</div>
        </div>
      </div>

      <div className="settings-shell">
        <aside className="settings-side">
          <div className="settings-side-kicker">SETTINGS</div>
          {tabs.map(t => {
            const I = Ic[t.icon];
            return (
              <button
                key={t.id}
                className={"settings-side-link" + (tab === t.id ? " active" : "")}
                onClick={() => setTab(t.id)}
              >
                <span className="ssl-ic"><I/></span>
                <span>{t.label}</span>
              </button>
            );
          })}
        </aside>

        <div className="settings-main">
          {tab === "profile"   && <ProfileSettings/>}
          {tab === "plan"      && <PlanSettings/>}
          {tab === "cloud"     && <CloudSettings/>}
          {tab === "knowledge" && <KnowledgeBaseSettings/>}
          {tab === "connectors"&& <ConnectorsTab/>}
          {tab === "data"      && <DataTab/>}
          {tab === "logs"      && <LogsTab/>}
          {tab === "members"   && <MembersSettings/>}
          {tab === "domains"   && <DomainsSettings/>}
          {tab === "security"  && <SecuritySettings/>}
          {tab === "workspace" && <WorkspaceSettings/>}
        </div>
      </div>
    </div>
  );
}

/* ====================================================================
   PROFILE — photo, name, username, email, linked accounts
   ==================================================================== */
function ProfileSettings() {
  const [linked, setLinked] = useState({ google: true, github: false, apple: false });

  return (
    <div className="settings-page">
      <Section title="Profile" subtitle="How you appear across AppsBuiltWithAI.">
        <div className="card pad">
          <div className="profile-hero">
            <div className="profile-photo">
              <div className="profile-photo-avatar">M</div>
              <button className="profile-photo-edit"><Ic.Camera/></button>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 18, letterSpacing: "-0.01em" }}>Mei Chen</div>
              <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 4, fontFamily: "var(--f-mono)" }}>@meichen · joined Mar 2025</div>
              <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
                <button className="btn btn-outline btn-sm">Upload photo</button>
                <button className="btn btn-ghost btn-sm">Remove</button>
              </div>
            </div>
            <span className="role-tag owner" style={{ alignSelf: "flex-start" }}>● Pro plan</span>
          </div>

          <div className="setting-divider"></div>

          <div className="field-grid">
            <div className="field-group">
              <label>Full name</label>
              <input className="field" defaultValue="Mei Chen"/>
            </div>
            <div className="field-group">
              <label>Username</label>
              <div className="field-with-prefix">
                <span className="field-prefix">@</span>
                <input className="field" defaultValue="meichen"/>
              </div>
            </div>
            <div className="field-group full">
              <label>Email address</label>
              <div className="field-with-action">
                <input className="field" defaultValue="mei@crumbandco.com"/>
                <span className="field-status verified">● Verified</span>
              </div>
            </div>
            <div className="field-group">
              <label>Time zone</label>
              <select className="field" defaultValue="LA">
                <option value="LA">Los Angeles · GMT-8</option>
                <option value="NY">New York · GMT-5</option>
                <option value="LON">London · GMT+0</option>
                <option value="TKY">Tokyo · GMT+9</option>
              </select>
            </div>
            <div className="field-group">
              <label>Language</label>
              <select className="field">
                <option>English (US)</option>
                <option>Español</option>
                <option>日本語</option>
              </select>
            </div>
          </div>

          <div className="setting-actions">
            <button className="btn btn-ghost btn-sm">Discard</button>
            <button className="btn btn-coral btn-sm">Save changes</button>
          </div>
        </div>
      </Section>

      <Section title="Linked accounts" subtitle="Sign in faster — connect a provider you already use.">
        <div className="card">
          <LinkedRow
            name="Google"
            email="mei@gmail.com"
            on={linked.google}
            color="#EA4335"
            logo={<svg viewBox="0 0 24 24" width="22" height="22"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.99.66-2.25 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.84 14.09a6.6 6.6 0 0 1 0-4.18V7.07H2.18a11 11 0 0 0 0 9.86l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/></svg>}
            onToggle={() => setLinked(l => ({...l, google: !l.google}))}
          />
          <LinkedRow
            name="GitHub"
            email={linked.github ? "@meichen-dev" : null}
            on={linked.github}
            logo={<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.4-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.7.4-1.3.7-1.5-2.5-.3-5.2-1.3-5.2-5.6 0-1.2.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2.9-.3 1.9-.4 2.9-.4s2 .1 2.9.4c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.3-5.2 5.6.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z"/></svg>}
            onToggle={() => setLinked(l => ({...l, github: !l.github}))}
          />
          <LinkedRow
            name="Apple"
            email={linked.apple ? "mei@privaterelay.appleid.com" : null}
            on={linked.apple}
            logo={<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M17.05 12.04c0-2.8 2.3-4.14 2.4-4.2-1.31-1.92-3.35-2.18-4.07-2.21-1.74-.18-3.4 1.02-4.28 1.02-.9 0-2.25-1-3.7-.97-1.9.03-3.65 1.1-4.63 2.81-1.97 3.42-.5 8.48 1.42 11.27.94 1.37 2.06 2.9 3.51 2.85 1.41-.06 1.95-.91 3.65-.91 1.7 0 2.18.91 3.67.88 1.52-.03 2.48-1.38 3.4-2.76 1.08-1.58 1.52-3.12 1.54-3.2-.03-.02-2.95-1.13-2.97-4.48zM14.13 4.06c.77-.93 1.29-2.22 1.15-3.5-1.11.04-2.45.73-3.24 1.66-.71.82-1.34 2.13-1.17 3.4 1.24.1 2.5-.62 3.26-1.56z"/></svg>}
            onToggle={() => setLinked(l => ({...l, apple: !l.apple}))}
          />
        </div>
      </Section>
    </div>
  );
}

function LinkedRow({ name, email, on, logo, onToggle, color }) {
  return (
    <div className="linked-row">
      <div className="linked-logo" style={color ? { color } : undefined}>{logo}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="linked-name">{name}</div>
        <div className="linked-meta">
          {on ? (
            <><span className="dot dot-mint"></span> Connected · {email}</>
          ) : (
            <>Not connected — link to sign in with {name}.</>
          )}
        </div>
      </div>
      <button className={"btn btn-sm " + (on ? "btn-outline" : "btn-ink")} onClick={onToggle}>
        {on ? "Disconnect" : "Connect"}
      </button>
    </div>
  );
}

/* ====================================================================
   PLAN & CREDITS
   ==================================================================== */
function PlanSettings() {
  const plans = [
    { id: "free",  name: "Free",     price: "$0",   per: "/ mo",  credits: 100,   seats: 1,  popular: false, features: ["Up to 1 app", "Unlimited drafts", "AppsBuiltWithAI subdomain", "100 AI credits / mo"] },
    { id: "pro",   name: "Pro",      price: "$19",  per: "/ mo",  credits: 1000,  seats: 3,  popular: true,  features: ["Unlimited apps", "1,000 AI credits / mo", "Custom domains + SSL", "Priority builds", "3 team seats"], current: true },
    { id: "team",  name: "Team",     price: "$49",  per: "/ mo",  credits: 4000,  seats: 10, popular: false, features: ["Everything in Pro", "4,000 AI credits / mo", "10 team seats", "Shared knowledge & skills", "SSO + audit log", "Priority support"] },
  ];
  const usagePct = (used, max) => Math.min(100, Math.round((used / max) * 100));

  return (
    <div className="settings-page">
      <Section title="Current plan" subtitle="You're on Pro — switch anytime, prorated.">
        <div className="plan-hero">
          <div className="plan-hero-bg">
            <div className="plan-hero-glow"></div>
          </div>
          <div className="plan-hero-content">
            <div className="plan-hero-tag">PRO PLAN · ANNUAL</div>
            <div className="plan-hero-price">$19<span>/ mo</span></div>
            <div className="plan-hero-meta">Renews May 14, 2027 · billed annually · $228 / yr</div>
            <div className="plan-hero-actions">
              <button className="btn btn-sm" style={{ background: "rgba(255,255,255,.16)", color: "#fff", border: "1px solid rgba(255,255,255,.24)" }}>Manage billing</button>
              <button className="btn btn-coral btn-sm">Upgrade to Team</button>
            </div>
          </div>
        </div>
      </Section>

      <Section title="AI balance" subtitle="Credits power planning, building, and tests. Refills on the 14th.">
        <div className="balance-grid">
          <div className="balance-big">
            <div className="balance-kicker">AI CREDITS THIS MONTH</div>
            <div className="balance-num">
              572 <span className="balance-num-of">/ 1,000</span>
            </div>
            <div className="balance-meter">
              <div className="balance-meter-fill" style={{ width: `${usagePct(428, 1000)}%` }}></div>
              <div className="balance-meter-warning" style={{ left: "80%" }}><span>80%</span></div>
            </div>
            <div className="balance-foot">
              <div><strong>428</strong> used · <strong>572</strong> remaining</div>
              <div>Resets in <strong>13 days</strong></div>
            </div>
            <div className="balance-spark">
              {[3, 6, 12, 8, 14, 22, 18, 11, 7, 19, 28, 16, 9].map((h, i) => (
                <span key={i} className="balance-spark-bar" style={{ height: `${h * 2}px` }}></span>
              ))}
              <span className="balance-spark-label">Last 13 days · avg 14 / day</span>
            </div>
          </div>

          <div className="balance-side">
            <div className="balance-mini">
              <div className="balance-mini-ic"><Ic.Users/></div>
              <div>
                <div className="balance-mini-num">2 <small>/ 3</small></div>
                <div className="balance-mini-label">Member seats</div>
              </div>
            </div>
            <div className="balance-mini">
              <div className="balance-mini-ic"><Ic.Templates/></div>
              <div>
                <div className="balance-mini-num">4 <small>/ ∞</small></div>
                <div className="balance-mini-label">Apps published</div>
              </div>
            </div>
            <div className="balance-mini">
              <div className="balance-mini-ic"><Ic.Trend/></div>
              <div>
                <div className="balance-mini-num">12,847 <small>/ 50k</small></div>
                <div className="balance-mini-label">Monthly visitors</div>
              </div>
            </div>
            <button className="balance-topup">
              <Ic.Zap/>
              <div style={{ flex: 1, textAlign: "left" }}>
                <div style={{ fontWeight: 700, fontSize: 13.5 }}>Top up credits</div>
                <div style={{ fontSize: 11.5, opacity: .8 }}>500 for $9 · one-time</div>
              </div>
              <Ic.ArrowR/>
            </button>
          </div>
        </div>
      </Section>

      <Section title="Compare plans" subtitle="Cancel or switch anytime — no contracts.">
        <div className="plans-grid">
          {plans.map(p => (
            <div key={p.id} className={"plan-card" + (p.current ? " current" : "") + (p.popular ? " popular" : "")}>
              {p.popular && <div className="plan-card-flag">MOST POPULAR</div>}
              {p.current && <div className="plan-card-current">✓ Current</div>}
              <div className="plan-card-name">{p.name}</div>
              <div className="plan-card-price">{p.price}<span>{p.per}</span></div>
              <ul className="plan-card-features">
                {p.features.map((f, i) => (
                  <li key={i}><span className="plan-check">✓</span>{f}</li>
                ))}
              </ul>
              <button
                className={"btn btn-sm " + (p.current ? "btn-outline" : p.popular ? "btn-coral" : "btn-ink")}
                disabled={p.current}
                style={{ width: "100%", justifyContent: "center" }}
              >
                {p.current ? "Your plan" : `Switch to ${p.name}`}
              </button>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Recent invoices">
        <div className="card">
          {[
            { d: "May 14, 2026", a: "$228.00", n: "Pro · Annual",   s: "paid" },
            { d: "May 14, 2025", a: "$228.00", n: "Pro · Annual",   s: "paid" },
            { d: "Apr 14, 2025", a: "$24.00",  n: "Pro · Monthly",  s: "paid" },
          ].map((r, i) => (
            <div key={i} className="card-row">
              <div>
                <div style={{ fontWeight: 600, fontSize: 13.5 }}>{r.n}</div>
                <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 2, fontFamily: "var(--f-mono)" }}>{r.d}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span className="role-tag" style={{ background: "var(--mint-tint)", color: "var(--mint)" }}>● Paid</span>
                <span style={{ fontWeight: 600, fontSize: 14 }}>{r.a}</span>
                <button className="btn btn-ghost btn-sm">PDF</button>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

/* ====================================================================
   MEMBERS — team, invitations, knowledge & skills
   ==================================================================== */
function MembersSettings() {
  const team = [
    { name: "Mei Chen",    email: "mei@crumbandco.com",   role: "owner",  initial: "M", color: "linear-gradient(135deg,var(--coral),var(--sun))",  last: "online now",        skills: ["Brand", "Copy"] },
    { name: "Sarah Lin",   email: "sarah@crumbandco.com", role: "editor", initial: "S", color: "linear-gradient(135deg,var(--sky),var(--mint))",   last: "2 hours ago",       skills: ["Design", "UX"] },
    { name: "Theo Park",   email: "theo@crumbandco.com",  role: "editor", initial: "T", color: "linear-gradient(135deg,var(--ink),var(--coral))",  last: "yesterday",         skills: ["Engineering"] },
    { name: "Dana Okafor", email: "dana@crumbandco.com",  role: "viewer", initial: "D", color: "linear-gradient(135deg,var(--ink-2),var(--sky))",  last: "3 days ago",        skills: ["QA"] },
  ];
  const invites = [
    { email: "priya@hellobakery.co", role: "Editor", sent: "yesterday" },
    { email: "marcus@hellobakery.co", role: "Viewer", sent: "2 days ago" },
  ];
  const knowledge = [
    { name: "Brand voice & tone",      type: "doc",   used: 14, color: "coral" },
    { name: "Bakery operations playbook", type: "doc", used: 8,  color: "sun" },
    { name: "Stripe webhook setup",    type: "skill", used: 22, color: "mint" },
    { name: "Custom email templates",  type: "skill", used: 6,  color: "sky" },
  ];

  return (
    <div className="settings-page">
      <Section title="Member access" subtitle="Editors build & publish. Viewers can see and comment.">
        <div className="card">
          <div className="member-list">
            {team.map((m, i) => (
              <div key={i} className="member-row">
                <div className="member-avatar" style={{ background: m.color }}>{m.initial}</div>
                <div className="member-info">
                  <div className="member-name">{m.name}</div>
                  <div className="member-email">{m.email}</div>
                </div>
                <div className="member-skills">
                  {m.skills.map((s, j) => <span key={j} className="skill-chip">{s}</span>)}
                </div>
                <div className="member-meta">
                  <span className={"role-tag role-" + m.role}>{m.role}</span>
                  <span className="member-last">{m.last}</span>
                </div>
                {m.role !== "owner" && <button className="icon-btn"><Ic.Dots/></button>}
              </div>
            ))}
          </div>
          <div className="seat-meter">
            <div className="seat-meter-bar"><div style={{ width: "67%" }}></div></div>
            <div style={{ fontSize: 12.5, color: "var(--ink-3)" }}><strong style={{ color: "var(--ink)" }}>2 of 3 seats</strong> used on Pro · <button className="ed-link">upgrade for 10 seats →</button></div>
          </div>
        </div>
      </Section>

      <Section title="Invite by email" subtitle="They'll get a magic link — no signup hoops.">
        <div className="card pad">
          <div className="invite-row">
            <input className="field" placeholder="teammate@yourcompany.com" style={{ flex: 1 }}/>
            <select className="field" style={{ width: 130 }}>
              <option>Editor</option>
              <option>Viewer</option>
            </select>
            <button className="btn btn-coral btn-sm">Send invite</button>
          </div>
          <div style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 10 }}>
            Or share a link: <code className="inline-link">appsbuilt.ai/join/crumb-2A7K91</code>
            <button className="ed-link" style={{ marginLeft: 8 }}>Copy</button>
            <button className="ed-link" style={{ marginLeft: 4 }}>Regenerate</button>
          </div>
        </div>
      </Section>

      <Section title="Pending invitations" subtitle="Sent — waiting for them to accept.">
        <div className="card">
          {invites.map((inv, i) => (
            <div key={i} className="card-row">
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div className="member-avatar pending">?</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{inv.email}</div>
                  <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 2, fontFamily: "var(--f-mono)" }}>Invited {inv.sent} · {inv.role}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <button className="btn btn-outline btn-sm">Resend</button>
                <button className="btn btn-ghost btn-sm">Cancel</button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Knowledge & skills" subtitle="Documents and how-tos your AI builder can reference for any project.">
        <div className="knowledge-grid">
          {knowledge.map((k, i) => (
            <div key={i} className={"knowledge-card tone-" + k.color}>
              <div className="knowledge-ic">{k.type === "doc" ? <Ic.Templates/> : <Ic.Spark/>}</div>
              <div className="knowledge-body">
                <div className="knowledge-name">{k.name}</div>
                <div className="knowledge-meta">
                  <span className="knowledge-type">{k.type}</span>
                  · Used in {k.used} builds
                </div>
              </div>
              <button className="icon-btn"><Ic.Dots/></button>
            </div>
          ))}
          <button className="knowledge-add">
            <Ic.Plus/>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13.5 }}>Add knowledge or skill</div>
              <div style={{ fontSize: 11.5, color: "var(--ink-3)" }}>Upload a doc, paste a URL, or write a custom skill</div>
            </div>
          </button>
        </div>
      </Section>
    </div>
  );
}

/* ====================================================================
   DOMAINS
   ==================================================================== */
function DomainsSettings() {
  const domains = [
    { app: "Crumb & Co.",    emoji: "🥐", domain: "crumbandco.com",        status: "verified", primary: true },
    { app: "Stillpoint",     emoji: "🧘", domain: "stillpointyoga.com",    status: "verified", primary: true },
    { app: "Garage Sale",    emoji: "🛒", domain: "garagesale.appsbuilt.ai", status: "default" },
    { app: "Invoice Stack",  emoji: "🧾", domain: "invoicesfor.me",        status: "pending" },
  ];
  return (
    <div className="settings-page">
      <Section title="Custom domains" subtitle="Connect a domain you own. We handle SSL and DNS hints — you just paste records.">
        <div className="card">
          {domains.map((d, i) => (
            <div key={i} className="card-row">
              <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 0 }}>
                <span className="app-emoji">{d.emoji}</span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{d.app}</div>
                  <div style={{ fontFamily: "var(--f-mono)", fontSize: 12, color: "var(--ink-3)", marginTop: 2 }}>{d.domain}</div>
                </div>
              </div>
              {d.status === "verified" && <span className="role-tag" style={{ background: "var(--mint-tint)", color: "var(--mint)" }}>● Verified</span>}
              {d.status === "default"  && <span className="role-tag viewer">Subdomain</span>}
              {d.status === "pending"  && <span className="role-tag" style={{ background: "var(--sun-tint)", color: "#9a7000" }}>● Pending DNS</span>}
              <button className="icon-btn"><Ic.Dots/></button>
            </div>
          ))}
          <div className="card-row" style={{ marginTop: 8 }}>
            <button className="btn btn-outline btn-sm"><Ic.Plus/> Add domain</button>
          </div>
        </div>
      </Section>

      <Section title="Automatic SSL" subtitle="Every app is served over HTTPS by default. No setup, no expiry.">
        <div className="card card-row">
          <div>
            <div style={{ fontWeight: 600, fontSize: 14 }}>Always HTTPS</div>
            <div style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 2 }}>Renewed automatically. Last check: 2 minutes ago.</div>
          </div>
          <div className="toggle on"></div>
        </div>
      </Section>
    </div>
  );
}

/* ====================================================================
   PRIVACY & SECURITY
   ==================================================================== */
function SecuritySettings() {
  const [twoFA, setTwoFA] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const sessions = [
    { device: "MacBook Pro · Chrome",  loc: "Brooklyn, NY",   ip: "76.121.0.45",   last: "Active now", current: true },
    { device: "iPhone 16 · Safari",    loc: "Brooklyn, NY",   ip: "10.4.21.103",   last: "2 hours ago" },
    { device: "Linux · Firefox",       loc: "Lisbon, PT",     ip: "85.245.118.12", last: "yesterday", flagged: true },
  ];

  return (
    <div className="settings-page">
      <Section title="Password" subtitle="Change your sign-in password.">
        <div className="card pad">
          <div className="field-grid">
            <div className="field-group full">
              <label>Current password</label>
              <input type="password" className="field" defaultValue="••••••••••••"/>
            </div>
            <div className="field-group">
              <label>New password</label>
              <input type="password" className="field"/>
            </div>
            <div className="field-group">
              <label>Confirm new</label>
              <input type="password" className="field"/>
            </div>
          </div>
          <div className="setting-actions">
            <button className="btn btn-ink btn-sm">Update password</button>
          </div>
        </div>
      </Section>

      <Section title="Two-factor authentication" subtitle="Require a second step at sign-in. Strongly recommended.">
        <div className="card pad twofa-card">
          <div className="twofa-row">
            <div className="twofa-ic"><Ic.Lock/></div>
            <div style={{ flex: 1 }}>
              <div className="twofa-title">Authenticator app</div>
              <div className="twofa-sub">{twoFA ? "✓ Active — using Authy on iPhone 16" : "Not set up — add a code generator like Authy or 1Password"}</div>
            </div>
            <div className={"toggle" + (twoFA ? " on" : "")} onClick={() => setTwoFA(!twoFA)}></div>
          </div>
          {twoFA && (
            <>
              <div className="setting-divider"></div>
              <div className="twofa-row">
                <div className="twofa-ic"><Ic.Comment/></div>
                <div style={{ flex: 1 }}>
                  <div className="twofa-title">Recovery codes</div>
                  <div className="twofa-sub">10 single-use codes · last used 4 weeks ago</div>
                </div>
                <button className="btn btn-outline btn-sm">View codes</button>
              </div>
              <div className="twofa-row">
                <div className="twofa-ic"><Ic.Phone/></div>
                <div style={{ flex: 1 }}>
                  <div className="twofa-title">SMS backup</div>
                  <div className="twofa-sub">Not set up — fall-back if you lose your authenticator</div>
                </div>
                <button className="btn btn-outline btn-sm">Add phone</button>
              </div>
            </>
          )}
        </div>
      </Section>

      <Section title="Active sessions" subtitle="Devices currently signed in to your account.">
        <div className="card">
          {sessions.map((s, i) => (
            <div key={i} className="session-row">
              <div className="session-ic">{s.device.includes("iPhone") ? <Ic.Phone/> : s.device.includes("Linux") ? <Ic.Desktop/> : <Ic.Desktop/>}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="session-name">
                  {s.device}
                  {s.current && <span className="session-current">This device</span>}
                  {s.flagged && <span className="session-flagged">Unusual location</span>}
                </div>
                <div className="session-meta">{s.loc} · <code>{s.ip}</code> · {s.last}</div>
              </div>
              {!s.current && <button className="btn btn-outline btn-sm">Sign out</button>}
            </div>
          ))}
          <div style={{ padding: "12px 0 4px" }}>
            <button className="btn btn-ghost btn-sm" style={{ color: "var(--coral)" }}>Sign out everywhere else</button>
          </div>
        </div>
      </Section>

      <Section title="Data & privacy" subtitle="What we know about you — and how to take it with you.">
        <div className="card">
          <div className="card-row">
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>Export your data</div>
              <div style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 2 }}>All apps, plans, comments, and activity as a downloadable ZIP.</div>
            </div>
            <button className="btn btn-outline btn-sm">Request export</button>
          </div>
          <div className="card-row">
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>Analytics & telemetry</div>
              <div style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 2 }}>Share anonymous usage so we can improve the builder.</div>
            </div>
            <div className="toggle on"></div>
          </div>
          <div className="card-row">
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>Public profile</div>
              <div style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 2 }}>Let others find you by username in workspace search.</div>
            </div>
            <div className="toggle on"></div>
          </div>
        </div>
      </Section>

      <Section title="Danger zone" subtitle="Permanent actions. Please be sure." tone="danger">
        <div className="danger-card">
          <div className="danger-row">
            <div>
              <div className="danger-title">Delete account</div>
              <div className="danger-sub">Erase your profile, all your apps, and your data. <strong>This cannot be undone.</strong></div>
            </div>
            <button className="btn btn-outline btn-sm danger-btn" onClick={() => setConfirmDelete(true)}>Delete account…</button>
          </div>
        </div>
        {confirmDelete && (
          <div className="vh-modal-scrim" onClick={() => setConfirmDelete(false)}>
            <div className="vh-modal" onClick={(e) => e.stopPropagation()}>
              <div className="vh-modal-ic" style={{ color: "var(--coral)", background: "var(--coral-tint)" }}><Ic.Lock/></div>
              <h3>Delete your account?</h3>
              <p>
                This will permanently delete your account and remove <strong>4 apps</strong>, <strong>2 custom domains</strong>, and all your project data. <strong>This cannot be undone.</strong>
              </p>
              <div className="field-group" style={{ marginBottom: 18 }}>
                <label>Type <code>DELETE</code> to confirm</label>
                <input className="field" placeholder="DELETE"/>
              </div>
              <div className="vh-modal-actions">
                <button className="btn btn-outline" onClick={() => setConfirmDelete(false)}>Keep my account</button>
                <button className="btn btn-coral">Permanently delete</button>
              </div>
            </div>
          </div>
        )}
      </Section>
    </div>
  );
}

/* ====================================================================
   WORKSPACE
   ==================================================================== */
function WorkspaceSettings() {
  return (
    <div className="settings-page">
      <Section title="Workspace name" subtitle="How your team sees this workspace.">
        <div className="card pad">
          <input className="field" defaultValue="Crumb & Co. Bakery"/>
        </div>
      </Section>
      <Section title="Workspace URL" subtitle="Used for invites and shared dashboards.">
        <div className="card pad">
          <div className="field-with-prefix" style={{ background: "var(--surface)" }}>
            <span className="field-prefix">appsbuilt.ai/</span>
            <input className="field" defaultValue="crumb" style={{ fontFamily: "var(--f-mono)" }}/>
          </div>
        </div>
      </Section>
      <Section title="Danger zone" subtitle="Delete this workspace and everything in it." tone="danger">
        <div className="danger-card">
          <div className="danger-row">
            <div>
              <div className="danger-title">Delete workspace</div>
              <div className="danger-sub">Removes <strong>Crumb & Co. Bakery</strong> and all apps inside it.</div>
            </div>
            <button className="btn btn-outline btn-sm danger-btn">Delete workspace…</button>
          </div>
        </div>
      </Section>
    </div>
  );
}

/* ====================================================================
   SHARED
   ==================================================================== */
function Section({ title, subtitle, tone, children }) {
  return (
    <div className={"settings-section" + (tone ? " tone-" + tone : "")}>
      <div className="settings-section-head">
        <h3>{title}</h3>
        {subtitle && <p>{subtitle}</p>}
      </div>
      <div className="settings-section-body">{children}</div>
    </div>
  );
}

window.PoofD_Pages4 = { SettingsPage };

/* ====================================================================
   CONNECTORS — re-uses the standalone ConnectorsPage component
   ==================================================================== */
function ConnectorsTab() {
  const Page = window.PoofD_Connectors && window.PoofD_Connectors.ConnectorsPage;
  return Page ? <Page/> : null;
}

function DataTab() {
  const Page = window.PoofD_Data && window.PoofD_Data.DataPage;
  return Page ? <Page/> : null;
}

function LogsTab() {
  const Pane = window.PoofD_Editor_Extras && window.PoofD_Editor_Extras.LogsPane;
  return Pane ? <Pane/> : null;
}

/* ====================================================================
   CLOUD & USAGE — storage, credits balance, API calls, history
   ==================================================================== */
function CloudSettings() {
  const used = 4.2;
  const total = 25;
  const credits = 428;
  const creditsCap = 1000;
  const apiCalls = 12840;
  const apiCap = 50000;

  const storageRows = [
    { name: "Crumb & Co.",      type: "App",        size: "1.4 GB", pct: 33, color: "coral" },
    { name: "Stillpoint",       type: "App",        size: "780 MB", pct: 18, color: "warm" },
    { name: "User uploads",     type: "Files",      size: "920 MB", pct: 22, color: "sun"   },
    { name: "Build history",    type: "Snapshots",  size: "640 MB", pct: 15, color: "plum"  },
    { name: "Everything else",  type: "Misc",       size: "496 MB", pct: 12, color: "mint"  },
  ];

  const history = [
    { date: "May 22", item: "Build credits topped up",   amount: "+1,000", positive: true },
    { date: "May 19", item: "Pro plan renewal",           amount: "−$19",  positive: false },
    { date: "May 15", item: "Storage tier upgrade · 25 GB", amount: "−$8",  positive: false },
    { date: "May 12", item: "Referral bonus · Sarah Lin", amount: "+50",   positive: true  },
  ];

  return (
    <div className="settings-page">
      <h2 className="settings-h">Cloud & usage</h2>
      <p className="settings-lead">Track what you've used, what you have left, and where every byte is going.</p>

      {/* Top balance cards */}
      <div className="cloud-balances">
        <BalanceCard
          tone="coral"
          icon={<Ic.Zap/>}
          eyebrow="Credits"
          headline={credits.toLocaleString()}
          subtitle={"of " + creditsCap.toLocaleString() + " this month"}
          pct={(credits / creditsCap) * 100}
          cta="Top up"
        />
        <BalanceCard
          tone="sun"
          icon={<Ic.Cloud/>}
          eyebrow="Storage"
          headline={used + " GB"}
          subtitle={"of " + total + " GB used"}
          pct={(used / total) * 100}
          cta="Upgrade"
        />
        <BalanceCard
          tone="mint"
          icon={<Ic.Activity/>}
          eyebrow="API calls"
          headline={apiCalls.toLocaleString()}
          subtitle={"of " + apiCap.toLocaleString() + " / mo"}
          pct={(apiCalls / apiCap) * 100}
          cta="See limits"
        />
      </div>

      <Section title="Storage by app" subtitle="Click any row to manage its files.">
        <div className="cloud-storage">
          {storageRows.map((r) => (
            <div key={r.name} className="cloud-row">
              <div className={"cloud-row-tag tone-" + r.color}>{r.type}</div>
              <div className="cloud-row-name">{r.name}</div>
              <div className="cloud-row-bar">
                <div className={"cloud-row-fill tone-" + r.color} style={{ width: r.pct + "%" }}/>
              </div>
              <div className="cloud-row-size">{r.size}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Recent activity" subtitle="Credits, payments, and any balance changes from the last 30 days.">
        <div className="cloud-history">
          {history.map((h, i) => (
            <div key={i} className="cloud-history-row">
              <div className="cloud-history-date">{h.date}</div>
              <div className="cloud-history-item">{h.item}</div>
              <div className={"cloud-history-amount " + (h.positive ? "positive" : "negative")}>{h.amount}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Auto-recharge" subtitle="Never run out mid-build.">
        <div className="cloud-auto">
          <div className="cloud-auto-row">
            <div>
              <div className="cloud-auto-title">Top up automatically when credits fall below 100</div>
              <div className="cloud-auto-sub">We'll charge your card on file for 500 credits ($5).</div>
            </div>
            <Toggle initial={true}/>
          </div>
          <div className="cloud-auto-row">
            <div>
              <div className="cloud-auto-title">Email me at 90% of storage cap</div>
              <div className="cloud-auto-sub">Heads-up before you hit the wall.</div>
            </div>
            <Toggle initial={true}/>
          </div>
        </div>
      </Section>
    </div>
  );
}

function BalanceCard({ tone, icon, eyebrow, headline, subtitle, pct, cta }) {
  return (
    <div className={"balance-card tone-" + tone}>
      <div className="balance-head">
        <span className="balance-ic">{icon}</span>
        <span className="balance-eyebrow">{eyebrow}</span>
      </div>
      <div className="balance-headline">{headline}</div>
      <div className="balance-sub">{subtitle}</div>
      <div className="balance-bar">
        <div className="balance-fill" style={{ width: Math.min(100, pct) + "%" }}/>
      </div>
      <button className="balance-cta">{cta} →</button>
    </div>
  );
}

function Toggle({ initial = false }) {
  const [on, setOn] = useState(initial);
  return (
    <button className={"settings-toggle" + (on ? " on" : "")} onClick={() => setOn(!on)} aria-pressed={on}>
      <span className="settings-toggle-knob"/>
    </button>
  );
}

/* ====================================================================
   KNOWLEDGE BASE — coding style, brand voice, design prefs
   ==================================================================== */
function KnowledgeBaseSettings() {
  const [stack, setStack]               = useState("react");
  const [styleSystem, setStyleSystem]   = useState("tailwind");
  const [density, setDensity]           = useState("comfortable");
  const [naming, setNaming]             = useState("kebab");
  const [accessibility, setA11y]        = useState(true);
  const [comments, setComments]         = useState(true);
  const [tests, setTests]               = useState(false);
  const [voice, setVoice]               = useState("Warm, plain-spoken, never corporate. Short sentences. No emoji unless the brand uses them.");
  const [brandColors, setBrandColors]   = useState("#181818, #FB8855, #FAF5EA, #2EA56F");
  const [forbidden, setForbidden]       = useState("• Don't use the word \"leverage\"\n• Never call our customers \"users\"\n• Avoid stock photo people");

  const docs = [
    { name: "Brand voice & tone",          type: "doc",   used: 14, color: "coral",  size: "12 KB" },
    { name: "Crumb & Co. recipe playbook", type: "doc",   used: 8,  color: "sun",    size: "48 KB" },
    { name: "How we handle refunds",       type: "doc",   used: 5,  color: "mint",   size: "6 KB"  },
    { name: "Logo & color guidelines",     type: "image", used: 22, color: "plum",   size: "2.3 MB"},
  ];

  return (
    <div className="settings-page">
      <h2 className="settings-h">Knowledge base</h2>
      <p className="settings-lead">Train the AI builder on how <em>you</em> like to work — coding style, brand voice, and a personal library it can reference on every build.</p>

      <Section title="Coding & engineering" subtitle="The defaults applied to every new app you build. You can still override per-app.">
        <div className="kb-grid">
          <RadioPick label="Framework" value={stack} onChange={setStack} options={[
            { v: "react", l: "React + Vite" },
            { v: "next",  l: "Next.js" },
            { v: "vue",   l: "Vue 3" },
            { v: "svelte",l: "SvelteKit" },
            { v: "ai",    l: "Let AI decide" },
          ]}/>
          <RadioPick label="Styling" value={styleSystem} onChange={setStyleSystem} options={[
            { v: "tailwind", l: "Tailwind CSS" },
            { v: "modules",  l: "CSS Modules" },
            { v: "styled",   l: "Styled Components" },
            { v: "vanilla",  l: "Vanilla CSS" },
          ]}/>
          <RadioPick label="Layout density" value={density} onChange={setDensity} options={[
            { v: "compact",     l: "Compact" },
            { v: "comfortable", l: "Comfortable" },
            { v: "spacious",    l: "Spacious" },
          ]}/>
          <RadioPick label="File naming" value={naming} onChange={setNaming} options={[
            { v: "kebab",  l: "kebab-case" },
            { v: "camel",  l: "camelCase" },
            { v: "pascal", l: "PascalCase" },
          ]}/>
        </div>

        <div className="kb-toggles">
          <ToggleRow
            title="Accessibility first"
            sub="Generate keyboard-nav, ARIA labels, focus styles by default."
            initial={accessibility}
            onChange={setA11y}
          />
          <ToggleRow
            title="Explain code with comments"
            sub="Add intent comments on non-obvious blocks. Off if you want clean source."
            initial={comments}
            onChange={setComments}
          />
          <ToggleRow
            title="Scaffold tests with components"
            sub="Each new component gets a *.test.tsx skeleton."
            initial={tests}
            onChange={setTests}
          />
        </div>
      </Section>

      <Section title="Brand voice" subtitle="Used when AI writes copy, emails, or microcopy in any app.">
        <div className="kb-field">
          <label className="kb-label">Voice & tone</label>
          <textarea
            className="kb-textarea"
            rows={4}
            value={voice}
            onChange={(e) => setVoice(e.target.value)}
          />
          <div className="kb-hint">Tip: paste a few sentences in the voice you want. The AI will mirror that rhythm.</div>
        </div>
        <div className="kb-field">
          <label className="kb-label">Brand colors</label>
          <div className="kb-colors">
            {brandColors.split(",").map((c, i) => (
              <span key={i} className="kb-swatch" style={{ background: c.trim() }} title={c.trim()}/>
            ))}
            <input
              className="kb-color-input"
              value={brandColors}
              onChange={(e) => setBrandColors(e.target.value)}
            />
          </div>
        </div>
        <div className="kb-field">
          <label className="kb-label">Never-words & rules</label>
          <textarea
            className="kb-textarea"
            rows={4}
            value={forbidden}
            onChange={(e) => setForbidden(e.target.value)}
          />
          <div className="kb-hint">Bullet list of phrases or patterns you don't want the AI to use, ever.</div>
        </div>
      </Section>

      <Section title="Reference library" subtitle="Upload docs, paste URLs, or add custom skills the AI can pull from on any build.">
        <div className="knowledge-grid">
          {docs.map((k, i) => (
            <div key={i} className={"knowledge-card tone-" + k.color}>
              <div className="knowledge-ic">{k.type === "doc" ? <Ic.Templates/> : <Ic.Image/>}</div>
              <div className="knowledge-body">
                <div className="knowledge-name">{k.name}</div>
                <div className="knowledge-meta">
                  <span className="knowledge-type">{k.type}</span>
                  · {k.size} · used in {k.used} builds
                </div>
              </div>
              <button className="knowledge-menu" onClick={(e) => e.stopPropagation()}><Ic.Dots/></button>
            </div>
          ))}
          <button className="knowledge-add">
            <Ic.Plus/>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13.5 }}>Add to library</div>
              <div style={{ fontSize: 11.5, color: "var(--ink-3)" }}>Doc, URL, image, or custom skill</div>
            </div>
          </button>
        </div>
      </Section>
    </div>
  );
}

function RadioPick({ label, value, onChange, options }) {
  return (
    <div className="kb-pick">
      <div className="kb-pick-label">{label}</div>
      <div className="kb-pick-options">
        {options.map((o) => (
          <button
            key={o.v}
            className={"kb-pick-opt" + (value === o.v ? " active" : "")}
            onClick={() => onChange(o.v)}
          >
            {o.l}
          </button>
        ))}
      </div>
    </div>
  );
}

function ToggleRow({ title, sub, initial, onChange }) {
  const [on, setOn] = useState(initial);
  return (
    <div className="kb-toggle-row">
      <div>
        <div className="kb-toggle-title">{title}</div>
        <div className="kb-toggle-sub">{sub}</div>
      </div>
      <button
        className={"settings-toggle" + (on ? " on" : "")}
        onClick={() => { setOn(!on); onChange && onChange(!on); }}
        aria-pressed={on}
      >
        <span className="settings-toggle-knob"/>
      </button>
    </div>
  );
}
