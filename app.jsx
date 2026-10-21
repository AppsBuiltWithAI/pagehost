/* global React, ReactDOM, PoofPart1, PoofPart3 */
const { Nav } = PoofPart1;
const { Pricing } = PoofPart3;

function App() {
  return (
    <>
      <Nav/>
      <window.HomepageOriginal.Home Pricing={Pricing}/>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);
