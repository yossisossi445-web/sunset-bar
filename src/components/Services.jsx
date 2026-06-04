import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Wine, GlassWater, Users, GraduationCap } from 'lucide-react';

// רישום פלאגין הגלילה של GSAP כדי שהאנימציה לא תיתקע
gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from('.service-card', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      }
    });
  }, { scope: containerRef });

  const services = [
    { title: "בר אקטיבי", desc: "חוויית בר אנרגטית שמגיעה עד לרחבת הריקודים ומרימה את האווירה לשמיים.", icon: <Wine size={32} color="#ff9e5e" strokeWidth={1.5} /> },
    { title: "עמדת קוקטיילים", desc: "קוקטיילים פרימיום מעוצבים שרוקחים במקום, מותאמים אישית לאופי האירוע.", icon: <GlassWater size={32} color="#ff9e5e" strokeWidth={1.5} /> },
    { title: "ברמנים מקצועיים", desc: "צוות ברמנים מיומן, כריזמטי ושירותי שידאג שכל אורח יקבל יחס VIP.", icon: <Users size={32} color="#ff9e5e" strokeWidth={1.5} /> },
    { title: "סדנאות קוקטיילים", desc: "הפעלה חווייתית וטעימה לערבי גיבוש, מסיבות רווקות או אירועים אינטימיים.", icon: <GraduationCap size={32} color="#ff9e5e" strokeWidth={1.5} /> },
  ];

  return (
    <section id="services" ref={containerRef} style={{ margin: '6rem auto', width: '100%', maxWidth: '1200px' }}>
      <h2 style={{ textAlign: 'center', fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '3rem', color: '#fff' }}>
        השירותים <span style={{ color: '#ff9e5e' }}>שלנו</span>
      </h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
        padding: '0 1rem'
      }}>
        {services.map((service, idx) => (
          <div key={idx} className="service-card" style={{
            padding: '2.5rem 2rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(16px)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            transition: 'all 0.4s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 15px 35px rgba(255, 158, 94, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
          }}
          >
            <div style={{
              background: 'rgba(255, 158, 94, 0.1)',
              width: '72px',
              height: '72px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '50%',
              marginBottom: '0.5rem',
              flexShrink: 0 
            }}>
              {service.icon}
            </div>
            
            <h3 style={{ fontSize: '1.5rem', margin: 0, color: '#fff' }}>{service.title}</h3>
            <p style={{ color: '#ccc', lineHeight: 1.6, margin: 0 }}>{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
