/* global React */
function ComparePage() {
  const { Nav, AppLink, ArrowRight } = window.PoofPart1;
  const { Footer } = window.PoofPart3;
  const Comparison = window.ProductComparison;
  return <><Nav/><main className="brand-page compare-page"><section className="sub-hero"><div className="wrap-tight"><div className="eyebrow">A fair comparison</div><h1>Different ways<br/><em>to build your idea.</em></h1><p className="sub-lead">Lovable, Replit, and a developer can all help you build software. Here is how the approaches compare.</p><AppLink className="btn btn-coral">Explore AppsBuiltWithAI <ArrowRight/></AppLink></div></section><Comparison/></main><Footer/></>;
}
window.ComparePage = ComparePage;
