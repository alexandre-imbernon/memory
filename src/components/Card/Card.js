import backImage from '../../assets/cardreverse.png'; // Utilisez le chemin absolu

const Card = ({ card, flipCard }) => {
    const cardImage = `/assets/${card.value}.png`;
    return (
        <div onClick={() => flipCard(card.id)}>
            {card.isFlipped ? 
                <img className="back-Image" src={cardImage} alt={card.value} /> : 
                <img className="back-Image" src={backImage} alt="dos de la carte" />}
        </div>
    );
};


export default Card;
