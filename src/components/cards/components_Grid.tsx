import React, { useState, useEffect } from "react";
import Card from "./components_Card";
import { CardProps } from "./types";
import { Link } from "react-router-dom";
import { fetchData } from '../server/api'; // Asegúrate de que la ruta sea correcta
import { log } from "console";

const Grid: React.FC = () => {
  // Estado para almacenar los datos de las tarjetas
  const [cardData, setCardData] = useState<CardProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado de error

  // useEffect para cargar los datos dinámicamente desde la API
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchData('cardContent.php'); // Llama a la API
        //console.log("Datos recibidos de la API:", response); // Imprimir los datos en consola

        if (response.success) {
          setCardData(response.data); // Actualizar el estado con los datos de la propiedad 'data'
        } else {
          setError('Error al cargar los datos'); // Manejo de errores
        }
      } catch (error) {
        setError('Error al cargar los datos'); // Manejo de errores
      } finally {
        setLoading(false); // Cambia el estado de carga
      }
    };

    loadData(); // Llama a la función para cargar los datos
  }, []);

  if (loading) {
    return <div>Cargando...</div>; // Mensaje de carga
  }

  if (error) {
    return <div>{error}</div>; // Mensaje de error
  }

  return (
    <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3">
      {/* Itera sobre los datos de las tarjetas y renderiza cada una */}
      {cardData.map((card) => (
        <Link to={`/page/${card.id}`} key={card.id}>
          {/* Cada tarjeta está envuelta en un Link que redirige a una ruta dinámica */}
          
          <Card {...card} />
        </Link>
      ))}
    </div>
  );
};

export default Grid;