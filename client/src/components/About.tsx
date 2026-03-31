import React from 'react'
import '../styles/About.css'
import aboutImg from '../assets/bg.png'


const features = [
  'Lakeside View', 'Gated Property', 'Chef\'s Kitchen',
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
            <h2 className="section-title">Your Own Private Sanctuary by the Lake.</h2>
            <div className="section-divider" />

            <blockquote className="about__quote">
              "Every moment here is designed to be cherished forever."
            </blockquote>

            <p className="about__text">
              Abode by the Lake is an exclusive, privately owned holiday bungalow crafted for those who appreciate space, privacy, and understated luxury. Set along a tranquil lakeside in Batticaloa, the residence offers a seamless blend of contemporary comfort and serene natural surroundings.
            </p>
            <p className="about__text">
              The villa features five generously appointed bedrooms, elegant living spaces, and a private pool—designed to accommodate families and groups in complete comfort. Expansive interiors, a sunlit verandah, and refined finishes create an atmosphere that is both inviting and effortlessly sophisticated.
            </p>
<p className="about__text">
Outdoors, landscaped gardens and open-air seating provide the perfect setting to unwind, while uninterrupted lake views bring a sense of calm to every moment. Whether for a weekend escape or an extended retreat, Abode by the Lake delivers a peaceful, private experience defined by comfort and quiet luxury.
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