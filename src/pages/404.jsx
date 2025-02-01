import React from "react";
import Glitch from "../components/animations/glitchPresentation";

const NotFound = () => {
    return (
        <div className="min-h-screen flex justify-center items-center">
            <Glitch title="404" subtitle="Not Found" />
        </div>
    )
}

export default NotFound;