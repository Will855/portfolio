import React, { useEffect, useRef } from 'react'; // Importamos React y hooks necesarios
import { gsap } from 'gsap'; // Importamos GSAP para animaciones
import IonIcon from '@reacticons/ionicons';

const MagneticBtn = () => {
    // Creamos una referencia para el botón magnético
    const magneticBtnRef = useRef(null);
    const magneticBtnTextRef = useRef(null);

    // Función para agregar animación al mover el mouse
    const activeAnimation = (e) => {
        // Obtenemos el tamaño y posición del botón
        let boundBox = magneticBtnRef.current.getBoundingClientRect();
        const magneticBtnStrength = 40; // Fuerza de movimiento del botón
        const magneticBtnTextStrength = 80; // Fuerza de movimiento del texto

        // Calculamos la nueva posición en X y Y basándonos en la posición del mouse
        const newX = ((e.clientX - boundBox.left) / magneticBtnRef.current.offsetWidth).toFixed(2) - 0.5;
        const newY = ((e.clientY - boundBox.top) / magneticBtnRef.current.offsetHeight).toFixed(2) - 0.5;

        // Animamos el botón usando GSAP
        gsap.to(magneticBtnRef.current, {
            x: newX * magneticBtnStrength,
            y: newY * magneticBtnStrength,
            duration: 1,
            ease: "Power4.easeOut"
        });

        // Animamos el texto del botón usando GSAP
        gsap.to(magneticBtnTextRef.current, {
            x: newX * magneticBtnTextStrength,
            y: newY * magneticBtnTextStrength,
            duration: 1,
            ease: "Power4.easeOut"
        });
    };

    // Función para eliminar la animación al salir del botón
    const removeAnimation = () => {
        // Regresamos el botón y el texto a su posición original
        gsap.to([magneticBtnRef.current, magneticBtnTextRef.current], {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out',
        });
    };

    // Usamos useEffect para agregar y limpiar los eventos
    useEffect(() => {
        const magneticBtn = magneticBtnRef.current; // Referencia al botón
        let timeoutId; // Variable para manejar el timeout

        // Agregamos el evento mousemove al botón
        magneticBtn.addEventListener('mousemove', (e) => {
            activeAnimation(e); // Llamamos a la función de animación
            clearTimeout(timeoutId); // Limpiamos el timeout
        });

        // Agregamos el evento mouseleave al botón
        magneticBtn.addEventListener('mouseleave', () => {
            timeoutId = setTimeout(removeAnimation, 500); // Llamamos a removeAnimation después de 500ms
        });

        // Agregamos el evento mouseleave a la ventana
        window.addEventListener('mouseleave', removeAnimation);

        // Limpiamos los eventos al desmontar el componente
        return () => {
            magneticBtn.removeEventListener('mousemove', activeAnimation);
            magneticBtn.removeEventListener('mouseleave', removeAnimation);
            window.removeEventListener('mouseleave', removeAnimation);
        };
    }, []); // Solo se ejecuta una vez al montar el componente

    return (
        <>
            {/* Botón magnético con referencia */}
            <button className="text-lg sm:text-xl magnetic-btn w-40 h-40" ref={magneticBtnRef}>
                <span className="text" ref=
                {magneticBtnTextRef}>
                    <IonIcon name="logo-github" size='24'/>
                    <br />
                    Github
                </span>
            </button>
        </>
    );
};

export default MagneticBtn; // Exportamos el componente