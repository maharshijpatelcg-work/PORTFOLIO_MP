import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

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
      // Instant dot update — no rAF needed for the dot
      const dotScale = isHoveringRef.current ? 1.5 : 1;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(${dotScale})`;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Smooth trailing ring — faster lerp for snappier follow
    let animFrameId;
    const animate = () => {
      trailX += (mouseX - trailX) * 0.28;
      trailY += (mouseY - trailY) * 0.28;
      const trailScale = isHoveringRef.current ? 1.8 : 1;
      trail.style.transform = `translate3d(${trailX}px, ${trailY}px, 0) translate(-50%, -50%) scale(${trailScale})`;
      animFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Attach hover listeners to interactive elements
    const onMouseOver = (e) => {
      const target = e.target.closest('a, button, input, textarea, [role="button"]');
      if (target) {
        if (target.style.cursor !== 'none') {
          target.style.cursor = 'none';
        }
        isHoveringRef.current = true;
      } else {
        isHoveringRef.current = false;
      }
    };

    const onMouseLeaveDoc = () => {
      isHoveringRef.current = false;
    };

    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseleave', onMouseLeaveDoc, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeaveDoc);
      cancelAnimationFrame(animFrameId);
      document.body.style.cursor = 'auto';
    };
  }, []); // Empty dependency array — runs once only

  return createPortal(
    <>
      {/* Small glowing dot — follows mouse instantly */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: 'var(--color-accent, #7c3aed)',
          boxShadow: '0 0 12px 4px rgba(124, 58, 237, 0.6), 0 0 24px 8px rgba(124, 58, 237, 0.3)',
          transition: 'width 0.2s, height 0.2s',
          willChange: 'transform',
          contain: 'layout style paint',
          transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%) scale(1)',
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
          border: '1.5px solid var(--color-accent, rgba(124, 58, 237, 0.4))',
          transition: 'width 0.2s, height 0.2s, border-color 0.2s',
          willChange: 'transform',
          contain: 'layout style paint',
          transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%) scale(1)',
        }}
      />
    </>,
    document.body
  );
};

export default CustomCursor;
