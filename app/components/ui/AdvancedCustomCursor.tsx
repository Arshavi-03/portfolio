'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCursor } from '../../hooks/useCursor';

const AdvancedCustomCursor: React.FC = () => {
    const { cursorType, cursorText } = useCursor();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [mouseSpeed, setMouseSpeed] = useState(0);
    const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
    const [lastMoveTime, setLastMoveTime] = useState(Date.now());

    useEffect(() => {
        // Hide the default cursor
        document.body.style.cursor = 'none';

        // Event handlers
        const handleMouseMove = (e: MouseEvent) => {
            const now = Date.now();
            const dt = now - lastMoveTime;

            if (dt > 0) { // Prevent division by zero
                // Calculate speed based on distance moved and time elapsed
                const dx = e.clientX - lastPosition.x;
                const dy = e.clientY - lastPosition.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const speed = Math.min(distance / dt * 15, 1); // Scale and cap the speed

                setMouseSpeed(speed);
                setLastPosition({ x: e.clientX, y: e.clientY });
                setLastMoveTime(now);
            }

            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseDown = () => setIsMouseDown(true);
        const handleMouseUp = () => setIsMouseDown(false);

        const handleElementHover = () => {
            // Set custom cursor states based on element types
            const element = document.elementFromPoint(mousePosition.x, mousePosition.y);

            if (!element) return;

            // This is handled by the useCursor hook in your app
        };

        // Add listeners
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mousemove', handleElementHover);

        // Handle cursor when leaving/entering the window
        window.addEventListener('mouseout', () => { });
        window.addEventListener('mouseover', () => { });

        return () => {
            // Clean up listeners and restore default cursor
            document.body.style.cursor = 'auto';
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mousemove', handleElementHover);
            window.removeEventListener('mouseout', () => { });
            window.removeEventListener('mouseover', () => { });
        };
    }, [mousePosition.x, mousePosition.y, lastMoveTime, lastPosition.x, lastPosition.y]);

    // Cursor variants for different states
    const variants = {
        default: {
            x: mousePosition.x - 8,
            y: mousePosition.y - 8,
            scale: 1,
            opacity: 1,
        },
        button: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            scale: 1.8,
            opacity: 0.8,
        },
        view: {
            x: mousePosition.x - 24,
            y: mousePosition.y - 24,
            scale: 1.5,
            opacity: 0.6,
        },
        hidden: {
            opacity: 0,
        },
    };

    const ringVariants = {
        default: {
            x: mousePosition.x - 24,
            y: mousePosition.y - 24,
            scale: 1 + mouseSpeed * 0.5,
            opacity: 0.5 - mouseSpeed * 0.3,
        },
        button: {
            x: mousePosition.x - 32,
            y: mousePosition.y - 32,
            scale: 1.5,
            opacity: 0.7,
        },
        view: {
            x: mousePosition.x - 48,
            y: mousePosition.y - 48,
            scale: 2,
            opacity: 0.4,
        },
        hidden: {
            opacity: 0,
        },
    };

    return (
        <>
            {/* Dot cursor */}
            <motion.div
                className="fixed top-0 left-0 w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 z-[9999] pointer-events-none"
                variants={variants}
                animate={cursorType}
                transition={{
                    type: "spring",
                    stiffness: 1000,
                    damping: 28,
                    mass: 0.3,
                }}
                style={{
                    filter: isMouseDown ? 'brightness(1.5)' : 'none',
                }}
            />

            {/* Ring cursor */}
            <motion.div
                className="fixed top-0 left-0 w-12 h-12 rounded-full border-2 border-white/40 z-[9999] pointer-events-none mix-blend-difference"
                variants={ringVariants}
                animate={cursorType}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    mass: 0.8,
                }}
            />

            {/* Glow effect that expands with mouse speed */}
            <motion.div
                className="fixed top-0 left-0 w-24 h-24 rounded-full bg-blue-400/10 blur-xl z-[9998] pointer-events-none"
                animate={{
                    x: mousePosition.x - 48,
                    y: mousePosition.y - 48,
                    scale: 0.8 + mouseSpeed * 2,
                    opacity: 0.3 + mouseSpeed * 0.4,
                }}
                transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 15,
                    mass: 1,
                }}
            />

            {/* Cursor text (appears when hovering elements with data-cursor-text) */}
            <AnimatePresence>
                {cursorText && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="fixed text-white text-sm font-medium bg-black/80 px-3 py-1 rounded-full pointer-events-none z-[10000] whitespace-nowrap"
                        style={{
                            left: mousePosition.x,
                            top: mousePosition.y + 28,
                            transform: 'translateX(-50%)',
                        }}
                    >
                        {cursorText}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Trail effect when moving quickly */}
            {mouseSpeed > 0.2 && (
                <motion.div
                    className="fixed top-0 left-0 w-3 h-3 rounded-full bg-purple-400/30 z-[9997] pointer-events-none"
                    initial={{ opacity: 0.7, scale: 1 }}
                    animate={{
                        x: lastPosition.x - 6,
                        y: lastPosition.y - 6,
                        opacity: 0,
                        scale: 0.5,
                    }}
                    transition={{ duration: 0.5 }}
                />
            )}
        </>
    );
};

export default AdvancedCustomCursor;