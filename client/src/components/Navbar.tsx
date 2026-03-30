import React, { useState, useEffect } from 'react'
import '../styles/Navbar.css'

const navLinks = [
  { label: 'About', target: 'about' },
  { label: 'Facilities', target: 'facilities' },
  { label: 'Gallery', target: 'gallery' },
  { label: 'Pricing', target: 'pricing' },
  { label: 'Location', target: 'location' },
  { label: 'Contact', target: 'contact' },
]

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="container navbar__inner">
        <div className="navbar__logo">
          <span className="navbar__logo-name">Abode by the Lake</span>
          <span className="navbar__logo-tagline">Luxury Holiday Bungalow</span>
        </div>

        <ul className={`navbar__links${menuOpen ? ' open' : ''}`}>
          {navLinks.map(link => (
            <li key={link.target}>
              <span className="navbar__link" onClick={() => scrollTo(link.target)}>
                {link.label}
              </span>
            </li>
          ))}
          <li>
            <button className="btn-gold navbar__cta" onClick={() => scrollTo('contact')}>
              <span>Book Now</span>
            </button>
          </li>
        </ul>

        <button className="navbar__menu-btn" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  )
}

export default Navbar