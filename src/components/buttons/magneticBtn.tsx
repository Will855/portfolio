import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import IonIcon from '@reacticons/ionicons';

// Definimos los props del componente
interface MagneticBtnProps {
    iconName: "link"; // Propiedad para el nombre del icono
    subtitle: string; // Texto complementario
}

const MagneticBtn: React.FC<MagneticBtnProps> = ({ iconName, subtitle }) => {
    const magneticBtnRef = useRef<HTMLButtonElement | null>(null);
    const magneticBtnTextRef = useRef<HTMLSpanElement | null>(null);
    const lastPosition = useRef({ x: 0, y: 0 });
    const touchStartTime = useRef(0);
    const touchStartPos = useRef({ x: 0, y: 0 });

    // 1. Definir resetPosition primero
    const resetPosition = () => {
        gsap.to([magneticBtnRef.current, magneticBtnTextRef.current], {
            x: 0,
            y: 0,
            duration: 1.4,
            ease: "elastic.out(1.2, 0.4)"
        });
    };

    const handleMove = (clientX: number, clientY: number) => {
        if (!magneticBtnRef.current) return;
        const bounds = magneticBtnRef.current.getBoundingClientRect();
        const strength = 40;
        const textStrength = 60;

        const relX = (clientX - bounds.left - bounds.width / 2) / bounds.width;
        const relY = (clientY - bounds.top - bounds.height / 2) / bounds.height;

        lastPosition.current.x = gsap.utils.interpolate(
            lastPosition.current.x,
            relX * strength,
            0.2
        );
        lastPosition.current.y = gsap.utils.interpolate(
            lastPosition.current.y,
            relY * strength,
            0.2
        );

        gsap.to(magneticBtnRef.current, {
            x: lastPosition.current.x,
            y: lastPosition.current.y,
            duration: 1.2,
            ease: "power4.out",
            overwrite: 'auto'
        });

        if (magneticBtnTextRef.current) {
            gsap.to(magneticBtnTextRef.current, {
                x: relX * textStrength,
                y: relY * textStrength,
                duration: 1.8,
                ease: "power4.out",
                overwrite: 'auto'
            });
        }
    };

    const handleRedirect = () => {
        window.open('https://github.com/Will855', '_blank');
    };

    useEffect(() => {
        const btn = magneticBtnRef.current;
        if (!btn) return;

        const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
        const handleTouchMove = (e: TouchEvent) => {
            const touch = e.touches[0];
            handleMove(touch.clientX, touch.clientY);
        };

        const handleTouchStart = (e: TouchEvent) => {
            touchStartTime.current = Date.now();
            touchStartPos.current = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY
            };
        };

        const handleTouchEnd = () => {
            const timeDiff = Date.now() - touchStartTime.current;
            const dist = Math.hypot(
                lastPosition.current.x - touchStartPos.current.x,
                lastPosition.current.y - touchStartPos.current.y
            );

            if (timeDiff < 300 && dist < 10) {
                handleRedirect();
            }
        };

        btn.addEventListener('mousemove', handleMouseMove);
        btn.addEventListener('mouseleave', resetPosition);
        btn.addEventListener('touchmove', handleTouchMove);
        btn.addEventListener('touchstart', handleTouchStart);
        btn.addEventListener('touchend', handleTouchEnd);

        return () => {
            btn.removeEventListener('mousemove', handleMouseMove);
            btn.removeEventListener('mouseleave', resetPosition);
            btn.removeEventListener('touchmove', handleTouchMove);
            btn.removeEventListener('touchstart', handleTouchStart);
            btn.removeEventListener('touchend', handleTouchEnd);
        };
    }, []);

    return (
        <button
            ref={magneticBtnRef}
            onClick={handleRedirect}
            className="group relative w-40 h-40 rounded-full bg-transparent backdrop-blur-lg border hover:bg-slate-100 transition-all duration-300 hover:scale-105 cursor-alias"
            aria-label="Visitar perfil de GitHub"
            role="link"
        >
            <span
                ref={magneticBtnTextRef}
                className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white hover:text-black group-hover:scale-110 transition-transform"
            >
                {/* Usamos el prop iconName para definir el icono */}
                <IonIcon
                    name={iconName}
                    className="text-3xl motion-safe:animate-pulse"
                    aria-hidden="true"
                />
                {/* Mostramos el subtítulo */}
                <span className="text-sm font-medium">{subtitle}</span>
            </span>
        </button>
    );
};

export default MagneticBtn;