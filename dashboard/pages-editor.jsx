/* global React, PoofD */
const { useState, useEffect, useRef, Ic } = PoofD;

/* ================================================================
   EDITOR — chat + live preview, with full toolbar, message actions,
   checkpoints, insight cards, build/chat modes, element inspector.
   ================================================================ */
function EditorPage({ activeApp, planData }) {
  const app = activeApp || { name: "Untitled app", emoji: "✨", url: "draft.appsbuilt.ai", thumb: "thumb-bakery" };

  const seededFromPlan = planData ? [
    { kind: "user", text: planData.seedPrompt.replace(/\n/g, "<br/>"), time: "from PRD", v: "v1" },
    { kind: "ai",   text: `Got it. Building <strong>${planData.reqs?.title || app.name}</strong> from your PRD — ${planData.reqs?.features.filter(f => f.priority === "must").length || 0} must-haves first.`, time: "now", v: "v1",
      card: { title: "Composing layout…", sub: `For ${planData.avatar.name} · ${planData.pains.length} pains addressed` }
    },
  ] : null;

  const [messages, setMessages] = useState(seededFromPlan || [
    { kind: "checkpoint", v: "v1", label: "Initial scaffold", time: "10:14am", files: 12 },
    { kind: "user", text: 'A pickup-order page for my bakery. Soft and warm — earthy palette.', time: "10:14am", v: "v1" },
    { kind: "ai",   text: `Got it. Building <strong>${app.name}</strong> with a warm palette — pickup time picker, today's menu, and an order summary card.`, time: "10:14am", v: "v1",
      card: { title: "Layout ready", sub: "Pages: Home, Order, Confirmation · 8 files changed" }
    },
    { kind: "user", text: "Also add a confirmation email — text only, friendly tone.", time: "10:21am", v: "v2" },
    { kind: "ai",   text: "Done. I added a confirmation email that sends the moment someone places an order. <strong>Preview it →</strong>", time: "10:21am", v: "v2" },
    { kind: "checkpoint", v: "v2", label: "Confirmation email wired", time: "10:21am", files: 3 },
    { kind: "user", text: "Use my brand pink for the call-to-action button.", time: "10:34am", v: "v3" },
    { kind: "ai",   text: "Switched the CTA to your brand pink (<code>#F08DB8</code>). Anything else?", time: "10:34am", v: "v3" },
    { kind: "variations",
      title: "Three takes on the hero",
      sub: "Same content, three vibes. Tap one to merge.",
      options: [
        { id: "A", label: "Bold serif",   palette: ["#3a1410","#c0784a","#ffd9a8"], font: "serif" },
        { id: "B", label: "Editorial",    palette: ["#1F1A2E","#F08DB8","#FBE4ED"], font: "sans" },
        { id: "C", label: "Soft minimal", palette: ["#F5EFE3","#FFC53D","#181818"], font: "mono" },
      ]
    },
    { kind: "insight",
      title: "Your page is missing meta tags",
      sub: "Search engines won't see a description. Add an SEO block in 30 seconds — it'll bump shareability on Slack & X too.",
      cta: "Review SEO",
      icon: "Trend",
      tone: "sky"
    },
  ]);

  const [draft, setDraft] = useState("");
  const [vp, setVp] = useState("desktop");
  const [building, setBuilding] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [pageMenuOpen, setPageMenuOpen] = useState(false);
  const PAGES = [
    { id: "home",     name: "Home",          path: "/",              ic: "🏠" },
    { id: "order",    name: "Order",         path: "/order",         ic: "🥐" },
    { id: "menu",     name: "Menu",          path: "/menu",          ic: "📋" },
    { id: "checkout", name: "Checkout",      path: "/checkout",      ic: "💳" },
    { id: "confirm",  name: "Confirmation",  path: "/confirmation",  ic: "✓" },
    { id: "login",    name: "Login",         path: "/login",         ic: "🔑" },
    { id: "dashboard",name: "Owner dashboard",path: "/admin",        ic: "📊" },
  ];
  const [buildPhase, setBuildPhase] = useState("");
  const [highlightKey, setHighlightKey] = useState(0);
  const [tab, setTab] = useState("preview"); // preview / code / plan / activity
  const [mode, setMode] = useState("Build");  // Build / Chat / Plan
  const [chatOpen, setChatOpen] = useState(true);
  const [inspect, setInspect] = useState(false);
  const [hoverEl, setHoverEl] = useState(null);
  const [versionPin, setVersionPin] = useState(null); // viewing a checkpoint
  const [historyOpen, setHistoryOpen] = useState(false);
  const [restoreModal, setRestoreModal] = useState(null); // version object being confirmed for restore
  const logRef = useRef(null);

  const currentVersion = "v3";
  const isPinned = versionPin && versionPin !== currentVersion;

  useEffect(() => { if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight; }, [messages, building]);

  // build phase animation
  useEffect(() => {
    if (!building) return;
    const phases = ["Reading menu component", "Updating colors.css", "Re-rendering layout"];
    let i = 0; setBuildPhase(phases[0]);
    const id = setInterval(() => { i = (i + 1) % phases.length; setBuildPhase(phases[i]); }, 700);
    return () => clearInterval(id);
  }, [building]);

  const send = (text) => {
    const t = (text || draft).trim();
    if (!t) return;
    const v = "v" + (parseInt(currentVersion.slice(1)) + 1);
    setMessages((m) => [...m, { kind: "user", text: t, time: "now", v }]);
    setDraft("");
    setBuilding(true);
    setTimeout(() => {
      setMessages((m) => [...m,
        { kind: "ai", text: "Done! I made the change — take a look.", time: "now", v },
        { kind: "checkpoint", v, label: t.length > 38 ? t.slice(0, 38) + "…" : t, time: "now", files: 2 + Math.floor(Math.random() * 5) },
      ]);
      setBuilding(false);
      setHighlightKey((k) => k + 1);
    }, 2200);
  };

  const onKey = (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } };

  const checkpoints = messages.filter(m => m.kind === "checkpoint");
  // Build version history (newest first), tagging with author + change summary
  const history = (() => {
    const ck = [...checkpoints].reverse(); // newest first
    const authors = ["Mei Chen", "Mei Chen", "Sarah Park", "Mei Chen", "Poof", "Mei Chen"];
    const summaries = {
      "v3": { added: 2, removed: 1, summary: "CTA recolored to brand pink · OrderCTA.tsx, tokens.css" },
      "v2": { added: 6, removed: 0, summary: "Confirmation email wired · 3 files added, route handler" },
      "v1": { added: 12, removed: 0, summary: "Initial scaffold — Home, Order, Confirm pages, schema" },
    };
    return ck.map((c, i) => ({
      ...c,
      author: authors[i % authors.length],
      ...(summaries[c.v] || { added: c.files || 1, removed: 0, summary: c.label }),
      thumb: ["thumb-bakery-v3", "thumb-bakery-v2", "thumb-bakery-v1"][i] || "thumb-bakery-v1",
    }));
  })();

  const confirmRestore = (v) => {
    setRestoreModal(null);
    setHistoryOpen(false);
    setVersionPin(null);
    setHighlightKey(k => k + 1);
    // Push a fresh checkpoint reflecting the restore (becomes the new current state)
    const newV = "v" + (parseInt(currentVersion.slice(1)) + 1);
    setMessages(m => [
      ...m,
      { kind: "ai", text: `Restored <strong>${v.v}</strong> — <em>${v.label}</em>. Earlier history is preserved in the timeline.`, time: "now", v: newV },
      { kind: "checkpoint", v: newV, label: `Restored from ${v.v}`, time: "now", files: v.added + v.removed },
    ]);
  };

  const suggestions = mode === "Build"
    ? ["Make the headline bigger", "Add a delivery option", "Use cream + sage colors", "Add an FAQ section"]
    : mode === "Chat"
    ? ["What does this app do?", "Suggest a launch checklist", "Critique my color palette"]
    : ["Add /admin route", "Wire Stripe checkout", "Generate test data"];

  const frameWidth = vp === "desktop" ? 1100 : vp === "tablet" ? 768 : 390;

  return (
    <div className="editor v2" data-screen-label="editor">
      {/* ---------- TOP TOOLBAR ---------- */}
      <div className="ed-top">
        <div className="ed-top-l">
          <button className="ed-icon-btn" title="Collapse chat" onClick={() => setChatOpen(v => !v)}><Ic.PanelL/></button>
          <div className="ed-app-badge">
            <span className="app-emoji" style={{ background: "var(--bg-2)" }}>{app.emoji}</span>
            <div style={{ minWidth: 0 }}>
              <div className="ed-app-name">{app.name}</div>
              <div className="ed-app-state">
                {isPinned ? (
                  <><span className="dot dot-sun"></span> {versionPin} <button className="ed-link" onClick={() => setVersionPin(null)}>Latest</button></>
                ) : (
                  <><span className="dot dot-mint"></span> Saved · latest</>
                )}
              </div>
            </div>
            <button className={"ed-history-btn" + (historyOpen ? " on" : "")} title="Version history" onClick={() => setHistoryOpen(v => !v)}><Ic.Clock/></button>
          </div>

          <div className="ed-tabs">
            {[
              { id: "preview",  label: "Preview",  ic: "Eye" },
              { id: "code",     label: "Code",     ic: "Code" },
              { id: "plan",     label: "Plan",     ic: "Templates" },
              { id: "seo",      label: "SEO",      ic: "Globe" },
              { id: "payments", label: "Payments", ic: "Zap" },
              { id: "insights", label: "Insights", ic: "Trend" },
              { id: "activity", label: "Activity", ic: "Activity", badge: 2 },
            ].map(t => {
              const I = Ic[t.ic];
              return (
                <button key={t.id} className={"ed-tab" + (tab === t.id ? " active" : "")} onClick={() => setTab(t.id)}>
                  <I/> {t.label}
                  {t.badge && <span className="ed-tab-badge">{t.badge}</span>}
                </button>
              );
            })}
          </div>
        </div>

        <div className="ed-top-r">
          <div className="ed-credits" title="Tokens used this session">
            <Ic.Zap/>
            <div>
              <div className="ed-credits-label">CREDITS</div>
              <div className="ed-credits-num">847 <span>/ 2k</span></div>
            </div>
            <span className="ed-credits-bar"><span style={{ width: "42%" }}></span></span>
          </div>
          <div className="ed-collab">
            <div className="ed-collab-av" style={{ background: "linear-gradient(135deg,var(--sky),var(--mint))" }}>S</div>
            <div className="ed-collab-av" style={{ background: "linear-gradient(135deg,var(--coral),var(--sun))", marginLeft: -6 }}>M</div>
            <span className="ed-collab-label">Sarah is here</span>
          </div>
          <button className="ed-icon-btn" title="Comments"><Ic.Comment/></button>
          <button className="ed-icon-btn" title="GitHub"><Ic.GitHub/></button>
          <button className="btn btn-outline btn-sm">Share</button>
          <button className="btn btn-coral btn-sm"><Ic.Zap/> Publish</button>
        </div>
      </div>

      {/* ---------- MAIN GRID ---------- */}
      <div className={"ed-grid" + (chatOpen ? "" : " chat-collapsed")}>
        {chatOpen && (
          <div className="editor-chat v2">
            <div className="chat-log" ref={logRef}>
              {messages.map((m, i) => {
                if (m.kind === "checkpoint") {
                  return (
                    <div key={i} className={"ck-row" + (versionPin === m.v ? " active" : "")} onClick={() => setVersionPin(versionPin === m.v ? null : m.v)}>
                      <span className="ck-tag"><Ic.Branch/> {m.v}</span>
                      <span className="ck-label">{m.label}</span>
                      <span className="ck-files">{m.files} files</span>
                      <button className="ck-restore" title="Restore this version">↺</button>
                    </div>
                  );
                }
                if (m.kind === "variations") {
                  return (
                    <div key={i} className="var-rail">
                      <div className="var-rail-head">
                        <div>
                          <div className="var-rail-title">{m.title}</div>
                          <div className="var-rail-sub">{m.sub}</div>
                        </div>
                        <button className="ed-link" style={{ color: "var(--ink-3)" }}>Regenerate</button>
                      </div>
                      <div className="var-rail-grid">
                        {m.options.map(o => (
                          <button key={o.id} className="var-card">
                            <div className="var-thumb" style={{ background: `linear-gradient(135deg, ${o.palette[0]}, ${o.palette[1]} 60%, ${o.palette[2]})` }}>
                              <span className="var-letter" style={{ fontFamily: o.font === "serif" ? "Georgia, serif" : o.font === "mono" ? "var(--f-mono)" : "var(--f-sans)" }}>Aa</span>
                              <span className="var-tag">{o.id}</span>
                            </div>
                            <div className="var-label">{o.label}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                }
                if (m.kind === "insight") {
                  const Icn = Ic[m.icon] || Ic.Spark;
                  return (
                    <div key={i} className={"insight-card tone-" + m.tone}>
                      <div className="insight-ic"><Icn/></div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="insight-title">{m.title}</div>
                        <div className="insight-sub">{m.sub}</div>
                        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                          <button className="btn btn-ink btn-sm">{m.cta}</button>
                          <button className="btn btn-ghost btn-sm">Not now</button>
                        </div>
                      </div>
                      <button className="insight-x" title="Dismiss">×</button>
                    </div>
                  );
                }
                return (
                  <div key={i} className={"msg " + m.kind}>
                    <div className="msg-avatar">{m.kind === "user" ? "M" : "P"}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="msg-body" dangerouslySetInnerHTML={{ __html: m.text }}></div>
                      {m.card && (
                        <div className="msg-card">
                          <div className="msg-card-icon"><Ic.Spark/></div>
                          <div>
                            <div style={{ fontWeight: 600 }}>{m.card.title}</div>
                            <div style={{ color: "var(--ink-3)", fontSize: 11.5 }}>{m.card.sub}</div>
                          </div>
                        </div>
                      )}
                      <div className="msg-meta">
                        <span className="msg-time">{m.time}{m.v ? ` · ${m.v}` : ""}</span>
                        {m.kind === "ai" && (
                          <div className="msg-actions">
                            <button title="Revert this change"><Ic.Undo/></button>
                            <button title="Good answer"><Ic.ThumbUp/></button>
                            <button title="Bad answer"><Ic.ThumbDn/></button>
                            <button title="Copy"><Ic.Copy/></button>
                            <button title="More"><Ic.More/></button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              {building && (
                <div className="msg ai">
                  <div className="msg-avatar">P</div>
                  <div style={{ flex: 1 }}>
                    <div className="build-strip">
                      <span className="build-spin"></span>
                      <span className="build-phase">{buildPhase || "Building changes"}…</span>
                      <span className="build-progress"><span></span></span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="chat-suggestions">
              {suggestions.map((s) => (
                <button key={s} className="chat-suggestion" onClick={() => send(s)}>{s}</button>
              ))}
            </div>

            <div className="chat-input">
              {/* mode selector strip */}
              <div className="chat-mode-row">
                <div className="chat-mode-seg">
                  {["Build", "Chat", "Plan"].map(m => (
                    <button key={m} className={mode === m ? "active" : ""} onClick={() => setMode(m)}>
                      {m === "Build" ? <Ic.Spark/> : m === "Chat" ? <Ic.Comment/> : <Ic.Templates/>}
                      {m}
                    </button>
                  ))}
                </div>
                <span className="chat-mode-hint">
                  {mode === "Build"  ? "Changes ship to your live preview" :
                   mode === "Chat"   ? "Ask without editing — no files touched" :
                                       "Plan the next milestone first"}
                </span>
              </div>

              <div className="chat-input-box">
                <textarea
                  placeholder={mode === "Build" ? "Tell AppsBuiltWithAI what to change…  (try /menu, /header, /color)" : mode === "Chat" ? "Ask AppsBuiltWithAI anything about this app…" : "Describe the next milestone…"}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={onKey}
                  rows={2}
                />
                <div className="chat-input-bar">
                  <div className="chat-input-actions">
                    <button className="mini-icon" title="Attach image"><Ic.Image/></button>
                    <button className="mini-icon" title="Screenshot from preview"><Ic.Camera/></button>
                    <button className="mini-icon" title="Insert code"><Ic.Code/></button>
                    <button className={"mini-icon" + (inspect ? " on" : "")} title="Pick an element on the preview" onClick={() => setInspect(v => !v)}><Ic.Inspect/></button>
                    <span className="mini-sep"></span>
                    <button className="mini-icon" title="Voice"><Ic.Mic/></button>
                  </div>
                  <div className="chat-send-row">
                    <button className="chat-send-mode" title="Send & also commit to GitHub">
                      Send <Ic.ChevDn/>
                    </button>
                    <button className="chat-send" onClick={() => send()} disabled={!draft.trim() && !building} title="Send (⌘↵)">
                      <Ic.Send/>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------- PREVIEW / CODE / PLAN / ACTIVITY ---------- */}
        <div className="editor-preview v2">
          <div className="preview-bar v2">
            <div className="preview-nav-btns">
              <button className="mini-icon" title="Back"><span style={{ fontSize: 14, lineHeight: 1 }}>‹</span></button>
              <button className="mini-icon" title="Forward"><span style={{ fontSize: 14, lineHeight: 1 }}>›</span></button>
              <button className="mini-icon" title="Reload"><Ic.Refresh/></button>
            </div>
            <div className="preview-url">
              <Ic.Lock/>
              <span className="lock">{app.url}</span>
              <div className="ed-pages-wrap">
                <button
                  className="ed-pages-pill"
                  onClick={() => setPageMenuOpen(o => !o)}
                  aria-expanded={pageMenuOpen}
                  title="Jump to page"
                >
                  <span className="ed-pages-emoji">{PAGES.find(p => p.id === currentPage)?.ic}</span>
                  <span className="ed-pages-name">{PAGES.find(p => p.id === currentPage)?.name}</span>
                  <span className="ed-pages-path">{PAGES.find(p => p.id === currentPage)?.path}</span>
                  <svg className="ed-pages-chev" width="10" height="10" viewBox="0 0 12 8" fill="none">
                    <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {pageMenuOpen && (
                  <>
                    <div className="ed-pages-backdrop" onClick={() => setPageMenuOpen(false)}/>
                    <div className="ed-pages-menu" role="menu">
                      <div className="ed-pages-menu-head">
                        <span>Pages in this app</span>
                        <span className="ed-pages-count">{PAGES.length}</span>
                      </div>
                      {PAGES.map(p => (
                        <button
                          key={p.id}
                          className={"ed-pages-opt" + (currentPage === p.id ? " active" : "")}
                          onClick={() => { setCurrentPage(p.id); setPageMenuOpen(false); }}
                          role="menuitem"
                        >
                          <span className="ed-pages-opt-emoji">{p.ic}</span>
                          <div className="ed-pages-opt-text">
                            <div className="ed-pages-opt-name">{p.name}</div>
                            <div className="ed-pages-opt-path">{p.path}</div>
                          </div>
                          {currentPage === p.id && <span className="ed-pages-tick">✓</span>}
                        </button>
                      ))}
                      <button className="ed-pages-add" onClick={() => setPageMenuOpen(false)}>
                        <span className="ed-pages-add-ic">+</span>
                        <span>Add a new page</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="preview-vp">
              <button className={vp === "desktop" ? "active" : ""} onClick={() => setVp("desktop")} title="Desktop"><Ic.Desktop/></button>
              <button className={vp === "tablet" ? "active" : ""} onClick={() => setVp("tablet")} title="Tablet"><Ic.Tablet/></button>
              <button className={vp === "phone" ? "active" : ""} onClick={() => setVp("phone")} title="Phone"><Ic.Phone/></button>
            </div>
            <button className="mini-icon" title="Open in new tab"><Ic.ExtLink/></button>
          </div>

          {tab === "preview" && (
            <div className="preview-canvas">
              <div
                className={"preview-frame" + (inspect ? " inspecting" : "")}
                style={{ maxWidth: frameWidth, transition: "max-width .35s cubic-bezier(.2,.8,.2,1)" }}
                onMouseMove={(e) => {
                  if (!inspect) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left, y = e.clientY - rect.top;
                  // 2-column grid: left brand 45%, right form 55%
                  const onLeft = x < rect.width * 0.45;
                  if (onLeft) setHoverEl({ name: "Brand panel", x, y: 32, w: rect.width * 0.45 - 12, h: 220, label: "Hero copy" });
                  else if (y < 180) setHoverEl({ name: "Pickup time picker", x: rect.width * 0.45 + 12, y: 80, w: rect.width * 0.55 - 56, h: 70, label: "Time slots" });
                  else if (y < 420) setHoverEl({ name: "Menu list", x: rect.width * 0.45 + 12, y: 180, w: rect.width * 0.55 - 56, h: 200, label: "Item rows" });
                  else setHoverEl({ name: "Order CTA", x: rect.width * 0.45 + 12, y: 460, w: rect.width * 0.55 - 56, h: 80, label: "Pink button" });
                }}
                onMouseLeave={() => setHoverEl(null)}
                onClick={(e) => {
                  if (inspect && hoverEl) {
                    setDraft(`In the ${hoverEl.name} — `);
                    setInspect(false);
                    setHoverEl(null);
                  }
                }}
              >
                <PreviewMock app={app}/>
                {/* Built-with badge — Free tier; toggle off in Pro */}
                <a
                  className="builtwith-badge in-preview"
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  title="Built with AppsBuiltWithAI · Upgrade to Pro to hide"
                >
                  <span className="builtwith-mark">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <defs>
                        <linearGradient id="bw-grad-ed" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0" stopColor="#FB8855"/>
                          <stop offset="1" stopColor="#E84A3C"/>
                        </linearGradient>
                      </defs>
                      <path d="M12 2 4 6v6c0 4.5 3.4 8.4 8 10 4.6-1.6 8-5.5 8-10V6l-8-4Z" fill="url(#bw-grad-ed)"/>
                      <path d="M9 12l2 2 4-4" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    </svg>
                  </span>
                  <span className="builtwith-text">
                    <span className="builtwith-text-1">Built with</span>
                    <span className="builtwith-text-2">AppsBuiltWithAI</span>
                  </span>
                </a>
                {inspect && hoverEl && (
                  <div className="inspect-box" style={{ left: hoverEl.x, top: hoverEl.y, width: hoverEl.w, height: hoverEl.h }}>
                    <span className="inspect-label">{hoverEl.name} <span style={{ opacity: .6 }}>· click to edit</span></span>
                  </div>
                )}
                {highlightKey > 0 && <div key={highlightKey} className="preview-highlight"></div>}
                {isPinned && (
                  <div className="preview-pin-overlay">
                    <div className="ppo-card">
                      <Ic.Clock/> Viewing snapshot <strong>{versionPin}</strong>
                      <button className="btn btn-ink btn-sm" onClick={() => setVersionPin(null)}>Return to latest</button>
                    </div>
                  </div>
                )}
              </div>
              <TimeTravelScrubber
                checkpoints={messages.filter(m => m.kind === "checkpoint")}
                pinned={versionPin}
                onPin={setVersionPin}
                currentVersion={currentVersion}
              />
            </div>
          )}

          {tab === "code" && <CodePane/>}
          {tab === "plan" && <PlanPane/>}
          {tab === "seo" && <SeoPane app={app}/>}
          {tab === "payments" && <PaymentsPane/>}
          {tab === "insights" && <InsightsPane/>}
          {tab === "activity" && <ActivityPane/>}
        </div>
      </div>

      {/* ---------- VERSION HISTORY DRAWER ---------- */}
      {historyOpen && (
        <>
          <div className="vh-scrim" onClick={() => setHistoryOpen(false)}></div>
          <aside className="vh-drawer">
            <div className="vh-head">
              <div>
                <div className="vh-kicker">VERSION HISTORY</div>
                <div className="vh-title">{app.name}</div>
              </div>
              <button className="mini-icon" onClick={() => setHistoryOpen(false)} title="Close">✕</button>
            </div>

            <div className="vh-summary">
              <div className="vh-summary-stat">
                <div className="vh-summary-num">{history.length + 1}</div>
                <div className="vh-summary-label">snapshots</div>
              </div>
              <div className="vh-summary-stat">
                <div className="vh-summary-num">{history.reduce((s, h) => s + h.added, 0)}</div>
                <div className="vh-summary-label">files changed</div>
              </div>
              <div className="vh-summary-stat">
                <div className="vh-summary-num">2</div>
                <div className="vh-summary-label">contributors</div>
              </div>
            </div>

            <div className="vh-tip">
              <Ic.Clock/>
              <span>Click any version to preview it in the canvas — your work isn't touched until you press <strong>Restore</strong>.</span>
            </div>

            <div className="vh-list">
              {/* Latest = current state */}
              <div className={"vh-item latest" + (!versionPin ? " viewing" : "")}>
                <div className="vh-item-dot vh-dot-latest"></div>
                <div className="vh-item-body">
                  <div className="vh-item-row">
                    <span className="vh-item-v">{currentVersion}</span>
                    <span className="vh-item-pill vh-pill-current">Current</span>
                    <span className="vh-item-time">just now</span>
                  </div>
                  <div className="vh-item-label">Working state — unsaved edits ride here</div>
                  <div className="vh-item-meta">
                    <span className="vh-item-author">
                      <span className="vh-avatar" style={{ background: "linear-gradient(135deg,var(--coral),var(--sun))" }}>M</span>
                      Mei Chen
                    </span>
                    <span className="vh-item-diff">
                      <span className="vh-diff-plus">+5</span><span className="vh-diff-minus">−2</span>
                    </span>
                  </div>
                </div>
              </div>

              {history.map((h, i) => {
                const viewing = versionPin === h.v;
                const initial = h.author[0];
                const palette = h.author === "Sarah Park"
                  ? "linear-gradient(135deg,var(--sky),var(--mint))"
                  : h.author === "Poof"
                  ? "linear-gradient(135deg,var(--ink),var(--sun))"
                  : "linear-gradient(135deg,var(--coral),var(--sun))";
                return (
                  <div
                    key={h.v}
                    className={"vh-item" + (viewing ? " viewing" : "")}
                    onClick={() => setVersionPin(versionPin === h.v ? null : h.v)}
                  >
                    <div className="vh-item-dot"></div>
                    <div className="vh-item-body">
                      <div className="vh-item-row">
                        <span className="vh-item-v">{h.v}</span>
                        {i === 0 && <span className="vh-item-pill vh-pill-prev">Previous</span>}
                        <span className="vh-item-time">{h.time}</span>
                      </div>
                      <div className="vh-item-label">{h.label}</div>
                      <div className="vh-item-summary">{h.summary}</div>
                      <div className="vh-item-meta">
                        <span className="vh-item-author">
                          <span className="vh-avatar" style={{ background: palette }}>{initial}</span>
                          {h.author}
                        </span>
                        <span className="vh-item-diff">
                          <span className="vh-diff-plus">+{h.added}</span>
                          {h.removed > 0 && <span className="vh-diff-minus">−{h.removed}</span>}
                          <span className="vh-item-files">· {h.files} file{h.files === 1 ? "" : "s"}</span>
                        </span>
                      </div>

                      {viewing && (
                        <div className="vh-item-actions">
                          <button className="btn btn-outline btn-sm" onClick={(e) => { e.stopPropagation(); setVersionPin(null); }}>
                            <Ic.Eye/> Stop previewing
                          </button>
                          <button className="btn btn-coral btn-sm" onClick={(e) => { e.stopPropagation(); setRestoreModal(h); }}>
                            <Ic.Undo/> Restore {h.v}
                          </button>
                        </div>
                      )}
                      {!viewing && (
                        <div className="vh-item-hover-cta">
                          <span>Click to preview</span>
                          <button className="vh-restore-link" onClick={(e) => { e.stopPropagation(); setRestoreModal(h); }}>
                            Restore →
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="vh-foot">
              <Ic.Branch/>
              <span>Snapshots auto-save on every AppsBuiltWithAI build. <button className="ed-link">Settings →</button></span>
            </div>
          </aside>
        </>
      )}

      {/* ---------- RESTORE CONFIRMATION ---------- */}
      {restoreModal && (
        <div className="vh-modal-scrim" onClick={() => setRestoreModal(null)}>
          <div className="vh-modal" onClick={(e) => e.stopPropagation()}>
            <div className="vh-modal-ic"><Ic.Undo/></div>
            <h3>Restore {restoreModal.v}?</h3>
            <p>
              Your project will roll back to <strong>{restoreModal.label}</strong> from <strong>{restoreModal.time}</strong>.
              The {history.findIndex(h => h.v === restoreModal.v) + 1} change{history.findIndex(h => h.v === restoreModal.v) === 0 ? "" : "s"} made since then will be preserved in history — you can come back to {currentVersion} anytime.
            </p>
            <div className="vh-modal-diff">
              <div className="vh-modal-diff-side">
                <span className="vh-modal-diff-kicker">FROM</span>
                <span className="vh-modal-diff-v">{currentVersion}</span>
                <span className="vh-modal-diff-time">just now</span>
              </div>
              <span className="vh-modal-diff-arrow">→</span>
              <div className="vh-modal-diff-side">
                <span className="vh-modal-diff-kicker">TO</span>
                <span className="vh-modal-diff-v">{restoreModal.v}</span>
                <span className="vh-modal-diff-time">{restoreModal.time}</span>
              </div>
            </div>
            <label className="vh-modal-check">
              <input type="checkbox" defaultChecked/>
              <span>Keep a snapshot of current work before restoring</span>
            </label>
            <div className="vh-modal-actions">
              <button className="btn btn-outline" onClick={() => setRestoreModal(null)}>Cancel</button>
              <button className="btn btn-coral" onClick={() => confirmRestore(restoreModal)}>
                <Ic.Undo/> Restore {restoreModal.v}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============= CODE PANE ============= */
function CodePane() {
  const files = [
    { n: "app/page.tsx",            badge: "edited" },
    { n: "app/order/route.ts",      badge: null },
    { n: "components/Menu.tsx",     badge: "new" },
    { n: "components/TimePicker.tsx", badge: null },
    { n: "components/OrderCTA.tsx", badge: "edited" },
    { n: "styles/tokens.css",       badge: "edited" },
    { n: "emails/confirmation.tsx", badge: null },
    { n: "lib/cart.ts",             badge: null },
  ];
  const [active, setActive] = useState("components/OrderCTA.tsx");
  return (
    <div className="code-pane">
      <div className="code-files">
        <div className="code-files-head">
          <span style={{ fontFamily: "var(--f-mono)", fontSize: 10.5, letterSpacing: ".14em", color: "var(--ink-3)", fontWeight: 600 }}>FILES · 8</span>
          <button className="mini-icon" title="Search"><Ic.Search/></button>
        </div>
        {files.map(f => (
          <div key={f.n} className={"code-file" + (active === f.n ? " active" : "")} onClick={() => setActive(f.n)}>
            <span style={{ fontFamily: "var(--f-mono)", fontSize: 12.5 }}>{f.n}</span>
            {f.badge === "edited" && <span className="code-dot edited" title="Edited"></span>}
            {f.badge === "new" && <span className="code-dot new" title="New"></span>}
          </div>
        ))}
      </div>
      <div className="code-editor">
        <div className="code-tabs">
          <span className="code-tab active">{active}</span>
          <span className="code-tab">Menu.tsx</span>
        </div>
        <pre className="code-body">{`import { Button } from "@/ui";
import { useCart } from "@/lib/cart";

/* Order CTA — pickup button.
 * Brand pink: #F08DB8 (was #181818)
 */
export function OrderCTA() {
  const { total, place } = useCart();
  return (
    <div className="flex items-center justify-between">
      <Subtotal value={total} />
      <Button
        onClick={place}
        className="bg-pink-brand px-6 py-3 rounded-full"
      >
        Place pickup order →
      </Button>
    </div>
  );
}`}</pre>
        <div className="code-diff-strip">
          <span className="diff-plus">+3</span>
          <span className="diff-minus">−1</span>
          <span style={{ color: "var(--ink-3)", fontSize: 12 }}>Changed by AppsBuiltWithAI · 2s ago</span>
          <button className="btn btn-outline btn-sm" style={{ marginLeft: "auto" }}><Ic.Undo/> Revert file</button>
        </div>
      </div>
    </div>
  );
}

/* ============= PLAN PANE ============= */
function PlanPane() {
  const tasks = [
    { s: "done",    t: "Pickup time picker (8:30 – 11:30)" },
    { s: "done",    t: "Today's menu with quantity controls" },
    { s: "done",    t: "Confirmation email (text only)" },
    { s: "done",    t: "Brand pink on order CTA" },
    { s: "doing",   t: "SEO meta tags & social cards" },
    { s: "todo",    t: "Stripe checkout integration" },
    { s: "todo",    t: "Sold-out states & low-stock flags" },
    { s: "todo",    t: "Admin view — daily order list & print" },
  ];
  return (
    <div className="plan-pane">
      <div className="plan-pane-head">
        <div>
          <div style={{ fontFamily: "var(--f-mono)", fontSize: 10.5, letterSpacing: ".14em", color: "var(--ink-3)" }}>MILESTONE</div>
          <h3 style={{ margin: "4px 0 0", fontSize: 20, fontWeight: 700, letterSpacing: "-0.018em" }}>Soft launch · Crumb &amp; Co.</h3>
        </div>
        <div className="plan-pane-progress">
          <div className="ppp-bar"><span style={{ width: "50%" }}></span></div>
          <span>4 / 8 done</span>
        </div>
      </div>
      <div className="plan-tasks">
        {tasks.map((t, i) => (
          <div key={i} className={"plan-task " + t.s}>
            <span className="plan-task-status">{t.s === "done" ? "✓" : t.s === "doing" ? "●" : ""}</span>
            <span className="plan-task-text">{t.t}</span>
            {t.s === "doing" && <span className="plan-task-tag">In progress</span>}
            <button className="plan-task-go">Open in chat →</button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============= ACTIVITY PANE ============= */
function ActivityPane() {
  const events = [
    { t: "10:34:12", k: "build",  msg: "Build complete — 2 files changed, 14ms" },
    { t: "10:34:08", k: "diff",   msg: "components/OrderCTA.tsx · +3 −1" },
    { t: "10:34:05", k: "user",   msg: "Mei: Use my brand pink for the call-to-action button" },
    { t: "10:21:44", k: "deploy", msg: "Preview redeployed · crumb-preview-7g.appsbuilt.ai" },
    { t: "10:21:32", k: "build",  msg: "Build complete — 3 files changed, 22ms" },
    { t: "10:21:08", k: "user",   msg: "Mei: Also add a confirmation email — text only" },
    { t: "10:14:22", k: "build",  msg: "Initial scaffold — 12 files created, 480ms" },
    { t: "10:14:00", k: "user",   msg: "Mei: A pickup-order page for my bakery…" },
  ];
  return (
    <div className="activity-pane">
      <div className="ap-head">
        <span style={{ fontFamily: "var(--f-mono)", fontSize: 10.5, letterSpacing: ".14em", color: "var(--ink-3)" }}>EVENT LOG</span>
        <button className="mini-icon" title="Refresh"><Ic.Refresh/></button>
      </div>
      {events.map((e, i) => (
        <div key={i} className="ap-row">
          <span className="ap-time">{e.t}</span>
          <span className={"ap-kind k-" + e.k}>{e.k}</span>
          <span className="ap-msg">{e.msg}</span>
        </div>
      ))}
    </div>
  );
}

/* ============= TIME-TRAVEL SCRUBBER ============= */
function TimeTravelScrubber({ checkpoints, pinned, onPin, currentVersion }) {
  // include "latest" as the last position
  const points = [...checkpoints, { v: currentVersion, label: "Latest", time: "now", files: 0, isLatest: true }];
  const activeIdx = pinned ? points.findIndex(p => p.v === pinned) : points.length - 1;
  return (
    <div className="scrubber">
      <button className="scrub-step" title="Previous" onClick={() => {
        const i = activeIdx;
        if (i > 0) onPin(points[i - 1].isLatest ? null : points[i - 1].v);
      }}><span style={{ fontSize: 14, lineHeight: 1 }}>‹</span></button>
      <div className="scrub-track">
        <div className="scrub-line"></div>
        {points.map((p, i) => (
          <button
            key={p.v + i}
            className={"scrub-dot" + (i === activeIdx ? " active" : "") + (p.isLatest ? " latest" : "")}
            style={{ left: `calc(${(i / (points.length - 1 || 1)) * 100}% - 6px)` }}
            onClick={() => onPin(p.isLatest ? null : p.v)}
            title={`${p.v} · ${p.label}`}
          >
            <span className="scrub-dot-tip">
              <strong>{p.v}</strong> · {p.label}
            </span>
          </button>
        ))}
      </div>
      <button className="scrub-step" title="Next" onClick={() => {
        const i = activeIdx;
        if (i < points.length - 1) onPin(points[i + 1].isLatest ? null : points[i + 1].v);
      }}><span style={{ fontSize: 14, lineHeight: 1 }}>›</span></button>
      <div className="scrub-meta">
        <span className="scrub-meta-v">{points[activeIdx]?.v || "v1"}</span>
        <span className="scrub-meta-label">{points[activeIdx]?.label || "—"}</span>
      </div>
    </div>
  );
}

/* ============= INSIGHTS PANE — speed / SEO / A11y / Best practices ============= */
function InsightsPane() {
  const scores = [
    { k: "Performance",     n: 92, tone: "mint", sub: "Loads in 0.9s on 4G" },
    { k: "SEO",             n: 64, tone: "sun",  sub: "Missing meta description" },
    { k: "Accessibility",   n: 81, tone: "sky",  sub: "2 low-contrast warnings" },
    { k: "Best Practices",  n: 100,tone: "mint", sub: "All checks passing" },
  ];
  const issues = [
    { sev: "warn", area: "SEO",    title: "Add a <meta name=\"description\">",  hint: "1 line · ~22 words · helps Google &amp; share cards",  fix: "Add meta tags" },
    { sev: "warn", area: "SEO",    title: "Add Open Graph & Twitter image",     hint: "Generate 1200×630 social card from your hero",          fix: "Generate card" },
    { sev: "warn", area: "A11y",   title: "Order CTA contrast is 3.8:1",        hint: "Pink #F08DB8 on white fails WCAG AA — needs 4.5:1",     fix: "Darken to #D86BA1" },
    { sev: "info", area: "A11y",   title: "Add aria-label to quantity buttons", hint: "Screen readers announce \"button button button\" today", fix: "Add labels" },
    { sev: "info", area: "Perf",   title: "Two emoji fonts loaded",             hint: "Combine into one system stack — saves ~14kb",           fix: "Optimize fonts" },
    { sev: "pass", area: "Perf",   title: "Images use modern formats",          hint: "WebP fallback to PNG — good", fix: null },
    { sev: "pass", area: "BP",     title: "HTTPS & cookies look correct",       hint: "No mixed content, no insecure cookies",                 fix: null },
  ];
  return (
    <div className="insights-pane">
      <div className="insights-head">
        <div>
          <div style={{ fontFamily: "var(--f-mono)", fontSize: 10.5, letterSpacing: ".14em", color: "var(--ink-3)" }}>QUALITY REPORT</div>
          <h3 style={{ margin: "4px 0 0", fontSize: 20, fontWeight: 700, letterSpacing: "-0.018em" }}>How is this build doing?</h3>
          <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 4 }}>Run 12s ago · simulated on Moto G4, fast 3G · re-runs after each build</div>
        </div>
        <button className="btn btn-outline btn-sm"><Ic.Refresh/> Re-run</button>
      </div>

      <div className="insights-scores">
        {scores.map(s => (
          <div key={s.k} className={"score-ring tone-" + s.tone}>
            <svg viewBox="0 0 100 100" width="84" height="84">
              <circle cx="50" cy="50" r="42" fill="none" stroke="var(--bg-2)" strokeWidth="9"/>
              <circle
                cx="50" cy="50" r="42" fill="none"
                stroke={s.tone === "mint" ? "var(--mint)" : s.tone === "sun" ? "var(--sun)" : s.tone === "sky" ? "var(--sky)" : "var(--coral)"}
                strokeWidth="9" strokeLinecap="round"
                strokeDasharray={`${(s.n / 100) * 264} 264`}
                transform="rotate(-90 50 50)"
              />
              <text x="50" y="56" textAnchor="middle" fontSize="28" fontWeight="700" fill="var(--ink)" fontFamily="var(--f-sans)" letterSpacing="-0.02em">{s.n}</text>
            </svg>
            <div className="score-meta">
              <div className="score-name">{s.k}</div>
              <div className="score-sub">{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="insights-issues">
        <div className="ii-head">
          <span>Issues &amp; opportunities</span>
          <span className="ii-count">{issues.filter(i => i.sev !== "pass").length} actionable · {issues.filter(i => i.sev === "pass").length} passing</span>
        </div>
        {issues.map((it, i) => (
          <div key={i} className={"ii-row sev-" + it.sev}>
            <span className="ii-sev">{it.sev === "warn" ? "!" : it.sev === "info" ? "i" : "✓"}</span>
            <span className="ii-area">{it.area}</span>
            <div className="ii-body">
              <div className="ii-title">{it.title}</div>
              <div className="ii-hint" dangerouslySetInnerHTML={{ __html: it.hint }}></div>
            </div>
            {it.fix && <button className="ii-fix"><Ic.Spark/> {it.fix}</button>}
          </div>
        ))}
      </div>

      <div className="insights-cta">
        <div>
          <div style={{ fontWeight: 700, fontSize: 15 }}>Fix all 5 in one turn</div>
          <div style={{ fontSize: 13, color: "var(--ink-2)", marginTop: 2 }}>AppsBuiltWithAI will batch the actionable items and ship a checkpoint — about 8 credits.</div>
        </div>
        <button className="btn btn-coral"><Ic.Zap/> Auto-fix everything</button>
      </div>
    </div>
  );
}

/* ============= PAYMENTS PANE — Stripe-style payouts, fees, transactions ============= */
function PaymentsPane() {
  const kpis = [
    { k: "Gross revenue",  v: "$4,284.50", d: "+18% vs. last 7d", tone: "mint" },
    { k: "Net (after fees)", v: "$4,141.32", d: "Stripe fees · $143.18", tone: "ink" },
    { k: "Next payout",    v: "$1,284.00", d: "Tue, Oct 22 · 2 days", tone: "sky" },
    { k: "Pending refunds", v: "$24.50",   d: "1 customer · 2 items",   tone: "sun" },
  ];
  const txns = [
    { t: "10:42", who: "Lila K.",   email: "lila@…",      amt: 24.50, m: "Visa · 4242", st: "succeeded" },
    { t: "10:31", who: "Jordan M.", email: "jord@…",      amt: 18.00, m: "Apple Pay",   st: "succeeded" },
    { t: "10:18", who: "Anita P.",  email: "anita@…",     amt: 42.50, m: "Mastercard",  st: "succeeded" },
    { t: "09:55", who: "Sam V.",    email: "sam@…",       amt:  9.00, m: "Visa · 0119", st: "refunded"  },
    { t: "09:48", who: "Lee H.",    email: "leeh@…",      amt: 31.00, m: "Apple Pay",   st: "succeeded" },
    { t: "09:32", who: "Rae T.",    email: "rae@…",       amt: 14.50, m: "Visa · 8821", st: "succeeded" },
    { t: "09:14", who: "Marcus E.", email: "marc@…",      amt: 22.00, m: "Google Pay",  st: "disputed"  },
  ];
  const methods = [
    { k: "Card",        on: true,  sub: "Visa, Mastercard, Amex · 2.9% + 30¢" },
    { k: "Apple Pay",   on: true,  sub: "Live · ~38% of mobile checkouts" },
    { k: "Google Pay",  on: true,  sub: "Live · ~6% of mobile checkouts" },
    { k: "Klarna",      on: false, sub: "Pay-in-4 · adds 5.99% + 30¢" },
    { k: "Cash on pickup", on: false, sub: "Skip Stripe — track manually" },
  ];

  return (
    <div style={{ padding: "28px 32px", maxWidth: 1080, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 20 }}>
        <div>
          <div style={{ fontFamily: "var(--f-mono)", fontSize: 10.5, letterSpacing: ".14em", color: "var(--ink-3)" }}>PAYMENTS</div>
          <h2 style={{ margin: "4px 0 0", fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>Money in, money out.</h2>
          <p style={{ fontSize: 13.5, color: "var(--ink-2)", margin: "6px 0 0", maxWidth: "60ch", lineHeight: 1.5 }}>
            Stripe handles checkout, payouts, and refunds for this app. Live transactions appear here within a few seconds.
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 12, background: "color-mix(in srgb, var(--mint) 12%, transparent)", border: "1px solid color-mix(in srgb, var(--mint) 30%, transparent)" }}>
          <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--mint)" }}></span>
          <div>
            <div style={{ fontWeight: 600, fontSize: 13 }}>Stripe connected</div>
            <div style={{ fontSize: 11.5, color: "var(--ink-3)", fontFamily: "var(--f-mono)" }}>acct_1Mei9k · live mode</div>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 18 }}>
        {kpis.map(k => (
          <div key={k.k} style={{ padding: 16, borderRadius: 14, background: "#fff", border: "1px solid var(--line)" }}>
            <div style={{ fontFamily: "var(--f-mono)", fontSize: 10.5, letterSpacing: ".14em", color: "var(--ink-3)" }}>{k.k.toUpperCase()}</div>
            <div style={{ fontSize: 22, fontWeight: 700, marginTop: 8, letterSpacing: "-0.02em" }}>{k.v}</div>
            <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 4 }}>{k.d}</div>
          </div>
        ))}
      </div>

      {/* Transactions + methods */}
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 12 }}>
        <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 14, overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", borderBottom: "1px solid var(--line-2)" }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>Recent transactions</div>
              <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 2 }}>Today · {txns.length} payments</div>
            </div>
            <button className="btn btn-outline btn-sm">Open in Stripe <Ic.ArrowR/></button>
          </div>
          <div>
            {txns.map((x, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "56px 1.4fr 1fr 90px 90px", alignItems: "center", padding: "11px 18px", borderBottom: i === txns.length - 1 ? "none" : "1px solid var(--line-2)", fontSize: 13 }}>
                <span style={{ fontFamily: "var(--f-mono)", fontSize: 11.5, color: "var(--ink-3)" }}>{x.t}</span>
                <div>
                  <div style={{ fontWeight: 600 }}>{x.who}</div>
                  <div style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{x.email}</div>
                </div>
                <span style={{ fontSize: 12, color: "var(--ink-2)" }}>{x.m}</span>
                <span style={{
                  justifySelf: "start",
                  padding: "3px 8px", borderRadius: 999, fontSize: 11, fontWeight: 600,
                  background: x.st === "succeeded" ? "color-mix(in srgb, var(--mint) 18%, transparent)" : x.st === "refunded" ? "color-mix(in srgb, var(--sun) 22%, transparent)" : "color-mix(in srgb, var(--coral) 18%, transparent)",
                  color: x.st === "succeeded" ? "var(--mint)" : x.st === "refunded" ? "var(--ink-2)" : "var(--coral)",
                }}>{x.st}</span>
                <span style={{ fontFamily: "var(--f-mono)", fontWeight: 700, textAlign: "right", color: x.st === "refunded" ? "var(--ink-3)" : "var(--ink)", textDecoration: x.st === "refunded" ? "line-through" : "none" }}>
                  ${x.amt.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 14, padding: "14px 18px" }}>
          <div style={{ fontWeight: 700, fontSize: 14 }}>Payment methods</div>
          <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 2, marginBottom: 12 }}>Toggle what's offered at checkout.</div>
          {methods.map(m => (
            <div key={m.k} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderTop: "1px solid var(--line-2)" }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{m.k}</div>
                <div style={{ fontSize: 11.5, color: "var(--ink-3)", marginTop: 2 }}>{m.sub}</div>
              </div>
              <span style={{
                width: 34, height: 20, borderRadius: 999, padding: 2,
                background: m.on ? "var(--ink)" : "var(--bg-2)",
                display: "inline-flex", alignItems: "center",
                justifyContent: m.on ? "flex-end" : "flex-start",
                transition: "all 180ms ease-out"
              }}>
                <span style={{ width: 16, height: 16, borderRadius: 999, background: "#fff" }}></span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============= Mock app being built — bakery pickup orders ============= */
function PreviewMock({ app }) {
  const items = [
    { n: "Sourdough loaf",       p: 9,   q: 1, e: "🍞" },
    { n: "Almond croissant",     p: 4.5, q: 2, e: "🥐" },
    { n: "Olive oil cake slice", p: 5,   q: 1, e: "🍰" },
  ];
  const total = items.reduce((s, i) => s + i.p * i.q, 0);

  return (
    <div style={{ height: "100%", display: "grid", gridTemplateColumns: "1fr 1.2fr" }}>
      {/* left brand column */}
      <div className={app.thumb || "thumb-bakery"} style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 32, color: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,.95)", color: "var(--ink)", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 15 }}>{app.emoji || "🥐"}</div>
          <div style={{ fontWeight: 700, fontSize: 14, letterSpacing: "-0.01em" }}>{app.name}</div>
        </div>
        <div>
          <div style={{ fontFamily: "var(--f-mono)", fontSize: 10.5, letterSpacing: ".14em", textTransform: "uppercase", opacity: .9, color: "rgba(255,255,255,.92)" }}>Open today · 8am – 2pm</div>
          <div style={{ fontWeight: 700, fontSize: 38, marginTop: 8, letterSpacing: "-0.025em", lineHeight: 1.04, textShadow: "0 2px 16px rgba(0,0,0,.4)" }}>Order ahead.<br/>Skip the line.</div>
          <div style={{ fontSize: 14, opacity: .9, marginTop: 10, lineHeight: 1.5, maxWidth: "32ch" }}>Fresh-baked sourdough, croissants, and cakes — pick up between 8:30 and 11:30.</div>
        </div>
        <div style={{ fontSize: 11.5, opacity: .7, fontFamily: "var(--f-mono)", letterSpacing: ".05em" }}>built with AppsBuiltWithAI · Mei · made with ♥</div>
      </div>

      {/* right form column */}
      <div style={{ padding: "32px 36px", display: "flex", flexDirection: "column", gap: 16, background: "#fff", overflow: "auto" }}>
        <div>
          <div style={{ fontFamily: "var(--f-mono)", fontSize: 10.5, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-3)" }}>Pick up time</div>
          <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
            {["8:30", "9:00", "9:30", "10:00", "10:30", "11:00"].map((t, i) => (
              <div key={t} style={{
                flex: 1, padding: "11px 0", borderRadius: 10,
                border: i === 2 ? "1.5px solid var(--ink)" : "1px solid var(--line)",
                background: i === 2 ? "var(--ink)" : "#fff",
                color: i === 2 ? "#fff" : "var(--ink)",
                textAlign: "center", fontSize: 12.5, fontWeight: 500
              }}>{t}</div>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontFamily: "var(--f-mono)", fontSize: 10.5, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 10 }}>Today's menu</div>
          {items.map((item) => (
            <div key={item.n} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid var(--line-2)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 9, background: "var(--bg-2)", display: "grid", placeItems: "center", fontSize: 18 }}>{item.e}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{item.n}</div>
                  <div style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 1 }}>${item.p.toFixed(2)} each</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "var(--f-mono)", fontSize: 13.5 }}>
                <button style={{ width: 24, height: 24, borderRadius: 7, background: "var(--bg-2)", border: 0, fontWeight: 600, color: "var(--ink-2)" }}>−</button>
                <span style={{ fontWeight: 600 }}>{item.q}</span>
                <button style={{ width: 24, height: 24, borderRadius: 7, background: "var(--bg-2)", border: 0, fontWeight: 600, color: "var(--ink-2)" }}>+</button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 6 }}>
          <div>
            <div style={{ fontFamily: "var(--f-mono)", fontSize: 10.5, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-3)" }}>Subtotal</div>
            <div style={{ fontWeight: 700, fontSize: 24, letterSpacing: "-0.015em", marginTop: 4 }}>${total.toFixed(2)}</div>
          </div>
          <button style={{
            padding: "14px 24px", borderRadius: 999,
            background: "#F08DB8", color: "#fff",
            fontWeight: 700, fontSize: 14, border: 0, cursor: "pointer",
            boxShadow: "0 10px 24px -8px rgba(240,141,184,.5)"
          }}>
            Place pickup order →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============= VISUAL EDIT MODE — click-to-edit text/colors ============= */
function VisualEditChip({ selected, onChange, onClose }) {
  if (!selected) return null;
  return (
    <div className="ve-chip" style={{ left: selected.x, top: selected.y }}>
      <div className="ve-chip-head">
        <span className="ve-chip-name">{selected.name}</span>
        <button className="ve-chip-close" onClick={onClose}>×</button>
      </div>
      <div className="ve-chip-body">
        <input
          className="ve-chip-text"
          value={selected.text || ""}
          onChange={(e) => onChange({ ...selected, text: e.target.value })}
          placeholder="Edit text…"
        />
        <div className="ve-chip-row">
          <label className="ve-chip-label">Text</label>
          <div className="ve-chip-swatches">
            {["#181818", "#FB8855", "#2EA56F", "#2E78D9", "#6A2EB8"].map(c => (
              <button
                key={c}
                className={"ve-swatch" + (selected.color === c ? " active" : "")}
                style={{ background: c }}
                onClick={() => onChange({ ...selected, color: c })}
                aria-label={"Color " + c}
              />
            ))}
          </div>
        </div>
        <div className="ve-chip-row">
          <label className="ve-chip-label">Size</label>
          <div className="ve-chip-pills">
            {["S", "M", "L", "XL"].map(s => (
              <button
                key={s}
                className={"ve-pill" + (selected.size === s ? " active" : "")}
                onClick={() => onChange({ ...selected, size: s })}
              >{s}</button>
            ))}
          </div>
        </div>
        <button className="ve-chip-apply">Apply changes</button>
      </div>
    </div>
  );
}

/* ============= FIGMA IMPORT MODAL ============= */
function FigmaImportModal({ open, onClose }) {
  const [url, setUrl] = useState("");
  const [stage, setStage] = useState("input"); // input / parsing / ready
  const [parsed, setParsed] = useState(null);

  if (!open) return null;

  const submit = () => {
    if (!url.trim()) return;
    setStage("parsing");
    setTimeout(() => {
      setParsed({
        file: "Crumb & Co. — Final v3",
        frames: 12,
        components: 38,
        colors: 6,
        fonts: 2,
      });
      setStage("ready");
    }, 1400);
  };

  return (
    <div className="figma-overlay" onClick={onClose}>
      <div className="figma-modal" onClick={(e) => e.stopPropagation()}>
        <button className="figma-close" onClick={onClose} aria-label="Close">×</button>
        <div className="figma-head">
          <div className="figma-eyebrow">
            <span className="figma-logo">F</span>
            Import from Figma
          </div>
          <h2 className="figma-h">Paste a Figma file URL.<br/><em>We'll build from your design.</em></h2>
          <p>We map Figma frames to pages, styles to design tokens, and components to reusable blocks. Then the AI fills in interactivity.</p>
        </div>

        {stage === "input" && (
          <form onSubmit={(e) => { e.preventDefault(); submit(); }}>
            <label className="figma-field">
              <span className="figma-field-label">Figma file URL</span>
              <div className="figma-input-row">
                <span className="figma-input-prefix">https://www.figma.com/file/</span>
                <input
                  className="figma-input"
                  placeholder="abc123…/My-app-design"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="figma-hint">
                File needs to be shared publicly or with our integration. <a href="#">How to share →</a>
              </div>
            </label>

            <div className="figma-options">
              <label className="figma-option">
                <input type="checkbox" defaultChecked/>
                <span>
                  <strong>Map Figma styles to design tokens</strong>
                  <small>Colors, fonts, and spacing become CSS variables you can edit later.</small>
                </span>
              </label>
              <label className="figma-option">
                <input type="checkbox" defaultChecked/>
                <span>
                  <strong>Generate component library</strong>
                  <small>Each Figma component → reusable block in your app.</small>
                </span>
              </label>
              <label className="figma-option">
                <input type="checkbox"/>
                <span>
                  <strong>Skip prototyping interactions</strong>
                  <small>Faster import, no auto-wired navigation. Recommended for v1.</small>
                </span>
              </label>
            </div>

            <button type="submit" className="btn btn-coral btn-lg btn-block" disabled={!url.trim()}>
              Parse Figma file →
            </button>
          </form>
        )}

        {stage === "parsing" && (
          <div className="figma-parsing">
            <div className="figma-spinner"/>
            <h3>Reading your Figma file…</h3>
            <ul className="figma-progress">
              <li className="done">✓ Authenticated</li>
              <li className="done">✓ Loaded file structure</li>
              <li className="active">⋯ Extracting frames &amp; components</li>
              <li>Mapping styles to tokens</li>
              <li>Generating preview</li>
            </ul>
          </div>
        )}

        {stage === "ready" && parsed && (
          <div className="figma-ready">
            <div className="figma-ready-icon">✓</div>
            <h3>Parsed <em>{parsed.file}</em></h3>
            <div className="figma-stats">
              <div className="figma-stat"><div className="num">{parsed.frames}</div><div className="lbl">Frames</div></div>
              <div className="figma-stat"><div className="num">{parsed.components}</div><div className="lbl">Components</div></div>
              <div className="figma-stat"><div className="num">{parsed.colors}</div><div className="lbl">Colors</div></div>
              <div className="figma-stat"><div className="num">{parsed.fonts}</div><div className="lbl">Fonts</div></div>
            </div>
            <p>Ready to build. We'll start from the largest frame ("Home") and work outward. You can re-import later when your Figma changes.</p>
            <div className="figma-ready-actions">
              <button className="btn btn-outline" onClick={() => setStage("input")}>Try another file</button>
              <button className="btn btn-coral btn-lg" onClick={onClose}>Start building <span>→</span></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

window.PoofD_Editor_Extras = { VisualEditChip, FigmaImportModal, SeoPane, LogsPane, PaymentsPane };
window.PoofD_Pages2 = { EditorPage };

/* ============= SEO PANE — meta tags, OG image, sitemap, Lighthouse ============= */
function SeoPane({ app }) {
  const [title, setTitle] = useState((app && app.name) ? app.name + " — Fresh sourdough, pickup Saturday" : "Crumb & Co. — Fresh sourdough, pickup Saturday");
  const [desc, setDesc]   = useState("Local bakery in Oakland. Order pickup for Saturday morning — sourdough, croissants, olive oil cake. Bake fresh daily.");
  const [og, setOg]       = useState("/og-image.png");
  const [robots, setRobots] = useState("index, follow");

  const lh = [
    { k: "Performance",     n: 92, tone: "mint" },
    { k: "Accessibility",   n: 96, tone: "mint" },
    { k: "Best practices",  n: 88, tone: "mint" },
    { k: "SEO",             n: 81, tone: "sun" },
  ];

  const routes = [
    { path: "/",              status: "indexed" },
    { path: "/order",         status: "indexed" },
    { path: "/menu",          status: "indexed" },
    { path: "/login",         status: "noindex" },
    { path: "/admin",         status: "noindex" },
  ];

  return (
    <div className="seo-pane">
      <div className="seo-head">
        <h2>SEO &amp; metadata</h2>
        <p>What search engines, social shares, and previews see when your app gets linked.</p>
      </div>

      <div className="seo-grid">
        <section className="seo-section">
          <div className="seo-section-head">
            <h3>Meta tags</h3>
            <span className="seo-section-sub">Edited per page — these are the home defaults.</span>
          </div>

          <label className="seo-field">
            <div className="seo-field-label">
              <span>Title</span>
              <span className={"seo-char " + (title.length > 60 ? "warn" : "")}>{title.length}/60</span>
            </div>
            <input className="seo-input" value={title} onChange={(e) => setTitle(e.target.value)}/>
          </label>

          <label className="seo-field">
            <div className="seo-field-label">
              <span>Description</span>
              <span className={"seo-char " + (desc.length > 160 ? "warn" : "")}>{desc.length}/160</span>
            </div>
            <textarea className="seo-input" rows={3} value={desc} onChange={(e) => setDesc(e.target.value)}/>
          </label>

          <label className="seo-field">
            <div className="seo-field-label"><span>OG image</span></div>
            <div className="seo-og-row">
              <div className="seo-og-thumb"/>
              <div className="seo-og-actions">
                <input className="seo-input" value={og} onChange={(e) => setOg(e.target.value)}/>
                <button className="btn btn-outline btn-sm">Generate with AI</button>
              </div>
            </div>
          </label>

          <label className="seo-field">
            <div className="seo-field-label"><span>Robots</span></div>
            <select className="seo-input" value={robots} onChange={(e) => setRobots(e.target.value)}>
              <option value="index, follow">index, follow</option>
              <option value="noindex, follow">noindex, follow</option>
              <option value="noindex, nofollow">noindex, nofollow</option>
            </select>
          </label>
        </section>

        <section className="seo-section">
          <div className="seo-section-head">
            <h3>Search preview</h3>
            <span className="seo-section-sub">How it'll appear in Google results.</span>
          </div>
          <div className="seo-serp">
            <div className="seo-serp-url">{(app && app.url) || "crumb.appsbuilt.ai"}</div>
            <div className="seo-serp-title">{title}</div>
            <div className="seo-serp-desc">{desc}</div>
          </div>

          <div className="seo-section-head" style={{ marginTop: 20 }}>
            <h3>Social card</h3>
            <span className="seo-section-sub">Twitter / X · LinkedIn · iMessage preview.</span>
          </div>
          <div className="seo-social">
            <div className="seo-social-thumb"/>
            <div className="seo-social-body">
              <div className="seo-social-host">{(app && app.url) || "crumb.appsbuilt.ai"}</div>
              <div className="seo-social-title">{title}</div>
              <div className="seo-social-desc">{desc}</div>
            </div>
          </div>
        </section>

        <section className="seo-section seo-section-wide">
          <div className="seo-section-head">
            <h3>Lighthouse score</h3>
            <span className="seo-section-sub">Last run · 4 min ago · re-runs on every publish.</span>
          </div>
          <div className="seo-lh-row">
            {lh.map(s => (
              <div key={s.k} className={"seo-lh-card tone-" + s.tone}>
                <svg viewBox="0 0 36 36" className="seo-lh-ring">
                  <circle cx="18" cy="18" r="16" className="seo-lh-ring-bg"/>
                  <circle cx="18" cy="18" r="16" className="seo-lh-ring-fg" strokeDasharray={`${s.n} 100`} pathLength="100"/>
                </svg>
                <div className="seo-lh-num">{s.n}</div>
                <div className="seo-lh-k">{s.k}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="seo-section seo-section-wide">
          <div className="seo-section-head">
            <h3>Sitemap &amp; routes</h3>
            <span className="seo-section-sub">Auto-generated, refreshed on publish. <strong>{routes.length}</strong> routes · sitemap.xml live.</span>
          </div>
          <div className="seo-routes">
            {routes.map(r => (
              <div key={r.path} className="seo-route">
                <span className="seo-route-path">{r.path}</span>
                <span className={"seo-route-pill st-" + r.status}>{r.status}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

/* ============= LOGS PANE — request stream + filter ============= */
function LogsPane() {
  const [filter, setFilter] = useState("all");
  const [autoscroll, setAutoscroll] = useState(true);

  const sampleLogs = [
    { t: "10:42:18", lvl: "info",   method: "GET",    path: "/api/orders",         status: 200, ms: 24,  msg: "200 OK · 18 rows" },
    { t: "10:42:14", lvl: "info",   method: "POST",   path: "/api/orders",         status: 201, ms: 89,  msg: "Created order ord_a8f2" },
    { t: "10:42:09", lvl: "warn",   method: "POST",   path: "/api/checkout",       status: 200, ms: 412, msg: "Stripe slow response (412ms)" },
    { t: "10:41:55", lvl: "info",   method: "GET",    path: "/order",              status: 200, ms: 12,  msg: "Page render" },
    { t: "10:41:52", lvl: "error",  method: "POST",   path: "/api/orders/notify",  status: 500, ms: 1820, msg: "Gmail SMTP timeout · retrying in 30s" },
    { t: "10:41:30", lvl: "info",   method: "GET",    path: "/api/menu_items",     status: 200, ms: 18,  msg: "200 OK · 12 rows · cache HIT" },
    { t: "10:41:22", lvl: "info",   method: "POST",   path: "/api/orders",         status: 201, ms: 76,  msg: "Created order ord_c93e" },
    { t: "10:40:48", lvl: "warn",   method: "—",      path: "—",                   status: 0,   ms: 0,   msg: "Background job: refresh inventory cache" },
    { t: "10:40:11", lvl: "info",   method: "GET",    path: "/",                   status: 200, ms: 8,   msg: "Page render" },
    { t: "10:39:54", lvl: "error",  method: "POST",   path: "/api/orders",         status: 400, ms: 14,  msg: "Validation: missing pickup_time" },
    { t: "10:39:30", lvl: "info",   method: "GET",    path: "/api/orders/ord_001", status: 200, ms: 11,  msg: "200 OK" },
    { t: "10:38:42", lvl: "info",   method: "DELETE", path: "/api/orders/ord_old", status: 204, ms: 18,  msg: "Soft-deleted" },
  ];
  const logs = sampleLogs.filter(l => filter === "all" || l.lvl === filter);
  const counts = {
    all:   sampleLogs.length,
    info:  sampleLogs.filter(l => l.lvl === "info").length,
    warn:  sampleLogs.filter(l => l.lvl === "warn").length,
    error: sampleLogs.filter(l => l.lvl === "error").length,
  };

  return (
    <div className="logs-pane">
      <div className="logs-head">
        <h2>Server logs</h2>
        <p>Live stream of every request hitting your app. Filter by level, click any row to see headers and payload.</p>
      </div>

      <div className="logs-toolbar">
        <div className="logs-filter-pills">
          {[
            { id: "all",   lbl: "All",     cls: "" },
            { id: "info",  lbl: "Info",    cls: "info" },
            { id: "warn",  lbl: "Warnings",cls: "warn" },
            { id: "error", lbl: "Errors",  cls: "error" },
          ].map(p => (
            <button
              key={p.id}
              className={"logs-pill " + p.cls + (filter === p.id ? " active" : "")}
              onClick={() => setFilter(p.id)}
            >
              {p.lbl}
              <span className="logs-pill-count">{counts[p.id]}</span>
            </button>
          ))}
        </div>

        <div className="logs-actions">
          <label className="logs-toggle">
            <input type="checkbox" checked={autoscroll} onChange={(e) => setAutoscroll(e.target.checked)}/>
            <span>Auto-scroll</span>
          </label>
          <button className="btn btn-outline btn-sm">Pause</button>
          <button className="btn btn-outline btn-sm">Clear</button>
          <button className="btn btn-outline btn-sm">Export ↓</button>
        </div>
      </div>

      <div className="logs-stream">
        <div className="logs-stream-head">
          <span>Time</span>
          <span>Lvl</span>
          <span>Method</span>
          <span>Path</span>
          <span>Status</span>
          <span>Took</span>
          <span>Message</span>
        </div>
        {logs.map((l, i) => (
          <div key={i} className={"logs-row lvl-" + l.lvl}>
            <span className="logs-time">{l.t}</span>
            <span className={"logs-lvl lvl-" + l.lvl}>{l.lvl.toUpperCase()}</span>
            <span className={"logs-method " + (l.method !== "—" ? "m-" + l.method.toLowerCase() : "")}>{l.method}</span>
            <span className="logs-path">{l.path}</span>
            <span className={"logs-status s-" + Math.floor(l.status / 100)}>{l.status > 0 ? l.status : "—"}</span>
            <span className={"logs-ms " + (l.ms > 400 ? "slow" : "")}>{l.ms > 0 ? l.ms + "ms" : "—"}</span>
            <span className="logs-msg">{l.msg}</span>
          </div>
        ))}
      </div>

      <div className="logs-foot">
        <Ic.Lock/>
        <span>Logs retained for 30 days · Pro plan retention 90 days · Business plan retention 1 year</span>
      </div>
    </div>
  );
}
