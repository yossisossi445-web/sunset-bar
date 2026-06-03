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

  // Preload images
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
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const render = (index) => {
      if (images[index]) {
        // Clear and draw image covering the canvas
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

    // Draw first frame
    render(0);

    const animationState = { frame: 0 };

    ScrollTrigger.create({
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

    // Handle Resize
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render(Math.min(FRAME_COUNT - 1, Math.floor(ScrollTrigger.getById('heroScroll')?.progress * FRAME_COUNT || 0)));
    });

    // Text Animations
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

    // Fade out canvas at the end
    gsap.to(canvasRef.current, {
      opacity: 0.3,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "90% top",
        end: "bottom bottom",
        scrub: true,
      }
    });

  }, [loaded, images]);

  return (
    <section ref={sectionRef} style={{ height: '500vh', position: 'relative', backgroundColor: '#000' }}>
      
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

      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }} />
        
        {/* Overlays */}
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', pointerEvents: 'none'
        }}>
          
          <div ref={text1Ref} style={{ position: 'absolute', textAlign: 'center', textShadow: '0 0 20px rgba(0,0,0,0.8)' }}>
            <h1 style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', margin: 0, lineHeight: 1 }} className="text-gradient">
              סאנסט בר
            </h1>
          </div>

          <div ref={text2Ref} style={{ position: 'absolute', textAlign: 'center', opacity: 0, textShadow: '0 0 20px rgba(0,0,0,0.8)' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', margin: 0 }}>להפוך כל אירוע לחוויה</h2>
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)', color: 'var(--accent-amber)', fontWeight: 700 }}>
              של צבעים, טעמים ואנרגיות
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroScroll;
