import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
          <div key={idx} className="feature-card" style={{
            position: 'relative',
            borderRadius: '24px',
            overflow: 'hidden',
            aspectRatio: '3/4',
            transition: 'transform 0.4s ease',
            cursor: 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-10px)';
            e.currentTarget.querySelector('img').style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.querySelector('img').style.transform = 'scale(1)';
          }}
          >
            <img src={feature.img} alt={feature.title} style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.6s ease'
            }} />
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
        ))}
      </div>
    </section>
  );
};

export default Features;
