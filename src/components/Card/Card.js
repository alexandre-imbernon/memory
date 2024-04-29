import React from 'react';

const Card = ({ card, flipCard }) => {
    return (
        <div onClick={() => flipCard(card.id)}>
            {card.isFlipped ? card.value : ''}
        </div>
    );
};

export default Card;