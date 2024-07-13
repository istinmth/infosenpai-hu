"use client";

import React from 'react';
import AnimatedFlightButton from '../ui/button';

interface ClientAnimatedFlightButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

const Button: React.FC<ClientAnimatedFlightButtonProps> = ({ children, className, onClick }) => {
    return (
        <AnimatedFlightButton
            className={className}
            onClick={onClick}
        >
            {children}
        </AnimatedFlightButton>
    );
};

export default Button;