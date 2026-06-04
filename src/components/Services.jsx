import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Wine, GlassWater, Users, GraduationCap } from 'lucide-react';

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
    { title: "בר אקטיבי", desc: "חוויית בר אנרגטית שמגיעה עד לרחבת הריקודים ומרימה את האווירה לשמיים.", icon: <Wine size={40} color="var(--accent-amber)" strokeWidth={1.5} /> },
    { title: "עמדת קוקטיילים", desc: "קוקטיילים פרימיום מעוצבים שרוקחים במקום, מותאמים אישית לאופי האירוע.", icon: <GlassWater size={40} color="var(--accent-amber)" strokeWidth={1.5} /> },
    { title: "ברמנים מקצועיים", desc: "צוות ברמנים מיומן, כריזמטי ושירותי שידאג שכל אורח יקבל יחס VIP.", icon: <Users size={40} color="var(--accent-amber)" strokeWidth={1.5} /> },
    { title: "סדנאות קוקטיילים", desc: "הפעלה חווייתית וטעימה לערבי גיבוש, מסיבות רווקות או אירועים אינטימיים.", icon: <GraduationCap size={40} color="var(--accent-amber)" strokeWidth={1.5} /> },
  ];

  return (
    <section id="services" ref={containerRef} className="container" style={{ margin: '6rem auto' }}>
      <h2 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '3rem' }}>
        השירותים <span className="text-gradient">שלנו</span>
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem'
      }}>
        {services.map((service, idx) => (
          <div key={idx} className="glass-panel service-card" style={{
            padding: '2.5rem 2rem',
            textAlign: 'center',
            transition: 'all 0.4s ease',
            cursor: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(255, 158, 94, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.borderColor = 'var(--glass-border)';
          }}
          >
            <div style={{
              background: 'rgba(255, 158, 94, 0.1)',
              padding: '1rem',
              borderRadius: '50%',
              marginBottom: '0.5rem'
            }}>
              {service.icon}
            </div>
            <h3 style={{ fontSize: '1.5rem', margin: 0 }}>{service.title}</h3>
            <p style={{ color: '#ccc', lineHeight: 1.6, margin: 0 }}>{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
