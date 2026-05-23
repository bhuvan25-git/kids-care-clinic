import React, { useState, useEffect } from 'react'
import { sb } from '../lib/supabase'

const TIMES = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM']

function SuccessScreen({ data, onClose }) {
  const dateObj = new Date(data.date + 'T00:00:00')
  const formatted = dateObj.toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
  return (
    <div className="text-center py-2">
      <div className="w-18 h-18 w-20 h-20 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center text-4xl mx-auto mb-4 shadow-[0_0_0_10px_rgba(29,158,117,0.1)]">
        ✅
      </div>
      <h3 className="text-xl font-black text-[#085041] mb-1">Appointment Booked!</h3>
      <p className="text-[#5F5E5A] text-sm mb-5">Here's a summary of your request</p>

      <div className="bg-[#E1F5EE] rounded-2xl p-4 text-left mb-4">
        {[
          { label: 'Name',       value: data.name },
          { label: 'Phone',      value: data.phone },
          { label: "Child's Age",value: data.age || 'Not specified' },
          { label: 'Date',       value: formatted },
          { label: 'Time',       value: data.time },
          { label: 'Reason',     value: data.reason || 'Not specified' },
        ].map(r => (
          <div key={r.label} className="flex items-center gap-3 py-1.5 border-b border-green-100 last:border-0 text-sm">
            <span className="text-[#5F5E5A] font-semibold w-24 flex-shrink-0">{r.label}</span>
            <span className="font-extrabold text-[#085041]">{r.value}</span>
          </div>
        ))}
      </div>

      <div className="bg-yellow-50 rounded-xl px-4 py-3 text-xs text-yellow-800 font-semibold flex items-center gap-2 mb-5">
        📞 We will call you on <strong>{data.phone}</strong> to confirm the slot.
      </div>

      <button
        onClick={onClose}
        className="w-full py-3 bg-[#1D9E75] hover:bg-[#085041] text-white font-extrabold rounded-full transition-colors border-none cursor-pointer text-base"
      >
        Done
      </button>
    </div>
  )
}

function InquirySuccess({ onClose }) {
  return (
    <div className="text-center py-6">
      <div className="text-5xl mb-4">📨</div>
      <h3 className="text-xl font-black text-[#085041] mb-2">Message Sent!</h3>
      <p className="text-[#5F5E5A] text-sm mb-6">We've received your message and will get back to you soon.</p>
      <button onClick={onClose} className="w-full py-3 bg-[#1D9E75] hover:bg-[#085041] text-white font-extrabold rounded-full transition-colors border-none cursor-pointer text-base">
        Done
      </button>
    </div>
  )
}

export default function BookingModal({ open, onClose }) {
  const [tab, setTab] = useState('booking')
  const [bookingDone, setBookingDone] = useState(false)
  const [inquiryDone, setInquiryDone] = useState(false)
  const [bookingData, setBookingData] = useState(null)

  // form fields — booking
  const [bName, setBName]     = useState('')
  const [bPhone, setBPhone]   = useState('')
  const [bAge, setbAge]       = useState('')
  const [bDate, setBDate]     = useState('')
  const [bTime, setBTime]     = useState(TIMES[0])
  const [bReason, setBReason] = useState('')
  const [bLoading, setBLoading] = useState(false)

  // form fields — inquiry
  const [iName, setIName]       = useState('')
  const [iPhone, setIPhone]     = useState('')
  const [iMessage, setIMessage] = useState('')
  const [iLoading, setILoading] = useState(false)

  const today = new Date().toISOString().split('T')[0]

  // reset on open
  useEffect(() => {
    if (open) {
      setTab('booking')
      setBookingDone(false)
      setInquiryDone(false)
      setBName(''); setBPhone(''); setbAge(''); setBDate(''); setBTime(TIMES[0]); setBReason('')
      setIName(''); setIPhone(''); setIMessage('')
      setBLoading(false); setILoading(false)
    }
  }, [open])

  async function handleBook(e) {
    e.preventDefault()
    if (!bName || !bPhone || !bDate) return
    setBLoading(true)

    const snap = { name: bName, phone: bPhone, age: bAge, date: bDate, time: bTime, reason: bReason }
    setBookingData(snap)
    setBookingDone(true)
    setBLoading(false)

    // background save
    try {
      await sb.from('bookings').insert({
        name: bName, phone: bPhone,
        child_age: bAge || null, date: bDate, time: bTime,
        reason: bReason || null, status: 'pending',
      })
    } catch (err) {
      console.warn('Supabase save failed:', err)
    }
  }

  async function handleInquiry(e) {
    e.preventDefault()
    if (!iName || !iPhone || !iMessage) return
    setILoading(true)
    setInquiryDone(true)
    setILoading(false)

    try {
      await sb.from('inquiries').insert({ name: iName, phone: iPhone, message: iMessage })
    } catch (err) {
      console.warn('Supabase save failed:', err)
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-white rounded-3xl p-7 w-full max-w-md max-h-[90vh] overflow-y-auto relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-[#F1EFE8] rounded-full flex items-center justify-center text-[#5F5E5A] border-none cursor-pointer hover:bg-gray-200 text-lg"
        >✕</button>

        {!bookingDone && !inquiryDone && (
          <>
            <h2 className="text-xl font-black text-[#085041] mb-1">Get in Touch</h2>
            <p className="text-[#5F5E5A] text-sm mb-5">Book an appointment or send us a message.</p>
            <div className="flex gap-2 mb-6">
              {[{ key: 'booking', label: '📅 Book Appointment' }, { key: 'inquiry', label: '💬 Send Inquiry' }].map(t => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`flex-1 py-2 rounded-xl font-bold text-sm border-2 cursor-pointer transition-all ${tab === t.key ? 'bg-[#1D9E75] text-white border-[#1D9E75]' : 'bg-[#F1EFE8] text-[#5F5E5A] border-[#F1EFE8]'}`}
                >{t.label}</button>
              ))}
            </div>
          </>
        )}

        {/* BOOKING TAB */}
        {tab === 'booking' && (
          bookingDone
            ? <SuccessScreen data={bookingData} onClose={onClose} />
            : (
              <form onSubmit={handleBook} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Parent's Name *"><input required value={bName} onChange={e => setBName(e.target.value)} placeholder="Full name" /></Field>
                  <Field label="Phone Number *"><input required type="tel" value={bPhone} onChange={e => setBPhone(e.target.value)} placeholder="10-digit number" /></Field>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Child's Age"><input value={bAge} onChange={e => setbAge(e.target.value)} placeholder="e.g. 3 years" /></Field>
                  <Field label="Preferred Date *"><input required type="date" min={today} value={bDate} onChange={e => setBDate(e.target.value)} /></Field>
                </div>
                <Field label="Preferred Time *">
                  <select value={bTime} onChange={e => setBTime(e.target.value)}>
                    {TIMES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </Field>
                <Field label="Reason for Visit">
                  <textarea value={bReason} onChange={e => setBReason(e.target.value)} placeholder="Brief description..." rows={3} />
                </Field>
                <button
                  type="submit"
                  disabled={bLoading}
                  className="w-full py-3 bg-[#1D9E75] hover:bg-[#085041] disabled:bg-[#9FE1CB] text-white font-extrabold rounded-full transition-colors border-none cursor-pointer text-base mt-1"
                >
                  {bLoading ? 'Booking…' : 'Book Appointment'}
                </button>
              </form>
            )
        )}

        {/* INQUIRY TAB */}
        {tab === 'inquiry' && (
          inquiryDone
            ? <InquirySuccess onClose={onClose} />
            : (
              <form onSubmit={handleInquiry} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Your Name *"><input required value={iName} onChange={e => setIName(e.target.value)} placeholder="Full name" /></Field>
                  <Field label="Phone Number *"><input required type="tel" value={iPhone} onChange={e => setIPhone(e.target.value)} placeholder="10-digit number" /></Field>
                </div>
                <Field label="Your Message *">
                  <textarea required value={iMessage} onChange={e => setIMessage(e.target.value)} placeholder="How can we help you?" rows={5} />
                </Field>
                <button
                  type="submit"
                  disabled={iLoading}
                  className="w-full py-3 bg-[#1D9E75] hover:bg-[#085041] disabled:bg-[#9FE1CB] text-white font-extrabold rounded-full transition-colors border-none cursor-pointer text-base mt-1"
                >
                  {iLoading ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            )
        )}
      </div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-bold text-[#5F5E5A]">{label}</label>
      {React.cloneElement(children, {
        className: 'w-full px-3 py-2.5 border-[1.5px] border-gray-200 rounded-xl font-[Nunito] text-sm text-[#2C2C2A] outline-none focus:border-[#1D9E75] transition-colors bg-white resize-y'
      })}
    </div>
  )
}
