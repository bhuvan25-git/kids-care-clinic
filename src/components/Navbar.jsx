import React from 'react'

export default function Navbar({ onBook }) {
  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-sky-DEFAULT flex items-center justify-between px-10 py-4">
      <a href="/" className="flex items-center gap-2 font-black text-xl text-green-dark no-underline">
        <div className="w-10 h-10 bg-[#1D9E75] rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
            <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402C1 4.201 4.197 2 7.5 2c1.863 0 3.48.743 4.5 1.868C13.02 2.743 14.637 2 16.5 2 19.803 2 23 4.201 23 7.191c0 4.105-5.369 8.863-11 14.402z" />
          </svg>
        </div>
        Kids Care Clinic
      </a>
      <ul className="hidden md:flex items-center gap-8 list-none">
        <li><a href="#services" className="text-[#5F5E5A] font-bold text-sm hover:text-[#1D9E75] no-underline transition-colors">Services</a></li>
        <li><a href="#about"    className="text-[#5F5E5A] font-bold text-sm hover:text-[#1D9E75] no-underline transition-colors">About</a></li>
        <li><a href="#hours"   className="text-[#5F5E5A] font-bold text-sm hover:text-[#1D9E75] no-underline transition-colors">Hours</a></li>
      </ul>
    </nav>
  )
}
