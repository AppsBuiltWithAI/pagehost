/* global React, ReactDOM, PoofPart1, PoofPart3 */
const { Nav } = window.PoofPart1;
const { Footer } = window.PoofPart3;

function Subpage({ children }) {
  return (
    <React.Fragment>
      <Nav/>
      {children}
      <Footer/>
    </React.Fragment>
  );
}

window.Subpage = Subpage;
window.mountSubpage = function (PageComponent) {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <Subpage>
      <PageComponent/>
    </Subpage>
  );
};
