import React, { useState as useLgState, useEffect as useLgEffect } from 'react';
import { Reveal } from './part1.jsx';
/* ============= LEGAL HUB: Privacy / Cookie / Concerns / Terms ============= */

const LEGAL_TABS = [
  { id: "privacy", label: "Privacy Policy", updated: "September 3, 2026", href: "/legal#privacy", h: "Privacy Policy", em: "Your data stays yours." },
  { id: "cookie", label: "Cookie Policy", updated: "September 3, 2026", href: "/legal#cookie", h: "Cookie Policy", em: "Only what we need." },
  { id: "concerns", label: "Security Concerns", updated: "May 18, 2026", href: "/legal#concerns", h: "Security concerns", em: "Tell us, we'll fix it." },
  { id: "terms", label: "Terms of Service", updated: "September 3, 2026", href: "/legal#terms", h: "Terms of Service", em: "The deal, in plain words." },
];

const PLAIN_ENGLISH = {
  privacy:  "We collect your email, your billing info, and the things you type into the builder. We don't sell anything to anyone. We use the data to run our service. You can export or delete everything in two clicks.",
  cookie:   "We use cookies to keep you signed in and remember what you were working on. We don't use cookies for advertising. You can decline non-essential cookies and the site still works.",
  concerns: "Found a bug or a security issue? Email security@appsbuiltwithai.com. We respond within 24 hours, fix critical issues within 72 hours, and pay $500 to $10,000 for verified vulnerabilities.",
  terms:    "Be reasonable. Don't spam. Don't try to break in. We can change pricing with 30 days' notice. If we mess up, our liability is capped at what you've paid us in the last 12 months. Either of us can cancel anytime.",
};

const LEGAL_TOC = {
  privacy: [["what-we-collect", "What we collect"], ["what-we-dont", "What we don't collect"], ["ai-training", "How your data improves our AI"], ["how-we-use", "How we use your data"], ["who-we-share", "Who we share with"], ["your-rights", "Your rights"], ["contact", "Contact"]],
  cookie: [["what-cookies", "What is a cookie"], ["essential", "Essential cookies"], ["analytics", "Product analytics"], ["no-ads", "What we don't do"], ["manage", "Managing cookies"]],
  concerns: [["report", "How to report"], ["response", "Response commitment"], ["bounty", "Bug bounty"], ["out-of-scope", "Out of scope"], ["safe-harbor", "Safe harbor"]],
  terms: [["agreement", "The agreement"], ["acceptable", "What you can't do"], ["ownership", "Who owns what"], ["payments", "Payments & refunds"], ["liability", "Liability"], ["termination", "Termination"], ["law", "Governing law"]],
};

function LegalPage() {
  const fixed = typeof window !== "undefined" ? window.LEGAL_DOC : null;
  const [tab, setTab] = useLgState(() => {
    if (fixed) return fixed;
    if (typeof window !== "undefined") {
      const h = window.location.hash.replace("#", "");
      if (LEGAL_TABS.some(t => t.id === h)) return h;
    }
    return "privacy";
  });

  useLgEffect(() => {
    if (typeof window === "undefined" || fixed) return;
    if (window.location.hash !== "#" + tab) history.replaceState(null, "", "#" + tab);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [tab]);

  const meta = LEGAL_TABS.find(t => t.id === tab);

  return (
    <>
      <section className="sub-hero" data-screen-label="legal-hero">
        <div className="wrap-tight">
          <Reveal>
            <div className="eyebrow">Legal</div>
            {fixed
              ? <h1 className="serif">{meta.h}. <em>{meta.em}</em></h1>
              : <h1 className="serif">The fine print, <em>in big print.</em></h1>}
            <p className="sub-lead">
              Lawyers wrote some of this. We tried to make it human. There's
              a plain-English summary at the top: that's the truth, the rest
              is just longer.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="legal-tabs">
              {LEGAL_TABS.map(t => fixed ? (
                <a key={t.id} href={t.href} className={"legal-tab" + (tab === t.id ? " active" : "")}>{t.label}</a>
              ) : (
                <button
                  key={t.id}
                  className={"legal-tab" + (tab === t.id ? " active" : "")}
                  onClick={() => setTab(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pad pt-0">
        <div className="wrap legal-layout">
          <aside className="legal-toc">
            <div className="legal-toc-head">On this page</div>
            {LEGAL_TOC[tab].map(([id, label], i) => (
              <a key={id} href={"#" + id} onClick={(e) => { e.preventDefault(); const el = document.getElementById(id); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: "smooth" }); }}>
                <span className="legal-toc-num">{i + 1}</span>{label}
              </a>
            ))}
            <div className="legal-toc-updated">Updated {meta.updated}</div>
          </aside>
          <div className="legal-main">
          <Reveal>
            <div className="legal-summary">
              <div className="eyebrow">In plain English</div>
              <p>{PLAIN_ENGLISH[tab]}</p>
              <div className="legal-updated">Last updated: <strong>{meta.updated}</strong></div>
            </div>
          </Reveal>

          <article className="legal-body">
            {tab === "privacy" && <PrivacyBody/>}
            {tab === "cookie" && <CookieBody/>}
            {tab === "concerns" && <ConcernsBody/>}
            {tab === "terms" && <TermsBody/>}
          </article>

          <div className="legal-foot">
            Questions? Email <a href="mailto:legal@appsbuiltwithai.com">legal@appsbuiltwithai.com</a>: a real person reads every message.
          </div>
          </div>
        </div>
      </section>
    </>
  );
}

function H2({ children, id }) { return <h2 id={id}>{children}</h2>; }
function H3({ children }) { return <h3>{children}</h3>; }

function PrivacyBody() {
  return (
    <>
      <H2 id="what-we-collect">1. What we collect</H2>
      <p>We collect three categories of data:</p>
      <ul>
        <li><strong>Account data</strong>: your email address and, optionally, your name.</li>
        <li><strong>Billing data</strong>: handled by Stripe. We see the last four digits of your card and your billing country. We never see the full number.</li>
        <li><strong>Builder content</strong>: the prompts you type, the apps you generate, and any files you upload. Encrypted at rest, isolated per workspace.</li>
      </ul>

      <H2 id="what-we-dont">2. What we don't collect</H2>
      <p>We do not collect device fingerprints, third-party browsing history, or any data from outside our own product. We do not run advertising trackers. We do not sell, license, or share your data with data brokers: not now, not ever.</p>

      <H2 id="ai-training">3. How your data improves our AI</H2>
      <p>We may use anonymized or aggregated Customer Data to improve our AI features and models. We do not sell your data, and our model vendors are contractually barred from training their own models on it.</p>

      <H2 id="how-we-use">4. How we use your data</H2>
      <ul>
        <li>To operate the service (e.g., generating your app, sending magic links).</li>
        <li>To bill you (handled by Stripe).</li>
        <li>To send you product updates you can unsubscribe from in one click.</li>
        <li>To investigate abuse or legal violations.</li>
      </ul>

      <H2 id="who-we-share">5. Who we share data with</H2>
      <p>We share data only with vendors who help us run the service: Stripe (payments), Postmark (transactional email), AWS (hosting), and Anthropic & OpenAI (AI inference). All bound by data processing agreements that match our own commitments. Full list available on request.</p>

      <H2 id="your-rights">6. Your rights</H2>
      <p>You can export everything we have on you at any time from Settings → Privacy. You can delete your account, which permanently erases all data within 30 days. EU/UK residents have additional GDPR rights: email <a href="mailto:dpo@appsbuiltwithai.com">dpo@</a> to exercise them.</p>

      <H2 id="contact">7. Contact</H2>
      <p>Privacy questions: <a href="mailto:privacy@appsbuiltwithai.com">privacy@appsbuiltwithai.com</a>. Data Protection Officer: <a href="mailto:dpo@appsbuiltwithai.com">dpo@appsbuiltwithai.com</a>.</p>
    </>
  );
}

function CookieBody() {
  return (
    <>
      <H2 id="what-cookies">1. What is a cookie, really?</H2>
      <p>A small file your browser stores. We use them sparingly. Here's exactly which ones we set and why.</p>

      <H2 id="essential">2. Essential cookies</H2>
      <p>These run the site. You can't turn them off without breaking sign-in.</p>
      <ul>
        <li><code>abwa_session</code>: keeps you signed in. Expires after 30 days of inactivity.</li>
        <li><code>abwa_csrf</code>: protects forms from cross-site attacks. Expires when you close the tab.</li>
        <li><code>abwa_workspace</code>: remembers which workspace you were last in.</li>
      </ul>

      <H2 id="analytics">3. Product analytics</H2>
      <p>We use PostHog for product analytics across our marketing site, dashboard and editor, including session replay in the editor. It helps us see which features get used and where people get stuck. You can opt out in Settings → Privacy.</p>

      <H2 id="no-ads">4. What we don't do</H2>
      <p>We do not run Google Analytics, Facebook Pixel, TikTok Pixel, or any advertising tracker, and we do not use cookies for advertising.</p>

      <H2 id="manage">5. Managing cookies</H2>
      <p>Your browser lets you block any of these from the address bar. Blocking the essential ones will break sign-in. Blocking the analytics one is fine: we still get aggregated counts.</p>
    </>
  );
}

function ConcernsBody() {
  return (
    <>
      <H2 id="report">1. How to report</H2>
      <p>Email <a href="mailto:security@appsbuiltwithai.com">security@appsbuiltwithai.com</a>. Include reproduction steps and an estimate of impact. PGP key available on request.</p>

      <H2 id="response">2. Our response commitment</H2>
      <ul>
        <li><strong>Acknowledgement</strong>: within 24 hours of your report.</li>
        <li><strong>Triage</strong>: initial severity assessment within 72 hours.</li>
        <li><strong>Fix</strong>: critical issues remediated within 7 days; lower severity within 30.</li>
        <li><strong>Disclosure</strong>: we coordinate public disclosure with you. Default 90-day embargo.</li>
      </ul>

      <H2 id="bounty">3. Bug bounty</H2>
      <p>Rewards scale with impact:</p>
      <ul>
        <li><strong>Critical</strong> (RCE, account takeover, data exfiltration): $5,000 to $10,000</li>
        <li><strong>High</strong> (privilege escalation, stored XSS in a critical surface): $1,500 to $5,000</li>
        <li><strong>Medium</strong> (reflected XSS, CSRF, IDOR with limited impact): $500 to $1,500</li>
        <li><strong>Low / informational</strong>: hall of thanks + swag</li>
      </ul>

      <H2 id="out-of-scope">4. Out of scope</H2>
      <ul>
        <li>Reports from automated scanners with no exploit path</li>
        <li>Self-XSS, clickjacking on non-sensitive pages</li>
        <li>Findings on third-party services we use (report to them directly)</li>
        <li>Anything requiring physical access or social engineering of our staff</li>
      </ul>

      <H2 id="safe-harbor">5. Safe harbor</H2>
      <p>If you act in good faith (no data exfiltration, no service degradation, no testing on accounts you don't own) we will not pursue legal action and we will not let our partners pursue action either.</p>
    </>
  );
}

function TermsBody() {
  return (
    <>
      <H2 id="agreement">1. The agreement</H2>
      <p>By using AppsBuiltWithAI you agree to these terms. They're a contract. We can update them with 30 days' notice for material changes, in which case you can cancel before they take effect.</p>

      <H2 id="acceptable">2. What you can't do</H2>
      <ul>
        <li>Build apps that violate laws (spam, fraud, illegal goods, etc.).</li>
        <li>Build apps that abuse, harass, or endanger people.</li>
        <li>Resell raw AI access: the product is for building apps, not reselling tokens.</li>
        <li>Try to circumvent rate limits, plan limits, or our security measures.</li>
      </ul>

      <H2 id="ownership">3. Who owns what</H2>
      <p>You own the apps you build, including the source code if you export it. We own AppsBuiltWithAI itself: the builder, the runtime, the brand. We grant you a license to use it as long as you have a paid (or free) account in good standing.</p>

      <H2 id="payments">4. Payments &amp; refunds</H2>
      <p>Subscriptions renew automatically until you cancel. Cancellation takes effect immediately: you retain access until the end of the paid period. We refund within 14 days of the most recent charge if you haven't used the service materially in that window.</p>

      <H2 id="liability">5. Liability</H2>
      <p>To the maximum extent allowed by law, our total liability to you is capped at the amount you've paid us in the 12 months preceding the claim. We provide the service "as is." We will not be liable for indirect, incidental, or consequential damages.</p>

      <H2 id="termination">6. Termination</H2>
      <p>You can cancel any time from Settings → Plan. We can suspend or terminate accounts that violate these terms, with notice except in cases of severe abuse. On termination we'll keep your data available for 90 days so you can export it.</p>

      <H2 id="law">7. Governing law</H2>
      <p>AppsBuiltWithAI is operated by Miestro, Inc., d/b/a AppsBuiltWithAI, a Georgia corporation based in Atlanta, Georgia 30326. These terms are governed by the laws of the State of Georgia.</p>
    </>
  );
}


export default LegalPage;
