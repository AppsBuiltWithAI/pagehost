/* global React */
const { useState, useEffect, useRef } = React;

/* ============= HERO BUILDER DEMO — describe → watch it build ============= */
const HD_PROMPT = "A course site where I upload video lessons and students track their progress";
const HD_STEPS = [
  "Landing page with hero + course grid",
  "Video lessons & progress tracking",
  "Student dashboard with certificates",
  "Checkout and one-click sign-in",
];
/* ticks of 100ms: 0–26 typing · 28 send · 32/38/44/50 steps · 36 nav · 44 headline · 52 sub · 58 buttons · 64 avatars · 72 live · 116 reset */
function HeroBuilderDemo() {
  const [tick, setTick] = useState(0);
  const [seen, setSeen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setSeen(true); }, { threshold: 0.25 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!seen) return;
    const id = setInterval(() => setTick(t => (t >= 116 ? 0 : t + 1)), 100);
    return () => clearInterval(id);
  }, [seen]);

  const typed = HD_PROMPT.slice(0, Math.max(0, Math.min(HD_PROMPT.length, (tick - 1) * 3)));
  const sent = tick >= 28;
  const on = (t) => (tick >= t ? " on" : "");

  return (
    <div className="hd-window" ref={ref} aria-hidden="true">
      <div className="hd-titlebar">
        <span className="hd-dots"><i></i><i></i><i></i></span>
        <span className="hd-title">AppsBuiltWithAI — new app</span>
        <span className={"hd-pub" + on(72)}>⚡ Published</span>
      </div>
      <div className="hd-cols">
        <div className="hd-chat">
          <div className={"hd-msg hd-user" + (sent ? " on" : " typing")}>
            {sent ? HD_PROMPT : <>{typed}<span className="hd-caret"></span></>}
          </div>
          <div className={"hd-msg hd-ai" + on(31)}>On it — building your app:</div>
          <div className="hd-steps">
            {HD_STEPS.map((s, i) => (
              <div key={s} className={"hd-step" + on(34 + i * 7)}>
                <span className={"hd-check" + on(38 + i * 7)}>✓</span>{s}
              </div>
            ))}
          </div>
          <div className={"hd-msg hd-ai" + on(68)}>Done! It's live at <b>courseloop.app</b> — tell me what to change.</div>
        </div>
        <div className="hd-preview">
          <div className={"hd-nav" + on(36)}>
            <span className="hd-logo">⚡ CourseLoop</span>
            <span className="hd-nav-links"><i></i><i></i></span>
            <span className="hd-nav-btn">Sign up</span>
          </div>
          <div className="hd-stage">
            <span className={"hd-pill" + on(42)}>🎉 New lessons every week</span>
            <div className="hd-h">
              <span className={"hd-w" + on(44)}>Learn</span>{" "}
              <span className={"hd-w" + on(46)}>skills</span>{" "}
              <span className={"hd-w" + on(48)}>that</span>{" "}
              <span className={"hd-w hd-w-grad" + on(50)}>stick.</span>
            </div>
            <div className={"hd-sub-ln" + on(52)}></div>
            <div className={"hd-sub-ln s" + on(54)}></div>
            <div className="hd-ctas">
              <span className={"hd-cta a" + on(58)}>Explore courses →</span>
              <span className={"hd-cta b" + on(61)}>▶ Free preview</span>
            </div>
            <div className={"hd-social" + on(64)}>
              <span className="hd-faces">
                <i style={{ background: "linear-gradient(135deg,#FF7A4D,#FFC53D)" }}></i>
                <i style={{ background: "linear-gradient(135deg,#7A3FB0,#A23C9C)" }}></i>
                <i style={{ background: "linear-gradient(135deg,#1FB295,#6FA8E0)" }}></i>
              </span>
              <b>1,200+</b>&nbsp;students enrolled
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { HeroBuilderDemo });
