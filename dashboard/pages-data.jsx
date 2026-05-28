/* global React, PoofD */
const { useState, useMemo, Ic } = PoofD;

/* ============= DATA — built-in database with visual schema ============= */

const TABLES = [
  {
    id: "orders",
    name: "orders",
    icon: "🥐",
    rows: 1284,
    storage: "14 MB",
    growth: "+182 this week",
    fields: [
      { name: "id",          type: "uuid",      key: "pk",   nullable: false, default: "auto" },
      { name: "customer",    type: "text",      key: "",     nullable: false },
      { name: "email",       type: "text",      key: "idx",  nullable: false },
      { name: "pickup_time", type: "timestamp", key: "",     nullable: false },
      { name: "items",       type: "jsonb",     key: "",     nullable: false },
      { name: "total_cents", type: "integer",   key: "",     nullable: false },
      { name: "status",      type: "enum",      key: "",     nullable: false, default: "pending" },
      { name: "created_at",  type: "timestamp", key: "",     nullable: false, default: "now()" },
    ],
    rowsPreview: [
      { id: "ord_a18c", customer: "Aisha M.",   email: "aisha@…",  pickup_time: "Sat 9:30",  items: "Sourdough × 2", total_cents: 2400, status: "ready",   created_at: "2h ago" },
      { id: "ord_b22f", customer: "Marcus W.",  email: "mwebb@…",  pickup_time: "Sat 10:00", items: "Croissants × 6", total_cents: 1800, status: "paid",    created_at: "4h ago" },
      { id: "ord_c93e", customer: "Devon P.",   email: "devon@…",  pickup_time: "Sat 10:30", items: "Olive cake × 1", total_cents: 1200, status: "paid",    created_at: "5h ago" },
      { id: "ord_d18a", customer: "Sarah L.",   email: "sarah@…",  pickup_time: "Sat 11:00", items: "Sourdough × 1, Almond × 2", total_cents: 2800, status: "pending", created_at: "6h ago" },
      { id: "ord_e44b", customer: "Rachel M.",  email: "rmm@…",    pickup_time: "Sun 9:00",  items: "Sourdough × 3", total_cents: 3600, status: "paid",    created_at: "yesterday" },
    ],
  },
  {
    id: "customers",
    name: "customers",
    icon: "👤",
    rows: 412,
    storage: "2.1 MB",
    growth: "+18 this week",
    fields: [
      { name: "id",          type: "uuid",      key: "pk",   nullable: false, default: "auto" },
      { name: "email",       type: "text",      key: "uq",   nullable: false },
      { name: "name",        type: "text",      key: "",     nullable: true  },
      { name: "phone",       type: "text",      key: "",     nullable: true  },
      { name: "orders_count",type: "integer",   key: "",     nullable: false, default: "0" },
      { name: "created_at",  type: "timestamp", key: "",     nullable: false, default: "now()" },
    ],
    rowsPreview: [
      { id: "cus_001", email: "aisha@…",  name: "Aisha M.",  phone: "+1 (415)…", orders_count: 14, created_at: "Apr 2" },
      { id: "cus_002", email: "mwebb@…",  name: "Marcus W.", phone: "—",         orders_count: 8,  created_at: "Apr 8" },
      { id: "cus_003", email: "devon@…",  name: "Devon P.",  phone: "+1 (510)…", orders_count: 22, created_at: "Mar 14" },
      { id: "cus_004", email: "sarah@…",  name: "Sarah L.",  phone: "—",         orders_count: 3,  created_at: "May 12" },
    ],
  },
  {
    id: "menu_items",
    name: "menu_items",
    icon: "📋",
    rows: 12,
    storage: "48 KB",
    growth: "—",
    fields: [
      { name: "id",          type: "uuid",      key: "pk",   nullable: false, default: "auto" },
      { name: "name",        type: "text",      key: "",     nullable: false },
      { name: "description", type: "text",      key: "",     nullable: true  },
      { name: "price_cents", type: "integer",   key: "",     nullable: false },
      { name: "available",   type: "boolean",   key: "",     nullable: false, default: "true" },
      { name: "image_url",   type: "text",      key: "",     nullable: true  },
    ],
    rowsPreview: [
      { id: "itm_01", name: "Sourdough loaf", description: "24-hour fermented", price_cents: 1200, available: "true",  image_url: "/img/…" },
      { id: "itm_02", name: "Almond croissant", description: "Made fresh daily", price_cents: 600, available: "true",  image_url: "/img/…" },
      { id: "itm_03", name: "Olive oil cake", description: "Slice", price_cents: 800, available: "true",  image_url: "/img/…" },
      { id: "itm_04", name: "Plain croissant", description: "Made fresh daily", price_cents: 500, available: "false", image_url: "/img/…" },
    ],
  },
  {
    id: "subscribers",
    name: "subscribers",
    icon: "✉️",
    rows: 89,
    storage: "320 KB",
    growth: "+12 this week",
    fields: [
      { name: "id",         type: "uuid",      key: "pk",   nullable: false, default: "auto" },
      { name: "email",      type: "text",      key: "uq",   nullable: false },
      { name: "source",     type: "text",      key: "",     nullable: true  },
      { name: "confirmed",  type: "boolean",   key: "",     nullable: false, default: "false" },
      { name: "created_at", type: "timestamp", key: "",     nullable: false, default: "now()" },
    ],
    rowsPreview: [
      { id: "sub_01", email: "anya@…",   source: "footer-form",   confirmed: "true",  created_at: "yesterday" },
      { id: "sub_02", email: "ben@…",    source: "popup",         confirmed: "true",  created_at: "2 days ago" },
      { id: "sub_03", email: "cara@…",   source: "footer-form",   confirmed: "false", created_at: "3 days ago" },
    ],
  },
];

function DataPage() {
  const [activeId, setActiveId] = useState(TABLES[0].id);
  const [tab, setTab] = useState("rows"); // rows / schema / api

  const table = TABLES.find(t => t.id === activeId);

  const totals = useMemo(() => ({
    tables: TABLES.length,
    rows: TABLES.reduce((s, t) => s + t.rows, 0),
    storage: "16.5 MB",
    queries: "1,284 / day",
  }), []);

  return (
    <div className="page page-data" data-screen-label="data">
      <div className="page-head">
        <div>
          <h1>Data</h1>
          <div className="sub">A real database, no SQL required. Tables, rows, schema — all visual, all yours.</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-outline"><Ic.Database/> SQL editor</button>
          <button className="btn btn-coral"><Ic.Plus/> New table</button>
        </div>
      </div>

      <div className="data-stats">
        <div className="data-stat">
          <div className="data-stat-num">{totals.tables}</div>
          <div className="data-stat-lbl">Tables</div>
        </div>
        <div className="data-stat">
          <div className="data-stat-num">{totals.rows.toLocaleString()}</div>
          <div className="data-stat-lbl">Rows</div>
        </div>
        <div className="data-stat">
          <div className="data-stat-num">{totals.storage}</div>
          <div className="data-stat-lbl">Storage used</div>
        </div>
        <div className="data-stat">
          <div className="data-stat-num">{totals.queries}</div>
          <div className="data-stat-lbl">Queries today</div>
        </div>
      </div>

      <div className="data-shell">
        {/* Tables sidebar */}
        <aside className="data-sidebar">
          <div className="data-sidebar-head">
            <span>Tables</span>
            <button className="data-add-btn" title="New table"><Ic.Plus/></button>
          </div>
          <div className="data-table-list">
            {TABLES.map(t => (
              <button
                key={t.id}
                className={"data-table-item" + (activeId === t.id ? " active" : "")}
                onClick={() => setActiveId(t.id)}
              >
                <span className="data-table-emoji">{t.icon}</span>
                <div className="data-table-meta">
                  <div className="data-table-name">{t.name}</div>
                  <div className="data-table-rows">{t.rows.toLocaleString()} rows</div>
                </div>
              </button>
            ))}
          </div>
          <div className="data-sidebar-foot">
            <Ic.Database/>
            <div>
              <div className="data-foot-name">Built-in DB</div>
              <div className="data-foot-sub">Postgres-compatible</div>
            </div>
          </div>
        </aside>

        {/* Main panel */}
        <main className="data-main">
          <div className="data-main-head">
            <div className="data-main-title">
              <span className="data-main-emoji">{table.icon}</span>
              <h2>{table.name}</h2>
              <span className="data-main-rowct">{table.rows.toLocaleString()} rows · {table.storage} · <span className="data-growth">{table.growth}</span></span>
            </div>
            <div className="data-main-tabs">
              {["rows", "schema", "api"].map(t => (
                <button
                  key={t}
                  className={"data-main-tab" + (tab === t ? " active" : "")}
                  onClick={() => setTab(t)}
                >
                  {t === "rows" ? "Rows" : t === "schema" ? "Schema" : "API"}
                </button>
              ))}
            </div>
            <div className="data-main-actions">
              <button className="btn btn-outline btn-sm"><Ic.Search/> Filter</button>
              <button className="btn btn-outline btn-sm">Export ↓</button>
              <button className="btn btn-coral btn-sm"><Ic.Plus/> Row</button>
            </div>
          </div>

          {tab === "rows" && (
            <div className="data-rows-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    {table.fields.map(f => (
                      <th key={f.name}>
                        <div className="data-th-row">
                          <span className="data-th-name">{f.name}</span>
                          {f.key === "pk" && <span className="data-key pk" title="Primary key">PK</span>}
                          {f.key === "uq" && <span className="data-key uq" title="Unique">UQ</span>}
                          {f.key === "idx" && <span className="data-key idx" title="Indexed">IDX</span>}
                        </div>
                        <div className="data-th-type">{f.type}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.rowsPreview.map((r, i) => (
                    <tr key={i}>
                      {table.fields.map(f => {
                        const val = r[f.name];
                        const isMono = f.type === "uuid" || f.type === "timestamp" || f.type === "integer";
                        return (
                          <td key={f.name} className={isMono ? "mono" : ""}>
                            {f.name === "status" ? (
                              <span className={"data-pill status-" + val}>{val}</span>
                            ) : f.name === "available" ? (
                              <span className={"data-bool b-" + val}>{val === "true" ? "✓" : "—"}</span>
                            ) : f.type === "integer" && f.name.endsWith("_cents") ? (
                              "$" + (val / 100).toFixed(2)
                            ) : (
                              val
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  <tr className="data-add-row">
                    <td colSpan={table.fields.length}>
                      <button className="data-add-row-btn"><Ic.Plus/> Add row</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="data-rows-foot">
                <span>Showing {table.rowsPreview.length} of {table.rows.toLocaleString()} rows</span>
                <div className="data-pager">
                  <button className="data-page-btn" disabled>‹</button>
                  <span>Page 1</span>
                  <button className="data-page-btn">›</button>
                </div>
              </div>
            </div>
          )}

          {tab === "schema" && (
            <div className="data-schema">
              <div className="data-schema-card">
                <div className="data-schema-card-head">
                  <span className="data-table-emoji">{table.icon}</span>
                  <h3>{table.name}</h3>
                </div>
                {table.fields.map((f, i) => (
                  <div key={f.name} className="data-field">
                    <div className="data-field-num">{String(i + 1).padStart(2, "0")}</div>
                    <div className="data-field-name">{f.name}</div>
                    <div className="data-field-type">{f.type}</div>
                    <div className="data-field-flags">
                      {f.key === "pk"  && <span className="data-key pk">PK</span>}
                      {f.key === "uq"  && <span className="data-key uq">UQ</span>}
                      {f.key === "idx" && <span className="data-key idx">IDX</span>}
                      {!f.nullable && <span className="data-flag required">Required</span>}
                      {f.default && <span className="data-flag default">Default: {f.default}</span>}
                    </div>
                    <button className="data-field-edit" title="Edit field"><Ic.Pencil/></button>
                  </div>
                ))}
                <button className="data-schema-add">
                  <Ic.Plus/> Add field
                </button>
              </div>

              <div className="data-schema-rels">
                <div className="data-schema-rels-head">Relationships</div>
                <div className="data-rel">
                  <Ic.Branch/>
                  <span><strong>{table.name}.customer</strong> → customers.email</span>
                  <span className="data-rel-kind">many-to-one</span>
                </div>
                <div className="data-rel">
                  <Ic.Branch/>
                  <span><strong>{table.name}.items</strong> → menu_items.id[]</span>
                  <span className="data-rel-kind">many-to-many</span>
                </div>
                <button className="data-rel-add"><Ic.Plus/> New relationship</button>
              </div>
            </div>
          )}

          {tab === "api" && (
            <div className="data-api">
              <div className="data-api-card">
                <div className="data-api-method get">GET</div>
                <div className="data-api-body">
                  <div className="data-api-path">/api/{table.name}</div>
                  <div className="data-api-desc">List all rows. Supports filter, sort, paginate.</div>
                </div>
                <button className="btn btn-outline btn-sm">Try</button>
              </div>
              <div className="data-api-card">
                <div className="data-api-method post">POST</div>
                <div className="data-api-body">
                  <div className="data-api-path">/api/{table.name}</div>
                  <div className="data-api-desc">Create a new row.</div>
                </div>
                <button className="btn btn-outline btn-sm">Try</button>
              </div>
              <div className="data-api-card">
                <div className="data-api-method patch">PATCH</div>
                <div className="data-api-body">
                  <div className="data-api-path">/api/{table.name}/:id</div>
                  <div className="data-api-desc">Update an existing row.</div>
                </div>
                <button className="btn btn-outline btn-sm">Try</button>
              </div>
              <div className="data-api-card">
                <div className="data-api-method delete">DELETE</div>
                <div className="data-api-body">
                  <div className="data-api-path">/api/{table.name}/:id</div>
                  <div className="data-api-desc">Soft-delete a row (recoverable for 30 days).</div>
                </div>
                <button className="btn btn-outline btn-sm">Try</button>
              </div>

              <div className="data-api-note">
                <Ic.Lock/>
                <div>
                  <strong>Authentication.</strong> All endpoints require a workspace API key.
                  Generate one in Settings → Connectors → API keys. Rate limit: 1,000 req/min.
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

window.PoofD_Data = { DataPage };
