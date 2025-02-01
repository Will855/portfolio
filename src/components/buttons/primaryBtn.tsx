import React from "react";
import { Link } from "react-router-dom";

interface PrimaryButtonProps {
    to: string; // Ruta a la que redirige el botón
    text: string; // Texto del botón
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ to, text }) => {
    return (
        <Link
            to={`/${to.toLowerCase()}`}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-400 rounded-lg font-medium hover:scale-[1.02] transition-transform"
        >
            {text}
        </Link>
    );
};

export default PrimaryButton;
