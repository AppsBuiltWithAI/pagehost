import React from 'react';
import { Reveal, ArrowRight } from './part1.jsx';
const AB_BELIEFS = [
  { t: "Plain English is a programming language", d: "If you can describe it, you should be able to build it. The gap between an idea and working software should not be a computer science degree." },
  { t: "Built with our community", d: "We build in the open and listen closely to the people using the platform every day." },
  { t: "Technology for the many", d: "Bakers, coaches, consultants, organizers. The next million apps will not come from engineers. They will come from the people who know their problem best." },
  { t: "Clear pricing", d: "Choose a monthly or annual plan and see what it costs before you subscribe. Your data stays yours." },
];

const AB_MILESTONES = [
  { y: "2025", t: "AppsBuiltWithAI begins", d: "We set out to let anyone describe an app in plain English and get a working product they can sell." },
  { y: "2026", t: "Apps go live", d: "Bakeries, studios, consultancies and community groups run on apps their owners described themselves." },
  { y: "Next", t: "More ways to build and sell", d: "A marketplace so builders can sell what they make.", next: true },
];

const AB_NUMS_UNUSED = [
  { k: "168K", v: "members in the community" },
  { k: "247", v: "city chapters worldwide" },
  { k: "92", v: "countries represented" },
];

const AB_NEXT = [
  "Chapters in forty more cities, member-led",
  "Code export and developer handoff for every plan",
  "A marketplace so members can sell what they build",
];

const AB_STRIP = [
  { id: "ab-strip-1", cap: "A live build night", src: "/site/site-images/v2/about/about-london.png", ph: "Members building together at a meetup" },
  { id: "ab-strip-2", cap: "A member's app, live", src: "/site/site-images/v2/about/about-member-app.png", ph: "Screenshot of a member app on a phone" },
  { id: "ab-strip-3", cap: "From idea to app", src: "/site/site-images/v2/about/about-idea.jpg", ph: "Someone shipping their first app" },
];

function AboutPage() {
  return (
    <main className="ed" data-screen-label="about">
      {/* HERO */}
      <section className="ab2-hero" data-screen-label="about-hero">
        <div className="wrap ab2-hero-grid">
          <Reveal>
            <div>
              <a className="ed-kicker" href="/how-it-works">Founded in 2025 <ArrowRight/></a>
              <h1 className="ed-display" style={{ marginTop: 24 }}>Technology,<br/> <em>democratized.</em></h1>
              <p className="ed-lead">We exist for the millions of people with a real problem to solve and no way to code the solution. The app you've been describing to friends for two years should take you an afternoon.</p>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <div className="ab2-hero-side">
              <div className="ab2-hero-rule"/>
              <p>Software has been gatekept by syntax for fifty years. Everything we build is aimed at removing that gate, for people who were never going to climb it.</p>
              <p>We build for people who were never going to learn to code, and we keep it that way.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PHOTO STRIP */}
      <section className="ab2-strip-sec" data-screen-label="about-photos">
        <div className="wrap">
          <div className="ab2-strip">
            {AB_STRIP.map((s, i) => (
              <Reveal key={s.id} delay={i * 70}>
                <figure className="ab2-strip-fig">
                  <image-slot id={s.id} shape="rect" placeholder={s.ph} src={s.src}></image-slot>
                  <figcaption>{s.cap}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="ed-sec" data-screen-label="about-mission">
        <div className="wrap ab2-mission">
          <Reveal>
            <div>
              <div className="ed-marker"><span className="ed-marker-n">Our mission</span><span className="ed-marker-line"/></div>
              <h2>Help many people build apps. <em>Not just the few who code.</em></h2>
              <p className="ed-body" style={{ maxWidth: "52ch" }}>The ability to build should belong to everyone with an idea: the bakery taking pickup orders, the coach filling classes, the organizer holding a community together. They know their problem better than any engineer we could hire. Our job is to remove everything standing between that knowledge and a working app.</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="ab2-photo">
              <image-slot id="ab-community-img" src="/site/site-images/v2/about/about-community.jpg" shape="rect" placeholder="A community photo: meetup, build night or launch day"></image-slot>
              <div className="ab2-photo-tag">
                <b>Our community</b>
                <span>Build nights, live sessions and launch days</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* BELIEFS */}
      <section className="ed-sec" data-screen-label="about-values">
        <div className="wrap">
          <Reveal className="ed-head ed-head-wide">
            <h2>Four things we <em>won't compromise.</em></h2>
          </Reveal>
          <div className="ab2-beliefs">
            {AB_BELIEFS.map((b, i) => (
              <Reveal key={b.t} delay={i * 50}>
                <div className="ab2-belief">
                  <span className="ab2-belief-n">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{b.t}</h3>
                    <p className="ed-body">{b.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="ed-sec ed-sec-alt" data-screen-label="about-story">
        <div className="wrap ab2-story">
          <div className="ab2-story-aside">
            <Reveal>
              <div className="ed-marker"><span className="ed-marker-n">How we got here</span><span className="ed-marker-line"/></div>
              <h2>Started in 2025, <em>one idea.</em></h2>
              <p className="ed-body">We started in 2025 with a simple goal: anyone with an idea should be able to build an app and sell it, without writing code.</p>
              <div className="ab2-story-photo">
                <image-slot id="ab-story-img" src="/site/site-images/v2/about/about-evolution.jpg" shape="rect" placeholder="An early meetup or team photo"></image-slot>
              </div>
            </Reveal>
          </div>
          <div className="ab2-time">
            {AB_MILESTONES.map((m, i) => (
              <Reveal key={i} delay={i * 50}>
                <div className={"ab2-row" + (m.next ? " ab2-row-next" : "")}>
                  <span className="ab2-year">{m.y}</span>
                  <div>
                    <h3>{m.t}</h3>
                    <p className="ed-body">{m.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL */}
      <section className="pad ab3-final-sec" data-screen-label="about-cta">
        <div className="wrap">
          <Reveal>
            <div className="ab3-final">
              <img src="/site/assets/logo-mark.png" alt="" className="ab3-final-mark" aria-hidden="true"/>
              <div className="eyebrow">Your turn</div>
              <h2 className="serif">Be part of it. <em>Build yours.</em></h2>
              <p>Start building the thing you have been describing to friends for months.</p>
              <div className="ab3-final-actions">
                <a className="btn btn-coral btn-lg" href="/signup">Get started <ArrowRight/></a>
                <span className="ab3-final-note" style={{ color: "#1A0F22" }}>Free to start · No card needed</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}


export default AboutPage;
