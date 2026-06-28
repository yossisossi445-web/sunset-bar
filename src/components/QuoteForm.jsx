import React, { useRef, useState } from 'react';
import gsap from 'gsap';

const QuoteForm = () => {
  const buttonRef = useRef(null);
  const [status, setStatus] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending'); 
    
    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xqeoabrw", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success'); 
        form.reset(); 
        setTimeout(() => setStatus(''), 5000); 
      } else {
        setStatus('error');
        setTimeout(() => setStatus(''), 5000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus(''), 5000);
    }
  };

  return (
    <section id="contact" className="container" style={{ margin: '6rem auto', direction: 'rtl' }}>
      <div className="glass-panel form-panel">
        
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '0.5rem' }}>
          מחכים לחגוג <span className="text-gradient">איתכם!</span>
        </h2>
        <p style={{ textAlign: 'center', marginBottom: '2.5rem', color: '#ccc', fontSize: '1.2rem' }}>
          השאירו פרטים ונחזור אליכם בהקדם עם הצעה מתוקה
        </p>
        
        <form 
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          onSubmit={handleSubmit}
        >
          {/* שורה 1 - שם מלא וטלפון */}
          <div className="form-row">
            <div className="input-group">
              <label style={labelStyle}>שם מלא</label>
              <input type="text" name="שם_מלא" placeholder="ישראל ישראלי" style={inputStyle} required />
            </div>
            
            <div className="input-group">
              <label style={labelStyle}>טלפון</label>
              <input type="tel" name="טלפון" placeholder="050-0000000" style={inputStyle} required />
            </div>
          </div>
          
          {/* שורה 2 - תאריך ושעות */}
          <div className="form-row">
            <div className="input-group">
              <label style={labelStyle}>תאריך האירוע</label>
              <input type="date" name="תאריך_אירוע" placeholder="dd/mm/yyyy" style={inputStyle} />
            </div>
            
            <div className="input-group">
              <label style={labelStyle}>שעות (לדוגמא: 20:00-01:00)</label>
              <input type="text" name="שעות" placeholder="הכנס שעות" style={inputStyle} />
            </div>
          </div>

          {/* שורה 3 - סוג אירוע, מיקום, כמות מוזמנים */}
          <div className="form-row three-cols">
            <div className="input-group">
              <label style={labelStyle}>סוג האירוע</label>
              <input type="text" name="סוג_אירוע" placeholder="חתונה / יום הולדת..." style={inputStyle} />
            </div>
            
            <div className="input-group">
              <label style={labelStyle}>מיקום</label>
              <input type="text" name="מיקום" placeholder="עיר / אולם" style={inputStyle} />
            </div>

            <div className="input-group">
              <label style={labelStyle}>כמות מוזמנים</label>
              <input type="number" name="כמות_מוזמנים" placeholder="100" style={inputStyle} />
            </div>
          </div>
          
          {/* שורה 4 - הערות */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={labelStyle}>הערות</label>
            <textarea 
              name="הערות" 
              placeholder="הערות / בקשות מיוחדות..." 
              style={{...inputStyle, minHeight: '100px', resize: 'vertical'}}
            ></textarea>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem', perspective: '1000px' }}>
            <button 
              ref={buttonRef}
              type="submit" 
              disabled={status === 'sending'}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                background: 'linear-gradient(45deg, var(--accent-amber), var(--accent-gold), var(--accent-amber))',
                backgroundSize: '200% auto',
                color: '#12090c',
                border: 'none',
                padding: '1rem 3.5rem',
                fontSize: '1.2rem',
                fontWeight: 800,
                borderRadius: '50px',
                cursor: status === 'sending' ? 'wait' : 'pointer',
                fontFamily: 'var(--font-heading)',
                transition: 'all 0.5s',
                animation: 'gradientShift 5s ease infinite',
                opacity: status === 'sending' ? 0.7 : 1
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundPosition = 'right center'; }}
            >
              {status === 'sending' ? 'שולח...' : 
               status === 'success' ? 'נשלח בהצלחה! 🥂' : 
               status === 'error' ? 'שגיאה בשליחה, נסו שוב' : 
               'לשליחת הודעה'}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        /* העיצוב המקורי והקומפקטי יותר של הטופס */
        .form-panel {
          max-width: 800px;
          margin: 0 auto;
          padding: 3rem;
        }

        .form-row {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .input-group {
          flex: 1 1 200px; /* מאפשר לשדות להתכווץ קצת יותר כדי ש-3 ייכנסו בשורה */
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        /* התאמה לטלפונים */
        @media (max-width: 768px) {
          .form-panel {
            padding: 2rem !important; /* ריווח מותאם לטלפון */
          }
          
          .three-cols .input-group {
             /* בטלפון, גם השורה של ה-3 שדות תרד לשורה נפרדת לכל שדה */
            flex: 1 1 100%; 
          }
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
};

const labelStyle = {
  fontSize: '0.9rem',
  color: '#ffffff',
  fontWeight: '600',
  textAlign: 'right',
  paddingRight: '6px'
};

const inputStyle = {
  width: '100%',
  padding: '1rem',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid var(--glass-border)',
  borderRadius: '12px',
  color: '#ffffff',
  fontFamily: 'var(--font-body)',
  fontSize: '1rem',
  outline: 'none',
  textAlign: 'right',
  direction: 'rtl',
  transition: 'border-color 0.3s ease, background-color 0.3s ease'
};

export default QuoteForm;
