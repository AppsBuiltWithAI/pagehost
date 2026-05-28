/* global React, PoofPart1 */
const { Reveal, ArrowRight } = window.PoofPart1;
const { useState: useWbState, useMemo: useWbMemo } = React;

/* ============= WEBINARS ============= */

const UPCOMING = [
  {
    id: "plan-mode-deep",
    title: "Plan mode, deep dive",
    speaker: "Mei Chen · Co-founder, CEO",
    date: "Jun 04, 2026",
    time: "11:00 AM PT",
    duration: "60 min",
    track: "Product",
    desc: "The thinking behind plan mode, why structured briefs beat blank-prompt panics, and the exact prompts our team uses for hard problems.",
    color: "coral",
    rsvps: 1240,
    featured: true,
  },
  {
    id: "stripe-night",
    title: "Live build: a Stripe-powered booking app in 45 minutes",
    speaker: "Devon Park · CTO",
    date: "Jun 11, 2026",
    time: "9:00 AM PT",
    duration: "45 min",
    track: "Build",
    desc: "Watch a working bookings + payments app come together start to finish. Code visible. Connector setup live. Q&A at the end.",
    color: "plum",
    rsvps: 892,
  },
  {
    id: "design-without",
    title: "Designing apps that look like a designer touched them",
    speaker: "Sarah Lin · Head of Design",
    date: "Jun 18, 2026",
    time: "10:00 AM PT",
    duration: "60 min",
    track: "Design",
    desc: "The 10 prompts and 5 settings that move your apps from \"AI default\" to \"this is actually nice.\"",
    color: "rose",
    rsvps: 612,
  },
  {
    id: "agency-pricing",
    title: "Pricing AI app work for clients",
    speaker: "Marcus Webb · Certified Expert",
    date: "Jun 25, 2026",
    time: "1:00 PM PT",
    duration: "60 min",
    track: "Business",
    desc: "Open Q&A with the agency owner whose AppsBuiltWithAI line generates 40% of his revenue. Bring your packaging questions.",
    color: "sun",
    rsvps: 421,
  },
];

const ON_DEMAND = [
  { id: 1, title: "From prompt to live URL in 9 minutes",        speaker: "Mei Chen",       track: "Build",    when: "May 21",  views: "12.4K", duration: "32 min", color: "coral" },
  { id: 2, title: "The five-prompt rule (and when to break it)", speaker: "Devon Park",     track: "Product",  when: "May 14",  views: "8.2K",  duration: "28 min", color: "plum"  },
  { id: 3, title: "Custom domains in 90 seconds, properly",      speaker: "Sarah Lin",      track: "Design",   when: "May 07",  views: "6.9K",  duration: "22 min", color: "rose"  },
  { id: 4, title: "Knowledge base: train the AI on your brand",  speaker: "Rachel Moreno",  track: "Brand",    when: "Apr 30",  views: "5.4K",  duration: "44 min", color: "mint"  },
  { id: 5, title: "Connector workshop: Notion, Supabase, Stripe", speaker: "Devon + Mei",   track: "Build",    when: "Apr 23",  views: "9.1K",  duration: "1h 12m", color: "sky"   },
  { id: 6, title: "The PRD habit — why slowing down ships faster", speaker: "Mei Chen",     track: "Product",  when: "Apr 16",  views: "4.8K",  duration: "38 min", color: "warm"  },
];

const TRACKS_FILTER = ["All", "Product", "Build", "Design", "Brand", "Business"];

function WebinarsPage() {
  const [trackFilter, setTrackFilter] = useWbState("All");
  const [rsvped, setRsvped] = useWbState({});

  const upcoming = useWbMemo(() =>
    UPCOMING.filter(w => trackFilter === "All" || w.track === trackFilter),
    [trackFilter]
  );
  const onDemand = useWbMemo(() =>
    ON_DEMAND.filter(w => trackFilter === "All" || w.track === trackFilter),
    [trackFilter]
  );

  return (
    <>
      <section className="sub-hero" data-screen-label="webinars-hero">
        <div className="wrap-tight">
          <Reveal>
            <div className="eyebrow">Webinars</div>
            <h1 className="serif">Live sessions, <em>every Friday.</em></h1>
            <p className="sub-lead">
              Open Q&amp;A. Live builds. Real questions, real answers. Bring
              your half-built app — we'll help finish it on camera.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="sub-meta">
              <span>Free, always</span>
              <span className="dot"/>
              <span>Recorded & on-demand</span>
              <span className="dot"/>
              <span><a href="#upcoming">Next: Jun 04 →</a></span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured next session */}
      <section className="pad">
        <div className="wrap">
          <Reveal>
            <div className="wb-featured">
              <div className="wb-featured-left">
                <span className="wb-featured-tag">Next up</span>
                <h2 className="serif">{UPCOMING[0].title}</h2>
                <p>{UPCOMING[0].desc}</p>
                <div className="wb-featured-meta">
                  <div className="wb-meta-item">
                    <div className="wb-meta-label">Date</div>
                    <div className="wb-meta-val">{UPCOMING[0].date}</div>
                  </div>
                  <div className="wb-meta-item">
                    <div className="wb-meta-label">Time</div>
                    <div className="wb-meta-val">{UPCOMING[0].time}</div>
                  </div>
                  <div className="wb-meta-item">
                    <div className="wb-meta-label">Length</div>
                    <div className="wb-meta-val">{UPCOMING[0].duration}</div>
                  </div>
                  <div className="wb-meta-item">
                    <div className="wb-meta-label">Speaker</div>
                    <div className="wb-meta-val">{UPCOMING[0].speaker.split(" · ")[0]}</div>
                  </div>
                </div>
                <div className="wb-featured-cta">
                  <button
                    className={"btn btn-lg " + (rsvped[UPCOMING[0].id] ? "btn-outline" : "btn-coral")}
                    onClick={() => setRsvped(r => ({ ...r, [UPCOMING[0].id]: !r[UPCOMING[0].id] }))}
                  >
                    {rsvped[UPCOMING[0].id] ? "✓ You're in" : <>Save my seat <ArrowRight/></>}
                  </button>
                  <span className="wb-rsvps">{(UPCOMING[0].rsvps + (rsvped[UPCOMING[0].id] ? 1 : 0)).toLocaleString()} already in</span>
                </div>
              </div>
              <div className="wb-featured-thumb">
                <div className="wb-thumb-bg"/>
                <div className="wb-thumb-play">▶</div>
                <div className="wb-thumb-date">
                  <div className="wb-thumb-month">JUN</div>
                  <div className="wb-thumb-day">04</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Filter pills */}
      <section className="pad pt-0">
        <div className="wrap">
          <Reveal>
            <div className="wb-filter-row">
              <div className="wb-track-pills">
                {TRACKS_FILTER.map(t => (
                  <button
                    key={t}
                    className={"wb-track-pill" + (trackFilter === t ? " active" : "")}
                    onClick={() => setTrackFilter(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <a className="wb-newsletter-link" href="#newsletter">Get reminders by email →</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Upcoming list */}
      <section className="pad pt-0" id="upcoming">
        <div className="wrap">
          <Reveal className="sec-head">
            <div className="eyebrow">Upcoming</div>
            <h2 className="serif">Save a seat.</h2>
          </Reveal>
          <div className="wb-upcoming-grid">
            {upcoming.map((w, i) => (
              <Reveal key={w.id} delay={i * 50}>
                <article className={"wb-card tone-" + w.color}>
                  <div className="wb-card-date">
                    <div className="wb-card-month">{w.date.split(" ")[0].slice(0, 3).toUpperCase()}</div>
                    <div className="wb-card-day">{w.date.split(" ")[1].replace(",", "")}</div>
                  </div>
                  <div className="wb-card-body">
                    <div className="wb-card-meta">
                      <span className="wb-card-track">{w.track}</span>
                      <span className="wb-card-time">{w.time} · {w.duration}</span>
                    </div>
                    <h3>{w.title}</h3>
                    <div className="wb-card-speaker">{w.speaker}</div>
                    <p>{w.desc}</p>
                    <div className="wb-card-foot">
                      <button
                        className={"btn btn-sm " + (rsvped[w.id] ? "btn-outline" : "btn-coral")}
                        onClick={() => setRsvped(r => ({ ...r, [w.id]: !r[w.id] }))}
                      >
                        {rsvped[w.id] ? "✓ Going" : "RSVP"}
                      </button>
                      <span className="wb-card-rsvps">{(w.rsvps + (rsvped[w.id] ? 1 : 0)).toLocaleString()} going</span>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* On demand */}
      <section className="pad pt-0">
        <div className="wrap">
          <Reveal className="sec-head">
            <div className="eyebrow">On demand</div>
            <h2 className="serif">Catch up on past sessions.</h2>
          </Reveal>
          <div className="wb-ondemand-grid">
            {onDemand.map((w, i) => (
              <Reveal key={w.id} delay={Math.min(i, 6) * 30}>
                <article className={"wb-ondemand-card tone-" + w.color}>
                  <div className="wb-ondemand-thumb">
                    <div className="wb-thumb-bg"/>
                    <div className="wb-thumb-play">▶</div>
                    <div className="wb-thumb-duration">{w.duration}</div>
                  </div>
                  <div className="wb-ondemand-body">
                    <div className="wb-ondemand-meta">
                      <span>{w.track}</span><span>·</span>
                      <span>{w.when}</span><span>·</span>
                      <span>{w.views} views</span>
                    </div>
                    <h3>{w.title}</h3>
                    <div className="wb-ondemand-speaker">{w.speaker}</div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pitch your session */}
      <section className="pad pt-0">
        <div className="wrap-tight">
          <Reveal>
            <div className="wb-pitch">
              <div>
                <div className="eyebrow">Want to host?</div>
                <h2 className="serif">Got something to <em>teach the room?</em></h2>
                <p>
                  We host community sessions every other Friday. If you've
                  shipped something interesting on AppsBuiltWithAI, we'd love
                  to put you in front of our audience. Tell us about it.
                </p>
              </div>
              <a className="btn btn-coral btn-lg" href="mailto:webinars@appsbuiltwithai.com">Pitch a session <ArrowRight/></a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Newsletter */}
      <section className="pad pt-0" id="newsletter">
        <div className="wrap-tight" style={{ textAlign: "center" }}>
          <Reveal>
            <h2 className="serif">Get reminders.</h2>
            <p style={{ fontSize: 17, color: "var(--ink-2)", margin: "12px 0 24px" }}>
              One short email the morning of each session. Unsubscribe in one click.
            </p>
            <form className="res-newsletter" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="you@example.com" required/>
              <button className="btn btn-coral">Subscribe</button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}

window.WebinarsPage = WebinarsPage;
