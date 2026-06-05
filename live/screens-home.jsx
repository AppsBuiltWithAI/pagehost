/* ============================================================
   Home screen — overview, countdown, now/next, quick nav
   ============================================================ */
const { useState, useEffect } = React;

function useCountdown(targetISO) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const target = new Date(targetISO).getTime();
  let diff = Math.max(0, target - now);
  const d = Math.floor(diff / 86400000); diff -= d * 86400000;
  const h = Math.floor(diff / 3600000); diff -= h * 3600000;
  const m = Math.floor(diff / 60000); diff -= m * 60000;
  const s = Math.floor(diff / 1000);
  return { d, h, m, s, done: target - now <= 0 };
}

/* find the live/next session across both days, based on real clock */
function liveStatus(EVENT) {
  const now = new Date();
  for (const day of EVENT.days) {
    for (const ses of day.sessions) {
      const start = new Date(`${dayDateISO(day)}T${ses.start}:00-04:00`);
      const end = new Date(`${dayDateISO(day)}T${ses.end}:00-04:00`);
      if (now >= start && now < end) return { state: "now", day, ses };
    }
  }
  // next upcoming
  for (const day of EVENT.days) {
    for (const ses of day.sessions) {
      const start = new Date(`${dayDateISO(day)}T${ses.start}:00-04:00`);
      if (now < start) return { state: "next", day, ses };
    }
  }
  return { state: "ended" };
}
function dayDateISO(day) {
  // map "June 6, 2026" -> 2026-06-06
  return day.id === "d1" ? "2026-06-06" : "2026-06-07";
}

function HomeScreen({ go, openSpeaker, openMore }) {
  const E = window.EVENT;
  const cd = useCountdown(E.startISO);
  const status = liveStatus(E);
  const firstDay = E.days[0];

  const spk = (id) => E.speakers.find((s) => s.id === id);

  return (
    <div className="scroll fadein">
      {/* Top brand bar */}
      <div className="topbar">
        <img className="mark" src="assets/logo-mark.png" alt="" />
        <div className="wm">Built With AI Live<small>THE FUTURE IS NOW</small></div>
        <div className="spacer" />
        <div className="live"><span className="dot" />{cd.done ? "Live" : "Soon"}</div>
      </div>

      <div className="pad">
        {/* Hero */}
        <div className="hero-card">
          <div className="glow" />
          <div className="eyebrow">Atlanta, GA · June 6–7, 2026</div>
          <h1>
            The Future Is
            <span className="future">Now</span>
          </h1>
          <p className="muted" style={{ fontSize: 13.5, lineHeight: 1.5, margin: "8px 0 0", position: "relative" }}>
            Two days to turn your idea into an app — and an asset. No code required.
          </p>
          <div className="hero-meta">
            <span className="pill pill-soft"><Icon name="calendar" size={13} /> 2-Day Intensive</span>
            <span className="pill pill-soft"><Icon name="hotel" size={13} /> The Whitley</span>
            <span className="pill pill-soft"><Icon name="users" size={13} /> 7 Speakers</span>
          </div>

          {/* Countdown */}
          {!cd.done ? (
            <div className="countdown">
              {[["Days", cd.d], ["Hrs", cd.h], ["Min", cd.m], ["Sec", cd.s]].map(([l, v]) => (
                <div className="cd-unit" key={l}><div className="v">{String(v).padStart(2, "0")}</div><span className="l">{l}</span></div>
              ))}
            </div>
          ) : (
            <div className="countdown"><div className="cd-unit" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}><Icon name="sparkles" size={16} style={{ color: "var(--gold-500)", flex: "none" }} /><div className="v" style={{ fontSize: 16, fontFamily: "var(--font-sans)" }}>We're live in Atlanta</div></div></div>
          )}
        </div>

        {/* Now / Next */}
        <div className="section-gap">
          <div className="nownext" onClick={() => go("agenda")} role="button">
            <div className="nn-time">
              {status.state === "ended" ? <Icon name="sparkles" size={22} style={{ color: "var(--gold-500)" }} /> : <React.Fragment>{fmt12short(status.ses.start)}<br /><span className="muted-2" style={{ fontSize: 10 }}>{status.day.label}</span></React.Fragment>}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="nn-label">{status.state === "now" ? "Happening now" : status.state === "next" ? "Up next" : "That's a wrap"}</div>
              <div className="nn-title">{status.state === "ended" ? "Thanks for building with us!" : status.ses.title}</div>
            </div>
            <Icon name="chevronRight" size={20} style={{ color: "rgba(255,255,255,.5)", flex: "none" }} />
          </div>
        </div>

        {/* Quick nav */}
        <div className="section-gap quick-grid">
          <div className="quick" onClick={() => go("agenda")} role="button">
            <div className="qi"><Icon name="calendar" size={19} /></div>
            <div><div className="qt">Schedule</div><div className="qd">2 days · Sat & Sun</div></div>
          </div>
          <div className="quick" onClick={() => go("speakers")} role="button">
            <div className="qi"><Icon name="mic" size={19} /></div>
            <div><div className="qt">Speakers</div><div className="qd">Meet the line-up</div></div>
          </div>
          <div className="quick q-gold" onClick={() => go("connect")} role="button">
            <div className="qi"><Icon name="users" size={19} /></div>
            <div><div className="qt">Connect</div><div className="qd">Meet your room</div></div>
          </div>
          <div className="quick" onClick={() => go("more")} role="button">
            <div className="qi"><Icon name="pin" size={19} /></div>
            <div><div className="qt">Venue & More</div><div className="qd">The Whitley · maps</div></div>
          </div>
        </div>

        {/* Day 1 preview */}
        <div className="section-gap">
          <div className="sec-head">
            <h2>{firstDay.label} kicks off</h2>
            <span className="link" onClick={() => go("agenda")}>Full agenda →</span>
          </div>
          <p className="muted" style={{ fontSize: 12.5, margin: "-6px 0 14px" }}>{firstDay.weekday}, {firstDay.date} · {firstDay.theme}</p>
          <div className="list-gap">
            {firstDay.sessions.filter((s) => s.speakers && s.speakers.length > 0).slice(0, 3).map((s, i) => (
              <div className="card card-link" key={i} onClick={() => go("agenda")} style={{ display: "flex", gap: 12, alignItems: "center", padding: 14 }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700, color: "var(--gold-300)", width: 46, flex: "none" }}>{fmt12short(s.start)}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: 14, letterSpacing: "-.01em", lineHeight: 1.2 }}>{s.title}</div>
                  {s.speakers[0] && <div className="muted-2" style={{ fontSize: 11.5, marginTop: 3 }}>{spk(s.speakers[0]).name}</div>}
                </div>
                <span className={"kind kind-" + s.kind}>{s.kind}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className="section-gap">
          <div className="card-lite">
            <div className="lite-head">
              <div className="li" style={{ background: "var(--purple-100)", color: "var(--purple-600)" }}><Icon name="link" size={18} /></div>
              <div><div className="lite-title">Resources & Links</div><div className="lite-sub">What Justin references on stage</div></div>
              <span className="link" onClick={() => openMore("resources")}>View all</span>
            </div>
            {E.resources.slice(0, 3).map((r) => (
              <a className="lres" key={r.title} href={r.url} target="_blank" rel="noopener">
                <div className="li"><Icon name="link" size={16} /></div>
                <div className="lt"><b>{r.title}</b><small>{r.cat}</small></div>
                <Icon name="arrowRight" size={16} className="chev" />
              </a>
            ))}
          </div>
        </div>

        {/* Exclusive offers — coming soon */}
        <div className="section-gap">
          <div className="card-lite offers">
            <div className="o-glow"></div>
            <div className="lite-head" style={{ marginBottom: 4 }}>
              <div className="li" style={{ background: "var(--gold-50)", color: "var(--gold-600)" }}><Icon name="gift" size={18} /></div>
              <div><div className="lite-title">Exclusive Offers</div><div className="lite-sub">Attendee-only deals & drops</div></div>
              <span className="pill-soon" style={{ marginLeft: "auto" }}>Coming soon</span>
            </div>
            <p style={{ fontSize: 12.5, color: "var(--ink-500)", lineHeight: 1.5, margin: "8px 0 0" }}>
              Special offers, tool discounts, and surprise announcements will unlock here during the event. Keep this open.
            </p>
          </div>
        </div>

        {/* Questions / help */}
        <div className="section-gap">
          <a className="card-lite" href="https://support.appsbuiltwithai.com" target="_blank" rel="noopener" style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 11, display: "grid", placeItems: "center", flex: "none", background: "var(--purple-100)", color: "var(--purple-600)" }}><Icon name="help" size={18} /></div>
            <div style={{ flex: 1 }}><div className="lite-title" style={{ fontSize: 15 }}>Questions?</div><div className="lite-sub">Get help from the team</div></div>
            <Icon name="chevronRight" size={18} style={{ color: "var(--ink-300)" }} />
          </a>
        </div>

        {/* tagline footer */}
        <div className="section-gap" style={{ textAlign: "center", padding: "10px 0 6px" }}>
          <div className="build-scale">
            <span>Build</span><span className="dot">·</span><span>Launch</span><span className="dot">·</span><span>Scale</span>
          </div>
          <div className="muted-2" style={{ fontSize: 11.5, marginTop: 12 }}>June 6–7, 2026 · Atlanta, GA · {E.hashtag}</div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { HomeScreen, useCountdown, liveStatus, dayDateISO });
