import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/Auth.context.jsx'

function Login() {
  const navigate = useNavigate()
  const { login, loading, error, setError } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    try {
      await login({ email, password })
      navigate('/profile')
    } catch {
      // error handled in context
    }
  }

  return (
    <div className="min-h-screen bg-base-200 text-base-content flex items-center justify-center p-4">
      <div className="card w-full max-w-md rounded-4xl border border-base-content/10 bg-base-100 shadow-2xl backdrop-blur-xl">
        <div className="p-8">
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-[0.35em] text-base-content/60">Secure Chat</p>
            <h2 className="mt-4 text-3xl font-semibold text-base-content">Welcome Back</h2>
            <p className="mt-2 text-sm text-base-content/60">Log in to continue chatting</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content/80 text-xs uppercase tracking-[0.28em]">Email Address</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input input-bordered input-primary w-full bg-base-200 text-base-content focus:outline-none"
                required
              />
            </div>

            <div className="form-control">
              <div className="flex justify-between items-center mb-1">
                <label className="label p-0">
                  <span className="label-text text-base-content/80 text-xs uppercase tracking-[0.28em]">Password</span>
                </label>
                <a href="#" className="text-xs text-primary hover:underline font-medium">Forgot?</a>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input input-bordered input-primary w-full bg-base-200 text-base-content focus:outline-none"
                required
              />
            </div>

            {error && <p className="text-sm text-error">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full rounded-2xl text-primary-content transition-colors mt-2"
            >
              {loading ? 'Signing In...' : 'Log In'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-base-content/60">
            New to the app?{' '}
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="text-primary hover:underline font-medium link"
            >
              Create an account
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
