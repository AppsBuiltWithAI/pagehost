import { useState as useCbState, useEffect as useCbEffect } from 'react';
import { Reveal, ArrowRight, Check } from './part1.jsx';

const CB_LEVELS = {
  master: { label: "Master", tone: "plum", desc: "Twenty-five or more live apps, a repeat-client rate above 50%, and a reviewed portfolio." },
  pro:    { label: "Professional", tone: "coral", desc: "Ten live apps, two repeat clients, and a passed build review." },
  assoc:  { label: "Associate", tone: "ink", desc: "Five live apps and a passed practical exam." },
};

const CB_SPECIALTIES = ["Booking and scheduling", "Payments and checkout", "Client portals", "Internal dashboards", "Marketplaces", "Courses and memberships", "Data and integrations", "Multi-language apps"];

const CB_BUILDERS = [
  {
    id: "priya-anand", name: "Priya Anand", loc: "Bristol, UK", tz: "GMT",
    level: "master", cred: "ABW-M-0112", since: "March 2024",
    headline: "Booking apps for studios and clinics.",
    bio: "I ran a Pilates studio for nine years, then rebuilt its booking system here and never went back to the off-the-shelf tools. Most of my work is calendars, class packs and no-show handling for owner-operated businesses.",
    specs: ["Booking and scheduling", "Payments and checkout"],
    inds: ["Fitness", "Health", "Local services"],
    stats: { built: 41, live: 34, repeat: "68%", first: "6 days" },
    rate: "From $1,400 per app", avail: "Taking work", langs: ["English", "Hindi"],
    work: [
      { t: "Studio Desk", d: "Class booking, packs and waitlists for 40 studios" },
      { t: "Northside Clinic", d: "Practitioner rotas and intake forms" },
      { t: "DropIn", d: "Pay-as-you-go passes with Stripe" },
    ],
    quote: ["She rebuilt our booking in a week and our no-shows halved.", "Owner, Fold Yoga"],
  },
  {
    id: "marcus-oyelaran", name: "Marcus Oyelaran", loc: "Lagos, NG", tz: "WAT",
    level: "master", cred: "ABW-M-0147", since: "June 2024",
    headline: "Marketplaces and two-sided apps.",
    bio: "I build the awkward middle of a marketplace: listings, vetting, payouts and the admin screens nobody demos. Ten years in logistics ops before this, which is where most of my instincts come from.",
    specs: ["Marketplaces", "Payments and checkout", "Internal dashboards"],
    inds: ["Logistics", "Retail", "Agriculture"],
    stats: { built: 33, live: 27, repeat: "54%", first: "9 days" },
    rate: "From $2,600 per app", avail: "Taking work", langs: ["English", "Yoruba"],
    work: [
      { t: "FarmLink", d: "Produce marketplace with split payouts" },
      { t: "Haul", d: "Driver dispatch and load board" },
      { t: "Verified", d: "Seller vetting queue for an admin team" },
    ],
    quote: ["He understood the payout problem faster than our last two contractors.", "Founder, FarmLink"],
  },
  {
    id: "daniel-kovac", name: "Daniel Kovac", loc: "Prague, CZ", tz: "CET",
    level: "master", cred: "ABW-M-0208", since: "January 2025",
    headline: "Data plumbing and integrations.",
    bio: "If your app needs to talk to something else, that is the part I do. Webhooks, Sheets, Supabase, Stripe events, and the retry logic that keeps them honest when a service goes down.",
    specs: ["Data and integrations", "Internal dashboards"],
    inds: ["SaaS", "Finance", "Operations"],
    stats: { built: 52, live: 45, repeat: "62%", first: "4 days" },
    rate: "$95 per hour", avail: "Taking work", langs: ["Czech", "English", "German"],
    work: [
      { t: "Ledgerbridge", d: "Stripe to accounting sync with reconciliation" },
      { t: "Nightly", d: "Scheduled imports from four vendor feeds" },
      { t: "Ops Board", d: "Live operations dashboard on Supabase" },
    ],
    quote: ["Our imports had failed silently for months. He found it in an afternoon.", "COO, Trellis"],
  },
  {
    id: "sofia-ruiz", name: "Sofia Ruiz", loc: "Madrid, ES", tz: "CET",
    level: "pro", cred: "ABW-P-1044", since: "August 2024",
    headline: "Client portals for agencies and consultants.",
    bio: "Portals, proposals and reporting for people who bill by the project. I care most about the handover: every app I build ships with a short recorded walkthrough for the client's team.",
    specs: ["Client portals", "Internal dashboards"],
    inds: ["Agencies", "Consulting", "Legal"],
    stats: { built: 28, live: 24, repeat: "71%", first: "5 days" },
    rate: "From $1,900 per app", avail: "Booked to Nov", langs: ["Spanish", "English"],
    work: [
      { t: "Casewire", d: "Matter tracking for a six-person law firm" },
      { t: "Brief", d: "Proposal and approval portal" },
      { t: "Monthly", d: "Client reporting with Sheets sync" },
    ],
    quote: ["The walkthrough video meant nobody on my team had to ask me anything.", "Partner, Vela Consulting"],
  },
  {
    id: "amara-nwosu", name: "Amara Nwosu", loc: "Toronto, CA", tz: "EST",
    level: "pro", cred: "ABW-P-1120", since: "October 2024",
    headline: "Courses, memberships and community apps.",
    bio: "Course platforms, member areas and cohort tools. I have run three of my own paid communities, so I build for renewal and drop-off rather than for the launch week.",
    specs: ["Courses and memberships", "Payments and checkout"],
    inds: ["Education", "Coaching", "Nonprofits"],
    stats: { built: 24, live: 21, repeat: "58%", first: "7 days" },
    rate: "From $1,600 per app", avail: "Taking work", langs: ["English", "French"],
    work: [
      { t: "Cohortly", d: "Cohort courses with progress and certificates" },
      { t: "Members", d: "Tiered membership with Stripe billing" },
      { t: "Circle Up", d: "Community directory and event sign-ups" },
    ],
    quote: ["Renewals went up because she designed for month three, not day one.", "Founder, The Draft Room"],
  },
  {
    id: "lena-fischer", name: "Lena Fischer", loc: "Berlin, DE", tz: "CET",
    level: "pro", cred: "ABW-P-1187", since: "February 2025",
    headline: "Nonprofit and civic apps on small budgets.",
    bio: "Volunteer rotas, grant tracking and service directories. Fixed-fee work for organizations that need the number up front, and I train one person on the team to make changes themselves.",
    specs: ["Client portals", "Internal dashboards", "Multi-language apps"],
    inds: ["Nonprofits", "Government", "Education"],
    stats: { built: 31, live: 26, repeat: "64%", first: "7 days" },
    rate: "Fixed fee from $900", avail: "Taking work", langs: ["German", "English"],
    work: [
      { t: "Rota", d: "Volunteer scheduling for a food bank network" },
      { t: "Grants", d: "Grant deadline and reporting tracker" },
      { t: "Wegweiser", d: "Bilingual service directory" },
    ],
    quote: ["She trained our coordinator so we stopped needing anyone at all.", "Director, Tafel Nord"],
  },
  {
    id: "hiroshi-tanaka", name: "Hiroshi Tanaka", loc: "Osaka, JP", tz: "JST",
    level: "pro", cred: "ABW-P-1233", since: "April 2025",
    headline: "Multi-language and multi-region apps.",
    bio: "Apps that have to work in two or three languages without becoming two or three apps. Translation structure, currency, date formats, and the layout problems that only show up in Japanese.",
    specs: ["Multi-language apps", "Client portals"],
    inds: ["Retail", "Travel", "Manufacturing"],
    stats: { built: 19, live: 17, repeat: "49%", first: "8 days" },
    rate: "From $2,200 per app", avail: "Waitlist", langs: ["Japanese", "English"],
    work: [
      { t: "Sanmoku", d: "Trilingual product catalog and quote tool" },
      { t: "Tabi", d: "Tour booking in JP, EN and ZH" },
      { t: "Kobo", d: "Supplier portal with regional pricing" },
    ],
    quote: ["Our Japanese copy finally fits the buttons.", "Marketing lead, Tabi"],
  },
  {
    id: "kwame-mensah", name: "Kwame Mensah", loc: "Accra, GH", tz: "GMT",
    level: "assoc", cred: "ABW-A-2318", since: "June 2025",
    headline: "Checkout and payments, done carefully.",
    bio: "Carts, checkouts, subscriptions and the failure cases: declined cards, refunds, partial payments. I test every build with real cards before handover.",
    specs: ["Payments and checkout", "Marketplaces"],
    inds: ["Retail", "Food", "Events"],
    stats: { built: 17, live: 15, repeat: "51%", first: "5 days" },
    rate: "From $1,200 per app", avail: "Taking work", langs: ["English", "Twi"],
    work: [
      { t: "Tap", d: "Mobile checkout for a food brand" },
      { t: "Gate", d: "Event tickets with door scanning" },
      { t: "Refund Desk", d: "Refund handling for a support team" },
    ],
    quote: ["He caught three checkout edge cases we had shipped past twice.", "Founder, Tap"],
  },
  {
    id: "elena-marchetti", name: "Elena Marchetti", loc: "Milan, IT", tz: "CET",
    level: "assoc", cred: "ABW-A-2402", since: "July 2025",
    headline: "Ops dashboards for small manufacturers.",
    bio: "Production tracking, stock and job sheets for workshops between five and fifty people. Mostly replacing spreadsheets that three people are afraid to touch.",
    specs: ["Internal dashboards", "Data and integrations"],
    inds: ["Manufacturing", "Food", "Trades"],
    stats: { built: 14, live: 12, repeat: "43%", first: "6 days" },
    rate: "From $1,300 per app", avail: "Taking work", langs: ["Italian", "English"],
    work: [
      { t: "Officina", d: "Job sheets and production queue for a workshop" },
      { t: "Stockroom", d: "Stock counts with barcode entry" },
      { t: "Turni", d: "Shift planning for a bakery" },
    ],
    quote: ["The spreadsheet is gone and nobody misses it.", "Owner, Officina Bruno"],
  },
];

const CB_TRACKS = [
  { key: "assoc", tone: "ink", level: "Level one", name: "Associate", tagline: "You can ship.", price: "Free",
    blurb: "Sit the practical exam once you have five apps live. It is the same build brief for everyone, marked against a published rubric.",
    reqs: ["Five apps live with real users", "Practical exam, four hours", "Published profile"],
    perks: ["Listed in this portal", "Credential ID and badge", "Annual review"] },
  { key: "pro", tone: "coral", level: "Level two", name: "Professional", tagline: "Clients come back.", price: "$240 review fee", featured: true,
    blurb: "A reviewed portfolio, not another exam. Two of our Masters read three of your builds and the handover docs that came with them.",
    reqs: ["Ten apps live", "Two repeat clients", "Portfolio review by two Masters"],
    perks: ["Priority placement in the directory", "Intro requests routed to you first", "Client brief digest, weekly", "Summit discount"] },
  { key: "master", tone: "plum", level: "Level three", name: "Master", tagline: "You set the standard.", price: "By nomination",
    blurb: "Nominated, not applied for. Masters review Professional portfolios, write rubric updates, and teach in the education library.",
    reqs: ["Twenty-five apps live", "Repeat-client rate above 50%", "Nomination by two existing Masters"],
    perks: ["Top of the directory", "Paid review and teaching work", "Rubric and roadmap input", "Summit speaking slot"] },
];

const CB_STEPS = [
  { n: "01", t: "Ship five real apps", d: "Live, with real users, on any plan including Free. The platform counts them for you, so there is nothing to submit." },
  { n: "02", t: "Sit the practical", d: "A four-hour build brief, marked against a rubric we publish in advance. Two attempts included, no time limit between them." },
  { n: "03", t: "Get listed", d: "You get a credential ID, a badge for your own site, and a profile in this portal. Intro requests start arriving the same week." },
];

const CB_QUOTES = [
  { q: "The Professional review was the first time anyone had read my handover docs. Three of the notes changed how I work.", n: "Sofia Ruiz", r: "Professional, Madrid", tone: "warm" },
  { q: "I put the credential ID on my proposals. Clients stopped asking whether I was a real developer.", n: "Kwame Mensah", r: "Associate, Accra", tone: "rose" },
  { q: "Nomination to Master meant reviewing other people's builds. I learned more doing that than in my first two years.", n: "Daniel Kovac", r: "Master, Prague", tone: "plum" },
];

function CbBadge({ level }) {
  const L = CB_LEVELS[level];
  return <span className={"cb-badge cb-badge-" + L.tone}>{level === "master" && <Check/>}{L.label}</span>;
}

function CbProfile({ e, onClose }) {
  useCbEffect(() => {
    const k = (ev) => { if (ev.key === "Escape") onClose(); };
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div className="cb-sheet-wrap" onClick={onClose}>
      <div className="cb-sheet" role="dialog" aria-label={e.name} onClick={(ev) => ev.stopPropagation()}>
        <button className="cb-sheet-x" onClick={onClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>

        <div className="cb-sheet-head">
          <div className={"cb-seal tone-" + CB_LEVELS[e.level].tone}>
            <span className="cb-seal-l">{CB_LEVELS[e.level].label}</span>
            <span className="cb-seal-n">{e.name.split(" ").map((w) => w[0]).join("")}</span>
            <span className="cb-seal-y">{e.since.split(" ")[1]}</span>
          </div>
          <div className="cb-sheet-id">
            <CbBadge level={e.level}/>
            <h2>{e.name}</h2>
            <p className="cb-sheet-hl">{e.headline}</p>
            <div className="cb-sheet-meta">
              <span>{e.loc}</span><span className="cb-dot"/><span>{e.tz}</span><span className="cb-dot"/><span>{e.langs.join(", ")}</span>
            </div>
            <div className="cb-credline">
              <span>Credential <b>{e.cred}</b></span>
              <span className="cb-dot"/>
              <span>Certified {e.since}</span>
              <span className="cb-dot"/>
              <span className="cb-credline-ok">Verified, in good standing</span>
            </div>
          </div>
        </div>

        <div className="cb-sheet-stats">
          <div><b>{e.stats.built}</b><span>apps shipped</span></div>
          <div><b>{e.stats.live}</b><span>still live</span></div>
          <div><b>{e.stats.repeat}</b><span>repeat clients</span></div>
          <div><b>{e.stats.first}</b><span>to first build</span></div>
        </div>

        <div className="cb-sheet-body">
          <div className="cb-sheet-main">
            <h3>About</h3>
            <p>{e.bio}</p>

            <h3>Selected builds</h3>
            <ul className="cb-work">
              {e.work.map((w, i) => (
                <li key={w.t}>
                  <span className="cb-work-n">{String(i + 1).padStart(2, "0")}</span>
                  <span className="cb-work-b"><b>{w.t}</b><span>{w.d}</span></span>
                </li>
              ))}
            </ul>

            <blockquote className="cb-testimonial">
              <p>{e.quote[0]}</p>
              <cite>{e.quote[1]}</cite>
            </blockquote>
          </div>

          <aside className="cb-sheet-side">
            <div className="cb-side-card">
              <div className="cb-side-row"><span>Availability</span><b>{e.avail}</b></div>
              <div className="cb-side-row"><span>Starting at</span><b>{e.rate}</b></div>
              <a className="btn btn-coral btn-block" href={"mailto:builders@builtwithai?subject=" + encodeURIComponent("Intro request: " + e.name)}>Request an intro <ArrowRight/></a>
              <p className="cb-side-note">Intros are free. We pass your brief on and {e.name.split(" ")[0]} replies directly.</p>
            </div>
            <div className="cb-side-card">
              <h4>Certified in</h4>
              <div className="cb-chips">{e.specs.map((s) => <span key={s} className="cb-chip">{s}</span>)}</div>
              <h4 style={{ marginTop: 18 }}>Industries</h4>
              <div className="cb-chips">{e.inds.map((s) => <span key={s} className="cb-chip cb-chip-quiet">{s}</span>)}</div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function CbFeatureCard({ e, onOpen }) {
  return (
    <button className={"cb-feature tone-" + CB_LEVELS[e.level].tone} onClick={() => onOpen(e)}>
      <span className="cb-feature-top">
        <span className={"cb-seal sm tone-" + CB_LEVELS[e.level].tone}>
          <span className="cb-seal-l">{CB_LEVELS[e.level].label}</span>
          <span className="cb-seal-n">{e.name.split(" ").map((w) => w[0]).join("")}</span>
          <span className="cb-seal-y">{e.since.split(" ")[1]}</span>
        </span>
        <span className="cb-feature-cred">{e.cred}</span>
      </span>
      <span className="cb-feature-name">{e.name}</span>
      <span className="cb-feature-hl">{e.headline}</span>
      <span className="cb-feature-stats">
        <span><b>{e.stats.built}</b>shipped</span>
        <span><b>{e.stats.live}</b>live</span>
        <span><b>{e.stats.repeat}</b>repeat</span>
      </span>
      <span className="cb-feature-foot">
        <span className={"cb-avail" + (e.avail === "Taking work" ? " on" : "")}>{e.avail}</span>
        <span className="cb-feature-cta">View profile <ArrowRight/></span>
      </span>
    </button>
  );
}

function CertifiedBuildersPage() {
  const [q, setQ] = useCbState("");
  const [lvl, setLvl] = useCbState("all");
  const [spec, setSpec] = useCbState("All");
  const [open, setOpen] = useCbState(null);
  const [lookup, setLookup] = useCbState("");
  const [found, setFound] = useCbState(null);

  const order = { master: 0, pro: 1, assoc: 2 };
  const matches = CB_BUILDERS.filter((e) => {
    if (lvl !== "all" && e.level !== lvl) return false;
    if (spec !== "All" && !e.specs.includes(spec)) return false;
    if (q.trim()) {
      const hay = (e.name + " " + e.headline + " " + e.bio + " " + e.specs.join(" ") + " " + e.inds.join(" ") + " " + e.loc + " " + e.cred).toLowerCase();
      if (!hay.includes(q.trim().toLowerCase())) return false;
    }
    return true;
  }).sort((a, b) => order[a.level] - order[b.level] || b.stats.built - a.stats.built);

  const filtering = lvl !== "all" || spec !== "All" || q.trim() !== "";
  const featured = filtering ? [] : matches.filter((e) => e.level === "master");
  const roster = filtering ? matches : matches.filter((e) => e.level !== "master");

  const verify = (ev) => {
    ev.preventDefault();
    const id = lookup.trim().toUpperCase();
    if (!id) { setFound(null); return; }
    setFound(CB_BUILDERS.find((e) => e.cred.toUpperCase() === id) || "none");
  };

  return (
    <>
      {/* HERO */}
      <section className="cb-hero" data-screen-label="builders-hero">
        <div className="wrap">
          <Reveal>
            <div className="eyebrow">Certified builder portal</div>
            <h1 className="serif">Certified on what they <em>shipped.</em></h1>
            <p className="sub-lead">
              Three levels, one published rubric, and a credential you can look up. Every builder listed here
              passed a practical exam on work that is live and taking real users. Intros are free.
            </p>
            <div className="cb-hero-cta">
              <a className="btn btn-coral btn-lg" href="#directory">Find a certified builder <ArrowRight/></a>
              <a className="btn btn-outline btn-lg" href="#levels">Get certified</a>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <div className="cert-stats cb-stats">
              {[["9", "certified builders"], ["3", "certification levels"], ["258", "apps shipped between them"], ["19", "countries"]].map(([n, l]) => (
                <div className="cert-stat" key={l}>
                  <div className="cert-stat-num">{n}</div>
                  <div className="cert-stat-lbl">{l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* VERIFY A CREDENTIAL */}
      <section className="pad pt-0" data-screen-label="builders-verify">
        <div className="wrap">
          <Reveal>
            <div className="cert-verify">
              <div>
                <div className="eyebrow">Check anyone</div>
                <h3>Verify a credential.</h3>
                <p>Someone told you they are certified. Type the ID from their proposal or badge and see what it actually says. Try <button className="cb-try" onClick={() => { setLookup("ABW-M-0112"); setFound(CB_BUILDERS[0]); }}>ABW-M-0112</button>.</p>
              </div>
              <div>
                <form className="cert-verify-form" onSubmit={verify}>
                  <input value={lookup} onChange={(e) => { setLookup(e.target.value); setFound(null); }} placeholder="ABW-P-1044" aria-label="Credential ID"/>
                  <button className="btn btn-ink btn-sm" type="submit">Verify</button>
                </form>
                {found === "none" && <div className="cb-verify-out bad">No credential with that ID. Check the format, or ask them to send the badge link.</div>}
                {found && found !== "none" && (
                  <button className="cb-verify-out ok" onClick={() => setOpen(found)}>
                    <b>{found.name}</b>
                    <span>{CB_LEVELS[found.level].label} · certified {found.since} · in good standing</span>
                    <span className="cb-verify-link">Open profile →</span>
                  </button>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* DIRECTORY */}
      <section className="pad pt-0 cb-dir" id="directory" data-screen-label="builders-directory">
        <div className="wrap">
          <Reveal className="sec-head">
            <div className="eyebrow">The directory</div>
            <h2 className="serif">Who is certified.</h2>
          </Reveal>

          <div className="cb-controls">
            <div className="cb-levels">
              <button className={"cb-lvl-b" + (lvl === "all" ? " on" : "")} onClick={() => setLvl("all")}>All levels</button>
              {["master", "pro", "assoc"].map((k) => (
                <button key={k} className={"cb-lvl-b" + (lvl === k ? " on" : "")} onClick={() => setLvl(k)}>{CB_LEVELS[k].label}</button>
              ))}
            </div>
            <div className="cb-controls-r">
              <label className="cb-search">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, credential or what you need built"/>
              </label>
              <select value={spec} onChange={(e) => setSpec(e.target.value)} aria-label="Specialism">
                <option value="All">Any specializm</option>
                {CB_SPECIALTIES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {featured.length > 0 && (
            <>
              <div className="cb-sub">Masters</div>
              <div className="cb-feature-grid">
                {featured.map((e, i) => <Reveal key={e.id} delay={i * 45}><CbFeatureCard e={e} onOpen={setOpen}/></Reveal>)}
              </div>
            </>
          )}

          {roster.length > 0 && (
            <>
              <div className="cb-sub">{filtering ? matches.length + (matches.length === 1 ? " match" : " matches") : "Professional and Associate"}</div>
              <div className="cb-roster">
                <div className="cb-row cb-row-head">
                  <span>Builder</span><span>Level</span><span>Certified in</span><span className="cb-num">Shipped</span><span className="cb-num">Live</span><span>Availability</span><span></span>
                </div>
                {roster.map((e) => (
                  <button key={e.id} className="cb-row" onClick={() => setOpen(e)}>
                    <span className="cb-row-who">
                      <b>{e.name}</b>
                      <span>{e.loc} · {e.cred}</span>
                    </span>
                    <span><CbBadge level={e.level}/></span>
                    <span className="cb-row-spec">{e.specs[0]}{e.specs.length > 1 ? " +" + (e.specs.length - 1) : ""}</span>
                    <span className="cb-num">{e.stats.built}</span>
                    <span className="cb-num">{e.stats.live}</span>
                    <span><span className={"cb-avail" + (e.avail === "Taking work" ? " on" : "")}>{e.avail}</span></span>
                    <span className="cb-row-go"><ArrowRight/></span>
                  </button>
                ))}
              </div>
            </>
          )}

          {matches.length === 0 && (
            <div className="cb-empty">
              <b>Nobody matches that yet.</b>
              <p>Clear a filter, or tell us what you need and we will look for someone.</p>
              <a className="btn btn-outline" href="mailto:builders@builtwithai?subject=Looking%20for%20a%20certified%20builder">Describe your project</a>
            </div>
          )}
        </div>
      </section>

      {/* LEVELS */}
      <section className="pad pt-0" id="levels" data-screen-label="builders-levels">
        <div className="wrap">
          <Reveal className="sec-head">
            <div className="eyebrow">Certification</div>
            <h2 className="serif">Three levels, <em>one rubric.</em></h2>
            <p>You cannot buy a level and you cannot study for one on paper. Each is measured on apps that are live, and the rubric is published before you sit anything.</p>
          </Reveal>
          <div className="cert-tracks">
            {CB_TRACKS.map((t, i) => (
              <Reveal key={t.key} delay={i * 60}>
                <div className={"cert-track tone-" + t.tone + (t.featured ? " featured" : "")}>
                  {t.featured && <span className="cert-track-flag">Most applied for</span>}
                  <div className="cert-track-level">{t.level}</div>
                  <h3>{t.name}</h3>
                  <div className="cert-track-tagline">{t.tagline}</div>
                  <p>{t.blurb}</p>
                  <div className="cert-track-price">{t.price}</div>
                  <div className="cert-track-section-title">What it takes</div>
                  <ul className="cert-track-modules">{t.reqs.map((r) => <li key={r}>{r}</li>)}</ul>
                  <div className="cert-track-section-title">What you get</div>
                  <ul className="cert-track-perks">{t.perks.map((p) => <li key={p}><Check/> <span>{p}</span></li>)}</ul>
                  <a className={t.featured ? "btn btn-coral btn-block" : "btn btn-outline btn-block"} href="mailto:builders@builtwithai?subject=Certification%20application">
                    {t.key === "master" ? "How nomination works" : "Apply for " + t.name}
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW */}
      <section className="pad pt-0" data-screen-label="builders-how">
        <div className="wrap">
          <Reveal className="sec-head">
            <div className="eyebrow">Getting certified</div>
            <h2 className="serif">Three steps, no coursework.</h2>
          </Reveal>
          <div className="cert-steps">
            {CB_STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 50}>
                <div className="cert-step">
                  <div className="cert-step-num">{s.n}</div>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTES */}
      <section className="pad pt-0" data-screen-label="builders-quotes">
        <div className="wrap">
          <div className="cert-testimonials">
            {CB_QUOTES.map((c, i) => (
              <Reveal key={c.n} delay={i * 50}>
                <figure className="cert-quote">
                  <blockquote>{c.q}</blockquote>
                  <figcaption>
                    <div className={"cert-avatar tone-" + c.tone}>{c.n.split(" ").map((w) => w[0]).join("")}</div>
                    <div>
                      <div className="cert-quote-name">{c.n}</div>
                      <div className="cert-quote-role">{c.r}</div>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HIRING AT SCALE */}
      <section className="pad pt-0" data-screen-label="builders-teams">
        <div className="wrap">
          <Reveal>
            <div className="cert-enterprise">
              <div className="eyebrow">For teams</div>
              <h2>Need more than <em>one builder?</em></h2>
              <p>
                Tell us the brief, the budget and the deadline. We shortlist three certified builders who have
                shipped the thing you are asking for, and you talk to all three. No fee, and no commission on
                what you agree with them.
              </p>
              <div className="cb-ent-row">
                <a className="btn btn-sun btn-lg" href="mailto:builders@builtwithai?subject=Shortlist%20request">Request a shortlist <ArrowRight/></a>
                <a className="btn btn-outline btn-lg" href="/education">Train your own team instead</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {open && <CbProfile e={open} onClose={() => setOpen(null)}/>}
    </>
  );
}
export default CertifiedBuildersPage;

