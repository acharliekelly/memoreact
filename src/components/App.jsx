import React, { Component } from 'react';
import GameBoard from './GameBoard';
import Header from './Header';
import ScoreKeeper from './ScoreKeeper';
import Grid from '../Grid';

import '../css/main.css';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      deck: 'Colors',
      grid: '4x4',
      boardSize: 16,
      moves: 0,
      remaining: 16,
      gameOver: false
    };
  }

  moveCounter = () => {
    return this.state.moves;
  }

  completeMove = () => {
    this.setState({
      moves: this.state.moves + 1
    });
  }

  remainCounter = () => {
    return this.state.remaining;
  }

  completeMatch = () => {
    this.setState({
      remaining: this.state.remaining - 2
    });

    if (this.state.remaining === 0) {
      this.setState({
        gameOver: true
      });
    }
  }

  restartGame = () => {
    this.setState({
      moves: 0,
      remaining: this.state.boardSize,
      gameOver: false
    });
  }

  handleDeckChange = (eventKey, event) => {
    console.log('Deck changed to ' + eventKey);
    this.setState({
      deck: eventKey
    });
  }

  handleSizeChange = (eventKey, event) => {
    console.log('Board size changed to ' + eventKey);
    const g = Grid.parse(eventKey);
    this.setState({
      grid: eventKey,
      boardSize: g.size
    });
  }

  render () {
    const { grid, deck, moves, remaining, gameOver } = this.state;
    return (
      <div className="game-layout">
        <Header
          currentDeck={deck}
          deckChange={this.handleDeckChange}
          currentSize={grid}
          sizeChange={this.handleSizeChange}
        />
        <ScoreKeeper
          restartGame={this.restartGame}
          movesCount={moves}
          remainCount={remaining}
          userName='User Name'
        />
        <GameBoard
          deck={deck}
          grid={grid}
          gameOver={gameOver}
          moveCounter={this.completeMove}
          remainCounter={this.completeMatch}
          restartGame={this.restartGame}
        />
      </div>
    );
  }
}

export default App;
