"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
    const [activeLink, setActiveLink] = useState('');
    const [highlightPosition, setHighlightPosition] = useState({ left: 0, width: 0 });
    const linkRefs = useRef<(HTMLButtonElement | null)[]>([]);

    const handleLinkClick = (link: string) => {
        setActiveLink(link);
        const element = document.getElementById(link);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const sections = document.querySelectorAll('section');
            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollPosition >= sectionTop - 50 && scrollPosition < sectionTop + sectionHeight - 50) {
                    setActiveLink(section.id);
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const activeIndex = linkRefs.current.findIndex((ref) => ref?.textContent?.toLowerCase() === activeLink);
        if (activeIndex !== -1) {
            const activeLink = linkRefs.current[activeIndex];
            if (activeLink) {
                const { left, width } = activeLink.getBoundingClientRect();
                const navbarLeft = activeLink.parentElement?.getBoundingClientRect().left || 0;
                setHighlightPosition({ left: left - navbarLeft, width });
            }
        }
    }, [activeLink]);

    return (
        <div className="flex justify-center w-full mt-10">
            <nav className="flex flex-row items-center justify-start relative overflow-auto sm:overflow-visible no-visible-scrollbar">
                <AnimatePresence>
                    {activeLink && (
                        <motion.div
                            layoutId="clickedbutton"
                            transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                            className="absolute bg-gray-200 rounded-full"
                            style={{
                                height: '100%',
                                left: highlightPosition.left,
                                width: highlightPosition.width,
                            }}
                        />
                    )}
                </AnimatePresence>
                {['product', 'services', 'playground', 'content', 'random'].map((link, index) => (
                    <button
                        key={link}
                        ref={(el) => {
                            linkRefs.current[index] = el;
                        }}
                        className={`relative px-4 py-2 rounded-full ${
                            activeLink === link ? 'font-semibold text-black' : 'text-gray-500'
                        }`}
                        onClick={() => handleLinkClick(link)}
                        style={{
                            transformStyle: 'preserve-3d',
                        }}
                    >
                        <span className="relative block">
                            {link.charAt(0).toUpperCase() + link.slice(1)}
                        </span>
                    </button>
                ))}
            </nav>
        </div>
    );
};