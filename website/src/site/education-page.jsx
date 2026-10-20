import React, { useState as useEduState } from 'react';
import { ABWA_TRAINING } from './training-data.js';
import { Reveal, ArrowRight, Check } from './part1.jsx';
/* ============= EDUCATION ============= */

const EDU_EVENTS = [
  { d: "TUE", day: "Tuesdays", kind: "Build along", tone: "coral",
    title: "Build a real app, start to finish",
    desc: "One app, from an empty prompt to a live link. Bring an idea and follow along, or watch how it's done and ask questions as we go." },
  { d: "FRI", day: "Fridays", kind: "Live Q&A", tone: "plum",
    title: "Open questions and live fixes",
    desc: "Bring whatever is stuck: a screen that keeps regenerating wrong, a domain that won't connect, a payment that won't go through. We fix it live." },
];

const EDU_PATHS = [
  { k: "01", ic: "\ud83e\udded", tone: "coral", title: "Never built anything", desc: "No code, no jargon. Start at the beginning and get something live in an afternoon.", label: "Foundations", to: "foundations" },
  { k: "02", ic: "\u270d\ufe0f", tone: "sun", title: "Building already", desc: "Skip the tour. Learn to get the right result in one pass instead of five.", label: "Prompting essentials", to: "prompting" },
  { k: "03", ic: "\ud83d\udcbc", tone: "plum", title: "Building to sell", desc: "Pricing, payments and publishing. Everything between a working app and a paying customer.", label: "Apps for client work", to: "clientwork" },
];

const EDU_VID_CATS = [
  ["all", "All videos"],
  ["start", "Getting started"],
  ["build", "Building"],
  ["data", "Data and payments"],
  ["ship", "Publishing and domains"],
  ["sell", "Selling your app"],
];

const EDU_COURSE_IMG = (id) => ["foundations","prompting","design","connectors","landing","clientwork"].includes(id) ? "/site/site-images/v2/education/course-" + id + ".jpg" : null;

const EDU_VID_IMG = {
  "Your first app in one sitting": "/site/site-images/v2/education/tutorial-01-first-app.jpg",
  "What credits are and how they get spent": "/site/site-images/v2/education/tutorial-02-credits.jpg",
  "A tour of the editor": "/site/site-images/v2/education/tutorial-03-editor.jpg",
  "Writing a prompt that lands first try": "/site/site-images/v2/education/tutorial-04-prompt.jpg",
  "Fixing a screen that keeps regenerating wrong": "/site/site-images/v2/education/tutorial-05-fix-screen.jpg",
  "Design systems, not palettes": "/site/site-images/v2/education/tutorial-06-design-system.jpg",
  "Multi-screen apps and navigation": "/site/site-images/v2/education/tutorial-07-navigation.jpg",
  "Taking your first payment with Stripe": "/site/site-images/v2/education/tutorial-08-payment.jpg",
  "Logins, roles and who can see what": "/site/site-images/v2/education/tutorial-10-access.jpg",
  "Publishing, versions and rolling back": "/site/site-images/v2/education/tutorial-12-publish.jpg",
  "Connecting a domain you already own": "/site/site-images/v2/education/tutorial-13-domain.jpg",
  "Getting found: titles, meta and previews": "/site/site-images/v2/education/tutorial-14-discovery.jpg",
  "Pricing an app you built in a weekend": "/site/site-images/v2/education/tutorial-15-pricing.jpg",
};

const EDU_VIDEOS = [
  { cat: "start", kind: "Tutorial", len: "6:12", tone: "coral", title: "Your first app in one sitting",
    desc: "Empty prompt to a live URL, unedited, including the parts that go wrong." },
  { cat: "start", kind: "Explainer", len: "4:38", tone: "sun", title: "What credits are and how they get spent",
    desc: "Where a build costs money, where it does not, and how to keep an estimate down." },
  { cat: "start", kind: "Tour", len: "8:05", tone: "plum", title: "A tour of the editor",
    desc: "Chat, canvas, inspector, versions. What each panel is for and when to reach for it." },

  { cat: "build", kind: "Tutorial", len: "9:41", tone: "mint", title: "Writing a prompt that lands first try",
    desc: "The five things a brief needs before you press build, with side-by-side results." },
  { cat: "build", kind: "Deep dive", len: "14:20", tone: "coral", title: "Fixing a screen that keeps regenerating wrong",
    desc: "Scoping an edit to one element instead of re-rolling the whole page." },
  { cat: "build", kind: "Walkthrough", len: "11:07", tone: "sky", title: "Design systems, not palettes",
    desc: "Picking a component set, theming it, and why swapping later means a rebuild." },
  { cat: "build", kind: "Tutorial", len: "7:29", tone: "sun", title: "Multi-screen apps and navigation",
    desc: "Routing, shared layout, and keeping state alive between screens." },

  { cat: "data", kind: "Tutorial", len: "5:52", tone: "plum", title: "Taking your first payment with Stripe",
    desc: "Connecting an account, a test charge, and reading the first payout." },
  { cat: "data", kind: "Explainer", len: "6:44", tone: "coral", title: "Logins, roles and who can see what",
    desc: "Accounts, admin views, and the permission mistakes we see most often." },

  { cat: "ship", kind: "Tutorial", len: "4:02", tone: "sun", title: "Publishing, versions and rolling back",
    desc: "Staging a change, shipping it, and undoing it in two clicks when it breaks." },
  { cat: "ship", kind: "Tutorial", len: "7:18", tone: "plum", title: "Connecting a domain you already own",
    desc: "DNS records at three common registrars, plus what to do while it propagates." },
  { cat: "ship", kind: "Explainer", len: "5:26", tone: "mint", title: "Getting found: titles, meta and previews",
    desc: "The handful of fields that decide how your app looks when someone shares it." },

  { cat: "sell", kind: "Walkthrough", len: "13:09", tone: "coral", title: "Pricing an app you built in a weekend",
    desc: "Three pricing shapes, what each one signals, and how to change it later." },
];

/* Typographic course art: no photography, no illustration.
   Tinted ground, oversized outlined numeral, hairline rules. */
function EduCover({ tone = "coral", n, label, title, tall }) {
  return (
    <span className={"edu-cover tone-" + tone + (tall ? " tall" : "")} aria-hidden="true">
      <span className="edu-cover-rules"></span>
      <span className="edu-cover-n">{n}</span>
      <span className="edu-cover-foot">
        {label && <span className="edu-cover-lab">{label}</span>}
        {title && <span className="edu-cover-t">{title}</span>}
      </span>
    </span>
  );
}

function EducationHero() {
  return (
    <section className="edu-hero" data-screen-label="education-hero">
      <div className="edu-hero-glow" aria-hidden="true"></div>
      <div className="wrap edu-hero-wrap">
        <div className="edu-hero-copy">
          <Reveal>
            <span className="edu-hero-eyebrow"><span className="edu-hero-dot"></span>Education</span>
            <h1 className="edu-hero-h">Master the platform.<br/> <em>Free.</em></h1>
            <p className="edu-hero-sub">
              Step-by-step courses, a video library, and live lessons every
              Tuesday and Friday. All of it free, on every plan.
            </p>
            <div className="edu-hero-cta">
              <a className="btn btn-coral btn-lg" href="/course?c=foundations">Start with Foundations</a>
              <a className="btn btn-outline btn-lg" href="#videos">Browse the video library</a>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <div className="edu2-live">
              <span className="edu-live-dot"></span>
              <span><b>Live lessons</b> Tuesdays and Fridays at 3pm ET</span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={80} className="edu-hero-art">
          <div className="edu-hero-stack">
            <div className="edu-hero-shot edu-hero-shot-back">
              <EduCover tone="sun" n="01" label="Course 01" title="Foundations"/>
            </div>
            <div className="edu-hero-shot edu-hero-shot-front">
              <image-slot id="edu-hero-a" src="/site/site-images/v2/education/education-futuristic.jpg" shape="rounded" radius="18" placeholder="Someone building, or a lesson view"></image-slot>
            </div>
            <div className="edu-hero-chip edu-hero-chip-1"><span className="edu-live-dot"></span>Live Tue and Fri, 3pm ET</div>
            <div className="edu-hero-chip edu-hero-chip-2">✓ Free on every plan</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function EduPaths() {
  return (
    <section className="pad edu-paths-sec">
      <div className="wrap-tight">
        <Reveal className="sec-head edu-paths-head">
          <div className="eyebrow">Where to start</div>
          <h2 className="serif">Three ways in.</h2>
          <p>Pick the one that sounds like you. Each drops you straight into the right first course.</p>
        </Reveal>
        <div className="edu-paths">
          {EDU_PATHS.map((p, i) => (
            <Reveal key={p.k} delay={i * 70}>
              <a className={"edu-path tone-" + p.tone} href={"/course?c=" + p.to}>
                <span className="edu-path-top">
                  <span className="edu-path-ic">{p.ic}</span>
                  <span className="edu-path-k">{p.k}</span>
                </span>
                <strong>{p.title}</strong>
                <span className="edu-path-d">{p.desc}</span>
                <span className="edu-path-foot">
                  <span className="edu-path-course">{p.label}</span>
                  <em>Start <ArrowRight/></em>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function EduFeatured() {
  const c = ABWA_TRAINING.COURSES[0];
  return (
    <section className="pad edu-feature-sec">
      <div className="wrap-tight">
        <Reveal className="sec-head">
          <div className="eyebrow">Start here</div>
          <h2 className="serif">The one everyone takes first.</h2>
        </Reveal>
        <Reveal>
          <a className="edu-feature" href={"/course?c=" + c.id}>
            <div className="edu-feature-art">
              {EDU_COURSE_IMG(c.id) ? <img className="edu-vid-img" src={EDU_COURSE_IMG(c.id)} alt=""/> : <EduCover tone={c.color} n="01" tall/>}
              <span className="edu-feature-badge">Start here</span>
            </div>
            <div className="edu-feature-body">
              <span className="edu-feature-kicker">{c.icon} Free course</span>
              <h2 className="serif">{c.title}</h2>
              <p>{c.outcome}</p>
              <ul className="edu-feature-list">
                {c.lessons.slice(0, 4).map((l) => <li key={l}><Check/> {l}</li>)}
                
              </ul>
              <span className="btn btn-coral">Watch the course <ArrowRight/></span>
            </div>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function EduCourses() {
  const T = ABWA_TRAINING;
  const [filter, setFilter] = useEduState("all");
  const courses = T.COURSES.filter((c) => filter === "all" || (filter === "free" ? c.lvl === "Free" : c.lvl !== "Free"));
  return (
    <section className="pad edu-courses-sec" id="training" data-screen-label="training">
      <div className="wrap-tight">
        <Reveal className="sec-head">
          <div className="eyebrow">Training</div>
          <h2 className="serif">Every course.</h2>
          <p>Work through them at your own pace. Every course is free with an account.</p>
        </Reveal>

        <Reveal>
          <div className="edu-filter">
            {[["all", "All courses"], ["free", "Free"], ["pro", "Pro and above"]].map(([id, label]) => (
              <button key={id} className={"edu-filter-b" + (filter === id ? " on" : "")} onClick={() => setFilter(id)}>{label}</button>
            ))}
          </div>
        </Reveal>

        <div className="edu-grid">
          {courses.map((c, i) => {
            return (
              <Reveal key={c.id} delay={i * 40}>
                <a className={"edu-card tone-" + c.color} href={"/course?c=" + c.id}>
                  <div className="edu-card-art">
                    {EDU_COURSE_IMG(c.id) ? <img className="edu-vid-img" src={EDU_COURSE_IMG(c.id)} alt="" loading="lazy"/> : <EduCover tone={c.color} n={String(i + 1).padStart(2, "0")}/>}
                  </div>
                  <div className="edu-card-body">
                    <div className="edu-card-meta">
                      <span className={"edu-lvl lvl-" + c.lvl.toLowerCase().replace(/\W/g, "")}>{c.lvl}</span>
                      <span>{c.lessons.length} lessons</span>{c.hrs && <><span className="edu-card-dot">·</span><span>{c.hrs}</span></>}
                    </div>
                    <h3>{c.title}</h3>
                    <p>{c.desc}</p>
                    <span className="edu-card-cta">Watch <ArrowRight/></span>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function EduEvents() {
  return (
    <section className="pad edu2-ev-sec" id="events" data-screen-label="events">
      <div className="wrap-tight">
        <Reveal>
          <div className="edu2-ev">
            <div className="edu2-ev-head">
              <div className="eyebrow"><span className="edu-live-dot"></span>Live, online</div>
              <h2 className="serif">Live lessons. <em>Tuesdays and Fridays at 3pm ET.</em></h2>
              <p>Same time every week, so you never have to check a calendar. Free on any plan, and every session is recorded.</p>
            </div>
            <div className="edu2-ev-grid">
              {EDU_EVENTS.map((e) => (
                <div key={e.d} className={"edu2-ev-card tone-" + e.tone}>
                  <div className="edu2-ev-when"><b>{e.d}</b><span>{e.day} · 3pm ET</span></div>
                  <span className="edu2-ev-kind">{e.kind}</span>
                  <h3>{e.title}</h3>
                  <p>{e.desc}</p>
                  <a className="btn btn-sm btn-coral" href="/signup">Save my seat</a>
                </div>
              ))}
            </div>
            <div className="edu2-ev-note"><Check/><span>Can't make it? Every session is recorded and posted the next day for account holders.</span></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function EduMeetups() {
  return (
    <section className="pad" data-screen-label="meetups">
      <div className="wrap-tight">
        <Reveal>
          <div className="edu-soon">
            <div className="edu-soon-art">
              <img src="/site/site-images/meetups.jpg" alt="Illustrated town square with map pins marking meetup spots" style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:20,display:"block"}}/>
            </div>
            <div className="edu-soon-body">
              <span className="edu-soon-tag">Coming soon</span>
              <h2 className="serif">Meetups, in person.</h2>
              <p>
                We are putting together local meetups so builders can compare notes
                somewhere other than a video call. Nothing scheduled yet. Leave your
                email and we will tell you when one lands near you.
              </p>
              <form className="res-newsletter" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="you@example.com" aria-label="Email for meetup updates"/>
                <button className="btn btn-coral">Keep me posted</button>
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function EduVidThumb({ v, n }) {
  return (
    <span className="edu-vid-art">
      {EDU_VID_IMG[v.title] ? <img className="edu-vid-img" src={EDU_VID_IMG[v.title]} alt="" loading="lazy"/> : <EduCover tone={v.tone} n={n}/>}
      <span className="edu-vid-play" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span>
      <span className="edu-vid-len">{v.len}</span>
    </span>
  );
}

function EduVideos() {
  const [cat, setCat] = useEduState("all");
  const list = EDU_VIDEOS.filter((v) => cat === "all" || v.cat === cat);
  const [lead, ...rest] = list;
  const catLabel = (id) => (EDU_VID_CATS.find((c) => c[0] === id) || [])[1];
  return (
    <section className="edu-vid-sec" id="videos" data-screen-label="videos">
      <div className="wrap-tight">
        <Reveal className="edu-vid-head">
          <div>
            <div className="eyebrow">Video library</div>
            <h2 className="serif">Watch it get built.</h2>
          </div>
          <p>Short tutorials and longer walkthroughs, recorded on the real product. Free on every plan with an account.</p>
        </Reveal>
        <Reveal>
          <div className="edu-filter edu-vid-filter">
            {EDU_VID_CATS.map(([id, label]) => (
              <button key={id} className={"edu-filter-b" + (cat === id ? " on" : "")} onClick={() => setCat(id)}>{label}</button>
            ))}
          </div>
        </Reveal>
        {lead && (
          <Reveal key={cat}>
            <a className={"edu-vid-lead tone-" + lead.tone} href="/signup">
              <EduVidThumb v={lead} n="01"/>
              <span className="edu-vid-lead-body">
                <span className="edu-vid-kind">{catLabel(lead.cat)} · {lead.kind}</span>
                <strong>{lead.title}</strong>
                <span className="edu-vid-d">{lead.desc}</span>
                <span className="btn btn-coral">Watch now <ArrowRight/></span>
              </span>
            </a>
          </Reveal>
        )}
        {rest.length > 0 && (
          <div className="edu-vid-grid">
            {rest.map((v, i) => (
              <Reveal key={v.title} delay={i * 35}>
                <a className={"edu-vid tone-" + v.tone} href="/signup">
                  <EduVidThumb v={v} n={String(i + 2).padStart(2, "0")}/>
                  <span className="edu-vid-body">
                    <span className="edu-vid-kind">{v.kind}</span>
                    <strong>{v.title}</strong>
                    <span className="edu-vid-d">{v.desc}</span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function EducationPage() {
  return (
    <>
      <EducationHero/>
      <EduVideos/>
      <EduPaths/>
      <EduFeatured/>
      <EduCourses/>
      <EduEvents/>
      <EduMeetups/>
    </>
  );
}


export default EducationPage;
