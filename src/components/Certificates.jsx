import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAward, FiExternalLink, FiX, FiCalendar, FiChevronRight } from 'react-icons/fi';

const Certificates = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  const certificates = [
    {
      id: 1,
      title: 'AI Tools & ChatGPT Workshop',
      issuer: 'Be10x',
      date: 'December 2025',
      description: 'Completed AI Tools and ChatGPT workshop — skilled in creating presentations using AI in under 5 min, analysing data using AI in under 30 min, and coding & debugging using AI in under 10 min.',
      skills: ['AI Presentations', 'Data Analysis', 'AI-Powered Coding', 'ChatGPT'],
      image: '/be10x-certificate.png',
      verifyLink: '#',
      color: '#f59e0b',
      gradient: 'from-amber-500/20 to-yellow-500/20',
    },
    {
      id: 2,
      title: 'Full Stack Web Development',
      issuer: 'Udemy',
      date: '2025',
      description: 'Comprehensive course covering React, Node.js, MongoDB, Express.js, and Modern JavaScript ES6+.',
      skills: ['React', 'Node.js', 'MongoDB', 'Express.js'],
      verifyLink: '#',
      color: '#8b5cf6',
      gradient: 'from-purple-500/20 to-violet-500/20',
    },
    {
      id: 3,
      title: 'React Native Expert',
      issuer: 'Coursera',
      date: '2024',
      description: 'Specialization in building cross-platform mobile applications with React Native and Expo.',
      skills: ['React Native', 'Expo', 'Mobile Development'],
      verifyLink: '#',
      color: '#06b6d4',
      gradient: 'from-cyan-500/20 to-teal-500/20',
    },
    {
      id: 4,
      title: 'Advanced CSS & Sass',
      issuer: 'Udemy',
      date: '2024',
      description: 'Mastering modern CSS layouts, animations, Sass preprocessor, and responsive design.',
      skills: ['CSS3', 'Sass', 'Animations', 'Responsive Design'],
      verifyLink: '#',
      color: '#ec4899',
      gradient: 'from-pink-500/20 to-rose-500/20',
    },
    {
      id: 5,
      title: 'JavaScript Algorithms',
      issuer: 'FreeCodeCamp',
      date: '2023',
      description: 'In-depth practice of algorithms, data structures, and problem-solving in JavaScript.',
      skills: ['Algorithms', 'Data Structures', 'Problem Solving'],
      verifyLink: '#',
      color: '#10b981',
      gradient: 'from-emerald-500/20 to-green-500/20',
    },
    {
      id: 6,
      title: 'UI/UX Design Fundamentals',
      issuer: 'Google',
      date: '2023',
      description: 'Foundational principles of user interface and user experience design, prototyping with Figma.',
      skills: ['UI Design', 'UX Research', 'Figma', 'Prototyping'],
      verifyLink: '#',
      color: '#f59e0b',
      gradient: 'from-amber-500/20 to-orange-500/20',
    },
  ];

  return (
    <section id="certificates" className="py-24 md:py-32 px-4 max-w-7xl mx-auto relative">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-neon-cyan/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-16 relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-accent font-mono text-sm tracking-widest uppercase mb-4 block"
        >
          // Achievements
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="section-heading mb-4"
        >
          My <span className="gradient-text">Certificates</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="section-subheading"
        >
          Professional certifications that validate my expertise
        </motion.p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10 max-w-6xl mx-auto">
        {certificates.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
            onClick={() => setSelectedCert(cert)}
            className="group relative glass-card rounded-2xl overflow-hidden cursor-pointer hover-lift"
          >
            {/* Top gradient area */}
            <div className={`relative h-32 bg-gradient-to-br ${cert.gradient} p-5 flex items-start justify-between overflow-hidden`}>
              {/* Animated orb */}
              <div
                className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full blur-[35px] opacity-20 group-hover:opacity-50 transition-all duration-700"
                style={{ backgroundColor: cert.color }}
              />

              <div
                className="p-2.5 rounded-xl backdrop-blur-sm group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: `${cert.color}20` }}
              >
                <FiAward size={22} style={{ color: cert.color }} />
              </div>

              {/* Year badge */}
              <span
                className="text-xs font-mono px-2.5 py-1 rounded-full backdrop-blur-sm"
                style={{ backgroundColor: `${cert.color}15`, color: cert.color }}
              >
                {cert.date}
              </span>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="font-display font-bold text-lg text-white mb-1 group-hover:translate-x-0.5 transition-transform duration-300 line-clamp-1">
                {cert.title}
              </h3>

              <p className="text-sm mb-3" style={{ color: cert.color }}>
                {cert.issuer}
              </p>

              <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">
                {cert.description}
              </p>

              {/* Skills tags */}
              {cert.skills && (
                <div className="flex flex-wrap gap-1.5">
                  {cert.skills.slice(0, 3).map((skill, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 text-[11px] font-mono rounded-full border"
                      style={{
                        borderColor: `${cert.color}25`,
                        color: `${cert.color}cc`,
                        backgroundColor: `${cert.color}08`,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                  {cert.skills.length > 3 && (
                    <span className="px-2.5 py-0.5 text-[11px] font-mono rounded-full text-gray-500">
                      +{cert.skills.length - 3}
                    </span>
                  )}
                </div>
              )}

              {/* View details hint */}
              <div className="flex items-center gap-1 mt-4 text-xs text-gray-500 group-hover:text-gray-300 transition-colors">
                <span>View details</span>
                <FiChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Bottom accent line */}
            <div
              className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700"
              style={{ backgroundColor: cert.color }}
            />
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/85 backdrop-blur-lg" onClick={() => setSelectedCert(null)} />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl"
              style={{
                background: 'linear-gradient(145deg, rgba(20,20,35,0.98), rgba(10,10,20,0.99))',
                border: `1px solid ${selectedCert.color}20`,
              }}
            >
              {/* Gradient header bar */}
              <div
                className="h-1 w-full"
                style={{ background: `linear-gradient(90deg, ${selectedCert.color}, ${selectedCert.color}40, transparent)` }}
              />

              {/* Close button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 transition-all duration-300 text-gray-400 hover:text-white"
              >
                <FiX size={18} />
              </button>

              <div className="p-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="p-3.5 rounded-2xl"
                    style={{ backgroundColor: `${selectedCert.color}15`, border: `1px solid ${selectedCert.color}20` }}
                  >
                    <FiAward size={26} style={{ color: selectedCert.color }} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-bold text-white">{selectedCert.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-medium" style={{ color: selectedCert.color }}>{selectedCert.issuer}</span>
                      <span className="text-gray-600">•</span>
                      <span className="flex items-center gap-1 text-sm text-gray-400">
                        <FiCalendar size={13} />
                        {selectedCert.date}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Certificate Image */}
                {selectedCert.image && (
                  <div
                    className="relative rounded-xl overflow-hidden mb-6 border"
                    style={{ borderColor: `${selectedCert.color}15` }}
                  >
                    <div className="bg-white/[0.02] p-2">
                      <img
                        src={selectedCert.image}
                        alt={`${selectedCert.title} Certificate`}
                        className="w-full h-auto rounded-lg object-contain max-h-[400px]"
                        style={{ background: 'white' }}
                      />
                    </div>
                  </div>
                )}

                {/* Description */}
                <p className="text-gray-300 leading-relaxed mb-6 text-[15px]">
                  {selectedCert.description}
                </p>

                {/* Skills */}
                {selectedCert.skills && (
                  <div className="mb-6">
                    <p className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-3">Skills Acquired</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedCert.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 text-xs font-mono rounded-lg"
                          style={{
                            backgroundColor: `${selectedCert.color}10`,
                            color: selectedCert.color,
                            border: `1px solid ${selectedCert.color}20`,
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Verify button */}
                <a
                  href={selectedCert.verifyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-300 hover:shadow-lg hover:scale-[1.01]"
                  style={{
                    background: `linear-gradient(135deg, ${selectedCert.color}, ${selectedCert.color}bb)`,
                    boxShadow: `0 4px 20px ${selectedCert.color}25`,
                  }}
                >
                  <FiExternalLink className="group-hover/btn:rotate-12 transition-transform" />
                  Verify Credential
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certificates;
