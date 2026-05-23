import React from 'react'

export default function CTABanner({ onBook }) {
  return (
    <section className="bg-[#D85A30] px-10 py-14 text-center relative overflow-hidden">
      <div className="absolute w-72 h-72 bg-white/5 rounded-full -top-20 -left-20 pointer-events-none" />
      <div className="absolute w-48 h-48 bg-white/5 rounded-full -bottom-14 -right-8 pointer-events-none" />
      <h2 className="text-3xl font-black text-white mb-2 relative z-10">Your child's health can't wait.</h2>
      <p className="text-white/85 mb-7 relative z-10">Call us today or drop a WhatsApp message — we're here to help.</p>
      <div className="flex flex-wrap gap-3 justify-center relative z-10">
        <button
          onClick={onBook}
          className="bg-white text-[#D85A30] font-extrabold px-6 py-3 rounded-full hover:opacity-90 transition-opacity border-none cursor-pointer text-base"
        >📅 Book Appointment</button>
        <a href="tel:9342260533" className="bg-white text-[#D85A30] font-extrabold px-6 py-3 rounded-full hover:opacity-90 transition-opacity no-underline text-base">
          📞 93422 60533
        </a>
        <a href="https://wa.me/919342260533" className="border-2 border-white text-white font-extrabold px-6 py-3 rounded-full hover:bg-white/10 transition-colors no-underline flex items-center gap-2 text-base">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M11.999 2.001c-5.514 0-9.998 4.484-9.998 9.998 0 1.76.462 3.408 1.267 4.847L2 22l5.297-1.248A9.948 9.948 0 0011.999 22c5.514 0 9.998-4.484 9.998-9.998S17.513 2.001 11.999 2.001z"/>
          </svg>
          Chat on WhatsApp
        </a>
      </div>
    </section>
  )
}
