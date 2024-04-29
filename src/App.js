import React, { useState, useCallback } from 'react';
import '../src/App.css';
import Button from './components/Score/Score';
import Card from './components/Card/Card';
import Title from './components/Title/Title';

function App() {
  const [cards, setCards] = useState([/* Your initial card data here */]);
  const [flippedCard, setFlippedCard] = useState(null);

  const flipCard = useCallback((id) => {
    setFlippedCard(id);
  }, []);

  const resetGame = useCallback(() => {
    setCards([/* Reset your card data here */]);
    setFlippedCard(null);
  }, []);

  return (
    <div>
      <Title />
      {cards.map((card) => (
        <Card key={card.id} card={card} flipCard={flipCard} />
      ))}
      <Button resetGame={resetGame} />
    </div>
  );
}

export default App;
