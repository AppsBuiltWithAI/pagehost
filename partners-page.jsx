/* global React, PoofPart1 */
const { Reveal, ArrowRight, Check } = window.PoofPart1;

/* ============= PARTNERS ============= */

const TIERS = [
  {
    tier: "Solo",
    desc: "For freelancers and indie builders who deliver apps for clients.",
    perks: ["20% commission on referrals", "Co-marketing slot in monthly newsletter", "Private Discord channel", "Early access to features"],
    apply: "Apply free",
    featured: false,
  },
  {
    tier: "Agency",
    desc: "For studios and digital agencies — full-service implementations.",
    perks: ["30% commission, recurring", "Listed in our partner directory", "Dedicated partner manager", "Co-sell opportunities", "White-label option (Pro+)"],
    apply: "Apply",
    featured: true,
  },
  {
    tier: "Enterprise SI",
    desc: "Systems integrators serving Fortune 1000 customers.",
    perks: ["Custom revenue share", "Joint go-to-market", "Quarterly business reviews", "Engineering office hours", "Procurement assistance"],
    apply: "Talk to us",
    featured: false,
  },
];

const PARTNERS = [
  // Agency
  { id: 1, name: "Pixelmoth Studio",      type: "Agency",        loc: "Brooklyn, NY",  spec: ["E-commerce", "Brand"], tier: "Agency", logo: "PM", color: "rose" },
  { id: 2, name: "Northwind Digital",     type: "Agency",        loc: "London, UK",    spec: ["B2B SaaS", "Marketing sites"], tier: "Agency", logo: "NW", color: "sky" },
  { id: 3, name: "Hello Cooperative",     type: "Agency",        loc: "Berlin, DE",    spec: ["Editorial", "Non-profits"], tier: "Solo", logo: "Hi", color: "warm" },
  { id: 4, name: "Mango Built",           type: "Agency",        loc: "Lisbon, PT",    spec: ["Hospitality", "Booking"], tier: "Solo", logo: "Mb", color: "mint" },
  { id: 5, name: "Vermilion & Co.",       type: "Agency",        loc: "Melbourne, AU", spec: ["Luxury", "Portfolio"], tier: "Agency", logo: "V&", color: "plum" },
  { id: 6, name: "Greenroom Labs",        type: "Agency",        loc: "Toronto, CA",   spec: ["Internal tools", "Forms"], tier: "Solo", logo: "GR", color: "mint" },
  // SI
  { id: 7, name: "Atlas Integration",     type: "Systems int.",  loc: "Singapore",     spec: ["Fortune 500", "Migrations"], tier: "Enterprise SI", logo: "AI", color: "ink" },
  { id: 8, name: "Hexa Consulting",       type: "Systems int.",  loc: "Stockholm, SE", spec: ["Banking", "Insurance"], tier: "Enterprise SI", logo: "Hx", color: "sky" },
];

const HOW = [
  { num: "01", title: "Apply",   desc: "Tell us about your work. We review every application personally — most get a yes within a week." },
  { num: "02", title: "Onboard", desc: "Live training, a private channel, and a partner manager who actually knows your name." },
  { num: "03", title: "Deliver", desc: "Build for clients, earn commission, get listed in the directory. We help with leads when we can." },
];

function PartnersPage() {
  return (
    <>
      <section className="sub-hero" data-screen-label="partners-hero">
        <div className="wrap-tight">
          <Reveal>
            <div className="eyebrow">Partners</div>
            <h1 className="serif">Build apps for clients. <em>Get paid for the lift.</em></h1>
            <p className="sub-lead">
              Studios, freelancers, and consultants who deliver projects on
              AppsBuiltWithAI earn recurring commission, get featured leads,
              and a real partner manager — not a robot at an inbox.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="sub-meta">
              <span>312 partners</span>
              <span className="dot"/>
              <span>42 countries</span>
              <span className="dot"/>
              <span>Avg. $14K / partner / mo</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why partner */}
      <section className="pad">
        <div className="wrap">
          <div className="partners-why">
            <Reveal>
              <div className="partners-why-card">
                <div className="partners-why-num">3×</div>
                <h3>Faster delivery</h3>
                <p>What used to be a 6-week build is now a 2-week build. Win more clients without growing the team.</p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="partners-why-card">
                <div className="partners-why-num">30%</div>
                <h3>Recurring commission</h3>
                <p>Earn a slice of every plan you bring on, for as long as they're a customer. Up to 30% recurring.</p>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div className="partners-why-card">
                <div className="partners-why-num">∞</div>
                <h3>Inbound leads</h3>
                <p>We send the work we can't take ourselves to our directory partners. Real revenue, no cold outreach.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="pad pt-0">
        <div className="wrap">
          <Reveal className="sec-head">
            <div className="eyebrow">Tiers</div>
            <h2 className="serif">Three ways <em>in.</em></h2>
          </Reveal>
          <div className="partners-tiers">
            {TIERS.map((t, i) => (
              <Reveal key={t.tier} delay={i * 60}>
                <div className={"partners-tier" + (t.featured ? " featured" : "")}>
                  {t.featured && <div className="partners-tier-flag">Most popular</div>}
                  <h3>{t.tier}</h3>
                  <p>{t.desc}</p>
                  <ul>
                    {t.perks.map(p => (
                      <li key={p}><Check/> {p}</li>
                    ))}
                  </ul>
                  <a className={"btn btn-lg btn-block " + (t.featured ? "btn-coral" : "btn-outline")}>{t.apply}</a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Directory */}
      <section className="pad pt-0">
        <div className="wrap">
          <Reveal className="sec-head">
            <div className="eyebrow">Directory</div>
            <h2 className="serif">Featured partners.</h2>
            <p>Looking for someone to help with your build? These folks know us inside out.</p>
          </Reveal>
          <div className="partners-grid">
            {PARTNERS.map((p, i) => (
              <Reveal key={p.id} delay={Math.min(i, 6) * 30}>
                <div className="partner-card">
                  <div className={"partner-logo tint-" + p.color}>{p.logo}</div>
                  <div className="partner-body">
                    <div className="partner-name-row">
                      <h4>{p.name}</h4>
                      {p.tier === "Enterprise SI" && <span className="partner-tier-pill">SI</span>}
                    </div>
                    <div className="partner-meta">{p.type} · {p.loc}</div>
                    <div className="partner-specs">
                      {p.spec.map(s => <span key={s} className="partner-spec">{s}</span>)}
                    </div>
                  </div>
                  <a className="btn btn-outline btn-sm">View →</a>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div style={{ textAlign: "center", marginTop: 32 }}>
              <a className="btn btn-outline">See all 312 partners <ArrowRight/></a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How */}
      <section className="pad pt-0">
        <div className="wrap-tight">
          <Reveal className="sec-head">
            <div className="eyebrow">How it works</div>
            <h2 className="serif">Three weeks <em>from apply to your first lead.</em></h2>
          </Reveal>
          <div className="partners-how">
            {HOW.map((h, i) => (
              <Reveal key={h.num} delay={i * 80}>
                <div className="partners-how-row">
                  <div className="partners-how-num">{h.num}</div>
                  <div>
                    <h3>{h.title}</h3>
                    <p>{h.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pad partners-cta">
        <div className="wrap-tight" style={{ textAlign: "center" }}>
          <Reveal>
            <h2 className="serif">Ready to <em>partner up?</em></h2>
            <p style={{ fontSize: 17, color: "var(--ink-2)", maxWidth: "44ch", margin: "16px auto 32px" }}>
              Tell us about your studio and what you'd like to build. We'll
              be in touch within a week.
            </p>
            <a className="btn btn-coral btn-lg" href="signup.html">Apply to be a partner <ArrowRight/></a>
          </Reveal>
        </div>
      </section>
    </>
  );
}

window.PartnersPage = PartnersPage;
