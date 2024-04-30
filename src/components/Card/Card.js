import React from 'react';
import backImage from '../../assets/cardreverse.png'; // Dos de la carte
import cardAImage from '../../assets/card1.png'; // Face de la carte A
import cardBImage from '../../assets/card2.png'; // Face de la carte B
import cardCImage from '../../assets/card3.png'; // Face de la carte C
import cardDImage from '../../assets/card4.png'; // Face de la carte D

const getCardImage = (value) => {
  switch (value) {
    case 'A':
      return cardAImage;
    case 'B':
      return cardBImage;
    case 'C':
      return cardCImage;
    case 'D':
      return cardDImage;
    default:
      return null;
  }
};

const Card = ({ card, flipCard }) => {
  const frontImage = getCardImage(card.value);

  return (
    <div onClick={() => flipCard(card.id)}>
      {card.isFlipped ? (
        <img className="card-face" src={frontImage} alt={`face de la carte ${card.value}`} />
      ) : (
        <img className="card-back" src={backImage} alt="dos de la carte" />
      )}
    </div>
  );
};

export default Card;
