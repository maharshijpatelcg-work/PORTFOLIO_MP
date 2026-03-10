import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAward, FiExternalLink, FiX, FiCalendar } from 'react-icons/fi';

const Certificates = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  const certificates = [
    {
      id: 1,
      title: 'Full Stack Web Development',
      issuer: 'Udemy',
      date: '2025',
      description: 'Comprehensive course covering React, Node.js, MongoDB, Express.js, and Modern JavaScript ES6+.',
      verifyLink: '#',
      color: '#8b5cf6',
    },
    {
      id: 2,
      title: 'React Native Expert',
      issuer: 'Coursera',
      date: '2024',
      description: 'Specialization in building cross-platform mobile applications with React Native and Expo.',
      verifyLink: '#',
      color: '#06b6d4',
    },
    {
      id: 3,
      title: 'Advanced CSS & Sass',
      issuer: 'Udemy',
      date: '2024',
      description: 'Mastering modern CSS layouts, animations, Sass preprocessor, and responsive design.',
      verifyLink: '#',
      color: '#ec4899',
    },
    {
      id: 4,
      title: 'JavaScript Algorithms',
      issuer: 'FreeCodeCamp',
      date: '2023',
      description: 'In-depth practice of algorithms, data structures, and problem-solving in JavaScript.',
      verifyLink: '#',
      color: '#10b981',
    },
    {
      id: 5,
      title: 'UI/UX Design Fundamentals',
      issuer: 'Google',
      date: '2023',
      description: 'Foundational principles of user interface and user experience design, prototyping with Figma.',
      verifyLink: '#',
      color: '#f59e0b',
    },
  ];

  return (
    <section id="certificates" className="py-24 md:py-32 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
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

      {/* Timeline-style grid */}
      <div className="relative max-w-4xl mx-auto">
        {/* Vertical line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent hidden md:block" />

        <div className="space-y-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`relative flex items-start gap-6 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline dot (desktop) */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 z-10"
                style={{ borderColor: cert.color, backgroundColor: `${cert.color}30` }}
              />

              {/* Certificate card */}
              <div className="w-full md:w-[calc(50%-2rem)]">
                <div
                  onClick={() => setSelectedCert(cert)}
                  className="group glass-card rounded-2xl p-6 cursor-pointer hover-lift transition-all duration-500 hover:border-opacity-40"
                  style={{ '--hover-color': cert.color }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="p-3 rounded-xl group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: `${cert.color}15` }}
                    >
                      <FiAward size={22} style={{ color: cert.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-bold text-lg text-white group-hover:text-accent-light transition-colors line-clamp-1">
                        {cert.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <span style={{ color: cert.color }}>{cert.issuer}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <FiCalendar size={12} />
                          {cert.date}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                    {cert.description}
                  </p>

                  {/* Bottom accent */}
                  <div
                    className="mt-4 w-0 group-hover:w-full h-0.5 rounded-full transition-all duration-700"
                    style={{ backgroundColor: cert.color }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
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
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setSelectedCert(null)} />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg glass-strong rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Header gradient bar */}
              <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${selectedCert.color}, ${selectedCert.color}80)` }} />

              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div
                      className="p-3 rounded-xl"
                      style={{ backgroundColor: `${selectedCert.color}15` }}
                    >
                      <FiAward size={28} style={{ color: selectedCert.color }} />
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-bold text-white">{selectedCert.title}</h3>
                      <p className="text-sm mt-1" style={{ color: selectedCert.color }}>{selectedCert.issuer} • {selectedCert.date}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="p-2 glass rounded-full hover:bg-white/10 transition-colors"
                  >
                    <FiX size={18} />
                  </button>
                </div>

                <p className="text-gray-300 leading-relaxed mb-8">
                  {selectedCert.description}
                </p>

                <a
                  href={selectedCert.verifyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-white transition-all magnetic-btn"
                  style={{ backgroundColor: selectedCert.color }}
                >
                  <FiExternalLink />
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
