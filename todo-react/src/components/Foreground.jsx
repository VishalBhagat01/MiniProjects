import { useRef } from "react";
import Card from "./Card";

function Foreground({ cards, setCards, toggleCardComplete }) {
  const ref = useRef(null);

  const deleteCard = (id) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  return (
    <div
      ref={ref}
      className="w-full h-full fixed z-[3] top-0 left-0 flex gap-10 flex-wrap"
    >
      {cards.map((item) => (
        <Card
          key={item.id}
          data={item}
          reference={ref}
          deleteCard={deleteCard}
          toggleCardComplete={toggleCardComplete}
        />
      ))}
    </div>
  );
}

export default Foreground;