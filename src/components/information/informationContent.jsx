import React from "react";
import WordCloud from '../cloudWords';

const InformationContent = () => {
    return (
        <section className="mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 max-w-4xl">
            {/* Contenedor con efecto de vidrio mejorado */}
            <div className="p-6 sm:p-8 lg:p-10 text-slate-50 flex flex-col gap-8 sm:gap-12 backdrop-blur-lg bg-white/5 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl">
                {/* Sección Quién soy */}
                <article className="space-y-4 sm:space-y-6">
                    <h1 className="font-semibold text-4xl sm:text-5xl bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
                        ¿Quién soy?
                    </h1>
                    <p className="text-base sm:text-lg leading-relaxed sm:leading-loose text-justify opacity-90">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui eum recusandae praesentium illo culpa eveniet vitae nesciunt iste. Doloribus, voluptatem earum qui rerum asperiores nulla alias enim necessitatibus beatae excepturi.
                    </p>
                </article>

                {/* Nube de palabras con contenedor responsive */}
                <div className="h-64 sm:h-80 lg:h-96 w-full animate-fade-in">
                    <WordCloud />
                </div>

                {/* Sección adicional */}
                <article className="space-y-4 sm:space-y-6">
                    <p className="text-base sm:text-lg leading-relaxed sm:leading-loose text-justify opacity-90">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui eum recusandae praesentium illo culpa eveniet vitae nesciunt iste. Doloribus, voluptatem earum qui rerum asperiores nulla alias enim necessitatibus beatae excepturi.
                    </p>
                </article>
            </div>
        </section>
    );
};

export default InformationContent;