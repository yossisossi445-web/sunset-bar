import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const FRAME_COUNT = 145;
const currentFrame = (index) => 
  `/frames/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`;

const HeroScroll = () => {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  
  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadedImages = [];
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedCount++;
        setProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
        if (loadedCount === FRAME_COUNT) {
          setImages(loadedImages);
          setLoaded(true);
        }
      };
      loadedImages.push(img);
    }
  }, []);

  useGSAP(() => {
    if (!loaded || images.length === 0) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    const dpr = window.devicePixelRatio || 1;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    const render = (index) => {
      if (images[index]) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        const img = images[index];
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > imgRatio) {
          drawWidth = canvas.width;
          drawHeight = canvas.width / imgRatio;
          offsetX = 0;
          offsetY = (canvas.height - drawHeight) / 2;
        } else {
          drawWidth = canvas.height * imgRatio;
          drawHeight = canvas.height;
          offsetX = (canvas.width - drawWidth) / 2;
          offsetY = 0;
        }

        context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
    };

    render(0);

    ScrollTrigger.create({
      id: "heroScroll", 
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      onUpdate: (self) => {
        const frameIndex = Math.min(
          FRAME_COUNT - 1,
          Math.floor(self.progress * FRAME_COUNT)
        );
        requestAnimationFrame(() => render(frameIndex));
      }
    });

    let lastWidth = window.innerWidth;

    window.addEventListener('resize', () => {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;

      const currentDpr = window.devicePixelRatio || 1;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      canvas.width = window.innerWidth * currentDpr;
      canvas.height = window.innerHeight * currentDpr;
      
      const st = ScrollTrigger.getById('heroScroll');
      const currentProgress = st ? st.progress : 0;
      render(Math.min(FRAME_COUNT - 1, Math.floor(currentProgress * FRAME_COUNT)));
    });

    gsap.to(text1Ref.current, {
      opacity: 0,
      y: -50,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "15% top",
        scrub: true,
      }
    });

    gsap.fromTo(text2Ref.current, 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "30% top",
          end: "50% top",
          scrub: true,
        }
      }
    );

    gsap.to(text2Ref.current, {
      opacity: 0,
      y: -50,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "70% top",
        end: "85% top",
        scrub: true,
      }
    });

    // אנימציית ה-opacity שהייתה פה נמחקה כדי שהתמונה תישאר בהירה בסוף

  }, [loaded, images]);

  const scrollToContact = (e) => {
    e.preventDefault();
    const targetElement = document.getElementById('contact');
    if (targetElement) {
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - 100,
        behavior: 'smooth'
      });
    }
  };

  return (
    // הורדנו את הרקע השחור מפה, המקטע משמש רק למדידת הגלילה (500vh)
    <section ref={sectionRef} style={{ height: '500vh', position: 'relative' }}>
      
      {!loaded && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 50, display: 'flex', flexDirection: 'column', 
          alignItems: 'center', justifyContent: 'center', backgroundColor: '#12090c', color: 'white'
        }}>
          <h2 style={{ marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>טוען את החוויה...</h2>
          <div style={{ width: '200px', height: '4px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', backgroundColor: 'var(--accent-amber)', transition: 'width 0.1s' }} />
          </div>
          <p style={{ marginTop: '0.5rem' }}>{progress}%</p>
        </div>
      )}

      {/* הקסם קורה כאן: position fixed עם zIndex 0, תוקע את הסרטון מאחור ונותן לאתר לעלות עליו */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', overflow: 'hidden', backgroundColor: '#000', zIndex: 0 }}>
        <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }} />
        
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', pointerEvents: 'none'
        }}>
          
          <div ref={text1Ref} style={{ 
           position: 'absolute', 
           top: '44vh', 
           width: '100%',
           textAlign: 'center',
           padding: '0 20px',
           boxSizing: 'border-box'
        }}>
          <h1 style={{ 
            fontSize: 'clamp(4rem, 10vw, 9rem)', 
            fontFamily: 'var(--font-heading)', 
            fontWeight: 900, 
            letterSpacing: '0.02em', 
            margin: 0, 
            lineHeight: 1.1,
            color: '#ffffff', 
            textShadow: `
              0px 0px 10px rgba(255, 255, 255, 0.5),
              0px 0px 20px rgba(251, 191, 36, 0.6),
              0px 0px 40px rgba(234, 88, 12, 0.4)
            `
          }}>
            Sunset Bar
          </h1>

          <button
            onClick={scrollToContact}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px) scale(1.02)";
              e.currentTarget.style.boxShadow =
                "0 8px 18px rgba(146,96,53,.22), inset 0 1px 0 rgba(255,255,255,.9), inset 0 -2px 3px rgba(173,118,73,.18)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow =
                "0 3px 8px rgba(146,96,53,.15), inset 0 1px 0 rgba(255,255,255,.9), inset 0 -2px 3px rgba(173,118,73,.18)";
            }}
            style={{
              pointerEvents: "auto",
              marginTop: "5rem",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              padding: "10px 22px",
              background:
                "linear-gradient(180deg,#f7e0c8 0%,#efc79f 46%,#e0ad81 100%)",
              border: "1px solid rgba(255,250,244,.95)",
              borderRadius: "9999px",
              color: "#70472c",
              fontFamily: "'Heebo', var(--font-heading), sans-serif",
              fontWeight: 600,
              fontSize: "18px",
              lineHeight: 1,
              cursor: "pointer",
              userSelect: "none",
              position: "relative",
              boxShadow:
                "0 3px 8px rgba(146,96,53,.15), inset 0 1px 0 rgba(255,255,255,.9), inset 0 -2px 3px rgba(173,118,73,.18)",
              transition: "all .22s ease",
            }}
          >
            <span
              style={{
                position: "absolute",
                inset: "2px",
                borderRadius: "9999px",
                border: "1px solid rgba(255,255,255,.28)",
                pointerEvents: "none",
              }}
            />

            <span
              style={{
                position: "relative",
                zIndex: 1,
                letterSpacing: "-0.02em",
                whiteSpace: "nowrap",
                textShadow: "0 1px 0 rgba(255,255,255,.35)",
              }}
            >
              קבלת הצעת מחיר
            </span>

            <span
              style={{
                width: "26px",
                height: "26px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "linear-gradient(180deg,#f9e6d2 0%,#efc69d 100%)",
                border: "1px solid rgba(255,255,255,.75)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,.8), 0 1px 2px rgba(130,80,40,.12)",
                color: "#815234",
                flexShrink: 0,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '1px' }}>
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </span>
          </button>
        </div>

          <div ref={text2Ref} style={{ position: 'absolute', textAlign: 'center', opacity: 0 }}>
            <h2 style={{ 
              fontSize: 'clamp(2rem, 5vw, 4rem)', 
              margin: 0, 
              color: '#fcd34d', 
              textShadow: '0px 2px 8px rgba(0, 0, 0, 0.8)'
            }}>
              להפוך כל אירוע לחוויה
            </h2>
            <p style={{ 
              fontSize: 'clamp(1rem, 2vw, 1.5rem)', 
              color: '#ffffff', 
              fontWeight: 700,
              textShadow: '0px 2px 6px rgba(0, 0, 0, 0.7)'
            }}>
              של צבעים, טעמים ואנרגיות
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroScroll;
