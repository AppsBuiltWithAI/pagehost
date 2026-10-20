import React, { useState } from 'react';
import { Reveal, ArrowRight } from './part1.jsx';
const EV_FORMATS = [
  { id: "forge_lab", name: "AI Forge Labs", short: "Forge Labs", who: "Beginners & novice builders", dur: "90 minutes", mode: "Virtual",
    tone: "coral", obj: "Build and deploy a working micro-app from scratch in one sitting, using structured prompting." },
  { id: "innovation_grid", name: "The Innovation Grid", short: "Innovation Grid", who: "Builders & aspiring founders", dur: "24 hours", mode: "Hybrid",
    tone: "plum", obj: "A prototyping marathon against a real-world brief, judged and shipped by the end of the day." },
  { id: "creator_circle", name: "Creator Circles", short: "Creator Circles", who: "Local community members", dur: "2 hours", mode: "In person",
    tone: "mint", obj: "Evening roundtables for collaborative brainstorming, peer troubleshooting and live prototyping." },
  { id: "mastery_salon", name: "Mastery Salons", short: "Mastery Salons", who: "Professionals & domain experts", dur: "Bi-weekly", mode: "Virtual",
    tone: "sky", obj: "Deep dives into architecture, security and enterprise scaling, run with our core engineers." },
];

const EV_SECTORS = [
  { id: "retail", label: "Retail & ecommerce" },
  { id: "services", label: "Local services" },
  { id: "health", label: "Health & wellness" },
  { id: "education", label: "Education" },
  { id: "finance", label: "Finance & ops" },
  { id: "nonprofit", label: "Nonprofit" },
  { id: "agency", label: "Agencies & freelancers" },
  { id: "hospitality", label: "Hospitality & events" },
];

const EV_EVENTS = [
  { id: "e1", type: "forge_lab", sector: "retail", title: "Ship your first micro-app in 90 minutes", host: "Devon Ackerman", role: "Builder Advocate",
    day: "11", mon: "Aug", date: "Tue 11 Aug", time: "11:00a PT", mode: "Virtual", where: "Broadcast Stage", seats: 42, cap: 200, level: "Beginner" },
  { id: "e2", type: "mastery_salon", sector: "finance", title: "Permissions, roles and the things that actually leak", host: "Priya Raghavan", role: "Platform Engineering",
    day: "12", mon: "Aug", date: "Wed 12 Aug", time: "5:00p PT", mode: "Virtual", where: "Broadcast Stage", seats: 18, cap: 80, level: "Advanced" },
  { id: "e3", type: "creator_circle", sector: "services", title: "Creator Circle: Austin", host: "Marisol Vega", role: "Metropolis Catalyst",
    day: "13", mon: "Aug", date: "Thu 13 Aug", time: "6:30p CT", mode: "In person", where: "Canopy Studios, Austin TX", seats: 6, cap: 30, level: "All levels" },
  { id: "e4", type: "innovation_grid", sector: "services", title: "The Innovation Grid: small business operations", host: "Core team & 12 mentors", role: "24-hour build",
    day: "15", mon: "Aug", date: "Sat 15 Aug", time: "9:00a PT", mode: "Hybrid", where: "San Francisco + virtual", seats: 88, cap: 400, level: "Intermediate" },
  { id: "e5", type: "forge_lab", sector: "hospitality", title: "Forge Lab: booking flows that don't double-sell", host: "Mei Tanaka", role: "Design",
    day: "18", mon: "Aug", date: "Tue 18 Aug", time: "8:00a GMT", mode: "Virtual", where: "Broadcast Stage", seats: 130, cap: 200, level: "Beginner" },
  { id: "e6", type: "creator_circle", sector: "agency", title: "Creator Circle: Lagos", host: "Ifeoma Nwosu", role: "Metropolis Catalyst",
    day: "19", mon: "Aug", date: "Wed 19 Aug", time: "6:00p WAT", mode: "In person", where: "Yaba Hub, Lagos", seats: 11, cap: 25, level: "All levels" },
  { id: "e7", type: "forge_lab", sector: "education", title: "Forge Lab for teachers: parent comms in an afternoon", host: "Sarah Lin", role: "Pedagogy Catalyst",
    day: "20", mon: "Aug", date: "Thu 20 Aug", time: "4:00p ET", mode: "Virtual", where: "Broadcast Stage", seats: 64, cap: 150, level: "Beginner" },
  { id: "e8", type: "mastery_salon", sector: "health", title: "Handling sensitive data in a clinic booking app", host: "Dr. Anita Rao", role: "Industry Catalyst",
    day: "25", mon: "Aug", date: "Tue 25 Aug", time: "1:00p PT", mode: "Virtual", where: "Broadcast Stage", seats: 29, cap: 80, level: "Advanced" },
  { id: "e9", type: "creator_circle", sector: "nonprofit", title: "Creator Circle: Toronto: nonprofit night", host: "Grace Okafor", role: "Metropolis Catalyst",
    day: "26", mon: "Aug", date: "Wed 26 Aug", time: "6:00p ET", mode: "In person", where: "Artscape Daniels, Toronto", seats: 9, cap: 28, level: "All levels" },
  { id: "e10", type: "mastery_salon", sector: "finance", title: "Scaling an app past its first thousand customers", host: "Marcus Oyelaran", role: "Founder",
    day: "27", mon: "Aug", date: "Thu 27 Aug", time: "12:00p PT", mode: "Virtual", where: "Broadcast Stage", seats: 51, cap: 80, level: "Advanced" },
  { id: "e11", type: "innovation_grid", sector: "retail", title: "The Innovation Grid: independent retail", host: "Core team & 9 mentors", role: "24-hour build",
    day: "29", mon: "Aug", date: "Sat 29 Aug", time: "9:00a BST", mode: "Hybrid", where: "London + virtual", seats: 142, cap: 350, level: "Intermediate" },
  { id: "e12", type: "creator_circle", sector: "agency", title: "Creator Circle: Manchester", host: "Tom Iredale", role: "Metropolis Catalyst",
    day: "01", mon: "Sep", date: "Tue 1 Sep", time: "6:30p BST", mode: "In person", where: "Federation House, Manchester", seats: 14, cap: 30, level: "All levels" },
];

const EV_CURRICULUM = [
  { m: "15", t: "Foundational prompting & architecture", d: "A conceptual pass over the topic, including the patterns that work and the ones that quietly don't." },
  { m: "15", t: "Live build demonstration", d: "Your host builds it in front of you, including the wrong turns and how they recover from them." },
  { m: "30", t: "Hands-on build sprint", d: "You build. Alone or in a breakout group, with mentors circulating to unblock people." },
  { m: "10", t: "Showcase & rapid demo", d: "Rapid-fire demos from a handful of participants. Voluntary, and always the best part." },
];

const EV_FAQ = [
  { q: "Do I earn credits for taking part?",
    a: "Yes. Finishing a Forge Lab adds 100 credits to your account, and demoing what you built at a Jam or Circle adds 250. Innovation Grid entrants get 500 for submitting, and the winning teams get 5,000 plus a year of Pro. Credits land within 48 hours of the event and never expire while your account is active." },
  { q: "Is any of this paid?",
    a: "No. Every event listed here is free to attend, including the in-person ones. Catalysts hosting a Creator Circle get their venue and catering reimbursed by us, so nobody is passing costs on to attendees." },
  { q: "Do I need to know how to code?",
    a: "Not for Forge Labs, Creator Circles or the Innovation Grid: they assume you're describing what you want rather than writing it. Mastery Salons are the exception: they go into architecture and security in enough depth that some technical background helps." },
  { q: "What do I need to bring or install?",
    a: "A browser and an account. Nothing to download, no dev environment. For in-person Circles bring a laptop; there's usually someone with a spare if you turn up without one." },
  { q: "Can I bring my team?",
    a: "Please do. Bookings for four or more get their own breakout room and a mentor assigned to the group for the build sprint. Mention it in the RSVP notes and we'll set it up." },
  { q: "What if I have to cancel?",
    a: "Cancel from the calendar invite and your seat goes back into the pool automatically. There's no penalty, but the in-person Circles are usually oversubscribed, so it's worth doing it early." },
  { q: "Are sessions recorded?",
    a: "The demonstration halves of Forge Labs and Mastery Salons are recorded and published to the library within a week. The build sprints and breakout rooms are never recorded, so people can ask basic questions without an audience." },
  { q: "How do I host one where I live?",
    a: "Apply to be a Metropolis Catalyst. You get the venue budget, a swag kit, the run-sheet we use internally, and a named contact on our team. Most new chapters run their first Circle within three weeks of being accepted." },
];

const fmt = (id) => EV_FORMATS.find(f => f.id === id) || {};
const secLabel = (id) => (EV_SECTORS.find(s => s.id === id) || {}).label || "";

function RsvpModal({ ev, onClose }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const f = fmt(ev.type);
  return (
    <div className="ev-modal-bg" onClick={onClose}>
      <div className="ev-modal" onClick={(e) => e.stopPropagation()}>
        <button className="ev-modal-x" onClick={onClose} aria-label="Close">×</button>
        {sent ? (
          <div className="ev-modal-done">
            <div className={"ev-pill tone-" + f.tone}>{f.name}</div>
            <h3 className="serif">You're on the list.</h3>
            <p>A calendar invite and the joining link are on their way to {email}. We'll nudge you an hour before it starts.</p>
            <button className="btn btn-ink" onClick={onClose}>Done</button>
          </div>
        ) : (
          <React.Fragment>
            <div className={"ev-pill tone-" + f.tone}>{f.name}</div>
            <h3 className="serif">{ev.title}</h3>
            <dl className="ev-modal-meta">
              <div><dt>When</dt><dd>{ev.date} · {ev.time}</dd></div>
              <div><dt>Where</dt><dd>{ev.mode} · {ev.where}</dd></div>
              <div><dt>Host</dt><dd>{ev.host} · {ev.role}</dd></div>
              <div><dt>Focus</dt><dd>{secLabel(ev.sector)} · {ev.level}</dd></div>
            </dl>
            <label className="ev-modal-field">
              <span>Email</span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"/>
            </label>
            <button className="btn btn-coral btn-lg" disabled={!email.includes("@")} onClick={() => setSent(true)}>
              Reserve my seat <ArrowRight/>
            </button>
            <p className="ev-modal-fine">{ev.seats} of {ev.cap} seats left. Free, and you can cancel from the invite.</p>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

function EventCard({ e, onRsvp }) {
  const f = fmt(e.type);
  const taken = Math.round((1 - e.seats / e.cap) * 100);
  const tight = e.seats / e.cap < 0.25;
  return (
    <article className={"ev-card tone-" + f.tone}>
      <div className="ev-card-date">
        <span className="ev-card-day">{e.day}</span>
        <span className="ev-card-mon">{e.mon}</span>
      </div>
      <div className="ev-card-main">
        <div className="ev-card-tags">
          <span className="ev-pill">{f.short}</span>
          <span className="ev-chip">{secLabel(e.sector)}</span>
          <span className="ev-chip">{e.level}</span>
        </div>
        <h3>{e.title}</h3>
        <dl className="ev-card-meta">
          <div><dt>Time</dt><dd>{e.date}<span>{e.time}</span></dd></div>
          <div><dt>Where</dt><dd>{e.mode}<span>{e.where}</span></dd></div>
          <div><dt>Host</dt><dd>{e.host}<span>{e.role}</span></dd></div>
        </dl>
      </div>
      <div className="ev-card-act">
        <div className="ev-card-seats">
          <div className="ev-seat-bar"><span style={{ width: taken + "%" }}/></div>
          <span className={tight ? "ev-seat-tight" : ""}>{e.seats} of {e.cap} seats left</span>
        </div>
        <button className="btn btn-ink" onClick={() => onRsvp(e)}>RSVP <ArrowRight/></button>
      </div>
    </article>
  );
}

function EventsPage() {
  const [tab, setTab] = useState("all");
  const [sector, setSector] = useState("all");
  const [mode, setMode] = useState("all");
  const [rsvp, setRsvp] = useState(null);
  const [faq, setFaq] = useState(null);

  let list = EV_EVENTS;
  if (tab !== "all") list = list.filter(e => e.type === tab);
  if (sector !== "all") list = list.filter(e => e.sector === sector);
  if (mode !== "all") list = list.filter(e => (mode === "person" ? e.mode === "In person" : e.mode !== "In person"));

  const clear = () => { setTab("all"); setSector("all"); setMode("all"); };
  const filtered = tab !== "all" || sector !== "all" || mode !== "all";
  const sectorCount = (id) => EV_EVENTS.filter(e => e.sector === id && (tab === "all" || e.type === tab)).length;

  return (
    <div className="cm-root ev-root ed">
      {/* HERO */}
      <section className="ev-hero" data-screen-label="events-hero">
        <div className="wrap ev-hero-wrap">
          <Reveal>
            <h1 className="ed-display ev-hero-h">Nobody leaves<br/> with <em>just notes.</em></h1>
            <p className="ev-hero-sub">Four event formats, run every week, free to attend. Each one ends with something of yours running that didn't exist when it started. No panels, no keynotes, no slides about the future of work.</p>
            <div className="ev-hero-cta">
              <a className="btn btn-coral btn-lg" href="#finder">Find an event <ArrowRight/></a>
              <a className="btn btn-outline btn-lg" href="/catalysts">Host one yourself</a>
            </div>
          </Reveal>
          <Reveal delay={70}>
            <div className="ev-hero-stats">
              {[["4", "formats"], ["31", "this month"], ["41", "cities"], ["Free", "always"]].map(([k, v]) => (
                <div key={v} className="ev-hero-stat"><strong>{k}</strong><span>{v}</span></div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FORMATS */}
      <section className="ed-sec" id="formats">
        <div className="wrap">
          <Reveal className="ed-head ed-head-wide">
            <h2>Four shapes, <em>one purpose.</em></h2>
            <p className="ed-lead">Each format exists for a different kind of builder at a different point in their week. Pick the one that matches where you are, not where you'd like to be.</p>
          </Reveal>
          <div className="ev-fmt-grid">
            {EV_FORMATS.map((f, i) => (
              <Reveal key={f.id} delay={i * 40}>
                <div className={"ev-fmt tone-" + f.tone}>
                  <div className="ev-fmt-rule"/>
                  <div className="ev-fmt-head">
                    <h3>{f.name}</h3>
                    <span className="ev-fmt-dur">{f.dur} · {f.mode}</span>
                  </div>
                  <p className="ev-fmt-obj">{f.obj}</p>
                  <div className="ev-fmt-foot">
                    <span>{f.who}</span>
                    <button className="ev-fmt-link" onClick={() => { setTab(f.id); setSector("all"); setMode("all"); }}>See upcoming →</button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINDER */}
      <section className="ed-sec ed-sec-alt" id="finder">
        <div className="wrap">
          <Reveal className="ed-head ed-head-wide">
            <h2>By format, sector, <em>or where you'd rather be.</em></h2>
          </Reveal>

          <Reveal>
            <div className="ev-filters">
              <div className="ev-filter-row">
                <span className="ev-filter-label">Format</span>
                <div className="ev-tabs">
                  <button className={"ev-tab" + (tab === "all" ? " on" : "")} onClick={() => setTab("all")}>All <span>{EV_EVENTS.length}</span></button>
                  {EV_FORMATS.map(f => (
                    <button key={f.id} className={"ev-tab" + (tab === f.id ? " on" : "")} onClick={() => setTab(f.id)}>
                      {f.short} <span>{EV_EVENTS.filter(e => e.type === f.id).length}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="ev-filter-row">
                <span className="ev-filter-label">Sector</span>
                <div className="ev-tabs">
                  <button className={"ev-chipbtn" + (sector === "all" ? " on" : "")} onClick={() => setSector("all")}>Any sector</button>
                  {EV_SECTORS.map(s => {
                    const n = sectorCount(s.id);
                    return (
                      <button key={s.id} className={"ev-chipbtn" + (sector === s.id ? " on" : "") + (n ? "" : " off")}
                        disabled={!n} onClick={() => setSector(s.id)}>
                        {s.label}{n ? <span> {n}</span> : null}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="ev-filter-row">
                <span className="ev-filter-label">Format of day</span>
                <div className="ev-seg">
                  {[["all", "Anywhere"], ["virtual", "Virtual"], ["person", "In person"]].map(([k, l]) => (
                    <button key={k} className={"ev-seg-btn" + (mode === k ? " on" : "")} onClick={() => setMode(k)}>{l}</button>
                  ))}
                </div>
                {filtered && <button className="ev-clear" onClick={clear}>Clear filters</button>}
              </div>
            </div>
          </Reveal>

          <div className="ev-result-row">
            <span>{list.length} {list.length === 1 ? "event" : "events"}{sector !== "all" ? " in " + secLabel(sector).toLowerCase() : ""}</span>
            <span className="ev-result-note">Times shown in the host's timezone</span>
          </div>

          {list.length ? (
            <div className="ev-list">
              {list.map((e, i) => (
                <Reveal key={e.id} delay={Math.min(i, 6) * 25}><EventCard e={e} onRsvp={setRsvp}/></Reveal>
              ))}
            </div>
          ) : (
            <div className="ev-empty">
              <strong>Nothing scheduled for that combination yet.</strong>
              <p>New events go up every Monday. Widen the filter, or ask for one in your sector: we schedule against demand.</p>
              <button className="btn btn-outline" onClick={clear}>Show everything</button>
            </div>
          )}
        </div>
      </section>

      {/* CURRICULUM */}
      <section className="ed-sec" id="curriculum">
        <div className="wrap">
          <Reveal className="ed-head ed-head-wide">
            <h2>Same 70 minutes, <em>every time.</em></h2>
            <p className="ed-lead">Every educational session follows one structure, so you always know what you're walking into, and how much of it is you building rather than watching.</p>
          </Reveal>
          <div className="ev-curr">
            {EV_CURRICULUM.map((c, i) => (
              <Reveal key={c.t} delay={i * 40}>
                <div className="ev-curr-row">
                  <span className="ev-curr-idx">{String(i + 1).padStart(2, "0")}</span>
                  <div className="ev-curr-min"><strong>{c.m}</strong><span>min</span></div>
                  <div className="ev-curr-body">
                    <h3>{c.t}</h3>
                    <p>{c.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="ed-sec ed-sec-alt" id="faq">
        <div className="wrap-tight">
          <Reveal className="ed-head ed-head-wide">
            <h2>The things <em>everybody asks.</em></h2>
          </Reveal>
          <div className="ev-faq">
            {EV_FAQ.map((f, i) => (
              <div key={f.q} className={"ev-faq-item" + (faq === i ? " open" : "")}>
                <button className="ev-faq-q" onClick={() => setFaq(faq === i ? null : i)} aria-expanded={faq === i}>
                  <span>{f.q}</span>
                  <span className="ev-faq-sign" aria-hidden="true"/>
                </button>
                <div className="ev-faq-a"><p>{f.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ev-final">
        <div className="wrap-tight">
          <Reveal>
            <h2>Bring the half-finished thing. <em>That's the point.</em></h2>
            <p className="ed-lead">Nobody turns up to these with a polished demo. They turn up with something broken and leave with it working.</p>
            <div className="ev-hero-cta">
              <a className="btn btn-coral btn-lg" href="#finder">Find an event <ArrowRight/></a>
              <a className="btn btn-outline btn-lg" href="/community">Back to community</a>
            </div>
          </Reveal>
        </div>
      </section>

      {rsvp && <RsvpModal ev={rsvp} onClose={() => setRsvp(null)}/>}
    </div>
  );
}


export default EventsPage;
