import React, { useState } from 'react'
import axios from 'axios'
import '../styles/Contact.css'

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  checkIn: string
  checkOut: string
  guests: string
  message: string
}

interface FormErrors {
  firstName?: string
  lastName?: string
  email?: string
  checkIn?: string
  checkOut?: string
  guests?: string
}

// Returns today's date as YYYY-MM-DD in local time
const getTodayString = (): string => {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

// Returns tomorrow's date as YYYY-MM-DD (earliest valid check-in)
const getTomorrowString = (): string => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const y = tomorrow.getFullYear()
  const m = String(tomorrow.getMonth() + 1).padStart(2, '0')
  const d = String(tomorrow.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

// Returns the day after a given YYYY-MM-DD string
const getDayAfter = (dateStr: string): string => {
  const d = new Date(dateStr + 'T00:00:00')
  d.setDate(d.getDate() + 1)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

// Human-readable date
const formatDate = (dateStr: string): string => {
  if (!dateStr) return ''
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

// Calculate nights between two date strings
const calcNights = (checkIn: string, checkOut: string): number => {
  if (!checkIn || !checkOut) return 0
  const a = new Date(checkIn + 'T00:00:00')
  const b = new Date(checkOut + 'T00:00:00')
  return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24))
}

const Contact: React.FC = () => {
  const today = getTodayString()
  const tomorrow = getTomorrowString()

  const [form, setForm] = useState<FormData>({
    firstName: '', lastName: '', email: '', phone: '',
    checkIn: '', checkOut: '', guests: '', message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  // ---- Validation rules ----
  const validate = (data: FormData): FormErrors => {
    const errs: FormErrors = {}

    if (!data.firstName.trim()) {
      errs.firstName = 'First name is required.'
    } else if (data.firstName.trim().length < 2) {
      errs.firstName = 'Must be at least 2 characters.'
    }

    if (!data.lastName.trim()) {
      errs.lastName = 'Last name is required.'
    } else if (data.lastName.trim().length < 2) {
      errs.lastName = 'Must be at least 2 characters.'
    }

    if (!data.email.trim()) {
      errs.email = 'Email address is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errs.email = 'Please enter a valid email address.'
    }

    if (!data.checkIn) {
      errs.checkIn = 'Please select a check-in date.'
    } else if (data.checkIn <= today) {
      errs.checkIn = 'Check-in must be a future date (from tomorrow onwards).'
    }

    if (!data.checkOut) {
      errs.checkOut = 'Please select a check-out date.'
    } else if (data.checkIn && data.checkOut <= data.checkIn) {
      errs.checkOut = 'Check-out must be after the check-in date.'
    } else if (data.checkIn && data.checkOut === data.checkIn) {
      errs.checkOut = 'Minimum stay is 1 night — check-out must be a different day.'
    }

    if (!data.guests) {
      errs.guests = 'Please select the number of guests.'
    }

    return errs
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    const updated = { ...form, [name]: value }

    // Auto-clear check-out if it's now invalid after check-in changes
    if (name === 'checkIn' && form.checkOut && form.checkOut <= value) {
      updated.checkOut = ''
    }

    setForm(updated)

    // Re-validate changed field (and checkOut if checkIn changed)
    if (touched[name as keyof FormData]) {
      const errs = validate(updated)
      setErrors(prev => ({
        ...prev,
        [name]: errs[name as keyof FormErrors],
        ...(name === 'checkIn' ? { checkOut: errs.checkOut } : {}),
      }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    const errs = validate(form)
    setErrors(prev => ({ ...prev, [name]: errs[name as keyof FormErrors] }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Mark all fields as touched
    const allTouched = Object.keys(form).reduce((acc, k) => ({ ...acc, [k]: true }), {})
    setTouched(allTouched)

    const errs = validate(form)
    setErrors(errs)

    if (Object.keys(errs).length > 0) return // Stop if validation fails

    setStatus('loading')
    try {
      await axios.post('/api/contact', form)
      setStatus('success')
      setForm({ firstName: '', lastName: '', email: '', phone: '', checkIn: '', checkOut: '', guests: '', message: '' })
      setTouched({})
      setErrors({})
    } catch {
      setStatus('error')
    }
  }

  const nights = calcNights(form.checkIn, form.checkOut)
  const checkOutMin = form.checkIn ? getDayAfter(form.checkIn) : tomorrow

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact__grid">

          {/* Left — Info */}
          <div className="contact__info">
            <span className="section-label">Get in Touch</span>
            <h2 className="section-title">Reserve Your<br />Escape</h2>
            <div className="section-divider" />

            <div className="contact__info-items">
              <div className="contact__info-item">
                <span className="contact__info-label">Phone & WhatsApp</span>
                <span className="contact__info-value">+94 77 655 0367 </span>
                <span className="contact__info-note">We typically respond within 2 hours</span>
              </div>
              <div className="contact__info-item">
                <span className="contact__info-label">Email</span>
                <span className="contact__info-value">stay@abodebythelake.lk</span>
                <span className="contact__info-note">Enquiries answered within 24 hours</span>
              </div>
              <div className="contact__info-item">
                <span className="contact__info-label">Address</span>
                <span className="contact__info-value">47/A, Upstair Road, Batticaloa</span>
                <span className="contact__info-note">Eastern Province, Sri Lanka 30000</span>
              </div>
            </div>

            <div className="contact__hours">
              <span className="contact__hours-title">Enquiry Hours</span>
              {[
                ['Monday – Friday', '8:00 AM – 8:00 PM'],
                ['Saturday', '9:00 AM – 6:00 PM'],
                ['Sunday', '10:00 AM – 4:00 PM'],
              ].map(([day, time]) => (
                <div className="contact__hour-row" key={day}>
                  <span>{day}</span>
                  <span>{time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <form className="contact__form" onSubmit={handleSubmit} noValidate>
            <h3 className="contact__form-title">Make an Enquiry</h3>
            <p className="contact__form-sub">Fill in your details and we'll get back to you promptly.</p>

            {/* Name row */}
            <div className="form-row">
              <div className={`form-group${errors.firstName && touched.firstName ? ' form-group--error' : ''}`}>
                <label htmlFor="firstName">First Name <span className="form-required">*</span></label>
                <input
                  id="firstName" name="firstName" type="text" placeholder="John"
                  value={form.firstName} onChange={handleChange} onBlur={handleBlur}
                />
                {errors.firstName && touched.firstName && (
                  <span className="form-error-msg">⚠ {errors.firstName}</span>
                )}
              </div>
              <div className={`form-group${errors.lastName && touched.lastName ? ' form-group--error' : ''}`}>
                <label htmlFor="lastName">Last Name <span className="form-required">*</span></label>
                <input
                  id="lastName" name="lastName" type="text" placeholder="Silva"
                  value={form.lastName} onChange={handleChange} onBlur={handleBlur}
                />
                {errors.lastName && touched.lastName && (
                  <span className="form-error-msg">⚠ {errors.lastName}</span>
                )}
              </div>
            </div>

            {/* Email + Phone */}
            <div className="form-row">
              <div className={`form-group${errors.email && touched.email ? ' form-group--error' : ''}`}>
                <label htmlFor="email">Email Address <span className="form-required">*</span></label>
                <input
                  id="email" name="email" type="email" placeholder="john@email.com"
                  value={form.email} onChange={handleChange} onBlur={handleBlur}
                />
                {errors.email && touched.email && (
                  <span className="form-error-msg">⚠ {errors.email}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone / WhatsApp</label>
                <input
                  id="phone" name="phone" type="tel" placeholder="+94 77 000 0000"
                  value={form.phone} onChange={handleChange} onBlur={handleBlur}
                />
              </div>
            </div>

            {/* Date row */}
            <div className="form-row">
              <div className={`form-group${errors.checkIn && touched.checkIn ? ' form-group--error' : ''}`}>
                <label htmlFor="checkIn">Check-In Date <span className="form-required">*</span></label>
                <input
                  id="checkIn" name="checkIn" type="date"
                  min={tomorrow}
                  value={form.checkIn}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.checkIn && touched.checkIn
                  ? <span className="form-error-msg">⚠ {errors.checkIn}</span>
                  : form.checkIn && <span className="form-hint-msg">📅 {formatDate(form.checkIn)}</span>
                }
              </div>
              <div className={`form-group${errors.checkOut && touched.checkOut ? ' form-group--error' : ''}`}>
                <label htmlFor="checkOut">Check-Out Date <span className="form-required">*</span></label>
                <input
                  id="checkOut" name="checkOut" type="date"
                  min={checkOutMin}
                  value={form.checkOut}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={!form.checkIn}
                />
                {errors.checkOut && touched.checkOut
                  ? <span className="form-error-msg">⚠ {errors.checkOut}</span>
                  : form.checkOut && <span className="form-hint-msg">📅 {formatDate(form.checkOut)}</span>
                }
              </div>
            </div>

            {/* Night summary badge */}
            {nights > 0 && (
              <div className="form-nights-badge">
                <span className="form-nights-icon">🌙</span>
                <span><strong>{nights}</strong> {nights === 1 ? 'night' : 'nights'} — {formatDate(form.checkIn)} → {formatDate(form.checkOut)}</span>
              </div>
            )}

            {/* Guests */}
            <div className={`form-group${errors.guests && touched.guests ? ' form-group--error' : ''}`}>
              <label htmlFor="guests">Number of Guests <span className="form-required">*</span></label>
              <select id="guests" name="guests" value={form.guests} onChange={handleChange} onBlur={handleBlur}>
                <option value="" disabled>Select guest count</option>
                {[1,2,3,4,5,6,7,8].map(n => (
                  <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                ))}
              </select>
              {errors.guests && touched.guests && (
                <span className="form-error-msg">⚠ {errors.guests}</span>
              )}
            </div>

            {/* Message */}
            <div className="form-group">
              <label htmlFor="message">Message / Special Requests</label>
              <textarea
                id="message" name="message"
                placeholder="Tell us about your stay, any special occasions, or requests..."
                value={form.message} onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn-gold contact__submit" disabled={status === 'loading'}>
              <span>{status === 'loading' ? 'Sending…' : 'Send Enquiry'}</span>
            </button>

            {status === 'success' && (
              <div className="contact__success">
                ✓ &nbsp;Thank you! Your enquiry has been received. We'll be in touch shortly.
              </div>
            )}
            {status === 'error' && (
              <div className="contact__error">
                Something went wrong. Please try emailing us directly at stay@abodebythelake.lk
              </div>
            )}
          </form>

        </div>
      </div>
    </section>
  )
}

export default Contact