import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { useDashboardStats } from '../hooks/useBookings'
import { statusLabel, formatCurrency, formatDate } from '../lib/utils'
import './Dashboard.css'

const StatCard: React.FC<{ label: string; value: string|number; sub?: string; accent?: boolean; icon: string }> =
  ({ label, value, sub, accent, icon }) => (
  <div className={`stat-card${accent ? ' stat-card--accent' : ''}`}>
    <div className="stat-card__icon">{icon}</div>
    <div>
      <div className="stat-card__value">{value}</div>
      <div className="stat-card__label">{label}</div>
      {sub && <div className="stat-card__sub">{sub}</div>}
    </div>
  </div>
)

const Dashboard: React.FC = () => {
  const { stats, loading } = useDashboardStats()
  const navigate = useNavigate()

  if (loading) return (
    <div className="dashboard">
      <div className="dashboard__stats">
        {[...Array(6)].map((_, i) => <div key={i} className="skeleton" style={{ height: 96, borderRadius: 12 }} />)}
      </div>
    </div>
  )

  return (
    <div className="dashboard animate-in">

      <div className="dashboard__stats">
        <StatCard icon="📋" label="Total Bookings"  value={stats.totalBookings} />
        <StatCard icon="🏠" label="Active Guests"   value={stats.activeGuests}  sub="Currently checked in" accent />
        <StatCard icon="📊" label="Occupancy Rate"  value={`${stats.occupancyRate}%`} sub="This month" />
        <StatCard icon="💰" label="Revenue (Month)" value={formatCurrency(stats.revenueMonth)} />
        <StatCard icon="🔑" label="Arrivals (7d)"   value={stats.upcomingCheckins}  sub="Next 7 days" />
        <StatCard icon="🚪" label="Departures (7d)" value={stats.upcomingCheckouts} sub="Next 7 days" />
      </div>

      <div className="dashboard__charts">
        <div className="card">
          <div className="card__header"><span className="card__title">Revenue — Last 6 Months</span></div>
          <div className="card__body">
            <ResponsiveContainer width="100%" height={210}>
              <AreaChart data={stats.monthlyData} margin={{ top:4, right:8, left:0, bottom:0 }}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#1d6f6f" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="#1d6f6f" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e2" />
                <XAxis dataKey="month" tick={{ fontSize:12, fill:'#9a9a9a' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize:12, fill:'#9a9a9a' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
                <Tooltip contentStyle={{ background:'#fff', border:'1px solid #e4e4e2', borderRadius:8, fontSize:13 }}
                  formatter={(v: number) => [`$${v.toLocaleString()}`, 'Revenue']} />
                <Area type="monotone" dataKey="revenue" stroke="#1d6f6f" strokeWidth={2}
                  fill="url(#rev)" dot={{ r:3, fill:'#1d6f6f' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card__header"><span className="card__title">Bookings — Last 6 Months</span></div>
          <div className="card__body">
            <ResponsiveContainer width="100%" height={210}>
              <BarChart data={stats.monthlyData} margin={{ top:4, right:8, left:0, bottom:0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e2" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize:12, fill:'#9a9a9a' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize:12, fill:'#9a9a9a' }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip contentStyle={{ background:'#fff', border:'1px solid #e4e4e2', borderRadius:8, fontSize:13 }}
                  formatter={(v: number) => [v, 'Bookings']} />
                <Bar dataKey="bookings" fill="#c9a84c" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card__header">
          <span className="card__title">Recent Bookings</span>
          <button className="btn btn-ghost btn-sm" onClick={() => navigate('/bookings')}>View all →</button>
        </div>
        <div className="table-wrap">
          {stats.recentBookings.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state__icon">📋</div>
              <div className="empty-state__title">No bookings yet</div>
            </div>
          ) : (
            <table>
              <thead>
                <tr><th>Guest</th><th>Check In</th><th>Check Out</th><th>Nights</th><th>Amount</th><th>Status</th></tr>
              </thead>
              <tbody>
                {stats.recentBookings.map(b => (
                  <tr key={b.id} style={{ cursor:'pointer' }} onClick={() => navigate(`/bookings/${b.id}`)}>
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
                    <td className="mono">{formatCurrency(b.total_amount, b.currency)}</td>
                    <td><span className={`badge badge--${b.status}`}>{statusLabel(b.status)}</span></td>
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

export default Dashboard