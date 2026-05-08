import React, { useMemo } from 'react';
import { Folder, FileImage, Video, FileText, Cpu } from 'lucide-react';

const CosmosBackground = () => {
  const icons = [Folder, FileImage, Video, FileText, Cpu];

  const particles = useMemo(() => {
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 80 : 160;
    
    return [...Array(count)].map((_, i) => {
      const isElement = i % 10 === 0;
      const IconComponent = isElement ? icons[Math.floor(Math.random() * icons.length)] : null;
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * -25,
        duration: 10 + Math.random() * 10,
        isElement,
        IconComponent,
        size: isElement ? 20 : Math.random() * 2 + 1
      };
    });
  }, []);

  return (
    <div style={containerStyle}>
      {particles.map((p) => (
        <div
          key={p.id}
          className="star-element"
          style={{
            ...particleBase,
            top: `${p.y}%`,
            left: `${p.x}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        >
          {p.isElement ? (
            <div style={{ color: 'var(--secondary)', filter: 'drop-shadow(0 0 10px var(--secondary))', opacity: 0.2 }}>
              <p.IconComponent size={p.size} />
            </div>
          ) : (
            <div
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                background: 'white',
                borderRadius: '50%',
                boxShadow: '0 0 8px white',
                opacity: 0.5
              }}
            />
          )}
        </div>
      ))}

      <style>
        {`
          @keyframes starFlow {
            0% {
              transform: translateZ(-1500px) scale(0);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              transform: translateZ(1000px) scale(2);
              opacity: 0;
            }
          }
          .star-element {
            animation: starFlow linear infinite;
            will-change: transform, opacity;
            pointer-events: none;
          }
        `}
      </style>
      <div style={depthOverlay} />
    </div>
  );
};

const containerStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: -1,
  pointerEvents: 'none',
  background: 'transparent',
  perspective: '1200px',
  overflow: 'hidden',
  transformStyle: 'preserve-3d'
};

const particleBase = {
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transformStyle: 'preserve-3d'
};

const depthOverlay = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'transparent',
  zIndex: 10
};

export default CosmosBackground;
