// utils/cardAnimations.ts
import gsap from "gsap";

/**
 * Maneja el movimiento del mouse sobre la tarjeta.
 * @param e Evento del mouse
 * @param card Elemento de la tarjeta
 * @param content Elemento del contenido de la tarjeta
 */
export const handleMouseMove = (
    e: MouseEvent,
    card: HTMLDivElement,
    content: HTMLDivElement
) => {
    const movementStrength = 25;
    const height = movementStrength / card.offsetHeight;
    const width = movementStrength / card.offsetWidth;

    const pageX = e.pageX - card.offsetLeft - card.offsetWidth / 2;
    const pageY = e.pageY - card.offsetTop - card.offsetHeight / 2;
    const newvalueX = width * pageX * 5;
    const newvalueY = height * pageY * -5;

    // Animación de rotación de la tarjeta
    gsap.to(card, {
        duration: 0.5,
        rotationY: newvalueX / 50,
        rotationX: newvalueY / 50,
        ease: "power2.out",
    });

    // Animación del contenido de la tarjeta
    gsap.to(content, {
        duration: 0.5,
        x: newvalueX / 10,
        y: newvalueY / 10,
        ease: "power2.out",
    });
};

/**
 * Restaura la posición inicial de la tarjeta y su contenido.
 * @param card Elemento de la tarjeta
 * @param content Elemento del contenido de la tarjeta
 */
export const resetCardPosition = (
    card: HTMLDivElement,
    content: HTMLDivElement
) => {
    gsap.to(card, {
        duration: 0.5,
        rotationY: 0,
        rotationX: 0,
        ease: "power2.out",
    });

    gsap.to(content, {
        duration: 0.5,
        x: 0,
        y: 0,
        ease: "power2.out",
    });
};