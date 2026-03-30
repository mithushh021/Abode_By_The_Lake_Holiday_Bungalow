import React from 'react'
import '../styles/Location.css'

const nearby = [
  { name: 'Town Centre', dist: '8 km' },
  { name: 'Airport', dist: '35 km' },
  { name: 'Supermarket', dist: '4 km' },
  { name: 'Beach', dist: '12 km' },
  { name: 'Hospital', dist: '10 km' },
  { name: 'Restaurant Row', dist: '6 km' },
]

const Location: React.FC = () => {
  return (
    <section className="location" id="location">
      <div className="container">
        <div className="location__grid">

          <div className="location__map-wrap">
            <div className="location__map-frame" />
            <div className="location__map">
              {/* Replace the src with your actual Google Maps embed URL */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.58385370454!2d79.7961828!3d7.2905717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2eeabc84b5cd1%3A0x42f5e7d9e15e1862!2sNegombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1710000000000"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Abode by the Lake Location"
              />
              <div className="location__map-pin">📍 Abode by the Lake</div>
            </div>
          </div>

          <div className="location__content">
            <span className="section-label">Find Us</span>
            <h2 className="section-title">Getting<br />Here</h2>
            <div className="section-divider" />

            <div className="location__details">
              <div className="location__detail">
                <div className="location__detail-icon">📍</div>
                <div>
                  <span className="location__detail-label">Address</span>
                  <span className="location__detail-value">Abode by the Lake</span>
                  <span className="location__detail-note">Lake Road, Negombo, Western Province, Sri Lanka</span>
                </div>
              </div>

              <div className="location__detail">
                <div className="location__detail-icon">🚗</div>
                <div>
                  <span className="location__detail-label">By Road</span>
                  <span className="location__detail-value">35 mins from Colombo</span>
                  <span className="location__detail-note">Take the Negombo–Colombo Expressway and follow lakeside signs. Ample signage from the main junction.</span>
                </div>
              </div>

              <div className="location__detail">
                <div className="location__detail-icon">✈️</div>
                <div>
                  <span className="location__detail-label">From Airport</span>
                  <span className="location__detail-value">Bandaranaike International — 20 mins</span>
                  <span className="location__detail-note">We can arrange airport transfers. Please mention it when booking.</span>
                </div>
              </div>
            </div>

            <div className="location__nearby">
              <div className="location__nearby-title">Nearby Attractions & Services</div>
              <div className="location__nearby-list">
                {nearby.map(n => (
                  <div className="location__nearby-item" key={n.name}>
                    <span className="location__nearby-name">{n.name}</span>
                    <span className="location__nearby-dist">{n.dist}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Location
