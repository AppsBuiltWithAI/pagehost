import React from 'react';
import { Logos, Features, StatBand } from './part1.jsx';
import { FAQ, Footer } from './part3.jsx';
import { Agents } from './part-agents.jsx';
import { Alive } from './part-alive.jsx';
import { Enhance } from './part-enhance.jsx';
import { WaitHero, WaitCTA } from './waitlist-flow.jsx';

// Original components remain unchanged. The static site supplies navigation,
// current pricing, and the real app destination instead of a local signup flow.
export function Home({ Pricing }) {
  const start = () => window.location.assign(window.ABWAI.appUrl);
  return (
    <>
      <main className="homepage">
        <div className="abw-site">
          <WaitHero onStart={start}/>
          <Logos label="Being built right now by" names={["Bakers", "Authors", "Coaches", "Photographers", "Florists", "Studios", "Therapists", "Tutors", "Yoga teachers", "Shop owners", "Consultants", "Nonprofits"]}/>
          <StatBand onStart={start}/>
          <Agents onStart={start}/>
          <Alive onStart={start}/>
          <Features onStart={start}/>
        </div>
        <Pricing/>
        <div className="abw-site">
          <FAQ/>
          <WaitCTA onStart={start}/>
        </div>
      </main>
      <div className="abw-site"><Footer/></div>
      <Enhance/>
    </>
  );
}
