import { Nav, Hero, Logos, Features, StatBand } from './part1.jsx';
import { Trust, QuoteBand, BigPhoto } from './part2.jsx';
import { Pricing, FAQ, FinalCTA, Footer } from './part3.jsx';
import { Agents } from './part-agents.jsx';
import { Showcase } from './part-showcase.jsx';
import { Enhance } from './part-enhance.jsx';
import { Alive } from './part-alive.jsx';

export default function SiteHomePage() {
  return (
    <>
      <Nav/>
      <Hero/>
      <Logos/>
      <StatBand/>
      <Showcase/>
      <Agents/>
      <Alive/>
      <Features/>
      <BigPhoto/>
      <Trust/>
      <Pricing/>
      <FAQ/>
      <FinalCTA/>
      <Footer/>
      <Enhance/>
    </>
  );
}

