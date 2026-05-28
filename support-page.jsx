/* global React, PoofPart1 */
const { Reveal, ArrowRight } = window.PoofPart1;
const { useState: useSupState, useRef: useSupRef, useEffect: useSupEffect } = React;

/* ============= SUPPORT (standalone marketing site page) ============= */

const SUP_SUGGESTIONS = [
  "How do I connect a custom domain?",
  "Why is my Stripe payout pending?",
  "Can I export my app as code?",
  "How do I roll back a publish?",
  "What's the difference between credits and minutes?",
];

const SUP_TOPICS = [
  { id: "billing",  ic: "💳", title: "Billing & credits",   desc: "Plans, invoices, refunds.",            count: 18, tone: "sun"   },
  { id: "domains",  ic: "🌐", title: "Domains & DNS",       desc: "Custom URLs, SSL, MX records.",        count: 12, tone: "sky"   },
  { id: "publish",  ic: "🚀", title: "Publishing",          desc: "Versions, rollbacks, staging.",        count: 14, tone: "mint"  },
  { id: "data",     ic: "🔌", title: "Data & integrations", desc: "Stripe, Sheets, webhooks.",            count: 24, tone: "coral" },
  { id: "ai",       ic: "✨", title: "AI editor",           desc: "Prompts, tweaks, agents.",             count: 31, tone: "plum"  },
  { id: "account",  ic: "🔒", title: "Account & security",  desc: "2FA, team, SSO.",                      count:  9, tone: "rose"  },
];

const SUP_GUIDES = [
  { title: "Pointing a domain from GoDaddy",          mins: 4, kind: "guide" },
  { title: "Setting up Stripe Express in 90 seconds", mins: 2, kind: "video" },
  { title: "Rolling back a bad publish",              mins: 3, kind: "guide" },
  { title: "Sharing an app with editors",             mins: 2, kind: "guide" },
  { title: "Reading & exporting your data",           mins: 5, kind: "guide" },
];

const SUP_FAQ = [
  ["Do I need to know how to code?",         "No. You describe what you want in plain English, the builder does the code. You can always export the source on Pro and above."],
  ["Can I cancel anytime?",                  "Yes. Two clicks, immediate. Apps stay live on Free until they exceed limits."],
  ["How long do replies take?",              "Today's median is 6 minutes for Pro+, and a few hours for Free. We post live status when something's degraded."],
  ["What if my idea is too complicated?",    "Try Plan mode — it walks you through the brief. If it's genuinely beyond what we can build, we'll tell you up front."],
  ["Is my data used to train AI?",           "No. Your data isn't used to train models. Full whitepaper on the Security page."],
];

function SupportPage() {
  const [q, setQ] = useSupState("");
  const [thinking, setThinking] = useSupState(false);
  const [answered, setAnswered] = useSupState(false);
  const inputRef = useSupRef(null);

  useSupEffect(() => { inputRef.current && inputRef.current.focus(); }, []);

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
  const reset = () => {
    setQ(""); setAnswered(false); setThinking(false);
    inputRef.current && inputRef.current.focus();
  };

  return (
    <>
      {/* ===== HERO + QUESTION ===== */}
      <section className="sub-hero supx-hero" data-screen-label="support-hero">
        <div className="supx-bloom" aria-hidden="true"/>
        <div className="wrap-tight" style={{ position: "relative" }}>
          <Reveal>
            <div className="eyebrow">Support desk</div>
            <h1 className="serif">What can we help you <em>figure out?</em></h1>
            <p className="sub-lead">
              Ask in plain English. We check the docs, your workspace, and recent tickets
              before handing you to a human — usually in under <strong>6 minutes</strong>.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className={"supx-ask" + (thinking ? " thinking" : "") + (answered ? " answered" : "")}>
              <span className="supx-ask-ic" aria-hidden="true">
                {thinking ? (
                  <span className="supx-ask-dots"><span/><span/><span/></span>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 3v4M3 5h4M6 17v4M4 19h4M13 3l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"/>
                  </svg>
                )}
              </span>
              <textarea
                ref={inputRef}
                value={q}
                onChange={(e) => { setQ(e.target.value); if (answered) setAnswered(false); }}
                onKeyDown={onKey}
                placeholder="e.g. Why didn't my last publish go live?"
                rows={1}
              />
              <div className="supx-ask-actions">
                {q && (
                  <button className="supx-ask-clear" onClick={reset} aria-label="Clear">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
                  </button>
                )}
                <button className="btn btn-coral supx-ask-go" onClick={() => submit()} disabled={!q.trim() || thinking}>
                  {thinking ? "Thinking…" : <>Ask <ArrowRight/></>}
                </button>
              </div>
              <div className="supx-ask-kbd">↵ to ask · ⇧↵ for newline</div>
            </div>

            {!answered && !thinking && (
              <div className="supx-suggest">
                <span className="supx-suggest-label">Try:</span>
                {SUP_SUGGESTIONS.map((s) => (
                  <button key={s} className="supx-suggest-chip" onClick={() => submit(s)}>{s}</button>
                ))}
              </div>
            )}

            {answered && (
              <div className="supx-answer">
                <div className="supx-answer-head">
                  <span className="supx-answer-badge">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M13 3l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"/>
                    </svg>
                    AI answer
                  </span>
                  <span className="supx-answer-meta">3 sources · 0.8s</span>
                </div>
                <div className="supx-answer-body">
                  Most "pending" payouts clear within <strong>2 business days</strong> of your
                  first successful charge. Stripe holds the very first payout while it verifies
                  your account — check <a>Stripe Dashboard → Payments → Payouts</a> for the
                  exact release date. If it's been longer than 4 days, it's almost always
                  missing tax info on your Stripe profile.
                </div>
                <div className="supx-answer-cites">
                  <a className="supx-cite">📄 Stripe Connect setup</a>
                  <a className="supx-cite">📄 Payout schedule basics</a>
                  <a className="supx-cite">📄 Troubleshooting first payout</a>
                </div>
                <div className="supx-answer-foot">
                  <span className="supx-helpful">Did this help?
                    <button className="supx-helpful-btn">👍 Yes</button>
                    <button className="supx-helpful-btn">👎 No</button>
                  </span>
                  <a className="btn btn-ink btn-sm" href="#contact">Still stuck — talk to a human <ArrowRight/></a>
                </div>
              </div>
            )}
          </Reveal>

          <div className="supx-meta">
            <span><span className="supx-meta-dot"/> Avg. reply <strong>6 min</strong> today</span>
            <span className="supx-meta-sep">·</span>
            <span>All systems operational</span>
            <span className="supx-meta-sep">·</span>
            <a href="status.html" className="supx-meta-link">Live status →</a>
          </div>
        </div>
      </section>

      {/* ===== TOPICS ===== */}
      <section className="pad pt-0">
        <div className="wrap">
          <Reveal className="sec-head">
            <div className="eyebrow">Browse</div>
            <h2 className="serif">Pick a <em>topic.</em></h2>
          </Reveal>
          <div className="supx-topic-grid">
            {SUP_TOPICS.map((t, i) => (
              <Reveal key={t.id} delay={i * 30}>
                <a className={"supx-topic tone-" + t.tone}>
                  <div className="supx-topic-ic">{t.ic}</div>
                  <h3>{t.title}</h3>
                  <p>{t.desc}</p>
                  <div className="supx-topic-count">{t.count} articles →</div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== POPULAR GUIDES + FAQ ===== */}
      <section className="pad pt-0">
        <div className="wrap">
          <div className="supx-twoup">
            <div>
              <Reveal>
                <div className="eyebrow">Most-opened this week</div>
                <h2 className="serif" style={{ marginTop: 10 }}>Popular guides.</h2>
              </Reveal>
              <div className="supx-guides">
                {SUP_GUIDES.map((g, i) => (
                  <Reveal key={g.title} delay={i * 25}>
                    <a className="supx-guide">
                      <span className="supx-guide-idx">{String(i + 1).padStart(2, "0")}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="supx-guide-title">{g.title}</div>
                        <div className="supx-guide-meta">
                          {g.kind === "video" ? "▶ Video" : "📖 Guide"} · {g.mins} min read
                        </div>
                      </div>
                      <ArrowRight/>
                    </a>
                  </Reveal>
                ))}
              </div>
            </div>
            <div>
              <Reveal>
                <div className="eyebrow">Quick answers</div>
                <h2 className="serif" style={{ marginTop: 10 }}>FAQ.</h2>
              </Reveal>
              <div className="support-faq supx-faq">
                {SUP_FAQ.map(([qq, a], i) => (
                  <Reveal key={qq} delay={i * 25}>
                    <details>
                      <summary>{qq}</summary>
                      <p>{a}</p>
                    </details>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTACT STRIP ===== */}
      <section className="pad pt-0" id="contact">
        <div className="wrap">
          <Reveal className="sec-head">
            <div className="eyebrow">Talk to a person</div>
            <h2 className="serif">When the bot can't do it.</h2>
          </Reveal>
          <div className="supx-contact-grid">
            <Reveal>
              <div className="supx-contact-card">
                <div className="supx-contact-ic">💬</div>
                <h3>Live chat</h3>
                <p>Mon–Fri · 9a–6p PT. Pro plan and above.</p>
                <a className="btn btn-coral btn-block">Start a chat</a>
              </div>
            </Reveal>
            <Reveal delay={60}>
              <div className="supx-contact-card">
                <div className="supx-contact-ic">✉️</div>
                <h3>Email a human</h3>
                <p>help@appsbuilt.ai · replies within a few hours.</p>
                <a className="btn btn-outline btn-block" href="mailto:help@appsbuilt.ai">Open a ticket</a>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="supx-contact-card supx-contact-status">
                <div className="supx-contact-ic"><span className="supx-status-pulse"/></div>
                <h3>System status</h3>
                <p>Editor · Publish · Stripe · Domains — all green.</p>
                <a className="btn btn-outline btn-block" href="status.html">Open status page →</a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="pad supx-cta">
        <div className="wrap-tight" style={{ textAlign: "center" }}>
          <Reveal>
            <h2 className="serif">Still <em>not sure?</em></h2>
            <p style={{ fontSize: 17, color: "var(--ink-2)", maxWidth: "48ch", margin: "16px auto 32px" }}>
              The best way to learn what's possible is to try. Most apps cost nothing to start —
              and we'll be right here if you get stuck.
            </p>
            <div style={{ display: "inline-flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
              <a className="btn btn-coral btn-lg" href="signup.html">Start free <ArrowRight/></a>
              <a className="btn btn-outline btn-lg" href="resources.html">Browse resources</a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

window.SupportPage = SupportPage;
