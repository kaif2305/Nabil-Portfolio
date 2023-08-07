import React, { useState } from 'react';

import Nav from './Components/nav'
import LeftInfo from './Components/left_info'
import About from './Components/about'
import Know_me from './Components/knowme'
import Footer from './Components/footer'

function App() {

  return (
    <>
      <Nav />
      <LeftInfo />
      <About />
      <Know_me />
      <Footer />
    </>
  );
}

export default App;
