import React from 'react'
import '../styles/About.css'
import aboutImg from '../assets/bg.png'


const features = [
  'Lakeside Privacy', 'Gated Property', 'Chef\'s Kitchen',
  'Outdoor Dining', 'Sunrise Views', 'Serene Gardens',
]

const About: React.FC = () => {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about__grid">
          <div className="about__image-wrap">
            <div className="about__image-frame" />
            <div className="about__gold-line" />
            <img
              className="about__image-main"
              src={aboutImg}
              alt="Abode by the Lake exterior"
            />
          </div>

          <div className="about__content">
            <span className="section-label">Our Story</span>
            <h2 className="section-title">A Private Sanctuary<br />Unlike Any Other</h2>
            <div className="section-divider" />

            <blockquote className="about__quote">
              "Every moment here is designed to be cherished forever."
            </blockquote>

            <p className="about__text">
              Abode by the Lake is a lovingly owned private holiday bungalow, built
              with a singular vision — to offer guests an experience of unhurried luxury
              in the lap of nature. Nestled against a tranquil lake, the property blends
              timeless architecture with modern comforts.
            </p>
            <p className="about__text">
              Whether you're escaping the city for a weekend or planning an extended
              family retreat, our bungalow is your personal haven. From the sun-drenched
              verandah to the cool lake breeze at dusk, every corner invites you to slow
              down and savour the moment.
            </p>

            <div className="about__features">
              {features.map(f => (
                <div key={f} className="about__feature">
                  <div className="about__feature-dot" />
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About