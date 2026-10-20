import React from 'react';
import { Reveal, ArrowRight, Check, PromptBox } from './part1.jsx';
const UC_CASES = [
  { id: "local", icon: "🥐", tone: "coral", who: "Local businesses", t: "Take orders while you sleep", d: "Pickup ordering, table bookings, loyalty punch cards: a bakery, salon, or repair shop runs on one app you describe in a sentence.", apps: ["Pickup ordering", "Booking calendar", "Loyalty cards"], quote: "We take 40% of orders through our app now.", by: "Mei · bakery owner" },
  { id: "studios", icon: "🧘", tone: "mint", who: "Studios & coaches", t: "Fill every class slot", d: "Class schedules, memberships, waivers, and reminder texts: everything a fitness studio or coach needs to stop juggling DMs.", apps: ["Class booking", "Memberships", "SMS reminders"], quote: "Waitlists fill themselves. I just teach.", by: "Jordan · pilates studio" },
  { id: "consult", icon: "💼", tone: "plum", who: "Consultants & agencies", t: "Look bigger than you are", d: "Client intake, proposals, project portals, and invoices: a one-person shop that feels like a firm of ten.", apps: ["Client intake", "Project portal", "Invoicing"], quote: "Clients think I hired a dev team.", by: "Priya · consultant" },
  { id: "commerce", icon: "🛍️", tone: "sun", who: "Sellers & makers", t: "Sell without the platform tax", d: "Product pages, checkout with Stripe, order tracking, and refund flows: your own store, not a marketplace stall.", apps: ["Storefront", "Stripe checkout", "Order tracking"], quote: "Moved off Etsy. Kept the margin.", by: "Sam · ceramicist" },
  { id: "saas", icon: "🗂️", tone: "sky", who: "Founders & indie hackers", t: "Launch a product people pay for", d: "Sign-ups, subscriptions, dashboards and onboarding: a real SaaS you can charge for from day one.", apps: ["Sign-ups", "Subscriptions", "Dashboards"] },
  { id: "community", icon: "🎪", tone: "rose", who: "Creators & communities", t: "Own your audience", d: "Event pages, member directories, paid newsletters, and RSVPs: a home for your people that isn't rented from an algorithm.", apps: ["Events + RSVP", "Member directory", "Paid newsletter"], quote: "Our meetup outgrew the Facebook group.", by: "Leo · community organizer" },
];

const UC_IMG = {"consult":"/site/site-images/v2/use-cases/usecase-consultants.webp","community":"/site/site-images/v2/use-cases/usecase-creators.webp","saas":"/site/site-images/v2/use-cases/usecase-founders.webp","local":"/site/site-images/v2/use-cases/usecase-local.webp","commerce":"/site/site-images/v2/use-cases/usecase-sellers.webp","studios":"/site/site-images/v2/use-cases/usecase-studios.webp"};

function UseCasesPage() {
  return (
    <main data-screen-label="use-cases">
      <section className="uc2-hero" data-screen-label="use-cases-hero">
        <div className="wrap">
          <Reveal className="uc2-hero-in">
            <div className="eyebrow">Use cases</div>
            <h1 className="serif">What will you <em>build?</em></h1>
            <p className="sub-lead">Thousands of people who never wrote a line of code run their business on an app they described in plain English. Find yourself below.</p>
          </Reveal>
          <Reveal delay={100}>
            <nav className="uc2-jump" aria-label="Jump to a use case">
              {UC_CASES.map((c) => (
                <a key={c.id} href={"#uc-" + c.id} className={"uc2-jump-chip tone-" + c.tone}>
                  {UC_IMG[c.id] && <img src={UC_IMG[c.id].replace(".webp", "-thumb.webp")} alt="" width="34" height="34"/>}<span>{c.who}</span>
                </a>
              ))}
            </nav>
          </Reveal>
        </div>
      </section>

      <section className="pad uc2-list" data-screen-label="use-cases-grid">
        <div className="wrap">
          {UC_CASES.map((c, i) => (
            <Reveal key={c.id}>
              <article id={"uc-" + c.id} className={"uc2-row tone-" + c.tone + (i % 2 ? " flip" : "")}>
                <div className="uc2-media">
                  {UC_IMG[c.id] && <img src={UC_IMG[c.id]} alt="" width="1400" height="788" loading="lazy"/>}
                  {c.quote && (
                    <blockquote className="uc2-quote">
                      <p>"{c.quote}"</p>
                      <cite>{c.by}</cite>
                    </blockquote>
                  )}
                </div>
                <div className="uc2-copy">
                  <span className="uc2-n">{String(i + 1).padStart(2, "0")}</span>
                  <span className="uc2-who">{c.who}</span>
                  <h2>{c.t}</h2>
                  <p>{c.d}</p>
                  {c.apps && (
                    <div className="uc2-apps">
                      <span className="uc2-apps-k">What you'd build</span>
                      <ul>{c.apps.map((x) => <li key={x}><Check/>{x}</li>)}</ul>
                    </div>
                  )}
                  <a className="btn btn-coral uc2-cta" href="/signup">Build this free <ArrowRight/></a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="pad uc2-final-sec" data-screen-label="use-cases-cta">
        <div className="wrap">
          <Reveal>
            <div className="uc2-final">
              <div>
                <div className="eyebrow">Something else?</div>
                <h2 className="serif">Don't see your thing? <em>Describe it.</em></h2>
                <p>If you can describe it, you can build it. Start with a sentence: the first app is free.</p>
              </div>
              <div className="uc2-final-box"><PromptBox/></div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}


export default UseCasesPage;
