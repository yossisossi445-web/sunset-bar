import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // בדיקה חכמה: האם המכשיר תומך במגע? 
    if (window.matchMedia("(pointer: coarse)").matches || 'ontouchstart' in window) {
      setIsTouchDevice(true);
      return; // עוצר פה, לא מפעיל את אירועי העכבר
    }

    const cursor = cursorRef.current;
    
    const moveCursor = (e) => {
      if (cursor) {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: "power2.out"
        });
      }
    };

    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  // אם זה מכשיר מגע (טלפון/טאבלט) - אל תרנדר את נקודת העכבר בכלל
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
        backgroundColor: 'var(--accent-amber)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate(-50%, -50%)',
        mixBlendMode: 'difference'
      }}
    />
  );
};

export default CustomCursor;
