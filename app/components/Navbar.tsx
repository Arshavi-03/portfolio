'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
    { name: 'Home', href: '#hero' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const scrollToDownloadCV = () => {
        const downloadButton = document.getElementById('download-cv-button');
        if (downloadButton) {
            const yOffset = -100; // Adjust this value to fine-tune the scroll position
            const y = downloadButton.getBoundingClientRect().top + window.pageYOffset + yOffset;

            window.scrollTo({
                top: y,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            setIsOpen(false);
        }
    };

    const handleNavItemClick = () => {
        setIsOpen(false);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-lg border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                            AR
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-gray-300 hover:text-white transition-colors"
                                onClick={handleNavItemClick}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={scrollToDownloadCV}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Resume
                        </motion.button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-300 hover:text-white"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden py-4"
                    >
                        <div className="flex flex-col space-y-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-gray-300 hover:text-white transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={scrollToDownloadCV}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                Resume
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;