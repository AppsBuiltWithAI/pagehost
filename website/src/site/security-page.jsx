import React from 'react';
import { Reveal, ArrowRight, Check } from './part1.jsx';
/* ============= SECURITY (TRUST) ============= */

const SECURITY_PILLARS = [
  {
    icon: "🔒",
    title: "Passwords and keys, protected",
    desc: "Passwords are stored only as bcrypt hashes. Keys for the accounts you connect, such as GitHub, Supabase or Gmail, are encrypted with AES-256-GCM.",
  },
  {
    icon: "🌐",
    title: "HTTPS everywhere",
    desc: "Our websites, the builder and the apps you publish, including custom domains, are served over HTTPS.",
  },
  {
    icon: "🔑",
    title: "You control sign-ins",
    desc: "Turn on two-factor sign-in with an authenticator app, see every active session, and sign any of them out from Settings.",
  },
  {
    icon: "💳",
    title: "Cards stay with Stripe",
    desc: "Payments run through Stripe. We never see or store your full card number.",
  },
];

const PRACTICES = [
  { title: "Role-based staff access", desc: "What staff can see in customer accounts depends on their role." },
  { title: "Logged support access", desc: "When support views an account to help someone, that access is time-limited and logged." },
  { title: "Rate-limited sign-in", desc: "Repeated sign-in attempts are slowed down to stop password guessing." },
  { title: "Secret scanning", desc: "Code pushed to our main branches is scanned automatically for leaked passwords and keys." },
  { title: "Daily automated tests", desc: "Our automated test suite runs every day to catch problems early." },
  { title: "Your data, your call", desc: "Download your data from Settings, or delete your account at any time. Deletion is immediate." },
];

function SecurityPage() {
  return (
    <>
      <section className="sub-hero" data-screen-label="security-hero">
        <div className="wrap-tight">
          <Reveal>
            <div className="eyebrow">Security &amp; trust</div>
            <h1 className="serif">Built for people, <em>careful with your data.</em></h1>
            <p className="sub-lead">
              You shouldn't have to be a security expert to use a tool that
              handles your business. So we made the boring, careful choices
              for you, and we're happy to tell you exactly what they are.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="sub-meta">
              <span>Passwords hashed</span>
              <span className="dot"/>
              <span>Connection keys encrypted</span>
              <span className="dot"/>
              <span>HTTPS everywhere</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pillars */}
      <section className="pad">
        <div className="wrap">
          <div className="sec-pillars">
            {SECURITY_PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 60}>
                <div className="sec-pillar">
                  <div className="sec-pillar-icon">{p.icon}</div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Practices */}
      <section className="pad pt-0">
        <div className="wrap">
          <Reveal className="sec-head">
            <div className="eyebrow">How we operate</div>
            <h2 className="serif">The careful, boring stuff.</h2>
          </Reveal>
          <div className="sec-practices">
            {PRACTICES.map((p, i) => (
              <Reveal key={p.title} delay={i * 40}>
                <div className="sec-practice">
                  <div className="sec-practice-tick"><Check/></div>
                  <div>
                    <h4>{p.title}</h4>
                    <p>{p.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Vulnerability reports */}
      <section className="pad pt-0">
        <div className="wrap-tight">
          <Reveal>
            <div className="sec-bounty">
              <div className="sec-bounty-eyebrow">Report a vulnerability</div>
              <h2 className="serif">Found a <em>flaw?</em><br/> Tell us.</h2>
              <p>
                Email security@appsbuiltwithai.com with the page or feature
                affected and the steps to reproduce it. Please only test with
                accounts you own.
              </p>
              <div className="sec-bounty-actions">
                <a className="btn btn-coral" href="mailto:security@appsbuiltwithai.com">Report a vulnerability <ArrowRight/></a>
                <a className="btn btn-outline" href="/legal#concerns">Read the details</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="pad sec-cta">
        <div className="wrap-tight" style={{ textAlign: "center" }}>
          <Reveal>
            <h2 className="serif">Got a security question?</h2>
            <p style={{ fontSize: 17, color: "var(--ink-2)", maxWidth: "52ch", margin: "16px auto 32px" }}>
              Email security@appsbuiltwithai.com and we'll get back to you.
              The legal page explains what data we collect and who we share it with.
            </p>
            <div style={{ display: "inline-flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
              <a className="btn btn-coral btn-lg" href="mailto:security@appsbuiltwithai.com">Email security <ArrowRight/></a>
              <a className="btn btn-outline btn-lg" href="/legal#privacy">Read the privacy policy</a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}


export default SecurityPage;
