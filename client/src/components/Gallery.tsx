import React, { useState } from 'react'
import '../styles/Gallery.css'
import exterior from '../assets/FrontGate.jpg'
import bedroom from '../assets/FrontGate.jpg'

const photos = [
  { url: exterior, label: 'Exterior' },
  { url: bedroom, label: 'Master Bedroom' },
  { url: 'https://images.unsplash.com/photo-1506974210756-8e1b8985d348?w=700&q=80', label: 'Lake View' },
  { url: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=700&q=80', label: 'Pool' },
  { url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&q=80', label: 'Kitchen' },
  { url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=700&q=80', label: 'Garden' },
]

const Gallery: React.FC = () => {
  const [lightbox, setLightbox] = useState<string | null>(null)

  return (
    <section className="gallery" id="gallery">
      <div className="container">
        <div className="gallery__header">
          <span className="section-label">Photo Gallery</span>
          <h2 className="section-title">A Glimpse of<br />Your Retreat</h2>
          <div className="section-divider" />
        </div>
      </div>

      <div className="container">
        <div className="gallery__grid">
          {photos.map((p, i) => (
            <div className="gallery__item" key={i} onClick={() => setLightbox(p.url)}>
              <img className="gallery__img" src={p.url} alt={p.label} />
              <div className="gallery__item-overlay">
                <span className="gallery__item-icon">⊕</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightbox && (
        <div className="gallery__lightbox" onClick={() => setLightbox(null)}>
          <button className="gallery__lightbox-close" onClick={() => setLightbox(null)}>✕</button>
          <img src={lightbox} alt="Gallery" onClick={e => e.stopPropagation()} />
        </div>
      )}
    </section>
  )
}

export default Gallery