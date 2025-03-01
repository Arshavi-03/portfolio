'use client';

import { motion } from 'framer-motion';
import { Award, Code, Trophy, ExternalLink, Star, BookOpen, Cpu, Sparkles, ArrowRight } from 'lucide-react';

const achievements = [
    {
        title: "LeetCode Rating",
        description: "Max rating 1666 (top 15.59%) with 180+ problems solved in LeetCode",
        icon: <Code className="w-6 h-6" />,
        link: "https://leetcode.com/u/arshaviroy",
        stats: {
            value: "180+",
            label: "Problems Solved"
        },
        color: "from-blue-600/20 via-blue-500/20 to-sky-500/20",
        borderColor: "border-blue-500/30",
        textColor: "text-blue-400",
        iconBg: "bg-blue-500/10"
    },
    {
        title: "Machine Learning Specialization",
        description: "Completed comprehensive specialization by Stanford Online and DeepLearning.AI",
        icon: <Cpu className="w-6 h-6" />,
        link: "https://www.coursera.org/account/accomplishments/specialization/EHUKW5W96PU8?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=s12n",
        stats: {
            value: "100%",
            label: "Completion"
        },
        color: "from-purple-600/20 via-fuchsia-500/20 to-pink-500/20",
        borderColor: "border-purple-500/30",
        textColor: "text-purple-400",
        iconBg: "bg-purple-500/10"
    },
    {
        title: "IIT Kharagpur AI4ICPS",
        description: "Advanced certification in AI and Industrial Cyber Physical Systems",
        icon: <Trophy className="w-6 h-6" />,
        link: "https://www.tcsion.com/iDH/user/credential/view/1016-8b2bc0a4-a689-11ef-86b9-005056b47784",
        stats: {
            value: "A+",
            label: "Grade"
        },
        color: "from-amber-600/20 via-orange-500/20 to-red-500/20",
        borderColor: "border-amber-500/30",
        textColor: "text-amber-400",
        iconBg: "bg-amber-500/10"
    }
];

const certificates = [
    {
        title: "Object-Oriented Data Structures in C++",
        issuer: "Coursera",
        date: "2024",
        icon: <BookOpen className="w-5 h-5" />,
        link: "https://www.coursera.org/account/accomplishments/verify/DZPYHGDETXSL?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=pdf_header_button&utm_product=course",
        color: "from-cyan-600/20 to-blue-500/20",
        textColor: "text-cyan-400"
    },
    {
        title: "Web Development",
        issuer: "Internshala",
        date: "2023",
        icon: <Star className="w-5 h-5" />,
        link: "https://trainings.internshala.com/certificate/view/nsdc/d5yvre5410g/2hb4a5qh952/",
        color: "from-green-600/20 to-emerald-500/20",
        textColor: "text-emerald-400"
    },
    {
        title: "Complete A.I. and Machine Learning Bootcamp",
        issuer: "Udemy",
        date: "2023",
        icon: <Cpu className="w-5 h-5" />,
        link: "https://www.udemy.com/certificate/UC-a97eb750-83f3-4255-b5c4-31173081cfab/",
        color: "from-violet-600/20 to-purple-500/20",
        textColor: "text-violet-400"
    }
];

const AchievementsSection = () => {
    return (
        <section id="achievements" className="relative py-28 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        opacity: [0.2, 0.4, 0.2],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-40 left-1/4 w-[25rem] h-[25rem] bg-blue-500/10 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{
                        opacity: [0.2, 0.4, 0.2],
                        scale: [1.1, 1, 1.1]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                    className="absolute bottom-40 right-1/4 w-[25rem] h-[25rem] bg-purple-500/10 rounded-full blur-[100px]"
                />

                {/* Subtle grid pattern */}
                <div className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)",
                        backgroundSize: "30px 30px"
                    }}>
                </div>
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
                        <Trophy size={16} className="text-blue-400 mr-2" />
                        <span className="text-blue-400 text-sm font-medium">Honors & Recognition</span>
                    </div>

                    <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white to-purple-300">
                        Achievements & Certifications
                    </h2>

                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Recognition and professional certifications that demonstrate expertise and continuous learning.
                    </p>

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
                </motion.div>

                {/* Major Achievements with enhanced card design */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {achievements.map((achievement, index) => (
                        <motion.a
                            key={achievement.title}
                            href={achievement.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`group relative bg-gradient-to-br ${achievement.color} backdrop-blur-xl rounded-2xl p-7 border ${achievement.borderColor} hover:shadow-[0_0_25px_rgba(59,130,246,0.2)] transition-all duration-500`}
                            whileHover={{
                                y: -8,
                                transition: { duration: 0.2 }
                            }}
                        >
                            {/* Glow effect on hover */}
                            <div className={`absolute -inset-[1px] bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-500`}></div>

                            {/* Top accent line */}
                            <div className="absolute top-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-xl group-hover:w-full transition-all duration-500 ease-out" />

                            <div className="flex items-start gap-4 mb-4 relative z-10">
                                <div className={`p-3 rounded-xl ${achievement.textColor} ${achievement.iconBg} group-hover:scale-110 transition-all duration-500 ease-out`}>
                                    {achievement.icon}
                                </div>
                                <div className="flex-1">
                                    <h3 className={`text-xl font-bold text-white group-hover:${achievement.textColor} transition-colors flex items-center gap-2`}>
                                        {achievement.title}
                                        <motion.div
                                            initial={{ x: -5, opacity: 0 }}
                                            whileHover={{ x: 0, opacity: 1 }}
                                            className="inline-flex"
                                        >
                                            <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                        </motion.div>
                                    </h3>
                                    <p className="text-gray-400 mt-2 text-sm group-hover:text-gray-300 transition-colors">{achievement.description}</p>
                                </div>
                            </div>

                            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 relative z-10">
                                <div className="flex flex-col">
                                    <motion.span
                                        className={`text-2xl font-bold ${achievement.textColor}`}
                                        animate={{ scale: [1, 1.02, 1] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        {achievement.stats.value}
                                    </motion.span>
                                    <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{achievement.stats.label}</span>
                                </div>

                                <motion.div
                                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                                    className="rounded-full p-2 bg-white/5 group-hover:bg-white/10 transition-colors"
                                >
                                    <ArrowRight size={16} className="text-gray-400 group-hover:text-white transition-colors" />
                                </motion.div>
                            </div>

                            {/* Shimmering effect */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"
                                animate={{
                                    x: ['100%', '-100%'],
                                }}
                                transition={{
                                    duration: 1.5,
                                    ease: "easeInOut",
                                    repeat: Infinity,
                                    repeatDelay: 0.5
                                }}
                                style={{ mixBlendMode: 'overlay' }}
                            />
                        </motion.a>
                    ))}
                </div>

                {/* Enhanced Certificates Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="bg-gradient-to-br from-white/8 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-purple-500/30 hover:shadow-[0_0_25px_rgba(147,51,234,0.15)] transition-all duration-500"
                >
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 bg-white/10 rounded-xl text-blue-400">
                            <Award className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">Professional Certifications</h3>
                        <div className="h-px flex-grow bg-gradient-to-r from-purple-500/30 to-transparent ml-4"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {certificates.map((cert, index) => (
                            <motion.a
                                key={cert.title}
                                href={cert.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className={`group relative p-5 bg-gradient-to-br ${cert.color} rounded-xl border border-white/10 hover:border-white/20 transition-all duration-500`}
                                whileHover={{
                                    y: -5,
                                    transition: { duration: 0.2 }
                                }}
                            >
                                {/* Card accent */}
                                <div className="absolute top-0 right-0 w-1 h-0 group-hover:h-full bg-gradient-to-b from-blue-400 to-purple-500 rounded-tr-xl rounded-br-xl transition-all duration-500 ease-out" />

                                <div className="flex items-center gap-3 mb-3">
                                    <div className={`p-2 rounded-lg bg-white/10 ${cert.textColor} group-hover:scale-110 transition-transform duration-300`}>
                                        {cert.icon}
                                    </div>
                                    <h4 className="text-lg font-semibold text-white group-hover:text-gray-100 transition-colors line-clamp-1">
                                        {cert.title}
                                    </h4>
                                </div>

                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-400 group-hover:text-gray-300 transition-colors">{cert.issuer}</span>
                                    <span className={`${cert.textColor}`}>{cert.date}</span>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="mt-3 text-xs flex items-center gap-1 text-gray-500 group-hover:text-blue-400 transition-colors"
                                >
                                    <motion.span
                                        animate={{ x: [0, 2, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
                                    >
                                        View Certificate
                                    </motion.span>
                                    <motion.div
                                        animate={{ x: [0, 3, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
                                    >
                                        <ExternalLink className="w-3 h-3" />
                                    </motion.div>
                                </motion.div>

                                {/* Sparkle effect on hover */}
                                <motion.div
                                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    animate={{
                                        rotate: [0, 15, 0],
                                        scale: [0.9, 1.1, 0.9],
                                    }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <Sparkles size={16} className={cert.textColor} />
                                </motion.div>
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AchievementsSection;