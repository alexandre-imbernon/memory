import React, { useState, useEffect } from 'react';
import './App.css';
import Card from './components/Card/Card';
import Title from './components/Title/Title';
import BackgroundMusic from './components/Music/Music';
import Igor from './assets/igor.png';
import Igorclosedeyes from './assets/igorclosedeyes.png';
import cardFlipSound from './assets/00118_streaming.wav';

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

const cardValues = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X'
];

function App() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [isChecking, setIsChecking] = useState(false);
  const [lastFoundPair, setLastFoundPair] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [timer, setTimer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    const shuffledValues = shuffleArray([...cardValues]);
    const selectedValues = shuffledValues.slice(0, 4);
    const pairs = selectedValues.flatMap((value) => [
      { id: `${value}1`, value, isFlipped: false, isMatched: false },
      { id: `${value}2`, value, isFlipped: false, isMatched: false },
    ]);
    setCards(shuffleArray(pairs));
  }, []);

const flipCard = (id) => {
  if (gameOver || isChecking || flippedCards.length >= 2) return;
  const card = cards.find((card) => card.id === id);
  if (card && !card.isMatched) {
    new Audio(cardFlipSound).play();

    setFlippedCards((prev) => [...prev, id]);
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, isFlipped: true, className: 'card-flip' } : card
      )
    );
    if (flippedCards.length === 0 && !timer) {
      const newTimer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      setTimer(newTimer);
    }
  }
};

  const resetGame = () => {
    const shuffledValues = shuffleArray([...cardValues]);
    const selectedValues = shuffledValues.slice(0, 4);
    const pairs = selectedValues.flatMap((value) => [
      { id: `${value}1`, value, isFlipped: false, isMatched: false },
      { id: `${value}2`, value, isFlipped: false, isMatched: false },
    ]);
    setCards(shuffleArray(pairs));
    setFlippedCards([]);
    setLastFoundPair(null);
    clearInterval(timer);
    setTimer(null);
    setGameOver(false);
    setGameWon(false);
    setTimeLeft(30);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsChecking(true);
      setTimeout(() => {
        const [firstId, secondId] = flippedCards;
        const card1 = cards.find((card) => card.id === firstId);
        const card2 = cards.find((card) => card.id === secondId);
        if (card1 && card2 && card1.value === card2.value) {
          setLastFoundPair(card1.value);
          setFlippedCards([]);
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

  useEffect(() => {
    if (cards.filter((card) => card.isMatched).length === 8) {
      clearInterval(timer);
      setGameWon(true);
    }
    if (timeLeft === 0) {
      clearInterval(timer);
      setGameOver(true);
    }
  }, [cards, timer, timeLeft]);
  

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

    return messages[pair] || "Bien joué !";
  };

  return (
    <div className="App">
      <BackgroundMusic />
      <Title />
      {/* Placez le timer ici, juste après le titre */}
      <div className="timer">⧗ : {timeLeft}</div>
      
        <div className="card-container">
        {cards.map((card) => (
          <Card key={card.id} card={card} flipCard={flipCard} isChecking={isChecking} />
        ))}
        
        {/* Conteneur de superposition pour Igor avec survol */}
        <div className="image-hover-container">
          <img className="Igor" src={Igor} alt="Igor" />
          <img className="Igorclosedeyes" src={Igorclosedeyes} alt="Image superposée" onClick={resetGame} />
        </div>
      </div>
      {lastFoundPair && (
        <div className="congratulations-message show">
          {getCustomMessage(lastFoundPair)}
        </div>
      )}
      
      {gameOver && <div className="game-over-message">Game Over</div>}
      {gameWon && <div className="game-won-message">Vous avez gagné!</div>}
      
    </div>
  );
};

export default App;