import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const trailRef = useRef(null);
  const isHoveringRef = useRef(false);

  useEffect(() => {
    // Disable on mobile/touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.body.style.cursor = 'none';

    const dot = dotRef.current;
    const trail = trailRef.current;
    if (!dot || !trail) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let trailX = mouseX;
    let trailY = mouseY;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      const dotScale = isHoveringRef.current ? 1.5 : 1;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%) scale(${dotScale})`;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Smooth trailing ring
    let animFrameId;
    const animate = () => {
      trailX += (mouseX - trailX) * 0.15;
      trailY += (mouseY - trailY) * 0.15;
      const trailScale = isHoveringRef.current ? 1.8 : 1;
      trail.style.transform = `translate(${trailX}px, ${trailY}px) translate(-50%, -50%) scale(${trailScale})`;
      animFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Attach hover listeners to interactive elements — use event delegation instead of MutationObserver
    const onMouseOver = (e) => {
      const target = e.target.closest('a, button, input, textarea, [role="button"]');
      if (target) {
        target.style.cursor = 'none';
        isHoveringRef.current = true;
      }
    };

    const onMouseOut = (e) => {
      const target = e.target.closest('a, button, input, textarea, [role="button"]');
      if (target) {
        isHoveringRef.current = false;
      }
    };

    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout', onMouseOut, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(animFrameId);
      document.body.style.cursor = 'auto';
    };
  }, []); // Empty dependency array — runs once only

  return (
    <>
      {/* Small glowing dot — follows mouse instantly */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: '#7c3aed',
          boxShadow: '0 0 12px 4px rgba(124, 58, 237, 0.6), 0 0 24px 8px rgba(124, 58, 237, 0.3)',
          transition: 'width 0.3s, height 0.3s',
          willChange: 'transform',
          transform: 'translate(0px, 0px) translate(-50%, -50%) scale(1)',
        }}
      />

      {/* Trailing ring — follows with smooth lag */}
      <div
        ref={trailRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block"
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: '1.5px solid rgba(124, 58, 237, 0.4)',
          transition: 'width 0.3s, height 0.3s, border-color 0.3s',
          willChange: 'transform',
          transform: 'translate(0px, 0px) translate(-50%, -50%) scale(1)',
        }}
      />
    </>
  );
};

export default CustomCursor;
