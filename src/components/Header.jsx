import React from 'react';
import { Dropdown } from 'react-bootstrap';

const Header = ({ restartGame, deckSelect }) => (
  <div className="grid-header-container">
    <div className="justify-left logo">
      <img alt="Logo" src="memore.png" />
    </div>
    <div className="justify-center game-options">
      <Dropdown onSelect={deckSelect}>
        <Dropdown.Toggle variant="primary" id="options-menu">
          Decks
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item key="colors">Colors</Dropdown.Item>
          <Dropdown.Item key="shapes">Shapes</Dropdown.Item>
          <Dropdown.Item key="romanov">Romanov</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
    <div className="justify-end">
      <button className="restart-button" onClick={restartGame}>Restart</button>
    </div>
  </div>
);

export default Header;
