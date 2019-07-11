import React, { Component } from 'react';
import GameBoard from './GameBoard';
import Header from './Header';
import ScoreKeeper from './ScoreKeeper';
import GameOptions from './GameOptions';

import Options from '../model/Options';

import '../css/main.css';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      options: Options.defaultOptions(),
      moves: 0,
      remaining: 0,
      gameOver: false
    };
  }

  init = () => {
    if (!this.state.options) {
      this.setState({
        options: Options.defaultOptions()
      });
    }
    this.setState({
      remaining: this.state.options.getBoardSize()
    });
  }

  componentDidMount () {
    this.init();
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

    if (this.state.remaining < 1) {
      this.setState({
        gameOver: true
      });
    }
  }

  restartGame = () => {
    this.setState({
      moves: 0,
      remaining: this.state.options.getBoardSize(),
      gameOver: false
    });
  }

  handleOptionSubmit = event => {
    // TODO: change options, restart
    console.log('Options updated');
  }

  render () {
    const { options, moves, remaining, gameOver } = this.state;
    return (
      <div className="game-layout">
        <Header restartGame={this.restartGame} />
        <GameOptions options={options} submitHandler={this.handleOptionSubmit} />
        <ScoreKeeper
          restartGame={this.restartGame}
          movesCount={moves}
          remainCount={remaining}
          userName='User Name'
        />
        <GameBoard
          deck={options.theme}
          grid={options.grid}
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
