import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import Button from './components/Button/Button';
import Card from './components/Card/Card';
import Title from './components/Title/Title';
import BackgroundMusic from './components/Music/Music';
import Igor from "./assets/igor.png";

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

function App() {
  const cardValues = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X'
  ];

  const createCardPairs = () => {
    const shuffledValues = shuffleArray([...cardValues]);
    const selectedValues = shuffledValues.slice(0, 4); // Choisir 4 paires aléatoires
    const pairs = selectedValues.flatMap((value) => [
      { id: `${value}1`, value, isFlipped: false },
      { id: `${value}2`, value, isFlipped: false }
    ]);
    return shuffleArray(pairs); // Mélanger les 8 cartes sélectionnées
  };

  const [cards, setCards] = useState(createCardPairs());
  const [flippedCards, setFlippedCards] = useState([]);

  const flipCard = useCallback((id) => {
    if (flippedCards.length < 2) {
      setFlippedCards((prev) => [...prev, id]);
    }
  }, [flippedCards]);

  const resetGame = useCallback(() => {
    setCards(createCardPairs());
    setFlippedCards([]);
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstId, secondId] = flippedCards;
      const card1 = cards.find((card) => card.id === firstId);
      const card2 = cards.find((card) => card.id === secondId);

      if (card1.value === card2.value) {
        setCards((prev) =>
          prev.map((card) => {
            if (card.id === firstId || card.id === secondId) {
              return { ...card, isFlipped: true };
            }
            return card;
          })
        );
      }

      setTimeout(() => {
        setFlippedCards([]);
      }, 1000);
    }
  }, [flippedCards, cards]);

  return (
    <div className="App">
      <BackgroundMusic />
      <Title />
      <div className="card-container">
        {cards.map((card) => (
          <Card key={card.id} card={card} flipCard={flipCard} />
        ))}
          <img className="Igor" src={Igor} alt="Igor" />
      </div>
      <Button resetGame={resetGame} />
    </div>
  );
}

export default App;