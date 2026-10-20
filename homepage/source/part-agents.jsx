import React from 'react';
import { Reveal, ArrowRight } from './part1.jsx';
/* ============= AGENTS: Plan, Editor, Testing, Security, Launch ============= */
function Agents({ onStart }) {
  const agents = [
    {
      tag: "01 · Plan",
      title: "Plan",
      headline: "From idea to a clear plan in 6 questions.",
      desc: "Chat with the planner agent. It captures your user, their pains, and the must-have features: then hands your project plan to the builder.",
      tint: "agent-coral",
      mock: <PlanMock/>,
    },
    {
      tag: "02 · Build",
      title: "Editor",
      headline: "Type. Watch it build. Tweak. Ship.",
      desc: "Chat-driven editor with a live preview. Every word you type becomes working software in seconds: buttons that click, forms that save.",
      tint: "agent-sky",
      mock: <EditorMock/>,
    },
    {
      tag: "03 · Test",
      title: "Testing",
      headline: "An AI tester that never sleeps.",
      desc: "The tester agent walks through your app A-to-Z every morning, monitors uptime, simulates real customer journeys, and pings you the moment something breaks.",
      tint: "agent-mint",
      mock: <TestMock/>,
    },
    {
      tag: "04 · Secure",
      title: "Security",
      headline: "Security checks on every app.",
      desc: "Every app is scanned for security problems before and after it goes live. If something needs fixing, you get a plain-English note and a one-click fix.",
      tint: "agent-plum",
      mock: <SecMock/>,
    },
    {
      tag: "05 · Launch",
      title: "Launch",
      headline: "We get you across the line.",
      desc: "Launch readiness score, soft-launch mode for friends-only, a daily co-pilot drafting your IG post & emails, and confetti when the first stranger actually visits.",
      tint: "agent-sun",
      mock: <LaunchMock/>,
    },
    {
      tag: "06 · Grow",
      title: "Marketing",
      headline: "An agent that sells your app for you.",
      desc: "The marketing agent scans 4,200+ communities and surfaces the highest-leverage ones for your app: drafts a native post for each, runs your ads, and turns your product into 30 feed-ready posts.",
      tint: "agent-coral",
      mock: <MarketingMock/>,
    },
  ];

  return (
    <section className="pad agents-section" data-screen-label="agents">
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="eyebrow">Built-in agents</div>
          <h2 className="agents-h2">From idea <em>to growth.</em></h2>
          <p>Our agents plan your app with you, build it, test it and launch it. Then they help you find your first 1,000 customers.</p>
        </Reveal>

        <div className="agents-list">
          {agents.slice(0, 2).map((a, i) => <AgentTile key={a.title} a={a} i={i} onStart={onStart}/>)}

          {/* 03 + 04 break the zig-zag: paired on one dark band */}
          <Reveal>
            <div className="agent-duo">
              <div className="agent-duo-head">
                <span className="agent-duo-eyebrow">While you build</span>
                <h3>Two agents watching your back, every day.</h3>
              </div>
              <div className="agent-duo-grid">
                {agents.slice(2, 4).map((a) => (
                  <div key={a.title} className={"agent-duo-card " + a.tint}>
                    <div className="step-tag">
                      <span className="step-num">{a.tag.split(" · ")[0]}</span>
                      <span className="step-lbl">{a.tag.split(" · ")[1]}</span>
                    </div>
                    <h4>{a.headline}</h4>
                    <p>{a.desc}</p>
                    <div className="agent-duo-art">{a.mock}</div>
                    {onStart
                      ? <button className="feature-link" onClick={onStart}>Try the {a.title} agent <ArrowRight/></button>
                      : <a className="feature-link" href="/signup">Try the {a.title} agent <ArrowRight/></a>}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {agents.slice(4).map((a, i) => <AgentTile key={a.title} a={a} i={i} onStart={onStart}/>)}
        </div>
      </div>
    </section>
  );
}

function AgentTile({ a, i, onStart }) {
  return (
    <Reveal delay={(i % 2) * 80}>
      <div className={"agent-tile " + a.tint + (i % 2 === 1 ? " reverse" : "")}>
        <div className="agent-copy">
          <div className="step-tag">
            <span className="step-num">{a.tag.split(" · ")[0]}</span>
            <span className="step-lbl">{a.tag.split(" · ")[1]}</span>
          </div>
          <h3>{a.headline}</h3>
          <p>{a.desc}</p>
          {onStart
            ? <button className="feature-link" onClick={onStart}>Try the {a.title} agent <ArrowRight/></button>
            : <a className="feature-link" href="/signup">Try the {a.title} agent <ArrowRight/></a>}
        </div>
        <div className="agent-art">{a.mock}</div>
      </div>
    </Reveal>
  );
}

/* ---- Mock 1: Plan ---- */
function PlanMock() {
  return (
    <div className="mock-card mock-plan">
      <div className="mock-row">
        <span className="mock-num mint">✓</span>
        <span>Vision</span>
      </div>
      <div className="mock-row">
        <span className="mock-num mint">✓</span>
        <span>User</span>
      </div>
      <div className="mock-row">
        <span className="mock-num mint">✓</span>
        <span>Pains</span>
      </div>
      <div className="mock-row active">
        <span className="mock-num ink">4</span>
        <span>Outcome</span>
      </div>
      <div className="mock-row">
        <span className="mock-num">5</span>
        <span>Review</span>
      </div>
      <div className="mock-bubble">
        <div className="mock-bubble-head">Your plan · live</div>
        <div className="mock-line t"></div>
        <div className="mock-line w"></div>
        <div className="mock-line s"></div>
        <div className="mock-pill must">Must</div>
      </div>
    </div>
  );
}

/* ---- Mock 2: Editor ---- */
function EditorMock() {
  return (
    <div className="mock-card mock-editor">
      <div className="mock-editor-chat">
        <div className="mock-msg user">"Use my brand pink"</div>
        <div className="mock-msg ai">
          <span className="mock-dot"></span><span className="mock-dot"></span><span className="mock-dot"></span>
        </div>
      </div>
      <div className="mock-editor-preview">
        <div className="mock-vp"><span></span><span></span><span></span></div>
        <div className="mock-card-inner">
          <div className="mock-line t"></div>
          <div className="mock-line w"></div>
          <div className="mock-cta-pink">Order →</div>
        </div>
      </div>
    </div>
  );
}

/* ---- Mock 3: Testing ---- */
function TestMock() {
  return (
    <div className="mock-card mock-test">
      <div className="mock-row pass"><span className="mock-num mint">✓</span><span>Homepage loads &lt; 2s</span></div>
      <div className="mock-row pass"><span className="mock-num mint">✓</span><span>Place order end-to-end</span></div>
      <div className="mock-row pass"><span className="mock-num mint">✓</span><span>Confirmation email sent</span></div>
      <div className="mock-row fail">
        <span className="mock-num coral">×</span>
        <div>
          <div>Tap target on iOS Safari</div>
          <div className="mock-row-hint">38×38 below 44×44 minimum</div>
        </div>
      </div>
      <div className="mock-row pass"><span className="mock-num mint">✓</span><span>Past slots auto-disabled</span></div>
      <div className="mock-uptime">
        {Array.from({ length: 28 }).map((_, i) => (
          <span key={i} className={"mock-uptile " + (i === 14 ? "down" : i === 7 ? "slow" : "up")}></span>
        ))}
      </div>
    </div>
  );
}

/* ---- Mock 4: Security ---- */
function SecMock() {
  return (
    <div className="mock-card mock-sec">
      <div className="mock-score-ring">
        <svg width="140" height="140" viewBox="0 0 140 140">
          <circle cx="70" cy="70" r="55" fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="10"/>
          <circle cx="70" cy="70" r="55" fill="none" stroke="var(--mint)" strokeWidth="10" strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 55}
                  strokeDashoffset={(2 * Math.PI * 55) * (1 - 0.96)}
                  transform="rotate(-90 70 70)"/>
          <text x="70" y="72" textAnchor="middle" fontWeight="700" fontSize="34" letterSpacing="-0.02em" fill="#fff">96</text>
          <text x="70" y="92" textAnchor="middle" fontFamily="var(--f-mono)" fontSize="9" letterSpacing="0.12em" fill="rgba(255,255,255,.6)">/ 100</text>
        </svg>
      </div>
      <div className="mock-sec-rows">
        <div className="mock-row"><span className="mock-num mint">✓</span><span>Security scan passed</span></div>
        <div className="mock-row"><span className="mock-num mint">✓</span><span>HTTPS auto-renewed</span></div>
        <div className="mock-row"><span className="mock-num mint">✓</span><span>No exposed keys</span></div>
        <div className="mock-row"><span className="mock-num mint">✓</span><span>Dependencies clean</span></div>
      </div>
    </div>
  );
}

/* ---- Mock 5: Launch ---- */
function LaunchMock() {
  return (
    <div className="mock-card mock-launch">
      <div className="mock-launch-head">
        <div>
          <div className="mock-launch-kicker">Launch in</div>
          <div className="mock-launch-num">3<small>d</small></div>
        </div>
        <div className="mock-score-pill">87 / 100</div>
      </div>
      <div className="mock-streak">
        {Array.from({ length: 7 }).map((_, i) => <span key={i} className={"mock-streak-dot" + (i < 5 ? " on" : "")}></span>)}
      </div>
      <div className="mock-row pass"><span className="mock-num mint">✓</span><span>Domain verified</span></div>
      <div className="mock-row pass"><span className="mock-num mint">✓</span><span>Test order placed</span></div>
      <div className="mock-row warn"><span className="mock-num warn">!</span><span>Email draft ready</span></div>
      <div className="mock-cta-coral">🚀 Open the doors</div>
    </div>
  );
}

/* ---- Mock 6: Marketing ---- */
function MarketingMock() {
  return (
    <div className="mock-card mock-mkt">
      <div className="mock-mkt-row">
        <span className="mock-mkt-letter" style={{ background: "#5865F2" }}>IH</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="mock-mkt-tag">DISCORD · STRONG FIT</div>
          <div className="mock-mkt-name">Indie Hackers: Mindful Founders</div>
        </div>
        <span className="mock-num mint">✓</span>
      </div>
      <div className="mock-mkt-row">
        <span className="mock-mkt-letter" style={{ background: "#FF4500" }}>R</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="mock-mkt-tag">REDDIT · STRONG FIT</div>
          <div className="mock-mkt-name">r/SmallBusiness</div>
        </div>
        <span className="mock-num mint">✓</span>
      </div>
      <div className="mock-mkt-row">
        <span className="mock-mkt-letter" style={{ background: "linear-gradient(135deg,#F58529,#DD2A7B,#8134AF)" }}>IG</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="mock-mkt-tag">INSTAGRAM · GOOD FIT</div>
          <div className="mock-mkt-name">#foundermindset</div>
        </div>
        <span className="mock-num warn">!</span>
      </div>
      <div className="mock-draft-bubble">
        <div className="mock-bubble-head">DRAFTED IN YOUR VOICE</div>
        <div className="mock-line w"></div>
        <div className="mock-line w"></div>
        <div className="mock-line s"></div>
      </div>
    </div>
  );
}

export { Agents };
