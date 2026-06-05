/* ============================================================
   Shared components + inline icon set (exported to window)
   ============================================================ */
const { useState, useEffect, useRef, useCallback } = React;

/* ---- Inline SVG icons (stroke, 24x24, currentColor) ---- */
const ICONS = {
  home: "M3 10.5 12 3l9 7.5M5 9.5V21h5v-6h4v6h5V9.5",
  calendar: "M7 3v3M17 3v3M4 8h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z",
  mic: "M12 3a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3ZM5 11a7 7 0 0 0 14 0M12 18v3",
  users: "M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm13 8v-1a4 4 0 0 0-3-3.87M16 4.13A3.5 3.5 0 0 1 16 11",
  grid: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  pin: "M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  link: "M10 14a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5M14 10a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5",
  star: "M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.7 1-5.8L3.5 9.7l5.9-.9L12 3.5Z",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7v5l3 2",
  arrowRight: "M5 12h14M13 6l6 6-6 6",
  chevronRight: "M9 6l6 6-6 6",
  x: "M6 6l12 12M18 6 6 18",
  share: "M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 6l-4-4-4 4M12 2v14",
  plus: "M12 5v14M5 12h14",
  check: "M5 12.5l4.5 4.5L19 7",
  camera: "M4 8a2 2 0 0 1 2-2h2l1.5-2h5L18 6h0a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Zm8 9a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z",
  hotel: "M3 21h18M5 21V5a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v16M9 8h0M13 8h0M9 12h0M13 12h0M10 21v-4h4v4",
  ticket: "M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V8ZM15 6v12",
  info: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 11v5M12 7.5h0",
  download: "M12 4v11m0 0 4-4m-4 4-4-4M5 19h14",
  navigation: "M3 11l18-8-8 18-2.5-7.5L3 11Z",
  coffee: "M4 8h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8Zm13 1h2.5a2.5 2.5 0 0 1 0 5H17M7 4V2.5M11 4V2.5M15 4V2.5",
  sparkles: "M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3ZM18 14l.9 2.1 2.1.9-2.1.9L18 20l-.9-2.1L15 17l2.1-.9L18 14Z",
  mail: "M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Zm0 1.5 8 5.5 8-5.5",
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3Z",
  phone: "M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 4.5 4.5l1.5-2 4 1.5v3a1.5 1.5 0 0 1-1.6 1.5A16 16 0 0 1 5 4.6 1.5 1.5 0 0 1 6.5 3Z",
  gift: "M12 7V21M4 7h16v3H4zM5 10v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9M9 7a2 2 0 1 1 3-2 2 2 0 1 1 3 2",
  help: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM9.5 9.5a2.5 2.5 0 0 1 4.8.9c0 1.7-2.3 2-2.3 3.6M12 17.5h0",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM21 21l-5-5",
};

function Icon({ name, size = 24, stroke = 2, fill = "none", className, style }) {
  const d = ICONS[name] || "";
  return (
    <svg className={className} style={style} width={size} height={size} viewBox="0 0 24 24"
      fill={fill === "current" ? "currentColor" : "none"}
      stroke={fill === "current" ? "none" : "currentColor"}
      strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

/* ---- localStorage-backed state ---- */
function useStored(key, initial) {
  const [val, setVal] = useState(() => {
    try { const v = localStorage.getItem(key); return v != null ? JSON.parse(v) : initial; }
    catch { return initial; }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
  }, [key, val]);
  return [val, setVal];
}

/* ---- Avatar with gradient by seed; supports uploaded photo ---- */
const AV_GRADS = [
  "linear-gradient(150deg,#5C2EB8,#190a3d)",
  "linear-gradient(150deg,#FB8453,#A8458E)",
  "linear-gradient(150deg,#A8458E,#3B1C82)",
  "linear-gradient(150deg,#3B1C82,#0B0715)",
  "linear-gradient(150deg,#CF5F7A,#5C2EB8)",
  "linear-gradient(150deg,#825FD1,#190a3d)",
];
function gradFor(seed = "") {
  let h = 0; for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return AV_GRADS[h % AV_GRADS.length];
}
function Avatar({ initials, seed, size = 44, photo, photoStyle, className = "" }) {
  return (
    <div className={"av-circle " + className} style={{ width: size, height: size, background: photo ? "#190a3d" : gradFor(seed || initials), fontSize: size * 0.36 }}>
      {photo ? <img className="av-photo" src={photo} alt="" style={photoStyle} /> : (initials || "?")}
    </div>
  );
}

/* ---- Bottom sheet ---- */
function Sheet({ open, onClose, children }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <React.Fragment>
      <div className="sheet-scrim" onClick={onClose} />
      <div className="sheet" role="dialog" aria-modal="true">
        <div className="grab" />
        {children}
      </div>
    </React.Fragment>
  );
}

/* ---- Screen header (eyebrow + big title) ---- */
function ScreenHeader({ eyebrow, title, sub }) {
  return (
    <div style={{ paddingTop: 6, marginBottom: 18 }}>
      {eyebrow && <div className="eyebrow" style={{ marginBottom: 8 }}>{eyebrow}</div>}
      <h1 className="screen-title">{title}</h1>
      {sub && <p className="muted" style={{ fontSize: 13.5, lineHeight: 1.5, margin: "8px 0 0" }}>{sub}</p>}
    </div>
  );
}

/* ---- time helpers ---- */
function fmt12(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  const ap = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${ap}`;
}
function fmt12short(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  const ap = h >= 12 ? "p" : "a";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${h12}${ap}` : `${h12}:${String(m).padStart(2, "0")}${ap}`;
}

Object.assign(window, { Icon, ICONS, useStored, Avatar, gradFor, Sheet, ScreenHeader, fmt12, fmt12short });
