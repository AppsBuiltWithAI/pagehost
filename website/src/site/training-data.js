/* Shared training catalog + progress store (localStorage) */
  const COURSES = [
    { id: "foundations", lvl: "Free", title: "Foundations", hrs: "2 hours", icon: "🧭", color: "coral",
      desc: "The orientation. A guided tour of everything you can do, from the first prompt to a live app.",
      outcome: "You'll know your way around the whole platform: plan, build, edit, publish.",
      lessons: ["Welcome: what AppsBuiltWithAI can (and can't) do", "The dashboard, in 5 minutes", "Your first build: describe an app", "Editing: talk to your app", "Preview, devices, and sharing", "Publishing to a real URL", "Where to go when you're stuck"] },
    { id: "prompting", lvl: "Free", title: "Prompting essentials", hrs: "90 min", icon: "✍️", color: "sun",
      desc: "How to talk to the builder so it nails it on the first try. The highest-leverage skill on the platform.",
      outcome: "You'll write prompts that get the right result in one pass instead of five.",
      lessons: ["Why prompts fail: vague vs. specific", "The anatomy of a great prompt", "Describing look & feel without design words", "One change at a time: the edit loop", "Referencing examples (\"like X but…\")", "Prompting for data: forms, lists, tables", "When to use Plan mode instead", "Practice: rewrite 5 bad prompts"] },
    { id: "landing", lvl: "Free", title: "Build & ship a landing page", hrs: "3 hours", icon: "🚀", color: "mint",
      desc: "Hands-on. By the end you have a real, live, custom-domain landing page.",
      outcome: "A real landing page, live on your own domain, built along with the lessons.",
      lessons: ["Picking the one thing your page says", "Building the first draft", "Hero, proof, and call-to-action", "Copy that converts (steal this structure)", "Making it look expensive", "Forms that people actually fill in", "Connecting your domain", "Going live + the launch checklist", "Reading your first week of analytics"] },
    { id: "connectors", lvl: "Pro+", title: "Connectors mastery", hrs: "5 hours", icon: "🔌", color: "sky",
      desc: "Stripe, Gmail, Notion, Twilio, Slack: wire them all up like you've done it forever.",
      outcome: "You'll connect payments, email, SMS, and docs to any app without fear.",
      lessons: ["How connectors work under the hood", "Stripe: taking your first payment", "Stripe: subscriptions & receipts", "Gmail: sending from your app", "Slack: alerts where your team lives", "Notion: your app as a front-end", "Twilio: SMS confirmations", "Auth & OAuth without tears", "Debugging a broken connector", "Capstone: wire a booking flow end to end"] },
    { id: "clientwork", lvl: "Pro+", title: "Apps for client work", hrs: "8 hours", icon: "💼", color: "plum",
      desc: "The agency playbook. Scoping, pricing, presenting, handing off.",
      outcome: "A repeatable playbook for selling, building, and handing off client apps.",
      lessons: ["The client-app market in 2026", "Scoping a build in one call", "Pricing: value, not hours", "The proposal that closes", "Building in front of the client", "Feedback rounds without scope creep", "Handoff: accounts, domains, training", "Retainers & care plans", "Getting the next referral", "Capstone: mock client project"] },
    { id: "design", lvl: "Pro+", title: "Designing without designing", hrs: "4 hours", icon: "🎨", color: "rose",
      desc: "Make apps that look like a designer touched them. (Even when one didn't.)",
      outcome: "Apps that look intentional: type, color, spacing, and imagery that hang together.",
      lessons: ["Why most AI apps look 'off'", "Type: two fonts, three sizes", "Color: one palette, used everywhere", "Spacing: the 8px habit", "Imagery: real photos beat clip art", "Layouts that guide the eye", "Polish pass: the 15-minute checklist", "Before/after: fixing 3 real apps"] },
  ];

  const KEY = "abwa_training_progress";
  function readAll() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function writeAll(obj) { try { localStorage.setItem(KEY, JSON.stringify(obj)); } catch (e) {} }

  export const ABWA_TRAINING = {
    COURSES,
    get(id) { return COURSES.find((c) => c.id === id); },
    done(id) { return readAll()[id] || []; },
    toggle(id, idx) {
      const all = readAll();
      const set = new Set(all[id] || []);
      set.has(idx) ? set.delete(idx) : set.add(idx);
      all[id] = [...set];
      writeAll(all);
      return all[id];
    },
    pct(id) {
      const c = this.get(id);
      if (!c) return 0;
      return Math.round((this.done(id).length / c.lessons.length) * 100);
    },
  };
