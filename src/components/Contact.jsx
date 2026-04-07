import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiGithub, FiLinkedin, FiTwitter, FiInstagram, FiSend, FiMapPin, FiPhone, FiCheck, FiAlertCircle } from 'react-icons/fi';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const formRef = useRef();
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [focused, setFocused] = useState(null);
  const [sending, setSending] = useState(false);
  const [sendStatus, setSendStatus] = useState(null); // 'success' | 'error' | null

  const handleChange = (e) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setSending(true);
    setSendStatus(null);

    emailjs.sendForm(
      'service_il139gg',
      'template_elha7yn',
      formRef.current,
      { publicKey: '8o6_5yVwaCeQR6-mB' }
    )
      .then(() => {
        setSendStatus('success');
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setSendStatus(null), 4000);
      })
      .catch((error) => {
        console.error('FAILED...', error.text || error);
        setSendStatus('error');
        setTimeout(() => setSendStatus(null), 4000);
      })
      .finally(() => {
        setSending(false);
      });
  };

  const socialLinks = [
    { Icon: FiGithub, href: 'https://github.com/maharshijpatelcg-work', label: 'GitHub', color: '#fff' },
    { Icon: FiLinkedin, href: 'https://www.linkedin.com/in/maharshi-patel-1b08b0395/', label: 'LinkedIn', color: '#0077B5' },
    { Icon: FiTwitter, href: 'https://x.com/Maharshi_245707', label: 'Twitter', color: '#1DA1F2' },
    { Icon: FiInstagram, href: 'https://www.instagram.com/mr._.maharshi_24/', label: 'Instagram', color: '#E1306C' },
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
              href="mailto:maharshi.j.patel.cg@gmail.com"
              className="group flex items-center gap-4 p-4 glass-card rounded-xl hover:border-accent/30 transition-all duration-300"
            >
              <div className="p-3 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                <FiMail className="text-accent" size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-mono uppercase tracking-wider">Email</p>
                <p className="text-sm font-medium text-white">maharshi.j.patel.cg@gmail.com</p>
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
          <form ref={formRef} onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 space-y-6">
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
              disabled={sending}
              className={`group w-full py-4 text-white font-display font-bold rounded-xl magnetic-btn flex items-center justify-center gap-3 text-lg transition-all duration-300 ${
                sendStatus === 'success'
                  ? 'bg-green-500'
                  : sendStatus === 'error'
                  ? 'bg-red-500'
                  : 'bg-gradient-to-r from-accent to-neon-cyan'
              } ${sending ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {sending ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Sending...
                </>
              ) : sendStatus === 'success' ? (
                <>
                  <FiCheck size={20} />
                  Message Sent!
                </>
              ) : sendStatus === 'error' ? (
                <>
                  <FiAlertCircle size={20} />
                  Failed to send. Try again.
                </>
              ) : (
                <>
                  Send Message
                  <FiSend className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
