import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import { FiExternalLink, FiFolder, FiGithub, FiYoutube, FiDatabase } from 'react-icons/fi';
import { SiFigma } from 'react-icons/si';

const PROJECTS = [
  {
    title: 'CropPilot',
    category: 'fullstack',
    description:
      'AI-powered crop intelligence for Indian farmers - real-time weather, soil conditions, and market data to simplify every farming decision from planning to selling.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express'],
    github: 'https://github.com/maharshijpatelcg-work/SU_2026',
    live: 'https://croppilot-su.vercel.app/',
    youtube: 'https://www.youtube.com/@MaharshiPatel-t6n',
    apiDocs: 'https://documenter.getpostman.com/view/placeholder',
    image: '/croppilot-preview.png',
    gradient: 'from-green-500/20 to-emerald-500/20',
    accentColor: '#10b981',
  },
  {
    title: 'FleetFlow',
    category: 'fullstack',
    description:
      'Fleet and logistics management system with real-time vehicle tracking, maintenance logs, driver dispatch, and a data-driven command center dashboard.',
    tech: ['React', 'Tailwind CSS', 'State Management'],
    github: '#',
    live: 'https://fleet-flow-coding-gita.netlify.app/',
    youtube: 'https://www.youtube.com/watch?v=qArH7NnjcG0&t=18s',
    figma: 'https://figma.com/file/placeholder',
    image: '/fleetflow-preview.png',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    accentColor: '#06b6d4',
  },
  {
    title: 'Ai-Onboarding-Engine',
    category: 'fullstack',
    description:
      'RESTful API for state statistics with advanced filtering, sorting, aggregation, and pagination - all powered by in-memory data processing.',
    tech: ['Node.js', 'Express', 'REST API'],
    github: '#',
    live: 'https://iisc-hack.vercel.app/',
    youtube: 'https://www.youtube.com/watch?v=r8MHM2AQSB4',
    image: '/ai-onboarding-preview.png',
    gradient: 'from-purple-500/20 to-pink-500/20',
    accentColor: '#8b5cf6',
  },
  {
    title: 'X-AI(GROK)',
    category: 'clone',
    description:
      'This very portfolio! Built with React, Three.js, Framer Motion and premium glassmorphism design system.',
    tech: ['Html', 'Css'],
    github: '#',
    live: 'https://x-ai-clone.vercel.app/',
    youtube: 'https://www.youtube.com/watch?v=TIJJ5R8-JZo&t=13s',
    image: '/xai-clone-preview.png',
    gradient: 'from-amber-500/20 to-orange-500/20',
    accentColor: '#f59e0b',
  },
  {
    title: 'Counter App',
    category: 'frontend',
    description:
      'A premium, responsive counter application featuring a modern glassmorphism UI, smooth animations, and persistent state management.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/maharshijpatelcg-work/MP_PROJECTS',
    live: 'https://count-app-hzll.onrender.com',
    // youtube: 'https://youtube.com/watch?v=placeholder',
    image: '/counter-preview.png',
    gradient: 'from-sky-500/20 to-indigo-500/20',
    accentColor: '#3b82f6',
  },
  {
    title: 'PEAK DESIGN',
    category: 'clone',
    description:
      'Full-featured task management app with drag-and-drop, deadlines, priority tags, and team collaboration features.',
    tech: ['Html', 'Css'],
    github: 'https://github.com/maharshijpatelcg-work/clone-projects/tree/main/peakdesign',
    live: 'https://peak-design.vercel.app/',
    youtube: 'https://www.youtube.com/watch?v=7ixLZ7cjYEM',
    image: '/taskmanager-preview.png',
    gradient: 'from-rose-500/20 to-red-500/20',
    accentColor: '#f43f5e',
  }
];

const STACK_JITTER = [
  { x: -56, y: -38, rotate: -20, scale: 0.84, tiltX: -6, tiltY: 10 },
  { x: 44, y: -26, rotate: 16, scale: 0.82, tiltX: 8, tiltY: -8 },
  { x: -18, y: 16, rotate: -9, scale: 0.86, tiltX: -4, tiltY: 6 },
  { x: 26, y: 42, rotate: 12, scale: 0.8, tiltX: 6, tiltY: -6 },
  { x: -34, y: 54, rotate: -14, scale: 0.78, tiltX: -8, tiltY: 5 },
  { x: 58, y: 22, rotate: 18, scale: 0.76, tiltX: 8, tiltY: -10 },
];

const STACK_SPARKS = [
  { x: -150, y: -110, color: '#10b981' },
  { x: 145, y: -88, color: '#06b6d4' },
  { x: -176, y: 42, color: '#8b5cf6' },
  { x: 168, y: 56, color: '#f43f5e' },
  { x: -68, y: 132, color: '#f59e0b' },
  { x: 92, y: 146, color: '#3b82f6' },
];

const cardSpring = {
  stiffness: 170,
  damping: 20,
  mass: 0.8,
};

const pointerSpring = {
  stiffness: 130,
  damping: 18,
  mass: 0.7,
};

const getFallbackStackTransform = (index, total) => {
  const jitter = STACK_JITTER[index % STACK_JITTER.length];

  return {
    x: jitter.x,
    y: -120 - index * 36 + jitter.y,
    rotate: jitter.rotate,
    scale: jitter.scale,
    tiltX: jitter.tiltX,
    tiltY: jitter.tiltY,
    zIndex: total - index,
  };
};

const ProjectCard = ({
  project,
  index,
  isActive,
  isExpanded,
  stackTransform,
  onHoverStart,
  onHoverEnd,
  containerRef,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const canInteract = prefersReducedMotion || isExpanded;

  const rotateX = useSpring(
    useTransform(mouseY, [0, 100], prefersReducedMotion ? [0, 0] : [9, -9]),
    cardSpring
  );
  const rotateY = useSpring(
    useTransform(mouseX, [0, 100], prefersReducedMotion ? [0, 0] : [-9, 9]),
    cardSpring
  );
  const glowX = useSpring(mouseX, pointerSpring);
  const glowY = useSpring(mouseY, pointerSpring);

  const spotlight = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, ${project.accentColor}44, transparent 52%)`;
  const borderGlow = useMotionTemplate`linear-gradient(135deg, ${project.accentColor}88, transparent 28%, transparent 72%, ${project.accentColor}50)`;

  const handlePointerMove = (event) => {
    if (!canInteract || prefersReducedMotion) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const nextX = ((event.clientX - rect.left) / rect.width) * 100;
    const nextY = ((event.clientY - rect.top) / rect.height) * 100;

    mouseX.set(Math.max(0, Math.min(100, nextX)));
    mouseY.set(Math.max(0, Math.min(100, nextY)));
  };

  const resetPointer = () => {
    mouseX.set(50);
    mouseY.set(50);
    onHoverEnd();
  };

  const hasGithubLink = project.github && project.github !== '#';

  return (
    <div
      ref={containerRef}
      className="relative h-full"
      style={{
        perspective: '1400px',
        pointerEvents: canInteract ? 'auto' : 'none',
        zIndex: isExpanded ? 'auto' : stackTransform.zIndex,
      }}
    >
      <motion.article
        animate={
          prefersReducedMotion
            ? { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0, filter: 'saturate(1) brightness(1)' }
            : {
                opacity: isExpanded ? 1 : 0.96,
                x: isExpanded ? 0 : stackTransform.x,
                y: isExpanded ? 0 : stackTransform.y,
                scale: isExpanded ? 1 : stackTransform.scale,
                rotate: isExpanded ? 0 : stackTransform.rotate,
                filter: isExpanded ? 'saturate(1) brightness(1)' : 'saturate(0.78) brightness(0.9)',
              }
        }
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : {
                default: {
                  type: 'spring',
                  stiffness: 118,
                  damping: 18,
                  mass: 0.95,
                  delay: isExpanded ? 0.12 + index * 0.075 : 0,
                },
                filter: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.4, delay: isExpanded ? 0.1 + index * 0.03 : 0 },
              }
        }
        whileHover={canInteract && !prefersReducedMotion ? { y: -12, scale: 1.015 } : undefined}
        onMouseEnter={canInteract ? onHoverStart : undefined}
        onMouseLeave={canInteract ? resetPointer : undefined}
        onMouseMove={canInteract ? handlePointerMove : undefined}
        className={`group relative isolate flex h-full flex-col overflow-hidden rounded-[26px] glass-card ${
          canInteract ? 'cursor-pointer' : 'cursor-default'
        }`}
        style={{
          rotateX: isExpanded ? rotateX : stackTransform.tiltX,
          rotateY: isExpanded ? rotateY : stackTransform.tiltY,
          transformStyle: 'preserve-3d',
          boxShadow: isActive
            ? `0 28px 80px -34px ${project.accentColor}70, 0 0 0 1px ${project.accentColor}30`
            : '0 30px 65px -42px rgba(0, 0, 0, 0.75)',
        }}
      >
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[26px] opacity-0"
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          style={{ backgroundImage: spotlight }}
        />

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[26px] opacity-0"
          animate={{ opacity: isActive ? 0.85 : 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          style={{ backgroundImage: borderGlow, padding: '1px' }}
        >
          <div className="h-full w-full rounded-[25px] bg-transparent" />
        </motion.div>

        <div
          className={`relative h-44 overflow-hidden bg-gradient-to-br ${project.gradient} p-6`}
          style={{ transform: 'translateZ(34px)' }}
        >
          {project.image && (
            <motion.img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 h-full w-full object-cover object-top"
              animate={
                prefersReducedMotion
                  ? { opacity: 0.42, scale: 1 }
                  : {
                      opacity: isActive ? 0.74 : 0.42,
                      scale: isActive ? 1.08 : 1,
                      y: isActive ? -8 : 0,
                    }
              }
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />
          )}

          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/2 skew-x-[-18deg] opacity-0 blur-2xl"
            style={{
              background: `linear-gradient(90deg, transparent, ${project.accentColor}55, transparent)`,
            }}
            animate={
              prefersReducedMotion
                ? { x: '-20%', opacity: 0 }
                : isActive
                  ? { x: ['0%', '210%'], opacity: [0, 0.35, 0] }
                  : { x: '-25%', opacity: 0 }
            }
            transition={{ duration: 1.15, ease: 'easeInOut' }}
          />

          <motion.div
            aria-hidden="true"
            className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full blur-[42px]"
            style={{ backgroundColor: project.accentColor }}
            animate={
              prefersReducedMotion
                ? { opacity: 0.3, scale: 1 }
                : {
                    opacity: isActive ? 0.62 : 0.28,
                    scale: isActive ? 1.18 : 1,
                    x: isActive ? -10 : 0,
                    y: isActive ? -6 : 0,
                  }
            }
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="relative z-10 flex h-full flex-col justify-between">
            <div className="flex items-start justify-between">
              <motion.div
                className="rounded-xl glass p-2.5"
                animate={
                  prefersReducedMotion
                    ? { scale: 1 }
                    : { scale: isActive ? 1.08 : 1, rotate: isActive ? -4 : 0 }
                }
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <FiFolder className="text-xl" style={{ color: project.accentColor }} />
              </motion.div>

              <motion.span
                className="text-xs font-mono text-gray-300"
                animate={
                  prefersReducedMotion
                    ? { opacity: 0.8 }
                    : { opacity: isActive ? 1 : 0.72, y: isActive ? -2 : 0 }
                }
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {String(index + 1).padStart(2, '0')}
              </motion.span>
            </div>

            <motion.div
              className="flex gap-3"
              animate={
                prefersReducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: isActive ? 1 : 0.82, y: isActive ? 0 : 12 }
              }
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              {hasGithubLink ? (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full glass-strong p-2.5 transition-colors hover:bg-white/20"
                  title="View Source"
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.08, y: -2 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                >
                  <FiGithub size={16} />
                </motion.a>
              ) : (
                <span
                  className="rounded-full border border-white/10 bg-white/5 p-2.5 text-gray-500"
                  title="Source unavailable"
                >
                  <FiGithub size={16} />
                </span>
              )}

              {project.youtube && project.youtube !== '#' && (
                <motion.a
                  href={project.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full glass-strong p-2.5 transition-colors hover:bg-white/20 hover:text-red-500"
                  title="YouTube Demo"
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.08, y: -2 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                >
                  <FiYoutube size={16} />
                </motion.a>
              )}

              {project.figma && project.figma !== '#' && (
                <motion.a
                  href={project.figma}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full glass-strong p-2.5 transition-colors hover:bg-white/20 hover:text-[#0acf83]"
                  title="Figma Design"
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.08, y: -2 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                >
                  <SiFigma size={16} />
                </motion.a>
              )}

              {project.apiDocs && project.apiDocs !== '#' && (
                <motion.a
                  href={project.apiDocs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full glass-strong p-2.5 transition-colors hover:bg-white/20 hover:text-blue-400"
                  title="API Documentation"
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.08, y: -2 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                >
                  <FiDatabase size={16} />
                </motion.a>
              )}

              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full p-2.5 text-white"
                style={{ backgroundColor: project.accentColor }}
                title="Live Demo"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.08, y: -2 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
              >
                <FiExternalLink size={16} />
              </motion.a>
            </motion.div>
          </div>
        </div>

        <div className="relative z-10 flex flex-1 flex-col p-6" style={{ transform: 'translateZ(20px)' }}>
          <motion.h3
            className="mb-3 font-display text-xl font-bold"
            animate={
              prefersReducedMotion
                ? { color: '#ffffff', x: 0 }
                : { color: isActive ? project.accentColor : '#ffffff', x: isActive ? 6 : 0 }
            }
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            {project.title}
          </motion.h3>

          <motion.p
            className="mb-5 line-clamp-3 text-sm leading-relaxed text-gray-400"
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: isActive ? 1 : 0.88 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {project.description}
          </motion.p>

          <div className="mt-auto flex flex-wrap gap-2">
            {project.tech.map((tech, techIndex) => (
              <motion.span
                key={`${project.title}-${tech}`}
                className="rounded-full glass px-3 py-1 text-xs font-mono text-gray-300"
                animate={
                  prefersReducedMotion
                    ? { y: 0, borderColor: 'rgba(255,255,255,0.06)' }
                    : {
                        y: isActive ? -2 : 0,
                        borderColor: isActive ? `${project.accentColor}33` : 'rgba(255,255,255,0.06)',
                        backgroundColor: isActive ? `${project.accentColor}14` : 'rgba(255,255,255,0.03)',
                      }
                }
                transition={{
                  duration: 0.25,
                  delay: isActive ? techIndex * 0.03 : 0,
                  ease: 'easeOut',
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        <motion.div
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-[2px]"
          style={{ backgroundColor: project.accentColor }}
          animate={{ width: isActive ? '100%' : '24%' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.article>
    </div>
  );
};

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [stackOrigin, setStackOrigin] = useState({ x: '50%', y: '8rem' });
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const cardRefs = useRef([]);
  const prefersReducedMotion = useReducedMotion();

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'clone', label: 'Clones' },
    { id: 'game', label: 'Games' },
  ];

  const filteredProjects = activeCategory === 'all' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeCategory);

  const [stackTransforms, setStackTransforms] = useState(() =>
    filteredProjects.map((_, index) => getFallbackStackTransform(index, filteredProjects.length))
  );
  const isInView = useInView(sectionRef, { once: true, amount: prefersReducedMotion ? 0.1 : 0.38 });
  const cardsExpanded = prefersReducedMotion || isExpanded;

  const measureStack = useCallback(() => {
    const gridElement = gridRef.current;

    if (!gridElement || filteredProjects.some((_, index) => !cardRefs.current[index])) {
      return;
    }

    const gridRect = gridElement.getBoundingClientRect();
    const nextOrigin = {
      x: gridRect.width / 2,
      y: Math.min(gridRect.height * 0.2 + 52, 190),
    };

    setStackOrigin(nextOrigin);
    setStackTransforms(
      filteredProjects.map((_, index) => {
        const cardElement = cardRefs.current[index];
        const rect = cardElement.getBoundingClientRect();
        const cardCenterX = rect.left - gridRect.left + rect.width / 2;
        const cardCenterY = rect.top - gridRect.top + rect.height / 2;
        const jitter = STACK_JITTER[index % STACK_JITTER.length];

        return {
          x: nextOrigin.x - cardCenterX + jitter.x,
          y: nextOrigin.y - cardCenterY + jitter.y,
          rotate: jitter.rotate,
          scale: jitter.scale,
          tiltX: jitter.tiltX,
          tiltY: jitter.tiltY,
          zIndex: filteredProjects.length - index,
        };
      })
    );
  }, [filteredProjects, activeCategory]);

  useLayoutEffect(() => {
    measureStack();

    if (typeof window === 'undefined') {
      return undefined;
    }

    const resizeObserver =
      typeof ResizeObserver !== 'undefined' && gridRef.current ? new ResizeObserver(measureStack) : null;

    if (resizeObserver && gridRef.current) {
      resizeObserver.observe(gridRef.current);

      cardRefs.current.forEach((node) => {
        if (node) {
          resizeObserver.observe(node);
        }
      });
    }

    window.addEventListener('resize', measureStack);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener('resize', measureStack);
    };
  }, [measureStack]);

  useEffect(() => {
    if (prefersReducedMotion || !isInView) {
      return;
    }

    const timer = window.setTimeout(() => setIsExpanded(true), 160);
    return () => window.clearTimeout(timer);
  }, [isInView, prefersReducedMotion]);

  return (
    <section id="projects" ref={sectionRef} className="mx-auto max-w-7xl px-4 py-24 md:py-32">
      <div className="mb-16 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 block text-sm font-mono uppercase tracking-widest text-accent"
        >
          // Portfolio
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="section-heading mb-4"
        >
          Featured <span className="gradient-text">Projects</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="section-subheading"
        >
          A selection of projects that showcase my skills and passion for development
        </motion.p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-16 relative z-30">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === cat.id
                ? 'bg-accent text-white shadow-glow-sm'
                : 'glass text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="relative">
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-8 top-4 h-52 rounded-full blur-3xl"
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background:
              'radial-gradient(circle at center, rgba(139,92,246,0.28), rgba(6,182,212,0.12) 38%, transparent 74%)',
          }}
        />

        {!prefersReducedMotion && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute z-20"
            style={{ left: stackOrigin.x, top: stackOrigin.y, transform: 'translate(-50%, -50%)' }}
          >
            <motion.div
              className="absolute h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[52px]"
              style={{
                background:
                  'radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(139,92,246,0.42) 24%, rgba(6,182,212,0.16) 58%, transparent 78%)',
              }}
              animate={
                cardsExpanded
                  ? { scale: [1, 2.8], opacity: [0.75, 0] }
                  : { scale: [0.92, 1.12, 0.92], opacity: [0.38, 0.7, 0.38] }
              }
              transition={
                cardsExpanded
                  ? { duration: 0.95, ease: [0.22, 1, 0.36, 1] }
                  : { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }
              }
            />

            <motion.div
              className="absolute h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15"
              animate={
                cardsExpanded
                  ? { scale: [0.4, 1.75], opacity: [0.5, 0] }
                  : { scale: [0.76, 1.04, 0.76], opacity: [0.16, 0.34, 0.16] }
              }
              transition={
                cardsExpanded
                  ? { duration: 1.05, ease: [0.22, 1, 0.36, 1] }
                  : { duration: 2.6, repeat: Infinity, ease: 'easeInOut' }
              }
            />

            {STACK_SPARKS.map((spark, index) => (
              <motion.span
                key={`${spark.color}-${index}`}
                className="absolute h-2 w-2 rounded-full shadow-[0_0_24px_currentColor]"
                style={{ backgroundColor: spark.color, color: spark.color }}
                animate={
                  cardsExpanded
                    ? {
                        x: [0, spark.x],
                        y: [0, spark.y],
                        opacity: [0, 0.95, 0],
                        scale: [0.35, 1, 0.35],
                      }
                    : {
                        x: spark.x * 0.2,
                        y: spark.y * 0.2,
                        opacity: [0.16, 0.55, 0.16],
                        scale: [0.8, 1.15, 0.8],
                      }
                }
                transition={{
                  duration: cardsExpanded ? 1 + index * 0.08 : 2.5 + index * 0.12,
                  delay: cardsExpanded ? index * 0.03 : 0,
                  repeat: cardsExpanded ? 0 : Infinity,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            ))}
          </div>
        )}

        <div ref={gridRef} className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={`${project.title}-${index}`}
              project={project}
              index={index}
              isActive={hoveredIndex === index}
              isExpanded={cardsExpanded}
              stackTransform={stackTransforms[index] ?? getFallbackStackTransform(index, PROJECTS.length)}
              containerRef={(node) => {
                cardRefs.current[index] = node;
              }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex((current) => (current === index ? null : current))}
            />
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-12 flex justify-center"
      >
        <a
          href="https://github.com/maharshijpatelcg-work"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-medium text-gray-400 transition-all hover:bg-white/10 hover:text-white"
        >
          <FiGithub />
          View All on GitHub
          <span className="transition-transform group-hover:translate-x-1">-&gt;</span>
        </a>
      </motion.div>
    </section>
  );
};

export default Projects;
