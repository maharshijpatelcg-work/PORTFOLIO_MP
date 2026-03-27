import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const trailRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

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
      // Dot follows instantly
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Smooth trailing ring
    let animFrameId;
    const animate = () => {
      trailX += (mouseX - trailX) * 0.15;
      trailY += (mouseY - trailY) * 0.15;
      trail.style.transform = `translate(${trailX}px, ${trailY}px) translate(-50%, -50%) scale(${isHovering ? 1.8 : 1})`;
      animFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Attach hover listeners to interactive elements
    const attachHoverListeners = () => {
      const hoverables = document.querySelectorAll('a, button, input, textarea, [role="button"]');
      hoverables.forEach((el) => {
        el.style.cursor = 'none';
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });
    };

    setTimeout(attachHoverListeners, 100);
    const observer = new MutationObserver(attachHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animFrameId);
      document.body.style.cursor = 'auto';
      observer.disconnect();
    };
  }, [isHovering]);

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
          transition: 'transform 0.05s ease-out, width 0.3s, height 0.3s',
          willChange: 'transform',
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
        }}
      />
    </>
  );
};

export default CustomCursor;
