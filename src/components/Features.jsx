import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// חובה לרשום את הפלאגין כדי שהגלילה תעבוד תמיד
gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // השתמשנו ב-fromTo על "עטיפת" האלמנט כדי למנוע התנגשויות ובאגים בטעינה
    gsap.fromTo('.feature-wrapper', 
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      }
    );
  }, { scope: containerRef });

  const features = [
    { title: "עיצוב אישי", img: "/frames/images/feature-1.jpg" },
    { title: "חומרי גלם טריים", img: "/frames/images/feature-2.jpg" },
    { title: "אווירה מחשמלת", img: "/frames/images/feature-3.jpg" },
  ];

  return (
    <section id="features" ref={containerRef} className="container" style={{ margin: '6rem auto' }}>
      <h2 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '1rem' }}>
        לא רק אלכוהול, <span className="text-gradient">אומנות</span>
      </h2>
      <p style={{ textAlign: 'center', marginBottom: '3rem', color: '#ccc', fontSize: '1.2rem' }}>הצצה קטנה למה שמחכה לאורחים שלכם</p>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {features.map((feature, idx) => (
          // קריאה לקומפוננטת הכרטיסייה הנפרדת
          <FeatureCard key={idx} feature={feature} />
        ))}
      </div>
    </section>
  );
};

// יצרנו את הכרטיסייה כרכיב נפרד כדי לנהל את ה-Hover בצורה בטוחה בלי התנגשויות
const FeatureCard = ({ feature }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    // זו העטיפה ש-GSAP שולט עליה באנימציית הגלילה
    <div className="feature-wrapper">
      
      {/* זו הכרטיסייה עצמה שהעכבר שולט עליה ב-Hover */}
      <div 
        style={{
          position: 'relative',
          borderRadius: '24px',
          overflow: 'hidden',
          aspectRatio: '3/4',
          transition: 'transform 0.4s ease',
          cursor: 'pointer', // שונה מ-none ל-pointer לחוויית משתמש טובה יותר
          transform: isHovered ? 'translateY(-10px)' : 'translateY(0)'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img 
          src={feature.img} 
          alt={feature.title} 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.6s ease',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }} 
        />
        
        <div style={{
          position: 'absolute',
          bottom: '1.5rem',
          right: '1.5rem',
          backgroundColor: '#fff',
          color: '#000',
          padding: '0.5rem 1.5rem',
          borderRadius: '50px',
          fontWeight: '900',
          fontSize: '1.1rem',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
        }}>
          {feature.title}
        </div>
      </div>
      
    </div>
  );
};

export default Features;
