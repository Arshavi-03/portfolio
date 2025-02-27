'use client';

import { motion } from 'framer-motion';

interface SkillCardProps {
    skill: {
        name: string;
        level: number;
    };
}

const SkillCard = ({ skill }: SkillCardProps) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (skill.level / 100) * circumference;

    return (
        <motion.div
            className="group relative flex items-center space-x-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-300"
            whileHover={{ scale: 1.02, x: 10 }}
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
        >
            {/* Radial Progress */}
            <div className="relative w-24 h-24 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-full h-full transform -rotate-90">
                    {/* Outer glow effect */}
                    <circle
                        cx="48"
                        cy="48"
                        r={radius + 4}
                        className="opacity-20 group-hover:opacity-40 transition-opacity"
                        stroke="url(#glowGradient)"
                        strokeWidth="2"
                        fill="none"
                    />
                    {/* Background circle */}
                    <circle
                        cx="48"
                        cy="48"
                        r={radius}
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="8"
                        fill="none"
                    />
                    {/* Animated progress circle */}
                    <motion.circle
                        cx="48"
                        cy="48"
                        r={radius}
                        stroke="url(#gradient)"
                        strokeWidth="8"
                        fill="none"
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset }}
                        strokeDasharray={circumference}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]"
                    />
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#60A5FA" />
                            <stop offset="100%" stopColor="#C084FC" />
                        </linearGradient>
                        <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#60A5FA" />
                            <stop offset="100%" stopColor="#C084FC" />
                        </linearGradient>
                    </defs>
                </svg>
                {/* Percentage text with animation */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                >
                    <span className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                        {skill.level}%
                    </span>
                </motion.div>
            </div>

            {/* Skill name with hover effect */}
            <div className="flex-1">
                <motion.span
                    className="text-lg text-gray-300 group-hover:text-white transition-colors relative inline-block"
                    whileHover={{ scale: 1.05 }}
                >
                    {skill.name}
                    <motion.span
                        className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"
                        initial={{ width: "0%" }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                    />
                </motion.span>
            </div>
        </motion.div>
    );
};

export default SkillCard;