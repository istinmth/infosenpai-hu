"use client"

import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedFlightButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

const AnimatedFlightButton: React.FC<AnimatedFlightButtonProps> = ({ children, className, onClick }) => {
    return (
        <motion.button
            className={`bg-black dark:bg-black dark:text-white text-white flex justify-center group/modal-btn relative overflow-hidden ${className}`}
            onClick={onClick}
            whileHover="hover"
        >
            <motion.span
                className="group-hover/modal-btn:translate-x-40 text-center transition duration-500"
            >
                {children}
            </motion.span>
            <motion.div
                className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20"
            >
                ↓
            </motion.div>
        </motion.button>
    );
};

export default AnimatedFlightButton;