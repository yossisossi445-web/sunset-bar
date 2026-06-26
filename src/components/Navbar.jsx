import React from 'react';

const Navbar = () => {
  // הפונקציה החדשה מקבלת פרמטר שלישי - offsetPixels (כמות הפיקסלים לתיקון המיקום)
  const handleScroll = (e, targetId, offsetPixels = 0) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // חישוב המיקום המדויק של הסקשן בעמוד כולו
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      
      // גלילה למיקום של הסקשן, פלוס תיקון הפיקסלים שלנו שמושך אותו למרכז
      window.scrollTo({
        top: elementPosition + offsetPixels,
        behavior: 'smooth'
      });
    }
  };

  const linkStyle = { color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 700 };

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 100,
      padding: '1.5rem 0',
      transition: 'background 0.3s ease'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div className="glass-panel" style={{
          padding: '0.75rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%'
        }}>
          <div style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.5rem',
            fontWeight: 900,
            letterSpacing: '0.05em'
          }} className="text-gradient">
            Sunset Bar
          </div>
          <nav>
            <ul style={{
              display: 'flex',
              gap: '2rem',
              listStyle: 'none',
              margin: 0,
              padding: 0
            }}>
              {/* השתמשנו במספרים שליליים כדי לעצור את הגלילה לפני הלמעלה, כדי שזה יישב בול במרכז */}
              <li><a href="#about" onClick={(e) => handleScroll(e, 'about', -200)} style={linkStyle}>הסיפור שלי</a></li>
              <li><a href="#services" onClick={(e) => handleScroll(e, 'services', -200)} style={linkStyle}>השירותים</a></li>
              <li><a href="#gallery" onClick={(e) => handleScroll(e, 'gallery', -100)} style={linkStyle}>גלריה</a></li>
              <li><a href="#contact" onClick={(e) => handleScroll(e, 'contact', -100)} style={linkStyle}>צור קשר</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
