/* global React, PoofD */
const { useState, useRef, useEffect, Ic } = PoofD;

/* ============= SUPPORT DESK ============= */
function SupportPage() {
  const [q, setQ] = useState("");
  const [thinking, setThinking] = useState(false);
  const [answered, setAnswered] = useState(false);
  const inputRef = useRef(null);

  // Focus the question on mount — the question IS the page.
  useEffect(() => { inputRef.current && inputRef.current.focus(); }, []);

  const suggestions = [
    "How do I connect a custom domain?",
    "Why is my Stripe payout pending?",
    "How do I roll back to a previous version?",
    "Can I export my app as code?",
    "What's the difference between credits and minutes?",
  ];

  const submit = (text) => {
    const v = (typeof text === "string" ? text : q).trim();
    if (!v) return;
    setQ(v);
    setThinking(true);
    setAnswered(false);
    setTimeout(() => { setThinking(false); setAnswered(true); }, 1100);
  };

  const onKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); }
  };

  const reset = () => { setQ(""); setAnswered(false); setThinking(false); inputRef.current && inputRef.current.focus(); };

  const topics = [
    { id: "billing",  ic: "Activity", title: "Billing & credits",   sub: "Plans, invoices, refunds", articles: 18, tone: "sun" },
    { id: "domains",  ic: "Globe",    title: "Domains & DNS",       sub: "Custom URLs, SSL, MX",     articles: 12, tone: "sky" },
    { id: "publish",  ic: "Send",     title: "Publishing",          sub: "Versions, rollbacks, staging", articles: 14, tone: "mint" },
    { id: "data",     ic: "Database", title: "Data & integrations", sub: "Stripe, Sheets, webhooks", articles: 24, tone: "coral" },
    { id: "ai",       ic: "Spark",    title: "AI editor",           sub: "Prompts, tweaks, agents",  articles: 31, tone: "plum" },
    { id: "account",  ic: "Lock",     title: "Account & security",  sub: "2FA, team, SSO",           articles: 9,  tone: "ink" },
  ];

  const tickets = [
    { id: "TCK-2841", subj: "Stripe payout stuck on \"pending\"",         when: "Updated 12 min ago", status: "Awaiting you", waits: "Sasha L. asked for last 4 of card", color: "sun" },
    { id: "TCK-2799", subj: "Custom domain crumbandco.com — DNS errors",  when: "Updated yesterday",  status: "In progress",   waits: "Engineer assigned · Devon T.",         color: "sky" },
    { id: "TCK-2710", subj: "Page Turners — image upload fails on iPad",  when: "Resolved 3 days ago", status: "Resolved",      waits: "Closed by you with thanks 🎉",         color: "mint" },
  ];

  const guides = [
    { title: "Pointing a domain from GoDaddy",          mins: 4, kind: "guide" },
    { title: "Setting up Stripe Express in 90 seconds", mins: 2, kind: "video" },
    { title: "Rolling back a bad publish",              mins: 3, kind: "guide" },
    { title: "Sharing an app with editors",             mins: 2, kind: "guide" },
  ];

  return (
    <div className="page" data-screen-label="support" style={{ paddingTop: 8 }}>

      {/* ===== QUESTION AT TOP — the whole page hangs off this ===== */}
      <section className="sup-hero">
        <div className="sup-hero-bloom" aria-hidden="true"/>
        <div className="sup-hero-eyebrow">
          <span className="sup-hero-dot"/>
          Support desk · avg. reply <strong style={{ color: "var(--ink)" }}>&nbsp;6 min</strong> today
        </div>
        <h1 className="sup-hero-h">What can we help you figure out?</h1>
        <p className="sup-hero-sub">
          Ask in plain English. Poof checks the docs, your workspace activity, and recent tickets before
          handing you to a human if it can't help.
        </p>

        <div className={"sup-ask" + (thinking ? " thinking" : "") + (answered ? " answered" : "")}>
          <span className="sup-ask-ic" aria-hidden="true">
            {thinking ? (
              <span className="sup-ask-dots">
                <span/><span/><span/>
              </span>
            ) : <Ic.Spark/>}
          </span>
          <textarea
            ref={inputRef}
            value={q}
            onChange={(e) => { setQ(e.target.value); if (answered) setAnswered(false); }}
            onKeyDown={onKey}
            placeholder="e.g. Why didn't my last publish go live?"
            rows={1}
          />
          <div className="sup-ask-actions">
            {q && (
              <button className="sup-ask-clear" onClick={reset} title="Clear">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            )}
            <button
              className="btn btn-coral btn-sm sup-ask-go"
              onClick={() => submit()}
              disabled={!q.trim() || thinking}
            >
              {thinking ? "Thinking…" : <>Ask Poof <Ic.ArrowR size={12}/></>}
            </button>
          </div>
          <div className="sup-ask-kbd">↵ to ask · ⇧↵ for newline</div>
        </div>

        {!answered && !thinking && (
          <div className="sup-suggest">
            <span className="sup-suggest-label">Try:</span>
            {suggestions.map((s) => (
              <button key={s} className="sup-suggest-chip" onClick={() => submit(s)}>{s}</button>
            ))}
          </div>
        )}

        {answered && (
          <div className="sup-answer">
            <div className="sup-answer-head">
              <span className="sup-answer-badge"><Ic.Spark/> Poof's answer</span>
              <span className="sup-answer-meta">sourced from 3 docs · 0.8s</span>
            </div>
            <div className="sup-answer-body">
              Most "pending" payouts clear within <strong>2 business days</strong> of your first
              successful charge. Stripe holds the first payout while it verifies your account —
              check <a>Stripe Dashboard → Payments → Payouts</a> for the exact release date. If it's
              been longer than 4 days, it's almost always missing tax info on your Stripe profile.
            </div>
            <div className="sup-answer-cites">
              <a className="sup-cite">📄 Stripe Connect setup</a>
              <a className="sup-cite">📄 Payout schedule basics</a>
              <a className="sup-cite">📄 Troubleshooting first payout</a>
            </div>
            <div className="sup-answer-foot">
              <div className="sup-helpful">
                Did this help?
                <button className="sup-helpful-btn"><Ic.ThumbUp/> Yes</button>
                <button className="sup-helpful-btn"><Ic.ThumbDn/> No</button>
              </div>
              <button className="btn btn-ink btn-sm">
                Still stuck — open a ticket <Ic.ArrowR size={12}/>
              </button>
            </div>
          </div>
        )}
      </section>

      {/* ===== Topics ===== */}
      <section className="sup-section">
        <div className="sup-section-head">
          <h2>Browse by topic</h2>
          <a className="sup-section-link">All articles <Ic.ArrowR size={12}/></a>
        </div>
        <div className="sup-topic-grid">
          {topics.map((t) => {
            const I = Ic[t.ic] || Ic.Help;
            return (
              <a key={t.id} className={"sup-topic tone-" + t.tone}>
                <span className="sup-topic-ic"><I/></span>
                <div className="sup-topic-body">
                  <div className="sup-topic-title">{t.title}</div>
                  <div className="sup-topic-sub">{t.sub}</div>
                </div>
                <div className="sup-topic-count">{t.articles}</div>
              </a>
            );
          })}
        </div>
      </section>

      {/* ===== Two-up: Your tickets · Popular guides ===== */}
      <section className="sup-twoup">
        <div className="sup-card">
          <div className="sup-card-head">
            <div>
              <h3>Your conversations</h3>
              <div className="sup-card-sub">3 open · last 90 days</div>
            </div>
            <button className="btn btn-outline btn-sm">View all</button>
          </div>
          <div className="sup-tickets">
            {tickets.map((t) => (
              <div key={t.id} className="sup-ticket">
                <div className={"sup-ticket-dot tone-" + t.color}/>
                <div className="sup-ticket-body">
                  <div className="sup-ticket-top">
                    <span className="sup-ticket-id">{t.id}</span>
                    <span className="sup-ticket-when">{t.when}</span>
                  </div>
                  <div className="sup-ticket-subj">{t.subj}</div>
                  <div className="sup-ticket-foot">
                    <span className={"sup-ticket-status tone-" + t.color}>{t.status}</span>
                    <span className="sup-ticket-waits">{t.waits}</span>
                  </div>
                </div>
                <span className="sup-ticket-arrow"><Ic.ArrowR size={14}/></span>
              </div>
            ))}
          </div>
        </div>

        <div className="sup-card">
          <div className="sup-card-head">
            <div>
              <h3>Popular this week</h3>
              <div className="sup-card-sub">Most-opened guides across the platform</div>
            </div>
            <button className="btn btn-ghost btn-sm">Refresh</button>
          </div>
          <div className="sup-guides">
            {guides.map((g, i) => (
              <a key={g.title} className="sup-guide">
                <span className="sup-guide-idx">{String(i + 1).padStart(2, "0")}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="sup-guide-title">{g.title}</div>
                  <div className="sup-guide-meta">
                    {g.kind === "video" ? "▶ Video" : "📖 Guide"} · {g.mins} min read
                  </div>
                </div>
                <Ic.ArrowR size={14}/>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Contact + status strip ===== */}
      <section className="sup-contact">
        <div className="sup-contact-card">
          <div className="sup-contact-ic"><Ic.Comment/></div>
          <div>
            <div className="sup-contact-title">Live chat</div>
            <div className="sup-contact-sub">Mon–Fri · 9a–6p PT · Pro plan and up</div>
          </div>
          <button className="btn btn-coral btn-sm">Start chat</button>
        </div>
        <div className="sup-contact-card">
          <div className="sup-contact-ic"><Ic.Send/></div>
          <div>
            <div className="sup-contact-title">Email a human</div>
            <div className="sup-contact-sub">help@appsbuilt.ai · replies within a few hours</div>
          </div>
          <button className="btn btn-outline btn-sm">Open ticket</button>
        </div>
        <div className="sup-contact-card sup-status">
          <div className="sup-contact-ic"><Ic.Activity/></div>
          <div>
            <div className="sup-contact-title">
              <span className="sup-status-pulse"/> All systems normal
            </div>
            <div className="sup-contact-sub">Editor · Publish · Stripe · Domains</div>
          </div>
          <a className="btn btn-ghost btn-sm">Status page <Ic.ExtLink/></a>
        </div>
      </section>
    </div>
  );
}

window.PoofD_Support = { SupportPage };
