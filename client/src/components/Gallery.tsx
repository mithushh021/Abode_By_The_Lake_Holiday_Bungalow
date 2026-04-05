import React, { useState } from 'react'
import '../styles/Gallery.css'
import A from '../assets/Hall.jpg'
import B from '../assets/TV room.jpg'
import C from '../assets/Pool.jpg'
import D from '../assets/BedRoom2.jpg'
import E from '../assets/BedRoom1.jpg'
import F from '../assets/TV.jpg'

const photos = [
  { url: A, label: 'Exterior' },
  { url: B, label: 'Master Bedroom' },
  { url: C, label: 'Lake View' },
  { url: D, label: 'Pool' },
  { url: E, label: 'Kitchen' },
  { url: F, label: 'Garden' },
]

const Gallery: React.FC = () => {
  const [lightbox, setLightbox] = useState<string | null>(null)

  return (
    <section className="gallery" id="gallery">
      <div className="container1">
        <div className="gallery__header">
          <span className="section-label">Photo Gallery</span>
          <h2 className="section-title">A Glimpse of<br />Your Retreat</h2>
          <div className="section-divider" />
        </div>
      </div>

      <div className="container1">
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