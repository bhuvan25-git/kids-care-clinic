import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-[#2C2C2A] text-white/60 text-center px-10 py-6 text-sm">
      <strong className="text-white">Kids Care Clinic</strong> · 23, Main Road, Chandra Layout, Vijayanagar, Bengaluru 560040 ·{' '}
      <a href="tel:9342260533" className="text-[#9FE1CB] no-underline">93422 60533</a>
      <br className="mb-1" />
      © {new Date().getFullYear()} Kids Care Clinic. All rights reserved.
    </footer>
  )
}
