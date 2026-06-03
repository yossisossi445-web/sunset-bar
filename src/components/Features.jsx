import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Droplets, Palette } from 'lucide-react';

const Features = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from('.feature-card', {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      }
    });
  }, { scope: containerRef });

  const features = [
    { title: "אווירה מחשמלת", desc: "צוות ברמנים אנרגטי שמרים את הרחבה", icon: <Zap size={40} color="var(--accent-amber)" /> },
    { title: "חומרי גלם טריים", desc: "פירות, עשבי תיבול וסירופים בהכנה עצמית", icon: <Droplets size={40} color="var(--accent-amber)" /> },
    { title: "עיצוב אישי", desc: "תפריט מותאם אישית לכל סוג אירוע וקונספט", icon: <Palette size={40} color="var(--accent-amber)" /> },
  ];

  return (
    <section ref={containerRef} className="container" style={{ margin: '6rem auto' }}>
      <h2 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '3rem' }}>
        לא רק אלכוהול, <span className="text-gradient">אומנות</span>
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {features.map((feature, idx) => (
          <div key={idx} className="glass-panel feature-card" style={{
            padding: '3rem 2rem',
            textAlign: 'center',
            transition: 'all 0.4s ease',
            cursor: 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-10px)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(255, 158, 94, 0.2)';
            e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.borderColor = 'var(--glass-border)';
          }}
          >
            <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
              {feature.icon}
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{feature.title}</h3>
            <p style={{ color: '#ccc', lineHeight: 1.6 }}>{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
