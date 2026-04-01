import React, { useEffect, useRef } from 'react'
import '../styles/About.css'
import aboutImg from '../assets/bg.png'

const features = [
  'Lakeside View',
  'Gated Property',
  "Chef's Kitchen",
  'Outdoor Dining',
  'Sunrise Views',
  'Serene Gardens',
]

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)

  // Scroll-reveal via IntersectionObserver
  useEffect(() => {
    const targets = sectionRef.current?.querySelectorAll<HTMLElement>(
      '.about__reveal, .about__reveal--left'
    )
    if (!targets) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    targets.forEach((el, i) => {
      ;(el as HTMLElement).style.transitionDelay = `${i * 0.08}s`
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="container">
        <div className="about__grid">

          {/* ── Image column ── */}
          <div className="about__image-wrap about__reveal--left">
            <div className="about__image-frame" />
            <div className="about__gold-line" />

            <img
              className="about__image-main"
              src={aboutImg}
              alt="Abode by the Lake exterior"
            />

            {/* Vertical label */}
            <span className="about__image-label">Batticaloa, Sri Lanka</span>

            {/* Floating accent badge */}
            <div className="about__image-badge">
              <span className="about__image-badge-num">5</span>
              <span className="about__image-badge-text">Bedrooms</span>
            </div>
          </div>

          {/* ── Content column ── */}
          <div className="about__content">
            <span className="section-label about__reveal">Our Story</span>

            <h2 className="section-title about__reveal">
              Your Own Private Sanctuary<br />
              <em>by the Lake.</em>
            </h2>

            <div className="section-divider about__reveal" />

            <blockquote className="about__quote about__reveal">
              "Every moment here is designed to be cherished forever."
            </blockquote>

            <p className="about__text about__reveal">
              Abode by the Lake is an exclusive, privately owned holiday bungalow
              crafted for those who appreciate space, privacy, and understated luxury.
              Set along a tranquil lakeside in Batticaloa, the residence offers a
              seamless blend of contemporary comfort and serene natural surroundings.
            </p>

            <p className="about__text about__reveal">
              The villa features five generously appointed bedrooms, elegant living
              spaces, and a private pool — designed to accommodate families and groups
              in complete comfort. Expansive interiors, a sunlit verandah, and refined
              finishes create an atmosphere that is both inviting and effortlessly
              sophisticated.
            </p>

            <p className="about__text about__reveal">
              Outdoors, landscaped gardens and open-air seating provide the perfect
              setting to unwind, while uninterrupted lake views bring a sense of calm
              to every moment. Whether for a weekend escape or an extended retreat,
              Abode by the Lake delivers a peaceful, private experience defined by
              comfort and quiet luxury.
            </p>

            <div className="about__features about__reveal">
              {features.map((f) => (
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