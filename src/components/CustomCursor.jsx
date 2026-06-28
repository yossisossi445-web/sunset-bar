import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // בדיקה האם המכשיר הוא מכשיר מגע / טלפון
    const touchCheck = window.matchMedia('(pointer: coarse)').matches;
    setIsTouchDevice(touchCheck);

    // אם זה מכשיר מגע, נעצור כאן ולא נוסיף שום מאזיני אירועים של עכבר
    if (touchCheck) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Center the cursor
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
      });
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('a') || e.target.closest('button')) {
        gsap.to(cursor, { scale: 2, backgroundColor: 'rgba(255, 158, 94, 0.4)', duration: 0.3 });
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.closest('a') || e.target.closest('button')) {
        gsap.to(cursor, { scale: 1, backgroundColor: 'rgba(255, 158, 94, 0.8)', duration: 0.3 });
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  // אם זה מכשיר מגע - הקומפוננטה מחזירה null ולא מציגה כלום על המסך
  if (isTouchDevice) return null;

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 158, 94, 0.8)',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'screen',
        boxShadow: '0 0 15px var(--accent-amber)'
      }}
    />
  );
};

export default CustomCursor;
