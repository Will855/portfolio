import React from "react";

const BackgroundStars = ()=>{
    return(<>
    <div className="absolute inset-0 overflow-hidden sm:hidden">
        {[...Array(50)].map((_, i) => (
            <div
                key={i}
                className="star absolute w-1 h-1 bg-white rounded-full"
                style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                }}>
            </div>
        ))}
    </div>
    </>)
}

export default BackgroundStars;