import React, { Component } from 'react';
import GameBoard from './components/GameBoard';
import Header from './components/Header';
import GameOver from './components/GameOver';
import ScoreKeeper from './components/ScoreKeeper';
import { deckSelector } from './Deck';

import './css/main.css';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      moves: 0,
      time: 0,
      start: 0,
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

  startTimer = () => {
    this.setState({
      time: this.state.time,
      start: Date.now()
    });
    this.timer = setInterval(() => this.setState({
      time: Date.now() - this.state.start
    }), 1000);
  }

  stopTimer = () => {
    clearInterval(this.timer);
  }

  readTimer = () => {
    return this.time;
  }

  setGameOver = () => {
    this.setState({
      gameOver: true
    });
  }

  restartGame = () => {
    this.setState({
      moves: 0,
      time: 0,
      start: 0,
      gameOver: false
    });
  }

  render () {
    return (
      <div className="game-layout">
        <Header restartGame={this.restartGame} deckSelect={deckSelector} />
        <ScoreKeeper
          restartGame={this.restartGame}
          moveCount={this.moveCounter}
          startTimer={this.startTimer}
          readTimer={this.readTimer}
        />
        {this.state.gameOver
          ? <GameOver restartGame={this.restartGame} />
          : <GameBoard
            deck="Colors"
            deckSize="8"
            moveCounter={this.completeMove}
            restartGame={this.restartGame}
            gameOverCallback={this.setGameOver}
          />
        }
      </div>
    );
  }
}

export default App;
