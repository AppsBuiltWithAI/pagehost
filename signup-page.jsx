/* global React */
const { ArrowRight } = window.PoofPart1;

function SignUpPage() {
  const { AppLink } = window.PoofPart1;
  return <main className="sub-hero brand-page"><div className="wrap-tight">
    <div className="eyebrow">AppsBuiltWithAI workspace</div><h1>Start your <em>next app.</em></h1>
    <p className="sub-lead">Continue in the app to get started.</p>
    <AppLink className="btn btn-coral btn-lg">Continue to the app <ArrowRight/></AppLink>
  </div></main>;
}

window.SignUpPage = SignUpPage;
