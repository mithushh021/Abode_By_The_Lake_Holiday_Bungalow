import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import type { Booking, BookingStatus, Guest } from '../types'

// ── Bookings ─────────────────────────────────────────────────

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetch = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('bookings')
      .select('*, guest:guests(*)')
      .order('check_in', { ascending: false })
    if (error) setError(error.message)
    else setBookings((data ?? []) as Booking[])
    setLoading(false)
  }, [])

  useEffect(() => { fetch() }, [fetch])
  return { bookings, loading, error, refetch: fetch }
}

export function useBooking(id: string) {
  const [booking, setBooking] = useState<Booking | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) { setLoading(false); return }
    supabase
      .from('bookings')
      .select('*, guest:guests(*)')
      .eq('id', id)
      .single()
      .then(({ data }) => { setBooking(data as Booking); setLoading(false) })
  }, [id])

  return { booking, loading }
}

export async function createBooking(
  data: Omit<Booking, 'id' | 'nights' | 'created_at' | 'updated_at' | 'guest'>
) {
  const { data: result, error } = await supabase
    .from('bookings')
    .insert(data)
    .select('*, guest:guests(*)')
    .single()
  if (error) throw error
  return result as Booking
}

export async function updateBooking(id: string, data: Partial<Booking>) {
  const { data: result, error } = await supabase
    .from('bookings')
    .update(data)
    .eq('id', id)
    .select('*, guest:guests(*)')
    .single()
  if (error) throw error
  return result as Booking
}

export async function deleteBooking(id: string) {
  const { error } = await supabase.from('bookings').delete().eq('id', id)
  if (error) throw error
}

export async function updateBookingStatus(id: string, status: BookingStatus) {
  return updateBooking(id, { status })
}

// ── Guests ───────────────────────────────────────────────────

export function useGuests() {
  const [guests, setGuests] = useState<Guest[]>([])
  const [loading, setLoading] = useState(true)

  const fetch = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from('guests')
      .select('*, bookings(id, check_in, check_out, status, total_amount, currency)')
      .order('created_at', { ascending: false })
    setGuests((data ?? []) as Guest[])
    setLoading(false)
  }, [])

  useEffect(() => { fetch() }, [fetch])
  return { guests, loading, refetch: fetch }
}

export async function upsertGuest(data: Omit<Guest, 'id' | 'created_at'>) {
  const { data: result, error } = await supabase
    .from('guests')
    .upsert(data, { onConflict: 'email' })
    .select()
    .single()
  if (error) throw error
  return result as Guest
}

export async function deleteGuest(id: string) {
  const { error } = await supabase.from('guests').delete().eq('id', id)
  if (error) throw error
}

// ── Dashboard stats ──────────────────────────────────────────

export function useDashboardStats() {
  const [stats, setStats] = useState({
    totalBookings: 0,
    activeGuests: 0,
    occupancyRate: 0,
    revenueMonth: 0,
    upcomingCheckins: 0,
    upcomingCheckouts: 0,
    recentBookings: [] as Booking[],
    monthlyData: [] as { month: string; revenue: number; bookings: number }[],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const today = new Date().toISOString().split('T')[0]
      const monthStart = today.slice(0, 7) + '-01'
      const next7 = new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]
      const daysInMonth = new Date(
        new Date().getFullYear(), new Date().getMonth() + 1, 0
      ).getDate()

      const [allRes, activeRes, monthRes, checkinRes, checkoutRes, recentRes, occRes] =
        await Promise.all([
          supabase.from('bookings').select('id', { count: 'exact', head: true }),
          supabase.from('bookings').select('id', { count: 'exact', head: true }).eq('status', 'checked_in'),
          supabase.from('bookings').select('total_amount').gte('check_in', monthStart).not('status', 'eq', 'cancelled'),
          supabase.from('bookings').select('id', { count: 'exact', head: true }).gte('check_in', today).lte('check_in', next7).eq('status', 'confirmed'),
          supabase.from('bookings').select('id', { count: 'exact', head: true }).gte('check_out', today).lte('check_out', next7).eq('status', 'checked_in'),
          supabase.from('bookings').select('*, guest:guests(*)').order('created_at', { ascending: false }).limit(5),
          supabase.from('bookings').select('check_in, check_out').gte('check_in', monthStart).not('status', 'eq', 'cancelled'),
        ])

      let occupiedDays = 0
      ;(occRes.data ?? []).forEach((b: { check_in: string; check_out: string }) => {
        const ci = new Date(b.check_in), co = new Date(b.check_out)
        occupiedDays += Math.min((co.getTime() - ci.getTime()) / 86400000, daysInMonth)
      })

      // Last 6 months
      const monthlyData: { month: string; revenue: number; bookings: number }[] = []
      for (let i = 5; i >= 0; i--) {
        const d = new Date()
        d.setMonth(d.getMonth() - i)
        const key = d.toISOString().slice(0, 7)
        const { data: mData } = await supabase
          .from('bookings')
          .select('total_amount')
          .gte('check_in', key + '-01')
          .lte('check_in', key + '-31')
          .not('status', 'eq', 'cancelled')
        monthlyData.push({
          month: d.toLocaleString('default', { month: 'short' }),
          revenue: (mData ?? []).reduce((s, b) => s + Number(b.total_amount), 0),
          bookings: (mData ?? []).length,
        })
      }

      const revenue = (monthRes.data ?? []).reduce((s, b) => s + Number(b.total_amount), 0)

      setStats({
        totalBookings: allRes.count ?? 0,
        activeGuests: activeRes.count ?? 0,
        occupancyRate: Math.round(Math.min((occupiedDays / daysInMonth) * 100, 100)),
        revenueMonth: revenue,
        upcomingCheckins: checkinRes.count ?? 0,
        upcomingCheckouts: checkoutRes.count ?? 0,
        recentBookings: (recentRes.data ?? []) as Booking[],
        monthlyData,
      })
      setLoading(false)
    }
    load()
  }, [])

  return { stats, loading }
}