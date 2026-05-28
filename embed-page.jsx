/* global React, PoofPart1, PoofPart3 */
const { Logo, Nav } = window.PoofPart1;
const { Footer } = window.PoofPart3;
const { useState } = React;

const VARIANTS = [
  { id: "light",  label: "Light",   bg: "#FFFFFF", fg: "#1F1A2E", line: "#E6DECC" },
  { id: "dark",   label: "Dark",    bg: "#1F1A2E", fg: "#FAEFD2", line: "rgba(255,255,255,.12)" },
  { id: "cream",  label: "Cream",   bg: "#F5EFE3", fg: "#1F1A2E", line: "#E6DECC" },
  { id: "coral",  label: "Coral",   bg: "linear-gradient(135deg,#FB8855,#D45F7E,#9C3597)", fg: "#FFFFFF", line: "transparent" },
];

const SIZES = [
  { id: "sm", label: "Small",  px: 28 },
  { id: "md", label: "Medium", px: 36 },
  { id: "lg", label: "Large",  px: 44 },
];

const SHAPES = [
  { id: "pill",   label: "Pill" },
  { id: "rect",   label: "Rounded" },
  { id: "square", label: "Square" },
];

function Badge({ variant = "light", size = "md", shape = "pill", showAvatars = true }) {
  const v = VARIANTS.find((x) => x.id === variant);
  const s = SIZES.find((x) => x.id === size);
  const radius = shape === "pill" ? 999 : shape === "rect" ? 12 : 4;

  return (
    <a
      href="#"
      className="emb-badge"
      style={{
        background: v.bg,
        color: v.fg,
        border: `1px solid ${v.line}`,
        borderRadius: radius,
        padding: `${Math.round(s.px * 0.22)}px ${Math.round(s.px * 0.42)}px`,
        fontSize: Math.round(s.px * 0.36),
      }}
    >
      {showAvatars && (
        <span className="emb-badge-spark" aria-hidden="true">
          <svg viewBox="0 0 24 24" width={Math.round(s.px * 0.5)} height={Math.round(s.px * 0.5)} fill="none">
            <defs>
              <linearGradient id={`emb-g-${variant}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%"  stopColor="#FB8855"/>
                <stop offset="50%" stopColor="#D45F7E"/>
                <stop offset="100%" stopColor="#9C3597"/>
              </linearGradient>
            </defs>
            <path
              d="M12 2 L14 9 L22 12 L14 15 L12 22 L10 15 L2 12 L10 9 Z"
              fill={`url(#emb-g-${variant})`}
            />
          </svg>
        </span>
      )}
      <span className="emb-badge-text">
        <span className="emb-badge-lead">Built with</span>
        <strong>AppsBuiltWithAI</strong>
      </span>
    </a>
  );
}

function CodeBlock({ children, language = "html" }) {
  const [copied, setCopied] = useState(false);
  const onCopy = () => {
    if (navigator.clipboard) {
      try {
        navigator.clipboard.writeText(children);
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      } catch (e) {}
    }
  };
  return (
    <div className="emb-code">
      <div className="emb-code-head">
        <span className="emb-code-lang">{language}</span>
        <button className={"emb-code-copy" + (copied ? " is-copied" : "")} onClick={onCopy}>
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>
      <pre><code>{children}</code></pre>
    </div>
  );
}

function EmbedPage() {
  const [variant, setVariant] = useState("light");
  const [size, setSize] = useState("md");
  const [shape, setShape] = useState("pill");
  const [showAvatars, setShowAvatars] = useState(true);

  const snippetHtml =
`<a href="https://appsbuiltwithai.com?ref=builtwith" target="_blank"
   style="display:inline-flex;align-items:center;gap:8px;padding:8px 14px;
          background:#fff;color:#1F1A2E;border:1px solid #E6DECC;
          border-radius:999px;font-family:system-ui;font-size:13px;
          text-decoration:none;">
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path d="M12 2L14 9L22 12L14 15L12 22L10 15L2 12L10 9Z"
          fill="#FB8855"/>
  </svg>
  <span>Built with <strong>AppsBuiltWithAI</strong></span>
</a>`;

  const snippetReact =
`<a
  href="https://appsbuiltwithai.com?ref=builtwith"
  target="_blank"
  className="builtwith-badge"
>
  <BuiltWithSparkIcon />
  <span>Built with <strong>AppsBuiltWithAI</strong></span>
</a>`;

  const snippetMd =
`[![Built with AppsBuiltWithAI](https://appsbuiltwithai.com/badge.svg)](https://appsbuiltwithai.com?ref=builtwith)`;

  const snippetSvg =
`<img src="https://appsbuiltwithai.com/badge-${variant}.svg" alt="Built with AppsBuiltWithAI" />`;

  return (
    <div className="emb-root">
      <Nav/>

      <main className="emb-main">
        {/* HERO */}
        <section className="emb-hero wrap">
          <span className="emb-eyebrow">
            <span className="emb-eyebrow-dot"></span>
            Built-with badge
          </span>
          <h1 className="emb-h1">
            Show off what you<br/>
            <em>shipped in 9 minutes.</em>
          </h1>
          <p className="emb-sub">
            Every app built on AppsBuiltWithAI gets a free "Built with" badge for your footer.
            It looks great, it loads fast, it earns you <strong>$5 in credits</strong> for each visitor who joins.
          </p>
          <div className="emb-stat-row">
            <div className="emb-stat">
              <div className="emb-stat-n">$5</div>
              <div className="emb-stat-l">credits per signup</div>
            </div>
            <div className="emb-stat">
              <div className="emb-stat-n">2 KB</div>
              <div className="emb-stat-l">total page weight</div>
            </div>
            <div className="emb-stat">
              <div className="emb-stat-n">0</div>
              <div className="emb-stat-l">trackers, ever</div>
            </div>
          </div>
        </section>

        {/* CONFIGURATOR */}
        <section className="emb-config wrap">
          <div className="emb-config-head">
            <h2 className="emb-h2">Make it yours.</h2>
            <p>Pick a style, copy the code, drop it in your footer.</p>
          </div>

          <div className="emb-config-grid">
            {/* Preview */}
            <div className="emb-preview">
              <div className="emb-preview-stage">
                <div className="emb-preview-checker"></div>
                <Badge variant={variant} size={size} shape={shape} showAvatars={showAvatars}/>
              </div>
              <div className="emb-preview-foot">
                <span className="emb-preview-tag">Live preview</span>
                <span className="emb-preview-meta">{VARIANTS.find(v=>v.id===variant).label} · {SIZES.find(s=>s.id===size).label} · {SHAPES.find(s=>s.id===shape).label}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="emb-controls">
              <div className="emb-control">
                <label>Style</label>
                <div className="emb-swatch-row">
                  {VARIANTS.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setVariant(v.id)}
                      className={"emb-swatch" + (variant === v.id ? " is-on" : "")}
                      style={{ background: v.bg, borderColor: v.line === "transparent" ? "rgba(0,0,0,.1)" : v.line }}
                      aria-label={v.label}
                    >
                      {variant === v.id && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={v.fg} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="emb-control">
                <label>Size</label>
                <div className="emb-seg">
                  {SIZES.map((s) => (
                    <button key={s.id} className={"emb-seg-btn" + (size === s.id ? " is-on" : "")} onClick={() => setSize(s.id)}>
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="emb-control">
                <label>Shape</label>
                <div className="emb-seg">
                  {SHAPES.map((s) => (
                    <button key={s.id} className={"emb-seg-btn" + (shape === s.id ? " is-on" : "")} onClick={() => setShape(s.id)}>
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="emb-control">
                <label>Show spark icon</label>
                <button
                  className={"emb-toggle" + (showAvatars ? " is-on" : "")}
                  onClick={() => setShowAvatars(!showAvatars)}
                  role="switch"
                  aria-checked={showAvatars}
                >
                  <span className="emb-toggle-thumb"></span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CODE */}
        <section className="emb-snippets wrap">
          <div className="emb-snip-head">
            <h2 className="emb-h2">Drop in the code.</h2>
            <p>One copy. Works everywhere. No script tags, no trackers.</p>
          </div>
          <div className="emb-snip-grid">
            <div>
              <h3 className="emb-snip-title">HTML</h3>
              <CodeBlock language="html">{snippetHtml}</CodeBlock>
            </div>
            <div>
              <h3 className="emb-snip-title">React / JSX</h3>
              <CodeBlock language="jsx">{snippetReact}</CodeBlock>
            </div>
            <div>
              <h3 className="emb-snip-title">Markdown / README</h3>
              <CodeBlock language="md">{snippetMd}</CodeBlock>
            </div>
            <div>
              <h3 className="emb-snip-title">Hosted SVG</h3>
              <CodeBlock language="html">{snippetSvg}</CodeBlock>
            </div>
          </div>
        </section>

        {/* INCENTIVES */}
        <section className="emb-incent wrap">
          <h2 className="emb-h2">Why people add it.</h2>
          <div className="emb-incent-grid">
            <div className="emb-incent-card">
              <div className="emb-incent-ic">🪙</div>
              <h4>Earn credits</h4>
              <p><strong>$5 in build credits</strong> for every visitor who joins from your badge. Top referrers get lifetime founder pricing.</p>
            </div>
            <div className="emb-incent-card">
              <div className="emb-incent-ic">🚀</div>
              <h4>Tells a story</h4>
              <p>"Built in 9 minutes" beats a portfolio link. Visitors click the badge and discover what shipped you.</p>
            </div>
            <div className="emb-incent-card">
              <div className="emb-incent-ic">⚡</div>
              <h4>2 KB, no trackers</h4>
              <p>Inline SVG + one anchor. No fonts, no analytics, no JS. Your Lighthouse score stays untouched.</p>
            </div>
            <div className="emb-incent-card">
              <div className="emb-incent-ic">🎨</div>
              <h4>Matches your brand</h4>
              <p>Four palettes, three sizes, three shapes. Or drop the SVG into Figma and recolor it however you like.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="emb-final wrap">
          <h2>Ship the badge. Earn the credits.</h2>
          <p>If your app already lives on AppsBuiltWithAI, the badge auto-tracks signups against your workspace.</p>
          <div className="emb-final-row">
            <a href="waitlist-landing.html" className="emb-cta-primary">Join the waitlist →</a>
            <a href="dashboard.html" className="emb-cta-secondary">Open dashboard</a>
          </div>
        </section>
      </main>

      <Footer/>
    </div>
  );
}

window.EmbedPage = EmbedPage;
