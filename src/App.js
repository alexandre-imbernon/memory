import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import Button from './components/Button/Button';
import Card from './components/Card/Card';
import Title from './components/Title/Title';
import BackgroundMusic from './components/Music/Music';
import _ from 'lodash'; // Importez lodash pour le shuffle 

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
    { id: 9, value: 'E', isFlipped: false },
    { id: 10, value: 'E', isFlipped: false },
    { id: 11, value: 'F', isFlipped: false },
    { id: 12, value: 'F', isFlipped: false },
    { id: 13, value: 'G', isFlipped: false },
    { id: 14, value: 'G', isFlipped: false },
    { id: 15, value: 'H', isFlipped: false },
    { id: 16, value: 'H', isFlipped: false },
    { id: 17, value: 'I', isFlipped: false },
    { id: 18, value: 'I', isFlipped: false },
    { id: 19, value: 'J', isFlipped: false },
    { id: 20, value: 'J', isFlipped: false },
    { id: 21, value: 'K', isFlipped: false },
    { id: 22, value: 'K', isFlipped: false },
    { id: 23, value: 'L', isFlipped: false },
    { id: 24, value: 'L', isFlipped: false },
    { id: 25, value: 'M', isFlipped: false },
    { id: 26, value: 'M', isFlipped: false },
    { id: 27, value: 'N', isFlipped: false },
    { id: 28, value: 'N', isFlipped: false },
    { id: 29, value: 'O', isFlipped: false },
    { id: 30, value: 'O', isFlipped: false },
    { id: 31, value: 'P', isFlipped: false },
    { id: 32, value: 'P', isFlipped: false },
    { id: 33, value: 'Q', isFlipped: false },
    { id: 34, value: 'Q', isFlipped: false },
    { id: 35, value: 'R', isFlipped: false },
    { id: 36, value: 'R', isFlipped: false },
    { id: 37, value: 'S', isFlipped: false },
    { id: 38, value: 'S', isFlipped: false },
    { id: 39, value: 'T', isFlipped: false },
    { id: 40, value: 'T', isFlipped: false },
    { id: 41, value: 'U', isFlipped: false },
    { id: 42, value: 'U', isFlipped: false },
    { id: 43, value: 'V', isFlipped: false },
    { id: 44, value: 'V', isFlipped: false },
    { id: 45, value: 'W', isFlipped: false },
    { id: 46, value: 'W', isFlipped: false },
    { id: 47, value: 'X', isFlipped: false },
    { id: 48, value: 'X', isFlipped: false },
  ];

  const [cards, setCards] = useState(shuffleCards([...initialCards]).slice(0, 8));
  const [flippedCards, setFlippedCards] = useState([]);

  const flipCard = useCallback((id) => {
    if (flippedCards.length < 2) {
      setFlippedCards((prev) => [...prev, id]);
    }
  }, [flippedCards]);

  const resetGame = useCallback(() => {
    // Mélangez à nouveau toutes les cartes et prenez les 8 premières pour la nouvelle partie
    setCards(shuffleCards([...initialCards]).slice(0, 8));
    setFlippedCards([]);
  }, []);

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