// app/components/LandingPage.tsx
'use client';

import { motion } from 'framer-motion';

interface LandingPageProps {
    onStart: () => void;
}

const LandingPage = ({ onStart }: LandingPageProps) => {
    return (
        <motion.div
            className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(63,82,252,0.15),transparent)]" />

            {/* Animated Robot and Message */}
            <div className="text-center space-y-8 relative z-10">
                {/* Animated Robot */}
                <motion.div
                    initial={{ scale: 0, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        duration: 1
                    }}
                    className="relative"
                >
                    <motion.div
                        animate={{
                            y: [-10, 10, -10],
                            rotate: [-5, 5, -5]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="w-48 h-48 mx-auto"
                    >
                        <img
                            src="/icons/cute-robot.png"
                            alt="Cute Robot"
                            className="w-full h-full object-contain"
                        />
                    </motion.div>

                    {/* Glow Effect */}
                    <motion.div
                        className="absolute inset-0 -z-10"
                        animate={{
                            opacity: [0.5, 0.8, 0.5],
                            scale: [1, 1.2, 1]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        style={{
                            background: 'radial-gradient(circle, rgba(65,105,225,0.3) 0%, transparent 70%)'
                        }}
                    />
                </motion.div>

                {/* Welcome Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-4"
                >
                    <h1 className="text-4xl md:text-5xl font-bold">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                            Welcome to Arshavi&apos;s Portfolio
                        </span>
                    </h1>
                </motion.div>

                {/* Start Button */}
                <motion.button
                    onClick={onStart}
                    className="px-8 py-3 mt-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-medium
                   hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    Let&apos;s Start
                </motion.button>
            </div>
        </motion.div>
    );
};

export default LandingPage;