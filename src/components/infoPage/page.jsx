import React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registrar el plugin ScrollTrigger de GSAP
gsap.registerPlugin(ScrollTrigger);

/**
 * PageComponent - Componente que muestra un título, contenido dinámico y un GIF.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.title - Título que se mostrará en el encabezado.
 * @param {string} props.content - Contenido HTML dinámico que se mostrará en el cuerpo del componente.
 * @param {string} props.gifSrc - URL de la imagen GIF que se mostrará en la tarjeta de información.
 *
 * @returns {JSX.Element} El componente renderizado.
 */
const PageComponent = ({ title, content, gifSrc }) => {
    // Efecto para animaciones de ScrollTrigger
    React.useEffect(() => {
        const sections = document.querySelectorAll("h2, p");
        sections.forEach((section) => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    end: "top 30%",
                    scrub: true,
                },
                opacity: 0,
                y: 50,
                duration: 1,
            });
        });
    }, []);

    // Función para mostrar información adicional al pasar el mouse sobre los botones
    const showInfo = (button, info) => {
        const infoCard = document.getElementById("infoCard");
        const infoText = document.getElementById("infoText");
        infoText.textContent = info;

        const rect = button.getBoundingClientRect();
        infoCard.style.display = "block";
        infoCard.style.top = `${rect.top - infoCard.offsetHeight - 10}px`;
        infoCard.style.left = `${rect.left + rect.width / 2 - infoCard.offsetWidth / 2}px`;
    };

    // Función para ocultar la tarjeta de información
    const hideInfo = () => {
        const infoCard = document.getElementById("infoCard");
        infoCard.style.display = "none";
    };

    return (
        <div>
            {/* Header */}
            <header className="header h-[80vh] bg-slate-600 bg-opacity-50 backdrop-blur-md flex justify-center items-center relative text-white">
                <div className="buttons flex gap-4">
                    <button
                        className="info-btn border-2 border-white px-6 py-2 font-bold relative"
                        onMouseOver={(e) =>
                            showInfo(e.target, "Este botón te lleva al código del proyecto.")
                        }
                        onMouseOut={hideInfo}
                    >
                        Código
                    </button>
                    <button
                        className="info-btn border-2 border-white px-6 py-2 font-bold relative"
                        onMouseOver={(e) =>
                            showInfo(e.target, "Este botón te lleva a la vista del proyecto.")
                        }
                        onMouseOut={hideInfo}
                    >
                        Ver Proyecto
                    </button>
                </div>
                <div
                    id="infoCard"
                    className="info-card absolute bg-black bg-opacity-80 text-white p-4 rounded hidden"
                >
                    <img src={gifSrc} alt="Información" className="w-12 h-auto mx-auto" />
                    <span id="infoText" className="block mt-2"></span>
                </div>
            </header>

            {/* Contenido Dinámico */}
            <div className="p-5">
                <h2 className="text-2xl font-bold text-white">{title}</h2> {/* Mostrar el título pasado como prop */}
                <div dangerouslySetInnerHTML={{ __html: content }} /> {/* Renderizar contenido HTML dinámico */}
            </div>
        </div>
    );
};

export default PageComponent;