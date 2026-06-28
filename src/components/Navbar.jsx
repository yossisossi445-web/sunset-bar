import React from 'react';

const Navbar = () => {
  const handleScroll = (e, targetId, offsetPixels = 0) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      
      window.scrollTo({
        top: elementPosition + offsetPixels,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <style>{`
        /* --- עיצוב הבסיס (תצוגת מחשב בדיוק כמו שהייתה) --- */
        .navbar-header {
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 100;
          padding: 1.5rem 0;
          transition: background 0.3s ease;
        }
        .navbar-glass {
          padding: 0.75rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          box-sizing: border-box;
        }
        .navbar-logo {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 900;
          letter-spacing: 0.05em;
          white-space: nowrap;
        }
        .navbar-nav ul {
          display: flex;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .navbar-link {
          color: var(--text-primary);
          text-decoration: none;
          font-weight: 700;
          font-size: 1rem;
          white-space: nowrap;
        }

        /* --- התאמות נטו לטלפון (מסכים קטנים מ-768px) --- */
        @media (max-width: 768px) {
          .navbar-header {
            padding: 0.5rem 0; /* מוריד את העובי המוגזם של הסרגל */
          }
          .navbar-glass {
            padding: 0.5rem 1rem; /* מצמצם את הריווח הפנימי */
            gap: 1rem; /* מבטיח שהלוגו לעולם לא יידבק לקישורים */
          }
          .navbar-logo {
            font-size: 1.1rem; /* מקטין טיפה את הלוגו כדי לפנות מקום */
          }
          .navbar-nav ul {
            gap: 0.6rem; /* מצמצם את הרווח בין הקישורים כדי שלא יעופו מהסרגל */
          }
          .navbar-link {
            font-size: 0.8rem; /* מקטין את הכתב כדי שיכנסו בשורה אחת */
          }
        }
        
        /* --- התאמה למסכים של טלפונים קטנים במיוחד --- */
        @media (max-width: 380px) {
          .navbar-nav ul {
            gap: 0.4rem;
          }
          .navbar-link {
            font-size: 0.75rem;
          }
          .navbar-logo {
            font-size: 1rem;
          }
        }
      `}</style>

      <header className="navbar-header">
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div className="glass-panel navbar-glass">
            
            <div className="text-gradient navbar-logo">
              Sunset Bar
            </div>
            
            <nav className="navbar-nav">
              <ul>
                <li><a href="#about" onClick={(e) => handleScroll(e, 'about', -200)} className="navbar-link">הסיפור שלי</a></li>
                <li><a href="#services" onClick={(e) => handleScroll(e, 'services', -200)} className="navbar-link">השירותים</a></li>
                <li><a href="#gallery" onClick={(e) => handleScroll(e, 'gallery', -100)} className="navbar-link">גלריה</a></li>
                <li><a href="#contact" onClick={(e) => handleScroll(e, 'contact', -100)} className="navbar-link">צור קשר</a></li>
              </ul>
            </nav>
            
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
