/* global React, PoofPart1 */
const { Reveal, ArrowRight } = window.PoofPart1;

/* ============= PRESS & MEDIA ============= */

const PRESS_COVERAGE = [
  { outlet: "TechCrunch",    date: "May 18, 2026", title: "AppsBuiltWithAI's plan mode rewires how non-coders launch software", excerpt: "The Series B-backed startup just shipped what may be the most consequential feature in low-code this year." },
  { outlet: "The Verge",     date: "Apr 27, 2026", title: "The chat-to-app race is heating up — and AppsBuiltWithAI is winning on UX", excerpt: "Of the five tools we tested, only one let a non-engineer ship a working store before lunch." },
  { outlet: "Fast Company",  date: "Apr 03, 2026", title: "Meet the bakery owner whose AI-built site is now her #1 sales channel", excerpt: "Mei Chen used to take orders by Instagram DM. Now she takes 200 a week, automatically." },
  { outlet: "Wired",         date: "Mar 12, 2026", title: "Why \"vibe coding\" might actually be a serious business", excerpt: "The bet: most software was never meant to be built by engineers in the first place." },
  { outlet: "Bloomberg",     date: "Feb 22, 2026", title: "Series B raises $42M to make app-building feel like texting", excerpt: "Lead investor Andreessen Horowitz cited \"the most natural-feeling AI tool I've ever used.\"" },
  { outlet: "The Information", date: "Jan 30, 2026", title: "How AppsBuiltWithAI quietly hit 100,000 paying users", excerpt: "No paid ads, no enterprise sales team. Just a tool that makes people text their friends about it." },
];

const PRESS_LOGOS = [
  { name: "Wordmark — black",   variant: "black",  bg: "#FAF5EA" },
  { name: "Wordmark — white",   variant: "white",  bg: "#181818" },
  { name: "Mark only — black",  variant: "mark-b", bg: "#FAF5EA" },
  { name: "Mark only — white",  variant: "mark-w", bg: "#181818" },
  { name: "Mark — coral",       variant: "coral",  bg: "#FAF5EA" },
  { name: "Wordmark — coral",   variant: "wm-c",   bg: "#181818" },
];

const FOUNDERS = [
  { name: "Mei Chen",     role: "Co-founder & CEO",  bio: "Built her first bakery website in HTML in 2011. Has been waiting 15 years for tools like this.", color: "warm",  initials: "MC" },
  { name: "Devon Park",   role: "Co-founder & CTO",  bio: "Previously eng at Linear & Notion. Believes the best UI is one you don't notice.", color: "plum",  initials: "DP" },
  { name: "Sarah Lin",    role: "Head of Design",    bio: "Designed a million ways to say \"new project.\" Settled on \"poof.\"", color: "rose", initials: "SL" },
];

const STATS = [
  { num: "428K",    label: "Apps built to date" },
  { num: "92M",     label: "Visitors served / month" },
  { num: "184",     label: "Countries with an active user" },
  { num: "$42M",    label: "Series B, Feb 2026" },
];

function PressPage() {
  return (
    <>
      <section className="sub-hero" data-screen-label="press-hero">
        <div className="wrap-tight">
          <Reveal>
            <div className="eyebrow">Press &amp; media</div>
            <h1 className="serif">For reporters, <em>analysts, &amp; the curious.</em></h1>
            <p className="sub-lead">
              Everything you need to write about us — facts, founders,
              high-res logos, and a real human at the bottom of the page.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="sub-meta">
              <span>Founded: Q4 2024</span>
              <span className="dot"/>
              <span>HQ: San Francisco · remote-first</span>
              <span className="dot"/>
              <span>Press: <a href="mailto:press@appsbuiltwithai.com">press@appsbuiltwithai.com</a></span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="pad">
        <div className="wrap">
          <div className="press-stats">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 50}>
                <div className="press-stat">
                  <div className="press-stat-num">{s.num}</div>
                  <div className="press-stat-lbl">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="pad pt-0">
        <div className="wrap">
          <Reveal className="sec-head">
            <div className="eyebrow">Team</div>
            <h2 className="serif">The people <em>making it.</em></h2>
          </Reveal>
          <div className="press-team">
            {FOUNDERS.map((f, i) => (
              <Reveal key={f.name} delay={i * 60}>
                <div className="press-founder">
                  <div className={"press-founder-av tint-" + f.color}>{f.initials}</div>
                  <h4>{f.name}</h4>
                  <div className="press-founder-role">{f.role}</div>
                  <p>{f.bio}</p>
                  <a className="press-founder-link">Download headshot →</a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Logos */}
      <section className="pad pt-0">
        <div className="wrap">
          <Reveal className="sec-head">
            <div className="eyebrow">Brand assets</div>
            <h2 className="serif">Logos, the way we like them.</h2>
            <p>Please don't recolor, stretch, or place them on busy backgrounds.</p>
          </Reveal>
          <div className="press-logos">
            {PRESS_LOGOS.map((l, i) => (
              <Reveal key={l.name} delay={i * 40}>
                <div className="press-logo" style={{ background: l.bg }}>
                  <div className={"press-logo-art " + l.variant}>
                    AppsBuiltWithAI
                  </div>
                  <div className="press-logo-foot">
                    <span>{l.name}</span>
                    <a>SVG · PNG</a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="press-logos-cta">
              <a className="btn btn-ink">Download all assets (24 MB) <ArrowRight/></a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Coverage */}
      <section className="pad pt-0">
        <div className="wrap-tight">
          <Reveal className="sec-head">
            <div className="eyebrow">In the press</div>
            <h2 className="serif">What people are saying.</h2>
          </Reveal>
          <div className="press-coverage">
            {PRESS_COVERAGE.map((c, i) => (
              <Reveal key={c.title}>
                <article className="press-clip">
                  <aside>
                    <div className="press-clip-outlet">{c.outlet}</div>
                    <div className="press-clip-date">{c.date}</div>
                  </aside>
                  <div>
                    <h3>{c.title}</h3>
                    <p>"{c.excerpt}"</p>
                    <a>Read on {c.outlet} →</a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="pad press-contact">
        <div className="wrap-tight">
          <Reveal>
            <div className="press-contact-card">
              <div>
                <div className="eyebrow">Want to talk?</div>
                <h2 className="serif">A human, <em>not a form.</em></h2>
                <p>Press, podcasts, briefings — Sarah replies within a day.</p>
              </div>
              <div className="press-contact-card-actions">
                <a className="btn btn-coral btn-lg" href="mailto:press@appsbuiltwithai.com">Email press@</a>
                <a className="btn btn-outline btn-lg" href="#">Book a call</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

window.PressPage = PressPage;
