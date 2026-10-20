import React from 'react';
import { IMPORTS_ENABLED, OTHER_IMPORT_SOURCES_ENABLED } from '../config/importSources.js';
import { Reveal, ArrowRight, Check } from './part1.jsx';
const IMPORT_FLOW = "/signup?intent=import";

/* ============= small provider glyph ============= */
function SourceGlyph({ color, glyph, large, slug }) {
  const size = large ? 52 : 40;
  const [err, setErr] = React.useState(false);
  if (slug && !err) return (
    <span className="imp-lp-glyph" style={{ width: size, height: size, borderRadius: large ? 15 : 12, background: "#fff", border: "1px solid var(--line-2)", display: "grid", placeItems: "center", flexShrink: 0, boxShadow: "0 8px 20px -12px " + color }}>
      <img src={"https://www.google.com/s2/favicons?domain=" + ({ lovable: "lovable.dev", stackblitz: "bolt.new", v0: "v0.dev", replit: "replit.com", figma: "figma.com" }[slug] || slug + ".com") + "&sz=128"} alt="" onError={() => setErr(true)} style={{ width: size * 0.55, height: size * 0.55, objectFit: "contain" }}/>
    </span>
  );
  return (
    <span
      className="imp-lp-glyph"
      style={{
        width: size,
        height: size,
        borderRadius: large ? 15 : 12,
        background: color,
        color: "#fff",
        display: "grid",
        placeItems: "center",
        fontFamily: "var(--f-head)",
        fontWeight: 800,
        fontSize: large ? 22 : 17,
        flexShrink: 0,
        boxShadow: "0 8px 20px -10px " + color,
      }}
    >
      {glyph}
    </span>
  );
}

/* ============= HERO ============= */
function ImpHero() {
  return (
    <section className="sub-hero imp-lp-hero" data-screen-label="import-hero">
      <div className="imp-lp-hero-glow" aria-hidden="true"></div>
      <div className="wrap-tight">
        <Reveal>
          <div className="eyebrow">Import · Beta</div>
          <h1 className="serif">Already built something? <em>Bring it home.</em></h1>
          <p className="sub-lead">
            {OTHER_IMPORT_SOURCES_ENABLED ? 'Started your app in GitHub, Lovable, Bolt, or v0 and got stuck?' : 'Started your app on GitHub and got stuck?'}
            Point us at it. We read the actual code, understand what it does,
            and rebuild it as a living app you can keep editing in plain
            English: no dev required.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <div className="sub-actions imp-lp-actions">
            <a className="btn btn-coral btn-lg" href={IMPORT_FLOW}>
              Import a project <ArrowRight/>
            </a>
            <a className="btn btn-outline btn-lg" href="#how">See how it works</a>
          </div>
        </Reveal>
        <Reveal delay={160}>
          <div className="sub-meta">
            <span>Read-only access</span>
            <span className="dot"/>
            <span>~2 minutes</span>
            <span className="dot"/>
            <span>Nothing locked in</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============= SOURCES ============= */
const SOURCES = [
  { name: "Lovable", desc: "Bring over a Lovable project, components and all.", color: "#FF4D6D", glyph: "\u2665", slug: "lovable" },
  { name: "Bolt.new", desc: "Import a Bolt StackBlitz build by its share URL.", color: "#1389FD", glyph: "\u26A1", slug: "stackblitz" },
  { name: "v0", desc: "Pull in a v0 by Vercel generation.", color: "#181818", glyph: "v0", slug: "v0" },
  { name: "Replit", desc: "Import a Repl and every file in it.", color: "#F26207", glyph: "\u2B22", slug: "replit" },
  { name: "Figma Make", desc: "Turn a Figma Make file into a working app.", color: "#A259FF", glyph: "F", slug: "figma" },
  { name: "Paste a URL", desc: "We fetch a live site and rebuild it.", color: "#1FB295", glyph: "\u{1F517}" },
];

function ImpSources() {
  return (
    <section className="pad-sm imp-lp-sources" data-screen-label="import-sources">
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="eyebrow">Where from</div>
          <h2>Bring it from <em>almost anywhere.</em></h2>
          <p>GitHub is the cleanest path: we read your repo directly. But a half-finished build from any of these works too.</p>
        </Reveal>

        <Reveal>
          <a className="imp-lp-featured imp-lp-featured-dark" href={IMPORT_FLOW}>
            <SourceGlyph color="#181818" glyph={
              <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff"><path d="M12 1.5A10.5 10.5 0 0 0 8.68 22a.55.55 0 0 0 .73-.53v-1.86c-2.92.63-3.54-1.41-3.54-1.41a2.78 2.78 0 0 0-1.17-1.54c-.95-.65.08-.64.08-.64a2.2 2.2 0 0 1 1.61 1.08 2.24 2.24 0 0 0 3.06.87 2.25 2.25 0 0 1 .67-1.41c-2.33-.27-4.78-1.17-4.78-5.18a4.06 4.06 0 0 1 1.08-2.82 3.77 3.77 0 0 1 .1-2.78s.88-.28 2.88 1.07a9.9 9.9 0 0 1 5.24 0c2-1.35 2.88-1.07 2.88-1.07a3.77 3.77 0 0 1 .1 2.78 4.06 4.06 0 0 1 1.08 2.82c0 4.02-2.46 4.9-4.8 5.16a2.5 2.5 0 0 1 .72 1.95v2.89a.55.55 0 0 0 .74.53A10.5 10.5 0 0 0 12 1.5Z"/></svg>
            } large/>
            <span className="imp-lp-featured-text">
              <span className="imp-lp-featured-eyebrow">Recommended</span>
              <strong>Import from GitHub</strong>
              <span className="imp-lp-featured-desc">Connect your account and pick any repo: public or private. We read the code directly, branch and all.</span>
            </span>
            <span className="imp-lp-featured-arrow"><ArrowRight size={18}/></span>
          </a>
        </Reveal>

        <Reveal>
          <div className="imp-lp-grid">
            {SOURCES.map((s) => (
              <a key={s.name} className="imp-lp-card" href={IMPORT_FLOW} style={{ "--acc": s.color }}>
                <SourceGlyph color={s.color} glyph={s.glyph} slug={s.slug}/>
                <span className="imp-lp-card-name">{s.name}</span>
                <span className="imp-lp-card-desc">{s.desc}</span>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============= STEP MOCKS ============= */
function MockConnect() {
  const repos = [
    { name: "crumb-and-co", lang: "TypeScript", lc: "#3178C6", priv: true, upd: "2 hours ago" },
    { name: "stillpoint-web", lang: "JavaScript", lc: "#F1E05A", priv: false, upd: "yesterday" },
    { name: "invoice-stack", lang: "TypeScript", lc: "#3178C6", priv: true, upd: "3 days ago" },
  ];
  return (
    <div className="hiw-mock">
      <div className="hiw-mock-bar">
        <span className="dot r"/><span className="dot y"/><span className="dot g"/>
        <span className="hiw-mock-title">Connect · GitHub</span>
      </div>
      <div className="hiw-mock-body" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {repos.map((r, i) => (
          <div key={r.name} className="impm-repo" style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "12px 14px", borderRadius: 12,
            border: "1px solid var(--line)",
            background: i === 0 ? "var(--coral-tint)" : "var(--surface)",
          }}>
            <span style={{ width: 9, height: 9, borderRadius: "50%", background: r.lc, flexShrink: 0 }}/>
            <span style={{ flex: 1, minWidth: 0 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <strong style={{ fontSize: 14, color: "var(--ink)" }}>{r.name}</strong>
                {r.priv && <span style={{ fontFamily: "var(--f-mono)", fontSize: 9.5, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--ink-3)", border: "1px solid var(--line-2)", borderRadius: 999, padding: "1px 7px" }}>private</span>}
              </span>
              <span style={{ display: "block", fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--ink-3)", marginTop: 3 }}>{r.lang} · updated {r.upd}</span>
            </span>
            <span className="btn btn-outline btn-sm" style={{ pointerEvents: "none" }}>{i === 0 ? "Importing…" : "Import"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MockReading() {
  const lines = [
    { txt: "Cloning meichen/crumb-and-co", done: true },
    { txt: "Scanning 142 files", done: true },
    { txt: "Framework  \u2192  React + Vite", done: true },
    { txt: "Mapping data layer  \u2192  Supabase · Stripe", run: true },
    { txt: "Summarizing what this app does", queue: true },
  ];
  return (
    <div className="hiw-mock hiw-mock-build">
      <div className="hiw-mock-bar">
        <span className="dot r"/><span className="dot y"/><span className="dot g"/>
        <span className="hiw-mock-title">Reading · crumb-and-co</span>
        <span className="hiw-mock-tag">0m 38s</span>
      </div>
      <div className="hiw-mock-body">
        {lines.map((l, i) => (
          <div key={i} className={"hiw-build-line " + (l.done ? "is-done" : l.run ? "is-run" : "is-queue")}>
            <span className="ic" style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--ink-3)" }}>{String(i + 1).padStart(2, "0")}</span>
            <span className="txt">{l.txt}</span>
            <span className="status">
              {l.done && <Check/>}
              {l.run && <span className="spin"/>}
              {l.queue && <span className="pending">queued</span>}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MockReview() {
  return (
    <div className="hiw-mock">
      <div className="hiw-mock-bar">
        <span className="dot r"/><span className="dot y"/><span className="dot g"/>
        <span className="hiw-mock-title">Review · what we found</span>
      </div>
      <div className="hiw-mock-body" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 30 }}>🥐</span>
          <span>
            <strong style={{ display: "block", fontSize: 16, color: "var(--ink)" }}>Crumb &amp; Co.</strong>
            <span style={{ fontSize: 12.5, color: "var(--ink-3)" }}>Bakery pickup-ordering app · 5 pages</span>
          </span>
        </div>
        <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: "var(--ink-2)" }}>
          Customers browse the day's menu, reserve a 15-minute pickup window,
          and pay: no account needed.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          {["React + Vite", "TypeScript", "Tailwind", "Supabase", "Stripe"].map((t) => (
            <span key={t} style={{ fontFamily: "var(--f-mono)", fontSize: 10.5, color: "var(--ink-2)", background: "var(--surface-2)", border: "1px solid var(--line-2)", borderRadius: 999, padding: "4px 10px" }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function MockKeepBuilding() {
  return (
    <div className="hiw-mock hiw-mock-edit">
      <div className="hiw-mock-bar">
        <span className="dot r"/><span className="dot y"/><span className="dot g"/>
        <span className="hiw-mock-title">Crumb &amp; Co. · edit mode</span>
      </div>
      <div className="hiw-mock-body" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div className="hiw-edit-msg you">Add a loyalty punch card: 10th loaf free.</div>
        <div className="hiw-edit-msg ai">
          <span className="ic">✨</span>
          Added a punch card to checkout and the confirmation email. Want it to show progress on the menu page too?
        </div>
        <div className="hiw-edit-msg you">Yes, and email me when someone hits 10.</div>
      </div>
    </div>
  );
}

/* ============= STEPS ============= */
const STEPS = [
  {
    n: "01",
    eyebrow: "Step one",
    title: "Point us at it.",
    body: OTHER_IMPORT_SOURCES_ENABLED
      ? "Connect your GitHub and pick a repo, or paste a share link from Lovable, Bolt, v0, or Replit. Public or private: we only ask for read-only access."
      : "Connect your GitHub and pick a repo. Public or private: we only ask for read-only access.",
    bullets: OTHER_IMPORT_SOURCES_ENABLED
      ? ["Any GitHub repo, public or private", "Or a share link from another builder", "Read-only: we never touch your original"]
      : ["Any GitHub repo, public or private", "Read-only: we never touch your original"],
    mock: <MockConnect/>,
  },
  {
    n: "02",
    eyebrow: "Step two",
    title: "We read the actual code.",
    body: "Not a screenshot, not a guess. We clone the project, detect the framework, trace every route, and map your data layer: then write a plain-English summary of what your app actually does.",
    bullets: ["Detects framework, routes & dependencies", "Maps Supabase, Stripe & other integrations", "Runs in an isolated, throwaway sandbox"],
    mock: <MockReading/>,
  },
  {
    n: "03",
    eyebrow: "Step three",
    title: "Review what we found.",
    body: "Before anything imports, you see exactly what we understood: the pages, the stack, what comes across cleanly, and the handful of things we'll re-create. Fix the name, then import.",
    bullets: ["A clear summary of every page", "What imports cleanly vs. what we rebuild", "Nothing happens until you say go"],
    mock: <MockReview/>,
  },
  {
    n: "04",
    eyebrow: "Step four",
    title: "Keep building: in plain English.",
    body: "Your project lands in the editor as a living app. From here you change it the way you'd describe it to a friend. No more hunting through files, no more getting stuck.",
    bullets: ["Plain-language edits, applied live", "Your code is still yours: export anytime", "Publish to a real URL in two clicks"],
    mock: <MockKeepBuilding/>,
  },
];

function ImpSteps() {
  return (
    <section className="pad hiw-steps-section" id="how" data-screen-label="import-steps">
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="eyebrow">How import works</div>
          <h2>From repo to <em>living app</em> in four steps.</h2>
          <p>Every import runs the same way, whether it’s a five-file prototype or a year of weekends.</p>
        </Reveal>
        {STEPS.map((s, i) => (
          <Reveal key={s.n}>
            <div className={"hiw-step " + (i % 2 ? "is-flip" : "")}>
              <div className="hiw-step-copy">
                <div className="eyebrow">{s.eyebrow}</div>
                <div className="hiw-step-num">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <ul className="hiw-step-bullets">
                  {s.bullets.map((b) => <li key={b}><Check/><span>{b}</span></li>)}
                </ul>
              </div>
              <div className="hiw-step-art">{s.mock}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============= WHAT COMES ACROSS ============= */
function ImpComesAcross() {
  const clean = [
    "UI components & pages",
    "Your theme, tokens & styling",
    "Client-side routing",
    "Images & static assets",
    "Content & copy",
  ];
  const rebuilt = [
    { t: "Custom serverless functions", d: "Re-created as AppsBuiltWithAI actions: same behavior, no servers to manage." },
    { t: "Secret keys & env variables", d: "Never imported. You re-add them under Connectors, encrypted." },
    { t: "Unsupported dependencies", d: "Swapped for a native equivalent, with a note on what changed." },
  ];
  return (
    <section className="pad-sm imp-lp-across" data-screen-label="import-comes-across">
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="eyebrow">No surprises</div>
          <h2>You see it all <em>before</em> you commit.</h2>
          <p>Every import ends on a review screen. Here's the kind of thing you'll see.</p>
        </Reveal>
        <Reveal>
          <div className="imp-lp-split">
            <div className="imp-lp-col imp-lp-col-clean">
              <div className="imp-lp-col-head ok">Imports cleanly</div>
              <ul>
                {clean.map((c) => (
                  <li key={c}><span className="imp-lp-tick"><Check/></span><span>{c}</span></li>
                ))}
              </ul>
            </div>
            <div className="imp-lp-col imp-lp-col-rebuilt">
              <div className="imp-lp-col-head warn">We'll re-create</div>
              <ul>
                {rebuilt.map((r) => (
                  <li key={r.t}>
                    <span className="imp-lp-dot" aria-hidden="true"/>
                    <span><strong>{r.t}</strong><small>{r.d}</small></span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============= TRUST ============= */
function ImpTrust() {
  const items = [
    { t: "Read-only, always", d: "We request the minimum scope to read your code: never write access to your original." },
    { t: "Credentials never stored", d: "Source tokens live only for the length of the import, in an isolated sandbox." },
    { t: "Your code stays yours", d: "Export the full source whenever you want. Importing doesn't lock you in." },
  ];
  return (
    <section className="pad-sm imp-lp-trust" data-screen-label="import-trust">
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="eyebrow">The fine print, unfine-printed</div>
          <h2>Safe <em>by default.</em></h2>
          <p>Importing shouldn’t mean handing over the keys. It doesn’t.</p>
        </Reveal>
        <Reveal>
          <div className="hiw-agent-grid">
            {items.map((it) => (
              <div key={it.t} className="hiw-agent">
                <div className="hiw-agent-ic">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 4 6v6c0 4.5 3.4 8.4 8 10 4.6-1.6 8-5.5 8-10V6l-8-4Z"/><path d="M9 12l2 2 4-4"/></svg>
                </div>
                <h4>{it.t}</h4>
                <p>{it.d}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============= FINAL CTA ============= */
function ImpFinal() {
  return (
    <section className="pad imp-lp-final" data-screen-label="import-final">
      <div className="wrap-tight imp-lp-final-panel" style={{ textAlign: "center" }}>
        <Reveal>
          <div className="eyebrow">Beta · free while it lasts</div>
          <h2 className="serif" style={{
            fontFamily: "var(--f-head)",
            fontWeight: "var(--h-weight)",
            fontSize: "clamp(40px, 5vw, 72px)",
            letterSpacing: "var(--h-spacing)",
            lineHeight: 1.05,
            margin: "16px 0 16px",
          }}>
            Don't rebuild it. <em style={{ color: "var(--ink-2)" }}>Import it.</em>
          </h2>
          <p style={{ color: "var(--ink-2)", maxWidth: 560, margin: "0 auto 32px" }}>
            That half-finished project deserves to ship. Bring it in and finish it the easy way.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <div className="imp-lp-actions">
            <a className="btn btn-coral btn-lg" href={IMPORT_FLOW}>Import a project <ArrowRight/></a>
            <a className="btn btn-outline btn-lg" href="/how-it-works">Or start fresh</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ImportPage() {
  if (!IMPORTS_ENABLED) {
    return (
      <section className="sub-hero imp-lp-hero" data-screen-label="import-hero">
        <div className="wrap-tight" style={{ textAlign: "center", padding: "120px 20px" }}>
          <div className="eyebrow">Import</div>
          <h1 className="serif">Coming soon</h1>
          <p className="sub-lead" style={{ maxWidth: 480, margin: "16px auto 0" }}>
            Import is being improved and will be available shortly. Check back soon.
          </p>
        </div>
      </section>
    );
  }
  return (
    <React.Fragment>
      <ImpHero/>
      {OTHER_IMPORT_SOURCES_ENABLED && <ImpSources/>}
      <ImpSteps/>
      <ImpComesAcross/>
      <ImpTrust/>
      <ImpFinal/>
    </React.Fragment>
  );
}


export default ImportPage;
