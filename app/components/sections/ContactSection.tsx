'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, Phone, MapPin, Loader2, AlertCircle, Sparkles, ArrowUpRight, CheckCircle, XCircle } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import emailjs from '@emailjs/browser';
import confetti from 'canvas-confetti';

// Custom notification component
const MessageNotification = ({
  isVisible,
  type,
  message,
  onClose
}: {
  isVisible: boolean;
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-8 right-8 z-50"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className={`relative p-6 rounded-xl backdrop-blur-xl border ${type === 'success'
            ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30'
            : 'bg-gradient-to-r from-red-500/20 to-rose-500/20 border-red-500/30'
            } shadow-lg max-w-md`}>
            {/* Top accent line */}
            <div className={`absolute top-0 left-0 w-full h-1 rounded-t-xl ${type === 'success' ? 'bg-green-500' : 'bg-red-500'
              }`}></div>

            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-full ${type === 'success' ? 'text-green-400 bg-green-500/10' : 'text-red-400 bg-red-500/10'
                }`}>
                {type === 'success' ?
                  <CheckCircle className="w-6 h-6" /> :
                  <XCircle className="w-6 h-6" />
                }
              </div>

              <div className="flex-1">
                <h4 className="text-white font-semibold text-lg mb-1">
                  {type === 'success' ? 'Message Sent!' : 'Failed to Send'}
                </h4>
                <p className="text-gray-300">{message}</p>
              </div>

              {/* Fixed accessibility issue: Added aria-label for screen readers */}
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close notification"
              >
                <XCircle size={20} />
              </button>
            </div>

            {/* Progress indicator that automatically closes notification */}
            <motion.div
              className={`absolute bottom-0 left-0 h-1 rounded-b-xl ${type === 'success' ? 'bg-green-500' : 'bg-red-500'
                }`}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 5, ease: "linear" }}
              onAnimationComplete={onClose}
            />

            {/* Decorative elements */}
            <div className="absolute -top-2 -right-2">
              <motion.div
                animate={{
                  rotate: [0, 15, 0],
                  scale: [0.9, 1.1, 0.9],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles size={14} className={type === 'success' ? 'text-green-300' : 'text-red-300'} />
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Custom Particles component that only renders on client side

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [notification, setNotification] = useState<{
    visible: boolean;
    type: 'success' | 'error';
    message: string;
  }>({
    visible: false,
    type: 'success',
    message: '',
  });
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isMounted, setIsMounted] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  // Only render client-side elements after component is mounted
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({
      visible: true,
      type,
      message
    });
  };

  const closeNotification = () => {
    setNotification(prev => ({ ...prev, visible: false }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!formRef.current) return;

      const result = await emailjs.sendForm(
        'service_h7dsinp', // Your service ID
        'template_tepdvtg', // Your template ID
        formRef.current,
        'csoCYkezROwXqdWrb' // Your public key
      );

      if (result.text === 'OK') {
        showNotification('success', 'Your message has been sent successfully! I will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });

        // Launch confetti on success
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

        function randomInRange(min: number, max: number) {
          return Math.random() * (max - min) + min;
        }

        // Fixed typescipt 'any' error by providing a proper type
        const interval: ReturnType<typeof setInterval> = setInterval(function () {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          const particleCount = 50 * (timeLeft / duration);

          // since particles fall down, start a bit higher than random
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            colors: ['#60a5fa', '#a78bfa', '#ec4899'],
          });
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            colors: ['#60a5fa', '#a78bfa', '#ec4899'],
          });
        }, 250);
      }
    } catch (error) {
      showNotification('error', 'Failed to send message. Please try again or contact me directly via email.');
      console.error('Error sending email:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFocus = (fieldName: string) => {
    setActiveField(fieldName);
  };

  const handleBlur = () => {
    setActiveField(null);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      value: "arshaviroy@gmail.com",
      link: "mailto:arshaviroy@gmail.com",
      color: "from-blue-600/20 via-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
      hoverBg: "group-hover:bg-blue-500/10",
      textColor: "group-hover:text-blue-400"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      value: "+91 8274069878",
      link: "tel:+918274069878",
      color: "from-purple-600/20 via-purple-500/20 to-fuchsia-500/20",
      borderColor: "border-purple-500/30",
      hoverBg: "group-hover:bg-purple-500/10",
      textColor: "group-hover:text-purple-400"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location",
      value: "Kolkata, India",
      link: "https://maps.google.com/?q=Kolkata,India",
      color: "from-amber-600/20 via-orange-500/20 to-rose-500/20",
      borderColor: "border-amber-500/30",
      hoverBg: "group-hover:bg-amber-500/10",
      textColor: "group-hover:text-amber-400"
    }
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Extracted inline styles into class names
  const dotGridClass = "absolute inset-0 opacity-10 bg-dot-pattern";

  // Create a simplified background for server-side rendering
  const staticBackgroundClass = "absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5 opacity-30";

  return (
    <section id="contact" className="relative py-28 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
      {/* Background elements - only render animated elements on client side */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {isMounted ? (
          <>
            <motion.div
              animate={{
                opacity: [0.2, 0.4, 0.2],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-40 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]"
            />
            <motion.div
              animate={{
                opacity: [0.2, 0.4, 0.2],
                scale: [1.1, 1, 1.1]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
              className="absolute bottom-40 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]"
            />
          </>
        ) : (
          <div className={staticBackgroundClass}></div>
        )}

        {/* Dot grid pattern - moved inline styles to a CSS class */}
        <div className={dotGridClass}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20 space-y-5"
        >
          <div className="inline-flex items-center px-4 py-2 bg-white/5 backdrop-blur-md rounded-full mb-4 border border-white/10">
            <Mail size={16} className="text-blue-400 mr-2" />
            <span className="text-blue-400 text-sm font-medium">Let&apos;s Connect</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white to-purple-300">
            Get In Touch
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Have a project in mind or want to collaborate? Feel free to reach out.
          </p>

          {isMounted && (
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mt-2"
              animate={{
                width: ["0%", "100%", "30%"]
              }}
              transition={{
                duration: 2,
                ease: "easeOut",
                times: [0, 0.7, 1]
              }}
            />
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form with enhanced animations */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-2 lg:order-1"
          >
            <motion.form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6 relative"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Form background blur effect */}
              <div className="absolute inset-0 -z-10 bg-white/3 backdrop-blur-xl rounded-2xl border border-white/10"></div>
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <motion.div variants={fadeInUp}>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                      Your Name
                    </label>
                    <div className={`relative transition-all duration-300 ${activeField === 'name' ? 'ring-2 ring-blue-500/50 scale-[1.01]' : ''}`}>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => handleFocus('name')}
                        onBlur={handleBlur}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white backdrop-blur-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                        placeholder="Your name"
                      />
                      {activeField === 'name' && isMounted && (
                        <motion.div
                          className="absolute top-0 right-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-purple-500 rounded-r-xl"
                          initial={{ height: 0 }}
                          animate={{ height: '100%' }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </div>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                      Your Email
                    </label>
                    <div className={`relative transition-all duration-300 ${activeField === 'email' ? 'ring-2 ring-blue-500/50 scale-[1.01]' : ''}`}>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => handleFocus('email')}
                        onBlur={handleBlur}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white backdrop-blur-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                        placeholder="yourname@example.com"
                      />
                      {activeField === 'email' && isMounted && (
                        <motion.div
                          className="absolute top-0 right-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-purple-500 rounded-r-xl"
                          initial={{ height: 0 }}
                          animate={{ height: '100%' }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </div>
                  </motion.div>
                </div>

                <motion.div variants={fadeInUp}>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">
                    Subject
                  </label>
                  <div className={`relative transition-all duration-300 ${activeField === 'subject' ? 'ring-2 ring-blue-500/50 scale-[1.01]' : ''}`}>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => handleFocus('subject')}
                      onBlur={handleBlur}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white backdrop-blur-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                      placeholder="Project Collaboration"
                    />
                    {activeField === 'subject' && isMounted && (
                      <motion.div
                        className="absolute top-0 right-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-purple-500 rounded-r-xl"
                        initial={{ height: 0 }}
                        animate={{ height: '100%' }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                    Message
                  </label>
                  <div className={`relative transition-all duration-300 ${activeField === 'message' ? 'ring-2 ring-blue-500/50 scale-[1.01]' : ''}`}>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => handleFocus('message')}
                      onBlur={handleBlur}
                      rows={5}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white backdrop-blur-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300 resize-none"
                      placeholder="Your message here..."
                    />
                    {activeField === 'message' && isMounted && (
                      <motion.div
                        className="absolute top-0 right-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-purple-500 rounded-r-xl"
                        initial={{ height: 0 }}
                        animate={{ height: '100%' }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeInUp}
                  className="relative"
                >
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={isMounted ? {
                      scale: 1.02,
                      boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)'
                    } : {}}
                    whileTap={isMounted ? { scale: 0.98 } : {}}
                    className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 overflow-hidden"
                  >
                    <div className="relative z-10 flex items-center gap-2">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </div>

                    {/* Button hover effect - only render on client */}
                    {isMounted && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100"
                        animate={{
                          x: ['-100%', '100%'],
                        }}
                        transition={{
                          duration: 1.5,
                          ease: "easeInOut",
                          repeat: Infinity,
                          repeatDelay: 0.5
                        }}
                        style={{ mixBlendMode: 'overlay' }}
                      />
                    )}
                  </motion.button>
                </motion.div>
              </div>
            </motion.form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8 order-1 lg:order-2"
          >
            {/* Contact Cards */}
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.title}
                href={info.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative bg-gradient-to-br ${info.color} backdrop-blur-xl rounded-2xl p-6 border ${info.borderColor} hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-500 flex items-center gap-6`}
                whileHover={isMounted ? {
                  y: -5,
                  transition: { duration: 0.2 }
                } : {}}
              >
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[30px] border-r-[30px] border-transparent border-r-white/5 rounded-tr-xl transform transition-transform duration-300 group-hover:scale-110" />

                <div className={`p-4 rounded-xl bg-white/10 text-blue-400 ${info.hoverBg} transition-all duration-300 relative overflow-hidden group-hover:scale-110`}>
                  {info.icon}

                  {/* Ripple effect on icon - only render on client */}
                  {isMounted && (
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 2, opacity: 0 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  )}
                </div>

                <div className="flex-1">
                  <h3 className={`text-lg font-semibold text-white ${info.textColor} transition-colors`}>
                    {info.title}
                  </h3>
                  <div className="text-gray-400 group-hover:text-gray-300 transition-colors flex items-center gap-2">
                    {info.value}
                    {isMounted && (
                      <motion.span
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 inline-flex"
                      >
                        <ArrowUpRight size={14} className="text-gray-500" />
                      </motion.span>
                    )}
                  </div>
                </div>

                {/* Corner sparkle effect - only render on client */}
                {isMounted && (
                  <motion.div
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{
                      rotate: [0, 15, 0],
                      scale: [0.9, 1.1, 0.9],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Sparkles size={14} className="text-gray-400" />
                  </motion.div>
                )}
              </motion.a>
            ))}

            {/* Enhanced Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative p-8 bg-gradient-to-br from-white/8 to-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden hover:border-green-500/30 hover:shadow-[0_0_25px_rgba(34,197,94,0.15)] transition-all duration-500"
              whileHover={isMounted ? { y: -5 } : {}}
            >
              {/* Accent line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500 opacity-60"></div>

              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-white/10 text-green-400">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white">Available for Opportunities</h3>
              </div>

              <p className="text-gray-400 leading-relaxed ml-14">
                Currently open to freelance projects, full-time positions, and interesting collaborations.
                I typically respond within 24 hours.
              </p>

              {/* Animated dots to indicate availability - only render on client */}
              {isMounted && (
                <div className="absolute right-6 top-6 flex items-center gap-1">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-green-500"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                  />
                  <motion.div
                    className="w-2 h-2 rounded-full bg-green-500"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                  />
                  <motion.div
                    className="w-2 h-2 rounded-full bg-green-500"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
                  />
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Custom notification component - only render on client */}
      {isMounted && (
        <MessageNotification
          isVisible={notification.visible}
          type={notification.type}
          message={notification.message}
          onClose={closeNotification}
        />
      )}
    </section>
  );
};

export default ContactSection;