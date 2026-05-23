import React from 'react'

const MAPS_URL = 'https://www.google.com/maps/dir/?api=1&destination=Kids+Care+Clinic+Income+Tax+Layout+23+Main+Road+Chandra+Layout+Hampi+Nagar+Binny+Mills+Employees+Colony+Vijayanagar+Bengaluru+Karnataka+560040'

export default function ContactSection() {
  return (
    <section id="hours" className="bg-[#E1F5EE] px-10 py-16 grid md:grid-cols-2 gap-8">

      {/* Clinic Hours */}
      <div className="bg-white rounded-2xl p-7">
        <h3 className="font-extrabold text-[#085041] text-lg flex items-center gap-2 mb-5">
          <svg className="w-5 h-5 fill-[#1D9E75]" viewBox="0 0 24 24">
            <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 18a8 8 0 110-16 8 8 0 010 16zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
          </svg>
          Clinic Hours
        </h3>
        {[
          { day: 'Monday – Saturday', time: '9:00 AM – 3:00 PM', badge: true },
          { day: 'Evening Slots',     time: 'By appointment' },
          { day: 'Sunday',           time: 'Closed', closed: true },
        ].map(r => (
          <div key={r.day} className="flex justify-between items-center py-2 border-b border-[#F1EFE8] last:border-0 text-sm">
            <span className="text-[#5F5E5A] font-semibold">{r.day}</span>
            <div className="flex items-center gap-2">
              <span className={`font-bold ${r.closed ? 'text-red-700' : 'text-[#2C2C2A]'}`}>{r.time}</span>
              {r.badge && <span className="bg-green-100 text-green-800 text-xs font-extrabold px-2 py-0.5 rounded-full">Open</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Contact */}
      <div className="bg-white rounded-2xl p-7">
        <h3 className="font-extrabold text-[#085041] text-lg flex items-center gap-2 mb-5">
          <svg className="w-5 h-5 fill-[#1D9E75]" viewBox="0 0 24 24">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
          Contact Us
        </h3>

        {[
          {
            icon: <svg className="w-4 h-4 fill-[#1D9E75]" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>,
            detail: '93422 60533', sub: 'Call for appointments',
          },
          {
            icon: <svg className="w-4 h-4 fill-[#1D9E75]" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M11.999 2.001c-5.514 0-9.998 4.484-9.998 9.998 0 1.76.462 3.408 1.267 4.847L2 22l5.297-1.248A9.948 9.948 0 0011.999 22c5.514 0 9.998-4.484 9.998-9.998S17.513 2.001 11.999 2.001z"/></svg>,
            detail: 'WhatsApp Us', sub: 'Quick consultation',
          },
          {
            icon: <svg className="w-4 h-4 fill-[#1D9E75]" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>,
            detail: '23, Main Road, Chandra Layout', sub: 'Vijayanagar, Bengaluru 560040',
          },
        ].map((r, i) => (
          <div key={i} className="flex items-center gap-3 py-2.5 border-b border-[#F1EFE8] last:border-0">
            <div className="w-9 h-9 bg-[#E1F5EE] rounded-xl flex items-center justify-center flex-shrink-0">{r.icon}</div>
            <div>
              <div className="font-bold text-[#2C2C2A] text-sm">{r.detail}</div>
              <div className="text-xs text-[#5F5E5A]">{r.sub}</div>
            </div>
          </div>
        ))}

        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 flex items-center justify-center gap-2 w-full py-3 border-2 border-[#1D9E75] text-[#085041] font-extrabold rounded-full hover:bg-[#E1F5EE] transition-colors no-underline text-sm"
        >
          <svg className="w-4 h-4 fill-[#1D9E75]" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
          Navigate to Clinic
        </a>
      </div>
    </section>
  )
}
