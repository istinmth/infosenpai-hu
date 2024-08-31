import React from 'react';
import { motion } from 'framer-motion';

export const LoadingDots = () => (
    <div className="flex space-x-1">
        <motion.div
            className="w-2 h-2 bg-white rounded-full"
            animate={{ y: ["0%", "-50%", "0%"] }}
            transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
            className="w-2 h-2 bg-white rounded-full"
            animate={{ y: ["0%", "-50%", "0%"] }}
            transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        />
        <motion.div
            className="w-2 h-2 bg-white rounded-full"
            animate={{ y: ["0%", "-50%", "0%"] }}
            transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        />
    </div>
);