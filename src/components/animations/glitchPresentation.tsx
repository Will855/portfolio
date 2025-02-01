'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './glitch.css';

// Interface para las props
interface GlitchProps {
  title?: string;
  subtitle?: string;
}

const Glitch: React.FC<GlitchProps> = ({ 
  title = "Hi, I'm Wilmer", 
  subtitle = "Web Developer" 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        duration: 0.6,
        x: 1,
        y: 1,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full text-center mx-auto px-4"
      style={{
        fontSize: 'clamp(1rem, 2vw, 1.5rem)',
        maxWidth: 'min(100%, 1200px)'
      }}
    >
      <h1 
        className="font-bold text-white mb-4 glitch-text" 
        data-text={title}
        style={{
          fontSize: 'clamp(2.5rem, 10vw, 4.5rem)',
          lineHeight: '1.2'
        }}
      >
        {title}
      </h1>
      
      <p 
        className="text-gray-300 glitch-text" 
        data-text={subtitle}
        style={{
          fontSize: 'clamp(1.25rem, 5vw, 2rem)',
          marginTop: 'clamp(-0.5rem, -2vw, -1rem)'
        }}
      >
        {subtitle}
      </p>
    </div>
  );
}

export default Glitch;