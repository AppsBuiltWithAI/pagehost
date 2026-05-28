/* global React, ReactDOM, PoofD, PoofD_Pages1, PoofD_Pages2, PoofD_Pages3, PoofD_Pages4, PoofD_Plan, PoofD_Security, PoofD_Testing, PoofD_Launch, PoofD_Marketing, PoofD_Connectors, PoofD_Data, PoofD_Support */
const { useState, Sidebar, Topbar, ShareModal } = PoofD;
const { HomePage } = PoofD_Pages1;
const { EditorPage } = PoofD_Pages2;
const { TemplatesPage, AnalyticsPage } = PoofD_Pages3;
const { SettingsPage } = PoofD_Pages4;
const { PlanPage } = PoofD_Plan;
const { SecurityPage } = PoofD_Security;
const { TestingPage } = PoofD_Testing;
const { LaunchPage } = PoofD_Launch;
const { MarketingPage } = PoofD_Marketing;
const { ConnectorsPage } = PoofD_Connectors;
const { DataPage } = PoofD_Data;
const { SupportPage } = PoofD_Support;

function App() {
  const parseHash = () => {
    const raw = (window.location.hash || "#home").slice(1);
    const [p, sub] = raw.split(":");
    return { page: p || "home", sub: sub || null };
  };
  const [{ page, sub }, setRoute] = useState(parseHash);
  const [activeApp, setActiveApp] = useState(null);
  const [planData, setPlanData] = useState(null);
  const [showShare, setShowShare] = useState(false);

  const setPage = (p, sub) => {
    const h = "#" + p + (sub ? ":" + sub : "");
    window.location.hash = h;
    setRoute({ page: p, sub: sub || null });
    window.scrollTo({ top: 0 });
  };

  React.useEffect(() => {
    const onHash = () => setRoute(parseHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setShowShare(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const crumbs = (() => {
    switch (page) {
      case "home":       return ["Workspace", "Home"];
      case "plan":       return ["Workspace", "Plan a new app"];
      case "editor":     return ["Apps", (activeApp && activeApp.name) || "Untitled app"];
      case "templates":  return ["Workspace", "Templates"];
      case "testing":    return ["Workspace", "Testing", sub ? sub.charAt(0).toUpperCase() + sub.slice(1) : "Tests"];
      case "launch":     return ["Workspace", "Launch"];
      case "marketing":  return ["Workspace", "Marketing"];
      case "analytics":  return ["Workspace", "Analytics"];
      case "security":   return ["Workspace", "Security"];
      case "support":    return ["Account", "Support desk"];
      case "settings":   return ["Account", sub ? sub.charAt(0).toUpperCase() + sub.slice(1) : "Profile"];
      default:           return ["Workspace"];
    }
  })();

  return (
    <div className="shell">
      <Sidebar page={page} sub={sub} setPage={setPage} onShare={() => setShowShare(true)}/>
      <div className="main">
        {page !== "editor" && <Topbar crumbs={crumbs} setPage={setPage}/>}
        <div className="content">
          {page === "home"      && <HomePage setPage={setPage} setActiveApp={setActiveApp} onShare={() => setShowShare(true)}/>}
          {page === "plan"      && <PlanPage setPage={setPage} setActiveApp={setActiveApp} setPlanData={setPlanData}/>}
          {page === "editor"    && <EditorPage activeApp={activeApp} planData={planData}/>}
          {page === "templates" && <TemplatesPage setPage={setPage}/>}
          {page === "testing"   && <TestingPage key={sub || "tests"} initialTab={sub || "tests"}/>}
          {page === "launch"    && <LaunchPage/>}
          {page === "marketing" && <MarketingPage/>}
          {page === "analytics" && <AnalyticsPage/>}
          {page === "security"  && <SecurityPage/>}
          {page === "support"   && <SupportPage/>}
          {page === "settings"  && <SettingsPage key={sub || "profile"} initialTab={sub || "profile"}/>}
        </div>
      </div>
      {showShare && <ShareModal onClose={() => setShowShare(false)}/>}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);
