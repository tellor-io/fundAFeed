import React, { useEffect } from 'react'
//Components
import Nav from './components/frontendBoilerplate/Nav'
import Footer from './components/frontendBoilerplate/Footer'
import Hero from './components/Hero'
//Styles
import './App.css'

function App() {
  useEffect(() => {
    if (window.location.pathname !== '/') {
      window.location.assign('/')
    }
  }, [])

  return (
    <div className="App">
      <Nav />
      <div className="HeroContainer">
        <Hero />
      </div>
      <Footer />
    </div>
  )
}

export default App
