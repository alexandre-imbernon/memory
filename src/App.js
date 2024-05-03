import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import Button from './components/Button/Button';
import Card from './components/Card/Card';
import Title from './components/Title/Title';
import BackgroundMusic from './components/Music/Music';
import Igor from './assets/igor.png';

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

function App() {
  const cardValues = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X'
  ];

  const createCardPairs = () => {
    const shuffledValues = shuffleArray([...cardValues]);
    const selectedValues = shuffledValues.slice(0, 4); // Choisir 4 paires aléatoires
    const pairs = selectedValues.flatMap((value) => [
      { id: `${value}1`, value, isFlipped: false },
      { id: `${value}2`, value, isFlipped: false },
    ]);
    return shuffleArray(pairs);
  };

  const [cards, setCards] = useState(createCardPairs());
  const [flippedCards, setFlippedCards] = useState([]);
  const [isChecking, setIsChecking] = useState(false);
  const [foundPairs, setFoundPairs] = useState(0);

  const flipCard = useCallback(
    (id) => {
      if (!isChecking && flippedCards.length < 2 && !flippedCards.includes(id)) {
        setFlippedCards((prev) => [...prev, id]);

        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === id ? { ...card, isFlipped: true } : card
          )
        );
      }
    },
    [isChecking, flippedCards]
  );

  const resetGame = useCallback(() => {
    setCards(createCardPairs());
    setFlippedCards([]);
    setFoundPairs(0); // Réinitialiser le nombre de paires trouvées
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsChecking(true);

      const [firstId, secondId] = flippedCards;

      setTimeout(() => {
        const card1 = cards.find((card) => card.id === firstId);
        const card2 = cards.find((card) => card.id === secondId);

        if (card1 && card2 && card1.value === card2.value) {
          setFoundPairs((prev) => prev + 1); // Augmenter le compteur de paires trouvées
          setFlippedCards([]);
        } else {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstId || card.id === secondId
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }

        setIsChecking(false);
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
      {foundPairs === 2 && (
        <div className="congratulations-message">
          Félicitations, vous avez trouvé 2 paires !
        </div>
        
      )}
         {/* Afficher le message seulement si foundPairs >= 2 */}
         <div className={`congratulations-message ${foundPairs >= 1 ? 'show' : ''}`}>
        Félicitations, vous avez trouvé 2 paires !
      </div>
      <Button resetGame={resetGame} />
    </div>
  );
}

export default App;
