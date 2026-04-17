import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiCpu, FiMonitor, FiZap, FiCalendar, FiMapPin } from 'react-icons/fi';

const About = () => {
  const [problemsSolved, setProblemsSolved] = useState(null);

  useEffect(() => {
    fetch('https://alfa-leetcode-api.onrender.com/MaharshiPatel24/solved')
      .then(res => res.json())
      .then(data => {
        if (data.solvedProblem !== undefined) {
          setProblemsSolved(data.solvedProblem);
        }
      })
      .catch(() => {});
  }, []);

  const highlights = [
    { icon: <FiCode />, label: 'Web Development', desc: 'Full-Stack Apps' },
    { icon: <FiCpu />, label: 'Problem Solving', desc: 'DSA + Algorithms' },
    { icon: <FiMonitor />, label: 'Responsive Design', desc: 'Mobile-First' },
    { icon: <FiZap />, label: 'Performance', desc: 'Optimized Code' },
  ];

  const stats = [
    { value: '5+', label: 'Projects Built' },
    { value: problemsSolved !== null ? `${problemsSolved}+` : '...', label: 'Problems Solved' },
    { value: '3+', label: 'Certifications' },
  ];

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
  };

  return (
    <section id="about" className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Content — centered single-column layout */}
      <motion.div
        variants={contentVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="w-full flex flex-col items-center text-center"
      >
        {/* Section label */}
        <motion.span variants={itemVariants} className="text-accent font-mono text-sm tracking-widest uppercase mb-4 block">
          // About Me
        </motion.span>

        <motion.h2 variants={itemVariants} className="section-heading mb-6">
          Turning <span className="gradient-text">Ideas</span> Into
          <br />Digital Reality
        </motion.h2>

        <motion.p variants={itemVariants} className="text-gray-400 text-base sm:text-lg leading-relaxed mb-4 max-w-2xl">
          I'm a passionate <span className="text-white font-medium">Software Developer</span> with a strong focus on building
          scalable web applications. I love exploring new technologies and solving complex problems
          through clean and efficient code.
        </motion.p>

        <motion.p variants={itemVariants} className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
          My journey involves <span className="text-white font-medium">continuous learning</span> and applying modern practices
          to create impactful digital experiences that push the boundaries of what's possible on the web.
        </motion.p>

        {/* Info tags */}
        <motion.div variants={itemVariants} className="flex flex-wrap gap-2 sm:gap-3 mb-8 justify-center">
          <div className="flex items-center gap-2 px-3 sm:px-4 py-2 glass rounded-full text-xs sm:text-sm text-gray-300">
            <FiMapPin className="text-accent flex-shrink-0" />
            <span>India</span>
          </div>
          <div className="flex items-center gap-2 px-3 sm:px-4 py-2 glass rounded-full text-xs sm:text-sm text-gray-300">
            <FiCalendar className="text-accent flex-shrink-0" />
            <span>B.Tech Student</span>
          </div>
          {['Coding', 'Gaming', 'Video Editing', 'Chess'].map((interest) => (
            <span
              key={interest}
              className="px-3 sm:px-4 py-2 glass rounded-full text-xs sm:text-sm text-gray-300 hover:bg-accent/20 hover:text-accent-light hover:border-accent/30 transition-all duration-300 cursor-default"
            >
              {interest}
            </span>
          ))}
        </motion.div>

        {/* Highlight grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 w-full max-w-2xl">
          {highlights.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 sm:p-4 glass rounded-xl group hover:bg-accent/10 transition-all duration-300"
            >
              <div className="text-accent text-xl group-hover:scale-110 transition-transform flex-shrink-0">
                {item.icon}
              </div>
              <div className="text-left">
                <span className="font-medium text-sm text-white block">{item.label}</span>
                <span className="text-xs text-gray-500">{item.desc}</span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Stats strip */}
        <motion.div variants={itemVariants} className="flex flex-wrap gap-8 sm:gap-12 justify-center">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl sm:text-4xl font-display font-bold gradient-text-static">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-1 font-mono uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
