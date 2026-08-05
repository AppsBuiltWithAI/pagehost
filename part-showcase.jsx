/* global React, PoofPart1 */
const { useRef, useEffect } = React;
const { Reveal, ArrowRight } = PoofPart1;

/* ============================================================
   SHOWCASE — a moving wall of real apps built on the platform.
   Each card is a faithful little app screen; the rail scrolls
   infinitely and pauses on hover. People photos are drop-in
   <image-slot>s so the user can make them real.
   ============================================================ */

function Poster({ slotId, cat, title, rating, grad, initial }) {
  return (
    <div className="sc-poster sc-img-slot">
      <div className="sc-img-fallback" style={{ background: grad }}>{initial}</div>
      {slotId
        ? <image-slot id={slotId} shape="rect" radius="0" placeholder="Add photo"></image-slot>
        : null}
      <div className="scrim"></div>
      <span className="rate">★ {rating}</span>
      <span className="heart">♡</span>
      <div className="meta">
        <div className="cat">{cat}</div>
        <div className="ttl">{title}</div>
      </div>
    </div>
  );
}

function StreamCard() {
  return (
    <div className="sc-app sc-stream" data-tilt>
      <span className="sc-badge">Built with <b>AppsBuiltWithAI</b></span>
      <image-slot id="sc-shot-stream" className="sc-shot" shape="rect" radius="0" placeholder="Drop a screenshot"></image-slot>
      <div className="sc-pad">
        <div className="sc-stream-nav">
          <div className="av"></div>
          <span className="on">Home</span><span>Shows</span><span>Movies</span><span>My List</span>
        </div>
        <div className="sc-eyebrow">Continue watching</div>
        <h5>Picked for you tonight</h5>
        <div className="sc-posters">
          <Poster slotId="sc-face-1" cat="Drama" title="Before the Sunset" rating="4.9"
                  grad="linear-gradient(160deg,#F0A86E,#B5532E)" initial="" />
          <Poster cat="Crime" title="Cold Creek" rating="4.5"
                  grad="linear-gradient(160deg,#3A4A63,#161D29)" initial="" />
          <Poster slotId="sc-face-2" cat="Coming-of-age" title="Finding June" rating="4.8"
                  grad="linear-gradient(160deg,#C9617A,#5A2438)" initial="" />
          <Poster cat="Drama" title="Small Town" rating="4.2"
                  grad="linear-gradient(160deg,#E0A85C,#7A4A1E)" initial="" />
        </div>
      </div>
    </div>
  );
}

function FinanceCard({ k }) {
  const bars = [38, 52, 30, 64, 44, 78, 56, 88, 70, 96, 62, 80];
  return (
    <div className="sc-app sc-fin" key={k} data-tilt>
      <span className="sc-badge">Built with <b>AppsBuiltWithAI</b></span>
      <image-slot id={"sc-shot-fin" + (k || "")} className="sc-shot" shape="rect" radius="0" placeholder="Drop a screenshot"></image-slot>
      <div className="sc-pad">
        <h5>Dashboard</h5>
        <div className="sub">Track office expenses and manage budgets</div>
        <div className="sc-fin-tiles">
          <div className="sc-tile">
            <div className="lbl">This Month</div>
            <div className="big">1,329<small> $</small></div>
          </div>
          <div className="sc-tile dark">
            <div className="lbl">Avg. Monthly</div>
            <div className="big">$49.8<small>k</small></div>
            <div className="sc-bars">
              {bars.map((h, i) => <i key={i} className={i % 3 === 1 ? "hi" : ""} style={{ height: h + "%" }}></i>)}
            </div>
          </div>
        </div>
        <div className="sc-fin-bottom">
          <div className="sc-donut">
            <div className="lbl">Spending by Category</div>
            <div className="sc-donut-ring"></div>
          </div>
          <div className="sc-txn">
            <div className="lbl">Transactions</div>
            <div className="chip a"><span>Transportation</span><span>27%</span></div>
            <div className="chip b"><span>Facilities</span><span>41%</span></div>
            <div className="chip c"><span>Software</span><span>32%</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrekCard({ k }) {
  return (
    <div className="sc-app sc-trek" key={k} data-tilt>
      <span className="sc-badge">Built with <b>AppsBuiltWithAI</b></span>
      <div className="sc-trek-hero sc-img-slot">
        <div className="sc-img-fallback"></div>
        <image-slot id={"sc-trek-hero" + (k || "")} shape="rect" radius="0" placeholder="Drop a landscape photo"></image-slot>
        <div className="sc-trek-nav"><span>◆ TRAK</span><span>Home · Traks · Community</span></div>
        <div className="scrim"></div>
      </div>
      <div className="sc-trek-body">
        <div className="back">‹ Back to Explore</div>
        <h5>Mountain<br/>Harder Kulm</h5>
        <div className="sc-trek-chart">
          <div className="cap">:: Altitude</div>
          <svg viewBox="0 0 260 56" preserveAspectRatio="none" style={{ width: "100%", height: 46, display: "block" }}>
            <polyline points="0,40 30,34 60,38 90,22 120,28 150,12 180,20 210,8 240,18 260,14"
                      fill="none" stroke="#FFD3B0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="150" cy="12" r="3.5" fill="#fff"/>
          </svg>
        </div>
        <div className="sc-trek-stats">
          <div className="st"><div className="k">Elevation</div><div className="v">4,200 ft</div></div>
          <div className="st"><div className="k">Wind</div><div className="v">15 km/h</div></div>
          <div className="st"><div className="k">Duration</div><div className="v">2.5–3 hr</div></div>
        </div>
      </div>
    </div>
  );
}

function MealCard({ k }) {
  const cal = [40, 65, 50, 88, 60, 72, 45];
  return (
    <div className="sc-app sc-meal" key={k} data-tilt>
      <span className="sc-badge">Built with <b>AppsBuiltWithAI</b></span>
      <image-slot id={"sc-shot-meal" + (k || "")} className="sc-shot" shape="rect" radius="0" placeholder="Drop a screenshot"></image-slot>
      <div className="sc-pad">
        <div className="sc-meal-top">
          <h5>Good Morning,<br/>Dan</h5>
          <div className="btns"><span className="b1">+ Add Recipe</span><span className="b2">Plan Meals</span></div>
        </div>
        <div className="sc-meal-charts">
          <div className="c">
            <div className="k">Avg Calories</div>
            <div className="bars">{cal.map((h, i) => <i key={i} className={i === 3 ? "hi" : ""} style={{ height: h + "%" }}></i>)}</div>
          </div>
          <div className="c">
            <div className="k">Avg Water</div>
            <svg viewBox="0 0 120 48" preserveAspectRatio="none">
              <polyline points="0,40 20,36 40,30 60,32 80,20 100,16 120,10"
                        fill="none" stroke="#8FB52E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <div className="sc-meal-cards">
          <div className="mc">
            <div className="thumb sc-img-slot">
              <div className="sc-img-fallback" style={{ background: "linear-gradient(150deg,#F4C95B,#D98E2B)" }}></div>
              <image-slot id={"sc-meal-1" + (k || "")} shape="rect" radius="0" placeholder="Food photo"></image-slot>
            </div>
            <div className="mt"><div className="n">Grocery List</div><div className="d">12 items to buy</div></div>
          </div>
          <div className="mc">
            <div className="thumb sc-img-slot">
              <div className="sc-img-fallback" style={{ background: "linear-gradient(150deg,#E88A5A,#B5532E)" }}></div>
              <image-slot id={"sc-meal-2" + (k || "")} shape="rect" radius="0" placeholder="Food photo"></image-slot>
            </div>
            <div className="mt"><div className="n">This Week's Recipe</div><div className="d">Fettuccine, 30 min</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Mentor({ slotId, grad, name, role }) {
  return (
    <div className="m">
      <div className="face sc-img-slot">
        <div className="sc-img-fallback" style={{ background: grad, fontSize: 16 }}>{name[0]}</div>
        <image-slot id={slotId} shape="circle" radius="0" placeholder=""></image-slot>
      </div>
      <div>
        <div className="nm">{name}</div>
        <div className="rl">{role}</div>
      </div>
    </div>
  );
}

function LearnCard() {
  return (
    <div className="sc-app sc-learn" data-tilt>
      <span className="sc-badge">Built with <b>AppsBuiltWithAI</b></span>
      <image-slot id="sc-shot-learn" className="sc-shot" shape="rect" radius="0" placeholder="Drop a screenshot"></image-slot>
      <div className="sc-pad">
        <div className="sc-learn-nav"><span className="on">Home</span><span>Files</span><span>Favorites</span></div>
        <h5>Learning<br/>opportunities</h5>
        <div className="kick">Recently watched</div>
        <div className="sc-learn-watched">
          <div className="lw">
            <div className="thumb" style={{ background: "linear-gradient(135deg,#FF7A4D,#9C3597)" }}></div>
            <div className="lt"><div className="n">Creative Writing</div><div className="meta"><span>★ 4.9</span><span>2h 42m</span></div></div>
          </div>
          <div className="lw">
            <div className="thumb" style={{ background: "linear-gradient(135deg,#1FB295,#6FA8E0)" }}></div>
            <div className="lt"><div className="n">Home Studio</div><div className="meta"><span>★ 4.7</span><span>1h 18m</span></div></div>
          </div>
        </div>
        <div className="kick">Favorite mentors</div>
        <div className="sc-learn-mentors">
          <Mentor slotId="sc-mentor-1" grad="linear-gradient(135deg,#6FA8E0,#3A5A8A)" name="Ben Simon" role="Terrazzo Goodies" />
          <Mentor slotId="sc-mentor-2" grad="linear-gradient(135deg,#F08DB8,#9C3597)" name="Mara Liu" role="Studio Maven" />
        </div>
      </div>
    </div>
  );
}

function Showcase() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const GAP = 24;
    let raf, x = 0, paused = false;
    const enter = () => { paused = true; };
    const leave = () => { paused = false; };
    track.addEventListener("mouseenter", enter);
    track.addEventListener("mouseleave", leave);
    const step = () => {
      if (!paused) {
        x -= 0.45;
        const first = track.firstElementChild;
        if (first) {
          const w = first.offsetWidth + GAP;
          if (-x >= w) { x += w; track.appendChild(first); }
        }
        track.style.transform = "translateX(" + x + "px)";
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener("mouseenter", enter);
      track.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <section className="showcase" data-screen-label="showcase">
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="eyebrow">Made by non-coders</div>
          <h2>Real apps. <em>Shipped this week.</em></h2>
          <p>Dashboards, storefronts, trackers, whole products — built by people who'd never written a line of code. Hover to pause and look closer.</p>
        </Reveal>
      </div>
      <div className="showcase-rail">
        <div className="showcase-track" ref={trackRef}>
          <StreamCard/>
          <FinanceCard/>
          <TrekCard/>
          <MealCard/>
          <LearnCard/>
          <FinanceCard k="b"/>
          <TrekCard k="b"/>
          <MealCard k="b"/>
        </div>
      </div>
    </section>
  );
}

window.PoofShowcase = { Showcase };
