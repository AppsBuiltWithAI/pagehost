/* ============================================================
   Apps Built With AI Live — event data
   Edit this file to update schedule, speakers, resources, venue.
   ============================================================ */
window.EVENT = {
  name: "Apps Built With AI Live",
  tagline: "The Future Is Now",
  city: "Atlanta, GA",
  // Conference runs Sat June 6 – Sun June 7, 2026. Sessions 10am–5pm ET.
  startISO: "2026-06-06T10:00:00-04:00",
  endISO: "2026-06-07T17:00:00-04:00",
  hashtag: "#BuiltWithAILive",

  venue: {
    name: "The Whitley",
    full: "The Whitley, A Luxury Collection Hotel, Atlanta Buckhead",
    address: "3434 Peachtree Road NE",
    cityzip: "Atlanta, GA 30326",
    blurb: "We're meeting at The Whitley, a luxury hotel in the heart of Buckhead — one of Atlanta's best-known business and shopping districts, with dining, nightlife, Lenox Square, and Phipps Plaza just steps away.",
    bookUrl: "https://book.passkey.com/gt/221332731?gtid=b5e39654c4361d0029196f6550cbc475",
    rateNote: "Book inside our room block for the discounted attendee rate.",
    mapsQuery: "The Whitley, A Luxury Collection Hotel, Atlanta Buckhead, 3434 Peachtree Road NE, Atlanta, GA 30326"
  },

  // ---- Speakers (pulled from appsbuiltwithailive.com) ----
  speakers: [
    {
      id: "justin",
      name: "Justin Burns",
      title: "Founder of AppsBuiltWithAI · TEDx Speaker",
      tag: "Host",
      bio: "One of the leading voices in the global AI and app-building movement. Known as the \u201cKing of Apps,\u201d Justin has helped over 5,000 entrepreneurs validate, build, and launch apps in 60 days or less \u2014 without writing a single line of code. A TEDx speaker, author, and futurist from Chicago's South Side, he built a multimillion-dollar tech empire by mastering AI app development.",
      photo: "assets/speakers/justin.jpg",
      photoStyle: { transform: "scale(1.18)", transformOrigin: "50% 34%" },
      initials: "JB"
    },
    {
      id: "jullien",
      name: "Jullien Gordon",
      title: "5-Time TED Speaker · Featured on MSNBC & Inc",
      tag: "Keynote",
      bio: "He has helped over 800 people acquire $300M+ in assets. His mission: to make the \u201cRighteous Rich\u201d by helping 100,000 people achieve a $1M net worth.",
      photo: "assets/speakers/jullien.jpg",
      initials: "JG"
    },
    {
      id: "linda",
      name: "Linda Clemons",
      title: "Global Speaker · USA Today National Best Seller",
      tag: "Keynote",
      bio: "A globally recognized expert in sales and nonverbal communication, Linda has helped thousands master the unspoken side of selling \u2014 body language, presence, and the human connection that turns a good pitch into a yes.",
      photo: "assets/speakers/linda.jpg",
      initials: "LC"
    },
    {
      id: "ace",
      name: "Ace Chapman",
      title: "Business Acquisition & Exit Strategist",
      tag: "Speaker",
      bio: "A veteran business buyer and private-equity dealmaker who has completed over 150 acquisitions, specializing in structuring companies so they're attractive, sellable assets from day one.",
      photo: "assets/speakers/ace.jpg",
      initials: "AC"
    },
    {
      id: "michael",
      name: "Michael Tucker",
      title: "Marketing Agency Founder",
      tag: "Speaker",
      bio: "Virtual-events strategist who grew his first online education business from a barter deal to $750K in under a year, then helped clients generate over $50M using AI-driven event and sales systems.",
      photo: "assets/speakers/mike.jpg",
      initials: "MT"
    },
    {
      id: "coachk",
      name: "Coach K",
      title: "Grant Funding & Capital Strategist",
      tag: "Speaker",
      bio: "Business growth strategist who helps everyday founders secure six-figure capital using simple, repeatable systems instead of complicated applications.",
      photo: "assets/speakers/coachk.jpg",
      initials: "CK"
    },
    {
      id: "jason",
      name: "Jason Long",
      title: "Software Entrepreneur",
      tag: "Speaker",
      bio: "A serial entrepreneur and software operator who turned around a struggling tech company and led it to a multi-million-dollar exit.",
      photo: "assets/speakers/jason.jpg",
      initials: "JL"
    }
  ],

  // ---- Schedule (placeholder agenda — Justin will replace later) ----
  // Times are Eastern. day 1 = Sat Jun 6, day 2 = Sun Jun 7.
  days: [
    {
      id: "d1",
      label: "Day 1",
      weekday: "Saturday",
      date: "June 6, 2026",
      theme: "See the shift. Shape your idea.",
      sessions: [
        { start: "09:30", end: "10:00", title: "Doors Open & Networking", kind: "break", room: "Grand Foyer", speakers: [] },
        { start: "10:00", end: "10:10", title: "Welcome & Live Performance — Nella", kind: "stage", room: "Main Stage", speakers: [], desc: "Your emcee Nella opens the day and sets the energy." },
        { start: "10:10", end: "10:15", title: "Live Opening Performance", kind: "stage", room: "Main Stage", speakers: [], desc: "A live performance to kick the room off." },
        { start: "10:15", end: "10:20", title: "Justin Burns — Intro Video", kind: "stage", room: "Main Stage", speakers: [] },
        { start: "10:20", end: "11:20", title: "Justin Burns — The Future Is Now", kind: "keynote", room: "Main Stage", speakers: ["justin"], desc: "Segment 1. Where the AI shift is headed — and exactly where you fit in it." },
        { start: "11:25", end: "12:00", title: "Jason Long — Communication", kind: "talk", room: "Main Stage", speakers: ["jason"], desc: "Segment 2. Communicating your idea so AI — and people — build it with you." },
        { start: "12:05", end: "12:50", title: "Michael Tucker — 7-Figure Summits", kind: "talk", room: "Main Stage", speakers: ["michael"], desc: "Segment 3. The virtual-event and sales systems behind seven-figure launches." },
        { start: "12:50", end: "14:30", title: "Lunch & Networking", kind: "break", room: "Skyline Terrace", speakers: [] },
        { start: "14:35", end: "15:10", title: "Interview: Melody — Young Innovation Award", kind: "stage", room: "Main Stage", speakers: [], desc: "A conversation with Melody, plus her feature video." },
        { start: "15:15", end: "15:50", title: "Ace Chapman — New Fund Announcement", kind: "talk", room: "Main Stage", speakers: ["ace"], desc: "Segment 5. Building sellable assets — plus a brand-new fund announcement." },
        { start: "15:55", end: "16:20", title: "Coaching Panel", kind: "panel", room: "Main Stage", speakers: [], desc: "Segment 6. A live coaching panel with the room." },
        { start: "16:20", end: "17:15", title: "Justin Burns — Bootstrapping to 30,000 Customers", kind: "keynote", room: "Main Stage", speakers: ["justin"], desc: "Segment 7. Two builders share what they've created, plus the playbook for bootstrapping your way to 30,000 customers." },
        { start: "17:15", end: "17:30", title: "Closing — Nella", kind: "stage", room: "Main Stage", speakers: [], desc: "Nella closes out Day 1." }
      ]
    },
    {
      id: "d2",
      label: "Day 2",
      weekday: "Sunday",
      date: "June 7, 2026",
      theme: "Build it. Launch it. Walk out with an asset.",
      sessions: [
        { start: "09:30", end: "10:00", title: "Doors Open & Networking", kind: "break", room: "Grand Foyer", speakers: [] },
        { start: "10:00", end: "10:10", title: "Welcome — Nella", kind: "stage", room: "Main Stage", speakers: [], desc: "Nella kicks off Day 2." },
        { start: "10:10", end: "10:15", title: "Justin Burns — Intro Video", kind: "stage", room: "Main Stage", speakers: [] },
        { start: "10:15", end: "11:15", title: "Justin Burns — Identity Shifting", kind: "keynote", room: "Main Stage", speakers: ["justin"], desc: "Segment 1. Becoming the version of you who builds, ships, and leads." },
        { start: "11:25", end: "12:00", title: "Linda Clemons — Segment 2", kind: "talk", room: "Main Stage", speakers: ["linda"], desc: "The unspoken side of selling — body language, presence, and the human connection that turns a maybe into a yes." },
        { start: "12:05", end: "13:00", title: "Founder Showcase", kind: "stage", room: "Main Stage", speakers: [], desc: "Segment 3. Builders take the stage to share what they've created." },
        { start: "13:00", end: "14:00", title: "Lunch & Networking", kind: "break", room: "Skyline Terrace", speakers: [] },
        { start: "14:15", end: "14:50", title: "Jullien Gordon", kind: "talk", room: "Main Stage", speakers: ["jullien"], desc: "Turning your build into real net worth — lessons from acquiring $300M+ in assets." },
        { start: "14:50", end: "15:30", title: "Coach K", kind: "talk", room: "Main Stage", speakers: ["coachk"], desc: "Securing six-figure capital with simple, repeatable systems instead of complicated applications." },
        { start: "15:30", end: "16:00", title: "Student Awards", kind: "stage", room: "Main Stage", speakers: ["justin"], desc: "Justin celebrates student wins and milestones." },
        { start: "16:00", end: "17:00", title: "Justin Burns — Multiple Streams of Software", kind: "keynote", room: "Main Stage", speakers: ["justin"], desc: "Segment 5. Building multiple software income streams that compound." }
      ]
    }
  ],

  // ---- Resources (links Justin references on stage) ----
  resources: [
    { title: "Apps Built With AI Resource Vault", desc: "Templates, prompts, and recordings included with your ticket.", url: "https://appsbuiltwithai.com", cat: "Included" },
    { title: "Conference Website", desc: "Event details, venue, and speaker line-up.", url: "https://appsbuiltwithailive.com", cat: "Event" },
    { title: "Book The Hotel \u2014 The Whitley", desc: "Reserve inside our room block for the attendee rate.", url: "https://book.passkey.com/gt/221332731?gtid=b5e39654c4361d0029196f6550cbc475", cat: "Travel" },
    { title: "Support & Contact", desc: "Questions about your ticket or the event.", url: "https://support.appsbuiltwithai.com", cat: "Help" }
  ],

  // ---- Sample attendee directory (for the Connect / networking demo) ----
  attendees: [
    { name: "Jennifer K.", loc: "Portland, OR", building: "A productivity app for freelancers", role: "Coach", initials: "JK", email: "jen@flowstack.app", website: "flowstack.app", phone: "" },
    { name: "Marcus T.", loc: "Los Angeles, CA", building: "An on-demand booking app for creators", role: "Founder", initials: "MT", email: "marcus@bookcreators.io", website: "bookcreators.io", phone: "+1 (213) 555-0142" },
    { name: "Stephanie M.", loc: "Denver, CO", building: "A wellness membership platform", role: "Consultant", initials: "SM", email: "steph@wellnest.co", website: "wellnest.co", phone: "" },
    { name: "David & Michelle R.", loc: "Austin, TX", building: "Three niche tools for local services", role: "Founders", initials: "DR", email: "team@localkit.app", website: "localkit.app", phone: "+1 (512) 555-0188" },
    { name: "Tyrone J.", loc: "Chicago, IL", building: "A scheduling app for small clinics", role: "Builder", initials: "TJ", email: "tyrone@clinicflow.io", website: "", phone: "+1 (312) 555-0119" },
    { name: "Aisha B.", loc: "Atlanta, GA", building: "A community app for her church group", role: "Organizer", initials: "AB", email: "aisha@gatherapp.org", website: "gatherapp.org", phone: "" }
  ]
};
