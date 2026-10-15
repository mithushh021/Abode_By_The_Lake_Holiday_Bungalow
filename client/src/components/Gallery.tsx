import React, { useEffect, useState } from 'react'
import '../styles/Gallery.css'
import photo1 from '../assets/1.JPG?url'
import photo2 from '../assets/2.JPG?url'
import photo3 from '../assets/3.JPG?url'
import photo4 from '../assets/4.JPG?url'
import photo5 from '../assets/5.JPG?url'
import photo6 from '../assets/6.JPG?url'
import photo7 from '../assets/7.JPG?url'
import photo8 from '../assets/8.JPG?url'
import photo9 from '../assets/9.JPG?url'
import photo10 from '../assets/10.JPG?url'
import photo11 from '../assets/11.JPG?url'
import photo12 from '../assets/12.JPG?url'
import photo13 from '../assets/13.JPG?url'

const photos = [
  { url: photo1, label: 'Bungalow exterior at dusk' },
  { url: photo2, label: 'Landscaped garden' },
  { url: photo3, label: 'Bungalow exterior' },
  { url: photo4, label: 'Indoor swimming pool' },
  { url: photo5, label: 'Garden courtyard' },
  { url: photo6, label: 'Interior hallway' },
  { url: photo7, label: 'Bungalow exterior at night' },
  { url: photo8, label: 'Living room' },
  { url: photo9, label: 'Bedroom' },
  { url: photo10, label: 'Bedroom with garden view' },
  { url: photo11, label: 'Verandah' },
  { url: photo12, label: 'Bungalow driveway' },
  { url: photo13, label: 'Upstairs hallway' },
]

const Gallery: React.FC = () => {
  const [lightbox, setLightbox] = useState<(typeof photos)[number] | null>(null)

  useEffect(() => {
    if (!lightbox) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightbox(null)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightbox])

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
            <button
              className="gallery__item"
              key={p.label}
              onClick={() => setLightbox(p)}
              aria-label={`View ${p.label} photo`}
              type="button"
            >
              <img className="gallery__img" src={p.url} alt={p.label} loading={i < 3 ? 'eager' : 'lazy'} />
              <span className="gallery__item-overlay" aria-hidden="true">
                <span className="gallery__item-icon">⊕</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {lightbox && (
        <div
          className="gallery__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${lightbox.label} photo`}
          onClick={() => setLightbox(null)}
        >
          <button
            className="gallery__lightbox-close"
            onClick={() => setLightbox(null)}
            aria-label="Close photo"
          >
            ✕
          </button>
          <img src={lightbox.url} alt={lightbox.label} onClick={e => e.stopPropagation()} />
        </div>
      )}
    </section>
  )
}

export default Gallery