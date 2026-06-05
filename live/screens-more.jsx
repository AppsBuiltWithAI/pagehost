/* ============================================================
   More hub — Venue & Hotel, Map & Directions, Resources, Install, About
   ============================================================ */
const { useState, useEffect } = React;

function MoreScreen({ initialView, onInstall }) {
  const E = window.EVENT;
  const [view, setView] = useState(initialView || "menu");
  useEffect(() => { if (initialView) setView(initialView); }, [initialView]);

  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(E.venue.mapsQuery)}`;

  const back = () => setView("menu");
  const bar = () => (
    <div className="topbar">
      {view !== "menu"
        ? <button className="back-btn" onClick={back}><Icon name="chevronRight" size={18} style={{ transform: "rotate(180deg)" }} />Back</button>
        : <div className="wm" style={{ fontSize: 17 }}>More</div>}
      <div className="spacer" />
    </div>
  );

  /* ---------- MENU ---------- */
  if (view === "menu") {
    const rows = [
      { id: "venue", icon: "hotel", t: "Venue & Hotel", d: "The Whitley · Buckhead, Atlanta" },
      { id: "directions", icon: "navigation", t: "Map & Directions", d: "Get there · open in maps" },
      { id: "resources", icon: "link", t: "Resources & Links", d: "Vault, tools & references" },
      { id: "install", icon: "download", t: "Install This App", d: "Add to your home screen" },
      { id: "about", icon: "info", t: "About the Event", d: "What & who it's for" },
    ];
    return (
      <div className="scroll fadein">
        {bar()}
        <div className="pad">
          <ScreenHeader eyebrow="The Future Is Now" title="Everything else" />
          <div className="list-gap">
            {rows.map((r) => (
              <div className="menu-row" key={r.id} onClick={() => r.id === "install" ? (onInstall ? onInstall() : setView("install")) : setView(r.id)}>
                <div className="mi"><Icon name={r.icon} size={20} /></div>
                <div className="mt"><b>{r.t}</b><small>{r.d}</small></div>
                <Icon name="chevronRight" size={18} style={{ color: "rgba(255,255,255,.4)" }} />
              </div>
            ))}
          </div>

          <div className="divider" />
          <div style={{ textAlign: "center" }}>
            <img src="assets/logo-mark.png" alt="" style={{ width: 40, height: 40, margin: "0 auto 10px", opacity: .9 }} />
            <div style={{ fontWeight: 900, fontSize: 14 }}>Apps Built With AI Live</div>
            <div className="muted-2" style={{ fontSize: 11.5, marginTop: 3 }}>June 6–7, 2026 · Atlanta, GA · {E.hashtag}</div>
            <div className="muted-2" style={{ fontSize: 10.5, marginTop: 14 }}>© 2026 AppsBuiltWithAI. All rights reserved.</div>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- VENUE ---------- */
  if (view === "venue" || view === "directions") {
    return (
      <div className="scroll fadein">
        {bar()}
        <div className="pad">
          <ScreenHeader eyebrow="The Venue" title={view === "directions" ? "Getting there" : "The Whitley"} />
          <a className="map-static" href={mapsLink} target="_blank" rel="noopener" style={{ marginBottom: 16 }}>
            <div className="map-grid"></div>
            <div className="map-road"></div>
            <div className="map-pin"><Icon name="pin" size={28} fill="current" /></div>
            <div className="map-cap"><Icon name="navigation" size={14} /> Buckhead, Atlanta · Tap to open in Maps</div>
          </a>

          <div className="card addr-card">
            <div className="a1">{E.venue.full}</div>
            <div className="a2">{E.venue.address}<br />{E.venue.cityzip}</div>
            <div className="btn-row" style={{ marginTop: 14 }}>
              <a className="btn btn-ghost" style={{ flex: 1 }} href={mapsLink} target="_blank" rel="noopener"><Icon name="navigation" size={16} />Directions</a>
              <a className="btn btn-gold" style={{ flex: 1 }} href={E.venue.bookUrl} target="_blank" rel="noopener"><Icon name="hotel" size={16} />Book hotel</a>
            </div>
          </div>

          {view === "venue" && <React.Fragment>
            <p className="muted" style={{ fontSize: 14, lineHeight: 1.6, marginTop: 18 }}>{E.venue.blurb}</p>
            <div className="card" style={{ marginTop: 16, display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div className="mi" style={{ flex: "none", width: 38, height: 38, borderRadius: 11, display: "grid", placeItems: "center", background: "rgba(244,178,42,.16)", color: "var(--gold-300)" }}><Icon name="ticket" size={19} /></div>
              <div><div style={{ fontWeight: 800, fontSize: 14.5 }}>Attendee room rate</div><div className="muted" style={{ fontSize: 12.5, lineHeight: 1.45, marginTop: 3 }}>{E.venue.rateNote}</div></div>
            </div>
          </React.Fragment>}

          {view === "directions" && <React.Fragment>
            <h4 style={{ fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.5)", fontWeight: 800, margin: "22px 0 12px" }}>Good to know</h4>
            <div className="list-gap">
              {[["pin", "In the heart of Buckhead", "Steps from Lenox Square, Phipps Plaza, dining & nightlife."], ["navigation", "~30 min from ATL airport", "Hartsfield–Jackson via I-85 N / GA-400."], ["hotel", "Stay on-site", "Book inside our room block to wake up at the venue."]].map(([ic, t, d]) => (
                <div className="card" key={t} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: 14 }}>
                  <div className="mi" style={{ flex: "none", width: 36, height: 36, borderRadius: 10, display: "grid", placeItems: "center", background: "rgba(130,95,209,.2)", color: "#cdb8f5" }}><Icon name={ic} size={18} /></div>
                  <div><div style={{ fontWeight: 800, fontSize: 14 }}>{t}</div><div className="muted" style={{ fontSize: 12.5, lineHeight: 1.4, marginTop: 2 }}>{d}</div></div>
                </div>
              ))}
            </div>
          </React.Fragment>}
        </div>
      </div>
    );
  }

  /* ---------- RESOURCES ---------- */
  if (view === "resources") {
    return (
      <div className="scroll fadein">
        {bar()}
        <div className="pad">
          <ScreenHeader eyebrow="Resources & Links" title="Build kit" sub="Links referenced from the stage. More will be added throughout the event." />
          <div className="list-gap">
            {E.resources.map((r) => (
              <a className="card-lite" key={r.title} href={r.url} target="_blank" rel="noopener" style={{ display: "flex", alignItems: "center", gap: 13, padding: 15 }}>
                <div style={{ width: 40, height: 40, flex: "none", borderRadius: 12, background: "var(--purple-50)", display: "grid", placeItems: "center", color: "var(--purple-600)" }}><Icon name="link" size={18} /></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="lite-title" style={{ fontSize: 14.5 }}>{r.title}</div>
                  <div className="lite-sub" style={{ marginTop: 2 }}>{r.desc}</div>
                </div>
                <div style={{ textAlign: "right", flex: "none" }}><div style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--purple-500)" }}>{r.cat}</div><Icon name="arrowRight" size={16} style={{ color: "var(--ink-300)", marginTop: 6, marginLeft: "auto" }} /></div>
              </a>
            ))}
          </div>
          <div className="card" style={{ marginTop: 16, textAlign: "center", borderStyle: "dashed", borderColor: "rgba(255,255,255,.16)", background: "transparent" }}>
            <div className="muted" style={{ fontSize: 12.5, lineHeight: 1.5 }}><Icon name="sparkles" size={16} style={{ verticalAlign: "-3px", marginRight: 5, color: "var(--gold-500)" }} />Justin will drop more links here live. Check back during each session.</div>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- INSTALL ---------- */
  if (view === "install") {
    return (
      <div className="scroll fadein">
        {bar()}
        <div className="pad">
          <ScreenHeader eyebrow="Take it with you" title="Install the app" sub="Add Built With AI Live to your home screen — no App Store, no download. It opens full-screen like a native app." />
          <InstallSteps />
        </div>
      </div>
    );
  }

  /* ---------- ABOUT ---------- */
  if (view === "about") {
    return (
      <div className="scroll fadein">
        {bar()}
        <div className="pad">
          <ScreenHeader eyebrow="About" title="The Future Is Now" />
          <p className="muted" style={{ fontSize: 14.5, lineHeight: 1.65 }}>
            <b style={{ color: "#fff" }}>Apps Built With AI Live</b> is a 2-day, in-person experience where you stop just hearing about AI and start building with it. You'll leave with a real app in motion and a concrete plan to turn your best ideas into income streams.
          </p>
          <h4 style={{ fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.5)", fontWeight: 800, margin: "22px 0 12px" }}>What you'll lock in</h4>
          <div className="list-gap">
            {[["Your AI roadmap", "How apps and AI fit into your business model."], ["Your revenue plan", "How your apps and automations actually drive sales."], ["Your execution steps", "What you'll build and launch in the next 30–90 days."], ["Your support system", "The room, mentors, and peers who keep you moving."]].map(([t, d]) => (
              <div className="card" key={t} style={{ padding: 14, display: "flex", gap: 12, alignItems: "flex-start" }}>
                <Icon name="check" size={18} style={{ color: "var(--gold-500)", flex: "none", marginTop: 2 }} />
                <div><div style={{ fontWeight: 800, fontSize: 14 }}>{t}</div><div className="muted" style={{ fontSize: 12.5, lineHeight: 1.45, marginTop: 2 }}>{d}</div></div>
              </div>
            ))}
          </div>
          <p className="muted-2" style={{ fontSize: 10.5, lineHeight: 1.55, marginTop: 22 }}>
            This is a free companion app for ticketed attendees. Results mentioned across the event are not typical and your results may vary.
          </p>
        </div>
      </div>
    );
  }
  return null;
}

function InstallSteps() {
  const [tab, setTab] = useState("ios");
  const steps = tab === "ios"
    ? [["Open in Safari", "Make sure you're viewing this in Safari (not in another app's browser)."], ["Tap the Share button", "The square with an arrow at the bottom of the screen."], ["“Add to Home Screen”", "Scroll the share sheet and tap it."], ["Tap “Add”", "The app icon lands on your home screen — open it any time."]]
    : [["Open in Chrome", "View this page in Chrome on your Android device."], ["Open the ⋮ menu", "Top-right corner of Chrome."], ["“Add to Home screen”", "Tap it, then confirm the name."], ["Tap “Add”", "The icon appears on your home screen, full-screen and offline-ready."]];
  return (
    <div>
      <div className="day-tabs" style={{ marginBottom: 18 }}>
        <button className={"day-tab" + (tab === "ios" ? " active" : "")} onClick={() => setTab("ios")}><b>iPhone</b><small>Safari</small></button>
        <button className={"day-tab" + (tab === "android" ? " active" : "")} onClick={() => setTab("android")}><b>Android</b><small>Chrome</small></button>
      </div>
      <div className="card">
        <div className="step-list">
          {steps.map((s, i) => (
            <div className="step-line" key={i}>
              <div className="n">{i + 1}</div>
              <div className="t"><b style={{ fontWeight: 800 }}>{s[0]}</b><div className="muted" style={{ fontSize: 12.5, marginTop: 2, lineHeight: 1.4 }}>{s[1]}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { MoreScreen, InstallSteps });
