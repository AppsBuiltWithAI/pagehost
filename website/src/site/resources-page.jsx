import React from 'react';
import { Reveal, ArrowRight } from './part1.jsx';
/* ============= RESOURCES HUB: Learn / Training / Support ============= */

const LEARN_ARTICLES = [
  { id: "first-app", tag: "Guide", read: "8 min", title: "Your first app, end to end", desc: "Go from a prompt to a live link, step by step, with nothing skipped.", color: "coral" },
  { id: "prompting", tag: "Guide", read: "6 min", title: "Writing prompts that work", desc: "The exact phrasing that makes the builder do its best work. Examples included.", color: "sun"  },
  { id: "plan-mode", tag: "Article", read: "5 min", title: "When to use Plan mode", desc: "A little planning up front saves a lot of regenerating later. Here's when it's worth it.", color: "plum" },
  { id: "stripe", tag: "Article", read: "4 min", title: "Connecting Stripe", desc: "The fastest path from \"I want to take payments\" to a working checkout.", color: "mint" },
];

/* course catalog lives in training-data.js (shared with course.html) */

const SUPPORT_TOPICS = [
  { ic: "🪧", title: "Getting started", desc: "Account, plans, your first build.", count: 24 },
  { ic: "🔌", title: "Connectors", desc: "Stripe, Gmail, Slack, OAuth issues.", count: 38 },
  { ic: "🌍", title: "Domains & SSL", desc: "Custom domains, DNS records, certs.", count: 17 },
  { ic: "💳", title: "Billing & credits", desc: "Plans, top-ups, refunds, taxes.", count: 22 },
  { ic: "🔒", title: "Security & privacy", desc: "2FA, SSO, data export, account deletion.", count: 14 },
  { ic: "🤖", title: "AI builder", desc: "Prompts, edits, scenarios that aren't working.", count: 31 },
];

const FAQ_QUICK = [
  ["Do I need to know how to code?", "No. The whole point is: you describe what you want in plain English, the builder does the code."],
  ["Can I cancel anytime?", "Yes. Two clicks, takes effect immediately. We keep your apps live on Free until they exceed limits."],
  ["What if my idea is too complicated?", "Try Plan mode: it walks you through the brief. If your idea is genuinely beyond what we can build, we'll tell you up front."],
  ["Can I export the code?", "Yes, on Pro and above. You own it: host it anywhere."],
  ["Is my data private?", "Yes. Your data isn't used to train models. Full whitepaper on the Security page."],
];

const TUT_COURSE = {"first-app":"foundations","prompting":"prompting","plan-mode":"foundations","stripe":"connectors","shop":"landing","domains":"landing"};
const TUT_STEP = { "first-app": "Start here", prompting: "Building", "plan-mode": "Planning", stripe: "Payments", shop: "Selling", domains: "Publishing" };

function ResourcesPage() {
  const [feat, ...rest] = LEARN_ARTICLES;
  const href = (a) => "/course?c=" + (TUT_COURSE[a.id] || "foundations");
  return (
    <>
      <section className="tut-hero" data-screen-label="tutorials-hero">
        <div className="wrap">
          <Reveal className="tut-hero-in">
            <div className="eyebrow">Tutorials</div>
            <h1 className="serif">Learn it once. <em>Build it right.</em></h1>
            <p className="sub-lead">Step-by-step tutorials for every part of building an app you can sell, from the first prompt to taking payments.</p>
          </Reveal>
        </div>
      </section>

      <section className="pad tut-sec" data-screen-label="tutorials-list">
        <div className="wrap">
          <Reveal>
            <a className={"tut-feat tone-" + feat.color} href={href(feat)}>
              <span className="tut-feat-img"><img src={"/site/site-images/v2/resources/" + feat.id + ".png"} alt=""/></span>
              <span className="tut-feat-body">
                <span className="tut-step">{TUT_STEP[feat.id]}</span>
                <b className="serif">{feat.title}</b>
                <span className="tut-desc">{feat.desc}</span>
                <span className="btn btn-coral tut-feat-btn">Start the tutorial <ArrowRight/></span>
              </span>
            </a>
          </Reveal>
          <div className="tut-grid">
            {rest.map((a, i) => (
              <Reveal key={a.id} delay={i * 50}>
                <a className={"tut-card tone-" + a.color} href={href(a)}>
                  <span className="tut-card-img"><img src={"/site/site-images/v2/resources/" + a.id + ".png"} alt="" loading="lazy"/></span>
                  <span className="tut-step">{TUT_STEP[a.id]}</span>
                  <b>{a.title}</b>
                  <span className="tut-desc">{a.desc}</span>
                  <span className="tut-go">Open tutorial <ArrowRight/></span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pad pt-0">
        <div className="wrap">
          <Reveal>
            <div className="tut-help">
              <div>
                <h2 className="serif">Stuck on something specific?</h2>
                <p>Ask the support desk in plain English, or join a live lesson on Tuesdays and Fridays at 3pm ET.</p>
              </div>
              <div className="tut-help-actions">
                <a className="btn btn-coral" href="/support">Ask support <ArrowRight/></a>
                <a className="btn tut-btn-light" href="/education#events">Live lessons</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}


export default ResourcesPage;
