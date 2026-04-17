import React from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiMapPin, FiAward, FiCode, FiExternalLink, FiImage } from 'react-icons/fi';

import su1 from '../assets/su-hackathon/su-1.jpg';
import su2 from '../assets/su-hackathon/su-2.jpg';
import su3 from '../assets/su-hackathon/su-3.jpg';
import su4 from '../assets/su-hackathon/su-4.jpg';
import su5 from '../assets/su-hackathon/su-5.jpg';

const HACKATHONS = [
  {
    title: 'SU Hackathon',
    date: 'march 2026',
    location: 'Sangam University, Virtual',
    role: 'Full Stack Developer',
    project: 'CropPilot',
    description: 'Developed an AI-powered crop intelligence platform for Indian farmers. Secured top position among 50+ participating teams.',
    tech: ['React', 'Node.js', 'MongoDB', 'AI Integration'],
    prize: 'Winner',
    link: 'https://croppilot-su.vercel.app/',
    images: [su1, su2, su3, su4, su5]
  },
  {
    title: 'ArtPark CodeForge',
    date: 'march 2026',
    location: 'IISc Bangalore',
    role: 'Backend Architect',
    project: 'Ai-Onboarding-Engine',
    description: 'Built a highly scalable RESTful API with advanced data processing capabilities, designed for real-time analytics and onboarding flows.',
    tech: ['Express', 'Node.js', 'In-memory DB'],
    prize: 'Finalist',
    link: 'https://iisc-hack.vercel.app/'
  }
];

const Hackathons = () => {
  return (
    <section id="hackathons" className="mx-auto max-w-7xl px-4 py-24 md:py-32 relative">
      <div className="mb-16 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 block text-sm font-mono uppercase tracking-widest text-[#f59e0b]"
        >
          // Competitions
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="section-heading mb-4"
        >
          Hackathon <span className="text-[#f59e0b]">Experience</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="section-subheading"
        >
          Building rapid solutions under pressure
        </motion.p>
      </div>

      <div className="space-y-8 max-w-4xl mx-auto">
        {HACKATHONS.map((hackathon, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="glass rounded-2xl p-6 md:p-8 border border-white/5 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <FiCode size={120} />
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-10">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold text-white font-display">{hackathon.title}</h3>
                  {hackathon.prize && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/30 flex items-center gap-1">
                      <FiAward /> {hackathon.prize}
                    </span>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-400 font-mono mb-6">
                  <div className="flex items-center gap-1"><FiCalendar /> {hackathon.date}</div>
                  <div className="flex items-center gap-1"><FiMapPin /> {hackathon.location}</div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-2">Project: {hackathon.project}</h4>
                  <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                    {hackathon.description}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {hackathon.tech.map((t, i) => (
                    <span key={i} className="glass px-3 py-1 text-xs rounded-full text-gray-300">
                      {t}
                    </span>
                  ))}
                </div>
                
                <div className="mb-8">
                  <a 
                    href={hackathon.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#f59e0b] hover:text-[#fbbf24] transition-colors text-sm font-medium"
                  >
                    View Project <FiExternalLink />
                  </a>
                </div>

                {hackathon.images && hackathon.images.length > 0 && (
                  <div className="mt-8 pt-8 border-t border-white/10">
                    <h5 className="flex items-center gap-2 text-white text-sm font-semibold mb-6 uppercase tracking-wider">
                      <FiImage className="text-[#f59e0b]" /> Event Showcase
                    </h5>
                    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                      {hackathon.images.map((img, idx) => (
                        <motion.div 
                          key={idx}
                          whileHover={{ scale: 1.02, y: -5 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className="rounded-xl overflow-hidden border border-white/10 relative break-inside-avoid shadow-lg group bg-black/20"
                        >
                          <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                          <img 
                            src={img} 
                            alt={`${hackathon.title} moment ${idx + 1}`} 
                            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            loading="lazy"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Hackathons;
