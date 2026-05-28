/* global React, PoofPart1 */
const { Reveal, ArrowRight } = window.PoofPart1;
const { useState: useCLState, useMemo: useCLMemo } = React;

/* ============= CHANGELOG ============= */

const CHANGELOG_ENTRIES = [
  {
    date: "May 24, 2026",
    version: "v4.18",
    headline: "Plan mode is here",
    image: "plan",
    items: [
      { tag: "feature",     text: "**Plan mode** — a chat-based stepper that walks you through brief, users, journey, and scope before generating anything." },
      { tag: "feature",     text: "New \"Need help?\" button in Plan mode that drafts answers tailored to your step." },
      { tag: "improvement", text: "Editor agent now responds 2.3× faster on edits to existing apps." },
      { tag: "fix",         text: "Fixed a case where uploading a logo over 4MB would silently fail." },
    ],
  },
  {
    date: "May 17, 2026",
    version: "v4.17",
    headline: "Shared workspaces & invites",
    items: [
      { tag: "feature",     text: "**Shared with me** category in Home — see apps your teammates have shared with you." },
      { tag: "feature",     text: "Invite-a-friend flow: scan a QR or copy a link to earn 50 credits per friend." },
      { tag: "improvement", text: "Sidebar gets a Knowledge Base settings tab for global coding & brand preferences." },
      { tag: "fix",         text: "Member access page no longer renders the role pill as a 400px-wide grid (whoops)." },
    ],
  },
  {
    date: "May 10, 2026",
    version: "v4.16",
    headline: "Connectors, take two",
    items: [
      { tag: "feature",     text: "**19 new connectors** — Notion, Airtable, Supabase, Twilio, Linear, GitHub, and more." },
      { tag: "feature",     text: "OAuth connect flow now finishes in under 6 seconds end to end." },
      { tag: "improvement", text: "Per-app connector overrides — use one Stripe account for one app, another for another." },
    ],
  },
  {
    date: "May 3, 2026",
    version: "v4.15",
    headline: "Custom domains in 90 seconds",
    items: [
      { tag: "feature",     text: "**Custom domains** ship with one-click SSL via Let's Encrypt. No DNS records to copy-paste." },
      { tag: "improvement", text: "Free plan now includes 3 live apps (up from 1)." },
      { tag: "fix",         text: "Resolved a rare bug where draft history snapshots could double-count storage." },
    ],
  },
  {
    date: "Apr 26, 2026",
    version: "v4.14",
    headline: "Edit-while-you-watch",
    items: [
      { tag: "feature",     text: "**Surgical edits** — describe a change and the agent applies it without regenerating the whole app." },
      { tag: "feature",     text: "Activity feed in the right rail of every app so you can see exactly what changed and when." },
      { tag: "improvement", text: "Cards in Templates gallery are 40% lighter and load 30% faster on slow networks." },
    ],
  },
  {
    date: "Apr 19, 2026",
    version: "v4.13",
    headline: "Testing, end-to-end",
    items: [
      { tag: "feature",     text: "**Testing page** — auto-generated tests, scenarios you can record, uptime monitors, alert routing." },
      { tag: "feature",     text: "Live test runner watches real visitors and flags anything that looks weird." },
      { tag: "improvement", text: "Editor preview now refreshes with a soft flash instead of a full reload." },
    ],
  },
  {
    date: "Apr 12, 2026",
    version: "v4.12",
    headline: "Cloud & credits",
    items: [
      { tag: "feature",     text: "**Cloud balance** in Settings — see credits, storage, API call usage in one place." },
      { tag: "feature",     text: "Auto-top-up — never run out of credits mid-build." },
      { tag: "fix",         text: "Settings → Privacy & security now correctly remembers your 2FA preference between sessions." },
    ],
  },
];

const TAG_META = {
  feature:     { label: "Feature",     color: "coral" },
  improvement: { label: "Improvement", color: "sky"   },
  fix:         { label: "Fix",         color: "mint"  },
  breaking:    { label: "Breaking",    color: "warm"  },
};

function ChangelogPage() {
  const [q, setQ]     = useCLState("");
  const [tag, setTag] = useCLState("all");

  const filtered = useCLMemo(() => {
    const qLow = q.trim().toLowerCase();
    return CHANGELOG_ENTRIES.map(entry => {
      const items = entry.items.filter(it => {
        const tagMatch = tag === "all" || it.tag === tag;
        const qMatch = !qLow || it.text.toLowerCase().includes(qLow) || entry.headline.toLowerCase().includes(qLow);
        return tagMatch && qMatch;
      });
      return items.length ? { ...entry, items } : null;
    }).filter(Boolean);
  }, [q, tag]);

  const tagCounts = useCLMemo(() => {
    const totals = { feature: 0, improvement: 0, fix: 0, breaking: 0 };
    CHANGELOG_ENTRIES.forEach(e => e.items.forEach(i => totals[i.tag] = (totals[i.tag] || 0) + 1));
    return totals;
  }, []);

  const renderText = (text) => {
    // simple bold markdown
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((p, i) =>
      p.startsWith("**")
        ? <strong key={i}>{p.slice(2, -2)}</strong>
        : <React.Fragment key={i}>{p}</React.Fragment>
    );
  };

  return (
    <>
      <section className="sub-hero" data-screen-label="changelog-hero">
        <div className="wrap-tight">
          <Reveal>
            <div className="eyebrow">Change log</div>
            <h1 className="serif">Everything we've <em>shipped lately.</em></h1>
            <p className="sub-lead">
              Real updates, in plain English, every Friday. Skim the bold
              bits or read the lot — we're not trying to bury anything.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="sub-meta">
              <span>{CHANGELOG_ENTRIES.length} releases shown</span>
              <span className="dot"/>
              <span><a href="https://twitter.com">@appsbuiltwithai</a></span>
              <span className="dot"/>
              <span><a href="roadmap.html">See what's next →</a></span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pad pt-0">
        <div className="wrap-tight">
          <Reveal>
            <div className="cl-toolbar">
              <div className="cl-search">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
                <input
                  placeholder="Search updates…"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                />
              </div>
              <div className="cl-tags">
                <button className={"cl-tag " + (tag === "all" ? "active" : "")} onClick={() => setTag("all")}>All</button>
                {Object.entries(TAG_META).map(([k, m]) => (
                  <button
                    key={k}
                    className={"cl-tag tone-" + m.color + (tag === k ? " active" : "")}
                    onClick={() => setTag(k)}
                  >
                    {m.label} <span className="count">{tagCounts[k] || 0}</span>
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="cl-stream">
            {filtered.map((entry, idx) => (
              <Reveal key={entry.version}>
                <article className="cl-entry">
                  <aside className="cl-entry-side">
                    <div className="cl-entry-date">{entry.date}</div>
                    <div className="cl-entry-version">{entry.version}</div>
                  </aside>
                  <div className="cl-entry-body">
                    <h2 className="cl-entry-h">{entry.headline}</h2>
                    <ul className="cl-entry-list">
                      {entry.items.map((it, i) => {
                        const meta = TAG_META[it.tag] || TAG_META.feature;
                        return (
                          <li key={i}>
                            <span className={"cl-item-tag tone-" + meta.color}>{meta.label}</span>
                            <span className="cl-item-text">{renderText(it.text)}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}

            {filtered.length === 0 && (
              <div className="cl-empty">
                <p>No updates match "{q || tag}".</p>
                <button className="btn btn-outline" onClick={() => { setQ(""); setTag("all"); }}>Clear search</button>
              </div>
            )}
          </div>

          <Reveal>
            <div className="cl-archive">
              <span>Older entries are kept in the <a href="#">archive</a>.</span>
              <a className="btn btn-outline btn-sm" href="roadmap.html">What's next? <ArrowRight/></a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

window.ChangelogPage = ChangelogPage;
