/* ============================================================
   Connect screen — build your profile, browse the room, contact
   ============================================================ */
const { useState, useEffect, useRef } = React;

const BLANK = { name: "", role: "", loc: "", building: "", website: "", email: "", phone: "", photo: "" };

function ConnectScreen() {
  const E = window.EVENT;
  const [profile, setProfile] = useStored("abwai_profile", null);
  const [connections, setConnections] = useStored("abwai_connections", []);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(BLANK);
  const [viewing, setViewing] = useState(null); // { person, isYou }
  const [query, setQuery] = useState("");
  const [onlyConnected, setOnlyConnected] = useState(false);
  const fileRef = useRef(null);

  const startEdit = () => { setViewing(null); setDraft(profile ? { ...BLANK, ...profile } : BLANK); setEditing(true); };
  const onPhoto = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => setDraft((d) => ({ ...d, photo: r.result }));
    r.readAsDataURL(f);
  };
  const save = () => { if (!draft.name.trim()) return; setProfile(draft); setEditing(false); };
  const initialsOf = (name) => (name || "").trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase() || "?";
  const toggleConn = (name) => setConnections((c) => c.includes(name) ? c.filter((x) => x !== name) : [...c, name]);

  return (
    <div className="scroll fadein">
      <div className="topbar"><div className="wm" style={{ fontSize: 17 }}>Connect</div><div className="spacer" />{connections.length > 0 && <span className="pill pill-gold" style={{ fontSize: 10.5 }}>{connections.length} connected</span>}</div>

      <div className="pad">
        <ScreenHeader eyebrow="Meet Your Room" title="Your network starts here" sub="The right DM or collab can move your app further than a year of solo work. Add your profile, then tap anyone to connect." />

        {/* Your profile / CTA */}
        {!profile && !editing && (
          <div className="card-lite" style={{ overflow: "hidden", padding: 0 }}>
            <div style={{ textAlign: "center", padding: "26px 22px" }}>
              <div style={{ width: 72, height: 72, margin: "0 auto 14px", borderRadius: 999, background: "var(--purple-50)", display: "grid", placeItems: "center", color: "var(--purple-500)", border: "1px dashed var(--purple-200)" }}><Icon name="camera" size={26} /></div>
              <div style={{ fontWeight: 900, fontSize: 18, letterSpacing: "-.01em", color: "var(--ink-900)" }}>Create your attendee profile</div>
              <p style={{ fontSize: 13, lineHeight: 1.5, margin: "8px 0 18px", color: "var(--ink-500)" }}>Add who you are, what you're building, and how to reach you. Saved on your device.</p>
              <button className="btn btn-gold" onClick={startEdit}><Icon name="plus" size={17} />Add my profile</button>
            </div>
          </div>
        )}

        {profile && !editing && (
          <div className="you-card" onClick={() => setViewing({ person: profile, isYou: true })} style={{ cursor: "pointer" }}>
            <Avatar initials={initialsOf(profile.name)} seed={profile.name} size={56} photo={profile.photo} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ fontWeight: 900, fontSize: 16 }}>{profile.name}</span><span className="pill pill-gold" style={{ fontSize: 9.5, padding: "3px 8px" }}>You</span></div>
              <div className="mt" style={{ fontSize: 12, color: "rgba(255,255,255,.72)", marginTop: 3 }}>{[profile.role, profile.loc].filter(Boolean).join(" · ") || "Tap to view your card"}</div>
              {profile.building && <div className="mt" style={{ fontSize: 12, color: "rgba(255,255,255,.55)", marginTop: 4, lineHeight: 1.35 }}>Building: {profile.building}</div>}
            </div>
            <button className="att connect" onClick={(e) => { e.stopPropagation(); startEdit(); }} style={{ alignSelf: "flex-start" }}>Edit</button>
          </div>
        )}

        {/* Edit form */}
        {editing && (
          <div className="card fadein">
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ position: "relative", width: 76, height: 76, margin: "0 auto" }} onClick={() => fileRef.current && fileRef.current.click()}>
                <Avatar initials={draft.name ? initialsOf(draft.name) : ""} seed={draft.name || "you"} size={76} photo={draft.photo} />
                <div style={{ position: "absolute", right: -2, bottom: -2, width: 30, height: 30, borderRadius: 999, background: "var(--gold-500)", color: "var(--ink-900)", display: "grid", placeItems: "center", border: "2px solid #190a3d" }}><Icon name="camera" size={15} /></div>
              </div>
              <input ref={fileRef} type="file" accept="image/*" onChange={onPhoto} style={{ display: "none" }} />
              <div className="muted-2" style={{ fontSize: 11, marginTop: 8 }}>Tap to add a photo</div>
            </div>
            <div className="field"><label>Name</label><input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="Your name" /></div>
            <div className="field" style={{ display: "flex", gap: 12 }}>
              <div style={{ flex: 1 }}><label>Role</label><input value={draft.role} onChange={(e) => setDraft({ ...draft, role: e.target.value })} placeholder="Founder, coach…" /></div>
              <div style={{ flex: 1 }}><label>Location</label><input value={draft.loc} onChange={(e) => setDraft({ ...draft, loc: e.target.value })} placeholder="City, ST" /></div>
            </div>
            <div className="field"><label>What you're building</label><textarea value={draft.building} onChange={(e) => setDraft({ ...draft, building: e.target.value })} placeholder="The app or idea you're here to build…" /></div>

            <div style={{ fontSize: 11.5, fontWeight: 800, letterSpacing: ".04em", textTransform: "uppercase", color: "var(--gold-500)", margin: "4px 0 12px" }}>How people reach you</div>
            <div className="field"><label>Email</label><input type="email" value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} placeholder="you@email.com" /></div>
            <div className="field"><label>Website</label><input value={draft.website} onChange={(e) => setDraft({ ...draft, website: e.target.value })} placeholder="yoursite.com" /></div>
            <div className="field"><label>Phone</label><input type="tel" value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} placeholder="+1 (555) 000-0000" /></div>

            <div className="btn-row">
              <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setEditing(false)}>Cancel</button>
              <button className="btn btn-gold" style={{ flex: 2, opacity: draft.name.trim() ? 1 : .5 }} onClick={save}><Icon name="check" size={17} />Save profile</button>
            </div>
          </div>
        )}

        {/* Directory */}
        <div className="section-gap">
          <div className="sec-head"><h2>In the room</h2><span className="muted-2" style={{ fontSize: 11.5 }}>{E.attendees.length} builders</span></div>

          {/* Search */}
          <div className="search-wrap">
            <Icon name="search" size={18} className="search-ico" />
            <input className="search-input" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name, what they're building, city…" />
            {query && <button className="search-clear" onClick={() => setQuery("")} aria-label="Clear"><Icon name="x" size={15} /></button>}
          </div>
          <div className="filter-row" style={{ marginTop: 10 }}>
            <button className={"chip" + (!onlyConnected ? " on" : "")} onClick={() => setOnlyConnected(false)}>Everyone</button>
            <button className={"chip" + (onlyConnected ? " on" : "")} onClick={() => setOnlyConnected(true)}>
              <Icon name="check" size={12} style={{ marginRight: 5, verticalAlign: "-1px" }} />My connections{connections.length ? ` (${connections.length})` : ""}
            </button>
          </div>

          {(() => {
            const q = query.trim().toLowerCase();
            let list = E.attendees;
            if (onlyConnected) list = list.filter((a) => connections.includes(a.name));
            if (q) list = list.filter((a) => [a.name, a.role, a.loc, a.building].filter(Boolean).join(" ").toLowerCase().includes(q));
            if (list.length === 0) {
              return (
                <div className="empty" style={{ paddingTop: 30 }}>
                  <div className="ei"><Icon name={onlyConnected ? "users" : "search"} size={24} /></div>
                  <p>{onlyConnected ? "You haven't connected with anyone yet. Tap a builder to view their card and connect." : <React.Fragment>No one matches “{query}”.<br />Try a name, a city, or what they're building.</React.Fragment>}</p>
                </div>
              );
            }
            return (
              <div className="list-gap" style={{ marginTop: 14 }}>
                {list.map((a) => {
                  const connected = connections.includes(a.name);
                  return (
                    <div className="att tappable" key={a.name} onClick={() => setViewing({ person: a, isYou: false })}>
                      <Avatar initials={a.initials} seed={a.name} size={46} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                          <span className="nm">{a.name}</span>
                          {connected && <span style={{ display: "inline-flex", color: "#5be0a0" }}><Icon name="check" size={14} /></span>}
                        </div>
                        <div className="mt">{a.role} · {a.loc}</div>
                        <div className="mt" style={{ color: "rgba(255,255,255,.42)" }}>Building: {a.building}</div>
                      </div>
                      <Icon name="chevronRight" size={18} className="chev" />
                    </div>
                  );
                })}
              </div>
            );
          })()}
          <p className="muted-2" style={{ fontSize: 11, textAlign: "center", margin: "18px 0 0", lineHeight: 1.5 }}>
            This is a preview directory. At the event, real attendees who add a profile will show up here.
          </p>
        </div>
      </div>

      {/* Profile sheet */}
      <Sheet open={!!viewing} onClose={() => setViewing(null)}>
        {viewing && (() => {
          const p = viewing.person;
          const isYou = viewing.isYou;
          const connected = connections.includes(p.name);
          const initials = isYou ? initialsOf(p.name) : p.initials;
          const contacts = [
            p.email && { icon: "mail", label: "Email", val: p.email, href: "mailto:" + p.email },
            p.website && { icon: "globe", label: "Website", val: p.website, href: (p.website.startsWith("http") ? p.website : "https://" + p.website) },
            p.phone && { icon: "phone", label: "Call", val: p.phone, href: "tel:" + p.phone.replace(/[^+\d]/g, "") },
          ].filter(Boolean);
          return (
            <div>
              <div className="sp-hero">
                <Avatar className="av" initials={initials} seed={p.name} size={70} photo={p.photo} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <h2>{p.name}</h2>
                    {isYou && <span className="pill pill-gold" style={{ fontSize: 9.5, padding: "3px 8px" }}>You</span>}
                  </div>
                  <div className="rl">{[p.role, p.loc].filter(Boolean).join(" · ")}</div>
                </div>
              </div>
              {p.building && <p className="sp-bio"><span style={{ color: "rgba(255,255,255,.5)" }}>Building — </span>{p.building}</p>}

              {/* primary action */}
              {isYou ? (
                <button className="btn btn-gold" style={{ marginTop: 18 }} onClick={() => { startEdit(); }}><Icon name="info" size={16} />Edit my profile</button>
              ) : (
                <div className="contact-row">
                  <button className={"contact-btn primary" + (connected ? " done" : "")} onClick={() => toggleConn(p.name)} style={connected ? { background: "rgba(18,183,106,.16)", color: "#5be0a0", boxShadow: "none" } : null}>
                    <span className="ci"><Icon name={connected ? "check" : "plus"} size={18} /></span>{connected ? "Connected" : "Connect"}
                  </button>
                  {contacts.map((c) => (
                    <a key={c.label} className="contact-btn" href={c.href} target={c.icon === "globe" ? "_blank" : undefined} rel="noopener">
                      <span className="ci"><Icon name={c.icon} size={18} /></span>{c.label}
                    </a>
                  ))}
                </div>
              )}

              {/* contact details */}
              {contacts.length > 0 && <React.Fragment>
                <h4>{isYou ? "Your contact info" : "Contact"}</h4>
                <div style={{ marginBottom: 6 }}>
                  {contacts.map((c) => (
                    <a key={c.label} className="sheet-contact-line" href={c.href} target={c.icon === "globe" ? "_blank" : undefined} rel="noopener">
                      <span className="sci"><Icon name={c.icon} size={16} /></span>
                      <span className="scv">{c.val}</span>
                      <Icon name="arrowRight" size={15} style={{ marginLeft: "auto", color: "rgba(255,255,255,.4)" }} />
                    </a>
                  ))}
                </div>
              </React.Fragment>}

              {!isYou && contacts.length === 0 && (
                <p className="muted-2" style={{ fontSize: 12, textAlign: "center", margin: "18px 0 4px" }}>No contact details shared yet.</p>
              )}
            </div>
          );
        })()}
      </Sheet>
    </div>
  );
}

Object.assign(window, { ConnectScreen });
