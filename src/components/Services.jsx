import React from 'react'

const services = [
  { icon: '👶', label: 'Newborn Care',            color: '#E1F5EE', desc: "Dedicated support for your baby's earliest days, including health checks and feeding guidance." },
  { icon: '💉', label: 'Vaccinations',             color: '#FAECE7', desc: 'Complete immunisation programmes following the national schedule to keep your child protected.' },
  { icon: '📏', label: 'Growth Monitoring',        color: '#FBEAF0', desc: 'Regular tracking of height, weight, and developmental milestones so nothing gets missed.' },
  { icon: '🌡️', label: 'Fever & Infections',      color: '#EAF3DE', desc: 'Prompt diagnosis and treatment for common childhood illnesses — ear infections, colds, and more.' },
  { icon: '🧠', label: 'Developmental Assessment', color: '#FAEEDA', desc: 'Early detection of developmental delays with personalised guidance and referrals as needed.' },
  { icon: '🥦', label: 'Nutrition Counselling',    color: '#EEEDFE', desc: 'Expert advice on feeding, healthy eating habits, and managing food allergies in children.' },
]

export default function Services() {
  return (
    <section id="services" className="px-10 py-16">
      <p className="text-xs font-extrabold uppercase tracking-widest text-[#D85A30] mb-1">What We Offer</p>
      <h2 className="text-3xl font-black text-[#085041] mb-2">Comprehensive Paediatric Care</h2>
      <p className="text-[#5F5E5A] mb-10 max-w-lg">
        Everything your child needs — from their very first check-up to adolescent health — under one caring roof.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map(s => (
          <div key={s.label} className="bg-[#F1EFE8] rounded-2xl p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 cursor-default">
            <div className="w-13 h-13 rounded-xl flex items-center justify-center text-2xl mb-4 w-12 h-12" style={{ background: s.color }}>
              {s.icon}
            </div>
            <h3 className="font-extrabold text-[#2C2C2A] mb-1">{s.label}</h3>
            <p className="text-[#5F5E5A] text-sm leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
