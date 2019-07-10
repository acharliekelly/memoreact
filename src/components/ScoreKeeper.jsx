import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const ScoreKeeper = ({ restartGame, userName, movesCount, remainCount }) => (
  <div className="sidebar-container">
    <header>Score Keeper</header>
    <div className="username">
      <span className="label">User: </span>
      <span className="user">{userName}</span>
    </div>
    <div className="move-counter">
      <span className="label">Moves: </span>
      <span className="counter">{movesCount}</span>
    </div>
    <div className="remaining">
      <span className="label">Cards Remaining: </span>
      <span className="counter">{remainCount}</span>
    </div>
    <div className="controls">
      <Button variant="primary" onClick={restartGame}>Restart</Button>
    </div>
  </div>
);

ScoreKeeper.propTypes = {
  restartGame: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  movesCount: PropTypes.number.isRequired,
  remainCount: PropTypes.number.isRequired
};

export default ScoreKeeper;
