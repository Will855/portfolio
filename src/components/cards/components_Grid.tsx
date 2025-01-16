import React, { useState, useEffect } from "react";
import Card from "./components_Card";
import { CardProps } from "./types";
import { Link } from "react-router-dom";

const Grid: React.FC = () => {
  // Estado para almacenar los datos de las tarjetas
  const [cardData, setCardData] = useState<CardProps[]>([]);

  // useEffect para cargar los datos dinámicamente desde una API simulada
  useEffect(() => {
    // Simulación de una API con datos de tarjetas
    const fetchData = async () => {
      const data: CardProps[] = [
        {
          id: 1,
          img: "src/assets/web1.png",
          title: "Card 1",
          description: "This is the description for Card 1",
          buttonText: "Learn More",
        },
        {
          id: 2,
          img: "src/assets/web2.png",
          title: "Card 2",
          description: "This is the description for Card 2",
          buttonText: "Explore",
        },
        {
          id: 3,
          img: "src/assets/web3.png",
          title: "Card 3",
          description: "This is the description for Card 3",
          buttonText: "Get Started",
        },
        {
          id: 4,
          img: "src/assets/web4.png",
          title: "Card 4",
          description: "This is the description for Card 4",
          buttonText: "Discover",
        },
        {
          id: 5,
          img: "src/assets/web5.png",
          title: "Card 5",
          description: "This is the description for Card 5",
          buttonText: "Read More",
        },
      ];
      setCardData(data); // Actualiza el estado con los datos
    };

    fetchData(); // Llama a la función para cargar los datos
  }, []);

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