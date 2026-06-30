import React from 'react';

const About = () => {
  return (
    <section id="about" className="container" style={{ margin: '4rem auto' }}>
      <div className="glass-panel" style={{ 
        padding: '4rem', 
        display: 'flex', 
        flexDirection: 'row', 
        gap: '3rem',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <div style={{ flex: '1 1 300px', borderRadius: '16px', overflow: 'hidden' }}>
          <img src="/images/profile.png" alt="Reem Smila" style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} />
        </div>
        <div style={{ flex: '2 1 400px', textAlign: 'right' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }} className="text-gradient">
            הסיפור שלי - נעים להכיר, אני ראם.
          </h2>
          <p style={{ fontSize: '1.2rem', lineHeight: 1.8, marginTop: '2rem' }}>
            שמח שהגעתם לכאן, אני ראם סמילה, הבעלים והמקים של Sunset Bar. 
            מתוך אהבה אמיתית לאירוח, יצירתיות ואלכוהול משובח, הקמתי את הבר מתוך חזון 
            לספק חוויה על-חושית שמשלבת טעמים עמוקים, צבעים מרהיבים, ושירות ללא פשרות. 
            כל קוקטייל שאנחנו רוקחים נועד לשדרג את הרגע ולייצר זכרונות בלתי נשכחים לכם ולאורחים שלכם.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
