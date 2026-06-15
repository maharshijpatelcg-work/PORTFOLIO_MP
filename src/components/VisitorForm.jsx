import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiPhone, FiMail, FiArrowRight, FiAlertCircle, FiLock } from 'react-icons/fi';
import emailjs from '@emailjs/browser';

const VisitorForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const validate = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10,14}$/;
    const cleanPhone = formData.phone.replace(/[\s\-()]/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(cleanPhone)) {
      newErrors.phone = 'Enter a valid 10-14 digit phone number';
    }

    // Email/Gmail validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Enter a valid email address';
    } else if (!formData.email.toLowerCase().endsWith('@gmail.com')) {
      newErrors.email = 'Please use a valid Gmail address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: `=== NEW VISITOR ALERT ===\n\nName: ${formData.name}\nGmail: ${formData.email}\nPhone: ${formData.phone}\n\nTimestamp: ${new Date().toLocaleString()}\n========================`,
      to_name: 'Maharshi Patel',
      reply_to: formData.email,
    };

    try {
      await emailjs.send(
        'service_il139gg',
        'template_elha7yn',
        templateParams,
        '8o6_5yVwaCeQR6-mB'
      );
      console.log('Visitor notification sent via EmailJS');
    } catch (err) {
      console.error('EmailJS notification failed:', err);
    } finally {
      setSubmitting(false);
      onSubmit(formData);
    }
  };

  // Stagger variants for premium entrance
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.96, y: 25 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 24,
        stiffness: 120,
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 110,
      },
    },
  };

  return (
    <div className="visitor-form-overlay">
      {/* Background ambient glow circles */}
      <div className="visitor-bg-glow visitor-glow-1" />
      <div className="visitor-bg-glow visitor-glow-2" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="visitor-card-container"
      >
        <motion.div variants={itemVariants} className="visitor-card-header">
          <div className="visitor-icon-badge">
            <FiLock className="text-accent" size={24} />
          </div>
          <h2 className="visitor-title">Identity Verification</h2>
          <p className="visitor-subtitle">Please introduce yourself to access Maharshi's portfolio</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="visitor-form">
          {/* Name Field */}
          <motion.div
            variants={itemVariants}
            className={`visitor-field-group ${focusedField === 'name' ? 'focused' : ''} ${errors.name ? 'has-error' : ''}`}
          >
            <label className="visitor-label">Full Name</label>
            <div className="visitor-input-wrapper">
              <FiUser className="visitor-input-icon" size={18} />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                placeholder="Enter your name"
                className="visitor-input"
                disabled={submitting}
              />
            </div>
            <AnimatePresence>
              {errors.name && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="visitor-error-text"
                >
                  <FiAlertCircle size={12} className="inline mr-1" />
                  {errors.name}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Phone Field */}
          <motion.div
            variants={itemVariants}
            className={`visitor-field-group ${focusedField === 'phone' ? 'focused' : ''} ${errors.phone ? 'has-error' : ''}`}
          >
            <label className="visitor-label">Phone Number</label>
            <div className="visitor-input-wrapper">
              <FiPhone className="visitor-input-icon" size={18} />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onFocus={() => setFocusedField('phone')}
                onBlur={() => setFocusedField(null)}
                placeholder="Enter 10-digit number"
                className="visitor-input"
                disabled={submitting}
              />
            </div>
            <AnimatePresence>
              {errors.phone && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="visitor-error-text"
                >
                  <FiAlertCircle size={12} className="inline mr-1" />
                  {errors.phone}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Gmail Field */}
          <motion.div
            variants={itemVariants}
            className={`visitor-field-group ${focusedField === 'email' ? 'focused' : ''} ${errors.email ? 'has-error' : ''}`}
          >
            <label className="visitor-label">Gmail Address</label>
            <div className="visitor-input-wrapper">
              <FiMail className="visitor-input-icon" size={18} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                placeholder="yourname@gmail.com"
                className="visitor-input"
                disabled={submitting}
              />
            </div>
            <AnimatePresence>
              {errors.email && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="visitor-error-text"
                >
                  <FiAlertCircle size={12} className="inline mr-1" />
                  {errors.email}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={submitting}
            className="visitor-submit-btn"
          >
            {submitting ? (
              <span className="flex items-center gap-2 justify-center">
                <span className="visitor-btn-spinner" />
                Authorizing identity...
              </span>
            ) : (
              <span className="flex items-center gap-2 justify-center">
                Enter Portfolio
                <FiArrowRight size={18} />
              </span>
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default VisitorForm;
