import type { BookingStatus } from '../types'

export const formatDate = (d: string) => {
  if (!d) return '—'
  return new Date(d + 'T00:00:00').toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}

export const formatCurrency = (amount: number, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency, minimumFractionDigits: 0, maximumFractionDigits: 0,
  }).format(amount)
}

export const statusLabel = (status: string): string => ({
  confirmed:   'Confirmed',
  pending:     'Pending',
  checked_in:  'Checked In',
  checked_out: 'Checked Out',
  cancelled:   'Cancelled',
}[status] ?? status)

export const calcNights = (checkIn: string, checkOut: string) => {
  if (!checkIn || !checkOut) return 0
  return Math.round(
    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000
  )
}

export const todayStr = () => new Date().toISOString().split('T')[0]

export const tomorrowStr = () => {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().split('T')[0]
}

export const nDaysFromNow = (n: number) => {
  const d = new Date()
  d.setDate(d.getDate() + n)
  return d.toISOString().split('T')[0]
}