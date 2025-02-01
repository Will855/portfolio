import React, { useRef, useEffect } from "react";
import { CardProps } from "../../types/types"; // Tipos para las props del componente
import { handleMouseMove, resetCardPosition } from "./../utils/cardAnimations"; // Importamos las funciones separadas
import { useNavigate } from "react-router-dom"; // <-- Importamos useNavigate

/**
 * Componente Card
 * Representa una tarjeta interactiva con animaciones al mover el mouse.
 */
const Card: React.FC<CardProps> = ({ id, img, title, description, buttonText }) => {
  // Referencias para el contenedor de la tarjeta y su contenido
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Hook para la navegación
  const navigate = useNavigate(); // <-- Inicializamos useNavigate

  // Efecto para configurar los eventos de animación
  useEffect(() => {
    const card = cardRef.current;
    const content = contentRef.current;

    if (!card || !content) return;

    // Evento: Movimiento del mouse
    const onMouseMove = (e: MouseEvent) => handleMouseMove(e, card, content);

    // Evento: Salida del mouse
    const onMouseLeave = () => resetCardPosition(card, content);

    // Agregar eventos
    card.addEventListener("mousemove", onMouseMove);
    card.addEventListener("mouseleave", onMouseLeave);

    // Cleanup: Eliminar eventos al desmontar el componente
    return () => {
      card.removeEventListener("mousemove", onMouseMove);
      card.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  // Renderizado del componente
  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden rounded-lg bg-white bg-opacity-10 p-6 backdrop-blur-lg backdrop-filter transition-all duration-300 ease-in-out hover:shadow-xl w-auto h-56"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Imagen de fondo */}
      <img
        src={img}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      {/* Contenido de la tarjeta */}
      <div ref={contentRef} className="relative z-10">
        <h2 className="mb-2 text-2xl font-bold text-white">{title}</h2>
        <p className="mb-4 text-white">{description}</p>
        <button
          className="rounded bg-white bg-opacity-20 px-4 py-2 text-white transition-colors duration-300 hover:bg-opacity-30"
          onClick={() => navigate(`/demos/${id}`)} // <-- Redirige a la página demo
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Card;