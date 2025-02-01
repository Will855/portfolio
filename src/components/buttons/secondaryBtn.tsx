// components/SecondaryButton.tsx
import React from "react";
import { Link } from "react-router-dom";

interface SecondaryButtonProps {
    to: string; // Ruta a la que redirige el botón
    text: string; // Texto del botón
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({ to, text }) => {
    return (
        <Link
            to={`/${to.toLowerCase()}`}
            className="px-6 py-3 border border-white/20 rounded-lg font-medium hover:bg-white/5 transition-colors"
        >
            {text}
        </Link>
    );
};

export default SecondaryButton;