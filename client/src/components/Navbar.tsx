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

  useEffect(() => {
    if (!menuOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`} aria-label="Main navigation">
      <div className="container navbar__inner">
        <button className="navbar__logo" onClick={() => scrollTo('hero')} aria-label="Back to top">
          <span className="navbar__logo-name">Abode by the Lake</span>
          <span className="navbar__logo-tagline">Luxury Holiday Bungalow</span>
        </button>

        <ul id="primary-navigation" className={`navbar__links${menuOpen ? ' open' : ''}`}>
          {navLinks.map(link => (
            <li key={link.target}>
              <button className="navbar__link" onClick={() => scrollTo(link.target)}>
                {link.label}
              </button>
            </li>
          ))}
          <li>
            <button className="btn-gold navbar__cta" onClick={() => scrollTo('contact')}>
              <span>Book Now</span>
            </button>
          </li>
        </ul>

        <button
          className="navbar__menu-btn"
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  )
}

export default Navbar