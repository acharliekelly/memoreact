import React from 'react';
import { Dropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Header = ({ currentDeck, deckChange, currentSize, sizeChange }) => (
  <div className="grid-header-container">
    <div className="justify-left logo">
      <img alt="Logo" src="memore.png" />
    </div>
    <div className="justify-left">
      <Dropdown onSelect={sizeChange}>
        <Dropdown.Toggle variant="success" id="size-menu">
          {currentSize}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="4x4">4 x 4</Dropdown.Item>
          <Dropdown.Item eventKey="4x8">4 x 8</Dropdown.Item>
          <Dropdown.Item eventKey="6x6" disabled="true">6 x 6</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
    <div className="justify-left">
      <Dropdown onSelect={deckChange}>
        <Dropdown.Toggle variant="primary" id="deck-menu">
          {currentDeck}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="Colors">Colors (8)</Dropdown.Item>
          <Dropdown.Item eventKey="ExtColors">Colors (16)</Dropdown.Item>
          <Dropdown.Item eventKey="Shapes">Shapes (16)</Dropdown.Item>
          <Dropdown.Item eventKey="Romanov">Romanov (16)</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  </div>
);

Header.propTypes = {
  currentSize: PropTypes.string.isRequired,
  sizeChange: PropTypes.func.isRequired,
  currentDeck: PropTypes.string.isRequired,
  deckChange: PropTypes.func.isRequired
};

export default Header;
