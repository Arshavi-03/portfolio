// app/portfolio/layout.tsx
'use client';

import Navbar from '../components/Navbar';
import TourGuide from '../components/TourGuide';
import { Toaster } from 'react-hot-toast';

export default function PortfolioLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative">
            <Navbar />
            <TourGuide />
            <Toaster position="bottom-right" />
            {children}
        </div>
    );
}