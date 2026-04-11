import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHome, FiUser, FiCpu, FiFolder, FiAward, FiCode, FiMail, FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'Home', href: '/', sectionId: 'home', icon: FiHome },
    { name: 'About', href: '/about', sectionId: 'about', icon: FiUser },
    { name: 'Skills', href: '/skills', sectionId: 'skills', icon: FiCpu },
    { name: 'Projects', href: '/projects', sectionId: 'projects', icon: FiFolder },
    { name: 'Certificates', href: '/certificates', sectionId: 'certificates', icon: FiAward },
    { name: 'LeetCode', href: '/leetcode', sectionId: 'leetcode', icon: FiCode },
    { name: 'Contact', href: '/contact', sectionId: 'contact', icon: FiMail },
  ];

  // Determine active link based on current route or scroll position (for home page)
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    if (!isHomePage) {
      // On sub-pages, set active based on route
      const match = navLinks.find(l => l.href === location.pathname);
      if (match) setActiveSection(match.sectionId);
      return;
    }

    // On home page, track scroll position
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const sectionIds = navLinks.map(l => l.sectionId);
        for (let i = sectionIds.length - 1; i >= 0; i--) {
          const el = document.getElementById(sectionIds[i]);
          if (el && el.getBoundingClientRect().top <= 150) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage, location.pathname]);

  // Handle navigation — on home page, scroll to section; on other pages, navigate via router
  const handleNavClick = (link) => {
    if (isHomePage) {
      // Scroll to section on home page
      const el = document.getElementById(link.sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileOpen(false);
  };

  // Generate the correct link target
  const getLinkTarget = (link) => {
    if (isHomePage) {
      return `/#${link.sectionId}`;
    }
    return link.href;
  };

  return (
    <>
      {/* ═══ Desktop Vertical Sidebar ═══ */}
      <motion.nav
        initial={{ x: -80 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed left-0 top-0 h-full z-50 hidden md:flex flex-col items-center py-6 px-2"
        style={{
          width: '64px',
          background: 'linear-gradient(180deg, rgba(10,10,20,0.85) 0%, rgba(8,8,18,0.9) 100%)',
          borderRight: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        {/* Logo */}
        <Link to="/" className="group mb-8">
          <div className="relative w-10 h-10 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-accent to-neon-cyan rounded-xl opacity-80 group-hover:opacity-100 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]" />
            <span className="relative text-white font-display font-bold text-lg">M</span>
          </div>
        </Link>

        {/* Divider */}
        <div className="w-6 h-px bg-white/10 mb-4" />

        {/* Nav Icons */}
        <div className="flex-1 flex flex-col items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.sectionId;

            return (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => setHoveredItem(link.name)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link
                  to={link.href}
                  onClick={() => handleNavClick(link)}
                  className={`relative flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'text-white'
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {/* Active background */}
                  {isActive && (
                    <motion.div
                      layoutId="activeSidebar"
                      className="absolute inset-0 bg-white/10 rounded-xl"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}

                  {/* Active left bar indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeBar"
                      className="absolute -left-2 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-accent rounded-full"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}

                  <Icon size={19} className="relative z-10" />
                </Link>

                {/* Tooltip */}
                <AnimatePresence>
                  {hoveredItem === link.name && (
                    <motion.div
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg text-xs font-medium text-white whitespace-nowrap z-[60]"
                      style={{
                        background: 'rgba(20,20,35,0.95)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                      }}
                    >
                      {link.name}
                      {/* Arrow */}
                      <div
                        className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0"
                        style={{
                          borderTop: '5px solid transparent',
                          borderBottom: '5px solid transparent',
                          borderRight: '5px solid rgba(20,20,35,0.95)',
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom divider */}
        <div className="w-6 h-px bg-white/10 mb-4" />

        {/* Bottom profile avatar */}
        <Link to="/contact" className="group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent/30 to-neon-cyan/30 flex items-center justify-center border border-white/10 group-hover:border-accent/40 transition-all duration-300 overflow-hidden">
            <span className="text-xs font-display font-bold text-white/70 group-hover:text-white transition-colors">MP</span>
          </div>
        </Link>
      </motion.nav>

      {/* ═══ Mobile Top Bar ═══ */}
      <motion.div
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 md:hidden"
      >
        <div className="flex items-center justify-between px-4 py-3"
          style={{
            background: 'rgba(10,10,20,0.85)',
            borderBottom: '1px solid rgba(255,255,255,0.04)',
          }}
        >
          <Link to="/" className="flex items-center">
            <div className="relative w-9 h-9 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-accent to-neon-cyan rounded-lg opacity-80" />
              <span className="relative text-white font-display font-bold text-sm">M</span>
            </div>
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>

        {/* Mobile menu dropdown */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
              style={{
                background: 'rgba(10,10,20,0.95)',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div className="flex flex-col p-3 gap-0.5">
                {navLinks.map((link, i) => {
                  const Icon = link.icon;
                  const isActive = activeSection === link.sectionId;

                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <Link
                        to={link.href}
                        onClick={() => handleNavClick(link)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                          isActive
                            ? 'bg-white/10 text-white'
                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <Icon size={18} />
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default Navbar;
