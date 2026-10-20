import React from 'react';
import { Reveal, ArrowRight, Check } from './part1.jsx';
/* ============= SUMMIT ============= */

const SPEAKERS = [
  { name: "Mei Chen", role: "Co-founder & CEO, AppsBuiltWithAI", talk: "The year we stopped pretending coding was the bottleneck", color: "warm", initials: "MC" },
  { name: "Devon Park", role: "Co-founder & CTO, AppsBuiltWithAI", talk: "Editor agents that don't lie to you", color: "plum", initials: "DP" },
  { name: "Sarah Lin", role: "Head of Design, AppsBuiltWithAI", talk: "Design systems for builders who don't design", color: "rose", initials: "SL" },
  { name: "Dr. Anya Patel", role: "Research lead, Anthropic", talk: "What gets harder, not easier, with smarter models", color: "sky", initials: "AP" },
  { name: "Marcus Webb", role: "Founder, Webb &amp; Co. (Certified Expert)", talk: "How I turned AI app work into 40% of my agency revenue", color: "mint", initials: "MW" },
  { name: "Rachel Moreno", role: "Owner, Crumb & Co.", talk: "The bakery that became the case study", color: "sun", initials: "RM" },
];

const AGENDA_DAY1 = [
  { time: "09:00", title: "Doors open · breakfast & badges", by: "", kind: "break" },
  { time: "09:30", title: "Welcome", by: "Mei Chen", kind: "talk" },
  { time: "10:00", title: "The year we stopped pretending coding was the bottleneck", by: "Mei Chen", kind: "keynote" },
  { time: "11:00", title: "Editor agents that don't lie to you", by: "Devon Park", kind: "talk" },
  { time: "12:00", title: "Lunch & 1:1 office hours", by: "", kind: "break" },
  { time: "13:30", title: "Live build-off · audience picks the brief", by: "Audience + Devon", kind: "workshop" },
  { time: "15:00", title: "Design systems for builders who don't design", by: "Sarah Lin", kind: "talk" },
  { time: "16:00", title: "Panel: building for non-builders", by: "Mei, Rachel, Marcus, Dani", kind: "panel" },
  { time: "17:30", title: "Cocktails on the roof", by: "", kind: "break" },
  { time: "19:30", title: "Founders dinner (Pro+ ticket)", by: "", kind: "social" },
];

const AGENDA_DAY2 = [
  { time: "09:00", title: "Yoga + coffee (optional, blessedly)", by: "", kind: "break" },
  { time: "10:00", title: "What gets harder, not easier, with smarter models", by: "Dr. Anya Patel", kind: "keynote" },
  { time: "11:00", title: "The bakery that became the case study", by: "Rachel Moreno", kind: "talk" },
  { time: "12:00", title: "Lunch + connector clinic", by: "", kind: "break" },
  { time: "13:30", title: "How I turned AI work into 40% of agency revenue", by: "Marcus Webb", kind: "talk" },
  { time: "14:30", title: "Workshop: your roadmap, in public", by: "Mei + product team", kind: "workshop" },
  { time: "16:00", title: "Awards & closing", by: "Mei Chen", kind: "talk" },
];

const TIERS = [
  {
    name: "Stream",
    sub: "From anywhere",
    price: 0,
    perks: [
      "Live stream of every talk",
      "Public Discord channel during the event",
      "Recordings within 7 days",
      "Slides & code samples",
    ],
    cta: "Get free pass",
    btn: "btn-outline",
  },
  {
    name: "In-person",
    sub: "Two days in SF",
    price: 299,
    perks: [
      "Two-day pass (May 14 to 15)",
      "All talks, workshops, and panels",
      "Breakfast, lunch, two coffee breaks",
      "Cocktails on the roof, day one",
      "Conference-branded notebook & tee",
    ],
    cta: "Buy ticket",
    btn: "btn-coral",
    featured: true,
    tag: "MOST POPULAR",
  },
  {
    name: "Pro",
    sub: "VIP track",
    price: 799,
    perks: [
      "Everything in In-person",
      "Founders dinner on Wednesday night",
      "1:1 office hours with our team",
      "Priority front-row seating",
      "Annual Pro plan credit ($228)",
      "Exclusive Pro lounge with espresso bar",
    ],
    cta: "Go Pro",
    btn: "btn-outline",
  },
];

const KIND_LABEL = { talk: "Talk", keynote: "Keynote", panel: "Panel", workshop: "Workshop", break: "Break", social: "Social" };

function SummitPage() {
  return (
    <>
      {/* Hero: gradient with date strip */}
      <section className="summit-hero" data-screen-label="summit-hero">
        <div className="summit-hero-bloom"/>
        <div className="wrap-tight" style={{ position: "relative", zIndex: 1 }}>
          <Reveal>
            <div className="summit-hero-eyebrow">Summit 2026</div>
            <h1 className="summit-hero-h">
              <em>Two days.</em><br/>
              One room of people<br/>
              building the future <em>without code.</em>
            </h1>
            <p className="summit-hero-sub">
              The annual gathering for makers, founders, agencies, and the
              curious: where the AppsBuiltWithAI community meets in person.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="summit-hero-meta">
              <div className="summit-hero-meta-item">
                <div className="summit-hero-meta-label">When</div>
                <div className="summit-hero-meta-val">May 14 to 15, 2026</div>
              </div>
              <div className="summit-hero-meta-item">
                <div className="summit-hero-meta-label">Where</div>
                <div className="summit-hero-meta-val">SOMA, San Francisco</div>
              </div>
              <div className="summit-hero-meta-item">
                <div className="summit-hero-meta-label">Size</div>
                <div className="summit-hero-meta-val">~400 people · intimate</div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 32 }}>
              <a className="btn btn-coral btn-lg" href="#tickets">Get tickets <ArrowRight/></a>
              <a className="btn btn-outline btn-lg summit-btn-light" href="#agenda">See agenda</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Quick stats */}
      <section className="pad">
        <div className="wrap">
          <div className="summit-stats">
            <Reveal>
              <div className="summit-stat">
                <div className="summit-stat-num">400</div>
                <div className="summit-stat-lbl">Attendees</div>
              </div>
            </Reveal>
            <Reveal delay={50}>
              <div className="summit-stat">
                <div className="summit-stat-num">18</div>
                <div className="summit-stat-lbl">Speakers</div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="summit-stat">
                <div className="summit-stat-num">6</div>
                <div className="summit-stat-lbl">Workshops</div>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="summit-stat">
                <div className="summit-stat-num">42</div>
                <div className="summit-stat-lbl">Countries represented</div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Speakers */}
      <section className="pad pt-0">
        <div className="wrap">
          <Reveal className="sec-head">
            <div className="eyebrow">Speakers</div>
            <h2 className="serif">People you'll <em>actually want to meet.</em></h2>
            <p>Six confirmed. A dozen more announcing through April.</p>
          </Reveal>
          <div className="summit-speakers">
            {SPEAKERS.map((s, i) => (
              <Reveal key={s.name} delay={(i % 3) * 60}>
                <article className="summit-speaker">
                  <div className={"summit-speaker-av tint-" + s.color}>{s.initials}</div>
                  <h3>{s.name}</h3>
                  <div className="summit-speaker-role" dangerouslySetInnerHTML={{ __html: s.role }}/>
                  <div className="summit-speaker-talk">"{s.talk}"</div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Agenda */}
      <section className="pad pt-0" id="agenda">
        <div className="wrap">
          <Reveal className="sec-head">
            <div className="eyebrow">Agenda</div>
            <h2 className="serif">Two days, no filler.</h2>
          </Reveal>
          <div className="summit-agenda">
            <Reveal>
              <div className="summit-day">
                <div className="summit-day-head">
                  <div className="summit-day-label">Day 1</div>
                  <div className="summit-day-date">Wednesday, May 14</div>
                </div>
                {AGENDA_DAY1.map((it, i) => (
                  <div key={i} className={"summit-slot " + it.kind}>
                    <div className="summit-slot-time">{it.time}</div>
                    <div className="summit-slot-body">
                      <div className="summit-slot-title">{it.title}</div>
                      {it.by && <div className="summit-slot-by">with {it.by}</div>}
                    </div>
                    <span className={"summit-slot-kind kind-" + it.kind}>{KIND_LABEL[it.kind]}</span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="summit-day">
                <div className="summit-day-head">
                  <div className="summit-day-label">Day 2</div>
                  <div className="summit-day-date">Thursday, May 15</div>
                </div>
                {AGENDA_DAY2.map((it, i) => (
                  <div key={i} className={"summit-slot " + it.kind}>
                    <div className="summit-slot-time">{it.time}</div>
                    <div className="summit-slot-body">
                      <div className="summit-slot-title">{it.title}</div>
                      {it.by && <div className="summit-slot-by">with {it.by}</div>}
                    </div>
                    <span className={"summit-slot-kind kind-" + it.kind}>{KIND_LABEL[it.kind]}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Tickets */}
      <section className="pad pt-0" id="tickets">
        <div className="wrap">
          <Reveal className="sec-head">
            <div className="eyebrow">Tickets</div>
            <h2 className="serif">Three ways <em>in.</em></h2>
          </Reveal>
          <div className="summit-tickets">
            {TIERS.map((t, i) => (
              <Reveal key={t.name} delay={i * 80}>
                <div className={"summit-ticket" + (t.featured ? " featured" : "")}>
                  {t.tag && <div className="summit-ticket-tag">★ {t.tag}</div>}
                  <h3>{t.name}</h3>
                  <div className="summit-ticket-sub">"{t.sub}"</div>
                  <div className="summit-ticket-price">
                    {t.price === 0 ? "Free" : <>${t.price}</>}
                  </div>
                  <ul className="summit-ticket-perks">
                    {t.perks.map(p => <li key={p}><Check/> {p}</li>)}
                  </ul>
                  <a className={"btn btn-lg btn-block " + t.btn} href={"/signup?summit=" + t.name.toLowerCase()}>{t.cta}</a>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="summit-scholarship">
              <strong>Scholarships:</strong> Can't afford a ticket? We set aside
              50 free in-person passes for students, career-changers, and
              folks from underrepresented backgrounds. <a href="mailto:summit@appsbuiltwithai.com">Apply by April 15 →</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Venue */}
      <section className="pad pt-0">
        <div className="wrap-tight">
          <Reveal>
            <div className="summit-venue">
              <div>
                <div className="eyebrow">Venue</div>
                <h2 className="serif">The Brick Factory <em>· SOMA, SF</em></h2>
                <p>
                  A 14,000-sq-ft brick-and-timber loft three blocks from BART.
                  Big rooftop, good acoustics, mercifully not a hotel ballroom.
                  Coffee is unlimited and decent.
                </p>
                <ul className="summit-venue-list">
                  <li><Check/> Three blocks from Powell BART</li>
                  <li><Check/> 18 hotels within a 10-minute walk (group rates available)</li>
                  <li><Check/> Wheelchair accessible · ASL on request</li>
                  <li><Check/> Quiet room available all day, both days</li>
                </ul>
              </div>
              <div className="summit-venue-map">
                <svg viewBox="0 0 320 220" width="100%" height="100%" style={{ display: "block" }}>
                  <rect width="320" height="220" fill="#EDE5D2"/>
                  {/* fake street grid */}
                  <g stroke="#D8CFB4" strokeWidth="1.5">
                    <line x1="0" y1="40" x2="320" y2="40"/>
                    <line x1="0" y1="100" x2="320" y2="100"/>
                    <line x1="0" y1="160" x2="320" y2="160"/>
                    <line x1="60"  y1="0" x2="60"  y2="220"/>
                    <line x1="140" y1="0" x2="140" y2="220"/>
                    <line x1="220" y1="0" x2="220" y2="220"/>
                  </g>
                  {/* blocks */}
                  <g fill="#FAF5EA" stroke="#D8CFB4">
                    <rect x="60"  y="40"  width="80" height="60"/>
                    <rect x="140" y="40"  width="80" height="60"/>
                    <rect x="60"  y="100" width="80" height="60"/>
                    <rect x="140" y="100" width="80" height="60"/>
                  </g>
                  {/* pin */}
                  <g transform="translate(150,110)">
                    <circle r="22" fill="#FB8855" opacity=".25"/>
                    <circle r="10" fill="#E84A3C"/>
                    <text x="0" y="-22" textAnchor="middle" fontFamily="system-ui" fontSize="11" fontWeight="700" fill="#181818">The Brick Factory</text>
                  </g>
                </svg>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Sponsors */}
      <section className="pad pt-0">
        <div className="wrap">
          <Reveal className="sec-head">
            <div className="eyebrow">Sponsors</div>
            <h2 className="serif">With thanks to <em>the supporters.</em></h2>
          </Reveal>
          <div className="summit-sponsors">
            {["Anthropic", "Stripe", "Vercel", "Supabase", "Linear", "Notion", "Resend", "GitHub"].map((s, i) => (
              <Reveal key={s} delay={i * 30}>
                <div className="summit-sponsor">{s}</div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div style={{ textAlign: "center", marginTop: 24 }}>
              <a className="btn btn-outline" href="mailto:summit@appsbuiltwithai.com">Become a sponsor →</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="pad pt-0">
        <div className="wrap-tight">
          <Reveal className="sec-head">
            <div className="eyebrow">FAQ</div>
            <h2 className="serif">Logistics.</h2>
          </Reveal>
          <div className="summit-faq">
            {[
              ["Is there a refund policy?", "Full refund up to April 14. After that we transfer your ticket to anyone you nominate."],
              ["Will sessions be recorded?", "Yes: all main-stage talks, posted within 7 days. Workshops are intentionally not recorded so attendees can speak freely."],
              ["Can my employer pay?", "Yes. We'll send a real invoice with a PO line. Email summit@ for net-30 terms on 3+ tickets."],
              ["Group discounts?", "10% off for 5+ tickets, 20% off for 10+. We also have a Certified Expert discount: DM @marcuswebb if you have a code."],
              ["What's the dress code?", "Whatever you wear to ship apps. We've seen everything from suits to slippers."],
              ["Childcare?", "On request, free, at our partner facility a block away. Email by April 15 to reserve."],
            ].map(([q, a], i) => (
              <Reveal key={q} delay={i * 30}>
                <details className="summit-faq-row">
                  <summary>{q}</summary>
                  <p>{a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA strip */}
      <section className="pad summit-final-cta">
        <div className="wrap-tight" style={{ textAlign: "center" }}>
          <Reveal>
            <h2 className="serif">Two days.<br/> <em>One room. See you there.</em></h2>
            <div style={{ display: "inline-flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginTop: 28 }}>
              <a className="btn btn-coral btn-lg" href="#tickets">Get my ticket <ArrowRight/></a>
              <a className="btn btn-outline btn-lg" href="#agenda">See full agenda</a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}


export default SummitPage;
