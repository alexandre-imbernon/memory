import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import Button from './components/Button/Button';
import Card from './components/Card/Card';
import Title from './components/Title/Title';
import BackgroundMusic from './components/Music/Music';

const shuffleCards = (cards) => {
  // Mélanger les cartes de manière aléatoire
  return cards.sort(() => Math.random() - 0.5);
};

function App() {
  const initialCards = [
    { id: 1, value: 'A', isFlipped: false },
    { id: 2, value: 'A', isFlipped: false },
    { id: 3, value: 'B', isFlipped: false },
    { id: 4, value: 'B', isFlipped: false },
    { id: 5, value: 'C', isFlipped: false },
    { id: 6, value: 'C', isFlipped: false },
    { id: 7, value: 'D', isFlipped: false },
    { id: 8, value: 'D', isFlipped: false },
    // Ajouter de nouvelles paires de cartes
    //{ id: 9, value: 'E', isFlipped: false },
    //{ id: 10, value: 'E', isFlipped: false },
  ];

  const [cards, setCards] = useState(shuffleCards([...initialCards]));
  const [flippedCards, setFlippedCards] = useState([]);

  const flipCard = useCallback((id) => {
    if (flippedCards.length < 2) {
      setFlippedCards((prev) => [...prev, id]);
    }
  }, [flippedCards]);

  const resetGame = useCallback(() => {
    setCards(shuffleCards([...initialCards]));
    setFlippedCards([]);
  }, [initialCards]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstId, secondId] = flippedCards;

      const card1 = cards.find(card => card.id === firstId);
      const card2 = cards.find(card => card.id === secondId);

      if (card1.value === card2.value) {
        // Si les cartes correspondent, elles restent retournées
        setCards((prev) => {
          return prev.map(card => {
            if (card.id === firstId || card.id === secondId) {
              return { ...card, isFlipped: true };
            }
            return card;
          });
        });
      }

      // Réinitialiser les cartes retournées après une pause pour permettre aux joueurs de voir les cartes
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
      </div>
      <Button resetGame={resetGame} />
    </div>
  );
}

export default App;
