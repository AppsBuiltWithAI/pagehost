import React from 'react';
import { Reveal, ArrowRight, Check, PromptBox } from './part1.jsx';
import {
  useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakSelect, TweakColor,
} from './tweaks-panel.jsx';

/* ---- tweak option maps ---- */
const V_THEMES = { editorial: "Editorial", bold: "Bold", warm: "Warm" };

const V_ACCENTS = {
  coral: { swatch: "#FF5C4D", accent: "#FF5C4D", deep: "#E84A3C", soft: "#FFE7E1", glow: "rgba(255,92,77,.20)" },
  plum:  { swatch: "#7A5C9E", accent: "#7A5C9E", deep: "#5E3F86", soft: "#ECE3F6", glow: "rgba(122,92,158,.22)" },
  mint:  { swatch: "#1FB295", accent: "#1FB295", deep: "#178A74", soft: "#E0F1EC", glow: "rgba(31,178,149,.22)" },
};

const V_HEADLINES = {
  moat:  { label: "The moat", html: "The model isn't the moat.<br/><em>Your work is.</em>" },
  same:  { label: "Same AI",  html: "Everyone has the same AI.<br/><em>No one has your work.</em>" },
  bring: { label: "Bring it", html: "Bring the agents<br/><em>to your work.</em>" },
};

const V_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "editorial",
  "accent": "coral",
  "headline": "moat"
}/*EDITMODE-END*/;

/* ============= SECTIONS ============= */

function VHero({ headlineHtml }) {
  return (
    <section className="v-section v-hero" data-screen-label="vision-hero">
      <div className="v-hero-glow" aria-hidden="true"></div>
      <div className="v-wrap">
        <Reveal>
          <div className="eyebrow v-head-eyebrow">Our thesis</div>
          <h1 className="v-display" dangerouslySetInnerHTML={{ __html: headlineHtml }}></h1>
        </Reveal>
        <Reveal delay={120}>
          <p className="v-lead">
            Everyone can reach the same models now. What no one else has is your
            apps, your customers, and your way of doing things. We bring the
            agents to <em>that</em> ,  so the thing that makes you you becomes the
            thing that compounds.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div className="v-meta">
            <span>A note on where we're headed</span>
            <span className="dot"></span>
            <span>5 minute read</span>
            <span className="dot"></span>
            <span>From the team at AppsBuiltWithAI</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function VData() {
  return (
    <section className="v-section" data-screen-label="vision-data">
      <div className="v-wrap">
        <div className="v-data-grid">
          <Reveal>
            <div>
              <div className="eyebrow v-head-eyebrow">The 99%</div>
              <h2 className="v-display">Less than 1% of the world's data is public. <em>The rest is yours.</em></h2>
              <p>
                Models are trained on the open internet. But the data that
                actually runs a business ,  who your customers are, what they
                bought, what worked last week ,  lives inside your apps. A model
                can't reach it. You can.
              </p>
              <p>
                So we don't ship your data off to the model. We bring the agents
                to your data, where it already lives, and let them work on the
                thing nobody else can see.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="v-stat-pair">
              <div className="v-stat">
                <div className="v-stat-num">&lt;1%</div>
                <div className="v-stat-lbl">of enterprise data is public ,  the part every model already shares.</div>
              </div>
              <div className="v-stat lead">
                <div className="v-stat-num">99%</div>
                <div className="v-stat-lbl">is yours alone. That's where the advantage is ,  and where the agents go.</div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const V_ERAS = [
  { n: "01", k: "Then", title: "Predictive", body: "AI guessed what came next ,  the word, the click, the churn. Useful, but it only ever pointed." },
  { n: "02", k: "Recently", title: "Generative", body: "AI wrote you an answer, a draft, an image. A leap ,  but you still had to go do the thing." },
  { n: "03", k: "Now", title: "Agentic", body: "Agents reason and then act ,  on your apps, with your data ,  and show you exactly what they did.", now: true },
];

function VEras() {
  return (
    <section className="v-section" data-screen-label="vision-eras">
      <div className="v-wrap">
        <Reveal className="v-eras-head">
          <div className="eyebrow v-head-eyebrow">Where this is going</div>
          <h2 className="v-display">From answering <em>to acting.</em></h2>
          <p>Most tools stopped at the chatbot. Workflows are agentic: they don't just tell you what to do ,  they do it, on your apps, and hand you the receipt.</p>
        </Reveal>
        <Reveal delay={100}>
          <div className="v-eras">
            {V_ERAS.map((e) => (
              <div key={e.n} className={"v-era" + (e.now ? " now" : "")}>
                <span className="v-era-step">{e.n}</span>
                <span className="v-era-k">{e.k}</span>
                <h3>{e.title}</h3>
                <p>{e.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const V_AWAY = [
  { n: "23", l: "actions taken overnight" },
  { n: "2", l: "issues caught before you woke" },
  { n: "~3.5h", l: "of work handled for you" },
  { n: "9", l: "apps watched, all night" },
];

function VForce() {
  return (
    <section className="v-section v-force" data-screen-label="vision-force">
      <div className="v-wrap">
        <Reveal className="v-force-head">
          <div className="eyebrow v-head-eyebrow">A team of one</div>
          <h2 className="v-display">One person. <em>A workforce of agents.</em></h2>
          <p>You used to be capped by the hours in your day. Now a single builder runs a team ,  testing, securing, launching, marketing, following up ,  each one a specialist, all of them working while you sleep.</p>
        </Reveal>
        <Reveal delay={120}>
          <div className="v-away">
            <div className="v-away-k">✦ While you were away · last 12 hours</div>
            <div className="v-away-stats">
              {V_AWAY.map((s, i) => (
                <div key={i}>
                  <div className="v-away-num">{s.n}</div>
                  <div className="v-away-l">{s.l}</div>
                </div>
              ))}
            </div>
            <div className="v-away-cta">
              <a className="v-btn" href="/">See your AI team <ArrowRight size={15}/></a>
              <a className="v-btn v-btn-ghost" href="/">Browse workflows</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const V_LEASH = [
  { k: "Suggests", d: "Drafts the move and waits. You do nothing risky on autopilot.", tag: "Lowest stakes" },
  { k: "Acts with a check", d: "Does the work, then holds it for one tap of your approval.", tag: "Default", active: true },
  { k: "Fully autonomous", d: "Runs end-to-end. Reserved for the low-risk, well-tested stuff.", tag: "You opt in" },
];

function VTrust() {
  return (
    <section className="v-section" data-screen-label="vision-trust">
      <div className="v-wrap">
        <div className="v-trust-grid">
          <Reveal>
            <div>
              <div className="eyebrow v-head-eyebrow">Why you can let go</div>
              <h2 className="v-display">A 5% error rate is fine for dinner. <em>Not for your business.</em></h2>
              <p>
                Booking a restaurant wrong 1 time in 20 is annoying. Charging a
                customer wrong 1 time in 20 is a lawsuit. Enterprise work needs a
                precision consumer chatbots never had to meet.
              </p>
              <p>
                So every workflow runs behind guardrails ,  tested, scoped, and
                held for your sign-off when the stakes are high. You decide how
                much leash each agent gets.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="v-leash">
              {V_LEASH.map((r) => (
                <div key={r.k} className={"v-leash-row" + (r.active ? " active" : "")}>
                  <span className="v-leash-dot"></span>
                  <div>
                    <div className="v-leash-k">{r.k}</div>
                    <div className="v-leash-d">{r.d}</div>
                  </div>
                  <span className="v-leash-tag">{r.tag}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const V_PRINCIPLES = [
  { n: "One", t: "You are enough." },
  { n: "Two", t: "Find the joy in figuring it out." },
  { n: "Three", t: "In the end, the people matter most." },
];

function VClose() {
  return (
    <section className="v-section v-close" data-screen-label="vision-close">
      <div className="v-close-glow" aria-hidden="true"></div>
      <div className="v-wrap-tight">
        <Reveal>
          <div className="eyebrow v-head-eyebrow">One more thing</div>
          <h2>Embrace the tools.</h2>
        </Reveal>
        <Reveal delay={120}>
          <div className="v-principles">
            {V_PRINCIPLES.map((p) => (
              <div key={p.n} className="v-principle">
                <div className="v-principle-n">{p.n}</div>
                <div className="v-principle-t">{p.t}</div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={200}>
          <div className="v-close-final">So ,  what have you been meaning to build?</div>
          <div className="v-close-prompt"><PromptBox/></div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============= TWEAKS ============= */
function VisionTweaks({ t, setTweak }) {
  const themeKeys = Object.keys(V_THEMES);
  const headKeys = Object.keys(V_HEADLINES);
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Direction" />
      <TweakRadio
        label="Theme"
        value={V_THEMES[t.theme]}
        options={themeKeys.map((k) => V_THEMES[k])}
        onChange={(label) => setTweak("theme", themeKeys.find((k) => V_THEMES[k] === label))}
      />
      <TweakColor
        label="Accent"
        value={V_ACCENTS[t.accent].swatch}
        options={Object.keys(V_ACCENTS).map((k) => V_ACCENTS[k].swatch)}
        onChange={(sw) => setTweak("accent", Object.keys(V_ACCENTS).find((k) => V_ACCENTS[k].swatch === sw))}
      />

      <TweakSection label="Copy" />
      <TweakSelect
        label="Hero headline"
        value={V_HEADLINES[t.headline].label}
        options={headKeys.map((k) => V_HEADLINES[k].label)}
        onChange={(label) => setTweak("headline", headKeys.find((k) => V_HEADLINES[k].label === label))}
      />
    </TweaksPanel>
  );
}

/* ============= PAGE ============= */
function VisionPage() {
  const [t, setTweak] = useTweaks(V_DEFAULTS);
  const acc = V_ACCENTS[t.accent] || V_ACCENTS.coral;
  const head = V_HEADLINES[t.headline] || V_HEADLINES.moat;

  // accent override wins over theme tokens
  const accentStyle = {
    "--v-accent": acc.accent,
    "--v-accent-deep": acc.deep,
    "--v-accent-soft": acc.soft,
    "--v-glow": acc.glow,
  };

  return (
    <React.Fragment>
      <div className="vision" data-vtheme={t.theme} style={accentStyle}>
        <VHero headlineHtml={head.html}/>
        <VData/>
        <VEras/>
        <VForce/>
        <VTrust/>
        <VClose/>
      </div>
      <VisionTweaks t={t} setTweak={setTweak}/>
    </React.Fragment>
  );
}

export default VisionPage;
