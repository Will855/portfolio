import HeadPhones from "../components/demos/headphones";
import NotFound from "../pages/404";

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
        content: NotFound,
        bgProyect: "/images/bg-proyecto2.jpg",
        codeUrl: "https://github.com/tu-usuario/proyecto-2",
        demoUrl: "/404"
    },
    {
        id: "3",
        content: NotFound,
        bgProyect: "/images/bg-proyecto2.jpg",
        codeUrl: "https://github.com/tu-usuario/proyecto-2",
        demoUrl: "/404"
    },
    {
        id: "4",
        content: NotFound,
        bgProyect: "/images/bg-proyecto2.jpg",
        codeUrl: "https://github.com/tu-usuario/proyecto-2",
        demoUrl: "/404"
    },
    {
        id: "5",
        content: NotFound,
        bgProyect: "/images/bg-proyecto2.jpg",
        codeUrl: "https://github.com/tu-usuario/proyecto-2",
        demoUrl: "/404"
    }
];