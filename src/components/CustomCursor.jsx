import React, { useEffect, useRef, useCallback } from 'react';

/**
 * CustomCursor — Premium cursor:
 *   • White dot (mix-blend-mode: difference) follows instantly
 *   • A full-border frame that covers the entire element border on hover
 *   • Bold 2.5px white border with matching border-radius
 *   • Smooth lerp animation between states
 *   • Only targets preferred interactive elements
 *   • Desktop only (pointer: fine)
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const frameRef = useRef(null);
  const rafRef = useRef(null);

  const state = useRef({
    mouseX: -100,
    mouseY: -100,
    // Frame current values (lerped)
    frameX: -100,
    frameY: -100,
    frameW: 36,
    frameH: 36,
    // Frame target values
    targetX: -100,
    targetY: -100,
    targetW: 36,
    targetH: 36,
    // Rotation
    rotation: 0,
    spinning: true,
    // Border-radius (all four corners)
    br: [0, 0, 0, 0],
    targetBr: [0, 0, 0, 0],
    // Border opacity
    borderOpacity: 0.45,
    targetBorderOpacity: 0.45,
    // Lock state
    isLocked: false,
    lastTime: 0,
  });

  const lerp = useCallback((a, b, t) => a + (b - a) * t, []);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const s = state.current;
    const dot = dotRef.current;
    const frame = frameRef.current;
    if (!dot || !frame) return;

    /* ── Mouse tracking ── */
    const onMouseMove = (e) => {
      s.mouseX = e.clientX;
      s.mouseY = e.clientY;
    };

    /* ── Only preferred interactive elements ── */
    const SELECTOR = [
      'a',
      'button',
      '[role="button"]',
      '.glass-card',
      '.glass',
      '.skill-cube-wrapper',
      '.hover-lift',
      '.magnetic-btn',
      '.skills-filter-button',
      '.social-link',
      '.nav-link',
      '.rounded-full.glass',
    ].join(', ');

    let lockedEl = null;

    /* ── Parse per-corner border-radius ── */
    function parseBorderRadius(el) {
      const cs = window.getComputedStyle(el);
      const tl = parseFloat(cs.borderTopLeftRadius) || 0;
      const tr = parseFloat(cs.borderTopRightRadius) || 0;
      const br = parseFloat(cs.borderBottomRightRadius) || 0;
      const bl = parseFloat(cs.borderBottomLeftRadius) || 0;
      return [tl, tr, br, bl];
    }

    /* ── Lock to element — full border cover ── */
    function lockTo(el) {
      if (!el) return;
      lockedEl = el;
      updateLock();
    }

    function updateLock() {
      if (!lockedEl) return;
      const rect = lockedEl.getBoundingClientRect();

      s.isLocked = true;
      s.spinning = false;

      // Sit exactly on the element border with a tiny 2px padding for visual clarity
      const pad = 2;
      s.targetX = rect.left + rect.width / 2;
      s.targetY = rect.top + rect.height / 2;
      s.targetW = rect.width + pad * 2;
      s.targetH = rect.height + pad * 2;

      // Match exact border-radius of the element (plus padding offset)
      const radii = parseBorderRadius(lockedEl);
      s.targetBr = radii.map((r) => r + pad);

      // Full opacity when locked
      s.targetBorderOpacity = 0.92;
    }

    function unlock() {
      lockedEl = null;
      s.isLocked = false;
      s.spinning = true;
      s.targetW = 36;
      s.targetH = 36;
      s.targetBr = [0, 0, 0, 0];
      s.targetBorderOpacity = 0.45;
    }

    /* ── Event delegation ── */
    const onPointerOver = (e) => {
      const hit = e.target.closest(SELECTOR);
      if (hit && hit !== lockedEl) lockTo(hit);
    };

    const onPointerOut = (e) => {
      if (!lockedEl) return;
      const related = e.relatedTarget;
      if (!related || !lockedEl.contains(related)) unlock();
    };

    const onScroll = () => {
      if (lockedEl) updateLock();
    };

    /* ── Animation loop ── */
    function animate(ts) {
      if (!s.lastTime) s.lastTime = ts;
      const dt = ts - s.lastTime;
      s.lastTime = ts;

      // Dot — instant follow
      dot.style.transform = `translate3d(${s.mouseX - 5}px, ${s.mouseY - 5}px, 0)`;

      // Frame position lerp
      const speed = s.isLocked ? 0.15 : 0.12;
      const tx = s.isLocked ? s.targetX : s.mouseX;
      const ty = s.isLocked ? s.targetY : s.mouseY;
      s.frameX = lerp(s.frameX, tx, speed);
      s.frameY = lerp(s.frameY, ty, speed);

      // Frame size lerp
      s.frameW = lerp(s.frameW, s.targetW, 0.1);
      s.frameH = lerp(s.frameH, s.targetH, 0.1);

      // Border-radius lerp (per corner)
      for (let i = 0; i < 4; i++) {
        s.br[i] = lerp(s.br[i], s.targetBr[i], 0.1);
      }

      // Border opacity lerp
      s.borderOpacity = lerp(s.borderOpacity, s.targetBorderOpacity, 0.12);

      // Rotation
      if (s.spinning) {
        s.rotation += (dt / 1000) * 90;
        if (s.rotation > 360) s.rotation -= 360;
      } else {
        // Smoothly snap to 0 when locked
        let diff = -s.rotation;
        while (diff > 180) diff -= 360;
        while (diff < -180) diff += 360;
        s.rotation += diff * 0.1;
      }

      // Apply transforms to frame
      const hw = s.frameW / 2;
      const hh = s.frameH / 2;
      const [rTL, rTR, rBR, rBL] = s.br;

      frame.style.transform = `translate3d(${s.frameX - hw}px, ${s.frameY - hh}px, 0) rotate(${s.rotation}deg)`;
      frame.style.width = `${s.frameW}px`;
      frame.style.height = `${s.frameH}px`;
      frame.style.borderRadius = `${rTL}px ${rTR}px ${rBR}px ${rBL}px`;
      frame.style.borderColor = `rgba(255, 255, 255, ${s.borderOpacity})`;

      rafRef.current = requestAnimationFrame(animate);
    }

    /* ── Listeners ── */
    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onPointerOver, { passive: true });
    document.addEventListener('mouseout', onPointerOut, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onPointerOver);
      document.removeEventListener('mouseout', onPointerOut);
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [lerp]);

  return (
    <>
      {/* Dot — instant follow cursor */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 10,
          height: 10,
          borderRadius: '50%',
          backgroundColor: '#fff',
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: 'difference',
          willChange: 'transform',
        }}
      />

      {/* Frame — full border that covers the element edge */}
      <div
        ref={frameRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          pointerEvents: 'none',
          zIndex: 99998,
          border: '2.5px solid rgba(255, 255, 255, 0.45)',
          borderRadius: '0px',
          willChange: 'transform, width, height, border-radius, border-color',
          transition: 'none',
          boxSizing: 'border-box',
        }}
      />
    </>
  );
}
