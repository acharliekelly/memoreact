import React from 'react';
import Container from 'react-bootstrap/Container';
import Tile from './Tile';
import GameOver from './GameOver';

import '../css/grid.scss';
import '../css/board.scss';

const Board = ({ deckId, tiles, flipTile, isGameOver, restartGame, gridSize }) => {
  const boardCls = `game-board grid-${gridSize} ${deckId}`;
  if (isGameOver) {
    return <GameOver restartGame={restartGame} />
  } else {
    return (
      <Container fluid="xl" className={boardCls}>
        {tiles.map((tile, index) => (
          <Tile key={index} value={tile.value}
            flipped={tile.flipped} matched={tile.matched}
            handleClick={flipTile} deckId={deckId} />
        ))}
      </Container>
    )
  }
  
};

export default Board;