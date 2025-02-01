import HeadPhones from "../components/demos/headphones";

export interface Project {
    id: string;
    content: React.ComponentType;
    //gifSrc: string;       #desuso
    bgProyect: string;
    codeUrl: string;       // URL del repositorio (GitHub, GitLab, etc.)
    demoUrl: string;       // URL del demo o vista en vivo
}

export const projects: Project[] = [
    {
        id: "1",
        content: HeadPhones,
        bgProyect: "/images/bg-proyecto1.jpg",
        codeUrl: "https://github.com/tu-usuario/proyecto-1", // Enlace externo
        demoUrl: "/404"                // Ruta interna
    },
    {
        id: "2",
        content: "<h1>Proyecto 2</h1>...",
        bgProyect: "/images/bg-proyecto2.jpg",
        codeUrl: "https://github.com/tu-usuario/proyecto-2",
        demoUrl: "/404"
    },
    {
        id: "3",
        content: "<h1>Proyecto 3</h1>...",
        bgProyect: "/images/bg-proyecto2.jpg",
        codeUrl: "https://github.com/tu-usuario/proyecto-2",
        demoUrl: "/404"
    },
    {
        id: "4",
        content: "<h1>Proyecto 4</h1>...",
        bgProyect: "/images/bg-proyecto2.jpg",
        codeUrl: "https://github.com/tu-usuario/proyecto-2",
        demoUrl: "/404"
    },
    {
        id: "5",
        content: "<h1>Proyecto 5</h1>...",
        bgProyect: "/images/bg-proyecto2.jpg",
        codeUrl: "https://github.com/tu-usuario/proyecto-2",
        demoUrl: "/404"
    }
];