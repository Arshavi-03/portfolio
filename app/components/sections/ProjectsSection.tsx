'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Github,  ExternalLink, ArrowRight, Code, Play, Sparkles, X, Clock } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// New Custom Components
const GlowingBadge = ({ children }: { children: React.ReactNode }) => (
    <div className="inline-flex items-center px-3 py-1.5 bg-white/5 backdrop-blur-sm rounded-full border border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
        <Sparkles size={14} className="text-blue-400 mr-2" />
        <span className="text-blue-400 text-sm font-medium">{children}</span>
    </div>
);

const GradientButton = ({
    href,
    icon: Icon,
    children,
    primary = false
}: {
    href: string;
    icon: React.ElementType; // Fixed ESLint no-explicit-any
    children: React.ReactNode;
    primary?: boolean;
}) => (
    <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg ${primary
                ? 'bg-gradient-to-r from-blue-600/80 to-purple-600/80 hover:from-blue-500/90 hover:to-purple-500/90'
                : 'bg-white/5 hover:bg-white/10'
            } transition-all duration-300 group border ${primary ? 'border-blue-500/30' : 'border-white/10 hover:border-blue-500/30'
            }`}
    >
        <Icon size={18} className={`${primary ? 'text-white' : 'text-white group-hover:text-blue-300'} transition-colors`} />
        <span className="text-white text-sm font-medium">{children}</span>
    </Link>
);

const TechTag = ({ tech }: { tech: string }) => {
    // Choose background color based on technology
    const getBgColor = () => {
        const techLower = tech.toLowerCase();
        if (techLower.includes('typescript')) return 'from-blue-700/30 to-indigo-500/30 border-indigo-500/30';
        if (techLower.includes('next.js') || techLower.includes('react')) return 'from-blue-800/30 to-blue-600/30 border-blue-500/30';
        if (techLower.includes('mongo')) return 'from-green-800/30 to-green-600/30 border-green-500/30';
        if (techLower.includes('ai/ml') || techLower.includes('ml')) return 'from-purple-800/30 to-purple-600/30 border-purple-500/30';
        if (techLower.includes('blockchain')) return 'from-orange-800/30 to-orange-600/30 border-orange-500/30';
        if (techLower.includes('three.js')) return 'from-cyan-800/30 to-cyan-600/30 border-cyan-500/30';
        if (techLower.includes('aws')) return 'from-yellow-800/30 to-yellow-600/30 border-yellow-500/30';
        return 'from-gray-800/30 to-gray-600/30 border-gray-500/30';
    };

    return (
        <span className={`px-3 py-1.5 bg-gradient-to-r ${getBgColor()} backdrop-blur-sm rounded-lg text-sm font-medium border hover:shadow-[0_0_8px_rgba(59,130,246,0.2)] transition-all duration-300`}>
            {tech}
        </span>
    );
};

// Create a separate CSS file for these styles
// styles/ProjectsSection.module.css
// and import it at the top:
// import styles from '../../styles/ProjectsSection.module.css';

interface Project {
    title: string;
    description: string;
    image: string;
    tech: string[];
    github: string;
    demo: string;
    videoId: string;
    period: string;
}

interface ProjectCardProps {
    project: Project;
    index: number;
}

const projects: Project[] = [
    {
        title: "Finergize",
        description: "Financial Inclusion Platform For Rural India. Built with cutting-edge technology to bridge the financial literacy gap in rural communities through interactive learning modules and financial guidance.",
        image: "/finergize.png",
        tech: ["Next.js", "MongoDB", "AI/ML", "Blockchain","TypeScript"],
        github: "https://github.com/arshavi-03/finergize",
        demo: "https://youtu.be/adzdU-fjeak",
        videoId: "adzdU-fjeak",
        period: "Nov 2024 - Present"
    },
    {
        title: "Virtual Herbal Garden",
        description: "Interactive 3D Garden with AI Plant Recognition. An immersive virtual experience that combines advanced 3D visualization with machine learning for accurate plant identification and educational insights.",
        image: "/garden.webp",
        tech: ["Three.js", "Next.js", "AWS", "MongoDB","AI/ML"],
        github: "https://github.com/manaswita10/virtual-herbal-garden",
        demo: "https://www.youtube.com/watch?v=zp1v3EghRg4",
        videoId: "zp1v3EghRg4",
        period: "Sept - Nov 2024"
    }
];

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
    const [showVideo, setShowVideo] = useState<boolean>(false);
    const [isHovered, setIsHovered] = useState<boolean>(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="relative bg-gradient-to-br from-white/8 to-white/5 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden hover:shadow-[0_0_25px_rgba(59,130,246,0.15)] transition-all duration-500"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Glass accent border */}
            <div className="absolute inset-0 rounded-xl border border-white/20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Top accent line with animation */}
            <motion.div
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-tr-lg rounded-tl-lg z-10"
                initial={{ width: "0%" }}
                animate={{ width: isHovered ? "100%" : "30%" }}
                transition={{ duration: 0.5 }}
            />

            {/* Project number indicator */}
            <div className="absolute top-4 left-4 z-20 flex items-center justify-center w-8 h-8 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-white font-bold">
                {index + 1}
            </div>

            {/* Project Image/Video Container */}
            <div className="relative h-[400px] overflow-hidden">
                <AnimatePresence mode="wait">
                    {showVideo ? (
                        <motion.div
                            key="video"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="w-full h-full bg-black"
                        >
                            <div className="relative w-full h-full">
                                <iframe
                                    src={`https://www.youtube.com/embed/${project.videoId}?autoplay=1&mute=0&controls=1&modestbranding=1&rel=0&showinfo=1&origin=${window.location.origin}`}
                                    title={`${project.title} demo video`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="absolute inset-0 w-full h-full"
                                // Removed loading="lazy" for compatibility
                                />
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="image"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="relative w-full h-full"
                        >
                            <Image
                                src={project.image}
                                alt={`${project.title} project preview`}
                                fill
                                className={`object-cover ${isHovered ? 'scale-105' : 'scale-100'} transition-transform duration-700 ease-out`}
                            />
                            {/* Enhanced image overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 opacity-70"></div>

                            {/* Project title overlay */}
                            <div className="absolute bottom-0 left-0 w-full p-6 z-10">
                                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 drop-shadow-md">{project.title}</h3>
                                <div className="flex items-center text-blue-300 gap-2">
                                    <Clock size={16} />
                                    <p className="text-sm font-medium">{project.period}</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Video Toggle Button */}
                <button
                    onClick={() => setShowVideo(!showVideo)}
                    className="absolute top-4 right-4 z-20 bg-black/70 backdrop-blur-md p-2.5 rounded-lg hover:bg-gradient-to-r hover:from-blue-600/70 hover:to-purple-600/70 transition-all duration-300 flex items-center gap-2 border border-white/20"
                    aria-label={showVideo ? "Show project image" : "Show project video"}
                >
                    {showVideo ? (
                        <X size={18} className="text-white" />
                    ) : (
                        <Play size={18} className="text-white" />
                    )}
                </button>
            </div>

            {/* Project Info */}
            <div className="p-6 space-y-5">
                <p className="text-gray-300 leading-relaxed">
                    {project.description}
                </p>

                {/* Tech Stack with enhanced tags */}
                <div>
                    <h4 className="text-white text-sm font-semibold mb-3 flex items-center gap-2">
                        <Code size={16} className="text-blue-400" />
                        Technology Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, techIndex) => (
                            <TechTag key={techIndex} tech={tech} />
                        ))}
                    </div>
                </div>

                {/* Links section */}
                <div className="flex gap-3 pt-2">
                    <GradientButton href={project.github} icon={Github}>
                        Code
                    </GradientButton>
                    <GradientButton href={project.demo} icon={ExternalLink} primary>
                        Live Demo
                    </GradientButton>
                </div>
            </div>
        </motion.div>
    );
};

// Section divider component
const SectionDivider = () => (
    <div className="relative flex items-center py-10">
        <div className="flex-grow h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
        <div className="absolute left-1/2 -translate-x-1/2 px-4 py-2 backdrop-blur-md rounded-full bg-black/50 border border-white/10">
            <Sparkles size={16} className="text-blue-400" />
        </div>
    </div>
);

// For background pattern - move to CSS module
const dotGridPattern = `radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)`;
const dotGridSize = "30px 30px";

const ProjectsSection: React.FC = () => {
    return (
        <section id="projects" className="relative py-28 bg-gradient-to-b from-black via-gray-900/90 to-black overflow-hidden">
            {/* Enhanced Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        opacity: [0.3, 0.5, 0.3],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-0 left-1/4 w-[30rem] h-[30rem] bg-blue-500/10 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{
                        opacity: [0.3, 0.5, 0.3],
                        scale: [1.1, 1, 1.1]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                    className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-purple-500/10 rounded-full blur-[100px]"
                />

                {/* Modern dot grid background - using className instead of inline style */}
                <div className="absolute inset-0 opacity-20 dot-grid-bg"
                    style={{
                        backgroundImage: dotGridPattern,
                        backgroundSize: dotGridSize
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Enhanced Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-20 space-y-5"
                >
                    <GlowingBadge>Portfolio Showcase</GlowingBadge>

                    <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white to-purple-300 tracking-tight">
                        Featured Projects
                    </h2>

                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Here are some of my recent projects that showcase my expertise in AI,
                        Full Stack Development, and innovative solutions.
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

                {/* Projects Grid with improved spacing */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>

                <SectionDivider />

                {/* Enhanced View All Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-center"
                >
                    <Link
                        href="https://github.com/arshavi-03"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-xl rounded-full text-white font-medium border border-white/20 hover:border-blue-500/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] group"
                    >
                        <Github size={20} className="text-blue-300 group-hover:text-white transition-colors" />
                        <span>View All Projects</span>
                        <motion.div
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <ArrowRight size={16} className="text-blue-300 group-hover:text-white transition-colors" />
                        </motion.div>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default ProjectsSection;