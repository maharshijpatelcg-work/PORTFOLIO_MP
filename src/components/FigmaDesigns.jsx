import React from 'react';
import { motion } from 'framer-motion';
import { SiFigma } from 'react-icons/si';
import { FiExternalLink } from 'react-icons/fi';

const DESIGNS = [
  {
    title: 'CropPilot Mobile App',
    description: 'UI/UX design for the Indian farmer companion app, featuring a clean, accessible interface with regional language support.',
    image: '/croppilot-preview.png',
    link: 'https://figma.com/file/placeholder1'
  },
  {
    title: 'FleetFlow Command Center',
    description: 'Dashboard design for logistics management with data visualization components and dark mode aesthetic.',
    image: '/fleetflow-preview.png',
    link: 'https://figma.com/file/placeholder2'
  }
];

const FigmaDesigns = () => {
  return (
    <section id="figmas" className="mx-auto max-w-7xl px-4 py-24 md:py-32 relative">
      <div className="mb-16 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 block text-sm font-mono uppercase tracking-widest text-[#0acf83]"
        >
          // UI/UX
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="section-heading mb-4"
        >
          Figma <span className="text-[#0acf83]">Designs</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="section-subheading"
        >
          Exploring user experiences and crafting interfaces before code
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {DESIGNS.map((design, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.2 }}
            className="group relative rounded-2xl glass overflow-hidden border border-white/5 hover:border-[#0acf83]/30 transition-all duration-500"
          >
            <div className="aspect-video overflow-hidden">
              <img 
                src={design.image} 
                alt={design.title} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-80" />
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-[#0acf83] transition-colors">{design.title}</h3>
              <p className="text-gray-400 text-sm line-clamp-2 mb-6">{design.description}</p>
              
              <a 
                href={design.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-[#0acf83]/20 text-[#0acf83] border border-[#0acf83]/20 transition-all duration-300 font-medium text-sm"
              >
                <SiFigma size={16} />
                <span>Open in Figma</span>
                <FiExternalLink size={14} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FigmaDesigns;
