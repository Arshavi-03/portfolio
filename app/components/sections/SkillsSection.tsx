'use client';

import { motion } from 'framer-motion';
import SkillCard from '../shared/SkillCard';
import { ChevronRight } from 'lucide-react';

const skillCategories = [
    {
        title: "Languages",
        icon: "💻",
        skills: [
            { name: "Python", level: 90 },
            { name: "JavaScript", level: 85 },
            { name: "C/C++", level: 85 },
            { name: "Java", level: 80 },
            { name: "HTML/CSS", level: 85 }
        ]
    },
    {
        title: "Frameworks & Libraries",
        icon: "🔧",
        skills: [
            { name: "Next.js", level: 85 },
            { name: "TensorFlow/Keras", level: 85 },
            { name: "PyTorch", level: 80 },
            { name: "Three.js", level: 75 }
        ]
    },
    {
        title: "Tools & Technologies",
        icon: "⚡",
        skills: [
            { name: "Git/GitHub", level: 90 },
            { name: "AWS", level: 80 },
            { name: "MongoDB", level: 85 },
            { name: "Machine Learning", level: 85 }
        ]
    }
];

const SkillsSection = () => {
    return (
        <section id="skills" className="relative py-20 bg-gradient-to-b from-black via-gray-900 to-black">
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
                        Skills & Expertise
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        My technical skills and proficiency in various technologies and tools.
                    </p>
                </motion.div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skillCategories.map((category, index) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ x: 10 }}
                            className="group bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-all duration-300"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{category.icon}</span>
                                <h3 className="text-xl font-bold text-white">{category.title}</h3>
                                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors ml-auto" />
                            </div>
                            <div className="space-y-8">
                                {category.skills.map((skill, skillIndex) => (
                                    <SkillCard key={skillIndex} skill={skill} />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Additional Skills */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-12 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-purple-500/30 transition-colors"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-2xl">🛠️</span>
                        <h3 className="text-xl font-bold text-white">Additional Technologies</h3>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {[
                            "Pandas", "NumPy", "Matplotlib", "XGBoost", "scikit-learn",
                            "VS Code", "Kaggle", "Jupyter Notebook", "Google Colab", "Lambda",
                            "CloudFront", "S3"
                        ].map((tech, index) => (
                            <motion.div
                                key={tech}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="flex items-center justify-center p-3 bg-white/5 rounded-xl border border-white/10 text-gray-300 hover:text-white hover:border-blue-500/50 hover:bg-white/10 transition-all cursor-pointer"
                            >
                                {tech}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default SkillsSection;