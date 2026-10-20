import { useState as useSuState } from 'react';
import { Reveal, ArrowRight, Check } from './part1.jsx';
import { AuthSidePanel } from './signin-page.jsx';

/* ============================================================
   SIGN UP: start free
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
  "A SaaS product",
  "Just exploring",
];

function SignUpPage() {
  const [email,   setEmail]   = useSuState("");
  const [pw,      setPw]      = useSuState("");
  const [showPw,  setShowPw]  = useSuState(false);
  const [sent,    setSent]    = useSuState(false);
  const [busy,    setBusy]    = useSuState(false);
  const [method,  setMethod]  = useSuState(null); // null | "email"

  const valid = /\S+@\S+\.\S+/.test(email) && pw.length >= 8;
  const qp = new URLSearchParams(window.location.search);
  const planId = qp.get("plan");
  const PLAN_NAMES = { starter: "Starter", growth: "Growth", pro: "Pro", scale: "Scale", payg: "Pay as you go" };
  const planName = planId && PLAN_NAMES[planId];
  const planCredits = qp.get("credits");
  const planBilling = qp.get("billing");
  const isImport = qp.get("intent") === "import";

  const send = (e) => {
    if (e) e.preventDefault();
    if (!valid || busy) return;
    setBusy(true);
    setTimeout(() => { window.location.href = "/verify?email=" + encodeURIComponent(email) + (planId ? "&plan=" + planId : ""); }, 700);
  };

  return (
    <div className="auth-wrap" data-screen-label="sign-up">
      <section className="auth-form-side">
        <div className="auth-card">
          {!sent ? (
            <>
              <Reveal>
                <div className="auth-eyebrow">Create your account</div>
                <h1 className="serif">Build something <em>real.</em></h1>
                <p className="auth-lead">
                  Describe your idea and watch it become a real app you can sell.
                </p>
                {planName && (
                  <div className="auth-plan-sum">
                    <span className="auth-plan-sum-lbl">Your plan</span>
                    <b>{planName}</b>
                    <span>{[planCredits && Number(planCredits).toLocaleString() + " credits" + (planId === "payg" ? "" : " / month"), planBilling && (planBilling === "annual" ? "billed annually" : "billed monthly")].filter(Boolean).join(" · ")}</span>
                    <small>You'll confirm payment after your account is created. <a href="/pricing">Change plan</a></small>
                  </div>
                )}
                {isImport && !planName && (
                  <div className="auth-plan-sum">
                    <span className="auth-plan-sum-lbl">Next step</span>
                    <b>Import a project</b>
                    <small>Create your account and we'll open the import flow straight away.</small>
                  </div>
                )}
              </Reveal>

              {!method && (
                <Reveal delay={100}>
                  <div className="auth-providers">
                    <button className="auth-provider" type="button">
                      <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.5 12.3c0-.9-.1-1.5-.3-2.2H12v4.5h6.5c-.1 1.1-.8 2.7-2.4 3.8l3.7 2.9c2.3-2.1 3.7-5.2 3.7-9z"/><path fill="#34A853" d="M12 24c3.2 0 6-1.1 7.9-2.9l-3.7-2.9c-1 .7-2.4 1.2-4.2 1.2-3.2 0-5.9-2.1-6.9-5.1l-3.9 3C3.2 21.2 7.3 24 12 24z"/><path fill="#FBBC05" d="M5.1 14.3c-.2-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3l-3.9-3C.4 8.3 0 10.1 0 12s.4 3.7 1.2 5.3l3.9-3z"/><path fill="#EA4335" d="M12 4.7c1.8 0 3 .8 3.7 1.4l3.3-3.2C17 1.1 15.2 0 12 0 7.3 0 3.2 2.8 1.2 6.7l3.9 3c1-3 3.7-5 6.9-5z"/></svg>
                      Continue with Google
                    </button>
                    <button className="auth-provider" type="button">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57L9 21.07c-3.34.73-4.03-1.61-4.03-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.09-.73.09-.73 1.2.09 1.83 1.24 1.83 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22l-.01 3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .3z"/></svg>
                      Continue with GitHub
                    </button>
                    <button className="auth-provider" type="button">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z"/></svg>
                      Continue with X
                    </button>
                    <button className="auth-provider" type="button">
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M16.36 12.77c.03 3.26 2.86 4.34 2.9 4.36-.03.08-.46 1.56-1.5 3.09-.9 1.32-1.84 2.64-3.32 2.66-1.45.03-1.92-.86-3.58-.86s-2.18.84-3.55.89c-1.43.05-2.51-1.43-3.42-2.74C1.99 17.48.6 12.55 2.5 9.24c.95-1.65 2.64-2.69 4.47-2.72 1.4-.03 2.72.94 3.58.94.85 0 2.46-1.16 4.15-.99.71.03 2.69.29 3.96 2.15-.1.06-2.37 1.38-2.3 4.15zM13.64 3.9c.76-.92 1.27-2.19 1.13-3.46-1.09.04-2.41.73-3.19 1.64-.7.81-1.32 2.11-1.15 3.35 1.22.1 2.45-.62 3.21-1.53z"/></svg>
                      Continue with Apple
                    </button>
                  </div>
                  <div className="auth-or"><span>or</span></div>
                  <div className="auth-providers">
                    <button className="auth-provider" type="button" onClick={() => setMethod("email")}>
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
                      Continue with email
                    </button>
                    <button className="auth-provider auth-provider-quiet" type="button">
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="7.5" cy="15.5" r="4.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg>
                      Single sign-on (SSO)
                    </button>
                  </div>
                  <div className="auth-fineprint">
                    By continuing, you agree to our <a href="/legal">Terms</a> and{" "}
                    <a href="/legal">Privacy Policy</a>.
                  </div>
                </Reveal>
              )}

              {method === "email" && (
              <Reveal delay={60}>
                <button className="auth-back" type="button" onClick={() => setMethod(null)}>← All sign-up options</button>
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
                    <div className="auth-field-label"><span>Password</span><span style={{ color: "var(--ink-3)" }}>8+ characters</span></div>
                    <div className="auth-input-row">
                      <input
                        type={showPw ? "text" : "password"}
                        className="auth-input"
                        placeholder="Create a password"
                        value={pw}
                        onChange={(e) => setPw(e.target.value)}
                        autoComplete="new-password"
                      />
                      <button type="button" className="auth-pw-toggle" onClick={() => setShowPw((v) => !v)}>{showPw ? "Hide" : "Show"}</button>
                    </div>
                  </label>

                  <button
                    type="submit"
                    className="btn btn-coral btn-lg btn-block auth-submit"
                    disabled={!valid || busy}
                    style={{ opacity: (!valid || busy) ? .55 : 1, marginTop: 8 }}
                  >
                    {busy ? "Creating your account…" : <>Create account <ArrowRight/></>}
                  </button>
                </form>

                <div className="auth-fineprint">
                  By starting an account, you agree to our <a href="/legal">Terms</a> and{" "}
                  <a href="/legal">Privacy Policy</a>. Cancel in two clicks, any time.
                </div>
              </Reveal>
              )}

              <Reveal delay={180}>
                <div className="auth-switch">
                  Already have an account? <a href="/signin">Sign in →</a>
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

                <a className="btn btn-coral btn-lg btn-block auth-submit" href="/onboarding" style={{ marginTop: 22, justifyContent: "center" }}>
                  Open my workspace <ArrowRight/>
                </a>

                <div className="resend">
                  Didn't arrive? Check spam, or <a onClick={() => setSent(false)}>try a different email</a>.
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <AuthSidePanel typing/>
    </div>
  );
}
export default SignUpPage;

