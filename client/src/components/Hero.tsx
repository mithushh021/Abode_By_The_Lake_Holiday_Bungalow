import React from 'react'
import '../styles/Hero.css'

const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero" id="hero">
      <div className="hero__bg" />
      <div className="hero__overlay" />

      <div className="hero__content">
        <span className="hero__badge">Exclusive Lakeside Retreat</span>
        <h1 className="hero__title">
          Abode by<br /><span className="hero__title-italic">the Lake</span>
        </h1>
        <p className="hero__subtitle">Where Serenity Meets Splendour</p>
        <p className="hero__desc">
          A private luxury bungalow nestled beside the water's edge — crafted for those
          who seek beauty, calm, and extraordinary comfort.
        </p>
        <div className="hero__actions">
          <button className="btn-gold" onClick={() => scrollTo('contact')}>
            <span>Reserve Your Stay</span>
          </button>
          <button className="btn-gold" onClick={() => scrollTo('facilities')} style={{ borderColor: 'rgba(201,168,76,0.35)', color: 'var(--cream-muted)' }}>
            <span>Explore Bungalow</span>
          </button>
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

      <div className="hero__scroll" onClick={() => scrollTo('about')}>
        <span>Scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  )
}

export default Hero