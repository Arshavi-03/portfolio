'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type SectionType = 'hero' | 'projects' | 'skills' | 'achievements' | 'contact';

interface TourMessage {
    title: string;
    message: string;
    tip: string;
}

const tourMessages: Record<SectionType, TourMessage> = {
    hero: {
        title: "Welcome! 👋",
        message: "Hi! I'm Pixel, your friendly guide! Let me show you around Arshavi's amazing portfolio!",
        tip: "Scroll down to explore more!"
    },
    projects: {
        title: "Projects Showcase 🚀",
        message: "Here you can see Arshavi's innovative projects! Each one showcases unique problem-solving skills.",
        tip: "Click on the videos to see live demos!"
    },
    skills: {
        title: "Tech Arsenal 💡",
        message: "Explore Arshavi's extensive tech stack! From AI to Full Stack Development.",
        tip: "Hover over each skill for more details!"
    },
    achievements: {
        title: "Hall of Fame 🏆",
        message: "Check out these impressive achievements and certifications!",
        tip: "Click to verify credentials!"
    },
    contact: {
        title: "Let's Connect! 🤝",
        message: "Want to collaborate? Reach out to Arshavi!",
        tip: "Don't forget to check out the social links!"
    }
};

const AnimeCharacter = () => (
    <motion.div
        className="relative w-20 h-20"
        animate={{
            y: [0, -5, 0],
        }}
        transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }}
    >
        <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
        >
            {/* Face */}
            <motion.circle
                cx="50"
                cy="50"
                r="40"
                fill="#FFE0B2"
                stroke="#FFB74D"
                strokeWidth="2"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Eyes */}
            <g>
                <motion.circle
                    cx="35"
                    cy="45"
                    r="5"
                    fill="#4A4A4A"
                    animate={{
                        scaleY: [1, 0.3, 1],
                        translateY: [0, 1, 0]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 2
                    }}
                />
                <motion.circle
                    cx="65"
                    cy="45"
                    r="5"
                    fill="#4A4A4A"
                    animate={{
                        scaleY: [1, 0.3, 1],
                        translateY: [0, 1, 0]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 2
                    }}
                />
            </g>

            {/* Mouth */}
            <motion.path
                d="M 40 60 Q 50 70 60 60"
                stroke="#4A4A4A"
                strokeWidth="3"
                fill="none"
                animate={{
                    d: ["M 40 60 Q 50 70 60 60", "M 40 65 Q 50 75 60 65", "M 40 60 Q 50 70 60 60"]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Hair */}
            <motion.path
                d="M 20 30 Q 50 10 80 30"
                stroke="#4A4A4A"
                strokeWidth="8"
                fill="none"
                animate={{
                    d: ["M 20 30 Q 50 10 80 30", "M 20 32 Q 50 12 80 32", "M 20 30 Q 50 10 80 30"]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Blush */}
            <circle cx="25" cy="55" r="5" fill="#FFB6C1" opacity="0.5" />
            <circle cx="75" cy="55" r="5" fill="#FFB6C1" opacity="0.5" />
        </svg>

        {/* Sparkles */}
        {[...Array(3)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-yellow-300"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    x: [-10 + i * 10, -5 + i * 5, -10 + i * 10],
                    y: [-20 - i * 10, -25 - i * 10, -20 - i * 10]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut"
                }}
            />
        ))}
    </motion.div>
);

const TourGuide = () => {
    const [currentSection, setCurrentSection] = useState<SectionType>('hero');
    const [isVisible, setIsVisible] = useState(true);
    const [isMinimized, setIsMinimized] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const sections: SectionType[] = ['hero', 'projects', 'skills', 'achievements', 'contact'];

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { top, bottom } = element.getBoundingClientRect();
                    if (top <= window.innerHeight / 2 && bottom >= window.innerHeight / 2) {
                        setCurrentSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!isVisible) return null;

    const currentMessage = tourMessages[currentSection];

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="fixed z-50 flex items-start gap-4"
                style={{
                    bottom: '2rem',
                    right: '2rem',
                    maxWidth: isMinimized ? '80px' : '400px'
                }}
            >
                <motion.div
                    className="relative p-6 rounded-2xl bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-md border border-blue-500/20 overflow-hidden"
                    layout
                >
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"
                        animate={{
                            backgroundPosition: ['0% 0%', '100% 100%'],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            repeatType: 'reverse',
                        }}
                    />

                    <div className="relative z-10">
                        <AnimeCharacter />
                    </div>

                    {!isMinimized && currentMessage && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mt-4 relative z-10"
                        >
                            <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                {currentMessage.title}
                            </h3>
                            <p className="text-sm text-blue-300 mt-1">
                                {currentMessage.message}
                            </p>
                            <p className="text-xs text-blue-400/80 mt-2 italic">
                                💡 {currentMessage.tip}
                            </p>
                        </motion.div>
                    )}

                    <div className="absolute top-2 right-2 flex gap-2 z-20">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            onClick={() => setIsMinimized(!isMinimized)}
                            className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 hover:text-blue-300 transition-colors"
                        >
                            {isMinimized ? '↗' : '↙'}
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            onClick={() => setIsVisible(false)}
                            className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 hover:text-blue-300 transition-colors"
                        >
                            ×
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default TourGuide;