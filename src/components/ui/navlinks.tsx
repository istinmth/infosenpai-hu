"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
    const [activeLink, setActiveLink] = useState('product');
    const [highlightPosition, setHighlightPosition] = useState({ left: 0, width: 0 });
    const [isVisible, setIsVisible] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);
    const linkRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const navRef = useRef<HTMLDivElement>(null);
    const lastScrollY = useRef(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const isScrollingDown = useRef(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const showNavbar = (duration: number, forceHide: boolean = false) => {
        setIsVisible(true);
        if (timerRef.current) clearTimeout(timerRef.current);
        if (!isHovered || forceHide) {
            timerRef.current = setTimeout(() => {
                if (window.scrollY > 100 || forceHide) {
                    setIsVisible(false);
                }
            }, forceHide ? 0 : duration);
        }
    };

    const handleLinkClick = (link: string) => {
        setActiveLink(link);
        showNavbar(1000); // Show for 1 second after click
        const element = document.getElementById(link);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        // Set initial highlight position after component mounts
        const activeIndex = linkRefs.current.findIndex((ref) => ref?.textContent?.toLowerCase() === activeLink);
        if (activeIndex !== -1) {
            const activeLink = linkRefs.current[activeIndex];
            if (activeLink) {
                const { left, width } = activeLink.getBoundingClientRect();
                const navbarLeft = navRef.current?.getBoundingClientRect().left || 0;
                setHighlightPosition({ left: left - navbarLeft, width });
                setIsLoaded(true);
            }
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const scrollThreshold = 100;

            if (currentScrollY <= scrollThreshold) {
                setIsVisible(true);
                if (timerRef.current) clearTimeout(timerRef.current);
            } else if (!isHovered) {
                const isNowScrollingDown = currentScrollY > lastScrollY.current;

                if (isNowScrollingDown !== isScrollingDown.current) {
                    // Direction changed
                    isScrollingDown.current = isNowScrollingDown;
                    if (isNowScrollingDown) {
                        showNavbar(1000); // Show for 1 second when starting to scroll down
                    } else {
                        showNavbar(2000); // Show for 2 seconds when starting to scroll up
                    }
                } else if (!isNowScrollingDown) {
                    // Continuing to scroll up
                    showNavbar(2000);
                } else {
                    // Continuing to scroll down
                    setIsVisible(false);
                }
            }

            lastScrollY.current = currentScrollY;

            // Update active link based on scroll position
            const windowHeight = window.innerHeight;
            const scrollThresholdPercentage = 0.3;
            const sections = ['product', 'services', 'playground', 'content', 'random'];

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = document.getElementById(sections[i]);
                if (section) {
                    const rect = section.getBoundingClientRect();
                    if (rect.top <= windowHeight * scrollThresholdPercentage) {
                        setActiveLink(sections[i]);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [isHovered]);

    useEffect(() => {
        const activeIndex = linkRefs.current.findIndex((ref) => ref?.textContent?.toLowerCase() === activeLink);
        if (activeIndex !== -1) {
            const activeLink = linkRefs.current[activeIndex];
            if (activeLink) {
                const { left, width } = activeLink.getBoundingClientRect();
                const navbarLeft = navRef.current?.getBoundingClientRect().left || 0;
                setHighlightPosition({ left: left - navbarLeft, width });
            }
        }
    }, [activeLink]);

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 flex justify-center w-full mt-4 z-50"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -100 }}
            transition={{ duration: 0.3 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                if (window.scrollY > 100) {
                    showNavbar(0, true); // Immediately hide if scrolled down
                }
            }}
        >
            <nav
                ref={navRef}
                className="flex items-center relative overflow-x-auto sm:overflow-visible no-visible-scrollbar bg-white bg-opacity-70 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg max-w-[95%] sm:max-w-none"
            >
                <AnimatePresence>
                    {isLoaded && (activeLink || hoveredLink) && (
                        <motion.div
                            layoutId="highlight"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            className="absolute bg-gray-200 rounded-full"
                            style={{
                                height: '70%',
                                top: '15%',
                                left: highlightPosition.left,
                                width: highlightPosition.width,
                            }}
                        />
                    )}
                </AnimatePresence>
                {['product', 'services', 'playground', 'content', 'random'].map((link, index) => (
                    <motion.button
                        key={link}
                        ref={(el) => {
                            linkRefs.current[index] = el;
                        }}
                        className={`relative flex-shrink-0 px-4 py-2 rounded-full text-sm sm:text-base ${
                            activeLink === link ? 'font-semibold text-black' : 'text-gray-500'
                        }`}
                        onClick={() => handleLinkClick(link)}
                        onHoverStart={() => {
                            setHoveredLink(link);
                            const linkElement = linkRefs.current[index];
                            if (linkElement) {
                                const { left, width } = linkElement.getBoundingClientRect();
                                const navbarLeft = navRef.current?.getBoundingClientRect().left || 0;
                                setHighlightPosition({ left: left - navbarLeft, width });
                            }
                        }}
                        onHoverEnd={() => {
                            setHoveredLink(null);
                            const activeIndex = linkRefs.current.findIndex((ref) => ref?.textContent?.toLowerCase() === activeLink);
                            if (activeIndex !== -1) {
                                const activeLink = linkRefs.current[activeIndex];
                                if (activeLink) {
                                    const { left, width } = activeLink.getBoundingClientRect();
                                    const navbarLeft = navRef.current?.getBoundingClientRect().left || 0;
                                    setHighlightPosition({ left: left - navbarLeft, width });
                                }
                            }
                        }}
                        style={{
                            transformStyle: 'preserve-3d',
                        }}
                    >
                        <span className="relative block whitespace-nowrap">
                            {link.charAt(0).toUpperCase() + link.slice(1)}
                        </span>
                    </motion.button>
                ))}
            </nav>
        </motion.div>
    );
};