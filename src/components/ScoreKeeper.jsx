import React, { Component } from 'react';

class ScoreKeeper extends Component {
  constructor (props) {
    super(props);

    this.formatTime = this.formatTime.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentDidMount () {
    this.props.startTimer();
  }

  handleReset = event => {
    event.preventDefault();
    this.props.restartGame();
  }

  formatTime = time => {
    const minutes = parseInt(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds}`;
  }

  render () {
    // const timer = this.formatTime(time);
    return (
      <div className="sidebar-container">
        <div className="move-counter">
          <span className="label">Moves: </span>
          <span className="counter">{this.props.moveCount}</span>
        </div>
        <div className="timer">
          <span className="label">Time: </span>
          <span className="counter">{this.props.readTimer}</span>
        </div>
        <div className="controls">
          <button className="reset-button" onClick={this.handleReset}>Reset</button>
        </div>
      </div>
    );
  }
}

export default ScoreKeeper;
