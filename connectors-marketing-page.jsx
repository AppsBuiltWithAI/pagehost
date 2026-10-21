/* global React, PoofPart1 */
const { Reveal, ArrowRight, Check } = window.PoofPart1;
const { useState: useCnState, useMemo: useCnMemo } = React;

/* ============= CONNECTORS — marketing ============= */

const CONNECTORS_MK = [
  // Payments
  { id: "stripe",   name: "Stripe",       cat: "Payments",      color: "#635BFF", letter: "S", featured: true,  desc: "Take payments, manage subscriptions, payout to your bank." },
  { id: "square",   name: "Square",       cat: "Payments",      color: "#3E4348", letter: "□", desc: "In-store reader & online orders, unified." },
  { id: "paypal",   name: "PayPal",       cat: "Payments",      color: "#003087", letter: "P", desc: "PayPal Checkout in one click." },
  // Email
  { id: "gmail",    name: "Gmail",        cat: "Email",         color: "#EA4335", letter: "M", featured: true, desc: "Send transactional mail from your own address." },
  { id: "resend",   name: "Resend",       cat: "Email",         color: "#000000", letter: "R", desc: "Modern transactional email." },
  { id: "postmark", name: "Postmark",     cat: "Email",         color: "#FFDE00", letter: "P", desc: "Receipts & alerts that always land." },
  // Storage
  { id: "drive",    name: "Google Drive", cat: "Storage",       color: "#1FA463", letter: "D", desc: "Read files, write exports, sync uploads." },
  { id: "dropbox",  name: "Dropbox",      cat: "Storage",       color: "#0061FF", letter: "D", desc: "Per-app folders with shared links." },
  { id: "s3",       name: "Amazon S3",    cat: "Storage",       color: "#FF9900", letter: "S", desc: "Your own bucket, your own region." },
  // Database
  { id: "airtable", name: "Airtable",     cat: "Database",      color: "#FCB400", letter: "A", desc: "Use a base as your app's backbone — no SQL." },
  { id: "supabase", name: "Supabase",     cat: "Database",      color: "#3ECF8E", letter: "S", featured: true, desc: "Postgres, auth, storage. Your data." },
  { id: "notion",   name: "Notion",       cat: "Database",      color: "#000000", letter: "N", desc: "Pull pages as content, push forms to a DB." },
  // Notifications
  { id: "slack",    name: "Slack",        cat: "Notifications", color: "#4A154B", letter: "#", desc: "Get pinged in any channel when something fires." },
  { id: "discord",  name: "Discord",      cat: "Notifications", color: "#5865F2", letter: "D", desc: "Pipe events into your community channel." },
  { id: "twilio",   name: "Twilio SMS",   cat: "Notifications", color: "#F22F46", letter: "T", desc: "Confirmations, reminders, 2FA codes." },
  // Scheduling
  { id: "calendly", name: "Calendly",     cat: "Scheduling",    color: "#0069FF", letter: "C", desc: "Embed slots, write bookings back as orders." },
  { id: "cal",      name: "Cal.com",      cat: "Scheduling",    color: "#000000", letter: "c", desc: "Open-source scheduling, embedded." },
  // AI
  { id: "openai",   name: "OpenAI",       cat: "AI",            color: "#10A37F", letter: "AI", desc: "Plug GPT into your build — chat, summarize, classify." },
  { id: "anthropic",name: "Anthropic",    cat: "AI",            color: "#D97757", letter: "C", featured: true, desc: "Use Claude for reasoning, drafting, agents." },
  { id: "elevenlabs",name:"ElevenLabs",   cat: "AI",            color: "#000000", letter: "E", desc: "Voice generation in 32 languages." },
  // Automation
  { id: "zapier",   name: "Zapier",       cat: "Automation",    color: "#FF4F00", letter: "Z", desc: "Trigger or fire any of 7,000+ Zapier integrations." },
  { id: "make",     name: "Make",         cat: "Automation",    color: "#6D00CC", letter: "M", desc: "Visual scenarios for multi-step workflows." },
  // Storefront
  { id: "shopify",  name: "Shopify",      cat: "Storefront",    color: "#7AB55C", letter: "S", desc: "Sync products & inventory from your store." },
  { id: "etsy",     name: "Etsy",         cat: "Storefront",    color: "#F1641E", letter: "E", desc: "Pull your listings, sell on your own site." },
  // Dev
  { id: "github",   name: "GitHub",       cat: "Dev",           color: "#181717", letter: "Gh", desc: "Export to a repo. Versioning for free." },
  { id: "linear",   name: "Linear",       cat: "Dev",           color: "#5E6AD2", letter: "L", desc: "Issues become app feedback. Errors become issues." },
  { id: "sentry",   name: "Sentry",       cat: "Dev",           color: "#362D59", letter: "S", desc: "Catch errors before your visitors do." },
];

const CN_CATEGORIES = ["All", "Payments", "Email", "Storage", "Database", "Notifications", "Scheduling", "AI", "Automation", "Storefront", "Dev"];

function ConnectorsMarketingPage() {
  const [cat, setCat] = useCnState("All");

  const list = useCnMemo(() => {
    return cat === "All" ? CONNECTORS_MK : CONNECTORS_MK.filter(c => c.cat === cat);
  }, [cat]);

  return (
    <main className="brand-page connectors-page">
      <section className="sub-hero" data-screen-label="connectors-hero">
        <div className="wrap-tight">
          <Reveal>
            <div className="eyebrow">Connectors</div>
            <h1 className="serif">Plug into the tools <em>you already pay for.</em></h1>
            <p className="sub-lead">
              Stripe for money. Gmail for mail. Notion for docs. Twilio for
              texts. We wire them up once — every app you build can use
              them.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="sub-meta">
              <span>27+ connectors</span>
              <span className="dot"/>
              <span>OAuth in 6 seconds</span>
              <span className="dot"/>
              <span>No-code config</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured strip */}
      <section className="pad">
        <div className="wrap-tight">
          <Reveal className="sec-head">
            <div className="eyebrow">Most loved</div>
            <h2 className="serif">The ones we hook up first.</h2>
          </Reveal>
          <div className="cn-featured">
            {CONNECTORS_MK.filter(c => c.featured).map((c, i) => (
              <Reveal key={c.id} delay={i * 60}>
                <div className="cn-featured-card">
                  <div className="cn-featured-logo" style={{ background: c.color }}>{c.letter}</div>
                  <div className="cn-featured-body">
                    <div className="cn-featured-cat">{c.cat}</div>
                    <h3>{c.name}</h3>
                    <p>{c.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Full list */}
      <section className="pad pt-0">
        <div className="wrap">
          <Reveal>
            <div className="cn-cat-row">
              {CN_CATEGORIES.map(c => (
                <button key={c} className={"cn-cat-pill" + (cat === c ? " active" : "")} onClick={() => setCat(c)}>
                  {c}
                  <span className="count">{c === "All" ? CONNECTORS_MK.length : CONNECTORS_MK.filter(x => x.cat === c).length}</span>
                </button>
              ))}
            </div>
          </Reveal>

          <div className="cn-grid">
            {list.map((c, i) => (
              <Reveal key={c.id} delay={Math.min(i, 8) * 20}>
                <div className="cn-card">
                  <div className="cn-card-logo" style={{ background: c.color }}>{c.letter}</div>
                  <div className="cn-card-body">
                    <div className="cn-card-name">{c.name}</div>
                    <div className="cn-card-cat">{c.cat}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How */}
      <section className="pad pt-0">
        <div className="wrap-tight">
          <Reveal className="sec-head">
            <div className="eyebrow">How they work</div>
            <h2 className="serif">Add once. <em>Use everywhere.</em></h2>
          </Reveal>
          <div className="cn-how">
            <Reveal>
              <div className="cn-how-step">
                <div className="cn-how-num">1</div>
                <h3>Connect with OAuth</h3>
                <p>Click "Connect," authorize in the popup, done. Six seconds, no API keys to paste.</p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="cn-how-step">
                <div className="cn-how-num">2</div>
                <h3>Say what you want</h3>
                <p>"Send a Slack message when an order comes in." The builder wires it up — no config screens.</p>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div className="cn-how-step">
                <div className="cn-how-num">3</div>
                <h3>Reuse across apps</h3>
                <p>Connected once at the workspace level. Every new app you build can use the same connector.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pad cn-cta">
        <div className="wrap-tight" style={{ textAlign: "center" }}>
          <Reveal>
            <h2 className="serif">Don't see what you need?</h2>
            <p style={{ fontSize: 17, color: "var(--ink-2)", maxWidth: "48ch", margin: "16px auto 32px" }}>
              Zapier and Make cover 7,000 more integrations. And we'll
              custom-build anything else — usually within a week.
            </p>
            <div style={{ display: "inline-flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
              <a className="btn btn-coral btn-lg" href="signup.html">Start free <ArrowRight/></a>
              <a className="btn btn-outline btn-lg" href="#">Request a connector</a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

window.ConnectorsMarketingPage = ConnectorsMarketingPage;
