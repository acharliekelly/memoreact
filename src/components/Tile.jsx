import React from 'react';
import ReactCardFlip from 'react-card-flip';
import { getCardBackStyle, getCardFrontStyle } from '../utils/boardLogic';

const TileFront = ({ value, deckId, matched }) => (
  <div className="tile-front" style={getCardFrontStyle(deckId, value, matched)}>
    <div className="tile-value">{value}</div>
  </div>
);

const TileBack = ({ handleClick, deckId }) => (
  <div 
    className="tile-back" 
    style={getCardBackStyle(deckId)}
    onClick={handleClick}
  />
);


const Tile = props => (
  <ReactCardFlip
      isFlipped={props.flipped}
      flipSpeedBackToFront={1}
      flipSpeedFrontToBack={1}>
    <TileFront key="front" {...props} />
    <TileBack key="back" {...props} />
  </ReactCardFlip>
);

export default Tile;