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
  const [lastFoundPair, setLastFoundPair] = useState(null); // La dernière paire trouvée

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
    setLastFoundPair(null); // Réinitialiser la dernière paire trouvée
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsChecking(true);

      const [firstId, secondId] = flippedCards;

      setTimeout(() => {
        const card1 = cards.find((card) => card.id === firstId);
        const card2 = cards.find((card) => card.id === secondId);

        if (card1 && card2 && card1.value === card2.value) {
          setLastFoundPair(card1.value); // Mettre à jour la dernière paire trouvée
          setFlippedCards([]);
        } else {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstId || secondId
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

  const getCustomMessage = (pair) => {
    const messages = {
      'A': "L'arcarne du 'Bateleur', elle représente de nouvelles opportunités, la créativité, le pouvoir et le potentiel.",
      'B': "L'arcane de la 'Papesse' elle est symbole de la sagesse intérieure, du mystère et de la connaissance cachée.",
      'C': "L'arcane de 'l'Impératrice' elle évoque la fertilité, la créativité et le pouvoir de la nature.",
      // Ajoutez d'autres messages spécifiques pour chaque paire ici
      'X': "Incroyable, vous avez trouvé la paire X !"
    };

    return messages[pair] || "Bonne trouvaille !"; // Message par défaut
  };

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
      
      {/* Afficher un message unique basé sur la dernière paire trouvée */}
      {lastFoundPair && (
        <div className="congratulations-message show">
          {getCustomMessage(lastFoundPair)}
        </div>
      )}

      <Button resetGame={resetGame} />
    </div>
  );
}

export default App;
