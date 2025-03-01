'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Github, Linkedin, Code2 } from 'lucide-react';

interface LandingPageProps {
    onStart: () => void;
    githubUrl?: string;
    linkedinUrl?: string;
    leetcodeUrl?: string;
}

const LandingPage = ({ 
    onStart, 
    githubUrl = "https://github.com/Arshavi-03", 
    linkedinUrl = "https://www.linkedin.com/in/arshavi-roy-730406265/", 
    leetcodeUrl = "https://leetcode.com/arshaviroy/" 
}: LandingPageProps) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        // Modern cursor trail effect
        const handleMouseMove = (e: MouseEvent) => {
            const x = e.clientX;
            const y = e.clientY;

            const trail = document.createElement('div');
            trail.className = 'absolute w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-60';
            trail.style.left = `${x}px`;
            trail.style.top = `${y}px`;
            trail.style.pointerEvents = 'none';
            trail.style.zIndex = '9999';

            document.body.appendChild(trail);

            setTimeout(() => {
                trail.style.transition = 'all 0.4s ease';
                trail.style.opacity = '0';
                trail.style.transform = 'scale(0.5)';

                setTimeout(() => {
                    document.body.removeChild(trail);
                }, 400);
            }, 10);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <motion.div
            className="min-h-screen bg-gray-950 flex flex-col items-center justify-center relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* Modern gradient background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(67,56,202,0.15),transparent_70%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(126,34,206,0.1),transparent_70%)]" />

            {/* Subtle noise texture overlay */}
            <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />

            {/* Modern animated grid background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(40,40,40,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(40,40,40,0.15)_1px,transparent_1px)]" style={{ backgroundSize: '60px 60px' }}></div>
            </div>

            {/* Floating particles */}
            {mounted && Array.from({ length: 15 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm"
                    style={{
                        width: `${Math.random() * 50 + 10}px`,
                        height: `${Math.random() * 50 + 10}px`,
                    }}
                    initial={{
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                    }}
                    animate={{
                        x: [
                            Math.random() * window.innerWidth,
                            Math.random() * window.innerWidth,
                            Math.random() * window.innerWidth,
                        ],
                        y: [
                            Math.random() * window.innerHeight,
                            Math.random() * window.innerHeight,
                            Math.random() * window.innerHeight,
                        ],
                        opacity: [0.1, 0.4, 0.1],
                    }}
                    transition={{
                        duration: 15 + Math.random() * 25,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            ))}

            {/* Main content */}
            <div className="text-center space-y-8 relative z-10 max-w-4xl px-4">
                {/* Modern Robot Animation */}
                <motion.div
                    initial={{ scale: 0, rotateZ: 10 }}
                    animate={{ scale: 1, rotateZ: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        duration: 1
                    }}
                    className="relative mx-auto"
                >
                    <motion.div
                        animate={{
                            y: [-6, 6, -6],
                        }}
                        transition={{
                            duration: 3.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="w-44 h-44 mx-auto relative"
                    >
                        {/* Enhanced robot glow effect */}
                        <motion.div 
                            className="absolute inset-0 rounded-full blur-xl opacity-70 -z-10"
                            style={{
                                background: 'radial-gradient(circle, rgba(79,70,229,0.4) 0%, transparent 70%)'
                            }}
                            animate={{
                                opacity: [0.4, 0.7, 0.4],
                                scale: [0.9, 1.1, 0.9]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                        
                        <img
                            src="/icons/cute-robot.png"
                            alt="Cute Robot"
                            className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_25px_rgba(79,70,229,0.6)]"
                        />

                        {/* Animated robot accents */}
                        <motion.div
                            className="absolute -right-2 top-5 w-6 h-6 bg-indigo-500 rounded-full z-20"
                            animate={{
                                scale: [1, 1.3, 1],
                                opacity: [0.7, 1, 0.7]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />

                        <motion.div
                            className="absolute -left-2 bottom-8 w-5 h-5 bg-purple-500 rounded-full z-20"
                            animate={{
                                scale: [1, 1.4, 1],
                                opacity: [0.7, 1, 0.7]
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.5
                            }}
                        />
                    </motion.div>
                </motion.div>

                {/* Modern title with gradient text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-4"
                >
                    <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                        <motion.span
                            className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 inline-block"
                            initial={{ backgroundPosition: '0% 50%' }}
                            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        >
                            Welcome to Arshavi&apos;s Portfolio
                        </motion.span>
                    </h1>
                    <motion.p
                        className="text-gray-300 text-lg md:text-xl mt-6 max-w-xl mx-auto font-light"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        Explore my creative journey through design, code, and innovation
                    </motion.p>
                </motion.div>

                {/* Modern glassmorphic button */}
                <motion.div
                    className="mt-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <motion.button
                        onClick={onStart}
                        className="relative px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full text-white font-medium 
                        group overflow-hidden shadow-[0_0_20px_rgba(79,70,229,0.5)]"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {/* Button shine effect */}
                        <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out" />
                        
                        <span className="relative z-10 flex items-center gap-2 font-medium">
                            Let&apos;s Explore
                            <motion.svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                animate={{ x: [0, 4, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <path d="M5 12h14"></path>
                                <path d="m12 5 7 7-7 7"></path>
                            </motion.svg>
                        </span>
                    </motion.button>
                </motion.div>

                {/* Modern social links with hover effects */}
                <motion.div
                    className="flex justify-center gap-6 mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                >
                    {/* GitHub */}
                    <motion.a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-800/50 text-gray-300 hover:text-white hover:bg-indigo-600/80 transition-all duration-300 backdrop-blur-sm"
                        whileHover={{ y: -3, scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="GitHub Profile"
                    >
                        <Github size={22} />
                    </motion.a>
                    
                    {/* LinkedIn */}
                    <motion.a
                        href={linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-800/50 text-gray-300 hover:text-white hover:bg-indigo-600/80 transition-all duration-300 backdrop-blur-sm"
                        whileHover={{ y: -3, scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="LinkedIn Profile"
                    >
                        <Linkedin size={22} />
                    </motion.a>
                    
                    {/* LeetCode (replaced Twitter) */}
                    <motion.a
                        href={leetcodeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-800/50 text-gray-300 hover:text-white hover:bg-indigo-600/80 transition-all duration-300 backdrop-blur-sm"
                        whileHover={{ y: -3, scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="LeetCode Profile"
                    >
                        <Code2 size={22} />
                    </motion.a>
                </motion.div>
            </div>

            {/* Modern decorative elements */}
            <motion.div
                className="absolute bottom-12 right-12 w-32 h-32 border border-indigo-500/20 rounded-3xl z-0 backdrop-blur-sm"
                animate={{
                    rotate: 360,
                    borderColor: ['rgba(79,70,229,0.2)', 'rgba(139,92,246,0.2)', 'rgba(79,70,229,0.2)']
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />

            <motion.div
                className="absolute top-20 left-20 w-24 h-24 border border-purple-500/20 rounded-full z-0 backdrop-blur-sm"
                animate={{
                    rotate: -360,
                    borderColor: ['rgba(139,92,246,0.2)', 'rgba(79,70,229,0.2)', 'rgba(139,92,246,0.2)']
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
        </motion.div>
    );
};

export default LandingPage;