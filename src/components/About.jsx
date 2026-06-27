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
      start: "center center", // המקטע מתחיל את ה"ברקס" כשהוא מגיע בדיוק לאמצע המסך
      end: "+=80%", // המרחק שהמשתמש צריך לגלול בזמן שהמסך קפוא (זה מה שסופג את המומנטום)
      pin: true, // הלוגיקה שנועלת את המקטע במקום
      pinSpacing: true, // דואג שהמקטעים הבאים לא ידרסו את המקטע הזה בזמן ההקפאה
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
