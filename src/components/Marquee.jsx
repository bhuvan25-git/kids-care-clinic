import React from 'react'

const items = [
  'General Paediatrics', 'Vaccinations', 'Growth Monitoring', 'Newborn Care',
  'Nutrition Counselling', 'Fever & Infections', 'Developmental Assessment', 'Child Health Check-ups',
]

export default function Marquee() {
  const doubled = [...items, ...items]
  return (
    <div className="bg-[#1D9E75] py-3 overflow-hidden whitespace-nowrap">
      <div className="inline-block marquee-animation">
        {doubled.map((item, i) => (
          <span key={i} className="font-bold text-sm text-white mx-8 opacity-95">
            <span className="mr-2 opacity-70">✦</span>{item}
          </span>
        ))}
      </div>
    </div>
  )
}
