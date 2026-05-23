import React from 'react'

const WaIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M11.999 2.001c-5.514 0-9.998 4.484-9.998 9.998 0 1.76.462 3.408 1.267 4.847L2 22l5.297-1.248A9.948 9.948 0 0011.999 22c5.514 0 9.998-4.484 9.998-9.998S17.513 2.001 11.999 2.001z" />
  </svg>
)

export default function Hero({ onBook }) {
  return (
    <section className="grid md:grid-cols-2 items-center gap-8 px-10 pt-16 pb-12 bg-gradient-to-br from-[#E1F5EE] via-[#f0faf6] to-white relative overflow-hidden">
      {/* bg circle */}
      <div className="absolute w-96 h-96 bg-[#9FE1CB] rounded-full -top-36 -right-20 opacity-30 pointer-events-none" />

      {/* Left */}
      <div className="relative z-10">
        <div className="inline-flex items-center gap-1.5 bg-[#FAC775] text-[#BA7517] font-extrabold text-xs px-3 py-1 rounded-full mb-4">
          <svg className="w-3.5 h-3.5 fill-[#BA7517]" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          Rated 4.5 · Trusted by Families
        </div>

        <h1 className="text-5xl font-black text-[#085041] leading-tight mb-5">
          Little Patients,<br />
          <em className="font-[Lora] italic not-italic text-[#D85A30]">Big Care.</em>
        </h1>
        <p className="text-[#5F5E5A] text-lg max-w-md mb-8">
          Compassionate paediatric healthcare for children of all ages. From newborns to teenagers — your child's health is our priority.
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={onBook}
            className="flex items-center gap-2 bg-[#1D9E75] hover:bg-[#085041] text-white font-extrabold px-6 py-3 rounded-full transition-all duration-200 hover:-translate-y-0.5 border-none cursor-pointer text-base"
          >
            📅 Book Appointment
          </button>
          <a
            href="tel:9342260533"
            className="flex items-center gap-2 bg-[#1D9E75] hover:bg-[#085041] text-white font-extrabold px-6 py-3 rounded-full transition-all duration-200 hover:-translate-y-0.5 no-underline text-base"
          >
            📞 Call Us Now
          </a>
          <a
            href="https://wa.me/919342260533"
            className="flex items-center gap-2 bg-[#1D9E75] hover:bg-[#085041] text-white font-extrabold px-6 py-3 rounded-full transition-all duration-200 hover:-translate-y-0.5 no-underline text-base"
          >
            <WaIcon /> WhatsApp
          </a>
        </div>
      </div>

      {/* Right — info card */}
      <div className="flex justify-center z-10">
        <div className="bg-white rounded-3xl p-8 shadow-xl max-w-xs w-full">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[#BA7517] text-lg">★★★★½</span>
            <span className="font-extrabold">4.5</span>
            <span className="text-[#5F5E5A] text-sm">(111 reviews)</span>
          </div>
          <div className="w-20 h-20 bg-[#E1F5EE] rounded-full flex items-center justify-center text-5xl mx-auto mb-4">🩺</div>
          <h3 className="font-extrabold text-[#085041] text-center">Kids Care Clinic</h3>
          <p className="text-[#5F5E5A] text-sm text-center mt-1 mb-4">Chandra Layout, Vijayanagar<br />Bengaluru, Karnataka 560040</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {['Open Now', 'Walk-ins Welcome', 'All Ages'].map(t => (
              <span key={t} className="bg-[#E1F5EE] text-[#085041] text-xs font-bold px-3 py-1 rounded-full">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
