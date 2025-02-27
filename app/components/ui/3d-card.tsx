'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    FaReact,
    FaPython,
    FaNodeJs,
    FaAws,
    FaGitAlt
} from 'react-icons/fa';
import { SiCplusplus } from 'react-icons/si';

const techStackItems = [
    {
        id: 1,
        name: 'React',
        designation: 'Frontend',
        Icon: FaReact,
        bgColor: 'bg-[#1a1a1a]',
        iconColor: 'text-[#61DAFB]',
        borderColor: 'border-[#61DAFB]'
    },
    {
        id: 2,
        name: 'Python',
        designation: 'AI & ML',
        Icon: FaPython,
        bgColor: 'bg-[#1a1a1a]',
        iconColor: 'text-[#FFD43B]',
        borderColor: 'border-[#FFD43B]'
    },
    {
        id: 3,
        name: 'Node.js',
        designation: 'Backend',
        Icon: FaNodeJs,
        bgColor: 'bg-[#1a1a1a]',
        iconColor: 'text-[#68A063]',
        borderColor: 'border-[#68A063]'
    },
    {
        id: 4,
        name: 'AWS',
        designation: 'Cloud',
        Icon: FaAws,
        bgColor: 'bg-[#1a1a1a]',
        iconColor: 'text-[#FF9900]',
        borderColor: 'border-[#FF9900]'
    },
    {
        id: 5,
        name: 'Git',
        designation: 'Version Control',
        Icon: FaGitAlt,
        bgColor: 'bg-[#1a1a1a]',
        iconColor: 'text-[#F05032]',
        borderColor: 'border-[#F05032]'
    },
    {
        id: 6,
        name: 'C++',
        designation: 'Systems',
        Icon: SiCplusplus,
        bgColor: 'bg-[#1a1a1a]',
        iconColor: 'text-[#00599C]',
        borderColor: 'border-[#00599C]'
    }
];

const TechStackCards = () => {
    const CARD_OFFSET = 10;
    const SCALE_FACTOR = 0.04;
    const [cards, setCards] = useState(techStackItems);

    useEffect(() => {
        const interval = setInterval(() => {
            setCards((prevCards) => {
                const newArray = [...prevCards];
                newArray.unshift(newArray.pop()!);
                return newArray;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative left-0">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative w-[300px] h-[300px]"
            >
                {cards.map((card, index) => (
                    <motion.div
                        key={card.id}
                        className={`absolute w-[300px] h-[300px] rounded-2xl p-6 
                                  ${card.bgColor} border ${card.borderColor}
                                  shadow-lg transition-transform duration-300`}
                        style={{
                            transformOrigin: "center center",
                        }}
                        animate={{
                            top: index * -CARD_OFFSET,
                            scale: 1 - index * SCALE_FACTOR,
                            zIndex: cards.length - index,
                        }}
                        whileHover={{
                            y: -5,
                            transition: { duration: 0.2 }
                        }}
                    >
                        <div className="flex flex-col items-center justify-center h-full gap-6">
                            {/* Icon Container */}
                            <div className={`w-32 h-32 flex items-center justify-center rounded-xl 
                                          bg-[#242424] border-2 ${card.borderColor}`}>
                                <card.Icon className={`w-20 h-20 ${card.iconColor}`} />
                            </div>

                            {/* Text Content */}
                            <div className="text-center">
                                <p className={`text-2xl font-bold ${card.iconColor} mb-2`}>
                                    {card.name}
                                </p>
                                <p className="text-gray-400 text-sm">
                                    {card.designation}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default TechStackCards;