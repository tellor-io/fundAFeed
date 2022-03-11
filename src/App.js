import React, { useContext } from 'react'
//Components
import Nav from './components/frontendBoilerplate/Nav'
import Footer from './components/frontendBoilerplate/Footer'
import Hero from './components/Hero'
//Styles
import './App.css'
//Contexts
import { UserContext } from './contexts/User'

function App() {
  const user = useContext(UserContext)
  console.log(user)
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
