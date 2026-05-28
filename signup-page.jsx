/* global React, PoofPart1 */
const { Reveal, ArrowRight, Check } = window.PoofPart1;
const { AuthSidePanel } = window;
const { useState: useSuState } = React;

/* ============================================================
   SIGN UP — start free
   ============================================================ */

function MailIcon2() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2"/>
      <path d="m3 7 9 6 9-6"/>
    </svg>
  );
}
function SparkIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/></svg>;
}

const USE_CASES = [
  "A landing page",
  "A booking / scheduling page",
  "A client portal",
  "A small online shop",
  "A form or RSVP page",
  "An internal tool",
  "Just exploring",
];

function SignUpPage() {
  const [email,   setEmail]   = useSuState("");
  const [name,    setName]    = useSuState("");
  const [useCase, setUseCase] = useSuState("");
  const [sent,    setSent]    = useSuState(false);
  const [busy,    setBusy]    = useSuState(false);

  const valid = /\S+@\S+\.\S+/.test(email);

  const send = (e) => {
    if (e) e.preventDefault();
    if (!valid || busy) return;
    setBusy(true);
    setTimeout(() => { setBusy(false); setSent(true); }, 800);
  };

  return (
    <div className="auth-wrap" data-screen-label="sign-up">
      <section className="auth-form-side">
        <div className="auth-card">
          {!sent ? (
            <>
              <Reveal>
                <div className="auth-eyebrow">Start free</div>
                <h1 className="serif">Make your <em>first app.</em></h1>
                <p className="auth-lead">
                  Three live apps on us, forever. No credit card. Build the
                  thing you've been describing to friends for months.
                </p>
              </Reveal>

              <Reveal delay={100}>
                <form onSubmit={send}>
                  <label className="auth-field">
                    <div className="auth-field-label"><span>Email</span></div>
                    <input
                      type="email"
                      className="auth-input"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoFocus
                    />
                  </label>

                  <label className="auth-field">
                    <div className="auth-field-label">
                      <span>Your name</span>
                      <span style={{ color: "var(--ink-3)" }}>optional</span>
                    </div>
                    <input
                      type="text"
                      className="auth-input"
                      placeholder="What should we call you?"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </label>

                  <label className="auth-field">
                    <div className="auth-field-label">
                      <span>What are you building?</span>
                      <span style={{ color: "var(--ink-3)" }}>optional</span>
                    </div>
                    <select
                      className="auth-input"
                      value={useCase}
                      onChange={(e) => setUseCase(e.target.value)}
                      style={{ appearance: "none", backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'><path d='M1 1l5 5 5-5' stroke='%238A8590' stroke-width='1.6' fill='none' stroke-linecap='round' stroke-linejoin='round'/></svg>\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 18px center", paddingRight: 44, cursor: "pointer" }}
                    >
                      <option value="">Pick one (or don't)</option>
                      {USE_CASES.map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                  </label>

                  <button
                    type="submit"
                    className="btn btn-coral btn-lg btn-block auth-submit"
                    disabled={!valid || busy}
                    style={{ opacity: (!valid || busy) ? .55 : 1, marginTop: 8 }}
                  >
                    {busy ? "Creating your account…" : <>Send magic link <ArrowRight/></>}
                  </button>
                </form>

                <div className="auth-fineprint">
                  By starting an account you agree to our <a>Terms</a> and{" "}
                  <a>Privacy Policy</a>. Cancel in two clicks, any time. No card
                  to add now or later (unless you decide to upgrade).
                </div>
              </Reveal>

              <Reveal delay={180}>
                <div className="auth-switch">
                  Already have an account? <a href="signin.html">Sign in →</a>
                </div>
              </Reveal>
            </>
          ) : (
            <Reveal>
              <div className="auth-sent">
                <div className="auth-sent-icon"><MailIcon2/></div>
                <h2>One click <em>away.</em></h2>
                <p>
                  We sent your sign-in link to <span className="strong-email">{email}</span>.
                  Click it, and your workspace appears.
                </p>

                <div className="auth-link-list">
                  <div className="auth-link-list-title">What happens next</div>
                  <ul>
                    <li><SparkIcon/><span>You'll land in a fresh workspace</span></li>
                    <li><SparkIcon/><span>Describe the app you want, in plain English</span></li>
                    <li><SparkIcon/><span>Watch it appear in about 9 minutes</span></li>
                  </ul>
                </div>

                <div className="resend">
                  Didn't arrive? Check spam, or <a onClick={() => setSent(false)}>try a different email</a>.
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <AuthSidePanel
        pull="Type what you want. Watch it appear. That's it — there's no second thing."
        attrib={{ initials: "DK", name: "Dani K.", role: "freelance designer" }}
        stats={[
          { num: "3",        label: "free apps, forever" },
          { num: "0",        label: "lines of code to learn" },
          { num: "9 min",    label: "median time to first live build" },
        ]}
      />
    </div>
  );
}

window.SignUpPage = SignUpPage;
