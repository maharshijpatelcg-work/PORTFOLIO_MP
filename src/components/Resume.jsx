import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFileText, FiX, FiEye } from 'react-icons/fi';

const Resume = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="resume" className="mx-auto max-w-4xl px-4 py-24 md:py-32 relative text-center">
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-4 block text-sm font-mono uppercase tracking-widest text-accent"
      >
        // Curriculum Vitae
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="section-heading mb-8"
      >
        My <span className="text-accent-light">Resume</span>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="glass rounded-3xl p-8 md:p-12 border border-accent/20 flex flex-col items-center max-w-2xl mx-auto"
      >
        <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mb-6 text-accent">
          <FiFileText size={32} />
        </div>
        <p className="text-gray-300 mb-8 max-w-md text-center leading-relaxed">
          Detailed overview of my professional experience, education, technical skills, and certifications.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-white font-medium hover:bg-accent-light transition-colors"
          >
            <FiEye /> View Resume
          </button>
        </div>
      </motion.div>

      {/* Resume Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-[#1e1e1e] border border-white/10 rounded-2xl w-full max-w-5xl h-[85vh] sm:h-[90vh] flex flex-col overflow-hidden shadow-2xl relative"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center p-4 border-b border-white/10 bg-black/40">
                <h3 className="text-white font-medium flex items-center gap-2">
                  <FiFileText className="text-accent" /> Maharshi_Patel_Resume.pdf
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                >
                  <FiX size={24} />
                </button>
              </div>
              
              {/* PDF Viewer - Using iframe for native browser PDF rendering */}
              <div className="flex-1 bg-white relative w-full h-full">
                <iframe
                  src="https://resume-mp.vercel.app/"
                  className="absolute inset-0 w-full h-full border-0"
                  title="Maharshi Patel Resume"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Resume;
