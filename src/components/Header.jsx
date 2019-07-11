import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const Header = ({ restartGame }) => (
  <div className="grid-header-container">
    <div className="justify-left logo">
      <img alt="Logo" src="memore.png" />
      <span className="title">Memory Game</span>
    </div>
    <div className="justify-center"></div>
    <div className="justify-end">
      <Button variant="primary" onClick={restartGame}>Restart</Button>
    </div>
  </div>
);

Header.propTypes = {
  restartGame: PropTypes.func.isRequired
};

export default Header;
