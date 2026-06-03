import React from 'react';

const About = () => {
  return (
    <section className="container" style={{ margin: '4rem auto' }}>
      <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }} className="text-gradient">
          הסיפור שלי - נעים להכיר, אני ראם.
        </h2>
        <p style={{ fontSize: '1.2rem', lineHeight: 1.8, maxWidth: '800px', margin: '2rem auto 0' }}>
          שמח שהגעתם לכאן, אני ראם סמילה, הבעלים והמקים של Sunset Bar. 
          מתוך אהבה אמיתית לאירוח, יצירתיות ואלכוהול משובח, הקמתי את הבר מתוך חזון 
          לספק חוויה על-חושית שמשלבת טעמים עמוקים, צבעים מרהיבים, ושירות ללא פשרות. 
          כל קוקטייל שאנחנו רוקחים נועד לשדרג את הרגע ולייצר זכרונות בלתי נשכחים לכם ולאורחים שלכם.
        </p>
      </div>
    </section>
  );
};

export default About;
