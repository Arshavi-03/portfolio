// app/portfolio/page.tsx
'use client';

import { motion } from 'framer-motion';
import HeroSection from '../components/sections/HeroSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import SkillsSection from '../components/sections/SkillsSection';
import AchievementsSection from '../components/sections/AchievementsSection';
import ContactSection from '../components/sections/ContactSection';

export default function Portfolio() {
    return (
        <motion.div
            className="min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <HeroSection />
            <ProjectsSection />
            <SkillsSection />
            <AchievementsSection />
            <ContactSection />
        </motion.div>
    );
}