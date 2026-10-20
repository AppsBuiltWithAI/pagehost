import React, { useState } from 'react';
import { Reveal, ArrowRight } from './part1.jsx';
const CAT_TRACKS = [
  { id: "metropolis", name: "Metropolis Catalysts", tone: "coral", who: "Regional community leaders",
    d: "You run the city. Local meetups, grassroots build-nights and regional innovation sprints, with the venue and catering on us.",
    doing: ["Host a Creator Circle monthly", "Grow a named city chapter", "Run one Innovation Grid a year"] },
  { id: "academy", name: "Academy Catalysts", tone: "plum", who: "Students & faculty champions",
    d: "You bring it into education. University AI labs, coding clubs and student startup activations, with curriculum support from us.",
    doing: ["Run a campus AI lab", "Support a student build club", "Bring a cohort to a Forge Lab"] },
  { id: "industry", name: "Industry Catalysts", tone: "sky", who: "Domain specialists",
    d: "You know a sector properly (marketing ops, fintech, enterprise automation) and you show people in it what's now possible.",
    doing: ["Publish sector-specific playbooks", "Host a Mastery Salon", "Advise on vertical roadmap"] },
  { id: "pedagogy", name: "Pedagogy Catalysts", tone: "mint", who: "Educators & technical writers",
    d: "You're the one who explains things well. Tutorials, live workshops and technical office hours that people actually finish.",
    doing: ["Write tutorials for the library", "Lead a weekly workshop", "Hold technical office hours"] },
];

const CAT_PERKS = [
  { t: "Complimentary Pro access", d: "Unrestricted access to the highest tier, for as long as you're a Catalyst. Build and experiment without watching a credit counter." },
  { t: "Event subsidy & toolkit", d: "Reimbursement for venue hire and catering on approved meetups, plus a swag kit that arrives before your first one." },
  { t: "Direct core team access", d: "A private channel with the product managers and founders. Your members' complaints reach the people who can fix them." },
  { t: "Global amplification", d: "Your initiatives featured across our social channels, the community newsletter and the in-app spotlight." },
];

const CAT_STEPS = [
  { t: "Application", d: "One form. Your community organizing background, what you've actually shipped, and what you'd do in your first ninety days." },
  { t: "Review & interview", d: "We review on a rolling basis, then a 15-minute video call. It's a conversation, not an assessment." },
  { t: "Onboarding & induction", d: "Sign the Catalyst Code of Conduct, receive your welcome kit, and join the private leadership channel." },
];

const CT_FAQ = [
  { q: "Am I paid for this?",
    a: "Not a salary, no: Catalysts aren't staff. What you get is Pro access for free while you're active, your event costs reimbursed, and a credit allowance of 10,000 a quarter for building. Several Catalysts use that allowance to run client work, which we're entirely happy with." },
  { q: "What do the credits and incentives actually amount to?",
    a: "Pro access is the largest piece. On top of that: 10,000 build credits a quarter, up to £400 per approved meetup for venue and catering, a swag kit for your attendees, and 2,500 bonus credits for each tutorial or workshop you publish that we feature. Nothing is clawed back if a month is quiet." },
  { q: "How much time does it take?",
    a: "Most tracks work out at four to six hours a month. One event, some channel presence, and a monthly check-in call with your track group. Catalysts who want to do more do more, but nobody is measured against the people running three events a week." },
  { q: "What happens if I go quiet for a while?",
    a: "Tell us and nothing happens. Illness, a new job, a busy season: people pause for a quarter and come back. Perks stay in place through a declared pause. We only close a Catalyst place if someone disappears for two quarters without a word, and even then it's a conversation first." },
  { q: "Do I need a big following?",
    a: "No. We've turned down people with large audiences and accepted people with thirty. What we're looking for is evidence you've organized something before and finished it: a club, a meetup, a study group, a Discord that stayed alive." },
  { q: "Can I be a Catalyst and run an agency on the platform?",
    a: "Yes, and many are. You can't use Catalyst events as a sales channel (no pitching from the front of the room) but people finding out what you do and hiring you afterwards is entirely normal and fine." },
  { q: "Can I switch tracks later?",
    a: "Any time, and a few people hold two. Message your track lead; there's no reapplication." },
  { q: "What's in the Code of Conduct?",
    a: "The short version: events stay free and open, you don't use the role to sell, you don't speak for the company on the record, and you tell us early when something goes wrong. It's two pages and you'll read it in five minutes." },
];

function ApplyModal({ initialTrack, onClose }) {
  const [f, setF] = useState({ name: "", email: "", track: initialTrack || "metropolis", location: "", exp: "" });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const valid = f.name.trim() && f.email.includes("@") && f.location.trim() && f.exp.trim().length > 20;

  return (
    <div className="ev-modal-bg" onClick={onClose}>
      <div className="ev-modal ct-modal" onClick={(e) => e.stopPropagation()}>
        <button className="ev-modal-x" onClick={onClose} aria-label="Close">×</button>
        {sent ? (
          <div className="ev-modal-done">
            <div className="ev-pill tone-mint">Application received</div>
            <h3 className="serif">Thanks: we'll be in touch.</h3>
            <p>We review on a rolling basis and reply to everyone, usually within a week. If it's a yes, the next step is a 15-minute call.</p>
            <button className="btn btn-ink" onClick={onClose}>Done</button>
          </div>
        ) : (
          <React.Fragment>
            <div className="ev-pill tone-coral">Catalyst application</div>
            <h3 className="serif">Tell us what you'd do with it.</h3>
            <div className="ct-form">
              <label className="ev-modal-field"><span>Full name</span><input value={f.name} onChange={set("name")} placeholder="Marisol Vega"/></label>
              <label className="ev-modal-field"><span>Email</span><input type="email" value={f.email} onChange={set("email")} placeholder="you@example.com"/></label>
              <label className="ev-modal-field">
                <span>Track</span>
                <select value={f.track} onChange={set("track")}>
                  {CAT_TRACKS.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </label>
              <label className="ev-modal-field"><span>Where you're based</span><input value={f.location} onChange={set("location")} placeholder="Austin, TX"/></label>
              <label className="ev-modal-field ct-field-wide">
                <span>What you've organized before, and what you'd do here</span>
                <textarea rows={4} value={f.exp} onChange={set("exp")} placeholder="Communities you've run, events you've hosted, what you've built on the platform, and your plan for the first ninety days."/>
              </label>
            </div>
            <button className="btn btn-coral btn-lg" disabled={!valid} onClick={() => setSent(true)}>Submit application <ArrowRight/></button>
            <p className="ev-modal-fine">{valid ? "Ready to send." : "All fields required: the last one properly, not in one line."}</p>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

function CatalystsPage() {
  const [apply, setApply] = useState(null);
  const [faq, setFaq] = useState(null);
  const open = (track) => setApply({ track: track || "metropolis" });

  return (
    <div className="cm-root ct-root">
      <section className="ev-hero" data-screen-label="catalysts-hero">
        <div className="wrap ev-hero-wrap">
          <Reveal>
            <div className="eyebrow">The Catalysts · ambassador program</div>
            <h1 className="ev-hero-h">The people who make<br/> <em>the rest of it happen.</em></h1>
            <p className="ev-hero-sub">Catalysts run the meetups, teach the workshops and answer the questions at midnight. They're not staff. They're members who decided to take it on, and we back them properly: with Pro access, an event budget and a direct line to the team.</p>
            <div className="ev-hero-cta">
              <button className="btn btn-coral btn-lg" onClick={() => open()}>Apply to be a Catalyst <ArrowRight/></button>
              <a className="btn btn-outline btn-lg" href="#tracks">See the four tracks</a>
            </div>
          </Reveal>
          <Reveal delay={70}>
            <div className="ev-hero-stats">
              {[["4", "tracks"], ["312", "catalysts"], ["41", "cities"], ["Pro", "on us"]].map(([k, v]) => (
                <div key={v} className="ev-hero-stat"><strong>{k}</strong><span>{v}</span></div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* QUOTE */}
      <section className="ev-sec" style={{ paddingBottom: 0 }}>
        <div className="wrap-tight">
          <Reveal>
            <blockquote className="ct-quote">
              You join the community to fix a bug, get feedback, or share what you built, and you walk out with real support and a few new friends who follow your entire builder journey.
              <cite>Community builder, on why they became a Catalyst</cite>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* TRACKS */}
      <section className="ev-sec" id="tracks">
        <div className="wrap">
          <Reveal className="ev-sec-head">
            <div className="eyebrow">Four tracks</div>
            <h2 className="serif">Pick the one that <em>already sounds like you.</em></h2>
            <p className="ev-lead">You don't have to be all four. Each track has its own expectations, its own support, and its own crowd.</p>
          </Reveal>
          <div className="ct-track-grid">
            {CAT_TRACKS.map((t, i) => (
              <Reveal key={t.id} delay={i * 40}>
                <div className={"ct-track tone-" + t.tone}>
                  <div className="ct-track-who">{t.who}</div>
                  <h3>{t.name}</h3>
                  <p>{t.d}</p>
                  <ul className="ct-track-list">
                    {t.doing.map(d => <li key={d}>{d}</li>)}
                  </ul>
                  <button className="btn btn-outline btn-sm" onClick={() => open(t.id)}>Apply to this track <ArrowRight/></button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PERKS */}
      <section className="ev-sec ev-sec-alt" id="perks">
        <div className="wrap">
          <Reveal className="ev-sec-head">
            <div className="eyebrow">What you get</div>
            <h2 className="serif">Backed, <em>not just badged.</em></h2>
            <p className="ev-lead">Running a community costs time and money. These are the four things that stop it costing you both.</p>
          </Reveal>
          <div className="ct-perk-grid">
            {CAT_PERKS.map((p, i) => (
              <Reveal key={p.t} delay={i * 35}>
                <div className="ct-perk">
                  <span className="ct-perk-idx">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{p.t}</h3>
                  <p>{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="ev-sec" id="apply">
        <div className="wrap">
          <Reveal className="ev-sec-head">
            <div className="eyebrow">How to join</div>
            <h2 className="serif">Three steps, <em>about a week.</em></h2>
          </Reveal>
          <div className="ct-steps">
            {CAT_STEPS.map((s, i) => (
              <Reveal key={s.t} delay={i * 40}>
                <div className="ct-step">
                  <span className="ct-step-n">{i + 1}</span>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={80}>
            <div className="ct-apply-band">
              <div>
                <strong>Applications are open and reviewed weekly.</strong>
                <span>There's no quota and no closing date. If you're already doing the work, say so.</span>
              </div>
              <button className="btn btn-coral btn-lg" onClick={() => open()}>Apply now <ArrowRight/></button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="ev-sec ev-sec-alt" id="faq">
        <div className="wrap-tight">
          <Reveal className="ev-sec-head">
            <div className="eyebrow">Before you apply</div>
            <h2 className="serif">What it actually <em>involves.</em></h2>
          </Reveal>
          <div className="ev-faq">
            {CT_FAQ.map((f, i) => (
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
            <h2 className="serif">Not ready to lead? <em>Just turn up.</em></h2>
            <p className="ev-lead">Every Catalyst started as someone who came to one event and stayed for the next.</p>
            <div className="ev-hero-cta">
              <a className="btn btn-coral btn-lg" href="/events">Find an event <ArrowRight/></a>
              <a className="btn btn-outline btn-lg" href="/community">Back to community</a>
            </div>
          </Reveal>
        </div>
      </section>

      {apply && <ApplyModal initialTrack={apply.track} onClose={() => setApply(null)}/>}
    </div>
  );
}


export default CatalystsPage;
