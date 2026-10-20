import React from 'react';
import { Reveal, ArrowRight, Check } from './part1.jsx';
function AffiliateThanksPage() {
  return (
    <main data-screen-label="affiliate-thanks">
      <section className="af-thanks" data-screen-label="thanks-hero">
        <div className="af-thanks-glow"></div>
        <div className="af-confetti" aria-hidden="true">
          {[...Array(14)].map((_, i) => <i key={i} style={{ left: (4 + i * 7) + "%", animationDelay: (i * .35) + "s" }}></i>)}
        </div>
        <div className="wrap-tight af-thanks-inner">
          <div className="af-fadein">
            <div className="af-thanks-check"><Check/></div>
            <div className="eyebrow af-thanks-eyebrow">Application received</div>
            <h1>You're in the queue.<br/> <em className="serif">Nice move.</em></h1>
            <p className="af-thanks-lead">We review applications every week. Keep an eye on your inbox: your unique link and the full promo kit arrive as soon as you're approved.</p>
            <div className="af-thanks-remind"><b>30%</b> of every bill · <b>12 months</b> per referral · Dream Ride at <b>100 members</b></div>
          </div>
          <div className="af-fadein" style={{ animationDelay: "120ms" }}>
            <div className="af-thanks-steps">
              <div className="af-tstep is-done">
                <span className="af-tstep-dot"><Check/></span>
                <div><b>Application sent</b><span>Just now</span></div>
              </div>
              <div className="af-tstep">
                <span className="af-tstep-dot">2</span>
                <div><b>We review it</b><span>Within 7 days</span></div>
              </div>
              <div className="af-tstep">
                <span className="af-tstep-dot">3</span>
                <div><b>Link + promo kit</b><span>By email on approval</span></div>
              </div>
              <div className="af-tstep">
                <span className="af-tstep-dot">4</span>
                <div><b>First payout</b><span>Month after your first referral</span></div>
              </div>
            </div>
          </div>
          <div className="af-fadein" style={{ animationDelay: "220ms" }}>
            <div className="af-thanks-meanwhile">
              <h3>While you wait</h3>
              <div className="af-thanks-cards">
                <a className="af-thanks-card" href="/">
                  <span className="af-thanks-card-ic">🛠️</span>
                  <b>Try the product</b>
                  <span>Build an app yourself: the best pitch is a demo you made.</span>
                </a>
                <a className="af-thanks-card" href="/resources">
                  <span className="af-thanks-card-ic">📚</span>
                  <b>Browse resources</b>
                  <span>Tutorials and courses your audience will ask about.</span>
                </a>
                <a className="af-thanks-card" href="/affiliate">
                  <span className="af-thanks-card-ic">💰</span>
                  <b>Re-read the terms</b>
                  <span>30% for 12 months, Dream Ride at 100 members.</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


export default AffiliateThanksPage;
