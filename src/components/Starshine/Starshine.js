import React from 'react';
import Star from '../Star/Star';

const Starshine = () => {
  const stars = 500;

  const starElements = [];
  for (let i = 0; i < stars; i++) {
    let size = 'small';
    if (i % 2 === 0) {
      size = 'small';
    } else if (i % 3 === 0) {
      size = 'medium';
    } else {
      size = 'large';
    }

    starElements.push(<Star key={i} size={size} />);
  }

  return <div className="starshine">{starElements}</div>;
};

export default Starshine;
