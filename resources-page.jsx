/* global React */
function ResourcesPage() {
  const { Reveal, AppLink, ArrowRight } = window.PoofPart1;
  return (
    <main className="brand-page">
      <section className="sub-hero"><div className="wrap-tight"><Reveal>
        <div className="eyebrow">Resources</div>
        <h1>Learn, level up,<br/><em>get unstuck.</em></h1>
        <p className="sub-lead">From "what's a prompt?" to "I built the app my coworker just asked for." Read a guide or get help in your workspace. Your call.</p>
        <nav className="res-tabs" aria-label="Resource sections"><a className="res-tab" href="#learn">Getting started</a><a className="res-tab" href="#training">Product guides</a><a className="res-tab" href="#support">Support</a></nav>
      </Reveal></div></section>
      <section className="pad" id="learn"><div className="wrap">
        <div className="sec-head"><div className="eyebrow">Start here</div><h2>From an idea<br/><em>to a first version.</em></h2></div>
        <div className="launch-resource-grid">
          <article className="launch-resource"><div className="step-tag"><span className="step-num">01</span><span className="step-lbl">Describe</span></div><h3>Start with one useful job.</h3><p>Say who the app is for, what they need to do, and what a successful result looks like.</p><blockquote>A booking page for my dog-walking service, where a customer can choose a time and leave their contact details.</blockquote></article>
          <article className="launch-resource"><div className="step-tag"><span className="step-num">02</span><span className="step-lbl">Refine</span></div><h3>Make one change at a time.</h3><p>Review the first version. Ask for a specific change, check the result, and keep going.</p><blockquote>Move the booking form above the photos and add a field for the dog's name.</blockquote></article>
          <article className="launch-resource"><div className="step-tag"><span className="step-num">03</span><span className="step-lbl">Check</span></div><h3>Follow your customer's path.</h3><p>Try the app on your phone. Complete its main task, check what gets saved, and review the result before you share it.</p><blockquote>Can a first-time visitor understand the page, complete the form, and see what happens next?</blockquote></article>
        </div>
      </div></section>
      <section className="pad-sm" id="training"><div className="wrap launch-training">
        <div><div className="eyebrow">Product guides</div><h2>Working on<br/><em>something specific?</em></h2><p>Browse the existing guides for planning, testing, integrations, publishing, and billing.</p></div>
        <AppLink className="btn btn-outline" href={window.ABWAI.supportUrl}>Browse the help center <ArrowRight/></AppLink>
      </div></section>
      <section className="pad" id="support"><div className="wrap-tight"><Reveal>
        <div className="eyebrow">Help in your workspace</div><h2>Find the guide.<br/><em>Get back to building.</em></h2>
        <p>Need help with your next step? Open the help center in your workspace to browse product guides or contact support.</p>
        <AppLink className="btn btn-coral" href={window.ABWAI.supportUrl}>Open help center <ArrowRight/></AppLink>
      </Reveal></div></section>
    </main>
  );
}
window.ResourcesPage = ResourcesPage;
