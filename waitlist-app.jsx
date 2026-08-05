/* global React, ReactDOM, PoofPart1, PoofPart3, PoofAgents, PoofEnhance, PoofWait, PoofAlive */
const { Nav, Logos, Features, StatBand } = PoofPart1;
const { FAQ, Footer } = PoofPart3;
const { Agents } = PoofAgents;
const { Enhance } = PoofEnhance;
const { Alive } = window.PoofAlive;
const { WaitHero, WaitCTA, SignupFlow } = PoofWait;

/* ============= EXIT-INTENT POPUP (preserved from old page) ============= */

function ExitPopup() {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [done, setDone] = React.useState(false);
  const shown = React.useRef(false);

  React.useEffect(() => {
    const fire = () => {
      if (shown.current) return;
      shown.current = true;
      setOpen(true);
    };
    const onMouseOut = (e) => {
      if (!e.relatedTarget && !e.toElement) fire();
    };
    document.addEventListener("mouseout", onMouseOut);
    let lastY = 0;
    const onMouseMove = (e) => {
      if (lastY - e.clientY > 40 && e.clientY < 10) fire();
      lastY = e.clientY;
    };
    document.addEventListener("mousemove", onMouseMove);
    const t = setTimeout(fire, 30000);
    return () => {
      clearTimeout(t);
      document.removeEventListener("mouseout", onMouseOut);
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  if (!open) return null;
  const valid = /\S+@\S+\.\S+/.test(email);

  const submit = (e) => {
    e.preventDefault();
    if (!valid) return;
    const em = email.trim().toLowerCase();
    const position = 1200 + Math.floor(Math.random() * 7800);
    const refLink = "appsbuiltwithai.com/join/" + (em.split("@")[0].replace(/[^a-z0-9]/g, "") || "you");
    const cio = (fn, ...args) => {
      if (typeof window !== "undefined" && window._cio && typeof window._cio[fn] === "function") {
        window._cio[fn](...args);
      }
    };
    try {
      cio("identify", {
        id: em,
        email: em,
        created_at: Math.floor(Date.now() / 1000),
        source: "exit_intent",
        credit_bonus: 100,
        waitlist_position: position,
        referral_link: refLink,
      });
      cio("track", "joined_waitlist", {
        email: em,
        position: position,
        source: "exit_intent",
      });
    } catch (err) {}
    setDone(true);
  };

  return (
    <div className="wllp-exit-scrim" onClick={() => setOpen(false)}>
      <div className="wllp-exit" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Claim 100 free credits">
        <button className="wllp-exit-x" onClick={() => setOpen(false)} aria-label="Close">&times;</button>

        <aside className="wllp-exit-art" aria-hidden="true">
          <div className="wllp-exit-orb wllp-exit-orb-a"></div>
          <div className="wllp-exit-orb wllp-exit-orb-b"></div>
          <div className="wllp-exit-coin">
            <span className="wllp-exit-coin-num">100</span>
            <span className="wllp-exit-coin-lbl">CREDITS</span>
          </div>
          <div className="wllp-exit-chip wllp-exit-chip-1">&asymp; 1 full app</div>
          <div className="wllp-exit-chip wllp-exit-chip-2">&#10022; Launch day</div>
          <div className="wllp-exit-chip wllp-exit-chip-3">$0 to start</div>
        </aside>

        <div className="wllp-exit-body">
          {done ? (
            <div className="wllp-exit-done">
              <div className="wllp-exit-check">&#10003;</div>
              <h3>Credits locked in.</h3>
              <p>Your invite will land with <strong>100 credits</strong> already in the account — about one full app, on us.</p>
              <button className="btn btn-coral btn-lg" onClick={() => setOpen(false)}>Back to the page</button>
            </div>
          ) : (
            <React.Fragment>
              <div className="wllp-exit-badge">&#9889; Launch-day gift</div>
              <h3>Before you go —<br/><em>100 credits</em> are yours.</h3>
              <p>Join the waitlist now and we'll drop them in the day we launch. Enough to build and publish a whole app, free.</p>
              <form className="wllp-exit-form" onSubmit={submit}>
                <input type="email" placeholder="you@work.com" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus/>
                <button className="btn btn-coral" type="submit" disabled={!valid}>Claim my 100 credits</button>
              </form>
              <div className="wllp-exit-fine">
                <span>&#10003; No card</span><span>&#10003; No spam</span><span>&#10003; One email when your seat opens</span>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============= PAGE ============= */

function WaitlistSite() {
  const [idea, setIdea] = React.useState(null);
  const start = (t) => { setIdea(typeof t === "string" && t.trim() ? t.trim() : ""); window.scrollTo(0, 0); };
  return (
    <>
      <Nav hidePricing hideSignIn hideCta bare/>
      <WaitHero onStart={start}/>
      <Logos label="Being built right now by" names={["Bakers", "Authors", "Coaches", "Photographers", "Florists", "Studios", "Therapists", "Tutors", "Yoga teachers", "Shop owners", "Consultants", "Nonprofits"]}/>
      <StatBand onStart={start}/>
      <Agents onStart={start}/>
      <Alive onStart={start}/>
      <Features onStart={start}/>
      <FAQ/>
      <WaitCTA onStart={start}/>
      <Footer lean onStart={start}/>
      <Enhance/>
      {idea !== null && <SignupFlow idea={idea} onClose={() => setIdea(null)}/>}
      <ExitPopup/>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<WaitlistSite/>);
