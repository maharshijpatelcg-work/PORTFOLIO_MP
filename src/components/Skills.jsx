import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt } from 'react-icons/fa';
import { SiMongodb, SiC, SiTailwindcss, SiPostman } from 'react-icons/si';

const hexToRgb = (hex) => {
  const sanitized = hex.replace('#', '').trim();
  const normalized = sanitized.length === 3
    ? sanitized.split('').map((char) => char + char).join('')
    : sanitized;
  const value = Number.parseInt(normalized, 16);

  if (Number.isNaN(value)) {
    return '255, 255, 255';
  }

  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;

  return `${r}, ${g}, ${b}`;
};

const ambientOrbs = [
  {
    id: 'ember-left',
    top: '6%',
    left: '-8%',
    size: '18rem',
    color: 'rgba(255, 74, 74, 0.22)',
    opacity: 0.72,
    duration: 15,
    delay: 0,
  },
  {
    id: 'ember-top',
    top: '-8%',
    left: '42%',
    size: '16rem',
    color: 'rgba(255, 128, 79, 0.16)',
    opacity: 0.56,
    duration: 13,
    delay: 1.2,
  },
  {
    id: 'ember-right',
    top: '58%',
    left: '78%',
    size: '20rem',
    color: 'rgba(255, 58, 111, 0.14)',
    opacity: 0.48,
    duration: 17,
    delay: 2.4,
  },
];

const sectionBeams = [
  { id: 'beam-one', top: '18%', left: '8%', width: '14rem', rotate: -9, duration: 7, delay: 0.2 },
  { id: 'beam-two', top: '34%', left: '68%', width: '10rem', rotate: 13, duration: 6, delay: 1.1 },
  { id: 'beam-three', top: '74%', left: '20%', width: '12rem', rotate: 6, duration: 8, delay: 0.8 },
];

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const shouldReduceMotion = useReducedMotion();

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'tools', label: 'Tools' },
  ];

  const categoryLabels = {
    frontend: 'Frontend',
    backend: 'Backend',
    tools: 'Toolchain',
  };

  const skills = [
    { name: 'HTML5', icon: <FaHtml5 />, color: '#E34F26', level: 90, category: 'frontend', tag: 'Semantic Markup' },
    { name: 'CSS3', icon: <FaCss3Alt />, color: '#1572B6', level: 85, category: 'frontend', tag: 'Motion Styling' },
    { name: 'JavaScript', icon: <FaJs />, color: '#F7DF1E', level: 80, category: 'frontend', tag: 'Interactive Logic' },
    { name: 'React', icon: <FaReact />, color: '#61DAFB', level: 82, category: 'frontend', tag: 'Component Systems' },
    { name: 'Tailwind CSS', icon: <SiTailwindcss />, color: '#06B6D4', level: 85, category: 'frontend', tag: 'Utility Design' },
    { name: 'Node.js', icon: <FaNodeJs />, color: '#339933', level: 70, category: 'backend', tag: 'Server Runtime' },
    { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248', level: 72, category: 'backend', tag: 'Data Persistence' },
    { name: 'C Language', icon: <SiC />, color: '#A8B9CC', level: 75, category: 'backend', tag: 'Core Programming' },
    { name: 'Git', icon: <FaGitAlt />, color: '#F05032', level: 78, category: 'tools', tag: 'Version Control' },
    { name: 'Postman', icon: <SiPostman />, color: '#FF6C37', level: 80, category: 'tools', tag: 'API Testing' },
  ];

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter((skill) => skill.category === activeCategory);

  return (
    <section
      id="skills"
      className="skills-danger-zone relative isolate mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 px-4 py-24 shadow-[0_45px_140px_-60px_rgba(255,74,74,0.52)] md:px-8 md:py-32"
    >
      <div className="skills-danger-grid" aria-hidden="true" />
      <div className="skills-danger-vignette" aria-hidden="true" />

      {ambientOrbs.map((orb) => (
        <motion.span
          key={orb.id}
          aria-hidden="true"
          className="pointer-events-none absolute rounded-full blur-3xl"
          style={{
            top: orb.top,
            left: orb.left,
            width: orb.size,
            height: orb.size,
            background: orb.color,
          }}
          animate={shouldReduceMotion ? { opacity: orb.opacity * 0.6 } : {
            opacity: [orb.opacity * 0.45, orb.opacity, orb.opacity * 0.35, orb.opacity * 0.45],
            scale: [1, 1.16, 0.94, 1],
            x: [0, 20, -12, 0],
            y: [0, -18, 10, 0],
          }}
          transition={shouldReduceMotion ? undefined : {
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {sectionBeams.map((beam) => (
        <motion.span
          key={beam.id}
          aria-hidden="true"
          className="skills-danger-beam pointer-events-none absolute"
          style={{
            top: beam.top,
            left: beam.left,
            width: beam.width,
            transformOrigin: 'left center',
          }}
          initial={{ rotate: beam.rotate, opacity: 0.16 }}
          animate={shouldReduceMotion ? {
            rotate: beam.rotate,
            opacity: 0.22,
          } : {
            rotate: beam.rotate,
            opacity: [0.12, 0.42, 0.12],
            x: [0, 26, -16, 0],
          }}
          transition={shouldReduceMotion ? undefined : {
            duration: beam.duration,
            delay: beam.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      <div className="relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[0.72rem] font-mono uppercase tracking-[0.55em] text-[#ff7b54] mb-4 block"
          >
            // Armed Interface
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-heading mb-4 text-white"
          >
            Technical <span className="skills-danger-text">Skills</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-2xl text-sm text-white/62 sm:text-base"
          >
            A darker, sharper stack display with live energy, motion, and pressure built into every card.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="skills-filter-shell mx-auto mb-14 flex w-fit flex-wrap justify-center gap-3 p-2"
        >
          {categories.map((category) => {
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`skills-filter-button relative overflow-hidden rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.28em] ${
                  isActive ? 'is-active text-white' : 'text-white/55'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="skillFilter"
                    className="skills-filter-active absolute inset-0"
                    transition={{ type: 'spring', bounce: 0.22, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{category.label}</span>
              </button>
            );
          })}
        </motion.div>

        <motion.div layout className="grid gap-5 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => {
              const rgb = hexToRgb(skill.color);
              const glowStrong = `rgba(${rgb}, 0.5)`;
              const glowSoft = `rgba(${rgb}, 0.16)`;
              const halo = `rgba(${rgb}, 0.28)`;

              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, y: 28, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -18, scale: 0.94 }}
                  transition={{
                    duration: shouldReduceMotion ? 0.01 : 0.45,
                    delay: shouldReduceMotion ? 0 : index * 0.05,
                  }}
                  whileHover={shouldReduceMotion ? undefined : { y: -10, scale: 1.015 }}
                  className="skill-threat-shell group relative overflow-hidden rounded-[1.75rem] p-[1px]"
                  style={{
                    '--skill-color': skill.color,
                    '--skill-glow': glowStrong,
                    '--skill-glow-soft': glowSoft,
                    '--skill-halo': halo,
                    '--skill-delay': `${index * 0.35}s`,
                  }}
                >
                  <div className="skill-threat-card relative flex h-full min-h-[220px] flex-col overflow-hidden rounded-[calc(1.75rem-1px)] p-6 md:p-7">
                    <span className="skill-noise" aria-hidden="true" />
                    <span className="skill-grid-overlay" aria-hidden="true" />
                    <span className="skill-corner-glow" aria-hidden="true" />

                    <div className="relative z-10 flex h-full flex-col">
                      <div className="mb-6 flex items-center justify-between gap-3">
                        <span className="skill-category-pill">{skill.tag}</span>
                        <span
                          className="skill-status-dot"
                          aria-hidden="true"
                          style={{
                            backgroundColor: skill.color,
                            boxShadow: `0 0 18px ${glowStrong}`,
                          }}
                        />
                      </div>

                      <div className="flex flex-1 flex-col items-center justify-center text-center">
                        <div
                          className="skill-icon-shell mb-5 flex h-20 w-20 items-center justify-center rounded-[1.35rem] text-[2.65rem]"
                          style={{
                            color: skill.color,
                            boxShadow: `inset 0 0 0 1px ${glowSoft}, 0 0 35px -12px ${glowStrong}`,
                          }}
                        >
                          {skill.icon}
                        </div>

                        <h3 className="font-display text-xl font-semibold tracking-wide text-white">
                          {skill.name}
                        </h3>

                        <p className="mt-2 text-xs uppercase tracking-[0.38em] text-white/35">
                          {categoryLabels[skill.category]}
                        </p>
                      </div>

                      <div className="mt-8">
                        <div className="skill-meter">
                          <motion.div
                            initial={shouldReduceMotion ? { width: `${skill.level}%`, opacity: 1 } : { width: 0, opacity: 0.7 }}
                            whileInView={{ width: `${skill.level}%`, opacity: 1 }}
                            viewport={{ once: true, amount: 0.45 }}
                            transition={shouldReduceMotion ? { duration: 0.01 } : {
                              duration: 1.35,
                              delay: 0.15 + index * 0.06,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="skill-meter-fill"
                            style={{
                              background: `linear-gradient(90deg, rgba(${rgb}, 0.35), ${skill.color} 58%, rgba(255, 255, 255, 0.95))`,
                              boxShadow: `0 0 32px ${glowStrong}`,
                            }}
                          />
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-[0.65rem] uppercase tracking-[0.4em] text-white/25">
                            Live Stack
                          </span>

                          <div className="skill-signal-dots" aria-hidden="true">
                            <span />
                            <span />
                            <span />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
