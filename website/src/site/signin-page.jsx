import React, { useState, useEffect } from 'react';
import { Reveal, ArrowRight } from './part1.jsx';


/* ============================================================
   SIGN IN ,  magic-link only
   ============================================================ */

function MailIcon({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2"/>
      <path d="m3 7 9 6 9-6"/>
    </svg>
  );
}
function ExternalIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M10 14 21 3M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/></svg>;
}
function ClockIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
}
function ShieldIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 4 5v7c0 4.5 3.4 8.4 8 10 4.6-1.6 8-5.5 8-10V5l-8-3Z"/></svg>;
}

const SIDE_PROMPTS = [
  "A booking page for my dog grooming studio with a $20 deposit",
  "A members-only recipe club that charges $9 a month",
  "An order form for my bakery with pickup times",
  "A client portal where coaching clients see their sessions",
];

function SideTyping() {
  const [i, setI] = useState(0);
  const [n, setN] = useState(0);
  const [phase, setPhase] = useState("type");
  const text = SIDE_PROMPTS[i];
  useEffect(() => {
    let id;
    if (phase === "type") id = setTimeout(() => n < text.length ? setN(n + 1) : setPhase("build"), n < text.length ? 38 : 400);
    else if (phase === "build") id = setTimeout(() => setPhase("done"), 1400);
    else id = setTimeout(() => { setI((i + 1) % SIDE_PROMPTS.length); setN(0); setPhase("type"); }, 1800);
    return () => clearTimeout(id);
  }, [n, phase, text]);
  return (
    <div className="auth-type">
      <div className="auth-type-cap">Describe your app</div>
      <div className="auth-type-box"><span>{text.slice(0, n)}</span><span className="auth-type-caret"></span></div>
      <div className={"auth-type-status " + phase}>{phase === "type" ? "Typing…" : phase === "build" ? "Building your app…" : "✓ Live and ready to share"}</div>
    </div>
  );
}

function AuthSidePanel({ pull, attrib, stats, typing }) {
  return (
    <aside className="auth-side">
      <div className="auth-side-mark">
        <img src="/site/assets/logo-mark.png" alt="AppsBuiltWithAI"/>
      </div>
      <div>
        {pull && <p className="auth-side-pull">{pull}</p>}
        {typing && <SideTyping/>}
        {attrib && (
          <div className="auth-side-attrib">
            <div className="av">{attrib.initials}</div>
            <div>
              <strong>{attrib.name}</strong> · {attrib.role}
            </div>
          </div>
        )}
        {stats && (
          <div className="auth-side-stats">
            {stats.map((s, i) => (
              <div key={i} className="auth-side-stat">
                <div className="num">{s.num}</div>
                <div className="label">{s.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}

function SignInPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent]   = useState(false);
  const [busy, setBusy]   = useState(false);

  const valid = /\S+@\S+\.\S+/.test(email);

  const send = (e) => {
    if (e) e.preventDefault();
    if (!valid || busy) return;
    setBusy(true);
    setTimeout(() => { setBusy(false); setSent(true); }, 700);
  };

  return (
    <div className="auth-wrap" data-screen-label="sign-in">
      <section className="auth-form-side">
        <div className="auth-card">
          {!sent ? (
            <>
              <Reveal>
                <div className="auth-eyebrow">Sign in</div>
                <h1 className="serif">Welcome <em>back.</em></h1>
                <p className="auth-lead">
                  Type your email ,  we'll send you a magic link. No password
                  to forget, no app to download.
                </p>
              </Reveal>

              <Reveal delay={100}>
                <form onSubmit={send}>
                  <label className="auth-field">
                    <div className="auth-field-label">
                      <span>Email</span>
                    </div>
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
                    {busy ? "Sending…" : <>Send magic link <ArrowRight/></>}
                  </button>
                </form>

                <div className="auth-fineprint">
                  By signing in you agree to our <a>Terms</a> and <a>Privacy Policy</a>.
                  We'll never sell your email ,  we don't have anything to sell it for.
                </div>
              </Reveal>

              {/* <Reveal delay={180}>
                <div className="auth-switch">
                  New here? <a href="/signup">Start free →</a>
                </div>
              </Reveal> */}
            </>
          ) : (
            <Reveal>
              <div className="auth-sent">
                <div className="auth-sent-icon"><MailIcon/></div>
                <h2>Check your <em>inbox.</em></h2>
                <p>
                  We sent a sign-in link to <span className="strong-email">{email}</span>.
                  Click it from any device and you're in.
                </p>

                <div className="auth-link-list">
                  <div className="auth-link-list-title">While you wait</div>
                  <ul>
                    <li><ClockIcon/><span>Link expires in 15 minutes</span></li>
                    <li><ShieldIcon/><span>Works once, then it's gone</span></li>
                    <li><ExternalIcon/><span>Open in any browser, any device</span></li>
                  </ul>
                </div>

                <div className="resend">
                  Nothing yet? Check spam, or <a onClick={() => setSent(false)}>send another</a>.
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <AuthSidePanel
        pull="Built my whole client portal between school pickup and dinner. Wild."
        attrib={{ initials: "RM", name: "Rachel M.", role: "small-business owner" }}
        stats={[
          { num: "12,400+", label: "apps built this month" },
          { num: "9 min",   label: "median time to live" },
          { num: "$0",      label: "to start, no card" },
        ]}
      />
    </div>
  );
}

export default SignInPage;
export { AuthSidePanel };
