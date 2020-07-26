import React from 'react';
import ReactCardFlip from 'react-card-flip';
import { 
  getCardBackStyle, 
  getCardFrontStyle, 
  getCloudBack, 
  getCloudFace 
} from '../utils/boardLogic';


const imgStyle = {
  height: '100%',
  width: '100%'
}

export const TileBack = (deck, flipCard, index) => {
  let style = Object.assign({}, deck.cardStyle);
  let children = null;
  if (!deck.cardBack.startsWith('#')) {
    // cardBack is image
    style.backgroundColor = deck.background;
    children = <img src={getCloudBack(deck)} style={imgStyle} alt="" />
  } else {
    style.backgroundColor = deck.cardBack;
  }
  return (
    <div 
      key="front"
      className="card card-back"
      style={style}
      onClick={() => flipCard(index)}
      >
        {children}
    </div>
  );
}

export const TileFront = ({ deck, tile }) => {
  let style = Object.assign({}, deck.cardStyle);
  let children = null;
  if (deck.hasImages) {
    style.backgroundColor = deck.background;
    children = <img src={getCloudFace(deck, tile.value)} alt="" />;
  } else {
    style.backgroundColor = deck.faces(tile.value);
    children = <div className="text">{tile.value}</div>
  }
  return (
    <div 
      key="back" 
      className="card card-front" 
      style={style}>
       {children}
    </div>
  );
}

const Tile = ({ index, tile, flipCard, deck }) => {
  return (
    <ReactCardFlip
      isFlipped={tile.flipped}
      flipSpeedBackToFront={1}
      flipSpeedFrontToBack={1} 
    >
      <div 
        key="front" 
        className="card card-back" 
        style={getCardBackStyle(deck)} 
        onClick={() => flipCard(index)} 
      />
      <div 
        key="back" 
        className="card card-front" 
        style={getCardFrontStyle(deck, tile)}>
          {deck.showText && (
            <div className="text">{tile.value}</div>
          )}
      </div>
    </ReactCardFlip>
  );
}

export default Tile;