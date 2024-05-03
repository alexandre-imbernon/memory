import { React, useState, useCallback } from 'react';

import backImage from '../../assets/cardreverse.png'; // Dos de la carte

import cardAImage from '../../assets/card1.png'; // Face de la carte (1 à 23)
import cardBImage from '../../assets/card2.png'; 
import cardCImage from '../../assets/card3.png'; 
import cardDImage from '../../assets/card4.png'; 
import cardEImage from '../../assets/card5.png'; 
import cardFImage from '../../assets/card6.png'; 
import cardGImage from '../../assets/card7.png'; 
import cardHImage from '../../assets/card8.png'; 
import cardIImage from '../../assets/card9.png'; 
import cardJImage from '../../assets/card10.png'; 
import cardKImage from '../../assets/card11.png'; 
import cardLImage from '../../assets/card12.png'; 
import cardMImage from '../../assets/card13.png'; 
import cardNImage from '../../assets/card14.png'; 
import cardOImage from '../../assets/card15.png'; 
import cardPImage from '../../assets/card16.png'; 
import cardQImage from '../../assets/card17.png'; 
import cardRImage from '../../assets/card18.png'; 
import cardSImage from '../../assets/card19.png'; 
import cardTImage from '../../assets/card20.png'; 
import cardUImage from '../../assets/card21.png'; 
import cardVImage from '../../assets/card22.png'; 
import cardWImage from '../../assets/card23.png'; 

const getCardImage = (value) => {
  const cardImages = {
    'A': cardAImage,
    'B': cardBImage,
    'C': cardCImage,
    'D': cardDImage,
    'E': cardEImage,
    'F': cardFImage,
    'G': cardGImage,
    'H': cardHImage,
    'I': cardIImage,
    'J': cardJImage,
    'K': cardKImage,
    'L': cardLImage,
    'M': cardMImage,
    'N': cardNImage,
    'O': cardOImage,
    'P': cardPImage,
    'Q': cardQImage,
    'R': cardRImage,
    'S': cardSImage,
    'T': cardTImage,
    'U': cardUImage,
    'V': cardVImage,
    'W': cardWImage,
  };

  return cardImages[value] || backImage; 
};

const Card = ({ card, flipCard }) => {
  console.log(`Rendering card ${card.id}, isFlipped: ${card.isFlipped}`);
  const handleCardClick = useCallback(() => {
    console.log(`Card ${card.id} clicked`);
    flipCard(card.id);
  }, [flipCard, card.id]); // Assurez-vous que la fonction reste stable entre les rendus

  console.log(flipCard);
  return (
    <div className="card" onClick={handleCardClick}>
      {card.isFlipped ? (
        <img className="card-face" src={getCardImage(card.value)} alt={`Carte ${card.value}`} />
      ) : (
        <img className="card-back" src={backImage} alt="Dos de la carte" />
      )}
    </div>
  );
};

export default Card;