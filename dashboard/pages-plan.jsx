/* global React, PoofD */
const { useState, useEffect, useRef, Ic } = PoofD;

/* ============= PLAN — stepped chat that builds a PRD ============= */

const STARTERS = [
  { id: "bakery",    emoji: "🥐", title: "Bakery pickup",      seed: "A pickup-order page for my bakery — warm, earthy, no app to download.",  pages: ["Home", "Menu", "Order", "Confirm"] },
  { id: "yoga",      emoji: "🧘", title: "Class booking",       seed: "A clean booking page for my yoga studio — weekly schedule, drop-ins, soft palette.", pages: ["Home", "Schedule", "Book", "Receipt"] },
  { id: "newsletter",emoji: "✉️", title: "Newsletter signup",   seed: "A focused landing page for my paid newsletter — one hero, one CTA, archive below.",  pages: ["Landing", "Archive", "Pay"] },
  { id: "portfolio", emoji: "🎨", title: "Portfolio",           seed: "A portfolio for my freelance design work — case studies, contact, cv download.",   pages: ["Home", "Work", "About", "Contact"] },
  { id: "invoice",   emoji: "🧾", title: "Invoice tool",        seed: "A tiny tool to make and email invoices to my clients — no signup for them.",       pages: ["Dashboard", "New invoice", "Send"] },
  { id: "event",     emoji: "🎉", title: "Event RSVP",          seed: "An RSVP page for my pop-up dinner series — guest list, dietary notes, reminders.", pages: ["Invite", "RSVP", "Detail"] },
];

const MOODS = [
  { id: "warm",      label: "Warm",      sub: "Earthy, cozy, hand-made",     palette: ["#3a1410", "#c0784a", "#ffd9a8", "#F5EFE3"] },
  { id: "editorial", label: "Editorial", sub: "Black, serif, lots of white", palette: ["#181818", "#F5EFE3", "#FFFFFF", "#C0B8A8"] },
  { id: "playful",   label: "Playful",   sub: "Bright, rounded, gradient",   palette: ["#F08DB8", "#FFC53D", "#6FA8E0", "#FBE4ED"] },
  { id: "minimal",   label: "Minimal",   sub: "Off-white, mono, neutral",    palette: ["#FFFFFF", "#181818", "#8A8590", "#ECE4CE"] },
];

const FEATURE_LIB = [
  { id: "stripe",    label: "Stripe checkout",     emoji: "💳" },
  { id: "email",     label: "Email confirmations", emoji: "✉️" },
  { id: "sms",       label: "SMS reminders",       emoji: "📱" },
  { id: "calendar",  label: "Calendar booking",    emoji: "📅" },
  { id: "domain",    label: "Custom domain",       emoji: "🌐" },
  { id: "analytics", label: "Light analytics",     emoji: "📈" },
  { id: "auth",      label: "Magic-link sign in",  emoji: "🔑" },
  { id: "search",    label: "Search bar",          emoji: "🔍" },
  { id: "csv",       label: "CSV export",          emoji: "📤" },
  { id: "qr",        label: "QR code share",       emoji: "🔳" },
];

const STEPS = [
  { id: "vision",   label: "Vision",   hint: "What are we building?",          q: "In one sentence, what is the app — and why does it need to exist? (Include the product name if you have one.)",
    suggests: [
      "Crumb & Co. — a pickup-order page for my bakery so I stop fielding DMs at 6am.",
      "Stillpoint — a class scheduler for my yoga studio so drop-ins can book without texting.",
      "Client Hub — a private portal where my freelance clients see invoices, briefs, and files in one place.",
    ] },
  { id: "problem",  label: "Problem",  hint: "What hurts today?",              q: "What's broken in how this gets done today? List the top 2-3 pain points — bullet-style is fine.",
    suggests: [
      "• Customers DM me on three platforms\n• I miss orders during the morning rush\n• No way to limit daily pickup capacity",
      "• Drop-ins ask the schedule over text every week\n• I take payments manually\n• Mailchimp + Google Form duct-tape",
      "• Clients chase me for old invoices\n• Files scattered across email and Dropbox\n• No shared status on what's done",
    ] },
  { id: "users",    label: "Users",    hint: "Who's it for?",                  q: "Tell me about the primary user — name, age range, role, what their week looks like. We can add secondary users next.",
    suggests: [
      "Local regulars, 30–55, busy parents — order Friday night for Saturday pickup, hate apps.",
      "Yoga drop-ins, 25–60, mostly women, book on phone between meetings, want simple.",
      "Small-business clients, 35–60, founders — check status once a week, want one link.",
    ] },
  { id: "journey",  label: "Journey",  hint: "How will they use it?",          q: "Walk me through the user's journey from first hearing about this to becoming a regular. Big-picture stages, not exact UI.",
    suggests: [
      "Hear about us on Instagram → tap link → see this week's menu → order pickup → get confirmation → come every Saturday.",
      "Friend recommends → land on schedule → book first class → drop-in → buy a 5-pack → become weekly.",
      "Signs contract → gets portal link → checks first deliverable → pays invoice → comes back for next project.",
    ] },
  { id: "mood",     label: "Mood",     hint: "What's the vibe?",               q: "Pick a visual mood on the right — or describe a brand or app that has the look you want to channel.",
    suggests: [
      "Warm and editorial — think Linear's calm meets a small bakery menu board.",
      "Soft and serene — earth tones, generous whitespace, calm not corporate.",
      "Clean and professional — black/cream with one accent color, no gradients.",
    ] },
  { id: "features", label: "Features", hint: "What does it do?",               q: "Tap the feature chips on the right to add what this app needs. Add anything custom in the chat — I'll capture it.",
    suggests: [
      "Custom: pickup time slots in 15-min windows + daily cap of 40 orders.",
      "Custom: 5-class punch-pack purchase + auto-deduct on each booking.",
      "Custom: clients can leave Loom-style comments on a draft, no login required.",
    ] },
  { id: "pages",    label: "Pages",    hint: "What screens?",                  q: "These are the pages I'm planning to build. Want to rename, add, or remove any? (Or just say \"looks good\".)",
    suggests: [
      "Looks good — let's add an FAQ page too.",
      "Rename \"Order\" → \"Pickup\", everything else looks right.",
      "Drop the Confirmation page — handle that with a toast instead.",
    ] },
  { id: "scope",    label: "Scope",    hint: "What's NOT in v1?",              q: "What should I explicitly NOT build for the MVP? Anything you want to defer to later — keeps us focused.",
    suggests: [
      "No delivery, no accounts/logins, no subscriptions — pickup only, guest checkout.",
      "No class packs in v1, no waitlists, no instructor profiles — keep it to scheduling and payment.",
      "No team seats, no white-label, no API — just the single-user portal for now.",
    ] },
  { id: "review",   label: "Review",   hint: "Read the PRD.",                  q: "I've drafted the full product brief — phases, tech stack, first task. Open the preview to look it over before we hand off to the editor." },
];

function PlanPage({ setPage, setActiveApp, setPlanData }) {
  const [stepIdx, setStepIdx] = useState(0);
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi! I'm AppsBuiltWithAI's planner. We'll work through this in 9 short steps — each one question. By the end I'll hand you a full product brief. " + STEPS[0].q, time: "now" },
  ]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);

  const [prd, setPrd] = useState({
    title: null,
    summary: null,
    user: null,
    pains: [],
    features: [],
    nonGoals: [],
    success: [],
    mood: null,
    pages: [],
    journey: [],
    techStack: [],
    phases: [],
    firstTask: null,
    designPrinciples: [],
    version: "1.0 MVP",
    date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    targetDelivery: null,
  });
  const [prdReady, setPrdReady] = useState(false);
  const [showFullPreview, setShowFullPreview] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [helpThinking, setHelpThinking] = useState(false);
  const [helpItems, setHelpItems] = useState([]);
  const [pickedStarter, setPickedStarter] = useState(null);
  const [suggestedFeats, setSuggestedFeats] = useState([]);
  const [kickoff, setKickoff] = useState(null); // null | "have" | "need"

  const logRef = useRef(null);
  useEffect(() => { if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight; }, [messages, busy]);
  useEffect(() => { setHelpOpen(false); setHelpItems([]); }, [stepIdx]);

  const askForHelp = () => {
    if (helpThinking) return;
    setHelpOpen(true);
    setHelpThinking(true);
    setHelpItems([]);
    setTimeout(() => {
      const step = STEPS[stepIdx];
      const items = (step && step.suggests) ? step.suggests : [
        "Take a stab — anything you'd type for a friend works.",
        "Don't overthink it — we can always refine in the next step.",
      ];
      setHelpItems(items);
      setHelpThinking(false);
    }, 700);
  };
  const useSuggestion = (text) => {
    setDraft(text);
    setHelpOpen(false);
  };

  const advance = (text) => {
    const next = stepIdx + 1;
    const currentStep = STEPS[stepIdx].id;
    setPrd((p) => {
      const np = { ...p };
      if (currentStep === "vision") {
        // Title = product name (before em/en-dash) or first part of sentence
        const firstSplit = text.split(/[—–\-:]/)[0].trim();
        np.title = firstSplit.length > 4 && firstSplit.length < 50 ? firstSplit : text.replace(/\.$/, "").slice(0, 60);
        np.summary = text;
      }
      if (currentStep === "problem") {
        // accept multi-line or comma-separated pains
        const pains = text.split(/\n|•|–|—|;|(?:\n*-\s)/).map(s => s.trim()).filter(Boolean);
        np.pains = pains.map((t, i) => ({ text: t, severity: i === 0 ? 3 : 2 }));
      }
      if (currentStep === "users") np.user = text.trim();
      if (currentStep === "journey") {
        // split into stages
        const stages = text.split(/\n|→|->|\d+\.\s/).map(s => s.trim()).filter(Boolean);
        np.journey = stages.length > 1 ? stages : [text.trim()];
      }
      if (currentStep === "mood") {
        // mood is set via swatch click; this text is just commentary
      }
      if (currentStep === "features") {
        // features already added via chips, but capture any custom mentions
        if (text && !text.toLowerCase().includes("done") && !text.toLowerCase().includes("looks")) {
          const custom = text.split(/\n|,|•/).map(s => s.trim()).filter(Boolean);
          custom.forEach(c => {
            if (!np.features.some(f => f.name.toLowerCase() === c.toLowerCase())) {
              np.features = [...np.features, { name: c, desc: "Custom from chat", priority: "must" }];
            }
          });
        }
      }
      if (currentStep === "pages") {
        if (text && !text.toLowerCase().includes("good") && !text.toLowerCase().includes("looks")) {
          const ps = text.split(/\n|,|•/).map(s => s.trim()).filter(Boolean);
          np.pages = ps.map(name => ({ name }));
        }
      }
      if (currentStep === "scope") {
        const items = text.split(/\n|•|–|—/).map(s => s.trim()).filter(Boolean);
        np.nonGoals = items;
      }
      return np;
    });

    if (next < STEPS.length) {
      // after problem step, surface smart feature chips so user can pick visually
      if (currentStep === "problem") {
        setSuggestedFeats(FEATURE_LIB.slice(0, 6));
      }
      // when entering review (last step), draft the full PRD
      if (STEPS[next].id === "review") {
        setBusy(true);
        setMessages((m) => [...m, { role: "ai", text: "Drafting your full product brief…", time: "now" }]);
        setTimeout(() => {
          setPrd((p) => {
            // generate features if user didn't pick any
            const extraFeatures = p.features.length === 0 ? [
              { name: "Core workflow",       desc: `The one thing ${(p.user || "your user").split(/[, ]/)[0]} does every day, simplified to 3 taps.`, priority: "must" },
              { name: "Mobile-first design", desc: "Looks right on every phone, no pinch-to-zoom.", priority: "must" },
              { name: "Auto-confirmations",  desc: "Emails or texts go out so they stop manually replying.", priority: "must" },
              { name: "Daily summary view",  desc: "One-page printable view of what happened today.", priority: "must" },
              { name: "Custom branding",     desc: "Their colors, logo, custom domain.", priority: "nice" },
              { name: "Light analytics",     desc: "Visitor count, top referrers — nothing more.", priority: "nice" },
            ] : [];
            const features = [...p.features, ...extraFeatures];

            // pages
            const pages = p.pages.length > 0 ? p.pages : [
              { name: "Home" }, { name: "Sign up" }, { name: "Dashboard" }, { name: "Success" }
            ];

            // journey if none
            const journey = p.journey.length > 0 ? p.journey : [
              "Discover the app",
              "Sign up & onboarding",
              "First use",
              "Routine usage",
              "Renewal or recommendation",
            ];

            // tech stack — auto-selected based on features
            const baseStack = [
              { layer: "Frontend",   tech: "Next.js + Tailwind",     purpose: "Fast PWA-capable web app" },
              { layer: "Backend",    tech: "Supabase Edge Functions", purpose: "Serverless API logic" },
              { layer: "Database",   tech: "Supabase (Postgres)",     purpose: "Relational data + RLS" },
              { layer: "Auth",       tech: "Supabase Magic Link",     purpose: "Passwordless sign-in" },
              { layer: "Hosting",    tech: "Vercel",                  purpose: "Edge deployment" },
            ];
            const extra = [];
            if (features.some(f => /stripe|payment|checkout/i.test(f.name))) extra.push({ layer: "Payments", tech: "Stripe", purpose: "Subscriptions + one-time" });
            if (features.some(f => /email|confirm/i.test(f.name))) extra.push({ layer: "Email", tech: "Resend", purpose: "Transactional email" });
            if (features.some(f => /sms|text|reminder/i.test(f.name))) extra.push({ layer: "SMS", tech: "Twilio", purpose: "Two-way messaging" });
            const techStack = [...baseStack, ...extra];

            // MVP phases — split features into ~5 phases
            const must = features.filter(f => f.priority === "must");
            const nice = features.filter(f => f.priority === "nice");
            const chunks = (arr, n) => {
              const out = [];
              const size = Math.ceil(arr.length / n) || 1;
              for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
              while (out.length < n) out.push([]);
              return out;
            };
            const [c1, c2, c3, c4] = chunks(must, 4);
            const phases = [
              { name: "Phase 1 — Foundation",    weeks: "Week 1-2", items: ["Lead capture & landing", "Auth (magic link)", "Database schema", ...c1.map(f => f.name)] },
              { name: "Phase 2 — Core experience", weeks: "Week 2-3", items: c2.map(f => f.name).length ? c2.map(f => f.name) : ["Primary user flow"] },
              { name: "Phase 3 — Engagement",    weeks: "Week 3-4", items: c3.map(f => f.name).length ? c3.map(f => f.name) : ["Notifications & comms"] },
              { name: "Phase 4 — Polish & insights", weeks: "Week 4-5", items: [...c4.map(f => f.name), ...nice.map(f => f.name)].slice(0, 5) },
              { name: "Phase 5 — Launch",        weeks: "Week 5-6", items: ["Final testing", "Security audit", "Performance pass", "Soft launch to first 10 users"] },
            ];

            const firstTask = `Build the ${pages[0]?.name || "first page"} and basic data model. ${features[0] ? "Include the " + features[0].name + " path." : ""} Ship it minimal and shippable.`;

            const designPrinciples = [
              p.mood === "warm" ? "Earthy, hand-made tone — cozy not corporate" :
              p.mood === "editorial" ? "Editorial weight — serif headlines, lots of whitespace" :
              p.mood === "playful" ? "Playful & gradient — rounded corners, optimistic" :
              p.mood === "minimal" ? "Minimal & monochrome — type-led" :
              "Clean & considered — no unnecessary chrome",
              "Mobile-first — most usage will be on phones",
              "Speed matters — target <1 second load",
              "Progressive disclosure — show only what's needed",
            ];

            const nonGoals = p.nonGoals.length ? p.nonGoals : [
              "No multi-user roles in v1",
              "No native mobile apps",
              "No complex analytics dashboard",
            ];

            const success = p.success.length ? p.success : [
              "First real user within 24 hours of launch",
              "Stops the muttering — daily friction gone",
              "100+ uses in the first month",
            ];

            const targetDelivery = (() => {
              const d = new Date();
              d.setDate(d.getDate() + 42); // ~6 weeks
              return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
            })();

            return { ...p, features, nonGoals, success, pages, journey, techStack, phases, firstTask, designPrinciples, targetDelivery };
          });
          setMessages((m) => [...m, { role: "ai", text: "✓ Brief ready. " + STEPS[next].q, time: "now" }]);
          setPrdReady(true);
          setStepIdx(next);
          setBusy(false);
        }, 1800);
      } else {
        setBusy(true);
        setTimeout(() => {
          setMessages((m) => [...m, { role: "ai", text: STEPS[next].q, time: "now" }]);
          setStepIdx(next);
          setBusy(false);
        }, 700);
      }
    }
  };

  const send = (custom) => {
    const text = (custom || draft).trim();
    if (!text || busy) return;
    setMessages((m) => [...m, { role: "user", text, time: "now" }]);
    setDraft("");
    advance(text);
  };

  const pickStarter = (starter) => {
    setPickedStarter(starter.id);
    setDraft(starter.seed);
    setPrd((p) => ({ ...p, pages: starter.pages.map(name => ({ name })) }));
  };

  const pickMood = (mood) => {
    setPrd((p) => ({ ...p, mood: mood.id }));
    setMessages((m) => [
      ...m,
      { role: "user", text: `<strong>${mood.label}</strong> — ${mood.sub.toLowerCase()}.`, time: "now" },
    ]);
    advance(mood.label);
  };

  const toggleFeature = (feat) => {
    setPrd((p) => {
      const has = p.features.some(f => f.id === feat.id);
      return {
        ...p,
        features: has
          ? p.features.filter(f => f.id !== feat.id)
          : [...p.features, { id: feat.id, name: feat.label, desc: "From quick-add", priority: "must" }],
      };
    });
  };

  const confirmFeatures = () => {
    const picked = prd.features.filter(f => f.id);
    const summary = picked.length
      ? picked.map(f => f.name).join(" · ")
      : "No quick-adds — keep it bare.";
    setMessages((m) => [...m, { role: "user", text: summary, time: "now" }]);
    advance(summary);
  };

  const editPage = (i, name) => {
    setPrd((p) => ({ ...p, pages: p.pages.map((pg, j) => j === i ? { ...pg, name } : pg) }));
  };
  const addPage = () => setPrd((p) => ({ ...p, pages: [...p.pages, { name: "New page" }] }));
  const removePage = (i) => setPrd((p) => ({ ...p, pages: p.pages.filter((_, j) => j !== i) }));
  const confirmPages = () => {
    const names = prd.pages.map(p => p.name).join(" · ");
    setMessages((m) => [...m, { role: "user", text: names || "Looks good.", time: "now" }]);
    advance(names || "looks good");
  };

  // Effort estimation: small (3-5 features) / medium (6-9) / large (10+)
  const effort = (() => {
    const n = prd.features.length;
    if (n === 0) return { size: "—", credits: "—", time: "—" };
    if (n <= 4) return { size: "S", credits: "~80", time: "1 evening",  tone: "mint" };
    if (n <= 8) return { size: "M", credits: "~180", time: "a weekend", tone: "sun" };
    return { size: "L", credits: "~340", time: "a week", tone: "coral" };
  })();

  const handOff = () => {
    const seed = [
      `Build: ${prd.title}.`,
      prd.summary ? `Vision: ${prd.summary}` : "",
      prd.user ? `For: ${prd.user}` : "",
      ``,
      `Pains:`,
      ...prd.pains.map(p => `• ${p.text}`),
      ``,
      `Must-have features:`,
      ...prd.features.filter(f => f.priority === "must").map(f => `• ${f.name} — ${f.desc}`),
    ].filter(Boolean).join("\n");
    if (setPlanData) setPlanData({ seedPrompt: seed, avatar: { name: prd.user, role: "From plan", age: "", context: prd.user, palette: 0 }, pains: prd.pains, reqs: prd });
    setActiveApp({ name: prd.title || "New app", emoji: "✨", url: "draft.appsbuilt.ai", thumb: "thumb-bakery" });
    setPage("editor");
  };

  return (
    <div className="page page-plan" data-screen-label="plan">
      {showFullPreview && <PRDPreview prd={prd} onClose={() => setShowFullPreview(false)} onSend={handOff} effort={effort}/>}
      {showInvite && <InviteModal onClose={() => setShowInvite(false)}/>}
      <div className="page-head">
        <div>
          <h1>Plan it. Then build it.</h1>
          <div className="sub">9 short steps. AppsBuiltWithAI drafts a full product brief as you answer — feasibility, phases, first task and all.</div>
        </div>
        {prdReady && (
          <button className="btn btn-outline" onClick={() => setShowFullPreview(true)}>
            <Ic.Eye/> Open full brief
          </button>
        )}
      </div>

      {/* Kickoff gate — pick a path before starting */}
      {kickoff === null && (
        <div className="kickoff">
          <div className="kickoff-q">First — do you already know what you want to build?</div>
          <div className="kickoff-grid">
            <button className="kickoff-card" onClick={() => setKickoff("have")}>
              <span className="kickoff-emoji">💡</span>
              <div className="kickoff-card-title">I have an idea</div>
              <div className="kickoff-card-sub">Skip the inspiration — let's start describing it.</div>
              <div className="kickoff-card-cta">Start planning →</div>
            </button>
            <button className="kickoff-card" onClick={() => setKickoff("need")}>
              <span className="kickoff-emoji">🎲</span>
              <div className="kickoff-card-title">Help me find one</div>
              <div className="kickoff-card-sub">Pick a vibe to start from — bakery, booking, newsletter, more.</div>
              <div className="kickoff-card-cta">Browse vibes →</div>
            </button>
          </div>
        </div>
      )}

      {/* Inspiration starters — only when user asked for help */}
      {kickoff === "need" && stepIdx === 0 && (
        <div className="starter-rail">
          <div className="starter-rail-head">
            <span className="starter-rail-kicker">START FROM A VIBE</span>
            <span className="starter-rail-sub">— tap one to seed your description below</span>
          </div>
          <div className="starter-rail-grid">
            {STARTERS.map(s => (
              <button
                key={s.id}
                className={"starter-card" + (pickedStarter === s.id ? " picked" : "")}
                onClick={() => pickStarter(s)}
              >
                <span className="starter-emoji">{s.emoji}</span>
                <div className="starter-card-body">
                  <div className="starter-title">{s.title}</div>
                  <div className="starter-pages">
                    {s.pages.slice(0, 3).join(" · ")}
                    {s.pages.length > 3 ? ` · +${s.pages.length - 3}` : ""}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Simple stepper */}
      {kickoff !== null && (
      <>
      <div className="step-mini">
        {STEPS.map((s, i) => (
          <div key={s.id} className={"step-mini-pill" + (i === stepIdx ? " active" : i < stepIdx ? " done" : "")}>
            <span className="step-mini-num">{i < stepIdx ? "✓" : i + 1}</span>
            <span>{s.label}</span>
          </div>
        ))}
      </div>

      <div className="plan-simple">
        {/* Chat */}
        <div className="card-lg" style={{ padding: 0, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 20px", borderBottom: "1px solid var(--line-2)" }}>
            <span style={{ width: 28, height: 28, borderRadius: 8, background: "var(--ink)", color: "var(--sun)", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 13 }}>P</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>Planning with AppsBuiltWithAI</div>
              <div style={{ fontSize: 12, color: "var(--ink-3)" }}>{STEPS[stepIdx].label} · {STEPS[stepIdx].hint}</div>
            </div>
            <div className="ai-badge" style={{ marginLeft: "auto" }}><Ic.Spark/> AI</div>
          </div>

          <div className="chat-log" ref={logRef} style={{ flex: 1 }}>
            {messages.map((m, i) => (
              <div key={i} className={"msg " + m.role}>
                <div className="msg-avatar">{m.role === "user" ? "M" : "P"}</div>
                <div>
                  <div className="msg-body" dangerouslySetInnerHTML={{ __html: m.text }}></div>
                  <div className="msg-time">{m.time}</div>
                </div>
              </div>
            ))}
            {busy && (
              <div className="msg ai">
                <div className="msg-avatar">P</div>
                <div style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
                  <span style={{ display: "inline-flex", gap: 4 }}>
                    {[0,1,2].map(j => <span key={j} style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--ink-3)", animation: `dot 1.2s ease-in-out infinite ${j * .15}s` }}></span>)}
                  </span>
                  <span style={{ fontSize: 13, color: "var(--ink-3)" }}>{stepIdx === STEPS.length - 2 ? "drafting brief…" : "thinking…"}</span>
                </div>
              </div>
            )}

            {/* Inline pickers — appear at the relevant step, after the latest AI question */}
            {!busy && STEPS[stepIdx].id === "mood" && (
              <div className="inline-picker">
                <div className="inline-picker-kicker">PICK A MOOD</div>
                <div className="mood-grid mood-grid-inline">
                  {MOODS.map(m => (
                    <button
                      key={m.id}
                      className={"mood-card" + (prd.mood === m.id ? " on" : "")}
                      onClick={() => pickMood(m)}
                    >
                      <div className="mood-swatch">
                        {m.palette.map((c, i) => (
                          <span key={i} style={{ background: c }}></span>
                        ))}
                      </div>
                      <div className="mood-card-label">{m.label}</div>
                      <div className="mood-card-sub">{m.sub}</div>
                    </button>
                  ))}
                </div>
                <div className="inline-picker-hint">…or describe a brand you want to channel in the chat below.</div>
              </div>
            )}

            {!busy && STEPS[stepIdx].id === "features" && (
              <div className="inline-picker">
                <div className="inline-picker-head">
                  <span className="inline-picker-kicker">QUICK-ADD FEATURES</span>
                  <span className="inline-picker-sub">Tap to include · {prd.features.length} selected</span>
                </div>
                <div className="feat-chips">
                  {FEATURE_LIB.map(f => {
                    const on = prd.features.some(x => x.id === f.id);
                    return (
                      <button key={f.id} className={"feat-chip" + (on ? " on" : "")} onClick={() => toggleFeature(f)}>
                        <span className="feat-chip-emoji">{f.emoji}</span>
                        <span>{f.label}</span>
                        {on && <span className="feat-chip-x">✓</span>}
                      </button>
                    );
                  })}
                </div>
                <div className="inline-picker-actions">
                  <button className="btn btn-outline btn-sm" onClick={confirmFeatures}>
                    {prd.features.length ? `Add these ${prd.features.length} →` : "Skip — no extras"}
                  </button>
                  <span className="inline-picker-hint">Anything custom? Type it below.</span>
                </div>
              </div>
            )}

            {!busy && STEPS[stepIdx].id === "pages" && (
              <div className="inline-picker">
                <div className="inline-picker-head">
                  <span className="inline-picker-kicker">PAGES TO BUILD</span>
                  <span className="inline-picker-sub">{prd.pages.length} pages · click to rename</span>
                </div>
                <div className="page-list">
                  {prd.pages.map((pg, i) => (
                    <div key={i} className="page-row">
                      <span className="page-row-n">{String(i + 1).padStart(2, "0")}</span>
                      <input
                        className="page-row-input"
                        value={pg.name}
                        onChange={(e) => editPage(i, e.target.value)}
                      />
                      <button className="page-row-x" onClick={() => removePage(i)} aria-label="Remove">×</button>
                    </div>
                  ))}
                  <button className="page-add" onClick={addPage}>+ Add page</button>
                </div>
                <div className="inline-picker-actions">
                  <button className="btn btn-outline btn-sm" onClick={confirmPages}>Looks good →</button>
                </div>
              </div>
            )}
          </div>

          <div className="chat-input">
            {prdReady && (
              <div className="plan-ready-bar">
                <div className="plan-ready-headline">
                  <span className="plan-ready-tick">✓</span>
                  <div>
                    <div className="plan-ready-title">Brief ready</div>
                    <div className="plan-ready-sub">{prd.features.length || "—"} features · est. {effort.time}</div>
                  </div>
                </div>
                <div className="plan-ready-actions">
                  <button className="btn btn-ghost btn-sm" onClick={() => setShowInvite(true)}>
                    <Ic.Users/> Invite friends · earn 100 credits each
                  </button>
                  <button className="btn btn-outline btn-sm" onClick={() => setShowFullPreview(true)}>
                    <Ic.Eye/> View PRD
                  </button>
                  <button className="btn btn-coral btn-sm" onClick={handOff}>
                    Send to editor <Ic.ArrowR/>
                  </button>
                </div>
              </div>
            )}
            <div className="chat-input-box">
              {helpOpen && (
                <div className="help-panel">
                  <div className="help-panel-head">
                    <span className="help-panel-spark">✨</span>
                    <span className="help-panel-title">AI suggestions for this step</span>
                    <button className="help-panel-close" onClick={() => setHelpOpen(false)} aria-label="Close suggestions">×</button>
                  </div>
                  {helpThinking ? (
                    <div className="help-panel-thinking">
                      <span className="dots-3"><span/><span/><span/></span>
                      <span>thinking through ways to answer…</span>
                    </div>
                  ) : (
                    <div className="help-panel-list">
                      {helpItems.map((s, i) => (
                        <button key={i} className="help-suggestion" onClick={() => useSuggestion(s)}>
                          <span className="help-suggestion-text">{s}</span>
                          <span className="help-suggestion-cta">Use this →</span>
                        </button>
                      ))}
                      <div className="help-panel-foot">
                        Tap one to drop it into the box — then edit before sending.
                      </div>
                    </div>
                  )}
                </div>
              )}
              <textarea
                placeholder={stepIdx === STEPS.length - 1 ? "Tweak the PRD, or send it to the editor →" : "Type your answer…"}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), send())}
                rows={2}
              />
              <div className="chat-input-bar">
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <button
                    type="button"
                    className={"need-help-btn" + (helpOpen ? " on" : "")}
                    onClick={() => helpOpen ? setHelpOpen(false) : askForHelp()}
                    disabled={stepIdx === STEPS.length - 1}
                    title="Let AppsBuiltWithAI draft an answer for this step"
                  >
                    <span className="need-help-spark">✨</span>
                    <span>{helpOpen ? "Hide help" : "Need help?"}</span>
                  </button>
                  <span style={{ fontSize: 12, color: "var(--ink-3)" }}>{stepIdx + 1} of {STEPS.length} · Enter to send</span>
                </div>
                <button className="chat-send" onClick={() => send()} disabled={!draft.trim() || busy}><Ic.Send/></button>
              </div>
            </div>
          </div>
        </div>

      </div>
      </>
      )}
    </div>
  );
}

/* ============= PRD Preview — full-page comprehensive brief ============= */
function PRDPreview({ prd, onClose, onSend, effort }) {
  const moodLabel = (() => {
    const m = MOODS.find(x => x.id === prd.mood);
    return m ? m.label : "Considered";
  })();
  const moodPalette = (() => {
    const m = MOODS.find(x => x.id === prd.mood);
    return m ? m.palette : ["#181818", "#F5EFE3", "#FFFFFF", "#C0B8A8"];
  })();

  return (
    <div className="prd-overlay" onClick={onClose}>
      <div className="prd-paper" onClick={(e) => e.stopPropagation()}>
        <div className="prd-paper-top">
          <button className="prd-paper-close" onClick={onClose}>← Back to planning</button>
          <div className="prd-paper-actions">
            <button className="btn btn-outline btn-sm">Download PDF</button>
            <button className="btn btn-outline btn-sm">Copy link</button>
            <button className="btn btn-coral btn-sm" onClick={onSend}>Send to editor <Ic.ArrowR/></button>
          </div>
        </div>

        <div className="prd-doc">
          {/* Header */}
          <div className="prd-doc-head">
            <div className="prd-doc-emoji">🎯</div>
            <div className="prd-doc-kicker">PRODUCT BUILD BRIEF</div>
            <h1 className="prd-doc-title">{prd.title || "Untitled app"}</h1>
            <p className="prd-doc-sub">{prd.summary || ""}</p>

            <div className="prd-doc-meta">
              <div><span>Version</span><strong>{prd.version}</strong></div>
              <div><span>Date</span><strong>{prd.date}</strong></div>
              <div><span>Target delivery</span><strong>{prd.targetDelivery || "—"}</strong></div>
              <div><span>Effort</span><strong className="effort-inline">{effort.size}{"\u00A0·\u00A0"}{String(effort.credits).replace("~","")}{"\u00A0cr"}</strong></div>
            </div>
          </div>

          <div className="prd-doc-rule"></div>

          {/* What this app does */}
          <PRDDocSection title="What this app does">
            <p>{prd.summary || "—"}</p>
            {prd.user && (
              <p style={{ marginTop: 12 }}>
                By solving the problems below for <strong>{prd.user.split(/[, ]/)[0] || "the primary user"}</strong>, this app will let them spend their time on what actually matters — not on busywork.
              </p>
            )}
          </PRDDocSection>

          {/* The problem */}
          <PRDDocSection title="The problem">
            {prd.pains.length === 0 ? <p className="muted">—</p> : (
              <>
                <p>Today, these things make the work harder than it needs to be:</p>
                <ul className="prd-list">
                  {prd.pains.map((p, i) => (
                    <li key={i}><strong>{p.text}</strong></li>
                  ))}
                </ul>
              </>
            )}
          </PRDDocSection>

          {/* Target users */}
          <PRDDocSection title="Target users">
            <div className="persona">
              <div className="persona-kicker">Primary</div>
              <p>{prd.user || "—"}</p>
            </div>
          </PRDDocSection>

          {/* User journey */}
          {prd.journey.length > 0 && (
            <PRDDocSection title="User journey">
              <div className="journey-stages">
                {prd.journey.map((stage, i) => (
                  <div key={i} className="journey-stage">
                    <div className="journey-stage-n">Stage {i + 1}</div>
                    <div className="journey-stage-text">{stage}</div>
                  </div>
                ))}
              </div>
            </PRDDocSection>
          )}

          {/* Core features */}
          {prd.features.length > 0 && (
            <PRDDocSection title={`Core features (${prd.features.filter(f => f.priority === "must").length} must · ${prd.features.filter(f => f.priority === "nice").length} nice)`}>
              <div className="prd-feats">
                {prd.features.map((f, i) => (
                  <div key={i} className="prd-doc-feat">
                    <div className="prd-doc-feat-n">{i + 1}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="prd-doc-feat-name">
                        {f.name}
                        <span className={"prio-pill " + f.priority}>{f.priority}</span>
                      </div>
                      <div className="prd-doc-feat-desc">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </PRDDocSection>
          )}

          {/* Pages */}
          {prd.pages.length > 0 && (
            <PRDDocSection title={`Pages to build (${prd.pages.length})`}>
              <div className="prd-pages-grid">
                {prd.pages.map((pg, i) => (
                  <div key={i} className="prd-page-card">
                    <div className="prd-page-n">{String(i + 1).padStart(2, "0")}</div>
                    <div className="prd-page-name">{pg.name}</div>
                  </div>
                ))}
              </div>
            </PRDDocSection>
          )}

          {/* Tech architecture */}
          {prd.techStack.length > 0 && (
            <PRDDocSection title="Technical architecture">
              <table className="prd-table">
                <thead>
                  <tr><th>Layer</th><th>Technology</th><th>Purpose</th></tr>
                </thead>
                <tbody>
                  {prd.techStack.map((t, i) => (
                    <tr key={i}>
                      <td><strong>{t.layer}</strong></td>
                      <td><code>{t.tech}</code></td>
                      <td>{t.purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </PRDDocSection>
          )}

          {/* Design system */}
          <PRDDocSection title="Design system">
            <div className="prd-design">
              <div>
                <div className="prd-design-kicker">PALETTE — {moodLabel}</div>
                <div className="prd-design-palette">
                  {moodPalette.map((c, i) => (
                    <div key={i} className="prd-design-swatch">
                      <div style={{ background: c }}></div>
                      <code>{c}</code>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="prd-design-kicker">PRINCIPLES</div>
                <ul className="prd-list">
                  {prd.designPrinciples.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
              </div>
            </div>
          </PRDDocSection>

          {/* MVP phases */}
          {prd.phases.length > 0 && (
            <PRDDocSection title="MVP development phases">
              <div className="prd-phases">
                {prd.phases.map((ph, i) => (
                  <div key={i} className="prd-phase">
                    <div className="prd-phase-head">
                      <div className="prd-phase-num">{i + 1}</div>
                      <div>
                        <div className="prd-phase-name">{ph.name}</div>
                        <div className="prd-phase-weeks">{ph.weeks}</div>
                      </div>
                    </div>
                    <ul className="prd-phase-items">
                      {ph.items.filter(Boolean).map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </PRDDocSection>
          )}

          {/* First task */}
          {prd.firstTask && (
            <PRDDocSection title="First task" tone="coral">
              <div className="prd-firsttask">
                <p>{prd.firstTask}</p>
              </div>
            </PRDDocSection>
          )}

          {/* What not to do */}
          {prd.nonGoals.length > 0 && (
            <PRDDocSection title="What NOT to build (yet)">
              <ul className="prd-list prd-list-no">
                {prd.nonGoals.map((g, i) => <li key={i}>{g}</li>)}
              </ul>
            </PRDDocSection>
          )}

          {/* Success metrics */}
          {prd.success.length > 0 && (
            <PRDDocSection title="Success looks like">
              <ul className="prd-list prd-list-yes">
                {prd.success.map((g, i) => <li key={i}>{g}</li>)}
              </ul>
            </PRDDocSection>
          )}

          <div className="prd-doc-foot">
            <p>Build it simple. Make it work. Get it shipped. 💪</p>
            <span>— End of brief —</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PRDDocSection({ title, tone, children }) {
  return (
    <div className={"prd-doc-section" + (tone ? " tone-" + tone : "")}>
      <h2 className="prd-doc-h2">{title}</h2>
      <div className="prd-doc-body">{children}</div>
    </div>
  );
}

/* ============= Invite Modal — share link + QR ============= */
function InviteModal({ onClose }) {
  const link = "https://appsbuiltwithai.com/r/mei7k";
  const [copied, setCopied] = useState(false);
  const copy = () => {
    if (navigator.clipboard) navigator.clipboard.writeText(link).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  // A decorative QR-like grid — deterministic from the link, looks plausible.
  // Real apps would render a real QR via a lib.
  const qrCells = (() => {
    const seed = Array.from(link).reduce((a, c) => a + c.charCodeAt(0), 0);
    const N = 25;
    const cells = [];
    let x = seed;
    for (let i = 0; i < N * N; i++) {
      x = (x * 1664525 + 1013904223) >>> 0;
      cells.push((x & 1) === 1);
    }
    // Three corner finder patterns
    const corners = [[0,0],[0,N-7],[N-7,0]];
    corners.forEach(([cy, cx]) => {
      for (let r = 0; r < 7; r++) for (let c = 0; c < 7; c++) {
        const i = (cy + r) * N + (cx + c);
        const onEdge = r === 0 || r === 6 || c === 0 || c === 6;
        const onCenter = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        cells[i] = onEdge || onCenter;
      }
    });
    return { N, cells };
  })();

  return (
    <div className="prd-overlay invite-overlay" onClick={onClose}>
      <div className="invite-card" onClick={(e) => e.stopPropagation()}>
        <button className="invite-close" onClick={onClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>

        <div className="invite-eyebrow">Invite a friend</div>
        <h2 className="invite-h">Earn <em>100 credits</em><br/>for every friend who joins.</h2>
        <p className="invite-sub">They get 100 credits to start, you get 100 when they ship their first app. No cap — invite as many as you want.</p>

        <div className="invite-share-grid">
          <div className="invite-qr">
            <svg viewBox={`0 0 ${qrCells.N} ${qrCells.N}`} width="100%" height="100%" shapeRendering="crispEdges" aria-label="QR code to your invite link">
              <rect width={qrCells.N} height={qrCells.N} fill="#fff"/>
              {qrCells.cells.map((on, i) => on ? (
                <rect key={i} x={i % qrCells.N} y={Math.floor(i / qrCells.N)} width="1" height="1" fill="#181818"/>
              ) : null)}
            </svg>
            <div className="invite-qr-caption">Scan to open</div>
          </div>

          <div className="invite-link-col">
            <div className="invite-field-label">YOUR INVITE LINK</div>
            <div className="invite-link-row">
              <input className="invite-link-input" value={link} readOnly onClick={(e) => e.target.select()}/>
              <button className="btn btn-ink btn-sm invite-copy-btn" onClick={copy}>
                {copied ? "Copied ✓" : "Copy"}
              </button>
            </div>

            <div className="invite-channels">
              <button className="invite-channel" title="Share by email">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
                <span>Email</span>
              </button>
              <button className="invite-channel" title="Share on X">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2H21l-6.494 7.422L22 22h-6.844l-4.793-6.27L4.8 22H2l6.94-7.93L2 2h6.914l4.348 5.745L18.244 2Zm-1.2 18h1.82L7.012 4H5.11L17.044 20Z"/></svg>
                <span>Post on X</span>
              </button>
              <button className="invite-channel" title="Share on LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.86-3.04-1.87 0-2.15 1.45-2.15 2.95v5.66H9.34V9h3.41v1.56h.05c.47-.9 1.63-1.86 3.36-1.86 3.6 0 4.27 2.37 4.27 5.45v6.3ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z"/></svg>
                <span>LinkedIn</span>
              </button>
              <button className="invite-channel" title="Share on Discord">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.058a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.009c.12.099.245.198.372.292a.077.077 0 0 1-.006.128 12.3 12.3 0 0 1-1.873.891.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.028ZM8.02 15.331c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.956-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.418 0 1.334-.956 2.42-2.157 2.42Zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.418 0 1.334-.946 2.42-2.157 2.42Z"/></svg>
                <span>Discord</span>
              </button>
            </div>
          </div>
        </div>

        <div className="invite-stats">
          <div className="invite-stat">
            <div className="invite-stat-num">0</div>
            <div className="invite-stat-label">Invited</div>
          </div>
          <div className="invite-stat">
            <div className="invite-stat-num">0</div>
            <div className="invite-stat-label">Joined</div>
          </div>
          <div className="invite-stat">
            <div className="invite-stat-num">0</div>
            <div className="invite-stat-label">Credits earned</div>
          </div>
        </div>

        <div className="invite-fineprint">
          Credits land in your account when a friend ships their first app from
          your link. They can't be used to pay out cash — just to keep building.
        </div>
      </div>
    </div>
  );
}

window.PoofD_Plan = { PlanPage };
