'use client';

import { motion } from 'framer-motion';
import { Award, Code, Trophy, ExternalLink, Star, BookOpen, Cpu } from 'lucide-react';

const achievements = [
    {
        title: "LeetCode Rating",
        description: "Max rating 1666 (top 15.59%) with 180+ problems solved in LeetCode",
        icon: <Code className="w-6 h-6" />,
        link: "https://leetcode.com/u/arshaviroy",
        stats: {
            value: "180+",
            label: "Problems Solved"
        }
    },
    {
        title: "Machine Learning Specialization",
        description: "Completed comprehensive specialization by Stanford Online and DeepLearning.AI",
        icon: <Cpu className="w-6 h-6" />,
        link: "https://www.coursera.org/account/accomplishments/specialization/EHUKW5W96PU8?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=s12n",
        stats: {
            value: "100%",
            label: "Completion"
        }
    },
    {
        title: "IIT Kharagpur AI4ICPS",
        description: "Advanced certification in AI and Industrial Cyber Physical Systems",
        icon: <Trophy className="w-6 h-6" />,
        link: "https://www.tcsion.com/iDH/user/credential/view/1016-8b2bc0a4-a689-11ef-86b9-005056b47784",
        stats: {
            value: "A+",
            label: "Grade"
        }
    }
];

const certificates = [
    {
        title: "Object-Oriented Data Structures in C++",
        issuer: "Coursera",
        date: "2024",
        icon: <BookOpen className="w-5 h-5" />,
        link: "https://www.coursera.org/account/accomplishments/verify/DZPYHGDETXSL?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=pdf_header_button&utm_product=course"
    },
    {
        title: "Web Development",
        issuer: "Internshala",
        date: "2023",
        icon: <Star className="w-5 h-5" />,
        link: "https://trainings.internshala.com/certificate/view/nsdc/d5yvre5410g/2hb4a5qh952/"
    },
    {
        title: "Complete A.I. and Machine Learning Bootcamp",
        issuer: "Udemy",
        date: "2023",
        icon: <Cpu className="w-5 h-5" />,
        link: "https://www.udemy.com/certificate/UC-a97eb750-83f3-4255-b5c4-31173081cfab/"
    }
];

const AchievementsSection = () => {
    return (
        <section id="achievements" className="relative py-20 bg-gradient-to-b from-black via-gray-900 to-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16 space-y-4"
                >
                    <h2 className="text-4xl md:text-5xl font-bold">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                            Achievements & Certifications
                        </span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Recognition and professional certifications that demonstrate expertise and continuous learning.
                    </p>
                </motion.div>

                {/* Major Achievements */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {achievements.map((achievement, index) => (
                        <motion.a
                            key={achievement.title}
                            href={achievement.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.02, y: -5 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-blue-500/50 hover:bg-white/10 transition-all"
                        >
                            <div className="flex items-start gap-4 mb-4">
                                <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl text-blue-400 group-hover:scale-110 transition-transform">
                                    {achievement.icon}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors flex items-center gap-2">
                                        {achievement.title}
                                        <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </h3>
                                    <p className="text-gray-400 mt-2 text-sm">{achievement.description}</p>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                                <span className="text-2xl font-bold text-blue-400">{achievement.stats.value}</span>
                                <span className="text-sm text-gray-400">{achievement.stats.label}</span>
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* Certificates */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
                >
                    <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                        <Award className="w-6 h-6 text-blue-400" />
                        Professional Certifications
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {certificates.map((cert, index) => (
                            <motion.a
                                key={cert.title}
                                href={cert.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                whileHover={{ scale: 1.02, y: -5 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="group p-4 bg-gradient-to-br from-white/5 to-white/10 rounded-xl border border-white/10 hover:border-blue-500/50 hover:bg-white/10 transition-all"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="text-blue-400 group-hover:scale-110 transition-transform">
                                        {cert.icon}
                                    </div>
                                    <h4 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                                        {cert.title}
                                    </h4>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-400 group-hover:text-gray-300 transition-colors">{cert.issuer}</span>
                                    <span className="text-blue-400/80">{cert.date}</span>
                                </div>
                                <div className="mt-3 text-xs text-gray-500 flex items-center gap-1 group-hover:text-blue-400 transition-colors">
                                    <span>View Certificate</span>
                                    <ExternalLink className="w-3 h-3" />
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AchievementsSection;