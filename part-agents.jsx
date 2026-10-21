/* global React, PoofPart1 */
const { Reveal, ArrowRight, AppLink } = window.PoofPart1;

/* ============= AGENTS  -  Plan, Editor, Testing, Security, Launch ============= */
function Agents({ onStart }) {
  const agents = [
    {
      tag: "01 · Plan",
      title: "Plan",
      headline: "From idea to PRD in 6 questions.",
      desc: "Chat with the planner agent. It captures your user, their pains, and the must-have features, then hands a real PRD to the editor.",
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
      headline: "A CTO, on autopilot.",
      desc: "Continuous AI security scans, audit log, 2FA, SSO, session management: the boring-but-critical stuff, set up correctly by default.",
      tint: "agent-plum",
      mock: <SecMock/>,
    },
    {
      tag: "05 · Launch",
      title: "Launch",
      headline: "We get you across the line.",
      desc: "Launch readiness score, soft-launch mode for friends-only, and publishing support. And confetti when the first stranger actually visits. IG posts and email campaign tools are coming soon.",
      tint: "agent-sun",
      mock: <LaunchMock/>,
    },
    {
      tag: "06 · Grow",
      title: "Marketing",
      headline: "Coming soon: an agent that sells your app for you.",
      status: window.ABWAI?.marketing || "coming-soon",
      desc: "Coming soon: Tribe Finder will scan 4,200+ communities and surface the highest-leverage ones for your app, with tools for native posts, ads, and turning your product into 30 feed-ready posts. These tools are not available at launch.",
      tint: "agent-coral",
      mock: <MarketingMock/>,
    },
  ];

  return (
    <section className="pad agents-section" data-screen-label="agents">
      <div className="wrap">
        <Reveal><iframe id="home-video" className="home-video" src="home-video.html" title="AppsBuiltWithAI walkthrough" sandbox="allow-scripts" loading="lazy" allow="fullscreen; picture-in-picture" allowFullScreen/></Reveal>
<Reveal className="sec-head" style={{ marginTop: 32 }}>
          <div className="eyebrow">Built-in agents</div>
          <h2>Six agents.<br/><em>From idea to growth.</em></h2>
          <p>Most app builders dump a half-built thing on your lap and walk away. Ours stick around: planning, building, testing, securing, launching, and getting you ready to share. Marketing tools are coming soon.</p>
        </Reveal>

        <div className="agents-list">
          {agents.map((a, i) => (
            <Reveal key={a.title} delay={(i % 2) * 80}>
              <div className={"agent-tile " + a.tint + (i % 2 === 1 ? " reverse" : "")}>
                <div className="agent-copy">
                  <div className="step-tag">
                    <span className="step-num">{a.tag.split(" · ")[0]}</span>
                    <span className="step-lbl">{a.tag.split(" · ")[1]}</span>
                  </div>
                  <h3>{a.headline}</h3>
                  <p>{a.desc}</p>
                  {a.title === "Marketing" && a.status !== "available" ? <span className="availability-badge">Coming soon</span> : onStart
                    ? <button className="feature-link" onClick={onStart}>Try the {a.title} agent <ArrowRight/></button>
                    : <AppLink className="feature-link">Try the {a.title} agent <ArrowRight/></AppLink>}
                </div>
                <div className="agent-art"><span className="example-label">{a.title === "Marketing" ? "Coming soon preview" : "Illustrative agent preview"}</span><div role="img" aria-label={"Illustrative " + a.title.toLowerCase() + " agent preview"}>{a.mock}</div></div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
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
        <div className="mock-bubble-head">PRD · live</div>
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
        <div className="mock-row"><span className="mock-num mint">✓</span><span>2FA enabled</span></div>
        <div className="mock-row"><span className="mock-num mint">✓</span><span>HTTPS auto-renewed</span></div>
        <div className="mock-row"><span className="mock-num mint">✓</span><span>Audit log running</span></div>
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
      <div className="mock-row warn"><span className="mock-num warn">!</span><span>Final checks remaining</span></div>
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

window.PoofAgents = { Agents };
