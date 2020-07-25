import React from 'react';
// import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

const GameOver = ({ restartGame }) => (
  <div className="justify-center">
    <h1>You Win!</h1>
    <Button variant="primary" onClick={restartGame}>Restart</Button>
  </div>
);

export default GameOver;
