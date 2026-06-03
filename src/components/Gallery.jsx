import React from 'react';

const Gallery = () => {
  // Using some frames as gallery placeholders since we don't have other images
  const images = [
    { src: '/frames/ezgif-frame-030.jpg', gridArea: 'span 2 / span 2' },
    { src: '/frames/ezgif-frame-070.jpg', gridArea: 'span 1 / span 1' },
    { src: '/frames/ezgif-frame-100.jpg', gridArea: 'span 1 / span 1' },
    { src: '/frames/ezgif-frame-140.jpg', gridArea: 'span 1 / span 2' },
  ];

  return (
    <section className="container" style={{ margin: '6rem auto' }}>
      <h2 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '3rem' }}>
        טעימה <span className="text-gradient">מהבר</span>
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridAutoRows: '250px',
        gap: '1.5rem'
      }}>
        {images.map((img, idx) => (
          <div key={idx} className="glass-panel" style={{
            gridArea: img.gridArea,
            overflow: 'hidden',
            position: 'relative',
            borderRadius: '24px'
          }}>
            <img 
              src={img.src} 
              alt={`Cocktail ${idx + 1}`} 
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.8s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
