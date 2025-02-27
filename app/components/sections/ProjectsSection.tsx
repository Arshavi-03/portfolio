'use client';

import { motion } from 'framer-motion';
import { Github, Youtube, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
        image: "/finergize.webp",
        tech: ["Next.js", "MongoDB", "AI/ML", "Blockchain"],
        github: "https://github.com/arshavi-03/finergize",
        demo: "https://youtu.be/adzdU-fjeak",
        videoId: "adzdU-fjeak",
        period: "Nov 2024 - Present"
    },
    {
        title: "Virtual Herbal Garden",
        description: "Interactive 3D Garden with AI Plant Recognition. An immersive virtual experience that combines advanced 3D visualization with machine learning for accurate plant identification and educational insights.",
        image: "/garden.webp",
        tech: ["Three.js", "Next.js", "AWS", "MongoDB"],
        github: "https://github.com/manaswita10/virtual-herbal-garden",
        demo: "https://www.youtube.com/watch?v=zp1v3EghRg4",
        videoId: "zp1v3EghRg4",
        period: "Sept - Nov 2024"
    }
];

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
    const [showVideo, setShowVideo] = useState<boolean>(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="group relative bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
        >
            {/* Project Image/Video Container */}
            <div className="relative h-[400px] overflow-hidden">
                {showVideo ? (
                    <div className="w-full h-full bg-black">
                        <div className="relative w-full h-full">
                            <iframe
                                src={`https://www.youtube.com/embed/${project.videoId}?autoplay=1&mute=0&controls=1&modestbranding=1&rel=0&showinfo=1&origin=${window.location.origin}`}
                                title={`${project.title} demo video`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute inset-0 w-full h-full"
                                loading="lazy"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="relative w-full h-full">
                        <Image
                            src={project.image}
                            alt={`${project.title} project preview`}
                            fill
                            className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                )}

                {/* Video Toggle Button */}
                <button
                    onClick={() => setShowVideo(!showVideo)}
                    className="absolute bottom-4 right-4 z-10 bg-black/50 backdrop-blur-sm p-3 rounded-full hover:bg-black/70 transition-colors flex items-center gap-2"
                    aria-label={showVideo ? "Show project image" : "Show project video"}
                >
                    <Youtube size={20} className="text-white" />
                    <span className="text-white text-sm">
                        {showVideo ? 'Show Image' : 'Watch Demo'}
                    </span>
                </button>
            </div>

            {/* Project Info */}
            <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                        <p className="text-gray-400 text-sm">{project.period}</p>
                    </div>
                    <div className="flex gap-3 z-10">
                        <Link
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors flex items-center gap-2"
                        >
                            <Github size={20} className="text-white" />
                            <span className="text-white text-sm">Code</span>
                        </Link>
                        <Link
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors flex items-center gap-2"
                        >
                            <ExternalLink size={20} className="text-white" />
                            <span className="text-white text-sm">Demo</span>
                        </Link>
                    </div>
                </div>

                <p className="text-gray-300 line-clamp-3">
                    {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                        <span
                            key={techIndex}
                            className="px-3 py-1 bg-white/5 rounded-full text-sm text-gray-300 border border-white/10"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
    );
};

const ProjectsSection: React.FC = () => {
    return (
        <section id="projects" className="relative py-20 bg-gradient-to-b from-black via-gray-900 to-black">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16 space-y-4"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                        Featured Projects
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Here are some of my recent projects that showcase my expertise in AI,
                        Full Stack Development, and innovative solutions.
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-center mt-12"
                >
                    <Link
                        href="https://github.com/arshavi-03"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 backdrop-blur-xl rounded-xl text-white font-medium border border-white/10 hover:bg-white/10 transition-all shadow-lg hover:shadow-xl"
                    >
                        <Github size={20} />
                        View All Projects
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default ProjectsSection;