import React, { useState } from 'react';
import { ABWA_CHAPTERS } from './chapters-data.js';
import { Reveal, ArrowRight } from './part1.jsx';
const CM_STATS = [
  { k: "168K+", v: "members" },
  { k: "312", v: "community leaders" },
  { k: "1,500+", v: "events hosted" },
  { k: "92", v: "countries" },
];

const CM_RITUALS = [
  { when: "Tuesdays", t: "Prompt Masterclasses", d: "Tactical deep dives on advanced prompting, integrations and architecture, run by the core team or an invited mentor." },
  { when: "Thursdays", t: "Demo & Feedback Jams", d: "An open call where members show what they've shipped, get live feedback, and mark the milestone properly." },
  { when: "Monthly weekends", t: "Sprint Hack-Weekends", d: "48 hours on one theme (agents, finance, creative tooling) to force something rough into existence fast." },
];

const OFFICE_HOURS = [
  { day: "Mon", time: "11a PT", topic: "Plan-mode walkthrough", host: "Devon · Builder Advocate" },
  { day: "Wed", time: "5p PT", topic: "Connectors clinic", host: "Priya · Integrations" },
  { day: "Thu", time: "9a PT", topic: "Design feedback, open mic", host: "Mei · Design" },
  { day: "Fri", time: "12p PT", topic: "Founder office hours", host: "Marcus · Team" },
];

const AFFINITIES = [
  { ic: "👩", name: "Builders Who Are Women", members: "11.2K", desc: "Monthly co-working, mentor matching, and a Slack with no posturing in it.", color: "rose" },
  { ic: "🎓", name: "Teachers + Educators", members: "4.6K", desc: "Apps for classrooms, parent communication, and grading workflows.", color: "sky" },
  { ic: "💚", name: "Nonprofits", members: "2.8K", desc: "Discounted credits, training, and a grant-writing peer group.", color: "mint" },
  { ic: "🍼", name: "Solo Parents Building", members: "1.4K", desc: "Async only. Bring your kid to the calls: we mean it.", color: "warm" },
  { ic: "🌱", name: "Founders 50+", members: "3.1K", desc: "Late-career founders learning to ship without the gatekeepers.", color: "plum" },
  { ic: "🛠️", name: "Indie Devs", members: "8.7K", desc: "Self-employed builders shipping client work with AI.", color: "ink" },
];

const CM_FAQ = [
  { q: "How do I join?",
    a: "Make an account and you're in: the community is included on every plan, including the free one. The Discord invite is in your dashboard from the first day, and nobody is gated out of a channel for being on a smaller plan." },
  { q: "Do I need to be technical?",
    a: "No, and most people aren't. The majority of members run a business and built an app for it rather than coming from software. Forge Labs and Creator Circles assume you're describing what you want rather than writing it; the Mastery Salons are the one format where a technical background helps." },
  { q: "What's the difference between a Catalyst and a chapter lead?",
    a: "A chapter lead runs one city. A Catalyst is the wider ambassador role, with four tracks: Metropolis for cities, Academy for campuses, Industry for sector specialists, and Pedagogy for teachers and writers. Most chapter leads are Metropolis Catalysts, but you can be one without running a city." },
  { q: "Is any of it paid?",
    a: "Nothing costs you money. Events are free, in person included, and Catalysts have their venue and catering reimbursed rather than charging attendees. What you can earn is credits: 100 for finishing a Forge Lab, 250 for demoing at a Jam, 5,000 and a year of Pro for winning an Innovation Grid." },
  { q: "How active is it, really?",
    a: "Roughly 3,000 messages a day across the Discord, four office hours a week, and thirty-odd events a month. The quietest channels are the regional ones for small cities: which is the honest answer, and also why starting a chapter somewhere small works." },
  { q: "Do I need to speak English?",
    a: "The main channels are English, but there are member-run channels in Spanish, Portuguese, French, German, Hindi and Yoruba, and several chapters run entirely in their local language. Ask in the welcome channel and someone will point you at the right room." },
  { q: "Can I promote what I've built?",
    a: "In the showcase channels, yes, and people genuinely look. What doesn't fly is pitching in help channels or DMing members cold. Catalysts can't sell from the front of a room either, though people hiring them afterwards is normal." },
  { q: "I have a question that isn't here.",
    a: "Ask it in the welcome channel: it's the most-watched room we have and you'll usually get an answer within a few minutes, from a member rather than from us." },
];

function avatarTint(t) {
  return ({
    warm: "linear-gradient(135deg, #FFC76B, #FB8855)",
    plum: "linear-gradient(135deg, #C58CE8, #6A2EB8)",
    rose: "linear-gradient(135deg, #FF9AAE, #FF5C77)",
    mint: "linear-gradient(135deg, #6BE2A8, #2EA56F)",
    sky:  "linear-gradient(135deg, #9CC9F0, #5189D1)",
    ink:  "linear-gradient(135deg, #4B4458, #181818)",
  })[t] || "linear-gradient(135deg, #FFC76B, #FB8855)";
}

/* Photo collage: user drops real event photos into the slots */
function Collage() {
  const slots = [
    { id: "cm-photo-1", src: "/site/site-images/v2/community/community-hubs.jpg", cls: "cmc-a", ph: "Meetup crowd" },
    { id: "cm-photo-2", src: "/site/site-images/v2/community/community-collaboration.jpg", cls: "cmc-b", ph: "Workshop table" },
    { id: "cm-photo-3", src: "/site/site-images/v2/community/community-creations.jpg", cls: "cmc-c", ph: "Group photo" },
    { id: "cm-photo-4", src: "/site/site-images/v2/community/community-demo.jpg", cls: "cmc-d", ph: "Someone demoing" },
    { id: "cm-photo-5", src: "/site/site-images/v2/community/community-sprint.jpg", cls: "cmc-e", ph: "Hack weekend" },
  ];
  return (
    <div className="cm-collage" aria-hidden="false">
      {slots.map(s => (
        <div key={s.id} className={"cm-collage-item " + s.cls}>
          <image-slot id={s.id} shape="rounded" radius="10" placeholder={s.ph} src={s.src}></image-slot>
        </div>
      ))}
    </div>
  );
}

function CommunityPage() {
  const [faq, setFaq] = useState(null);

  return (
    <div className="cm-root cm-v2 ed">
      {/* HERO */}
      <section className="cm2-hero" data-screen-label="community-hero">
        <div className="wrap">
          <Reveal>
            <div className="cm2-hero-top">
              <a className="ed-kicker" href="/signup">Join the community <ArrowRight/></a>
              <h1 className="ed-display cm2-hero-h">Welcome to the<br/> <em>builders' community</em></h1>
              <p className="cm2-hero-sub">People who run businesses and build the software for them. Get help while you're stuck, show what you shipped, find a room near you, or start one.</p>
              <div className="cm2-hero-cta">
                <a className="btn btn-coral btn-lg" href="/events">Browse events <ArrowRight/></a>
                <a className="btn btn-outline btn-lg" href="/catalysts">Become a leader</a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={90}><Collage/></Reveal>
        </div>
      </section>

      {/* STATEMENT + STATS */}
      <section className="cm2-statement">
        <div className="wrap-tight">
          <Reveal>
            <p className="cm2-big">
              Connect with <strong>other builders</strong> online or in person. Get real-time help,
              share what you're building, attend events near you, or host your own, whether
              you're learning, building or growing alongside others.
            </p>
          </Reveal>
        </div>
      </section>

      {/* WAYS IN */}
      <section className="ed-sec">
        <div className="wrap">
          <Reveal className="ed-head ed-head-center">
            <h2>Start wherever <em>feels least daunting.</em></h2>
            <p className="ed-lead">Nobody joins all three at once. Most people turn up to one event, stay for the channel, and end up running something a year later.</p>
          </Reveal>
          <div className="cm-pillars">
            <Reveal>
              <a className="cm-pillar tone-coral" href="/events">
                <span className="cm-pillar-eyebrow">Events</span>
                <h3>Forge Labs, Grids, Circles and Salons</h3>
                <p>Four formats, from a 90-minute build sprint for beginners to a 24-hour hackathon. Every one ends with something running.</p>
                <span className="cm-pillar-go">See the calendar <ArrowRight/></span>
              </a>
            </Reveal>
            <Reveal delay={40}>
              <a className="cm-pillar tone-plum" href="/catalysts">
                <span className="cm-pillar-eyebrow">The Catalysts</span>
                <h3>Run it where you are</h3>
                <p>Our ambassador program. Four tracks, Pro access, an event budget and a direct line to the team: for members who take on the local work.</p>
                <span className="cm-pillar-go">See the tracks <ArrowRight/></span>
              </a>
            </Reveal>
            <Reveal delay={80}>
              <a className="cm-pillar tone-mint" href="#chapters">
                <span className="cm-pillar-eyebrow">Chapters & groups</span>
                <h3>Find your people first</h3>
                <p>City chapters and six groups, each with a named lead and a regular cadence. Start where it's smallest.</p>
                <span className="cm-pillar-go">Find a chapter <ArrowRight/></span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* RITUALS */}
      <section className="ed-sec ed-sec-alt">
        <div className="wrap">
          <Reveal className="ed-head ed-head-wide">
            <h2>The same three things, <em>every week.</em></h2>
            <p className="ed-lead">Momentum comes from repetition, not from occasional big moments. These run whether ten people show up or four hundred.</p>
          </Reveal>
          <div className="cm-rituals">
            {CM_RITUALS.map((r, i) => (
              <Reveal key={r.t} delay={i * 40}>
                <div className="cm-ritual">
                  <div className="cm-ritual-when">{r.when}</div>
                  <h3>{r.t}</h3>
                  <p>{r.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GROUPS */}
      <section className="ed-sec" id="groups">
        <div className="wrap">
          <Reveal className="ed-head ed-head-wide">
            <h2>A way in <em>for everyone.</em></h2>
            <p className="ed-lead">Smaller circles inside the bigger community, run by members and supported by us.</p>
          </Reveal>
          <div className="cm-aff-grid">
            {AFFINITIES.map((a, i) => (
              <Reveal key={a.name} delay={i * 30}>
                <a className={"cm-aff tone-" + a.color}>
                  <div className="cm-aff-ic">{a.ic}</div>
                  <h3>{a.name}</h3>
                  <p>{a.desc}</p>
                  <div className="cm-aff-foot">
                    <span>{a.members} members</span>
                    <span>Join →</span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* OFFICE HOURS */}
      <section className="ed-sec ed-sec-alt" id="office-hours">
        <div className="wrap">
          <Reveal className="ed-head ed-head-wide">
            <h2>Hosted by builders, <em>every week.</em></h2>
            <p className="ed-lead">No reservations and no agenda. Drop in, ask anything, get an honest answer from whoever's on.</p>
          </Reveal>
          <div className="cm-oh">
            {OFFICE_HOURS.map((o, i) => (
              <Reveal key={o.day + o.time} delay={i * 30}>
                <div className="cm-oh-row">
                  <div className="cm-oh-day">
                    <span className="cm-oh-day-name">{o.day}</span>
                    <span className="cm-oh-day-time">{o.time}</span>
                  </div>
                  <div className="cm-oh-body">
                    <div className="cm-oh-topic">{o.topic}</div>
                    <div className="cm-oh-host">{o.host}</div>
                  </div>
                  <span className="cm-oh-tag tag-live">Live</span>
                  <a className="cm-oh-cta" href="/events">Add to calendar →</a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CHAPTERS */}
      <section className="ed-sec" id="chapters">
        <div className="wrap">
          <Reveal className="ed-head ed-head-wide">
            <h2>Find a chapter. <em>Or start yours.</em></h2>
            <p className="ed-lead">Every chapter has a named lead, a recurring cadence, and a starter kit from us. Click into a city for details.</p>
          </Reveal>
          <div className="cm-chapter-grid">
            {ABWA_CHAPTERS.CHAPTERS.map((c, i) => (
              <Reveal key={c.id} delay={Math.min(i, 8) * 25}>
                <a className="cm-chapter" href={"/chapter?c=" + c.id}>
                  <span className="cm-chapter-av" style={{ background: avatarTint(c.tint) }}>{c.initials}</span>
                  <div className="cm-chapter-body">
                    <div className="cm-chapter-city">{c.city}</div>
                    <div className="cm-chapter-meta">led by {c.lead} · {c.members.toLocaleString()} members</div>
                    <div className="cm-chapter-next">{c.next[0].when} · {c.next[0].what}</div>
                  </div>
                  <ArrowRight/>
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal delay={80}>
            <div className="cm-chapter-cta">
              <div>
                <strong>Don't see your city?</strong>
                <span>Apply to start a chapter. We fund your first three meetups and ship a starter kit.</span>
              </div>
              <a className="btn btn-ink" href="/catalysts">Start a chapter <ArrowRight/></a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="ed-sec ed-sec-alt" id="faq">
        <div className="wrap-tight">
          <Reveal className="ed-head ed-head-center">
            <h2>Frequently asked, <em>honestly answered.</em></h2>
          </Reveal>
          <div className="ev-faq">
            {CM_FAQ.map((f, i) => (
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

      {/* FINAL */}
      <section className="cm2-final">
        <div className="wrap-tight">
          <Reveal>
            <h2 className="cm2-final-h">It's free, it's busy,<br/> <em>it's kind.</em></h2>
            <p className="ed-lead">Come and be new at something in a room where nobody minds.</p>
            <div className="ev-hero-cta">
              <a className="btn btn-coral btn-lg" href="/signup">Join free <ArrowRight/></a>
              <a className="btn btn-outline btn-lg" href="/events">See what's on</a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}


export default CommunityPage;
