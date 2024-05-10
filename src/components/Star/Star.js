import React from 'react';
import './Star.css'; // Vous devrez créer ce fichier pour vos styles

const Star = ({ size }) => {
  const top = Math.random() * 100 + '%';
  const left = Math.random() * 100 + '%';
  const delay = Math.random() * 20 + 's'; // Équivalent de "sparkle"

  return (
    <div
      className={`star ${size}`}
      style={{ top, left, animationDelay: delay }}
    ></div>
  );
};

export default Star;
