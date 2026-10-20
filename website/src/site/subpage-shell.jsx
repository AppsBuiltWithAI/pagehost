import React from 'react';
import { Nav } from './part1.jsx';
import { Footer } from './part3.jsx';
function Subpage({ children }) {
  return (
    <React.Fragment>
      <Nav/>
      {children}
      <Footer/>
    </React.Fragment>
  );
}


export default Subpage;
