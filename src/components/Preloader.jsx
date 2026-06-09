import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stage, setStage] = useState('brand');

  useEffect(() => {
    // Lock document scroll on load
    document.body.style.overflow = 'hidden';

    const t1 = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = 'auto';
    }, 3000);

    return () => {
      clearTimeout(t1);
    };
  }, []);

  const word1 = "PATEL".split("");
  const word2 = "MAHARSHI".split("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, scale: 3, y: 60, rotateX: 90 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      rotateX: 0,
      transition: { 
        type: 'spring', 
        stiffness: 180, 
        damping: 14,
        mass: 1.2 
      }
    }
  };

  const textVariants = {
    initial: { opacity: 0, scale: 0.85, y: 30, filter: 'blur(10px)' },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      filter: 'blur(0px)', 
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
    },
    exit: { 
      opacity: 0, 
      scale: 1.1, 
      y: -20, 
      filter: 'blur(8px)', 
      transition: { duration: 0.4 } 
    }
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ 
            y: '-100vh', 
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[100000] flex items-center justify-center bg-[#0a0a0a] overflow-hidden"
        >
          {/* CINEMATIC BACKGROUND */}
          <motion.div 
             initial={{ scale: 1.15, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             transition={{ duration: 2, ease: "easeOut" }}
             className="absolute inset-0 w-full h-full"
          >
             <img 
                src="/preloader-bg.jpg" 
                alt="Preloader Background" 
                className="w-full h-full object-cover brightness-[0.35] blur-[4px] grayscale-[15%]"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60" />
             <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
          </motion.div>

          {/* INNER CONTENT WRAPPER */}
          <div className="relative z-10 w-full flex flex-col items-center justify-center min-h-[300px]">
            <AnimatePresence mode="wait">
              {stage === 'brand' && (
                <motion.div
                  key="brand-stage"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center"
                >
                  <motion.div 
                     variants={containerVariants}
                     initial="hidden"
                     animate="visible"
                     className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-5 px-4"
                  >
                    {/* PATEL — Gold gradient */}
                    <div className="flex">
                      {word1.map((letter, i) => (
                        <motion.span 
                          variants={childVariants} 
                          key={`w1-${i}`}
                          className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight"
                          style={{
                            background: 'linear-gradient(180deg, #fde047 0%, #d97706 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: '0px 0px 40px rgba(234, 179, 8, 0.4)'
                          }}
                        >
                          {letter}
                        </motion.span>
                      ))}
                    </div>

                    {/* MAHARSHI — Pure white */}
                    <div className="flex">
                      {word2.map((letter, i) => (
                        <motion.span 
                          variants={childVariants} 
                          key={`w2-${i}`}
                          className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white"
                          style={{
                            textShadow: '0px 0px 30px rgba(255, 255, 255, 0.3)'
                          }}
                        >
                          {letter}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
