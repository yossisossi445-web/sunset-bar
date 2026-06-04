import React from 'react';

const Navbar = () => {
  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
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
              <li><a href="#about" onClick={(e) => handleScroll(e, 'about')} style={linkStyle}>הסיפור שלי</a></li>
              <li><a href="#services" onClick={(e) => handleScroll(e, 'services')} style={linkStyle}>השירותים</a></li>
              <li><a href="#gallery" onClick={(e) => handleScroll(e, 'gallery')} style={linkStyle}>גלריה</a></li>
              <li><a href="#contact" onClick={(e) => handleScroll(e, 'contact')} style={linkStyle}>צור קשר</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
