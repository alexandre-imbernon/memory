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
    const selectedValues = shuffledValues.slice(0, 4);
    const pairs = selectedValues.flatMap((value) => [
      { id: `${value}1`, value, isFlipped: false, isMatched: false },
      { id: `${value}2`, value, isFlipped: false, isMatched: false },
    ]);
    return shuffleArray(pairs);
  };

  const [cards, setCards] = useState(createCardPairs());
  const [flippedCards, setFlippedCards] = useState([]);
  const [isChecking, setIsChecking] = useState(false);
  const [lastFoundPair, setLastFoundPair] = useState(null); // La dernière paire trouvée
  const flipCard = useCallback(
    (id) => {
      const card = cards.find((card) => card.id === id);
      if (!isChecking && flippedCards.length < 2 && !flippedCards.includes(id) && card && !card.isMatched) {
        setFlippedCards((prev) => [...prev, id]);
  
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === id ? { ...card, isFlipped: true } : card
          )
        );
      }
    },
    [isChecking, flippedCards, cards]
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
        setLastFoundPair(card1.value);
        setFlippedCards([]);

        // Mettez à jour 'isMatched' pour les deux cartes
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === firstId || card.id === secondId
              ? { ...card, isMatched: true }
              : card
          )
        );
      } else {
        setCards((prevCards) =>
          prevCards.map((card) =>
            (card.id === firstId || card.id === secondId) && !card.isMatched
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
      'A': "L'arcane du 'Mat', symbole de l'aventure, de la liberté, et de la spontanéité.",
      'B': "L'arcane du 'Bateleur', elle représente de nouvelles opportunités, la créativité, le pouvoir et le potentiel.",
      'C': "L'arcane de la 'Papesse', symbole de la sagesse intérieure, du mystère et de la connaissance cachée.",
      'D': "L'arcane de 'L'Impératrice', elle évoque la fertilité, la créativité et le pouvoir de la nature.",
      'E': "L'arcane de 'L'Empereur', elle représente l'autorité, la stabilité et le contrôle.",
      'F': "L'arcane du 'Pape', symbolise les croyances, la spiritualité et la tradition.",
      'G': "L'arcane de 'L'Amoureux', elle représente le conflit entre choix, amour et relations personnelles.",
      'H': "L'arcane du 'Chariot', elle indique la victoire, le mouvement, et le contrôle de soi.",
      'I': "L'arcane de la 'Justice', elle représente l'équilibre, l'équité, et la vérité.",
      'J': "L'arcane de 'L'Hermite', symbole de la réflexion, de la recherche intérieure, et de l'isolement.",
      'K': "L'arcane de 'La Roue de Fortune', évoque le changement, le destin, et les cycles de vie.",
      'L': "L'arcane de la 'Force', symbolise le courage, la maîtrise de soi, et la force intérieure.",
      'M': "L'arcane du 'Pendu', elle représente le sacrifice, la suspension, et une perspective différente.",
      'N': "L'Arcane sans Nom, la 'Mort', symbole de transformation, de fin, et de renouveau.",
      'O': "L'arcane de la 'Tempérance', symbole de l'équilibre, la modération, et l'harmonie.",
      'P': "L'arcane du 'Diable', représente les tentations, les dépendances, et les désirs cachés.",
      'Q': "L'arcane de la 'Maison Dieu', elle évoque la catastrophe, le choc, et la destruction nécessaire.",
      'R': "L'arcane de 'L'Étoile', symbole d'espoir, d'inspiration, et de spiritualité.",
      'S': "L'arcane de la 'Lune', elle représente l'illusion, le subconscient, et les rêves.",
      'T': "L'arcane du 'Soleil', évoque le succès, le bonheur, et la clarté.",
      'U': "L'arcane du 'Jugement', elle symbolise le renouveau, la résurrection, et les appels à l'action.",
      'V': "L'arcane du 'Monde', elle représente l'accomplissement, la complétion, et la réalisation.",
      };

      
    return messages[pair] || "Bonne trouvaille !"; // Message par défaut
  };

  return (
    <div className="App">
      <BackgroundMusic />
      <Title />
      <div className="card-container">
        {cards.map((card) => (
          <Card key={card.id} card={card} flipCard={flipCard} isChecking={isChecking} />
        ))}
        <img className="Igor" src={Igor} alt="Igor" />
      </div>
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
