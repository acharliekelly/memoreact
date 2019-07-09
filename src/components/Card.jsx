import React from 'react';
import ReactCardFlip from 'react-card-flip';

const Card = ({ id, isFlipped, handleClick, cardNumber }) => (
  <ReactCardFlip isFlipped={isFlipped} flipSpeedBackToFront={1} flipSpeedFrontToBack={1} >
    <button
      id={id}
      className={`card card-front ${cardNumber >= 0 ? '' : 'hide-card'}`}
      onClick={handleClick}
      key="front" />

    <button
      id={id}
      className={`card card-back ${cardNumber >= 0 ? 'card-' + cardNumber : 'hide-card'}`}
      onClick={handleClick}
      key="back" >
      <span className="text">{ cardNumber }</span>
    </button>
  </ReactCardFlip>
);

export default Card;
