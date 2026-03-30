import React from 'react'
import '../styles/Footer.css'

const Footer: React.FC = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">

          {/* Brand */}
          <div className="footer__brand">
            <span className="footer__logo-name">Abode by the Lake</span>
            <span className="footer__logo-tagline">Luxury Holiday Bungalow · Sri Lanka</span>
            <p className="footer__brand-desc">
              A privately owned lakeside escape crafted for travellers who seek beauty,
              stillness, and the finest comforts — far from the ordinary.
            </p>
            <div className="footer__socials">
              <div className="footer__social" title="Facebook">f</div>
              <div className="footer__social" title="Instagram">in</div>
              <div className="footer__social" title="WhatsApp">w</div>
              <div className="footer__social" title="TripAdvisor">t</div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <span className="footer__col-title">Explore</span>
            <ul className="footer__col-links">
              {[
                ['About', 'about'],
                ['Facilities', 'facilities'],
                ['Gallery', 'gallery'],
                ['Pricing', 'pricing'],
                ['Location', 'location'],
                ['Contact', 'contact'],
              ].map(([label, id]) => (
                <li key={id}>
                  <span className="footer__col-link" onClick={() => scrollTo(id)}>{label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Facilities quick list */}
          <div>
            <span className="footer__col-title">Amenities</span>
            <ul className="footer__col-links">
              {['5 Bedrooms', 'Swimming Pool', 'Lake Access', 'Private Jetty', 'Chef\'s Kitchen', 'Outdoor BBQ', 'Fire Pit', 'Free Parking'].map(f => (
                <li key={f}><span className="footer__col-link">{f}</span></li>
              ))}
            </ul>
          </div>

          {/* Contact quick */}
          <div>
            <span className="footer__col-title">Contact</span>
            <div className="footer__contact-item">
              <span className="footer__contact-label">Phone</span>
              <span className="footer__contact-val">+94 77 123 4567</span>
            </div>
            <div className="footer__contact-item">
              <span className="footer__contact-label">Email</span>
              <span className="footer__contact-val">stay@abodebythelake.lk</span>
            </div>
            <div className="footer__contact-item">
              <span className="footer__contact-label">Location</span>
              <span className="footer__contact-val">Lake Road, Negombo,<br />Western Province, Sri Lanka</span>
            </div>
            <div className="footer__contact-item">
              <span className="footer__contact-label">Check-In / Out</span>
              <span className="footer__contact-val">2:00 PM / 11:00 AM</span>
            </div>
          </div>

        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            © {new Date().getFullYear()} <span>Abode by the Lake</span>. All rights reserved. Designed with ♥ in Sri Lanka.
          </p>
          <ul className="footer__bottom-links">
            <li><span className="footer__bottom-link">Privacy Policy</span></li>
            <li><span className="footer__bottom-link">Terms & Conditions</span></li>
            <li><span className="footer__bottom-link">Cancellation Policy</span></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
