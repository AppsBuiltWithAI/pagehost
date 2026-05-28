/* global React, PoofPart1 */
const { Reveal, ArrowRight, Check } = window.PoofPart1;

/* ============= CERTIFICATION ============= */

const TRACKS = [
  {
    id: "builder",
    name: "Certified Builder",
    duration: "4 hours",
    level: "Foundation",
    color: "coral",
    tagline: "The basics, properly.",
    desc: "Become fluent in describing apps to AI. Cover prompts, plan mode, connectors, and your first three live builds.",
    perks: [
      "Digital badge for LinkedIn & email signature",
      "Listed in the certified builder directory",
      "10% off your next plan",
      "Welcome kit (notebook + sticker pack)",
    ],
    modules: [
      "Foundations of AI building",
      "Writing prompts that work",
      "Plan mode and the PRD habit",
      "Publishing & custom domains",
      "Your first three case-study apps",
    ],
    price: 0,
    priceLabel: "Free",
  },
  {
    id: "specialist",
    name: "Certified Specialist",
    duration: "10 hours",
    level: "Practitioner",
    color: "plum",
    tagline: "Real apps. Real users.",
    desc: "Master the harder stuff: connectors, knowledge base, multi-page flows, and shipping for paying customers.",
    perks: [
      "Verifiable credential on the public registry",
      "Specialist badge (3 specialisms)",
      "Invite to the private Specialists Slack",
      "20% off your next plan",
      "Eligible for inbound partner leads",
    ],
    modules: [
      "Connectors deep dive (Stripe, Notion, Supabase)",
      "Building with your knowledge base",
      "Multi-step forms & wizards",
      "Performance, SEO, and SSL",
      "Capstone: ship a real app to paying users",
    ],
    price: 149,
    priceLabel: "$149",
    featured: true,
  },
  {
    id: "expert",
    name: "Certified Expert",
    duration: "30 hours",
    level: "Pro",
    color: "ink",
    tagline: "Build for clients.",
    desc: "The agency-grade track. Scope, scoping calls, hand-off, governance, design systems, and white-label delivery.",
    perks: [
      "Expert badge with a serial number",
      "Auto-add to Partner directory (Agency tier)",
      "Co-marketing slots in our newsletter",
      "30% off all plans for 12 months",
      "Quarterly invites to expert-only AMAs",
    ],
    modules: [
      "Client discovery & scope",
      "Design systems & brand-locked builds",
      "Multi-environment workflows",
      "Audit log, roles, hand-off",
      "Pricing, packaging, retainers",
      "Capstone: a real client engagement",
    ],
    price: 599,
    priceLabel: "$599",
  },
];

const CERT_TESTIMONIALS = [
  { name: "Rachel Moreno", role: "Bakery owner · Builder", text: "Did the Builder track on a rainy Sunday. Came out of it with a working pickup site and the confidence to keep going.", color: "warm" },
  { name: "Dani Khan",     role: "Designer · Specialist",  text: "The Specialist track changed how I quote freelance work. I price by outcome now — not hours.", color: "plum" },
  { name: "Marcus Webb",   role: "Agency · Expert",       text: "After Expert I added a $9k AppsBuiltWithAI line to every client engagement. It's now 40% of revenue.", color: "rose" },
];

function CertificationPage() {
  return (
    <>
      <section className="sub-hero" data-screen-label="cert-hero">
        <div className="wrap-tight">
          <Reveal>
            <div className="eyebrow">Certification</div>
            <h1 className="serif">Get credit for <em>actually shipping.</em></h1>
            <p className="sub-lead">
              Three tracks, each built around a real app you finish before
              the badge is yours. Recruiters and clients can verify it on
              our public registry — no test-prep, no trivia.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="sub-meta">
              <span>3 tracks · 4 to 30 hours</span>
              <span className="dot"/>
              <span>Verifiable credentials</span>
              <span className="dot"/>
              <span>Free Builder track for everyone</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="pad">
        <div className="wrap">
          <div className="cert-stats">
            <Reveal>
              <div className="cert-stat">
                <div className="cert-stat-num">12,400+</div>
                <div className="cert-stat-lbl">Certified builders to date</div>
              </div>
            </Reveal>
            <Reveal delay={60}>
              <div className="cert-stat">
                <div className="cert-stat-num">94%</div>
                <div className="cert-stat-lbl">Finish the Builder track in one weekend</div>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="cert-stat">
                <div className="cert-stat-num">$11,200</div>
                <div className="cert-stat-lbl">Median client invoice after Expert</div>
              </div>
            </Reveal>
            <Reveal delay={180}>
              <div className="cert-stat">
                <div className="cert-stat-num">312</div>
                <div className="cert-stat-lbl">Experts now in our partner directory</div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Tracks */}
      <section className="pad pt-0">
        <div className="wrap">
          <Reveal className="sec-head">
            <div className="eyebrow">The tracks</div>
            <h2 className="serif">Pick where you want to land.</h2>
          </Reveal>
          <div className="cert-tracks">
            {TRACKS.map((t, i) => (
              <Reveal key={t.id} delay={i * 80}>
                <div className={"cert-track" + (t.featured ? " featured" : "") + " tone-" + t.color}>
                  {t.featured && <div className="cert-track-flag">Most popular</div>}
                  <div className="cert-track-level">{t.level} · {t.duration}</div>
                  <h3>{t.name}</h3>
                  <div className="cert-track-tagline">"{t.tagline}"</div>
                  <p>{t.desc}</p>
                  <div className="cert-track-price">{t.priceLabel}</div>

                  <div className="cert-track-section-title">What you'll learn</div>
                  <ul className="cert-track-modules">
                    {t.modules.map(m => <li key={m}>{m}</li>)}
                  </ul>

                  <div className="cert-track-section-title">What you get</div>
                  <ul className="cert-track-perks">
                    {t.perks.map(p => <li key={p}><Check/> {p}</li>)}
                  </ul>

                  <a className={"btn btn-lg btn-block " + (t.featured ? "btn-coral" : "btn-outline")} href={"signup.html?cert=" + t.id}>
                    {t.price === 0 ? "Start free" : "Enroll · " + t.priceLabel}
                  </a>
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
            <h2 className="serif">A track, not a test.</h2>
          </Reveal>
          <div className="cert-steps">
            <Reveal>
              <div className="cert-step">
                <div className="cert-step-num">01</div>
                <h3>Learn at your pace</h3>
                <p>Self-paced modules with hands-on builds. Mix video, written, and live cohort sessions — whatever clicks.</p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="cert-step">
                <div className="cert-step-num">02</div>
                <h3>Ship a real app</h3>
                <p>Each track ends with a capstone: a real, live app reviewed by a certified instructor. No multiple choice.</p>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div className="cert-step">
                <div className="cert-step-num">03</div>
                <h3>Get verified</h3>
                <p>A unique credential URL anyone can check. Pin it to LinkedIn, email signatures, your portfolio.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="pad pt-0">
        <div className="wrap">
          <Reveal className="sec-head">
            <div className="eyebrow">Alumni</div>
            <h2 className="serif">What they did next.</h2>
          </Reveal>
          <div className="cert-testimonials">
            {CERT_TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 80}>
                <figure className={"cert-quote tone-" + t.color}>
                  <blockquote>"{t.text}"</blockquote>
                  <figcaption>
                    <div className={"cert-avatar tone-" + t.color}>{t.name.split(" ").map(s => s[0]).join("")}</div>
                    <div>
                      <div className="cert-quote-name">{t.name}</div>
                      <div className="cert-quote-role">{t.role}</div>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Verify ribbon */}
      <section className="pad pt-0">
        <div className="wrap-tight">
          <Reveal>
            <div className="cert-verify">
              <div>
                <div className="eyebrow">Verify a credential</div>
                <h3>Got someone's badge in front of you? Check it.</h3>
                <p>Every certificate has a unique URL on our public registry. Paste the serial below.</p>
              </div>
              <form onSubmit={(e) => e.preventDefault()} className="cert-verify-form">
                <input placeholder="e.g. ABWA-EXP-0421"/>
                <button className="btn btn-ink">Verify <ArrowRight/></button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Enterprise blurb */}
      <section className="pad pt-0">
        <div className="wrap-tight">
          <Reveal>
            <div className="cert-enterprise">
              <div className="eyebrow">For teams &amp; orgs</div>
              <h2 className="serif">Train your team. <em>Track who passed.</em></h2>
              <p>
                Cohort enrollments, bulk seats, custom modules for your stack
                and brand. Live workshops with our team. Dashboards so you
                can see who's certified and who's mid-track.
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <a className="btn btn-coral btn-lg" href="mailto:education@appsbuiltwithai.com">Talk to us <ArrowRight/></a>
                <a className="btn btn-outline btn-lg" href="#">Download brochure</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

window.CertificationPage = CertificationPage;
