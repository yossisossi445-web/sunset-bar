import React, { useRef } from 'react';
import gsap from 'gsap';

const QuoteForm = () => {
  const buttonRef = useRef(null);

  const handleMouseMove = (e) => {
    const btn = buttonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(btn, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current) return;
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)'
    });
  };

  return (
    <section className="container" style={{ margin: '6rem auto' }}>
      <div className="glass-panel" style={{ maxWidth: '600px', margin: '0 auto', padding: '3rem' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '2rem' }}>
          בואו נרים לכם <span className="text-gradient">אירוע</span>
        </h2>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <input type="text" placeholder="שם מלא" style={inputStyle} />
            <input type="tel" placeholder="טלפון" style={inputStyle} />
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <input type="date" placeholder="תאריך אירוע" style={inputStyle} />
            <input type="number" placeholder="כמות מוזמנים" style={inputStyle} />
          </div>
          <input type="text" placeholder="סוג אירוע (חתונה, יום הולדת, חברה...)" style={inputStyle} />
          
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem', perspective: '1000px' }}>
            <button 
              ref={buttonRef}
              type="button" 
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                background: 'linear-gradient(45deg, var(--accent-amber), var(--accent-gold), var(--accent-amber))',
                backgroundSize: '200% auto',
                color: '#12090c',
                border: 'none',
                padding: '1rem 3rem',
                fontSize: '1.2rem',
                fontWeight: 800,
                borderRadius: '50px',
                cursor: 'none',
                fontFamily: 'var(--font-heading)',
                transition: 'background-position 0.5s',
                animation: 'gradientShift 5s ease infinite'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundPosition = 'right center'; }}
            >
              לקבלת הצעת מחיר
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
};

const inputStyle = {
  width: '100%',
  padding: '1rem',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid var(--glass-border)',
  borderRadius: '12px',
  color: 'var(--text-primary)',
  fontFamily: 'var(--font-body)',
  fontSize: '1rem',
  outline: 'none',
};

export default QuoteForm;
