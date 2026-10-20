import React from 'react';
import { Reveal, ArrowRight } from './part1.jsx';
const CT_PATHS = [
  { t: "Help with your account or an app", d: "Billing, bugs, publishing and anything inside the builder.", cta: "Go to Support", href: "/support" },
  { t: "Earn by referring builders", d: "Partner and affiliate questions go through the affiliate program.", cta: "Affiliate program", href: "/affiliate" },
];

const CT_TOPICS = ["Sales and plans", "Partnerships", "Press", "Something else"];

function ContactPage() {
  const [sent, setSent] = React.useState(false);
  const [topic, setTopic] = React.useState(CT_TOPICS[0]);
  return (
    <main data-screen-label="contact">
      <section className="cr-hero ct-hero" data-screen-label="contact-hero">
        <div className="wrap-tight">
          <Reveal className="sec-head cr-head">
            <div className="eyebrow">Contact</div>
            <h1>Talk to a <em className="serif">real person.</em></h1>
            <p>Questions about plans, partnerships or press come to our team directly. We reply within one business day.</p>
          </Reveal>
        </div>
      </section>
      <section className="pad ct-main" data-screen-label="contact-form">
        <div className="wrap-tight ct-grid">
          <Reveal>
            {sent ? (
              <div className="ct-card ct-done">
                <span className="cr-perk-check ct-done-check">✓</span>
                <h2>Message sent.</h2>
                <p>Thanks. Someone on the team will reply to your email within one business day.</p>
                <button type="button" className="btn ct-again" onClick={() => setSent(false)}>Send another</button>
              </div>
            ) : (
              <form className="ct-card ct-form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                <div className="ct-topics" role="radiogroup" aria-label="Topic">
                  {CT_TOPICS.map((t) => (
                    <button key={t} type="button" role="radio" aria-checked={topic === t} className={"ct-topic" + (topic === t ? " on" : "")} onClick={() => setTopic(t)}>{t}</button>
                  ))}
                </div>
                <div className="ct-row">
                  <label className="ct-field"><span>Name</span><input required autoComplete="name"/></label>
                  <label className="ct-field"><span>Work email</span><input type="email" required autoComplete="email" placeholder="you@company.com"/></label>
                </div>
                <label className="ct-field"><span>What are you building?</span><input placeholder="Optional"/></label>
                <label className="ct-field"><span>Message</span><textarea required rows="5"></textarea></label>
                <button type="submit" className="btn btn-coral ct-submit">Send message <ArrowRight/></button>
              </form>
            )}
          </Reveal>
          <div className="ct-side">
            <div className="cr-team">Looking for something else?</div>
            {CT_PATHS.map((p, i) => (
              <Reveal key={p.t} delay={i * 50}>
                <a className="cr-role ct-path" href={p.href}>
                  <div className="cr-role-main">
                    <span className="cr-role-title">{p.t}</span>
                    <span className="cr-role-meta">{p.d}</span>
                  </div>
                  <span className="cr-role-arrow"><ArrowRight/></span>
                </a>
              </Reveal>
            ))}
            <div className="cr-open-note">Prefer email? Write to <b>hello@appsbuiltwithai.com</b>.</div>
          </div>
        </div>
      </section>
    </main>
  );
}


export default ContactPage;
