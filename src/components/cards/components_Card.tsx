import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { CardProps } from "./types";

const Card: React.FC<CardProps> = ({ img, title, description, buttonText }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const content = contentRef.current;

    if (!card || !content) return;

    const movementStrength = 25;
    const height = movementStrength / card.offsetHeight;
    const width = movementStrength / card.offsetWidth;

    const handleMouseMove = (e: MouseEvent) => {
      const pageX = e.pageX - card.offsetLeft - card.offsetWidth / 2;
      const pageY = e.pageY - card.offsetTop - card.offsetHeight / 2;
      const newvalueX = width * pageX * 5;
      const newvalueY = height * pageY * -5;

      gsap.to(card, {
        duration: 0.5,
        rotationY: newvalueX / 50,
        rotationX: newvalueY / 50,
        ease: "power2.out",
      });

      gsap.to(content, {
        duration: 0.5,
        x: newvalueX / 10,
        y: newvalueY / 10,
        ease: "power2.out",
      });
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", () => {
      gsap.to(card, { duration: 0.5, rotationY: 0, rotationX: 0, ease: "power2.out" });
      gsap.to(content, { duration: 0.5, x: 0, y: 0, ease: "power2.out" });
    });

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden rounded-lg bg-white bg-opacity-10 p-6 backdrop-blur-lg backdrop-filter transition-all duration-300 ease-in-out hover:shadow-xl w-auto h-56"
      style={{ transformStyle: "preserve-3d" }}
    >
      <img src={img} alt={title} className="absolute inset-0 w-full h-full object-cover opacity-30" />
      <div ref={contentRef} className="relative z-10">
        <h2 className="mb-2 text-2xl font-bold text-white">{title}</h2>
        <p className="mb-4 text-white">{description}</p>
        <button className="rounded bg-white bg-opacity-20 px-4 py-2 text-white transition-colors duration-300 hover:bg-opacity-30">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Card;