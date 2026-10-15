import React from 'react'
import '../styles/Hero.css'
import bungalowPhoto from '../assets/5.JPG?url'

const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero" id="hero">
      <div className="container hero__layout">
        <div className="hero__image-wrap">
          <img
            className="hero__image"
            src={bungalowPhoto}
            alt="Abode by the Lake bungalow and garden"
          />
        </div>

        <div className="hero__content">
          <span className="hero__eyebrow">Batticaloa, Sri Lanka</span>

          <div className="hero__badge">Exclusive Lakeside Retreat</div>

          <h1 className="hero__title">
            Abode by<br />
            <em>the Lake</em>
          </h1>

          <p className="hero__subtitle">Where Serenity Meets Splendour</p>

          <div className="hero__divider" aria-hidden="true">
            <div className="hero__divider-line" />
            <div className="hero__divider-diamond" />
            <div className="hero__divider-line" />
          </div>

          <p className="hero__desc">
            A private luxury bungalow nestled beside the water's edge —
            crafted for those who seek beauty, calm, and extraordinary comfort.
          </p>

          <div className="hero__actions">
            <button className="btn-primary" onClick={() => scrollTo('contact')}>
              Reserve Your Stay
            </button>
            <button className="btn-ghost" onClick={() => scrollTo('facilities')}>
              Explore Bungalow
            </button>
          </div>
        </div>
      </div>

      <div className="hero__stats">
        <div className="container hero__stats-inner">
          <div className="hero__stat">
            <span className="hero__stat-num">5</span>
            <span className="hero__stat-label">Bedrooms</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-num">20+</span>
            <span className="hero__stat-label">Amenities</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-num">∞</span>
            <span className="hero__stat-label">Lake Views</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-num">5★</span>
            <span className="hero__stat-label">Experience</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero