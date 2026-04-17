import React from 'react';
import { motion } from 'framer-motion';

const columns = [0, 1, 2, 3, 4];

const CraziestTransition = ({ children }) => {
  return (
    <>
      <div className="w-full h-full" style={{ perspective: '1500px' }}>
        {/* Intricate 3D Page Folding Animation */}
        <motion.div
          className="w-full h-full origin-center"
          initial={{ opacity: 0, scale: 1.1, rotateX: 15, rotateY: -10, filter: 'blur(20px)' }}
          animate={{ opacity: 1, scale: 1, rotateX: 0, rotateY: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 0.8, rotateX: -15, rotateY: 10, filter: 'blur(20px)' }}
          transition={{
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1], // Cinematic ease (Expo)
          }}
        >
          {children}
        </motion.div>
      </div>

      {/* Cyber Shutter Vertical Columns Wipe */}
      <div className="fixed inset-0 z-[9999] pointer-events-none flex overflow-hidden">
        {columns.map((i) => (
          <motion.div
            key={i}
            className="flex-1 bg-black relative border-r border-white/5"
            style={{ 
              boxShadow: '0 0 50px rgba(139, 92, 246, 0.1) inset'
            }}
            initial={{ top: '0%' }}
            animate={{ top: '-100%' }}
            exit={{ top: ['100%', '0%'] }}
            transition={{
              duration: 0.6,
              ease: [0.76, 0, 0.24, 1],
              delay: i * 0.05,
            }}
          >
            {/* Glowing borders of the shutter blades */}
            <div className="absolute top-0 w-full h-[3px] bg-gradient-to-r from-accent to-neon-cyan opacity-80" />
            <div className="absolute bottom-0 w-full h-[3px] bg-gradient-to-r from-neon-pink to-accent opacity-80" />
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default CraziestTransition;
