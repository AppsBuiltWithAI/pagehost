import React, { useState, useMemo } from 'react';
import { Reveal, ArrowRight, Check } from './part1.jsx';


/* ============= AFFILIATES ============= */

const TIER_CUTOFFS = [
  { min: 0,    max: 4,    name: "Starter",   rate: 0.20, color: "ink" },
  { min: 5,    max: 19,   name: "Pro",       rate: 0.25, color: "coral" },
  { min: 20,   max: 49,   name: "Elite",     rate: 0.30, color: "plum" },
  { min: 50,   max: 1e9,  name: "Legend",    rate: 0.40, color: "sun" },
];

function affiliateTier(referrals) {
  return TIER_CUTOFFS.find(t => referrals >= t.min && referrals <= t.max);
}

function AffiliatesPage() {
  const [referrals, setReferrals] = useState(12);
  const [arpu, setArpu] = useState(19);  // avg revenue per user per month

  const tier = affiliateTier(referrals);
  const monthly  = Math.round(referrals * arpu * tier.rate);
  const annual   = monthly * 12;
  const lifetime = monthly * 24; // 24-mo avg retention

  return (
    <>
      <section className="sub-hero" data-screen-label="affiliates-hero">
        <div className="wrap-tight">
          <Reveal>
            <div className="eyebrow">Affiliate program</div>
            <h1 className="serif">Tell a friend. <em>Get paid for it.</em></h1>
            <p className="sub-lead">
              Earn 20-40% recurring on every customer you refer, for as long
              as they pay us. No quotas, no expiry, no "tier reset" tricks.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="sub-meta">
              <span>Recurring commission</span>
              <span className="dot"/>
              <span>Payouts on the 15th</span>
              <span className="dot"/>
              <span>30-day cookie window</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Calculator */}
      <section className="pad">
        <div className="wrap-tight">
          <Reveal>
            <div className="af-calc">
              <div className="af-calc-head">
                <div className="eyebrow">Earnings calculator</div>
                <h2 className="serif">Math it out.</h2>
                <p>Drag the sliders. Real-time numbers based on our actual program rates.</p>
              </div>

              <div className="af-slider-row">
                <div className="af-slider-label">
                  <span>How many paying customers do you refer per month?</span>
                  <strong>{referrals}</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={referrals}
                  onChange={(e) => setReferrals(parseInt(e.target.value, 10))}
                  className="af-slider"
                />
                <div className="af-slider-ticks">
                  <span>0</span><span>25</span><span>50</span><span>75</span><span>100</span>
                </div>
              </div>

              <div className="af-slider-row">
                <div className="af-slider-label">
                  <span>Average plan price your referrals pick</span>
                  <strong>${arpu}/mo</strong>
                </div>
                <input
                  type="range"
                  min="9"
                  max="79"
                  step="2"
                  value={arpu}
                  onChange={(e) => setArpu(parseInt(e.target.value, 10))}
                  className="af-slider"
                />
                <div className="af-slider-ticks">
                  <span>$9 (Starter)</span>
                  <span>$19 (Pro)</span>
                  <span>$49 (Team)</span>
                  <span>$79 (Business)</span>
                </div>
              </div>

              <div className={"af-tier tone-" + tier.color}>
                <div className="af-tier-label">Your tier</div>
                <div className="af-tier-name">{tier.name}</div>
                <div className="af-tier-rate">{Math.round(tier.rate * 100)}% recurring</div>
              </div>

              <div className="af-results">
                <div className="af-result">
                  <div className="af-result-label">Monthly</div>
                  <div className="af-result-num">${monthly.toLocaleString()}</div>
                </div>
                <div className="af-result featured">
                  <div className="af-result-label">Annual</div>
                  <div className="af-result-num">${annual.toLocaleString()}</div>
                </div>
                <div className="af-result">
                  <div className="af-result-label">Lifetime (24mo)</div>
                  <div className="af-result-num">${lifetime.toLocaleString()}</div>
                </div>
              </div>

              <div className="af-cta">
                <a className="btn btn-coral btn-lg" href="/signup">Join the program ,  free <ArrowRight/></a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Tiers */}
      <section className="pad pt-0">
        <div className="wrap">
          <Reveal className="sec-head">
            <div className="eyebrow">The tiers</div>
            <h2 className="serif">More referrals, <em>better rate.</em></h2>
          </Reveal>
          <div className="af-tiers-grid">
            {TIER_CUTOFFS.map((t, i) => (
              <Reveal key={t.name} delay={i * 50}>
                <div className={"af-tier-card tone-" + t.color + (tier.name === t.name ? " current" : "")}>
                  {tier.name === t.name && <div className="af-tier-card-flag">Your tier</div>}
                  <h3>{t.name}</h3>
                  <div className="af-tier-card-rate">{Math.round(t.rate * 100)}%</div>
                  <div className="af-tier-card-min">{t.min === 0 ? "Up to 4" : t.min + "+"} referrals/mo</div>
                  <p>{["Starter perks: link, dashboard, tracking.", "Pro perks: co-marketing, swag, leads.", "Elite perks: dedicated manager, beta access.", "Legend perks: profit share, equity options."][i]}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="pad pt-0">
        <div className="wrap-tight">
          <Reveal className="sec-head">
            <div className="eyebrow">How it works</div>
            <h2 className="serif">Three steps, <em>no awkwardness.</em></h2>
          </Reveal>
          <div className="af-how">
            <Reveal>
              <div className="af-how-step">
                <div className="af-how-num">01</div>
                <h3>Get your link</h3>
                <p>Sign up free, get a personal referral URL. Track clicks, signups, and earnings in real time.</p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="af-how-step">
                <div className="af-how-num">02</div>
                <h3>Share it</h3>
                <p>Email, social, your newsletter, a YouTube description, a podcast read ,  wherever feels right.</p>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div className="af-how-step">
                <div className="af-how-num">03</div>
                <h3>Get paid</h3>
                <p>Payouts on the 15th via Stripe or PayPal. $50 minimum payout, no fees on our end.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ light */}
      <section className="pad pt-0">
        <div className="wrap-tight">
          <Reveal className="sec-head">
            <div className="eyebrow">FAQ</div>
            <h2 className="serif">Quick answers.</h2>
          </Reveal>
          <div className="af-faq">
            {[
              ["Is there a cap?", "Nope. Earn as much as you can refer. Legend tier (50+/mo) gets a custom contract."],
              ["How long does commission last?", "For as long as your referral pays us. Cancel, refund, downgrade ,  you earn the same way they do."],
              ["What's the cookie window?", "30 days from first click. They sign up later? You still get credit."],
              ["Can I run paid ads?", "Yes, except bidding on \"appsbuiltwithai\" or close variants. Otherwise: go for it."],
              ["What happens if I refer myself?", "Self-referrals don't count. We check."],
              ["Do you support W-9 / international tax forms?", "Yes ,  Stripe Connect handles it. You'll be guided through during signup."],
            ].map(([q, a], i) => (
              <Reveal key={q} delay={i * 30}>
                <details className="af-faq-row">
                  <summary>{q}</summary>
                  <p>{a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default AffiliatesPage;
