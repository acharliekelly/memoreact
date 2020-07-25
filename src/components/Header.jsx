import React from 'react';

import Dropdown from 'react-bootstrap/Dropdown';

import { GRID_OPTIONS, DECK_OPTIONS } from '../utils/boardLogic';


const BoardSizeSelector = ({ updateBoardSize }) => (
  <Dropdown onSelect={updateBoardSize}>
    <Dropdown.Toggle variant="primary">Select Board Size</Dropdown.Toggle>
    <Dropdown.Menu>
      {Object.keys(GRID_OPTIONS).map(size => (
        <Dropdown.Item key={size} eventKey={size}>{size}</Dropdown.Item>
      ))}
    </Dropdown.Menu>
  </Dropdown>
);

const DeckSelector = ({ updateDeck }) => (
  <Dropdown onSelect={updateDeck}>
    <Dropdown.Toggle variant="secondary">Select Deck</Dropdown.Toggle>
    <Dropdown.Menu>
      {DECK_OPTIONS.map(deck => (
        <Dropdown.Item key={deck.id} eventKey={deck.id}>{deck.title}</Dropdown.Item>
      ))}
    </Dropdown.Menu>
  </Dropdown>
);

const Header = props => {
  const { boardSize, currentDeck, moves, matches, updateDeck, updateBoardSize } = props;
  return (
    <header>
      <h1>Memory Game</h1>
      <div className="size-selector">
        <BoardSizeSelector updateBoardSize={updateBoardSize} />
        <span className="board-size">{boardSize}</span>
      </div>
      <div className="deck-selector">
        <DeckSelector updateDeck={updateDeck} />
        <span className="deck">{currentDeck.title}</span>
      </div>
      <div className="score">
        <span className="moves">Moves: {moves}</span>
        <span className="matches">Matches: {matches}</span>
      </div>
    </header>
  );

} 

export default Header;