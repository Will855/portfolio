// redirectHandler.ts
import { fetchData } from "../../server/api"; // Asegúrate de que la ruta sea correcta

export const handleRedirect = async (id: string) => {
    try {
        const response = await fetchData(`get_project_url.php?id=${id}`);
        if (response.error) {
            console.error("Error al obtener la URL:", response.error);
            return;
        }
        window.location.href = response.url; // Redirigir a la URL obtenida
    } catch (error) {
        console.error("Error al hacer la solicitud:", error);
    }
};