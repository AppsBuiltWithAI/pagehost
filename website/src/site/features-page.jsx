import React from 'react';
import { Reveal, ArrowRight } from './part1.jsx';
const FT_IC = {
  chat: "M4 5h16v11H9l-5 4z",
  bolt: "M13 3L5 13h6l-1 8 8-10h-6z",
  phone: "M8 3h8a1 1 0 011 1v16a1 1 0 01-1 1H8a1 1 0 01-1-1V4a1 1 0 011-1zM11 18h2",
  globe: "M12 21a9 9 0 100-18 9 9 0 000 18zM3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z",
  card: "M3 6h18v12H3zM3 10h18M7 15h4",
  plug: "M9 3v5M15 3v5M6 8h12v3a6 6 0 01-12 0zM12 17v4",
  chart: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  check: "M9 11l3 3 8-8M20 12v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1h11",
};
function FtIc({ n }) { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={FT_IC[n]}/></svg>; }

const FT_GROUPS = [
  { n: "01", t: "Build", d: "Describe it, change it, see it live.", tone: "coral", items: [
    { ic: "chat", t: "Chat to build", d: "Describe what you want in plain English and watch it become a working app. Every change after that is one more sentence.", lead: true, prompts: ["Make the header pink", "Add a booking form", "Undo that"] },
    { ic: "bolt", t: "Instant edit", d: "Click any part of your app and say what to change. Edits land in seconds, with no redeploys." },
    { ic: "phone", t: "Mobile first", d: "Every app is designed for phones first: thumb-sized buttons, fast loads, and installable to the home screen." },
  ]},
  { n: "02", t: "Launch", d: "Put it online and connect your tools.", tone: "sky", items: [
    { ic: "globe", t: "Custom domains", d: "Put your app on your own domain. SSL is set up for you. Connect one you own, or register one in the app." },
    { ic: "plug", t: "Connectors", d: "Gmail, Google Sheets, Slack, Notion and more. Your app works with the tools you already use.", link: ["See all connectors", "/connectors"] },
    { ic: "card", t: "Take payments with Stripe", d: "Connect your own Stripe account and ask for checkout or a subscription in plain English. Customers pay you directly through Stripe.", note: "Needs a Stripe account" },
  ]},
  { n: "03", t: "Grow", d: "Know what's working and catch what's broken.", tone: "mint", items: [
    { ic: "chart", t: "Analytics", d: "Visitors, signups and conversion on one screen, with a daily summary of what changed." },
    { ic: "check", t: "Testing agent", d: "An agent walks through your app every morning and flags anything broken before your customers find it." },
  ]},
];

function FeaturesPage() {
  return (
    <main data-screen-label="features">
      <section className="ft-hero" data-screen-label="features-hero">
        <div className="wrap">
          <Reveal className="ft-head">
            <div className="eyebrow">Features</div>
            <h1>Everything you need <em className="serif">to launch an app you can sell.</em></h1>
            <p>Every plan includes the full toolkit. You describe the app, and the platform handles the setup.</p>
          </Reveal>
          <Reveal delay={80}>
            <nav className="ft-jump" aria-label="Feature groups">
              {FT_GROUPS.map((g) => <a key={g.n} className={"ft-jump-a tone-" + g.tone} href={"#ft-" + g.n}><span>{g.n}</span>{g.t}</a>)}
            </nav>
          </Reveal>
        </div>
      </section>

      {FT_GROUPS.map((g) => (
        <section key={g.n} id={"ft-" + g.n} className={"ft-group tone-" + g.tone} data-screen-label={"features-" + g.t.toLowerCase()}>
          <div className="wrap ft-group-in">
            <Reveal className="ft-group-head">
              <span className="ft-group-n">{g.n}</span>
              <h2>{g.t}</h2>
              <p>{g.d}</p>
            </Reveal>
            <div className={"ft-cards ft-cards-" + g.items.length}>
              {g.items.map((f, i) => (
                <Reveal key={f.t} delay={i * 50} className={f.lead ? "ft-lead-wrap" : ""}>
                  <article className={"ft-card" + (f.lead ? " ft-lead" : "")}>
                    <span className="ft-icon"><FtIc n={f.ic}/></span>
                    <div className="ft-body">
                      <h3>{f.t}</h3>
                      <p>{f.d}</p>
                      {f.prompts && <div className="ft-prompts">{f.prompts.map((p) => <span key={p} className="ft-prompt">"{p}"</span>)}</div>}
                      {f.note && <span className="ft-note">{f.note}</span>}
                      {f.link && <a className="ft-link" href={f.link[1]}>{f.link[0]} <ArrowRight/></a>}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="pad ft-final" data-screen-label="features-cta">
        <div className="wrap-tight">
          <Reveal>
            <div className="ft-final-card">
              <h2>See it all in one build.</h2>
              <p>Describe an app and watch it come together. Start free, no card needed.</p>
              <div className="ft-final-row">
                <a className="btn btn-coral ft-final-btn" href="/signup">Start building free <ArrowRight/></a>
                <a className="btn btn-outline ft-final-btn ft-final-ghost" href="/how-it-works">How it works</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}


export default FeaturesPage;
