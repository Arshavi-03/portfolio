'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { BackgroundEffect } from '../3d/Background3D';
import { Instagram, Facebook, Linkedin, Mail } from 'lucide-react';
import { TextGenerateEffect } from '../ui/TextGenerateEffect';
import Spotlight from '../ui/spotlight';
import TechStackCards from '../ui/3d-card';

const HeroSection = () => {
    return (
        <section className="relative min-h-screen bg-black overflow-hidden">
            {/* Fixed background */}
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
                                        className="text-3xl sm:text-2xl"
                                    />
                                    <span className="inline-block animate-wave text-2xl">👋</span>
                                </motion.div>
                                <div>
                                    <TextGenerateEffect
                                        words="Arshavi Roy"
                                        className="text-7xl md:text-6xl sm:text-5xl font-bold text-white"
                                    />
                                </div>
                                <div>
                                    <TextGenerateEffect
                                        words="AI & Full Stack Developer"
                                        className="text-4xl md:text-3xl sm:text-2xl text-gray-300"
                                    />
                                </div>
                            </div>

                            {/* Tech Stack Section */}
                            <div className="mt-8 ml-4">
                                <motion.h2
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-2xl font-bold text-white mb-8"
                                >
                                    Tech Stack
                                </motion.h2>
                                <TechStackCards />
                            </div>
                        </motion.div>
                    </div>

                    {/* Modified profile image section with increased size and responsive design */}
                    <div className="col-span-12 md:col-span-4 relative mt-8 md:-mt-16">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="w-full h-[500px] md:h-[800px] lg:h-[1000px] relative mx-auto"
                        >
                            <div className="relative w-full h-full">
                                {/* Modern Gradient Background */}
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

                                {/* Spotlight Effect */}
                                <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[400%] h-[400%]">
                                    <Spotlight
                                        className="animate-spotlight opacity-90 !absolute scale-[3]"
                                        fill="white"
                                    />
                                </div>

                                {/* Profile Image Container - Increased size */}
                                <motion.div
                                    className="relative w-full h-full scale-175 md:scale-160 lg:scale-200 translate-y-[-15%]"
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
                                    <div className="relative w-full h-full">
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

                            {/* Buttons - Responsive positioning */}
                            <div className="absolute bottom-20 md:bottom-40 left-1/2 transform -translate-x-1/2 flex flex-row items-center justify-center whitespace-nowrap w-full max-w-md gap-4 px-4 z-50">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 }}
                                    onClick={() => {
                                        const link = document.createElement('a');
                                        link.href = '/Arshavi_Resume.pdf';
                                        link.download = 'Arshavi_Resume.pdf';
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);
                                    }}
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
                                    onClick={() => {
                                        const projectsSection = document.getElementById('projects');
                                        if (projectsSection) {
                                            projectsSection.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }}
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
                                <h3 className="text-xl font-bold text-white mb-4">About Me</h3>
                                <p className="text-gray-300 leading-relaxed text-lg mb-4">
                                    Passionate Full Stack Developer with expertise in AI and modern web technologies.
                                    Dedicated to creating innovative solutions and solving complex problems.
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
                                <div className="text-gray-400 text-sm">Problems Solved</div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Social Links - Made responsive */}
            <div className="fixed left-2 md:left-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 md:gap-6 z-50">
                {[
                    { Icon: Instagram, href: "https://www.instagram.com/avenger_ar03/", hoverColor: "hover:text-pink-500" },
                    { Icon: Facebook, href: "https://www.facebook.com/profile.php?id=61556095666923", hoverColor: "hover:text-blue-500" },
                    { Icon: Linkedin, href: "https://www.linkedin.com/in/arshavi-roy-730406265/", hoverColor: "hover:text-blue-600" },
                    { Icon: Mail, href: "mailto:arshaviroy@gmail.com", hoverColor: "hover:text-purple-500" }
                ].map(({ Icon, href, hoverColor }, index) => (
                    <motion.a
                        key={href}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/30 backdrop-blur-lg border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all group`}
                        whileHover={{ scale: 1.1 }}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Icon size={16} className={`text-gray-400 ${hoverColor} transition-colors md:text-lg`} />
                    </motion.a>
                ))}
            </div>
        </section>
    );
};

export default HeroSection;