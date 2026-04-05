export type BookingStatus = 'confirmed' | 'pending' | 'checked_in' | 'checked_out' | 'cancelled'

export interface Guest {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  nationality?: string
  id_number?: string
  created_at: string
}

export interface Booking {
  id: string
  guest_id: string
  guest?: Guest
  check_in: string
  check_out: string
  nights: number
  guests_count: number
  status: BookingStatus
  total_amount: number
  currency: string
  special_requests?: string
  notes?: string
  created_at: string
  updated_at: string
}