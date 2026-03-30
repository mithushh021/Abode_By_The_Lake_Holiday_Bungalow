import React from 'react'
import '../styles/Pricing.css'

const plans = [
  {
    season: 'Low Season',
    name: 'Weekday Stay',
    amount: '180',
    currency: '$',
    per: '/ night',
    featured: false,
    badge: null,
    features: [
      'Full bungalow — all 5 bedrooms',
      'Private lake & jetty access',
      'Fully equipped kitchen',
      'Landscaped garden access',
      'High-speed WiFi',
      'Secure gated parking',
      'Checkout by 11:00 AM',
    ],
  },
  {
    season: 'Peak Season',
    name: 'Weekend Retreat',
    amount: '280',
    currency: '$',
    per: '/ night',
    featured: true,
    badge: 'Most Popular',
    features: [
      'Full bungalow — all 5 bedrooms',
      'Private lake & jetty access',
      'Swimming Pool & fire pit',
      'Outdoor BBQ terrace',
      'Welcome hamper on arrival',
      'Late checkout — 1:00 PM',
      'Complimentary kayak hire',
      'High-speed WiFi & EV charging',
    ],
  },
  {
    season: 'Special Package',
    name: 'Weekly Escape',
    amount: '1,400',
    currency: '$',
    per: '/ 7 nights',
    featured: false,
    badge: null,
    features: [
      'Everything in Weekend Retreat',
      'One free airport transfer',
      'Daily housekeeping service',
      'Curated local experience guide',
      'Complimentary welcome dinner',
      'Flexible check-in & checkout',
      'Priority rebooking guarantee',
    ],
  },
]

const Pricing: React.FC = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="pricing" id="pricing">
      <div className="container">
        <div className="pricing__header">
          <span className="section-label">Rates & Packages</span>
          <h2 className="section-title">Choose Your<br />Perfect Stay</h2>
          <div className="section-divider" />
        </div>

        <div className="pricing__grid">
          {plans.map(plan => (
            <div className={`pricing-card${plan.featured ? ' pricing-card--featured' : ''}`} key={plan.name}>
              {plan.badge && <span className="pricing-card__badge">{plan.badge}</span>}
              <div className="pricing-card__season">{plan.season}</div>
              <div className="pricing-card__name">{plan.name}</div>
              <div className="pricing-card__price">
                <span className="pricing-card__currency">{plan.currency}</span>
                <span className="pricing-card__amount">{plan.amount}</span>
                <span className="pricing-card__per">{plan.per}</span>
              </div>
              <div className="pricing-card__divider" />
              <ul className="pricing-card__features">
                {plan.features.map(f => (
                  <li className="pricing-card__feature" key={f}>
                    <span className="pricing-card__check">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button className="btn-gold pricing-card__cta" onClick={scrollToContact}>
                <span>Enquire Now</span>
              </button>
            </div>
          ))}
        </div>

        <p className="pricing__note">
          All rates are subject to availability. <strong>Minimum 2-night stay</strong> required.
          Contact us for group rates, extended stays, or special occasions.
        </p>
      </div>
    </section>
  )
}

export default Pricing
