'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { BackgroundEffect } from '../3d/Background3D';
import { Instagram, Facebook, Linkedin, Mail } from 'lucide-react';
import { TextGenerateEffect } from '../ui/TextGenerateEffect';
import TechStackCards from '../ui/3d-card';


const HeroSection: React.FC = () => {
    // Function to handle CV download directly
    const handleDownloadCV = () => {
        const link = document.createElement('a');
        link.href = '/Arshavi_Resume.pdf';
        link.download = 'Arshavi_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Function to scroll to projects section
    const scrollToProjects = () => {
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="hero" className="relative min-h-screen bg-black overflow-hidden">
            {/* Fixed background - keeping original */}
            <div className="absolute inset-0 z-0 top-0">
                <BackgroundEffect />
            </div>

            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                <div className="grid grid-cols-12 gap-8 md:gap-4 sm:gap-2">
                    {/* Left Column - Name and Tech Stack */}
                    <div className="col-span-12 md:col-span-5 pt-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            className="space-y-8"
                        >
                            <div className="space-y-4">
                                <motion.div
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-center gap-2 mb-4"
                                >
                                    <TextGenerateEffect
                                        words="Hello, I am"
                                        className="text-3xl sm:text-2xl text-gray-300 font-light tracking-wide"
                                    />
                                    <span className="inline-block animate-wave text-2xl">👋</span>
                                </motion.div>
                                <div>
                                    <TextGenerateEffect
                                        words="Arshavi Roy"
                                        className="text-7xl md:text-6xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-white tracking-tight"
                                    />
                                </div>
                                <div className="relative">
                                    <TextGenerateEffect
                                        words="AI & Full Stack Developer"
                                        className="text-4xl md:text-3xl sm:text-2xl text-gray-300 font-semibold"
                                    />
                                    <div className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                                </div>
                            </div>

                            {/* Tech Stack Section */}
                            <div className="mt-8 ml-4">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="flex items-center gap-3 mb-8"
                                >
                                    <h2 className="text-2xl font-bold text-white">Tech Stack</h2>
                                    <div className="h-px flex-grow bg-gradient-to-r from-blue-500/50 to-transparent"></div>
                                </motion.div>
                                <TechStackCards />
                            </div>
                        </motion.div>
                    </div>

                    {/* Modified profile image section with INCREASED SIZE ONLY */}
                    <div className="col-span-12 md:col-span-4 relative mt-8 md:-mt-16">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="w-full h-[600px] md:h-[900px] lg:h-[800px] relative mx-auto"
                        >
                            <div className="relative w-full h-full">
                                {/* Modern Gradient Background - keeping original */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%]">
                                    <motion.div
                                        animate={{
                                            opacity: [0.6, 0.8, 0.6],
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                        className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-purple-500/10 to-indigo-400/10 blur-3xl"
                                    />
                                </div>

                                {/* Profile Image Container - ONLY INCREASING SIZE HERE */}
                                <motion.div
                                    className="relative w-full h-full scale-[3] md:scale-[2.8] lg:scale-[3.2] translate-y-[-15%]"
                                    animate={{
                                        y: [-2, 2, -2],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    {/* Profile Image */}
                                    <div className="relative w-full h-full scale-[0.9] md:scale-[0.35] lg:scale-[1.5] translate-y-[-15%]">
                                        <Image
                                            src="/profile-no-bg.png"
                                            alt="Arshavi Roy"
                                            fill
                                            className="object-contain relative z-10"
                                            priority
                                            sizes="(max-width: 640px) 500vw, (max-width: 968px) 80vw, 33vw"
                                        />
                                    </div>
                                </motion.div>
                            </div>

                            {/* Buttons - keeping original positioning but modifying click handlers */}
                            <div className="absolute bottom-20 md:bottom-40 left-1/2 transform -translate-x-1/2 flex flex-row items-center justify-center whitespace-nowrap w-full max-w-md gap-4 px-4 z-50">
                                <motion.button
                                    id="download-cv-button"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 }}
                                    onClick={handleDownloadCV}
                                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-blue-500/25 text-sm md:text-base"
                                >
                                    Download CV
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 }}
                                    onClick={scrollToProjects}
                                    className="px-6 py-3 bg-black/50 backdrop-blur-sm rounded-full text-white font-medium border border-white/10 hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300 text-sm md:text-base"
                                >
                                    View Projects
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Section - About Me */}
                    <div className="col-span-12 md:col-span-3 pt-12">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-6"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-black/30 backdrop-blur-lg p-8 rounded-2xl border border-white/10 relative overflow-hidden group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                                    About Me
                                    <div className="ml-2 w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                                </h3>
                                <p className="text-gray-300 leading-relaxed text-lg mb-4">
                                    Passionate Full Stack Developer with expertise in <span className="text-blue-400 font-medium">AI</span> and modern web technologies.
                                    Dedicated to creating <span className="text-purple-400 font-medium">innovative solutions</span> and solving complex problems.
                                </p>
                                <div className="flex items-center gap-2 text-gray-400">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    <p>Full Stack Dev</p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="bg-black/30 backdrop-blur-lg p-6 rounded-2xl border border-white/10 relative overflow-hidden group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                    180+
                                </div>
                                <div className="text-gray-400 text-sm font-medium tracking-wide">Problems Solved</div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Social Links - Updated for better mobile visibility while maintaining desktop layout */}
            <div className="fixed left-0 sm:left-4 bottom-0 sm:top-1/2 sm:-translate-y-1/2 z-50">
                <div className="flex flex-col items-center">
                    

                    {/* Social Icons Container - Updated for mobile visibility */}
                    <div className="p-2 rounded-2xl backdrop-blur-xl bg-black/20 border border-white/10 shadow-xl shadow-blue-900/10">
                        {/* Desktop Vertical Layout */}
                        <div className="hidden sm:block">
                            {[
                                { Icon: Instagram, href: "https://www.instagram.com/avenger_ar03/", hoverColor: "group-hover:text-pink-500", bgGradient: "group-hover:bg-gradient-to-br group-hover:from-amber-500 group-hover:via-pink-500 group-hover:to-purple-500" },
                                { Icon: Facebook, href: "https://www.facebook.com/profile.php?id=61556095666923", hoverColor: "group-hover:text-blue-500", bgGradient: "group-hover:bg-gradient-to-br group-hover:from-blue-400 group-hover:to-blue-600" },
                                { Icon: Linkedin, href: "https://www.linkedin.com/in/arshavi-roy-730406265/", hoverColor: "group-hover:text-blue-600", bgGradient: "group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-sky-400" },
                                { Icon: Mail, href: "mailto:arshaviroy@gmail.com", hoverColor: "group-hover:text-purple-500", bgGradient: "group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-indigo-500" }
                            ].map(({ Icon, href, hoverColor, bgGradient }, index) => (
                                <motion.a
                                    key={href}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative block my-4"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        delay: index * 0.1 + 0.5,
                                        y: { type: "spring", stiffness: 400 }
                                    }}
                                >
                                    {/* Outer glow effect */}
                                    <div className={`absolute -inset-0.5 rounded-full opacity-0 ${bgGradient} blur-md transition-all duration-300 group-hover:opacity-70`}></div>

                                    {/* Icon container */}
                                    <div className="relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 transition-all duration-300 group-hover:border-white/30 overflow-hidden">
                                        {/* Animated background on hover */}
                                        <div className={`absolute inset-0 ${bgGradient} opacity-0 transition-opacity duration-300 group-hover:opacity-20`}></div>

                                        {/* Icon */}
                                        <Icon
                                            size={20}
                                            className={`text-gray-400 ${hoverColor} transition-all duration-300`}
                                        />
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                        {/* Mobile Horizontal Layout - Repositioned for better visibility */}
                        <div className="flex sm:hidden">
                            {[
                                { Icon: Instagram, href: "https://www.instagram.com/avenger_ar03/", hoverColor: "group-hover:text-pink-500", bgGradient: "group-hover:bg-gradient-to-br group-hover:from-amber-500 group-hover:via-pink-500 group-hover:to-purple-500" },
                                { Icon: Facebook, href: "https://www.facebook.com/profile.php?id=61556095666923", hoverColor: "group-hover:text-blue-500", bgGradient: "group-hover:bg-gradient-to-br group-hover:from-blue-400 group-hover:to-blue-600" },
                                { Icon: Linkedin, href: "https://www.linkedin.com/in/arshavi-roy-730406265/", hoverColor: "group-hover:text-blue-600", bgGradient: "group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-sky-400" },
                                { Icon: Mail, href: "mailto:arshaviroy@gmail.com", hoverColor: "group-hover:text-purple-500", bgGradient: "group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-indigo-500" }
                            ].map(({ Icon, href, hoverColor, bgGradient }, index) => (
                                <motion.a
                                    key={href}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative block mx-2"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        delay: index * 0.1,
                                        y: { type: "spring", stiffness: 400 }
                                    }}
                                >
                                    {/* Outer glow effect */}
                                    <div className={`absolute -inset-0.5 rounded-full opacity-0 ${bgGradient} blur-md transition-all duration-300 group-hover:opacity-70 active:opacity-70`}></div>

                                    {/* Icon container - good size for mobile */}
                                    <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 transition-all duration-300 group-hover:border-white/30 active:border-white/30 overflow-hidden">
                                        {/* Animated background on hover/touch */}
                                        <div className={`absolute inset-0 ${bgGradient} opacity-0 transition-opacity duration-300 group-hover:opacity-20 active:opacity-20`}></div>

                                        {/* Icon */}
                                        <Icon
                                            size={18}
                                            className={`text-gray-400 ${hoverColor} transition-all duration-300`}
                                        />
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    
                </div>
            </div>
        </section>
    );
};

export default HeroSection;