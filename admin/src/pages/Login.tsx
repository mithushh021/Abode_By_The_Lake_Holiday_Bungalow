import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import './Login.css'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError(error.message); setLoading(false) }
    else navigate('/')
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-card__brand">
          <span className="login-card__logo">Abode</span>
          <span className="login-card__sub">Admin Portal</span>
        </div>

        <h2 className="login-card__title">Sign in to continue</h2>

        <form onSubmit={handleLogin} noValidate>
          <div className="field" style={{ marginBottom: '1rem' }}>
            <label>Email</label>
            <input
              type="email" placeholder="admin@example.com"
              value={email} onChange={e => setEmail(e.target.value)} required
            />
          </div>
          <div className="field" style={{ marginBottom: '1.5rem' }}>
            <label>Password</label>
            <input
              type="password" placeholder="••••••••"
              value={password} onChange={e => setPassword(e.target.value)} required
            />
          </div>

          {error && <div className="login-error">{error}</div>}

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="login-hint">
          Only authorised staff can access this portal.<br />
          Contact your administrator if you need access.
        </p>
      </div>
    </div>
  )
}

export default Login