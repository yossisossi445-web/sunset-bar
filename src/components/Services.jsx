import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Wine, GlassWater, Users, GraduationCap } from 'lucide-react';

const Services = () => {
  const containerRef = useRef(null);

  // העברנו את הרישום לתוך ההוק עצמו - הכי בטוח נגד קריסות
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.service-card', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%', // מתחיל את האנימציה קצת יותר מוקדם
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
    <section id="services" ref={containerRef} style={{ margin: '6rem auto', width: '100%', maxWidth: '1200px', padding: '0 20px' }}>
      <h2 style={{ textAlign: 'center', fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '3rem', color: '#fff' }}>
        השירותים <span style={{ color: '#ff9e5e' }}>שלנו</span>
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem'
      }}>
        {services.map((service, idx) => (
          <ServiceCard key={idx} service={service} />
        ))}
      </div>
    </section>
  );
};

// רכיב פנימי שמנהל את הכרטיסייה ואת ה-Hover בצורה בטוחה ללא קריסות
const ServiceCard = ({ service }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="service-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: '2.5rem 2rem',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(16px)',
        borderRadius: '16px',
        border: isHovered ? '1px solid rgba(212, 175, 55, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 15px 35px rgba(255, 158, 94, 0.15)' : 'none',
        transition: 'all 0.4s ease',
        cursor: 'pointer'
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
  );
};

export default Services;
