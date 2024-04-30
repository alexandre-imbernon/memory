import React from 'react';
import backImage from '../../assets/cardreverse.png'; // Utilisez le chemin absolu
import anotherImage from '../../assets/card1.png'; // Importez l'image que vous voulez afficher

const Card = ({ card, flipCard }) => {
    return (
        <div onClick={() => flipCard(card.id)}>
            {card.isFlipped ? 
                <img className="back-Image" src={anotherImage} alt="face de la carte" /> : 
                <img className="back-Image" src={backImage} alt="dos de la carte" />}
        </div>
    );
};

export default Card;