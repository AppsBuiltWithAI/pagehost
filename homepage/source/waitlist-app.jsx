import React from 'react';
import { Nav, Logos, Features, StatBand } from './part1.jsx';
import { FAQ, Footer } from './part3.jsx';
import { Agents } from './part-agents.jsx';
import { Enhance } from './part-enhance.jsx';
import { Alive } from './part-alive.jsx';
import { WaitHero, WaitCTA, SignupFlow } from './waitlist-flow.jsx';
function WaitlistSite() {
  const [idea, setIdea] = React.useState(null);
  const start = (t) => { setIdea(typeof t === "string" && t.trim() ? t.trim() : ""); window.scrollTo(0, 0); };
  const navCta = () => {
    const box = document.querySelector(".prompt-card textarea");
    if (box) { window.scrollTo({ top: 0, behavior: "smooth" }); setTimeout(() => box.focus(), 420); }
  };
  return (
    <>
      <Nav/>
      <WaitHero onStart={start}/>
      <Logos label="Being built right now by" names={["Bakers", "Authors", "Coaches", "Photographers", "Florists", "Studios", "Therapists", "Tutors", "Yoga teachers", "Shop owners", "Consultants", "Nonprofits"]}/>
      <StatBand onStart={start}/>
      <Agents onStart={start}/>
      <Alive onStart={start}/>
      <Features onStart={start}/>
      <FAQ/>
      <WaitCTA onStart={start}/>
      <Footer/>
      <Enhance/>
      {idea !== null && <SignupFlow idea={idea} onClose={() => setIdea(null)}/>}
    </>
  );
}
export default WaitlistSite;

