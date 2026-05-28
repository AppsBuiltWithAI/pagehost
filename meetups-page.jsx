/* global React, PoofPart1 */
const { Reveal, ArrowRight } = window.PoofPart1;
const { useState: useMtState, useMemo: useMtMemo } = React;

/* ============= MEETUPS ============= */

// City coordinates normalized to a 100x60 grid (rough world map)
const CITIES = [
  { id: "sf",     name: "San Francisco",  region: "Americas",  members: 1240, next: "Jun 04",  topic: "Build night: shipping side projects",       x: 12, y: 22 },
  { id: "ny",     name: "New York",       region: "Americas",  members: 892,  next: "Jun 11",  topic: "Plan mode, in person",                       x: 26, y: 22 },
  { id: "tor",    name: "Toronto",        region: "Americas",  members: 318,  next: "Jun 18",  topic: "Designers meet AI builders",                 x: 24, y: 19 },
  { id: "mex",    name: "Mexico City",    region: "Americas",  members: 287,  next: "Jun 26",  topic: "Apps para negocios locales",                 x: 18, y: 31 },
  { id: "sp",     name: "São Paulo",      region: "Americas",  members: 412,  next: "Jul 02",  topic: "Stripe + Pix integrations",                  x: 30, y: 42 },
  { id: "ldn",    name: "London",         region: "EMEA",      members: 1102, next: "Jun 05",  topic: "Indie hackers, but together",                x: 50, y: 19 },
  { id: "ber",    name: "Berlin",         region: "EMEA",      members: 678,  next: "Jun 12",  topic: "From freelance to product",                  x: 54, y: 18 },
  { id: "ams",    name: "Amsterdam",      region: "EMEA",      members: 423,  next: "Jun 14",  topic: "Live edits, live cocktails",                 x: 52, y: 18 },
  { id: "par",    name: "Paris",          region: "EMEA",      members: 512,  next: "Jun 19",  topic: "Tooling pour les non-développeurs",          x: 51, y: 20 },
  { id: "tlv",    name: "Tel Aviv",       region: "EMEA",      members: 389,  next: "Jun 23",  topic: "Startup studio night",                       x: 58, y: 25 },
  { id: "lag",    name: "Lagos",          region: "EMEA",      members: 234,  next: "Jul 08",  topic: "Building for African SMEs",                  x: 52, y: 34 },
  { id: "blr",    name: "Bangalore",      region: "APAC",      members: 980,  next: "Jun 08",  topic: "Connectors & APIs deep dive",                x: 70, y: 30 },
  { id: "tok",    name: "Tokyo",          region: "APAC",      members: 612,  next: "Jun 15",  topic: "デザイン × AI",                                 x: 85, y: 25 },
  { id: "syd",    name: "Sydney",         region: "APAC",      members: 478,  next: "Jun 22",  topic: "Hot pies, hotter builds",                    x: 88, y: 50 },
  { id: "sgp",    name: "Singapore",      region: "APAC",      members: 392,  next: "Jun 28",  topic: "Startup night — Asia edition",               x: 78, y: 38 },
];

function MeetupsPage() {
  const [region, setRegion] = useMtState("All");
  const [active, setActive] = useMtState(null);

  const visible = useMtMemo(() => {
    return region === "All" ? CITIES : CITIES.filter(c => c.region === region);
  }, [region]);

  return (
    <>
      <section className="sub-hero" data-screen-label="meetups-hero">
        <div className="wrap-tight">
          <Reveal>
            <div className="eyebrow">Meetups</div>
            <h1 className="serif">Find your <em>local people.</em></h1>
            <p className="sub-lead">
              Builders, designers, and curious folk who use AppsBuiltWithAI
              meet up monthly in 15 cities. Free, casual, snacks included.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="sub-meta">
              <span>15 cities</span>
              <span className="dot"/>
              <span>8,900+ members</span>
              <span className="dot"/>
              <span>Next event: Jun 04</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Map + list */}
      <section className="pad">
        <div className="wrap">
          <Reveal className="mt-filters">
            {["All", "Americas", "EMEA", "APAC"].map(r => (
              <button
                key={r}
                className={"mt-region-pill" + (region === r ? " active" : "")}
                onClick={() => setRegion(r)}
              >
                {r}
                <span className="count">{r === "All" ? CITIES.length : CITIES.filter(c => c.region === r).length}</span>
              </button>
            ))}
          </Reveal>

          <div className="mt-map-wrap">
            <Reveal>
              <div className="mt-map">
                <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="mt-map-svg">
                  {/* Stylized continents (very abstract blobs) */}
                  <g fill="#EDE5D2" stroke="#D8CFB4" strokeWidth="0.2">
                    {/* North America */}
                    <path d="M5,15 L15,12 L22,12 L28,16 L32,22 L29,30 L20,32 L14,29 L8,24 Z"/>
                    {/* South America */}
                    <path d="M22,33 L28,33 L32,40 L30,50 L26,55 L24,50 L22,42 Z"/>
                    {/* Europe */}
                    <path d="M46,14 L58,12 L62,18 L58,22 L52,23 L46,20 Z"/>
                    {/* Africa */}
                    <path d="M48,24 L60,24 L62,32 L58,42 L52,42 L48,34 Z"/>
                    {/* Asia */}
                    <path d="M62,14 L86,12 L92,18 L90,28 L78,32 L70,30 L64,24 Z"/>
                    {/* Australia */}
                    <path d="M82,46 L92,46 L94,52 L90,55 L84,53 Z"/>
                  </g>

                  {visible.map((c) => (
                    <g
                      key={c.id}
                      className={"mt-pin" + (active && active.id === c.id ? " active" : "")}
                      transform={`translate(${c.x},${c.y})`}
                      onMouseEnter={() => setActive(c)}
                      onClick={() => setActive(c)}
                    >
                      <circle r="1.6" className="mt-pin-pulse"/>
                      <circle r="0.8" className="mt-pin-dot"/>
                    </g>
                  ))}
                </svg>
                {active && (
                  <div
                    className="mt-pin-tooltip"
                    style={{ left: active.x + "%", top: (active.y + 4) + "%" }}
                  >
                    <strong>{active.name}</strong>
                    <span>{active.next} · {active.topic}</span>
                  </div>
                )}
              </div>
            </Reveal>
          </div>

          <div className="mt-list">
            {visible.map((c, i) => (
              <Reveal key={c.id} delay={Math.min(i, 6) * 30}>
                <article
                  className={"mt-city" + (active && active.id === c.id ? " active" : "")}
                  onMouseEnter={() => setActive(c)}
                  onMouseLeave={() => setActive(null)}
                >
                  <div className="mt-city-head">
                    <h3>{c.name}</h3>
                    <span className="mt-city-region">{c.region}</span>
                  </div>
                  <div className="mt-city-members">{c.members.toLocaleString()} members</div>
                  <div className="mt-city-next">
                    <div className="mt-city-date">{c.next}</div>
                    <div className="mt-city-topic">{c.topic}</div>
                  </div>
                  <a className="mt-city-rsvp">RSVP →</a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Start one */}
      <section className="pad pt-0">
        <div className="wrap-tight">
          <Reveal>
            <div className="mt-start">
              <div>
                <div className="eyebrow">Don't see your city?</div>
                <h2 className="serif">Start a <em>chapter</em> where you live.</h2>
                <p>
                  We provide the swag, the budget for snacks, and the playbook
                  that worked in the other 15 cities. You provide the people.
                </p>
                <ul>
                  <li>$200 stipend per event (pizza & drinks)</li>
                  <li>Co-branded posters &amp; print materials</li>
                  <li>A Slack channel just for organizers</li>
                  <li>Speakers from our team for the first event</li>
                </ul>
              </div>
              <div className="mt-start-cta">
                <a className="btn btn-coral btn-lg" href="mailto:meetups@appsbuiltwithai.com">Start a chapter <ArrowRight/></a>
                <a className="btn btn-outline btn-lg" href="#">Read the playbook</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Code of conduct */}
      <section className="pad pt-0">
        <div className="wrap-tight">
          <Reveal>
            <div className="mt-code">
              <h3>Code of conduct, in one paragraph</h3>
              <p>
                Be welcoming. Talk to people you don't know. Help anyone
                stuck. No selling. No recruiting unless someone asks. We
                kick out anyone making others feel unsafe — no warnings, no
                drama. Otherwise: have fun, build stuff, eat the pizza.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

window.MeetupsPage = MeetupsPage;
