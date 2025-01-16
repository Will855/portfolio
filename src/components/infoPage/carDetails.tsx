// Importaciones necesarias
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Para obtener el ID de la tarjeta desde la URL
import axios from "axios"; // Importar Axios
import PageComponent from "./page"; // Importar el componente PageComponent

const CardDetails: React.FC = () => {
  // Obtener el ID de la tarjeta desde la URL
    const { id } = useParams<{ id: string }>();
    
    // Estado para almacenar el contenido y el GIF
    const [content, setContent] = useState<string>("");
    const [gifSrc, setGifSrc] = useState<string>("");

    // useEffect para cargar los datos desde el servidor
    useEffect(() => {
        const fetchCardDetails = async () => {
        try {
            // Realizar una llamada a la API para obtener los detalles de la tarjeta
            const response = await axios.get(`/api/cards/${id}`); // Suponiendo que tienes una API que devuelve los detalles de la tarjeta
            
            // Actualizar el estado con los datos recibidos
            setContent(response.data.content); // Asignar el contenido recibido
            setGifSrc(response.data.gifSrc); // Asignar la URL del GIF recibido
        } catch (error) {
            console.error("Error al cargar los detalles de la tarjeta:", error);
        }
        };

        fetchCardDetails(); // Llamar a la función para cargar los detalles de la tarjeta
    }, [id]); // Dependencia en el ID para volver a cargar si cambia

    // Renderizar el componente PageComponent con los props dinámicos
    return (
        <PageComponent content={content} gifSrc={gifSrc} />
    );
};

export default CardDetails;