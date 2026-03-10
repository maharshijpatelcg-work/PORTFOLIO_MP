import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiGithub, FiLinkedin, FiTwitter, FiSend, FiMapPin, FiPhone } from 'react-icons/fi';

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [focused, setFocused] = useState(null);

  const handleChange = (e) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const socialLinks = [
    { Icon: FiGithub, href: '#', label: 'GitHub', color: '#fff' },
    { Icon: FiLinkedin, href: '#', label: 'LinkedIn', color: '#0077B5' },
    { Icon: FiTwitter, href: '#', label: 'Twitter', color: '#1DA1F2' },
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
    <section id="contact" className="py-24 md:py-32 px-4 max-w-7xl mx-auto relative">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-16 relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-accent font-mono text-sm tracking-widest uppercase mb-4 block"
        >
          // Let's Connect
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="section-heading mb-4"
        >
          Get In <span className="gradient-text">Touch</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="section-subheading"
        >
          Have a project in mind or just want to say hello? I'd love to hear from you.
        </motion.p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 relative z-10">
        {/* Contact Info */}
        <motion.div
          variants={contentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="lg:col-span-2 space-y-6"
        >
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-display font-bold mb-3">Let's Talk</h3>
            <p className="text-gray-400 leading-relaxed">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
          </motion.div>

          {/* Contact cards */}
          <motion.div variants={itemVariants} className="space-y-3">
            <a
              href="mailto:maharshipatel.dev@gmail.com"
              className="group flex items-center gap-4 p-4 glass-card rounded-xl hover:border-accent/30 transition-all duration-300"
            >
              <div className="p-3 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                <FiMail className="text-accent" size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-mono uppercase tracking-wider">Email</p>
                <p className="text-sm font-medium text-white">maharshipatel.dev@gmail.com</p>
              </div>
            </a>

            <div className="flex items-center gap-4 p-4 glass-card rounded-xl">
              <div className="p-3 bg-neon-cyan/10 rounded-lg">
                <FiMapPin className="text-neon-cyan" size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-mono uppercase tracking-wider">Location</p>
                <p className="text-sm font-medium text-white">India</p>
              </div>
            </div>
          </motion.div>

          {/* Social links */}
          <motion.div variants={itemVariants}>
            <p className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-3">Find me on</p>
            <div className="flex gap-3">
              {socialLinks.map(({ Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="group p-3 glass rounded-xl text-gray-400 hover:text-white transition-all duration-300 hover:-translate-y-1"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Availability */}
          <motion.div variants={itemVariants} className="glass-card rounded-xl p-4 flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
            </span>
            <span className="text-sm text-gray-300">Currently available for freelance work</span>
          </motion.div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          variants={contentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="lg:col-span-3"
        >
          <form className="glass-card rounded-2xl p-8 space-y-6">
            {/* Name */}
            <motion.div variants={itemVariants} className="relative">
              <label className={`absolute left-4 transition-all duration-300 pointer-events-none font-mono text-xs tracking-wider uppercase ${focused === 'name' || formState.name
                  ? '-top-2.5 text-accent text-[10px]'
                  : 'top-4 text-gray-500'
                }`}>
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formState.name}
                onChange={handleChange}
                onFocus={() => setFocused('name')}
                onBlur={() => setFocused(null)}
                className="w-full px-4 pt-5 pb-3 bg-white/[0.03] rounded-xl border border-white/10 focus:border-accent/50 focus:bg-white/[0.05] outline-none transition-all duration-300 text-white"
              />
            </motion.div>

            {/* Email */}
            <motion.div variants={itemVariants} className="relative">
              <label className={`absolute left-4 transition-all duration-300 pointer-events-none font-mono text-xs tracking-wider uppercase ${focused === 'email' || formState.email
                  ? '-top-2.5 text-accent text-[10px]'
                  : 'top-4 text-gray-500'
                }`}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
                className="w-full px-4 pt-5 pb-3 bg-white/[0.03] rounded-xl border border-white/10 focus:border-accent/50 focus:bg-white/[0.05] outline-none transition-all duration-300 text-white"
              />
            </motion.div>

            {/* Message */}
            <motion.div variants={itemVariants} className="relative">
              <label className={`absolute left-4 transition-all duration-300 pointer-events-none font-mono text-xs tracking-wider uppercase ${focused === 'message' || formState.message
                  ? '-top-2.5 text-accent text-[10px]'
                  : 'top-4 text-gray-500'
                }`}>
                Your Message
              </label>
              <textarea
                name="message"
                rows="5"
                value={formState.message}
                onChange={handleChange}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused(null)}
                className="w-full px-4 pt-5 pb-3 bg-white/[0.03] rounded-xl border border-white/10 focus:border-accent/50 focus:bg-white/[0.05] outline-none transition-all duration-300 text-white resize-none"
              />
            </motion.div>

            {/* Submit */}
            <motion.button
              variants={itemVariants}
              type="submit"
              className="group w-full py-4 bg-gradient-to-r from-accent to-neon-cyan text-white font-display font-bold rounded-xl magnetic-btn flex items-center justify-center gap-3 text-lg"
            >
              Send Message
              <FiSend className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
