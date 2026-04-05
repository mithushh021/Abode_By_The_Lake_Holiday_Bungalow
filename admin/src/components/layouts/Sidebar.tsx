import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import './Sidebar.css'

const nav = [
  { to: '/',           icon: '⊞',  label: 'Dashboard'   },
  { to: '/bookings',   icon: '📋', label: 'Bookings'    },
  { to: '/calendar',   icon: '📅', label: 'Calendar'    },
  { to: '/guests',     icon: '👤', label: 'Guests'      },
  { to: '/checkinout', icon: '🔑', label: 'Check In/Out'},
]

const Sidebar: React.FC = () => {
  const navigate = useNavigate()
  const [signingOut, setSigningOut] = useState(false)

  const handleSignOut = async () => {
    setSigningOut(true)
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <span className="sidebar__logo">Abode</span>
        <span className="sidebar__sub">Admin Portal</span>
      </div>

      <nav className="sidebar__nav">
        {nav.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `sidebar__link${isActive ? ' sidebar__link--active' : ''}`
            }
          >
            <span className="sidebar__icon">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__footer">
        <div className="sidebar__property">
          <span className="sidebar__property-dot" />
          <div>
            <div className="sidebar__property-name">Abode by the Lake</div>
            <div className="sidebar__property-loc">Kandy, Sri Lanka</div>
          </div>
        </div>
        <button className="sidebar__signout" onClick={handleSignOut} disabled={signingOut}>
          {signingOut ? 'Signing out…' : '↩ Sign Out'}
        </button>
      </div>
    </aside>
  )
}

export default Sidebar