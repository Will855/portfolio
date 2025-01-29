import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import IonIcon from '@reacticons/ionicons';

const MagneticBtn = () => {
    const magneticBtnRef = useRef(null);
    const magneticBtnTextRef = useRef(null);
    const timeoutId = useRef(null);

    const activeAnimation = (clientX, clientY) => {
        if (!magneticBtnRef.current) return;

        const boundBox = magneticBtnRef.current.getBoundingClientRect();
        const magneticBtnStrength = 40;
        const magneticBtnTextStrength = 80;

        const newX = ((clientX - boundBox.left) / magneticBtnRef.current.offsetWidth - 0.5).toFixed(2);
        const newY = ((clientY - boundBox.top) / magneticBtnRef.current.offsetHeight - 0.5).toFixed(2);

        gsap.to(magneticBtnRef.current, {
            x: Number(newX) * magneticBtnStrength,
            y: Number(newY) * magneticBtnTextStrength,
            duration: 1,
            ease: "Power4.easeOut"
        });

        if (magneticBtnTextRef.current) {
            gsap.to(magneticBtnTextRef.current, {
                x: Number(newX) * magneticBtnTextStrength,
                y: Number(newY) * magneticBtnTextStrength,
                duration: 1.8,
                ease: "Power4.easeOut"
            });
        }
    };

    // Resto del código manteniendo la lógica de eventos táctiles...

    return (
        <button
            className="text-lg sm:text-xl magnetic-btn w-40 h-40"
            ref={magneticBtnRef}
        >
            <span className="text" ref={magneticBtnTextRef}>
                <IonIcon name="logo-github" size='24' className='logo-github' />
                <br />
                Github
            </span>
        </button>
    );
};

export default MagneticBtn;