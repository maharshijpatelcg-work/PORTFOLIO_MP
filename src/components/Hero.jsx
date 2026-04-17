import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { BsGithub, BsLinkedin, BsTwitterX, BsInstagram, BsYoutube } from 'react-icons/bs';
import { SiLeetcode } from 'react-icons/si';
import { FiArrowRight } from 'react-icons/fi';

const ROLES = [
  'Full-Stack Developer',
  'React Specialist',
  'Problem Solver',
  'Creative Technologist',
];

const Hero = () => {
  const [text, setText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const containerRef = useRef(null);

  // 3D Parallax Hover Effect logic
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [15, -15]), { damping: 30, stiffness: 200, mass: 0.5 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-15, 15]), { damping: 30, stiffness: 200, mass: 0.5 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  // Advanced typewriter with delete effect
  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    let timer;

    if (!isDeleting && text === currentRole) {
      timer = window.setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && text === '') {
      timer = window.setTimeout(() => {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      }, 140);
    } else {
      timer = window.setTimeout(
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

    return () => window.clearTimeout(timer);
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

  const photoVariants = {
    hidden: { opacity: 0, x: 80, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.5 },
    },
  };

  const socialLinks = [
    { Icon: BsGithub, href: 'https://github.com/maharshijpatelcg-work', label: 'GitHub', hoverColor: 'hover:text-white hover:shadow-glow-sm' },
    { Icon: BsLinkedin, href: 'https://www.linkedin.com/in/maharshi-patel-1b08b0395/', label: 'LinkedIn', hoverColor: 'hover:text-blue-400 hover:shadow-glow-sm' },
    { Icon: BsTwitterX, href: 'https://x.com/Maharshi_245707', label: 'Twitter', hoverColor: 'hover:text-white hover:shadow-glow-sm' },
    { Icon: BsInstagram, href: 'https://www.instagram.com/mr._.maharshi_24/', label: 'Instagram', hoverColor: 'hover:text-pink-400 hover:shadow-glow-pink' },
    { Icon: SiLeetcode, href: 'https://leetcode.com/u/MaharshiPatel24/', label: 'LeetCode', hoverColor: 'hover:text-[#FFA116] hover:shadow-glow-sm' },
    { Icon: BsYoutube, href: 'https://youtube.com/@YourChannelHere', label: 'YouTube', hoverColor: 'hover:text-red-500 hover:shadow-glow-sm' },
  ];

  return (
    <section id="home" ref={containerRef} className="hero-section relative min-h-screen flex items-center overflow-hidden pt-20 pb-16 md:pt-28">
      {/* Ambient glow effects */}
      <div className="absolute top-[15%] left-[5%] w-[350px] h-[350px] bg-accent/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] bg-neon-cyan/[0.05] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] left-[40%] w-[200px] h-[200px] bg-neon-pink/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16 flex flex-col-reverse md:flex-row items-center gap-8 md:gap-4">

        {/* ═══════════ LEFT: Text Content (55%) ═══════════ */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="hero-left w-full md:w-[55%] text-center md:text-left"
        >
          {/* Status badge */}
          <motion.div variants={itemVariants} className="flex justify-center md:justify-start mb-6 md:mb-8">
            <div className="hero-badge flex items-center gap-2 px-4 py-2 rounded-full text-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-gray-300 font-mono text-xs tracking-wider">AVAILABLE FOR WORK</span>
            </div>
          </motion.div>

          {/* Name */}
          <motion.div variants={itemVariants} className="mb-4 md:mb-6">
            <span className="text-sm md:text-base text-accent-light font-mono tracking-[0.3em] uppercase mb-2 md:mb-3 block">
              Hello, I'm
            </span>
            <h1 className="hero-name text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold leading-[0.95] tracking-tight text-white mb-2">
              <span className="gradient-text drop-shadow-sm">Maharshi</span>
              <br />
              Patel
            </h1>
          </motion.div>

          {/* Typewriter */}
          <motion.div variants={itemVariants} className="h-8 md:h-12 flex items-center justify-center md:justify-start mb-6 md:mb-8">
            <span className="text-lg md:text-2xl font-light text-gray-300 font-display">
              {'{ '}
              <span className="text-neon-cyan">{text}</span>
              <span className="text-accent animate-pulse">|</span>
              {' }'}
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="hero-description max-w-xl mx-auto md:mx-0 text-gray-400 text-base md:text-lg lg:text-xl leading-relaxed mb-8 md:mb-10 font-light"
          >
            Crafting immersive digital experiences with
            <span className="text-white font-medium"> modern web technologies</span>,
            clean architecture, and a passion for
            <span className="text-white font-medium"> pixel-perfect design</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center md:justify-start items-center mb-8 md:mb-10"
          >
            <Link
              to="/projects"
              className="group relative px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-accent to-neon-cyan text-white font-semibold rounded-full magnetic-btn flex items-center gap-3 text-base md:text-lg overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative">View Projects</span>
              <FiArrowRight className="relative group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="https://resume-mp.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-6 py-3 md:px-8 md:py-4 rounded-full glass text-white font-semibold flex items-center gap-3 text-base md:text-lg hover:bg-white/10 transition-all magnetic-btn"
            >
              VIEW CV
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center md:justify-start gap-3 md:gap-4"
          >
            {socialLinks.map(({ Icon, href, label, hoverColor }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2.5 md:p-3 glass rounded-xl text-gray-400 text-lg md:text-xl transition-all duration-300 hover:-translate-y-1 ${hoverColor}`}
              >
                <Icon />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* ═══════════ RIGHT: Cinematic Portrait (45%) ═══════════ */}
        <motion.div
          variants={photoVariants}
          initial="hidden"
          animate="visible"
          className="hero-right w-full md:w-[45%] flex items-center justify-center"
        >
          <div className="hero-photo-wrapper relative">
            {/* Animated gradient border glow */}
            <div className="hero-photo-glow absolute -inset-[3px] rounded-2xl md:rounded-3xl opacity-60" />

            {/* Secondary outer glow */}
            <div className="absolute -inset-[20px] rounded-3xl md:rounded-[2rem] bg-gradient-to-br from-accent/10 via-transparent to-neon-cyan/10 blur-xl pointer-events-none" />

            {/* Floating wrapper to prevent animation conflicts */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full h-full"
            >
              {/* Photo container with interactive 3D Tilt */}
              <motion.div 
                className="hero-photo-container relative rounded-[2rem] overflow-hidden cursor-crosshair transform-gpu"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ 
                  rotateX, 
                  rotateY, 
                  transformPerspective: 1200 
                }}
                animate={{ 
                  filter: [
                    "drop-shadow(0px 0px 20px rgba(255, 180, 50, 0.3))",
                    "drop-shadow(0px 15px 40px rgba(255, 150, 30, 0.6))",
                    "drop-shadow(0px 0px 20px rgba(255, 180, 50, 0.3))"
                  ] 
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <img
                  src="/maharshi-portrait.png"
                  alt="Maharshi Patel - Full-Stack Developer"
                  className="hero-photo w-full h-auto object-contain transition-transform duration-500 hover:scale-[1.03]"
                  loading="eager"
                  draggable={false}
                />
              </motion.div>
            </motion.div>

            {/* Floating decorative elements */}
            <div className="hero-float-dot-1 absolute -top-3 -right-3 md:-top-4 md:-right-4 w-3 h-3 md:w-4 md:h-4 bg-accent rounded-full blur-[2px] opacity-60" />
            <div className="hero-float-dot-2 absolute -bottom-2 -left-2 md:-bottom-3 md:-left-3 w-2 h-2 md:w-3 md:h-3 bg-neon-cyan rounded-full blur-[2px] opacity-50" />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator — centered at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
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
    </section>
  );
};

export default Hero;
