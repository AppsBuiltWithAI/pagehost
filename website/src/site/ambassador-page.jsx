import React, { useState as useAmState } from 'react';
import { Reveal, ArrowRight, Check } from './part1.jsx';
const AM_TIERS = [
  { name: "Ambassador", tone: "lav", need: "Invite only", rate: "30%",
    perks: ["Give your audience 100 bonus credits", "Your own Ambassador dashboard", "Early access to new features", "Welcome swag kit", "Ambassador badge for your profile"] },
  { name: "Senior Ambassador", tone: "coral", need: "200+ referrals", rate: "40%", featured: true,
    perks: ["Everything in Ambassador", "Free Pro plan", "500 bonus credits a month for you", "Quarterly swag box", "Seat in the private beta group", "Priority support"] },
];

const AM_PERKS = [
  { ic: "M12 2l2.4 6.9H22l-6 4.4 2.3 7.1L12 16l-6.3 4.4L8 13.3 2 8.9h7.6z", tone: "coral", t: "100 credits for your audience", d: "Everyone who signs up with your link gets 100 bonus credits, so your audience starts with more than a normal free account." },
  { ic: "M3 3h7v9H3zM14 3h7v5h-7zM14 12h7v9h-7zM3 16h7v5H3z", tone: "lav", t: "Your own dashboard", d: "Track signups, credits claimed, commission and payouts in one place." },
  { ic: "M3 17l6-6 4 4 8-8M15 7h6v6", tone: "mint", t: "Commission on every payment", d: "30% on every payment your referrals make, rising to 40% once you pass 200 referrals." },
  { ic: "M12 8v4l3 2M12 21a9 9 0 100-18 9 9 0 000 18z", tone: "sky", t: "Early access", d: "Try new features before anyone else, so you can show your audience first." },
  { ic: "M20 12v9H4v-9M2 7h20v5H2zM12 21V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z", tone: "sun", t: "Swag", d: "A welcome kit when you join. Senior Ambassadors get a box every quarter." },
];

function AmIcon({ d }) { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d}/></svg>; }

function AmInviteForm() {
  const [f, setF] = useAmState({ name: "", email: "", aff: "", where: "" });
  const [sent, setSent] = useAmState(false);
  const valid = /\S+@\S+\.\S+/.test(f.email) && f.name.trim();
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  if (sent) return (
    <div className="am-form am-form-sent">
      <span className="am-sent-check"><Check/></span>
      <h3>Request received.</h3>
      <p>We review requests every two weeks. If you're a fit, your invite arrives by email.</p>
    </div>
  );
  return (
    <form className="am-form" onSubmit={(e) => { e.preventDefault(); if (valid) setSent(true); }}>
      <h3>Request an invite</h3>
      <p className="am-form-sub">Tell us where you share and who your audience is. We'll review it and get back to you.</p>
      <label className="am-field"><span>Name</span><input value={f.name} onChange={set("name")} placeholder="Your name"/></label>
      <label className="am-field"><span>Email</span><input type="email" value={f.email} onChange={set("email")} placeholder="you@example.com"/></label>
      <label className="am-field"><span>Affiliate link or ID <i>(optional)</i></span><input value={f.aff} onChange={set("aff")} placeholder="appsbuiltwithai.com/r/yourname"/></label>
      <label className="am-field"><span>Where do you share? <i>(optional)</i></span><input value={f.where} onChange={set("where")} placeholder="YouTube, newsletter, community, podcast"/></label>
      <button className="btn btn-coral am-submit" disabled={!valid}>Request an invite <ArrowRight/></button>
    </form>
  );
}

function AmbassadorPage() {
  return (
    <main data-screen-label="ambassador">
      <section className="am-hero" data-screen-label="ambassador-hero">
        <div className="wrap am-hero-in">
          <Reveal>
            <span className="am-kicker"><span className="am-kicker-dot"></span>Invite only</span>
            <h1>The Ambassador <em className="serif">program.</em></h1>
            <p className="am-lead">Earn 30% on every payment your referrals make, and 40% once you pass 200 referrals. Plus your own dashboard to give your audience 100 bonus credits when they sign up.</p>
            <div className="am-cta-row">
              <a className="btn btn-coral am-cta" href="#invite">Request an invite <ArrowRight/></a>
              <a className="btn btn-outline am-cta" href="/affiliate">Not an affiliate yet? Start here</a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pad am-gift-sec" data-screen-label="ambassador-giveaway">
        <div className="wrap">
          <Reveal>
            <div className="am-gift">
              <div className="am-gift-copy">
                <div className="eyebrow">Your audience gets a head start</div>
                <h2>Give away <em>100 bonus credits.</em></h2>
                <p>Every Ambassador gets a giveaway link. When someone signs up with it, 100 bonus credits land in their account on top of the free plan. You see every claim in your dashboard.</p>
              </div>
              <div className="am-gift-card" aria-hidden="true">
                <span className="am-gift-from">From your Ambassador</span>
                <span className="am-gift-n">+100</span>
                <span className="am-gift-l">bonus credits</span>
                <span className="am-gift-link">appsbuiltwithai.com/r/yourname</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pad pt-0" data-screen-label="ambassador-tiers">
        <div className="wrap-tight">
          <Reveal className="sec-head">
            <div className="eyebrow">Levels</div>
            <h2>Two levels. <em>You move up automatically.</em></h2>
            <p>Pass 200 referrals and you become a Senior Ambassador the next month.</p>
          </Reveal>
          <div className="am-tiers am-tiers-2">
            {AM_TIERS.map((t, i) => (
              <Reveal key={t.name} delay={i * 60}>
                <article className={"am-tier tone-" + t.tone + (t.featured ? " featured" : "")}>
                  <div className="am-tier-top">
                    <span className="am-tier-lvl">Level {i + 1}</span>
                    <h3>{t.name}</h3>
                    <span className="am-tier-need">{t.need}</span>
                  </div>
                  <div className="am-tier-rate">{t.rate}<small>commission on every payment</small></div>
                  <ul>{t.perks.map((p) => <li key={p}><Check/> {p}</li>)}</ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pad am-perks-sec" data-screen-label="ambassador-perks">
        <div className="wrap">
          <Reveal className="sec-head">
            <div className="eyebrow">Perks</div>
            <h2>What Ambassadors <em>get.</em></h2>
          </Reveal>
          <div className="am-perks">
            {AM_PERKS.map((p, i) => (
              <Reveal key={p.t} delay={i * 40}>
                <div className={"am-perk tone-" + p.tone}>
                  <span className="am-perk-ic"><AmIcon d={p.ic}/></span>
                  <h3>{p.t}</h3>
                  <p>{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pad am-invite" id="invite" data-screen-label="ambassador-invite">
        <div className="wrap am-invite-grid">
          <Reveal>
            <div className="eyebrow">Get invited</div>
            <h2>Two ways in.</h2>
            <ol className="am-steps">
              <li><span>1</span><div><b>Grow as an affiliate</b><p>We invite our most active affiliates every month.</p></div></li>
              <li><span>2</span><div><b>Or request an invite</b><p>If you have an audience that builds apps to sell, tell us about it. We review requests every two weeks.</p></div></li>
            </ol>
            <p className="am-fine">A referral is someone who signs up with your link. Levels are reviewed monthly. Program terms may change before public launch.</p>
          </Reveal>
          <Reveal delay={100}><AmInviteForm/></Reveal>
        </div>
      </section>
    </main>
  );
}


export default AmbassadorPage;
