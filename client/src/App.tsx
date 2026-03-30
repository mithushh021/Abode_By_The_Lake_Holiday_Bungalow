import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Facilities from './components/Facilities'
import Gallery from './components/Gallery'
import Pricing from './components/Pricing'
import Location from './components/Location'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './styles/global.css'

const App: React.FC = () => {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <About />
      <Facilities />
      <Gallery />
      <Pricing />
      <Location />
      <Contact />
      <Footer />
    </div>
  )
}

export default App