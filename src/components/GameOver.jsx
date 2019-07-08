import React from 'react';

const GameOver = ({ restartGame }) => (
  <div className="justify-center">
    <h1>You Win!</h1>
    <button className="restart-button" onClick={restartGame}>Restart</button>
  </div>
);

export default GameOver;
