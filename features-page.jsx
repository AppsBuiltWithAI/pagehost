/* global React */
function FeaturesPage() {
  const { Reveal, AppLink, ArrowRight } = window.PoofPart1;
  const features = [
    { id: "build", number: "01", title: "From idea to PRD", accent: "in 6 questions.", label: "Plan and build", body: "Chat with the planner agent. It captures your user, their pains, and the must-have features, then hands a real PRD to the editor. Type. Watch it build. Tweak. Ship.", points: ["A brief you can build from", "Chat-driven changes", "Connected tools and services"], tone: "coral" },
    { id: "test", number: "02", title: "An AI tester", accent: "that never sleeps.", label: "AI testing", body: "The tester agent walks through your app A-to-Z every morning, monitors uptime, simulates real customer journeys, and pings you the moment something breaks.", points: ["Test important journeys", "Review failures", "Retest after changes"], tone: "mint" },
    { id: "secure", number: "03", title: "A CTO,", accent: "on autopilot.", label: "Security", body: "Continuous AI security scans, audit log, 2FA, SSO, session management: the boring-but-critical stuff, set up correctly by default.", points: ["Review potential issues", "Prioritize fixes", "Check your app before sharing"], tone: "plum" },
    { id: "launch", number: "04", title: "We get you", accent: "across the line.", label: "Publishing", body: "Launch readiness score, soft-launch mode for friends-only, and publishing support. One click. Live on the internet. Bring your own domain on a paid plan when you're ready.", points: ["A live app to share", "Custom domains on paid plans", "Updates as you refine"], tone: "sky", image: "studio", alt: "Illustrative Form and Field studio website with colorful project artwork" },
  ];
  return <main className="brand-page features-page">
    <section className="sub-hero feature-hero"><div className="wrap-tight"><Reveal>
      <div className="eyebrow">The whole journey</div>
      <h1>Build your app.<br/><em>Keep moving forward.</em></h1>
      <p className="sub-lead">Plan, build, test, review security, and publish in one workflow. Marketing tools are coming soon.</p>
      <div className="feature-hero-links"><AppLink className="btn btn-coral">Start building <ArrowRight/></AppLink><a className="btn btn-outline" href="#marketing">Preview what's next</a></div>
    </Reveal></div></section>
    <section className="pad"><div className="wrap feature-overview">{features.map(feature => <Reveal key={feature.id}>
      <article className={"feature-overview-card feature-tone-" + feature.tone} id={feature.id}>
        <div className="feature-overview-copy"><div className="step-tag"><span className="step-num">{feature.number}</span><span className="step-lbl">{feature.label}</span></div>
        <h2>{feature.title}<br/><em>{feature.accent}</em></h2><p>{feature.body}</p><ul>{feature.points.map(point => <li key={point}>{point}</li>)}</ul>
        <AppLink className="feature-link">Open the app <ArrowRight/></AppLink></div>
        <div className="feature-overview-art">
          <span className="example-label">{feature.image ? "Illustrative layout with fictional content" : "Illustrative workflow preview"}</span>
          {feature.image ? <img src={"assets/examples/" + feature.image + ".jpg"} alt={feature.alt} width="1280" height="820" loading="lazy"/> : <div className="workflow-preview">
            <div className="workflow-preview-bar"><span/><span/><span/><b>{feature.id === "build" ? "Your first version starts here" : feature.id === "test" ? "Walk through the customer journey" : "Before you share"}</b></div>
            <div className="workflow-preview-body"><span className="eyebrow">{feature.id === "build" ? "An idea with a direction" : feature.id === "test" ? "Every click counts" : "A closer look"}</span><p className="workflow-preview-title">{feature.id === "build" ? <>A little clarity.<br/>A stronger start.</> : feature.id === "test" ? <>Catch the break.<br/>Keep moving.</> : <>Build it.<br/>Then check it.</>}</p>
              {(feature.id === "build" ? ["Who is it for?", "What should it help them do?", "What belongs in version one?"] : feature.id === "test" ? ["Walk through sign-up", "Check the checkout", "Review results and retest"] : ["Review the findings", "Prioritize what to fix", "Check your changes"]).map((line, index) => <div className="workflow-preview-row" key={line}><span>0{index + 1}</span>{line}</div>)}
            </div>
          </div>}
        </div>
      </article>
    </Reveal>)}</div></section>
    <section className="pad marketing-preview" id="marketing"><div className="wrap">
      <Reveal className="sec-head"><span className="availability-badge">Coming soon</span><h2>Built it?<br/><em>Next, help people find it.</em></h2><p>We're developing marketing tools for the next part of your journey. These tools are not available at launch.</p></Reveal>
      <div className="marketing-preview-grid">{[
        ["Tribe Finder", "Tribe Finder will help you discover communities where your audience gathers.", "Find your people"],
        ["Content creation", "Create posts that introduce your app in your voice. Coming soon.", "Tell your story"],
        ["Advertising tools", "Prepare your next campaign. Coming soon.", "Reach further"],
      ].map(([title, body, kicker], i) => <article className="marketing-preview-card" key={title}><span className="feature-number">0{i + 1}</span><span className="availability-badge">Coming soon</span><div className="eyebrow">{kicker}</div><h3>{title}</h3><p>{body}</p></article>)}</div>
    </div></section>
    <section className="pad-sm"><div className="wrap launch-training"><div><h2>Find the right fit for your idea.</h2><p>Compare the different ways to build.</p></div><a className="btn btn-ink" href="compare.html">Compare your options <ArrowRight/></a></div></section>
  </main>;
}
window.FeaturesPage = FeaturesPage;
