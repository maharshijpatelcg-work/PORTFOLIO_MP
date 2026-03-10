import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { BsGithub, BsLinkedin, BsTwitterX, BsInstagram } from 'react-icons/bs';
import { FiArrowRight, FiDownload } from 'react-icons/fi';

const Hero = () => {
  const [text, setText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const containerRef = useRef(null);

  const roles = [
    "Full-Stack Developer",
    "React Specialist",
    "Problem Solver",
    "Creative Technologist",
  ];

  // Advanced typewriter with delete effect
  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timer;

    if (!isDeleting && text === currentRole) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      timer = setTimeout(
        () => {
          setText(
            isDeleting
              ? currentRole.slice(0, text.length - 1)
              : currentRole.slice(0, text.length + 1)
          );
        },
        isDeleting ? 40 : 80
      );
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, roleIndex]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const socialLinks = [
    { Icon: BsGithub, href: '#', label: 'GitHub', hoverColor: 'hover:text-white hover:shadow-glow-sm' },
    { Icon: BsLinkedin, href: '#', label: 'LinkedIn', hoverColor: 'hover:text-blue-400 hover:shadow-glow-sm' },
    { Icon: BsTwitterX, href: '#', label: 'Twitter', hoverColor: 'hover:text-white hover:shadow-glow-sm' },
    { Icon: BsInstagram, href: '#', label: 'Instagram', hoverColor: 'hover:text-pink-400 hover:shadow-glow-pink' },
  ];

  return (
    <section id="home" ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-16">
      {/* Static glow blobs (no animation = smooth performance) */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] bg-neon-cyan/[0.06] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 w-[250px] h-[250px] bg-neon-pink/[0.04] rounded-full blur-[80px] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
      >
        {/* Status badge */}
        <motion.div variants={itemVariants} className="flex justify-center mb-8">
          <div className="flex items-center gap-2 px-4 py-2 glass rounded-full text-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-gray-300 font-mono text-xs tracking-wider">AVAILABLE FOR WORK</span>
          </div>
        </motion.div>

        {/* Name */}
        <motion.div variants={itemVariants}>
          <span className="text-sm md:text-base text-accent-light font-mono tracking-[0.3em] uppercase mb-4 block">
            Hello, I'm
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold leading-none tracking-tight mb-4">
            <span className="gradient-text">Maharshi</span>
            <br />
            <span className="text-white">Patel</span>
          </h1>
        </motion.div>

        {/* Typewriter */}
        <motion.div variants={itemVariants} className="h-10 md:h-12 flex items-center justify-center mb-8">
          <span className="text-xl md:text-2xl font-light text-gray-300 font-display">
            {'{ '}
            <span className="text-neon-cyan">{text}</span>
            <span className="text-accent animate-pulse">|</span>
            {' }'}
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12 font-light"
        >
          Crafting immersive digital experiences with
          <span className="text-white font-medium"> modern web technologies</span>,
          clean architecture, and a passion for
          <span className="text-white font-medium"> pixel-perfect design</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <a
            href="#projects"
            className="group relative px-8 py-4 bg-gradient-to-r from-accent to-neon-cyan text-white font-semibold rounded-full magnetic-btn flex items-center gap-3 text-lg overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative">View Projects</span>
            <FiArrowRight className="relative group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-8 py-4 rounded-full glass text-white font-semibold flex items-center gap-3 text-lg hover:bg-white/10 transition-all magnetic-btn"
          >
            <FiDownload className="group-hover:-translate-y-0.5 transition-transform" />
            Download CV
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center gap-4"
        >
          {socialLinks.map(({ Icon, href, label, hoverColor }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className={`p-3 glass rounded-xl text-gray-400 text-xl transition-all duration-300 hover:-translate-y-1 ${hoverColor}`}
            >
              <Icon />
            </a>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="relative mt-16 md:mt-24 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-gray-500 font-mono tracking-widest hidden sm:block">SCROLL</span>
          <div className="w-5 h-8 border border-gray-600 rounded-full flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 bg-accent rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
