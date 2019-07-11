import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const GameOver = ({ restartGame }) => (
  <div className="game-board">
    <div className="justify-center">
      <h1>You Win!</h1>
      <Button variant="primary" onClick={restartGame}>Restart</Button>
    </div>
  </div>
);

GameOver.propTypes = {
  restartGame: PropTypes.func.isRequired
};

export default GameOver;
