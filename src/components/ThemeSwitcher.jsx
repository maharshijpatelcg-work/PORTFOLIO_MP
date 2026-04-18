import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSettings, FiX, FiDroplet, FiCheck } from 'react-icons/fi';

const PRESETS = [
  {
    id: 'galactic',
    name: 'Galactic Purple',
    colors: {
      accent: '#8b5cf6', accentLight: '#a855f7', accentDark: '#6d28d9',
      neonCyan: '#06b6d4', neonPurple: '#c084fc', neonPink: '#f472b6', neonBlue: '#3b82f6'
    }
  },
  {
    id: 'magma',
    name: 'Magma Orange',
    colors: {
      accent: '#ea580c', accentLight: '#f97316', accentDark: '#c2410c',
      neonCyan: '#facc15', neonPurple: '#fb923c', neonPink: '#f87171', neonBlue: '#fbbf24'
    }
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk 2077',
    colors: {
      accent: '#eab308', accentLight: '#fef08a', accentDark: '#a16207',
      neonCyan: '#06b6d4', neonPurple: '#22d3ee', neonPink: '#67e8f9', neonBlue: '#0ea5e9'
    }
  },
  {
    id: 'bloodmoon',
    name: 'Blood Moon',
    colors: {
      accent: '#dc2626', accentLight: '#ef4444', accentDark: '#991b1b',
      neonCyan: '#fca5a5', neonPurple: '#f87171', neonPink: '#ef4444', neonBlue: '#dc2626'
    }
  },
  {
    id: 'solar',
    name: 'Solar Flare',
    colors: {
      accent: '#f59e0b', accentLight: '#fbbf24', accentDark: '#d97706',
      neonCyan: '#fef08a', neonPurple: '#fde047', neonPink: '#fcd34d', neonBlue: '#fbbf24'
    }
  },
  {
    id: 'matrix',
    name: 'Matrix Phosphor',
    colors: {
      accent: '#22c55e', accentLight: '#4ade80', accentDark: '#16a34a',
      neonCyan: '#86efac', neonPurple: '#86efac', neonPink: '#4ade80', neonBlue: '#22c55e'
    }
  },
  {
    id: 'abyssal',
    name: 'Abyssal Blue',
    colors: {
      accent: '#2563eb', accentLight: '#60a5fa', accentDark: '#1d4ed8',
      neonCyan: '#93c5fd', neonPurple: '#60a5fa', neonPink: '#3b82f6', neonBlue: '#2563eb'
    }
  },
  {
    id: 'synthwave',
    name: 'Synthwave',
    colors: {
      accent: '#ec4899', accentLight: '#f472b6', accentDark: '#be185d',
      neonCyan: '#a855f7', neonPurple: '#c084fc', neonPink: '#d8b4fe', neonBlue: '#8b5cf6'
    }
  },
  {
    id: 'stealth',
    name: 'Monochrome Stealth',
    colors: {
      accent: '#737373', accentLight: '#a3a3a3', accentDark: '#525252',
      neonCyan: '#e5e5e5', neonPurple: '#d4d4d4', neonPink: '#a3a3a3', neonBlue: '#737373'
    }
  },
  {
    id: 'velvet',
    name: 'Royal Velvet',
    colors: {
      accent: '#be123c', accentLight: '#e11d48', accentDark: '#881337',
      neonCyan: '#fda4af', neonPurple: '#fb7185', neonPink: '#f43f5e', neonBlue: '#e11d48'
    }
  }
];

// Helper to lighten/darken hex codes for custom builder
const alterShade = (hex, percent) => {
  let r = parseInt(hex.substring(1,3), 16);
  let g = parseInt(hex.substring(3,5), 16);
  let b = parseInt(hex.substring(5,7), 16);
  r = Math.min(255, Math.max(0, Math.floor(r * (1 + percent))));
  g = Math.min(255, Math.max(0, Math.floor(g * (1 + percent))));
  b = Math.min(255, Math.max(0, Math.floor(b * (1 + percent))));
  return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).padStart(6, '0')}`;
};

const ThemeSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeThemeId, setActiveThemeId] = useState('galactic');
  const [customAccent, setCustomAccent] = useState('#8b5cf6');
  const [customNeon, setCustomNeon] = useState('#06b6d4');
  
  // Wave Transition State Removed per User Request
  const [isProcessing, setIsProcessing] = useState(false);

  // Progressive DOM Sweep Application
  const applyTheme = (colors) => {
    // Grab all DOM chunks that we want to sequence top-to-bottom
    const elements = document.querySelectorAll('section, footer, nav, .arcade-hub, .hero-section');
    
    // Sort array by strict absolute Y-axis layout position
    const sorted = Array.from(elements).sort((a, b) => {
       const aY = a.getBoundingClientRect().top + window.scrollY;
       const bY = b.getBoundingClientRect().top + window.scrollY;
       return aY - bY;
    });

    // 1. Force Root CSS Variables safely as fallback
    const root = document.documentElement;
    root.style.setProperty('--color-accent', colors.accent);
    root.style.setProperty('--color-accent-light', colors.accentLight);
    root.style.setProperty('--color-accent-dark', colors.accentDark);
    root.style.setProperty('--color-neon-cyan', colors.neonCyan);
    root.style.setProperty('--color-neon-purple', colors.neonPurple);
    root.style.setProperty('--color-neon-pink', colors.neonPink);
    root.style.setProperty('--color-neon-blue', colors.neonBlue);

    // 2. Cascade visually down the DOM nodes
    sorted.forEach((el, index) => {
      // We calculate a sweep delay so it paints top-to-bottom visibly
      setTimeout(() => {
        // Enforce smooth CSS transitions on color variables for the element scope
        el.style.transition = 'color 1s ease, background-color 1s ease, border-color 1s ease, box-shadow 1s ease';
        
        el.style.setProperty('--color-accent', colors.accent);
        el.style.setProperty('--color-accent-light', colors.accentLight);
        el.style.setProperty('--color-accent-dark', colors.accentDark);
        el.style.setProperty('--color-neon-cyan', colors.neonCyan);
        el.style.setProperty('--color-neon-purple', colors.neonPurple);
        el.style.setProperty('--color-neon-pink', colors.neonPink);
        el.style.setProperty('--color-neon-blue', colors.neonBlue);
      }, index * 250); // 250ms visual rippling cascade down the sections
    });
  };

  // Orchestrator: Binds the DOM Sweep to local storage tracking
  const orchestrateThemeChange = (colorProfile, themeId, typeStr) => {
    if (isProcessing) return; 
    setIsProcessing(true);
    
    // Trigger Sweep
    applyTheme(colorProfile);
    setActiveThemeId(themeId);
    
    if (typeStr === 'preset') {
       localStorage.setItem('portfolio-theme', JSON.stringify({ type: 'preset', id: themeId }));
    } else {
       localStorage.setItem('portfolio-theme', JSON.stringify({ type: 'custom', colors: colorProfile }));
    }

    // Unlock
    setTimeout(() => {
       setIsProcessing(false);
    }, 2000); 
  };

  const handleSelectPreset = (preset) => {
    if (activeThemeId === preset.id) return;
    orchestrateThemeChange(preset.colors, preset.id, 'preset');
  };

  const handleApplyCustom = () => {
    const customColors = {
      accent: customAccent,
      accentLight: alterShade(customAccent, 0.2),
      accentDark: alterShade(customAccent, -0.2),
      neonCyan: customNeon,
      neonPurple: alterShade(customNeon, 0.1),
      neonPink: customNeon,
      neonBlue: alterShade(customAccent, -0.1),
    };
    orchestrateThemeChange(customColors, 'custom', 'custom');
  };

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.type === 'preset') {
          const preset = PRESETS.find(p => p.id === parsed.id);
          if (preset) {
             applyTheme(preset.colors);
             setActiveThemeId(preset.id);
          }
        } else if (parsed.type === 'custom') {
           setActiveThemeId('custom');
           setCustomAccent(parsed.colors.accent);
           setCustomNeon(parsed.colors.neonCyan);
           applyTheme(parsed.colors);
        }
      } catch(e) {}
    }
  }, []);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed right-6 md:right-10 top-[104px] z-[90] flex items-center justify-center w-14 h-14 bg-black/80 backdrop-blur-md border border-white/20 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.1)] text-white hover:scale-105 transition-all duration-300 group"
      >
        <FiDroplet size={20} className="animate-pulse" style={{ color: 'var(--color-accent)' }} />
        
        <span className="absolute right-[70px] bg-black/90 font-mono text-xs px-2 py-1 rounded text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 pointer-events-none whitespace-nowrap">
          Colors
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[140] bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-[150] w-[320px] sm:w-[380px] bg-black/90 border-l border-white/10 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] flex flex-col p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                <h3 className="font-display text-xl font-bold italic tracking-wider text-white flex items-center gap-2">
                  <FiSettings style={{ color: 'var(--color-accent)' }} /> GLOBAL THEME
                </h3>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                  <FiX size={24} />
                </button>
              </div>

              {/* Presets Gallery */}
              <div className="mb-8">
                <h4 className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-4">10 Premium Presets</h4>
                <div className="grid grid-cols-2 gap-3">
                  {PRESETS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handleSelectPreset(p)}
                      disabled={isProcessing}
                      className={`relative flex flex-col items-start p-3 rounded-xl border transition-all ${
                        activeThemeId === p.id ? 'border-white/50 bg-white/10' : 'border-white/5 bg-transparent hover:bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="flex gap-1 mb-2">
                         <div className="w-5 h-5 rounded-full" style={{ backgroundColor: p.colors.accent, boxShadow: `0 0 10px ${p.colors.accent}66` }} />
                         <div className="w-5 h-5 rounded-full" style={{ backgroundColor: p.colors.neonCyan, boxShadow: `0 0 10px ${p.colors.neonCyan}66` }} />
                      </div>
                      <span className="text-xs font-bold text-white tracking-wide text-left">{p.name}</span>
                      {activeThemeId === p.id && <FiCheck className="absolute top-3 right-3 text-white" size={14} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Builder */}
              <div>
                <h4 className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-4 border-t border-white/10 pt-6">Make It Ownself (Customizer)</h4>
                
                <div className="flex flex-col gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                   <div className="flex items-center justify-between">
                     <span className="text-sm font-bold text-gray-300">Base Accent Color</span>
                     <input 
                       type="color" 
                       value={customAccent} 
                       onChange={(e) => setCustomAccent(e.target.value)}
                       className="w-8 h-8 rounded cursor-pointer border-none p-0 bg-transparent"
                     />
                   </div>
                   
                   <div className="flex items-center justify-between">
                     <span className="text-sm font-bold text-gray-300">Neon Particle Color</span>
                     <input 
                       type="color" 
                       value={customNeon} 
                       onChange={(e) => setCustomNeon(e.target.value)}
                       className="w-8 h-8 rounded cursor-pointer border-none p-0 bg-transparent"
                     />
                   </div>

                   <button 
                     onClick={handleApplyCustom}
                     disabled={isProcessing}
                     className="mt-2 w-full py-2.5 rounded-lg font-bold text-sm text-black transition-transform hover:scale-[1.02]"
                     style={{ backgroundColor: customAccent }}
                   >
                     Apply Custom Overrides
                   </button>
                </div>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ThemeSwitcher;
