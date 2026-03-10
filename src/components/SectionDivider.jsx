import React from 'react';

const SectionDivider = () => {
  return (
    <div className="relative h-24 md:h-32 flex items-center justify-center overflow-hidden">
      {/* Gradient line */}
      <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      
      {/* Center glow dot */}
      <div className="absolute w-2 h-2 bg-accent rounded-full shadow-glow-sm" />
      
      {/* Side fading dots */}
      <div className="absolute left-1/2 -translate-x-20 w-1 h-1 bg-neon-cyan/30 rounded-full" />
      <div className="absolute left-1/2 translate-x-20 w-1 h-1 bg-neon-pink/30 rounded-full" />
    </div>
  );
};

export default SectionDivider;
