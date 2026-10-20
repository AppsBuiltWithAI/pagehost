import React, { useState as useLgState, useEffect as useLgEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Reveal } from './part1.jsx';
/* ============= LEGAL HUB: Privacy / Cookie / Concerns / Terms ============= */

const FULL_TERMS = "https://app.appsbuiltwithai.com/terms";

const LEGAL_TABS = [
  { id: "privacy", label: "Privacy Policy", updated: "October 20, 2026", href: "/legal#privacy", h: "Privacy Policy", em: "Your data stays yours." },
  { id: "cookie", label: "Cookie Policy", updated: "October 20, 2026", href: "/legal#cookie", h: "Cookie Policy", em: "Here's every one we use." },
  { id: "concerns", label: "Security", updated: "October 20, 2026", href: "/legal#concerns", h: "Security", em: "Tell us, we'll fix it." },
  { id: "terms", label: "Terms of Service", updated: "October 20, 2026", href: "/legal#terms", h: "Terms of Service", em: "The deal, in plain words." },
];

const PLAIN_ENGLISH = {
  privacy:  "We collect what we need to run the builder: your account, what you type and build, and basic usage and security data. Your prompts go to Anthropic's Claude models so they can build your app. Card details stay with Stripe. We don't sell your data. You can download your data or delete your account from Settings.",
  cookie:   "The builder uses one sign-in cookie and PostHog to count page views and feature use. It doesn't record your screen and has no ad trackers. Our main page at appsbuiltwithai.com and our waitlist page use advertising and analytics tags (Meta Pixel, Google Analytics, Vaudit) to measure our marketing.",
  concerns: "Passwords are hashed, keys for your connected accounts are encrypted, and all traffic uses HTTPS. Found a security issue? Email security@appsbuiltwithai.com. We acknowledge reports within 24 hours and won't take action against good-faith research.",
  terms:    "You own what you build. Use the platform legally and don't abuse it. Credits pay for AI work, and a build that ends broken gets its credits back. You're responsible for the apps you publish and the people who use them. Our liability is capped at what you paid us in the last 12 months. Georgia law applies. This is a summary: the full Terms of Service are the binding version.",
};

const LEGAL_TOC = {
  privacy: [["who-we-are", "Who we are"], ["what-we-collect", "What we collect"], ["your-apps", "Your apps and their visitors"], ["ai-training", "AI and your data"], ["how-we-use", "How we use your data"], ["who-we-share", "Who we share with"], ["where-stored", "Where your data lives"], ["retention", "How long we keep it"], ["your-rights", "Your rights"], ["children", "Children"], ["contact", "Changes and contact"]],
  cookie: [["what-cookies", "What we mean by cookies"], ["essential", "Essential"], ["analytics", "Product analytics"], ["advertising", "Advertising and measurement"], ["other-services", "Other services on our pages"], ["manage", "Managing cookies"]],
  concerns: [["protect", "How we protect you"], ["report", "How to report"], ["response", "What happens next"], ["rewards", "Thanks and rewards"], ["scope", "What's in scope"], ["safe-harbor", "Safe harbor"]],
  terms: [["agreement", "The agreement"], ["account", "Your account"], ["ownership", "Who owns what"], ["ai-output", "AI output"], ["your-apps", "Apps you publish"], ["providers", "Connected services"], ["payments", "Plans, credits & payment"], ["acceptable", "What you can't do"], ["termination", "Cancelling and suspension"], ["liability", "Liability"], ["copyright", "Copyright"], ["law", "Governing law & contact"]],
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

  // Footer links such as /legal#terms change only the hash, so follow it while the page stays mounted.
  const { hash } = useLocation();
  useLgEffect(() => {
    const h = hash.replace("#", "");
    if (!fixed && LEGAL_TABS.some(t => t.id === h)) setTab(h);
  }, [hash]);

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
              We wrote this to be read, not skimmed past. Every tab starts
              with a plain-English summary, and everything below it matches
              how the product works today.
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
            Questions? Email <a href="mailto:support@appsbuiltwithai.com">support@appsbuiltwithai.com</a>: a real person reads every message.
          </div>
          </div>
        </div>
      </section>
    </>
  );
}

function H2({ children, id }) { return <h2 id={id}>{children}</h2>; }

function PrivacyBody() {
  return (
    <>
      <H2 id="who-we-are">1. Who we are</H2>
      <p>AppsBuiltWithAI is run by Miestro, Inc., d/b/a AppsBuiltWithAI, a Georgia corporation at 3355 Lennox Road Northeast, Suite 750, Atlanta, Georgia 30326. This policy covers our websites (appsbuiltwithai.com and pages.appsbuiltwithai.com) and the builder at app.appsbuiltwithai.com.</p>

      <H2 id="what-we-collect">2. What we collect</H2>
      <ul>
        <li><strong>Account details</strong>: your name, email address and an optional profile picture. Your password is stored only as a one-way hash, never in readable form.</li>
        <li><strong>What you build</strong>: the prompts and messages you send the builder, files you attach (images, PDFs, Word documents and text files), and the code and content of your apps.</li>
        <li><strong>Sign-in and security data</strong>: your browser and device type, IP address, and an approximate location worked out from that IP address. We use these to show your active sessions and spot suspicious sign-ins.</li>
        <li><strong>Billing</strong>: Stripe processes all payments. We keep your Stripe customer and subscription references and your plan. We never receive your full card number.</li>
        <li><strong>Connected accounts</strong>: when you connect GitHub, Supabase or a tool such as Gmail or Slack, we store the access keys needed to use it, encrypted.</li>
        <li><strong>Usage and errors</strong>: which pages and features you use in the builder, and error reports when something breaks.</li>
        <li><strong>Waitlist and contact details</strong>: your name, email and, if you choose to give it, your phone number when you join the waitlist or contact us.</li>
      </ul>

      <H2 id="your-apps">3. Your apps and their visitors</H2>
      <p>When people visit an app you've published, we record basic visit data so we can show you analytics: pages viewed, the referring site, browser type and time on page. We don't store their IP address for this.</p>
      <p>Data your app collects from its own users, such as sign-ups or form entries, is stored in the database connected to your app, which you control. You're responsible for that data, including telling your users how you use it and having a lawful basis to collect it.</p>

      <H2 id="ai-training">4. AI and your data</H2>
      <p>To build and check your app, we send your prompts, conversation history, the text of files you attach and your app's code to Anthropic, whose Claude models power the builder. Under Anthropic's commercial terms, it doesn't use this data to train its models.</p>
      <p>We may use de-identified or aggregated data to improve our AI features. To keep your content out of model training entirely, email <a href="mailto:support@appsbuiltwithai.com">support@appsbuiltwithai.com</a>. It's free and works on every plan.</p>
      <p>Please don't put sensitive data into the builder, such as health records, government ID numbers or payment card numbers.</p>

      <H2 id="how-we-use">5. How we use your data</H2>
      <ul>
        <li>To run the builder, generate your apps and host the apps you publish.</li>
        <li>To process payments and manage your plan and credits.</li>
        <li>To keep accounts secure and investigate abuse or fraud.</li>
        <li>To answer your questions and give you support.</li>
        <li>To send account emails, plus product news and offers you can unsubscribe from at any time.</li>
        <li>To understand how the product is used and improve it.</li>
        <li>To meet our legal obligations.</li>
      </ul>

      <H2 id="who-we-share">6. Who we share data with</H2>
      <p>We don't sell your personal information. We share it only with the companies that help us run AppsBuiltWithAI, each limited to what they need:</p>
      <ul>
        <li><strong>Amazon Web Services</strong>: hosting, database and file storage.</li>
        <li><strong>Anthropic</strong>: the AI models that build your apps.</li>
        <li><strong>Modal</strong>: isolated environments where your app's code is built and tested.</li>
        <li><strong>Stripe</strong>: payments for your plan, and Stripe Connect when your app takes payments.</li>
        <li><strong>Customer.io</strong>: account and marketing emails.</li>
        <li><strong>PostHog</strong>: product analytics.</li>
        <li><strong>Sentry</strong>: error reports, set up not to collect personal data by default.</li>
        <li><strong>Composio</strong>: the connections to tools you link, such as Gmail, Slack or Notion.</li>
        <li><strong>GitHub and Supabase</strong>: only when you choose to connect them.</li>
        <li><strong>GoHighLevel</strong>: our main website and some checkout pages.</li>
        <li><strong>ip-api.com</strong>: turns a sign-in IP address into an approximate location.</li>
      </ul>
      <p>We may also share data when the law requires it, to protect people's safety or our rights, or as part of a merger or sale of the business, in which case this policy continues to apply.</p>

      <H2 id="where-stored">7. Where your data lives</H2>
      <p>Our servers are in the United States (Amazon Web Services, Oregon). If you use AppsBuiltWithAI from outside the US, your data is transferred there. Where the law requires it, we rely on safeguards such as the EU Standard Contractual Clauses.</p>

      <H2 id="retention">8. How long we keep it</H2>
      <p>We keep your data while your account is open. When you delete your account in Settings, your account, apps, conversations and sessions are removed from our database straight away. This can't be undone, so download anything you want to keep first.</p>
      <p>Some copies aren't removed automatically: files you attached, records at Stripe, and data held by our email and analytics providers. Email <a href="mailto:privacy@appsbuiltwithai.com">privacy@appsbuiltwithai.com</a> and we'll delete those too, unless the law requires us to keep them.</p>

      <H2 id="your-rights">9. Your rights</H2>
      <ul>
        <li><strong>Download your data</strong>: Settings → Data &amp; privacy → Download export gives you your profile, apps, sessions and security log.</li>
        <li><strong>Delete your account</strong>: from Settings, at any time.</li>
        <li><strong>Ask us</strong> for a copy of your data, a correction or a deletion by emailing <a href="mailto:privacy@appsbuiltwithai.com">privacy@appsbuiltwithai.com</a>. We'll answer within the time the law allows.</li>
        <li><strong>In the EU and UK</strong>, you can also object to or restrict how we use your data, and complain to your local data protection authority.</li>
        <li><strong>In California and other US states</strong>, you have the right to know, correct and delete your data, and to opt out of its sale or sharing. We don't sell it. For the advertising tags on our marketing pages, see the Cookie Policy. We won't treat you differently for using these rights.</li>
        <li><strong>Marketing</strong>: unsubscribe from any email, or reply STOP to a text.</li>
      </ul>

      <H2 id="children">10. Children</H2>
      <p>AppsBuiltWithAI is for adults. You must be 18 or older, or have a parent or guardian's consent, to create an account. We don't knowingly collect data from children under 13, and we delete it if we learn we have.</p>

      <H2 id="contact">11. Changes and contact</H2>
      <p>When we change this policy we update the date at the top, and we'll tell you by email or in the app before a material change takes effect. Questions or requests: <a href="mailto:privacy@appsbuiltwithai.com">privacy@appsbuiltwithai.com</a>, or by mail to Miestro, Inc. / AppsBuiltWithAI, 3355 Lennox Road Northeast, Suite 750, Atlanta, Georgia 30326.</p>
    </>
  );
}

function CookieBody() {
  return (
    <>
      <H2 id="what-cookies">1. What we mean by cookies</H2>
      <p>Cookies are small files a website stores in your browser. Some of our pages use your browser's local storage in a similar way. This page lists both, and says which part of AppsBuiltWithAI sets them.</p>

      <H2 id="essential">2. Essential</H2>
      <p>These make the product work. Blocking them will break things.</p>
      <ul>
        <li><code>abwa_token</code> (builder app): keeps you signed in for up to 7 days. Scripts on the page can't read it, and it's only sent over HTTPS.</li>
        <li><code>abwai-lang</code> (website, local storage): remembers the language you picked.</li>
        <li><code>abwai_idea</code> (website, local storage): keeps the app idea you typed so it's ready when you sign up.</li>
        <li><code>abwai_exit_seen</code> (website, local storage): makes sure you don't see the same offer twice.</li>
        <li><code>abwai-roadmap-likes</code> (website, local storage): remembers which roadmap items you voted for.</li>
      </ul>
      <p>The website's local storage stays in your browser. It isn't sent to us.</p>

      <H2 id="analytics">3. Product analytics</H2>
      <p>The builder app uses PostHog to count page views and some product events, linked to your account, so we can see which features get used and where people get stuck. It stores a <code>ph_</code> cookie and local storage. We don't record your screen or sessions.</p>

      <H2 id="advertising">4. Advertising and measurement</H2>
      <p>The builder app has no advertising trackers. Our marketing pages do use them to measure which ads bring people to us and to check ad traffic for fraud:</p>
      <ul>
        <li><strong>appsbuiltwithai.com</strong>, our main page, which runs on GoHighLevel: the Meta Pixel (cookie <code>_fbp</code>) and Vaudit. GoHighLevel may also set its own cookies to run the page.</li>
        <li><strong>Our waitlist page</strong>: Google Analytics (cookies <code>_ga</code> and <code>_ga_*</code>) and Vaudit.</li>
      </ul>

      <H2 id="other-services">5. Other services on our pages</H2>
      <p>Our website loads fonts from Google Fonts and plays our demo video through Voomly. Delivering these means those services receive your IP address and basic browser details.</p>

      <H2 id="manage">6. Managing cookies</H2>
      <ul>
        <li>Your browser can block or delete cookies and local storage for any site. Blocking <code>abwa_token</code> signs you out of the builder.</li>
        <li>You can limit ad tracking in your Meta ad preferences, and opt out of Google Analytics with Google's browser add-on.</li>
        <li>To opt out of product analytics in the builder, email <a href="mailto:privacy@appsbuiltwithai.com">privacy@appsbuiltwithai.com</a>.</li>
      </ul>
    </>
  );
}

function ConcernsBody() {
  return (
    <>
      <H2 id="protect">1. How we protect you</H2>
      <ul>
        <li>All traffic uses HTTPS, including custom domains on the apps you publish.</li>
        <li>Passwords are stored only as bcrypt hashes. Nobody here can read them.</li>
        <li>Access keys for your connected accounts (GitHub, Supabase and tools such as Gmail) are encrypted with AES-256-GCM.</li>
        <li>You can turn on two-factor sign-in with an authenticator app, and see or sign out of your active sessions in Settings.</li>
        <li>Sign-in attempts are rate limited to slow down password guessing.</li>
        <li>Card details are held by Stripe. We never see your full card number.</li>
        <li>Staff access to customer accounts depends on their role. When support views an account to help someone, that access is time-limited and logged.</li>
      </ul>

      <H2 id="report">2. How to report a vulnerability</H2>
      <p>Email <a href="mailto:security@appsbuiltwithai.com">security@appsbuiltwithai.com</a> with the page or feature affected, the steps to reproduce it, and what an attacker could do with it. Please don't access or change other people's data, and keep the issue private until we've fixed it.</p>

      <H2 id="response">3. What happens next</H2>
      <ul>
        <li><strong>Acknowledgement</strong> within 24 hours.</li>
        <li><strong>Assessment</strong>: we'll tell you how serious we think it is and when we expect to fix it.</li>
        <li><strong>Fix</strong>: we'll let you know when it's fixed so you can check it.</li>
        <li><strong>Disclosure</strong>: we'll agree on timing with you before anything is made public. If we can't agree, the default is 90 days from your report.</li>
      </ul>

      <H2 id="rewards">4. Thanks and rewards</H2>
      <p>We don't run a paid bug bounty program right now. With your permission, we'll credit you publicly for valid reports, and we may offer a reward for significant findings at our discretion.</p>

      <H2 id="scope">5. What's in scope</H2>
      <p>In scope: appsbuiltwithai.com, pages.appsbuiltwithai.com, app.appsbuiltwithai.com, and flaws in our platform that affect apps hosted with us.</p>
      <p>Out of scope:</p>
      <ul>
        <li>Reports from automated scanners with no working exploit.</li>
        <li>Missing headers or best-practice settings with no demonstrated impact.</li>
        <li>Self-XSS, and clickjacking on pages with no sensitive actions.</li>
        <li>Denial-of-service or load testing.</li>
        <li>Social engineering or physical attacks on our team.</li>
        <li>Problems in third-party services we use (report them to that company) and bugs in the code of an app someone built with us (report them to the app's owner).</li>
      </ul>

      <H2 id="safe-harbor">6. Safe harbor</H2>
      <p>If you research in good faith (you only use accounts you own, don't view or keep other people's data beyond what's needed to show the issue, don't disrupt the service, and give us reasonable time to fix it before going public), we won't take legal action against you or report you to law enforcement for it.</p>
    </>
  );
}

function TermsBody() {
  return (
    <>
      <p>This is a plain-English summary of our <a href={FULL_TERMS}>Terms of Service</a>. The full Terms are the binding agreement, and they apply if anything here differs.</p>

      <H2 id="agreement">1. The agreement</H2>
      <p>The agreement is between you and Miestro, Inc., d/b/a AppsBuiltWithAI. By creating an account or using AppsBuiltWithAI, you agree to the Terms. If we make a material change, we'll give you at least 30 days' notice by email or in the app before it takes effect, unless the law or an urgent security issue needs a shorter period.</p>

      <H2 id="account">2. Your account</H2>
      <ul>
        <li>You must be 18 or older, or have a parent or guardian's consent.</li>
        <li>Give accurate details and keep your login safe. You're responsible for what happens under your account, so don't share it.</li>
        <li>Tell us at <a href="mailto:support@appsbuiltwithai.com">support@appsbuiltwithai.com</a> straight away if someone else gets in.</li>
        <li>If your account belongs to a company or group, its administrators can manage it and its apps.</li>
      </ul>

      <H2 id="ownership">3. Who owns what</H2>
      <p>You own what you put in and what the builder makes for you: your prompts, your files, your apps and the AI output, subject to any rights that third parties have in them. We own the AppsBuiltWithAI platform and the usage data it generates.</p>
      <p>You give us permission to host, copy, process and display your content as needed to run and improve the service, including our AI features. You can opt out of model training at any time, free on every plan, by emailing <a href="mailto:support@appsbuiltwithai.com">support@appsbuiltwithai.com</a>.</p>

      <H2 id="ai-output">4. AI output</H2>
      <p>AI can make mistakes. Review and test what the builder makes before you rely on it, especially for anything medical, legal, financial or otherwise high-risk. Output may look like what other people get from similar prompts, and we don't guarantee it's accurate, unique or free of other people's rights.</p>

      <H2 id="your-apps">5. Apps you publish</H2>
      <ul>
        <li>You're responsible for your apps and what they do, including having the rights and a legal basis for any data they collect from your users.</li>
        <li>Don't use your apps to collect health records, government ID numbers, card numbers or similar sensitive data unless we've agreed to it in writing.</li>
        <li>When your app takes payments, the money goes to your own Stripe account. You're the seller, so refunds and taxes for your customers are yours to handle.</li>
        <li>Free subdomains we give your app belong to us. We may reclaim one for abuse, impersonation or trademark problems, usually with 7 days' notice. Use your own domain for anything important.</li>
      </ul>

      <H2 id="providers">6. Connected services</H2>
      <p>The builder sends your prompts to AI providers and stores data with hosting providers, and their own terms apply to how they handle it. The same goes for services you connect, such as GitHub, Supabase, Stripe or Gmail. We can't guarantee uninterrupted service when an outage comes from one of these providers. Beta features, such as Import, may change or stop at any time.</p>

      <H2 id="payments">7. Plans, credits &amp; payment</H2>
      <ul>
        <li>Paid plans renew automatically until you cancel in your account settings.</li>
        <li>Credits pay for AI work such as building, editing and planning. Bigger jobs use more credits.</li>
        <li>If a build ends broken, or fails because of a problem on our side, the credits it used come back automatically. A build that stops because you ran out of credits isn't refunded.</li>
        <li>At renewal you can carry over up to one or two months' worth of your plan's credits, depending on the plan. Anything above that expires, and the Free plan doesn't roll over. See <a href="/pricing">Pricing</a> for the details of each plan.</li>
        <li>Credits have no cash value, can't be transferred, and aren't refundable except where the law requires.</li>
        <li>Payments are processed by Stripe. You're responsible for any sales tax or VAT on your purchases.</li>
        <li>If we materially reduce what a paid plan includes, we'll tell you before it affects your subscription.</li>
      </ul>

      <H2 id="acceptable">8. What you can't do</H2>
      <ul>
        <li>Resell, sublicense or share access to the platform, or share your login.</li>
        <li>Reverse engineer the platform or try to extract its code or models.</li>
        <li>Get around usage limits, free-plan limits or the free-plan badge.</li>
        <li>Use bots or scrapers on the service without our written permission.</li>
        <li>Upload malicious code, or try to disrupt or overload the service.</li>
        <li>Harass, defame, impersonate or harm anyone.</li>
        <li>Publish unlawful, deceptive or infringing content through an app.</li>
        <li>Break the law, export controls or sanctions.</li>
        <li>Rely on AI output without review in medical, legal, financial or other high-risk situations.</li>
        <li>Use the service or its output to build or train a competing app builder or AI model.</li>
      </ul>

      <H2 id="termination">9. Cancelling and suspension</H2>
      <p>You can cancel at any time from your account settings, and your remaining credits stay available until the end of the billing period. We can end an account with reasonable notice, or immediately for a serious breach, fraud, illegal activity or a security risk. If we end an account for breach or fraud, its remaining credits are lost. Deleting your account is immediate and permanent, so export your work first.</p>

      <H2 id="liability">10. Liability</H2>
      <p>The service and its AI output are provided "as is", without warranties. We aren't liable for indirect or consequential losses such as lost profits or lost data. Our total liability for any claim is limited to what you paid us in the 12 months before it arose, except where the law doesn't allow that limit. If your use of the service or your content causes a claim against us, you agree to cover our costs.</p>

      <H2 id="copyright">11. Copyright</H2>
      <p>We respond to good-faith copyright (DMCA) notices. To report infringing or illegal content in an app hosted with us, email <a href="mailto:support@appsbuiltwithai.com">support@appsbuiltwithai.com</a>.</p>

      <H2 id="law">12. Governing law &amp; contact</H2>
      <p>The Terms are governed by the laws of the State of Georgia. Questions go to <a href="mailto:support@appsbuiltwithai.com">support@appsbuiltwithai.com</a>, or by mail to Miestro, Inc. / AppsBuiltWithAI, 3355 Lennox Road Northeast, Suite 750, Atlanta, Georgia 30326.</p>
    </>
  );
}


export default LegalPage;
