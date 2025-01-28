import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Para obtener el ID de la tarjeta desde la URL
import { fetchData } from "../server/api"; // Importar la función fetchData
import { handleRedirect } from "../utils/redirectHandler.jsx"; // Asegúrate de que la ruta sea correcta

const CardDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [content, setContent] = useState<string>("");
    const [gifSrc, setGifSrc] = useState<string>("");
    const [bgProyect, setBgProyect] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCardDetails = async () => {
            try {
                const response = await fetchData(`card.php?id=${id}`);
                if (response.error) {
                    setError(response.error);
                    return;
                }
                const { content, gifSrc, bgProyect } = response;
                setBgProyect(bgProyect);
                setContent(content);
                setGifSrc(gifSrc);
            } catch (error) {
                setError("Error al cargar los detalles de la tarjeta.");
            }
        };

        fetchCardDetails();
    }, [id]);

    const showInfo = (button, info) => {
        const infoCard = document.getElementById("infoCard");
        const infoText = document.getElementById("infoText");
        infoText.textContent = info;

        const rect = button.getBoundingClientRect();
        infoCard.style.display = "block";
        infoCard.style.top = `${rect.top - infoCard.offsetHeight - 20}px`;
        infoCard.style.left = `${rect.left + rect.width / 2 - infoCard.offsetWidth / 2}px`;
    };

    const hideInfo = () => {
        const infoCard = document.getElementById("infoCard");
        infoCard.style.display = "none";
    };

    return (
        <div>
            <header 
                className="header h-[80vh] bg-opacity-85 flex justify-center items-center relative text-white bg-cover bg-center brightness-75"
                style={{ backgroundImage: `url(${bgProyect})` }}
            >
                <div className="button flex gap-4">
                    <button
                        className="info-btn border-2 px-6 py-2 font-bold relative"
                        onMouseOver={(e) => showInfo(e.target, "Este botón te lleva al código del proyecto.")}
                        onMouseOut={hideInfo}
                        onClick={() => handleRedirect(id)} // Pasar el id aquí
                    >
                        Código
                    </button>
                    <button
                        className="info-btn border-2 border-white px-6 py-2 font-bold relative"
                        onMouseOver={(e) => showInfo(e.target, "Este botón te lleva a la vista del proyecto.")}
                        onMouseOut={hideInfo}
                        onClick={() => handleRedirect(id)} // Pasar el id aquí
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

            {error && <div className="error-message text-red-500 text-center">{error}</div>}

            <div className="p-8 bg-slate-300 mx-6">
                <div className="h-auto max-w-6xl mx-auto" dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        </div>
    );
};

export default CardDetails;