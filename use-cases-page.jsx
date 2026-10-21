/* global React */
function UseCasesPage() {
  const { AppLink, ArrowRight, Reveal } = window.PoofPart1;
  const cases = [
    ["Services", <>Make it easier<br/><em>to book.</em></>, "Help customers choose a service, request a time, and leave the details you need.", "Fieldwork, a service booking website with an appointment picker", "booking"],
    ["Operations", <>Give your team<br/><em>one clear view.</em></>, "Bring a focused workflow out of a spreadsheet and into an app designed around the job.", "Northline, an operations dashboard with inventory and a filterable order list", "operations"],
    ["Independent businesses", <>Put your work<br/><em>on the web.</em></>, "Create a site that explains what you do and helps the right people get in touch.", "A portfolio and inquiry page for a design studio", "studio"],
  ];
  return <main className="brand-page">
    <section className="sub-hero"><div className="wrap-tight"><Reveal><div className="eyebrow">Use cases</div><h1>Your idea.<br/><em>Something people can use.</em></h1><p className="sub-lead">Start with a useful job and build around it. These illustrative examples show a few directions you could take.</p></Reveal></div></section>
    <section className="pad"><div className="wrap use-case-list">{cases.map(([label, title, body, example, id], index) => <article className="use-case-row" key={id} id={id}>
      <div><div className="step-tag"><span className="step-num">0{index + 1}</span><span className="step-lbl">{label}</span></div><h2>{title}</h2><p>{body}</p><p className="launch-note">Example: {example}.</p><AppLink className="feature-link">Start your own app <ArrowRight/></AppLink></div>
      <div className={"use-case-outcome outcome-" + id}><span className="example-label">Illustrative example</span><a href={"examples/" + id + ".html"} target="_blank" rel="noopener noreferrer"><img src={"assets/examples/" + id + ".jpg"} width="1280" height="820" loading="lazy" alt={example}/><span className="feature-link">View example <ArrowRight/><span className="sr-only"> (opens in a new tab)</span></span></a></div>
    </article>)}</div></section>
  </main>;
}
window.UseCasesPage = UseCasesPage;
