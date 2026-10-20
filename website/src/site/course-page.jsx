import React, { useState as useCrState } from 'react';
import { ABWA_TRAINING } from './training-data.js';
import { Reveal, ArrowRight } from './part1.jsx';
const CR_IMG = (id) => ["foundations", "prompting", "design", "connectors", "landing", "clientwork"].includes(id) ? "/site/site-images/v2/education/course-" + id + ".jpg" : null;
const CR_LOCK = <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>;
const CR_PLAY = <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>;

function CoursePage() {
  const id = new URLSearchParams(location.search).get("c") || "foundations";
  const course = ABWA_TRAINING.get(id) || ABWA_TRAINING.COURSES[0];
  const [cur, setCur] = useCrState(0);
  const total = course.lessons.length;
  const img = CR_IMG(course.id);
  const signup = "/signup?next=" + encodeURIComponent("/course?c=" + course.id);
  const others = ABWA_TRAINING.COURSES.filter((c) => c.id !== course.id).slice(0, 3);

  return (
    <>
      <section className="cr2-top">
        <div className="wrap">
          <div className="cr2-crumb"><a href="/education#training">Education</a><span>/</span><span>{course.title}</span></div>
          <div className="cr2-layout">
            <div className="cr2-main">
              <div className="cr2-player">
                {img && <img src={img} alt="" className="cr2-poster"/>}
                <div className="cr2-player-veil"></div>
                <div className="cr2-player-lock">
                  <span className="cr2-lock-ic">{CR_LOCK}</span>
                  <b>Create a free account to watch</b>
                  <span>Every video is free with an account. No card needed.</span>
                  <div className="cr2-lock-actions">
                    <a className="btn btn-coral" href={signup}>Create free account</a>
                    <a className="btn cr2-btn-light" href="/signin">Sign in</a>
                  </div>
                </div>
                <div className="cr2-player-bar" aria-hidden="true">
                  <span className="cr2-pb-play">{CR_PLAY}</span>
                  <span className="cr2-pb-track"><i></i></span>
                  <span className="cr2-pb-ep">Video {cur + 1} of {total}</span>
                </div>
              </div>
              <div className="cr2-now">
                <span className="cr2-now-k">{course.icon} {course.title} · Video {String(cur + 1).padStart(2, "0")}</span>
                <h1 className="serif">{course.lessons[cur]}</h1>
                <p>{course.desc}</p>
                <div className="cr2-now-nav">
                  <button className="btn btn-outline btn-sm" disabled={cur === 0} onClick={() => setCur(cur - 1)}>← Previous</button>
                  <button className="btn btn-outline btn-sm" disabled={cur === total - 1} onClick={() => setCur(cur + 1)}>Next →</button>
                </div>
              </div>
            </div>
            <aside className="cr2-side">
              <div className="cr2-side-head">
                <b>{course.title}</b>
                <span>{total} videos · Free with an account</span>
              </div>
              <ol className="cr2-list">
                {course.lessons.map((title, i) => (
                  <li key={i}>
                    <button className={"cr2-item" + (cur === i ? " on" : "")} onClick={() => setCur(i)}>
                      <span className="cr2-thumb">
                        {img && <img src={img} alt=""/>}
                        <span className="cr2-thumb-ic">{cur === i ? CR_PLAY : <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>}</span>
                      </span>
                      <span className="cr2-item-t"><small>{String(i + 1).padStart(2, "0")}</small>{title}</span>
                    </button>
                  </li>
                ))}
              </ol>
              <a className="btn btn-coral cr2-side-cta" href={signup}>Unlock all videos <ArrowRight/></a>
            </aside>
          </div>
        </div>
      </section>

      <section className="pad cr2-more">
        <div className="wrap">
          <div className="cr2-outcome"><span className="eyebrow">What you'll walk away with</span><p>{course.outcome}</p></div>
          <Reveal className="cr2-more-head"><h2 className="serif">Keep watching</h2><a href="/education#training">All courses →</a></Reveal>
          <div className="cr2-more-grid">
            {others.map((c) => (
              <a key={c.id} className="cr2-more-card" href={"/course?c=" + c.id}>
                <span className="cr2-more-img">{CR_IMG(c.id) && <img src={CR_IMG(c.id)} alt=""/>}<span className="cr2-more-play">{CR_PLAY}</span></span>
                <b>{c.title}</b>
                <span>{c.desc}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}


export default CoursePage;
