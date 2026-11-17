import React, { useState as useLgState, useEffect as useLgEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Reveal } from './part1.jsx';
/* ============= LEGAL HUB: Privacy / Cookie / Concerns / Terms ============= */

const LEGAL_TABS = [
  { id: "privacy", label: "Privacy Policy", updated: "October 20, 2026", href: "/legal#privacy", h: "Privacy Policy", em: "Your data stays yours." },
  { id: "cookie", label: "Cookie Policy", updated: "October 20, 2026", href: "/legal#cookie", h: "Cookie Policy", em: "What runs, and your choices." },
  { id: "concerns", label: "Security", updated: "October 20, 2026", href: "/legal#concerns", h: "Security", em: "Report a concern." },
  { id: "terms", label: "Terms of Service", updated: "October 20, 2026", href: "/legal#terms", h: "Terms of Service", em: "The deal, in plain words." },
];

const PLAIN_ENGLISH = {
  privacy:  "We collect account information, what you type and build, and usage and security data. Building an app sends relevant content to our AI and hosting providers. Card details stay with Stripe. We don't sell your data. You can download your data or delete your account from Settings.",
  cookie:   "The builder uses a sign-in cookie and PostHog to count page views and feature use. It doesn't record your screen and has no ad trackers. Our main page at appsbuiltwithai.com and our waitlist page use advertising and analytics tags (Meta Pixel, Google Analytics, Vaudit). Below is each one and how to switch it off.",
  concerns: "Passwords are hashed, and connected-account keys are encrypted. Found a security issue? Email security@appsbuiltwithai.com with steps to reproduce it. Please use accounts you own and avoid accessing other people's data or disrupting the service.",
  terms:    "You own what you build. Use the platform legally and check AI output before you rely on it. Credits pay for AI work, and a build that ends broken gets its credits back automatically. Credits aren't refundable as cash. You're responsible for the apps you publish and the people who use them. Our liability is capped at what you paid us in the last 12 months, and Georgia law applies. This is a summary: the full Terms of Service are the binding version.",
};

const LEGAL_TOC = {
  privacy: [["who-we-are", "Who we are"], ["what-we-collect", "What we collect"], ["your-apps", "Your apps and their visitors"], ["ai-training", "AI and your data"], ["how-we-use", "Purposes and legal bases"], ["who-we-share", "Who we share with"], ["where-stored", "Where your data lives"], ["retention", "How long we keep it"], ["your-rights", "Your rights"], ["children", "Children"], ["contact", "Changes and contact"]],
  cookie: [["what-cookies", "What we mean by cookies"], ["essential", "Sign-in and preferences"], ["analytics", "Product analytics"], ["advertising", "Advertising and measurement"], ["other-services", "Other services on our pages"], ["manage", "Managing cookies"]],
  concerns: [["protect", "How we protect you"], ["report", "How to report"], ["response", "What happens next"], ["scope", "What's in scope"], ["research", "Responsible research"]],
  terms: [["agreement", "The agreement"], ["account", "Your account"], ["ownership", "Who owns what"], ["ai-output", "AI output"], ["published-apps", "Apps you publish"], ["providers", "Connected services"], ["payments", "Plans, credits & payment"], ["acceptable", "What you can't do"], ["termination", "Cancelling and suspension"], ["liability", "Liability"], ["copyright", "Copyright"], ["law", "Governing law & contact"]],
};

function tabForHash(hash) {
  const id = hash.replace("#", "");
  return LEGAL_TABS.find(t => t.id === id)?.id ||
    Object.keys(LEGAL_TOC).find(tab => LEGAL_TOC[tab].some(([section]) => section === id));
}

function LegalPage() {
  const fixed = typeof window !== "undefined" ? window.LEGAL_DOC : null;
  const [tab, setTab] = useLgState(() => {
    if (fixed) return fixed;
    if (typeof window !== "undefined") {
      const h = window.location.hash.replace("#", "");
      if (tabForHash(h)) return tabForHash(h);
    }
    return "privacy";
  });

  const location = useLocation();
  const navigate = useNavigate();
  useLgEffect(() => {
    if (fixed) return;
    const next = tabForHash(location.hash) || "privacy";
    setTab(next);
  }, [location.hash, fixed]);

  useLgEffect(() => {
    if (fixed) return;
    const id = location.hash.slice(1);
    if (LEGAL_TABS.some(t => t.id === id) || !id) {
      window.scrollTo({ top: 0, behavior: "instant" });
    } else {
      const section = document.getElementById(id);
      if (section) window.scrollTo({ top: section.getBoundingClientRect().top + window.scrollY - 90, behavior: "instant" });
    }
  }, [tab, location.key, location.hash, fixed]);

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
              with a plain-English summary, and the Terms tab links to the
              full Terms of Service.
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
                  onClick={() => navigate({ search: location.search, hash: t.id }, { replace: true })}
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
      <p>This notice explains how our marketing pages and the builder handle your data.</p>
      <H2 id="who-we-are">1. Who we are</H2>
      <p>AppsBuiltWithAI is run by Miestro, Inc., d/b/a AppsBuiltWithAI, a Georgia corporation at 3355 Lennox Road Northeast, Suite 750, Atlanta, Georgia 30326. This notice covers our websites (appsbuiltwithai.com and pages.appsbuiltwithai.com) and the builder at app.appsbuiltwithai.com.</p>

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
      <p>To build and check your app, the builder sends relevant prompts, conversation history, attached content and app code to its configured AI provider. Anthropic is the default provider. Its commercial API does not use inputs and outputs for model training by default; different terms can apply if data use is explicitly enabled.</p>
      <p>If image or video generation is available and you use it, prompts are also sent through KIE.ai to the selected image or video model. Other configured AI services may have different data-handling terms. Contact us if you need to confirm which providers will receive your content before using a feature.</p>
      <p>We may use anonymized or aggregated data to improve AI features. Identifiable customer content is not used for general model training without permission. You can request an account-level model-training opt-out by emailing <a href="mailto:support@appsbuiltwithai.com">support@appsbuiltwithai.com</a>, free on every plan. Requests are handled through support. Processing a prompt to produce a response is different from training a model.</p>
      <p>Please don't put sensitive data into the builder, such as health records, government ID numbers or payment card numbers.</p>

      <H2 id="how-we-use">5. Purposes and legal bases</H2>
      <ul>
        <li>To run the builder, generate your apps and host the apps you publish.</li>
        <li>To process payments and manage your plan and credits.</li>
        <li>To keep accounts secure and investigate abuse or fraud.</li>
        <li>To answer your questions and give you support.</li>
        <li>To send account emails, plus product news and offers you can unsubscribe from at any time.</li>
        <li>To understand how the product is used and improve it.</li>
        <li>To meet our legal obligations.</li>
      </ul>
      <p>We rely on contract, legitimate interests, consent and legal obligations as the bases for different processing activities. Where UK or EU data protection law applies, providing requested account, building, hosting and billing services relies on contract. Securing and improving the service, preventing abuse and providing support rely on legitimate interests where appropriate, subject to your rights. Optional marketing and tracking require consent where the law requires it; legal obligations cover tax, accounting and other required records. Our legitimate interests are operating and improving a reliable service and protecting users and the business. You can object to processing based on legitimate interests or withdraw consent by contacting us. Withdrawal does not affect processing that was lawful before you withdrew it.</p>
      <p>Account and billing information needed to provide a requested service must be supplied to use that service. Optional marketing choices do not determine whether you can create an account or buy a plan.</p>

      <H2 id="who-we-share">6. Who we share data with</H2>
      <p>The services that receive data depend on the pages and features you use. They include:</p>
      <ul>
        <li><strong>Amazon Web Services</strong>: hosting, database and file storage.</li>
        <li><strong>Anthropic and any other configured AI provider</strong>: content needed to generate and check your apps.</li>
        <li><strong>KIE.ai and the selected model provider</strong>: image and video prompts when those generation features are enabled and used.</li>
        <li><strong>Modal</strong>: isolated environments where your app's code is built and tested.</li>
        <li><strong>Stripe</strong>: payments for your plan, and Stripe Connect when your app takes payments.</li>
        <li><strong>Customer.io</strong>: account and marketing emails.</li>
        <li><strong>PostHog</strong>: product analytics.</li>
        <li><strong>Sentry</strong>: error reports, set up not to collect personal data by default.</li>
        <li><strong>Composio</strong>: the connections to tools you link, such as Gmail, Slack or Notion.</li>
        <li><strong>GitHub and Supabase</strong>: only when you choose to connect them.</li>
        <li><strong>GoHighLevel</strong>: our main website and some checkout pages.</li>
        <li><strong>ip-api.com</strong>: turns a sign-in IP address into an approximate location.</li>
        <li><strong>Google Fonts and Voomly</strong>: font delivery and the demo video, including IP address and browser details needed to deliver them.</li>
        <li><strong>Meta, Google Analytics and Vaudit</strong>: advertising and measurement on marketing pages where their tags are used, as explained in the Cookie Policy.</li>
      </ul>
      <p>Advertising disclosures may count as a sale or sharing under applicable US state privacy laws, depending on the service and configuration. The Cookie Policy explains the distinction between the builder, this website and separately hosted marketing pages. You can ask us about the recipients and choices that apply to your visit.</p>
      <p>We may also share data when the law requires it, to protect people's safety or our rights, or as part of a merger or sale of the business, in which case this policy continues to apply.</p>

      <H2 id="where-stored">7. Where your data lives</H2>
      <p>The platform uses Amazon Web Services infrastructure in the United States, including Oregon. Our providers may process information in other countries; this is not a promise that every copy stays in one region. International transfers must use a legally permitted mechanism where required. Email <a href="mailto:privacy@appsbuiltwithai.com">privacy@appsbuiltwithai.com</a> to request information about the countries, applicable transfer mechanism and a copy of any contractual safeguards relevant to your data.</p>

      <H2 id="retention">8. How long we keep it</H2>
      <p>We retain information for as long as needed to provide the service, meet legal obligations, prevent fraud and resolve disputes. Account and project information is needed while your account is active. Billing records are retained for applicable tax and accounting obligations; security logs are retained according to security and fraud-prevention needs; provider records and backups follow their applicable retention schedules.</p>
      <p>Deleting an account removes its active database account and associated project records. It does not immediately erase every attachment, stored file, backup or third-party record. For those copies, request erasure at <a href="mailto:privacy@appsbuiltwithai.com">privacy@appsbuiltwithai.com</a>. We will assess the request under applicable law and explain any information that must be retained and why. Ask us for the retention period or criteria for a particular category.</p>
      <p>Account deletion is permanent and is separate from cancelling a paid subscription. Cancel a paid plan through billing settings before deleting your account, or contact support for help. Export the work you want to keep first.</p>

      <H2 id="your-rights">9. Your rights</H2>
      <ul>
        <li><strong>Download your data</strong>: Settings → Data &amp; privacy → Download export gives you your profile, apps, sessions and security log.</li>
        <li><strong>Delete your account</strong>: from Settings, at any time.</li>
        <li><strong>Ask us</strong> for a copy of your data, a correction or a deletion by emailing <a href="mailto:privacy@appsbuiltwithai.com">privacy@appsbuiltwithai.com</a>. We'll answer within the time the law allows.</li>
        <li><strong>In the EU and UK</strong>, you can also object to or restrict how we use your data, and complain to your local data protection authority.</li>
        <li><strong>In California and other US states</strong>, your rights may include knowing, correcting and deleting your data and opting out of sale, sharing or targeted advertising, depending on the law that applies. Send requests to <a href="mailto:privacy@appsbuiltwithai.com">privacy@appsbuiltwithai.com</a>. Advertising choices depend on the page you visit; see the Cookie Policy. We won't discriminate against you for exercising applicable privacy rights.</li>
        <li><strong>Marketing</strong>: unsubscribe from an email, reply STOP to a text, or tell us another reasonable way that you want marketing to stop. Giving us a phone number does not, by itself, establish permission for marketing communications that legally require separate consent.</li>
      </ul>

      <H2 id="children">10. Children</H2>
      <p>The services are intended for adults. Under the full Terms, someone under 18 needs a parent or legal guardian's consent. If we learn that we collected personal data from a minor without appropriate consent, we will delete it. Contact us if you believe a minor's information has been provided without that consent.</p>

      <H2 id="contact">11. Changes and contact</H2>
      <p>We update the date when this notice changes. Material changes receive at least 30 days' notice by email or in the app before they take effect. Questions or requests: <a href="mailto:privacy@appsbuiltwithai.com">privacy@appsbuiltwithai.com</a>, or by mail to Miestro, Inc. / AppsBuiltWithAI, 3355 Lennox Road Northeast, Suite 750, Atlanta, Georgia 30326.</p>
    </>
  );
}

function CookieBody() {
  return (
    <>
      <H2 id="what-cookies">1. What we mean by cookies</H2>
      <p>Cookies are small files a website stores in your browser. Local storage can remember information in a similar way. The examples below identify the service involved; third-party names and durations can vary with provider configuration.</p>

      <H2 id="essential">2. Sign-in and preferences</H2>
      <p>The sign-in cookie is needed to stay signed in. Other storage supports optional preferences or page features; appearing in this list does not make it strictly necessary.</p>
      <ul>
        <li><code>abwa_token</code> (builder app): keeps you signed in for up to 7 days. Scripts on the page can't read it, and it's only sent over HTTPS.</li>
        <li><code>abwai-lang</code> (website, local storage): remembers the language you picked.</li>
        <li><code>abwai_idea</code> (website, local storage): keeps the app idea you typed so it's ready when you sign up.</li>
        <li><code>abwai_exit_seen</code> (website, local storage): makes sure you don't see the same offer twice.</li>
        <li><code>abwai-roadmap-likes</code> (website, local storage): remembers which roadmap items you voted for.</li>
      </ul>
      <p>These website preferences remain until you clear them unless an expiry is stated. Local storage is kept in your browser, but information you later submit, such as an app idea during signup, can be sent to us as part of that action.</p>

      <H2 id="analytics">3. Product analytics</H2>
      <p>The builder app uses PostHog to count page views and some product events, linked to your account, so we can see which features get used and where people get stuck. It stores a <code>ph_</code> cookie and local storage. We don't record your screen or sessions.</p>
      <p>Contact <a href="mailto:privacy@appsbuiltwithai.com">privacy@appsbuiltwithai.com</a> about your account's analytics choices. Cookie consent and privacy rights depend on the tracking involved and the law that applies.</p>

      <H2 id="advertising">4. Advertising and measurement</H2>
      <p>The builder app has no advertising trackers. Our marketing pages do use them to measure which ads bring people to us and to check ad traffic for fraud:</p>
      <ul>
        <li><strong>appsbuiltwithai.com</strong>, our main page, which runs on GoHighLevel: the Meta Pixel (cookie <code>_fbp</code>) and Vaudit. GoHighLevel may also set its own cookies to run the page.</li>
        <li><strong>Our waitlist page</strong>: Google Analytics (cookies <code>_ga</code> and <code>_ga_*</code>) and Vaudit.</li>
      </ul>
      <p>Depending on the law that applies, you may have a right to withhold or withdraw consent to optional advertising tracking, or to opt out of sale, sharing or targeted advertising. Sharing can be covered even when no money changes hands. Global Privacy Control is one way to communicate an applicable opt-out choice to a site you visit.</p>
      <p>These marketing pages can be hosted separately or shown around this website in an embedded frame. This website does not provide controls for tags in its surrounding host page or in the builder. Use the controls on the page that sets those tags or contact us for help with that page.</p>

      <H2 id="other-services">5. Other services on our pages</H2>
      <p>Our website loads fonts from Google Fonts and plays our demo video through Voomly. Delivering these means those services receive your IP address and basic browser details.</p>
      <p>When you click "Watch the demo", the Voomly player loads automatically. Voomly receives your IP address and browser details and may use cookies or local storage. To remove cookies or data already received, use your browser's site-data controls or contact the provider.</p>

      <H2 id="manage">6. Managing cookies</H2>
      <ul>
        <li>Your browser can block or delete cookies and local storage for any site. Blocking <code>abwa_token</code> signs you out of the builder.</li>
        <li>You can limit ad tracking in your Meta ad preferences, and opt out of Google Analytics with Google's browser add-on.</li>
        <li>To opt out of product analytics in the builder, email <a href="mailto:privacy@appsbuiltwithai.com">privacy@appsbuiltwithai.com</a>.</li>
        <li>To exercise applicable sale, sharing or targeted-advertising opt-out rights, email <a href="mailto:privacy@appsbuiltwithai.com">privacy@appsbuiltwithai.com</a>. Browser add-ons and account preferences at an advertising provider are additional tools; they do not replace consent or opt-out controls required on the page you visit.</li>
      </ul>
    </>
  );
}

function ConcernsBody() {
  return (
    <>
      <H2 id="protect">1. How we protect you</H2>
      <ul>
        <li>Our websites, the builder and the apps you publish, including custom domains, are served over HTTPS.</li>
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
        <li><strong>Review</strong>: we assess reports according to their impact and the information provided.</li>
        <li><strong>Follow-up</strong>: include a way to reach you so we can ask questions and discuss remediation.</li>
        <li><strong>Timing</strong>: response and fix times depend on the issue; this page does not promise a response or resolution deadline.</li>
        <li><strong>Disclosure</strong>: please coordinate publication with us so users can be protected while an issue is assessed and fixed.</li>
      </ul>

      <H2 id="scope">4. What's in scope</H2>
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

      <H2 id="research">5. Responsible research</H2>
      <p>Please limit testing to accounts and data you own, avoid disruption, and stop if you encounter someone else's information. A disclosure policy does not authorize access to third-party systems or another user's data. Contact us before testing if you need written authorization or clarification of scope.</p>
    </>
  );
}

function TermsBody() {
  return (
    <>
      <p>This is a plain-English summary of our Terms of Service. The full Terms are the binding agreement, and they apply if anything here differs, except the automatic credit return in section 7, which we apply in addition to them. <a href="/terms">Read the full Terms of Service</a>.</p>

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
      <p>The full Terms grant permission to host, copy, process and display content to operate and improve the service, including AI features. Identifiable customer content is not used for general model training without permission, while anonymized or aggregated data may be used for improvement. You can request a model-training opt-out at any time, free on every plan, by emailing <a href="mailto:support@appsbuiltwithai.com">support@appsbuiltwithai.com</a>. Requests are handled through support. Processing your prompt to build an app is different from model training.</p>

      <H2 id="ai-output">4. AI output</H2>
      <p>AI can make mistakes. Review and test what the builder makes before you rely on it, especially for anything medical, legal, financial or otherwise high-risk. Output may look like what other people get from similar prompts, and we don't guarantee it's accurate, unique or free of other people's rights.</p>

      <H2 id="published-apps">5. Apps you publish</H2>
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
        <li><strong>Automatic credit return</strong>: if a build ends broken, or fails because of a problem on our side, the credits it used go back to your balance automatically. A build that stops because you ran out of credits doesn't get them back. Returned credits aren't a cash refund. This return applies in addition to the full Terms.</li>
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
      <p>Cancelling a paid subscription and deleting your account are different actions. Cancel renewal through billing settings before deleting an account, or ask support for help. The full Terms describe access to remaining credits through the billing period after voluntary cancellation. Deleting the account removes access to its apps and credits and cannot be undone; export your work first. External files, backups and provider records may remain as described in the Privacy Policy.</p>
      <p>We can end an account with reasonable notice, or immediately for a serious breach, fraud, illegal activity or a security risk. If we end an account for breach or fraud, its remaining credits are lost, subject to applicable law.</p>

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
