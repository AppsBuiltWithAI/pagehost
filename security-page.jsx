/* global React, PoofPart1 */
const { Reveal, ArrowRight, Check } = window.PoofPart1;

/* ============= SECURITY (TRUST) ============= */

const SECURITY_PILLARS = [
  {
    icon: "🔒",
    title: "Your data, encrypted",
    desc: "AES-256 at rest, TLS 1.3 in transit. Every byte we hold is encrypted, including database backups and build snapshots.",
  },
  {
    icon: "🧭",
    title: "Minimal collection",
    desc: "We collect email, billing, and what you typed into the builder. That's it. No fingerprinting, no third-party ad pixels.",
  },
  {
    icon: "🧱",
    title: "Isolation by default",
    desc: "Each customer's data lives in a logically isolated namespace. Cross-tenant queries are physically impossible.",
  },
  {
    icon: "🚪",
    title: "Easy to leave",
    desc: "Export everything you've built — source code, assets, and data — in one click. Cancel takes effect immediately.",
  },
];

const SECURITY_BADGES = [
  { name: "SOC 2 Type II",  desc: "Audited annually by independent assessors.",        status: "Certified",   year: "2025" },
  { name: "GDPR",           desc: "EU data residency and DPA available on request.",   status: "Compliant",    year: "Always" },
  { name: "CCPA",           desc: "California consumer protections — opt-out built in.", status: "Compliant",  year: "Always" },
  { name: "HIPAA",          desc: "Business Associate Agreement available on Pro+.",   status: "Available",    year: "On request" },
  { name: "ISO 27001",      desc: "Information security management.",                   status: "In progress",  year: "Q4 '26" },
  { name: "PCI DSS",        desc: "Payments handled by Stripe — we never see your card.", status: "Outsourced", year: "Always" },
];

const PRACTICES = [
  { title: "Background checks",     desc: "Every employee with production access passes a third-party background check." },
  { title: "Hardware-key 2FA",      desc: "All staff use hardware security keys. No SMS codes." },
  { title: "Least-privilege access", desc: "Production access is request-only, time-boxed, and logged." },
  { title: "Vulnerability scans",   desc: "Automated SAST, DAST, and dependency scans on every commit." },
  { title: "Pen tests",             desc: "External penetration test annually. Report available under NDA." },
  { title: "Incident response",     desc: "Runbook tested quarterly. 24-hour customer notification commitment." },
];

function SecurityPage() {
  return (
    <>
      <section className="sub-hero" data-screen-label="security-hero">
        <div className="wrap-tight">
          <Reveal>
            <div className="eyebrow">Security &amp; trust</div>
            <h1 className="serif">Built for people, <em>guarded like a bank.</em></h1>
            <p className="sub-lead">
              You shouldn't have to be a security expert to use a tool that
              handles your business. So we made the boring, careful choices
              for you — and we're happy to tell you exactly what they are.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="sub-meta">
              <span>SOC 2 Type II certified</span>
              <span className="dot"/>
              <span>99.99% uptime · last 90 days</span>
              <span className="dot"/>
              <span><a href="status.html">Live status →</a></span>
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

      {/* Compliance grid */}
      <section className="pad pt-0">
        <div className="wrap">
          <Reveal className="sec-head">
            <div className="eyebrow">Audits &amp; compliance</div>
            <h2 className="serif">The frameworks <em>we live up to.</em></h2>
          </Reveal>
          <div className="sec-badges">
            {SECURITY_BADGES.map((b, i) => (
              <Reveal key={b.name} delay={i * 50}>
                <div className="sec-badge">
                  <div className="sec-badge-head">
                    <h4>{b.name}</h4>
                    <span className={"sec-badge-pill " + (b.status === "Certified" || b.status === "Compliant" ? "ok" : "neutral")}>
                      {b.status}
                    </span>
                  </div>
                  <p>{b.desc}</p>
                  <div className="sec-badge-foot">{b.year}</div>
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

      {/* Bug bounty */}
      <section className="pad pt-0">
        <div className="wrap-tight">
          <Reveal>
            <div className="sec-bounty">
              <div className="sec-bounty-eyebrow">Bug bounty</div>
              <h2 className="serif">Found a <em>flaw?</em><br/>We'll thank you (and pay you).</h2>
              <p>
                We pay $500–$10,000 for vulnerabilities, scaling with impact.
                Critical issues get same-day acknowledgement and a credit on
                this page if you'd like.
              </p>
              <div className="sec-bounty-actions">
                <a className="btn btn-coral" href="mailto:security@appsbuiltwithai.com">Report a vulnerability <ArrowRight/></a>
                <a className="btn btn-outline" href="#">Read the rules</a>
              </div>
              <div className="sec-bounty-hall">
                <span>2026 Hall of Thanks:</span>
                {["@maya_h", "@n00n", "@oleksiy.k", "@ravi.s", "@thelinkerd", "@flora"].map(h => (
                  <span key={h} className="sec-thanks-chip">{h}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="pad sec-cta">
        <div className="wrap-tight" style={{ textAlign: "center" }}>
          <Reveal>
            <h2 className="serif">Want the long version?</h2>
            <p style={{ fontSize: 17, color: "var(--ink-2)", maxWidth: "52ch", margin: "16px auto 32px" }}>
              We publish a security whitepaper, a system architecture
              overview, and our latest SOC 2 report (under NDA).
            </p>
            <div style={{ display: "inline-flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
              <a className="btn btn-coral btn-lg" href="#">Download whitepaper <ArrowRight/></a>
              <a className="btn btn-outline btn-lg" href="#">Request SOC 2 report</a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

window.SecurityPage = SecurityPage;
