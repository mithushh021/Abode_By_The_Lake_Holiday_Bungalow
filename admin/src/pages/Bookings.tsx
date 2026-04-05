import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBookings, deleteBooking } from '../hooks/useBookings'
import { statusLabel, formatCurrency, formatDate } from '../lib/utils'
import type { BookingStatus } from '../types'

const STATUS_FILTERS: { value: BookingStatus | 'all'; label: string }[] = [
  { value: 'all',         label: 'All' },
  { value: 'pending',     label: 'Pending' },
  { value: 'confirmed',   label: 'Confirmed' },
  { value: 'checked_in',  label: 'Checked In' },
  { value: 'checked_out', label: 'Checked Out' },
  { value: 'cancelled',   label: 'Cancelled' },
]

const Bookings: React.FC = () => {
  const navigate = useNavigate()
  const { bookings, loading, refetch } = useBookings()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<BookingStatus | 'all'>('all')
  const [deleting, setDeleting] = useState<string | null>(null)

  const filtered = useMemo(() =>
    bookings.filter(b => {
      const matchStatus = status === 'all' || b.status === status
      const q = search.toLowerCase()
      const matchSearch = !q
        || b.guest?.first_name?.toLowerCase().includes(q)
        || b.guest?.last_name?.toLowerCase().includes(q)
        || b.guest?.email?.toLowerCase().includes(q)
      return matchStatus && matchSearch
    }),
  [bookings, search, status])

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this booking? This cannot be undone.')) return
    setDeleting(id)
    try { await deleteBooking(id); refetch() }
    catch { alert('Failed to delete.') }
    finally { setDeleting(null) }
  }

  return (
    <div className="animate-in">
      <div className="page-toolbar">
        <div className="page-toolbar__left">
          <input className="search-input" type="search"
            placeholder="Search guest name or email…"
            value={search} onChange={e => setSearch(e.target.value)} />
          <div className="filter-tabs">
            {STATUS_FILTERS.map(f => (
              <button key={f.value}
                className={`filter-tab${status === f.value ? ' filter-tab--active' : ''}`}
                onClick={() => setStatus(f.value)}>{f.label}</button>
            ))}
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/bookings/new')}>
          + New Booking
        </button>
      </div>

      <div className="card">
        <div className="card__header">
          <span className="card__title">{filtered.length} booking{filtered.length !== 1 ? 's' : ''}</span>
        </div>
        <div className="table-wrap">
          {loading ? (
            <div style={{ padding:'1.5rem', display:'flex', flexDirection:'column', gap:'0.75rem' }}>
              {[...Array(5)].map((_,i) => <div key={i} className="skeleton" style={{ height:44 }} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state__icon">📋</div>
              <div className="empty-state__title">No bookings found</div>
              <div className="empty-state__desc">Try a different filter or create a new booking.</div>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Guest</th><th>Check In</th><th>Check Out</th>
                  <th>Nights</th><th>Guests</th><th>Amount</th>
                  <th>Status</th><th>Created</th><th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(b => (
                  <tr key={b.id}>
                    <td>
                      <div className="guest-cell">
                        <div className="guest-avatar">{b.guest?.first_name?.[0]}{b.guest?.last_name?.[0]}</div>
                        <div>
                          <div className="guest-name">{b.guest?.first_name} {b.guest?.last_name}</div>
                          <div className="guest-email">{b.guest?.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="mono">{formatDate(b.check_in)}</td>
                    <td className="mono">{formatDate(b.check_out)}</td>
                    <td>{b.nights}</td>
                    <td>{b.guests_count}</td>
                    <td className="mono">{formatCurrency(b.total_amount, b.currency)}</td>
                    <td><span className={`badge badge--${b.status}`}>{statusLabel(b.status)}</span></td>
                    <td className="text-muted">{formatDate(b.created_at)}</td>
                    <td>
                      <div className="row-actions">
                        <button className="btn btn-ghost btn-sm" onClick={() => navigate(`/bookings/${b.id}`)}>Edit</button>
                        <button className="btn btn-danger btn-sm" disabled={deleting === b.id}
                          onClick={() => handleDelete(b.id)}>{deleting === b.id ? '…' : 'Del'}</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

export default Bookings