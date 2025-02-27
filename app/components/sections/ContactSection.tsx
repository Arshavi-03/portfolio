'use client';

import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin, Loader2, AlertCircle } from 'lucide-react';
import { useState, useRef } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!formRef.current) return;

      const result = await emailjs.sendForm(
        'service_h7dsinp', // Replace with your service ID
        'template_tepdvtg', // Replace with your template ID
        formRef.current,
        'csoCYkezROwXqdWrb' // Replace with your public key
      );

      if (result.text === 'OK') {
        toast.success('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
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

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      value: "arshaviroy@gmail.com",
      link: "mailto:arshaviroy@gmail.com"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      value: "+91 8274069878",
      link: "tel:+918274069878"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location",
      value: "Kolkata, India",
      link: "https://maps.google.com/?q=Kolkata,India"
    }
  ];

  return (
    <section id="contact" className="relative py-20 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Get In Touch
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-2 lg:order-1"
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white backdrop-blur-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white backdrop-blur-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white backdrop-blur-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="Project Collaboration"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white backdrop-blur-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                  placeholder="Your message here..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
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
                className="group flex items-center gap-6 p-6 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:bg-white/10"
              >
                <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl text-blue-400 group-hover:scale-110 transition-all duration-300">
                  {info.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {info.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                    {info.value}
                  </p>
                </div>
              </motion.a>
            ))}

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-6 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-blue-400" />
                Available for Opportunities
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Currently open to freelance projects, full-time positions, and interesting collaborations.
                I typically respond within 24 hours.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;