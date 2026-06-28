import React, { useRef, useState } from 'react';
import gsap from 'gsap';

const QuoteForm = () => {
  const buttonRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // איפוס של הודעת ה"תודה" אחרי 5 שניות
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '1rem',
    outline: 'none',
    boxSizing: 'border-box',
    textAlign: 'right', // מבטיח יישור לימין
    fontFamily: 'inherit',
    transition: 'border-color 0.3s ease, background-color 0.3s ease'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    color: '#f7e6cf',
    fontWeight: 600,
    fontSize: '1.05rem',
    textAlign: 'right'
  };

  const formGroupStyle = {
    marginBottom: '1.5rem',
    width: '100%'
  };

  return (
    <section id="contact" style={{ padding: '6rem 20px', display: 'flex', justifyContent: 'center' }}>
      <div style={{
        maxWidth: '600px',
        width: '100%',
        background: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(16px)',
        padding: '3rem 2rem',
        borderRadius: '24px',
        border: '1px solid rgba(251, 191, 36, 0.2)',
        boxShadow: '0 15px 40px rgba(0,0,0,0.5)',
        direction: 'rtl' // הפקודה הזו מסדרת את המספרים והפלייסחולדר לימין
      }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          marginBottom: '2rem',
          color: '#fff',
          fontFamily: 'var(--font-heading)'
        }}>
          לקבלת <span style={{ color: '#ff9e5e' }}>הצעת מחיר</span>
        </h2>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            
            <div style={formGroupStyle}>
              <label style={labelStyle}>שם מלא</label>
              <input type="text" required placeholder="ישראל ישראלי" style={inputStyle} dir="rtl" />
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle}>מספר טלפון</label>
              <input type="tel" required placeholder="050-000-0000" style={inputStyle} dir="rtl" />
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle}>סוג האירוע</label>
              <input type="text" required placeholder="חתונה, בר מצווה וכו׳" style={inputStyle} dir="rtl" />
            </div>

            {/* בלוק גמיש כדי להציג את התאריך והשעות אחד ליד השני */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ ...formGroupStyle, flex: '1 1 200px' }}>
                <label style={labelStyle}>תאריך</label>
                <input type="date" required style={inputStyle} dir="rtl" />
              </div>

              <div style={{ ...formGroupStyle, flex: '1 1 200px' }}>
                <label style={labelStyle}>שעות</label>
                <input type="text" required placeholder="18:00 - 23:00" style={inputStyle} dir="rtl" />
              </div>
            </div>

            <button
              ref={buttonRef}
              onMouseEnter={() => {
                gsap.to(buttonRef.current, { scale: 1.02, duration: 0.2 });
              }}
              onMouseLeave={() => {
                gsap.to(buttonRef.current, { scale: 1, duration: 0.2 });
              }}
              type="submit"
              style={{
                width: '100%',
                padding: '14px',
                marginTop: '1rem',
                background: 'linear-gradient(180deg,#f7e0c8 0%,#efc79f 46%,#e0ad81 100%)',
                color: '#70472c',
                border: 'none',
                borderRadius: '50px',
                fontSize: '1.2rem',
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: 'var(--font-heading)',
                boxShadow: '0 4px 15px rgba(224, 173, 129, 0.3)'
              }}
            >
              שלח בקשה
            </button>
          </form>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <div style={{
              width: '80px', height: '80px', background: 'rgba(251, 191, 36, 0.1)', 
              borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.5rem auto'
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fcd34d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h3 style={{ color: '#fff', fontSize: '1.8rem', marginBottom: '0.5rem' }}>תודה רבה!</h3>
            <p style={{ color: '#ccc', fontSize: '1.1rem' }}>הפרטים התקבלו, נחזור אליך בהקדם האפשרי.</p>
          </div>
        )}
      </div>
      
      <style>{`
        /* הברקה כשלוחצים על התיבה */
        input:focus {
          border-color: #fcd34d !important;
          background-color: rgba(255, 255, 255, 0.1) !important;
        }
        /* צבע שקוף לפלייסחולדרים */
        input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }
        /* מתאים את הסטייל של לוח השנה לדפדפנים */
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(1);
          opacity: 0.6;
          cursor: pointer;
        }
      `}</style>
    </section>
  );
};

export default QuoteForm;
