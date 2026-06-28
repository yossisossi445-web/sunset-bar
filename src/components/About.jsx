import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 85%", // מופעל רגע לפני שהמקטע מגיע לאמצע המסך
      onEnter: () => {
        // בודקים שהגלילה שלנו קיימת
        if (window.lenis) {
          // מוחקים את המומנטום הפראי של המשתמש ומשתלטים על ההגה
          window.lenis.scrollTo(sectionRef.current, {
            duration: 2.5, // משך הזמן של הסלואו-מושן (בשניות). אפשר לשנות אם תרצה לאט/מהר יותר
            easing: (t) => 1 - Math.pow(1 - t, 5), // נוסחת מתמטיקה לנחיתה רכה מאוד בסוף
          });
        }
      },
      once: true // חשוב מאוד: מגדיר שזה יקרה רק בפעם הראשונה שהמשתמש גולל למטה, כדי שלא ישגע אותו בגלילה חזרה למעלה
    });
  }, []);

  return (
    <section ref={sectionRef} id="about" className="container" style={{ margin: '4rem auto' }}>
      <div className="glass-panel" style={{ 
        padding: '4rem', 
        display: 'flex', 
        flexDirection: 'row', 
        gap: '3rem',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <div style={{ flex: '1 1 300px', borderRadius: '16px', overflow: 'hidden' }}>
          <img src="/frames/images/profile.png" alt="Reem Smila" style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} />
        </div>
        <div style={{ flex: '2 1 400px', textAlign: 'right' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }} className="text-gradient">
            הסיפור שלי - נעים להכיר, אני ראם.
          </h2>
          <p style={{ fontSize: '1.2rem', lineHeight: 1.8, marginTop: '2rem' }}>
            שמח שהגעתם לכאן, אני ראם סמילה, הבעלים והמקים של Sunset Bar. 
            מתוך אהבה אמיתית לאירוח, יצירתיות ואלכוהול משובח, הקמתי את הבר מתוך חזון 
            לספק חוויה על-חושית שמשלבת טעמים עמוקים, צבעים מרהיבים, ושירות ללא פשרות. 
            כל קוקטייל שאנחנו רוקחים נועד לשדרג את הרגע ולייצר זכרונות בלתי נשכחים לכם ולאורחים שלכם.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
