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

// Fixed particle positions with predetermined values
const particleConfigs = [
    { opacity: [0.2, 0.4, 0.2], scale: [0.3, 0.5, 0.3], x: [10, 20, 10], y: [10, 20, 10] },
    { opacity: [0.3, 0.5, 0.3], scale: [0.4, 0.6, 0.4], x: [20, 30, 20], y: [15, 25, 15] },
    { opacity: [0.25, 0.45, 0.25], scale: [0.35, 0.55, 0.35], x: [30, 40, 30], y: [20, 30, 20] },
    { opacity: [0.3, 0.5, 0.3], scale: [0.5, 0.7, 0.5], x: [40, 50, 40], y: [25, 35, 25] },
    { opacity: [0.2, 0.4, 0.2], scale: [0.3, 0.5, 0.3], x: [50, 60, 50], y: [30, 40, 30] },
    { opacity: [0.25, 0.45, 0.25], scale: [0.4, 0.6, 0.4], x: [60, 70, 60], y: [35, 45, 35] },
    { opacity: [0.3, 0.5, 0.3], scale: [0.5, 0.7, 0.5], x: [70, 80, 70], y: [40, 50, 40] },
    { opacity: [0.2, 0.4, 0.2], scale: [0.3, 0.5, 0.3], x: [15, 25, 15], y: [45, 55, 45] },
    { opacity: [0.25, 0.45, 0.25], scale: [0.4, 0.6, 0.4], x: [25, 35, 25], y: [50, 60, 50] },
    { opacity: [0.3, 0.5, 0.3], scale: [0.5, 0.7, 0.5], x: [35, 45, 35], y: [55, 65, 55] },
    { opacity: [0.2, 0.4, 0.2], scale: [0.3, 0.5, 0.3], x: [45, 55, 45], y: [60, 70, 60] },
    { opacity: [0.25, 0.45, 0.25], scale: [0.4, 0.6, 0.4], x: [55, 65, 55], y: [65, 75, 65] },
];

// Enhanced particle effect with consistent values
const Particles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particleConfigs.map((config, i) => (
            <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-blue-400"
                initial={{
                    opacity: config.opacity[0],
                    scale: config.scale[0],
                    x: config.x[0],
                    y: config.y[0]
                }}
                animate={{
                    opacity: config.opacity,
                    scale: config.scale,
                    x: config.x,
                    y: config.y
                }}
                transition={{
                    duration: 4 + (i % 5), // Add variety but in a deterministic way
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        ))}
    </div>
);

// Enhanced anime character
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
            {/* Glow effect */}
            <defs>
                <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                </radialGradient>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>

            {/* Glow background */}
            <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="url(#glowGradient)"
                animate={{
                    r: [45, 48, 45],
                    opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Face */}
            <motion.circle
                cx="50"
                cy="50"
                r="40"
                fill="url(#linear-gradient)"
                stroke="#8B5CF6"
                strokeWidth="1.5"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            <defs>
                <linearGradient id="linear-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFE0B2" />
                    <stop offset="100%" stopColor="#FFCC80" />
                </linearGradient>
            </defs>

            {/* Eyes */}
            <g>
                <motion.circle
                    cx="35"
                    cy="42"
                    r="5"
                    fill="#4A4A4A"
                    animate={{
                        scaleY: [1, 0.2, 1],
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
                    cy="42"
                    r="5"
                    fill="#4A4A4A"
                    animate={{
                        scaleY: [1, 0.2, 1],
                        translateY: [0, 1, 0]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 2
                    }}
                />

                {/* Eye gleam */}
                <motion.circle
                    cx="33"
                    cy="40"
                    r="1.5"
                    fill="white"
                    animate={{
                        opacity: [1, 0.8, 1]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity
                    }}
                />
                <motion.circle
                    cx="63"
                    cy="40"
                    r="1.5"
                    fill="white"
                    animate={{
                        opacity: [1, 0.8, 1]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity
                    }}
                />
            </g>

            {/* Mouth */}
            <motion.path
                d="M 40 60 Q 50 70 60 60"
                stroke="#4A4A4A"
                strokeWidth="2.5"
                strokeLinecap="round"
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

            {/* Modern Hair */}
            <motion.path
                d="M 18 30 Q 50 5 82 30"
                stroke="#4A4A4A"
                strokeWidth="8"
                strokeLinecap="round"
                fill="none"
                animate={{
                    d: ["M 18 30 Q 50 5 82 30", "M 18 32 Q 50 7 82 32", "M 18 30 Q 50 5 82 30"]
                }}
                transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Hair details */}
            <motion.path
                d="M 30 25 Q 40 15 50 20"
                stroke="#4A4A4A"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                animate={{
                    d: ["M 30 25 Q 40 15 50 20", "M 30 27 Q 40 17 50 22", "M 30 25 Q 40 15 50 20"]
                }}
                transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.path
                d="M 70 25 Q 60 15 50 20"
                stroke="#4A4A4A"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                animate={{
                    d: ["M 70 25 Q 60 15 50 20", "M 70 27 Q 60 17 50 22", "M 70 25 Q 60 15 50 20"]
                }}
                transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Blush with gradient */}
            <circle cx="28" cy="55" r="6" fill="url(#blushGradient)" opacity="0.6" />
            <circle cx="72" cy="55" r="6" fill="url(#blushGradient)" opacity="0.6" />
            <defs>
                <radialGradient id="blushGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" stopColor="#FF758F" />
                    <stop offset="100%" stopColor="#FF758F" stopOpacity="0" />
                </radialGradient>
            </defs>
        </svg>

        {/* Fixed Sparkles with deterministic positions */}
        {[...Array(5)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-400"
                style={{
                    filter: "blur(0.5px) drop-shadow(0 0 2px rgba(250, 204, 21, 0.5))"
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    x: [-15 + i * 10, -10 + i * 8, -15 + i * 10],
                    y: [-25 - i * 10, -30 - i * 10, -25 - i * 10]
                }}
                transition={{
                    duration: 1.5 + i * 0.2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut"
                }}
            />
        ))}
    </motion.div>
);

// Client-side only TourGuide component
const TourGuide = () => {
    const [currentSection, setCurrentSection] = useState<SectionType>('hero');
    const [isVisible, setIsVisible] = useState(true);
    const [isMinimized, setIsMinimized] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // Set mounted state to true on client
        setIsMounted(true);

        // Animation delay for initial entrance
        const timer = setTimeout(() => {
            setInitialLoad(false);
        }, 500);

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
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timer);
        };
    }, []);

    // Don't render anything during SSR
    if (!isMounted) return null;

    // Don't render if user closed the tour
    if (!isVisible) return null;

    const currentMessage = tourMessages[currentSection];

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.9 }}
                transition={{
                    duration: 0.5,
                    ease: [0.19, 1, 0.22, 1] // Cubic bezier for modern easing
                }}
                className="fixed z-50 flex items-start gap-4"
                style={{
                    bottom: '2rem',
                    right: '2rem',
                    maxWidth: isMinimized ? '80px' : '400px'
                }}
            >
                <motion.div
                    className="relative p-6 rounded-2xl overflow-hidden shadow-xl"
                    style={{
                        background: 'rgba(15, 23, 42, 0.65)',
                        backdropFilter: 'blur(16px)',
                        border: '1px solid rgba(80, 114, 238, 0.16)'
                    }}
                    layout
                    transition={{
                        layout: { duration: 0.5, ease: [0.19, 1, 0.22, 1] }
                    }}
                >
                    <motion.div
                        className="absolute inset-0"
                        style={{
                            background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.06) 0%, rgba(139, 92, 246, 0.06) 100%)'
                        }}
                        animate={{
                            backgroundPosition: ['0% 0%', '100% 100%'],
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            repeatType: 'reverse',
                        }}
                    />

                    {/* Glass highlight effect */}
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0) 100%)'
                        }}
                    />

                    <Particles />

                    <div className="relative z-10">
                        <AnimeCharacter />
                    </div>

                    {!isMinimized && currentMessage && (
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 10 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            transition={{
                                duration: 0.4,
                                ease: [0.19, 1, 0.22, 1],
                                delay: initialLoad ? 0.6 : 0
                            }}
                            className="mt-4 relative z-10"
                        >
                            <h3 className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
                                {currentMessage.title}
                            </h3>

                            <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: initialLoad ? 0.8 : 0.1, duration: 0.4 }}
                            >
                                <p className="text-sm text-blue-200 mt-2 leading-relaxed">
                                    {currentMessage.message}
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: initialLoad ? 1 : 0.2, duration: 0.4 }}
                                className="mt-3 py-2 px-3 rounded-lg bg-blue-500/10 border border-blue-500/20"
                            >
                                <p className="text-xs text-blue-300 italic flex items-center">
                                    <span className="mr-1.5">💡</span>
                                    {currentMessage.tip}
                                </p>
                            </motion.div>
                        </motion.div>
                    )}

                    <div className="absolute top-3 right-3 flex gap-2 z-20">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsMinimized(!isMinimized)}
                            className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 hover:text-blue-200 transition-colors"
                            style={{
                                backdropFilter: 'blur(4px)',
                                boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                            }}
                        >
                            {isMinimized ? '↗' : '↙'}
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsVisible(false)}
                            className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 hover:text-blue-200 transition-colors"
                            style={{
                                backdropFilter: 'blur(4px)',
                                boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                            }}
                        >
                            ×
                        </motion.button>
                    </div>

                    {/* Subtle indicator for current section */}
                    {!isMinimized && (
                        <motion.div
                            className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-400 to-violet-500"
                            layoutId="indicator"
                        />
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default TourGuide;