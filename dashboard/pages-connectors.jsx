/* global React, PoofD */
const { useState, Ic } = PoofD;

/* ============= CONNECTORS — wire other apps into your builds ============= */

const ALL_CONNECTORS = [
  // ---------- Connected ----------
  { id: "stripe",   name: "Stripe",          cat: "Payments",      desc: "Take payments, manage subscriptions, payout to your bank.", connected: true,  account: "acct_1Nu3…7F", since: "Apr 12, 2026", color: "#635BFF", letter: "S", featured: true },
  { id: "gmail",    name: "Gmail",           cat: "Email",         desc: "Send transactional mail from your address. SPF & DKIM auto-set.", connected: true,  account: "mei@crumbandco.com", since: "Apr 12, 2026", color: "#EA4335", letter: "M" },
  { id: "drive",    name: "Google Drive",    cat: "Storage",       desc: "Read files, write exports, sync uploads to a Drive folder.", connected: true,  account: "Crumb & Co. workspace", since: "Apr 19, 2026", color: "#1FA463", letter: "D" },
  { id: "calendly", name: "Calendly",        cat: "Scheduling",    desc: "Embed available time slots, write bookings back as orders.", connected: true,  account: "mei.chen", since: "May 02, 2026", color: "#0069FF", letter: "C" },

  // ---------- Available ----------
  { id: "slack",    name: "Slack",           cat: "Notifications", desc: "Get pinged in any channel when an app event fires.",            connected: false, color: "#4A154B", letter: "#" },
  { id: "notion",   name: "Notion",          cat: "Storage",       desc: "Pull pages as content, push form submissions to a database.",  connected: false, color: "#000000", letter: "N" },
  { id: "airtable", name: "Airtable",        cat: "Database",      desc: "Use a base as the data backbone for your app — no SQL.",         connected: false, color: "#FCB400", letter: "A" },
  { id: "supabase", name: "Supabase",        cat: "Database",      desc: "Postgres, auth, storage. Your data, in your project.",          connected: false, color: "#3ECF8E", letter: "S" },
  { id: "openai",   name: "OpenAI",          cat: "AI",            desc: "Plug GPT into your build — chat, summarize, classify.",         connected: false, color: "#10A37F", letter: "AI" },
  { id: "anthropic",name: "Anthropic Claude",cat: "AI",            desc: "Use Claude for longer-form reasoning, drafting, agents.",        connected: false, color: "#D97757", letter: "C" },
  { id: "twilio",   name: "Twilio",          cat: "Notifications", desc: "Send SMS confirmations, reminders, two-factor codes.",          connected: false, color: "#F22F46", letter: "T" },
  { id: "resend",   name: "Resend",          cat: "Email",         desc: "Modern transactional email — beautiful by default.",            connected: false, color: "#000000", letter: "R" },
  { id: "shopify",  name: "Shopify",         cat: "Storefront",    desc: "Sync products & inventory from your existing store.",            connected: false, color: "#7AB55C", letter: "S" },
  { id: "square",   name: "Square",          cat: "Payments",      desc: "Use your in-store Square reader for online orders.",            connected: false, color: "#3E4348", letter: "□" },
  { id: "intercom", name: "Intercom",        cat: "Support",       desc: "Drop a chat widget tied to your customer data.",                connected: false, color: "#1F8DED", letter: "I" },
  { id: "github",   name: "GitHub",          cat: "Dev",           desc: "Export your build to a repo, get versioning for free.",         connected: false, color: "#181717", letter: "Gh" },
  { id: "linear",   name: "Linear",          cat: "Dev",           desc: "Issues become app feedback. App errors become issues.",         connected: false, color: "#5E6AD2", letter: "L" },
  { id: "zapier",   name: "Zapier",          cat: "Automation",    desc: "Trigger or fire any of 7,000+ Zapier integrations.",            connected: false, color: "#FF4F00", letter: "Z" },
  { id: "make",     name: "Make",            cat: "Automation",    desc: "Visual scenarios for the gnarly multi-step workflows.",         connected: false, color: "#6D00CC", letter: "M" },
  { id: "discord",  name: "Discord",         cat: "Notifications", desc: "Pipe app events into a channel for your community.",            connected: false, color: "#5865F2", letter: "D" },
];

const CATEGORIES = [
  "All",
  "Payments",
  "Email",
  "Storage",
  "Database",
  "Notifications",
  "Scheduling",
  "AI",
  "Automation",
  "Dev",
  "Storefront",
  "Support",
];

function ConnectorsPage() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [pendingId, setPendingId] = useState(null);
  const [conns, setConns] = useState(ALL_CONNECTORS);

  const list = conns.filter((c) => {
    const cF = cat === "All" || c.cat === cat;
    const qF = !q || c.name.toLowerCase().includes(q.toLowerCase()) || c.cat.toLowerCase().includes(q.toLowerCase());
    return cF && qF;
  });

  const connected = list.filter(c => c.connected);
  const available = list.filter(c => !c.connected);

  const counts = {
    total: conns.length,
    connected: conns.filter(c => c.connected).length,
    events: 1284,
    last: "12 min ago",
  };

  const connect = (id) => {
    setPendingId(id);
    setTimeout(() => {
      setConns(prev => prev.map(c => c.id === id ? { ...c, connected: true, account: "Connected via OAuth", since: "Just now" } : c));
      setPendingId(null);
    }, 900);
  };
  const disconnect = (id) => {
    setConns(prev => prev.map(c => c.id === id ? { ...c, connected: false, account: undefined, since: undefined } : c));
  };

  return (
    <div className="page page-connectors" data-screen-label="connectors">
      <div className="page-head">
        <div>
          <h1>Connectors</h1>
          <div className="sub">Wire your apps into the tools you already use. Add a connector once — every build can use it.</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-outline"><Ic.ExtLink/> Browse marketplace</button>
          <button className="btn btn-coral"><Ic.Plus/> Request a connector</button>
        </div>
      </div>

      {/* Summary stats */}
      <div className="conn-stats">
        <div className="conn-stat">
          <div className="conn-stat-num">{counts.connected}</div>
          <div className="conn-stat-lbl">Connected</div>
        </div>
        <div className="conn-stat">
          <div className="conn-stat-num">{counts.total}</div>
          <div className="conn-stat-lbl">Available</div>
        </div>
        <div className="conn-stat">
          <div className="conn-stat-num">{counts.events.toLocaleString()}</div>
          <div className="conn-stat-lbl">Events this month</div>
        </div>
        <div className="conn-stat">
          <div className="conn-stat-num">{counts.last}</div>
          <div className="conn-stat-lbl">Last sync</div>
        </div>
      </div>

      {/* Filters */}
      <div className="conn-filter-row">
        <div className="conn-chips">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={"chip" + (cat === c ? " active" : "")}
              onClick={() => setCat(c)}
            >
              {c}
              <span className="count">{c === "All" ? conns.length : conns.filter(x => x.cat === c).length}</span>
            </button>
          ))}
        </div>
        <div className="conn-search">
          <Ic.Search/>
          <input
            placeholder="Search connectors…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      </div>

      {/* Connected section */}
      {connected.length > 0 && (
        <div className="conn-section">
          <div className="conn-section-head">
            <h2>Connected <span className="conn-count">{connected.length}</span></h2>
            <span className="conn-section-sub">Already linked to this workspace.</span>
          </div>
          <div className="conn-grid">
            {connected.map((c) => (
              <ConnectorCard key={c.id} c={c} pending={pendingId === c.id} onDisconnect={() => disconnect(c.id)}/>
            ))}
          </div>
        </div>
      )}

      {/* Available section */}
      {available.length > 0 && (
        <div className="conn-section">
          <div className="conn-section-head">
            <h2>Available <span className="conn-count">{available.length}</span></h2>
            <span className="conn-section-sub">Tap connect to authorize via OAuth or paste an API key.</span>
          </div>
          <div className="conn-grid">
            {available.map((c) => (
              <ConnectorCard key={c.id} c={c} pending={pendingId === c.id} onConnect={() => connect(c.id)}/>
            ))}
          </div>
        </div>
      )}

      {list.length === 0 && (
        <div className="empty" style={{ margin: "40px auto" }}>
          <div className="empty-icon"><Ic.Search/></div>
          <h3>No connector matches "{q || cat}"</h3>
          <p>Don't see what you need? Use Zapier or request a custom connector.</p>
        </div>
      )}
    </div>
  );
}

function ConnectorCard({ c, pending, onConnect, onDisconnect }) {
  return (
    <div className={"conn-card" + (c.connected ? " is-connected" : "")}>
      <div className="conn-card-head">
        <div className="conn-logo" style={{ background: c.color }}>
          <span>{c.letter}</span>
        </div>
        <div className="conn-card-meta">
          <div className="conn-card-name">{c.name}</div>
          <div className="conn-card-cat">{c.cat}</div>
        </div>
        {c.connected && <span className="conn-pill ok"><span className="dot"/> Connected</span>}
      </div>
      <div className="conn-card-desc">{c.desc}</div>

      {c.connected ? (
        <div className="conn-card-status">
          <div className="conn-card-status-line">
            <Ic.Users/> <span>{c.account}</span>
          </div>
          <div className="conn-card-status-line">
            <Ic.Clock/> <span>Linked {c.since}</span>
          </div>
        </div>
      ) : (
        <div className="conn-card-spacer"/>
      )}

      <div className="conn-card-actions">
        {c.connected ? (
          <>
            <button className="btn btn-outline btn-sm">Configure</button>
            <button className="btn btn-ghost btn-sm conn-disconnect" onClick={onDisconnect}>Disconnect</button>
          </>
        ) : (
          <button className="btn btn-ink btn-sm conn-connect" onClick={onConnect} disabled={pending}>
            {pending ? "Connecting…" : <>Connect <Ic.ArrowR/></>}
          </button>
        )}
      </div>
    </div>
  );
}

window.PoofD_Connectors = { ConnectorsPage };
