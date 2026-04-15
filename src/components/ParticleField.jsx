import React, { useMemo } from 'react';

const seededValue = (seed) => {
  const raw = Math.sin(seed * 999.91) * 10000;
  return raw - Math.floor(raw);
};

const ParticleField = () => {
  // Reduced from 50 to 15 particles for smooth performance
  const particles = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: seededValue((i + 1) * 1.37) * 100,
      delay: seededValue((i + 1) * 2.11) * 20,
      duration: 20 + seededValue((i + 1) * 3.73) * 30,
      size: 1 + seededValue((i + 1) * 4.19) * 2,
      opacity: 0.08 + seededValue((i + 1) * 5.03) * 0.15,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-accent/40"
          style={{
            left: `${p.left}%`,
            bottom: '-10px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animation: `float-particle ${p.duration}s linear ${p.delay}s infinite`,
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  );
};

export default ParticleField;
