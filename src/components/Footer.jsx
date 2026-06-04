import React from 'react';
import { Instagram, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{
      borderTop: '1px solid var(--glass-border)',
      padding: '3rem 0 2rem',
      marginTop: '4rem',
      backgroundColor: 'rgba(18, 9, 12, 0.95)'
    }}>
      <div className="container" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem'
      }}>
        <div style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '2rem',
          fontWeight: 900,
        }} className="text-gradient">
          Sunset Bar
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a href="#" style={{ color: 'var(--accent-amber)', padding: '0.5rem', borderRadius: '50%', border: '1px solid var(--glass-border)', display: 'flex' }}>
            <Instagram size={24} />
          </a>
          <a href="#" style={{ color: 'var(--accent-amber)', padding: '0.5rem', borderRadius: '50%', border: '1px solid var(--glass-border)', display: 'flex' }}>
            <MessageCircle size={24} />
          </a>
        </div>

        <p style={{ color: '#888', fontSize: '0.9rem', marginTop: '1rem' }}>
          © כל הזכויות שמורות לראם סמילה 2026
        </p>
      </div>
    </footer>
  );
};

export default Footer;
