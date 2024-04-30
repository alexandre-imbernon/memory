import React, { useState, useCallback, useEffect } from 'react';
import '../src/App.css';
import Button from './components/Button/Button';
import Card from './components/Card/Card';
import Title from './components/Title/Title';
import BackgroundMusic from './components/Music/Music';


function App() {
  const [cards, setCards] = useState([
    
    { id: 1, value: 'A', isFlipped: false, backImage: '../assets/cardreverse.png' },
    { id: 2, value: 'A', isFlipped: false },
    { id: 3, value: 'B', isFlipped: false },
    { id: 4, value: 'B', isFlipped: false },
    { id: 5, value: 'C', isFlipped: false },
    { id: 6, value: 'C', isFlipped: false },
    { id: 7, value: 'D', isFlipped: false },
    { id: 8, value: 'D', isFlipped: false },
  ]);
  const [flippedCards, setFlippedCards] = useState([]);

  const flipCard = useCallback((id) => {
    setFlippedCards((prev) => [...prev, id]);
  }, []);

  const resetGame = useCallback(() => {
    setCards(cards.map(card => ({ ...card, isFlipped: false })));
    setFlippedCards([]);
  }, [cards]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const card1 = cards.find(card => card.id === flippedCards[0]);
      const card2 = cards.find(card => card.id === flippedCards[1]);

      if (card1.value === card2.value) {
        setCards(cards.map(card => {
          if (card.id === card1.id || card.id === card2.id) {
            return { ...card, isFlipped: true };
          }
          return card;
        }));
      }

      setFlippedCards([]);
    }
  }, [flippedCards, cards]);

  return (
    <div>
      <BackgroundMusic /> {/* Ajoutez cette ligne pour utiliser le composant BackgroundMusic */}
      <Title />
      <div className="card-container">
        {cards.map((card) => (
          <Card key={card.id} card={card} flipCard={flipCard} />
        ))}
      </div>
      <Button resetGame={resetGame} />
    </div>
  );
}

export default App;
