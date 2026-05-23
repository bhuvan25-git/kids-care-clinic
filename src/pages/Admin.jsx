import React, { useState, useEffect } from 'react'
import { sb } from '../lib/supabase'

function Login({ onLogin }) {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true); setError('')
    const { error } = await sb.auth.signInWithPassword({ email, password })
    if (error) { setError('Incorrect email or password.'); setLoading(false) }
    else onLogin()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E1F5EE] to-white px-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-sm">
        <div className="flex items-center gap-2 font-black text-[#085041] text-xl mb-6">
          <div className="w-9 h-9 bg-[#1D9E75] rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402C1 4.201 4.197 2 7.5 2c1.863 0 3.48.743 4.5 1.868C13.02 2.743 14.637 2 16.5 2 19.803 2 23 4.201 23 7.191c0 4.105-5.369 8.863-11 14.402z" /></svg>
          </div>
          Kids Care Clinic
        </div>
        <h2 className="text-2xl font-black text-[#085041] mb-1">Admin Login</h2>
        <p className="text-[#5F5E5A] text-sm mb-6">Sign in to manage bookings and inquiries</p>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-bold text-[#5F5E5A] mb-1">Email</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
              placeholder="admin@kidsclinic.com"
              className="w-full px-3 py-2.5 border-[1.5px] border-gray-200 rounded-xl text-sm outline-none focus:border-[#1D9E75] transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#5F5E5A] mb-1">Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2.5 border-[1.5px] border-gray-200 rounded-xl text-sm outline-none focus:border-[#1D9E75] transition-colors" />
          </div>
          {error && <p className="text-red-600 text-xs">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full py-3 bg-[#1D9E75] hover:bg-[#085041] text-white font-extrabold rounded-full transition-colors border-none cursor-pointer disabled:opacity-60">
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}

function Badge({ status }) {
  const map = {
    pending:   'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  }
  return (
    <span className={`inline-block px-3 py-0.5 rounded-full text-xs font-extrabold ${map[status] || 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  )
}

function Dashboard({ onLogout }) {
  const [panel, setPanel]         = useState('bookings')
  const [bookings, setBookings]   = useState([])
  const [inquiries, setInquiries] = useState([])
  const [filter, setFilter]       = useState('all')
  const [loading, setLoading]     = useState(true)

  async function load() {
    setLoading(true)
    const [b, i] = await Promise.all([
      sb.from('bookings').select('*').order('created_at', { ascending: false }),
      sb.from('inquiries').select('*').order('created_at', { ascending: false }),
    ])
    setBookings(b.data || [])
    setInquiries(i.data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function updateStatus(id, status) {
    await sb.from('bookings').update({ status }).eq('id', id)
    load()
  }

  const displayed = filter === 'all' ? bookings : bookings.filter(b => b.status === filter)

  const stats = [
    { label: 'Total',     value: bookings.length,                                       color: 'text-[#085041]' },
    { label: 'Pending',   value: bookings.filter(b => b.status === 'pending').length,   color: 'text-yellow-600' },
    { label: 'Confirmed', value: bookings.filter(b => b.status === 'confirmed').length, color: 'text-green-600' },
    { label: 'Cancelled', value: bookings.filter(b => b.status === 'cancelled').length, color: 'text-red-600' },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-52 bg-[#0A2E23] text-white flex flex-col flex-shrink-0">
        <div className="flex items-center gap-2 px-5 py-5 border-b border-white/10 font-black text-sm">
          <div className="w-8 h-8 bg-[#1D9E75] rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402C1 4.201 4.197 2 7.5 2c1.863 0 3.48.743 4.5 1.868C13.02 2.743 14.637 2 16.5 2 19.803 2 23 4.201 23 7.191c0 4.105-5.369 8.863-11 14.402z" /></svg>
          </div>
          Kids Care
        </div>
        <nav className="flex-1 py-3">
          {[
            { key: 'bookings',  label: 'Bookings',  icon: 'M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z' },
            { key: 'inquiries', label: 'Inquiries', icon: 'M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z' },
          ].map(n => (
            <button key={n.key} onClick={() => setPanel(n.key)}
              className={`w-full flex items-center gap-3 px-5 py-3 text-sm font-bold border-l-[3px] transition-all cursor-pointer bg-transparent border-none text-left
                ${panel === n.key ? 'text-white border-[#1D9E75] bg-white/5' : 'text-white/50 border-transparent hover:text-white hover:bg-white/5'}`}>
              <svg className="w-4 h-4 fill-current flex-shrink-0" viewBox="0 0 24 24"><path d={n.icon} /></svg>
              {n.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={onLogout}
            className="w-full py-2 bg-white/10 border border-white/10 rounded-lg text-white/70 text-xs font-bold hover:bg-white/20 cursor-pointer">
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <h1 className="font-black text-[#085041] text-lg">
            {panel === 'bookings' ? 'Appointment Bookings' : 'Patient Inquiries'}
          </h1>
          <button onClick={load} className="px-4 py-1.5 bg-[#E1F5EE] text-[#085041] font-bold text-sm rounded-lg hover:bg-[#9FE1CB] transition-colors border-none cursor-pointer">
            ↻ Refresh
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {panel === 'bookings' && (
            <>
              {/* Stats */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                {stats.map(s => (
                  <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm">
                    <p className="text-xs font-bold text-[#5F5E5A] uppercase tracking-wide mb-1">{s.label}</p>
                    <p className={`text-4xl font-black ${s.color}`}>{s.value}</p>
                  </div>
                ))}
              </div>

              {/* Table */}
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                  <h3 className="font-extrabold text-[#2C2C2A]">All Bookings</h3>
                  <div className="flex gap-2">
                    {['all', 'pending', 'confirmed'].map(f => (
                      <button key={f} onClick={() => setFilter(f)}
                        className={`px-3 py-1 rounded-full text-xs font-bold border-[1.5px] cursor-pointer capitalize transition-all
                          ${filter === f ? 'bg-[#1D9E75] text-white border-[#1D9E75]' : 'bg-white text-[#5F5E5A] border-gray-200 hover:border-[#1D9E75]'}`}>
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
                {loading ? (
                  <p className="text-center text-[#5F5E5A] py-10 text-sm">Loading…</p>
                ) : displayed.length === 0 ? (
                  <p className="text-center text-[#5F5E5A] py-10 text-sm">No bookings found.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50">
                          {['Name', 'Phone', 'Child Age', 'Date', 'Time', 'Reason', 'Status', 'Actions'].map(h => (
                            <th key={h} className="text-left px-5 py-3 text-xs font-extrabold text-[#5F5E5A] uppercase tracking-wide border-b border-gray-100">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {displayed.map(b => (
                          <tr key={b.id} className="hover:bg-gray-50 border-b border-gray-50 last:border-0">
                            <td className="px-5 py-3 font-bold text-sm text-[#2C2C2A]">{b.name}</td>
                            <td className="px-5 py-3 text-sm text-[#5F5E5A]">{b.phone}</td>
                            <td className="px-5 py-3 text-sm text-[#5F5E5A]">{b.child_age || '–'}</td>
                            <td className="px-5 py-3 text-sm text-[#5F5E5A]">{b.date ? new Date(b.date + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '–'}</td>
                            <td className="px-5 py-3 text-sm text-[#5F5E5A]">{b.time || '–'}</td>
                            <td className="px-5 py-3 text-sm text-[#5F5E5A] max-w-[160px] truncate">{b.reason || '–'}</td>
                            <td className="px-5 py-3"><Badge status={b.status} /></td>
                            <td className="px-5 py-3">
                              <div className="flex gap-1">
                                {b.status !== 'confirmed' && (
                                  <button onClick={() => updateStatus(b.id, 'confirmed')}
                                    className="px-2 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-lg hover:bg-green-200 border-none cursor-pointer">
                                    Confirm
                                  </button>
                                )}
                                {b.status !== 'cancelled' && (
                                  <button onClick={() => updateStatus(b.id, 'cancelled')}
                                    className="px-2 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-lg hover:bg-red-200 border-none cursor-pointer">
                                    Cancel
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}

          {panel === 'inquiries' && (
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="font-extrabold text-[#2C2C2A]">Patient Inquiries</h3>
              </div>
              {loading ? (
                <p className="text-center text-[#5F5E5A] py-10 text-sm">Loading…</p>
              ) : inquiries.length === 0 ? (
                <p className="text-center text-[#5F5E5A] py-10 text-sm">No inquiries yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        {['Name', 'Phone', 'Message', 'Received'].map(h => (
                          <th key={h} className="text-left px-5 py-3 text-xs font-extrabold text-[#5F5E5A] uppercase tracking-wide border-b border-gray-100">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {inquiries.map(i => (
                        <tr key={i.id} className="hover:bg-gray-50 border-b border-gray-50 last:border-0">
                          <td className="px-5 py-3 font-bold text-sm text-[#2C2C2A]">{i.name}</td>
                          <td className="px-5 py-3 text-sm text-[#5F5E5A]">{i.phone}</td>
                          <td className="px-5 py-3 text-sm text-[#5F5E5A] max-w-xs">{i.message}</td>
                          <td className="px-5 py-3 text-sm text-[#5F5E5A]">
                            {new Date(i.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default function Admin() {
  const [authed, setAuthed] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    sb.auth.getSession().then(({ data }) => {
      if (data.session) setAuthed(true)
      setChecking(false)
    })
  }, [])

  async function handleLogout() {
    await sb.auth.signOut()
    setAuthed(false)
  }

  if (checking) return <div className="min-h-screen flex items-center justify-center text-[#5F5E5A]">Loading…</div>
  if (!authed)  return <Login onLogin={() => setAuthed(true)} />
  return <Dashboard onLogout={handleLogout} />
}
