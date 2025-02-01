import React from "react";
import { useNavigate } from "react-router-dom";
import { projects } from "../config/project";

interface Props {
    id: string;
}

const Demo: React.FC<Props> = ({ id }) => {
    const navigate = useNavigate(); // Hook para navegación interna

    // Buscar el proyecto por ID
    const project = projects.find((p) => p.id === id);

    if (!project) {
        return (
            <div className="text-red-500 text-center p-8">
                No se encontró el contenido para el proyecto {id}
            </div>
        );
    }

    // Redirigir al contenido del proyecto
    const handleNavigateToContent = () => {
        navigate(`/project/${id}`); // Redirige a la ruta del proyecto
    };

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <button
                onClick={handleNavigateToContent}
                className="px-6 py-3 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition"
            >
                Ver contenido del proyecto
            </button>
        </div>
    );
};

export default Demo;