/* ============================================================
   App shell — tab routing, install banner, speaker sheet
   ============================================================ */
const { useState, useRef, useCallback } = React;

function TabBar({ active, onChange }) {
  const tabs = [
    { id: "home", label: "Home", icon: "home" },
    { id: "agenda", label: "Agenda", icon: "calendar" },
    { id: "speakers", label: "Speakers", icon: "mic" },
    { id: "connect", label: "Connect", icon: "users" },
    { id: "more", label: "More", icon: "grid" },
  ];
  return (
    <nav className="tabbar">
      {tabs.map((t) => (
        <button key={t.id} className={"tab" + (active === t.id ? " active" : "")} onClick={() => onChange(t.id)}>
          <Icon name={t.icon} size={23} fill={active === t.id ? "current" : "none"} stroke={active === t.id ? 0 : 2} />
          <span>{t.label}</span>
          <div className="tabdot" />
        </button>
      ))}
    </nav>
  );
}

function InstallBanner({ onHow, onClose }) {
  return (
    <div className="install-banner">
      <img className="ib-mark" src="assets/logo-mark.png" alt="" />
      <div className="ib-txt"><b>Add to your home screen</b><div className="muted" style={{ fontSize: 11.5, marginTop: 2 }}>Open it like an app — no App Store needed.</div></div>
      <button className="btn btn-gold" style={{ width: "auto", padding: "9px 14px", fontSize: 12.5, flex: "none" }} onClick={onHow}>How</button>
      <button className="ib-close" onClick={onClose} aria-label="Dismiss"><Icon name="x" size={15} /></button>
    </div>
  );
}

function App() {
  const [tab, setTab] = useState("home");
  const [speaker, setSpeaker] = useState(null);
  const [moreView, setMoreView] = useState("menu");
  const [bannerDismissed, setBannerDismissed] = useStored("abwai_install_dismissed", false);
  const scrollRef = useRef(null);

  const go = useCallback((t) => {
    if (t === "more") setMoreView("menu");
    setTab(t);
    // scroll the new screen to top
    requestAnimationFrame(() => { const el = document.querySelector(".scroll"); if (el) el.scrollTop = 0; });
  }, []);

  const openInstall = () => { setMoreView("install"); setTab("more"); };
  const openMore = useCallback((view) => {
    setMoreView(view || "menu"); setTab("more");
    requestAnimationFrame(() => { const el = document.querySelector(".scroll"); if (el) el.scrollTop = 0; });
  }, []);

  const screen = (() => {
    switch (tab) {
      case "home": return <HomeScreen go={go} openSpeaker={setSpeaker} openMore={openMore} />;
      case "agenda": return <AgendaScreen openSpeaker={setSpeaker} />;
      case "speakers": return <SpeakersScreen openSpeaker={setSpeaker} />;
      case "connect": return <ConnectScreen />;
      case "more": return <MoreScreen initialView={moreView} onInstall={openInstall} />;
      default: return null;
    }
  })();

  const showBanner = !bannerDismissed && !speaker && !(tab === "more" && moreView === "install");

  return (
    <div className="app">
      {/* keyed so each screen remounts & animates */}
      <React.Fragment key={tab}>{screen}</React.Fragment>

      {showBanner && (
        <InstallBanner onHow={() => { openInstall(); setBannerDismissed(true); }} onClose={() => setBannerDismissed(true)} />
      )}

      <SpeakerSheet speaker={speaker} onClose={() => setSpeaker(null)} go={go} />
      <TabBar active={tab} onChange={go} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
