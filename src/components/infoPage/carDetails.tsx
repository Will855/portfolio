import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Para obtener el ID de la tarjeta desde la URL
import { fetchData } from "../server/api"; // Importar la función fetchData

/**
 * CardDetails - Componente que obtiene los detalles de una tarjeta desde el servidor y los muestra.
 *
 * @returns {JSX.Element} El componente renderizado.
 */
const CardDetails: React.FC = () => {
    // Obtener el ID de la tarjeta desde la URL
    const { id } = useParams<{ id: string }>();

    // Estado para almacenar el contenido, el GIF y el fondo del proyecto
    const [content, setContent] = useState<string>("");
    const [gifSrc, setGifSrc] = useState<string>("");
    const [bgProyect, setBgProyect] = useState<string>("");
    const [error, setError] = useState<string | null>(null); // Estado para manejar errores

    // useEffect para cargar los datos desde el servidor
    useEffect(() => {
        const fetchCardDetails = async () => {
            try {
                // Realizar una llamada a la API para obtener los detalles de la tarjeta
                const response = await fetchData(`card.php?id=${id}`);
                //console.log("Respuesta de la API:", response); // Imprimir la respuesta de la API
                
                // Verificar si hay un error en la respuesta
                if (response.error) {
                    setError(response.error); // Establecer el mensaje de error
                    console.error("Error en la respuesta de la API:", response.error);
                    return; // Salir si hay un error
                }

                // Desestructurar la respuesta de la API
                const { content, gifSrc, bgProyect } = response;
                console.log(response);
                
                // Actualizar el estado con los datos desestructurados
                setBgProyect(bgProyect); // Asignar el fondo recibido
                setContent(content); // Asignar el contenido recibido
                setGifSrc(gifSrc); // Asignar la URL del GIF recibido
                
            } catch (error) {
                setError("Error al cargar los detalles de la tarjeta."); // Establecer un mensaje de error genérico
                console.error("Error al cargar los detalles de la tarjeta:", error);
            }
        };

        fetchCardDetails(); // Llamar a la función para cargar los detalles de la tarjeta
    }, [id]); // Dependencia en el ID para volver a cargar si cambia

    useEffect(() => {
        console.log("Fondo actualizado:", bgProyect);
        console.log("Contenido actualizado:", content);
        console.log("GIF actualizado:", gifSrc);
    }, [bgProyect, content, gifSrc]); // Este efecto se ejecutará cada vez que se actualicen estos estados

    // Función para mostrar información adicional al pasar el mouse sobre los botones
    const showInfo = (button, info) => {
        const infoCard = document.getElementById("infoCard");
        const infoText = document.getElementById("infoText");
        infoText.textContent = info;

        const rect = button.getBoundingClientRect();
        infoCard.style.display = "block";
        infoCard.style.top = `${rect.top - infoCard.offsetHeight - 20}px`;
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
            <header 
                className="header h-[80vh] bg-opacity-85 flex justify-center items-center relative text-white bg-cover bg-center brightness-75"
                style={{ backgroundImage: `url(${bgProyect})` }} // Usar bgProyect como fondo
            >
                <div className="button flex gap-4">
                    <button
                        className="info-btn border-2 px-6 py-2 font-bold relative"
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
                    <img src={gifSrc} alt="Información" className="w-20 h-auto mx-auto" />
                    <span id="infoText" className="block mt-2"></span>
                </div>
            </header>

            {/* Manejo de errores */}
            {error && <div className="error-message text-red-500 text-center">{error}</div>}

            {/* Contenido Dinámico */}
            <div className="p-8 bg-slate-300 mx-6">
                <div className="h-auto max-w-6xl mx-auto" dangerouslySetInnerHTML={{ __html: content }} /> {/* Renderizar contenido HTML dinámico */}
            </div>
        </div>
    );
};

export default CardDetails;