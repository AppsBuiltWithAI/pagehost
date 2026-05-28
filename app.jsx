/* global React, ReactDOM, PoofPart1, PoofPart2, PoofPart3, PoofAgents */
const { Nav, Hero, Logos, Features } = PoofPart1;
const { Templates, Trust, BigPhoto, Stats } = PoofPart2;
const { Pricing, FAQ, FinalCTA, Footer } = PoofPart3;
const { Agents } = PoofAgents;

function App() {
  return (
    <>
      <Nav/>
      <Hero/>
      <Logos/>
      <Agents/>
      <Features/>
      <Templates/>
      <BigPhoto/>
      <Stats/>
      <Trust/>
      <Pricing/>
      <FAQ/>
      <FinalCTA/>
      <Footer/>
      {window.PoofTweaks ? <window.PoofTweaks/> : null}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);
