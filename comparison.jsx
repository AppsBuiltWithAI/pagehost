/* global React */
function ProductComparison() {
  const products = ["AppsBuiltWithAI", "Lovable", "Replit", "Hiring a developer"];
  const rows = [
    ["Getting started", "A guided conversation", "Natural-language building", "Natural-language building", "A brief and agreed scope"],
    ["Plan the work", "Built-in planning", "Planning tools", "Plan mode", "Agree the planning process"],
    ["Build and edit", "Describe, review, and refine", "Full-stack app building", "App building and developer tools", "Custom implementation"],
    ["Check your app", "AI testing and security review", "Testing and security tools", "App Testing and security tools", "Agree test coverage and review"],
    ["Publish", "Publishing and domain options", "Hosting and custom domains", "Deployment options", "Agree hosting and ongoing support"],
    ["Marketing", "Coming soon", "Growth tools; see product docs", "Growth and analytics tools", "Scope marketing separately"],
    ["A good fit when", "You want a guided app workflow", "You want a conversational full-stack builder", "You want AI building with developer tools", "You need custom work and expert involvement"],
  ];
  return <section className="pad comparison-section" id="comparison"><div className="wrap">
    <div className="sec-head"><div className="eyebrow">Choose what works for you</div><h2>Compare<br/><em>the whole journey.</em></h2><p>AI builders share many capabilities. Look at the workflow, the support you need, and what is available today.</p></div>
    <div className="comparison-scroll" role="region" aria-label="Product comparison, scroll horizontally on small screens" tabIndex="0">
      <table className="launch-comparison"><caption className="sr-only">AppsBuiltWithAI, Lovable, Replit, and hiring a developer</caption><thead><tr><th scope="col">What matters</th>{products.map(product => <th scope="col" key={product}>{product}</th>)}</tr></thead><tbody>{rows.map(([label, ...values]) => <tr key={label}><th scope="row">{label}</th>{values.map((value, index) => <td key={products[index]}>{label === "Marketing" && index === 0 ? <span className="availability-badge">{value}</span> : value}</td>)}</tr>)}</tbody></table>
    </div>
    <p className="comparison-sources">Product documentation checked October 19, 2026. Capabilities and limits vary by plan. Sources: <a href="https://docs.lovable.dev/introduction/welcome" target="_blank" rel="noopener noreferrer">Lovable documentation<span className="sr-only"> (opens in a new tab)</span></a> and <a href="https://docs.replit.com/features/agent/overview" target="_blank" rel="noopener noreferrer">Replit documentation<span className="sr-only"> (opens in a new tab)</span></a>. Developer services depend on your agreement. AppsBuiltWithAI marketing tools are coming soon.</p>
  </div></section>;
}
window.ProductComparison = ProductComparison;
