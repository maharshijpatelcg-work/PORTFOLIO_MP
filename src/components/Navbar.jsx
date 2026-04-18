import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHome, FiUser, FiCpu, FiFolder, FiAward, FiCode, FiMail, FiMenu, FiX, FiLayout, FiTerminal, FiStar, FiFileText } from 'react-icons/fi';

const NAV_LINKS = [
  { name: 'Home', href: '/', sectionId: 'home', icon: FiHome },
  { name: 'About', href: '/about', sectionId: 'about', icon: FiUser },
  { name: 'Skills', href: '/skills', sectionId: 'skills', icon: FiCpu },
  { name: 'Projects', href: '/projects', sectionId: 'projects', icon: FiFolder },
  { name: 'Figma', href: '/figma-designs', sectionId: 'figmas', icon: FiLayout },
  { name: 'Hackathons', href: '/hackathons', sectionId: 'hackathons', icon: FiTerminal },
  { name: 'Certificates', href: '/certificates', sectionId: 'certificates', icon: FiAward },
  { name: 'Milestones', href: '/achievements', sectionId: 'achievements', icon: FiStar },
  { name: 'LeetCode', href: '/leetcode', sectionId: 'leetcode', icon: FiCode },
  { name: 'Resume', href: '/resume', sectionId: 'resume', icon: FiFileText },
  { name: 'Contact', href: '/contact', sectionId: 'contact', icon: FiMail },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeHomeSection, setActiveHomeSection] = useState('home');

  const isHomePage = location.pathname === '/';
  const routeSection = NAV_LINKS.find((link) => link.href === location.pathname)?.sectionId ?? 'home';
  const activeSection = isHomePage ? activeHomeSection : routeSection;

  useEffect(() => {
    if (!isHomePage) {
      return undefined;
    }

    let ticking = false;

    const syncActiveSection = () => {
      if (ticking) {
        return;
      }

      ticking = true;

      requestAnimationFrame(() => {
        const sectionIds = NAV_LINKS.map((link) => link.sectionId);
        let nextSection = 'home';

        for (let index = sectionIds.length - 1; index >= 0; index -= 1) {
          const element = document.getElementById(sectionIds[index]);

          if (element && element.getBoundingClientRect().top <= 150) {
            nextSection = sectionIds[index];
            break;
          }
        }

        setActiveHomeSection((current) => (current === nextSection ? current : nextSection));
        ticking = false;
      });
    };

    syncActiveSection();
    window.addEventListener('scroll', syncActiveSection, { passive: true });
    window.addEventListener('resize', syncActiveSection);

    return () => {
      window.removeEventListener('scroll', syncActiveSection);
      window.removeEventListener('resize', syncActiveSection);
    };
  }, [isHomePage]);

  const handleNavClick = (event, link) => {
    // Rely on React Router's native <Link> for true page navigation
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ x: -80 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed left-0 top-0 z-50 hidden h-full flex-col items-center px-2 py-6 md:flex"
        style={{
          width: '64px',
          background: 'linear-gradient(180deg, rgba(10,10,20,0.85) 0%, rgba(8,8,18,0.9) 100%)',
          borderRight: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        <Link to="/" className="group mb-8">
          <div className="relative flex h-10 w-10 items-center justify-center">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent to-neon-cyan opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]" />
            <span className="relative font-display text-lg font-bold text-white">M</span>
          </div>
        </Link>

        <div className="mb-4 h-px w-6 bg-white/10" />

        <div className="flex flex-1 flex-col items-center gap-1">
          {NAV_LINKS.map((link) => {
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
                  onClick={(event) => handleNavClick(event, link)}
                  className={`relative flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300 ${
                    isActive ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSidebar"
                      className="absolute inset-0 rounded-xl bg-white/10"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}

                  {isActive && (
                    <motion.div
                      layoutId="activeBar"
                      className="absolute -left-2 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-accent"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}

                  <Icon size={19} className="relative z-10" />
                </Link>

                <AnimatePresence>
                  {hoveredItem === link.name && (
                    <motion.div
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-full top-1/2 z-[60] ml-3 -translate-y-1/2 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium text-white"
                      style={{
                        background: 'rgba(20,20,35,0.95)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                      }}
                    >
                      {link.name}
                      <div
                        className="absolute right-full top-1/2 h-0 w-0 -translate-y-1/2"
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

        <div className="mb-4 h-px w-6 bg-white/10" />

        <Link to="/contact" className="group">
          <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-gradient-to-br from-accent/30 to-neon-cyan/30 transition-all duration-300 group-hover:border-accent/40">
            <span className="font-display text-xs font-bold text-white/70 transition-colors group-hover:text-white">
              MP
            </span>
          </div>
        </Link>
      </motion.nav>

      <motion.div
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fixed left-0 right-0 top-0 z-50 md:hidden"
      >
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{
            background: 'rgba(10,10,20,0.85)',
            borderBottom: '1px solid rgba(255,255,255,0.04)',
          }}
        >
          <Link to="/" className="flex items-center">
            <div className="relative flex h-9 w-9 items-center justify-center">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-accent to-neon-cyan opacity-80" />
              <span className="relative font-display text-sm font-bold text-white">M</span>
            </div>
          </Link>

          <button
            onClick={() => setMobileOpen((current) => !current)}
            className="p-2 text-gray-400 transition-colors hover:text-white"
          >
            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>

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
              <div className="flex flex-col gap-0.5 p-3">
                {NAV_LINKS.map((link, index) => {
                  const Icon = link.icon;
                  const isActive = activeSection === link.sectionId;

                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04 }}
                    >
                      <Link
                        to={link.href}
                        onClick={(event) => handleNavClick(event, link)}
                        className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
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
