import React, { useState as useAfState } from 'react';
import { Reveal, ArrowRight, Check } from './part1.jsx';
const AF_AGENTS = [
  { n: "01", t: "Plan", d: "The planning agent asks six simple questions and plans out your project: who it's for, the problem, and the must-have features." },
  { n: "02", t: "Build", d: "A chat-driven editor with a live preview. Every typed instruction becomes working software in seconds." },
  { n: "03", t: "Test", d: "The tester agent walks the app end-to-end every morning, monitors uptime, and flags what breaks." },
  { n: "04", t: "Secure", d: "Every app is scanned for security problems before and after it goes live." },
  { n: "05", t: "Launch", d: "A launch-readiness score, soft-launch mode, and a daily co-pilot drafting the announcement post." },
  { n: "06", t: "Grow", d: "The marketing agent scans thousands of communities for the best-fit audience and drafts native posts." },
];

function AffiliateOptin({ compact }) {
  const [email, setEmail] = useAfState("");
  const [name, setName]   = useAfState("");
  const [where, setWhere] = useAfState("");
  const [agree, setAgree] = useAfState(false);
  const [sent, setSent]   = useAfState(false);
  const valid = /\S+@\S+\.\S+/.test(email) && agree;
  if (sent) {
    return (
      <div className="af-optin af-optin-sent">
        <span className="af-sent-check"><Check/></span>
        <h3>You're on the list.</h3>
        <p>We review applications weekly. Your affiliate link and promo kit arrive by email once you're approved.</p>
      </div>
    );
  }
  return (
    <form className={"af-optin" + (compact ? " compact" : "")} onSubmit={(e) => { e.preventDefault(); if (valid) window.location.href = "/affiliate-thanks"; }}>
      <div className="af-optin-head">
        <h3>Apply to the program</h3>
        <p>Free to join. No follower minimum: we care about fit, not size.</p>
      </div>
      <label className="af-field">
        <span>Name</span>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
      </label>
      <label className="af-field">
        <span>Email</span>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
      </label>
      <label className="af-field">
        <span>Where will you promote? <i>(optional)</i></span>
        <input value={where} onChange={(e) => setWhere(e.target.value)} placeholder="YouTube channel, newsletter, community…" />
      </label>
      <label className="af-agree">
        <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
        <span>I'd like to receive the affiliate kit and program updates by email. Unsubscribe anytime.</span>
      </label>
      <button className="btn btn-coral af-submit" disabled={!valid}>Apply now <ArrowRight/></button>
      <div className="af-fine">Applications reviewed weekly · currently in private beta · top affiliates get invited to the <a href="/ambassador">Ambassador program</a></div>
    </form>
  );
}

function AffiliatePage() {
  return (
    <main data-screen-label="affiliate">
      {/* HERO: full-bleed image */}
      <section className="af-hero" data-screen-label="affiliate-hero">
        <div className="af-hero-media">
          <image-slot id="af-hero-img" src="/site/site-images/v2/affiliate/affiliate-futuristic.jpg" shape="rect" placeholder=" "></image-slot>
          <div className="af-hero-scrim"></div>
          <div className="af-drop-hint">Drop a hero image ↗</div>
          <div className="wrap af-hero-overlay">
            <Reveal>
              <div className="af-hero-kicker"><span className="af-kicker-dot"></span>Affiliate program</div>
              <h1>Refer builders.<br/> <em className="serif">Get paid monthly.</em></h1>
              <p className="af-lead">Send people to the app builder for non-coders, and earn 30% of every bill for a full year. No card, no trial timer, no gatekeeping.</p>
              <div className="af-hero-cta-row">
                <a className="btn btn-coral af-hero-cta" href="#apply">Apply now <ArrowRight/></a>
                <a className="btn btn-outline af-hero-cta af-hero-cta-ghost" href="#af-video">Watch the pitch</a>
              </div>
              <div className="af-hero-cta-note">Free to join · no follower minimum · reviewed weekly</div>
            </Reveal>
          </div>
        </div>
        <div className="wrap">
          <Reveal delay={80}>
            <div className="af-stats-band">
              <div className="af-stat">
                <span className="af-stat-num">30<i>%</i></span>
                <span className="af-stat-lbl">Recurring commission</span>
                <span className="af-stat-sub">on every bill your referrals pay</span>
              </div>
              <div className="af-stat">
                <span className="af-stat-num">12<i>mo</i></span>
                <span className="af-stat-lbl">Paid per referral</span>
                <span className="af-stat-sub">a full year of payouts, each account</span>
              </div>
              <div className="af-stat">
                <span className="af-stat-num">All<i>plans</i></span>
                <span className="af-stat-lbl">Every tier counts</span>
                <span className="af-stat-sub">Pro to Business: no carve-outs</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* VIDEO */}
      <section className="pad af-video-sec" id="af-video" data-screen-label="affiliate-video">
        <div className="wrap-tight">
          <Reveal className="sec-head">
            <div className="eyebrow">See the pitch</div>
            <h2>Watch what you'd <em>be promoting.</em></h2>
            <p>A 90-second walkthrough: from a one-sentence idea to a live, working app. Share this clip directly with your audience.</p>
          </Reveal>
          <Reveal delay={80}>
            <div className="af-video" onClick={(e) => { const v = e.currentTarget; v.classList.add('playing'); }}>
              <image-slot id="af-video-poster" src="/site/site-images/v2/affiliate/affiliate-poster.jpg" shape="rect" placeholder=" "></image-slot>
              <div className="af-video-scrim"></div>
              <button className="af-video-play" type="button" aria-label="Play video">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </button>
              <div className="af-video-meta">
                <span className="af-video-badge">1:30</span>
                <span>Idea → live app, in real time</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* APPLY */}
      <section className="pad af-apply" id="apply" data-screen-label="affiliate-apply">
        <div className="wrap af-apply-grid">
          <Reveal>
            <div className="eyebrow">Get your link</div>
            <h2>Two minutes to apply.<br/> <em>A year of payouts.</em></h2>
            <p className="af-apply-lead">Tell us where you'll share it: a channel, a newsletter, a community, a group chat. We review weekly and send your link with a ready-made promo kit.</p>
            <div className="af-apply-points">
              <div className="af-point tone-coral"><span className="af-point-ic">🔗</span><div><b>Unique link + dashboard</b><span>Track clicks, signups, and payouts live</span></div></div>
              <div className="af-point tone-sun"><span className="af-point-ic">🎬</span><div><b>Promo kit included</b><span>Copy, screenshots, and demo clips ready to post</span></div></div>
              <div className="af-point tone-mint"><span className="af-point-ic">💸</span><div><b>Paid your way</b><span>Payouts via Stripe or PayPal, every month</span></div></div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <AffiliateOptin/>
          </Reveal>
        </div>
      </section>

      {/* COMMISSION */}
      <section className="pad af-commission" data-screen-label="affiliate-commission">
        <div className="wrap-tight">
          <Reveal className="sec-head">
            <div className="eyebrow">Commission</div>
            <h2>30% of every bill, <em>for 12 months.</em></h2>
            <p>A flat rate on every active account under your link: every plan, every tier, no exceptions carved out.</p>
          </Reveal>
          <Reveal delay={80}>
            <div className="af-compound">
              <div className="af-compound-chart">
                <div className="af-compound-kicker">One referral a month, Pro plan</div>
                <div className="af-compound-row">
                  {[{ m: "Month 1", v: "$30" }, { m: "Month 2", v: "$59" }, { m: "Month 3", v: "$89" }, { m: "Month 6", v: "$178" }, { m: "Month 12", v: "$356" }].map((x, i) => (
                    <div key={x.m} className="af-compound-col">
                      <span className="af-compound-val">{x.v}</span>
                      <div className="af-compound-bar" style={{ height: 26 + i * 26 }}></div>
                      <span>{x.m}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="af-compound-side">
                <h3>It compounds.</h3>
                <p>Accounts you bring in this month stack on top of last month's: each pays out for 12 full billing cycles.</p>
                <div className="af-example">
                  <span className="af-example-lbl">EXAMPLE</span>
                  <span className="af-example-line">3 Pro referrals / mo × $99 plan</span>
                  <span className="af-example-num">$1,069<i>/ mo by month 12</i></span>
                </div>
              </div>
            </div>
            <div className="af-payout-chips">
              <div className="af-payout-chip"><span>Starter · $19/mo</span><b>you earn $5.70 / mo</b></div>
              <div className="af-payout-chip"><span>Growth · $49/mo</span><b>you earn $14.70 / mo</b></div>
              <div className="af-payout-chip"><span>Pro · $99/mo</span><b>you earn $29.70 / mo</b></div>
              <div className="af-payout-chip"><span>Scale · $199/mo</span><b>you earn $59.70 / mo</b></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* DREAM RIDE */}
      <section className="af-ride" data-screen-label="affiliate-dream-ride">
        <div className="af-ride-glow"></div>
        <div className="wrap af-ride-grid">
          <Reveal>
            <div className="eyebrow af-ride-eyebrow">Milestone reward</div>
            <h2>What's your <em className="serif">dream ride?</em></h2>
            <p>Get and keep <b>100+ active members</b>, and you'll qualify for the Dream Ride bonus: on top of your regular commission, we'll reimburse your car lease or purchase payment.</p>
            <p className="af-ride-tag">Whatever you drive, we'll help you pay for it.</p>
            <div className="af-ride-meter">
              <div className="af-ride-meter-top"><span>Your active referrals</span><b>100 to qualify</b></div>
              <div className="af-ride-road">
                <svg className="af-car" viewBox="0 0 120 48" aria-hidden="true">
                  <path d="M8 34c0-3 2-8 7-9l9-2 10-9c2-2 5-3 8-3h30c3 0 6 1 8 3l9 9 14 3c4 1 7 4 7 8v4c0 2-2 4-4 4h-4a10 10 0 0 1-20 0H38a10 10 0 0 1-20 0h-6c-2 0-4-2-4-4v-4z" fill="#FFB238"/>
                  <path d="M38 15c1-1 3-2 4-2h12v11H28l10-9zM58 13h14c1 0 3 1 4 2l9 9H58V13z" fill="#1F1A2E" opacity=".85"/>
                  <circle cx="28" cy="38" r="8" fill="#1F1A2E" stroke="#FAF5EA" strokeWidth="2.5"/>
                  <circle cx="92" cy="38" r="8" fill="#1F1A2E" stroke="#FAF5EA" strokeWidth="2.5"/>
                </svg>
                <div className="af-ride-track"><div className="af-ride-fill"></div></div>
                <div className="af-ride-flag">🏁</div>
              </div>
              <div className="af-ride-marks"><span>0</span><span>25</span><span>50</span><span>75</span><span className="hit">100</span></div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="af-ride-photo">
              <image-slot id="af-ride-img" src="/site/site-images/v2/affiliate/affiliate-dream-ride.jpg" shape="rect" placeholder=" "></image-slot>
              <div className="af-ride-photo-hint">Drop your dream car ↗</div>
              <div className="af-ride-photo-tag"><b>Dream Ride bonus</b><span>Lease or purchase: reimbursed monthly while you hold 100+</span></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHAT YOU'RE PROMOTING */}
      <section className="pad" data-screen-label="affiliate-product">
        <div className="wrap-tight">
          <Reveal className="sec-head">
            <div className="eyebrow">Promotion assets</div>
            <h2>One product. <em>One pitch.</em></h2>
            <p>Describe an app in plain English, and six built-in agents plan it, build it, test it, secure it, launch it, and help grow it: live in minutes, not months.</p>
          </Reveal>
          <div className="af-agents">
            {AF_AGENTS.map((a, i) => (
              <Reveal key={a.n} delay={i * 40}>
                <div className="af-agent">
                  <span className="af-agent-num serif">{a.n}</span>
                  <div><h3>{a.t}</h3><p>{a.d}</p></div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <blockquote className="af-quote">
              "Build a working app from a sentence and publish it before your coffee gets cold: no code, no design skills, no engineering hires."
              <cite>Suggested talking point</cite>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* TERMS + FINAL OPT-IN */}
      <section className="pad af-terms-sec" data-screen-label="affiliate-terms">
        <div className="wrap-tight">
          <Reveal className="sec-head">
            <div className="eyebrow">The fine print</div>
            <h2>Program terms, <em>in plain English.</em></h2>
          </Reveal>
          <div className="af-terms-grid2">
            {[
              { n: "01", t: "Eligibility", d: "Commission applies to active, paying accounts referred through your unique affiliate link." },
              { n: "02", t: "Payout schedule", d: "Issued monthly for 12 billing cycles per referred account, while it remains subscribed." },
              { n: "03", t: "Dream Ride threshold", d: "100+ active referred members, maintained continuously, qualifies you for the car reimbursement." },
              { n: "04", t: "Program status", d: "Currently in private beta: structure and terms may be updated before public launch." },
            ].map((x, i) => (
              <Reveal key={x.n} delay={i * 50}>
                <div className="af-term-card">
                  <span className="af-term-num serif">{x.n}</span>
                  <h3>{x.t}</h3>
                  <p>{x.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <p className="af-terms-fine">This page is a summary for applicants and does not constitute a binding agreement; full terms are provided upon acceptance.</p>
            <div className="af-final-cta">
              <div>
                <h3>Ready to start earning?</h3>
                <p>Apply in two minutes: we review weekly.</p>
              </div>
              <a className="btn btn-coral af-hero-cta" href="#apply">Apply now <ArrowRight/></a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}


export default AffiliatePage;
