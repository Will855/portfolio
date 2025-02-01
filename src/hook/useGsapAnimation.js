import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const useGsapAnimation = (ref) => {
    const timelineRef = useRef(null);

    useEffect(() => {
        timelineRef.current = gsap.timeline({ repeat: -1, yoyo: true });

        timelineRef.current.to(ref.current, {
            boxShadow: '0 0 20px rgba(240, 248, 255, 0.5)',
            duration: 2,
            repeat: -1,
            yoyo: true,
        });

        return () => {
            if (timelineRef.current) {
                timelineRef.current.kill();
            }
        };
    }, [ref]);
};

export default useGsapAnimation;

// esto da bordes luminosos