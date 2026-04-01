import React from 'react'
import '../styles/Facilities.css'

const facilities = [
  {
    icon: '🛏️',
    title: '5 Luxury Bedrooms',
    desc: 'Spacious Super king and King bedrooms with premium linen, blackout curtains, and lake-facing windows that greet you with sunrise every morning.',
    tag: 'Sleeps up to 15',
  },
  {
    icon: '🌊',
    title: 'Lake Access',
    desc: 'Enjoy serene views of the lake, where calm waters and open skies create a truly relaxing atmosphere.',
    tag: 'Exclusive Access',
  },
  {
    icon: '🍽️',
    title: 'Chef\'s Kitchen',
    desc: 'Fully equipped open-plan kitchen with modern appliances, a large dining island, and a dedicated outdoor BBQ terrace for al fresco dining.',
    tag: 'Fully Equipped',
  },
  {
    icon: '🏊',
    title: 'Swimming Pool',
    desc: 'The villa features a private indoor swimming pool, a children’s pool, and a Jacuzzi, creating a refined and relaxing environment for guests of all ages.',
    tag: 'children’s pool',
  },
  {
    icon: '🌿',
    title: 'Landscaped Gardens',
    desc: 'The villa is surrounded by lush greenery, with a rooftop garden and verdant views visible from the TV room, offering a peaceful and refreshing environment.',
    tag: 'Private Garden',
  },
  {
    icon: '🔥',
    title: 'Outdoor Fire Pit',
    desc: 'Gather under the stars around the lakeside fire pit. Ideal for evening storytelling, toasting marshmallows, or a quiet nightcap in the cool air.',
    tag: 'All Seasons',
  },
  {
    icon: '📶',
    title: 'High-Speed WiFi',
    desc: 'Fibre-optic internet throughout the property — stay connected for remote work or streaming, while disconnecting from the everyday world.',
    tag: 'Throughout Property',
  },
  {
    icon: '🧖',
    title: 'Wellness Pavilion',
    desc: 'A dedicated wellness space with yoga mat, meditation cushions, and an outdoor shower surrounded by bamboo — your daily ritual awaits.',
    tag: 'Sanctuary Space',
  },
  {
    icon: '🚗',
    title: 'Secured Parking',
    desc: 'The villa offers secure, gated parking for up to four vehicles, providing safety and ease for your stay.',
    tag: 'Gated Parking',
  },
]

const Facilities: React.FC = () => {
  return (
    <section className="facilities" id="facilities">
      <div className="container">
        <div className="facilities__header">
          <span className="section-label">What We Offer</span>
          <h2 className="section-title">Thoughtfully Curated<br />Amenities</h2>
          <div className="section-divider" />
        </div>
      </div>

      <div className="facilities__grid">
        {facilities.map((f, i) => (
          <div className="facility-card" key={f.title}>
            <span className="facility-card__number">{String(i + 1).padStart(2, '0')}</span>
            <span className="facility-card__icon">{f.icon}</span>
            <h3 className="facility-card__title">{f.title}</h3>
            <p className="facility-card__desc">{f.desc}</p>
            <span className="facility-card__tag">{f.tag}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Facilities