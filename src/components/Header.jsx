import React from 'react';
import { Dropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Decks } from '../Deck';
import { Grids } from '../Grid';

const Header = ({ currentDeck, deckChange, currentSize, sizeChange }) => (
  <div className="grid-header-container">
    <div className="justify-left logo">
      <img alt="Logo" src="memore.png" />
      <span className="title">Memory Game</span>
    </div>
    <div className="justify-left">
      <Dropdown onSelect={sizeChange}>
        <Dropdown.Toggle variant="success" id="size-menu">
          {currentSize}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {Grids.map(grid => (
            <Dropdown.Item
              key={grid.name}
              eventKey={grid.name}
              active={grid.name === currentSize}
            >
              {grid.listView}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
    <div className="justify-left">
      <Dropdown onSelect={deckChange}>
        <Dropdown.Toggle variant="primary" id="deck-menu">
          {currentDeck}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {Decks.map(deck => (
            <Dropdown.Item
              key={deck.name}
              eventKey={deck.name}
              active={deck.name === currentDeck}
            >
              {deck.listView}
            </Dropdown.Item>
          ))}
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
