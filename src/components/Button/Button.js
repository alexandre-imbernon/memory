import React from 'react';

const Button = ({ resetGame }) => {
    return <button onClick={resetGame}>Réinitialiser le jeu</button>;
};

export default Button;