import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiFolder } from 'react-icons/fi';

const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const projects = [
    {
      title: 'CropPilot',
      description: 'AI-powered crop intelligence for Indian farmers — real-time weather, soil conditions, and market data to simplify every farming decision from planning to selling.',
      tech: ['React', 'Node.js', 'MongoDB', 'Express'],
      github: 'https://github.com/maharshijpatelcg-work/SU_2026',
      live: 'https://croppilot-su.vercel.app/',
      image: 'https://raw.githubusercontent.com/maharshijpatelcg-work/PORTFOLIO_MP/main/public/croppilot-preview.png',
      gradient: 'from-green-500/20 to-emerald-500/20',
      accentColor: '#10b981',
      featured: true,
    },
    {
      title: 'FleetFlow',
      description: 'Fleet & logistics management system with real-time vehicle tracking, maintenance logs, driver dispatch, and a data-driven command center dashboard.',
      tech: ['React', 'Tailwind CSS', 'State Management'],
      github: '#',
      live: 'https://fleet-flow-coding-gita.netlify.app/',
      image: 'https://raw.githubusercontent.com/maharshijpatelcg-work/PORTFOLIO_MP/main/public/fleetflow-preview.png',
      gradient: 'from-blue-500/20 to-cyan-500/20',
      accentColor: '#06b6d4',
      featured: true,
    },
    {
      title: 'Ai-Onboarding-Engine',
      description: 'RESTful API for state statistics with advanced filtering, sorting, aggregation, and pagination — all powered by in-memory data processing.',
      tech: ['Node.js', 'Express', 'REST API'],
      github: '#',
      live: 'https://iisc-hack.vercel.app/',
      image: 'https://raw.githubusercontent.com/maharshijpatelcg-work/PORTFOLIO_MP/main/public/ai-onboarding-preview.png',
      gradient: 'from-purple-500/20 to-pink-500/20',
      accentColor: '#8b5cf6',
      featured: true,
    },
    {
      title: 'X-AI(GROK)',
      description: 'This very portfolio! Built with React, Three.js, Framer Motion and premium glassmorphism design system.',
      tech: ['React', 'Three.js', 'Framer Motion', 'Tailwind'],
      github: '#',
      live: 'https://x-ai-clone.vercel.app/',
      image: 'https://raw.githubusercontent.com/maharshijpatelcg-work/PORTFOLIO_MP/main/public/xai-clone-preview.png',
      gradient: 'from-amber-500/20 to-orange-500/20',
      accentColor: '#f59e0b',
    },
    {
      title: 'Counter App',
      description: 'A premium, responsive counter application featuring a modern glassmorphism UI, smooth animations, and persistent state management.',
      tech: ['HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com/maharshijpatelcg-work/MP_PROJECTS',
      live: 'https://count-app-hzll.onrender.com',
      image: 'https://raw.githubusercontent.com/maharshijpatelcg-work/PORTFOLIO_MP/main/public/counter-preview.png',
      gradient: 'from-sky-500/20 to-indigo-500/20',
      accentColor: '#3b82f6',
    },
    {
      title: 'PEAK DESIGN',
      description: 'Full-featured task management app with drag-and-drop, deadlines, priority tags, and team collaboration features.',
      tech: ['React', 'Node.js', 'MongoDB'],
      github: 'https://github.com/maharshijpatelcg-work/clone-projects/tree/main/peakdesign',
      live: 'https://peak-design.vercel.app/',
      image: 'https://raw.githubusercontent.com/maharshijpatelcg-work/PORTFOLIO_MP/main/public/taskmanager-preview.png',
      gradient: 'from-rose-500/20 to-red-500/20',
      accentColor: '#f43f5e',
    },
  ];

  return (
    <section id="projects" className="py-24 md:py-32 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-accent font-mono text-sm tracking-widest uppercase mb-4 block"
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

      {/* Projects Grid - Bento Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`group relative glass-card rounded-2xl overflow-hidden hover-lift cursor-pointer ${
              project.featured ? 'md:row-span-1' : ''
            }`}
          >
            {/* Top gradient area */}
            <div className={`relative h-44 bg-gradient-to-br ${project.gradient} p-6 flex flex-col justify-between overflow-hidden`}>
              {/* Project image if available */}
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover object-top opacity-40 group-hover:opacity-60 transition-opacity duration-700"
                />
              )}

              {/* Animated background orb */}
              <div
                className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-[40px] opacity-30 group-hover:opacity-60 transition-all duration-700"
                style={{ backgroundColor: project.accentColor }}
              />

              {/* Project number */}
              <div className="flex items-start justify-between relative z-10">
                <div className="p-2 glass rounded-lg">
                  <FiFolder className="text-xl" style={{ color: project.accentColor }} />
                </div>
                <span className="text-xs font-mono text-gray-400">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Action buttons */}
              <div className="relative z-10 flex gap-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 glass-strong rounded-full hover:bg-white/20 transition-all"
                  title="View Source"
                >
                  <FiGithub size={16} />
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full transition-all text-white"
                  style={{ backgroundColor: project.accentColor }}
                  title="Live Demo"
                >
                  <FiExternalLink size={16} />
                </a>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3
                className="text-xl font-display font-bold mb-3 group-hover:translate-x-1 transition-transform duration-300"
                style={{
                  color: hoveredIndex === index ? project.accentColor : 'white',
                  transition: 'color 0.3s',
                }}
              >
                {project.title}
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3">
                {project.description}
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs font-mono rounded-full glass text-gray-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom accent line */}
            <div
              className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-700"
              style={{ backgroundColor: project.accentColor }}
            />
          </motion.div>
        ))}
      </div>

      {/* View All CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex justify-center mt-12"
      >
        <a
          href="#"
          className="group flex items-center gap-2 px-6 py-3 glass rounded-full text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-all"
        >
          <FiGithub />
          View All on GitHub
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </a>
      </motion.div>
    </section>
  );
};

export default Projects;
