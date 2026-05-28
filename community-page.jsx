/* global React, PoofPart1 */
const { Reveal, ArrowRight } = window.PoofPart1;
const { useState: useCmState, useEffect: useCmEffect, useRef: useCmRef, useMemo: useCmMemo } = React;
const { TweaksPanel, useTweaks, TweakSection, TweakRadio, TweakColor } = window;

/* ============================================================
   COMMUNITY HUB — front-of-site, hub-and-spoke for everything
   the AppsBuiltWithAI community does. Not a copy of Lovable's
   page: it leads with a LIVE pulse feed, then layers in
   build-buddies, mentor hours bank, chapters, AMAs, wall of
   wins, and a forum activity preview.
   ============================================================ */

/* ---------- DATA ---------- */

const PULSE_FEED = [
  { ic: "🚀", who: "Mei C.",      city: "San Francisco", text: "shipped Crumb & Co. — first $100 in pre-orders.", ts: "just now",   cheers: 14 },
  { ic: "🛠️", who: "Devon P.",    city: "Brooklyn",       text: "is debugging Stripe webhooks in #connectors.",   ts: "2 min",      cheers:  3 },
  { ic: "💬", who: "Anita R.",    city: "Bengaluru",      text: "asked: best stack for a small marketplace?",     ts: "4 min",      cheers:  9, thread: 47 },
  { ic: "📅", who: "Berlin",      city: "DE",             text: "chapter meets at Voltaire in 3 hours.",           ts: "9 min",      cheers: 23 },
  { ic: "🎉", who: "Sarah L.",    city: "Toronto",        text: "passed Cert Level 2 — 8th this week!",            ts: "12 min",     cheers: 31 },
  { ic: "🎙️", who: "AMA",        city: "Live Thursday",  text: "with the Anthropic Claude team — 480 RSVPs.",     ts: "in 2 days",  cheers: 88 },
  { ic: "🧑‍🏫", who: "Office hrs", city: "Online",         text: "Friday Q&A with Mei & the build team — open mic.", ts: "weekly",   cheers: 12 },
  { ic: "⚡", who: "Marcus W.",   city: "Cape Town",      text: "is looking for a Build Buddy on a tutoring app.", ts: "20 min",     cheers:  6 },
];

const STATS = [
  { v: "168K",  l: "Members", sub: "across 92 countries" },
  { v: "247",   l: "Active chapters", sub: "in 41 cities" },
  { v: "1,240", l: "Events / yr", sub: "meetups, AMAs, workshops" },
  { v: "$3.4M", l: "Community MRR", sub: "shipped by members" },
];

const CHAPTERS = [
  { city: "San Francisco", lead: "Mei C.",     initials: "MC", tint: "warm", members: 3210, next: "Thu · Indie hack night",     since: "Jan 2025" },
  { city: "Berlin",        lead: "Lina H.",    initials: "LH", tint: "plum", members: 1840, next: "Tonight · Voltaire café",    since: "Mar 2025" },
  { city: "New York",      lead: "Jordan T.",  initials: "JT", tint: "rose", members: 2960, next: "Sat · Brooklyn build-a-thon", since: "Feb 2025" },
  { city: "São Paulo",     lead: "Bruno F.",   initials: "BF", tint: "mint", members: 1410, next: "Wed · Vila Madalena",         since: "Apr 2025" },
  { city: "Bengaluru",     lead: "Anita R.",   initials: "AR", tint: "sky",  members: 2280, next: "Sat · Indiranagar coworking", since: "Mar 2025" },
  { city: "Lagos",         lead: "Tunde A.",   initials: "TA", tint: "warm", members:  890, next: "Sun · Yaba demo day",         since: "May 2025" },
  { city: "Tokyo",         lead: "Yuki S.",    initials: "YS", tint: "rose", members:  720, next: "Next Mon · Shibuya cowork",   since: "Jun 2025" },
  { city: "Mexico City",   lead: "Sofía R.",   initials: "SR", tint: "plum", members:  640, next: "Fri · Roma Norte taquería",   since: "Jul 2025" },
];

const OFFICE_HOURS = [
  { day: "Mon",  time: "11a PT", topic: "Plan-mode walkthrough",     host: "Devon · Builder", tag: "Live" },
  { day: "Wed",  time: "5p PT",  topic: "Connectors clinic",          host: "Priya · Integrations", tag: "Live" },
  { day: "Thu",  time: "9a PT",  topic: "Design feedback (open mic)", host: "Mei · Design",    tag: "Live" },
  { day: "Fri",  time: "12p PT", topic: "Founder office hours",       host: "Marcus · Team",   tag: "Live" },
  { day: "Sat",  time: "8a PT",  topic: "Newcomer onboarding pod",    host: "Jordan · Community", tag: "Pod" },
];

const AFFINITIES = [
  { ic: "👩", name: "Builders Who Are Women",  members: "11.2K", desc: "Monthly co-working, mentor matching, and a no-bs Slack.", color: "rose" },
  { ic: "🎓", name: "Teachers + Educators",     members:  "4.6K", desc: "Apps for classrooms, parent comms, and grading workflows.", color: "sky"  },
  { ic: "💚", name: "Nonprofits",               members:  "2.8K", desc: "Discounted credits, training, and grant-writing peer group.", color: "mint" },
  { ic: "🍼", name: "Solo Parents Building",    members:  "1.4K", desc: "Async-only group. Bring your kid to the calls — we mean it.", color: "warm" },
  { ic: "🌱", name: "Founders 50+",             members:  "3.1K", desc: "Late-career founders learning to ship without the gatekeepers.", color: "plum" },
  { ic: "🛠️", name: "Indie Devs",                members:  "8.7K", desc: "Self-employed builders shipping client work with AI.",      color: "ink"  },
];

const SHIPPED = [
  { app: "Crumb & Co.",      founder: "Mei Chen",      where: "San Francisco", metric: "$8.4K MRR · 312 weekly orders",  quote: "Replaced a $24K Shopify + ChowNow stack with one app in 11 days.", emoji: "🥐", color: "warm" },
  { app: "Stillpoint Yoga",  founder: "Nadia K.",      where: "Brooklyn",      metric: "240 members · $4.2K MRR",         quote: "Studio software was eating us alive. This pays for itself in week one.",  emoji: "🧘", color: "mint" },
  { app: "Field Notes Pro",  founder: "Marcus Webb",   where: "Austin",        metric: "1,800 users · 4.9★",              quote: "Built it on a flight. My team uses it every single day on site.",          emoji: "📝", color: "plum" },
  { app: "Page Turners",     founder: "Sarah Lin",     where: "Toronto",       metric: "9,200 members · 14 city chapters", quote: "Free book club tool. Members run it, I just keep it alive.",                emoji: "📚", color: "sky"  },
  { app: "Garage Sale",      founder: "Devon Park",    where: "Portland",      metric: "$92K GMV in 9 months",            quote: "I built a marketplace for my block. Then for my neighborhood. Now my city.", emoji: "🛒", color: "coral" },
  { app: "Invoice Stack",    founder: "Anita Rao",     where: "Bengaluru",     metric: "640 freelancers · invoicing OS",  quote: "Finally a tool that speaks rupees and dollars without three plugins.",       emoji: "🧾", color: "rose" },
];

const AMAS = [
  { when: "Thu, Jun 4",  topic: "Building agents that don't go off the rails", with: "Anthropic — Claude team",    rsvp: 480, kind: "upcoming" },
  { when: "Thu, Jun 11", topic: "From side-project to $1M ARR in 14 months",   with: "Pieter Levels (Nomad List)",  rsvp: 1240, kind: "upcoming" },
  { when: "Tue, Jun 16", topic: "Designing for trust in money apps",            with: "Stripe — Atlas team",         rsvp: 210, kind: "upcoming" },
  { when: "May 19",      topic: "Open-source 101 for AI builders",              with: "Vercel guild",                rsvp: "watched 4.2K", kind: "past" },
  { when: "May 5",       topic: "Hiring your first contractor",                  with: "Indie Hackers",               rsvp: "watched 3.1K", kind: "past" },
  { when: "Apr 22",      topic: "What we wish we knew before raising",           with: "Y Combinator partners",       rsvp: "watched 8.6K", kind: "past" },
];

const FORUM = [
  { tag: "show",   title: "I built a school carpool scheduler for my kid's PTA — feedback?", who: "Rae T.",     replies: 38, last: "12 min" },
  { tag: "help",   title: "Stripe webhooks intermittently 401-ing in EU region",              who: "Devon P.",   replies: 14, last: "26 min" },
  { tag: "show",   title: "Local-first recipe app, no cloud needed. Try it.",                 who: "Kai L.",     replies: 22, last: "1 hr"  },
  { tag: "ask",    title: "Best stack for an MMO-ish board game lobby?",                      who: "Anita R.",   replies: 47, last: "2 hr"  },
  { tag: "show",   title: "Made a Slack bot that reads our standup → ships a daily PDF.",      who: "Marcus W.", replies:  9, last: "3 hr"  },
  { tag: "ask",    title: "How are you all handling EU VAT?",                                   who: "Lina H.",   replies: 31, last: "5 hr"  },
];

const CHAMPIONS = [
  { name: "Mei Chen",     city: "San Francisco", level: 3, badge: "🌟", quote: "I run the SF chapter and host newcomer pods." },
  { name: "Devon Park",   city: "Brooklyn",      level: 3, badge: "🛠️", quote: "Connector clinic Wednesdays — bring your bugs." },
  { name: "Lina Haupt",   city: "Berlin",        level: 2, badge: "🌍", quote: "I translate docs into German and run Berlin." },
  { name: "Bruno Ferraz", city: "São Paulo",     level: 2, badge: "🇧🇷", quote: "Helping more devs in LATAM ship in Portuguese." },
  { name: "Yuki Sato",    city: "Tokyo",         level: 2, badge: "🗼", quote: "Monthly indie demo nights in Shibuya." },
  { name: "Tunde Adebayo", city: "Lagos",        level: 1, badge: "🌍", quote: "Hosting Lagos chapter from a coworking space in Yaba." },
];

const FAQ_DATA = [
  ["Is the community free?",                    "Yes. Anyone can join the Discord, attend meetups, watch AMAs, and use the forum — paid plans aren't required. Build Buddies and mentor hours have small fairness caps so they stay useful."],
  ["I'd like to start a chapter in my city.",   "Brilliant. Apply via the chapter form below — we'll match you with a current lead, fund your first 3 meetups, and ship you a starter kit (stickers, name tags, the playbook)."],
  ["How does the Mentor Hours Bank work?",      "Senior builders pledge hours. Members 'spend' them by booking a slot. Mentors earn champion points when they show up; everyone earns hours by helping in the forum."],
  ["Do AMAs cost anything?",                    "No. They're livestreamed for free. Replays are public for 30 days, then archived for members."],
  ["What's the Code of Conduct?",                "Short version: be kind, be specific, no spam, no recruiting, no AI-generated low-effort posts. The long version is in the Discord welcome channel and we enforce it."],
  ["Can my company sponsor an event?",          "Yes — see Partner with the community below. We're picky on fit; only sponsors that contribute (talks, credits, prizes) get in, not just logos."],
];

/* ---------- HELPERS ---------- */

function avatarTint(t) {
  return ({
    warm: "linear-gradient(135deg, #FFC76B, #FB8855)",
    plum: "linear-gradient(135deg, #C58CE8, #6A2EB8)",
    rose: "linear-gradient(135deg, #FF9AAE, #FF5C77)",
    mint: "linear-gradient(135deg, #6BE2A8, #2EA56F)",
    sky:  "linear-gradient(135deg, #9CC9F0, #5189D1)",
    ink:  "linear-gradient(135deg, #4B4458, #181818)",
    coral:"linear-gradient(135deg, #FFB39F, #FF5C4D)",
  })[t] || "linear-gradient(135deg, #FFC76B, #FB8855)";
}

/* ---------- HERO with live PULSE feed ---------- */

function PulseFeed() {
  const [tick, setTick] = useCmState(0);
  useCmEffect(() => {
    const t = setInterval(() => setTick(x => x + 1), 2200);
    return () => clearInterval(t);
  }, []);
  // Rotate the visible 5 items by tick to create a "live" feel
  const visible = useCmMemo(() => {
    const out = [];
    for (let i = 0; i < 5; i++) out.push(PULSE_FEED[(i + tick) % PULSE_FEED.length]);
    return out;
  }, [tick]);
  return (
    <div className="cm-pulse">
      <div className="cm-pulse-head">
        <span className="cm-pulse-dot"/>
        <span className="cm-pulse-eyebrow">RIGHT NOW IN THE COMMUNITY</span>
        <span className="cm-pulse-time">Live · {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
      </div>
      <div className="cm-pulse-list">
        {visible.map((p, i) => (
          <div key={p.who + p.text + tick + "-" + i} className="cm-pulse-row" style={{ animationDelay: (i * 60) + "ms" }}>
            <div className="cm-pulse-ic">{p.ic}</div>
            <div className="cm-pulse-body">
              <div className="cm-pulse-line">
                <strong>{p.who}</strong>{p.city ? <span className="cm-pulse-city"> · {p.city}</span> : null}{" "}{p.text}
              </div>
              <div className="cm-pulse-meta">
                <span>{p.ts}</span>
                <span className="cm-pulse-sep">·</span>
                <span>🎉 {p.cheers}</span>
                {p.thread ? <><span className="cm-pulse-sep">·</span><span>💬 {p.thread}</span></> : null}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="cm-pulse-foot">
        <span>3,420 builders online</span>
        <a className="cm-pulse-link">Open the Discord →</a>
      </div>
    </div>
  );
}

function CommunityHero({ density, accent }) {
  return (
    <section className="cm-hero" data-screen-label="community-hero">
      <div className="cm-hero-bg"/>
      <div className="wrap cm-hero-wrap">
        <div className="cm-hero-left">
          <Reveal>
            <div className="eyebrow cm-hero-eyebrow">Community · 168,000 builders · 92 countries</div>
            <h1 className="serif cm-hero-h">
              A community of people who <em>actually ship.</em>
            </h1>
            <p className="cm-hero-sub">
              Not a Discord with 800 lurkers. A working community of founders, makers, parents,
              teachers, and indie devs — meeting in 41 cities, answering each other's questions,
              and shipping real apps every day. There's a way in for everyone.
            </p>
            <div className="cm-hero-cta">
              <a className="btn btn-coral btn-lg" href="signup.html">Join free <ArrowRight/></a>
              <a className="btn btn-outline btn-lg" href="#chapters">Find your chapter</a>
            </div>
            <div className="cm-hero-trust">
              <div className="cm-hero-avs">
                {["warm", "plum", "rose", "mint", "sky", "coral"].map((t, i) => (
                  <span key={i} className="cm-hero-av" style={{ background: avatarTint(t) }}>
                    {["MC","DP","LH","BF","AR","TA"][i]}
                  </span>
                ))}
              </div>
              <div className="cm-hero-trust-text">
                <strong>4,200+ joined this month.</strong>
                <span>Including 18 chapter leads, 6 first-time founders, and one retired neurosurgeon.</span>
              </div>
            </div>
          </Reveal>
        </div>
        <div className="cm-hero-right">
          <Reveal delay={120}>
            <PulseFeed/>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- STATS ---------- */
function StatsBand() {
  return (
    <section className="cm-stats">
      <div className="wrap">
        <div className="cm-stats-grid">
          {STATS.map((s, i) => (
            <Reveal key={s.l} delay={i * 30}>
              <div className="cm-stat">
                <div className="cm-stat-v">{s.v}</div>
                <div className="cm-stat-l">{s.l}</div>
                <div className="cm-stat-sub">{s.sub}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- BUILD BUDDIES ---------- */
function BuildBuddies() {
  return (
    <section className="pad pt-0" id="buddies">
      <div className="wrap">
        <div className="cm-bb">
          <div className="cm-bb-left">
            <div className="eyebrow" style={{ color: "var(--coral-deep)" }}>Build Buddies</div>
            <h2 className="serif">Get paired with someone <em>at your level.</em></h2>
            <p className="cm-bb-sub">
              Building alone is brutal. Opt in once, get matched within 48 hours with someone
              in your timezone, building something similar, at roughly the same stage. Most pairs
              do a 30-min check-in once a week. Some end up co-founding.
            </p>
            <ul className="cm-bb-list">
              <li><span className="cm-bb-tick">✓</span> Matched on stage, timezone, and project type</li>
              <li><span className="cm-bb-tick">✓</span> Reroll once if it's not clicking — no awkward</li>
              <li><span className="cm-bb-tick">✓</span> Optional weekly check-in template (3 questions)</li>
              <li><span className="cm-bb-tick">✓</span> 78% of pairs still meeting at 8 weeks</li>
            </ul>
            <a className="btn btn-coral">Get matched this week <ArrowRight/></a>
          </div>
          <div className="cm-bb-right">
            <div className="cm-bb-card cm-bb-card-1">
              <div className="cm-bb-card-head">
                <span className="cm-bb-av" style={{ background: avatarTint("warm") }}>MC</span>
                <div>
                  <strong>Mei C.</strong>
                  <span>San Francisco · UTC-8</span>
                </div>
                <span className="cm-bb-stage">Stage 2</span>
              </div>
              <div className="cm-bb-card-body">Bakery + ordering. Stuck on Stripe SCA flow.</div>
              <div className="cm-bb-card-tags"><span>#stripe</span><span>#food</span><span>#solo</span></div>
            </div>
            <div className="cm-bb-link"><span className="cm-bb-link-pulse"/> matched</div>
            <div className="cm-bb-card cm-bb-card-2">
              <div className="cm-bb-card-head">
                <span className="cm-bb-av" style={{ background: avatarTint("sky") }}>AR</span>
                <div>
                  <strong>Anita R.</strong>
                  <span>Bengaluru · UTC+5:30</span>
                </div>
                <span className="cm-bb-stage">Stage 2</span>
              </div>
              <div className="cm-bb-card-body">Tutor marketplace. Just shipped Stripe Atlas onboarding.</div>
              <div className="cm-bb-card-tags"><span>#stripe</span><span>#marketplace</span><span>#solo</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- MENTOR HOURS BANK ---------- */
function MentorHours() {
  const banks = [
    { name: "Stripe & payments", hrs: 84,  ic: "💳", color: "coral" },
    { name: "Design & UX",        hrs: 142, ic: "🎨", color: "rose"  },
    { name: "Marketing & growth",  hrs:  62, ic: "📈", color: "sun"   },
    { name: "Legal & taxes",       hrs:  38, ic: "⚖️", color: "ink"   },
    { name: "Engineering deep dives", hrs: 96, ic: "🔧", color: "sky" },
    { name: "Hiring & contracts",  hrs:  41, ic: "🤝", color: "mint"  },
  ];
  return (
    <section className="pad pt-0" id="mentors">
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="eyebrow">Mentor Hours Bank</div>
          <h2 className="serif">Borrow an hour. <em>Lend an hour.</em></h2>
          <p className="cm-section-lead">
            Senior builders pledge their time into the bank. Members spend hours by booking a slot.
            Help in the forum earns hours, too — answer five questions, get an hour back to spend.
          </p>
        </Reveal>
        <div className="cm-banks-grid">
          {banks.map((b, i) => (
            <Reveal key={b.name} delay={i * 30}>
              <div className={"cm-bank tone-" + b.color}>
                <div className="cm-bank-ic">{b.ic}</div>
                <div className="cm-bank-name">{b.name}</div>
                <div className="cm-bank-hrs">{b.hrs} hrs<span>available</span></div>
                <div className="cm-bank-actions">
                  <a className="cm-bank-link">Book →</a>
                  <a className="cm-bank-link cm-bank-link-give">Give time</a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={100}>
          <div className="cm-bank-howto">
            <div><strong>1.</strong> Members earn hours by answering questions in the forum.</div>
            <div><strong>2.</strong> Spend hours on 1:1 calls with mentors who pledged time.</div>
            <div><strong>3.</strong> Mentors earn champion points for showing up.</div>
            <div><strong>4.</strong> Bank balance resets quarterly so hours don't hoard.</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- CHAPTERS + MAP ---------- */
function ChaptersBlock() {
  const pins = [
    { x: 18, y: 38 }, // SF
    { x: 30, y: 39 }, // NY
    { x: 48, y: 33 }, // Berlin
    { x: 56, y: 60 }, // Lagos
    { x: 68, y: 49 }, // Bengaluru
    { x: 84, y: 41 }, // Tokyo
    { x: 14, y: 60 }, // Mexico City (a touch east)
    { x: 35, y: 67 }, // São Paulo
  ];
  return (
    <section className="pad pt-0" id="chapters">
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="eyebrow">City Chapters</div>
          <h2 className="serif">247 chapters. <em>Yours next?</em></h2>
          <p className="cm-section-lead">
            Every chapter has a named lead, a recurring cadence, and a starter kit from us.
            Berlin meets monthly at Voltaire. Bengaluru meets Saturday at Indiranagar coworking.
            Find one nearby — or start one.
          </p>
        </Reveal>

        <div className="cm-chapters">
          <Reveal className="cm-map">
            <svg viewBox="0 0 100 75" className="cm-map-svg" aria-label="World map with chapter pins">
              <rect width="100" height="75" fill="var(--bg-tint, #EDE5D2)"/>
              {/* very rough continent blobs — abstract not literal */}
              <path d="M5 20 Q15 14 22 22 L26 30 Q22 38 18 42 L14 48 Q8 44 6 34 Z" fill="rgba(20,16,24,.08)"/>
              <path d="M22 50 Q26 46 30 50 L34 60 Q32 68 28 70 L24 66 Z" fill="rgba(20,16,24,.08)"/>
              <path d="M40 16 Q52 12 60 18 L62 24 Q56 26 50 24 L44 26 Q40 22 40 16Z" fill="rgba(20,16,24,.08)"/>
              <path d="M48 30 Q56 28 62 36 L60 48 Q56 56 52 60 L50 50 Q46 42 48 30Z" fill="rgba(20,16,24,.08)"/>
              <path d="M62 22 Q74 20 84 28 L86 36 Q82 42 76 42 L70 38 Q64 32 62 22Z" fill="rgba(20,16,24,.08)"/>
              <path d="M80 44 Q86 40 92 46 L90 56 Q86 58 82 54Z" fill="rgba(20,16,24,.08)"/>
              {pins.map((p, i) => (
                <g key={i} transform={`translate(${p.x} ${p.y})`}>
                  <circle r="2.6" fill="var(--coral)" opacity=".22"/>
                  <circle r="1.2" fill="var(--coral)"/>
                </g>
              ))}
            </svg>
            <div className="cm-map-foot">
              <span><span className="cm-map-dot"/> 247 chapters</span>
              <a href="meetups.html" className="cm-map-link">See full map →</a>
            </div>
          </Reveal>

          <div className="cm-chapter-list">
            {CHAPTERS.map((c, i) => (
              <Reveal key={c.city} delay={i * 25}>
                <a className="cm-chapter" href="meetups.html">
                  <span className="cm-chapter-av" style={{ background: avatarTint(c.tint) }}>{c.initials}</span>
                  <div className="cm-chapter-body">
                    <div className="cm-chapter-city">{c.city}</div>
                    <div className="cm-chapter-meta">led by {c.lead} · {c.members.toLocaleString()} members</div>
                    <div className="cm-chapter-next">{c.next}</div>
                  </div>
                  <ArrowRight/>
                </a>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={80}>
          <div className="cm-chapter-cta">
            <div>
              <strong>Don't see your city?</strong>
              <span>Apply to start a chapter. We fund your first 3 meetups + ship a starter kit.</span>
            </div>
            <a className="btn btn-ink">Start a chapter <ArrowRight/></a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- OFFICE HOURS ---------- */
function OfficeHoursBlock() {
  return (
    <section className="pad pt-0" id="office-hours">
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="eyebrow">Office Hours</div>
          <h2 className="serif">Open mic with the team, <em>every week.</em></h2>
          <p className="cm-section-lead">
            No reservations, no agendas. Drop in, ask anything, get an honest answer.
            Replays are public for 30 days after — full archive for members.
          </p>
        </Reveal>
        <div className="cm-oh">
          {OFFICE_HOURS.map((o, i) => (
            <Reveal key={o.day + o.time} delay={i * 30}>
              <div className="cm-oh-row">
                <div className="cm-oh-day">
                  <span className="cm-oh-day-name">{o.day}</span>
                  <span className="cm-oh-day-time">{o.time}</span>
                </div>
                <div className="cm-oh-body">
                  <div className="cm-oh-topic">{o.topic}</div>
                  <div className="cm-oh-host">{o.host}</div>
                </div>
                <span className={"cm-oh-tag tag-" + o.tag.toLowerCase()}>{o.tag}</span>
                <a className="cm-oh-cta">Add to calendar →</a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- AFFINITY GROUPS ---------- */
function AffinityBlock() {
  return (
    <section className="pad pt-0" id="groups">
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="eyebrow">Affinity groups</div>
          <h2 className="serif">A way in <em>for everyone.</em></h2>
          <p className="cm-section-lead">
            Smaller circles inside the bigger community. Run by members, supported by us.
            No password required — but please come to one event before you spectate.
          </p>
        </Reveal>
        <div className="cm-aff-grid">
          {AFFINITIES.map((a, i) => (
            <Reveal key={a.name} delay={i * 30}>
              <a className={"cm-aff tone-" + a.color}>
                <div className="cm-aff-ic">{a.ic}</div>
                <h3>{a.name}</h3>
                <p>{a.desc}</p>
                <div className="cm-aff-foot">
                  <span>{a.members} members</span>
                  <span>Join →</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- WALL OF WINS ---------- */
function WallOfWins() {
  return (
    <section className="pad pt-0" id="wins">
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="eyebrow">Wall of Wins</div>
          <h2 className="serif">Real apps. <em>Real money. Real members.</em></h2>
          <p className="cm-section-lead">
            Featured apps shipped by community members. We do not pay them for endorsements.
            We do bring them coffee.
          </p>
        </Reveal>
        <div className="cm-wins-grid">
          {SHIPPED.map((w, i) => (
            <Reveal key={w.app} delay={i * 40}>
              <div className={"cm-win tone-" + w.color}>
                <div className="cm-win-head">
                  <span className="cm-win-emoji">{w.emoji}</span>
                  <div>
                    <div className="cm-win-app">{w.app}</div>
                    <div className="cm-win-by">by {w.founder} · {w.where}</div>
                  </div>
                </div>
                <p className="cm-win-quote">"{w.quote}"</p>
                <div className="cm-win-metric">{w.metric}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- AMAS ---------- */
function AMASection() {
  const [tab, setTab] = useCmState("upcoming");
  const list = AMAS.filter(a => a.kind === tab);
  return (
    <section className="pad pt-0" id="amas">
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="eyebrow">AMAs</div>
          <h2 className="serif">Talk to the people <em>actually building things.</em></h2>
          <p className="cm-section-lead">
            Founders, engineers, and operators we admire — answering whatever you bring.
            Livestreamed, no paywall. Submit questions in advance.
          </p>
          <div className="cm-ama-tabs">
            <button className={"cm-ama-tab" + (tab === "upcoming" ? " active" : "")} onClick={() => setTab("upcoming")}>Upcoming</button>
            <button className={"cm-ama-tab" + (tab === "past" ? " active" : "")} onClick={() => setTab("past")}>Past replays</button>
          </div>
        </Reveal>
        <div className="cm-ama-list">
          {list.map((a, i) => (
            <Reveal key={a.topic} delay={i * 30}>
              <div className={"cm-ama-row" + (a.kind === "past" ? " past" : "")}>
                <div className="cm-ama-when">{a.when}</div>
                <div className="cm-ama-body">
                  <div className="cm-ama-topic">{a.topic}</div>
                  <div className="cm-ama-with">with {a.with}</div>
                </div>
                <div className="cm-ama-rsvp">{typeof a.rsvp === "number" ? a.rsvp + " RSVPs" : a.rsvp}</div>
                <a className="cm-ama-cta">{a.kind === "upcoming" ? "RSVP →" : "Watch →"}</a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FORUM PREVIEW ---------- */
function ForumPreview() {
  return (
    <section className="pad pt-0" id="forum">
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="eyebrow">Forum</div>
          <h2 className="serif">Asynchronous, <em>searchable, real.</em></h2>
          <p className="cm-section-lead">
            Threads stay forever and Google can find them. Half our docs were originally forum
            posts that we copy-edited a year later.
          </p>
        </Reveal>
        <div className="cm-forum">
          {FORUM.map((f, i) => (
            <Reveal key={f.title} delay={i * 25}>
              <a className="cm-forum-row">
                <span className={"cm-forum-tag tag-" + f.tag}>{f.tag}</span>
                <div className="cm-forum-body">
                  <div className="cm-forum-title">{f.title}</div>
                  <div className="cm-forum-meta">by {f.who} · last reply {f.last} ago</div>
                </div>
                <span className="cm-forum-replies">💬 {f.replies}</span>
              </a>
            </Reveal>
          ))}
        </div>
        <div className="cm-forum-foot">
          <a className="btn btn-outline">Open the full forum →</a>
        </div>
      </div>
    </section>
  );
}

/* ---------- CHAMPIONS ---------- */
function ChampionsBlock() {
  return (
    <section className="pad pt-0" id="champions">
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="eyebrow">Champion Track</div>
          <h2 className="serif">The people who <em>hold this up.</em></h2>
          <p className="cm-section-lead">
            Chapter leads, AMA hosts, top forum answerers. Wired into our{" "}
            <a href="certification.html" style={{ color: "var(--coral-deep)" }}>Certification</a>{" "}
            program — three levels, recognition, swag, and a small monthly stipend at Level 3.
          </p>
        </Reveal>
        <div className="cm-champs-grid">
          {CHAMPIONS.map((c, i) => (
            <Reveal key={c.name} delay={i * 30}>
              <div className="cm-champ">
                <div className="cm-champ-head">
                  <span className="cm-champ-av">{c.badge}</span>
                  <div>
                    <div className="cm-champ-name">{c.name}</div>
                    <div className="cm-champ-city">{c.city}</div>
                  </div>
                  <span className="cm-champ-level">L{c.level}</span>
                </div>
                <p className="cm-champ-quote">{c.quote}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- PARTNER + FAQ + CTA ---------- */
function PartnerBlock() {
  return (
    <section className="pad pt-0" id="partner">
      <div className="wrap-tight">
        <div className="cm-partner">
          <div className="cm-partner-bloom"/>
          <Reveal>
            <div className="eyebrow" style={{ color: "var(--coral-deep)" }}>Partner with the community</div>
            <h2 className="serif">If your tools <em>actually help</em> builders — let's talk.</h2>
            <p>
              We work with payments, hosting, dev tools, and education partners on credits, talks,
              and joint events. We're picky on fit — only sponsors that contribute (talks, credits,
              prizes) get in.
            </p>
            <div className="cm-partner-actions">
              <a className="btn btn-ink btn-lg">See partnership tiers <ArrowRight/></a>
              <a className="btn btn-outline btn-lg" href="mailto:community@appsbuilt.ai">community@appsbuilt.ai</a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FAQBlock() {
  return (
    <section className="pad pt-0">
      <div className="wrap-tight">
        <Reveal className="sec-head">
          <div className="eyebrow">FAQ</div>
          <h2 className="serif">Frequently asked.</h2>
        </Reveal>
        <div className="support-faq">
          {FAQ_DATA.map(([q, a], i) => (
            <Reveal key={q} delay={i * 25}>
              <details>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="pad cm-final">
      <div className="wrap-tight" style={{ textAlign: "center" }}>
        <Reveal>
          <h2 className="serif">Come build with <em>actual humans.</em></h2>
          <p>
            It's free, it's busy, it's kind. We'll see you in there.
          </p>
          <div style={{ display: "inline-flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginTop: 12 }}>
            <a className="btn btn-coral btn-lg" href="signup.html">Join free <ArrowRight/></a>
            <a className="btn btn-outline btn-lg" href="#chapters">Find your chapter</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- PAGE ---------- */
const CM_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "tone": "warm",
  "density": "regular",
  "accent": "#FF5C4D"
}/*EDITMODE-END*/;

const TONE_COPY = {
  warm:     null, // default copy
  punchy:   { h: "168K builders. Show up.", sub: "Not a lurker Discord. A working community shipping every day." },
  editorial:{ h: "A community of people who actually ship.", sub: "Quiet rooms full of work in progress. Find yours." },
};

function CommunityPage() {
  const [t, setTweak] = useTweaks(CM_TWEAK_DEFAULTS);

  // Apply tweaks via CSS vars on a wrapper div
  const style = {
    "--cm-pad-scale":    t.density === "compact" ? "0.78" : t.density === "spacious" ? "1.18" : "1",
    "--coral":           t.accent,
    "--coral-deep":      t.accent,
  };

  return (
    <div className={"cm-root tone-" + t.tone + " density-" + t.density} style={style}>
      <CommunityHero density={t.density} accent={t.accent}/>
      <StatsBand/>
      <BuildBuddies/>
      <MentorHours/>
      <ChaptersBlock/>
      <OfficeHoursBlock/>
      <AffinityBlock/>
      <WallOfWins/>
      <AMASection/>
      <ForumPreview/>
      <ChampionsBlock/>
      <PartnerBlock/>
      <FAQBlock/>
      <FinalCTA/>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Tone of voice"/>
        <TweakRadio
          label="Tone"
          value={t.tone}
          options={["warm", "punchy", "editorial"]}
          onChange={(v) => setTweak("tone", v)}
        />
        <TweakSection label="Density"/>
        <TweakRadio
          label="Spacing"
          value={t.density}
          options={["compact", "regular", "spacious"]}
          onChange={(v) => setTweak("density", v)}
        />
        <TweakSection label="Accent color"/>
        <TweakColor
          label="Accent"
          value={t.accent}
          options={["#FF5C4D", "#1FB295", "#6FA8E0", "#F08DB8", "#4C3A5C", "#FFC53D"]}
          onChange={(v) => setTweak("accent", v)}
        />
      </TweaksPanel>
    </div>
  );
}

window.CommunityPage = CommunityPage;
