import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { FiCode, FiCpu, FiMonitor, FiZap, FiCalendar, FiMapPin } from 'react-icons/fi';
import Maharshi from '../assets/Maharshi.svg';

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
    <section id="about" className="py-24 md:py-32 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-16 lg:gap-20">
        {/* Image Side */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full lg:w-5/12 flex justify-center"
        >
          <div className="relative group">
            {/* Animated gradient border */}
            <div className="absolute -inset-1 bg-gradient-to-r from-accent via-neon-cyan to-neon-pink rounded-3xl blur-lg opacity-30 group-hover:opacity-60 transition-all duration-700 animate-gradient-shift" style={{ backgroundSize: '200% 200%' }} />

            {/* Image container */}
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-3xl overflow-hidden glass-card">
              <img
                src={Maharshi}
                alt="Maharshi Patel"
                className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
            </div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 px-3 py-1.5 sm:px-4 sm:py-2 glass rounded-xl text-xs sm:text-sm font-mono text-neon-cyan shadow-glow-cyan"
            >
              {'<Developer />'}
            </motion.div>

            <motion.div
              animate={{ y: [5, -5, 5] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-4 -left-4 px-3 py-1.5 sm:px-4 sm:py-2 glass rounded-xl text-xs sm:text-sm font-mono text-neon-pink"
            >
              {'🚀 Open to Work'}
            </motion.div>
          </div>
        </motion.div>

        {/* Content Side with Line-by-Line Stagger Animation */}
        <motion.div
          variants={contentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="w-full lg:w-7/12 flex flex-col items-start"
        >
          {/* Section label */}
          <motion.span variants={itemVariants} className="text-accent font-mono text-sm tracking-widest uppercase mb-4 block">
            // About Me
          </motion.span>

          <motion.h2 variants={itemVariants} className="section-heading mb-6">
            Turning <span className="gradient-text">Ideas</span> Into
            <br />Digital Reality
          </motion.h2>

          <motion.p variants={itemVariants} className="text-gray-400 text-lg leading-relaxed mb-4">
            I'm a passionate <span className="text-white font-medium">Software Developer</span> with a strong focus on building
            scalable web applications. I love exploring new technologies and solving complex problems
            through clean and efficient code.
          </motion.p>

          <motion.p variants={itemVariants} className="text-gray-400 text-lg leading-relaxed mb-8">
            My journey involves <span className="text-white font-medium">continuous learning</span> and applying modern practices
            to create impactful digital experiences that push the boundaries of what's possible on the web.
          </motion.p>

          {/* Info tags */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 glass rounded-full text-sm text-gray-300">
              <FiMapPin className="text-accent" />
              <span>India</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 glass rounded-full text-sm text-gray-300">
              <FiCalendar className="text-accent" />
              <span>B.Tech Student</span>
            </div>
            {['Coding', 'Gaming', 'Video Editing', 'Chess'].map((interest) => (
              <span
                key={interest}
                className="px-4 py-2 glass rounded-full text-sm text-gray-300 hover:bg-accent/20 hover:text-accent-light hover:border-accent/30 transition-all duration-300 cursor-default"
              >
                {interest}
              </span>
            ))}
          </motion.div>

          {/* Highlight grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 w-full">
            {highlights.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 glass rounded-xl group hover:bg-accent/10 transition-all duration-300"
              >
                <div className="text-accent text-xl group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div>
                  <span className="font-medium text-sm text-white block">{item.label}</span>
                  <span className="text-xs text-gray-500">{item.desc}</span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Stats strip */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-6 sm:gap-8 justify-center lg:justify-start">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-display font-bold gradient-text-static">{stat.value}</div>
                <div className="text-xs text-gray-500 mt-1 font-mono uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
