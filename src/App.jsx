import React, { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

import Navbar from './components/Navbar'
import HeroScroll from './components/HeroScroll'
import About from './components/About'
import Features from './components/Features'
import Gallery from './components/Gallery'
import QuoteForm from './components/QuoteForm'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'

gsap.registerPlugin(ScrollTrigger, useGSAP)

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div className="app-container">
      <CustomCursor />
      <Navbar />
      <main>
        <HeroScroll />
        <div className="content-wrapper">
          <About />
          <Features />
          <Gallery />
          <QuoteForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
