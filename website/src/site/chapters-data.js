/* Shared chapter directory (community + chapter) */
  const CHAPTERS = [
    { id: "san-francisco", city: "San Francisco", country: "USA", lead: "Mei C.", initials: "MC", tint: "warm", members: 3210, cadence: "First Thursday, monthly", venue: "Indie hack night · SoMa", since: "Jan 2025",
      about: "The original chapter. Demo-heavy, bring something half-broken and leave with it working. Strong food-truck culture afterward.",
      next: [{ when: "Thu, Jul 23 · 6:30p", what: "Indie hack night, demos + pizza" }, { when: "Thu, Aug 6 · 6:30p", what: "Ship-it session: launch together" }] },
    { id: "berlin", city: "Berlin", country: "Germany", lead: "Lina H.", initials: "LH", tint: "plum", members: 1840, cadence: "Monthly, Tuesday evenings", venue: "Café Voltaire · Kreuzberg", since: "Mar 2025",
      about: "Bilingual (DE/EN) meetup with a strong indie-dev crowd. Every third session is a build-a-thon.",
      next: [{ when: "Tonight · 7p", what: "Voltaire café session, open build" }, { when: "Tue, Aug 11 · 7p", what: "Build-a-thon: client-app sprint" }] },
    { id: "new-york", city: "New York", country: "USA", lead: "Jordan T.", initials: "JT", tint: "rose", members: 2960, cadence: "Every other Saturday", venue: "Brooklyn · rotating cowork spaces", since: "Feb 2025",
      about: "Big, fast, and friendly. Saturday build-a-thons with a newcomer pod every session, nobody builds alone.",
      next: [{ when: "Sat, Jul 25 · 10a", what: "Brooklyn build-a-thon" }, { when: "Sat, Aug 8 · 10a", what: "Demo day + founder AMA" }] },
    { id: "sao-paulo", city: "São Paulo", country: "Brazil", lead: "Bruno F.", initials: "BF", tint: "mint", members: 1410, cadence: "Wednesdays, monthly", venue: "Vila Madalena", since: "Apr 2025",
      about: "Portuguese-first chapter helping LATAM builders ship. Strong freelancer and agency scene.",
      next: [{ when: "Wed, Jul 29 · 7p", what: "Vila Madalena meetup, connectors clinic" }] },
    { id: "bengaluru", city: "Bengaluru", country: "India", lead: "Anita R.", initials: "AR", tint: "sky", members: 2280, cadence: "Saturdays, twice monthly", venue: "Indiranagar coworking", since: "Mar 2025",
      about: "The fastest-growing chapter. Heavy on marketplaces and client work; sessions often run long into chai.",
      next: [{ when: "Sat, Jul 18 · 10a", what: "Indiranagar cowork session" }, { when: "Sat, Aug 1 · 10a", what: "Freelancer playbook workshop" }] },
    { id: "lagos", city: "Lagos", country: "Nigeria", lead: "Tunde A.", initials: "TA", tint: "warm", members: 890, cadence: "Sundays, monthly", venue: "Yaba · coworking hub", since: "May 2025",
      about: "Demo-day format: everyone shows what they shipped that month. Fintech-heavy, wildly energetic.",
      next: [{ when: "Sun, Jul 26 · 2p", what: "Yaba demo day" }] },
    { id: "tokyo", city: "Tokyo", country: "Japan", lead: "Yuki S.", initials: "YS", tint: "rose", members: 720, cadence: "Mondays, monthly", venue: "Shibuya cowork", since: "Jun 2025",
      about: "Quiet-build format: two hours of heads-down building, then show-and-tell over convenience-store snacks.",
      next: [{ when: "Mon, Jul 20 · 7p", what: "Shibuya quiet-build night" }] },
    { id: "mexico-city", city: "Mexico City", country: "Mexico", lead: "Sofía R.", initials: "SR", tint: "plum", members: 640, cadence: "Fridays, monthly", venue: "Roma Norte", since: "Jul 2025",
      about: "Newest chapter. Casual taquería sessions, bring a laptop and an appetite.",
      next: [{ when: "Fri, Jul 24 · 7p", what: "Roma Norte taquería session" }] },
  ];
  export const ABWA_CHAPTERS = { CHAPTERS, get(id) { return CHAPTERS.find((c) => c.id === id); } };

export function avatarTint(t) {
  return ({
    warm: "linear-gradient(135deg, #FFC76B, #FB8855)",
    plum: "linear-gradient(135deg, #C58CE8, #6A2EB8)",
    rose: "linear-gradient(135deg, #FF9AAE, #FF5C77)",
    mint: "linear-gradient(135deg, #6BE2A8, #2EA56F)",
    sky:  "linear-gradient(135deg, #9CC9F0, #5189D1)",
    ink:  "linear-gradient(135deg, #4B4458, #181818)",
  })[t] || "linear-gradient(135deg, #FFC76B, #FB8855)";
}
