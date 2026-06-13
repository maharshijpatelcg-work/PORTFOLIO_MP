import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Preloader — Cinematic Sequential MP Logo and Name reveal:
 *   Phase 1 (0–1.7s):   Logo reveals in the exact center of screen with glowing shockwaves and spring animations.
 *   Phase 2 (1.7–2.8s): Logo slides up & shrinks, name "MAHARSHI PATEL" enters letter-by-letter with a blur & spring transition.
 *   Phase 3 (2.8–4.0s): Progress bar fades in and fills up dynamically.
 *   Exit (4.0s+):       Entire overlay slides up with elegant easing.
 */
const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [logoPhase, setLogoPhase] = useState('reveal');
  const [showText, setShowText] = useState(false);
  const [visibleLetters, setVisibleLetters] = useState(0);
  const [showBar, setShowBar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const canvasRef = useRef(null);

  const fullName = 'MAHARSHI PATEL';
  const firstName = 'MAHARSHI';
  const lastName = 'PATEL';

  // Check mobile viewport size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Step 2: Shrink logo and start typing name
    const shrinkTimer = setTimeout(() => {
      setLogoPhase('shrink');
      setShowText(true);
    }, 1700);

    // Step 3: Show progress bar
    const barTimer = setTimeout(() => {
      setShowBar(true);
    }, 2800);

    // Step 4: Dismiss preloader
    const exitTimer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = 'auto';
    }, 4500);

    return () => {
      clearTimeout(shrinkTimer);
      clearTimeout(barTimer);
      clearTimeout(exitTimer);
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Letter-by-letter typing effect
  useEffect(() => {
    if (!showText) return;
    if (visibleLetters >= fullName.length) return;

    const interval = setInterval(() => {
      setVisibleLetters((prev) => {
        if (prev >= fullName.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 65);

    return () => clearInterval(interval);
  }, [showText, visibleLetters, fullName.length]);

  // Progress bar animation
  useEffect(() => {
    if (!showBar) return;

    const start = performance.now();
    const duration = 1200;
    let raf;

    const tick = (now) => {
      const elapsed = now - start;
      const pct = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - pct, 3); // Ease out cubic
      setProgress(eased * 100);
      if (pct < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [showBar]);

  // Ambient floating particles on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Spawn particles
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.8 + 0.4,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.35 + 0.05,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const letterVariants = {
    hidden: { opacity: 0, y: 12, filter: 'blur(6px)', scale: 0.75 },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        type: 'spring',
        damping: 14,
        stiffness: 140,
      }
    }
  };

  // Sizing definitions based on phase & viewport
  const logoPhaseIsReveal = logoPhase === 'reveal';
  const scaleFactor = isMobile ? 0.8 : 1.0;
  const logoSize = (logoPhaseIsReveal ? 240 : 100) * scaleFactor;
  const clipSize = (logoPhaseIsReveal ? 200 : 82) * scaleFactor;
  const outerRingSize = (logoPhaseIsReveal ? 300 : 135) * scaleFactor;
  const innerRingSize = (logoPhaseIsReveal ? 250 : 112) * scaleFactor;

  // Split name for rendering
  const renderTypedName = () => {
    return (
      <div className="preloader-name-row">
        <span className="preloader-name-first">
          {firstName.split('').map((ch, i) => (
            <motion.span
              key={`f-${i}`}
              variants={letterVariants}
              initial="hidden"
              animate={i < visibleLetters ? 'visible' : 'hidden'}
              className="preloader-letter"
            >
              {ch}
            </motion.span>
          ))}
        </span>
        <span className="preloader-name-space" />
        <span className="preloader-name-last">
          {lastName.split('').map((ch, i) => {
            const globalIdx = firstName.length + 1 + i; // +1 for space
            return (
              <motion.span
                key={`l-${i}`}
                variants={letterVariants}
                initial="hidden"
                animate={globalIdx < visibleLetters ? 'visible' : 'hidden'}
                className="preloader-letter preloader-letter-gold"
              >
                {ch}
              </motion.span>
            );
          })}
        </span>
        {/* Typing cursor */}
        {visibleLetters < fullName.length && (
          <span className="preloader-cursor" />
        )}
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{
            y: '-100vh',
            transition: { duration: 1.0, ease: [0.76, 0, 0.24, 1] },
          }}
          className="preloader-overlay"
        >
          {/* Ambient particle canvas */}
          <canvas ref={canvasRef} className="preloader-canvas" />

          {/* Radial ambient glow behind logo */}
          <motion.div
            className="preloader-ambient-glow"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: 'easeOut' }}
          />

          {/* CENTER CONTENT */}
          <div className="preloader-center">
            {/* ── LOGO ── */}
            <motion.div
              layout
              className="preloader-logo-wrapper"
              style={{
                width: logoSize,
                height: logoSize,
              }}
              transition={{
                type: 'spring',
                damping: 24,
                stiffness: 110,
              }}
            >
              {/* Expanding Shockwaves on Initial Reveal */}
              {logoPhaseIsReveal && (
                <>
                  <motion.div
                    className="absolute rounded-full border-2 border-accent/40"
                    initial={{ width: 60, height: 60, opacity: 0.8, scale: 0.5 }}
                    animate={{ width: 380, height: 380, opacity: 0, scale: 1.6 }}
                    transition={{ duration: 1.3, ease: 'easeOut', delay: 0.35 }}
                    style={{ position: 'absolute' }}
                  />
                  <motion.div
                    className="absolute rounded-full border border-neon-cyan/35"
                    initial={{ width: 60, height: 60, opacity: 0.8, scale: 0.5 }}
                    animate={{ width: 320, height: 320, opacity: 0, scale: 1.4 }}
                    transition={{ duration: 1.5, ease: 'easeOut', delay: 0.55 }}
                    style={{ position: 'absolute' }}
                  />
                </>
              )}

              {/* Outer glow ring */}
              <motion.div
                layout
                className="preloader-glow-ring preloader-glow-ring-outer"
                style={{ width: outerRingSize, height: outerRingSize }}
                transition={{ type: 'spring', damping: 24, stiffness: 110 }}
              />
              {/* Inner glow ring */}
              <motion.div
                layout
                className="preloader-glow-ring preloader-glow-ring-inner"
                style={{ width: innerRingSize, height: innerRingSize }}
                transition={{ type: 'spring', damping: 24, stiffness: 110 }}
              />

              {/* Logo image with clip-path reveal */}
              <motion.div
                layout
                className="preloader-logo-clip"
                initial={{ clipPath: 'circle(0% at 50% 50%)' }}
                animate={{ clipPath: 'circle(100% at 50% 50%)' }}
                style={{ width: clipSize, height: clipSize, borderRadius: '50%' }}
                transition={{
                  duration: 1.2,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.2,
                }}
              >
                <img
                  src="/LOGO.png"
                  alt="MP Logo"
                  className="preloader-logo-img"
                  draggable={false}
                />
              </motion.div>

              {/* Shimmer sweep across logo */}
              <motion.div
                className="preloader-shimmer"
                initial={{ x: '-120%' }}
                animate={{ x: '120%' }}
                transition={{
                  duration: 1.0,
                  ease: 'easeInOut',
                  delay: 1.0,
                }}
              />
            </motion.div>

            {/* ── NAME ── */}
            <motion.div
              className="preloader-name-container"
              initial={{ opacity: 0, y: 16 }}
              animate={showText ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {renderTypedName()}
            </motion.div>

            {/* ── PROGRESS BAR ── */}
            <motion.div
              className="preloader-bar-container"
              initial={{ opacity: 0, scaleX: 0.6 }}
              animate={showBar ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0.6 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="preloader-bar-track">
                <div
                  className="preloader-bar-fill"
                  style={{ width: `${progress}%` }}
                />
                <div
                  className="preloader-bar-glow"
                  style={{ left: `${progress}%` }}
                />
              </div>
              <span className="preloader-bar-pct">{Math.round(progress)}%</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
