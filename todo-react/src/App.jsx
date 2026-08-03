import { useState } from "react";
import Background from "./components/Background";
import Foreground from "./components/Foreground";
import NewCard from "./components/NewCard";

function App() {
  const [cards, setCards] = useState([]);

  const addCard = (card) => {
    setCards((prev) => [
      ...prev,
      {
        id: Date.now(),
        completed: false,
        ...card,
      },
    ]);
  };

  const toggleCardComplete = (id) => {
    setCards((prev) =>
      prev.map((card) =>
        card.id === id ? { ...card, completed: !card.completed } : card
      )
    );
  };

  return (
    <div className="relative h-screen w-full bg-zinc-800 text-white overflow-hidden">
      <Background />

      <Foreground
        cards={cards}
        setCards={setCards}
        toggleCardComplete={toggleCardComplete}
      />

      <NewCard addCard={addCard} />
    </div>
  );
}

export default App;