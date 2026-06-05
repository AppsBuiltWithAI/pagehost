/* ============================================================
   Agenda screen — Day 1/2, favorites, happening-now, detail sheet
   ============================================================ */
const { useState, useEffect } = React;

function AgendaScreen({ openSpeaker }) {
  const E = window.EVENT;
  const [dayIdx, setDayIdx] = useState(0);
  const [favs, setFavs] = useStored("abwai_favs", []);
  const [onlyFavs, setOnlyFavs] = useState(false);
  const [detail, setDetail] = useState(null);
  const [nowTick, setNowTick] = useState(Date.now());
  useEffect(() => { const id = setInterval(() => setNowTick(Date.now()), 30000); return () => clearInterval(id); }, []);

  const day = E.days[dayIdx];
  const spk = (id) => E.speakers.find((s) => s.id === id);
  const toggleFav = (key) => setFavs((f) => f.includes(key) ? f.filter((x) => x !== key) : [...f, key]);

  const isNow = (s) => {
    const now = new Date(nowTick);
    const start = new Date(`${dayDateISO(day)}T${s.start}:00-04:00`);
    const end = new Date(`${dayDateISO(day)}T${s.end}:00-04:00`);
    return now >= start && now < end;
  };

  let sessions = day.sessions;
  if (onlyFavs) sessions = sessions.filter((s) => favs.includes(day.id + s.start));
  const favCount = day.sessions.filter((s) => favs.includes(day.id + s.start)).length;

  return (
    <div className="scroll fadein">
      <div className="topbar"><div className="wm" style={{ fontSize: 17 }}>Agenda</div><div className="spacer" /><span className="pill pill-soft"><Icon name="clock" size={13} /> All times ET</span></div>

      <div className="pad">
        {/* Day toggle */}
        <div className="day-tabs">
          {E.days.map((d, i) => (
            <button key={d.id} className={"day-tab" + (i === dayIdx ? " active" : "")} onClick={() => setDayIdx(i)}>
              <b>{d.label}</b><small>{d.weekday} · {d.date.replace(", 2026", "")}</small>
            </button>
          ))}
        </div>

        <p className="muted" style={{ fontSize: 13, lineHeight: 1.45, margin: "14px 2px 0" }}>
          <b style={{ color: "#fff", fontWeight: 800 }}>{day.theme}</b><br />Sessions 10:00 AM – 5:00 PM Eastern
        </p>

        {/* Filter */}
        <div className="filter-row">
          <button className={"chip" + (!onlyFavs ? " on" : "")} onClick={() => setOnlyFavs(false)}>All sessions</button>
          <button className={"chip" + (onlyFavs ? " on" : "")} onClick={() => setOnlyFavs(true)}>
            <Icon name="star" size={12} fill={onlyFavs ? "current" : "none"} style={{ marginRight: 5, verticalAlign: "-1px" }} />My Agenda{favCount ? ` (${favCount})` : ""}
          </button>
        </div>

        {/* Sessions */}
        <div className="sessions">
          {sessions.length === 0 && (
            <div className="empty">
              <div className="ei"><Icon name="star" size={24} /></div>
              <p>No saved sessions yet.<br />Tap the ☆ on any session to build your personal agenda.</p>
            </div>
          )}
          {sessions.map((s) => {
            const key = day.id + s.start;
            const fav = favs.includes(key);
            const now = isNow(s);
            const isBreak = s.kind === "break";
            const names = s.speakers.map((id) => spk(id).name).join(", ");
            if (isBreak) {
              return (
                <div className="session is-break" key={key}>
                  <div className="rail"><div className="t1">{fmt12short(s.start)}</div><div className="t2">{fmt12short(s.end)}</div></div>
                  <div className="body">
                    <div className="break-card">
                      <span className="break-ico"><Icon name="coffee" size={15} /></span>
                      <span className="break-title">{s.title}</span>
                      <span className="break-room">{s.room}</span>
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <div className={"session" + (now ? " now" : "")} key={key}>
                <div className="rail">
                  <div className="t1">{fmt12short(s.start)}</div>
                  <div className="t2">{fmt12short(s.end)}</div>
                </div>
                <div className="body">
                  <div className={"scard tappable" + (now ? " now" : "")} onClick={() => setDetail(s)}>
                    <button className={"scard-star" + (fav ? " on" : "")} onClick={(e) => { e.stopPropagation(); toggleFav(key); }} aria-label="Save session">
                      <Icon name="star" size={15} fill={fav ? "current" : "none"} />
                    </button>
                    <div className="scard-top">
                      {now && <span className="now-flag">● Now</span>}
                      <span className={"kind kind-" + s.kind}>{s.kind}</span>
                    </div>
                    <h3 className="scard-title">{s.title}</h3>
                    {s.desc && <p className="scard-desc">{s.desc}</p>}
                    <div className="scard-foot">
                      {s.speakers.length > 0 ? (
                        <React.Fragment>
                          <div className="avatar-stack">
                            {s.speakers.map((id) => { const sp = spk(id); return <Avatar key={id} initials={sp.initials} seed={sp.id} size={28} photo={sp.photo} photoStyle={sp.photoStyle} />; })}
                          </div>
                          <span className="scard-spk-name">{names}</span>
                        </React.Fragment>
                      ) : (
                        <span className="scard-room"><Icon name="sparkles" size={13} style={{ opacity: .8 }} />{s.room}</span>
                      )}
                      <Icon name="chevronRight" size={17} className="scard-chev" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail sheet */}
      <Sheet open={!!detail} onClose={() => setDetail(null)}>
        {detail && (() => {
          const key = day.id + detail.start;
          const fav = favs.includes(key);
          return (
            <div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
                <span className={"kind kind-" + detail.kind}>{detail.kind}</span>
                <span className="pill pill-soft" style={{ fontSize: 11 }}>{day.label} · {day.weekday}</span>
              </div>
              <h2 style={{ fontSize: 23, fontWeight: 900, letterSpacing: "-.02em", lineHeight: 1.1, margin: 0 }}>{detail.title}</h2>
              <div className="s-meta" style={{ display: "flex", gap: 14, marginTop: 12, fontSize: 13, color: "rgba(255,255,255,.65)" }}>
                <span><Icon name="clock" size={14} style={{ verticalAlign: "-2px", marginRight: 5 }} />{fmt12(detail.start)} – {fmt12(detail.end)}</span>
                <span><Icon name="pin" size={14} style={{ verticalAlign: "-2px", marginRight: 5 }} />{detail.room}</span>
              </div>
              {detail.desc && <p className="sp-bio">{detail.desc}</p>}

              {detail.speakers.length > 0 && <React.Fragment>
                <h4>{detail.speakers.length > 1 ? "Speakers" : "Speaker"}</h4>
                <div className="list-gap">
                  {detail.speakers.map((id) => {
                    const sp = spk(id);
                    return (
                      <div className="att" key={id} onClick={() => { setDetail(null); openSpeaker(sp); }} style={{ cursor: "pointer" }}>
                        <Avatar initials={sp.initials} seed={sp.id} size={44} photo={sp.photo} photoStyle={sp.photoStyle} />
                        <div style={{ flex: 1 }}><div className="nm">{sp.name}</div><div className="mt">{sp.title}</div></div>
                        <Icon name="chevronRight" size={18} style={{ color: "rgba(255,255,255,.4)" }} />
                      </div>
                    );
                  })}
                </div>
              </React.Fragment>}

              <button className="btn btn-gold" style={{ marginTop: 22 }} onClick={() => { toggleFav(key); }}>
                <Icon name="star" size={17} fill={fav ? "current" : "none"} />{fav ? "Saved to My Agenda" : "Add to My Agenda"}
              </button>
            </div>
          );
        })()}
      </Sheet>
    </div>
  );
}

Object.assign(window, { AgendaScreen });
