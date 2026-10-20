import React from 'react';
import { ABWA_CHAPTERS, avatarTint } from './chapters-data.js';
import { Reveal, ArrowRight } from './part1.jsx';
function ChapterPage() {
  const id = new URLSearchParams(location.search).get("c") || "san-francisco";
  const ch = ABWA_CHAPTERS.get(id) || ABWA_CHAPTERS.CHAPTERS[0];
  const others = ABWA_CHAPTERS.CHAPTERS.filter((c) => c.id !== ch.id).slice(0, 3);
  return (
    <>
      <section className="sub-hero">
        <div className="wrap-tight">
          <Reveal>
            <div className="course-crumb"><a href="/community#chapters">Chapters</a><span>→</span><span>{ch.city}</span></div>
            <div className="chp-head">
              <span className="chp-av" style={{ background: avatarTint(ch.tint) }}>{ch.initials}</span>
              <div>
                <h1 className="serif">{ch.city} <em>chapter.</em></h1>
                <p className="sub-lead">{ch.about}</p>
              </div>
            </div>
            <div className="chp-meta">
              <span><b>{ch.members.toLocaleString()}</b> members</span>
              <span>Led by <b>{ch.lead}</b></span>
              <span>{ch.cadence}</span>
              <span>Since {ch.since}</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pad pt-0">
        <div className="wrap chp-layout">
          <Reveal>
            <div className="chp-events">
              <h2 className="serif">Upcoming <em>meetups.</em></h2>
              {ch.next.map((e, i) => (
                <div key={i} className="chp-event">
                  <div className="chp-event-when">{e.when}</div>
                  <div className="chp-event-what">{e.what}</div>
                  <div className="chp-event-where">{ch.venue}</div>
                  <a className="btn btn-coral btn-sm" href="/events">RSVP →</a>
                </div>
              ))}
              <div className="chp-note">Meetups are free. First time? Say hi to {ch.lead.split(" ")[0]}: newcomers get introduced in the first 10 minutes.</div>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="chp-side">
              <div className="chp-join">
                <h3>Join the {ch.city} chapter</h3>
                <p>Get meetup invites and the chapter channel. Free, always.</p>
                <a className="btn btn-coral" href="/signup?intent=chapter" style={{ width: "100%", justifyContent: "center" }}>Join chapter <ArrowRight/></a>
              </div>
              <div className="chp-others">
                <h4>Nearby &amp; notable</h4>
                {others.map((o) => (
                  <a key={o.id} className="chp-other" href={"/chapter?c=" + o.id}>
                    <span className="chp-other-av" style={{ background: avatarTint(o.tint) }}>{o.initials}</span>
                    <span className="chp-other-city">{o.city}</span>
                    <span className="chp-other-n">{o.members.toLocaleString()}</span>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}


export default ChapterPage;
