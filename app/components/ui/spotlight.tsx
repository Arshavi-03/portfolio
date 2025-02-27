// spotlight.tsx
"use client";

import React from "react";

interface SpotlightProps {
    className?: string;
    fill?: string;
}

const Spotlight: React.FC<SpotlightProps> = ({ className = "", fill = "white" }) => {
    return (
        <svg
            className={`pointer-events-none ${className}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 3787 2842"
            fill="none"
            style={{ transform: 'translateZ(0)' }}  // Force GPU acceleration
        >
            <defs>
                <filter
                    id="spotlight-blur"
                    x="0.860352"
                    y="0.838989"
                    width="3785.16"
                    height="2790.26"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur" />
                </filter>
            </defs>
            <g filter="url(#spotlight-blur)">
                <ellipse
                    cx="1924.71"
                    cy="490.501"
                    rx="1924.71"
                    ry="273.501"
                    transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
                    fill={fill}
                    fillOpacity="0.4"
                />
            </g>
        </svg>
    );
};

export default Spotlight;