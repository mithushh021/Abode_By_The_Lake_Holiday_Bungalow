import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useBooking, createBooking, updateBooking, upsertGuest } from '../hooks/useBookings'
import { calcNights } from '../lib/utils'
import type { BookingStatus } from '../types'
import './BookingForm.css'

interface F {
  firstName:string; lastName:string; email:string; phone:string
  nationality:string; idNumber:string
  checkIn:string; checkOut:string; guestsCount:number
  status:BookingStatus; totalAmount:string; currency:string
  specialRequests:string; notes:string
}

const empty: F = {
  firstName:'', lastName:'', email:'', phone:'', nationality:'', idNumber:'',
  checkIn:'', checkOut:'', guestsCount:2,
  status:'pending', totalAmount:'', currency:'USD',
  specialRequests:'', notes:'',
}

const BookingForm: React.FC = () => {
  const { id } = useParams<{ id:string }>()
  const isEdit = Boolean(id && id !== 'new')
  const navigate = useNavigate()
  const { booking, loading } = useBooking(isEdit ? id! : '')
  const [form, setForm] = useState<F>(empty)
  const [errors, setErrors] = useState<Partial<Record<keyof F, string>>>({})
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState<string|null>(null)

  useEffect(() => {
    if (booking) setForm({
      firstName:   booking.guest?.first_name ?? '',
      lastName:    booking.guest?.last_name  ?? '',
      email:       booking.guest?.email      ?? '',
      phone:       booking.guest?.phone      ?? '',
      nationality: booking.guest?.nationality ?? '',
      idNumber:    booking.guest?.id_number  ?? '',
      checkIn:     booking.check_in,
      checkOut:    booking.check_out,
      guestsCount: booking.guests_count,
      status:      booking.status,
      totalAmount: String(booking.total_amount),
      currency:    booking.currency,
      specialRequests: booking.special_requests ?? '',
      notes:       booking.notes ?? '',
    })
  }, [booking])

  const set = (k: keyof F, v: string|number) => setForm(f => ({ ...f, [k]: v }))

  const validate = () => {
    const e: Partial<Record<keyof F, string>> = {}
    if (!form.firstName.trim()) e.firstName = 'Required'
    if (!form.lastName.trim())  e.lastName  = 'Required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.checkIn)  e.checkIn  = 'Required'
    if (!form.checkOut) e.checkOut = 'Required'
    if (form.checkIn && form.checkOut && form.checkOut <= form.checkIn) e.checkOut = 'Must be after check-in'
    if (!form.totalAmount || isNaN(Number(form.totalAmount))) e.totalAmount = 'Valid amount required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSaving(true); setSaveError(null)
    try {
      const guest = await upsertGuest({
        first_name:  form.firstName, last_name: form.lastName,
        email: form.email, phone: form.phone,
        nationality: form.nationality, id_number: form.idNumber,
      })
      const payload = {
        guest_id: guest.id, check_in: form.checkIn, check_out: form.checkOut,
        guests_count: form.guestsCount, status: form.status,
        total_amount: Number(form.totalAmount), currency: form.currency,
        special_requests: form.specialRequests || undefined,
        notes: form.notes || undefined,
      }
      if (isEdit && id) await updateBooking(id, payload)
      else              await createBooking(payload)
      navigate('/bookings')
    } catch (err: unknown) {
      setSaveError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setSaving(false)
    }
  }

  if (isEdit && loading) return (
    <div style={{ display:'flex', flexDirection:'column', gap:12, padding:16 }}>
      {[...Array(6)].map((_,i) => <div key={i} className="skeleton" style={{ height:48 }} />)}
    </div>
  )

  const nights = calcNights(form.checkIn, form.checkOut)

  return (
    <div className="booking-form animate-in">
      <button className="btn btn-ghost btn-sm" style={{ marginBottom:'1rem' }} onClick={() => navigate('/bookings')}>
        ← Back to Bookings
      </button>

      <form onSubmit={handleSubmit} noValidate>
        <div className="booking-form__grid">

          <div className="card">
            <div className="card__header"><span className="card__title">Guest Information</span></div>
            <div className="card__body">
              <div className="form-row">
                <div className={`field${errors.firstName ? ' field--error':''}`}>
                  <label>First Name *</label>
                  <input value={form.firstName} onChange={e => set('firstName', e.target.value)} placeholder="John" />
                  {errors.firstName && <span className="field__error">{errors.firstName}</span>}
                </div>
                <div className={`field${errors.lastName ? ' field--error':''}`}>
                  <label>Last Name *</label>
                  <input value={form.lastName} onChange={e => set('lastName', e.target.value)} placeholder="Silva" />
                  {errors.lastName && <span className="field__error">{errors.lastName}</span>}
                </div>
              </div>
              <div className="form-row">
                <div className={`field${errors.email ? ' field--error':''}`}>
                  <label>Email *</label>
                  <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="john@example.com" />
                  {errors.email && <span className="field__error">{errors.email}</span>}
                </div>
                <div className="field">
                  <label>Phone / WhatsApp</label>
                  <input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+94 77 000 0000" />
                </div>
              </div>
              <div className="form-row">
                <div className="field">
                  <label>Nationality</label>
                  <input value={form.nationality} onChange={e => set('nationality', e.target.value)} />
                </div>
                <div className="field">
                  <label>ID / Passport No.</label>
                  <input value={form.idNumber} onChange={e => set('idNumber', e.target.value)} />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card__header"><span className="card__title">Booking Details</span></div>
            <div className="card__body">
              <div className="form-row">
                <div className={`field${errors.checkIn ? ' field--error':''}`}>
                  <label>Check-In *</label>
                  <input type="date" value={form.checkIn}
                    onChange={e => { set('checkIn', e.target.value); if (form.checkOut <= e.target.value) set('checkOut','') }} />
                  {errors.checkIn && <span className="field__error">{errors.checkIn}</span>}
                </div>
                <div className={`field${errors.checkOut ? ' field--error':''}`}>
                  <label>Check-Out *</label>
                  <input type="date" value={form.checkOut} min={form.checkIn}
                    onChange={e => set('checkOut', e.target.value)} />
                  {errors.checkOut && <span className="field__error">{errors.checkOut}</span>}
                </div>
              </div>

              {nights > 0 && (
                <div className="nights-badge">
                  🌙 <strong>{nights}</strong> night{nights !== 1 ? 's' : ''}
                </div>
              )}

              <div className="form-row">
                <div className="field">
                  <label>Guests</label>
                  <select value={form.guestsCount} onChange={e => set('guestsCount', Number(e.target.value))}>
                    {Array.from({length:15},(_,i)=>i+1).map(n=>(
                      <option key={n} value={n}>{n} {n===1?'Guest':'Guests'}</option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label>Status</label>
                  <select value={form.status} onChange={e => set('status', e.target.value as BookingStatus)}>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="checked_in">Checked In</option>
                    <option value="checked_out">Checked Out</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className={`field${errors.totalAmount ? ' field--error':''}`}>
                  <label>Total Amount *</label>
                  <input type="number" min="0" step="0.01" value={form.totalAmount}
                    onChange={e => set('totalAmount', e.target.value)} placeholder="0.00" />
                  {errors.totalAmount && <span className="field__error">{errors.totalAmount}</span>}
                </div>
                <div className="field">
                  <label>Currency</label>
                  <select value={form.currency} onChange={e => set('currency', e.target.value)}>
                    <option value="USD">USD — US Dollar</option>
                    <option value="LKR">LKR — Sri Lankan Rupee</option>
                    <option value="EUR">EUR — Euro</option>
                    <option value="GBP">GBP — British Pound</option>
                    <option value="AUD">AUD — Australian Dollar</option>
                  </select>
                </div>
              </div>

              <div className="field" style={{ marginBottom:'1rem' }}>
                <label>Special Requests</label>
                <textarea value={form.specialRequests} onChange={e => set('specialRequests', e.target.value)}
                  placeholder="Guest special requests…" />
              </div>
              <div className="field">
                <label>Internal Notes</label>
                <textarea value={form.notes} onChange={e => set('notes', e.target.value)}
                  placeholder="Private staff notes…" />
              </div>
            </div>
          </div>
        </div>

        {saveError && <div className="save-error">⚠ {saveError}</div>}
        <div className="booking-form__actions">
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/bookings')}>Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Booking'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default BookingForm