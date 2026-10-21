/* global React */
function PricingPage() {
  const { Reveal } = window.PoofPart1;
  const { Pricing, FAQ } = window.PoofPart3;
  return (
    <main className="brand-page">
      <section className="sub-hero"><div className="wrap-tight"><Reveal>
        <div className="eyebrow">Pricing</div>
        <h1>Start free.<br/><em>Pay when it works.</em></h1>
        <p className="sub-lead">Pick your plan. Pick your credits. Give a good idea room to grow.</p>
      </Reveal></div></section>
      <Pricing/>
      <section className="pad-sm"><div className="wrap"><div className="enterprise-panel" id="enterprise">
        <div><div className="eyebrow">Enterprise</div><h2>A setup that fits<br/><em>your team.</em></h2><p>Have specific requirements for access, credits, or deployment? Talk with us about the scope and terms your team needs.</p><a className="btn btn-coral" href="mailto:sales@appsbuiltwithai.com">Talk to sales</a></div>
        <div className="enterprise-details"><h3>Tell us what your team needs</h3><ul><li>Expected credit usage</li><li>Access requirements</li><li>Hosting and deployment needs</li><li>Security requirements</li></ul><p>Contact sales to discuss what we can support and agree the scope.</p></div>
      </div></div></section>
      <window.ProductComparison/>
      <FAQ/>
    </main>
  );
}
window.PricingPage = PricingPage;
