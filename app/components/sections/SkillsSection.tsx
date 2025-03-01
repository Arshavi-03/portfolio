'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronRight, Terminal, Layers, Wrench, Code, Award,  ExternalLink } from 'lucide-react';

// Enhanced SkillCard with 3D effects and animations
interface SkillCardProps {
    skill: {
        name: string;
        level: number;
    };
    index: number;
    isActive: boolean;
}

const SkillCard = ({ skill, index, isActive }: SkillCardProps) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(elementRef, { once: true, amount: 0.5 });

    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (skill.level / 100) * circumference;

    // Custom color based on skill level
    const getGradient = () => {
        if (skill.level >= 90) return 'from-purple-500 to-pink-500';
        if (skill.level >= 80) return 'from-blue-500 to-indigo-500';
        if (skill.level >= 70) return 'from-cyan-500 to-blue-500';
        return 'from-sky-500 to-cyan-500';
    };

    return (
        <motion.div
            ref={elementRef}
            className={`group relative flex items-center space-x-4 p-5 rounded-xl backdrop-blur-sm transition-all duration-500 ${isActive ? 'bg-white/10 shadow-[0_0_15px_rgba(96,165,250,0.15)]' : 'hover:bg-white/5'}`}
            initial={{ x: -20, opacity: 0 }}
            animate={isInView ? {
                x: 0,
                opacity: 1,
                transition: {
                    duration: 0.5,
                    delay: index * 0.1
                }
            } : {}}
            whileHover={{
                x: 10,
                scale: 1.02,
                boxShadow: '0 0 20px rgba(96, 165, 250, 0.2)'
            }}
        >
            {/* Enhanced Radial Progress with animated gradient */}
            <div className="relative w-24 h-24 group-hover:scale-110 transition-transform duration-500">
                <svg className="w-full h-full transform -rotate-90">
                    {/* Outer glow with pulsing effect */}
                    <motion.circle
                        cx="48"
                        cy="48"
                        r={radius + 4}
                        className="opacity-30 group-hover:opacity-60 transition-opacity"
                        stroke={`url(#glowGradient-${skill.name.replace(/\s/g, '')})`}
                        strokeWidth="2"
                        fill="none"
                        animate={{
                            r: [radius + 4, radius + 6, radius + 4],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    {/* Background circle with slight blur */}
                    <circle
                        cx="48"
                        cy="48"
                        r={radius}
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        fill="none"
                        className="blur-[0.5px]"
                    />

                    {/* Animated progress circle with dynamic gradient */}
                    <motion.circle
                        cx="48"
                        cy="48"
                        r={radius}
                        stroke={`url(#gradient-${skill.name.replace(/\s/g, '')})`}
                        strokeWidth="8"
                        strokeLinecap="round"
                        fill="none"
                        initial={{ strokeDashoffset: circumference }}
                        animate={isInView ? { strokeDashoffset } : {}}
                        strokeDasharray={circumference}
                        transition={{ duration: 1.8, ease: "easeOut", delay: index * 0.2 }}
                        className={`drop-shadow-[0_0_15px_rgba(96,165,250,0.6)] filter blur-[0.2px]`}
                    />

                    <defs>
                        <linearGradient id={`gradient-${skill.name.replace(/\s/g, '')}`} x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor={skill.level >= 85 ? '#A855F7' : '#60A5FA'} />
                            <stop offset="100%" stopColor={skill.level >= 85 ? '#EC4899' : '#818CF8'} />
                        </linearGradient>
                        <linearGradient id={`glowGradient-${skill.name.replace(/\s/g, '')}`} x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor={skill.level >= 85 ? '#A855F7' : '#60A5FA'} stopOpacity="0.8" />
                            <stop offset="100%" stopColor={skill.level >= 85 ? '#EC4899' : '#818CF8'} stopOpacity="0.8" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Percentage text with spring animation */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                >
                    <span className={`text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r ${getGradient()} transition-all duration-300`}>
                        {skill.level}%
                    </span>
                </motion.div>
            </div>

            {/* Enhanced skill name with hover effect */}
            <div className="flex-1">
                <motion.div
                    className="text-lg text-gray-300 group-hover:text-white transition-colors relative inline-block"
                    whileHover={{ scale: 1.05 }}
                >
                    <span className="relative z-10">{skill.name}</span>
                    <motion.span
                        className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${getGradient()} group-hover:h-[3px] transition-all duration-300`}
                        initial={{ width: "0%" }}
                        animate={isInView ? { width: "100%" } : {}}
                        transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
                    />

                    
                </motion.div>
            </div>
        </motion.div>
    );
};

// Enhanced Category Card with 3D effects
interface CategoryCardProps {
    category: {
        title: string;
        icon: string;
        iconComponent?: React.ElementType;
        skills: { name: string; level: number }[];
    };
    index: number;
    isActive: boolean;
    onClick: () => void;
}

const CategoryCard = ({ category, index, isActive, onClick }: CategoryCardProps) => {
    const IconComponent = category.iconComponent || (() => <span className="text-2xl">{category.icon}</span>);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`group bg-gradient-to-br from-white/8 to-white/5 backdrop-blur-xl rounded-2xl p-6 border ${isActive ? 'border-blue-500/50 shadow-[0_0_25px_rgba(59,130,246,0.2)]' : 'border-white/10 hover:border-blue-500/30'} transition-all duration-500 cursor-pointer`}
            onClick={onClick}
            whileHover={{
                y: -5,
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.15), 0 0 15px rgba(59, 130, 246, 0.2)',
            }}
        >
            {/* Top accent line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/50 to-purple-500/50 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="flex items-center gap-3 mb-6">
                <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${isActive ? 'bg-blue-500/20' : 'bg-white/10'} group-hover:bg-blue-500/20 transition-all duration-300`}>
                    <IconComponent className={`w-5 h-5 ${isActive ? 'text-blue-400' : 'text-gray-300'} group-hover:text-blue-400 transition-colors`} />
                </div>
                <h3 className="text-xl font-bold text-white">{category.title}</h3>
                <ChevronRight className={`w-5 h-5 ${isActive ? 'text-blue-400 translate-x-1' : 'text-gray-400'} group-hover:text-blue-400 group-hover:translate-x-1 transition-all ml-auto`} />
            </div>

            <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                    <SkillCard key={skillIndex} skill={skill} index={skillIndex} isActive={isActive} />
                ))}
            </div>
        </motion.div>
    );
};
const TechTag = ({ tech, index }: { tech: string; index: number }) => {
    // Enhanced color palette with more variety and vibrant colors
    const getTagStyle = () => {
        const techLower = tech.toLowerCase();

        // Data Science & ML Libraries
        if (techLower.includes('pandas'))
            return 'from-blue-700/30 to-blue-500/30 border-blue-400/50 text-blue-300';
        if (techLower.includes('numpy'))
            return 'from-cyan-700/30 to-cyan-500/30 border-cyan-400/50 text-cyan-300';
        if (techLower.includes('matplotlib'))
            return 'from-indigo-700/30 to-indigo-500/30 border-indigo-400/50 text-indigo-300';
        if (techLower.includes('scikit'))
            return 'from-orange-700/30 to-orange-500/30 border-orange-400/50 text-orange-300';
        if (techLower.includes('xgboost'))
            return 'from-lime-700/30 to-lime-500/30 border-lime-400/50 text-lime-300';

        // Development Tools
        if (techLower.includes('jupyter'))
            return 'from-amber-700/30 to-amber-500/30 border-amber-400/50 text-amber-300';
        if (techLower.includes('colab'))
            return 'from-rose-700/30 to-rose-500/30 border-rose-400/50 text-rose-300';
        if (techLower.includes('vs code'))
            return 'from-blue-600/30 to-blue-400/30 border-blue-300/50 text-blue-200';
        if (techLower.includes('kaggle'))
            return 'from-teal-700/30 to-teal-500/30 border-teal-400/50 text-teal-300';

        // AWS Services
        if (techLower.includes('lambda'))
            return 'from-amber-600/30 to-yellow-500/30 border-yellow-400/50 text-yellow-300';
        if (techLower.includes('cloudfront'))
            return 'from-blue-800/30 to-blue-600/30 border-blue-500/50 text-blue-300';
        if (techLower.includes('s3'))
            return 'from-red-700/30 to-red-500/30 border-red-400/50 text-red-300';

        // Default for other technologies
        return 'from-violet-700/30 to-fuchsia-500/30 border-fuchsia-400/50 text-fuchsia-300';
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{
                scale: 1.05,
                y: -5,
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1), 0 0 5px rgba(59, 130, 246, 0.2)'
            }}
            className={`flex items-center justify-center p-3 bg-gradient-to-r ${getTagStyle()} rounded-xl border backdrop-blur-md hover:border-blue-500/30 transition-all duration-300`}
        >
            {tech}
        </motion.div>
    );
};

// Main Skills Section Component
const SkillsSection = () => {
    const [activeCategory, setActiveCategory] = useState<number | null>(null);

    // Enhanced skill categories with icon components
    const skillCategories = [
        {
            title: "Languages",
            icon: "💻",
            iconComponent: Code,
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
            iconComponent: Layers,
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
            iconComponent: Wrench, // Changed from Tool to Wrench
            skills: [
                { name: "Git/GitHub", level: 90 },
                { name: "AWS", level: 80 },
                { name: "MongoDB", level: 85 },
                { name: "Machine Learning", level: 85 }
            ]
        }
    ];

    // Additional technologies 
    const additionalTech = [
        "Pandas", "NumPy", "Matplotlib", "XGBoost", "scikit-learn",
        "VS Code", "Kaggle", "Jupyter Notebook", "Google Colab", "Lambda",
        "CloudFront", "S3"
    ];

    return (
        <section id="skills" className="relative py-28 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
            {/* Enhanced background effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        opacity: [0.3, 0.5, 0.3],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-10 left-1/4 w-[25rem] h-[25rem] bg-blue-500/10 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{
                        opacity: [0.3, 0.5, 0.3],
                        scale: [1.1, 1, 1.1]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                    className="absolute bottom-10 right-1/4 w-[25rem] h-[25rem] bg-purple-500/10 rounded-full blur-[100px]"
                />

                {/* Modern dot grid background */}
                <div className="absolute inset-0 opacity-20"
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
                        <Award size={16} className="text-blue-400 mr-2" />
                        <span className="text-blue-400 text-sm font-medium">Professional Expertise</span>
                    </div>

                    <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white to-purple-300">
                        Skills & Expertise
                    </h2>

                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        My technical proficiency and experience across various programming languages,
                        frameworks, and development tools.
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

                {/* Interactive Skills Grid with active state */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                    {skillCategories.map((category, index) => (
                        <CategoryCard
                            key={category.title}
                            category={category}
                            index={index}
                            isActive={activeCategory === index}
                            onClick={() => setActiveCategory(activeCategory === index ? null : index)}
                        />
                    ))}
                </div>

                {/* Enhanced Additional Skills */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-16 bg-gradient-to-br from-white/8 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-purple-500/30 hover:shadow-[0_0_25px_rgba(147,51,234,0.15)] transition-all duration-500"
                >
                    <div className="flex items-center gap-3 mb-8">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 text-purple-400">
                            <Terminal size={20} />
                        </div>
                        <h3 className="text-xl font-bold text-white">Additional Technologies</h3>
                        <div className="h-px flex-grow bg-gradient-to-r from-purple-500/30 to-transparent ml-4"></div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {additionalTech.map((tech, index) => (
                            <TechTag key={tech} tech={tech} index={index} />
                        ))}
                    </div>

                    {/* Added call-to-action button */}
                    <motion.div
                        className="mt-10 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <a
                            href="#projects"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-xl rounded-full text-white font-medium border border-white/20 hover:border-purple-500/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(147,51,234,0.2)] group"
                        >
                            <span>Explore Projects</span>
                            <motion.div
                                animate={{ x: [0, 4, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <ExternalLink size={16} className="text-purple-300 group-hover:text-white transition-colors" />
                            </motion.div>
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default SkillsSection;