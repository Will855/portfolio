'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap'; // Importar GSAP para animaciones
import './glitch.css'; // Importar estilos CSS para el efecto glitch

// Componente funcional Glitch
const Glitch: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null); // Crear una referencia para el contenedor

  useEffect(() => {
    // Verificar si la referencia del contenedor está disponible
    if (containerRef.current) {
      // Animar el contenedor usando GSAP
      gsap.to(containerRef.current, {
        duration: 0.6, // Duración de la animación
        x: 1, // Desplazamiento en el eje X
        y: 1, // Desplazamiento en el eje Y
        repeat: -1, // Repetir indefinidamente
        yoyo: true, // Hacer que la animación vuelva a su estado original
        ease: "power1.inOut" // Tipo de easing para la animación
      });
    }
  }, []); // Dependencias vacías para ejecutar solo al montar

  return (
    <div 
      ref={containerRef} // Asignar la referencia al div
      className="relative max-w-2xl w-full text-center" // Clases de estilo
    >
      {/* Título con efecto glitch */}
      <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4 glitch-text" data-text="Hi, I'm Wilmer">
        Hi, I'm Wilmer
      </h1>
      <br />
      {/* Subtítulo con efecto glitch */}
      <p className="text-xl sm:text-2xl text-gray-300 glitch-text" data-text="Web Developer">
        Web Developer
      </p>
    </div>
  );
}

export default Glitch; // Exportar el componente