import React from 'react';

class BackgroundMusic extends React.Component {
  render() {
    return (
      <audio autoPlay loop>
        <source src={process.env.PUBLIC_URL + '/assets/bgOST.mp3'} type="audio/mpeg" />
        Votre navigateur ne supporte pas l'élément audio.
      </audio>
    );
  }
}

export default BackgroundMusic;
