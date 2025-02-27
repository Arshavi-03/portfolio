// components/shared/ProjectCard.tsx
'use client';

import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface ProjectCardProps {
    project: {
        title: string;
        description: string;
        image: string;
        tech: string[];
        github: string;
        demo: string;
        period: string;
    };
    index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10"
        >
            {/* Project Image */}
            <div className="relative h-48 md:h-64 overflow-hidden">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>

            {/* Project Info */}
            <div className="p-6 space-y-4">
                {/* Title and Period */}
                <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {project.title}
                    </h3>
                    <span className="text-sm text-gray-400">{project.period}</span>
                </div>

                {/* Description */}
                <p className="text-gray-400">
                    {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                        <span
                            key={i}
                            className="px-3 py-1 text-sm bg-white/5 rounded-full text-gray-300 border border-white/10"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 pt-4">
                    <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        className="p-2 bg-white/5 rounded-lg text-gray-300 hover:text-white transition-colors"
                    >
                        <Github size={20} />
                    </motion.a>
                    <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        className="p-2 bg-white/5 rounded-lg text-gray-300 hover:text-white transition-colors"
                    >
                        <ExternalLink size={20} />
                    </motion.a>
                </div>
            </div>

            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        </motion.div>
    );
};

export default ProjectCard;