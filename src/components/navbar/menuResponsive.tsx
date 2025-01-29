import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { gsap } from 'gsap';
import IonIcon from '@reacticons/ionicons';

function ResponsiveMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef(null);
    const animationRef = useRef<gsap.core.Timeline | null>(null);
    const navItems = ['Inicio', 'Informacion', 'Proyectos', 'Contacto'];

    // Optimización para móviles
    useEffect(() => {
        gsap.set(sidebarRef.current, { x: '-100%' });
        gsap.set('.nav-item', { opacity: 0, y: 20 });

        return () => {
            animationRef.current?.kill();
        };
    }, []);

    useEffect(() => {
        animationRef.current?.kill();
        animationRef.current = gsap.timeline({
            defaults: { ease: 'power3.inOut', duration: 0.3 },
            onComplete: () => !isOpen && gsap.set(sidebarRef.current, { x: '-100%' })
        });

        if (isOpen) {
            animationRef.current
                .to(sidebarRef.current, {
                    x: '0%',
                    backdropFilter: 'blur(12px)',
                    force3D: true
                })
                .to('.nav-item', {
                    y: 0,
                    opacity: 1,
                    stagger: 0.08,
                    duration: 0.25,
                    ease: 'back.out(1.2)',
                    immediateRender: false
                }, 0.2);
        } else {
            animationRef.current
                .to('.nav-item', {
                    y: 20,
                    opacity: 0,
                    stagger: -0.05,
                    duration: 0.2
                })
                .to(sidebarRef.current, {
                    x: '-100%',
                    backdropFilter: 'blur(0px)',
                    force3D: true
                }, 0);
        }
    }, [isOpen]);

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 right-4 z-50 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg sm:hidden"
                aria-label="Toggle menu"
                style={{ willChange: 'transform' }}
            >
                <IonIcon
                    name={isOpen ? "close-outline" : "menu-outline"}
                    className="text-2xl text-gray-800 pt-1 px-1"
                />
            </button>

            <nav
                ref={sidebarRef}
                className="fixed top-0 left-0 h-full w-64 z-40 bg-white/70 backdrop-blur-lg shadow-xl"
                style={{ willChange: 'transform, backdrop-filter' }}
            >
                <ul className="flex flex-col h-full justify-center items-start p-6 space-y-4">
                    {navItems.map((item) => (
                        <li
                            key={item}
                            className="nav-item"
                            style={{ willChange: 'transform, opacity' }}
                        >
                            <NavLink
                                to={`/${item.toLowerCase()}`}
                                className={({ isActive }) => `
                                    px-4 py-3 w-full block
                                    text-lg font-medium rounded-xl
                                    transition-colors duration-200
                                    hover:bg-gray-200/50
                                    ${isActive ? 'bg-gray-200/50' : ''}
                                `}
                                onClick={() => setIsOpen(false)}
                            >
                                {item}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}

export default ResponsiveMenu;