/* global React, PoofPart1 */
const { Reveal, ArrowRight } = window.PoofPart1;

/* ============= ALIVE — your app keeps working (habit loop, sold as benefit) ============= */
function Alive({ onStart }) {
  const feats = [
    {
      tag: "Monday brief",
      title: "A weekly brief, in plain English",
      desc: "Every Monday: who visited, what converted, and one thing worth changing this week — with a button that makes the change in a tap.",
      tint: "alive-coral",
      mock: <DigestMock/>,
    },
    {
      tag: "Live pings",
      title: "The moment something happens",
      desc: "A new order. A form filled in. A traffic spike. You hear about it the second it happens — and can reply right from your phone.",
      tint: "alive-sky",
      mock: <PingMock/>,
    },
    {
      tag: "Real numbers",
      title: "Numbers that are actually worth checking",
      desc: "No vanity charts. Just the handful of numbers that move your business — and a nudge when you've had your best week yet.",
      tint: "alive-mint",
      mock: <NumbersMock/>,
    },
    {
      tag: "Momentum",
      title: "It rewards you for keeping it fresh",
      desc: "A gentle streak for weekly updates and a completeness score, so your app stays sharp instead of going stale the week after launch.",
      tint: "alive-sun",
      mock: <StreakMock/>,
    },
  ];

  return (
    <section className="pad alive-section" data-screen-label="alive">
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="eyebrow">After you launch</div>
          <h2>Most builders vanish.<br/><em>We keep your app alive.</em></h2>
          <p>The first version is the easy part. The businesses that win are the ones that keep tending their app — so we make coming back the good part of your week, not a chore you forget.</p>
        </Reveal>

        <div className="alive-grid">
          {feats.map((f, i) => (
            <Reveal key={f.title} delay={(i % 2) * 90}>
              <div className={"alive-card " + f.tint}>
                <div className="alive-art">{f.mock}</div>
                <div className="alive-copy">
                  <div className="alive-tag">{f.tag}</div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="alive-foot" delay={120}>
          <p>Useful, never noisy. Every ping helps your business — and you can turn any of it off in a click.</p>
          {onStart
            ? <button className="feature-link" onClick={onStart}>See how it keeps you in the loop <ArrowRight/></button>
            : <a className="feature-link" href="how-it-works.html">See how it keeps you in the loop <ArrowRight/></a>}
        </Reveal>
      </div>
    </section>
  );
}

/* ---- Mock: Weekly digest ---- */
function DigestMock() {
  return (
    <div className="alive-mock digest">
      <div className="alive-mock-head">
        <span className="alive-mock-dot"></span>
        <span>Your Monday brief · Crumb &amp; Co.</span>
      </div>
      <div className="digest-stats">
        <div><b>1,284</b><small>visitors</small></div>
        <div><b>+18%</b><small>vs. last wk</small></div>
        <div><b>32</b><small>orders</small></div>
      </div>
      <div className="digest-suggest">
        <span className="digest-spark">✦</span>
        <div>
          <div className="digest-suggest-t">Suggested this week</div>
          <div className="digest-suggest-b">Add a "weekend pre-order" banner</div>
        </div>
        <span className="digest-apply">Apply</span>
      </div>
    </div>
  );
}

/* ---- Mock: Live ping ---- */
function PingMock() {
  return (
    <div className="alive-mock ping">
      <div className="ping-row unread">
        <span className="ping-ic order">🧾</span>
        <div className="ping-body">
          <div className="ping-t">New order · <b>$48.00</b></div>
          <div className="ping-time">just now</div>
        </div>
        <span className="ping-act">Reply</span>
      </div>
      <div className="ping-row unread">
        <span className="ping-ic up">📈</span>
        <div className="ping-body">
          <div className="ping-t">3× your normal traffic today</div>
          <div className="ping-time">2 min ago</div>
        </div>
        <span className="ping-act">View</span>
      </div>
      <div className="ping-row">
        <span className="ping-ic form">✉️</span>
        <div className="ping-body">
          <div className="ping-t">Catering enquiry from Dana R.</div>
          <div className="ping-time">1 hr ago</div>
        </div>
      </div>
    </div>
  );
}

/* ---- Mock: Numbers ---- */
function NumbersMock() {
  const spark = [22, 28, 26, 34, 31, 40, 52];
  const max = Math.max(...spark);
  return (
    <div className="alive-mock numbers">
      <div className="numbers-head">
        <div>
          <div className="numbers-v">3,284</div>
          <div className="numbers-k">visitors · last 7 days</div>
        </div>
        <div className="numbers-badge">🎉 best week yet</div>
      </div>
      <svg className="numbers-spark" viewBox="0 0 220 60" preserveAspectRatio="none">
        <polyline fill="none" stroke="var(--mint)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"
          points={spark.map((v, i) => (i * (220 / (spark.length - 1))) + "," + (58 - (v / max) * 52)).join(" ")}/>
      </svg>
    </div>
  );
}

/* ---- Mock: Streak ---- */
function StreakMock() {
  return (
    <div className="alive-mock streak">
      <div className="streak-ring-wrap">
        <svg width="96" height="96" viewBox="0 0 96 96">
          <circle cx="48" cy="48" r="38" fill="none" stroke="rgba(24,24,24,.10)" strokeWidth="8"/>
          <circle cx="48" cy="48" r="38" fill="none" stroke="var(--sun)" strokeWidth="8" strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 38} strokeDashoffset={(2 * Math.PI * 38) * (1 - 0.92)}
            transform="rotate(-90 48 48)"/>
          <text x="48" y="50" textAnchor="middle" fontWeight="700" fontSize="22" fill="var(--ink)">92%</text>
          <text x="48" y="66" textAnchor="middle" fontFamily="var(--f-mono)" fontSize="7.5" letterSpacing="0.1em" fill="var(--ink-3)">COMPLETE</text>
        </svg>
      </div>
      <div className="streak-side">
        <div className="streak-label">6-week update streak</div>
        <div className="streak-dots">
          {Array.from({ length: 6 }).map((_, i) => <span key={i} className={"streak-dot" + (i < 5 ? " on" : " now")}></span>)}
        </div>
        <div className="streak-hint">Keep it up — one small edit this week.</div>
      </div>
    </div>
  );
}

window.PoofAlive = { Alive };
