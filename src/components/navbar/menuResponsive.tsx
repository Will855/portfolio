import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { gsap } from 'gsap';
import IonIcon from '@reacticons/ionicons';

function ResponsiveMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef(null);

    const navItems = ['Inicio', 'Informacion', 'Proyectos', 'Contacto'];

    useEffect(() => {
    if (isOpen) {
    gsap.to(sidebarRef.current, {
        x: '0%',
        duration: 0.1,
        ease: 'power2.out'
    });
    gsap.fromTo(
        '.nav-item',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
    );
    } else {
        gsap.to(sidebarRef.current, {
            x: '-100%',
            duration: 0.2,
            ease: 'power2.in'
        });
    }
    }, [isOpen]);

    return (
    <>
        <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 p-4 bg-white rounded-full shadow-md sm:hidden pb-2"
        aria-label="Toggle menu"
        >
        {isOpen ? (
            <IonIcon name="grid-outline" className="text-xl text-gray-800"></IonIcon>
        ) : (
            <IonIcon name="grid-outline" className="text-xl text-gray-800"></IonIcon>
        )}
        </button>
        <nav
            ref={sidebarRef}
            className={`
            fixed top-0 left-0 h-full w-64 z-40
            bg-white/30 backdrop-blur-md
            transform -translate-x-full transition-transform duration-500
            md:relative md:translate-x-0 md:bg-transparent md:backdrop-blur-none sm:hidden
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}
        >
            <ul className="flex flex-col h-full justify-center items-start p-8 md:flex-row md:items-center md:p-0">
                {navItems.map((item) => (
                    <li key={item} className="nav-item mb-6 md:mb-0 md:mr-6">
                    <NavLink
                        to={`/${item.toLowerCase()}`}
                        className={({ isActive }) => `
                            px-4 py-2 rounded-full
                            text-lg font-medium
                            transition-colors duration-200
                            hover:bg-gray-300/50
                            ${isActive ? 'bg-gray-300/50' : ''}
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
