import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Tile from './Tile';
import GameOver from './GameOver';

import '../css/grid.scss';
import '../css/board.scss';

const CHECK_MATCH_TIMER = 1500;

const Board = props => {
  const { deckId, deck, tiles, isGameOver, gridSize, isSecondFlip, matches } = props;
  const { flipTile, restartGame, startGame, checkMatch, showWin } = props;
  let timerHandle;

  useEffect(() => {
    startGame(deckId, gridSize);
  }, []);

  useEffect(() => {
    if (!isSecondFlip) {
      // second card has been flipped
      timerHandle = setInterval(checkForMatch, CHECK_MATCH_TIMER);
    }
  }, [isSecondFlip]);

  useEffect(() => {
    if (matches === tiles.length / 2) {
      showWin();
    }
  }, [matches])

  const checkForMatch = () => {
    clearInterval(timerHandle);
    checkMatch();
  }

  const boardCls = `game-board grid-${gridSize} ${deck.id}`;
  const boardStyle = { backgroundColor: deck.background };
  if (!tiles) {
    return <Spinner animation="grow" variant="warning" />
  } else {
    return (
      <Container fluid="xl" className={boardCls} style={boardStyle}>
        {isGameOver && (
          <GameOver restartGame={restartGame} />
        )}
        {tiles.map((tile, index) => (
          <Tile key={index} index={index} tile={tile} flipCard={flipTile} deck={deck} />
        ))}
      </Container>
    )
  }
  
};

export default Board;