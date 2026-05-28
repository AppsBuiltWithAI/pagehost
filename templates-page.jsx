/* global React, PoofPart1 */
const { Reveal, ArrowRight, PromptBox } = window.PoofPart1;
const { useState: useTplState } = React;

/* ============= TEMPLATES BROWSER PAGE ============= */
const TPL_ITEMS = [
  { name: "Crumb & Co.",       desc: "Bakery pickup & pre-orders",       art: "tpl-bakery",   icon: "🥐", cat: "Business", uses: 1240, badge: "Popular" },
  { name: "Client Hub",        desc: "Coaching client portal",           art: "tpl-portal",   icon: "📋", cat: "Business", uses: 890 },
  { name: "Stillpoint",        desc: "Yoga class scheduler",             art: "tpl-yoga",     icon: "🧘", cat: "Business", uses: 712 },
  { name: "Tiny Shop",         desc: "Weekend storefront",               art: "tpl-shop",     icon: "🛒", cat: "Stores",   uses: 2104, badge: "Popular" },
  { name: "Page Turners",      desc: "Book-club site",                   art: "tpl-book",     icon: "📚", cat: "Personal", uses: 318 },
  { name: "Hello, Party",      desc: "Event RSVP page",                  art: "tpl-event",    icon: "🎉", cat: "Personal", uses: 920 },
  { name: "PawPal",            desc: "Pet-sitter booker",                art: "tpl-pet",      icon: "🐾", cat: "Forms",    uses: 540 },
  { name: "Invoice Stack",     desc: "Freelance invoices",               art: "tpl-invoice",  icon: "🧾", cat: "Business", uses: 1670 },
  { name: "Slow Mornings",     desc: "Newsletter sign-up + archive",     art: "tpl-bakery",   icon: "✉️", cat: "Forms",    uses: 480, badge: "New" },
  { name: "Field Notes",       desc: "Personal journal site",            art: "tpl-yoga",     icon: "📓", cat: "Personal", uses: 215 },
  { name: "Two-Wheel Tours",   desc: "Bike rental booking",              art: "tpl-shop",     icon: "🚲", cat: "Business", uses: 367 },
  { name: "Wedding Day",       desc: "RSVP & details page",              art: "tpl-event",    icon: "💐", cat: "Personal", uses: 1180 },
  { name: "Small Plates",      desc: "Menu + reservations",              art: "tpl-bakery",   icon: "🍽️", cat: "Business", uses: 805 },
  { name: "Studio Time",       desc: "Photographer portfolio",           art: "tpl-portal",   icon: "📸", cat: "Personal", uses: 612 },
  { name: "Lemonade",          desc: "Lead-gen landing",                 art: "tpl-invoice",  icon: "🍋", cat: "Forms",    uses: 1390, badge: "Popular" },
  { name: "Kindred",           desc: "Nonprofit donation page",          art: "tpl-event",    icon: "🤝", cat: "Forms",    uses: 270 },
  { name: "Common Room",       desc: "Community member directory",       art: "tpl-portal",   icon: "👥", cat: "Business", uses: 410, badge: "New" },
  { name: "Trailhead",         desc: "Course catalog & enrollment",      art: "tpl-book",     icon: "🎓", cat: "Business", uses: 760 },
  { name: "Stocked",           desc: "Boutique inventory tracker",       art: "tpl-shop",     icon: "📦", cat: "Stores",   uses: 332 },
  { name: "Open House",        desc: "Real-estate listing page",         art: "tpl-portal",   icon: "🏠", cat: "Personal", uses: 295 },
  { name: "Garden Plot",       desc: "Allotment swap board",             art: "tpl-yoga",     icon: "🌿", cat: "Personal", uses: 142, badge: "New" },
  { name: "Late Night Pizza",  desc: "Order ahead + delivery zone",      art: "tpl-bakery",   icon: "🍕", cat: "Business", uses: 998 },
  { name: "Quiet Hours",       desc: "Mental-health booking form",       art: "tpl-yoga",     icon: "🌙", cat: "Forms",    uses: 188 },
  { name: "Side Hustle",       desc: "Freelancer portfolio + intake",    art: "tpl-invoice",  icon: "💼", cat: "Personal", uses: 1120 },
];

const TPL_CATS = [
  { key: "All",      label: "All templates" },
  { key: "Business", label: "Business" },
  { key: "Personal", label: "Personal" },
  { key: "Stores",   label: "Stores" },
  { key: "Forms",    label: "Forms & landing" },
];

function TplHero() {
  return (
    <section className="sub-hero" data-screen-label="templates-hero">
      <div className="wrap-tight">
        <Reveal>
          <div className="eyebrow">Templates</div>
          <h1 className="serif">Start from something <em>that already works.</em></h1>
          <p className="sub-lead">
            Sixty-something real apps shipped by real non-coders. Pick one,
            change the words, change the colors, change everything — it's yours
            in a couple minutes.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <div className="sub-meta">
            <span>64 templates</span>
            <span className="dot"/>
            <span>Updated weekly</span>
            <span className="dot"/>
            <span>Free to remix</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TplBrowser() {
  const [active, setActive] = useTplState("All");
  const [query,  setQuery]  = useTplState("");
  const [sort,   setSort]   = useTplState("popular");

  let list = TPL_ITEMS.slice();
  if (active !== "All") list = list.filter(t => t.cat === active);
  if (query.trim()) {
    const q = query.toLowerCase();
    list = list.filter(t => t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q));
  }
  if (sort === "popular") list.sort((a,b) => b.uses - a.uses);
  if (sort === "new")     list.sort((a,b) => (b.badge === "New") - (a.badge === "New"));
  if (sort === "az")      list.sort((a,b) => a.name.localeCompare(b.name));

  const counts = TPL_CATS.reduce((acc, c) => {
    acc[c.key] = c.key === "All" ? TPL_ITEMS.length : TPL_ITEMS.filter(t => t.cat === c.key).length;
    return acc;
  }, {});

  return (
    <React.Fragment>
      <section className="cat-strip" data-screen-label="templates-filters">
        <div className="wrap">
          <Reveal>
            <div className="tpl-search">
              <span className="icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>
                </svg>
              </span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search 64 templates — “bakery”, “booking”, “invoice”…"
                aria-label="Search templates"
              />
              {query && (
                <button className="tpl-search-clear" onClick={() => setQuery("")} aria-label="Clear">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
                </button>
              )}
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="cat-row">
              {TPL_CATS.map((c) => (
                <button
                  key={c.key}
                  className={"cat-pill" + (active === c.key ? " active" : "")}
                  onClick={() => setActive(c.key)}
                >
                  {c.label}
                  <span className="count">{counts[c.key]}</span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pad-sm templates-section" data-screen-label="templates-grid">
        <div className="wrap">
          <div className="sort-bar">
            <div className="count-label">{list.length} {list.length === 1 ? "template" : "templates"}</div>
            <select className="sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="popular">Sort · Most used</option>
              <option value="new">Sort · Newest first</option>
              <option value="az">Sort · A → Z</option>
            </select>
          </div>

          {list.length === 0 ? (
            <div className="tpl-empty">
              <div className="tpl-empty-mark">🫥</div>
              <h3>Nothing matched “{query}”.</h3>
              <p>Try a broader word — or describe it in the prompt below and we'll just build it.</p>
              <a className="btn btn-outline" onClick={() => { setQuery(""); setActive("All"); }}>Clear filters</a>
            </div>
          ) : (
            <div className="tpl-grid tpl-grid-page">
              {list.map((t, i) => (
                <Reveal key={t.name + i} delay={(i % 3) * 60}>
                  <div className="tpl-card">
                    <div className={"tpl-thumb " + t.art}>
                      <div className="tpl-image-slot" data-placeholder={t.name + " screenshot"}>
                        <div className="tpl-image-hint">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="3"/>
                            <circle cx="9" cy="9" r="1.5"/>
                            <path d="m21 15-5-5L5 21"/>
                          </svg>
                          <span>Preview</span>
                        </div>
                      </div>
                      <span className="tpl-cat-pill">{t.cat}</span>
                      {t.badge && <span className={"tpl-badge tpl-badge-" + t.badge.toLowerCase()}>{t.badge}</span>}
                    </div>
                    <div className="tpl-meta">
                      <div className="tpl-meta-left">
                        <span className="tpl-icon">{t.icon}</span>
                        <div>
                          <h4>{t.name}</h4>
                          <p>{t.desc}</p>
                        </div>
                      </div>
                      <div className="tpl-use">
                        Use
                        <ArrowRight/>
                      </div>
                    </div>
                    <div className="tpl-stats">
                      <span>↑ {t.uses.toLocaleString()} remixes</span>
                      <span className="dot"/>
                      <span>~9 min to ship</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </React.Fragment>
  );
}

function TplCantFind() {
  return (
    <section className="pad" data-screen-label="templates-cant-find" style={{ background: "var(--bg)" }}>
      <div className="wrap-tight" style={{ textAlign: "center" }}>
        <Reveal>
          <div className="eyebrow">Don't see yours?</div>
          <h2 className="serif" style={{
            fontFamily: "var(--f-head)",
            fontWeight: "var(--h-weight)",
            fontSize: "clamp(36px, 4.4vw, 60px)",
            letterSpacing: "var(--h-spacing)",
            lineHeight: 1.05,
            margin: "16px 0 12px",
          }}>
            Templates are just <em style={{ color: "var(--ink-2)" }}>a head start.</em>
          </h2>
          <p style={{ color: "var(--ink-2)", maxWidth: 600, margin: "0 auto 36px" }}>
            Skip the gallery. Describe the app you actually want and we'll build it
            from scratch — same speed, same friendliness.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <PromptBox/>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TemplatesPage() {
  return (
    <React.Fragment>
      <TplHero/>
      <TplBrowser/>
      <TplCantFind/>
    </React.Fragment>
  );
}

window.TemplatesPage = TemplatesPage;
