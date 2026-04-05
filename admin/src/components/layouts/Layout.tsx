import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import './Layout.css'

const pageTitles: Record<string, string> = {
  '/':           'Dashboard',
  '/bookings':   'Bookings',
  '/calendar':   'Calendar',
  '/guests':     'Guests',
  '/checkinout': 'Check In / Out',
}

const Layout: React.FC = () => {
  const { pathname } = useLocation()
  const base = '/' + pathname.split('/')[1]
  const title = pageTitles[base] ?? 'Admin'
  const dateStr = new Date().toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    <div className="layout">
      <Sidebar />
      <div className="layout__main">
        <header className="layout__header">
          <div className="layout__header-left">
            <h1 className="layout__page-title">{title}</h1>
            <span className="layout__date">{dateStr}</span>
          </div>
          <div className="layout__avatar">A</div>
        </header>
        <main className="layout__content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout