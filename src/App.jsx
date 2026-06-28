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
import Services from './components/Services'

gsap.registerPlugin(ScrollTrigger, useGSAP)

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,       // קצת הארכתי את הזמן כדי לתת תחושת בלימה רכה יותר
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      
      // כאן הקסם קורה למובייל:
      smoothTouch: true,   // עכשיו Lenis שולט גם במומנטום של הטלפון
      touchMultiplier: 0.8, // במקום פי 2, הורדנו את זה אל מתחת ל-1 כדי שהטלפון ירגיש "כבד" ויבלום מהר
      infinite: false,
    })

    // חשוב מאוד: מסנכרן את הסרטון והאנימציות עם הגלילה החדשה כדי שלא יהיו קפיצות
    lenis.on('scroll', ScrollTrigger.update)

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
          <Services />
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
