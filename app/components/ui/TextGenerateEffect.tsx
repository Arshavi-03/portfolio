'use client';

import React, { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";

interface TextGenerateEffectProps {
    words: string;
    className?: string;
}

export const TextGenerateEffect: React.FC<TextGenerateEffectProps> = ({
    words,
    className = "",
}) => {
    const [scope, animate] = useAnimate();
    const wordsArray = words.split(" ");

    useEffect(() => {
        animate(
            "span",
            {
                opacity: 1,
            },
            {
                duration: 0.5,
                delay: stagger(0.2),
            }
        );
    }, [scope.current, animate]);

    const renderWords = () => {
        return (
            <motion.div ref={scope} className="relative group">
                {wordsArray.map((word, idx) => {
                    return (
                        <motion.span
                            key={word + idx}
                            className={`opacity-0 inline-block transition-all duration-300
                text-transparent bg-clip-text 
                bg-gradient-to-r from-blue-400 to-purple-400
                group-hover:from-pink-500 group-hover:via-purple-500 group-hover:to-indigo-500
                ${idx !== wordsArray.length - 1 ? 'mr-2' : ''}`}
                            style={{
                                backgroundSize: '200% 100%',
                                backgroundPosition: 'left',
                                transition: 'background-position 0.5s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundPosition = 'right';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundPosition = 'left';
                            }}
                        >
                            {word}
                        </motion.span>
                    );
                })}
            </motion.div>
        );
    };

    return (
        <div className={className}>
            {renderWords()}
            <style jsx global>{`
        .group:hover span {
          animation: gradient 3s linear infinite;
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
        </div>
    );
};

export default TextGenerateEffect;