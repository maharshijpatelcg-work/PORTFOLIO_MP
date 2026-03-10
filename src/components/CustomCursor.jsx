import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Disable on mobile
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.body.style.cursor = 'none';

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles = [];
    let mouse = { x: width / 2, y: height / 2, moved: false };
    let lastMouse = { x: width / 2, y: height / 2 };
    let pointsHistory = [];

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', onResize);

    const onMouseMove = (e) => {
      lastMouse.x = mouse.x;
      lastMouse.y = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.moved = true;

      pointsHistory.push({ x: mouse.x, y: mouse.y });
      if (pointsHistory.length > 10) pointsHistory.shift();

      // Spawn particles between the last mouse position and the current one
      const dx = mouse.x - lastMouse.x;
      const dy = mouse.y - lastMouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const steps = Math.min(Math.floor(distance / 4), 10); // Spaced sparks

      for (let i = 0; i < steps; i++) {
        const x = lastMouse.x + dx * (i / steps);
        const y = lastMouse.y + dy * (i / steps);
        spawnParticle(x, y);
      }

      // Spawn at exact mouse point too
      spawnParticle(mouse.x, mouse.y);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    class Spark {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 4 + 3.0; // Larger sparks
        this.speedX = (Math.random() - 0.5) * 5;
        this.speedY = (Math.random() - 0.5) * 5;
        this.life = 1.0;
        this.decay = Math.random() * 0.05 + 0.05;
      }

      update() {
        // Jagged, erratic movement like electricity
        this.x += this.speedX + (Math.random() - 0.5) * 3;
        this.y += this.speedY + (Math.random() - 0.5) * 3;
        this.size *= 0.94; // Shrink
        this.life -= this.decay; // Burn out
      }

      draw(ctx) {
        if (this.life <= 0) return;

        ctx.globalCompositeOperation = 'lighter';
        ctx.beginPath();

        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size
        );

        // Lightning/electric colors: White core -> Light Blue -> Deep Blue
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.life})`);
        gradient.addColorStop(0.2, `rgba(147, 197, 253, ${this.life})`); // blue-300
        gradient.addColorStop(0.5, `rgba(59, 130, 246, ${this.life * 0.8})`); // blue-500
        gradient.addColorStop(1, `rgba(30, 58, 138, 0)`); // blue-900 transparent

        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const spawnParticle = (x, y) => {
      particles.push(new Spark(x, y));
    };

    let animFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Idle sparks
      if (!mouse.moved && Math.random() > 0.8) {
        spawnParticle(mouse.x + (Math.random() - 0.5) * 10, mouse.y + (Math.random() - 0.5) * 10);
      }
      mouse.moved = false; // reset per frame

      // Draw lightning trail across history points
      if (pointsHistory.length > 2) {
        ctx.globalCompositeOperation = 'lighter';

        // Main cyan glow thicker lightning line
        ctx.beginPath();
        ctx.moveTo(pointsHistory[0].x, pointsHistory[0].y);
        for (let i = 1; i < pointsHistory.length; i++) {
          const jiggleX = (Math.random() - 0.5) * 6; // Jagged offset
          const jiggleY = (Math.random() - 0.5) * 6;
          ctx.lineTo(pointsHistory[i].x + jiggleX, pointsHistory[i].y + jiggleY);
        }
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.5)'; // Blue
        ctx.lineWidth = 3.5; // Thicker glow line
        ctx.shadowBlur = 25; // Larger shadow
        ctx.shadowColor = '#3b82f6';
        ctx.stroke();

        // Inner white-hot core of the lightning trail
        ctx.beginPath();
        ctx.moveTo(pointsHistory[0].x, pointsHistory[0].y);
        for (let i = 1; i < pointsHistory.length; i++) {
          const jiggleX = (Math.random() - 0.5) * 4; // Tighter core jaggedness
          const jiggleY = (Math.random() - 0.5) * 4;
          ctx.lineTo(pointsHistory[i].x + jiggleX, pointsHistory[i].y + jiggleY);
        }
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 1.5; // Thicker core
        ctx.stroke();
      }

      // Shrink history over time if mouse not moved to retract the tail
      if (pointsHistory.length > 0) {
        pointsHistory.shift();
      }

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(ctx);
        if (particles[i].life <= 0 || particles[i].size <= 0.2) {
          particles.splice(i, 1);
          i--;
        }
      }

      // Render the central electric cursor (Lightning Bolt in Circle)
      ctx.globalCompositeOperation = 'source-over';

      // Outer blue ring
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 18, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.8)'; // Bright Blue
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#3b82f6';
      ctx.stroke();

      // Inner lightning bolt path
      ctx.beginPath();
      ctx.moveTo(mouse.x + 3, mouse.y - 12);
      ctx.lineTo(mouse.x - 6, mouse.y + 0);
      ctx.lineTo(mouse.x + 1, mouse.y + 0);
      ctx.lineTo(mouse.x - 4, mouse.y + 13);
      ctx.lineTo(mouse.x + 7, mouse.y - 2);
      ctx.lineTo(mouse.x + 0, mouse.y - 2);
      ctx.closePath();

      ctx.fillStyle = '#ffffff';
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#60a5fa'; // Lighter blue glow
      ctx.fill();

      // Give lightning a thin blue border
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.shadowBlur = 0; // reset

      animFrameId = requestAnimationFrame(animate);
    };

    animate();

    const attachHoverListeners = () => {
      const hoverables = document.querySelectorAll('a, button, input, textarea, [role="button"]');
      hoverables.forEach((el) => {
        el.style.cursor = 'none';
      });
    };

    setTimeout(attachHoverListeners, 100);
    const observer = new MutationObserver(attachHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animFrameId);
      document.body.style.cursor = 'auto';
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999] hidden md:block"
    />
  );
};

export default CustomCursor;
