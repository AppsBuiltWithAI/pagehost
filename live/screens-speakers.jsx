/* ============================================================
   Speakers screen + shared SpeakerSheet (rendered at app level)
   ============================================================ */
function SpeakersScreen({ openSpeaker }) {
  const E = window.EVENT;
  const host = E.speakers.filter((s) => s.tag === "Host");
  const rest = E.speakers.filter((s) => s.tag !== "Host");
  return (
    <div className="scroll fadein">
      <div className="topbar"><div className="wm" style={{ fontSize: 17 }}>Speakers</div></div>
      <div className="pad">
        <ScreenHeader eyebrow="Meet Your Speakers" title="Builders & legends" sub="Learn from leaders quietly building the next wave of profitable apps." />

        {host.map((s) => (
          <div className="card card-link fadein" key={s.id} onClick={() => openSpeaker(s)} style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 16, padding: 16 }}>
            <Avatar initials={s.initials} seed={s.id} size={64} photo={s.photo} photoStyle={s.photoStyle} />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span className="nm" style={{ fontWeight: 900, fontSize: 17 }}>{s.name}</span><span className="pill pill-gold" style={{ fontSize: 9.5, padding: "3px 8px" }}>{s.tag}</span></div>
              <div className="mt" style={{ fontSize: 12, color: "rgba(255,255,255,.6)", marginTop: 4, lineHeight: 1.35 }}>{s.title}</div>
            </div>
            <Icon name="chevronRight" size={18} style={{ color: "rgba(255,255,255,.4)" }} />
          </div>
        ))}

        <div className="spk-grid">
          {rest.map((s) => (
            <div className="spk" key={s.id} onClick={() => openSpeaker(s)}>
              <div className="ph">
                {s.photo ? <img className="av-photo" src={s.photo} alt="" style={{ position: "absolute", inset: 0, ...(s.photoStyle || {}) }} /> : <span className="av">{s.initials}</span>}
              </div>
              <div className="info">
                <div className="nm">{s.name}</div>
                <div className="rl">{s.title}</div>
              </div>
            </div>
          ))}
        </div>

        <p className="muted-2" style={{ fontSize: 11.5, textAlign: "center", margin: "22px 0 0", lineHeight: 1.5 }}>
          More speakers to be announced.<br />Tap any speaker for their full bio & sessions.
        </p>
      </div>
    </div>
  );
}

function SpeakerSheet({ speaker, onClose, go }) {
  const E = window.EVENT;
  if (!speaker) return null;
  const sessions = [];
  E.days.forEach((d) => d.sessions.forEach((s) => {
    if (s.speakers && s.speakers.includes(speaker.id)) sessions.push({ ...s, day: d });
  }));
  return (
    <Sheet open={!!speaker} onClose={onClose}>
      <div className="sp-hero">
        <Avatar className="av" initials={speaker.initials} seed={speaker.id} size={70} photo={speaker.photo} photoStyle={speaker.photoStyle} />
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <h2>{speaker.name}</h2>
          </div>
          <div className="rl">{speaker.title}</div>
        </div>
      </div>
      <p className="sp-bio">{speaker.bio}</p>

      {sessions.length > 0 && <React.Fragment>
        <h4>{sessions.length === 1 ? "Session" : "Sessions"}</h4>
        <div className="list-gap">
          {sessions.map((s, i) => (
            <div className="att" key={i} onClick={() => { onClose(); go("agenda"); }} style={{ cursor: "pointer" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700, color: "var(--gold-300)", width: 44, flex: "none", textAlign: "center" }}>{fmt12short(s.start)}<div className="muted-2" style={{ fontSize: 9.5 }}>{s.day.label}</div></div>
              <div style={{ flex: 1 }}><div className="nm" style={{ fontSize: 14 }}>{s.title}</div><div className="mt">{s.room}</div></div>
              <Icon name="chevronRight" size={18} style={{ color: "rgba(255,255,255,.4)" }} />
            </div>
          ))}
        </div>
      </React.Fragment>}
    </Sheet>
  );
}

Object.assign(window, { SpeakersScreen, SpeakerSheet });
