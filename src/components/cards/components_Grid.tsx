import React from "react";
import { Link } from "react-router-dom";
import Card from "./components_Card";
import { cards } from "../../config/cards"; // Nueva importación

const Grid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3">
      {cards.map((card) => (
        <Link to={`/page/${card.id}`} key={card.id}>
          <Card
            id={card.id}
            title={card.title}
            description={card.description}
            img={card.img} // Propiedad renombrada
            buttonText={card.buttonText} // Nueva prop
          />
        </Link>
      ))}
    </div>
  );
};

export default Grid;