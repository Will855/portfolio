import React from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registrar el plugin ScrollTrigger de GSAP
gsap.registerPlugin(ScrollTrigger);

    const PageComponent = ({ content, gifSrc }) => {
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

    // Función para alternar la visibilidad del menú lateral
    const toggleMenu = () => {
        const sidebar = document.getElementById("sidebar");
        if (sidebar.style.left === "0px") {
        sidebar.style.left = "-250px"; // Ocultar el menú
        } else {
        sidebar.style.left = "0px"; // Mostrar el menú
        }
    };

    // Función para mostrar información adicional al pasar el mouse sobre los botones
    const showInfo = (button, info) => {
        const infoCard = document.getElementById("infoCard");
        const infoText = document.getElementById("infoText");
        infoText.textContent = info;

        const rect = button.getBoundingClientRect();
        infoCard.style.display = "block";
        infoCard.style.top = `${rect.top - infoCard.offsetHeight - 100}px`;
        infoCard.style.left = `${rect.left + rect.width / 2 - infoCard.offsetWidth / 2}px`;
    };

    // Función para ocultar la tarjeta de información
    const hideInfo = () => {
        const infoCard = document.getElementById("infoCard");
        infoCard.style.display = "none";
    };

    return (
        <div>
        {/* Navbar */}
        {/* <div className="navbar bg-black text-white flex justify-between p-4">
            <Link to="/proyectos" className="btn-left border border-white px-4 py-2">
            Izquierda
            </Link>
            {/* <button
            className="btn-right border border-white px-4 py-2"
            onClick={toggleMenu}
            >
            Expandir/Minimizar
            </button> 
        </div> */}

        {/* Sidebar
        <div
            id="sidebar"
            className="fixed left-[-250px] w-[250px] h-full bg-gray-800 text-white transition-all duration-300 p-4 z-10"
        >
            <h2 className="text-lg font-bold">Menú Lateral</h2>
            <ul className="list-none">
            <li>Opción 1</li>
            <li>Opción 2</li>
            <li>Opción 3</li>
            </ul>
        </div> */}

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
            <h2 className="text-2xl font-bold text-white">Contenido Dinámico</h2>
            <p>{content}</p>
            <img src={gifSrc} alt="GIF" className="mt-4" />
        </div>
        </div>
    );
};

export default PageComponent;