import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);
      setDotPosition({ x: e.clientX, y: e.clientY });
      // Smooth lag for the outer ring
      setTimeout(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      }, 50);
    };

    const onMouseOver = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.closest('.glass-card')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  return (
    <>
      <div 
        style={{
          position: 'fixed',
          top: dotPosition.y,
          left: dotPosition.x,
          width: '8px',
          height: '8px',
          background: 'var(--secondary)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9999,
          boxShadow: '0 0 10px var(--secondary)',
          transition: 'transform 0.1s ease-out, opacity 0.3s ease',
          opacity: isVisible ? 1 : 0
        }}
      />
      <div 
        style={{
          position: 'fixed',
          top: position.y,
          left: position.x,
          width: isHovering ? '60px' : '40px',
          height: isHovering ? '60px' : '40px',
          border: '1px solid var(--primary)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'width 0.3s, height 0.3s, background 0.3s, opacity 0.3s ease',
          background: isHovering ? 'rgba(6, 182, 212, 0.2)' : 'transparent',
          boxShadow: isHovering ? '0 0 30px var(--secondary)' : 'none',
          opacity: isVisible ? 1 : 0
        }}
      />
    </>
  );
};

export default CustomCursor;
