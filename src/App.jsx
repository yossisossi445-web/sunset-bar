import React from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import HeroScroll from './components/HeroScroll';
import About from './components/About';
// ... אם יש לך עוד אימפורטים של קומפוננטות כמו Gallery או Footer, תשאיר אותם פה

// רישום וחיבור גלובלי של ה-ScrollTrigger ל-Lenis
gsap.registerPlugin(ScrollTrigger);
if (typeof window !== 'undefined') {
  ScrollTrigger.clearScrollMemory();
  ScrollTrigger.defaults({ scroller: window });
}

function App() {
  return (
    <ReactLenis root options={{ 
      duration: 1.2,       // משך זמן הגלילה (שניות) - יוצר את האפקט החלק
      lerp: 0.06,          // ככל שהמספר נמוך יותר, הברקס כבד ומרוסן יותר (0.06 זה מעולה לברקס במובייל)
      smoothTouch: true,   // מפעיל את הגלילה המרוסנת גם בטלפונים
    }}>
      
      <Navbar />
      <main>
        <HeroScroll />
        <About />
        {/* אם יש לך פה עוד קומפוננטות כמו <Gallery /> או <Footer />, תשאיר אותן פה */}
      </main>

    </ReactLenis>
  );
}

export default App;
