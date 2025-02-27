"use client";

import { useMotionValue, useMotionTemplate, motion, MotionValue } from "framer-motion";
import React, { useState, useEffect, ReactNode } from "react";
import { cn } from "../../lib/utils";

interface EvervaultCardProps {
    className?: string;
    children?: ReactNode;
}

interface CardPatternProps {
    mouseX: MotionValue<number>;
    mouseY: MotionValue<number>;
    randomString: string;
}

interface MouseEvent {
    currentTarget: HTMLDivElement;
    clientX: number;
    clientY: number;
}

export const EvervaultCard: React.FC<EvervaultCardProps> = ({ className, children }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [randomString, setRandomString] = useState("");

    useEffect(() => {
        const str = generateRandomString(1500);
        setRandomString(str);
    }, []);

    function onMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className={cn(
                "p-0.5 bg-transparent aspect-square flex items-center justify-center w-full h-full relative",
                className
            )}
        >
            <div
                onMouseMove={onMouseMove}
                className="group/card rounded-3xl w-full relative overflow-hidden bg-transparent flex items-center justify-center h-full"
            >
                {/* Pattern overlay - reduced opacity */}
                <CardPattern
                    mouseX={mouseX}
                    mouseY={mouseY}
                    randomString={randomString}
                />

                {/* Content container with increased z-index */}
                <div className="relative z-20 w-full h-full flex items-center justify-center">
                    {children}
                </div>
            </div>
        </div>
    );
};

const CardPattern: React.FC<CardPatternProps> = ({ mouseX, mouseY, randomString }) => {
    const maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`;
    const style = { maskImage, WebkitMaskImage: maskImage };

    return (
        <div className="pointer-events-none absolute inset-0">
            {/* Reduced base overlay opacity */}
            <div className="absolute inset-0 rounded-2xl [mask-image:linear-gradient(white,transparent)] opacity-30 group-hover/card:opacity-40"></div>

            {/* Adjusted gradient overlay */}
            <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/30 to-blue-700/30 opacity-0 group-hover/card:opacity-70 backdrop-blur-sm transition duration-500"
                style={style}
            />

            {/* Text overlay with reduced opacity */}
            <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay group-hover/card:opacity-60"
                style={style}
            >
                <p className="absolute inset-x-0 text-xs h-full break-words whitespace-pre-wrap text-white/70 font-mono font-bold transition duration-500">
                    {randomString}
                </p>
            </motion.div>
        </div>
    );
};

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const generateRandomString = (length: number): string => {
    let result = "";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

export default EvervaultCard;