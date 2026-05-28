/* global React, PoofD */
const { useState, Ic, APPS } = PoofD;

/* ============= TEMPLATES ============= */
function TemplatesPage({ setPage }) {
  const tpls = [
    { name: "Bakery pickup", desc: "Pre-orders & time slots", thumb: "thumb-bakery", cat: "Business" },
    { name: "Coach portal",  desc: "Client sessions & notes", thumb: "thumb-portal", cat: "Business" },
    { name: "Yoga studio",   desc: "Class schedule & signups", thumb: "thumb-yoga",  cat: "Business" },
    { name: "Tiny shop",     desc: "Weekend storefront", thumb: "thumb-shop", cat: "Stores" },
    { name: "Book club",     desc: "Picks & RSVPs", thumb: "thumb-book", cat: "Personal" },
    { name: "Event RSVP",    desc: "Guests & venue", thumb: "thumb-event", cat: "Personal" },
    { name: "Pet sitter",    desc: "Booking form", thumb: "thumb-pet", cat: "Forms" },
    { name: "Freelance invoice", desc: "Send & track", thumb: "thumb-invoice", cat: "Business" },
    { name: "Customer feedback", desc: "Stars + comments", thumb: "thumb-pet", cat: "Forms" },
  ];
  const [cat, setCat] = useState("All");
  const visible = cat === "All" ? tpls : tpls.filter(t => t.cat === cat);

  return (
    <div className="page" data-screen-label="templates">
      <div className="page-head">
        <div>
          <h1>Templates</h1>
          <div className="sub">Start from one of {tpls.length}+ ready-made apps. All remixable.</div>
        </div>
      </div>

      <div className="chips-row" style={{ marginBottom: 24 }}>
        {["All", "Business", "Personal", "Forms", "Stores"].map((c) => (
          <button key={c} className={"chip" + (cat === c ? " active" : "")} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>

      <div className="tpl-grid">
        {visible.map((t) => (
          <div key={t.name} className="tpl-card" onClick={() => setPage("editor")}>
            <div className={"thumb " + t.thumb}>
              <span className="thumb-cat">{t.cat}</span>
            </div>
            <div className="body">
              <div>
                <h4>{t.name}</h4>
                <p>{t.desc}</p>
              </div>
              <button className="btn btn-outline btn-sm">Use <Ic.ArrowR/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============= ANALYTICS ============= */
function AnalyticsPage() {
  const days = 28;
  const data = useMemo28();
  function useMemo28() {
    return React.useMemo(() => {
      return Array.from({ length: days }).map((_, i) => ({
        d: i,
        v: 30 + Math.round(Math.sin(i / 3) * 18 + Math.random() * 20 + (i > 14 ? 24 : 0)),
      }));
    }, []);
  }
  const max = Math.max(...data.map(d => d.v));
  const path = data.map((p, i) => {
    const x = (i / (days - 1)) * 100;
    const y = 100 - (p.v / max) * 90;
    return (i === 0 ? "M" : "L") + x + " " + y;
  }).join(" ");
  const areaPath = path + ` L 100 100 L 0 100 Z`;

  return (
    <div className="page" data-screen-label="analytics">
      <div className="page-head">
        <div>
          <h1>Analytics</h1>
          <div className="sub">All apps · last 28 days</div>
        </div>
        <div className="seg">
          <button>7d</button>
          <button className="active">28d</button>
          <button>3m</button>
          <button>1y</button>
        </div>
      </div>

      <div className="kpis">
        <div className="kpi">
          <div className="kpi-label">Total visitors</div>
          <div className="kpi-value">12,847</div>
          <div className="kpi-delta up"><Ic.Up/> +18% vs. previous 28d</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Avg. time on page</div>
          <div className="kpi-value">1m 42s</div>
          <div className="kpi-delta up"><Ic.Up/> +8%</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Conversions</div>
          <div className="kpi-value">486</div>
          <div className="kpi-delta up"><Ic.Up/> +24%</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Bounce rate</div>
          <div className="kpi-value">31%</div>
          <div className="kpi-delta down"><Ic.Down/> −4%</div>
        </div>
      </div>

      <div className="chart-card">
        <div className="chart-head">
          <h3>Visitors over time</h3>
          <div style={{ display: "flex", gap: 16, alignItems: "center", fontSize: 12.5, color: "var(--ink-3)" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: "var(--coral)" }}></span>Visitors</span>
          </div>
        </div>
        <svg className="chart-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF5C4D" stopOpacity=".25"/>
              <stop offset="100%" stopColor="#FF5C4D" stopOpacity="0"/>
            </linearGradient>
          </defs>
          {/* grid */}
          {[0, 25, 50, 75, 100].map((y) => (
            <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="#ECE4CE" strokeWidth="0.3" vectorEffect="non-scaling-stroke"/>
          ))}
          <path d={areaPath} fill="url(#ag)"/>
          <path d={path} fill="none" stroke="#FF5C4D" strokeWidth="0.6" vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round"/>
        </svg>
      </div>

      <div className="split-grid">
        <div className="chart-card" style={{ marginBottom: 0 }}>
          <div className="chart-head">
            <h3>Top apps</h3>
            <a style={{ fontSize: 12.5, color: "var(--ink-3)" }}>View all</a>
          </div>
          {[
            { n: "Crumb & Co.", v: 5284, p: 100 },
            { n: "Stillpoint", v: 3120, p: 60 },
            { n: "Garage Sale", v: 2480, p: 48 },
            { n: "Invoice Stack", v: 1248, p: 24 },
            { n: "PawPal", v: 715, p: 14 },
          ].map((a) => (
            <div key={a.n} className="list-row">
              <span className="label">{a.n}</span>
              <div className="list-bar"><div style={{ width: a.p + "%" }}></div></div>
              <span className="count">{a.v.toLocaleString()}</span>
            </div>
          ))}
        </div>
        <div className="chart-card" style={{ marginBottom: 0 }}>
          <div className="chart-head">
            <h3>Top referrers</h3>
          </div>
          {[
            { n: "Direct / typed", v: 5612, p: 80 },
            { n: "instagram.com", v: 3204, p: 46 },
            { n: "google.com", v: 2188, p: 32 },
            { n: "tiktok.com", v: 1140, p: 16 },
            { n: "Other", v: 703, p: 10 },
          ].map((a) => (
            <div key={a.n} className="list-row">
              <span className="label">{a.n}</span>
              <div className="list-bar"><div style={{ width: a.p + "%", background: "var(--sky)" }}></div></div>
              <span className="count">{a.v.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

window.PoofD_Pages3 = { TemplatesPage, AnalyticsPage };
