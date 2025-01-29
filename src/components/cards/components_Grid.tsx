import React, { useState, useEffect } from "react";
import axios from "axios";  // Importar axios
import Card from "./components_Card";
import { CardProps } from "./types";
import { Link } from "react-router-dom";

const Grid: React.FC = () => {
  const [cardData, setCardData] = useState<CardProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Usar la variable de entorno para la URL base
        const url = `${process.env.REACT_APP_API_URL}/cardContent.php`;
        const response = await axios.get(url);
        
        // Axios devuelve los datos en response.data
        if (response.data.success) {
          setCardData(response.data.data);
        } else {
          setError('Error al cargar los datos');
        }
      } catch (error) {
        setError('Error al conectar con el servidor');
        console.error('Error en la solicitud:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3">
      {cardData.map((card) => (
        <Link to={`/page/${card.id}`} key={card.id}>
          <Card {...card} />
        </Link>
      ))}
    </div>
  );
};

export default Grid;