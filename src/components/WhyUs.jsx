import React from 'react'

const reasons = [
  'Experienced paediatrician with years of specialised practice',
  'Child-friendly clinic atmosphere that eases anxiety',
  'Personalised care plans tailored to each child\'s needs',
  'Easy access via WhatsApp for quick consultations',
  'Located in the heart of Vijayanagar, central Bengaluru',
]

const stats = [
  { num: '4.5★', label: 'Google Rating' },
  { num: '111+', label: 'Happy Families' },
  { num: 'All Ages', label: 'Newborn to Teen' },
  { num: 'Walk-in', label: 'Welcome Anytime' },
]

export default function WhyUs() {
  return (
    <section id="about" className="bg-[#085041] text-white px-10 py-16 grid md:grid-cols-2 gap-12 items-center">
      <div>
        <p className="text-xs font-extrabold uppercase tracking-widest text-[#9FE1CB] mb-1">Why Choose Us</p>
        <h2 className="text-3xl font-black mb-3">A clinic that feels like family</h2>
        <p className="text-white/70 mb-8">
          We combine expert medical care with a warm, child-friendly environment where kids feel safe and parents feel heard.
        </p>
        <ul className="flex flex-col gap-4">
          {reasons.map(r => (
            <li key={r} className="flex items-start gap-3 text-white/90 text-sm">
              <div className="w-6 h-6 bg-[#9FE1CB] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 stroke-[#085041]" viewBox="0 0 14 14" fill="none" strokeWidth="2.5">
                  <polyline points="2,7 5.5,10.5 12,3.5" />
                </svg>
              </div>
              {r}
            </li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {stats.map(s => (
          <div key={s.label} className="bg-white/10 border border-white/10 rounded-2xl p-6">
            <div className="text-3xl font-black text-[#9FE1CB] leading-none mb-1">{s.num}</div>
            <div className="text-xs text-white/60 font-semibold">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
