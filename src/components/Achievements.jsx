import React from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiTrendingUp } from 'react-icons/fi';

const ACHIEVEMENTS = [
  {
    title: 'Top 50 Hackathon Team',
    description: 'Secured top position out of 50+ teams in the SU Hackathon for developing the AI-powered CropPilot application.',
    icon: <FiStar size={24} className="text-yellow-400" />,
    date: 'February 2026'
  },
  {
    title: 'CodeForge Finalist',
    description: 'Reached the finals of the ArtPark CodeForge at IISc Bangalore with the Ai-Onboarding-Engine backend interface.',
    icon: <FiTrendingUp size={24} className="text-blue-400" />,
    date: 'January 2026'
  }
];

const Achievements = () => {
  return (
    <section id="achievements" className="mx-auto max-w-7xl px-4 py-24 md:py-32 relative">
      <div className="mb-16 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 block text-sm font-mono uppercase tracking-widest text-[#facc15]"
        >
          // Recognitions
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="section-heading mb-4"
        >
          Milestones & <span className="text-[#facc15]">Achievements</span>
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {ACHIEVEMENTS.map((achievement, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.2 }}
            className="glass rounded-2xl p-6 md:p-8 flex items-start gap-4 hover:border-[#facc15]/30 transition-all cursor-default"
          >
            <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex-shrink-0">
              {achievement.icon}
            </div>
            <div>
              <h3 className="text-xl font-display font-bold text-white mb-2">{achievement.title}</h3>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">{achievement.description}</p>
              <span className="text-xs font-mono text-gray-500">{achievement.date}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Achievements;
