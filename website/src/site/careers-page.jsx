import React from 'react';
import { Reveal, ArrowRight } from './part1.jsx';
const CR_VALUES = [
  { icon: "🏃", t: "Ship weekly", d: "Small team, short cycles. What you build Monday is live for thousands of builders by Friday." },
  { icon: "🗣️", t: "Talk to builders", d: "Everyone (engineers included) spends time in the community answering real questions from real users." },
  { icon: "🌍", t: "Remote-first", d: "Work from anywhere with 4 hours of overlap with US Eastern. We fly everyone in twice a year." },
  { icon: "🎓", t: "Non-coders welcome", d: "Half our team never worked in tech before. If you can do the job, the résumé doesn't matter." },
];

const CR_ROLES = [
  { team: "Engineering", roles: [
    { t: "Senior Product Engineer", loc: "Remote (Americas / EU)", type: "Full-time" },
    { t: "AI Agents Engineer", loc: "Remote (Americas / EU)", type: "Full-time" },
  ]},
  { team: "Design", roles: [
    { t: "Product Designer", loc: "Remote (Americas)", type: "Full-time" },
  ]},
  { team: "Community & Support", roles: [
    { t: "Community Lead", loc: "Remote (anywhere)", type: "Full-time" },
    { t: "Builder Support Specialist", loc: "Remote (anywhere)", type: "Part-time" },
  ]},
  { team: "Growth", roles: [
    { t: "Content & SEO Lead", loc: "Remote (Americas / EU)", type: "Full-time" },
  ]},
];

const CR_PERKS = [
  "Competitive salary + equity", "Health, dental & vision", "Home-office budget",
  "Two team retreats a year", "Unlimited AppsBuiltWithAI credits", "4-day summer weeks",
];

function CareersPage() {
  const total = CR_ROLES.reduce((n, g) => n + g.roles.length, 0);
  return (
    <main data-screen-label="careers">
      <section className="cr-hero" data-screen-label="careers-hero">
        <div className="wrap-tight">
          <Reveal className="sec-head cr-head">
            <div className="eyebrow">Careers</div>
            <h1>Help democratize <em className="serif">technology.</em></h1>
            <p>We're a small remote team building the app builder for everyone else, and we hire the way we build: on ability, not credentials.</p>
            <a className="btn btn-coral cr-hero-btn" href="#open-roles">See {total} open roles <ArrowRight/></a>
          </Reveal>
        </div>
      </section>

      <section className="pad cr-values-sec" data-screen-label="careers-values">
        <div className="wrap-tight">
          <Reveal className="sec-head">
            <div className="eyebrow">How we work</div>
            <h2>What it's like <em>here.</em></h2>
          </Reveal>
          <div className="cr-values">
            {CR_VALUES.map((v, i) => (
              <Reveal key={v.t} delay={i * 50}>
                <div className="cr-value">
                  <span className="cr-value-icon">{v.icon}</span>
                  <h3>{v.t}</h3>
                  <p>{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pad cr-roles-sec" id="open-roles" data-screen-label="careers-roles">
        <div className="wrap-tight">
          <Reveal className="sec-head">
            <div className="eyebrow">Open roles</div>
            <h2>{total} openings, <em>all remote.</em></h2>
          </Reveal>
          <div className="cr-roles">
            {CR_ROLES.map((g) => (
              <Reveal key={g.team}>
                <div className="cr-role-group">
                  <div className="cr-team">{g.team}</div>
                  {g.roles.map((r) => (
                    <a key={r.t} className="cr-role" href={"mailto:careers@appsbuiltwithai.com?subject=" + encodeURIComponent("Application: " + r.t)}>
                      <div className="cr-role-main">
                        <span className="cr-role-title">{r.t}</span>
                        <span className="cr-role-meta">{r.loc} · {r.type}</span>
                      </div>
                      <span className="cr-role-arrow"><ArrowRight/></span>
                    </a>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="cr-open-note">
              Don't see your role? We read every note sent to <b>careers@appsbuiltwithai.com</b>: tell us what you'd do here.
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pad cr-perks-sec" data-screen-label="careers-perks">
        <div className="wrap-tight">
          <Reveal>
            <div className="cr-perks-card">
              <div>
                <div className="eyebrow cr-perks-eyebrow">The practical stuff</div>
                <h2>Taken care of, <em className="serif">so you can build.</em></h2>
              </div>
              <ul className="cr-perks">
                {CR_PERKS.map((p) => <li key={p}><span className="cr-perk-check">✓</span>{p}</li>)}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}


export default CareersPage;
