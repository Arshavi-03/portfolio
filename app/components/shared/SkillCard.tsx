import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

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

                    {/* Dashed Line Skill Indicator */}
                    <div className="mt-2 w-full flex items-center">
                        <div className="w-full h-1.5 bg-gray-700/30 backdrop-blur-sm rounded-full relative overflow-hidden">
                            {/* Fill container with dashed segment background */}
                            <div className="absolute inset-0 flex items-center">
                                {[...Array(20)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="h-1 rounded-full bg-gray-700 mx-0.5 flex-1"
                                    />
                                ))}
                            </div>

                            {/* Animated dashed progress overlay */}
                            <motion.div
                                className="absolute left-0 top-0 h-full flex items-center overflow-hidden"
                                initial={{ width: '0%' }}
                                animate={isInView ? { width: `${skill.level}%` } : {}}
                                transition={{ duration: 1.2, ease: "easeOut", delay: index * 0.2 }}
                            >
                                {[...Array(20)].map((_, i) => (
                                    <div
                                        key={i}
                                        className={`h-1 rounded-full bg-gradient-to-r ${getGradient()} mx-0.5 flex-1`}
                                    />
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default SkillCard;