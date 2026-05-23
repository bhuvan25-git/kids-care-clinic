import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import Services from '../components/Services'
import WhyUs from '../components/WhyUs'
import ContactSection from '../components/ContactSection'
import CTABanner from '../components/CTABanner'
import Footer from '../components/Footer'
import BookingModal from '../components/BookingModal'

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <>
      <Navbar onBook={() => setModalOpen(true)} />
      <Hero onBook={() => setModalOpen(true)} />
      <Marquee />
      <Services />
      <WhyUs />
      <ContactSection />
      <CTABanner onBook={() => setModalOpen(true)} />
      <Footer />
      <BookingModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
