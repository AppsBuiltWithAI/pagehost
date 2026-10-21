/* global React */
const { ArrowRight } = window.PoofPart1;

function AuthSidePanel({ pull, attrib, stats }) {
  return (
    <aside className="auth-side">
      <div className="auth-side-mark">
        <img src="assets/logo-mark.png" alt="AppsBuiltWithAI"/>
      </div>
      <div>
        <p className="auth-side-pull">{pull}</p>
        <div className="auth-side-attrib">
          <div className="av">{attrib.initials}</div>
          <div>
            <strong>{attrib.name}</strong> · {attrib.role}
          </div>
        </div>
        <div className="auth-side-stats">
          {stats.map((s, i) => (
            <div key={i} className="auth-side-stat">
              <div className="num">{s.num}</div>
              <div className="label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

function SignInPage() {
  const { AppLink } = window.PoofPart1;
  return <main className="sub-hero brand-page"><div className="wrap-tight">
    <div className="eyebrow">AppsBuiltWithAI workspace</div><h1>Welcome <em>back.</em></h1>
    <p className="sub-lead">Continue in the app to sign in and access your workspace.</p>
    <AppLink className="btn btn-coral btn-lg">Continue to the app <ArrowRight/></AppLink>
  </div></main>;
}

window.SignInPage = SignInPage;
window.AuthSidePanel = AuthSidePanel;
