/* global React, PoofPart1 */
const { Reveal, ArrowRight } = window.PoofPart1;
const { useState: useRsState, useEffect: useRsEffect } = React;

/* ============= RESOURCES HUB — Learn / Training / Support ============= */

const LEARN_ARTICLES = [
  { tag: "Guide",   read: "8 min", title: "Your first app, end to end", desc: "Go from prompt to live URL in under 10 minutes. Step by step, no glossing.", color: "coral" },
  { tag: "Guide",   read: "6 min", title: "Writing prompts that work",  desc: "The exact phrasing that makes the builder do its best work. Examples included.", color: "sun"  },
  { tag: "Article", read: "5 min", title: "When to use Plan mode",      desc: "Two minutes more upfront saves an hour of regenerations. Here's when it's worth it.", color: "plum" },
  { tag: "Article", read: "4 min", title: "Connecting Stripe in 90s",   desc: "The fastest path from \"I want to take payments\" to a working checkout.", color: "mint" },
  { tag: "Series",  read: "8×8 min", title: "Build a real online shop", desc: "Eight-part series. By the end you have a working store with inventory, orders, and tax.", color: "sky"  },
  { tag: "Guide",   read: "7 min", title: "Custom domains, demystified", desc: "How DNS actually works, in 7 paragraphs that won't put you to sleep.", color: "rose" },
];

const TRAINING_COURSES = [
  { lvl: "Free", title: "Foundations", hrs: "2 hours", desc: "The 60-minute orientation, padded with breaks. Watch over lunch.", lessons: 7, learners: "12,400+" },
  { lvl: "Free", title: "Build & ship a landing page", hrs: "3 hours", desc: "Hands-on. By the end you have a real, live, custom-domain landing page.", lessons: 11, learners: "8,300+" },
  { lvl: "Pro+", title: "Connectors mastery", hrs: "5 hours", desc: "Stripe, Gmail, Notion, Twilio, Slack — wire them all up like you've done it forever.", lessons: 18, learners: "3,200+" },
  { lvl: "Pro+", title: "Apps for client work", hrs: "8 hours", desc: "The agency playbook. Scoping, pricing, presenting, handing off.", lessons: 24, learners: "1,800+" },
  { lvl: "Pro+", title: "Designing without designing", hrs: "4 hours", desc: "Make apps that look like a designer touched them. (Even when one didn't.)", lessons: 14, learners: "2,100+" },
  { lvl: "Live", title: "Office hours, Fridays", hrs: "1 hour / wk",  desc: "Drop in. Bring an app. Get unstuck on the spot, with the team.", lessons: 0,  learners: "Live" },
];

const SUPPORT_TOPICS = [
  { ic: "🪧", title: "Getting started",   desc: "Account, plans, your first build.",         count: 24 },
  { ic: "🔌", title: "Connectors",         desc: "Stripe, Gmail, Slack, OAuth issues.",        count: 38 },
  { ic: "🌍", title: "Domains & SSL",     desc: "Custom domains, DNS records, certs.",        count: 17 },
  { ic: "💳", title: "Billing & credits", desc: "Plans, top-ups, refunds, taxes.",            count: 22 },
  { ic: "🔒", title: "Security & privacy", desc: "2FA, SSO, data export, account deletion.",  count: 14 },
  { ic: "🤖", title: "AI builder",        desc: "Prompts, edits, scenarios that aren't working.", count: 31 },
];

const FAQ_QUICK = [
  ["Do I need to know how to code?",  "No. The whole point is: you describe what you want in plain English, the builder does the code."],
  ["Can I cancel anytime?",            "Yes. Two clicks, takes effect immediately. We keep your apps live on Free until they exceed limits."],
  ["What if my idea is too complicated?", "Try Plan mode — it walks you through the brief. If your idea is genuinely beyond what we can build, we'll tell you up front."],
  ["Can I export the code?",          "Yes, on Pro and above. You own it — host it anywhere."],
  ["Is my data private?",              "Yes. Your data isn't used to train models. Full whitepaper on the Security page."],
];

const TABS = [
  { id: "learn",    label: "Learn",    desc: "Guides, articles, and series — read at your own pace." },
  { id: "training", label: "Training", desc: "Hands-on courses & live office hours." },
  { id: "support",  label: "Support",  desc: "Help center, FAQ, and a way to reach a real person." },
];

function ResourcesPage() {
  const [tab, setTab] = useRsState(() => {
    if (typeof window !== "undefined") {
      const h = window.location.hash.replace("#", "");
      if (TABS.some(t => t.id === h)) return h;
    }
    return "learn";
  });

  useRsEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash !== "#" + tab) {
      history.replaceState(null, "", "#" + tab);
    }
  }, [tab]);

  return (
    <>
      <section className="sub-hero" data-screen-label="resources-hero">
        <div className="wrap-tight">
          <Reveal>
            <div className="eyebrow">Resources</div>
            <h1 className="serif">Learn, level up, <em>get unstuck.</em></h1>
            <p className="sub-lead">
              Everything you need to go from "what's a prompt" to "I built
              the app my coworker just asked for." Read it, take a course,
              or talk to a human — your call.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="res-tabs">
              {TABS.map(t => (
                <button
                  key={t.id}
                  className={"res-tab" + (tab === t.id ? " active" : "")}
                  onClick={() => setTab(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <p className="res-tab-desc">{TABS.find(t => t.id === tab).desc}</p>
          </Reveal>
        </div>
      </section>

      {/* LEARN */}
      {tab === "learn" && (
        <>
          <section className="pad">
            <div className="wrap">
              <Reveal className="sec-head">
                <div className="eyebrow">Most popular</div>
                <h2 className="serif">Start here.</h2>
              </Reveal>
              <div className="learn-grid">
                {LEARN_ARTICLES.map((a, i) => (
                  <Reveal key={a.title} delay={i * 40}>
                    <article className={"learn-card tone-" + a.color}>
                      <div className="learn-card-thumb"/>
                      <div className="learn-card-body">
                        <div className="learn-card-meta">
                          <span className="learn-tag">{a.tag}</span>
                          <span className="learn-read">{a.read}</span>
                        </div>
                        <h3>{a.title}</h3>
                        <p>{a.desc}</p>
                        <a className="learn-card-link">Read →</a>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section className="pad pt-0 res-cta">
            <div className="wrap-tight" style={{ textAlign: "center" }}>
              <Reveal>
                <h2 className="serif">Want every new piece in your inbox?</h2>
                <p style={{ fontSize: 17, color: "var(--ink-2)", margin: "12px auto 24px" }}>One short email, every other Friday.</p>
                <form className="res-newsletter" onSubmit={(e) => e.preventDefault()}>
                  <input type="email" placeholder="you@example.com"/>
                  <button className="btn btn-coral">Subscribe</button>
                </form>
              </Reveal>
            </div>
          </section>
        </>
      )}

      {/* TRAINING */}
      {tab === "training" && (
        <section className="pad">
          <div className="wrap">
            <Reveal className="sec-head">
              <div className="eyebrow">Courses</div>
              <h2 className="serif">Pick a track.</h2>
              <p>Free courses for everyone. Pro & live sessions for paid plans.</p>
            </Reveal>
            <div className="train-grid">
              {TRAINING_COURSES.map((c, i) => (
                <Reveal key={c.title} delay={i * 40}>
                  <article className={"train-card lvl-" + c.lvl.toLowerCase()}>
                    <div className="train-card-head">
                      <span className={"train-lvl lvl-" + c.lvl.toLowerCase()}>{c.lvl}</span>
                      <span className="train-hrs">{c.hrs}</span>
                    </div>
                    <h3>{c.title}</h3>
                    <p>{c.desc}</p>
                    <div className="train-card-foot">
                      <span>{c.lessons > 0 ? c.lessons + " lessons" : "Live · weekly"}</span>
                      <span>{c.learners} learners</span>
                    </div>
                    <a className="btn btn-outline btn-block">{c.lvl === "Live" ? "Join the next session →" : "Start course →"}</a>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SUPPORT */}
      {tab === "support" && (
        <>
          <section className="pad">
            <div className="wrap">
              <Reveal className="sec-head">
                <div className="eyebrow">Help center</div>
                <h2 className="serif">What can we help with?</h2>
              </Reveal>
              <div className="support-grid">
                {SUPPORT_TOPICS.map((t, i) => (
                  <Reveal key={t.title} delay={i * 30}>
                    <a className="support-card">
                      <div className="support-card-ic">{t.ic}</div>
                      <h3>{t.title}</h3>
                      <p>{t.desc}</p>
                      <div className="support-card-count">{t.count} articles →</div>
                    </a>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section className="pad pt-0">
            <div className="wrap-tight">
              <Reveal className="sec-head">
                <div className="eyebrow">Quick answers</div>
                <h2 className="serif">FAQ.</h2>
              </Reveal>
              <div className="support-faq">
                {FAQ_QUICK.map(([q, a]) => (
                  <Reveal key={q}>
                    <details>
                      <summary>{q}</summary>
                      <p>{a}</p>
                    </details>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section className="pad pt-0">
            <div className="wrap-tight">
              <Reveal>
                <div className="support-contact">
                  <div>
                    <h3>Still stuck?</h3>
                    <p>We answer email within a day. Pro &amp; Team plans get same-business-day chat.</p>
                  </div>
                  <div className="support-contact-actions">
                    <a className="btn btn-coral" href="mailto:help@appsbuiltwithai.com">Email help@</a>
                    <a className="btn btn-outline" href="#">Open a chat</a>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        </>
      )}
    </>
  );
}

window.ResourcesPage = ResourcesPage;
