import React, { useState as useSupState, useRef as useSupRef, useEffect as useSupEffect } from 'react';
import { Reveal, ArrowRight } from './part1.jsx';
/* ============= SUPPORT (standalone marketing site page) ============= */

const SUP_SUGGESTIONS = [
  "How do I connect a custom domain?",
  "Why is my Stripe payout pending?",
  "Can I export my app as code?",
  "How do I roll back a publish?",
  "What's the difference between credits and minutes?",
];

const SUP_TICKET_TOPICS = [
  "Billing and credits",
  "Domains and DNS",
  "Publishing",
  "Data and integrations",
  "AI editor",
  "Account and security",
  "Something else",
];

const SUP_FAQ = [
  ["Do I need to know how to code?", "No. You describe what you want in plain English, the builder does the code. You can always export the source on Pro and above."],
  ["Can I cancel anytime?", "Yes. Two clicks, immediate. Apps stay live on Free until they exceed limits."],
  ["How long do replies take?", "Pro and above get answered first, Free tickets are worked in order. We post live status when something's degraded."],
  ["What if my idea is too complicated?", "Try Plan mode: it walks you through the brief. If it's genuinely beyond what we can build, we'll tell you up front."],
  ["Is my data used to train AI?", "No. Your data isn't used to train models. Full whitepaper on the Security page."],
];

const SUP_MAILTO = "support@appsbuiltwithai.com";

function TicketForm() {
  const [f, setF] = useSupState({ name: "", email: "", project: "", topic: SUP_TICKET_TOPICS[0], detail: "" });
  const [sent, setSent] = useSupState(false);
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));
  const valid = f.email.includes("@") && f.detail.trim().length > 4;

  const send = (e) => {
    e.preventDefault();
    if (!valid) return;
    const body = [
      "Name: " + (f.name || "(not given)"),
      "Email: " + f.email,
      "Project: " + (f.project || "(not given)"),
      "Topic: " + f.topic,
      "",
      f.detail,
    ].join("\n");
    window.location.href =
      "mailto:" + SUP_MAILTO +
      "?subject=" + encodeURIComponent("[" + f.topic + "] " + (f.project || "Support request")) +
      "&body=" + encodeURIComponent(body);
    setSent(true);
  };

  return (
    <form className="supx-ticket" onSubmit={send}>
      <div className="supx-ticket-row">
        <label className="supx-field">
          <span>Your name</span>
          <input value={f.name} onChange={set("name")} placeholder="Jordan Blake"/>
        </label>
        <label className="supx-field">
          <span>Email<em>required</em></span>
          <input type="email" required value={f.email} onChange={set("email")} placeholder="you@example.com"/>
        </label>
      </div>
      <div className="supx-ticket-row">
        <label className="supx-field">
          <span>Project or app name</span>
          <input value={f.project} onChange={set("project")} placeholder="Bloom Bakery"/>
        </label>
        <label className="supx-field">
          <span>What is it about</span>
          <select value={f.topic} onChange={set("topic")}>
            {SUP_TICKET_TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </label>
      </div>
      <label className="supx-field">
        <span>What happened<em>required</em></span>
        <textarea rows={6} required value={f.detail} onChange={set("detail")} placeholder="What you were doing, what you expected, and what happened instead. Links and screenshots help."/>
      </label>
      <div className="supx-ticket-foot">
        <button className="btn btn-coral" type="submit" disabled={!valid}>Submit ticket <ArrowRight/></button>
        <span className="supx-ticket-note">
          {sent ? "Opening your email client. If nothing happened, write to " + SUP_MAILTO + " directly."
                : "Goes to " + SUP_MAILTO}
        </span>
      </div>
    </form>
  );
}

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
              before handing you to a person.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className={"supx-ask" + (thinking ? " thinking" : "") + (answered ? " answered" : "")}>
              <span className="supx-ask-ic" aria-hidden="true">
                {thinking ? (
                  <span className="supx-ask-dots"><span/><span/><span/></span>
                ) : (
                  <img src="/site/assets/logo-mark.png" alt="" className="supx-ask-logo"/>
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
                    <img src="/site/assets/logo-mark.png" alt="" className="supx-answer-logo"/>
                    AppsBuiltWithAI answer
                  </span>
                  <span className="supx-answer-meta">3 sources · 0.8s</span>
                </div>
                <div className="supx-answer-body">
                  Most "pending" payouts clear within <strong>2 business days</strong> of your
                  first successful charge. Stripe holds the very first payout while it verifies
                  your account: check <a href="https://dashboard.stripe.com/payouts" target="_blank" rel="noopener noreferrer">Stripe Dashboard → Payments → Payouts</a> for the
                  exact release date. If it's been longer than 4 days, it's almost always
                  missing tax info on your Stripe profile.
                </div>
                <div className="supx-answer-cites">
                  <a className="supx-cite" href="/resources">📄 Stripe Connect setup</a>
                  <a className="supx-cite" href="/resources">📄 Payout schedule basics</a>
                  <a className="supx-cite" href="/resources">📄 Troubleshooting first payout</a>
                </div>
                <div className="supx-answer-foot">
                  <span className="supx-helpful">Did this help?
                    <button className="supx-helpful-btn">👍 Yes</button>
                    <button className="supx-helpful-btn">👎 No</button>
                  </span>
                  <a className="btn btn-ink btn-sm" href="#contact">Still stuck: talk to a human <ArrowRight/></a>
                </div>
              </div>
            )}
          </Reveal>

          <div className="supx-meta">
            <span><span className="supx-meta-dot"/> All systems operational</span>
            <span className="supx-meta-sep">·</span>
            <a href="/status" className="supx-meta-link">Live status →</a>
          </div>
        </div>
      </section>

      {/* ===== WHY WE'RE DIFFERENT ===== */}
      <section className="pad pt-0" data-screen-label="support-promise">
        <div className="wrap">
          <div className="supx-promise">
            <Reveal className="sec-head supx-promise-head" style={{ marginBottom: 0 }}>
              <div className="eyebrow">Why we're different</div>
              <h2 className="serif">Most builders treat support like a cost.<br/> <em>We treat it like the product.</em></h2>
              <p style={{ maxWidth: "52ch", margin: "14px auto 0" }}>
                The other app builders bury you in a ticket queue and a bot that
                loops you back to the docs. We don't. When you're stuck, a real
                person actually picks it up.
              </p>
            </Reveal>
            <Reveal>
              <div className="supx-contact-grid" style={{ marginTop: 40 }}>
                <div className="supx-contact-card">
                  <div className="supx-contact-ic">🙋</div>
                  <h3>A human, not a maze</h3>
                  <p>No deflection bot that sends you in circles. Ask once and a real teammate takes it from there.</p>
                </div>
                <div className="supx-contact-card">
                  <div className="supx-contact-ic">⚡</div>
                  <h3>Minutes, not days</h3>
                  <p>Tickets get read the day they land, not queued behind a "3 to 5 business days" auto-reply.</p>
                </div>
                <div className="supx-contact-card">
                  <div className="supx-contact-ic">🛠️</div>
                  <h3>We fix it with you</h3>
                  <p>Often we'll just jump into your workspace and sort it out while you watch: no homework assigned.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== TICKET FORM ===== */}
      <section className="pad pt-0" id="contact" data-screen-label="support-ticket">
        <div className="wrap">
          <div className="supx-twoup supx-ticket-layout">
            <div>
              <Reveal>
                <div className="eyebrow">Talk to a person</div>
                <h2 className="serif" style={{ marginTop: 10 }}>Submit a ticket.</h2>
                <p className="supx-ticket-lead">
                  Everything goes to <strong>support@appsbuiltwithai.com</strong>. Tell us what happened
                  and which project it is about, and a person picks it up and replies in the thread.
                </p>
              </Reveal>
              <Reveal delay={60}>
                <TicketForm/>
              </Reveal>
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
              <Reveal delay={80}>
                <div className="supx-contact-card supx-contact-status" style={{ marginTop: 22 }}>
                  <div className="supx-contact-ic"><span className="supx-status-pulse"/></div>
                  <h3>System status</h3>
                  <p>Editor · Publish · Stripe · Domains, all green.</p>
                  <a className="btn btn-outline btn-block" href="/status">Open status page →</a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="pad supx-cta">
        <div className="wrap-tight" style={{ textAlign: "center" }}>
          <Reveal>
            <h2 className="serif">Still <em>not sure?</em></h2>
            <p style={{ fontSize: 17, color: "var(--ink-2)", maxWidth: "48ch", margin: "16px auto 32px" }}>
              The best way to learn what's possible is to try. Most apps cost nothing to start, and we'll be right here if you get stuck.
            </p>
            <div style={{ display: "inline-flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
              <a className="btn btn-coral btn-lg" href="/signup">Start free <ArrowRight/></a>
              <a className="btn btn-outline btn-lg" href="/resources">Browse resources</a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}


export default SupportPage;
