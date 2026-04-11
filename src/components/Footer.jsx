import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowUp, FiHeart, FiGithub, FiLinkedin, FiTwitter, FiInstagram } from 'react-icons/fi';

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
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }
  };

  return (
    <footer className="relative border-t border-white/5">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <motion.div
        variants={contentVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-accent to-neon-cyan rounded-lg opacity-80" />
                <span className="relative text-white font-display font-bold text-lg">M</span>
              </div>
              <span className="font-display font-semibold text-lg text-white">
                Maharshi<span className="text-accent-light">.</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Crafting exceptional digital experiences through clean code and creative design.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-sm font-mono text-gray-400 uppercase tracking-widest mb-4">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-gray-500 hover:text-accent-light text-sm transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Social */}
          <motion.div variants={itemVariants}>
            <h4 className="text-sm font-mono text-gray-400 uppercase tracking-widest mb-4">Connect</h4>
            <div className="flex gap-3">
              {[
                { Icon: FiGithub, href: 'https://github.com/maharshijpatelcg-work' },
                { Icon: FiLinkedin, href: 'https://www.linkedin.com/in/maharshi-patel-1b08b0395/' },
                { Icon: FiTwitter, href: 'https://x.com/Maharshi_245707' },
                { Icon: FiInstagram, href: 'https://www.instagram.com/mr._.maharshi_24/' },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 glass rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div variants={itemVariants} className="h-px bg-white/5 mb-8" />

        {/* Bottom bar */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600 flex items-center gap-1">
            © {new Date().getFullYear()} Maharshi Patel. Built with
            <FiHeart className="text-red-400 text-xs" />
            and React
          </p>

          <p className="text-xs text-gray-700 font-mono">
            Designed & Developed by Maharshi Patel
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll to top */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.95 }}
        className="fixed right-6 bottom-6 p-3 bg-gradient-to-r from-accent to-neon-cyan text-white rounded-full shadow-glow-md z-40 magnetic-btn"
      >
        <FiArrowUp size={20} />
      </motion.button>
    </footer>
  );
};

export default Footer;
