import React from 'react';
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
import cardOImage from '../../assets/card14.png'; 
import cardPImage from '../../assets/card15.png'; 
import cardQImage from '../../assets/card16.png'; 
import cardRImage from '../../assets/card17.png'; 
import cardSImage from '../../assets/card18.png'; 
import cardTImage from '../../assets/card19.png'; 
import cardUImage from '../../assets/card20.png'; 
import cardVImage from '../../assets/card21.png'; 
import cardWImage from '../../assets/card22.png'; 
import cardXImage from '../../assets/card23.png'; 


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
    case 'E':
      return cardAImage;
    case 'F':
      return cardBImage;
    case 'G':
      return cardCImage;
    case 'H':
      return cardDImage;
    case 'I':
      return cardAImage;
    case 'J':
      return cardBImage;
    case 'K':
      return cardCImage;
    case 'L':
      return cardDImage;
    case 'M':
      return cardAImage;
    case 'N':
      return cardBImage;
    case 'O':
      return cardCImage;
    case 'P':
      return cardDImage;  
    case 'Q':
      return cardAImage;
    case 'R':
      return cardBImage;
    case 'S':
      return cardCImage;
    case 'T':
      return cardDImage;
    case 'U':
      return cardAImage;
    case 'V':
      return cardBImage;
    case 'W':
      return cardCImage;
    case 'X':
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
        <img className="card-face" src={frontImage} alt={` ${card.value}`} />
      ) : (
        <img className="card-back" src={backImage} alt="dos de la carte" />
      )}
    </div>
  );
};

export default Card;
