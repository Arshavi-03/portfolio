'use client';

import Navbar from '../components/Navbar';
import TourGuide from '../components/TourGuide';
import { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import AdvancedCustomCursor from '../components/ui/AdvancedCustomCursor';
// Fixed import path - adjust according to your actual file structure
import { CursorProvider } from '../hooks/useCursor';

export default function PortfolioLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // State to track whether we're on a touch device
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        // Check if it's a touch device (don't show custom cursor on touch devices)
        const checkTouchDevice = () => {
            setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
        };

        checkTouchDevice();
        window.addEventListener('touchstart', () => setIsTouchDevice(true), { once: true });

        return () => {
            window.removeEventListener('touchstart', () => setIsTouchDevice(true));
        };
    }, []);

    return (
        <CursorProvider>
            <div className="relative">
                <Navbar />
                <TourGuide />
                <Toaster position="bottom-right" />
                {!isTouchDevice && <AdvancedCustomCursor />}
                {children}
            </div>
        </CursorProvider>
    );
}