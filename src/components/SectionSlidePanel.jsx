import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import {
  FiHome, FiUser, FiCpu, FiFolder, FiLayout,
  FiTerminal, FiAward, FiStar, FiCode, FiFileText,
  FiMail, FiChevronLeft, FiChevronRight, FiLayers, FiX
} from 'react-icons/fi';

const SECTIONS = [
  { id: 'home', name: 'Home', icon: FiHome, color: '#8b5cf6', gradient: 'from-violet-600 to-purple-800' },
  { id: 'about', name: 'About', icon: FiUser, color: '#06b6d4', gradient: 'from-cyan-500 to-blue-700' },
  { id: 'skills', name: 'Skills', icon: FiCpu, color: '#ef4444', gradient: 'from-red-500 to-orange-700' },
  { id: 'projects', name: 'Projects', icon: FiFolder, color: '#10b981', gradient: 'from-emerald-500 to-teal-700' },
  { id: 'figmas', name: 'Figma', icon: FiLayout, color: '#f472b6', gradient: 'from-pink-400 to-rose-700' },
  { id: 'hackathons', name: 'Hackathons', icon: FiTerminal, color: '#f59e0b', gradient: 'from-amber-400 to-yellow-700' },
  { id: 'certificates', name: 'Certificates', icon: FiAward, color: '#6366f1', gradient: 'from-indigo-500 to-violet-700' },
  { id: 'achievements', name: 'Milestones', icon: FiStar, color: '#eab308', gradient: 'from-yellow-400 to-amber-700' },
  { id: 'leetcode', name: 'LeetCode', icon: FiCode, color: '#22c55e', gradient: 'from-green-500 to-emerald-700' },
  { id: 'resume', name: 'Resume', icon: FiFileText, color: '#a855f7', gradient: 'from-purple-500 to-fuchsia-700' },
  { id: 'contact', name: 'Contact', icon: FiMail, color: '#06b6d4', gradient: 'from-cyan-400 to-sky-700' },
];

const SectionSlidePanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const panelRef = useRef(null);
  const activeThumbnailRef = useRef(null);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Scroll-spy: detect which section is currently in view
  useEffect(() => {
    if (!isHomePage) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        let current = 'home';
        for (let i = SECTIONS.length - 1; i >= 0; i--) {
          const el = document.getElementById(SECTIONS[i].id);
          if (el && el.getBoundingClientRect().top <= 200) {
            current = SECTIONS[i].id;
            break;
          }
        }
        setActiveSection((prev) => (prev !== current ? current : prev));
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHomePage]);

  // Auto-scroll the panel to keep active thumbnail visible
  useEffect(() => {
    if (isOpen && activeThumbnailRef.current && panelRef.current) {
      const panel = panelRef.current;
      const thumb = activeThumbnailRef.current;
      const panelRect = panel.getBoundingClientRect();
      const thumbRect = thumb.getBoundingClientRect();

      if (thumbRect.top < panelRect.top + 60 || thumbRect.bottom > panelRect.bottom - 20) {
        thumb.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [activeSection, isOpen]);

  // Close panel on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClick = useCallback((sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // Close panel on mobile after clicking
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  }, []);

  // Only show on home page
  if (!isHomePage) return null;

  return (
    <>
      {/* ===== DESKTOP TOGGLE BUTTON (right edge) ===== */}
      <motion.button
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed z-[55] hidden md:flex items-center justify-center"
        style={{
          right: isOpen ? '324px' : '0px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '36px',
          height: '72px',
          background: 'linear-gradient(180deg, rgba(139,92,246,0.9) 0%, rgba(6,182,212,0.8) 100%)',
          borderRadius: '12px 0 0 12px',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRight: 'none',
          boxShadow: '0 4px 20px rgba(139,92,246,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
          transition: 'right 0.35s cubic-bezier(0.25,0.46,0.45,0.94)',
          cursor: 'pointer',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={isOpen ? 'Close slide panel' : 'Open slide panel'}
      >
        <div className="flex flex-col items-center gap-1">
          <FiLayers size={14} className="text-white" />
          {isOpen
            ? <FiChevronRight size={14} className="text-white/80" />
            : <FiChevronLeft size={14} className="text-white/80" />
          }
        </div>
      </motion.button>

      {/* ===== MOBILE TOGGLE BUTTON (bottom-right FAB) ===== */}
      <motion.button
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.4 }}
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed z-[55] md:hidden flex items-center justify-center"
        style={{
          right: '16px',
          bottom: '80px',
          width: '48px',
          height: '48px',
          background: 'linear-gradient(135deg, rgba(139,92,246,0.95) 0%, rgba(6,182,212,0.9) 100%)',
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: '0 4px 24px rgba(139,92,246,0.5), 0 2px 8px rgba(0,0,0,0.3)',
          cursor: 'pointer',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Toggle slide navigator"
      >
        {isOpen
          ? <FiX size={20} className="text-white" />
          : <FiLayers size={20} className="text-white" />
        }
      </motion.button>

      {/* ===== MOBILE BACKDROP OVERLAY ===== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[53] bg-black/60 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>

      {/* ===== SLIDE PANEL ===== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: 340, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 340, opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300, mass: 0.8 }}
            ref={panelRef}
            className="fixed right-0 top-0 z-[54] flex flex-col h-full"
            style={{
              width: 'min(320px, 85vw)',
              background: 'linear-gradient(180deg, rgba(8,8,18,0.97) 0%, rgba(5,5,12,0.98) 100%)',
              borderLeft: '1px solid rgba(255,255,255,0.06)',
              boxShadow: '-8px 0 40px rgba(0,0,0,0.5)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            {/* Panel Header */}
            <div
              className="flex items-center gap-2 px-4 py-3 shrink-0"
              style={{
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(139,92,246,0.08)',
              }}
            >
              <FiLayers size={14} className="text-purple-400" />
              <span className="text-xs font-semibold text-white/80 tracking-wider uppercase">
                Sections
              </span>
              <span className="ml-auto text-[10px] text-white/30 font-mono">
                {SECTIONS.findIndex((s) => s.id === activeSection) + 1}/{SECTIONS.length}
              </span>
              {/* Mobile close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="ml-2 md:hidden p-1 rounded-md hover:bg-white/10 transition-colors"
              >
                <FiX size={16} className="text-white/60" />
              </button>
            </div>

            {/* Thumbnails Grid — 2 columns */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-3 scrollbar-thin">
              <div className="grid grid-cols-2 gap-2">
                {SECTIONS.map((section, index) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;

                  return (
                    <motion.button
                      key={section.id}
                      ref={isActive ? activeThumbnailRef : undefined}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      onClick={() => handleClick(section.id)}
                      className="group relative w-full text-left rounded-lg overflow-hidden cursor-pointer"
                      style={{
                        border: isActive
                          ? `2px solid ${section.color}`
                          : '2px solid rgba(255,255,255,0.06)',
                        background: isActive
                          ? 'rgba(255,255,255,0.06)'
                          : 'rgba(255,255,255,0.02)',
                        transition: 'all 0.3s cubic-bezier(0.25,0.46,0.45,0.94)',
                      }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {/* Mini slide preview area */}
                      <div
                        className={`relative w-full h-14 sm:h-16 bg-gradient-to-br ${section.gradient} overflow-hidden`}
                        style={{ opacity: isActive ? 1 : 0.45 }}
                      >
                        {/* Grid pattern overlay */}
                        <div
                          className="absolute inset-0"
                          style={{
                            backgroundImage:
                              'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
                            backgroundSize: '16px 16px',
                            opacity: 0.4,
                          }}
                        />
                        {/* Center icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Icon size={20} className="text-white/90 drop-shadow-lg" />
                        </div>
                        {/* Slide number badge */}
                        <div
                          className="absolute top-1 left-1 flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded text-[8px] sm:text-[9px] font-bold"
                          style={{
                            background: isActive ? section.color : 'rgba(0,0,0,0.5)',
                            color: 'white',
                            boxShadow: isActive ? `0 0 8px ${section.color}60` : 'none',
                          }}
                        >
                          {index + 1}
                        </div>
                        {/* Active indicator glow */}
                        {isActive && (
                          <div
                            className="absolute inset-0"
                            style={{
                              background: `radial-gradient(circle at center, ${section.color}30 0%, transparent 70%)`,
                              boxShadow: `inset 0 0 20px ${section.color}20`,
                            }}
                          />
                        )}
                      </div>

                      {/* Section name */}
                      <div className="px-1.5 py-1 flex items-center gap-1">
                        <span
                          className="text-[9px] sm:text-[10px] font-medium truncate flex-1"
                          style={{
                            color: isActive ? section.color : 'rgba(255,255,255,0.5)',
                            transition: 'color 0.3s ease',
                          }}
                        >
                          {section.name}
                        </span>
                        {isActive && (
                          <div
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ background: section.color, boxShadow: `0 0 6px ${section.color}` }}
                          />
                        )}
                      </div>

                      {/* Hover highlight */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none rounded-lg"
                        style={{
                          background: `linear-gradient(135deg, ${section.color}10, transparent)`,
                          transition: 'opacity 0.3s ease',
                        }}
                      />
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Panel Footer */}
            <div
              className="shrink-0 px-3 py-2 flex items-center justify-center"
              style={{
                borderTop: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(0,0,0,0.2)',
              }}
            >
              <span className="text-[9px] text-white/20 font-mono tracking-wider">
                SLIDE NAVIGATOR
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SectionSlidePanel;
