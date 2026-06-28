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
    // אתחול מנוע הגלילה
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: true,
      touchMultiplier: 0.8,
      syncTouch: true, // משפר משמעותית את הביצועים בטלפונים
      infinite: false,
    })

    // חשיפה גלובלית לצורך ניווט עתידי (כמו scroll to)
    window.lenis = lenis
    
    // סנכרון עם GSAP
    lenis.on('scroll', ScrollTrigger.update)

    // לופ האנימציה (Request Animation Frame)
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // ניקוי בעת סגירת הקומפוננטה
    return () => {
      window.lenis = null
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
