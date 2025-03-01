'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavItem {
    name: string;
    href: string;
}

const navItems: NavItem[] = [
    { name: 'Home', href: '#hero' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
];

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [scrolled, setScrolled] = useState<boolean>(false);

    // Handle scroll event to change navbar appearance
    useEffect(() => {
        const handleScroll = (): void => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Improved function to handle CV download
    const handleDownloadCV = (): void => {
        // Create and click a temporary download link
        const link = document.createElement('a');
        link.href = '/Arshavi_Resume.pdf';
        link.download = 'Arshavi_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setIsOpen(false);
    };

    const handleNavItemClick = (): void => {
        setIsOpen(false);
    };

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-50 ${scrolled
                ? 'bg-black/50 backdrop-blur-lg border-b border-white/10'
                : 'bg-transparent border-b border-transparent'
                } transition-all duration-300`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo with animation */}
                    <Link href="/" className="flex items-center space-x-2">
                        <motion.span
                            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
                            whileHover={{
                                scale: 1.05,
                                backgroundImage: 'linear-gradient(to right, #60a5fa, #a78bfa, #60a5fa)',
                                transition: { duration: 0.3 }
                            }}
                        >
                            AR
                        </motion.span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-gray-300 hover:text-white transition-colors relative group py-1"
                                onClick={handleNavItemClick}
                            >
                                {item.name}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}
                        <motion.button
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 0 15px rgba(59, 130, 246, 0.3)"
                            }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleDownloadCV}
                            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-colors duration-300 backdrop-blur-sm"
                        >
                            Resume
                        </motion.button>
                    </div>

                    {/* Mobile menu button with animation */}
                    <div className="md:hidden">
                        <motion.button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-300 hover:text-white p-2 rounded-lg bg-black/30 backdrop-blur-sm hover:bg-white/10 transition-all"
                            whileTap={{ scale: 0.9 }}
                        >
                            {isOpen ? <X size={20} /> : <Menu size={20} />}
                        </motion.button>
                    </div>
                </div>

                {/* Mobile Navigation with improved animation */}
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden py-4 bg-black/50 backdrop-blur-md rounded-lg mt-2 border border-white/10"
                    >
                        <div className="flex flex-col space-y-4 p-4">
                            {navItems.map((item, index) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Link
                                        href={item.href}
                                        className="text-gray-300 hover:text-white transition-colors block py-2 px-3 rounded-lg hover:bg-white/5"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: navItems.length * 0.05 }}
                            >
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleDownloadCV}
                                    className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-colors duration-300"
                                >
                                    Resume
                                </motion.button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.nav>
    );
};

export default Navbar;