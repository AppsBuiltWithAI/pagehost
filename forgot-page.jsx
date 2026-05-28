/* global React, PoofPart1 */
const { Reveal, ArrowRight } = window.PoofPart1;
const { AuthSidePanel } = window;
const { useState: useFpState } = React;

/* ============================================================
   CAN'T GET IN — magic-link recovery (no passwords to forget)
   ============================================================ */

function MailIcon3() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2"/>
      <path d="m3 7 9 6 9-6"/>
    </svg>
  );
}
function HelpDot({ children, n }) {
  return (
    <li>
      <span style={{
        display: "inline-grid", placeItems: "center",
        width: 22, height: 22, flexShrink: 0,
        borderRadius: "50%", background: "var(--coral-tint)", color: "var(--coral-deep)",
        fontFamily: "var(--f-mono)", fontSize: 11, fontWeight: 600,
      }}>{n}</span>
      <span>{children}</span>
    </li>
  );
}

function ForgotPage() {
  const [email, setEmail] = useFpState("");
  const [sent,  setSent]  = useFpState(false);
  const [busy,  setBusy]  = useFpState(false);

  const valid = /\S+@\S+\.\S+/.test(email);

  const send = (e) => {
    if (e) e.preventDefault();
    if (!valid || busy) return;
    setBusy(true);
    setTimeout(() => { setBusy(false); setSent(true); }, 700);
  };

  return (
    <div className="auth-wrap" data-screen-label="forgot">
      <section className="auth-form-side">
        <div className="auth-card">
          {!sent ? (
            <>
              <Reveal>
                <div className="auth-eyebrow">Can't get in?</div>
                <h1 className="serif">No password <em>to forget.</em></h1>
                <p className="auth-lead">
                  We don't use passwords here — only magic links. Pop your
                  email in and we'll send a fresh one. The old one stops
                  working as soon as the new one arrives.
                </p>
              </Reveal>

              <Reveal delay={100}>
                <form onSubmit={send}>
                  <label className="auth-field">
                    <div className="auth-field-label"><span>Email on your account</span></div>
                    <input
                      type="email"
                      className="auth-input"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoFocus
                    />
                  </label>

                  <button
                    type="submit"
                    className="btn btn-coral btn-lg btn-block auth-submit"
                    disabled={!valid || busy}
                    style={{ opacity: (!valid || busy) ? .55 : 1, marginTop: 8 }}
                  >
                    {busy ? "Sending…" : <>Send a new link <ArrowRight/></>}
                  </button>
                </form>
              </Reveal>

              <Reveal delay={160}>
                <div style={{
                  marginTop: 36,
                  padding: "22px 24px",
                  background: "var(--surface)",
                  border: "1px solid var(--line)",
                  borderRadius: 16,
                }}>
                  <div style={{
                    fontFamily: "var(--f-mono)", fontSize: 11.5, letterSpacing: ".14em",
                    textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 14,
                  }}>Common fixes</div>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 14, fontSize: 14.5, color: "var(--ink-2)", lineHeight: 1.5 }}>
                    <HelpDot n="1">Link didn't arrive? Check your spam folder and any email forwarding rules.</HelpDot>
                    <HelpDot n="2">Link said "expired"? They only work for 15 minutes — just send another.</HelpDot>
                    <HelpDot n="3">Wrong email? Try the address you signed up with. We don't share accounts across emails.</HelpDot>
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={220}>
                <div className="auth-switch">
                  Still stuck? <a href="mailto:hi@appsbuiltwithai.com">Email a real human →</a>
                </div>
              </Reveal>
            </>
          ) : (
            <Reveal>
              <div className="auth-sent">
                <div className="auth-sent-icon"><MailIcon3/></div>
                <h2>Fresh link <em>sent.</em></h2>
                <p>
                  We sent a new sign-in link to <span className="strong-email">{email}</span>.
                  Any older link is now invalid.
                </p>
                <div className="auth-link-list">
                  <div className="auth-link-list-title">If that email is on file</div>
                  <ul>
                    <li><MailIcon3/><span style={{ marginLeft: -8 }}>You'll see it within 30 seconds</span></li>
                  </ul>
                  <div style={{ fontSize: 14, color: "var(--ink-3)", marginTop: 10, lineHeight: 1.5 }}>
                    If it doesn't arrive, the address may not have an account —
                    you can{" "}
                    <a href="signup.html" style={{ color: "var(--coral-deep)", fontWeight: 500 }}>start free here</a>.
                  </div>
                </div>
                <div className="resend">
                  <a onClick={() => setSent(false)}>← Try another email</a>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <AuthSidePanel
        pull="No passwords, no auth apps, no forgotten codes. Just a link in your inbox."
        attrib={{ initials: "JT", name: "Jamie T.", role: "yoga studio owner" }}
        stats={[
          { num: "15 min",  label: "link lifetime" },
          { num: "1",       label: "click to sign in" },
          { num: "0",       label: "passwords stored, anywhere" },
        ]}
      />
    </div>
  );
}

window.ForgotPage = ForgotPage;
