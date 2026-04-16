import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowUp, FiHeart, FiGithub, FiLinkedin, FiTwitter, FiInstagram, FiYoutube } from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Skills', path: '/skills' },
    { name: 'Projects', path: '/projects' },
    { name: 'Certificates', path: '/certificates' },
    { name: 'Contact', path: '/contact' },
  ];

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <footer className="relative border-t border-white/5">
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <motion.div
        variants={contentVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mx-auto max-w-7xl px-4 py-16"
      >
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-3">
          <motion.div variants={itemVariants}>
            <div className="mb-4 flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-accent to-neon-cyan opacity-80" />
                <span className="relative font-display text-lg font-bold text-white">M</span>
              </div>
              <span className="font-display text-lg font-semibold text-white">
                Maharshi<span className="text-accent-light">.</span>
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-gray-500">
              Crafting exceptional digital experiences through clean code and creative design.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="mb-4 text-sm font-mono uppercase tracking-widest text-gray-400">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-sm text-gray-500 transition-colors duration-300 hover:text-accent-light"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="mb-4 text-sm font-mono uppercase tracking-widest text-gray-400">Connect</h4>
            <div className="flex flex-wrap gap-3">
              {[
                { Icon: FiGithub, href: 'https://github.com/maharshijpatelcg-work' },
                { Icon: FiLinkedin, href: 'https://www.linkedin.com/in/maharshi-patel-1b08b0395/' },
                { Icon: FiTwitter, href: 'https://x.com/Maharshi_245707' },
                { Icon: FiInstagram, href: 'https://www.instagram.com/mr._.maharshi_24/' },
                { Icon: SiLeetcode, href: 'https://leetcode.com/u/MaharshiPatel24/' },
                { Icon: FiYoutube, href: 'https://youtube.com/@YourChannelHere' },
              ].map(({ Icon, href }, index) => (
                <a
                  key={`${href}-${index}`}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg glass p-2.5 text-gray-500 transition-all duration-300 hover:bg-white/10 hover:text-white"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="mb-8 h-px bg-white/5" />

        <motion.div variants={itemVariants} className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="flex items-center gap-1 text-sm text-gray-600">
            © {new Date().getFullYear()} Maharshi Patel. Built with
            <FiHeart className="text-xs text-red-400" />
            and React
          </p>

          <p className="font-mono text-xs text-gray-700">Designed &amp; Developed by Maharshi Patel</p>
        </motion.div>
      </motion.div>

      <motion.button
        onClick={scrollToTop}
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 rounded-full bg-gradient-to-r from-accent to-neon-cyan p-3 text-white shadow-glow-md magnetic-btn"
      >
        <FiArrowUp size={20} />
      </motion.button>
    </footer>
  );
};

export default Footer;
