import React from 'react'
import Hero from './sections/hero'
import Showcasesec from './sections/Showcasesec'
import Navbar from "./components/Navbar"; 

import Logosection from './components/logosection'
import Featurecards from './sections/Featurecards'
import Experiencesection from './sections/Experiencesection'
import Contact from './sections/contact'
import Footer from './sections/footer'

const App = () => {
  return (
    <>
    <Navbar/>
      <Hero />
      <Showcasesec />
      <Logosection/>
      <Featurecards/>
      <Experiencesection/>
      <Contact/>
      <Footer/>
    </>
  )
}

export default App
