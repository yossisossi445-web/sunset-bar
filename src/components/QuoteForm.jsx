import React, { useRef, useState } from 'react';
import gsap from 'gsap';

const QuoteForm = () => {
  const buttonRef = useRef(null);
  
  // הוספנו ניהול מצב כדי לדעת אם הטופס נשלח בהצלחה
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

  // הפונקציה שאשכרה שולחת את הנתונים לאימייל שלכם
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending'); // משנה את הכפתור ל"שולח..."
    
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
        setStatus('success'); // משנה את הכפתור ל"נשלח בהצלחה"
        form.reset(); // מנקה את השדות
        setTimeout(() => setStatus(''), 5000); // מחזיר את הכפתור למצב רגיל אחרי 5 שניות
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
    <section id="contact" className="container" style={{ margin: '6rem auto' }}>
      <div className="glass-panel" style={{ maxWidth: '750px', margin: '0 auto', padding: '3rem' }}>
        
        {/* הכותרת והטקסט שהעתקנו מהתמונה */}
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
          {/* שורה 1 */}
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <input type="text" name="שם_מלא" placeholder="שם ומשפחה" style={{...inputStyle, flex: '1 1 250px'}} required />
            <input type="tel" name="טלפון" placeholder="מספר טלפון" style={{...inputStyle, flex: '1 1 250px'}} required />
          </div>
          
          {/* שורה 2 */}
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <input type="date" name="תאריך_אירוע" placeholder="תאריך האירוע" style={{...inputStyle, flex: '1 1 250px'}} />
            <input type="text" name="מיקום" placeholder="עיר/ אולם" style={{...inputStyle, flex: '1 1 250px'}} />
          </div>
          
          {/* שורה 3 */}
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <input type="number" name="כמות_מוזמנים" placeholder="כמות מוזמנים" style={{...inputStyle, flex: '1 1 250px'}} />
            <input type="text" name="סוג_אירוע" placeholder="סוג האירוע (חתונה, בר/בת מצווה, יום הולדת...)" style={{...inputStyle, flex: '1 1 250px'}} />
          </div>
          
          {/* שורה 4 - הערות */}
          <textarea 
            name="הערות" 
            placeholder="הערות / בקשות מיוחדות..." 
            style={{...inputStyle, minHeight: '120px', resize: 'vertical'}}
          ></textarea>
          
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
                padding: '1rem 3rem',
                fontSize: '1.2rem',
                fontWeight: 800,
                borderRadius: '50px',
                cursor: status === 'sending' ? 'wait' : 'pointer', // משנה את סמן העכבר בזמן שליחה
                fontFamily: 'var(--font-heading)',
                transition: 'all 0.5s',
                animation: 'gradientShift 5s ease infinite',
                opacity: status === 'sending' ? 0.7 : 1
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundPosition = 'right center'; }}
            >
              {/* הטקסט בכפתור משתנה אוטומטית לפי המצב */}
              {status === 'sending' ? 'שולח...' : 
               status === 'success' ? 'נשלח בהצלחה! 🥂' : 
               status === 'error' ? 'שגיאה בשליחה, נסו שוב' : 
               'לשליחת הודעה'}
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
  color: '#ffffff', // וידאתי שהטקסט יהיה לבן וקריא
  fontFamily: 'var(--font-body)',
  fontSize: '1rem',
  outline: 'none',
};

export default QuoteForm;
