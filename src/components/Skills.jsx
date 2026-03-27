import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt } from 'react-icons/fa';
import { SiMongodb, SiC, SiTailwindcss, SiPostman } from 'react-icons/si';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'tools', label: 'Tools' },
  ];

  const skills = [
    { name: 'HTML5', icon: <FaHtml5 />, color: '#E34F26', level: 90, category: 'frontend' },
    { name: 'CSS3', icon: <FaCss3Alt />, color: '#1572B6', level: 85, category: 'frontend' },
    { name: 'JavaScript', icon: <FaJs />, color: '#F7DF1E', level: 80, category: 'frontend' },
    { name: 'React', icon: <FaReact />, color: '#61DAFB', level: 82, category: 'frontend' },
    { name: 'Tailwind CSS', icon: <SiTailwindcss />, color: '#06B6D4', level: 85, category: 'frontend' },
    { name: 'Node.js', icon: <FaNodeJs />, color: '#339933', level: 70, category: 'backend' },
    { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248', level: 72, category: 'backend' },
    { name: 'C Language', icon: <SiC />, color: '#A8B9CC', level: 75, category: 'backend' },
    { name: 'Git', icon: <FaGitAlt />, color: '#F05032', level: 78, category: 'tools' },
    { name: 'Postman', icon: <SiPostman />, color: '#FF6C37', level: 80, category: 'tools' },
  ];

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="py-24 md:py-32 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-accent font-mono text-sm tracking-widest uppercase mb-4 block"
        >
          // My Arsenal
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="section-heading mb-4"
        >
          Technical <span className="gradient-text">Skills</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="section-subheading"
        >
          The technologies and tools I use to bring ideas to life
        </motion.p>
      </div>

      {/* Category Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex justify-center gap-2 mb-12 flex-wrap"
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === cat.id
                ? 'text-white'
                : 'text-gray-400 hover:text-white glass'
            }`}
          >
            {activeCategory === cat.id && (
              <motion.div
                layoutId="skillFilter"
                className="absolute inset-0 bg-gradient-to-r from-accent to-neon-cyan rounded-full"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{cat.label}</span>
          </button>
        ))}
      </motion.div>

      {/* Skills Grid */}
      <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -4 }}
              className="group relative glass-card rounded-2xl p-6 hover:border-accent/30 transition-all duration-500 cursor-default overflow-hidden"
            >
              {/* Glow on hover */}
              <div
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-700"
                style={{ backgroundColor: skill.color }}
              />

              <div className="relative z-10 flex flex-col items-center text-center gap-4">
                {/* Icon */}
                <div
                  className="text-4xl transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-lg"
                  style={{ color: skill.color }}
                >
                  {skill.icon}
                </div>

                {/* Name */}
                <h3 className="font-display font-semibold text-sm text-white">
                  {skill.name}
                </h3>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${skill.color}80, ${skill.color})`,
                    }}
                  />
                </div>

                {/* Level text */}
                <span className="text-xs text-gray-500 font-mono">
                  {skill.level}%
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default Skills;
