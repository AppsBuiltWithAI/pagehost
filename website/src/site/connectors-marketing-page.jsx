import React, { useState as useCnState, useMemo as useCnMemo } from 'react';
import { Reveal, ArrowRight, Check } from './part1.jsx';
/* ============= CONNECTORS: marketing ============= */

const CONNECTORS_MK = [
  // Payments
  { id: "stripe", name: "Stripe", cat: "Payments", color: "#635BFF", letter: "S", featured: true, desc: "Take payments, manage subscriptions, payout to your bank." },
  { id: "paypal", name: "PayPal", cat: "Payments", color: "#003087", letter: "P", desc: "PayPal Checkout in one click." },
  // Email
  { id: "gmail", name: "Gmail", cat: "Email", color: "#EA4335", letter: "M", featured: true, desc: "Send transactional mail from your own address." },
  { id: "resend", name: "Resend", cat: "Email", color: "#000000", letter: "R", desc: "Modern transactional email." },
  // Storage
  { id: "drive", name: "Google Drive", cat: "Storage", color: "#1FA463", letter: "D", desc: "Read files, write exports, sync uploads." },
  { id: "dropbox", name: "Dropbox", cat: "Storage", color: "#0061FF", letter: "D", desc: "Per-app folders with shared links." },
  // Database
  { id: "supabase", name: "Supabase", cat: "Database", color: "#3ECF8E", letter: "S", featured: true, desc: "Postgres, auth, storage. Your data." },
  { id: "notion", name: "Notion", cat: "Database", color: "#000000", letter: "N", desc: "Pull pages as content, push forms to a DB." },
  // Notifications
  { id: "slack", name: "Slack", cat: "Notifications", color: "#4A154B", letter: "#", desc: "Get pinged in any channel when something fires." },
  { id: "twilio", name: "Twilio SMS", cat: "Notifications", color: "#F22F46", letter: "T", desc: "Confirmations, reminders, 2FA codes." },
  // Scheduling
  { id: "calendly", name: "Calendly", cat: "Scheduling", color: "#0069FF", letter: "C", desc: "Embed slots, write bookings back as orders." },
  // AI
  { id: "openai", name: "OpenAI", cat: "AI", color: "#10A37F", letter: "AI", desc: "Plug GPT into your build: chat, summarize, classify." },
  { id: "anthropic",name: "Anthropic", cat: "AI", color: "#D97757", letter: "C", featured: true, desc: "Use Claude for reasoning, drafting, agents." },
  { id: "elevenlabs",name:"ElevenLabs", cat: "AI", color: "#000000", letter: "E", desc: "Voice generation in 32 languages." },
  // Automation
  { id: "zapier", name: "Zapier", cat: "Automation", color: "#FF4F00", letter: "Z", desc: "Trigger Zapier workflows from your app, or start your app from one." },
  { id: "make", name: "Make", cat: "Automation", color: "#6D00CC", letter: "M", desc: "Visual scenarios for multi-step workflows." },
  // Dev
  { id: "github", name: "GitHub", cat: "Dev", color: "#181717", letter: "Gh", desc: "Export to a repo. Versioning for free." },
  { id: "linear", name: "Linear", cat: "Dev", color: "#5E6AD2", letter: "L", desc: "Issues become app feedback. Errors become issues." },
  { id: "sentry", name: "Sentry", cat: "Dev", color: "#362D59", letter: "S", desc: "Catch errors before your visitors do." },
];

const CN_SLUG = {"stripe":"stripe","square":"square","paypal":"paypal","gmail":"gmail","resend":"resend","postmark":"postmark","drive":"googledrive","dropbox":"dropbox","s3":"amazons3","airtable":"airtable","supabase":"supabase","notion":"notion","slack":"slack","discord":"discord","twilio":"twilio","calendly":"calendly","cal":"caldotcom","openai":"openai","anthropic":"anthropic","elevenlabs":"elevenlabs","zapier":"zapier","make":"make","shopify":"shopify","etsy":"etsy","github":"github","linear":"linear","sentry":"sentry"};
const CN_FAVICON = { postmark: "postmarkapp.com", s3: "aws.amazon.com", slack: "slack.com", twilio: "twilio.com", openai: "openai.com" };
function CnLogo({ c, className }) {
  const [err, setErr] = useCnState(false);
  const fav = CN_FAVICON[c.id];
  const s = CN_SLUG[c.id];
  const src = fav ? "https://www.google.com/s2/favicons?domain=" + fav + "&sz=128" : s ? "https://cdn.simpleicons.org/" + s : null;
  if (err || !src) return <div className={className} style={{ background: c.color }}>{c.letter}</div>;
  return <div className={className + " has-logo"}><img src={src} alt={c.name + " logo"} onError={() => setErr(true)}/></div>;
}

const CN_CATEGORIES = ["All", "Payments", "Email", "Storage", "Database", "Notifications", "Scheduling", "AI", "Automation", "Dev"];

function ConnectorsMarketingPage() {
  const [cat, setCat] = useCnState("All");

  const list = useCnMemo(() => {
    return cat === "All" ? CONNECTORS_MK : CONNECTORS_MK.filter(c => c.cat === cat);
  }, [cat]);

  return (
    <>
      <section className="cn2-hero" data-screen-label="connectors-hero">
        <div className="wrap-tight">
          <Reveal>
            <div className="eyebrow">Connectors</div>
            <h1 className="serif">Plug into the tools <em>you already pay for.</em></h1>
            <p className="sub-lead">
              Stripe for money. Gmail for mail. Notion for docs. Twilio for
              texts. We wire them up once: every app you build can use
              them.
            </p>
          </Reveal>
        </div>
        <Reveal delay={120}>
          <div className="cn2-marquee" aria-hidden="true">
            <div className="cn2-marquee-track">
              {[...CONNECTORS_MK, ...CONNECTORS_MK].map((c, i) => (
                <span key={i} className="cn2-chip"><CnLogo c={c} className="cn2-chip-logo"/>{c.name}</span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Full list */}
      <section className="pad cn2-list-sec">
        <div className="wrap">
          <div className="cn2-list-head">
            <div>
              <div className="eyebrow">Every connector</div>
              <h2 className="serif">Pick a tool. <em>Click connect.</em></h2>
            </div>
            <div className="cn2-cats" role="tablist">
              {CN_CATEGORIES.map(c => (
                <button key={c} role="tab" aria-selected={cat === c} className={"cn2-cat" + (cat === c ? " on" : "")} onClick={() => setCat(c)}>
                  {c}<i>{c === "All" ? CONNECTORS_MK.length : CONNECTORS_MK.filter(x => x.cat === c).length}</i>
                </button>
              ))}
            </div>
          </div>

          <div className="cn2-grid">
            {list.map((c) => (
              <a key={c.id} className="cn2-card" href="/signup" aria-label={"Connect " + c.name} style={{ "--brand": c.color }}>
                <div className="cn2-card-top">
                  <CnLogo c={c} className="cn2-logo"/>
                  <span className="cn2-tag">{c.cat}</span>
                </div>
                <h3>{c.name}</h3>
                <p>{c.desc}</p>
                <span className="cn2-connect">Connect <ArrowRight/></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pad cn-cta2-sec">
        <div className="wrap">
          <Reveal>
            <div className="cn-cta2">
              <div className="cn-cta2-copy">
                <div className="eyebrow">Get connected</div>
                <h2 className="serif">Connect once. <em>Use it in every app.</em></h2>
                <p>Create a free account, connect the tools you already use, and tell the builder what should happen. It handles the setup.</p>
                <ul className="cn-cta2-list">
                  <li><Check/><span>Sign in to each tool with one click</span></li>
                  <li><Check/><span>Shared across every app in your workspace</span></li>
                  <li><Check/><span>Disconnect any time</span></li>
                </ul>
                <div className="cn-cta2-actions">
                  <a className="btn btn-coral btn-lg" href="/signup">Start free <ArrowRight/></a>
                  <span className="cn-cta2-note">No card needed</span>
                </div>
              </div>
              <div className="cn-cta2-art" aria-hidden="true">
                <svg className="cn-cta2-lines" viewBox="0 0 300 300" preserveAspectRatio="none">
                  {[[50,50],[150,30],[250,50],[30,150],[270,150],[50,250],[150,270],[250,250]].map(([x, y], i) => <line key={i} x1="150" y1="150" x2={x} y2={y}/>)}
                </svg>
                <div className="cn-cta2-grid">
                  {["stripe", "gmail", "slack", "notion", null, "supabase", "calendly", "zapier", "github"].map((id, i) => {
                    if (!id) return <div key="hub" className="cn-cta2-hub"><img src="/site/assets/logo-mark.png" alt=""/></div>;
                    const c = CONNECTORS_MK.find((x) => x.id === id);
                    return c ? <div key={id} className="cn-cta2-tile" style={{ animationDelay: (i * 0.35) + "s" }}><CnLogo c={c} className="cn-cta2-logo"/><span>{c.name}</span></div> : <div key={id}></div>;
                  })}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}


export default ConnectorsMarketingPage;
